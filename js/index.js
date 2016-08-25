var gridster;
var item_count = 0;
$(function() {
	gridster = $(".gridster ul").gridster({
		widget_base_dimensions: [50, 50],
		widget_margins: [5, 5],
		autogrow_cols: true,
		draggable: {
			handle: 'drag'
		},
	}).data('gridster');
	
});

function displaySettings(item) {
	Component.settings.displaySettings(item);
}

function hideSettings(item) {
	$(item).find(".setting").css("display", "none");
}

function deleteGrid(item) {
	if (!confirm("确认要删除？")) {
		window.event.returnValue = false;
	} else {
		gridster.remove_widget($(item).parent().parent());
	}
}

function addGrid(chartType) {
	var serialization = {
		col: 1,
		row: 1,
		size_x: 8,
		size_y: 6
	};

	item_count++;
	var itemNode = '<li' + ' id="grid_item_' + item_count + '" onmouseover="displaySettings(this)" onmouseout="hideSettings(this)"><div class="setting" style="display: none;"><drag class="btn"><i class="glyphicon glyphicon-move"></i>拖动</drag><span class="btn" onclick="showSettingsBox()">设置</span><span class="btn delete" onclick="deleteGrid(this)">删除</span></div></li>';
	gridster.add_widget(itemNode, serialization.size_x, serialization.size_y, serialization.col, serialization.row);

	var $item = $("#grid_item_" + item_count);

	addChart($item, chartType);
}

function addChart(item, chartType) {
	$(item).append('<div id="chart_' + item_count + '" style="width: 100%; height: 100%;"></div>');
	var option = {};
	if (chartType == 'line_base') {
		var lineOption = {
			backgroundColor: 'red',
			title: {
				text: "未来一周气温变化",
				subtext: "纯属虚构"
			},
			tooltip: {
				trigger: "axis"
			},
			legend: {
				data: ["最高气温", "最低气温"]
			},
			toolbox: {
				show: true,
				feature: {
					mark: {
						show: true
					},
					dataView: {
						show: true,
						readOnly: true
					},
					magicType: {
						show: false,
						type: ["line", "bar"]
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			calculable: true,
			xAxis: [{
				type: "category",
				boundaryGap: false,
				data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
			}],
			yAxis: [{
				type: "value",
				name: "°C"
			}],
			series: [{
				name: "最高气温",
				type: "line",
				data: [11, 11, 15, 13, 12, 13, 10]
			}, {
				name: "最低气温",
				type: "line",
				data: [1, -2, 2, 5, 3, 2, 0]
			}]
		};
		lineOption.container = $('#chart_' + item_count)[0];
		option = lineOption;
	} else if (chartType == 'line_area_base') {
		var lineOption = {
			title: {
				text: "某楼盘销售情况",
				subtext: "纯属虚构"
			},
			tooltip: {
				trigger: "axis"
			},
			legend: {
				data: ["意向", "预购", "成交"]
			},
			toolbox: {
				show: true,
				feature: {
					mark: {
						show: true
					},
					dataView: {
						show: true,
						readOnly: true
					},
					magicType: {
						show: false,
						type: ["line", "bar", "stack", "tiled"]
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			calculable: true,
			xAxis: [{
				type: "category",
				boundaryGap: false,
				data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
			}],
			yAxis: [{
				type: "value"
			}],
			series: [{
				name: "成交",
				type: "line",
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: "default"
						}
					}
				},
				data: [10, 12, 21, 54, 260, 830, 710]
			}, {
				name: "预购",
				type: "line",
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: "default"
						}
					}
				},
				data: [30, 182, 434, 791, 390, 30, 10]
			}, {
				name: "意向",
				type: "line",
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: "default"
						}
					}
				},
				data: [1320, 1132, 601, 234, 120, 90, 20]
			}]
		};
		lineOption.container = $('#chart_' + item_count)[0];
		option = lineOption;
	}

	Chart.drawLineChart(lineOption);
}


function showSettingsBox(){
	$("#settingBox").css("display", "");
}

function closeSettingsBox(){
	$("#settingBox").css("display", "none");
}

