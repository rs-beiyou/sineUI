$(function() {
  $('[data-toggle="tooltip"]').tooltip();
  $('.sidebar-background').css('background', 'url(./src/image/sidebar-4.jpg)');
  $.ajax({
    url: './pages/data/sidebar.json',
    method: 'get',
    dataType: 'json',
    success: function(data) {
      $(".sidebar-wrapper").sidebar({
        data: data,
        click:function(key){
          if(key.url){
            si.load(key);
          }
        }
      });
    }
  });
  $('#table').table({
    columns: [{
        field: 'id',
        title: 'Item ID'
    }, {
        field: 'name',
        title: 'Item Name'
    }, {
        field: 'price',
        title: 'Item Price',
        editable:{
          type:'text',//text|textarea|select|date|checklist
          emptytext:'价格',
          mode:'popup',//popup:弹出层；inline行内
          defaultValue:'100',//默认值
          name:'item',
          value:'213',
          params:function(params) {
            console.log(params)
              params.a = 1;
              return params;
          },
          url: '/post',
          pk: 1,
          send:'always',
          validate:function(value) {
              if($.trim(value) == '') {
                  return '不可为空！';
              }
          }
        }
    }],
    data: [{
        id: 1,
        name: 'Item 1',
        price: '$1'
    }, {
        id: 2,
        name: 'Item 2',
        price: '$2'
    }]
});
})
