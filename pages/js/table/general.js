$('#table1').table({
    pagination: false,
    columns: [{
        field: 'id',
        title: 'Item ID'
    }, {
        field: 'name',
        title: 'Item Name'
    }, {
        field: 'price',
        title: 'Item Price'
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
    }]
});

$('#table2').table({
    classes: 'table table-hover table-no-bordered',
    pagination: false,
    columns: [{
        field: 'id',
        title: 'Item ID'
    }, {
        field: 'name',
        title: 'Item Name'
    }, {
        field: 'price',
        title: 'Item Price'
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
    }]
});

$('#table3').table({
    method:'get',
    // queryParams: function(params){
    //     return params;
    // },
    sidePagination:'client',
    pagination: false,
    columns: [{
        field: 'id',
        title: 'Item ID',
        sortable: true
    }, {
        field: 'name',
        title: 'Item Name',
        sortable: true
    }, {
        field: 'price',
        title: 'Item Price',
        sortable: true
    }],
    data:[
        {
            "id": 0,
            "name": "Item 0",
            "price": "$0"
        },
        {
            "id": 1,
            "name": "Item 2",
            "price": "$1"
        },
        {
            "id": 2,
            "name": "Item 1",
            "price": "$2"
        }
    ]
});
$('#table4').table({
    pagination: false,
    columns: [{
        checkbox: true
    }, {
        field: 'id',
        title: 'Item ID'
    }, {
        field: 'name',
        title: 'Item Name'
    }, {
        field: 'price',
        title: 'Item Price'
    }],
    data:[
        {
            "id": 0,
            "name": "Item 0",
            "price": "$0"
        },
        {
            "id": 1,
            "name": "Item 2",
            "price": "$1"
        },
        {
            "id": 2,
            "name": "Item 1",
            "price": "$2"
        }
    ]
});