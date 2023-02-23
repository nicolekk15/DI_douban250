var chartDom1 = document.getElementById('stacked-charts');
var myChart1 = echarts.init(chartDom1);
var option;
var thistype;// = "剧情";
test();
function test()
{
  thistype = document.getElementById("select0").value;

  var a = [],a1 = [],a2 = [],a3 = [],a4 = [];//,a5 = [];

  function Year(s)
  {
  var count = 0;
  for (var i=1930;i<2020;i+=5)
  {
    var iyear = String(i)+'-1-1';
    if (s >= iyear) count++;
  }
  return count;
  }

  function Grade(s1)
  {
  var count1 = 0;
  if (s1 >= 8.0) count1++;
  if (s1 >= 8.5) count1++;
  if (s1 >= 9.0) count1++;
  if (s1 >= 9.5) count1++;
  return count1;
  }

  var data = dataFromJSON.data;
  
  for (var i=0;i<5;i++)
  {
  var zeroa = [];
    for (var j=0;j<19;j++)
    {
    zeroa.push(0);
    }
    a.push(zeroa);
  }

  for (var i=0;i<data.length;i++)
  {
  if (data[i].type.search(thistype) != -1)
  {
    a[Grade(data[i].score) - 1][Year(data[i].date) - 1] ++;
    //a[0][1] ++;
  }
  
  }
  draw();

  function draw() 
  {
  option = {
    color: ['#400080', '#2020ff', 'rgba(55, 162, 255)', '#00C6D7'],
    // title: {
    // text: thistype
    // },
    tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
      backgroundColor: '#6a7985'
      }
    }
    },
    legend: {
    data: ['8.0', '8.5','9.0', '9.5', '10.0']//不同的类型
    },
    toolbox: {
    feature: {
      saveAsImage: {}
    }
    },
    grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
    },
    xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['1930', '1935','1940','1945','1950','1955', '1960', '1965',
      '1970','1975','1980','1985', '1990', '1995',
      '2000','2005', '2010', '2015', '2020']//时间年份
    }
    ],
    yAxis: [
    {
      type: 'value'
    }
    ],
    series: [
    {
      name: '8.0',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
      width: 0
      },
      showSymbol: false,
      areaStyle: {
      opacity: 0.8,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: '#173755'  
        },
        {
          offset: 1,
          color: '#400080'
        }
      ])
      },
      emphasis: {
      focus: 'series'
      },
      data: a[0]//每一年的数量
    },
    {
      name: '8.5',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
      width: 0
      },
      showSymbol: false,
      areaStyle: {
      opacity: 0.8,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: '#000080'
        },
        {
          offset: 1,
          color: '#2020ff'
        }
      ])
      },
      emphasis: {
      focus: 'series'
      },
      data: a[1]
    },
    {
      name: '9.0',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
      width: 0
      },
      showSymbol: false,
      areaStyle: {
      opacity: 0.8,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: 'rgba(77, 119, 255)'
        },
        {
          offset: 1,
          color: 'rgba(55, 162, 255)'
        }
      ])
      },
      emphasis: {
      focus: 'series'
      },
      data: a[2]
    },
    {
      name: '9.5',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
      width: 0
      },
      showSymbol: false,
      areaStyle: {
      opacity: 0.8,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: '#00C6D7'
        },
        {
          offset: 1,
          color: 'rgba(1, 191, 236)'
        }
      ])
      },
      emphasis: {
      focus: 'series'
      },
      data:a[3]
    }
    ]
  };
  option && myChart1.setOption(option);
  }
}