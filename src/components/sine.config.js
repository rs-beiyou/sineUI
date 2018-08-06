import themeInit from '../theme';
class Sine{
  constructor (option) {
    this.options = Object.assign({}, Sine.DEFAULTS, option || {});
    this.init();
  }
  init () {
    themeInit(this.options);
  }
}

Sine.DEFAULTS = {
  scrollToHide: true
};

export default Sine;
