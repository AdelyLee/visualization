Chart.drawMapChart = function (option) {
    var defaults = {
        title: {
            text: '',
            x: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: [],
            textStyle: {
                color: '#fff'
            }
        },
        dataRange: {
            min: 0,
            max: 500,
            calculable: true,
            //color: ['maroon','purple','red','orange','yellow','lightgreen'],
            textStyle: {
                color: '#fff'
            }
        },
        series: [
            {
                name: '',
                type: 'map',
                mapType: 'china',
                hoverable: false,
                roam: true,
                data: [],
                itemStyle: {
                    normal: {
                            borderColor: 'rgba(100,149,237,1)',
                        borderWidth: 0.5,
                        areaStyle: {
                            color: 'rgba(18, 111, 184, 0.39)'
                        }
                    }
                },
                markPoint: {
                    symbolSize: 5,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                    itemStyle: {
                        normal: {
                            borderColor: '#87cefa',
                            borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                            label: {
                                show: false
                            }
                        },
                        emphasis: {
                            borderColor: '#1e90ff',
                            borderWidth: 5,
                            label: {
                                show: false
                            }
                        }
                    },
                    data: []
                },
                geoCoord: {}
            }
        ]
    };
    Chart.Setting.extend(defaults, option);
    require(['echarts', 'echarts/chart/map'], function (ec, theme) {
    	debugger;
        Chart.Setting.setEventAndOption(ec, theme, defaults);
    });

}
