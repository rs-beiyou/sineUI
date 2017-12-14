import './textbox';
import './passwordbox';
import './checkbox';
import './radiobox';
import './selectbox';
import './switchbox';
(function($) {
  function former(option, _relatedTarget) {
    return this.each(function() {
      if (typeof option !== 'string') {
        console.error('The first argument of $.fn.former must be a String');
        return;
      }
      if (typeof _relatedTarget !== 'object') {
        console.error('The second argument of $.fn.former must be an Object');
        return;
      }
      try {
        $(this)[option](_relatedTarget || {});
      } catch (error) {
        console.error('$.fn.former没有' + option + '组件方法可调用！');
      }
    });
  }
  let old = $.fn.former;

  $.fn.former = former;

  $.fn.former.noConflict = function() {
    $.fn.former = old;
    return this;
  };
})(jQuery);