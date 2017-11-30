import './former';
(function($) {
  class Parser {
    parse(el) {
      this.$element = el ? el : $('body');
      this.$element.find('input[class^="btsp-"]').each((index, element) => {
        let regex = new RegExp('btsp-(\\S*)');
        let type = regex.exec(element.className)[1];
        let options = (new Function('return {' + element.dataset.options + '}'))();
        $(element)[type](options);
      });
    }
  }
  const siParser = new Parser();
  $.parser = siParser;
})(jQuery);