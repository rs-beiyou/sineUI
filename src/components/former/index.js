import '../form';

import {Log} from '../../libs/log';

function former(option, _relatedTarget) {
  return this.each(function() {
    try {
      if (typeof option === 'string') {
        $(this)[option](_relatedTarget || {});
      }
      if (typeof option === 'object') {
        let $this = $(this);
        $this[$this.data('si-form-type')](option);
      }
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