(($) => {
  class Loading {
    constructor(el, options) {
      this.$element = $(el);
      this.options = options;
      this._init();
    }
    _init() {
      let loading = document.createElement('i');
      let $loading = $(loading);
      $loading.addClass('si-btn-load fa fa-spinner');
      this.$element.addClass('si-btn-loading').prepend(loading);
      this.$loading = $loading;
    }
    close() {
      this.$element.removeClass('si-btn-loading');
      this.$loading.remove();
    }
    set(option) {
      Object.assign(this.options, option || {});
    }
  }

  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      let $this = $(this);
      let dataSet = $this.data();
      let data = dataSet['si.loading'];

      if (!data) {
        //data-api覆盖data-options
        let options = Object.assign({}, Loading.DEFAULTS, dataSet, option || {});
        $this.data('si.loading', new Loading(this, options));
      } else {
        if (typeof option === 'object') data['set'](option);
      }

      if (typeof option === 'string') data[option](_relatedTarget);
      if (option === 'close') {
        $this.removeData('si.loading');
      }
    });
  }
  let old = $.fn.loading;

  $.fn.loading = Plugin;
  $.fn.loading.Constructor = Loading;

  $.fn.loading.noConflict = function() {
    $.fn.loading = old;
    return this;
  };
  Loading.DEFAULTS = {

  };
})(jQuery);