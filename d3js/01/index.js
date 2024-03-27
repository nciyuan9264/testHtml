// 设置画布大小
let width = 700;
let height = 500;
let margin = { top: 20, right: 30, bottom: 30, left: 40 };
// 创建 SVG 画布
let svg = d3.select('#my-svg');

// 添加刻度线
let ticks = d3.range(0.92, -0.62, -0.02).map(d => parseFloat(d.toFixed(2)));
let targetNum = [{key:0, value: -0.52}, {key:1, value: -0.22}, {key:2, value: 0}, {key:3, value: 0.28}, {key:4, value: 0.82}];

let innerWidth = width - margin.left - margin.right;
let innerHeight = height - margin.top - margin.bottom;

svg.attr('width', width).attr('height', height);

let yScale = d3
  .scaleLinear()
  .domain([0.93, -0.63]) // 设置数据范围
  .range([innerHeight + margin.top, margin.top]); // 设置输出范围

svg
  .append('line')
  .attr('x1', margin.left)
  .attr('y1', margin.top)
  .attr('x2', margin.left)
  .attr('y2', innerHeight + margin.top)
  .attr('stroke', 'black');

svg
  .selectAll('.tick-line')
  .data(ticks)
  .enter()
  .append('line')
  .attr('x1', margin.left)
  .attr('y1', d => yScale(d))
  .attr('x2', d => margin.left - (Number.isInteger(d * 10) ? 10 : 5))
  .attr('y2', d => yScale(d))
  .attr('stroke', 'black');

// // 添加刻度标签
svg
  .selectAll('.tick-label')
  .data(ticks.filter(item => Number.isInteger(item * 10)))
  .enter()
  .append('text')
  .attr('class', 'tick-label')
  .attr('x', margin.left - 12)
  .attr('y', d => yScale(d) + 5)
  .attr('text-anchor', 'end')
  .attr('font-size', '12px')
  .text(function (d) {
    return d;
  });

const dotline = svg
  .selectAll('dot-line')
  .data(targetNum)
  .enter()
  .append('line')
  .attr('class', 'dot-line')
  .attr('x1', margin.left)
  .attr('y1', d => yScale(d.value))
  .attr('x2', innerWidth + margin.left)
  .attr('y2', d => yScale(d.value))
  .attr('stroke', 'black')
  .attr('stroke-width', '1')
  .attr('stroke-dasharray', '2,2');
const update = async () => {
  while (true) {
    targetNum.forEach(d => {
      d.value = Math.random() * (0.9 +0.6) + -0.6;
    });
    let transition = d3
      .transition()
      .ease(d3.easeCubic) //.ease(d3.easeLinear) // we can optionally alter 'ease';
      .duration(3000);
    dotline
      .transition(transition)
      .attr('y1', d => yScale(d.value))
      .attr('y2', d => yScale(d.value));
    await transition.end();
  }
};
update();
