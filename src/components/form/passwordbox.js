import BaseForm from './form-base';
import { Log } from '../../libs/log';

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
      $input.addClass('form-control').attr({'type':'password'});
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
        this._setValue(newVal);
        break;
      case 'width':
        $input.css('width', newVal);
        break;
    }
  }
  _setValue(newVal){
    let op = this.options;
    if(this.$input.val()!=newVal){
      this.$input.val(newVal);
      op.value = newVal;
    }
    try {
      op.valid && !this.firstVal && this.$input.trigger('valid.change');
    } catch (error) {
      Log.error(error);
    }
    this.firstVal = false;
  }
}

function Plugin(option) {
  try {
    let value, args = Array.prototype.slice.call(arguments, 1);
    
    this.each(function(){
      let $this = $(this),
        dataSet = $this.data(),
        data = dataSet['si.passwordbox'];
        
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.passwordbox');
        }
      }
      if(typeof option === 'object'&& data){
        data.set(option);
      }
      if (!data) {
        let options = $.extend( {} , Passwordbox.DEFAULTS, typeof option === 'object' && option);
        let datakeys = Object.keys(dataSet);
        let defaultkeys = Object.keys(options);
        defaultkeys.forEach((key) => {
          let lowkey = key.toLocaleLowerCase();
          if (datakeys.includes(lowkey)) {
            options[key] = dataSet[lowkey];
          }
        });
        data = new Passwordbox(this, options);
        data.$input.data('si.passwordbox', data);
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    throw new Error(error);
  }
}

Passwordbox.DEFAULTS = {
  label: '',
  id: '',
  name: '',
  labelWidth: '',
  inputWidth: '',
  labelAlign: 'right',
  readonly: false,
  disabled: false,
  helpText: '',
  size: '',
  value: '',
  placeholder: '',
  width: '',
  valid: false
};
let old = $.fn.passwordbox;

$.fn.passwordbox = Plugin;
$.fn.passwordbox.defaults = Passwordbox.DEFAULTS;
$.fn.passwordbox.Constructor = Passwordbox;

$.fn.passwordbox.noConflict = function() {
  $.fn.passwordbox = old;
  return this;
};
