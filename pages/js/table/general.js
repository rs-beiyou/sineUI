$('#table1').table({
    pagination: false,
    columns: [{
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
    classes: 'table-no-bordered',
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
$('#table5').table({
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
        title: 'Item Price',
        events: {
            'click .myclass': function(e, value, row, index){
                e.stopPropagation();//防勾选
                $.alert(value);
            }
        },
        formatter: function(value, row, index, field){
            var color;
            switch(value){
                case '2': color = 'green';
                break;
                case '0': color = 'red';
                break;
                default: color = 'blue';
                break;
            }
            return '<span class="myclass" style="color:'+color+'">¥ '+value+'</span>';
        }
    }],
    data:[
        {
            "id": 0,
            "name": "Item 0",
            "price": '0'
        },
        {
            "id": 1,
            "name": "Item 2",
            "price": '1'
        },
        {
            "id": 2,
            "name": "Item 1",
            "price": '2'
        }
    ]
});
$('#table6').table({
    classes: 'si-table-fixed',
    pagination: false,
    height: 300,
    columns: [{
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
    }],
    data: [{
        id: 1,
        name: '我这句话真的很长很长，我自己都出不清楚有多少个字啊啊啊啊啊啊啊啊啊啊',
        price: '¥ 1'
    }, {
        id: 2,
        name: 'Item 2',
        price: '我这句话真的很长很长，我自己都出不清楚有多少个字啊啊啊啊啊啊啊啊啊啊'
    }, {
        id: '我这句话真的很长很长，我自己都出不清楚有多少个字啊啊啊啊啊啊啊啊啊啊',
        name: 'Item 3',
        price: '¥ 3'
    }, {
        id: 1,
        name: '我这句话真的很长很长，我自己都出不清楚有多少个字啊啊啊啊啊啊啊啊啊啊',
        price: '¥ 1'
    }, {
        id: 2,
        name: 'Item 2',
        price: '我这句话真的很长很长，我自己都出不清楚有多少个字啊啊啊啊啊啊啊啊啊啊'
    }, {
        id: '我这句话真的很长很长，我自己都出不清楚有多少个字啊啊啊啊啊啊啊啊啊啊',
        name: 'Item 3',
        price: '¥ 3'
    }, {
        id: 1,
        name: '我这句话真的很长很长，我自己都出不清楚有多少个字啊啊啊啊啊啊啊啊啊啊',
        price: '¥ 1'
    }, {
        id: 2,
        name: 'Item 2',
        price: '我这句话真的很长很长，我自己都出不清楚有多少个字啊啊啊啊啊啊啊啊啊啊'
    }, {
        id: '我这句话真的很长很长，我自己都出不清楚有多少个字啊啊啊啊啊啊啊啊啊啊',
        name: 'Item 3',
        price: '¥ 3'
    }]
});
$('#table7').table({
    classes: 'si-table-fixed',
    pagination: false,
    fixedColumns: true,
    fixedNumber: 2,
    height: 300,
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