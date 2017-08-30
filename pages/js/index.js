$(function() {
  $('[data-toggle="tooltip"]').tooltip();
  $('.sidebar-background').css('background', 'url(./src/image/sidebar-4.jpg)')
  $.ajax({
    url: './pages/data/sidebar.json',
    method: 'get',
    dataType: 'json',
    success: function(data) {
      $(".sidebar .sidebar-wrapper").sidebar({
        data: data,
        click:function(key){
          if(key.url){
            si.load(key.url,$('.main-panel'));
          }
        }
      });
    }
  })
})
