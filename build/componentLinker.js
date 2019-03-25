'use strict';

let _createClass = (function() {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      let descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
/**
 * 定高容器中两个元素的高度联动器
 * box: 定高容器
 * trigger: 触发器
 * follower: 跟随器
 * event: 触发器事件
 * immediate: 立即触发
 */

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

let ComponentLinker = (function() {
  function ComponentLinker(op) {
    _classCallCheck(this, ComponentLinker);

    this.option = Object.assign({}, ComponentLinker.DEFAULTS, op);
    if (!this.option.trigger || !this.option.follower) {
      // eslint-disable-next-line
      console.error(
        '触发器、跟随器不可或缺！\nThe trigger and the follower are necessary for heightLinker!'
      );
      return;
    }
    this.init();
  }

  _createClass(ComponentLinker, [
    {
      key: 'init',
      value: function init() {
        let _this = this;

        let op = this.option;
        this.follower =
          typeof op.follower === 'string' ? $(op.follower) : op.follower;
        if (
          Object.prototype.toString.call(op.trigger) === '[object Array]' &&
          Object.prototype.toString.call(op.event) === '[object Array]'
        ) {
          this.trigger = op.trigger.map(function(element) {
            return typeof element === 'string' ? $(element) : element;
          });
          this.trigger.forEach(function(element, index) {
            element = typeof element === 'string' ? $(element) : element;
            element.on(op.event[index], _this.callback.bind(_this));
          });
        }
        if (typeof op.trigger === 'string') {
          this.trigger = $(op.trigger);
          this.trigger.on(op.event, this.callback.bind(this));
        }
        op.immediate && this.callback();
      }
    },
    {
      key: 'callback',
      value: function callback() {
        let op = this.option;
        op.callback && op.callback(this.trigger, this.follower);
      }
    }
  ]);

  return ComponentLinker;
})();

ComponentLinker.DEFAULTS = {
  trigger: null,
  follower: null,
  event: null,
  immediate: true,
  callback: null
};
$.componentLinker = ComponentLinker;
