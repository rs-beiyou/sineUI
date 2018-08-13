export default function (mixin) {
  Object.assign(this.options, mixin || {});
  return this;
}