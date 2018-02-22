import './textbox';
import './passwordbox';
import './checkbox';
import './radiobox';
import './selectbox';
import './switchbox';
(function($) {
  class Parser {
    parse(el) {
      this.$element = el ? el : $('body');
      this.$element.find('input[class^="btsp-"]').each((index, element) => {
        let regex = new RegExp('btsp-(\\S*)');
        let type = regex.exec(element.className)[1];
        let dataOptions = (element.dataset ? element.dataset.options : element.getAttribute('data-options')) || '';
        let options = (new Function('return {' + dataOptions + '}'))();
        try {
          $(element)[type](options);
        } catch (error) {
          console.error('former组件解析失败！\n' + error.msg);
        }
      });
    }
  }
  const siParser = new Parser();
  $.parser = siParser;
})(jQuery);