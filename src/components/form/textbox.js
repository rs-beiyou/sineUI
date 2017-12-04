import BaseForm from './form-base';
import _ from '../../libs/util';
(function($) {
  class Textbox extends BaseForm {
    constructor(el, options) {
      super(el, options, Textbox.DEFAULTS);
      this.className = 'Textbox';
      this._init();
    }
    _init() {
      super._initForm();
      if (this.lastOptions.name === '' && this.lastOptions.id === '') {
        this.lastOptions.id = _.randomString(10);
      }
      Object.assign(this.options, this.lastOptions);
      this.$element.after(this.$fragment[0]).remove();
    }
    //无hidden情况
    _setTextbox(item) {
      let op = this.options;
      let $input;
      if (!this.$input) {
        let _input = op.multiline ? document.createElement('textarea') : document.createElement('input');
        $input = $(_input);
        $input.addClass('form-control');
        op.multiline ? null : op.password ? $input.attr('type', 'password') : $input.attr('type', 'text');
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
        case 'rows':
        case 'cols':
          if (op.multiline) {
            $input.attr(item, op[item]);
          }
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
      let data = $this.data('si.textbox');
      let options = $.extend({}, Textbox.DEFAULTS, $this.data(), typeof option === 'object' && option);

      if (!data) {
        if (typeof option !== 'object') {
          console.error('请先初始化textbox，再执行其他操作！\n textbox初始化：$().textbox(Object);');
          return;
        }
        data = new Textbox(this, options);
        data.$input.data('si.textbox', data);
      } else {
        if (typeof option === 'object') data['set'](option);
      }
      if (typeof option === 'string') data[option](_relatedTarget);
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
    hasSurface: false,
    label: '',
    multiline: false,
    id: '',
    name: '',
    labelWidth: '',
    inputWidth: '',
    readonly: false,
    disabled: false,
    value: '',
    placeholder: '',
    size: '',
    helpText: '',
    rows: '',
    cols: '',
    width: ''
  };
})(jQuery);