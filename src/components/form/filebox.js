import '../component/button';
import '../modal/dialog';
import '../modal/confirm';

import BaseForm from './form-base';
import WebUploader from 'libs/webuploader/webuploader.js';
import _ from '../../utils/util';
import uploaderFlash from 'libs/webuploader/Uploader.swf';

class Filebox extends BaseForm {
  constructor(el, options) {
    super(el, options, Filebox.DEFAULTS);
    this.className = 'Filebox';
    this.curIndex = '';
    this.state = '';
    this.fileArr = [];
    this.valueArr = []; //已上传返回value值
    this._initForm();
  }
  _setFilebox(item, newVal, val) {
    let op = this.options;
    let $input = this.$input,
      $filebox = this.$filebox,
      $fileList = this.$fileList,
      $dialogBtn = this.$dialogBtn;
    if (!$input) {
      let _input = document.createElement('input'),
        _filebox = document.createElement('div'),
        _fileList = document.createElement('ul'),
        _dialogBtn = document.createElement('button');
      $input = $(_input);
      $filebox = $(_filebox);
      $fileList = $(_fileList);
      $dialogBtn = $(_dialogBtn);
      $input.attr('type', 'hidden');
      $fileList.addClass('si-filebox-list');
      $dialogBtn.attr('type','button').addClass('btn btn-sm btn-info').html('文件上传');
      op.fileLoader.listType === 'card' ? $fileList.addClass('si-filebox-list-card') : $fileList.addClass('si-filebox-list-list');
      $filebox.addClass('si-filebox').append(_input).append(_dialogBtn);
      this.$formBlock.append(_filebox).append(_fileList);
      this.$input = $input;
      this.$filebox = $filebox;
      this.$fileList = $fileList;
      this.$dialogBtn = $dialogBtn;
      this._initDialog();
    }
    switch (item) {
      case 'id':
      case 'name':
        $input.attr(item, newVal);
        break;
      case 'value':
        this._setValue(newVal, val);
        break;
      case 'width':
        $filebox.css('width', newVal);
        break;
    }
  }
  _setValue(newVal){
    this.loadData(newVal);
  }
  _initDialog(){
    this.$dialogBtn.on('click',(e)=>{
      let event = e || window.event; 
      if(event.preventDefault) {
        event.preventDefault();
      }else{
        event.returnValue = false;
      }
      this._getDialogContent();
      $.dialog({
        title:'文件上传',
        maxmin: false,
        area:['650px','400px'],
        resize: false,
        content: this.$dialogContent,
        success:(d, di)=>{
          this.dialogIndex = di;
          this._initUploader();
        },
        cancel:(index)=>{
          if(this.hasInited()){
            $.confirm('现在关闭将终止未上传文件的上传，确定关闭吗？',()=>{
              this.uploader.destroy();
              $.dialogClose(index);
            });
            return false;
          }
        },
        end:()=>{
          this.$dialogContent.remove();
        }
      });
    });
  }
  _getDialogContent(){
    let _dialogContent = document.createElement('div'),
      _dialogBody = document.createElement('div'),
      _fileQueue = document.createElement('div'),
      _contentFixed = document.createElement('div'),
      _uploadBtn = document.createElement('button'),
      _closeBtn = document.createElement('button'),
      _chooseBtn = document.createElement('div');
    let $dialogContent = $(_dialogContent),
      $uploadBtn = $(_uploadBtn),
      $closeBtn = $(_closeBtn),
      $chooseBtn = $(_chooseBtn),
      $fileQueue = $(_fileQueue);
    $uploadBtn.attr('type','button').addClass('btn btn-sm btn-info').text('开始上传').hide().on('click',()=>{
      let curIndex = this.curIndex,
        fileArr = this.fileArr;
      if (this.state === 'uploading'){
        this.uploader.stop(true);
      } else {
        if(curIndex<=fileArr.length-1){
          this.uploader.upload(fileArr[curIndex]);
        }
      }
    });
    $closeBtn.attr('type','button').addClass('btn btn-sm btn-default').text('关闭').on('click',()=>{
      if(this.hasInited()){
        $.confirm('现在关闭将终止未上传文件的上传，确定关闭吗？',()=>{
          this.uploader.destroy();
          $.dialogClose(this.dialogIndex);
        });
      }else{
        $.dialogClose(this.dialogIndex);
      }
    });
    $chooseBtn.text('选择文件');
    $fileQueue.addClass('si-uploader-queue');
    $(_dialogBody).addClass('si-uploader-body').append(_fileQueue);
    $(_contentFixed).addClass('si-uploader-fix').append(_chooseBtn).append(_uploadBtn).append(_closeBtn);
    $dialogContent.append(_dialogBody).append(_contentFixed);
    this.$dialogContent = $dialogContent;
    this.$uploadBtn = $uploadBtn;
    this.$closeBtn = $closeBtn;
    this.$chooseBtn = $chooseBtn;
    this.$fileQueue = $fileQueue;
    $('body').append(_dialogContent);
  }
  _initUploader() {
    let op = this.options,
      upop = op.fileLoader;
    WebUploader.Uploader.register({
      'before-send':'beforeSend'  //每个分片上传前
    },{
      beforeSend:this.beforeSend.bind(this)
    });
    const mimeTypes = this._formatFileType();
    let uploader = WebUploader.create({
      auto:upop.auto,//选择文件后是否自动上传
      method: upop.method,
      chunked: upop.chunked,//开启分片上传
      chunkSize: upop.chunkSize,// 如果要分片，分多大一片？默认大小为5M
      chunkRetry: upop.chunkRetry,//如果某个分片由于网络问题出错，允许自动重传多少次
      threads: upop.threads,//上传并发数。允许同时最大上传进程数[默认值：3]
      duplicate : false,//是否重复上传（同时选择多个一样的文件），true可以重复上传
      prepareNextFile: true,//上传当前分片时预处理下一分片
      swf: uploaderFlash,// swf文件路径
      fileVal: upop.fileObjName,
      server: upop.uploader,// 文件接收服务端
      fileSizeLimit: upop.fileSizeLimit,//6G 验证文件总大小是否超出限制, 超出则不允许加入队列
      fileSingleSizeLimit: upop.fileSingleSizeLimit,  //3G 验证单个文件大小是否超出限制, 超出则不允许加入队列
      pick: op.readonly||op.disabled ? null:{
        id: this.$chooseBtn, //这个id是你要点击上传文件按钮的外层div的id
        multiple : upop.multiple //是否可以批量上传，true可以同时选择多个文件
      },
      resize: false,  //不压缩image, 默认如果是jpeg，文件上传前会先压缩再上传！
      compress: false, //配置压缩的图片的选项
      accept: {
        //允许上传的文件后缀，不带点，多个用逗号分割
        extensions: mimeTypes,
        mimeTypes: mimeTypes
      }
    });
    this.uploader = uploader;
    this.queue();
    this.dequeue();
    this.uploadProgress();
    this.uploadSuccess();
    this.uploadError();
    this.uploadFinished();
    this.error();
    uploader.on('all', type=> {
      if (type === 'startUpload'){
        this.state = 'uploading';
      }else if(type === 'stopUpload'){
        this.state = 'paused';
      }else if(type === 'uploadFinished'){
        this.state = 'done';
      }
      if (this.state === 'uploading'){
        this.$uploadBtn.text('暂停上传');
      } else {
        this.$uploadBtn.text('开始上传');
      }
    });
  }
  queue(){
    this.uploader.on('fileQueued', (file)=> {
      this.$uploadBtn.show();
      this.fileArr.push(file);
      this._createFileItem(file);
      file.$progressDesc.html('文件解析中...');
      this.options.fileLoader.chunked && this.uploader.md5File(file, 0, this.options.fileLoader.chunkSize)
        .then(function(val) {
          file.fileMd5 = val;
          file.$progressDesc.html('等待上传');
        });
      file.on('statuschange',function(cur){
        switch(cur){
          case 'progress':file.$progressDesc.html('上传中...');
            break;
          case 'complete':file.$progressDesc.html('准备合并...');
            break;
          case 'error':file.$progressDesc.html('上传出错！').css('color','red');
            break;
          case 'interrupt':file.$progressDesc.html('已暂停');
            break;
        }
      });
    });
  }
  dequeue(){
    this.uploader.on('fileDequeued', (file)=> {
      let $item = this.$fileQueue.find('#fileupload'+file.id);
      let index = $item.index();
      if(index<this.curIndex){
        this.curIndex--;
      }
      this.fileArr.splice(index,1);
      $item.remove();
      if(!this.hasInited()){
        this.$uploadBtn.hide();
      }
    });
  }
  beforeSend(block){
    let upop = this.options.fileLoader;
    if(!upop.chunked)return;
    let deferred = WebUploader.Deferred(),
      file = block.file;
    $.post(upop.checkChunkUrl,{
      'fileName' : file.name,
      'fileMd5': file.fileMd5,  //文件唯一标记
      'chunk': block.chunk,  //当前分块下标
      'chunkSize':  block.end-block.start//当前分块大小
    },response=>{
      if(response){
        //分块存在，跳过
        deferred.reject();
      }else{
        let fd =  this.uploader.options.formData;
        fd.fileMd5 = file.fileMd5;
        file.filedesc = file.$fileDesc.val();
        if(upop.formData){
          for (let key in upop.formData) {
            fd[key] = upop.formData[key];
          }
        }
        if(upop.domData){
          for (let d_key in upop.domData) {
            let dom_id = upop.domData[d_key];
            if (dom_id !== '') {
              dom_id = dom_id.indexOf('#') > -1
                ? dom_id
                :'#' + dom_id;
              let dom_val = $(dom_id).val();
              fd[d_key] = dom_val;
            }
          }
        }
        //分块不存在或不完整，重新发送该分块内容
        deferred.resolve();
      }
    });
    return deferred.promise();
  }
  uploadProgress(){
    let upop = this.options.fileLoader;
    this.uploader.on('uploadProgress', (file, percentage)=> {
      let percent = (percentage * 100).toFixed(2) + '%';
      if (upop.showUploadedSize) {
        file.$uploadedSize.text(WebUploader.formatSize(file.size*percentage));
      }
      if (upop.showUploadedPercent) {
        file.$uploadPercent.text(percent);
      }
      file.$progressBar.css('width',percent);
    });
  }
  uploadSuccess(){
    let upop = this.options.fileLoader,
      valueArr = this.valueArr,
      fileArr = this.fileArr;
    this.uploader.on('uploadSuccess', (file, response)=> {
      file.$progressBar.css('width','100%');
      if(upop.chunked){
        file.$progressDesc.html('文件合并中...');
        //如果分块上传成功，则通知后台合并分块
        $.post(upop.mergeUrl,Object.assign({
          'fileName' : file.name,
          'fileMd5': file.fileMd5,
          'ext': file.ext,
          'size': file.size
        },upop.formData||{}),res => {
          if(res==-1){
            file.$progressDesc.html('上传失败！').css('color','red');
            return;
          }
          file.$progressDesc.html('上传成功！').css('color','#0099FF');
          valueArr.push(res);
          this.$input.val(valueArr.join(';')).trigger('change');
          let re;
          if(upop.uploadSuccess){
            re = upop.uploadSuccess(file, res);
          }
          if(re!==false){
            this._addFileList(file, res);
          }
        });
      }else{
        file.$progressDesc.html('上传成功！').css('color','#0099FF');
        valueArr.push(response);
        this.$input.val(valueArr.join(';')).trigger('change');
        let re;
        if(upop.uploadSuccess){
          re = upop.uploadSuccess(file, response);
        }
        if(re!==false){
          this._addFileList(file, response);
        }
      }
      this.curIndex++; //每上传完成一个文件 curIndex+1
      if(this.curIndex<=fileArr.length-1){
        this.uploader.upload(fileArr[this.curIndex]);//上传文件列表中的下一个文件
      }
    });
  }
  uploadFinished(){
    this.uploader.on('uploadFinished', ()=> {
      if(!this.hasInited()){
        this.$uploadBtn.hide();
      }
    });
  }
  uploadError(){
    this.uploader.on('uploadError', (file, reason)=> {
      $.alert(reason);
    });
  }
  error(){
    this.uploader.on('error', type=> {
      switch(type){
        case 'Q_EXCEED_NUM_LIMIT': $.msg('文件数量超出限制');
          break; 
        case 'Q_EXCEED_SIZE_LIMIT': $.msg('文件大小超出限制');
          break;
        case 'Q_TYPE_DENIED': $.msg('文件类型不支持');
          break;
      }
    });
  }
  _formatFileType(){
    let type = this.options.fileLoader.fileTypeExts;
    if(type&&type.includes('[')){
      let typeObj = Filebox.fileTypes;
      let arr = type.split(';');
      arr.forEach((te,i)=>{
        if(te.includes('[')){
          arr[i] = typeObj[te.slice(1,-1)];
        }
      });
      type = arr.join(';');
    }
    return type.replace(/;/g,',');
  }
  _createFileItem(file){
    let upop = this.options.fileLoader,
      uploader = this.uploader;
    //处理模板中使用的变量
    let item = document.createElement('div');
    let itemLeft = document.createElement('div');
    let itemRight = document.createElement('div');
    let itemTitle = document.createElement('span');
    let itemSize = document.createElement('span');
    let uploadedSize = document.createElement('span');
    let totalSize = document.createElement('span');
    let itemPercent = document.createElement('span');
    let itemButton = document.createElement('span');
    let itemIcon = document.createElement('i');
    let itemDesc = document.createElement('div');
    let itemDescContent = document.createElement('div');
    let itemDescInput = document.createElement('input');
    let itemProgress = document.createElement('div');
    let itemProgressDesc = document.createElement('span');
    let itemProgressBar = document.createElement('div');
    let $item = $(item), 
      $itemTitle = $(itemTitle), 
      $itemDescInput = $(itemDescInput),
      $itemProgressDesc = $(itemProgressDesc),
      $itemProgressBar = $(itemProgressBar),
      $uploadedSize = $(uploadedSize),
      $totalSize = $(totalSize),
      $itemPercent = $(itemPercent);
    $item.addClass('uploader-queue-item').attr('id', 'fileupload'+file.id);
    $(itemTitle).addClass('uploader-filename').html(file.name);
    $uploadedSize.addClass('uploaded-size').html('0');
    $totalSize.addClass('total-size').html(WebUploader.formatSize(file.size));
    $(itemSize).addClass('uploader-progress-num').append(uploadedSize).append(' / ').append(totalSize);
    $itemPercent.addClass('uploader-percent').html('0%');
    $(itemIcon).addClass('fa fa-remove');
    $(itemButton).attr('title', '删除').addClass('delfileBtn').append(itemIcon);
    $itemDescInput.addClass('btsp-textbox').attr('data-options', '{label:\'文件描述：\',inputWidth:\'200px\'}');
    $(itemDescContent).addClass('form-group form-group-sm').append(itemDescInput);
    $(itemDesc).addClass('form-columns').css('padding','0').append(itemDescContent);
    $itemProgressBar.addClass('uploader-progress-bar');
    $itemProgressDesc.addClass('uploader-progress-desc').html('等待上传...');
    $(itemProgress).addClass('uploader-progress').append(itemProgressBar);
    $(itemLeft).addClass('uploader-item-left');
    $(itemRight).addClass('uploader-item-right').append(itemTitle).append(itemButton).append(itemDesc).append(itemProgress);
    $item.append(itemLeft).append(itemRight);
    uploader.makeThumb( file, ( error, ret )=> {
      let pic = null;
      if ( error ) {
        pic = this.create('i');
        $(pic).addClass(this.getObjectURL(file));
      } else {
        pic = this.create('img');
        $(pic).attr('src',ret);
      }
      $(itemLeft).html(pic);
    });
    //为删除文件按钮绑定删除文件事件
    $(itemButton).on('click', function() {
      uploader.removeFile( file, true );
    });
    //判断是否显示上传百分比
    if (upop.showUploadedPercent) {
      $itemTitle.after(itemPercent);
    }
    //判断是否显示已上传文件大小
    if (upop.showUploadedSize) {
      $itemTitle.after(itemSize);
    }
    this.$fileQueue.append(item);
    $.parser.parse($item);
    $(itemDescContent).append(itemProgressDesc);
    Object.assign(file, {
      $progressDesc: $itemProgressDesc,
      $fileDesc: $itemDescInput,
      $progressBar: $itemProgressBar,
      $uploadedSize: $uploadedSize,
      $totalSize: $totalSize,
      $uploadPercent: $itemPercent
    });
  }
  getObjectURL(file){
    let url = null, option = this.options.fileLoader;
    let fileType = file.name.split('.').pop().toLowerCase();
    switch (fileType) {
      case 'zip':
        url = option.defaultImgs.zip;
        break;
      case 'doc':
      case 'docx':
        url = option.defaultImgs.doc;
        break;
      case 'pdf':
        url = option.defaultImgs.pdf;
        break;
      case 'xls':
      case 'xlsx':
        url = option.defaultImgs.xls;
        break;
      case 'ppt':
      case 'pptx':
        url = option.defaultImgs.ppt;
        break;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        if (window.createObjectURL != undefined) {
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          url = window.webkitURL.createObjectURL(file);
        }
        break;
      default:
        url = option.defaultImgs.other;
        break;
    }
    return url;
  }
  _addFileList(file, id){
    let option = this.options, li;
    if (option.readonly || option.disabled) {
      li = this._addFileItem(file, id, true, false, false);
    } else {
      li = this._addFileItem(file, id, true, true, true);
    }
    this.$fileList.append(li);
  }
  _addFileItem(file, id, hasDownload, hasRemove, removeFromServer){
    let li = document.createElement('li'),
      name_span = document.createElement('span'),
      remove_span, download_span,
      valueArr = this.valueArr;
    $(name_span).html(file.name);
    if (hasRemove) {
      remove_span = document.createElement('span');
      let remove_i = document.createElement('i');
      $(remove_i).addClass('fa fa-remove');
      $(remove_span).attr('title', '删除').addClass('file-remove').append(remove_i).on('click',()=> {
        if (removeFromServer) {
          this.deleteFile(id, ()=> {
            $(li).remove();
            _.delete(valueArr, id);
            this.$input.val(valueArr.join(';')).trigger('change');
          });
        } else {
          $(li).remove();
          _.delete(valueArr, id);
          this.$input.val(valueArr.join(';')).trigger('change');
        }
      });
    }
    if (hasDownload) {
      download_span = document.createElement('span');
      let download_i = document.createElement('i');
      $(download_i).addClass('fa fa-download');
      $(download_span).attr('title', '下载').addClass('file-download').append(download_i).on('click', ()=> {
        this.downloadFile(id);
      });
    }
    $(li).addClass('file-list-item').append(name_span).append(remove_span).append(download_span);
    return li;
  }
  getFileList(id, fn){
    $.post(this.options.fileLoader.getFileUrl,{
      'fid': id
    },(re)=>{
      fn&&fn(re);
    });
  }
  deleteFile(id, fn){
    $.post(this.options.fileLoader.delFileUrl,{
      'id': id
    },()=>{
      fn&&fn();
    });
  }
  downloadFile(id){
    window.open(this.options.fileLoader.downloader + '?fileid=' + id);
  }
  loadData(value){
    let op = this.options,
      $fileList = this.$fileList;
    if (value && value !== '') {
      this.valueArr = value.split(';');
      this.getFileList(value,re=>{
        re.forEach((r, i)=>{
          let item;
          if(op.readonly || op.disabled){
            item = this._addFileItem({name:r.oldname}, r.id, true, false, false);
          }else{
            item = this._addFileItem({name:r.oldname}, r.id, true, true, false);
          }
          if (i == 0) {
            $fileList.html(item);
          } else {
            $fileList.append(item);
          }
        });
      });
      return false;
    }
    this.valueArr = [];
    $fileList.html('');
  }
  hasInited(){
    let hasInited = false;
    this.uploader.getFiles().forEach(el=> {
      let status = el.getStatus();
      if(status==='inited'||status==='progress'||status==='interrupt'){
        hasInited = true;
      }
    });
    return hasInited;
  }
}

