// import './theme.scss';

// import {
//   checkFull,
//   launchFullscreen
// } from 'src/components/fullscreen/browerFullscreen.js';

import _ from 'src/utils/util';

const themeInit = function (siop) {
  let $wintop = $(window.top.document),
    $win = $(window);
  if(!window.top.$wintop)window.top.$wintop = $wintop;
  // let $full = null;
  if (siop.scrollToHide) {
    let $page = $wintop.find('.si-page');
    let hiding = false;
    let before = $win.scrollTop();
    window.onscroll = _.debounce(function () {
      if(hiding)return;
      let after = $win.scrollTop();
      if (after <= 20) {
        $page.removeClass('si-page-top-hide');
        before = after;
        return;
      }
      if (before < after) {
        $page.addClass('si-page-top-hide');
        hiding = true;
        setTimeout(() => {
          hiding = false;
        }, 500);
      }
      before = after;
    }, 50);
  }
  
  // $wintop.on('click', '.browerFullscreen', function() {
  //   $full = $(this);
  //   launchFullscreen(window.top.document.documentElement);
  //   setTimeout(()=>{
  //     $full.tooltip('hide');
  //     $full.fadeOut();
  //   },200);
  // });
  // window.onresize = function () {
  //   if (!checkFull()) {
  //     setTimeout(()=>{
  //       $full && $full.fadeIn();
  //     },200);
  //   }
  // };
  $(document).on('click',()=>{
    if(self!==top){
      window.top.$wintop.click();
    }
  });
};
export default themeInit;
