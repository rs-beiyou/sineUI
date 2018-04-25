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
        chkStyle: op.chkStyle,
        chkboxType: {'Y':op.chkboxType==='link'&&'ps'||'', 'N':op.chkboxType==='link'&&'ps'||''},
      },
      async: {
        enable: !!op.url,
        url: op.url,
        type: op.method
      },
      data: {
        key: {
          name: op.valueField
        },
        simpleData: {
          enable: true,
          idKey: op.idField,
          pIdKey: op.pIdField,
          rootPId: op.pIdValue
        }
      },
      callback:op.callback||{}
    },op.data||[]);
  }
  refresh(){
    this.tree.reAsyncChildNodes(null,'refresh');
  }
  load(data){
    let op = this.options, key = op.idField, tree = this.tree;
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
    if(typeof data==='string'){
      let node = tree.getNodeByParam(key, data);
      node?tree.selectNode(node):tree.cancelSelectedNode(node);
    }
  }
  data(){
    let op = this.options,
      tree = this.tree, chkStyle = op.chkStyle,
      chkboxType = op.chkboxType;
    let arr = [],titleArr = [];
    if(chkStyle){
      tree.getCheckedNodes(true).forEach(n=>{
        if(chkboxType==='link'){
          !(n.getCheckStatus().half)&&arr.push(n[op.idField])&&titleArr.push(n[op.valueField]);
        }else{
          arr.push(n[op.idField]);
          titleArr.push(n[op.valueField]);
        }
      });
    }else{
      let node = tree.getSelectedNodes()[0];
      node&&arr.push(node[op.idField])&&titleArr.push(node[op.valueField]);
    }
    return {
      key: titleArr.join(','),
      value: arr.join(',')
    };
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
    this.tree.expandAll(flag);
  }
  checkNode(treeNode, checked, checkTypeFlag, callbackFlag){
    this.tree.checkNode(treeNode, checked, checkTypeFlag, callbackFlag);
  }
  getNodeByParam(key,value,parentNode){
    return this.tree.getNodeByParam(key,value,parentNode);
  }
  updateNode(treeNode){
    this.tree.updateNode(treeNode, this.options.chkboxType==='link'?true:false);
  }
  other(option){
    let args = Array.prototype.slice.call(arguments, 1);
    return this.tree[option].apply(this.tree, args);
  }
  destroy(){
    this.tree.destroy();
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
        if(data[option]){
          value = data[option].apply(data, args);
        }else{
          args.unshift(option);
          value = data.other.apply(data, args);
        }
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
  method:'get',
  chkStyle:'radio',
  chkboxType:'',
  valueField:'listname',
  idField: 'id',
  pIdField: 'parentid',
  pIdValue: '-1',
  url:'',
  data:null,
  callback:{}
};