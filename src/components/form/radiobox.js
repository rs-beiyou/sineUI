import BaseForm from './form-base';
(function($) {
  class Radiobox extends BaseForm {
    constructor(el, options) {
      super(el, options, Radiobox.DEFAULTS);
      this.className = 'Radiobox';
      this._init();
    }
    _init() {
      super._initForm();
      Object.assign(this.options, this.lastOptions);
      this.$element.after(this.$fragment[0]).remove();
    }
    _setRadiobox(item) {
      let op = this.options;
      let $input, $radiobox;
      if (!this.$input) {
        let _input = document.createElement('input');
        let _radiobox = document.createElement('div');
        $radiobox = $(_radiobox);
        $input = $(_input);
        $input.attr('type', 'hidden');
        $radiobox.addClass('si-radiobox');
        this.$formBlock.append(_input).append(_radiobox);
        this.$input = $input;
        this.$radiobox = $radiobox;
        this.valueCache = '';
      } else {
        $input = this.$input;
        $radiobox = this.$radiobox;
      }
      switch (item) {
        case 'id':
        case 'name':
          $input.attr(item, op[item]);
          break;
        case 'readonly':
          this._setReadonly();
          break;
        case 'disabled':
          this._setDisabled();
          break;
        case 'value':
          this._setValue();
          break;
        case 'data':
          this._setAttachList();
          op.value !== '' && this._setValue();
          op.readonly !== false && this._setReadonly();
          op.disabled !== false && this._setDisabled();
          break;
      }
    }
    _setReadonly() {
      if (this.radioboxDom) {
        let op = this.options,
          rl = op.readonly,
          cbd = this.radioboxDom,
          rla = this.readonlyArr || [],
          newRla;
        if (typeof rl === 'boolean') {
          newRla = rl ? Object.keys(cbd) : [];
        }
        if (typeof rl === 'string') {
          newRla = rl ? rl.split(',') : [];
        }
        let arr1 = Array.compare(newRla, rla, true);
        let arr2 = Array.compare(newRla, rla, false);
        arr1.forEach(key => {
          cbd[key] && cbd[key].$input.attr('disabled', true) && cbd[key].$radiobox.addClass('si-radiobox-disabled');
        });
        arr2.forEach(key => {
          cbd[key] && cbd[key].$input.removeAttr('disabled') && cbd[key].$radiobox.removeClass('si-radiobox-disabled');
        });
        this.readonlyArr = newRla;
      }
    }
    _setDisabled() {
      if (this.radioboxDom) {
        let da = this.options.disabled,
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
    _setValue() {
      if (this.radioboxDom) {
        let op = this.options,
          va = op.value,
          vac = this.valueCache,
          cbd = this.radioboxDom;
        cbd[va] && cbd[va].$radiobox.addClass('si-radiobox-checked');
        cbd[vac] && cbd[vac].$radiobox.removeClass('si-radiobox-checked') && cbd[vac].$input.attr('checked', false);
        this.valueCache = va;
        this.$input.val(op.value).trigger('change');
      }
    }
    _setAttachList() {
      this.radioboxDom = {};
      let op = this.options;
      let radioboxDom = this.radioboxDom,
        data = op.data,
        keyField = op.keyField,
        valueField = op.valueField,
        $radiobox = this.$radiobox;
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
        radioboxDom[data[i][valueField]] = {
          $radiobox: $(label),
          $input: $(input)
        };
        $(input).on('change', function() {
          op.value = this.value;
        });
      }
      $radiobox.html(fragment);
    }
  }

  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      let $this = $(this);
      let data = $this.data('si.radiobox');
      let options = $.extend({}, Radiobox.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!data) {
        if (typeof option !== 'object') {
          console.error('请先初始化radiobox，再执行其他操作！\n radiobox初始化：$().radiobox(Object);');
          return;
        }
        data = new Radiobox(this, options);
        data.$input.data('si.radiobox', data);
      } else {
        if (typeof option == 'object') data['set'](option);
      }
      if (typeof option == 'string') data[option](_relatedTarget);
    });
  }

  let old = $.fn.radiobox;

  $.fn.radiobox = Plugin;
  $.fn.radiobox.Constructor = Radiobox;

  $.fn.radiobox.noConflict = function() {
    $.fn.radiobox = old;
    return this;
  };

  Radiobox.DEFAULTS = {
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