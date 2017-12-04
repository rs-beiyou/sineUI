import './former';
(function($) {
  class Parser {
    parse(el) {
      this.$element = el ? el : $('body');
      this.$element.find('input[class^="btsp-"]').each((index, element) => {
        let regex = new RegExp('btsp-(\\S*)');
        let type = regex.exec(element.className)[1];
        let dataOptions = element.dataset.options || '';
        let options = (new Function('return {' + dataOptions + '}'))();
        $(element)[type](options);
      });
    }
  }
  const siParser = new Parser();
  $.parser = siParser;
})(jQuery);