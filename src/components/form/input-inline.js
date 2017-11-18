export default class InputInline {
  constructor(el, options) {
    this.$element = $(el);
    this.options = options;
  }
  setLabel() {
    let op = this.options;
    // label
    let _label = op.label ? document.createElement('label') : null;
    _label ? $(_label).addClass('control-label').html(op.label) : false;
    return _label;
  }
  setInputGroup(type) {
    let op = this.options;
    let _inputGroup = document.createElement('div');
    // input/textarea
    let _input = this.inputDom ? this.inputDom : document.createElement('input');
    $(_input).attr({
      type: type,
      name: op.name,
      id: op.id
    }).addClass('form-control');
    if (op.value) $(_input).val(op.value);
    if (op.placeholder) $(_input).attr('placeholder', op.placeholder);
    if (op.width) $(_input).css('width', op.width);
    $(_inputGroup).addClass('input-inline').html(_input);
    return {
      inputGroup: _inputGroup,
      input: _input
    };
  }
  set(option) {
    Object.assign(this.options, option || {});
    let _fragemnet = document.createDocumentFragment();
    let _labelDom = this.setLabel();
    let group = this.setInputGroup();
    let _inputGroupDom = group.inputGroup;
    $(_fragemnet).append(_labelDom).append(_inputGroupDom);
    $(this.labelDom).remove();
    $(this.inputGroupDom).attr('display', 'none').after(_fragemnet).remove();
    this.inputGroupDom = _inputGroupDom;
    this.labelDom = _labelDom;
  }
}