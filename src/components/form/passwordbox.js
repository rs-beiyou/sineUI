import InputInline from './input-inline';
(function($) {
  class Passwordbox extends InputInline {
    constructor(el, options) {
      super(el, options);
      this.init();
    }
    init() {
      let _fragemnet = document.createDocumentFragment();
      this.labelDom = super.setLabel();
      let group = super.setInputGroup('password');
      this.inputGroupDom = group.inputGroup;
      this.inputDom = group.input;
      $(_fragemnet).append(this.labelDom).append(this.inputGroupDom);
      this.$element.after(_fragemnet).remove();
    }
    set(option) {
      super.set(option);
    }
  }

  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      let $this = $(this);
      let data = $this.data('si.passwordbox');
      let options = $.extend({}, Passwordbox.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!data) {
        data = new Passwordbox(this, options);
        $(data.inputDom).data('si.passwordbox', data);
      } else {
        if (typeof option == 'object') data['set'](option);
      }
      if (typeof option == 'string') data[option](_relatedTarget);
    });
  }
  let old = $.fn.passwordbox;

  $.fn.passwordbox = Plugin;
  $.fn.passwordbox.Constructor = Passwordbox;

  $.fn.passwordbox.noConflict = function() {
    $.fn.passwordbox = old;
    return this;
  };


  Passwordbox.DEFAULTS = {
    label: '',
    id: '',
    name: '',
    labelWidth: '',
    inputWidth: '',
    readonly: false,
    disabled: false,
    value: '',
    placeholder: '',
    multiline: false,
    rows: '',
    cols: '',
    width: ''
  };
})(jQuery);