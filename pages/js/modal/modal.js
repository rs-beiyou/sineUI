//第一部分
$("#btnJsModal").click(function() {
  $.dialog({
    title: '自定义标题',
    content: '内容',
    btn: ['按钮一','按钮二'],
    yes: function(){

    },
    btn2: function(){
      console.log('222222')
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
  $.msg('这是一条信息提示。',{icon:0});
})
$('#btnJsWarning').click(function() {
  $.msg('这是一条信息警告！',{icon:0});
})
$('#btnJsSuccess').click(function() {
  $.msg('这是一条成功信息！',{icon:1});
})
$('#btnJsError').click(function() {
  $.msg('这是一条错误信息！',{icon:2});
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