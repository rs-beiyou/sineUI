import './derection';

import BaseForm from './form-base';
import _ from '../../utils/util';

(function($) {
  class Selectbox extends BaseForm {
    constructor(el, options) {
      super(el, options, Selectbox.DEFAULTS);
      this.className = 'Selectbox';
      this.derection = '';
      this.randomString = _.randomString();
      this._initForm();
    }
    _setSelectbox(item, newVal, val) {
      let op = this.options;
      let $input = this.$input,
        $selectbox = this.$selectbox,
        $selection = this.$selection,
        $placeholder = this.$placeholder,
        $dropdown = this.$dropdown,
        $selectValue = this.$selectValue,
        $clear = this.$clear;
      if (!this.$input) {
        let _input = document.createElement('input');
        let _selectbox = document.createElement('div');
        let _dropdown = document.createElement('div');
        let _selection = document.createElement('div');
        let _selectValue = document.createElement('div');
        let _placeholder = document.createElement('div');
        let _cert = document.createElement('i');
        let _clear = document.createElement('i');

        $placeholder = $(_placeholder);
        $selectbox = $(_selectbox);
        $input = $(_input);
        $dropdown = $(_dropdown);
        $selection = $(_selection);
        $selectValue = $(_selectValue);
        $clear = $(_clear);
        $(_cert).addClass(`${this.lastOptions.icon} si-form-control-icon`);
        $clear.addClass(`${this.lastOptions.clearIcon} si-form-control-icon`);
        $placeholder.addClass('si-placeholder');
        op.placeholder && $placeholder.text(op.placeholder);
        $input.attr('type', 'hidden');
        $selectValue.addClass('si-selectbox-selected-value').hide();
        $dropdown.addClass('si-dropdown si-selectbox-dropdown').hide();
        $selection.derection().addClass('form-control si-selectbox-selection has-icon-right').append(_selectValue).append(_placeholder).append(_cert).append(_clear);
        $selectbox.addClass('si-selectbox si-selectbox-single').append(_input).append(_selection);
        if(this.lastOptions.transfer){
          $dropdown.addClass('si-selectbox-single si-selectbox-dropdown-transfer');
          $('body').append(_dropdown);
        }else{
          $selectbox.append(_dropdown);
        }
        this.$formBlock.append(_selectbox);
        this.$input = $input;
        this.$selectbox = $selectbox;
        this.$dropdown = $dropdown;
        this.$selection = $selection;
        this.$selectValue = $selectValue;
        this.$placeholder = $placeholder;
        this.$clear = $clear;
        this.readonlyArr = []; //readonlyArr表示只读项数组
        this._initEvent();
      }
      switch (item) {
        case 'id':
        case 'name':
          $input.attr(item, newVal);
          break;
        case 'placeholder':
          $placeholder.text(newVal);
          break;
        case 'width':
          $selection.css('width', newVal);
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
          if (!Array.isArray(newVal)) return;
          this._setAttachList(newVal);
          op.value && this._setValue(op.value);
          op.readonly !== false && this._setReadonly(op.readonly);
          op.disabled !== false && this._setDisabled(op.disabled);
          break;
        case 'search':
          this._setSearch();
          break;
        case 'multiple':
          if (newVal) {
            $selectbox.removeClass('si-selectbox-single').addClass('si-selectbox-multiple');
            op.transfer&&$dropdown.removeClass('si-selectbox-single').addClass('si-selectbox-multiple');
          } else {
            $selectbox.removeClass('si-selectbox-multiple').addClass('si-selectbox-single');
            op.transfer&&$dropdown.removeClass('si-selectbox-multiple').addClass('si-selectbox-single');
          }
          break;
      }
    }
    _setReadonly(newVal) {
      if (this.selectboxDom) {
        let rl = newVal,
          $selectbox = this.$selectbox;
        if (typeof rl === 'boolean') {
          rl && $selectbox.addClass('si-form-readonly')&&this._removeEvent();
          !rl && $selectbox.removeClass('si-form-readonly')&&this._addEvent();
          return;
        }
        if (typeof rl === 'number') {
          rl = String(rl);
        }
        if (typeof rl === 'string') {
          let sbd = this.selectboxDom,
            rla = this.readonlyArr;
          let newRla = rl ? rl.split(',') : [];
          let arr1 = _.compare(newRla, rla);
          let arr2 = _.compare(rla, newRla);
          arr1.forEach(key => {
            sbd[key] && sbd[key].$selectbox.addClass('si-selectbox-item-disabled');
          });
          arr2.forEach(key => {
            sbd[key] && sbd[key].$selectbox.removeClass('si-selectbox-item-disabled');
          });
          this.readonlyArr = newRla;
        }
      }
    }
    _setDisabled(newVal) {
      if (this.selectboxDom) {
        let da = newVal,
          $selectbox = this.$selectbox;
        da && $selectbox.addClass('si-form-disabled')&&this._removeEvent();
        !da && $selectbox.removeClass('si-form-disabled')&&this._addEvent();
      }
    }
    _setSearch(){}
    _initEvent(){
      this._addEvent();
      let op = this.options;
      this.$clear.on('click', (e) => {
        op.value = '';
        this.opened && this._close();
        document.all ? e.cancelBubble=true : e.stopPropagation();
      });
    }
    _addEvent() {
      $(document).on(`click.si.selectbox.${this.randomString}`, this._close.bind(this));
      this.$selection.on('click.si.selectbox', this._toogle.bind(this));
    }
    _removeEvent(){
      $(document).off(`click.si.selectbox.${this.randomString}`);
      this.$selection.off('click.si.selectbox');
    }
    _toogle(){
      if (this.opened) {
        setTimeout(() => {
          this._close();
        });
      } else {
        setTimeout(() => {
          this._open();
        });
      }
    }
    _open() {
      if (this.opened) return;
      this.opened = true;
      let $selectbox = this.$selectbox,
        $dropdown = this.$dropdown,
        $selection = this.$selection,
        transfer = this.options.transfer;
      let offset = $selection.offset();
      let realHright = $dropdown.outerHeight() + Number($dropdown.css('margin-top').replace('px', '')) + Number($dropdown.css('margin-bottom').replace('px', ''));
      let derection = realHright <= $selection.derection('check').bottomDistance ? 'bottom' : 'top';
      $selectbox.addClass('si-selectbox-visible');
      $dropdown.width($selection.outerWidth());
      this.derection = derection;
      let className = derection === 'top'? 'slide-up-in' : 'slide-down-in';
      if(derection==='top'){
        $dropdown.css({
          'top': transfer ? offset.top - realHright : -realHright,
          'left': transfer ? offset.left : 0
        });
      }else{
        transfer?$dropdown.css({
          'top': offset.top + $selectbox.outerHeight(),
          'left': offset.left
        }):$dropdown.css({
          'top': $selectbox.outerHeight(),
          'left': 0
        });
      }
      $dropdown.show().addClass(className);
      setTimeout(() => {
        $dropdown.removeClass(className);
      }, Number.parseFloat($dropdown.css('animation-duration')) * 1000);
    }
    _close() {
      if (!this.opened) return;
      this.opened = false;
      let $selectbox = this.$selectbox;
      let $dropdown = this.$dropdown;
      $selectbox.removeClass('si-selectbox-visible');
      let className = this.derection === 'top'? 'slide-up-out' : 'slide-down-out';
      $dropdown.addClass(className);
      setTimeout(() => {
        $dropdown.hide().removeClass(className);
      }, Number.parseFloat($dropdown.css('animation-duration')) * 1000);
    }
    _setValue(newVal, val) {
      if (this.selectboxDom) {
        let op = this.options;
        let $placeholder = this.$placeholder;
        if (op.multiple) {
          let va = newVal !== '' ? String(newVal).split(',') : [],
            vac = val && val !== '' ? String(val).split(',') : [],
            sbd = this.selectboxDom,
            newArr = vac;
          let arr1 = _.compare(va, vac);
          let arr2 = _.compare(vac, va);
          if (va.length > 0) {
            $placeholder.hide();
            op.clearable && this.$selection.addClass('si-show-clear');
          }
          arr1.forEach(key => {
            if(sbd[key]){
              sbd[key].$selectbox.addClass('si-selectbox-item-selected') && this._addTag(key, sbd[key].text);
              newArr.push(key);
            }
          });
          arr2.forEach(key => {
            if(sbd[key]){
              sbd[key].$selectbox.removeClass('si-selectbox-item-selected');
              this.tagsDom[key].remove();
              delete this.tagsDom[key];
            }
          });
          if (va.length === 0) {
            $placeholder.show();
            op.clearable && this.$selection.removeClass('si-show-clear');
          }
          this.$input.val(newArr.join(','));
        } else {
          let va = newVal && String(newVal) || '',
            vac = val && String(val) || '',
            sbd = this.selectboxDom,
            $selectValue = this.$selectValue;
          if (va === '' && vac !== '') {
            $selectValue.text('');
            sbd[vac].$selectbox.removeClass('si-selectbox-item-selected');
            op.clearable && this.$selection.removeClass('si-show-clear');
            this.$input.val(va).removeData('key');
            $placeholder.show();
            $selectValue.hide();
          }
          if (sbd[va]) {
            this.$input.val(va).data('key', sbd[va].text);
            $selectValue.text(sbd[va].text);
            vac === '' && $placeholder.hide() && $selectValue.show();
            vac !== '' && sbd[vac].$selectbox.removeClass('si-selectbox-item-selected');
            sbd[va].$selectbox.addClass('si-selectbox-item-selected');
            op.clearable && this.$selection.addClass('si-show-clear');
          }
        }
        !this.firstVal && this.$input.trigger('valid.change').trigger('change');
        this.firstVal = false;
      }
    }
    _addTag(val, text) {
      let op = this.options;
      this.tagsDom = this.tagsDom || {};
      let _tag = document.createElement('div');
      let _tagText = document.createElement('span');
      let _tagClose = document.createElement('i');
      $(_tagClose).addClass('fa fa-close si-tag-close').on('click', (e) => {
        let valueArr = op.value.split(',');
        for (let i = 0, len = valueArr.length; i < len; i++) {
          if (valueArr[i] === val) {
            valueArr.splice(i, 1);
            break;
          }
        }
        op.value = valueArr.join(',');
        e.stopPropagation();
      });
      $(_tagText).addClass('si-tag-text').text(text);
      let $tag = $(_tag);
      $tag.addClass('si-tag si-tag-checked').append(_tagText).append(_tagClose);
      this.$selection.append(_tag);
      this.tagsDom[val] = $tag;
    }
    _setAttachList(newVal) {
      this.selectboxDom = {};
      let op = this.options;
      let selectboxDom = this.selectboxDom,
        data = newVal,
        keyField = op.keyField,
        valueField = op.valueField,
        $dropdown = this.$dropdown;
      let ul = document.createElement('ul');
      let $ul = $(ul);
      $ul.addClass('si-select-dropdown-list');
      for (let i = 0, len = data.length; i < len; i++) {
        let li = document.createElement('li');
        let $li = $(li);
        $li.data('value', data[i][valueField]).addClass('si-selectbox-item').html(data[i][keyField]);
        $ul.append(li);
        if (data[i][valueField] !== '') {
          Object.assign(selectboxDom, {
            [data[i][valueField]]: {
              $selectbox: $li,
              text: data[i][keyField]
            }
          });
        }
      }
      $ul.on('click', (e) => {
        e.stopPropagation();
        let val = $(e.target).data('value');
        if (this.readonlyArr.includes(val)) return;
        if (op.multiple) {
          let valueArr = op.value !== '' && op.value.split(',') || [];
          if (valueArr.includes(val)) {
            for (let i = 0, len = valueArr.length; i < len; i++) {
              if (valueArr[i] === val) {
                valueArr.splice(i, 1);
                break;
              }
            }
          } else {
            valueArr.push(val);
          }
          op.value = valueArr.join(',');
        } else {
          op.value = val;
          this.opened && this._close();
        }
      });
      $dropdown.html(ul);
    }
    getKey(){
      let op = this.options,
        valueArr = op.value !== '' && op.value.split(',') || [],
        arr = [];
      op.data.filter(item=>{
        return valueArr.includes(item[op.valueField]);
      }).forEach(item=>{
        arr.push(item[op.keyField]);
      });
      return arr.join(',');
    }
    refresh(){
      let op = this.options;
      this._getDataByUrl(op.url,{},re=>{
        op.data = op.dataField?re[op.dataField]:re;
      });
    }
    destroy(){
      this._removeEvent();
      this.options.transfer&&this.$dropdown.remove();
    }
  }

  function Plugin(option) {
    try {
      let value, args = Array.prototype.slice.call(arguments, 1);
      let $this = $(this),
        dataSet = $this.data(),
        data = dataSet['si.selectbox'];
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.selectbox');
        }
      }
      if(typeof option === 'object'&& data){
        data.set(option);
      }
      if (!data) {
        let options = $.extend( {} , Selectbox.DEFAULTS, typeof option === 'object' && option);
        let datakeys = Object.keys(dataSet);
        let defaultkeys = Object.keys(options);
        defaultkeys.forEach((key) => {
          let lowkey = key.toLocaleLowerCase();
          if (datakeys.includes(lowkey)) {
            options[key] = dataSet[lowkey];
          }
        });
        data = new Selectbox(this, options);
        data.$input.data('si.selectbox', data);
      }
      return typeof value === 'undefined' ? this : value;
    } catch (error) {
      throw new Error(error);
    }
  }

  Selectbox.DEFAULTS = {
    label: '',
    id: '',
    name: '',
    labelWidth: '',
    inputWidth: '',
    labelAlign: 'right',
    width: '',
    readonly: false,
    disabled: false,
    placeholder: '请选择',
    helpText: '',
    size: '',
    keyField: 'key',
    valueField: 'value',
    dataField:'',
    data: null,
    url: '',
    value: '',
    transfer: false,
    search: false,
    clearable: false,
    multiple: false,
    valid: false,
    icon:'fa fa-caret-down fa-fw',
    clearIcon:'fa fa-times-circle fa-fw'
  };

  let old = $.fn.selectbox;

  $.fn.selectbox = Plugin;
  $.fn.selectbox.defaults = Selectbox.DEFAULTS;
  $.fn.selectbox.Constructor = Selectbox;

  $.fn.selectbox.noConflict = function() {
    $.fn.selectbox = old;
    return this;
  };
})(jQuery);