var $ = require('./jquery')

var store = {
    cover : {        
        need_pay : null,
        title : null,
        cover_text : null,
        test_time : null,
    },

    user : {

    },
} ;

function query(url, param) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type : "POST",
            url : url,
            data : param,
            timeout : 180000             
        }).done(function(data) {
            if (typeof data == 'string')
                data = JSON.parse(data) ;
            resolve(data) ;
        }) ;
    })
}

// 为啥这样写在android上正常，ios里根本就像没执行过一样?
function fetch_query(url, param) {
    var data = new FormData();
    data.append( "json", JSON.stringify( param ) );

    var option = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        method : 'POST', 
        credentials : 'include', 
        body : JSON.stringify(param),
    } ;
    return fetch(url, option).then((res) => res.json()) ;
}

export { store, query } ;