let _Sine;
function install(Sine){
  if (install.installed && _Sine === Sine) return;
  install.installed = true;
  _Sine = Sine;
  const _this = this;
  
  Sine.mixin({
    beforeCreated() {
      if(this.options.siderbar){
        this._siderbarRoot = this;
        if(this.options.router && this.options.siderbar){
          this.options.siderbar.mode = this.options.router.mode || 'hash';
        }
        this._siderbarRoot._siderbar = new _this(this.options.siderbar);
      }else{
        this._siderbarRoot._siderbar = new _this(_this.options);
      }
    }
  });
}
export default install;