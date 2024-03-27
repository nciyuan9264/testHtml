// 获取SVG标签
var svgElement = document.getElementById('your-svg-id');

// 创建一个空的<canvas>元素
var canvas = document.createElement('canvas');

// 设置<canvas>元素的尺寸
canvas.width = svgElement.clientWidth;
canvas.height = svgElement.clientHeight;

// 获取<canvas>的2D上下文
var ctx = canvas.getContext('2d');

// 创建一个新的Image对象
var img = new Image();

// 将SVG内容绘制到<canvas>上
var svgData = new XMLSerializer().serializeToString(svgElement);
img.src = 'data:image/svg+xml;base64,' + btoa(svgData);

// 等待图像加载完成
img.onload = function() {
  // 将图像绘制到<canvas>上
  ctx.drawImage(img, 0, 0);

  // 导出为PNG格式
  var pngData = canvas.toDataURL('image/png');
  // 或者导出为JPEG格式
  // var jpegData = canvas.toDataURL('image/jpeg', 1.0);

  // 创建一个链接元素，并设置下载属性
  var a = document.createElement('a');
  a.href = pngData; // 或者 jpegData
  a.download = 'image.png'; // 或者 image.jpg
  // 模拟点击链接，触发下载
  document.body.appendChild(a);
  a.click();
};
