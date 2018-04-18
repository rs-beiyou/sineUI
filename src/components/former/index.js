import '../form/index';

import {Log} from '../../libs/log';

function former(option, _relatedTarget) {
  return this.each(function() {
    try {
      if (typeof option !== 'string') {
        throw new Error('The first argument of $.fn.former plugin must be a String！\nformer插件第一个参数必须是String类型！');
      }
      if (typeof _relatedTarget !== 'object') {
        throw new Error('The second argument of $.fn.former plugin must be an Object！\nformer插件第二个参数必须是Object类型！');
      }
      $(this)[option](_relatedTarget || {});
    } catch (error) {
      Log.error(`${option}：${error}`);
    }
  });
}
let old = $.fn.former;

$.fn.former = former;

$.fn.former.noConflict = function() {
  $.fn.former = old;
  return this;
};