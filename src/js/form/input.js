class Textbox {
  constructor(el,options) {
    this.$element = $(el);
    this.options = options;
    this.parse();
  }
  parse(){
    
  }
}
function Plugin (option, _relatedTarget){
  return this.each( function(){
    let $this = $(this);
    let data  = $this.data('si.textbox');
    let options = $.extend({}, Textbox.DEFAULTS, $this.data(), typeof option == 'object' && option);

    if (!data) $this.data('si.textbox', (data = new Textbox(this, options)));
    if (typeof option == 'string') data[option](_relatedTarget);
  });
}

Textbox.DEFAULTS = {

};
export {
  Textbox as Textbox,
  Plugin as TextboxPlugin
}
