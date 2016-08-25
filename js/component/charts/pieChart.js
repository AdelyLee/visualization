Chart.drawPieChart = function (option) {
    var series = [];
    var seriesDefaults = {
        name: '',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, 100],
        // for funnel
        x: '20%',
        width: '40%',
        funnelAlign: 'right',
        //max: 1548,
        itemStyle: {
            normal: {
                label: {
                    //position : 'inner',
                    textStyle: {
                        color: '#fff',
                        fontSize: 16
                    },
                    show: true
                },
                labelLine: {
                    show: true
                }
            }
        },
        data: []
    };
    for (var i = 0; i < option.series.length; i++) {
        series.push($.extend(true, {}, seriesDefaults, option.series[i]));
    }
    var defaults = {
        title: {
            text: '',
            textStyle: {color: '#fff'}
        },
        theme: Chart.Setting.theme,
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)",
            position: function (p) {
                // 位置回调
                // console.log && console.log(p);
                return [p[0] - 100, p[1] - 70];
            },
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            data: [],
            textStyle: {
                color: '#fff'
            }
        },
        calculable: false,
        series: series
    };
    Chart.Setting.extend(defaults, option);
    //处理图表类型切换
    Chart.Setting.setChartTypes(defaults);
    require(['echarts', 'echarts/theme/' + defaults.theme,
            'echarts/chart/pie'
        ],
        function (ec, theme) {
            Chart.Setting.setEventAndOption(ec, theme, defaults);
        });

}
