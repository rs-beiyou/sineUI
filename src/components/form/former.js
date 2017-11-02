import './textbox';
(function($){
  // form操作器
  class Former{
    constructor(el, op){
      this.element = el;
      this.$element = $(el);
      this.options = op;
      this.init();
    }
    init(){

    }
    textbox(){

    }
    passwordbox(){

    }
    selectbox(){

    }
    datebox(){

    }
    daterangebox(){

    }
    checkbox(){

    }
    radiobox(){

    }
    treebox(){

    }
    combobox(){

    }
    filebox(){

    }
  }
  function Plugin (option, _relatedTarget){
    return this.each( function(){
      let $this = $(this);
      let former  = $this.data('si.form');
      let options = $.extend({}, Former.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!former) $this.data('si.form', (former = new Former(this, options)));
      if (typeof option == 'string') former[option](_relatedTarget);
    });
  }
  let old = $.fn.former

  $.fn.former             = Plugin
  $.fn.former.Constructor = Former

  $.fn.former.noConflict = function () {
    $.fn.former = old
    return this
  }
})(jQuery);
