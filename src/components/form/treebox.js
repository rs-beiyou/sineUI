import '../tree';

import BaseForm from './form-base';

class Treebox extends BaseForm {
  constructor(el, options) {
    super(el, options, Treebox.DEFAULTS);
    this.className = 'Treebox';
    this._initForm();
  }
  _setTreebox(item, newVal) {
    let op = this.options;
    let $input = this.$input,
      $treebox = this.$treebox,
      $tree = this.$tree,
      $placeholder = this.$placeholder,
      $dropdown = this.$dropdown,
      $treeValue = this.$treeValue,
      $clear = this.$clear;
    if (!$input) {
      let _input = this.create('input'),
        _treebox = this.create('div'),
        _tree = this.create('div'),
        _placeholder = this.create('div'),
        _dropdown = this.create('div'),
        _treeValue = this.create('div'),
        _treeIcon = this.create('i'),
        _clear = this.create('i');
      $input = $(_input);
      $treebox = $(_treebox);
      $tree = $(_tree);
      $placeholder = $(_placeholder);
      $dropdown = $(_dropdown);
      $treeValue = $(_treeValue);
      let $treeIcon = $(_treeIcon);
      $clear = $(_clear);
      $input.attr('type','hidden');
      $placeholder.addClass('si-placeholder');
      $treeValue.addClass('si-treebox-value').hide();
      $treeIcon.addClass(`${this.lastOptions.icon} form-control-icon`);
      $clear.addClass(`${this.lastOptions.clearIcon} form-control-icon`);
      $tree.derection().addClass('form-control si-treebox-tree has-icon-right').append(_treeValue).append(_placeholder).append(_treeIcon).append(_clear);
      $dropdown.addClass('si-dropdown si-treebox-dropdown').hide();
      $treebox.addClass('si-treebox').append(_input).append(_tree);
      if(this.lastOptions.transfer){
        $dropdown.addClass('si-treebox-dropdown-transfer');
        $('body').append(_dropdown);
      }else{
        $treebox.append(_dropdown);
      }
      this.$formBlock.append(_treebox);
      this.$input = $input;
      this.$treebox = $treebox,
      this.$tree = $tree,
      this.$placeholder = $placeholder,
      this.$dropdown = $dropdown,
      this.$treeValue = $treeValue,
      this.$clear = $clear;
      setTimeout(() => {
        $dropdown.width($tree.outerWidth());
      });
    }
    switch (item) {
      case 'id':
      case 'name':
        $input.attr(item, newVal);
        break;
      case 'placeholder':
        $placeholder.text(newVal);
        break;
      case 'readonly':
        this._setReadonly(newVal);
        break;
      case 'disabled':
        this._setDisabled(newVal);
        break;
      case 'value':
        this._setValue(newVal);
        break;
      case 'width':
        $tree.css('width', newVal);
        break;
      case 'valid':
        $input.valid(newVal, this);
        break;
    }
  }
  _setReadonly(){
    
  }
  _setDisabled(){
    
  }
  _setValue(){
    
  }
}

function Plugin(option) {
  try {
    let value, args = Array.prototype.slice.call(arguments, 1);
    
    this.each(function(){
      let $this = $(this),
        dataSet = $this.data(),
        data = dataSet['si.treebox'];
        
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.treebox');
        }
      }
      if(typeof option === 'object'&& data){
        data.set(option);
      }
      if (!data) {
        let options = $.extend( {} , Treebox.DEFAULTS, typeof option === 'object' && option);
        let datakeys = Object.keys(dataSet);
        let defaultkeys = Object.keys(options);
        defaultkeys.forEach((key) => {
          let lowkey = key.toLocaleLowerCase();
          if (datakeys.includes(lowkey)) {
            options[key] = dataSet[lowkey];
          }
        });
        data = new Treebox(this, options);
        data.$input.data('si.treebox', data);
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    throw new Error(error);
  }
}
let old = $.fn.treebox;

$.fn.treebox = Plugin;
$.fn.treebox.Constructor = Treebox;

$.fn.treebox.noConflict = function() {
  $.fn.treebox = old;
  return this;
};

Treebox.DEFAULTS = {
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
  valid: false,
  icon:'fa fa-code-fork',
  clearIcon:'fa fa-times-circle'
};