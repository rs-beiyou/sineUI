import _ from 'src/utils/util';
class Valid{
  constructor(option, former){
    this.$el = former.$input;
    this.options = option;
    this.former = former;
    this.placement = 'bottom';
    this.pass = true;
    this.hasError = false;
    this.msg = '';
    this.isShow = false;
    this.init();
  }
  init(){
    if(this.options.required){
      this.former.$label&&this.former.$label.addClass('si-form-required');
    }
    if(this.$el.data('si-form-type')==='textbox'){
      this.$el.on('valid.change',_.debounce(this.valid.bind(this),500));
    }else{
      this.$el.on('valid.change',this.valid.bind(this));
    }
  }
  reset(option){
    this.hasError&&this.hide();
    Object.assign(this.options,option||{});
    if(this.options.required){
      this.former.$label&&this.former.$label.addClass('si-form-required');
    }else{
      this.former.$label&&this.former.$label.removeClass('si-form-required');
    }
  }
  destroy(){
    this.reset();
    this.$el.off('valid.change');
  }
  check(){
    if(this.hasError) return false;
    return this.valid();
  }
  valid(){
    let op = this.options;
    if(op.required){
      this.isNotEmpty();
      if(!this.checkPass())return false;
    }
    if(op.type){
      let typeArr = op.type.split(',');
      for(let i=0,le=typeArr.length;i<le;i++){
        const type = typeArr[i];
        if(!allowedType.includes(type)){
          throw new Error(`没有${type}校验类型！`);
        }
        this[type]();
        if(!this.checkPass())return false;
      }
    }
    return true;
  }
  checkPass(){
    if(!this.pass){
      this.hasError = true;
      this.show();
      return false;
    }
    if(this.hasError){
      this.hasError = false;
      this.hide();
    }
    return true;
  }
  show(){
    let tipTarget = this.former.$formBlock;
    let events = $._data(tipTarget[0],'events');
    tipTarget.attr('data-original-title',this.msg).tooltip({
      trigger:'manual',
      placement: this.placement
    });
    tipTarget.addClass('has-error');
    if(this.options.delayTip){
      if(events && events['hover']){
        return;
      }
      tipTarget.hover(()=>{
        tipTarget.tooltip('show');
      }, ()=>{
        tipTarget.tooltip('hide');
      });
    }else{
      setTimeout(()=>{
        tipTarget.tooltip('show');
      },200);
    }
  }
  hide(){
    let tipTarget = this.former.$formBlock;
    tipTarget.removeClass('has-error');
    if(this.options.delayTip){
      tipTarget.off('mouseenter').unbind('mouseleave');
    }
    tipTarget.tooltip('hide');
  }
  //非空
  isNotEmpty(){
    let val = this.$el.val();
    this.pass = val!==null&&val!=='';
    this.msg = this.options.msg||'不能为空';
  }
  //长度校验
  length(){
    let range = this.options.length;
    if(!$.isArray(range)){
      if(range.length!==2){
        throw new Error('Check length must be configured with a length of interval!\n长度校验必须配置一个长度区间！');
      }
      throw new Error('Check length must be configured with a length of interval!\n长度校验必须配置一个长度区间！');
    }
    let val = this.$el.val();
    let len = val.replace(/[^\u0000-\u00ff]/g,'aa').length;
    let min = range[0]==='-'?Number.MIN_VALUE:range[0],
      max = range[1]==='-'?Number.MAX_VALUE:range[1];
    this.pass = len>=min && len<=max;
    this.msg = this.options.msg||'数值不在指定区间';
  }
  //判断是否是合法的身份证号
  id(){
    let val = this.$el.val();
    if(val==='')return;
    this.pass = /^\d{15}$|^\d{14}x$|^\d{14}X$|^\d{18}$|^\d{17}x$|^\d{17}X$/.test(val);
    this.msg = this.options.msg||'身份证号格式错误';
  }
  //是否是合法的E_mail地址(以字母开头，字母、数字、下划线的组合，中间必须有一个“@”)
  email(){
    let val = this.$el.val();
    if(val==='')return;
    this.pass = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(val);
    this.msg = this.options.msg||'邮箱格式错误';
  }
  //邮编
  postcode(){
    let val = this.$el.val();
    if(val==='')return;
    this.pass = /^\d{6}$/.test(val);
    this.msg = this.options.msg||'邮编格式错误';
  }
  //正整数
  int(){
    let val = this.$el.val();
    if(val==='')return;
    this.pass = /^\d+$/.test(val);
    this.msg = this.options.msg||'数值(整数)格式错误';
  }
  //浮点数
  float(){
    let val = this.$el.val();
    if(val==='')return;
    this.pass = /^\d+\.{0,1}\d*$/.test(val);
    this.msg = this.options.msg||'数值(正实数)格式错误';
  }
  //数字大小区间
  range(){
    let range = this.options.range;
    if(!$.isArray(range)){
      if(range.length!==2){
        throw new Error('A number size check must be configured for an interval!\n数字大小校验必须配置一个区间！');
      }
      throw new Error('The type of interval in the number size check must be an array!\n数字大小校验区间必须为数组！');
    }
    let val = this.$el.val();
    if(val==='')return;
    let num = Number(val);
    if(isNaN(num)){
      this.pass = false;
      this.msg = this.options.msg||'请填写数字';
    }else{
      let min = range[0]==='-'?Number.MIN_VALUE:range[0],
        max = range[1]==='-'?Number.MAX_VALUE:range[1];
      this.pass = min <= num && num <= max;
      this.msg = this.options.msg||`数值不在指定区间${min}-${max}里`;
    }
  }
  //固定电话号码
  tel(){
    let val = this.$el.val();
    if(val==='')return;
    this.pass = /^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?)$/.test(val);
    this.msg = this.options.msg||'固定电话号码格式错误';
  }
  //手机号码
  mobile(){
    let val = this.$el.val();
    if(val==='')return;
    this.pass = /^1[345789]\d{9}$/.test(val);
    this.msg = this.options.msg||'手机号码格式错误';
  }
  //电话号码：包括固定和移动两种
  phone(){
    this.tel();
    this.msg = this.options.msg||'电话号码格式错误';
    if(this.pass)return;
    this.mobile();
    this.msg = this.options.msg||'电话号码格式错误';
  }
  //路径
  url(){
    let val = this.$el.val();
    if(val==='')return;
    this.pass = /^((ht|f)tps?):\/\/[\w\\-]+(\.[\w\\-]+)+([\w\-\\.,@?^=%&:\\/~\\+#]*[\w\-\\@?^=%&\\/~\\+#])?$/.test(val);
    this.msg = this.options.msg||'身份证号格式错误';
  }
  //数字类型
  number(){
    let val = this.$el.val();
    if(val==='')return;
    this.pass = !isNaN(val);
    this.msg = this.options.msg||'身份证号格式错误';
  }
  //自定义校验，支持正则和远程校验
  custom(){
    let val = this.$el.val(),
      regex = this.options.regex,
      url = this.options.url,
      name = this.former.options.name||_.randomString();
    if(val==='')return;
    if(regex){
      this.pass = new RegExp(regex).test(val);
      this.msg = '输入不符合规则！';
    }else if(url){
      this.customUrlFn = this.customUrlFn||_.debounce(()=>{
        $.ajax({
          type: 'post',
          url: url,
          data: {
            [name]:val
          },
          async: false,
          timeout: 3000,
          success: re=>{
            if(!re){
              this.pass = false;
              this.msg = '输入不符合规则！';
            }else{
              this.pass = true;
            }
          }
        });
      },1000);
      this.customUrlFn();
    }
  }
}

let allowedMethods = ['check'];
let allowedType = ['email','int','postcode','id','length','float','range','tel','mobile','phone','number','url','custom'];

function Plugin(option, former){
  try {
    let value;
    this.each(function(){
      let $this = $(this),
        data = $this.data('si.valid'),
        options = Object.assign( {} , $this.data(),
          typeof option === 'object' && option);
      if($this.is('form')){
        let $list = $this.find('.si-valid-control');
        for (let index = 0; index < $list.length; index++) {
          const element = $list[index],$el = $(element);
          const type = $el.data('si-form-type');
          const former = $el.data('si.'+type);
          if(former.$formBlock.is(':hidden'))continue;
          const pass = $(element).valid('check');
          if(!pass){
            value = false;
          }
        }
      }else{
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
        if(typeof option === 'object'&&data){
          data.reset(option);
        }
        if (!data) {
          $this.addClass('si-valid-control');
          $this.data('si.valid', (data = new Valid(options, former)));
        }
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
