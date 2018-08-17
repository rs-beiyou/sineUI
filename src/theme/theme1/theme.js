import _ from 'src/utils/util';

const themeInit = function (siop) {
  let $wintop = $(window.top.document),
    $win = $(window);
  if(!window.top.$wintop)window.top.$wintop = $wintop;
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
  $(document).on('click',()=>{
    if(self!==top){
      window.top.$wintop.click();
    }
  });
};
export default themeInit;
