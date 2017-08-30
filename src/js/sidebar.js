+function ($) {
  class Sidebar {
    constructor(el,options){
      this.options = options;
      this.$element = $(el);
    }
    setBackground(){

    }
  }
  function Plugin (option, _relatedTarget){
    return this.each( function(){
      let $this = $(this);
      let data  = $this.data('bs.sidebar');
      let options = $.extend({}, Sidebar.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!data) $this.data('bs.sidebar', (data = new Sidebar(this, options)));
      if (typeof option == 'string') data[option](_relatedTarget);
    });
  }

  Sidebar.DEFAULTS = {

  };

  const old = $.fn.sidebar;

  $.fn.sidebar             = Plugin;
  $.fn.sidebar.defaults    = Sidebar.DEFAULTS;
  $.fn.sidebar.Constructor = Sidebar;


  // ALERT NO CONFLICT
  // =================

  $.fn.sidebar.noConflict = function () {
    $.fn.sidebar = old;
    return this;
  };


}(jQuery);
