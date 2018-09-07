//使用用户数图表组件
//和ChartDisplayInput（输入字数）, ChartDisplayWord（调用次数）, ChartDisplayTime（录音时间）结构一致
//四个图表组件引入setoption.js设置图表格式
<template>
    <div id="container">
        <div class="chart-header">
            <div class="chart-title">用户数总量统计</div>
            <div style="float: right;">
                <Button type="primary">刷新</Button>
                <Button @click="isTable = !isTable;">列表详情</Button>
            </div>
        </div> 
       
        <!--  使用用户数按天显示的折线图 -->
        <div :class="{'is-active': isTable}">
            <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
        </div>
         <!--  使用用户数按天显示的列表详情 -->
        <div id="table-chart" v-if="isTable">
            <Table 
                :columns="columns1" 
                :data="tableData" 
                size="large">
            </Table>

            <Page 
                :total="dataCount" 
                show-elevator 
                show-total 
                :page-size="pageSize"  
                @on-change="changepage" 
                size="small"
                class="paging">
            </Page>
        </div>        
        <!--使用用户数按科室排名的直方图 -->
        <div class="chart-header">
            <div class="chart-title">科室用户数排名</div>
            <div style="float: right;">
                <Button type="primary">刷新</Button>
                <Button>列表详情</Button>
            </div>
        </div>
        <div id="rankChart2" :style="{width: '100%', height: '300px'}"></div>
    </div>
</template>

<script>
    var moment = require('moment');
    // 设置图表格式
    import {setChartOption} from '../chart/setoption.js';

    export default {
        name: 'chart',
        mixins: [setChartOption],
        props: {
            startdate: {
                type: String,
                default: function(){
                    return ''
                }
            },
            enddate: {
                type: String,
                default: function(){
                    return ''
                }
            },  
            
            isdisplay: 0,          
        },
        data () {
            return {
                myChart: {},     //折线图
                rankChart2: {},  //直方图
                dayXData: [],    //折线图中的X轴数据
                dayYData: [],    //折线图中的Y轴数据
                sectionXData: [],//直方图中的X轴数据
                sectionYData: [],//直方图中的X轴数据 

                // 表格列名
                columns1:[
                    {
                        title: "序号",
                        key: "nums",
                    },
                    {
                        title: "时间",
                        key: "day",
                    },
                    {
                        title: "使用设备数",
                        key: "devices",
                    },
                    {
                        title: "使用用户数",
                        key: "users",
                    },
                    {
                        title: "累计输入字数",
                        key: "words",
                    },
                    {
                        title: "累计调用次数",
                        key: "logcount",
                    },
                    {
                        title: "累计录音时间",
                        key: "time",
                    },
                ],
                tableData: [],  //列表中显示数据
                dataCount: 0,   //数据总条数
                pageSize: 10,   //每页的数据条数
                ajaxData: [],   //获取的数据
                isTable: false, //列表详情的显示
            }    
        },

        methods: {
            /**
             * 获取图表数据
             * 将day数据,section数据排序
             * 对图表和表格的数据进行设置
             */
            getData(){
                //设置图表加载效果
                this.setChartLoading();

                let postData = this.$qs.stringify({
					startTime: this.startdate,
					endTime: this.enddate,
					platform: 'siat',
                });

                this.$http.post(process.env.API_HOST2+'flylog-search-web/customLogSearch/getChart.do', postData)
                .then((response) => { 
                    var rs = response.data.data;
                    var datax = [];
                    var datay = [];
                    var dataxx = [];
                    var datayy = [];
        
                    //将键值日期排序
                    var sortedDays = Object.keys(rs.day).sort();
                    let allData = [];
                    //处理图表数据
                    for(var i in sortedDays){
                        datax.push(sortedDays[i].slice(5));
                        datay.push(rs.day[sortedDays[i]].uidCount);
                        this.ajaxData = allData;
                        this.dataCount = allData.length;
                        if (this.ajaxData.length < this.pageSize) {
                            this.tableData = this.ajaxData;
                        } else {
                            this.tableData = this.ajaxData.slice(0, this.pageSize);
                        }
                    }
                    this.dayXData = datax;
                    this.dayYData = datay; 
                    //处理列表详情数据
                    for(var i in sortedDays.reverse()){
                        allData.push({
                            nums: parseInt(i) + 1,
                            day: sortedDays[i],
                            devices: rs.day[sortedDays[i]].uidCount,
                            users: rs.day[sortedDays[i]].uidCount,
                            words: rs.day[sortedDays[i]].wordCount,
                            logcount: rs.day[sortedDays[i]].logCount,
                            time: rs.day[sortedDays[i]].stime
                        });                        
                    }     
                    //将键值科室名排序
                    var sortedSections = Object.keys(rs.section).sort(function(a, b) {
                        return rs.section[b].uidCount - rs.section[a].uidCount;
                    });
                    //处理图表数据
                    for (var index in sortedSections) {
                        if(sortedSections[index] == '-'){
                                dataxx.push('其他');
                        }
                        else{
                            dataxx.push(sortedSections[index]);
                        }
                        datayy.push(rs.section[sortedSections[index]].uidCount);
                    }

                    this.sectionXData = dataxx;
                    this.sectionYData = datayy;                   
                    //取消图表加载效果
                    this.cancelChartLoading();
                    //显示图表
                    this.drawCharts();
                    //控制图表宽度随窗口大小变化
                    window.onresize = () => {
                        this.myChart.resize()
                        this.rankChart2.resize()
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });  
            },

            /**
             * 分页
             */
            changepage(index) {
                var _start = (index - 1) * this.pageSize;
                var _end = index * this.pageSize;
                this.tableData = this.ajaxData.slice(_start, _end);
            }
        },

        mounted(){
            this.getData();
        },

    }
</script>

<style scoped>
    .chart-header {
        background-color: #fbfbfb; 
        border-bottom: 1px solid #e8e8e8; 
        height: 52px; 
        padding: 10px 50px;
        margin-top: 14px;
    }
    .chart-title {
        float: left; 
        color: #979797; 
        font-size: 14px; 
        font-weight: bold; 
        margin-top: 7px;
    }
    .is-active {
        display: none;
    }
    .is-active{
        visibility: hidden;
    }
    .paging {
        float: right;
        margin-top: 10px;
    }
    #container {
        background: white;
        padding-top: 0px;
        max-width: 1535px;
        /* max-width: 100%; */
        box-shadow:0 0 10px #dfdfdf; 
    }
    #table-chart {
        display: inline-block;
        width: 100%;
    }


</style>
