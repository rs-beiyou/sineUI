"use strict";

$.extend({
    //警告框
    alert : function(options){
      var option = null;
      var defaults = {
        title:"提示",//标题
        content:"",//内容
        icon:0,
        btn:['确定']
      }
      var callback;
      if(typeof options==='object'){
        callback = options.yes||options.btn1;
        if(options.yes){
          options.yes = function(index){
            layer.close(index);
            callback();
          }
        }
        if(options.btn1){
          options.btn1 = function(index){
            layer.close(index);
            callback();
          }
        }
        option = $.extend({},defaults,options||{});
      }else{
        callback = arguments[1];
        option = $.extend({},defaults,{
          content:arguments[0],
          yes:function(index){
            layer.close(index);
            if(callback)callback();
          }
        });
      }
      layer.open(option);
    },
    //确认框
    confirm : function(message,callback1,callback2){
      layer.open({
              content : message,
              title : '确认',
              icon:3,
              shade: [0.5, '#ffffff'],
              btn : ['确认','取消'],
              btn1 : function(index){
                  if(callback1)callback1();
                  layer.close(index);
              },
              btn2 : function(index){
                  if(callback2)callback2();
                  layer.close(index);
              }
          });
    }
  });