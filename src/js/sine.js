(function(window ,undefined){
  class sine{
    constructor(){
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
    load(from=this.$page.data('url'),to=this.$content){
      $.ajax({
        url:from,
        method:'get',
        dataType:'html',
        beforeSend:(xhr)=>{
          this.showLoadingBar('50%');
        },
        complete:()=>{
          this.showLoadingBar('100%');
          setTimeout(()=>{this.hideLoadingBar();},Number.parseFloat(this.$loadingBar.css('transition-duration'))*1000)
        },
        success:(re)=>{
          let regEx_script = new RegExp('<script[^>]*>([\\s\\S]*)<\\/script>');
          let regEx_body = new RegExp('<body[^>]*>([\\s\\S]*)<\\/body>');
          let regEx_script_incloud = new RegExp('<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>');
          let body = regEx_body.exec(re)[1];
          if(regEx_script.test(re)){
            to.html(body.replace(regEx_script_incloud,''));
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.innerHTML = regEx_script.exec(re)[1];
            this.$body.append(script);
            $(script).remove();
          }else{
            to.html(body);
          }
          if(to===this.$content)this.currPageUrl = from;
        }
      })
    }
  }

  window.sine = new sine();
  window.si = window.sine;
})(window);
