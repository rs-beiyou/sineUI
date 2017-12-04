let $container = $('.si-container');
let $title = $('title');
let $siTitle = $('.si-nav-title');
window.si.config({
  router: [{
    title: '首页',
    path: 'home',
    page: 'pages/views/index.html'
  }, {
    title: '404',
    path: 'lost',
    page: 'pages/views/404.html'
  }, {
    path: 'layout',
    children: [{
      title: '布局',
      path: 'layout',
      page: 'pages/views/layout/layout.html'
    }, {
      title: '栅格',
      path: 'grid',
      page: 'pages/views/layout/grid.html'
    }]
  }, {
    path: 'form',
    children: [{
      title: '输入框',
      path: 'textbox',
      page: 'pages/views/form/textbox.html'
    }, {
      title: '选择器',
      path: 'selectbox',
      page: 'pages/views/form/selectbox.html'
    }, {
      title: '单选框',
      path: 'radiobox',
      page: 'pages/views/form/radiobox.html'
    }, {
      title: '多选框',
      path: 'checkbox',
      page: 'pages/views/form/checkbox.html'
    }, {
      title: '表单',
      path: 'form',
      page: 'pages/views/form/form.html'
    }]
  }, {
    path: 'components',
    children: [{
      title: '按钮',
      path: 'buttons',
      page: 'pages/views/components/buttons.html'
    }, {
      title: '色彩',
      path: 'color',
      page: 'pages/views/components/color.html'
    }, {
      title: '图标',
      path: 'icons',
      page: 'pages/views/components/icons.html'
    }]
  }],
  redirect: 'home',
  lost: 'lost',
  afterEach: function(route) {
    $title.text('SineUI - ' + route.title);
    $siTitle.text(route.title);
    $container.find('[data-toggle="tooltip"]').tooltip();
    $container.find('code').map(function() {
      window.Prism.highlightElement(this);
    });
  }
});