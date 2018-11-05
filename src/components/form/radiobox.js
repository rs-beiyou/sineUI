import BaseForm from './form-base';
import _ from '../../utils/util';
class Radiobox extends BaseForm {
  constructor(el, options) {
    super(el, options, Radiobox.DEFAULTS);
    this.className = 'Radiobox';
    this._initForm();
  }
  _setRadiobox(item, newVal, val) {
    let op = this.options;
    let $input = this.$input,
      $radiobox = this.$radiobox;
    if (!this.$input) {
      let _input = document.createElement('input');
      let _radiobox = document.createElement('div');
      $radiobox = $(_radiobox);
      $input = $(_input);
      $input.attr('type', 'hidden');
      $radiobox.addClass('si-radiobox').append(_input);
      this.$formBlock.append(_radiobox);
      this.$input = $input;
      this.$radiobox = $radiobox;
    }
    switch (item) {
      case 'id':
      case 'name':
        $input.attr(item, newVal);
        break;
      case 'wrap':
        $radiobox[newVal===true?'addClass':'removeClass']('si-radiobox-wrap');
        break;
      case 'readonly':
        this._setReadonly(newVal);
        break;
      case 'disabled':
        this._setDisabled(newVal);
        break;
      case 'value':
        this._setValue(newVal, val);
        break;
      case 'data':
        this._setAttachList(newVal);
        op.value !== '' && this._setValue(op.value);
        op.readonly !== false && this._setReadonly(op.readonly);
        op.disabled !== false && this._setDisabled(op.disabled);
        break;
    }
  }
  _setReadonly(newVal) {
    if (this.radioboxDom) {
      let rl = newVal,
        cbd = this.radioboxDom,
        rla = this.readonlyArr || [],
        newRla;
      if (typeof rl === 'boolean') {
        newRla = rl ? Object.keys(cbd) : [];
      }
      if (typeof rl === 'number') {
        newRla = String(rl).split(',');
      }
      if (typeof rl === 'string') {
        newRla = rl ? rl.split(',') : [];
      }
      let arr1 = _.compare(newRla, rla);
      let arr2 = _.compare(rla, newRla);
      arr1.forEach(key => {
        cbd[key] && cbd[key].$input.attr('disabled', true) && cbd[key].$radiobox.addClass('si-radiobox-disabled');
      });
      arr2.forEach(key => {
        cbd[key] && cbd[key].$input.removeAttr('disabled') && cbd[key].$radiobox.removeClass('si-radiobox-disabled');
      });
      this.readonlyArr = newRla;
    }
  }
  _setDisabled(newVal) {
    if (this.radioboxDom) {
      let da = newVal,
        cbd = this.radioboxDom,
        $input = this.$input;
      if (typeof da === 'boolean') {
        let newDaa = Object.keys(cbd);
        if (da) {
          newDaa.forEach(key => {
            cbd[key] && cbd[key].$input.attr('disabled', true) && cbd[key].$radiobox.addClass('si-radiobox-disabled');
          });
          $input.attr('disabled', true);
        } else {
          newDaa.forEach(key => {
            cbd[key] && cbd[key].$input.removeAttr('disabled') && cbd[key].$radiobox.removeClass('si-radiobox-disabled');
          });
          $input.removeAttr('disabled');
        }
      }
    }
  }
  _setValue(newVal, val) {
    if (this.radioboxDom && !this.dataReloading) {
      let va = newVal,
        vac = val,
        cbd = this.radioboxDom;
      cbd[va] && cbd[va].$radiobox.addClass('si-radiobox-checked');
      cbd[vac] && cbd[vac].$radiobox.removeClass('si-radiobox-checked') && cbd[vac].$input.attr('checked', false);
    }
    val!==undefined && this.$input.val(newVal);
    if (this.firstVal) {
      this.firstVal = false;
    } else {
      val!==undefined && this.$input.trigger('valid.change').trigger('change');
    }
  }
  _setAttachList(newVal) {
    this.radioboxDom = {};
    let op = this.options;
    let radioboxDom = this.radioboxDom,
      data = newVal,
      keyField = op.keyField,
      valueField = op.valueField,
      $radiobox = this.$radiobox,
      $list;
    if (this.$checkboxList) {
      $list = this.$checkboxList;
    } else {
      let list = document.createElement('div');
      $list = $(list);
      $list.addClass('si-radiobox-list');
      this.$radioboxList = $list;
      $radiobox.append(list);
    }
    let fragment = document.createDocumentFragment();
    for (let i = 0, len = data.length; i < len; i++) {
      let label = document.createElement('label');
      let radiobox = document.createElement('span');
      let span = document.createElement('span');
      $(span).addClass('si-radiobox-inner');
      let input = document.createElement('input');
      $(input).attr({
        type: 'radio',
        value: data[i][valueField]
      }).addClass('si-radiobox-input');
      $(radiobox).data('value', data[i][valueField]).addClass('si-radiobox-content').append(span).append(input);
      $(label).addClass('si-radiobox-item').append(radiobox).append(data[i][keyField]);
      fragment.appendChild(label);
      Object.assign(radioboxDom, {
        [data[i][valueField]]: {
          $radiobox: $(label),
          $input: $(input)
        }
      });
      $(input).on('change', function() {
        op.value = this.value;
      });
    }
    $list.html(fragment);
  }
  getKey(){
    let op = this.options;
    if(op.value === ''){
      return '';
    }
    return op.data.filter(item=>{
      return op.value === item[op.valueField];
    })[0][op.keyField];
  }
  getData() {
    return this.options.data;
  }
}

function Plugin(option) {
  try {
    let value, args = Array.prototype.slice.call(arguments, 1);
    
    this.each(function(){
      let $this = $(this),
        dataSet = $this.data(),
        data = dataSet['si.radiobox'];
        
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.radiobox');
        }
      }
      if(typeof option === 'object'&& data){
        data.set(option);
      }
      if (!data) {
        dataSet.data ? dataSet.data = (new Function('return ' + dataSet.data))() : false;
        let options = $.extend( {} , Radiobox.DEFAULTS, typeof option === 'object' && option);
        let datakeys = Object.keys(dataSet);
        let defaultkeys = Object.keys(options);
        defaultkeys.forEach((key) => {
          let lowkey = key.toLocaleLowerCase();
          if (datakeys.includes(lowkey)) {
            options[key] = dataSet[lowkey];
          }
        });
        data = new Radiobox(this, options);
        data.$input.data('si.radiobox', data);
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    throw new Error(error);
  }
}

Radiobox.DEFAULTS = {
  label: '',
  id: '',
  name: '',
  wrap: false,
  labelWidth: '',
  inputWidth: '',
  labelAlign: 'right',
  width: '',
  readonly: false,
  disabled: false,
  placeholder: '',
  helpText: '',
  size: '',
  keyField: 'key',
  valueField: 'value',
  data: [],
  url: '',
  value: '',
  valid: false
};
let old = $.fn.radiobox;

$.fn.radiobox = Plugin;
$.fn.radiobox.defaults = Radiobox.DEFAULTS;
$.fn.radiobox.Constructor = Radiobox;

$.fn.radiobox.noConflict = function() {
  $.fn.radiobox = old;
  return this;
};
