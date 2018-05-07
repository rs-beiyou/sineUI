import '../form';

import {Log} from '../../libs/log';

class Parser {
  parse(el) {
    this.$element = el ? el : $('body');
    this.parseForm();//表单解析
    $.fn.bootstrapTable&&this.$element.find('[data-toggle="table"]').bootstrapTable();//表格解析
  }
  parseForm(){
    this.$element.find('input[class^="btsp-"]').each((index, element) => {
      let regex = new RegExp('btsp-(\\S*)');
      let type = regex.exec(element.className)[1];
      let dataOptions = (element.dataset ? element.dataset.options : element.getAttribute('data-options')) || '';
      let options = (new Function(`return ${dataOptions && dataOptions.startsWith('{') ? dataOptions : '{'+dataOptions+'}'}`))();
      try {
        $(element)[type](options);
      } catch (error) {
        Log.error(`former组件解析失败！\n${error}`);
      }
    });
  }
}
const siParser = new Parser();
$.parser = siParser;