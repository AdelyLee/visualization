Chart.drawFunnelChart =function(option) {
    var series = [];
    var seriesDefaults = {
        name:'',
        type:'funnel',
        data: []
    };
    for (var i = 0; i < option.series.length; i++) {
        series.push($.extend(true, {}, seriesDefaults, option.series[i]));
    }
    var defaults = {
        theme:Chart.Setting.theme,
        title : {
            text: '漏斗图',
            textStyle: {color: '#fff'}
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%",
        },
        legend: {
            data: [],
            x:'right',
            textStyle: {
                color: '#fff'
            }
        },
        series: series
    };
    //defaults.series = series;
    //如果Y轴是水平的
    //$.extend(true, defaults, option);
    Chart.Setting.extend(defaults,option);
    //处理图表类型切换
    Chart.Setting.setChartTypes(defaults);
    require(['echarts', 'echarts/theme/' + defaults.theme,
            'echarts/chart/funnel'
        ],
        function (ec, theme) {
            Chart.Setting.setEventAndOption(ec,theme,defaults);
        });

}
