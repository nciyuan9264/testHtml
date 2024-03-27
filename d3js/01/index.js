// 设置画布大小
let width = 500;
let height = 500;
let margin = { top: 20, right: 30, bottom: 30, left: 40 };
// 创建 SVG 画布
let svg = d3.create('svg');

// 添加刻度线
window.ticks = d3.range(0.92, -0.62, -0.02).map(function (d) {
  return parseFloat(d.toFixed(2));
});
window.targetNum = [-0.52, -0.22, 0, 0.28, 0.82];

window.draw = () => {
  let innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;

  svg.attr('width', width).attr('height', height);

  let yScale = d3
    .scaleLinear()
    .domain([0.93, -0.63]) // 设置数据范围
    .range([innerHeight + margin.top, margin.top]); // 设置输出范围

  svg
    .append('line')
    .transition()
    .duration(750)
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
    .transition()
    .duration(750)
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
    .transition()
    .duration(750)
    .attr('class', 'tick-label')
    .attr('x', margin.left - 12)
    .attr('y', function (d) {
      return yScale(d) + 5;
    })
    .attr('text-anchor', 'end')
    .attr('font-size', '12px')
    .text(function (d) {
      return d;
    });

  svg
    .selectAll('.dot-line')
    .data(targetNum)
    .enter()
    .append('line')
    .transition()
    .duration(750)
    .attr('class', '.dot-line')
    .attr('x1', margin.left)
    .attr('y1', d => yScale(d))
    .attr('x2', innerWidth + margin.left)
    .attr('y2', d => yScale(d))
    .attr('stroke', 'black')
    .attr('stroke-width', '1')
    .attr('stroke-dasharray', '2,2');
};
draw();
// Append the SVG element to the container.
d3.select('#container').append(() => svg.node());
