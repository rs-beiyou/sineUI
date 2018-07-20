const _ = {};
_.now = () => {
  return new Date().getTime();
};
//函数节流
_.throttle = function(fn, interval) {
  let __self = fn, // 保存需要被延迟执行的函数引用
    timer, // 定时器
    firstTime = true; // 是否是第一次调用
  return function() {
    let args = arguments,
      __me = this;
    if (firstTime) { // 如果是第一次调用，不需延迟执行
      __self.apply(__me, args);
      return firstTime = false;
    }
    if (timer) { // 如果定时器还在，说明前一次延迟执行还没有完成
      return false;
    }
    timer = setTimeout(function() { // 延迟一段时间执行
      clearTimeout(timer);
      timer = null;
      __self.apply(__me, args);
    }, interval || 500);
  };
};
//函数消抖
_.debounce = function(func, wait=500, immediate) {
  let timeout, args, context, timestamp, result;

  let later = function() {
    let last = _.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = _.now();
    let callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};

_.randomString = (len) => {
  len = len || 10;
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

_.browserVersions = () => { //判断终端
  let u = navigator.userAgent;
  return { //移动终端浏览器版本信息
    isIOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  };
};

/*
  _.compare
  arr1: Array数组
  arr2: Array数组
  表示arr1比arr2多的部分。
*/
_.compare = (arr1, arr2) => {
  let diffArr = [];
  for (let i = 0, len = arr1.length; i < len; i++) {
    if (!arr2.includes(arr1[i]))
      diffArr.push(arr1[i]);
  }
  return diffArr;
};
/*
  _.delete
  arr: Array数组 字符串数组
  value: value
  global: false/true，是否全局删除
  删除字符串数组arr中指定value元素
  返回删除后数组
*/
_.delete = (arr, value, gl) => {
  if (!Array.isArray(arr)) return arr;
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === value) {
      arr.splice(i, 1);
      if (gl) {
        i--;
        len--;
      } else {
        break;
      }
    }
  }
  return arr;
};


/*
  _.findObjIndex
  obj: 简单对象
  查找出对象在数组中的序列号
  没找到返回-1
*/
_.findObjIndex = (arr, obj) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    let flag = false;
    for (let o in arr[i]) {
      if (arr[i][o] !== obj[o]) {
        break;
      }
      flag = true;
    }
    if (flag) {
      return i;
    }
  }
  return -1;
};

let cached;
_.getScrollBarSize  = (fresh) => {
  if (fresh || cached === undefined) {
    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    const outerStyle = outer.style;

    outerStyle.position = 'absolute';
    outerStyle.top = 0;
    outerStyle.left = 0;
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '200px';
    outerStyle.height = '150px';
    outerStyle.overflow = 'hidden';

    outer.appendChild(inner);

    document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }
    document.body.removeChild(outer);
    cached = widthContained - widthScroll;
  }
  return cached;
};

export default _;