var chartDom = document.getElementById('chart12');
var myChart = echarts.init(chartDom);
var option;

var array1_1 = [], array1_2 = [];
var typearray1 = [], typearray2 = [];
var gradearray1 = [], gradearray2 = [];
var gradecount1 = [], gradecount2 = [];
var data0 = [];

var data = dataFromJSON.data;
draw(data);

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

function draw(data) {

  for (var i = 0;i < data.length;i++)
  {
    var tmp8 = [],tmp9 = [],tmp = [];
    var ind;
    var typetmp = [];
    typetmp = SplitDemo(data[i].type,"/");
    //typetmp = data[i].type;

    if (data[i].date < "2000-01-01") //20世纪的电影
    {
      //var it = -3;
      //if (!(data[i]['Type'] in typearray1)) //新的类型
      for (var it = 0;it < typetmp.length;it++)
      //while(it+3 < typetmp.length)
      {
        tmp8 = []; tmp9 = []; tmp = [];
        //it += 3;
        //if ( typearray1.indexOf(typetmp.substr(it,2)) == -1 )
        if ( typearray1.indexOf(typetmp[it]) == -1 )
        {
          //typearray1.push(typetmp.substr(it,2));
          typearray1.push(typetmp[it]);
          if (data[i].score < 9) 
          {
            tmp8.push( {name: NAME(data[i].name), value: data[i].score} );
            gradecount1.push( [1,0] );
          }
          else 
          {
            tmp9.push( {name: NAME(data[i].name), value: data[i].score} );
            gradecount1.push( [0,1] );
          }
          tmp = [tmp8,tmp9];
          gradearray1.push(tmp); 
        }
        else //已有的类型
        {
          //ind = typearray1.indexOf(typetmp.substr(it,2));
          ind = typearray1.indexOf(typetmp[it]);
          if (data[i].score < 9) 
          {
            gradearray1[ind][0].push( {name: NAME(data[i].name), value: data[i].score} );
            gradecount1[ind][0]++;
          }
          else
          {
            gradearray1[ind][1].push( {name: NAME(data[i].name), value: data[i].score} );
            gradecount1[ind][1]++;
          }
        }
      }
    }
    else //21世纪的电影
    {
      //tmp8 = []; tmp9 = []; tmp = [];
      //if (!(data[i]['Type'] in typearray2)) //新的类型
      for (var itt = 0;itt < typetmp.length;itt++)
      //var itt = -3;
      //while(itt+3 < typetmp.length)
      {      
        tmp8 = []; tmp9 = []; tmp = [];
        //itt += 3;      
        //if ( typearray2.indexOf(typetmp.substr(itt,2)) == -1 )
        if ( typearray2.indexOf(typetmp[itt]) == -1 )
        {
          typearray2.push(typetmp[itt]);
          if (data[i].score < 9) 
          {
            tmp8.push( {name: NAME(data[i].name), value: data[i].score} );
            gradecount2.push( [1,0] );
          }
          else 
          {
            tmp9.push( {name: NAME(data[i].name), value: data[i].score} );
            gradecount2.push( [0,1] );
          }
          tmp = [tmp8,tmp9];
          gradearray2.push(tmp); 
        }
        else //已有的类型
        {
          ind = typearray2.indexOf(typetmp[itt]);
          if (data[i].score < 9) 
          {
            gradearray2[ind][0].push( {name: NAME(data[i].name), value: data[i].score} );
            gradecount2[ind][0]++;
          }
          else
          {
            gradearray2[ind][1].push( {name: NAME(data[i].name), value: data[i].score} );
            gradecount2[ind][1]++;
          }
        }
      }
    }
  } 

  var t = {},t1 = []; //,t8 = {},t9 = {};
  for (var i = 0;i < typearray1.length;i++)
  {
    if (gradecount1[i][0] != 0 && gradecount1[i][1] != 0)
      t1 = [{name: '8', children: gradearray1[i][0]},
            {name: '9', children: gradearray1[i][1]}];
    else 
    {
      if (gradecount1[i][1] == 0)
        t1 = [{name: '8', children: gradearray1[i][0]}];
      else if (gradecount1[i][0] == 0)
        t1 = [{name: '9', children: gradearray1[i][1]}];
    }
    t = { name: typearray1[i], children: t1 };
    array1_1.push(t);
  }
  for (var i = 0;i < typearray2.length;i++)
  {
    if (gradecount2[i][0] != 0 && gradecount2[i][1] != 0)
      t1 = [{name: '8', children: gradearray2[i][0]},
            {name: '9', children: gradearray2[i][1]}];
    else 
    {
      if (gradecount2[i][1] == 0)
        t1 = [{name: '8', children: gradearray2[i][0]}];
      else if (gradecount2[i][0] == 0)
        t1 = [{name: '9', children: gradearray2[i][1]}];
    }
    t = { name: typearray2[i],children: t1 };
    array1_2.push(t);
  }

  data0 = [  
    {name: '豆瓣电影',
    children:[
  {
    name: '20世纪',
    children: array1_1
  },
  {
    name: '21世纪',
    children: array1_2
  }]}
];

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
        series: [
          {
            type: 'tree',
            data: data0,
            top: '7%',
            left: '3%',
            //bottom: '1%',
            //bottom: '1px',
            right: '3%',
            symbolSize: 5,
            orient: 'vertical',
            itemStyle: {
              borderColor: '#00C6D7',
              borderWidth: 2,
              borderType: 'solid',
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            label: {
              position: 'left',
              // rotate: -90,
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 15,
              fontWeight: 750,
              color: '#0e82ad'
            },
            leaves: {
              label: {
                position: 'bottom',
                rotate: -40,
                verticalAlign: 'middle',
                align: 'left',
                fontSize: 11,
                fontWeight: 750,
                distance: 5
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      };

  option && myChart.setOption(option);

}; 

