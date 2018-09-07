<template>
    <div id="container">
        <div class="chart-header">
            <div class="chart-title">输入字数总量统计</div>
            <div style="float: right;">
                <Button type="primary">刷新</Button>
                <Button @click="isTable = !isTable;">列表详情</Button>
            </div>
        </div>

        <div :class="{'is-active': isTable}">
            <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
            <!-- <div id="myChart"></div> -->
        </div>
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
       
        <div class="chart-header">
            <div class="chart-title">科室输入字数排名</div>
            <div style="float: right;">
                <Button type="primary">刷新</Button>
                <Button>列表详情</Button>
            </div>
        </div>
        <div id="rankChart2" :style="{width: '100%', height: '300px'}"></div>
    </div>
</template>

<script>
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
                myChart: {},
                rankChart2: {},
                dayXData: [],
                dayYData: [],
                sectionXData: [],
                sectionYData: [],

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
                tableData: [],
                dataCount: 0,
                pageSize: 10,
                ajaxData: [],
                
                // control the diaplay of chart or table
                isTable: false,
            }
        },

        methods: {

            getData(){
                this.setChartLoading();

                let postData = this.$qs.stringify({
					startTime: this.startdate,
					endTime: this.enddate,
					platform: 'siat',
                });
                
                this.$http.post(process.env.API_HOST2+'flylog-search-web/customLogSearch/getChart.do', postData)
                .then((response) => { 
                    var rs = response.data.data;
                    console.log(rs);
                    var datax = [];
                    var datay = [];
                    var dataxx = [];
                    var datayy = [];

                    var sortedDays = Object.keys(rs.day).sort();

                    let allData = [];
                    for(var i in sortedDays){
                        datax.push(sortedDays[i].slice(5));
                        datay.push(rs.day[sortedDays[i]].wordCount);
                        allData.push({
                            nums: parseInt(i) + 1,
                            day: sortedDays[i],
                            devices: rs.day[sortedDays[i]].uidCount,
                            users: rs.day[sortedDays[i]].uidCount,
                            words: rs.day[sortedDays[i]].wordCount,
                            logcount: rs.day[sortedDays[i]].logCount,
                            time: rs.day[sortedDays[i]].stime
                        });                        
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
                       
                    var sortedSections = Object.keys(rs.section).sort(function(a, b) {
                        return rs.section[b].wordCount - rs.section[a].wordCount;
                    });

                    for (var index in sortedSections) {
                        if(sortedSections[index] == '-'){
                                dataxx.push('其他');
                        }
                        else{
                            dataxx.push(sortedSections[index]);
                        }
                        datayy.push(rs.section[sortedSections[index]].wordCount);
                    }           
                    this.sectionXData = dataxx;
                    this.sectionYData = datayy;                    
                    
                    this.drawCharts();
                    this.cancelChartLoading();
                
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
