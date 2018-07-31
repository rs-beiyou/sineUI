import '../form';

import {Log} from '../../libs/log';

class Former{
  constructor(el){
    this.$el = $(el);
    this.former = this.$el.data('si.'+ this.$el.data('si-form-type'));
    this.valid = this.$el.data('si.valid');
  }
  hide(){
    if(this.valid&&!this.valid.pass){
      this.valid.hide();
    }
    this.former.$label&&this.former.$label.hide();
    this.former.$formBlock&&this.former.$formBlock.hide();
  }
  show(){
    this.former.$label&&this.former.$label.show();
    this.former.$formBlock&&this.former.$formBlock.show();
  }
}

let allowedMethods = ['hide','show'];

function plugin(option) {
  try {
    let value, args = Array.prototype.slice.call(arguments, 1);
    this.each(function() {
      let $this = $(this);
      if (typeof option === 'string') {
        if(allowedMethods.includes(option)){
          new Former(this)[option]();
        }else{
          value = $this[$this.data('si-form-type')](args[0]);
        }
      }
      if (typeof option === 'object') {
        value = $this[$this.data('si-form-type')](option);
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    Log.error(`${option}：${error}`);
  }
}

let old = $.fn.former;

$.fn.former = plugin;
$.fn.former.noConflict = function() {
  $.fn.former = old;
  return this;
};