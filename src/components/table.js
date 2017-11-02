(function($) {
  Array.prototype.findObjIndex = function(obj) {
    for (var i = 0, len = this.length; i < len; i++) {
      var flag = false;
      for (var o in this[i]) {
        if (this[i][o] !== obj[o]) {
          break;
        }
        flag = true;
      }
      if (flag) {
        return i;
      }
    }
    return -1;
  };
  $.fn.table = function(options) {
    if (typeof options === 'object' || !options) {
      return methods.init.apply(this, arguments);
    } else if (methods[options]) {
      return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      $.error('Method ' + options + ' does not exist on jQuery.table plugin');
    }
  }
  var methods = {
    init: function(options) {
      var target = $(this);
      options = $.extend({}, $.fn.table.defaults, options || {});
      var toolbar = options.toolbar;
      var toolbar_type = [
        "default",
        "primary",
        "success",
        "info",
        "warning",
        "danger",
        "link"
      ];
      var toolbar_html = new Array();
      var toolbar_callback = new Array();

      if (toolbar && toolbar.length > 0) {
        var obj = {
          id: "",
          name: "",
          icon: "",
          type: ""
        };
        for (var i = 0; i < toolbar.length; i++) {
          obj.id = toolbar[i].id
            ? toolbar[i].id
            : "table-bar" + i;
          obj.name = toolbar[i].name
            ? toolbar[i].name
            : "待定";
          obj.icon = toolbar[i].icon
            ? toolbar[i].icon
            : "";
          obj.type = toolbar[i].type && toolbar_type.indexOf(toolbar[i].type) > -1
            ? toolbar[i].type
            : "default";
          toolbar_html.push('<button id="' + obj.id + '" class="btn btn-sm btn-' + obj.type + '"><i class="glyphicon ' + obj.icon + '"></i>' + obj.name + '</button>');
          if (toolbar[i].callback && typeof toolbar[i].callback === 'function') {
            toolbar_callback.push({id: obj.id, callback: toolbar[i].callback});
          } else {
            $.error("The callback(function) of toolbar argument[" + i + "] in jQuery.table plugin has occurred some errors!")
          }
        }
        options.toolbar = toolbar_html.join(" ");
      }
      target.bootstrapTable(options);

      for (var i = 0; i < toolbar_callback.length; i++) {
        var tcb = toolbar_callback[i];
        (function(tcb) {
          $("#" + tcb.id).click(function() {
            var e = window.event || arguments.callee.caller.arguments[0];
            tcb.callback();
            e.preventDefault();
          })
        })(tcb)
      }
    },
    refresh: function() {
  	  var option = $.extend({},{
            query: arguments[0]
          },arguments[1]||{});
      $(this).bootstrapTable("refresh",option);
    },
    load: function() {
      $(this).bootstrapTable("load", arguments[0]);
    },
    reload: function() {
  	var option = $.extend({},{
          query: arguments[0],
          pageNumber: 1
        },arguments[1]||{});
      $(this).bootstrapTable("refresh", option);
    },
    selected: function() {
      return $(this).bootstrapTable("getSelections");
    },
    checkAll: function() {
      $(this).bootstrapTable("checkAll");
    },
    uncheckAll: function() {
      $(this).bootstrapTable("uncheckAll");
    },
    uncheck: function(index) {
      $(this).bootstrapTable("uncheck", index);
    },
    check: function(index) {
      $(this).bootstrapTable("check", index);
    },
    append: function(data) {
      $(this).bootstrapTable("append", data);
    },
    prepend: function(data) {
      $(this).bootstrapTable("prepend", data);
    },
    getData: function() {
      return $(this).bootstrapTable("getData");
    },
    //仅客户端更新选中行
    updateRow: function(data) {
      var _this = this;
      var tableData = $(this).bootstrapTable('getData');
      var selected = $(this).bootstrapTable('getSelections');
      $.each(selected, function(i, row) {
        var inde = tableData.findObjIndex(row);
        $(_this).bootstrapTable("updateRow", {
          index: inde,
          row: data
        });
        $(_this).bootstrapTable("uncheck", inde);
      })
    },
    //仅客户端删除，不能存在分页
    removeSelected: function() {
      var data = $(this).bootstrapTable('getData');
      var selected = $(this).bootstrapTable('getSelections');
      $.each(selected, function(i, row) {
        var inde = data.findObjIndex(row);
        if (inde > -1) {
          data.splice(inde, 1);
        }
      })
      $(this).bootstrapTable("load", data);
    },
    getColumns:function(){
      return $(this).bootstrapTable("getOptions").columns[0];
    },
    removeByUniqueId:function(id){
      return $(this).bootstrapTable('removeByUniqueId', id);
    },
    remove(){
      return $(this).bootstrapTable('remove', arguments[0]);
    }
  };

  $.fn.table.defaults = {
    method: "post",
    clickToSelect: true,
    contentType: "application/x-www-form-urlencoded",
    queryParams: function(params) {
      return {page: params.pageNumber, rows: params.pageSize}
    },
    queryParamsType: "undefined",
    pagination: true,
    sidePagination: "server",
    striped: true, //是否显示行间隔色
    pageNumber: 1,
    pageSize: 20,
    pageList: [10, 20, 30, 50]
  };
})(jQuery);
