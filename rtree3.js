function ifin(s, list) {
	for (var i = 0; i < list.length; i++) {
		if (s == list[i]) return 1;
	}
	return 0;
}
function findindex(s, list) {
	for (var i = 0; i < list.length; i++) {
		if (s == list[i]) return i;
	}
	return -1;
}
var data1 = dataFromJSON.data;
var lan = new Array();
var type = new Array();
var score = new Array();
for (var i = 0; i < data1.length; i++) {
	var l = data1[i].language;
    var lar = l.split("/");
    for(var j = 0; j < lar.length; j++) {
        if (ifin(lar[j], lan) == 0 ) {
            lan.push(lar[j]);
        }
    }
	var t = data1[i].type.slice(0, 2);
	var s = data1[i].score;
	if (ifin(t, type) == 0) {
		type.push(t);
	}
	if (ifin(s, score) == 0) {
		score.push(s);
	}
}
var obj1 = new Object();
obj1.name = "语言";
var C1 = new Array();
obj1.children = C1;
for (var i = 0; i < lan.length; i++) {
	var obj2 = new Object();
	var C2 = new Array();
    obj2.name = lan[i];
	for (var j = 0; j < type.length; j++) {
		var obj3 = new Object();
		var C3 = new Array();
		obj3.name = type[j];
		for (var k = 0; k < score.length; k++) {
			var obj4 = new Object();
			var C4 = new Array();
			obj4.name = score[k];
			obj4.children = C4;
			C3.push(obj4);

		}
		obj3.children = C3;
		C2.push(obj3);
	}
	obj2.children = C2;
	C1.push(obj2);
}
for (var i = 0; i < data1.length; i++) {
	var obj = new Object();
	var name = data1[i].name + "";
	var sname = name.split(" ");
	obj.name = sname[0];
	var l = data1[i].language.split("/");
	var t = data1[i].type.slice(0, 2);
	var s = data1[i].score;
	var ti = findindex(t, type);
	var si = findindex(s, score);
    for(var j = 0; j<l.length; j++){
        var li = findindex(l[j], lan);
        obj1.children[li].children[ti].children[si].children.push(obj);
    }
}
for (var i = lan.length - 1; i >= 0; i--) {
	for (var j = type.length - 1; j >= 0; j--) {
		for (var k = score.length - 1; k >= 0; k--) {
			if (obj1.children[i].children[j].children[k].children.length == 0) {
				obj1.children[i].children[j].children.splice(k, 1);
			}
		}
		if (obj1.children[i].children[j].children.length == 0) {
			obj1.children[i].children.splice(j, 1);
		}
	}
	if (obj1.children[i].children.length == 0) {
		obj1.children.splice(i, 1);
	}
}
var Rdom = document.getElementById("chart-tree3");
var myRtChart = echarts.init(Rdom);
var option;
myRtChart.showLoading();
myRtChart.hideLoading();
myRtChart.setOption(
	(option = {
		tooltip: {
			trigger: 'item',
			triggerOn: 'mousemove'
		},
		toolbox: {
			feature: {
			  saveAsImage: {}
			}
		},
		series: [
			{
				type: 'tree',
				data: [obj1],
				top: '5%',
				bottom: '5%',
				layout: 'radial',
				symbol: 'emptyCircle',
				symbolSize: 10,
				initialTreeDepth: 1,
				animationDurationUpdate: 750,
				itemStyle: {
					borderColor: '#0053a6',
					borderWidth: 3,
					borderType: 'solid',
					//shadowColor: 'rgba(0, 0, 0, 0.5)',
					//shadowBlur: 6
				},
				label: {
					show: true,
					color: '#003371',
					fontWeight: 1000,
					fontSize: 15
                },
				emphasis: {
					focus: 'descendant'
				}
			}
		]
	})
);
option && myRtChart.setOption(option);