Filebox.fileTypes = {
  office:'doc;docx;ppt;pptx;xls;xlsx',
  document:'doc;docx;ppt;pptx;xls;xlsx;txt;pdf',
  picture:'jpg;jpeg;png;gif;svg'
};
Filebox.DEFAULTS = {
  label: '',
  name: '',
  id: '',
  value: '',
  labelWidth: '',
  inputWidth: '',
  labelAlign: 'right',
  width: '',
  readonly: false,
  disabled: false,
  helpText: '',
  valid: false,
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
    chunked: true,//开启分片上传
    chunkSize:10*1024*1024,// 如果要分片，分多大一片？默认大小为10M
    chunkRetry: 3,//如果某个分片由于网络问题出错，允许自动重传多少次
    threads: 3,//上传并发数。允许同时最大上传进程数[默认值：3]
    duplicate : false,//是否重复上传（同时选择多个一样的文件），true可以重复上传
    prepareNextFile: true,//上传当前分片时预处理下一分片
    fileSizeLimit: 6*1024*1024*1024,//6G 验证文件总大小是否超出限制, 超出则不允许加入队列
    fileSingleSizeLimit: 3*1024*1024*1024,  //3G 验证单个文件大小是否超出限制, 超出则不允许加入队列
    fileNumLimit: null,
    uploader: '', //文件提交的地址
    delFileUrl: '', //文件删除的地址
    getFileUrl: '', //获取文件列表
    downloader: '', //文件下载地址
    checkChunkUrl: '', // 切片校验地址
    mergeUrl: '',//切片合并地址
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

function Plugin(option) {
  try {
    let value, args = Array.prototype.slice.call(arguments, 1);
    
    this.each(function(){
      let $this = $(this),
        dataSet = $this.data(),
        data = dataSet['si.filebox'];
        
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.filebox');
        }
      }
      if(typeof option === 'object'&& data){
        data.set(option);
      }
      if (!data) {
        dataSet.fileloader ? dataSet.fileloader = (new Function('return ' + dataSet.fileloader))() : false;
        let options = $.extend( {} , Filebox.DEFAULTS, typeof option === 'object' && option);
        let datakeys = Object.keys(dataSet);
        let defaultkeys = Object.keys(options);
        defaultkeys.forEach((key) => {
          let lowkey = key.toLocaleLowerCase();
          if (datakeys.includes(lowkey)) {
            options[key] = dataSet[lowkey];
          }
        });
        data = new Filebox(this, options);
        data.$input.data('si.filebox', data);
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    throw new Error(error);
  }
}
let old = $.fn.filebox;

$.fn.filebox = Plugin;
$.fn.filebox.defaults = Filebox.DEFAULTS;
$.fn.filebox.Constructor = Filebox;

$.fn.filebox.noConflict = function() {
  $.fn.filebox = old;
  return this;
};