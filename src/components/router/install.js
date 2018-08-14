let _Sine;
function install(Sine){
  if (install.installed && _Sine === Sine) return;
  install.installed = true;
  _Sine = Sine;
  const _this = this;
  
  Sine.mixin({
    beforeCreated() {
      if(this.options.router){
        _this.options.el = this.options.el;
        this._routerRoot = this;
        this._routerRoot._router = new _this(this.options.router);
      }else{
        this._routerRoot._router = new _this(_this.options);
      }
    }
  });

  Object.defineProperty(Sine.prototype, '$router', {
    get () { return this._routerRoot._router; }
  });
}
export default install;