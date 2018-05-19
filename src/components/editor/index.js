import wangeditor from 'wangeditor';
class Editor{
  constructor(el, option){
    this.el = el;
    this.options = option;
    this.init();
  }
  init(){
    let editor = new wangeditor(this.el);
    Object.assign(editor.customConfig, this.options);
    editor.create();
    this.editor = editor;
  }
  getHtml(){
    return this.editor.txt.html();
  }
  setHtml(str){
    this.editor.txt.text(str);
  }
  getText(){
    return this.editor.txt.text();
  }
  insert(str){
    this.editor.txt.append(str);
  }
  clear(){
    this.editor.txt.clear();
  }
}

function Plugin(option) {
  try {
    let value, args = Array.prototype.slice.call(arguments, 1);
    
    this.each(function(){
      let $this = $(this),
        dataSet = $this.data(),
        data = dataSet['si.editor'];
        
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.editor');
        }
      }
      if (!data) {
        let options = $.extend( {} , Editor.DEFAULTS, typeof option === 'object' && option);
        $this.data('si.editor', new Editor(this, options));
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    throw new Error(error);
  }
}

Editor.DEFAULTS = {
  uploadFileName: '',
  uploadImgServer:'/upload',
  uploadImgMaxSize: 5 * 1024 * 1024,
  uploadImgParams:{},
  uploadImgHeaders:{},
  onchangeTimeout: 200,
  onchange: null,
  onfocus: null,
  onblur: null,
  zIndex: 10000,
  menus:[
    'head',  // 标题
    'bold',  // 粗体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'quote',  // 引用
    'image',  // 插入图片
    'table',  // 表格
    'video',  // 插入视频
    'code',  // 插入代码
    'undo',  // 撤销
    'redo'  // 重复
  ]
};
let old = $.fn.editor;

$.fn.editor = Plugin;
$.fn.editor.defaults = Editor.DEFAULTS;
$.fn.editor.Constructor = Editor;

$.fn.editor.noConflict = function() {
  $.fn.editor = old;
  return this;
};