function onDownload(data, type, name) {
  const blob = new Blob([data], { type }); // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
  const url = window.URL.createObjectURL(blob); //创建一个url
  const link = document.createElement('a'); //创建一个a标签
  link.href = url; // 把url 赋值给a标签的href
  link.style.display = 'none';
  link.setAttribute('download', name);
  document.body.appendChild(link);

  link.click(); // 触发a标签的点击事件
  URL.revokeObjectURL(url); // 清除Url
  document.body.removeChild(link);
};

function onSaveSvg() { // 保存svg
  const svg = document.querySelector('svg');
  const source = new XMLSerializer().serializeToString(svg); //将整个SVG document 对象序列化为一个 XML 字符串。
  onDownload(source, 'text/xml', 'test.svg'); // 下载 
}
