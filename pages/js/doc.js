var $document = $(document);
$('.sidebar-background').css('background', 'url(./static/image/sidebar-4.jpg)');
$('.si-sidebar').find('[data-toggle="tooltip"]').tooltip();
$.ajax({
  url: './pages/data/sidebar.json',
  dataType: 'json',
  success: function(data) {
    $('.si-sidebar').sidebar({
      controler: '.si-strap',
      data: data
    });
  }
});
//code-box
$document.on('click', '.code-expand-icon', function() {
  var $codeBox = $(this).parents('.code-box');
  $codeBox.toggleClass('expend');
});
//code-box
$document.on('click', '.code-box-wrapper-close', function() {
  var $codeBox = $(this).parents('.code-box');
  $codeBox.toggleClass('expend');
}); +
(function() {
  var $backToTop = $('.si-back-top');
  var $mainPanel = $('.si-main-panel');
  var $navBar = $('.si-nav-bar');
  var backToTopShow = false;
  var scrollCurTop = 0;
  $backToTop.on('click', function() {
    $mainPanel.animate({ scrollTop: '0px' }, 200);
  });
  $mainPanel.on('scroll', window._si.throttle(function() {
    var scrolltop = $(this).scrollTop();
    if (!backToTopShow && scrolltop > 300) {
      backToTopShow = true;
      $backToTop.css('display', 'block');
    }
    if (backToTopShow && scrolltop <= 300) {
      backToTopShow = false;
      $backToTop.css('display', 'none');
    }
    if (scrolltop > scrollCurTop) {
      $navBar.addClass('hiden');
    } else {
      $navBar.removeClass('hiden');
    }
    scrollCurTop = scrolltop;
  }, 200));
})();