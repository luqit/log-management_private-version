<template>
    <div id="container">
        <div>
            <Button>刷新</Button>
            <Button>列表详情</Button>
        </div>
        <div id="myChart" :style="{width: '1535px', height: '300px'}"></div>
    </div>
</template>

<script>
    export default {
        name: 'chart',

        mounted () {
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            myChart.setOption({
            backgroundColor: 'white',
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20],
                markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
                },
            }]
        });
        }
}
</script>

<style scoped>
    #container {
        background: white;
        margin-top: 14px;
        width: 100%;
    }
    #myChart {
       width: 100%;
    }
</style>
