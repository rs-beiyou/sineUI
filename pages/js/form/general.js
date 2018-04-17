$('#form1').form({
  list: [{
    label: '姓名：',
    type: 'textbox',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5'
  }, {
    label: '爱好：',
    type: 'checkbox',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5',
    data: [{
      key:'打篮球',
      value: '1'
    },{
      key:'踢足球',
      value: '2'
    },{
      key:'电脑游戏',
      value: '3'
    },{
      key:'读书',
      value: '4'
    }]
  }, {
    label: '性别：',
    type: 'radiobox',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5',
    data: [{
      key:'男',
      value: '1'
    },{
      key:'女',
      value: '0'
    }]
  }, {
    label: '生日：',
    type: 'datebox',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5'
  }, {
    label: '某选项：',
    type: 'selectbox',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5',
    url: 'https://easy-mock.com/mock/58ff251d5e43ae5dbea5f48c/sineUI/list'
  }, {
    label: '是否婚配：',
    labelWidth: 'col-sm-3 col-md-2',
    inputWidth: 'col-xs-9 col-sm-5',
    type: 'switchbox'
  }, {
    label: '附件：',
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