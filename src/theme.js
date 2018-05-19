import 'src/sass/theme/theme1.scss';

$(function(){
  let $wintop =$(window.top.document), $win = $(window), before = $win.scrollTop();
  let $page = $wintop.find('.si-page');
  window.onscroll = function(){
    let after = $win.scrollTop();
    if(after <= 10){
      $page.removeClass('si-page-top-hide');
      return;
    }
    if (before < after) {
      $page.addClass('si-page-top-hide');
    }
    before = after;
  };
});