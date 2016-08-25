/**
 * Created by lisen on 2016/6/27.
 * 依赖jquery、echarts
 */
$(function () {
    require.config({
        packages: [{
            name: 'echarts',
            location: ctx + '/js/echarts/dist/',
            main: 'echarts'
        }]
    });
});
var Chart = function(){};
Chart.Setting = function(){};
Chart.Setting.theme = 'infographic';
Chart.Setting.extend = function (defaults,option) {
    $.extend(true, defaults, option);
}
Chart.Setting.setChartTypes = function (defaults) {
    //处理图表类型切换
    if (defaults.toolbox && defaults.toolbox.show && defaults.toolbox.feature.magicType && defaults.toolbox.feature.magicType.show) {
        var chartTypesStr = 'echarts/chart/' + defaults.toolbox.feature.magicType.type.join(',echarts/chart/');
        require(chartTypesStr.split(','));
    }
}
Chart.Setting.setEventAndOption = function (ec, theme, defaults) {
    var myChart = ec.init(defaults.container, theme);
    //绑定事件
    var events = defaults.events;
    if (events != undefined) {
        var ecConfig = require('echarts/config');
        for (var event in events) {
            if (typeof(events[event]) == 'function') {
                myChart.on(event, events[event]);
            }
            if(event == 'mapSelected'){
                myChart.on(ecConfig.EVENT.MAP_SELECTED, events[event]);
            }
        }
    }
    myChart.setOption(defaults);
}
