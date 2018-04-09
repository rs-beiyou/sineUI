"use strict";

$.extend({    
		//tips
		tips : function(message,id){
			layer.open({
			  type: 4,
			  content: [message, id] //数组第二项即吸附元素选择器或者DOM
			});
		}
  });