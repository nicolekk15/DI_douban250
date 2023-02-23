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
var year = new Array();
var type = new Array();
var score = new Array();
for (var i = 0; i < data1.length; i++) {
	var y = data1[i].date.slice(0, 1);
	var t = data1[i].type.slice(0, 2);
	//var s = data1[i].score;
	if (ifin(y, year) == 0) {
		year.push(y);
	}
	if (ifin(t, type) == 0) {
		type.push(t);
	}
	// if (ifin(s, score) == 0) {
	// 	score.push(s);
	// }
}
score.push(8);
score.push(9);
var obj1 = new Object();

obj1.name = "豆瓣电影";
var C1 = new Array();
obj1.children = C1;
for (var i = 0; i < year.length; i++) {
	var obj2 = new Object();
	var C2 = new Array();
	if (year[i] == '1') obj2.name = "20世纪";
	if (year[i] == '2') obj2.name = "21世纪";
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

var cot1 = new Array();
for (var i = 0; i < year.length; i++) {
	var cot2 = new Array();
	for (var j = 0; j < type.length; j++) {
		var cot3 = new Array();
		for (var k = 0; k <score.length; k++){
			var z = 0;
			cot3.push(z);
		} 
		cot2.push(cot3);
	}
	cot1.push(cot2);
}
//console.log(cot1);
for (var i = 0; i < data1.length; i++) {
	var obj = new Object();
	var name = data1[i].name + "";
	var sname = name.split(" ");
	obj.name = sname[0];
	var y = data1[i].date.slice(0, 1);
	var t = data1[i].type.slice(0, 2);
	var s = data1[i].score;
	var yi = findindex(y, year);
	var ti = findindex(t, type);
	//var si = findindex(s, score);
    if(s >=8 && s<9)
    {
	    obj1.children[yi].children[ti].children[0].children.push(obj);
        cot1[yi][ti][0]+=1;
    }
    else{
        obj1.children[yi].children[ti].children[1].children.push(obj);
        cot1[yi][ti][1]+=1;
    }
}
//console.log(cot1[0][1][2]);
for (var i = 0; i < data1.length; i++) {
    var obj = new Object();
	var name = data1[i].name + "";
	var sname = name.split(" ");
	obj.name = sname[0];
	var y = data1[i].date.slice(0, 1);
	var t = data1[i].type.slice(0, 2);
	var s = data1[i].score;
	var yi = findindex(y, year);
	var ti = findindex(t, type);
	//var si = findindex(s, score);
	obj1.children[yi].children[ti].children[0].value = cot1[yi][ti][0];
    obj1.children[yi].children[ti].children[1].value = cot1[yi][ti][1];
    //console.log(obj1.children[yi].children[ti].children[0].value,obj1.children[yi].children[ti].children[1].value);
}

for (var i = year.length - 1; i >= 0; i--) {
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

var Rdom = document.getElementById("mapsun");
var myRtChart = echarts.init(Rdom);
var option;
myRtChart.showLoading();
myRtChart.hideLoading();
myRtChart.setOption(
	(
        option = {
		    tooltip: {
			    trigger: 'item',
			    triggerOn: 'mousemove'
		    },
			toolbox: {
				feature: {
				  saveAsImage: {}
				}
			},
             visualMap: {
                type: 'continuous',
                min: 0,
                max: 180,
                inRange: {
                color: ['#2F93C8', '#AEC48F', '#FFDB5C', '#F98862']
                }
            },
		    series: [
			{
				type: 'sunburst',
                data: [obj1],
                radius: [0, '98%'],
                label: {
                    rotate: 'radial'
				},
				emphasis: {
					focus: 'descendant'
				}
			}
		]
	})
);
option && myRtChart.setOption(option);

