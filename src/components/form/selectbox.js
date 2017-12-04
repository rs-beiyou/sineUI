import BaseForm from './form-base';
(function($) {
  class Selectbox extends BaseForm {
    constructor(el, options) {
      super(el, options, Selectbox.DEFAULTS);
      this.className = 'Selectbox';
      this._init();
    }
    _init() {
      super._initForm();
      Object.assign(this.options, this.lastOptions);
      this.$element.after(this.$fragment[0]).remove();
    }
    _setSelectbox(item) {
      let op = this.options;
      let $input, $selectbox, $selection, $dropdown, $selectValue, $placeholder;
      if (!this.$input) {
        let _input = document.createElement('input');
        let _selectbox = document.createElement('div');
        let _dropdown = document.createElement('div');
        let _selection = document.createElement('div');
        let _selectValue = document.createElement('div');
        let _placeholder = document.createElement('div');
        let _cert = document.createElement('i');

        $placeholder = $(_placeholder);
        $selectbox = $(_selectbox);
        $input = $(_input);
        $dropdown = $(_dropdown);
        $selection = $(_selection);
        $selectValue = $(_selectValue);
        $(_cert).addClass('fa fa-caret-down si-selectbox-arrow');
        $placeholder.addClass('si-selectbox-placeholder');
        op.placeholder && $placeholder.text(op.placeholder);
        $input.attr('type', 'hidden');
        $selectValue.addClass('si-selectbox-selected-value').hide();
        $dropdown.addClass('si-selectbox-dropdown').hide();
        $selection.addClass('form-control si-selectbox-selection').append(_selectValue).append(_placeholder).append(_cert);
        $selectbox.addClass('si-selectbox si-selectbox-single').append(_selection).append(_dropdown);
        this.$formBlock.append(_input).append(_selectbox);
        this.$input = $input;
        this.$selectbox = $selectbox;
        this.$dropdown = $dropdown;
        this.$selection = $selection;
        this.$selectValue = $selectValue;
        this.$placeholder = $placeholder;
        this.valueArr = [];
        this.valueArrCache = [];
        setTimeout(() => {
          $dropdown.width($selection.outerWidth());
        });
        this._addEvent();
      } else {
        $input = this.$input;
        $selectbox = this.$selectbox;
        $placeholder = this.$placeholder;
        $selection = this.$selection;
      }
      switch (item) {
        case 'id':
        case 'name':
          $input.attr(item, op[item]);
          break;
        case 'placeholder':
          $placeholder.text(op[item]);
          break;
        case 'width':
          $selection.css('width', op[item]);
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
        case 'search':
          this._setSearch();
          break;
        case 'multiple':
          if (op.multiple) {
            $selectbox.removeClass('si-selectbox-single').addClass('si-selectbox-multiple');
          } else {
            $selectbox.removeClass('si-selectbox-multiple').addClass('si-selectbox-single');
          }
          break;
      }
    }
    _setReadonly() {
      if (this.selectboxDom) {
        let op = this.options,
          rl = op.readonly,
          $selectbox = this.$selectbox;
        if (typeof rl === 'boolean') {
          if (rl) {
            $selectbox.addClass('si-selectbox-readonly');
          } else {
            $selectbox.removeClass('si-selectbox-readonly');
          }
          return;
        }
        if (typeof rl === 'string') {
          let sbd = this.selectboxDom,
            rla = this.readonlyArr || [];
          let newRla = rl ? rl.split(',') : [];
          let arr1 = Array.compare(newRla, rla, true);
          let arr2 = Array.compare(newRla, rla, false);
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
    _setDisabled() {
      if (this.selectboxDom) {
        let da = this.options.disabled,
          $input = this.$input,
          $selectbox = this.$selectbox;
        if (typeof da === 'boolean') {
          if (da) {
            $selectbox.addClass('si-selectbox-disabled');
            $input.attr('disabled', true);
          } else {
            $selectbox.removeClass('si-selectbox-disabled');
            $input.removeAttr('disabled');
          }
        }
      }
    }
    _addEvent() {
      let $selection = this.$selection;
      $(document).on('click', () => {
        this._close();
      });
      $selection.on('click', (e) => {
        if (this.options.readonly === true || this.options.disabled === true) return;
        if (this.opened) {
          this._close();
        } else {
          this._open();
        }
        e.stopPropagation();
      });
    }
    _open() {
      this.opened = true;
      let $selectbox = this.$selectbox;
      let $dropdown = this.$dropdown;
      $selectbox.addClass('si-selectbox-visible');
      $dropdown.css('display', 'block').addClass('slide-up-in');
      setTimeout(() => {
        $dropdown.removeClass('slide-up-in');
      }, Number.parseFloat($dropdown.css('animation-duration')) * 1000);
    }
    _close() {
      this.opened = false;
      let $selectbox = this.$selectbox;
      let $dropdown = this.$dropdown;
      $selectbox.removeClass('si-selectbox-visible');
      $dropdown.addClass('slide-up-out');
      setTimeout(() => {
        $dropdown.css('display', 'none').removeClass('slide-up-out');
      }, Number.parseFloat($dropdown.css('animation-duration')) * 1000);
    }
    _setValue() {
      if (this.selectboxDom) {
        let op = this.options,
          va = op.value,
          vac = this.valueCache != null ? this.valueCache : '',
          sbd = this.selectboxDom,
          $placeholder = this.$placeholder,
          $selectValue = this.$selectValue;
        if (va === '' && vac !== '') {
          $selectValue.text('');
          sbd[vac].$selectbox.removeClass('si-selectbox-item-selected');
          this.$input.val(va).removeData('key');
          this.valueCache = va;
          $placeholder.show();
          $selectValue.hide();
        }
        if (sbd[va]) {
          this.$input.val(va).data('key', sbd[va].text);
          $selectValue.text(sbd[va].text);
          vac === '' && $placeholder.hide() && $selectValue.show();
          vac !== '' && sbd[vac].$selectbox.removeClass('si-selectbox-item-selected');
          sbd[va].$selectbox.addClass('si-selectbox-item-selected');
          this.valueCache = va;
        }
      }
    }
    _setAttachList() {
      this.selectboxDom = {};
      let op = this.options;
      this.readonlyArr = op.value !== '' ? op.value.split(',') : [];
      let selectboxDom = this.selectboxDom,
        data = op.data,
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
          selectboxDom[data[i][valueField]] = {
            $selectbox: $li,
            text: data[i][keyField]
          };
        }
      }
      $ul.on('click', (e) => {
        let val = $(e.target).data('value');
        if (this.readonlyArr.includes(val)) return;
        op.value = val;
        this.opened && this._close();
        e.stopPropagation();
      });
      $dropdown.html(ul);
    }
  }

  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      let $this = $(this);
      let data = $this.data('si.selectbox');
      let options = $.extend({}, Selectbox.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!data) {
        if (typeof option !== 'object') {
          console.error('请先初始化selectbox，再执行其他操作！\n selectbox初始化：$().selectbox(Object);');
          return;
        }
        data = new Selectbox(this, options);
        data.$input.data('si.selectbox', data);
      } else {
        if (typeof option == 'object') data['set'](option);
      }
      if (typeof option == 'string') data[option](_relatedTarget);
    });
  }

  let old = $.fn.selectbox;

  $.fn.selectbox = Plugin;
  $.fn.selectbox.Constructor = Selectbox;

  $.fn.selectbox.noConflict = function() {
    $.fn.selectbox = old;
    return this;
  };

  Selectbox.DEFAULTS = {
    label: '',
    id: '',
    name: '',
    labelWidth: '',
    inputWidth: '',
    width: '',
    readonly: false,
    disabled: false,
    placeholder: '请选择',
    helpText: '',
    size: '',
    keyField: 'key',
    valueField: 'value',
    data: [],
    url: '',
    value: '',
    search: false,
    multiple: false
  };
})(jQuery);