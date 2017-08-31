(function(window ,undefined){
  class sine{
    constructor(){
      this.fn = this.constructor.prototype;
      this.version = '1.0.0';
      this.currPageUrl = null;
      this.$body = $('body');
      this.$page = $('.page');
      this.$content = $('.page-content');
    }
    init(){
      this.initLoadingBar();
      this.load();
    }
    initLoadingBar(){
      let bar = document.createElement('div');
      $(bar).addClass('si-loading-bar');
      this.$loadingBar = $(bar);
      this.$body.prepend(bar);
    }
    showLoadingBar(w){
      this.$loadingBar.css({
        width:w,
        opacity:1
      });
      if(this.currPageUrl){
        this.$content.css({
          opacity:0
        })
        setTimeout(()=>{
          this.$content.css({
            opacity:1
          })
        },Number.parseFloat(this.$content.css('transition-duration'))*1000);
      }else{
        this.$content.css({
          opacity:1
        })
      }
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
