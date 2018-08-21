<template>
    <div id="container">
        <div class="chart-header">
            <div class="chart-title">录音时间总量统计</div>
            <div style="float: right;">
                <Button type="primary">刷新</Button>
                <Button>列表详情</Button>
            </div>
        </div>
        <div id="myChart" :style="{width: '100%', height: '300px'}"></div>

        <div class="chart-header" :class="{'is-active': isdisplay}">
            <div class="chart-title">医院录音时间排名</div>
            <div style="float: right;">
                <Button type="primary">刷新</Button>
                <Button>列表详情</Button>
            </div>
        </div>
        <div id="rankChart" :style="{width: '100%', height: '300px'}" :class="{'is-active': isdisplay}"></div>

        
        <div class="chart-header">
            <div class="chart-title">科室录音时间排名</div>
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
                rankChart: {},
                rankChart2: {},
                dayXData: [],
                dayYData: [],
                sectionXData: [],
                sectionYData: [],
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
                
                this.$http.post('/new/flylog-search-web/customLogSearch/getChart.do', postData)
                .then((response) => {  
                    var rs = response.data.data;
                    var datax = [];
                    var datay = [];
                    var dataxx = [];
                    var datayy = [];

                    var sortedDays = Object.keys(rs.day).sort();

                    for(var i in sortedDays){
                        datax.push(sortedDays[i].slice(5));
                        datay.push(rs.day[sortedDays[i]].stime/1000);
                    }
                   
                    this.dayXData = datax;
                    this.dayYData = datay;
                       
                    var sortedSections = Object.keys(rs.section).sort(function(a, b) {
                        return rs.section[b].stime - rs.section[a].stime;
                    });

                    for (var index in sortedSections) {
                        if(sortedSections[index] == '-'){
                                dataxx.push('其他');
                        }
                        else{
                            dataxx.push(sortedSections[index]);
                        }
                        datayy.push(rs.section[sortedSections[index]].stime/1000);
                    }
         
                    this.sectionXData = dataxx;
                    this.sectionYData = datayy;                    
                    
                    this.drawCharts();
                    this.cancelChartLoading();

                    window.onresize = () => {
                        this.myChart.resize()
                        this.rankChart.resize()
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
    #container {
        background: white;
        margin-top: 14px;
        max-width: 1535px;
        box-shadow:0 0 10px #dfdfdf;
    }
    #myChart {
       width: 100%;
    }
    #rankChart {
       width: 100%;
    }
</style>
