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
    this.trigger = typeof op.trigger === 'object' ? op.trigger : $(op.trigger);
    this.follower = typeof op.follower === 'object' ? op.follower : $(op.follower);
    this.trigger.on(op.event, this.callback.bind(this));
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
  event: '',
  immediate: true,
  callback: null
};
$.componentLinker = ComponentLinker;
