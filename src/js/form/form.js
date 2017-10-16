import {Former,FormerPlugin} from './former';
// form操作器
class Form{
  constructor(el, op){
    this.$element = $(el);
    this.options = op;
    this.panel = null;
    this.init();
  }
  init(){
    let op = this.options;
    this.panel = op.type==='panel'||op.hasPanel?this._getPanel():null;
    for(let i=0,len = op.list.length;i<len;i++){
      new Former(this.$element,op.list[i]);
    }
  }
  getOption(){
    return this.options.list;
  }
  load(){

  }
  data(){

  }
  clear(){

  }
  clone(){

  }
  //私有方法
  _getPanel(){
    let op = this.options;
    let panel = document.createElement('div');
    let panelHeader = op.hasTitle?document.createElement('div'):null;
    let panelBody = document.createElement('div');
    panelHeader?$(panelHeader).addClass('panel-heading').append('<h3 class="panel-title">'+op.title+'</h3>'):null;
    $(panelBody).addClass('panel-body');
    $(panel).addClass('panel panel-'+op.panelType);
    this.$element.wrap(panelBody).parent().wrap(panel).parent().prepend(panelHeader);
    return panel;
  }
  _getFormer(){

  }
}
function Plugin (option, _relatedTarget){
  return this.each( function(){
    let $this = $(this);
    let data  = $this.data('si.form');
    let options = $.extend({}, Form.DEFAULTS, $this.data(), typeof option == 'object' && option);

    if (!data) $this.data('si.form', (data = new Form(this, options)));
    if (typeof option == 'string') data[option](_relatedTarget);
  });
}

Form.DEFAULTS = {
  hasPanel:false,
  hasTitle:true,
  panelType:'default',
  title:'查询条件',
  inline:true,
  labelPosition:'left',
  labelWidth:60,
  list:[],
  button:[]
};

export {
  Form as Form,
  Plugin as FormPlugin
}
