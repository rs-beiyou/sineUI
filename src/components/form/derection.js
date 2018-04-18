class Derection{
  constructor(el){
    this.el = $(el);
    this.doc = $(document);
  }
  check(){
    let maxHeight = window.innerHeight||document.documentElement.clientHeight;
    let maxWidth = window.innerWidth||document.documentElement.clientWidth;
    let offset = this.el.offset();
    let height = this.el.outerHeight();
    let top = offset.top + height - this.doc.scrollTop();
    let left = offset.left - this.doc.scrollLeft();
    return {
      bottomDistance: maxHeight - (top > 0? top :0),
      rightDistance: maxWidth - (left > 0? left :0)
    };
  }
}

function Plugin(option) {
  try {
    let value, args = Array.prototype.slice.call(arguments, 1);
    
    this.each(function(){
      let $this = $(this),
        dataSet = $this.data(),
        data = dataSet['si.derection'];
        
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.derection');
        }
      }
      if (!data) {
        let options = $.extend( {} , typeof option === 'object' && option);
        data = new Derection(this, options);
        $this.data('si.derection', data);
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    throw new Error(error);
  }
}

let old = $.fn.derection;

$.fn.derection = Plugin;
$.fn.derection.Constructor = Derection;

$.fn.derection.noConflict = function() {
  $.fn.derection = old;
  return this;
};