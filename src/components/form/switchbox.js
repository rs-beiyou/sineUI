import BaseForm from './form-base';
(function($) {
  class Switchbox extends BaseForm {
    constructor(el, options) {
      super(el, options, Switchbox.DEFAULTS);
      this.className = 'Switchbox';
      this._initForm();
    }
    _setSwitchbox(item, newVal) {
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
          $input.attr(item, newVal);
          break;
        case 'readonly':
        case 'disabled':
          if (newVal) {
            $switchbox.addClass('si-switchbox-disabled');
          } else {
            $switchbox.removeClass('si-switchbox-disabled');
          }
          if (item === 'disabled') {
            $input.attr(item, newVal);
          }
          break;
        case 'value':
          setTimeout(() => {
            if (newVal === op.trueValue) {
              $switchbox.addClass('si-switchbox-checked');
            } else {
              $switchbox.removeClass('si-switchbox-checked');
            }
            $input.val(newVal).trigger('change').trigger('valid.change');
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

  function Plugin(option) {
    try {
      let value, args = Array.prototype.slice.call(arguments, 1);
      
      this.each(function(){
        let $this = $(this),
          dataSet = $this.data(),
          data = dataSet['si.switchbox'];
          
        if (typeof option === 'string') {
          if (!data) {
            return;
          }
          value = data[option].apply(data, args);
          if (option === 'destroy') {
            $this.removeData('si.switchbox');
          }
        }
        if(typeof option === 'object'&& data){
          data.set(option);
        }
        if (!data) {
          let options = $.extend( {} , Switchbox.DEFAULTS, typeof option === 'object' && option);
          let datakeys = Object.keys(dataSet);
          let defaultkeys = Object.keys(options);
          defaultkeys.forEach((key) => {
            let lowkey = key.toLocaleLowerCase();
            if (datakeys.includes(lowkey)) {
              options[key] = dataSet[lowkey];
            }
          });
          data = new Switchbox(this, options);
          data.$input.data('si.switchbox', data);
        }
      });
      return typeof value === 'undefined' ? this : value;
    } catch (error) {
      throw new Error(error);
    }
  }
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
    inputWidth: '',
    labelAlign: 'right'
  };

  let old = $.fn.switchbox;

  $.fn.switchbox = Plugin;
  $.fn.switchbox.defaults = Switchbox.DEFAULTS;
  $.fn.switchbox.Constructor = Switchbox;

  $.fn.switchbox.noConflict = function() {
    $.fn.switchbox = old;
    return this;
  };
})(jQuery);