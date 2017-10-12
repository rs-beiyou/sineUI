import Util from '../../libs/util';
import {Textbox,TextboxPlugin} from './textbox';
const formPlugins = ['textbox','selectbox','datebox','checkbox','radiobox',
'treebox','combobox','switchbox','filebox','daterangebox','passwordbox'];
// form操作器
class Former{
  constructor(el, op){
    this.$element = $(this);
    this.options = op;
    this.init();
  }
  init(){

  }
  load(){

  }
  data(){

  }
}
function Plugin (option, _relatedTarget){
  return this.each( function(){
    let $this = $(this);
    let data  = $this.data('si.form');
    let options = $.extend({}, Former.DEFAULTS, $this.data(), typeof option == 'object' && option);

    if (!data) $this.data('si.form', (data = new Former(this, options)));
    if (typeof option == 'string') data[option](_relatedTarget);
  });
}

Former.DEFAULTS = {

};

export {
  Former as Former,
  Plugin as FormPlugin
}
