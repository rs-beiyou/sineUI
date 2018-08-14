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