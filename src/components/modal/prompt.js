import layer from 'libs/layer/layer.js';
import 'libs/layer/theme/default/layer.css';
$.extend({

  //prompt
  prompt: function(options, yes) {
    layer.prompt(options, yes);
  },
});