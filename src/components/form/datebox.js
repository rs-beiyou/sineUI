import 'libs/daterangepicker/daterangepicker.css';
import 'libs/daterangepicker/daterangepicker.js';

import BaseForm from './form-base';
import _ from '../../utils/util';

class Datebox extends BaseForm{
  constructor(el, options){
    super(el, options, Datebox.DEFAULTS);
    this.className = 'Datebox';
    this.inited = false;
    this._initForm();
  }
  _setDatebox(item, newVal, val){
    let $input = this.$input,
      $datebox = this.$datebox,
      $datetion = this.$datetion,
      $clear = this.$clear;
    if(!this.$input){
      let _input = document.createElement('input');
      let _datebox = document.createElement('div');
      let _datetion = document.createElement('div');
      let _calendar = document.createElement('i');
      let _clear = document.createElement('i');
      $datebox = $(_datebox);
      $input = $(_input);
      $datetion = $(_datetion);
      $clear = $(_clear);
      $(_calendar).addClass(`${this.lastOptions.icon} si-form-control-icon`);
      $clear.addClass(`${this.lastOptions.clearIcon} si-form-control-icon`);
      $input.addClass('form-control has-icon-right');
      $datetion.addClass('si-datebox-datetion').append(_calendar).append(_clear);
      $datebox.addClass('si-datebox').append(_input).append(_datetion);
      this.$formBlock.append(_datebox);
      this.$input = $input;
      this.$datebox = $datebox;
      this.$datetion = $datetion;
      this.$clear = $clear;
      !this.lastOptions.readonly&&!this.lastOptions.disabled&&this.initDate();
    }
    switch (item) {
      case 'id':
      case 'name':
      case 'placeholder':
        $input.attr(item, newVal);
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
      case 'width':
        $input.css('width', newVal);
        break;
    }
  }
  initDate(){
    let op = this.options,lop = this.lastOptions, $input = this.$input;
    $input.daterangepicker({
      showDropdowns: true,
      autoUpdateInput: false,
      singleDatePicker: true,
      autoApply: true,
      locale: {
        format :lop.format
      },
      minDate: lop.minDate,
      maxDate: lop.maxDate
    }).on('apply.daterangepicker', (ev, picker)=> {
      op.value = picker.startDate.format(op.format);
    }).on('cancel.daterangepicker', ()=> {
      op.value = '';
    });
    this.$clear.on('click',()=>{
      $input.trigger('cancel.daterangepicker');
    });
    this.inited = true;
  }
  _setReadonly(newVal){
    newVal===undefined?newVal = this.options.readonly:undefined;
    let $input = this.$input, $datebox = this.$datebox;
    if(newVal){
      $datebox.addClass('si-form-readonly');
      $input.attr('readonly',true);
      this.inited&&this.destroy();
    }else{
      $datebox.removeClass('si-form-readonly');
      $input.removeAttr('readonly');
      this.initDate();
    }
  }
  _setDisabled(newVal){
    newVal===undefined?newVal = this.options.readonly:undefined;
    let $input = this.$input, $datebox = this.$datebox;
    if(newVal){
      $datebox.addClass('si-form-disabled');
      $input.attr('disabled',true);
      this.inited&&this.destroy();
    }else{
      $datebox.removeClass('si-form-disabled');
      $input.removeAttr('disabled');
      this.initDate();
    }
  }
  _setValue(newVal, val){
    let op = this.options;
    !op.readonly&&!op.disabled&&!this.inited&&this.initDate();
    this.$input.val(newVal?_.formatDate(new Date(newVal),op.format):'');
    this.inited&&this.$input.daterangepicker('elementChanged');
    !this.firstVal && this.$input.trigger('valid.change').trigger('change');
    this.firstVal = false;
    if(newVal!==''&&val===''){
      this.$datebox.addClass('si-show-clear');
    }
    if(newVal===''){
      this.$datebox.removeClass('si-show-clear');
    }
  }
  destroy(){
    this.$clear.off('click');
    this.$input.daterangepicker('remove');
    this.inited = false;
  }
}

function Plugin(option) {
  try {
    let value, args = Array.prototype.slice.call(arguments, 1);
    
    this.each(function(){
      let $this = $(this),
        dataSet = $this.data(),
        data = dataSet['si.datebox'];
        
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.datebox');
        }
      }
      if(typeof option === 'object'&& data){
        data.set(option);
      }
      if (!data) {
        let options = $.extend( {} , Datebox.DEFAULTS, typeof option === 'object' && option);
        let datakeys = Object.keys(dataSet);
        let defaultkeys = Object.keys(options);
        defaultkeys.forEach((key) => {
          let lowkey = key.toLocaleLowerCase();
          if (datakeys.includes(lowkey)) {
            options[key] = dataSet[lowkey];
          }
        });
        data = new Datebox(this, options);
        data.$input.data('si.datebox', data);
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    throw new Error(error);
  }
}

Datebox.DEFAULTS = {
  hasSurface: false,
  label: '',
  id: '',
  name: '',
  labelWidth: '',
  inputWidth: '',
  labelAlign: 'right',
  readonly: false,
  disabled: false,
  value: '',
  placeholder: '',
  size: '',
  helpText: '',
  width: '',
  valid: false,
  format:'YYYY-MM-DD',
  minDate:'',
  maxDate:'',
  icon:'fa fa-calendar-o fa-fw',
  clearIcon:'fa fa-times-circle fa-fw'
};
let old = $.fn.datebox;

$.fn.datebox = Plugin;
$.fn.datebox.defaults = Datebox.DEFAULTS;
$.fn.datebox.Constructor = Datebox;

$.fn.datebox.noConflict = function() {
  $.fn.datebox = old;
  return this;
};