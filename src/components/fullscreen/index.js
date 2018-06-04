class Fullscreen {
  constructor(el){
    let $el = $(el);
    this.iframe = self !== top ? $(top.document.getElementById(window.name)).children('iframe') : null;
    this.iframeHeight = this.iframe && this.iframe.attr('height') || null;
    this.opened = false;
    this.isTable = !!$el.data('bootstrap.table');
    this.$el = this.isTable ? $el.parents('.bootstrap-table') : $el;
    this.open();
  }
  open(){
    if (this.opened) return;
    this.iframe && this.iframe.addClass('si-fullscreen').attr('height', '100%');
    this.$el.addClass('si-fullscreen');
    this.opened = true;
    this.addEvent();
  }
  close(){
    if (!this.opened) return;
    this.$el.removeClass('si-fullscreen');
    this.iframe && this.iframe.removeClass('si-fullscreen').attr('height', this.iframeHeight);
    this.opened = false;
  }
  toggle(){
    this.opened ? this.close() : this.open();
  }
  addEvent(){
    $(document).one('keyup', (event)=> {
      let e = event || window.event;
      if (e.keyCode === 27) {
        this.close();
      }
    });
  }
}

function plugin(method) {
  return this.each(function () {
    let $this = $(this);
    let data = $this.data('si.fullscreen');
    if (data) {
      data[method || 'toggle'].apply(data);
      return;
    }
    $this.data('si.fullscreen', (new Fullscreen(this)));
  });
}
let old = $.fn.fullscreen;

$.fn.fullscreen = plugin;
$.fn.fullscreen.constructar = Fullscreen;

$.fn.fullscreen.noConflict = function() {
  $.fn.fullscreen = old;
  return this;
};

