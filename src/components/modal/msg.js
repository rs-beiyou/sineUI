import layer from 'libs/layer/layer.js';
import 'libs/layer/theme/default/layer.css';
$.extend({

  //提示层 0感叹号1正确2错误3问号4锁5哭脸6笑脸
  msg: function(message, obj, callback) {
    layer.msg(message, obj, callback);
  },
});