$('#form1').form({
  list: [{
    label: 'Name：',
    type: 'textbox',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5'
  }, {
    label: 'checkbox：',
    type: 'checkbox',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5',
    data: [{
      key:'1111',
      value: '1111'
    },{
      key:'2222',
      value: '2222'
    },{
      key:'3333',
      value: '3333'
    },{
      key:'4444',
      value: '4444'
    }]
  }, {
    label: 'radiobox：',
    type: 'radiobox',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5',
    data: [{
      key:'1111',
      value: '1111'
    },{
      key:'2222',
      value: '2222'
    },{
      key:'3333',
      value: '3333'
    },{
      key:'4444',
      value: '4444'
    }]
  }, {
    label: 'selectbox：',
    type: 'selectbox',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5',
    url: 'https://easy-mock.com/mock/58ff251d5e43ae5dbea5f48c/sineUI/list'
  }, {
    label: 'switchbox：',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5',
    type: 'switchbox'
  }, {
    label: 'filebox：',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5',
    type: 'filebox'
  }]
});

$('#form2').form({
  list: [{
    label: 'textbox：',
    type: 'textbox',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5',
    valid: {
      type:'length',
      length:[1,5]
    }
  }, {
    label: 'checkbox：',
    type: 'checkbox',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5',
    data: [{
      key:'1111',
      value: '1111'
    },{
      key:'2222',
      value: '2222'
    },{
      key:'3333',
      value: '3333'
    },{
      key:'4444',
      value: '4444'
    }],
    valid: {
      required: true
    }
  }, {
    label: 'radiobox：',
    type: 'radiobox',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5',
    data: [{
      key:'1111',
      value: '1111'
    },{
      key:'2222',
      value: '2222'
    },{
      key:'3333',
      value: '3333'
    },{
      key:'4444',
      value: '4444'
    }],
    valid: {
      required: true
    }
  }, {
    label: 'selectbox：',
    type: 'selectbox',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5',
    url: 'https://easy-mock.com/mock/58ff251d5e43ae5dbea5f48c/sineUI/list',
    valid:{
      required:true
    }
  }]
});