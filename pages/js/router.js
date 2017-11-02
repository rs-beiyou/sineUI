var $container = $(".si-container");
var $title = $("title");
var $siTitle = $(".si-nav-title");
si.config({
  router:[{
    title:'首页',
    path:'home',
    page:'pages/views/index.html'
  },{
    title:'404',
    path:'lost',
    page:'pages/views/404.html'
  },{
    path:'layout',
    children:[{
      title:'布局',
      path:'layout',
      page:'pages/views/layout/aaa.html'
    },{
      title:'栅格',
      path:'grid',
      page:'pages/views/layout/grid.html'
    }]
  },{
    path:'form',
    children:[{
      title:'普通表单',
      path:'general',
      page:'pages/views/form/general.html'
    }]
  },{
    path:'components',
    children:[{
      title:'按钮',
      path:'buttons',
      page:'pages/views/components/buttons.html'
    },{
      title:'色彩',
      path:'color',
      page:'pages/views/components/color.html'
    },{
      title:'图标',
      path:'icons',
      page:'pages/views/components/icons.html'
    }]
  }],
  redirect:'home',
  lost:'lost',
  afterEach:function(route){
    $title.text('SineUI - '+route.title);
    $siTitle.text(route.title);
    $container.find('[data-toggle="tooltip"]').tooltip();
    $container.find('code').map(function() {
      Prism.highlightElement(this);
    });
  }
})
