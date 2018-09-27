import {Log} from '../../libs/log';

class Popup {
  constructor(trigger, options) {
    this.opened = !!options.opened;
    this.$trigger = $(trigger);
    this.$target = options.target && $(options.target);
    this.toggle();
  }
  open() {
    if (this.opened) return;
    this.opened = true;
    this.$target.show().addClass('slide-down-in');
    setTimeout(() => {
      this.$target.removeClass('slide-down-in');
    }, Number.parseFloat(this.$target.css('animation-duration')) * 1000);
  }
  close() {
    if (!this.opened) return;
    this.opened = false;
    this.$target.addClass('slide-down-out');
    setTimeout(() => {
      this.$target.hide().removeClass('slide-down-out');
    }, Number.parseFloat(this.$target.css('animation-duration')) * 1000);
  }
  toggle() {
    this.opened ? this.close() : this.open();
  }
}

function plugin(option) {
  try {
    let value, args = Array.prototype.slice.call(arguments, 0);
    this.each(function() {
      let $this = $(this),
        dataSet = $this.data(),
        data = dataSet['si.popup'];
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.popup');
        }
      }
      if (!data) {
        $this.data('si.popup', new Popup(this, dataSet));
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    Log.error(`${option}：${error}`);
  }
}
let old = $.fn.popup;

$.fn.popup = plugin;
$.fn.popup.constructar = Popup;

$.fn.popup.noConflict = function () {
  $.fn.popup = old;
  return this;
};

$(document).on('click.si.popup.data-api', '[data-toggle="popup"]', function(e) {
  let $this = $(this);

  if (!$this.attr('data-target')) e.preventDefault();

  let data = $this.data('si.popup');
  let option = data ? 'toggle' : $this.data();

  plugin.call($this, option);
});
