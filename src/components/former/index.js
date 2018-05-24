import '../form';

import {Log} from '../../libs/log';

class Former{
  constructor(el){
    this.$el = $(el);
    this.former = this.$el.data('si.'+ this.$el.data('si-form-type'));
  }
  hide(){
    this.former.$label.hide();
    this.former.$formBlock.hide();
  }
  show(){
    this.former.$label.show();
    this.former.$formBlock.show();
  }
}

let allowedMethods = ['hide','show'];

function plugin(option, _relatedTarget) {
  return this.each(function() {
    try {
      if (typeof option === 'string') {
        if(allowedMethods.includes(option)){
          new Former(this)[option]();
        }else{
          $(this)[option](_relatedTarget || {});
        }
      }
      if (typeof option === 'object') {
        let $this = $(this);
        $this[$this.data('si-form-type')](option);
      }
    } catch (error) {
      Log.error(`${option}：${error}`);
    }
  });
}

let old = $.fn.former;

$.fn.former = plugin;
$.fn.former.noConflict = function() {
  $.fn.former = old;
  return this;
};