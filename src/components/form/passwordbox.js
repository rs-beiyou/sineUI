import BaseForm from './form-base';
(function($) {
  class Passwordbox extends BaseForm {
    constructor(el, options) {
      super(el, options, Passwordbox.DEFAULTS);
      this.className = 'Passwordbox';
      this._initForm();
    }
    _setPasswordbox(item, newVal) {
      let $input = this.$input;
      if (!this.$input) {
        let _input = document.createElement('input');
        $input = $(_input);
        $input.addClass('form-control');
        $input.attr({'type':'password','autocomplete':'off'});
        this.$input = $input;
        this.$formBlock.append(_input);
      }
      switch (item) {
        case 'id':
        case 'name':
        case 'placeholder':
        case 'readonly':
        case 'disabled':
          $input.attr(item, newVal);
          break;
        case 'value':
          $input.val(newVal);
          break;
        case 'width':
          $input.css('width', newVal);
          break;
        case 'valid':
          $input.valid(newVal, this);
          break;
      }
    }
  }

  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      let $this = $(this);
      let dataSet = $this.data();
      let data = dataSet['si.passwordbox'];

      if (!data) {
        //data-api覆盖data-options
        let options = Object.assign({}, Passwordbox.DEFAULTS, typeof option === 'object' && option);
        let datakeys = Object.keys(dataSet);
        let defaultkeys = Object.keys(options);
        defaultkeys.forEach((key) => {
          let lowkey = key.toLocaleLowerCase();
          if (datakeys.includes(lowkey)) {
            options[key] = dataSet[lowkey];
          }
        });
        if (typeof option !== 'object') {
          console.error('请先初始化passwordbox，再执行其他操作！\n passwordbox初始化：$().passwordbox(Object);');
          return;
        }
        data = new Passwordbox(this, options);
        data.$input.data('si.passwordbox', data);
      } else {
        if (typeof option === 'object') data['set'](option);
      }
      if (typeof option === 'string') data[option](_relatedTarget);
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