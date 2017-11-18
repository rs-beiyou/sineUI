import InputInline from './input-inline';
(function($) {
  class Textbox extends InputInline {
    constructor(el, options) {
      super(el, options);
      this._init();
    }
    _init() {
      let _fragemnet = document.createDocumentFragment();
      this.labelDom = super.setLabel();
      let group = super.setInputGroup('text');
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
      let data = $this.data('si.textbox');
      let options = $.extend({}, Textbox.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!data) {
        if (typeof option !== 'object') {
          console.error('请先初始化textbox，再执行其他操作！\n textbox初始化：$().textbox(Object);');
          return;
        }
        data = new Textbox(this, options);
        $(data.inputDom).data('si.textbox', data);
      } else {
        if (typeof option == 'object') data['set'](option);
      }
      if (typeof option == 'string') data[option](_relatedTarget);
    });
  }
  let old = $.fn.textbox;

  $.fn.textbox = Plugin;
  $.fn.textbox.Constructor = Textbox;

  $.fn.textbox.noConflict = function() {
    $.fn.textbox = old;
    return this;
  };


  Textbox.DEFAULTS = {
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