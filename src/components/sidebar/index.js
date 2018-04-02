import _ from 'src/utils/util';
(function($) {
  class Sidebar {
    constructor(el, options) {
      this.options = options;
      this.$el = $(el);
      this.$wrapper = this.$el.children('.sidebar-wrapper');
      let nav = this.getNodes(this.options.data);
      let $nav = $(nav);
      this.$wrapper.append();
      this.activedNode = null;
      this.hasActive = false;
      $nav.css('opacity', '0');
      this.$wrapper.append(nav);
      this._setFolder();
      setTimeout(() => {
        $nav.css('opacity', '1');
      }, Number.parseFloat($nav.css('transition-duration')) * 1000);
      window.sine ? window.sine.hasRouter ? this.addRouter() : null : null;
      this.options.controler && this.addControler();
    }
    addRouter() {
      this._initRouter();
      $(window).on('hashchange', this._initRouter.bind(this));
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
    _setFolder() {
      this.hasFolder = $(document).width() > 768 ? false : true;
      if (this.hasFolder) {
        this.$el.addClass('si-sidebar-folded');
      } else {
        this.$el.addClass('si-sidebar-unfolded');
      }
    }
    _initRouter() {
      let hash = window.location.hash;
      let _hash = hash[1] === '/' ? hash.replace(/#\/(^#\/)*/, '$1') : hash.replace(/#([^#]*)(#.*)?/, '$1');
      let da = this.options.data;
      this.hasActive = false;
      this._getHashNode(_hash, da);
      if (!this.hasActive && this.activedNode) {
        this.activedNode.parents('li').removeClass('active');
        this.activedNode = null;
      }
    }
    _getHashNode(hash, arr) {
      for (let i = 0, len = arr.length; i < len; i++) {
        if (this._formatUrl(arr[i].url) == this._formatUrl(hash)) {
          this.hasActive = true;
          arr[i].$dom.click();
          break;
        }
        if (arr[i].children) {
          this._getHashNode(hash, arr[i].children);
        }
      }
    }
    _formatUrl(url) {
      return url ? url[0] === '#' ? url : url[0] === '/' ? '#' + url : '#/' + url : '';
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
        if (key.children && key.children.length > 0) {
          let b = document.createElement('b');
          let c = document.createElement('div');
          let p = document.createElement('p');
          $(b).addClass('caret');
          $(p).text(key.name).append(subName).append(b);
          $(link).attr({
            'data-toggle': 'collapse',
            'href': '#si-nav-' + key.id
          }).append(i).append(p);
          let n = this.getNodes(key.children);
          $(c).attr('id', 'si-nav-' + key.id).addClass('collapse').append(n);
          $(node).append(link).append(c);
        } else {
          $(i).addClass('sub-icon');
          $(link).attr('href', this._formatUrl(key.url)).text(key.name).prepend(i).append(subName).click(function() {
            if (_this.hasFolder) _this.folded = true;
            if ($(this).parent().hasClass('active')) return;
            if (_this.activedNode != null) _this.activedNode.parents('li').removeClass('active');
            $(this).parents('li').addClass('active');
            _this.activedNode = $(this);
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

  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      let $this = $(this);
      let data = $this.data('si.sidebar');
      let options = $.extend({}, Sidebar.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!data) $this.data('si.sidebar', (data = new Sidebar(this, options)));
      if (typeof option == 'string') data[option](_relatedTarget);
    });
  }

  let old = $.fn.sidebar;

  $.fn.sidebar = Plugin;
  $.fn.sidebar.Constructor = Sidebar;

  $.fn.sidebar.noConflict = function() {
    $.fn.sidebar = old;
    return this;
  };

  Sidebar.DEFAULTS = {
    controler: '',
    data: []
  };
})(jQuery);