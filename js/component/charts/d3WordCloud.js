//画关键词云图
function drawCloudGrap(data, divId) {
	$("#" + divId).empty();
	var height = $("#" + divId).height();
	var width = $("#" + divId).width();
	var fill = d3.scale.category20();
	var scale = d3.scale.linear().domain(
			[ 0, data[0].score / 3, data[0].score ]).range([ 10, 20, 50 ]);

	d3.layout.cloud().size([ width, height ]).words(data.map(function(d) {
		return {
			text : d.keyword,
			size : scale(d.score)
		};
	})).padding(2).rotate(function() {
		return ~~(Math.random() * 2) * 90;
	}).font("Impact").fontSize(function(d) {
		return d.size;
	}).on("end", draw).stop(150).start();

	function draw(words) {
		d3.select('#' + divId).append("svg").attr("width", '100%').attr(
				"height", '100%').style("border-radius", width + "px").append(
				"g").attr("transform",
				"translate(" + width / 2 + "," + height / 2 + ")").selectAll(
				"text").data(words).enter().append("text").style("font-size",
				function(d) {
					return d.size + "px";
				}).style("font-family", "黑体").style("fill", function(d, i) {
			return fill(i);
		}).attr("text-anchor", "middle").attr("transform", function(d) {
			return "translate(" + [ d.x, d.y ] + ")rotate(" + d.rotate + ")";
		}).text(function(d) {
			return d.text;
		});
	}
}
// 获取关键词
function getKeyWords(content, divId, kw_num) {
	$('#' + divId).showLoading();
	$.ajax({
		type : "post",
		async : true,
		url : ctx + '/fenci/getKeyword.json',
		data : {
			content : content,
			kw_num : kw_num
		},
		success : function(data) {
			$('#' + divId).hideLoading();
			drawCloudGrap(data, divId);
		}
	});
}