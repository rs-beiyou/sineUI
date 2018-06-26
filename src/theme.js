import 'src/sass/theme/theme1.scss';
import '../static/image/photograph.jpeg';

import {
  checkFull,
  launchFullscreen
} from 'src/components/fullscreen/browerFullscreen.js';

import _ from './utils/util';

$(function () {
  let $wintop = $(window.top.document),
    $win = $(window),
    before = $win.scrollTop();
  if(!window.top.$wintop)window.top.$wintop = $wintop;
  let $page = $wintop.find('.si-page');
  let $full = $('.browerFullscreen');
  let hiding = false;
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
  $wintop.on('click', '.browerFullscreen', () => {
    launchFullscreen(window.top.document.documentElement);
  });
  window.onresize = function () {
    if (!checkFull()) {
      setTimeout(()=>{
        $full.fadeIn();
      },200);
    }else{
      setTimeout(()=>{
        $full.tooltip('hide');
        $full.fadeOut();
      },200);
    }
  };
  $(document).on('click',()=>{
    if(self!==top){
      window.top.$wintop.click();
    }
  });
});