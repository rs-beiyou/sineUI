import './bootstrap-table-extend';

import {Log} from '../../libs/log';
import _ from '../../utils/util';

class Table {
  constructor(el, options){
    this.options = options;
    this.$el = $(el);
    this.init();
  }
  init(){
    this.initToolbar();
    this.initColumns();
    this.initTable();
  }
  initToolbar(){
    let op = this.options,
      toolbar = op.toolbar,
      toolbarObj = document.createDocumentFragment();

    if(toolbar){
      for (let i = 0; i < toolbar.length; i++) {
        let toolItem = toolbar[i],
          btn = document.createElement('button');
        let $btn = $(btn);
        $btn.addClass(`btn btn-sm btn-${toolItem.type||'default'}`).html(toolItem.name);
        if(toolItem.icon){
          let icon = document.createElement('i');
          let $icon = $(icon);
          $icon.addClass(`fa fa-${toolItem.icon}`);
          $btn.prepend(icon);
        }
        if(toolItem.callback&&typeof toolItem.callback==='function'){
          $btn.on('click',event=>{
            let e = window.event || event;
            if(e.preventDefault){
              e.preventDefault();
            }else{
              e.returnValue = false;
            }
            toolItem.callback.call(btn);
          });
        }
        toolbarObj.appendChild(btn);
      }
      op.toolbar = toolbarObj;
    }
  }
  initColumns(){
    let op = this.options;
    if(op.columns&&op.showSerialNumber){
      let numColumn = {
        width:'40',
        align:'center',
        title:'序号',
        formatter:(value, row, index)=>{
          return this.options.pageSize * (this.options.pageNumber - 1) + index + 1;
        }
      };
      if(Object.prototype.toString.call(op.columns[0])=== '[object Array]'){
        if(op.columns.length===1){
          op.columns[0][0].checkbox ? op.columns[0].splice(1,0,numColumn) :op.columns[0].unshift(numColumn);
        }
      }else{
        op.columns[0].checkbox ? op.columns.splice(1,0,numColumn) :op.columns.unshift(numColumn);
      }
    }
  }
  initTable(){
    this.$el.bootstrapTable(this.options);
  }
  //刷新
  refresh(a, b){
    let options = Object.assign({},{query:a},b||{});
    this.$el.bootstrapTable('refresh',options);
  }
  //加载
  load(a){
    this.$el.bootstrapTable('load', a);
  }
  //重载
  reload(a, b){
    let options = Object.assign({},{query:a},{pageNumber:1},b||{});
    this.$el.bootstrapTable('refresh', options);
  }
  selected(){
    return this.$el.bootstrapTable('getSelections');
  }
  checkAll(){
    this.$el.bootstrapTable('checkAll');
  }
  uncheckAll(){
    this.$el.bootstrapTable('uncheckAll');
  }
  uncheck(index) {
    this.$el.bootstrapTable('uncheck', index);
  }
  check(index) {
    this.$el.bootstrapTable('check', index);
  }
  append(data){
    this.$el.bootstrapTable('append', data);
  }
  getData(){
    return this.$el.bootstrapTable('getData');
  }
  updateRow(data){
    let tableData = this.$el.bootstrapTable('getData');
    let selected = this.$el.bootstrapTable('getSelections');
    $.each(selected, (i, row)=> {
      let inde = _.findObjIndex(tableData, row);
      this.$el.bootstrapTable('updateRow', {
        index: inde,
        row: data
      });
      this.$el.bootstrapTable('uncheck', inde);
    });
  }
  getRowByUniqueId(id){
    return this.$el.bootstrapTable('getRowByUniqueId', id);
  }
  removeByUniqueId(id){
    let data = this.$el.bootstrapTable('getData');
    if(id!==null&&id!==undefined){
      let row = this.$el.bootstrapTable('getRowByUniqueId', id);
      let inde = _.findObjIndex(data, row);
      if (inde > -1) {
        data.splice(inde, 1);
      }
      this.$el.bootstrapTable('load', data);
    }
  }
  removeSelected(){
    let data = this.$el.bootstrapTable('getData');
    let selected = this.$el.bootstrapTable('getSelections');
    $.each(selected, (i, row)=> {
      let inde = _.findObjIndex(data, row);
      if (inde > -1) {
        data.splice(inde, 1);
      }
    });
    this.$el.bootstrapTable('load', data);
  }
  hideColumn(field){
    this.$el.bootstrapTable('hideColumn', field);
  }
  showColumn(field){
    this.$el.bootstrapTable('showColumn', field);
  }
  refreshColumns(option){
    this.$el.bootstrapTable('refreshColumns',option);
  }
  getPage(){
    return this.$el.bootstrapTable('getPage');
  }
}
let allowedMethods = [
  'initTable','refresh','load','reload','selected','checkAll','uncheckAll',
  'check','uncheck','append','getData','updateRow','getRowByUniqueId','removeSelected',
  'hideColumn','showColumn','refreshColumns','getPage'
];
function Plugin(option){
  try {
    let value, args = Array.prototype.slice.call(arguments, 1);
    this.each(function(){
      let $this = $(this),
        data = $this.data('si.table'),
        options = $.extend( {} , Table.DEFAULTS, $this.data(),
          typeof option === 'object' && option);
      if (typeof option === 'string') {
        if ($.inArray(option, allowedMethods) < 0) {
          throw new Error(`Unknown method: ${option}`);
        }
        if (!data) {
          return;
        }
        value = data[option].apply(data, args);
        if (option === 'destroy') {
          $this.removeData('si.table');
        }
      }
      if (!data) {
        $this.data('si.table', (data = new Table(this, options)));
      }
    });
    return typeof value === 'undefined' ? this : value;
  } catch (error) {
    Log.warn(error);
  }
}

Table.DEFAULTS = {
  method: 'post',
  clickToSelect: true,
  contentType: 'application/x-www-form-urlencoded',
  queryParams: function(params) {
    return {page: params.pageNumber, rows: params.pageSize};
  },
  queryParamsType: 'undefined',
  pagination: true,
  sidePagination: 'server',
  striped: true, //是否显示行间隔色
  pageNumber: 1,
  pageSize: 20,
  pageList: [10, 20, 30, 50],
  showSerialNumber: false
};
let old = $.fn.table;

$.fn.table = Plugin;
$.fn.table.Constructor = Table;
$.fn.table.defaults = Table.DEFAULTS;
$.fn.table.methods = allowedMethods;

$.fn.table.noConflict = function() {
  $.fn.table = old;
  return this;
};