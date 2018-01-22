import { hasProto } from '../utils/env';

export default class Watch {
  constructor(obj, callback) {
    this.obj = obj;
    this.callback = callback;
    //监听obj，初始监听路径为[]
    this.observe(obj, []);
  }

  //path代表相应属性在原始对象的位置,以数组表示.
  //如[ 'a', 'b', 'c' ] 表示对象obj.a.b.c的属性改变
  observe(obj, path) {
    if (obj && typeof obj === 'object') {
      this.observeObject(obj, path);
      Array.isArray(obj) && this.observeArray(obj, path);
    }
  }

  //遍历对象obj,设置set,get属性,set属性能触发callback函数,并将val的值改为newVal
  //遍历结束后递归调用observe函数 判断val是否为对象,如果是则在对val进行遍历设置set,get
  observeObject(obj, path) {
    let _this = this;
    Object.keys(obj).forEach((prop) => {
      const property = Object.getOwnPropertyDescriptor(obj, prop);
      if (property && property.configurable === false) {
        return;
      }
      let val = obj[prop];
      let tpath = path.slice(0);
      tpath.push(prop);
      Object.defineProperty(obj, prop, {
        get: function() {
          return val;
        },
        set: function(newVal) {
          _this.callback(tpath, newVal, val);
          val = newVal;
        }
      });
      _this.observe(val, tpath);
    });
  }

  //Array 对push,pop等数组操作进行封装
  observeArray(newArray, path) {
    let methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
    let arrayProto = Array.prototype;
    let newProto = Object.create(arrayProto);
    let _this = this;
    methods.forEach(prop => {
      Object.defineProperty(newProto, prop, {
        value: newVal => {
          path.push(prop);
          _this.callback(path, newVal);
          arrayProto[prop].apply(newArray, arguments);
        },
        enumerable: false,
        configurable: true,
        writable: true
      });
    });
    //__proto__兼容处理
    if (hasProto) {
      newArray.__proto__ = newProto;
    } else {
      const arrayKeys = Object.getOwnPropertyNames(newProto);
      Object.keys(arrayKeys).forEach(key => {
        this.def(newArray, key, newProto[key]);
      });
    }
  }

  def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }
}