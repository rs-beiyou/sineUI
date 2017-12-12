(function() {
  'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
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
    (function() {
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
    }());
  }
})();