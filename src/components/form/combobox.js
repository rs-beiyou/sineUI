import BaseForm from './form-base';
import _ from '../../utils/util';
class Combobox extends BaseForm {
  constructor(el, options) {
    super(el, options, Combobox.DEFAULTS);
    this.className = 'Combobox';
    this.derection = '';
    this.randomString = _.randomString();
    this.levelUlArr = [];
    this.valueArr = [];
    this.keyArr = [];
    this._data = {};
    this.dataType = '';
    this._initForm();
  }
  _setCombobox(item, newVal, val) {
    let $input = this.$input,
      $combobox = this.$combobox,
      $combo = this.$combo,
      $placeholder = this.$placeholder,
      $dropdown = this.$dropdown,
      $comboValue = this.$comboValue,
      $clear = this.$clear;
    if (!$input) {
      let _input = this.create('input'),
        _combobox = this.create('div'),
        _combo = this.create('div'),
        _placeholder = this.create('input'),
        _dropdown = this.create('div'),
        _comboValue = this.create('div'),
        _comboIcon = this.create('i'),
        _clear = this.create('i'),
        _loading = this.create('div'),
        _loadingIcon = this.create('i');
      $input = $(_input);
      $combobox = $(_combobox);
      $combo = $(_combo);
      $placeholder = $(_placeholder);
      $dropdown = $(_dropdown);
      $comboValue = $(_comboValue);
      let $loading = $(_loading);
      let $comboIcon = $(_comboIcon);
      $clear = $(_clear);
      $input.attr('type','hidden');
      $placeholder.attr({
        'readonly':'readonly',
        'autocomplete':'off',
        'spellcheck': false,
        'type': 'text'
      }).addClass('form-control');
      $comboValue.addClass('si-combobox-value').hide();
      $comboIcon.addClass(`${this.lastOptions.icon} si-form-control-icon`);
      $clear.addClass(`${this.lastOptions.clearIcon} si-form-control-icon`);
      $combo.derection().addClass('si-combobox-combo has-icon-right').append(_comboValue).append(_placeholder).append(_comboIcon).append(_clear);
      $(_loadingIcon).addClass(`${this.lastOptions.loadingIcon}`);
      $loading.addClass('si-combobox-loading').append(_loadingIcon).append('<br>').append('加载中...');
      $dropdown.addClass('si-dropdown si-combobox-dropdown').hide().append(_loading);
      $combobox.addClass('si-combobox').append(_input).append(_combo);
      if(this.lastOptions.transfer){
        $dropdown.addClass('si-dropdown-transfer');
        $('body').append(_dropdown);
      }else{
        $combobox.append(_dropdown);
      }
      this.$formBlock.append(_combobox);
      this.$input = $input;
      this.$combobox = $combobox,
      this.$combo = $combo,
      this.$placeholder = $placeholder,
      this.$dropdown = $dropdown,
      this.$comboValue = $comboValue,
      this.$clear = $clear;
      this.$loading = $loading;
      this._initEvent();
    }
    switch (item) {
      case 'id':
      case 'name':
        $input.attr(item, newVal);
        break;
      case 'placeholder':
        $placeholder.attr(item, newVal);
        break;
      case 'readonly':
        this._setReadonly(newVal);
        break;
      case 'disabled':
        this._setDisabled(newVal);
        break;
      case 'data':
        this._initCombo();
        this._delayInit();
        break;
      case 'value':
        this._setValue(newVal,val);
        break;
      case 'width':
        $combo.css('width', newVal);
        break;
    }
  }
  _delayInit(){
    let op = this.options;
    op.value&&this._setValue(op.value);
  }
  _initEvent(){
    let op = this.options;
    this._addEvent();
    this.$clear.on('click', (e) => {
      op.value = '';
      document.all ? e.cancelBubble=true : e.stopPropagation();
    });
    this.$dropdown.on('click','.si-combobox-item',(e)=>{
      document.all ? e.cancelBubble=true : e.stopPropagation();
      let $tar = $(e.target), $menu = $tar.parent(),  valueArr = op.value?op.value.split(','):[];
      let key = $tar.data('key'), level = $menu.data('level');
      if(valueArr[level]===key)return;
      valueArr.splice(level,valueArr.length-level,key);
      op.value = valueArr.join(',');
    });
  }
  _addEvent(){
    $(document).on(`click.si.combobox.${this.randomString}`, this._close.bind(this));
    this.$combo.on('click.si.combobox', this._toogle.bind(this));
  }
  _removeEvent(){
    $(document).off(`click.si.combobox.${this.randomString}`);
    this.$combo.off('click.si.combobox');
  }
  _setReadonly(newVal){
    newVal&&this.$combobox.addClass('si-form-readonly')&&this._removeEvent();
    !newVal&&this.$combobox.removeClass('si-form-readonly')&&this._addEvent();
  }
  _setDisabled(newVal){
    newVal&&this.$combobox.addClass('si-form-disabled')&&this._removeEvent();
    !newVal&&this.$combobox.removeClass('si-form-disabled')&&this._addEvent();
  }
  _setValue(newVal,val){
    let levelUlArr = this.levelUlArr, _data = this._data, keyArr = this.keyArr;
    if(levelUlArr.length>0 && !this.dataReloading){
      let valArr = val?val.split(','):[],
        newValArr = newVal?newVal.split(','):[],
        length1 = valArr.length,
        length2 = newValArr.length,
        maxLen = length1>length2?length1:length2;
    
      if(valArr[0]!==newValArr[0]){
        let da = _data[0][newValArr[0]],
          old_da = _data[0][valArr[0]];
        for(let m= 1;m<levelUlArr.length;m++){
          levelUlArr[m].remove();
        }
        levelUlArr.length>1&&levelUlArr.splice(1,levelUlArr.length-1);
        if(!newVal){
          keyArr.splice(0,keyArr.length);
          old_da&&old_da.$li.removeClass('si-combobox-item-active');
        }else{
          keyArr.splice(0,keyArr.length,da.title);
          old_da&&old_da.$li.removeClass('si-combobox-item-active');
          da&&da.$li.addClass('si-combobox-item-active');
          this._beforeInitCombo(da, newValArr[0]);
        }
      }else{
        for(let i=1;i<maxLen;i++){
          let da1 = _data[i][newValArr[i]],
            old_da1 = _data[i][valArr[i]];

          if(!newValArr[i]){
            let le = levelUlArr.length;
            for(let n= i+1;n<le;n++){
              levelUlArr[n].remove();
              delete _data[n];
            }
            le>i&&levelUlArr.splice(i+1,le-i);
            keyArr.splice(i,keyArr.length-i);
            this._beforeInitCombo(da1, newValArr[i]);
            break;
          }
          
          if(!valArr[i]&&newValArr[i]){
            keyArr.splice(i,keyArr.length-i,da1.title);
            da1&&da1.$li.addClass('si-combobox-item-active');
            this._beforeInitCombo(da1, newValArr[i]);
            continue;
          }
          
          if(newValArr[i]!==valArr[i]){
            let le = levelUlArr.length;
            for(let o= i+1;o<le;o++){
              levelUlArr[o].remove();
              delete _data[o];
            }
            le>i&&levelUlArr.splice(i+1,le-i);
            keyArr.splice(i,keyArr.length-i,da1.title);
            old_da1&&old_da1.$li.removeClass('si-combobox-item-active');
            da1&&da1.$li.addClass('si-combobox-item-active');
            this._beforeInitCombo(da1, newValArr[i]);
            break;
          }
        }
      }
      this.options.clearable && newVal!=='' && this.$combo.addClass('si-show-clear');
      this.options.clearable && newVal==='' && this.$combo.removeClass('si-show-clear');
      this.$placeholder.val(keyArr.join(' / '));
    }
    
    val!==undefined && this.$input.val(newVal);
    if (this.firstVal) {
      this.firstVal = false;
    } else {
      val!==undefined && this.$input.trigger('valid.change').trigger('change');
    }
  }
  _beforeInitCombo(da, val){
    let op = this.options;
    if(da.children){
      this._initCombo(da.children);
    }else if(op.url&&this.dataType!=='static'){
      da.$li.addClass('si-combobox-item-loading');
      this._getDataByUrl(op.url.substring(0, op.url.indexOf('?')),Object.assign({},{
        [op.searchField]: val
      },op.parameter),re=>{
        da.$li.removeClass('si-combobox-item-loading');
        Object.prototype.toString.call(re)==='[object Array]'&&re.length>0?this._initCombo(re):this._close();
      });
    }else{
      this._close();
    }
  }
  _initCombo(da){
    this.$loading.hide();
    let op = this.options, ul = this.create('ul'), data = da||op.data;
    let $ul = $(ul), levelUlArr = this.levelUlArr;
    $ul.addClass('si-combobox-menu');
    data.forEach(d=>{
      if(d.children&&d.children.length>0){
        this.dataType='static';
      }
      let arr = this._initItem(d);
      $ul.append(arr[0]);
      this._data[levelUlArr.length] = this._data[levelUlArr.length]||{};
      Object.assign(this._data[levelUlArr.length],{
        [d.key] : {
          children:d.children,
          $li: arr[1],
          title: d.value
        }
      });
    });
    $ul.data('level',levelUlArr.length);
    this.$dropdown.append(ul);
    levelUlArr.push($ul);
  }
  _initItem(da){
    let op = this.options;
    let load = this.create('i'),
      li = this.create('li');
    $(load).addClass(`${op.loadingIcon}`);
    let $li = $(li);
    $li.addClass('si-combobox-item').html(da[op.valueField]).data('key',da[op.keyField]);
    if(da.hasChild||da.children&&da.children.length>0){
      let arrow = this.create('i');
      $(arrow).addClass(`${op.nextLevelIcon}`);
      $li.append(arrow);
    }
    $li.append(load);
    return [li, $li];
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
  _open(){
    if (this.opened) return;
    this.opened = true;
    let $combobox = this.$combobox,
      $dropdown = this.$dropdown,
      $combo = this.$combo,
      transfer = this.options.transfer;
    let offset = $combobox.offset();
    let realHright = $dropdown.outerHeight() + Number($dropdown.css('margin-top').replace('px', '')) + Number($dropdown.css('margin-bottom').replace('px', ''));
    let derection = realHright <= $combo.derection('check').bottomDistance ? 'bottom' : 'top';
    $combobox.addClass('si-combobox-visible');
    this.derection = derection;
    let className = derection === 'top'? 'slide-up-in' : 'slide-down-in';
    if(derection==='top'){
      $dropdown.css({
        'top': transfer ? offset.top - realHright : -realHright,
        'left': transfer ? offset.left : 0
      });
    }else{
      // transfer&&$dropdown.css({
      //   'top': offset.top + $combobox.outerHeight(),
      //   'left': offset.left
      // });
      transfer?$dropdown.css({
        'top': offset.top + $combobox.outerHeight(),
        'left': offset.left
      }):$dropdown.css({
        'top': $combobox.outerHeight(),
        'left': 0
      });
    }
    $dropdown.show().addClass(className);
    setTimeout(() => {
      $dropdown.removeClass(className);
    }, Number.parseFloat($dropdown.css('animation-duration')) * 1000);
  }
  _close(){
    if (!this.opened) return;
    this.opened = false;
    let $combobox = this.$combobox,
      $dropdown = this.$dropdown;
    $combobox.removeClass('si-combobox-visible');
    let className = this.derection === 'top'? 'slide-up-out' : 'slide-down-out';
    $dropdown.addClass(className);
    setTimeout(() => {
      $dropdown.hide().removeClass(className);
    }, Number.parseFloat($dropdown.css('animation-duration')) * 1000);
  }
  getKey(){
    return this.keyArr.join(',');
  }
  getData() {
    return this.options.data;
  }
  destroy(){
    this._removeEvent();
    this.$comboUl.combo('destroy');
    this.options.transfer&&this.$dropdown.remove();
  }
}

function Plugin(option) {
  try {
    let value, args = Array.prototype.slice.call(arguments, 1);
    
    this.each(function(){
      let $this = $(this),
        dataSet = $this.data(),
        data = dataSet['si.combobox'];
        
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.combobox');
        }
      }
      if(typeof option === 'object'&& data){
        data.set(option);
      }
      if (!data) {
        let options = $.extend( {} , Combobox.DEFAULTS, typeof option === 'object' && option);
        let datakeys = Object.keys(dataSet);
        let defaultkeys = Object.keys(options);
        defaultkeys.forEach((key) => {
          let lowkey = key.toLocaleLowerCase();
          if (datakeys.includes(lowkey)) {
            options[key] = dataSet[lowkey];
          }
        });
        data = new Combobox(this, options);
        data.$input.data('si.combobox', data);
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    throw new Error(error);
  }
}

Combobox.DEFAULTS = {
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
  transfer: false,
  clearable: true,
  icon:'fa fa-caret-down fa-fw',
  clearIcon:'fa fa-times-circle fa-fw',
  loadingIcon: 'fa fa-spinner fa-fw fa-spin',
  nextLevelIcon: 'fa fa-angle-right fa-fw',
  keyField: 'key',
  valueField: 'value',
  dataField: '',
  searchField: '',
  parameter: null,
  url:'',
  data: null
};
let old = $.fn.combobox;

$.fn.combobox = Plugin;
$.fn.combobox.defaults = Combobox.DEFAULTS;
$.fn.combobox.Constructor = Combobox;

$.fn.combobox.noConflict = function() {
  $.fn.combobox = old;
  return this;
};