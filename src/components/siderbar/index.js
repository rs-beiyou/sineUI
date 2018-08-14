import _ from 'src/utils/util';
import install from './install';
class Sidebar {
  constructor(options) {
    this.options = Object.assign({}, Sidebar.options, options||{});
    this.$el = $(this.options.el);
    this.$wrapper = this.$el.children('.sidebar-wrapper');
    this.activedNode = null;
    this.hasActive = false;
    this.options.data ? this.init() : this.getDateByUrl();
  }
  init(){
    let nav = this.getNodes(this.options.data);
    this.$wrapper.append(nav);
    this._setFolder();
    this.addRouter();
    this.options.controler && this.addControler();
  }
  getDateByUrl(){
    $.ajax({
      url: this.options.url,
      dataType: 'json',
      success: data=> {
        this.options.data = data;
        this.init();
      }
    });
  }
  addRouter() {
    this.options.mode === 'history' ? this._initHistory() : this._initHash();
  }
  _initHash(){
    this._initHashRouter();
    $(window).on('hashchange', this._initHashRouter.bind(this));
  }
  _initHistory(){
    let pathname = window.location.pathname;
    let da = this.options.data;
    this._triggerHistoryNode(pathname, da);
  }
  _initHashRouter() {
    let hash = window.location.hash;
    let _hash = hash[1] === '/' ? hash.replace(/#\/(^#\/)*/, '$1') : hash.replace(/#([^#]*)(#.*)?/, '$1');
    let da = this.options.data;
    this.hasActive = false;
    this._triggerHashNode(_hash, da);
    if (!this.hasActive && this.activedNode) {
      this.activedNode.parents('li').removeClass('active');
      this.activedNode = null;
    }
  }
  _triggerHistoryNode(pathname, arr){
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i].url && pathname && this._formatUrl(arr[i].url) == this._formatUrl(pathname)) {
        arr[i].$dom.parents('li').addClass('active');
        this.show(arr[i].pid);
        break;
      }
      if (arr[i].children) {
        this._triggerHistoryNode(pathname, arr[i].children);
      }
    }
  }
  _triggerHashNode(hash, arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
      if (this._formatUrl(arr[i].url) == this._formatUrl(hash)) {
        this.hasActive = true;
        arr[i].$dom.click();
        break;
      }
      if (arr[i].children) {
        this._triggerHashNode(hash, arr[i].children);
      }
    }
  }
  addControler() {
    let $page = $('.si-page');
    let $document = $(document);
    let $controler = $(this.options.controler);
    let folded = this.folded,
      _this = this;
    Object.defineProperties(this, {
      folded: {
        get: () => {
          return folded;
        },
        set: (val) => {
          if (val === folded) return;
          folded = val;
          if (val) {
            _this.$el.removeClass('si-sidebar-unfolded').addClass('si-sidebar-folded');
          } else {
            _this.$el.removeClass('si-sidebar-folded').addClass('si-sidebar-unfolded');
          }
        }
      }
    });
    $controler && $controler.on('click', (e) => {
      this.folded = this.folded !== undefined ? !this.folded : false;
      e.stopPropagation();
    });
    $page.on('click', (e) => {
      let elem = e.target || e.srcElement;
      while (elem) {
        if (elem.className && elem.className.indexOf('si-sidebar') > -1) {
          return;
        }
        elem = elem.parentNode;
      }
      if (this.hasFolder) {
        this.folded = true;
      }
    });
    $(window).on('resize',
      _.throttle(() => {
        this.hasFolder = $document.width() > 768 ? false : true;
        if (this.hasFolder) {
          this.folded = true;
        } else {
          this.folded = false;
        }
      })
    );
  }
  show(id){
    let $target = this.$el.find(`#si-nav-${id}`),
      $trigger = $target.prev();
    $target.addClass('in');
    $trigger.attr('aria-expanded', true);
  }
  _setFolder() {
    this.hasFolder = $(document).width() > 768 ? false : true;
    if (this.hasFolder) {
      this.$el.addClass('si-sidebar-folded');
    } else {
      this.$el.addClass('si-sidebar-unfolded');
    }
  }
  _formatUrl(url) {
    if(this.options.mode === 'history'){
      return url ? url[0] === '/' ? url : '/' + url : '/';
    }else{
      return url ? url[0] === '#' ? url : url[0] === '/' ? '#' + url : '#/' + url : '';
    }
  }
  getNodes(d) {
    let _this = this;
    d = d ? d : this.options.data;
    let nodes = document.createElement('ul');
    $(nodes).addClass('nav');
    for (let key of d) {
      let node = document.createElement('li');
      let link = document.createElement('a');
      let subName = document.createElement('span');
      let i = document.createElement('i');
      $(subName).addClass('sub-name').text(key.subName);
      $(i).addClass(key.icon);
      let $link = $(link);
      if (key.children && key.children.length > 0) {
        let b = document.createElement('b');
        let c = document.createElement('div');
        let p = document.createElement('p');
        $(b).addClass('caret');
        $(p).text(key.name).append(subName).append(b);
        $link.attr({
          'data-toggle': 'collapse',
          'href': '#si-nav-' + key.id
        }).append(i).append(p);
        let n = this.getNodes(key.children);
        $(c).attr('id', 'si-nav-' + key.id).addClass('collapse').append(n);
        $(node).append(link).append(c);
      } else {
        $(i).addClass('sub-icon');
        $link.attr('href', this._formatUrl(key.url)).text(key.name).prepend(i).append(subName);
        this.options.mode === 'hash' && $link.click(()=> {
          if (_this.hasFolder) _this.folded = true;
          if ($link.parent().hasClass('active')) return;
          if (_this.activedNode != null) _this.activedNode.parents('li').removeClass('active');
          $link.parents('li').addClass('active');
          _this.activedNode = $link;
          _this.options.click && _this.options.click(key);
        });
        $(node).append(link);
      }
      key.$dom = $(link);
      $(nodes).append(node);
    }
    return nodes;
  }
}

Sidebar.options = {
  mode: 'hash',
  el: '',
  controler: '',
  data: null,
  url: ''
};

Sidebar.install = install;

export default Sidebar;