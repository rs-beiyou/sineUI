// import 'core-js/es6/promise';
import 'core-js/fn/object/assign';
import 'core-js/fn/object/keys';
import 'core-js/fn/array/is-array';
import 'core-js/fn/array/includes';
import 'core-js/fn/array/find-index';
import 'core-js/fn/string/includes';
import 'core-js/fn/string/starts-with';

import {Log} from '../libs/log';

let defineProperty = (function() {
  // IE 8 only supports `Object.defineProperty` on DOM elements
  let result;
  try {
    let object = {};
    let $defineProperty = Object.defineProperty;
    result = $defineProperty(object, object, object) && $defineProperty;
  } catch (error) {
    Log.warn('defineProperty 方法出现问题！');
  }
  return result;
}());

/*
  Array.compare
  arr1: Array数组
  arr2: Array数组
  表示arr1比arr2多的部分。
*/
if (typeof Array.compare !== 'function') {
  let compare = (arr1, arr2) => {
    let diffArr = [];
    for (let i = 0, len = arr1.length; i < len; i++) {
      if (!arr2.includes(arr1[i]))
        diffArr.push(arr1[i]);
    }
    return diffArr;
  };
  if (defineProperty) {
    defineProperty(Array, 'compare', {
      value: compare,
      writable: true,
      configurable: true
    });
  }
}
/*
  Array.delete
  arr: Array数组 字符串数组
  value: value
  global: false/true，是否全局删除
  删除字符串数组arr中指定value元素
  返回删除后数组
*/
if (typeof Array.delete !== 'function') {
  let dele = (arr, value, gl) => {
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
  if (defineProperty) {
    defineProperty(Array, 'delete', {
      value: dele,
      writable: true,
      configurable: true
    });
  }
}
/*
  Array.findObjIndex
  obj: 简单对象
  查找出对象在数组中的序列号
  没找到返回-1
*/
if (typeof Array.findObjIndex !== 'function') {
  Array.prototype.findObjIndex = function(obj) {
    for (let i = 0, len = this.length; i < len; i++) {
      let flag = false;
      for (let o in this[i]) {
        if (this[i][o] !== obj[o]) {
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
}

//ie不支持 Number.parseFloat
Number.parseFloat = parseFloat;

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt) { //author: meizz
  let o = {
    // 'Y+': this.getFullYear(),//年份
    // 'y+': this.getFullYear(),//年份
    'M+': this.getMonth() + 1, //月份
    'D+': this.getDate(), //日
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  };
  if (/(y|Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  return fmt;
};