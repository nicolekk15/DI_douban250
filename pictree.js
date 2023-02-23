var data = dataFromJSON0.data;
var myChart = echarts.init(document.getElementById("stacked-charts1")); 
var echartJson ={
	"series":[
		{
			"edgeLabel":{
				"normal":{
					"formatter":"{c}",
					//"show":true,//是否显示枝干上的关系文字
				}
			},
			//"edgeSymbol":"arrow",//circle,arrow//线两边显示箭头或圆
			"force":{
				"repulsion":200,//枝干线的长短 
				'edgeLength':40
			},
			"layout":"force",
			
			"roam":true,
			"itemStyle":{
				"normal":{
					"color":'#0e82ad'//文字颜色
				}
			},
			// "label":{
			//     "normal":{
			//         //"show":true,//是否显示文字
			//     }
			// },
			"symbol":"circle",
			"symbolSize":1,
			"type":"graph",
			'lineStyle': {//线的样式
				'normal': {
					'opacity': 1,
					// width: 5,
					curveness: 0,
					'color': '#dcdcdc',
					'type': 'solid'
				}
			},
		}
	],
	"tooltip":{
		"show":false//鼠标经过提示文字
	},
	"toolbox": {
		"feature": {
		  saveAsImage: {}
		}
	},
};
loadEcharts(echartJson);

function loadEcharts(echartJson) {
	var option = echartJson;
	if (option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}
//echarts图表点击跳转
myChart.on('click', function (params) {

	if (params.data.id) {
		var idCard = params.data.link; // 获取被点击节点的身份证号
		alert(idCard);

	} 

});

function SplitDemo(s,sc){
var ss = [];
ss = s.split(sc);
return(ss);
}

function NAME(sn)
{
var sname = [];
sname = SplitDemo(sn," ");
return sname[0];
}


var map = [];
var links = [];




for (var i=0;i<data.length;i++)
{
map.push({
		"name":NAME(data[i].name),
		"symbol":data[i].image,
		"symbolSize":20,
		"id":data[i].ratingnum, 
		"link":"电影名：" + data[i].name + " \n上映时间：" + data[i].date
		+ "\n导演：" + data[i].director + "\n编剧：" + data[i].author 
		+ "\n时长：" + data[i].duration + "\n语言：" + data[i].language + "\n地区：" + data[i].region 
		+ "\n评分：" + data[i].score + "\n类型：" + data[i].type + "\n演员：" + data[i].actor 
	});


if (data[i].date < "2000-01-01") //20世纪的电影
{
	 links.push({
		"source": data[i].ratingnum, //"s" + i,
		"target": "c0"
	 })
}
else
{
	 links.push({
		"source": data[i].ratingnum, //"s" + i,
		"target": "c1"
	 })
}
}

 //关系链数据

pubdata(map);
map.push({                
	"name":"豆瓣电影",
	//"colors":"#112412",
	"symbolSize":150,
	"id":"p0",
 });
 map.push({                
		"name":"20世纪",
		"symbolSize":70,
		"id":"c0",
	});
map.push({                
	"name":"21世纪",
	"symbolSize":70,
	"id":"c1",
 });
links.push({"source":"c0","target":"p0"});
links.push({"source":"c1","target":"p0"});
function getImgData(imgSrc) {

	var fun = function (resolve) {
		const canvas = document.createElement('canvas');
		const contex = canvas.getContext('2d');
		const img = new Image();
		img.crossOrigin = '';

		img.onload = function () {
			//设置图形宽高比例
			center = {
				x: img.width / 2,
				y: img.height / 2
			}
			var diameter = img.width;//半径
			canvas.width = diameter;
			canvas.height = diameter;
			contex.clearRect(0, 0, diameter, diameter);
			contex.save();
			contex.beginPath();
			radius = img.width / 2;
			contex.arc(radius, radius, radius, 0, 2 * Math.PI); //画出圆
			contex.clip(); //裁剪上面的圆形
			contex.drawImage(img, center.x - radius, center.y - radius, diameter, diameter, 0, 0,
				diameter, diameter); // 在刚刚裁剪的园上画图
			contex.restore(); // 还原状态
			resolve(canvas.toDataURL('image/png', 1))
		}
		img.src = imgSrc;
	}

	var promise = new Promise(fun);

	return promise
}

function pubdata(json) {
	var androidMap = json;

	var picList = [];//获取出全部图片
	for (var i = 0; i < androidMap.length; i++) { 
				//把图片路径转成canvas 
		let p = getImgData(androidMap[i].symbol);
		console.log(p);
		picList.push(p); 
	}

	Promise.all(picList).then(function (images) {
		//取出base64 图片 然后赋值到jsondata中
		for (var i = 0; i < images.length; i++) {
			var img = "image://" + images[i];
			console.log(img);
			androidMap[i].symbol = img;
		}

		// 把数据设置到Echart中data
		myChart.setOption({
			series: [{
				data: androidMap,
				links:links
			}]
		})
	})

}