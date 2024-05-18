function GetSlidShow() {
    var obj = {
        "test": "1"

    }
    $.ajax({
        type: "POST",
        url: "HadeseKhiz.aspx/GetList",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert(r.d[0].str)


        },
        complete: function (r) {
            console.log(r)


        },

    });
}
