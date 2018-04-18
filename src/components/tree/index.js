import 'libs/ztree/metroStyle/metroStyle.css';
import 'libs/ztree/jquery.ztree.all.min.js';

import {Log} from '../../libs/log';

class Tree {
  constructor(){
      
  }
}
function Plugin(option){
  try {
    let value, args = Array.prototype.slice.call(arguments, 1);
    this.each(function(){
      let $this = $(this),
        data = $this.data('si.tree'),
        options = $.extend( {} , Tree.DEFAULTS, $this.data(),
          typeof option === 'object' && option);
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.tree');
        }
      }
      if (!data) {
        $this.data('si.tree', (data = new Tree(this, options)));
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    Log.warn(error);
  }
}

let old = $.fn.tree;

$.fn.tree = Plugin;
$.fn.tree.Constructor = Tree;

$.fn.tree.noConflict = function() {
  $.fn.tree = old;
  return this;
};