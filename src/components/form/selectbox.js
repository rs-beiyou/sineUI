import BaseForm from './form-base';
(function($) {
  class Selectbox extends BaseForm {
    constructor(el, options) {
      super(el, options, Selectbox.DEFAULTS);
      this.className = 'Selectbox';
      this._initForm();
    }
    _setSelectbox(item, newVal) {
      let op = this.options;
      let $input = this.$input,
        $selectbox = this.$selectbox,
        $selection = this.$selection,
        $placeholder = this.$placeholder,
        $dropdown, $selectValue, $clear;
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
        $(_cert).addClass('fa fa-caret-down  si-selectbox-arrow');
        $clear.addClass('fa fa-times-circle si-selectbox-arrow');
        $placeholder.addClass('si-selectbox-placeholder');
        op.placeholder && $placeholder.text(op.placeholder);
        $input.attr('type', 'hidden');
        $selectValue.addClass('si-selectbox-selected-value').attr('display', 'none');
        $dropdown.addClass('si-selectbox-dropdown');
        $selection.addClass('form-control si-selectbox-selection').append(_selectValue).append(_placeholder).append(_cert).append(_clear);
        $selectbox.addClass('si-selectbox si-selectbox-single').append(_input).append(_selection).append(_dropdown);
        this.$formBlock.append(_selectbox);
        this.$input = $input;
        this.$selectbox = $selectbox;
        this.$dropdown = $dropdown;
        this.$selection = $selection;
        this.$selectValue = $selectValue;
        this.$placeholder = $placeholder;
        this.$clear = $clear;
        this.valueArr = []; //value的数组形式
        this.valueArrCache = []; //前一个value的数组形式，用来跟现在value对比操作
        this.readonlyArr = []; //readonlyArr表示只读项数组
        setTimeout(() => {
          $dropdown.width($selection.outerWidth());
        });
        this._addEvent();
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
          this._setValue(newVal);
          break;
        case 'data':
          if (!Array.isArray(newVal)) return;
          this._setAttachList(newVal);
          op.value !== '' && this._setValue(op.value);
          op.readonly !== false && this._setReadonly(op.readonly);
          op.disabled !== false && this._setDisabled(op.disabled);
          break;
        case 'search':
          this._setSearch();
          break;
        case 'multiple':
          if (newVal) {
            $selectbox.removeClass('si-selectbox-single').addClass('si-selectbox-multiple');
          } else {
            $selectbox.removeClass('si-selectbox-multiple').addClass('si-selectbox-single');
          }
          break;
      }
    }
    _setReadonly(newVal) {
      if (this.selectboxDom) {
        let rl = newVal,
          $selectbox = this.$selectbox;
        if (typeof rl === 'boolean') {
          if (rl) {
            $selectbox.addClass('si-selectbox-readonly');
          } else {
            $selectbox.removeClass('si-selectbox-readonly');
          }
          return;
        }
        if (typeof rl === 'number') {
          rl = String(rl);
        }
        if (typeof rl === 'string') {
          let sbd = this.selectboxDom,
            rla = this.readonlyArr;
          let newRla = rl ? rl.split(',') : [];
          let arr1 = Array.compare(newRla, rla);
          let arr2 = Array.compare(rla, newRla);
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
      let op = this.options;
      $('.si-page').on('click', () => {
        this._close();
      });
      this.$selection.on('click', () => {
        if (op.readonly === true || op.disabled === true) return;
        if (this.opened) {
          setTimeout(() => {
            this._close();
          });
        } else {
          setTimeout(() => {
            this._open();
          });
        }
      });
      this.$clear.on('click', (e) => {
        op.value = '';
        this.opened && this._close();
        e.stopPropagation();
      });
    }
    _open() {
      if (this.opened) return;
      this.opened = true;
      let $selectbox = this.$selectbox;
      let $dropdown = this.$dropdown;
      $selectbox.addClass('si-selectbox-visible');
      $dropdown.addClass('slide-up-in');
      setTimeout(() => {
        $dropdown.removeClass('slide-up-in');
      }, Number.parseFloat($dropdown.css('animation-duration')) * 1000);
    }
    _close() {
      if (!this.opened) return;
      this.opened = false;
      let $selectbox = this.$selectbox;
      let $dropdown = this.$dropdown;
      $dropdown.addClass('slide-up-out');
      setTimeout(() => {
        $dropdown.removeClass('slide-up-out');
        $selectbox.removeClass('si-selectbox-visible');
      }, Number.parseFloat($dropdown.css('animation-duration')) * 1000);
    }
    _setValue(newVal) {
      if (this.selectboxDom) {
        let op = this.options;
        let $placeholder = this.$placeholder;
        if (op.multiple) {
          let va = newVal !== '' ? String(newVal).split(',') : [],
            vac = this.valueArrCache,
            sbd = this.selectboxDom;
          let arr1 = Array.compare(va, vac);
          let arr2 = Array.compare(vac, va);
          if (va.length > 0) {
            $placeholder.hide();
            op.clearable && this.$selectbox.addClass('si-selectbox-show-clear');
          }
          arr1.forEach(key => {
            sbd[key] && sbd[key].$selectbox.addClass('si-selectbox-item-selected');
            this._addTag(key, sbd[key].text);
          });
          arr2.forEach(key => {
            sbd[key] && sbd[key].$selectbox.removeClass('si-selectbox-item-selected');
            this.tagsDom[key].remove();
            delete this.tagsDom[key];
          });
          if (va.length === 0) {
            $placeholder.show();
            op.clearable && this.$selectbox.removeClass('si-selectbox-show-clear');
          }
          this.valueArrCache = va;
          this.$input.val(newVal).trigger('change');
        } else {
          let va = String(newVal),
            vac = this.valueCache != null ? this.valueCache : '',
            sbd = this.selectboxDom,
            $selectValue = this.$selectValue;
          if (va === '' && vac !== '') {
            $selectValue.text('');
            sbd[vac].$selectbox.removeClass('si-selectbox-item-selected');
            op.clearable && this.$selectbox.removeClass('si-selectbox-show-clear');
            this.$input.val(va).removeData('key').trigger('change');
            this.valueCache = va;
            $placeholder.show();
            $selectValue.hide();
          }
          if (sbd[va]) {
            this.$input.val(va).data('key', sbd[va].text).trigger('change');
            $selectValue.text(sbd[va].text);
            vac === '' && $placeholder.hide() && $selectValue.show();
            vac !== '' && sbd[vac].$selectbox.removeClass('si-selectbox-item-selected');
            sbd[va].$selectbox.addClass('si-selectbox-item-selected');
            op.clearable && this.$selectbox.addClass('si-selectbox-show-clear');
            this.valueCache = va;
          }
        }
      }
    }
    _addTag(val, text) {
      let valueArr = this.valueArr;
      this.tagsDom = this.tagsDom || {};
      let _tag = document.createElement('div');
      let _tagText = document.createElement('span');
      let _tagClose = document.createElement('i');
      $(_tagClose).addClass('fa fa-close si-tag-close').on('click', (e) => {
        for (let i = 0, len = valueArr.length; i < len; i++) {
          if (valueArr[i] === val) {
            valueArr.splice(i, 1);
            break;
          }
        }
        this.options.value = valueArr.join(',');
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
        $dropdown = this.$dropdown,
        valueArr = this.valueArr;
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
  }

  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      let $this = $(this);
      let dataSet = $this.data();
      let data = dataSet['si.selectbox'];

      if (!data) {
        dataSet.data ? dataSet.data = eval(dataSet.data) : false;
        //data-api覆盖data-options
        let options = Object.assign({}, Selectbox.DEFAULTS, typeof option === 'object' && option);
        let datakeys = Object.keys(dataSet);
        let defaultkeys = Object.keys(options);
        defaultkeys.forEach((key) => {
          let lowkey = key.toLocaleLowerCase();
          if (datakeys.includes(lowkey)) {
            options[key] = dataSet[lowkey];
          }
        });
        if (typeof option !== 'object') {
          console.error('请先初始化selectbox，再执行其他操作！\n selectbox初始化：$().selectbox(Object);');
          return;
        }
        data = new Selectbox(this, options);
        data.$input.data('si.selectbox', data);
      } else {
        if (typeof option === 'object') data['set'](option);
      }
      if (typeof option === 'string') data[option](_relatedTarget);
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
    clearable: false,
    multiple: false
  };
})(jQuery);