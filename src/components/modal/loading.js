import layer from 'libs/layer/layer.js';
import 'libs/layer/theme/default/layer.css';
$.extend({

  //loading
  loading: function(msg) {
    msg = (msg == null || msg == '' || typeof(msg) == 'undefined') ? '正在努力加载中...' : msg;
    layer.load(2, {
      content: msg,
      success: function(layero) {
        layero.css({
          'padding': '0 10px',
          'background': 'rgba(0,0,0,.7)',
          'color': '#fff',
          'border-radius': '5px'
        });
        layero.find('.layui-layer-content').css({
          'width': 'auto',
          'line-height': '32px',
          'font-size': '14px',
          'background': 'none'
        });
      }
    });
  },
  loadingClose: function() {
    layer.closeAll('loading');
  },
});