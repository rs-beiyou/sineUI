import 'core-js/es6/promise';
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