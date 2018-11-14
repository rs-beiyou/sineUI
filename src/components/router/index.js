import '../parser';
import install from './install';
class Router{
  constructor(option){
    this.options = Object.assign({}, Router.options, option||{});
    this.$el = this.options.el && $(this.options.el);
    this.$body = $('body');
    this.pathArr = [];
    this.init();
  }
  init(){
    this.options.mode === 'history' ? this.initHistory() : this.initHash();
  }
  initHistory(){
    let routes = this.options.routes;
    let pathname = window.location.pathname;
    let arr;
    if (pathname === '/') {
      arr = [''];
    }
    this.pathArr = [];
    arr = pathname.split('/').filter((item)=>{
      return item !== '';
    });
    this._localPage(arr, routes);
  }
  initHash(){
    this._initHash();
    $(window).on('hashchange', this._initHash.bind(this));
  }
  _initHash(){
    let routes = this.options.routes;
    let hash = window.location.hash;
    if (hash == '') {
      this.load(this.options.redirect);
      return;
    }
    this.pathArr = [];
    let hashArr = hash[1] === '/' ? hash.replace(/#\/(^#\/)*/, '$1').split('/') : hash.replace(/#([^#]*)(#.*)?/, '$1').split('/');
    this._localPage(hashArr, routes);
  }
  _localPage(hashArr, routes) {
    for (let i = 0, len = routes.length; i < len; i++) {
      if (routes[i].path == hashArr.join('/')) {
        if (routes[i].page) {
          this.pathArr.push(routes[i]);
          this.load(routes[i]);
          this.currPageUrl = window.location.hash;
          break;
        } else {
          throw new Error('No router page for ' + hashArr[0] + ' available.');
        }
      }
      if (routes[i].path.split('/')[0] == hashArr[0]) {
        hashArr.shift();
        if (Array.isArray(routes[i].children)) {
          this.pathArr.push(routes[i]);
          this._localPage(hashArr, routes[i].children);
        } else {
          throw new Error('Router children for ' + hashArr[0] + ' must be an array.');
        }
      }
    }
  }
  load(from) {
    let op = this.options;
    let url = typeof from === 'string' ? from : typeof from == 'object' ? from.page : null;
    if (url === null) return;
    if (url.indexOf('.') == -1) {
      window.location.hash = '#/' + from;
      return;
    }
    op.beforeEach && op.beforeEach.call(this, from);
    $.ajax({
      url: url[0]==='/'?url:'/'+url,
      dataType: 'text',
      cache: false,
      complete: (xhr) => {
        if (xhr.status === 404) {
          this.load(op.lost ? op.lost : op.redirect);
        }
        op.afterEach && op.afterEach.call(this, from, this.pathArr);
      },
      success: re => {
        let regEx_script = new RegExp('<script[^>]*>([\\s\\S]*)<\\/script>', 'g');
        let regEx_style = new RegExp('<style[^>]*>([\\s\\S]*)<\\/style>', 'g');
        let regEx_body = new RegExp('<body[^>]*>([\\s\\S]*)<\\/body>');
        let content = regEx_body.test(re) ? regEx_body.exec(re)[1] : re;
        content = regEx_style.test(content) ? content.replace(regEx_style, '') : content;
        let container = '<div>' + content + '</div>';
        let scriptArr = $(container).find('script');
        this.$el.html(content.replace(regEx_script, ''));
        $.parser && $.parser.parse(this.$el); //动态解析页面元素
        for (let i = 0, len = scriptArr.length; i < len; i++) {
          if (scriptArr[i].src == '') {
            this.$body.append(scriptArr[i]);
            $(scriptArr[i]).remove();
          } else {
            $.getScript(scriptArr[i].src);
          }
        }
      }
    });
  }
}

Router.options = {
  mode: 'hash',
  el: 'body',
  routes: null,
  beforeEach: null,
  afterEach: null,
  redirect: null,
  lost: null
};

Router.install = install;

export default Router;