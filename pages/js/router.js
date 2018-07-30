var $container = $('.si-container');
var $siTitle = $('#si-breadcrumb-home');
window.si.config({
  router: [{
    title: '首页',
    path: 'home',
    page: 'pages/views/index.html'
  }, {
    title: '404',
    path: 'lost',
    page: 'pages/views/404.html'
  },{
    title: '更新',
    path: 'update',
    children: [{
      title: '更新日志',
      path: 'log',
      page: 'pages/views/update/update.html'
    }, {
      title: '栅格升级',
      path: 'col-row',
      page: 'pages/views/update/col-row-replace.html'
    }]
  },{
    path: 'layout',
    title: '结构',
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
    title: '表单',
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
    }, {
      title: '开关',
      path: 'switchbox',
      page: 'pages/views/form/switchbox.html'
    }, {
      title: '级联选择器',
      path: 'combobox',
      page: 'pages/views/form/combobox.html'
    }, {
      title: '下拉树',
      path: 'treebox',
      page: 'pages/views/form/treebox.html'
    }, {
      title: '日期',
      path: 'datebox',
      page: 'pages/views/form/datebox.html'
    }, {
      title: '文件上传',
      path: 'filebox',
      page: 'pages/views/form/filebox.html'
    }]
  }, {
    path: 'components',
    title: '组件',
    children: [{
      title: '面板',
      path: 'panel',
      page: 'pages/views/components/panel.html'
    }, {
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
    }, {
      title: '标签',
      path: 'tags',
      page: 'pages/views/components/tags.html'
    }, {
      title: '树形控件',
      path: 'tree',
      page: 'pages/views/components/tree.html'
    }, {
      title: '富文本编辑器',
      path: 'editor',
      page: 'pages/views/components/editor.html'
    }]
  }, {
    path: 'table',
    title: '表格',
    children: [{
      title: '普通表格',
      path: 'general',
      page: 'pages/views/table/general.html'
    }]
  }, {
    path: 'modal',
    title: '弹层',
    children: [{
      title: '对话框',
      path: 'modal',
      page: 'pages/views/modal/modal.html'
    },{
      title: 'API',
      path: 'api',
      page: 'pages/views/modal/api.html'
    }]
  }, {
    path: 'pages',
    title: '页面',
    children: [{
      title: '数据列表',
      path: 'list',
      page: 'pages/views/pages/list.html'
    }]
  }, {
    path: 'skills',
    title: '技巧规范',
    children: [{
      title: '组件联动',
      path: 'componentLinker',
      page: 'pages/views/skills/componentLinker.html'
    }]
  }],
  redirect: 'home',
  lost: 'lost',
  afterEach: function(route, pathArr) {
    var html = [];
    pathArr.forEach(function(ele,i){
      if(ele.path==='home')return;
      i===pathArr.length-1?html.push('<li class="active">'+ele.title+'</li>'):html.push('<li>'+ele.title+'</li>');
    });
    $siTitle.nextAll().remove();
    $siTitle.after(html.join(''));
    // $siTitle.text(route.title);
    $container.find('[data-toggle="tooltip"]').tooltip();
    $container.find('code').map(function() {
      window.Prism.highlightElement(this);
    });
  }
});