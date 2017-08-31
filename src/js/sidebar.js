+function ($) {
  class Sidebar {
    constructor(el,options){
      this.options = options;
      this.$element = this.getNodes(this.options.data);
      this.activedNode = null;
      $(this.$element).css('opacity','0');
      $(el).append(this.$element);
      setTimeout(()=>{
        $(this.$element).css('opacity','1');
      },Number.parseFloat($(this.$element).css('transition-duration'))*1000)

    }
    getNodes(d){
      let _this = this;
      d = d ? d : this.options.data;
      let nodes = document.createElement('ul');
      $(nodes).addClass('nav');
      for(let key of d){
        let node = document.createElement('li');
        let link = document.createElement('a');
        if(key.children&&key.children.length>0){
          let i = document.createElement('i');
          let b = document.createElement('b');
          let p = document.createElement('p');
          let c = document.createElement('div');
          $(b).addClass('caret');
          $(p).text(key.name).append(b);
          $(i).addClass(key.icon);
          $(link).attr({
            'data-toggle': 'collapse',
            'href': '#si-nav-'+key.id
          }).append(i).append(p);
          let n = this.getNodes(key.children);
          $(c).attr('id','si-nav-'+key.id).addClass('collapse').append(n);
          $(node).append(link).append(c);
        }else{
          $(link).attr('href','javascript:;').text(key.name).click(function(){
            if($(this).data('click')) return;
            $(this).data('click',true);
            if(_this.activedNode)$(_this.activedNode).removeData('click').parents('li').removeClass("active");
            $(this).parents('li').addClass("active");
            _this.activedNode = this;
            _this.options.click&&_this.options.click(key);
          });
          $(node).append(link);
        }
        $(nodes).append(node);
      }
      return nodes;
    }
    setBackground(){

    }
  }
  function Plugin (option, _relatedTarget){
    return this.each( function(){
      let $this = $(this);
      let data  = $this.data('si.sidebar');
      let options = $.extend({}, Sidebar.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!data) $this.data('si.sidebar', (data = new Sidebar(this, options)));
      if (typeof option == 'string') data[option](_relatedTarget);
    });
  }

  Sidebar.DEFAULTS = {

  };

  const old = $.fn.sidebar;

  $.fn.sidebar             = Plugin;
  $.fn.sidebar.Constructor = Sidebar;

  $.fn.sidebar.noConflict = function () {
    $.fn.sidebar = old;
    return this;
  };


}(jQuery);
