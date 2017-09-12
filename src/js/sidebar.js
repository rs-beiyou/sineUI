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
      let i = document.createElement('i');
      $(i).addClass(key.icon);
      if(key.children&&key.children.length>0){
        let b = document.createElement('b');
        let c = document.createElement('div');
        let p = document.createElement('p');
        $(b).addClass('caret');
        $(p).text(key.name).append(b);
        $(link).attr({
          'data-toggle': 'collapse',
          'href': '#si-nav-'+key.id
        }).append(i).append(p);
        let n = this.getNodes(key.children);
        $(c).attr('id','si-nav-'+key.id).addClass('collapse').append(n);
        $(node).append(link).append(c);
      }else{
        $(i).addClass('sub-icon');
        $(link).attr('href','javascript:;').text(key.name).prepend(i).click(function(){
          if($(this).parent('li').hasClass('active')) return;
          if(_this.activedNode)$(_this.activedNode).parents('li').removeClass("active");
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
export {
  Sidebar as Sidebar,
  Plugin as SidebarPlugin
}
