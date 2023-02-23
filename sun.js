var data = dataFromJSON.data;

var chartDom = document.getElementById('fig');
var myChart = echarts.init(chartDom);
window.onresize = function() {
    myChart.resize();
};
var option;

var array1_1 = [], array1_2 = [];
var typearray1 = [], typearray2 = [];
var gradearray1 = [], gradearray2 = [];
var gradecount1 = [], gradecount2 = [];
var data0 = [];

const colors = ["#3fb1e3",
            "#96dee8",
            "#c4ebad",
            "#6be6c1",
            "#626c91",
            "#a0a7e6",
            ];
const bgColor = "#000";
const itemStyle = {
  star5: {
    color: "rgb(5,41,99)"//"#516b91"//colors[0]
  },
  star4: {
    color: "#3fb1e3"//colors[1]
  },
  star3: {
    color: "#edafda"//colors[2]
  },
  star2: {
    color: "#cbb0e3"//colors[3]
  }
};

function SplitDemo(s){
  var ss = [];
  ss = s.split("/");
  return(ss);
}

function draw(data) {
    //console.log("start");
    for (var i = 0; i < data.length; i++) {
        var tmp8 = [], tmp9 = [], tmp = [];
        var ind;
        var typetmp = [];
        typetmp = SplitDemo(data[i].type);
        var name = data[i].name + "";
		var sname = name.split(" ");
		data[i].name = sname[0];
        var it = 0;
        var itt = 0;

        if (data[i].date < "2000-01-01") //20世纪的电影
        //if (data[i].date < 2000)
        {
            tmp8 = []; tmp9 = []; tmp = [];
            if (typearray1.indexOf(typetmp[it]) == -1) {
                typearray1.push(typetmp[it]);
                if (data[i].score < 9) {
                    tmp8.push({ name: data[i].name });
                    gradecount1.push([1, 0]);
                }
                else {
                    tmp9.push({ name: data[i].name });
                    gradecount1.push([0, 1]);
                }
                tmp = [tmp8, tmp9];
                gradearray1.push(tmp);
            }
            else //已有的类型
            {
                ind = typearray1.indexOf(typetmp[it]);
                if (data[i].score < 9) {
                    gradearray1[ind][0].push({ name: data[i].name });
                    gradecount1[ind][0]++;
                }
                else {
                    gradearray1[ind][1].push({ name: data[i].name });
                    gradecount1[ind][1]++;
                }
            }
            //}
        }
        else //21世纪的电影
        {
            tmp8 = []; tmp9 = []; tmp = [];
            //if (!(data[i]['Type'] in typearray2)) //新的类型
            if (typearray2.indexOf(typetmp[itt]) == -1) {
                typearray2.push(typetmp[itt]);
                if (data[i].score < 9) {
                    tmp8.push({ name: data[i].name });
                    gradecount2.push([1, 0]);
                }
                else {
                    tmp9.push({ name: data[i].name });
                    gradecount2.push([0, 1]);
                }
                tmp = [tmp8, tmp9];
                gradearray2.push(tmp);
            }
            else //已有的类型
            {
                ind = typearray2.indexOf(typetmp[itt]);
                if (data[i].score < 9) {
                    gradearray2[ind][0].push({ name: data[i].name });
                    gradecount2[ind][0]++;
                }
                else {
                    gradearray2[ind][1].push({ name: data[i].name });
                    gradecount2[ind][1]++;
                }
            }
            //}
        }
    }

    var t = {}, t1 = []; //,t8 = {},t9 = {};
    for (var i = 0; i < typearray1.length; i++) {
        if (gradecount1[i][0] != 0 && gradecount1[i][1] != 0)
            t1 = [{ name: '8', children: gradearray1[i][0] },
            { name: '9', children: gradearray1[i][1] }];
        else {
            if (gradecount1[i][1] == 0)
                t1 = [{ name: '8', children: gradearray1[i][0] }];
            else if (gradecount1[i][0] == 0)
                t1 = [{ name: '9', children: gradearray1[i][1] }];
        }
        t = { name: typearray1[i], children: t1 };
        array1_1.push(t);
    }
    for (var i = 0; i < typearray2.length; i++) {
        if (gradecount2[i][0] != 0 && gradecount2[i][1] != 0)
            t1 = [{ name: '8', children: gradearray2[i][0] },
            { name: '9', children: gradearray2[i][1] }];
        else {
            if (gradecount2[i][1] == 0)
                t1 = [{ name: '8', children: gradearray2[i][0] }];
            else if (gradecount2[i][0] == 0)
                t1 = [{ name: '9', children: gradearray2[i][1] }];
        }
        t = { name: typearray2[i], children: t1 };
        array1_2.push(t);
    }

    data0 = [
        {
            name: '20世纪',
            itemStyle: {
                color: "rgb(230,249,251)"
            },
            children: array1_1
        },
        {
            name: '21世纪',
            itemStyle: {
                color: "#ccffff"
            },
            children: array1_2
        }
    ];
    for (let j = 0; j < data0.length; ++j) {
        let level1 = data0[j].children;
        for (let i = 0; i < level1.length; ++i) {
            let block = level1[i].children;
            let bookScore = [];
            let bookScoreId;
            for (let star = 0; star < block.length; ++star) {
                let style = (function (name) {
                    switch (name) {
                        case '9':
                            bookScoreId = 0;
                            return itemStyle.star5;
                        case '8':
                            bookScoreId = 1;
                            return itemStyle.star4;
                        case '7':
                            bookScoreId = 2;
                            return itemStyle.star3;
                        case '6':
                            bookScoreId = 3;
                            return itemStyle.star2;
                    }
                })(block[star].name);
                block[star].label = {
                    color: style.color,
                    downplay: {
                        opacity: 0.5
                    }
                };
                if (block[star].children) {
                    style = {
                        opacity: 1,
                        color: style.color
                    };
                    block[star].children.forEach(function (book) {
                        book.value = 1;
                        book.itemStyle = style;
                        book.label = {
                            color: style.color
                        };
                        let value = 1;
                        if (bookScoreId === 0 || bookScoreId === 3) {
                            value = 5;
                        }
                        if (bookScore[bookScoreId]) {
                            bookScore[bookScoreId].value += value;
                        } else {
                            bookScore[bookScoreId] = {
                                color: colors[bookScoreId],
                                value: value
                            };
                        }
                    });
                }
            }
            level1[i].itemStyle = {
                color: data0[j].itemStyle.color
            };
        }
    }
}
    draw(data);
    option && myChart.setOption(option);
    option = {
        backgroundColor: "rgba(255,255,252,0)",
        color: colors,
        series: [
            {
                type: 'sunburst',
                data: data0,
                center: ['50%', '50%'],
                sort: function (a, b) {
                    if (a.depth === 1) {
                        return b.getValue() - a.getValue();
                    } else {
                        return a.dataIndex - b.dataIndex;
                    }
                },
                toolbox: {
                    feature: {
                      saveAsImage: {}
                    }
                },
                label: { //圈内名称
                    rotate: 'radial',
                    color: bgColor,
                    fontSize: 2
                },
                itemStyle: {
                    borderColor: bgColor,
                    borderWidth: 2,
                    color: "#a5e7f0",
                    borderTpye:"solid"
                },
                levels: [
                    {},
                    {
                        r0: 0,
                        r: 120,
                        label: { //最内层
                            rotate: 'tangential',
                            fontSize: 15,
                            color: bgColor
                        }
                    },
                    {//类型
                        r0:120,
                        r: 240,
                        itemStyle: {
                            shadowBlur: 0,
                            shadowColor: bgColor,
                            color: "#a5e7f0"
                            //shadowColor: colors[0],
                            //color: 'transparent'
                        },
                        label: {
                            //rotate: 0,
                            fontSize: 15,
                            minAngle: 5,
                            color: bgColor
                        }
                    },
                    {//分数
                        r0: 240,
                        r: 300,                     
                        label: {
                            //position:  
                            //align = 'right',
                            rotate: 'tangential',
                            fontSize: 20,
                            color: bgColor
                        }
                    },
                    {
                        r0: 300,
                        r: 320,
                        itemStyle: {
                            //shadowBlur: 80,
                            shadowColor: bgColor
                            //shadowColor: colors[0]
                        },
                        label: { //最外层
                            position: 'outside',
                            fontSize: 12,
                            color: bgColor
                        },
                        downplay: {
                            label: {
                                opacity: 0.5,
                                fontSize: 6,
                                color: bgColor
                            }
                        }
                    }
                ]
            }
        ]
    };

option && myChart.setOption(option);
