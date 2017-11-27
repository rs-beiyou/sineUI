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
    a1: Array数组
    b1: Array数组
    flag: Boolean true表示a1比b1多的部分；false反之。
    */
  if (typeof Array.compare != 'function') {
    (function() {
      let compare = function(a1, b1, flag) {
        let a = a1;
        let d = a1;
        let b = b1;
        let e = b1;
        let c = [];
        let addstr = [];
        let dels = [];
        a.sort();
        b.sort();
        let i = 0;
        let j = 0;
        while (i < a.length && j < b.length) {
          if (a[i] < b[j]) {
            c.push(a[i]);
            i++;
          } else if (b[j] < a[i]) {
            c.push(b[j]);
            j++;
          } else {
            i++;
            j++;
          }
        }
        while (i < a.length) {
          c.push(a[i]);
          i++;
        }
        while (j < b.length) {
          c.push(b[j]);
          j++;
        }
        if (!flag) {
          for (let i = 0; i < c.length; i++) {
            for (let j = 0; j < e.length; j++) {
              if (e[j] == c[i]) {
                addstr.push(e[j]);
              }
            }
          }
          return addstr;
        } else {
          for (let i = 0; i < c.length; i++) {
            for (let j = 0; j < d.length; j++) {
              if (d[j] == c[i]) {
                dels.push(d[j]);
              }
            }
          }

          return dels;
        }
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