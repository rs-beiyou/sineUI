import BaseForm from './form-base';
(function($) {
  class Passwordbox extends BaseForm {
    constructor(el, options) {
      super(el, options, Passwordbox.DEFAULTS);
      this.className = 'Passwordbox';
      this._init();
    }
    _init() {
      super._initForm();
      Object.assign(this.options, this.lastOptions);
      this.$element.after(this.$fragment[0]).remove();
    }
    //无hidden情况
    _setPasswordbox(item) {
      let op = this.options;
      let $input;
      if (!this.$input) {
        let _input = document.createElement('input');
        $input = $(_input);
        $input.addClass('form-control');
        $input.attr('type', 'password');
        this.$input = $input;
        this.$formBlock.append(_input);
      } else {
        $input = this.$input;
      }
      switch (item) {
        case 'id':
        case 'name':
        case 'placeholder':
        case 'readonly':
        case 'disabled':
          $input.attr(item, op[item]);
          break;
        case 'value':
          $input.val(op.value);
          break;
        case 'width':
          $input.css('width', op.width);
          break;
      }
    }
  }

  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      let $this = $(this);
      let data = $this.data('si.passwordbox');
      let options = $.extend({}, Passwordbox.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!data) {
        if (typeof option !== 'object') {
          console.error('请先初始化passwordbox，再执行其他操作！\n passwordbox初始化：$().passwordbox(Object);');
          return;
        }
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
    helpText: '',
    size: '',
    value: '',
    placeholder: '',
    width: ''
  };
})(jQuery);