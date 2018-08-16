import '../parser';
import themeInit from 'src/theme/theme1/theme';
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
    this.options.beforeCreated.length > 0 && this.options.beforeCreated.forEach(fn => {
      fn.call(this);
    });
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
Sine.options = {
  scrollToHide: true,
  router: null,
  siderbar: null,
  beforeCreated: [],
  created: [],
  destroyed: []
};

Sine.use = use;
Sine.mixin = mixin;

export default Sine;