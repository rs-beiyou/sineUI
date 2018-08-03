/**
 * 定高容器中两个元素的高度联动器
 * box: 定高容器
 * trigger: 触发器
 * follower: 跟随器
 * event: 触发器事件
 * immediate: 立即触发
 */
import {Log} from '../../libs/log';
class ComponentLinker{
  constructor (op){
    this.option = Object.assign({}, ComponentLinker.DEFAULTS, op);
    if(!this.option.trigger || !this.option.follower ){
      Log.error('触发器、跟随器不可或缺！\nThe trigger and the follower are necessary for heightLinker!');
      return;
    }
    this.init();
  }
  init () {
    let op = this.option;
    this.follower = typeof op.follower === 'string' ? $(op.follower) : op.follower;
    if(Object.prototype.toString.call(op.trigger) === '[object Array]' && Object.prototype.toString.call(op.event) === '[object Array]'){
      this.trigger = op.trigger.map(element => {
        return typeof element === 'string' ? $(element) : element;
      });
      this.trigger.forEach((element, index) => {
        element = typeof element === 'string' ? $(element) : element;
        element.on(op.event[index], this.callback.bind(this));
      });
    }
    if (typeof op.trigger === 'string') {
      this.trigger = $(op.trigger);
      this.trigger.on(op.event, this.callback.bind(this));
    }
    op.immediate && this.callback();
  }
  callback () {
    let op = this.option;
    op.callback && op.callback(this.trigger, this.follower);
  }
}
ComponentLinker.DEFAULTS = {
  trigger: null,
  follower: null,
  event: null,
  immediate: true,
  callback: null
};
$.componentLinker = ComponentLinker;
