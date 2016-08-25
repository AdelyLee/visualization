Chart.drawGaugeChart =function(option) {
    var series = [];
    var seriesDefaults = {
        name:'',
        type:'gauge',
        data: []
    };
    for (var i = 0; i < option.series.length; i++) {
        series.push($.extend(true, {}, seriesDefaults, option.series[i]));
    }
    var defaults = {
        theme:Chart.Setting.theme,
        tooltip: {
            formatter: "{a} <br/>{b} : {c}%",
            position: function (p) {
                // 位置回调
                // console.log && console.log(p);
                return [p[0] - 100, p[1] - 70];
            },
        },
        data:[],
        series: series
    };
    //defaults.series = series;
    //如果Y轴是水平的
    //$.extend(true, defaults, option);
    Chart.Setting.extend(defaults,option);
    //处理图表类型切换
    Chart.Setting.setChartTypes(defaults);
    require(['echarts', 'echarts/theme/' + defaults.theme,
            'echarts/chart/gauge'
        ],
        function (ec, theme) {
            Chart.Setting.setEventAndOption(ec,theme,defaults);
        });

}
