$('#table').table({
    classes: 'si-table-fixed',
    fixedColumns: true,
    fixedNumber: 2,
    sidePagination: 'client',
    columns: [{
        checkbox: true
    }, {
        field: 'id',
        title: 'Item ID',
        width: 100
    }, {
        field: 'name',
        title: 'Item Name',
        width: 300
    }, {
        field: 'price',
        title: 'Item Price',
        width: 300
    }, {
        field: 'id',
        title: 'Item ID2',
        width: 100
    }, {
        field: 'name',
        title: 'Item Name2',
        width: 300
    }, {
        field: 'price',
        title: 'Item Price2',
        width: 300
    }, {
        field: 'id',
        title: 'Item ID3',
        width: 100
    }, {
        field: 'name',
        title: 'Item Name3',
        width: 300
    }, {
        field: 'price',
        title: 'Item Price3',
        width: 300
    }],
    data: [{
        id: 1,
        name: 'Item 1',
        price: '¥ 1'
    }, {
        id: 2,
        name: 'Item 2',
        price: '¥ 2'
    }, {
        id: 3,
        name: 'Item 3',
        price: '¥ 3'
    }, {
        id: 4,
        name: 'Item 1',
        price: '¥ 1'
    }, {
        id: 5,
        name: 'Item 2',
        price: '¥ 2'
    }, {
        id: 6,
        name: 'Item 3',
        price: '¥ 3'
    }, {
        id: 7,
        name: 'Item 1',
        price: '¥ 1'
    }, {
        id: 2,
        name: 'Item 2',
        price: '¥ 2'
    }, {
        id: 8,
        name: 'Item 3',
        price: '¥ 3'
    }, {
        id: 9,
        name: 'Item 1',
        price: '¥ 1'
    }, {
        id: 10,
        name: 'Item 2',
        price: '¥ 2'
    }, {
        id: 11,
        name: 'Item 3',
        price: '¥ 3'
    }, {
        id: 9,
        name: 'Item 1',
        price: '¥ 1'
    }, {
        id: 10,
        name: 'Item 2',
        price: '¥ 2'
    }, {
        id: 11,
        name: 'Item 3',
        price: '¥ 3'
    }, {
        id: 9,
        name: 'Item 1',
        price: '¥ 1'
    }, {
        id: 10,
        name: 'Item 2',
        price: '¥ 2'
    }, {
        id: 11,
        name: 'Item 3',
        price: '¥ 3'
    }, {
        id: 9,
        name: 'Item 1',
        price: '¥ 1'
    }, {
        id: 10,
        name: 'Item 2',
        price: '¥ 2'
    }, {
        id: 11,
        name: 'Item 3',
        price: '¥ 3'
    }, {
        id: 9,
        name: 'Item 1',
        price: '¥ 1'
    }, {
        id: 10,
        name: 'Item 2',
        price: '¥ 2'
    }, {
        id: 11,
        name: 'Item 3',
        price: '¥ 3'
    }, {
        id: 9,
        name: 'Item 1',
        price: '¥ 1'
    }, {
        id: 10,
        name: 'Item 2',
        price: '¥ 2'
    }, {
        id: 11,
        name: 'Item 3',
        price: '¥ 3'
    }, {
        id: 9,
        name: 'Item 1',
        price: '¥ 1'
    }, {
        id: 10,
        name: 'Item 2',
        price: '¥ 2'
    }, {
        id: 11,
        name: 'Item 3',
        price: '¥ 3'
    }, {
        id: 9,
        name: 'Item 1',
        price: '¥ 1'
    }, {
        id: 10,
        name: 'Item 2',
        price: '¥ 2'
    }, {
        id: 11,
        name: 'Item 3',
        price: '¥ 3'
    }, {
        id: 9,
        name: 'Item 1',
        price: '¥ 1'
    }, {
        id: 10,
        name: 'Item 2',
        price: '¥ 2'
    }, {
        id: 11,
        name: 'Item 3',
        price: '¥ 3'
    }, {
        id: 9,
        name: 'Item 1',
        price: '¥ 1'
    }, {
        id: 10,
        name: 'Item 2',
        price: '¥ 2'
    }, {
        id: 11,
        name: 'Item 3',
        price: '¥ 3'
    }]
});
var msgHeight = $('.si-info').outerHeight(true);
var pageHeight = $('.si-container-page').height();
new $.componentLinker({
    trigger: '.panel',
    follower: '#table',
    event: 'shown.bs.collapse hidden.bs.collapse',
    callback: function(trigger, follower){
        follower.table('resetView', {
            height: pageHeight - trigger.outerHeight(true) - msgHeight
        })
    }
})
