import layer from 'libs/layer/layer.js';
import 'libs/layer/theme/default/layer.css';
$.extend({
  //tips
  tips: function(message, id) {
    layer.open({
      type: 4,
      content: [message, id] //数组第二项即吸附元素选择器或者DOM
    });
  }
});