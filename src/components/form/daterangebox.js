import 'libs/daterangepicker/daterangepicker.css';
import 'libs/daterangepicker/daterangepicker';

import BaseForm from './form-base';
// import moment from 'libs/daterangepicker/moment.min.js';
import moment from 'moment';

class Daterangebox extends BaseForm{
  constructor(el, options){
    super(el, options, Daterangebox.DEFAULTS);
    this.className = 'Daterangebox';
    this.inited = false;
    this._initForm();
  }
  _setDaterangebox(item, newVal, val){
    let $input = this.$input,
      $datebox = this.$datebox,
      $datetion = this.$datetion,
      $clear = this.$clear,
      $inputBegin = this.$inputBegin,
      $inputEnd = this.$inputEnd;
    if(!this.$input){
      let _input = document.createElement('input'),
        _datebox = document.createElement('div'),
        _datetion = document.createElement('div'),
        _calendar = document.createElement('i'),
        _clear = document.createElement('i'),
        _inputBegin = document.createElement('input'),
        _inputEnd = document.createElement('input');
      $datebox = $(_datebox);
      $input = $(_input);
      $datetion = $(_datetion);
      $clear = $(_clear);
      $inputBegin = $(_inputBegin);
      $inputEnd = $(_inputEnd);
      $inputBegin.attr('type','hidden');
      $inputEnd.attr('type','hidden');
      $(_calendar).addClass(`${this.lastOptions.icon} form-control-icon`);
      $clear.addClass(`${this.lastOptions.clearIcon} form-control-icon`);
      $input.addClass('form-control has-icon-right');
      $datetion.addClass('si-datebox-datetion').append(_inputBegin).append(_inputEnd).append(_calendar).append(_clear);
      $datebox.addClass('si-datebox').append(_input).append(_datetion);
      this.$formBlock.append(_datebox);
      this.$input = $input;
      this.$datebox = $datebox;
      this.$datetion = $datetion;
      this.$clear = $clear;
      this.$inputBegin = $inputBegin;
      this.$inputEnd = $inputEnd;
      setTimeout(()=>{
        !this.options.readonly&&!this.options.disabled&&this.initDate();
      });
    }
    switch (item) {
      case 'id':
      case 'placeholder':
        $input.attr(item, newVal);
        break;
      case 'name':
        $input.attr(item, newVal);
        $inputBegin.attr(item, `${newVal}_begin`);
        $inputEnd.attr(item, `${newVal}_end`);
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
      case 'valid':
        $input.valid(newVal, this);
        break;
      case 'width':
        $input.css('width', newVal);
        break;
    }
  }
  initDate(){
    let op = this.options, $input = this.$input;
    $input.daterangepicker({
      showDropdowns: true,
      autoUpdateInput: false,
      singleDatePicker: false,
      autoApply: true,
      locale: {
        format: op.format,
        separator: op.separator
      },
      minDate: op.minDate,
      maxDate: op.maxDate,
      ranges: op.ranges&&Daterangebox.ranges
    }).on('apply.daterangepicker', (ev, picker)=> {
      op.value = `${picker.startDate.format(op.format)}${this.options.separator}${picker.endDate.format(op.format)}`;
    }).on('cancel.daterangepicker', ()=> {
      op.value = '';
    });
    this.$clear.on('click',()=>{
      $input.trigger('cancel.daterangepicker');
    });
    this.inited = true;
  }
  _setReadonly(newVal){
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
    this.$input.val(newVal);
    this.inited&&this.$input.daterangepicker('elementChanged').trigger('valid.change').trigger('change');
    if(newVal!==''&&val===''){
      let valArr = newVal.split(this.options.separator);
      this.$inputBegin.val(valArr[0]);
      this.$inputEnd.val(valArr[1]);
      this.$datebox.addClass('si-show-clear');
    }
    if(newVal===''){
      this.$inputBegin.val('');
      this.$inputEnd.val('');
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
        data = dataSet['si.daterangebox'];
        
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.daterangebox');
        }
      }
      if(typeof option === 'object'&& data){
        data.set(option);
      }
      if (!data) {
        let options = $.extend( {} , Daterangebox.DEFAULTS, typeof option === 'object' && option);
        let datakeys = Object.keys(dataSet);
        let defaultkeys = Object.keys(options);
        defaultkeys.forEach((key) => {
          let lowkey = key.toLocaleLowerCase();
          if (datakeys.includes(lowkey)) {
            options[key] = dataSet[lowkey];
          }
        });
        data = new Daterangebox(this, options);
        data.$input.data('si.daterangebox', data);
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    throw new Error(error);
  }
}

Daterangebox.ranges = {
  '今天': [
    moment().startOf(0, 'day'), moment().endOf('day')
  ],
  '最近7日': [
    moment().subtract(6,'days').startOf('day'),
    moment().endOf(0,'day')
  ],
  '最近三个月': [
    //moment().startOf("month"), moment().endOf("month")
    moment().subtract(3, 'month').startOf('month'),
    moment().subtract(1, 'month').endOf('month')
  ],
  '最近一年': [
    moment().subtract(12, 'month').startOf('day'),
    moment().endOf(0,'day')
  ]
};

let old = $.fn.daterangebox;

$.fn.daterangebox = Plugin;
$.fn.daterangebox.Constructor = Daterangebox;
$.fn.daterangebox.ranges = Daterangebox.ranges;
$.fn.daterangebox.noConflict = function() {
  $.fn.daterangebox = old;
  return this;
};
  
Daterangebox.DEFAULTS = {
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
  width: '',
  valid: false,
  format: 'YYYY-MM-DD',
  separator: ' - ',
  ranges: false,
  minDate: '',
  maxDate: '',
  icon:'fa fa-calendar-o',
  clearIcon:'fa fa-times-circle'
};
