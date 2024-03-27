const data = [{name: 'Shao-Kui', value:6},
{name:'Wen-Yang', value:6}, {name:'Yi Ke', value:16}, {name:'Liang Yuan', value: 10}, 
{name:'Tam Hou', value:6}, {name:'Jia-Hong', value:10}, {name:'Yue Liang', value:12}, 
{name:'He Yu', value:20}, {name:'Xiang-Li', value:12}, {name:'Wei-Yu', value:15}, {name:'Chen Zheng', value:14},
{name:'Tian-Xing', value:15},{name:'Sen-Zhe', value:15}, {name:'Yang-Fu', value:15}, {name:'Qing-Wen', value:18}, {name:'Yi-Xiao', value:18}];
// 设置画布大小
let width = 700;
let height = 500;
let margin = { top: 20, right: 30, bottom: 30, left: 40 };
// 创建 SVG 画布
let svg = d3.create('svg');

// 添加刻度线
let ticks = d3.range(0.92, -0.62, -0.02).map(function (d) {
  return parseFloat(d.toFixed(2));
});
let targetNum = [-0.52, -0.22, 0, 0.28, 0.82];
let innerWidth = width - margin.left - margin.right;
let innerHeight = height - margin.top - margin.bottom;
