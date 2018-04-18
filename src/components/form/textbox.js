import BaseForm from './form-base';
class Textbox extends BaseForm {
  constructor(el, options) {
    super(el, options, Textbox.DEFAULTS);
    this.className = 'Textbox';
    this._initForm();
  }
  _setTextbox(item, newVal) {
    let op = this.options;
    let $input = this.$input;
    if (!$input) {
      let _input = this.lastOptions.multiline ? document.createElement('textarea') : document.createElement('input');
      $input = $(_input);
      $input.addClass('form-control');
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
      case 'rows':
      case 'cols':
        if (op.multiline) {
          $input.attr(item, newVal);
        }
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

function Plugin(option) {
  try {
    let value, args = Array.prototype.slice.call(arguments, 1);
    
    this.each(function(){
      let $this = $(this),
        dataSet = $this.data(),
        data = dataSet['si.textbox'];
        
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.textbox');
        }
      }
      if(typeof option === 'object'&& data){
        data.set(option);
      }
      if (!data) {
        let options = $.extend( {} , Textbox.DEFAULTS, typeof option === 'object' && option);
        let datakeys = Object.keys(dataSet);
        let defaultkeys = Object.keys(options);
        defaultkeys.forEach((key) => {
          let lowkey = key.toLocaleLowerCase();
          if (datakeys.includes(lowkey)) {
            options[key] = dataSet[lowkey];
          }
        });
        data = new Textbox(this, options);
        data.$input.data('si.textbox', data);
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    throw new Error(error);
  }
}
let old = $.fn.textbox;

$.fn.textbox = Plugin;
$.fn.textbox.Constructor = Textbox;

$.fn.textbox.noConflict = function() {
  $.fn.textbox = old;
  return this;
};

Textbox.DEFAULTS = {
  multiline: false,
  hasSurface: false,
  label: '',
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
  width: '',
  valid: false
};