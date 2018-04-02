class Valid{
  constructor(option, former){
    this.$el = former.$input;
    this.options = option;
    this.former = former;
    this.placement = 'bottom';
    this.init();
  }
  init(){
    this.$el.on('valid.change',()=>{
      this.valid();
    });
  }
  valid(){
    let op = this.options,
      result = {
        pass: false,
        msg: ''
      },
      tipTarget = this.former.$formBlock;
    if(op.required){
      result = this.isNotEmpty();
    }
    tipTarget.attr('data-original-title',result.msg).tooltip({
      trigger:'manual',
      placement: this.placement
    });
    let events = $._data(tipTarget[0],'events');
    if(!result.pass){
      tipTarget.addClass('has-error');
      if(op.delayTip){
        if(events && events['hover']){
          return;
        }
        tipTarget.hover(()=>{
          tipTarget.tooltip('show');
        }, ()=>{
          tipTarget.tooltip('hide');
        });
      }else{
        tipTarget.tooltip('show');
      }
      return false;
    }
    tipTarget.removeClass('has-error');
    if(op.delayTip){
      tipTarget.off('mouseenter').unbind('mouseleave');
    }
    tipTarget.tooltip('hide');
  }
  check(){
    if(this.$el.is('form')){
      let $list = this.$el.find('.valid-control');
      for (let index = 0; index < $list.length; index++) {
        const element = $list[index];
        const result = $(element).valid('check');
        if(!result)return false;
      }
      return;
    }
    return this.valid();
  }
  //非空
  isNotEmpty(){
    let val = this.$el.val();
    return {
      pass: val!==null&&val!=='',
      msg: this.options.msg||'不能为空'
    };
  }
  //长度校验
  length(){
    let range = this.options.length;
    if(!$.isArray(range)){
      if(range.length!==2){
        throw new Error('Check length must be configured with a length of interval!\n长度校验必须配置一个长度区间！');
      }
      return;
    }
    let val = this.$el.val();
    let len = val.replace(/[^\u0000-\u00ff]/g,'aa').length;
    let min = range[0]==='-'?Number.MIN_VALUE:range[0],
      max = range[1]==='-'?Number.MAX_VALUE:range[1];
    return {
      pass: len>=min && length<=max,
      msg: this.options.msg||'数值不在指定区间'
    };
  }
  //判断是否是合法的身份证号
  id(){
    let val = this.$el.val();
    return {
      pass: /^\d{15}$|^\d{14}x$|^\d{14}X$|^\d{18}$|^\d{17}x$|^\d{17}X$/.test(val),
      msg: this.options.msg||'身份证号格式错误'
    };
  }
  //是否是合法的E_mail地址(以字母开头，字母、数字、下划线的组合，中间必须有一个“@”)
  email(){

  }
  //邮编
  postcode(){

  }
  //正整数
  int(){

  }
  //浮点数
  float(){
    
  }
  //数字大小区间
  range(){

  }
  //固定电话号码
  tel(){

  }
  //手机号码
  mobile(){

  }
  //电话号码：包括固定和移动两种
  phone(){

  }
  //路径
  url(){

  }
  //数字类型
  number(){

  }
  //自定义校验，支持正则和远程校验
  custom(){
    
  }
}

let allowedMethods = ['check'];

function Plugin(option, former){
  try {
    let value;
    this.each(function(){
      let $this = $(this),
        data = $this.data('si.valid'),
        options = Object.assign( {} , $this.data(),
          typeof option === 'object' && option);
      if (typeof option === 'string') {
        if (!allowedMethods.includes(option)) {
          throw new Error(`Unknown method: ${option}`);
        }
        if (!data) {
          return;
        }
        value = data[option].apply(data);
        if (option === 'destroy') {
          $this.removeData('si.valid');
        }
      }
      if (!data) {
        $this.data('si.valid', (data = new Valid(options, former)));
      }else{
        data.options = options;
        value = data.valid();
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    throw new Error(error);
  }
}

let old = $.fn.valid;

$.fn.valid = Plugin;
$.fn.valid.constructor = Valid;

$.fn.valid.noConflict = function() {
  $.fn.valid = old;
  return this;
};
