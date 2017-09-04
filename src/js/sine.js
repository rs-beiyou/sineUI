(function(window ,undefined){
  class sine{
    constructor(){
      this.fn = this.constructor.prototype;
      this.version = '1.0.0';
      this.currPageUrl = null;
      this.$body = $('body');
      this.$page = $('.si-page');
      this.$content = $('.si-main-panel');
      this.$container = $('.si-container');
    }
    init(){
      this.initLoadingBar();
      this.load();
    }
    initLoadingBar(){
      let bar = document.createElement('div');
      $(bar).addClass('si-loading-bar');
      this.$loadingBar = $(bar);
      this.loadingPercent = 0;
      this.$body.prepend(bar);
    }
    showLoadingBar(w){
      this.loadingPercent = w?w:this.loadingPercent;
      this.$loadingBar.css({
        width:w,
        opacity:1
      });
      if(this.currPageUrl){
        this.$content.css({
          opacity:0
        })
        if(w == '100%'){
          this.$content.addClass('si-loading').css({
            opacity:1
          })
          setTimeout(()=>{
            this.$content.removeClass('si-loading');
          },Number.parseFloat(this.$content.css('transition-duration'))*1000);
        }
      }else{
        this.$content.addClass('si-loading').css({
          opacity:1
        })
        setTimeout(()=>{
          this.$content.removeClass('si-loading');
        },Number.parseFloat(this.$content.css('transition-duration'))*1000);
      }
      return this.loadingPercent;
    }
    hideLoadingBar(){
      this.$loadingBar.css({
        opacity:0
      })
      setTimeout(()=>{
        this.$loadingBar.css({
          width:0
        })
      },Number.parseFloat(this.$loadingBar.css('transition-duration'))*1000);
    }
  }
  window.sine = new sine();
  window.si = window.sine;

})(window);
