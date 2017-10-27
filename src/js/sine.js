class Sine{
  constructor(){
    this.currPageUrl = null;
    this.$body = $('body');
    this.$page = $('.si-page');
    this.$content = $('.si-main-panel');
    this.$container = $('.si-container');
    this.loadTimer = null;
    this.hasRouter = false;
    this.options = Sine.DEFAULTS;
  }
  init(){
    this._initLoadingBar();
    this.options.router!=null?this._initRouter():null;
    return this;
  }
  config(options){
    Object.assign(this.options,options||{});
  }
  _initLoadingBar(){
    let bar = document.createElement('div');
    $(bar).addClass('si-loading-bar');
    this.$loadingBar = $(bar);
    this.loadingPercent = 0;
    this.$body.prepend(bar);
  }
  _initRouter(){
    this.hasRouter = true;
    this._router();
    $(window).on('hashchange',this._router.bind(this));
  }
  _router(){
    let router = this.options.router;
    let hash = window.location.hash;
    if(hash==''){
      this.load();
      return;
    }
    let hashArr = hash.replace(/#([^#]*)(#.*)?/, '$1').split('/');
    this._localHash(hashArr,router);
  }
  _localHash(hashArr,router){
    for(var i=0,len = router.length;i<len;i++){
      if(router[i].path==hashArr.join('/')){
        if(router[i].page){
          this.load(router[i].page);
          this.currPageUrl = window.location.hash;
          break;
        }else{
          throw new Error('No router page for '+hashArr[0]+' available.')
        }
      }
      if(router[i].path.split('/')[0] == hashArr[0]){
        hashArr.shift();
        if(Array.isArray(router[i].children)){
          this._localHash(hashArr,router[i].children);
        }else{
          throw new Error('Router children for '+hashArr[0]+' must be an array.')
        }
      }
    }
  }
  load(from = this.$page.data('url') , to = this.$container, loadSuccess){
    if(!from.includes('.')){
      this.options.beforeEach&&this.options.beforeEach();
      window.location.hash = '#'+from;
      return;
    }
    $.ajax({
      url:from,
      dataType:'text',
      beforeSend:(xhr)=>{
        this._showLoadingBar('30%');
        this.loadTimer = setInterval(()=>{
          if(parseFloat(this._showLoadingBar())<80){
            this._showLoadingBar(parseFloat(this._showLoadingBar())+10+'%');
          }else{
            clearInterval(this.loadTimer);
          }
        },100)
      },
      complete:()=>{
        this.hasRouter?this.options.afterEach&&this.options.afterEach():false;
        loadSuccess&&typeof loadSuccess==='function'&&loadSuccess();
        clearInterval(this.loadTimer);
        this._showLoadingBar('100%');
        setTimeout(()=>{this._hideLoadingBar();},Number.parseFloat(this.$loadingBar.css('transition-duration'))*1000)
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
          if(scriptArr[i].src==''){
            this.$body.append(scriptArr[i]);
            $(scriptArr[i]).remove();
          }else{
            $.getScript(scriptArr[i].src);
          }
        }
      }
    })
  }
  _showLoadingBar(w){
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
  _hideLoadingBar(){
    this.$loadingBar.css({
      opacity:0
    })
    setTimeout(()=>{
      this.$loadingBar.css({
        width:0
      })
    },Number.parseFloat(this.$loadingBar.css('transition-duration'))*1000);
  }
  createXHR(){
    if(typeof XHLHttpRequest!= 'undefined'){
      return new XHLHttpRequest();
    }else if(typeof ActiveXObject!= 'undefined'){
      return new ActiveXObject('Microsoft.XMLHTTP');
    }else{
      throw new Error('No XHR object available.')
    }
  }
}
Sine.DEFAULTS = {
  router:null,
  beforeEach:null,
  afterEach:null
}
export default Sine;