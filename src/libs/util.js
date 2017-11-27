const _ = {};
_.now = () => {
  return new Date();
};
//函数节流
_.throttle = (fn, context, delay) => {
  clearTimeout(fn.tId);
  fn.tId = setTimeout(() => {
    fn.call(context);
  }, delay ? delay : 100);
};
//函数消抖
_.debounce = () => {

};
export default _;