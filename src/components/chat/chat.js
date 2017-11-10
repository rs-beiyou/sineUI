(function($) {
  let Chat = function(el, op) {
    this.$element = $(el);
    this.options = op;
  };
  Chat.DEFAULTS = {

  };

  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      let $this = $(this);
      let data = $this.data('si.chat');
      let options = $.extend({}, Chat.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!data) $this.data('si.chat', (data = new Chat(this, options)));
      if (typeof option == 'string') data[option](_relatedTarget);
    });
  }

  let old = $.fn.chat;

  $.fn.chat = Plugin;
  $.fn.chat.Constructor = Chat;

  $.fn.chat.noConflict = function() {
    $.fn.chat = old;
    return this;
  };

})(jQuery);