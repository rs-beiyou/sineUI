import '../parser';
import themeInit from '../../theme';
import '../loadingBar';
import use from './use';
import mixin from './mixin';

class Sine {
  constructor(options) {
    this.currPageUrl = null;
    this.$body = $('body');
    this.options = Object.assign({}, Sine.options, options || {});
    this.init();
  }
  init() {
    this.$body.loadingbar();
    this.options.beforeCreated && this.options.beforeCreated.call(this);
    this.initTheme();
    return this;
  }
  initTheme () {
    themeInit(this.options);
  }
  config(options) {
    Object.assign(this.options, options || {});
  }
}
Sine.DEFAULTS = {
  scrollToHide: true,
  router: null,
  beforeCreated: null,
  created: null,
  destroyed: null
};

Sine.use = use;
Sine.mixin = mixin;
Sine.options = Object.assign({}, Sine.DEFAULTS);

export default Sine;