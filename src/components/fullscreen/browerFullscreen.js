// 判断各种浏览器，找到正确的方法
function launchFullscreen(el) {
  // 判断各种浏览器，找到正确的方法
  let requestMethod = el.requestFullScreen || //W3C
    el.webkitRequestFullScreen || //FireFox
    el.mozRequestFullScreen || //Chrome等
    el.msRequestFullScreen; //IE11
  if (requestMethod) {
    requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== 'undefined') { //for Internet Explorer
    let wscript = new window.ActiveXObject('WScript.Shell');
    if (wscript !== null) {
      wscript.SendKeys('{F11}');
    }
  }
}

function checkFull() {
  let t = window.top;
  let isFull = t.document.fullscreenEnabled || t.fullScreen || t.document.webkitIsFullScreen || t.document.msFullscreenEnabled;
  //to fix : false || undefined == undefined
  if (isFull === undefined) {
    isFull = false;
  }
  return isFull;
}
export {
  checkFull,
  launchFullscreen
};