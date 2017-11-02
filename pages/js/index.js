$('.sidebar-background').css('background', 'url(./src/image/sidebar-4.jpg)');
$('.si-sidebar').find('[data-toggle="tooltip"]').tooltip();
$.ajax({
  url: './pages/data/sidebar.json',
  dataType: 'json',
  success: function(data) {
    $(".sidebar-wrapper").sidebar({
      data: data
    });
  }
});
//code-box
$(document).on("click",".code-expand-icon",function(){
  var $codeBox = $(this).parents(".code-box");
  var $codeWrapper= $codeBox.children(".code-box-wrapper");
  $codeBox.toggleClass("expend");
  $codeWrapper.toggleClass("expend");
})
