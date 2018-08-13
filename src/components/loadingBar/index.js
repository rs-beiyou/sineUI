class Loadingbar {
  constructor(el, option) {
    this.$el = $(el);
    this.options = option;
    this.init();
  }
  init () {
    let op = this.options;
    let bar = document.createElement('div'),
      $bar = $(bar);
    $bar.addClass('si-loading-bar').css('height',op.height);
    op.color.includes('#') ? $bar.css('color',op.color) : $bar.addClass(`si-loading-bar-color-${op.color}`);
    this.$loadingBar = $bar;
    this.loadingPercent = 0;
    this.$el.prepend(bar);
  }
  start () {
    let op = this.options;
    op.color.includes('#') ? this.$loadingBar.css('color',op.color) : this.$loadingBar.addClass(`si-loading-bar-color-${op.color}`);
    this.$loadingBar.show();
    this.updateTimer = setInterval(() => {
      this.loadingPercent = this.loadingPercent++;
      this.update();
    }, 50);
  }
  update () {
    if(this.loadingPercent >= 95){
      clearInterval(this.updateTimer);
      this.updateTimer = null;
    }
    this.$loadingBar.css('width', `${this.loadingPercent++}%`);
  }
  end (type) {
    let op = this.options;
    clearInterval(this.updateTimer);
    this.updateTimer = null;
    this.loadingPercent = 100;
    if(type === 'error'){
      op.failedColor.includes('#') ? this.$loadingBar.css('color',op.failedColor) : this.$loadingBar.addClass(`si-loading-bar-color-${op.failedColor}`);
    }
    this.$loadingBar.css('width', `${this.loadingPercent++}%`);
    this.endTimer = setTimeout(() => {
      this.loadingPercent = 0;
      this.$loadingBar.css('width', `${this.loadingPercent++}%`);
      clearInterval(this.endTimer);
      this.endTimer = null;
      this.$loadingBar.hide().removeClass().addClass('si-loading-bar');
    }, 300);
  }
  finish () {
    this.end();
  }
  error () {
    this.end('error');
  }
}

function Plugin(option) {
  try {
    let value, args = Array.prototype.slice.call(arguments, 1);
    
    this.each(function(){
      let $this = $(this),
        dataSet = $this.data(),
        data = dataSet['si.loadingbar'];
        
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.loadingbar');
        }
      }
      if (!data) {
        let options = $.extend( {} , Loadingbar.DEFAULTS, typeof option === 'object' && option);
        $this.data('si.loadingbar', new Loadingbar(this, options));
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    throw new Error(error);
  }
}

Loadingbar.DEFAULTS = {
  color: 'primary',
  failedColor: 'danger',
  height: 2
};

let old = $.fn.loadingbar;

$.fn.loadingbar = Plugin;
$.fn.loadingbar.defaults = Loadingbar.DEFAULTS;
$.fn.loadingbar.constructor = Loadingbar;

$.fn.loadingbar.noConflict = function() {
  $.fn.textbox = old;
  return this;
};
