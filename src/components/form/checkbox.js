import BaseForm from './form-base';
(function($) {
  class Checkbox extends BaseForm {
    constructor(el, options) {
      super(el, options, Checkbox.DEFAULTS);
      this.className = 'Checkbox';
      this._initForm();
    }
    _setCheckbox(item, newVal, val) {
      let op = this.options;
      let $input = this.$input,
        $checkbox = this.$checkbox;
      if (!this.$input) {
        let _input = document.createElement('input');
        let _checkbox = document.createElement('div');
        $checkbox = $(_checkbox);
        $input = $(_input);
        $input.attr('type', 'hidden');
        $checkbox.addClass('si-checkbox').append(_input);
        this.$formBlock.append(_checkbox);
        this.$input = $input;
        this.$checkbox = $checkbox;
      }
      switch (item) {
        case 'id':
        case 'name':
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
        case 'data':
          this._setAttachList(newVal);
          op.value !== '' && this._setValue(op.value);
          op.readonly !== false && this._setReadonly(op.readonly);
          op.disabled !== false && this._setDisabled(op.disabled);
          break;
        case 'valid':
          $input.valid(newVal, this);
          break;
      }
    }
    _setReadonly(newVal) {
      if (this.checkboxDom) {
        let rl = newVal,
          cbd = this.checkboxDom,
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
        let arr1 = Array.compare(newRla, rla);
        let arr2 = Array.compare(rla, newRla);
        arr1.forEach(key => {
          cbd[key] && cbd[key].$input.attr('disabled', true) && cbd[key].$checkbox.addClass('si-checkbox-disabled');
        });
        arr2.forEach(key => {
          cbd[key] && cbd[key].$input.removeAttr('disabled') && cbd[key].$checkbox.removeClass('si-checkbox-disabled');
        });
        this.readonlyArr = newRla;
      }
    }
    _setDisabled(newVal) {
      if (this.checkboxDom) {
        let da = newVal,
          cbd = this.checkboxDom,
          $input = this.$input;
        if (typeof da === 'boolean') {
          let newDaa = Object.keys(cbd);
          if (da) {
            newDaa.forEach(key => {
              cbd[key] && cbd[key].$input.attr('disabled', true) && cbd[key].$checkbox.addClass('si-checkbox-disabled');
            });
            $input.attr('disabled', true);
          } else {
            newDaa.forEach(key => {
              cbd[key] && cbd[key].$input.removeAttr('disabled') && cbd[key].$checkbox.removeClass('si-checkbox-disabled');
            });
            $input.removeAttr('disabled');
          }
        }
      }
    }
    _setValue(newVal, val) {
      if (this.checkboxDom) {
        let va = newVal !== '' ? String(newVal).split(',') : [],
          vac = val !== '' ? String(val).split(',') : [],
          cbd = this.checkboxDom;
        let arr1 = Array.compare(va, vac);
        let arr2 = Array.compare(vac, va);
        arr1.forEach(key => {
          cbd[key] && cbd[key].$checkbox.addClass('si-checkbox-checked');
        });
        arr2.forEach(key => {
          cbd[key] && cbd[key].$checkbox.removeClass('si-checkbox-checked');
        });
        this.$input.val(newVal).trigger('change').trigger('valid.change');
      }
    }
    _setAttachList(newVal) {
      this.checkboxDom = {};
      let op = this.options;
      let checkboxDom = this.checkboxDom,
        data = newVal,
        keyField = op.keyField,
        valueField = op.valueField,
        $checkbox = this.$checkbox,
        $list;
      if (this.$checkboxList) {
        $list = this.$checkboxList;
      } else {
        let list = document.createElement('div');
        $list = $(list);
        $list.addClass('si-checkbox-list');
        this.$checkboxList = $list;
        $checkbox.append(list);
      }
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
        Object.assign(checkboxDom, {
          [data[i][valueField]]: {
            $checkbox: $(label),
            $input: $(input)
          }
        });
        $(input).on('change', function() {
          let val = this.value;
          let valueArr = op.value !== '' && String(op.value).split(',') || [];
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
      $list.html(fragment);
    }
  }

  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      let $this = $(this);
      let dataSet = $this.data();
      let data = dataSet['si.checkbox'];

      if (!data) {
        dataSet.data ? dataSet.data = eval(dataSet.data) : false;
        //data-api覆盖data-options
        let options = Object.assign({}, Checkbox.DEFAULTS, typeof option === 'object' && option);
        let datakeys = Object.keys(dataSet);
        let defaultkeys = Object.keys(options);
        defaultkeys.forEach((key) => {
          let lowkey = key.toLocaleLowerCase();
          if (datakeys.includes(lowkey)) {
            options[key] = dataSet[lowkey];
          }
        });
        if (typeof option !== 'object') {
          console.error('请先初始化checkbox，再执行其他操作！\n checkbox初始化：$().checkbox(Object);');
          return;
        }
        data = new Checkbox(this, options);
        data.$input.data('si.checkbox', data);
      } else {
        if (typeof option === 'object') data['set'](option);
      }
      if (typeof option === 'string') data[option](_relatedTarget);
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
    helpText: '',
    size: '',
    keyField: 'key',
    valueField: 'value',
    data: [],
    url: '',
    value: ''
  };
})(jQuery);