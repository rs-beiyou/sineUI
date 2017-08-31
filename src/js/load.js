+(function(si){
  si.fn.load = function(from ,to){
    from=from?from:this.$page.data('url');
    to=to?to:this.$content;
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
})(sine);
