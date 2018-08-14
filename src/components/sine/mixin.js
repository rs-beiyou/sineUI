export default function (mixin) {
  Object.keys(mixin).forEach(item => {
    if(Object.prototype.toString.call(this.options[item]) === '[object Array]'){
      this.options[item].push(mixin[item]);
      return true;
    }
    this.options[item] = mixin[item];
  });
  return this;
}