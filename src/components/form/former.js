import './textbox';
import './selectbox';
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
      $(this)[option](_relatedTarget || {});
    });
  }
  let old = $.fn.former;

  $.fn.former = former;

  $.fn.former.noConflict = function() {
    $.fn.former = old;
    return this;
  };
})(jQuery);