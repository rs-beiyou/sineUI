export default class BaseForm {
  constructor(el, options, DEFAULTS) {
    this.$element = $(el);
    this.lastOptions = options;
    this.options = Object.assign({}, DEFAULTS);
    this.optionCache = Object.assign({}, DEFAULTS);
    this.className = this.constructor.name;
  }
  _initForm() {
    this._setObserver();
    this._setFragment();
    this._setLabel();
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
        if (typeof val !== 'object' && val === cache[key] || Array.isArray(val) && val.length === 0) return;
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
            _this['_set' + _this.className](key);
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
        this.$formInline.before(_label);
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
  //有hidden情况
  _setSurfaceInput(item) {
    let op = this.options;
    let $input, $surfaceInput;
    if (!this.$surfaceInput) {
      let _input = this.inputDom ? this.inputDom : document.createElement('input');
      let _surfaceInput = this.surfaceDom ? this.surfaceDom : document.createElement('input');
      $input = $(_input);
      $surfaceInput = $(_surfaceInput);
      $surfaceInput.addClass('form-control');
      $input.attr('type', 'hidden');
      this.$formBlock.append(_surfaceInput);
      this.$formBlock.append(_input);
      this.$surfaceInput = $surfaceInput;
      this.$input = $input;
    } else {
      $input = this.$input;
      $surfaceInput = this.$surfaceInput;
    }
    switch (item) {
      case 'id':
      case 'name':
        $input.attr(item, op[item]);
        break;
      case 'placeholder':
        $surfaceInput.attr(item, op[item]);
        break;
      case 'readonly':
        $surfaceInput.attr(item, op[item]);
        break;
      case 'disabled':
        $input.attr(item, op[item]);
        $surfaceInput.attr(item, op[item]);
        break;
      case 'value':
        $input.val(op.value);
        break;
      case 'width':
        $surfaceInput.css('width', op.width);
        break;
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
}