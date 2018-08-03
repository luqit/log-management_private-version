<template>
    <div id="container">
        <div class="chart-header">
            <div class="chart-title">调用次数总量统计</div>
            <div style="float: right;">
                <Button type="primary">刷新</Button>
                <Button>列表详情</Button>
            </div>
        </div>
        <div id="myChart" :style="{width: '100%', height: '300px'}"></div>

        <div class="chart-header">
            <div class="chart-title">医院调用次数排名</div>
            <div style="float: right;">
                <Button type="primary">刷新</Button>
                <Button>列表详情</Button>
            </div>
        </div>
        <div id="rankChart" :style="{width: '100%', height: '300px'}"></div>

        
        <div class="chart-header">
            <div class="chart-title">科室调用次数排名</div>
            <div style="float: right;">
                <Button type="primary">刷新</Button>
                <Button>列表详情</Button>
            </div>
        </div>
        <div id="rankChart2" :style="{width: '100%', height: '300px'}"></div>
    </div>
</template>

<script>
    // import {setchart1} from '@/chart/setchart.js'
    export default {
        name: 'chart',

        data () {
            return {
                chart1: {},
                chart2: {},
                chart3: {},
            }
        },

        methods: {
            drawCharts(){
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                let rankChart = this.$echarts.init(document.getElementById('rankChart'))
                let rankChart2 = this.$echarts.init(document.getElementById('rankChart2'))

                myChart.setOption({
                    grid:{
                        x:70,
                        y:50,
                        x2:70,
                        y2:50,
                        borderWidth:1
                    },
                    backgroundColor: 'white',
                    legend: {
                        right: '5%',
                    },
                    tooltip: {},
                    xAxis: {
                        axisLine:{
                            lineStyle:{
                                color:'#979797'
                            }
                        },
                        data: ["05-16","05-17","05-18","05-19","05-20","05-21"]
                    },

                    yAxis: {
                        axisLine:{
                            lineStyle:{
                                color:'#979797'
                            }
                        },
                    },
                    series: [{
                        name: this.name,
                        type: 'line',
                        symbol: 'circle',
                        color: "#52baf8",
                        symbolSize: 18,
                        itemStyle:{
                            normal:{
                                borderColor: 'white',
                                borderWidth: 3,
                                shadowColor: 'rgba(0, 0, 0, 0.2)',
                                shadowBlur: 5,
                                lineStyle:{
                                    width:3,
                                }
                            }
                        },
                        data: [5, 20, 36, 10, 10, 20],
                        markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                        },
                    }],
                });
            
                rankChart.setOption({
                    grid:{
                        x:70,
                        y:50,
                        x2:70,
                        y2:50,
                        borderWidth:1
                    },
                    backgroundColor: 'white',
                    legend: {
                        right: '5%',
                    },
                    tooltip: {},
                    xAxis: {
                        axisLine:{
                            lineStyle:{
                                color:'#979797'
                            }
                        },
                        data: ["05-16","05-17","05-18","05-19","05-20","05-21","05-22"]
                    },
                    yAxis: {
                        axisLine:{
                            lineStyle:{
                                color:'#979797'
                            }
                        },
                    },
                    series: [{
                        name: this.name,
                        type: 'bar',
                        color: "#52baf8",   
                        barWidth: '40%',            
                        itemStyle:{
                            normal:{
                                lineStyle:{
                                    width:3,
                                }
                            }
                        },
                        data: [5, 20, 36, 10, 10, 20, 16],
                    }]
                });

                rankChart2.setOption({
                    grid:{
                        x:70,
                        y:50,
                        x2:70,
                        y2:50,
                        borderWidth:1
                    },
                    backgroundColor: 'white',
                    legend: {
                        right: '5%',
                    },
                    tooltip: {},
                    xAxis: {
                        axisLine:{
                            lineStyle:{
                                color:'#979797'
                            }
                        },
                        data: ["05-16","05-17","05-18","05-19","05-20","05-21","05-22"]
                    },
                    yAxis: {
                        axisLine:{
                            lineStyle:{
                                color:'#979797'
                            }
                        },
                    },
                    series: [{
                        name: this.name,
                        type: 'bar',
                        color: "#52baf8",   
                        barWidth: '40%',            
                        itemStyle:{
                            normal:{
                                lineStyle:{
                                    width:3,
                                }
                            }
                        },
                        data: [5, 20, 36, 10, 10, 20, 16],
                    }]
                });

                return { myChart: myChart, rankChart: rankChart, rankChart2: rankChart2}
            }   
        },


        mounted () {
            // make charts adaptive to the window size
            let echarts = this.drawCharts()
            this.chart1 = echarts.myChart
            this.chart2 = echarts.rankChart
            this.chart3 = echarts.rankChart2
            window.onresize = () => {
                this.chart1.resize()
                this.chart2.resize()
                this.chart3.resize()

            }
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
        /* display: inline-block;  */
        float: left; 
        color: #979797; 
        font-size: 14px; 
        font-weight: bold; 
        margin-top: 7px;
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
