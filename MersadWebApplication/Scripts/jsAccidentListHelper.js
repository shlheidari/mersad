function Search() {
    var sort = "desc";
    if ($("#rdoAscSort").is(":checked")) sort = "Asc";
    $('[id*=selectsort]').text(sort);
    //var getId = id == "" ? $("#txtIdSearch").val() : id;
    var getStatus = $('input[type=radio][name=rdoStatus]:checked').val();
    var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
    if (getDateOfAccident == "Date") {
        getDateOfAccident = $("#txtDateRange").val().trim();
    }
    var getCrashType = $('input[type=radio][name=rdoIntensity]:checked').val();
    var startTime = $("#txtFromClock").val().replace("از ساعت : ", "");
    var endTime = $("#txtToClock").val().replace("تا ساعت : ", "");
    var getListId = GetURLParameter("ListId");
    var obj = {
        "status": getStatus == undefined ? "" : getStatus,
        "dateOfAccident": (getListId != null && getListId != "") || getDateOfAccident == undefined ? "" : getDateOfAccident,
        "timeAccidentStart": startTime,
        "timeAccidentEnd": endTime,
        "crashType": getCrashType == undefined ? "" : getCrashType,
        "serial": $("#txtSerial").val(),
        "sort": sort,
        "listId": (getListId == null || getListId == "") ? "" : getListId

    }
    $('#spinSearchLoading').show();
    //$('#btnSearch').button("loading");
    $.ajax({
        type: "POST",
        url: "AccidentList.aspx/GetAccidentGrid",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r != null) {
                var table = $("[id*=gridAccident]");
                if (r.d[0].Id == "0") {
                    $("#lblMessage").html(ErrorMessages(r.d[0].Serial));
                    return false;
                } else if (r.d[0].Id == "-1") {
                    table.find("tr:last-child").clone(true);
                    $("tr", table).not($("tr:first-child", table)).remove();
                    table.append("<tr><td colspan='11'>" + r.d[0].Serial + "</td></tr>");
                    return false;
                }
                table.find("tr:last-child").clone(true);
                $("tr", table).not($("tr:first-child", table)).remove();
                var hasTh = table.has('tbody tr th').length;
                if (hasTh === 0) {
                    //table.html('<tbody><tr><th scope="col" style="width:2%;">رديف</th><th scope="col">شماره گزارش</th><th scope="col">شماره سریال</th><th scope="col">تاریخ وقوع تصادف </th><th scope="col">ساعت ثبت گزارش</th><th scope="col">زمان ثبت گزارش در سیستم</th><th scope="col">شهرستان</th><th scope="col">موقعیت تصادف</th><th scope="col">نوع تصادف</th><th scope="col">وضعیت گزارش</th><th scope="col">مشاهده گزارش</th><th scope="col">ویرایش</th></tr></tbody>');
                    table.html('<tbody><tr><th scope="col" style="width:2%;">رديف</th><th scope="col">شماره گزارش</th><th scope="col">شماره سریال</th><th scope="col">تاریخ وقوع تصادف </th><th scope="col">ساعت ثبت گزارش</th><th scope="col">زمان ثبت گزارش در سیستم</th><th scope="col">موقعیت تصادف</th><th scope="col">نوع تصادف</th><th scope="col">وضعیت گزارش</th><th scope="col">مشاهده گزارش</th><th scope="col">ویرایش</th></tr></tbody>');
                }
                for (var i = 0; i < r.d.length; i++) {
                    var counter = i + 1;
                    table.append("<tr><td style='text-align:center;'>" + counter + "</td><td style='text-align:center;'>" + r.d[i].Id + "</td><td style='text-align:center;'>" + r.d[i].Serial + "</td><td style='text-align:center;'>" + r.d[i].DateOfAccident + "</td>" + "<td style='text-align:center;'>" + r.d[i].SubmitTime + "</td>" + "<td style='text-align:center;'>" + r.d[i].DateInsert + "</td>" +  "</td>+<td style='text-align:center;'>" + r.d[i].AccidentLocation + "</td><td style='text-align:center;'>" + r.d[i].AccidentType + "</td><td style='text-align:center;'>" + "<div class='row'><div class='col-9'><div class='' style='text-align:center;'>" + r.d[i].Status + "</div></div><div style='text-align:center;' class='col-3'><div style='float:left;text-align:center;'> </div></div></div></td><td style='text-align:center;'>" + '<a runat="server" target="_blank" href="/Moderator/Event/CheckAccident.aspx?Id=' + r.d[i].Id + '" title="مشاهده گزارش"><i class="fa fa-eye fa-2x"></i></a>' + '<i class="' + r.d[i].StatusIcon + '"></i>' + "</td><td style='text-align:center;'>" + '<a runat="server"   target="_self" href="/Moderator/Event/AccidentList.aspx?Del_Id=' + r.d[i].Id + '" title="حذف این گزارش"><i class="fa fa-trash fa-2x"></i></a>&nbsp; <a runat="server" target="_blank" href="/Moderator/Event/AddAccident.aspx?Id=' + r.d[i].Id + '" title="ویرایش"><i class="fa fa-edit fa-2x"></i></a>' + "</td></tr>");
                }
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSearchLoading').hide();
            //$("#btnSearch").button("reset");
        },
        failure: function (response) {

            alert(response.d);
        },
        error: function (response) {
            alert(response.d);

            if (response.status == 401) location.reload();
        }
    });
    return true;
}
document.addEventListener('DOMContentLoaded', function () {
    var getListId = GetURLParameter("ListId");
    if (getListId == null || getListId == "") return;
    Search();
});
function pageLoad() {
    $("#cmbExportFormat").select2({
        placeholder: {
            id: "-1",
            text: "سایر فرمت ها"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbExportSize").select2({
        placeholder: {
            id: "-1",
            text: "ابعاد خروجی"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#lnkAccidentList2").addClass("active");
    $('#dateDateRange').MdPersianDateTimePicker({
        targetTextSelector: '#txtDateRange',
        dateFormat: 'yyyy-MM-dd',
        isGregorian: false,
        enableTimePicker: false,
        englishNumber: true,
        modalMode: true,
        groupId: 'group1',
        rangeSelector: true
    });
}
function openDateRange() {
    var btn = document.getElementById("dateDateRange");
    btn.click(); event.preventDefault();
}
$(document).ready(function () {
    pageLoad();
    $("input[type='text']").on('blur', function () { $(".error").hide("slow"); });
    $('input[type=radio][name=rdoDate]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoDate]:checked').val();
        if (getVal == "Date") {
            $("#divShowDate").show('slow');
        } else {
            $("#divShowDate").hide('slow');
        }
    });

    $("#slider").slider({
        range: true,
        min: 0,
        max: 24,
        values: [0, 24],
        slide: function (event, ui) {
            $("#txtFromClock").val("از ساعت : " + ui.values[0]);
            $("#txtToClock").val("تا ساعت : " + ui.values[1]);
            Search();
        }
    });
    $(".filter").on('click', function () {
        $("#divDownload").hide();
        $("#divFilter").show();
        $(".filter").addClass("active");
        $(".download").removeClass("active");
    });
    $(".download").on('click', function () {
        $("#divFilter").hide();
        $("#divDownload").show();
        $(".download").addClass("active");
        $(".filter").removeClass("active");
    });
    $('input[type=radio][name=rdoStatus],input[type=radio][name=rdoIntensity]').on('change', function () {
        Search();
    });
    $('input[type=radio][name=rdoDate]').on('change', function () {
        var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
        if (getDateOfAccident !== "Date") {
            Search();
        }
    });
    $('#txtDateRange').on('change', function () {
        var getDateOfAccident = $('#txtDateRange').val();
        if (getDateOfAccident !== "") {
            Search();
        }
    });
    //$('#txtFromClock,#txtToClock').on('change', function () {
        
    //});
    $('#cmbExportFormat').on('change', function () {
        if ($("#cmbExportFormat").val() == "" || $("#cmbExportFormat").val() == "-1") return;
        $('input[type=radio][name=rdoExport]').prop("checked", false);
    });
    $('input[type=radio][name=RadioSort]').on('change', function () {



        Search("");
    });
});

function GoToPrint() {
    var getStatus = $('input[type=radio][name=rdoStatus]:checked').val();
    getStatus = getStatus == undefined ? "" : getStatus;
    var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
    if (getDateOfAccident == "Date") {
        getDateOfAccident = $("#txtDateRange").val().trim();
    }
    getDateOfAccident = getDateOfAccident == undefined ? "" : getDateOfAccident;
    var getCrashType = $('input[type=radio][name=rdoIntensity]:checked').val();
    getCrashType = getCrashType == undefined ? "" : getCrashType;
    var getSize = $('#cmbExportSize').val();
    var getExport = $('input[type=radio][name=rdoExport]:checked').val();
    if (($("#cmbExportFormat").val() == "" || $("#cmbExportFormat").val() == "-1") && getExport == undefined) {
        $("#lblMessage").html(ErrorMessages("برای خروجی گرفتن باید یکی از فرمتها را انتخاب کنید!"));
        return false;
    }
    if ((getSize == "" || getSize == "-1")) {
        $("#lblMessage").html(ErrorMessages("برای خروجی گرفتن باید ابعاد خروجی را انتخاب کنید!"));
        return false;
    }
    var getFormat = getExport == "" || getExport == undefined ? $('#cmbExportFormat').val() : getExport;
    var startTime = $("#txtFromClock").val().replace("از ساعت : ", "");
    var endTime = $("#txtToClock").val().replace("تا ساعت : ", "");
    var sor = $('[id*=selectsort]').val();
  
    window.open("/Moderator/Print/AccidentReport.aspx?Name=AccidentReport" + getSize + "&Format=" + getFormat + "&Status=" + getStatus + "&DateOfAccident=" + getDateOfAccident + "&TimeStart=" + startTime + "&TimeEnd=" + endTime + "&CrashType=" + getCrashType + "&Serial=" + $("#txtSerial").val() + "&sort=" + $('[id*=selectsort]').text(), '_blank');
}
