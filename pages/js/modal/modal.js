let content = '<table><tr><td>表格</td><td><p>测试下弹窗的内容<br>加上html后</p></td></tr></table><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>'

//第一部分
$("#btnJsModal").click(function() {
  $.dialog({
    title: '自定义标题',
    content: content,
    area: ['600px', '300px'],
    success: function(obj, index) {
      console.log(index)
    },
    cancel: function() {
      console.log('关闭窗口');
    }
  });
});


$("#btnJsLoading").click(function() {
  var loading = $.loading();
  setTimeout(function() {
    $.loadingClose(loading)
  }, 3000);
})

//信息提示
$('#btnJsInfo').click(function() {
  $.info({
    //title:'信息提示',
    content: '内容内容',
    yes: function() {
      console.log('点击了确定')
    }
  });
})
$('#btnJsWarning').click(function() {
  $.warning({
    //title:'警告提示',
    content: '内容内容'
  });
})
$('#btnJsSuccess').click(function() {
  $.success({
    //title:'成功提示',
    content: '内容内容'
  });
})
$('#btnJsError').click(function() {
  $.error({
    //title:'错误提示',
    content: '内容内容'
  });
})
//确认对话框
$('#btnJsConfirm').click(function() {
  $.confirm('确定要提交吗？', function() {
    console.log('点击了确定')
    $.confirm('点击了确定')
  });
});
$('#btnJsDelete').click(function() {
  $.confirm({
    title: '',
    content: '一些描述内容',
    btn: [{
      class: 'btn-danger',
      title: '确定'
    }, {
      title: '取消'
    }]
  });
});


$('#btnJsPrompt').click(function() {
  $.prompt();
});