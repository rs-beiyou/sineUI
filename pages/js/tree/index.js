$('#treeDemo1').tree({
    method:'get',
    url: '/pages/data/data2.json'
});
$('#treeDemo2').tree({
    method:'get',
    url: '/pages/data/data2.json',
    chkStyle: 'checkbox',
    chkboxType: 'link'
});
$('#treeDemo3').tree({
    method:'get',
    url: '/pages/data/data2.json',
    chkStyle: 'checkbox',
    chkboxType: {Y:'ps',N:''}
});
$('#treeDemo4').tree({
    method:'get',
    url: '/pages/data/asyncData.json?id=-1',
    autoParam: ['id','listname'],
    otherParam: {
        'aaa': 123
    }
});