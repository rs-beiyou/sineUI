import 'libs/ztree/metroStyle/metroStyle.css';
import 'libs/ztree/jquery.ztree.all.min.js';

import {Log} from '../../libs/log';

class Tree {
  constructor(el, option){
    this.$el = $(el);
    this.options = option;
    this.init();
  }
  init(){
    let op = this.options;
    this.tree = $.fn.zTree.init(this.$el,{
      check: {
        enable: !!op.chkStyle,
        chkStyle: op.chkStyle||'radio',
        chkboxType: {'Y':op.chkboxType==='link'&&'ps'||'', 'N':op.chkboxType==='link'&&'ps'||''},
      },
      async: {
        enable: !!op.url,
        url: op.url||'',
        type: op.type
      },
      data: {
        key: {
          name: op.valueField||'listname'
        },
        simpleData: {
          enable: true,
          idKey: op.idField||'id',
          pIdKey: op.pIdField||'parentid',
          rootPId: op.pIdValue||'-1'
        }
      },
      callback:op.callback||{}
    },op.data||[]);
  }
  refresh(){
    this.tree.reAsyncChildNodes(null,'refresh');
  }
  load(data){
    let op = this.options, key = op.idKey, tree = this.tree;
    if(op.chkStyle){
      tree.checkAllNodes(false);
      if(data&&typeof data==='string'){
        data.split(',').forEach(n=>{
          let node = tree.getNodeByParam(key, n);
          node&&tree.checkNode(node,true,false);//父子节点的勾选联动;
        });
      }
      return;
    }
    if(data&&typeof data==='string'){
      let node = tree.getNodeByParam(key, data);
      node?tree.selectNode(node):tree.cancelSelectedNode(node);
    }
  }
  data(){
    let op = this.options, key = op.idKey, 
      tree = this.tree, chkStyle = op.chkStyle,
      chkboxType = op.chkboxType;
    let arr = [];
    if(chkStyle){
      tree.getCheckedNodes(true).forEach(n=>{
        chkboxType==='link'?!n.getCheckStatus().half&&arr.push(n[key]):arr.push(n[key]);
      });
    }else{
      arr.push(tree.getSelectedNodes()[0][key]);
    }
    return arr.join(',');
  }
  getChecked(checked){
    let op = this.options, chkboxType = op.chkboxType;
    let nodes = this.tree.getCheckedNodes(checked);
    return chkboxType==='link'?nodes.filter(n=>{
      return !n.getCheckStatus().half;
    }):nodes;
  }
  getSelected(){
    return this.tree.getSelectedNodes();
  }
  expandAll(flag){
    this.tree.expandAll(!flag);
  }
}
function Plugin(option){
  try {
    let value, args = Array.prototype.slice.call(arguments, 1);
    this.each(function(){
      let $this = $(this),
        data = $this.data('si.tree'),
        options = $.extend( {} , Tree.DEFAULTS, $this.data(),
          typeof option === 'object' && option);
      if (typeof option === 'string') {
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.tree');
        }
      }
      if (!data) {
        $this.data('si.tree', (data = new Tree(this, options)));
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    Log.warn(error);
  }
}

let old = $.fn.tree;

$.fn.tree = Plugin;
$.fn.tree.Constructor = Tree;

$.fn.tree.noConflict = function() {
  $.fn.tree = old;
  return this;
};
Tree.DEFAULTS = {
  type:'post',
  chkStyle:'',
  chkboxType:'',
  valueField:'',
  idField: '',
  pIdField: '',
  pIdValue: '',
  url:'',
  data:null,
  callback:{}
};