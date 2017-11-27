import BaseForm from './form-base';
(function($) {
  class Checkbox extends BaseForm {
    constructor(el, options) {
      super(el, options, Checkbox.DEFAULTS);
      this._init();
    }
    _init() {
      super._initForm();
      Object.assign(this.options, this.lastOptions);
      this.$element.after(this.$fragment[0]).remove();
    }
    _setCheckbox(item) {
      let op = this.options;
      let $input, $checkbox;
      if (!this.$input) {
        let _input = document.createElement('input');
        let _checkbox = document.createElement('div');
        $checkbox = $(_checkbox);
        $input = $(_input);
        $input.attr('type', 'hidden');
        $checkbox.addClass('si-checkbox');
        this.$formBlock.append(_input).append(_checkbox);
        this.$input = $input;
        this.$checkbox = $checkbox;
        this.valueArr = [];
        this.valueArrCache = [];
      } else {
        $input = this.$input;
        $checkbox = this.$checkbox;
      }
      switch (item) {
        case 'id':
        case 'name':
          $input.attr(item, op[item]);
          break;
        case 'readonly':
          break;
        case 'disabled':
          $input.attr(item, op[item]);
          break;
        case 'value':
          this._setValue();
          break;
        case 'data':
          this._setAttachList();
          this._setValue();
          break;
      }
    }
    _setValue() {
      if (this.checkboxDom) {
        let op = this.options,
          va = op.value && op.value.split(',') || [],
          vac = this.valueArrCache,
          cbd = this.checkboxDom;
        let arr1 = Array.compare(va, vac, true);
        let arr2 = Array.compare(va, vac, false);
        try {
          arr1.length > 0 && arr1.forEach(key => {
            cbd[key].$checkbox.addClass('si-checkbox-checked');
          });
          arr2.length > 0 && arr2.forEach(key => {
            cbd[key].$checkbox.removeClass('si-checkbox-checked');
          });
        } catch (e) {
          console.warn('Checkbox[name=' + op.name + ']的value设置不正确！');
          return;
        }
        this.valueArrCache = va;
        this.$input.val(op.value).trigger('change');
      }
    }
    _setAttachList() {
      this.checkboxDom = {};
      let op = this.options;
      this.valueArr = op.value && op.value.split(',') || [];
      let valueArr = this.valueArr,
        checkboxDom = this.checkboxDom,
        data = op.data,
        keyField = op.keyField,
        valueField = op.valueField,
        $checkbox = this.$checkbox;
      let fragment = document.createDocumentFragment();
      for (let i = 0, len = data.length; i < len; i++) {
        let label = document.createElement('label');
        let checkbox = document.createElement('span');
        let span = document.createElement('span');
        $(span).addClass('si-checkbox-inner');
        let input = document.createElement('input');
        $(input).attr({
          type: 'checkbox',
          value: data[i][valueField]
        }).addClass('si-checkbox-input');
        $(checkbox).data('value', data[i][valueField]).addClass('si-checkbox-content').append(span).append(input);
        $(label).addClass('si-checkbox-item').append(checkbox).append(data[i][keyField]);
        fragment.appendChild(label);
        checkboxDom[data[i][valueField]] = {
          $checkbox: $(checkbox)
        };
        $(input).on('change', function() {
          let val = this.value;
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
        });
      }
      $checkbox.html(fragment);
    }
    set(option) {
      Object.assign(this.options, option || {});
    }
  }

  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      let $this = $(this);
      let data = $this.data('si.checkbox');
      let options = $.extend({}, Checkbox.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!data) {
        if (typeof option !== 'object') {
          console.error('请先初始化checkbox，再执行其他操作！\n checkbox初始化：$().checkbox(Object);');
          return;
        }
        data = new Checkbox(this, options);
        data.$input.data('si.checkbox', data);
      } else {
        if (typeof option == 'object') data['set'](option);
      }
      if (typeof option == 'string') data[option](_relatedTarget);
    });
  }

  let old = $.fn.checkbox;

  $.fn.checkbox = Plugin;
  $.fn.checkbox.Constructor = Checkbox;

  $.fn.checkbox.noConflict = function() {
    $.fn.checkbox = old;
    return this;
  };

  Checkbox.DEFAULTS = {
    label: '',
    id: '',
    name: '',
    labelWidth: '',
    inputWidth: '',
    width: '',
    readonly: false,
    disabled: false,
    placeholder: '',
    keyField: 'key',
    valueField: 'value',
    data: [],
    url: '',
    value: ''
  };
})(jQuery);