require('bootstrap-table/src/bootstrap-table.css');
require('bootstrap-table');
require('bootstrap-table/src/locale/bootstrap-table-zh-CN');

let BootstrapTable = $.fn.bootstrapTable.Constructor;
let compareObjects = $.fn.bootstrapTable.utils.compareObjects;
let bsMethods = $.fn.bootstrapTable.methods;

bsMethods.push('getPage');
bsMethods.push('refreshColumns');

BootstrapTable.prototype.getPage = function () {
  return {pageSize: this.options.pageSize, pageNumber: this.options.pageNumber};  
};

BootstrapTable.prototype.refreshColumns = function (options) {
  if (compareObjects(this.options, options, true)) {
    return;
  }
  this.options = $.extend(this.options, options);
  this.trigger('refresh-options', this.options);
  this.initTable();
  this.initHeader();
  this.initData();
  this.initHiddenRows();
  this.initBody();
};