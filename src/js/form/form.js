const formPlugins = ['textbox','selectbox','datebox','checkbox','radiobox',
'treebox','combobox','switchbox','filebox','daterangebox','passwordbox'];
class Form{
  constructor(){

  }
}
function Plugin (option, _relatedTarget){
  return this.each( function(){
    let $this = $(this);
    let data  = $this.data('si.form');
    let options = $.extend({}, Form.DEFAULTS, $this.data(), typeof option == 'object' && option);

    if (!data) $this.data('si.form', (data = new Form(this, options)));
    if (typeof option == 'string') data[option](_relatedTarget);
  });
}

Form.DEFAULTS = {

};
export {
  Form as Form,
  Plugin as FormPlugin
}
