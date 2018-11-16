class Anchor {
  constructor(){}
}
Anchor.DEFAULTS = {
  affix: true,
  offsetTop: 0,
  offsetBottom: null,
  container: null,
  showInk: true
};
function Plugin(option, _relatedTarget) {
  return this.each(function() {
    let $this = $(this);
    let dataSet = $this.data();
    let data = dataSet['si.anchor'];

    if (!data) {
      //data-api覆盖data-options
      let options = Object.assign({}, Anchor.DEFAULTS, dataSet, option || {});
      $this.data('si.anchor', new Anchor(this, options));
    } else {
      if (typeof option === 'object') data['set'](option);
    }

    if (typeof option === 'string') data[option](_relatedTarget);
    if (option === 'close') {
      $this.removeData('si.anchor');
    }
  });
}

let old = $.fn.anchor;

$.fn.anchor = Plugin;
$.fn.anchor.Constructor = Anchor;

$.fn.anchor.noConflict = function () {
  $.fn.anchor = old;
  return this;
};
$(function () {
  $('[data-toggle="anchor"]').anchor();
});