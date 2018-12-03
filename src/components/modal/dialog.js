import 'libs/layer/theme/default/layer.css';

import layer from 'libs/layer/layer.js';

$.extend({
  //对话框
  dialog: function(options) {
    if (options.content &&typeof options.content==='string' && options.content.indexOf('action') > -1) {
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
        //$.parser.parse(o);
        success(o, index);
      };
    }
    options = $.extend({
      type: 1, //iframe弹出内容2
      area: ['620px', '400px'], //宽高
      title: '对话框',
      maxmin: true, //最大化
      fixed: true, //固定
      scrollbar: false,
      zIndex: 1000
    }, options || {});
    layer.open(options);
  },
  dialogClose: function(index) {
    index!==undefined?layer.close(index):layer.closeAll();
  },
  dialogGetChildFrame: function(DOM, index) {
    return layer.getChildFrame(DOM, index);
  }
});