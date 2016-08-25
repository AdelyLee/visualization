$(function(){
	require.config({
		packages : [ {
			name : 'echarts',
			location : ctx + '/resources/js/echarts/dist/',
			main : 'echarts'
		} ]
	});
});
function setEmotionOption(myChart, polarityPosProbability,
		polariytNegProbability) {
	var option = {
		tooltip : {
			formatter : "{a} <br/>{b} : {c}"
		},
		toolbox : {
			show : true,
			feature : {
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},
		series : [ {
			name : '情感指数',
			type : 'gauge',
			center : [ '50%', '80%' ],
			radius : 150,
			startAngle : 180,
			endAngle : 0,
			splitNumber : 10, // 分割段数，默认为5
			axisLine : { // 坐标轴线
				lineStyle : { // 属性lineStyle控制线条样式
					color : [ [ 0.5, '#ff4500' ], [ 1, '#228b22' ] ],
					width : 8
				}
			},
			axisTick : { // 坐标轴小标记
				splitNumber : 10, // 每份split细分多少段
				length : 12, // 属性length控制线长
				lineStyle : { // 属性lineStyle控制线条样式
					color : 'auto'
				}
			},
			axisLabel : { // 坐标轴文本标签，详见axis.axisLabel
				textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					color : 'auto'
				},
				formatter : function(v) {
					switch (v + '') {
					case '20':
						return '负面';
					case '80':
						return '正面';
					default:
						return '';
					}
				}
			},
			splitLine : { // 分隔线
				show : true, // 默认显示，属性show控制显示与否
				length : 20, // 属性length控制线长
				lineStyle : { // 属性lineStyle（详见lineStyle）控制线条样式
					color : 'auto'
				}
			},
			pointer : {
				width : 5
			},
			title : {
				show : true,
				offsetCenter : [ 0, '-60%' ], // x, y，单位px
				textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					fontWeight : 'bolder',
					color:"#fff",
				}
			},
			detail : {
				formatter : '{value}',
				offsetCenter : [ 0, '-30%' ],
				textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					color : 'auto',
					fontWeight : 'bolder',
					fontSize : 40
				}

			},
			data : [ {
				value : (polarityPosProbability * 100).toFixed(2),
				name : '情感指数'
			} ]
		} ]
	};

	myChart.setOption(option, true);
	myChart.hideLoading();
}

function getEmotion(data, divId, type) {
	require([ 'echarts', 'echarts/theme/default', 'echarts/chart/gauge' // 按需加载所需图表
	], function(ec, theme) {
		var myChart = ec.init(document.getElementById(divId), theme);
		$("#" + divId).showLoading();
		if(data.handleFlag !=0 && data.handleFlag != undefined){
			$('#' + divId).hideLoading();
			var pos = data.posValue;
			var nes = data.negValue;
			setEmotionOption(myChart, pos, nes);
			if (pos > nes) {
				emotion = '正面';
			} else {
				emotion = '负面';
			}
		}else{
			$.ajax({
				type : "post",
				async : true,
				timeout:12000,//12秒超时
				url : ContextUtil.webservice_solr + '/sentiment/getSentiment.json',
				data : {
					content : data.content,
					id:data.id
				},
				success : function(data) {
					$('#' + divId).hideLoading();
					var pos = data.posValue;
					var nes = data.negValue;
					setEmotionOption(myChart, pos, nes);
					if (pos > nes) {
						emotion = '正面';
					} else {
						emotion = '负面';
					}
				},
				error : function(XMLHttpRequest) {
					$('#' + divId).hideLoading();
					function rd(n,m){
						var c = m-n+1;
						return Math.floor(Math.random() * c + n);
					}
					var n = 40;
					var m = 50;
					var num = (rd(n,m))/100;
					setEmotionOption(myChart, num, 1 - num);

					return;
					$('#' + divId).msg({
						type : 'danger',
						text : XMLHttpRequest.responseText
					});
				}
			});
		}

	});
};