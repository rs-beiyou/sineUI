import Util from '../../libs/util';
import {Textbox,TextboxPlugin} from './textbox';
const formPlugins = ['textbox','selectbox','datebox','checkbox','radiobox',
'treebox','combobox','filebox','daterangebox','passwordbox'];
// form操作器
class Former{
  constructor(el, op){
    this.$element = $(this);
    this.options = op;
    this.init();
  }
  init(){
    console.log(this.options)
  }
  textbox(){

  }
  passwordbox(){

  }
  selectbox(){

  }
  datebox(){

  }
  daterangebox(){

  }
  checkbox(){

  }
  radiobox(){

  }
  treebox(){

  }
  combobox(){

  }
  filebox(){

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

export {
  Former as Former,
  Plugin as FormPlugin
}
