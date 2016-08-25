var Component = function() {};

Component.gridster = function() {
	var gridster = $(".gridster ul").gridster({
		widget_base_dimensions: [50, 50],
		widget_margins: [5, 5],
		autogrow_cols: true,
	}).data('gridster');

	return gridster;
}

Component.gridster.setDraggable = function(lable) {
	var draggable = {
		handle: lable
	};
	Component.gridster.draggable = draggable;
}

Component.Chart = function(){};
Component.Chart.option = function(){};
Component.settings = function(){};

Component.settings.displaySettings = function(item){
	$(item).find(".setting").css("display", "");
}

Component.settings.displaySettings = function(item){
	$(item).find(".setting").css("display", "");
}
