import BaseForm from './form-base';
(function($) {
  class Switchbox extends BaseForm {
    constructor(el, options) {
      super(el, options, Switchbox.DEFAULTS);
      this.className = 'Switchbox';
      this._initForm();
    }
    _setSwitchbox(item) {
      let op = this.options;
      let $input = this.$input,
        $switchbox = this.$switchbox;
      if (!this.$input) {
        let _switchbox = document.createElement('div');
        let _input = document.createElement('input');
        let _inner = document.createElement('div');
        let $switchbox = $(_switchbox);
        let $input = $(_input);
        let $inner = $(_inner);
        $input.attr('type', 'hidden');
        $inner.addClass('si-switchbox-inner');
        $switchbox.addClass('si-switchbox').append(_input).append(_inner);
        this.$formBlock.append(_switchbox);
        this.$input = $input;
        this.$switchbox = $switchbox;
        this.$switchboxInner = $inner;
        this._addEvent();
      }
      switch (item) {
        case 'id':
        case 'name':
          $input.attr(item, op[item]);
          break;
        case 'readonly':
        case 'disabled':
          if (op[item]) {
            $switchbox.addClass('si-switchbox-disabled');
          } else {
            $switchbox.removeClass('si-switchbox-disabled');
          }
          if (item === 'disabled') {
            $input.attr(item, op[item]);
          }
          break;
        case 'value':
          setTimeout(() => {
            if (op[item] === op.trueValue) {
              $switchbox.addClass('si-switchbox-checked');
            } else {
              $switchbox.removeClass('si-switchbox-checked');
            }
            $input.val(op[item]).trigger('change');
          });
          break;
      }
    }
    _addEvent() {
      let $switchbox = this.$switchbox;
      let op = this.options;
      $switchbox.on('click', () => {
        if (op.readonly || op.disabled) return;
        if (op.value === op.trueValue) {
          op.value = op.falseValue;
        } else {
          op.value = op.trueValue;
        }
      });
    }
  }

  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      let $this = $(this);
      let dataSet = $this.data();
      let data = dataSet['si.switchbox'];
      dataSet.data ? dataSet.data = (new Function('return ' + dataSet.data))() : false;
      //data-api覆盖data-options
      let options = Object.assign({}, Switchbox.DEFAULTS, typeof option == 'object' && option);
      let datakeys = Object.keys(dataSet);
      let defaultkeys = Object.keys(options);
      defaultkeys.forEach((key) => {
        let lowkey = key.toLocaleLowerCase();
        if (datakeys.includes(lowkey)) {
          options[key] = dataSet[lowkey];
        }
      });
      if (!data) {
        if (typeof option !== 'object') {
          console.error('请先初始化Switchbox，再执行其他操作！\n Switchbox初始化：$().switchbox(Object);');
          return;
        }
        data = new Switchbox(this, options);
        data.$input.data('si.switchbox', data);
      } else {
        if (typeof option == 'object') data['set'](option);
      }
      if (typeof option == 'string') data[option](_relatedTarget);
    });
  }

  let old = $.fn.switchbox;

  $.fn.switchbox = Plugin;
  $.fn.switchbox.Constructor = Switchbox;

  $.fn.switchbox.noConflict = function() {
    $.fn.switchbox = old;
    return this;
  };
  Switchbox.DEFAULTS = {
    label: '',
    id: '',
    name: '',
    size: '',
    value: false,
    disabled: false,
    readonly: false,
    trueValue: true,
    falseValue: false,
    trueText: '',
    falseText: '',
    trueIcon: '',
    falseIcon: '',
    labelWidth: '',
    inputWidth: ''
  };
})(jQuery);