let loadTimer = null;
const load = function(from ,to){
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
      content = regEx_style.test(content)?content.replace(regEx_style,''):content;
      let container = '<div>'+content+'</div>';
      let scriptArr = $(container).find('script');
      to.html(content.replace(regEx_script,''));
      for(let i=0,len=scriptArr.length;i<len;i++){
        this.$body.append(scriptArr[i]);
        $(scriptArr[i]).remove();
      }
      if(to===this.$container)this.currPageUrl = url;
    }
  })
}
export default load;
