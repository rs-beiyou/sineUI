$('#form1').form({
  hasPanel: true,
  title: '带有panel的表单',
  list: [{
    label: 'textbox：',
    name: 'aa',
    id: 'aa',
    type: 'textbox'
  }, {
    label: 'password：',
    name: 'bb',
    id: 'bb',
    type: 'passwordbox'
  }, {
    label: 'checkbox：',
    name: 'dd',
    id: 'dd',
    type: 'checkbox',
    value: '2,3',
    url: 'https://easy-mock.com/mock/58ff251d5e43ae5dbea5f48c/sineUI/list'
  }, {
    label: 'radiobox：',
    name: 'dd',
    id: 'dd',
    type: 'radiobox',
    value: '1',
    url: 'https://easy-mock.com/mock/58ff251d5e43ae5dbea5f48c/sineUI/list'
  }]
});