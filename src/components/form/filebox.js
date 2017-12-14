import BaseForm from './form-base';
(($) => {
  class Filebox extends BaseForm {
    constructor(el, options) {
      super(el, options, Filebox.DEFAULTS);
      this.className = 'Filebox';
      this._initForm();
    }
    _setFilebox() {

    }
  }

  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      let $this = $(this);
      let dataSet = $this.data();
      let data = dataSet['si.checkbox'];
      dataSet.data ? dataSet.data = (new Function('return ' + dataSet.data))() : false;
      //data-api覆盖data-options
      let options = Object.assign({}, Filebox.DEFAULTS, typeof option == 'object' && option);
      let datakeys = Object.keys(dataSet);
      let defaultkeys = Object.keys(options);
      defaultkeys.forEach((key) => {
        let lowkey = key.toLocaleLowerCase();
        if (datakeys.includes(lowkey)) {
          options[key] = dataSet[lowkey];
        }
      });
      if (!data) {
        if (typeof option !== 'object') {
          console.error('请先初始化Filebox，再执行其他操作！\n Filebox初始化：$().filebox(Object);');
          return;
        }
        data = new Filebox(this, options);
        data.$input.data('si.filebox', data);
      } else {
        if (typeof option == 'object') data['set'](option);
      }
      if (typeof option == 'string') data[option](_relatedTarget);
    });
  }
  let old = $.fn.filebox;

  $.fn.filebox = Plugin;
  $.fn.filebox.Constructor = Filebox;

  $.fn.filebox.noConflict = function() {
    $.fn.filebox = old;
    return this;
  };
  Filebox.DEFAULTS = {
    label: '',
    name: '',
    id: '',
    value: '',
    labelWidth: '',
    inputWidth: '',
    width: '',
    readonly: false,
    disabled: false,
    helpText: '',
    fileLoader: {
      fileTypeExts: 'jpg;png;txt;doc',
      fileSizeLimit: 2048,
      uploader: '',
      downloader: '',
      delFileUrl: '',
      getFileUrl: '',
      formData: '',
      domData: ''
    }
  };
})(jQuery);