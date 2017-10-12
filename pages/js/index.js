$('[data-toggle="tooltip"]').tooltip();
$('.sidebar-background').css('background', 'url(./src/image/sidebar-4.jpg)');
var $navTitle = $(".si-nav-title");
$.ajax({
  url: './pages/data/sidebar.json',
  dataType: 'json',
  success: function(data) {
    $(".sidebar-wrapper").sidebar({
      data: data,
      click:function(key){
        if(key.url){
          $navTitle.html(key.name)
          si.load(key);
        }
      }
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
