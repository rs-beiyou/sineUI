import 'core-js/es6/promise';
import 'core-js/es6/symbol';
import 'core-js/fn/object/assign';
import 'core-js/fn/object/keys';
import 'core-js/fn/array/is-array';
import 'core-js/fn/array/includes';
import 'core-js/fn/array/find-index';
import 'core-js/fn/string/includes';
import 'core-js/fn/string/starts-with';

let defineProperty = (function() {
  // IE 8 only supports `Object.defineProperty` on DOM elements
  let result;
  try {
    let object = {};
    let $defineProperty = Object.defineProperty;
    result = $defineProperty(object, object, object) && $defineProperty;
  } catch (error) {
    console.warn('defineProperty 方法出现问题！');
  }
  return result;
}());

/*
  Array.compare
  arr1: Array数组
  arr2: Array数组
  表示arr1比arr2多的部分。
*/
if (typeof Array.compare != 'function') {
  let compare = function(arr1, arr2) {
    let diffArr = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.indexOf(arr1[i]) === -1)
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
//ie不支持 Number.parseFloat
Number.parseFloat = parseFloat;