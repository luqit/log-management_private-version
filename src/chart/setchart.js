export const setchart1 = {

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
    xAxis: {
        axisLine:{
            lineStyle:{
                color:'#979797'
            }
        },
    },

    yAxis: {
        axisLine:{
            lineStyle:{
                color:'#979797'
            }
        },
    },

    series: [{
        name: '111',
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
        // data: [5, 20, 36, 10, 10, 20],
        markPoint: {
        data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
        ]
        },
    }]

}