+function ($) {
  'use strict';

  var Sidebar   = function (el, options) {
    this.options = options;
    this.$element = $(el);
  }
  Sidebar.prototype.setBackground = function(){

  }

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.sidebar')
      var options = $.extend({}, Sidebar.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.sidebar', (data = new Sidebar(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
    })
  }

  var old = $.fn.sidebar

  $.fn.sidebar             = Plugin
  $.fn.sidebar.Constructor = Sidebar


  // ALERT NO CONFLICT
  // =================

  $.fn.sidebar.noConflict = function () {
    $.fn.sidebar = old
    return this
  }


}(jQuery);
