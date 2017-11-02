(function(){
  'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
  var defineProperty = (function() {
    // IE 8 only supports `Object.defineProperty` on DOM elements
    try {
      var object = {};
      var $defineProperty = Object.defineProperty;
      var result = $defineProperty(object, object, object) && $defineProperty;
    } catch(error) {}
    return result;
  }());
  /*
  Object.assign
  */
  if (typeof Object.assign != 'function') {
    (function(){
      var assign = function(target, varArgs){
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
        var to = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
          if (nextSource != null) {
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      }
      if(defineProperty){
        defineProperty(Object, "assign", {
          value: assign,
          writable: true,
          configurable: true
        });
      }
    }());
  }
  /*
  String.startsWith
  */
  if (!String.prototype.startsWith) {
    (function() {
      var toString = {}.toString;
      var startsWith = function(search) {
        if (this == null) {
          throw TypeError();
        }
        var string = String(this);
        if (search && toString.call(search) == '[object RegExp]') {
          throw TypeError();
        }
        var stringLength = string.length;
        var searchString = String(search);
        var searchLength = searchString.length;
        var position = arguments.length > 1 ? arguments[1] : undefined;
        // `ToInteger`
        var pos = position ? Number(position) : 0;
        if (pos != pos) { // better `isNaN`
          pos = 0;
        }
        var start = Math.min(Math.max(pos, 0), stringLength);
        // Avoid the `indexOf` call if no match is possible
        if (searchLength + start > stringLength) {
          return false;
        }
        var index = -1;
        while (++index < searchLength) {
          if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
            return false;
          }
        }
        return true;
      };
      if (defineProperty) {
        defineProperty(String.prototype, 'startsWith', {
          'value': startsWith,
          'configurable': true,
          'writable': true
        });
      } else {
        String.prototype.startsWith = startsWith;
      }
    }());
  }
  /*
  String.includes
  */
  if (!String.prototype.includes) {
    (function(){
      var includes = function(search, start){
        if (typeof start !== 'number') {
          start = 0;
        }
        if (start + search.length > this.length) {
          return false;
        } else {
          return this.indexOf(search, start) !== -1;
        }
      }
      if (defineProperty) {
        defineProperty(String.prototype, 'includes', {
          'value': includes,
          'configurable': true,
          'writable': true
        });
      } else {
        String.prototype.includes = includes;
      }
    }());
  }
  /*
  Array.isArray
  */
  if (!Array.prototype.isArray) {
    (function(){
      var isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
      };
      if (defineProperty) {
        defineProperty(Array.prototype, 'startsWith', {
          'value': isArray,
          'configurable': true,
          'writable': true
        });
      }else{
        Array.prototype.isArray = isArray;
      }
    }());
  }
  /*
  Array.includes
  */
  if (!Array.prototype.includes) {
    (function(){
      var includes = function(searchElement, fromIndex) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If len is 0, return false.
        if (len === 0) {
          return false;
        }

        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0;

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
        }
        // 7. Repeat, while k < len
        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          // c. Increase k by 1.
          if (sameValueZero(o[k], searchElement)) {
            return true;
          }
          k++;
        }
        // 8. Return false
        return false;
      };
      if(defineProperty){
        defineProperty(Array.prototype, 'includes', {
          'value': includes,
          'configurable': true,
          'writable': true
        });
      }else{
        Array.prototype.includes = includes;
      }
    }());
  }
})();
