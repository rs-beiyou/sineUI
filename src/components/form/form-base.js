import Watch from '../../libs/watch';
export default class BaseForm {
  constructor(el, options, DEFAULTS) {
    this.$element = $(el);
    this.lastOptions = options;
    this.options = $.extend(true, {}, DEFAULTS);
  }
  _initForm() {
    this._defineReactive();
    this._setFragment();
    this._setFormBlock();
    this['_set' + this.className]();
    this.set(this.lastOptions);
    this._setCompile();
    this.$element.after(this.$fragment[0]).remove();
  }
  _defineReactive() {
    let _this = this,
      op = this.options;
    let callback = (path, newVal, val) => {
      let key = path[0];
      if (newVal === undefined || newVal === val || Array.isArray(newVal) && newVal.length === 0) return;
      switch (key) {
        case 'label':
        case 'labelWidth':
          _this._setLabel(key, newVal);
          break;
        case 'id':
        case 'name':
        case 'value':
        case 'placeholder':
        case 'readonly':
        case 'disabled':
        case 'search':
        case 'multiple':
        case 'width':
          _this['_set' + _this.className](key, newVal, val);
          break;
        case 'helpText':
          _this._setHelpText(key, newVal);
          break;
        case 'data':
          setTimeout(() => {
            _this['_set' + _this.className](key, newVal);
          });
          break;
        case 'inputWidth':
          _this._setFormBlock(key, newVal);
          break;
        case 'url':
          if (op.data.length === 0) {
            _this._getDataByUrl(newVal);
          }
          break;
        case 'valid':
          if(typeof newVal==='string'&& newVal.includes('{')){
            _this['_set' + _this.className](key, (new Function(`return ${newVal}`))(), val);
          }else{
            _this['_set' + _this.className](key, newVal, val);
          }
          break;
      }
    };
    new Watch(op, callback);
  }
  _setCompile(){
    let op = this.options, valid = typeof op.valid==='string'? (new Function(`return ${op.valid}`))():op.valid;
    if(!valid||$.isEmptyObject(valid)||this.hasValidControl)return;
    this.cpLock = false;
    this.hasValidControl = true;
    if(this.className==='Textbox'||this.className==='Passwordbox'){
      setTimeout(()=>{
        this.$input.addClass('valid-control').on('compositionstart',()=>{
          this.cpLock = true;
        }).on('compositionend',()=>{
          this.cpLock = false;
          let val = this.$input.val();
          if(val === op.value){
            return;
          }
          op.value = val;
          this.$input.trigger('valid.change');
        }).on('input propertychange',()=>{
          if(this.cpLock)return;
          let val = this.$input.val();
          if(val === op.value){
            return;
          }
          op.value = val;
          this.$input.trigger('valid.change');
        });
      });
    }
  }
  _setFragment() {
    if (!this.$fragment) {
      this.$fragment = $(document.createDocumentFragment());
    }
  }
  _setLabel(item, newVal) {
    let $label;
    if (!this.$label) {
      let _label = document.createElement('label');
      $label = $(_label);
      $label.addClass('control-label');
      this.$label = $label;
      if (this.$input) {
        this.$formBlock.before(_label);
      } else {
        this.$fragment.prepend(_label);
      }
    } else {
      $label = this.$label;
    }
    switch (item) {
      case 'label':
        $label.html(newVal);
        break;
      case 'labelWidth':
        newVal.includes('col-') ? $label.addClass(newVal) : newVal.includes('px') ? $label.css('width', newVal) : $label.css('width', newVal + 'px');
        break;
    }
  }
  _setFormBlock(item, newVal) {
    let $formBlock;
    if (!this.$formBlock) {
      let _formBlock = document.createElement('div');
      $formBlock = $(_formBlock);
      $formBlock.addClass('form-block');
      this.$fragment.append(_formBlock);
      this.$formBlock = $formBlock;
    } else {
      $formBlock = this.$formBlock;
    }
    if (item === 'inputWidth') {
      newVal.includes('col-') ? $formBlock.addClass(newVal) : newVal.includes('px') ? $formBlock.css('width', newVal) : $formBlock.css('width', newVal + 'px');
    }
  }
  _setHelpText(item, newVal) {
    let $helpText;
    if (!this.$helpText) {
      let _helpText = document.createElement('span');
      $helpText = $(_helpText);
      $helpText.addClass('help-block');
      this.$formBlock.append(_helpText);
      this.$helpText = $helpText;
    } else {
      $helpText = this.$helpText;
    }
    if (item) {
      $helpText.text(newVal);
    }
  }
  _getDataByUrl(newVal) {
    let op = this.options;
    $.ajax({
      url: newVal,
      method: 'get',
      success: (re) => {
        op.data = re.list;
      }
    });
  }
  set(option) {
    this.className === 'Filebox' ? $.extend(true, this.options, option) : Object.assign(this.options, option);
  }
}