import layer from 'libs/layer/layer.js';

$.extend({
  //对话框
  dialog: function(options) {
    if (options.content && options.content.indexOf('action') > -1) {
      $.ajax({
        url: options.content,
        type: 'get',
        cache: true,
        async: false,
        success: function(r) {
          options.content = r;
        }
      });
    }
    if (options.url) {
      options.type = 2;
      options.content = options.url;
    }
    let success = options.success;
    if (success) {
      options.success = function(o, index) {
        $.parser.parse(o);
        success(o, index);
      };
    } else {
      options.success = function(o) {
        $.parser.parse(o);
      };
    }
    options = $.extend({
      type: 1, //iframe弹出内容2
      area: ['600px', '400px'], //宽高
      title: '对话框',
      maxmin: true, //最大化
      fixed: true, //固定
      shade: [0.5, '#ffffff'],
      scrollbar: false
    }, options || {});
    layer.open(options);
  },
  dialogClose: function(index) {
    layer.close(index);
  },
  dialogGetChildFrame: function(DOM, index) {
    return layer.getChildFrame(DOM, index);
  }
});