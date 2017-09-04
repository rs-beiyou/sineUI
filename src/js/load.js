+(function(si){
  let loadTimer = null;
  si.fn.load = function(from ,to){
    from = from?from:this.$page.data('url');
    let url = typeof from === 'object'?from.url:from;
    to=to?to:this.$container;
    $.ajax({
      url:url,
      method:'get',
      dataType:'html',
      beforeSend:(xhr)=>{
        this.showLoadingBar('30%');
        loadTimer = setInterval(()=>{
          if(parseFloat(this.showLoadingBar())<80){
            this.showLoadingBar(parseFloat(this.showLoadingBar())+10+'%');
          }else{
            clearInterval(loadTimer);
          }
        },100)
      },
      complete:()=>{
        clearInterval(loadTimer);
        this.showLoadingBar('100%');
        setTimeout(()=>{this.hideLoadingBar();},Number.parseFloat(this.$loadingBar.css('transition-duration'))*1000)
      },
      success:(re)=>{
        let regEx_script = new RegExp('<script[^>]*>([\\s\\S]*)<\\/script>','g');
        let regEx_style = new RegExp('<style[^>]*>([\\s\\S]*)<\\/style>','g');
        let regEx_body = new RegExp('<body[^>]*>([\\s\\S]*)<\\/body>');
        let regEx_script_incloud = new RegExp('<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>','g');
        let content = regEx_body.test(re)?regEx_body.exec(re)[1]:re;
        if(regEx_style.test(content)){
          content = content.replace(regEx_style,'');
        }
        if(regEx_script.test(content)){
          to.html(content.replace(regEx_script_incloud,''));
          let script = document.createElement('script');
          script.type = 'text/javascript';
          script.innerHTML = regEx_script.exec(re)[1];
          this.$body.append(script);
          $(script).remove();
        }else{
          to.html(content);
        }
        if(to===this.$container)this.currPageUrl = url;
      }
    })
  }
})(sine);
