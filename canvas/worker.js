let offscreen, ctx;

// 监听主线程发来的信息
onmessage = function (e) {
  if (e.data.msg == 'init') {
    init();
    draw();
  }
};

function init() {
  offscreen = new OffscreenCanvas(1200, 1200);
  ctx = offscreen.getContext('2d');
}

// 绘制图形
function draw() {
  ctx.clearRect(0, 0, offscreen.width, offscreen.height);
  for (var i = 0; i < 10000; i++) {
    for (var j = 0; j < 1000; j++) {
      ctx.fillRect(i * 4, j * 4, 3, 3);
    }
  }
  const imageBitmap = offscreen.transferToImageBitmap();
  // 传送给主线程
  postMessage({ imageBitmap: imageBitmap }, [imageBitmap]);
}
