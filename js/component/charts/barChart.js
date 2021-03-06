Chart.drawBarChart =function(option) {
    var series = [];
    var seriesDefaults = {
        name: '',
        type: 'bar',
        stack: '总量',
        itemStyle: {
            normal: {label: {show: false, position: 'insideTop'}},
        },
        barWidth: 7,
        data: []
    };
    for (var i = 0; i < option.series.length; i++) {
        series.push($.extend(true, {}, seriesDefaults, option.series[i]));
    }
    var yAxis = [];
    var yAxisDefaults = {
        type: 'value',
        axisLine: { // 轴线
            show: true,
            lineStyle: {
                color: '#1e90ff',
                type: 'solid',
                width: 2
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        },
        splitLine: {show: false}
    };
    for (var i = 0; i < option.yAxis.length; i++) {
        yAxis.push($.extend(true, {}, yAxisDefaults, option.yAxis[i]));
    }
    var xAxis = [];
    var xAxisDefaults = {
        type: 'category',
        axisLine: { // 轴线
            show: true,
            lineStyle: {
                color: '#1e90ff',
                type: 'solid',
                width: 2
            }
        },
        axisLabel: {
            rotate: 35,
            textStyle: {
                color: '#fff',
                fontSize: 15
            }
        }, data: []
    };
    for (var i = 0; i < option.xAxis.length; i++) {
        xAxis.push($.extend(true, {}, xAxisDefaults, option.xAxis[i]));
    }
    var defaults = {
        theme:Chart.Setting.theme,
        title: {
            text: '柱状图',
            textStyle: {color: '#fff'}
        },
        tooltip: {
            trigger: 'item',
            position: function (p) {
                // 位置回调
                // console.log && console.log(p);
                return [p[0] - 100, p[1] - 70];
            },
        },
        legend: {
            data: [],
            x:'right',
            textStyle: {
                color: '#fff'
            }
        },
        yAxis: yAxis,
        xAxis: xAxis,
        grid: {
            x2: 15,
            y2: 90
        },
        series: series
    };
    Chart.Setting.extend(defaults,option);
    //如果Y轴是水平的
    if (defaults.isHorizontal) {
        var xAxisTemp = defaults.xAxis;
        defaults.xAxis = defaults.yAxis;
        defaults.yAxis = xAxisTemp;
    }
    //处理图表类型切换
    Chart.Setting.setChartTypes(defaults);
    require(['echarts', 'echarts/theme/' + defaults.theme,
            'echarts/chart/bar'
        ],
        function (ec, theme) {
            Chart.Setting.setEventAndOption(ec,theme,defaults);
        });

}
