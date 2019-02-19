class DatePicker {
  constructor(element, options) {
    this.$element = $(element);
    Object.assign(this.options, options || {});
  }
}
DatePicker.DEFAULTS = {};
