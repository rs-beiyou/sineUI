import '../component/button';

import BaseForm from './form-base';
import XHR from 'src/libs/xhr';
import _ from 'src/utils/util';

(($) => {
  class Filebox extends BaseForm {
    constructor(el, options) {
      super(el, options, Filebox.DEFAULTS);
      this.className = 'Filebox';
      this._initForm();
    }
    _setFilebox(item, newVal, val) {
      let op = this.options;
      let $input = this.$input,
        $filebox = this.$filebox,
        $fileInput = this.$fileInput,
        $fileLabel = this.$fileLabel,
        $fileList = this.$fileList;
      if (!$input) {
        let _input = document.createElement('input');
        let _fileinput = document.createElement('input');
        let _filebox = document.createElement('div');
        let _label = document.createElement('label');
        let _fileList = document.createElement('ul');
        $input = $(_input);
        $filebox = $(_filebox);
        $fileInput = $(_fileinput);
        $fileLabel = $(_label);
        $fileList = $(_fileList);
        $input.attr('type', 'hidden');
        $fileInput.attr({
          type: 'file',
          multiple: 'multiple'
        }).addClass('si-filebox-input');
        $fileList.addClass('si-filebox-list');
        op.fileLoader.listType === 'card' ? $fileList.addClass('si-filebox-list-card') : $fileList.addClass('si-filebox-list-list');
        $fileLabel.append(_fileinput);
        $filebox.addClass('si-filebox').append(_input).append(_label);
        this.$formBlock.append(_filebox).append(_fileList);
        this.$input = $input;
        this.$filebox = $filebox;
        this.$fileInput = $fileInput;
        this.$fileLabel = $fileLabel;
        this.$fileList = $fileList;
        this.valueCache = []; //已上传返回value值
        this.fileObj = {}; //文件对象
        this._setFileTrigger();
      }
      switch (item) {
        case 'id':
        case 'name':
          $input.attr(item, newVal);
          break;
        case 'multiple':
          if (newVal) {
            $fileInput.attr('multiple', 'multiple');
          } else {
            $fileInput.removeAttr('multiple');
          }
          break;
        case 'readonly':
        case 'disabled':
          this._setReadonly(newVal);
          break;
        case 'value':
          this._setValue(newVal, val);
          break;
        case 'width':
          $filebox.css('width', newVal);
          break;
      }
    }
    _setFileTrigger() {
      let fileOptions = this.options.fileLoader,
        $filebox = this.$filebox;
      switch (fileOptions.type) {
        case 'select':
          $filebox.addClass('si-filebox-select');
          this._setButton();
          break;
        case 'photo':
          $filebox.addClass('si-filebox-photo');
          this._setPhoto();
          break;
        case 'drag':
          $filebox.addClass('si-filebox-drag');
          this._setDrag();
          break;
      }
      this._addEvent();
    }
    _setValue(newVal) {
      // let newValArr = newVal !== '' && String(newVal).split(';');

      this.$input.val(newVal).trigger('change');
    }
    _getFileList() {

    }
    _setButton() {
      let button = document.createElement('div');
      $(button).addClass('btn btn-primary').html(this.options.fileLoader.buttonText);
      this.$fileLabel.append(button);
    }
    _setPhoto() {

    }
    _setDrag() {

    }
    _addEvent() {
      let $fileInput = this.$fileInput;
      $fileInput.on('change', (e) => {
        let files = e.target.files;
        this._select(files);
        $fileInput.val(''); //重置input value
      });
    }
    _select(files) {
      let fileOptions = this.options.fileLoader,
        valueCache = this.valueCache;
      if (fileOptions.fileNumLimit && fileOptions.fileNumLimit < valueCache.length + files.length) return;
      for (let i = 0, len = files.length; i < len; i++) {
        let file = files[i];
        console.log(`------已选择文件【${file.name}】------`);
        let fid = this._addFile(file, i);
        this._addFileItem(file, fid);
      }
    }
    _addFile(file, i) {
      let fid = i + _.randomString(10);
      Object.assign(this.fileObj, {
        [fid]: {
          state: false,
          file: file,
          data: null,
          upload: null
        }
      });
      return fid;
    }
    _removeFile(fid) {
      let valueCache = this.valueCache,
        fileObj = this.fileObj;
      valueCache.splice(valueCache.indexOf(fileObj[fid].date.id), 1);
    }
    _addFileItem(file, fid) {
      let fileOptions = this.options.fileLoader,
        $fileList = this.$fileList,
        valueCache = this.valueCache,
        fileObj = this.fileObj,
        thisFile = fileObj[fid];
      let item = document.createElement('li');
      let progress = document.createElement('div');
      let doc = document.createElement('i');
      let inner = document.createElement('div');
      let name = document.createElement('span');
      let info = document.createElement('i');
      let remove = document.createElement('i');
      let $item = $(item);
      let $progress = $(progress);
      $(doc).addClass('si-filebox-item-type ' + this._getFileTypeClass(file.name.split('.').pop().toLowerCase()));
      $(info).addClass('si-filebox-item-info fa fa-info-circle');
      $(remove).addClass('si-filebox-item-remove fa fa-remove');
      $(name).addClass('si-filebox-list-item-name').text(file.name);
      $(inner).addClass('si-filebox-item-inner').append(name);
      $progress.addClass('si-filebox-item-progress');
      $item.addClass('si-filebox-list-item').data('item', fid).append(doc).append(inner).append(info).append(remove).append(progress);
      $item.on('click', (e) => {
        let target = e.target;
        if (target.className.includes('si-filebox-item-info')) {
          console.log('tip');
        }
        if (target.className.includes('si-filebox-item-remove')) {
          if (thisFile.status) {
            this._removeFile(fid);
          } else {
            delete fileObj[fid];
          }
          $item.fadeOut(() => {
            $item.remove();
          });
        }
      });
      this.options.fileLoader.multiple ? $fileList.append(item) : $fileList.html(item);
      if (!this._filter(file).type) {
        $item.addClass('si-filebox-item-error');
        return;
      }
      const upload = () => {
        if (!fileOptions.autoUpload) $item.removeClass('si-filebox-item-ready');
        return this._addUploadPromise(file, $progress).then(res => {
          if (fileOptions.uploadSuccess && fileOptions.uploadSuccess(res) !== false) {
            if (res.id) {
              Object.assign(thisFile, {
                data: res,
                state: true,
                upload: null
              });
              valueCache.push(res.id);
              this.options.value = valueCache.join(',');
            }
          }
          return res;
        }).catch(error => {
          $item.addClass('si-filebox-item-error');
          console.warn(error.message);
          if (fileOptions.uploadFail && fileOptions.uploadFail(error)) {
            console.log(error);
          }
        });
      };
      if (fileOptions.autoUpload) {
        upload();
      } else {
        $item.addClass('si-filebox-item-ready');
        Object.assign(thisFile, {
          upload: upload
        });
        if (!this.$uploadBtn) {
          let uploadBtn = document.createElement('div');
          let $uploadBtn = $(uploadBtn);
          $uploadBtn.addClass('si-filebox-upload-btn btn btn-success').html('上传').on('click', () => {
            $uploadBtn.loading();
            this._upload();
          });
          this.$filebox.append(uploadBtn);
          this.$uploadBtn = $uploadBtn;
        } else {
          this.$uploadBtn.fadeIn('slow');
        }
      }
    }
    _upload() {
      let fileObj = this.fileObj;
      let $uploadBtn = this.$uploadBtn;
      let arr = [];
      Object.keys(fileObj).forEach(item => {
        let fn = fileObj[item] && fileObj[item].upload;
        fn && arr.push(fn());
      });
      Promise.all(arr).then(() => {
        $uploadBtn.fadeOut('slow', () => {
          $uploadBtn.loading('close');
        });
      }).catch(() => {
        $uploadBtn.loading('close');
      });
    }
    _filter(file) {
      let fileOptions = this.options.fileLoader;
      if (Math.round(file.size * 100 / 1024) / 100 > fileOptions.fileSizeLimit) {
        return {
          type: false,
          msg: '文件' + file.name + '大小超出限制！'
        };
      }
      if (!fileOptions.fileTypeExts.split(';').includes(file.name.split('.').pop().toLowerCase())) {
        return {
          type: false,
          msg: '文件' + file.name + '的类型不允许！'
        };
      }
      return {
        type: true
      };
    }
    _getFileTypeClass(type) {
      let defaultImgs = this.options.fileLoader.defaultImgs,
        fileClass;
      switch (type) {
        case 'zip':
          fileClass = defaultImgs.zip;
          break;
        case 'doc':
        case 'docx':
          fileClass = defaultImgs.doc;
          break;
        case 'pdf':
          fileClass = defaultImgs.pdf;
          break;
        case 'xls':
        case 'xlsx':
          fileClass = defaultImgs.xls;
          break;
        case 'ppt':
        case 'pptx':
          fileClass = defaultImgs.ppt;
          break;
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
          fileClass = defaultImgs.pic;
          break;
        case 'mp3':
          fileClass = defaultImgs.aud;
          break;
        case 'mp4':
        case 'avi':
        case 'rmvb':
          fileClass = defaultImgs.vid;
          break;
        default:
          fileClass = defaultImgs.other;
          break;
      }
      return fileClass;
    }
    _addUploadPromise(file, $progress) {
      const promise = new Promise((resolve, reject) => {
        let fileOptions = this.options.fileLoader;
        if (!fileOptions.uploader) {
          // console.warn(this.options.name + '未定义上传Url，请检查组件配置。');
          throw Error(`${this.options.name}未定义上传Url，请检查组件配置。`);
          // return false;
        }
        let xhr = new XHR();
        if (xhr.upload) {
          // 上传中
          xhr.onprogress = _.debounce(e => {
            let percent = (e.loaded / e.total * 100).toFixed(2) + '%';
            $progress.css('margin-left', percent);
          }, 200);
          // 文件上传成功或是失败
          xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
              try {
                let response = JSON.parse(xhr.responseText);
                if (xhr.status == 200) {
                  resolve(response);
                } else {
                  reject(response);
                }
              } catch (error) {
                reject(error);
              }
            }
          };
          // 开始上传
          xhr.open(fileOptions.method, fileOptions.uploader, true);
          // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
          let fd = new FormData();
          fd.append(fileOptions.fileObjName, file);
          if (fileOptions.formData) {
            let keys = Object.keys(fileOptions.formData);
            keys.forEach(key => {
              fd.append(key, fileOptions.formData[key]);
            });
          }
          if (fileOptions.domData) {
            let keys = Object.keys(fileOptions.domData);
            keys.forEach(key => {
              let id = fileOptions.domData[key];
              let value = id ? id.startsWith('#') ? $(id).val() : $('#' + id).val() : null;
              fd.append(key, value);
            });
          }
          xhr.send(fd);
        }
      });
      return promise;
    }
  }

  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      let $this = $(this);
      let dataSet = $this.data();
      let data = dataSet['si.filebox'];
      if (!data) {
        dataSet.fileloader ? dataSet.fileloader = (new Function('return ' + dataSet.fileloader))() : false;
        //data-api覆盖data-options
        let options = $.extend(true, {}, typeof option === 'object' && option);
        let datakeys = Object.keys(dataSet);
        let defaultkeys = Object.keys(Filebox.DEFAULTS);
        //dataset会将所有key转为小写
        defaultkeys.forEach((key) => {
          let lowkey = key.toLocaleLowerCase();
          if (datakeys.includes(lowkey)) {
            let type = typeof Filebox.DEFAULTS[key];
            type === 'string' ? options[key] = dataSet[lowkey] : null;
            type === 'object' ? options[key] = $.extend(true, {}, dataSet[lowkey]) : null;
          }
        });
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
      method: 'post',
      type: 'select', //[select,photo,drag]
      listType: 'text', //[text,card]
      multiple: true,
      autoUpload: false, //是否开启自动上传
      buttonText: '选择文件',
      description: '', //组建描述
      showUploadedPercent: true, //是否实时显示上传的百分比，如20%
      showUploadedSize: true, //是否实时显示已上传的文件大小，如1M/2M
      fileObjName: 'file', //在后端接受文件的参数名称
      fileTypeExts: 'jpg;png;txt;doc',
      fileTypeLimit: '',
      fileSizeLimit: 2048,
      fileNumLimit: null,
      uploader: '',
      downloader: '',
      delFileUrl: '',
      getFileUrl: '',
      formData: null,
      domData: null, //动态参数，格式：{key:id}
      uploadSuccess: null,
      uploadFail: null,
      uploadComplete: null,
      defaultImgs: {
        doc: 'fa fa-file-word-o',
        ppt: 'fa fa-file-powerpoint-o',
        xls: 'fa fa-file-excel-o',
        pdf: 'fa fa-file-pdf-o',
        zip: 'fa fa-file-archive-o',
        pic: 'fa fa-file-image-o',
        vid: 'fa fa-file-video-o',
        aud: 'fa fa-file-audio-o',
        other: 'fa fa-paperclip'
      }
    }
  };
})(jQuery);