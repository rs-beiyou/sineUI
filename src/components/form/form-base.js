export default class BaseForm {
  constructor(el, options, DEFAULTS) {
    this.$element = $(el);
    this.lastOptions = options;
    this.options = Object.assign({}, DEFAULTS);
    this.optionCache = Object.assign({}, DEFAULTS);
  }
  _initForm() {
    this._setObserver();
    this._setFragment();
    this._setFormBlock();
  }
  _setObserver() {
    let op = this.options;
    let keys = Object.keys(op);
    for (let i = 0, len = keys.length; i < len; i++) {
      this._defineReactive(this.options, keys[i]);
    }
  }
  _defineReactive(obj, key) {
    let _this = this;
    let cache = this.optionCache;
    Object.defineProperty(obj, key, {
      get() {
        return cache[key];
      },
      set(val) {
        if (val === undefined || !cache.hasOwnProperty(key) || val === cache[key] || Array.isArray(val) && val.length === 0) return;
        cache[key] = val;
        switch (key) {
          case 'label':
          case 'labelWidth':
            _this._setLabel(key);
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
            _this['_set' + _this.className](key);
            break;
          case 'helpText':
            _this._setHelpText(key);
            break;
          case 'data':
            setTimeout(() => {
              _this['_set' + _this.className](key);
            });
            break;
          case 'inputWidth':
            _this._setFormBlock(key);
            break;
          case 'url':
            if (cache.data.length === 0) {
              _this._getDataByUrl();
            }
            break;
        }
      }
    });
  }
  _setFragment() {
    if (!this.$fragment) {
      this.$fragment = $(document.createDocumentFragment());
    }
  }
  _setLabel(item) {
    let op = this.options;
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
        $label.html(op.label);
        break;
      case 'labelWidth':
        op.labelWidth.includes('col-') ? $label.addClass(op.labelWidth) : op.labelWidth.includes('px') ? $label.css('width', op.labelWidth) : $label.css('width', op.labelWidth + 'px');
        break;
    }
  }
  _setFormBlock(item) {
    let op = this.options;
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
      op.inputWidth.includes('col-') ? $formBlock.addClass(op.inputWidth) : op.inputWidth.includes('px') ? $formBlock.css('width', op.inputWidth) : $formBlock.css('width', op.inputWidth + 'px');
    }
  }
  _setHelpText(item) {
    let op = this.options;
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
      $helpText.text(op.helpText);
    }
  }
  _setFormAttach() {
    if (this.$formAttach) return;
    let _formAttach = document.createElement('div');
    let $formAttach = $(_formAttach);
    $formAttach.addClass('form-attach');
    this.$formBlock.append(_formAttach);
    this.$formAttach = $formAttach;
  }
  _getDataByUrl() {
    let op = this.options;
    $.ajax({
      url: op.url,
      method: 'get',
      success: (re) => {
        op.data = re.list;
      },
      error: () => {

      }
    });
  }
  set(option) {
    Object.assign(this.options, option || {});
  }
}