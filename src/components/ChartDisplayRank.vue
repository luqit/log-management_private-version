<template>
    <div id="container1">
        <div style="background-color: #fbfbfb; border-bottom: 1px solid #e8e8e8; height: 52px; padding: 10px 50px;">
            <div style="display: inline-block; float: left; color: #979797; font-size: 14px; font-weight: bold; margin-top: 5px;">输入字数总量统计</div>
            <div style="float: right;">
                <Button type="primary">刷新</Button>
                <Button>列表详情</Button>
            </div>
        </div>
         <div id="rankChart" :style="{width: '100%', height: '300px'}"></div>
    </div>
</template>

<script>
    export default {
        name: 'rankChart',

        mounted () {
            let rankChart = this.$echarts.init(document.getElementById('rankChart'))
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
                        // borderColor: 'white',
                        // borderWidth: 3,
                        // shadowColor: 'rgba(0, 0, 0, 0.2)',
                        // shadowBlur: 5,
                        lineStyle:{
                            width:3,
                        }
                    }
                },
                data: [5, 20, 36, 10, 10, 20, 16],
            }]
        });
        // window.onresize = rankChart.resize;
        },

        data(){
            return {
                name: '输入字数数量'
            }
        },
}
</script>

<style scoped>
    #container1 {
        background: white;
        margin-top: 14px;
        max-width: 1535px;
        box-shadow:0 0 10px #dfdfdf;
        display: block;
    }
    #rankChart {
       width: 100%;
    }
</style>
