(function(window ,undefined){
  class sine{
    constructor(){
      this.version = '1.0.0';
    }
    load(from,to){
      $.ajax({
        url:from,
        method:'get',
        dataType:'html',
        success:function(re){
          let regEx_script = new RegExp('<script[^>]*>([\\s\\S]*)<\\/script>');
          let regEx_body = new RegExp('<body[^>]*>([\\s\\S]*)<\\/body>');
          let regEx_script_incloud = new RegExp('<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>');
          let body = regEx_body.exec(re)[1];
          if(regEx_script.test(re)){
            to.html(body.replace(regEx_script_incloud,''));
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.innerHTML = regEx_script.exec(re)[1];
            $('body').append(script);
            $(script).remove();
          }else{
            to.html(body);
          }
        }
      })
    }
  }

  window.sine = new sine();
  window.si = window.sine;
})(window);
