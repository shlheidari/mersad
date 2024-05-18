const d = Date.now();
var getNow = new Intl.DateTimeFormat('fa-IR-u-nu-latn').format(d);
var year = getNow.split('/')[0];

function pageLoad() {
    $("#cmbLocationArea").select2({
        placeholder: {
            id: "-1",
            text: "محدوده مکانی"
        },
        allowClear: true,
        dir: 'rtl'
    });
    $("#cmbCity").select2({
        placeholder: {
            id: "-1",
            text: "انتخاب شهرستان"
        },
        allowClear: true,
        dir: 'rtl'
    });
    $("#cmbInNativeArea").select2({
        placeholder: {
            id: "-1",
            text: "حوزه نفوذ"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbAxis").select2({
        placeholder: {
            id: "-1",
            text: "انتخاب محور"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbExportFormat").select2({
        placeholder: {
            id: "-1",
            text: "سایر فرمت ها"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbExportSize").select2({
        placeholder: {
            id: "-1",
            text: "ابعاد خروجی"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#lnkLocationAnalysis").addClass("active");
}
function FillCity() {
    let obj = {
        "provinceId": "13"
    }
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "/Moderator/Report/EventProcess.aspx/GetFillCity",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess !== "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var optionVal = '';
                    $('#cmbCity').html('<option selected="" value="-1">انتخاب شهرستان</option>');
                    for (i = 0; i < msg.d.length; i++) {
                        var txt = msg.d[i].Message;
                        var id = msg.d[i].Id;
                        optionVal += '<option value="' + id + '">' + txt + '</option>';
                    }
                    $('#cmbCity').append(optionVal);
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSearchLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
}
function FillLocationArea() {
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "/Moderator/Analysis/TimeAnalysis.aspx/GetFillComboLocationArea",
        //data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess !== "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var optionVal = '';
                    for (i = 0; i < msg.d.length; i++) {
                        var txt = msg.d[i].Message;
                        var id = msg.d[i].Id;
                        optionVal += '<option value="' + id + '">' + txt + '</option>';
                    }
                    $('#cmbLocationArea').append(optionVal);
                    $('#cmbLocationArea').trigger("change");
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSearchLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
}
let setFirstYear = "";
let setLastYear = "";
$(document).ready(function () {
    pageLoad();
    $("#btnAddLocationArea").on('click', function () {
        if ($("#divAddLocationArea").hasClass('hide')) {
            $("#divAddLocationArea").removeClass('hide');
            $("#btnAddLocationArea").hide('slow');
            $("#cmbLocationArea").next().hide('slow');
            $("#txtLocationAreaName").focus();
        }
    });
    $("#cmbLocationArea").on('change', function () {
        //$('input[type=radio][name=rdoAccident]:checked').trigger("change");
        let getId = $(this).val();
        let obj = {
            "getId": getId
        }
        $('#spinSearchLoading').show();
        $.ajax({
            type: "POST",
            url: "/Moderator/Analysis/TimeAnalysis.aspx/GetFillYear",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg != null) {
                    if (msg.d.length == 0) {
                        $('#divTitleDescription').html("تعداد اطلاعات ثبت شده برای این گزارش کافی نمی باشد!");
                    }
                    else if (msg.d[0].IsSuccess !== "true") {
                        $("#lblMessage").html(CreateModal(msg.d[0].Message));
                        $('#MessageModal').modal();
                    } else {
                        if (msg.d.length == 1) {
                            setFirstYear = msg.d[0].Message;
                            setLastYear = msg.d[0].MessageTwo;
                        } else {
                            for (var i = 0; i < msg.d.length; i++) {
                                if (i === 0)
                                    setFirstYear = msg.d[i].Message;
                                else if (i == msg.d.length - 1)
                                    setLastYear = msg.d[i].Message;
                            }
                        }
                    }
                } else {
                    alert("خطا در برقراری ارتباط با سرور!");
                }
            },
            complete: function () {
                $('#spinSearchLoading').hide();
                GetTitleLocationAnalysis();
                //Get5MonthThisYear();
            },
            error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
                alert(response.d);
            }
        });
    });
    $('input[type=radio][name=rdoLocation]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoLocation]:checked').val();
        if (getVal === "City") {
            $("#divCity").show('slow');
            if ($('#divAxis').css('display') !== 'none') {
                $("#divAxis").hide('slow');
                $('#cmbAxis').val("-1").trigger("change");
            }
            if ($('#divInNativeArea').css('display') !== 'none') {
                $("#divInNativeArea").hide('slow');
                $('#cmbInNativeArea').val("-1").trigger("change");
            }
            FillCity();
        } else if (getVal === "Axis") {
            if ($('#divCity').css('display') !== 'none') {
                $("#divCity").hide('slow');
                $('#cmbCity').val("-1").trigger("change");
            }
            let obj = {
                "provinceId": "13"
            }
            $('#spinSearchLoading').show();
            $.ajax({
                type: "POST",
                url: "/Moderator/Report/EventProcess.aspx/GetFillAxis",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg != null) {
                        if (msg.d.length == 0) {
                            $('#cmbAxis').html('<option selected="" value="-1">انتخاب محور</option>');
                        }
                        else if (msg.d[0].IsSuccess !== "true") {
                            $("#lblMessage").html(CreateModal(msg.d[0].Message));
                            $('#MessageModal').modal();
                        } else {
                            var optionVal = '';
                            $('#cmbAxis').html('<option selected="" value="-1">انتخاب محور</option>');
                            for (i = 0; i < msg.d.length; i++) {
                                var txt = msg.d[i].Message;
                                var id = msg.d[i].Id;
                                optionVal += '<option value="' + id + '">' + txt + '</option>';
                            }
                            $('#cmbAxis').append(optionVal);
                        }
                    } else {
                        alert("خطا در برقراری ارتباط با سرور!");
                    }
                },
                complete: function () {
                    $('#spinSearchLoading').hide();
                    $("#divAxis").show('slow');
                },
                error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
                    alert(response.d);
                }
            });
        }
        else {
            $("#divCity,#divAxis").hide('slow');
            $('#cmbCity,#cmbAxis').val("-1").trigger("change");
        }
    });
    $('#btnSubmitLocationArea').on('click', function () {
        let txtLocationAreaName = $('#txtLocationAreaName').val();
        if (txtLocationAreaName === "") {
            $("#lblMessage").html(CreateModal("نام محدوده مکانی را وارد نمایید!"));
            $('#MessageModal').modal();
            $("#txtLocationAreaName").focus();
            return;
        }
        let cmbCity = $('#cmbCity').val();
        if (cmbCity === "" || cmbCity === "-1" || cmbCity === null) {
            $("#lblMessage").html(CreateModal("شهرستان را انتخاب نمایید!"));
            $('#MessageModal').modal();
            $('#txtEventName').focus();
            return;
        }
        let cmbInNativeArea = $("#cmbInNativeArea").val();
        let cmbAxis = $("#cmbAxis").val();
        var obj = {
            "locationAreaName": txtLocationAreaName,
            "cityId": cmbCity,
            "inNativeArea": cmbInNativeArea === '-1' ? "" : cmbInNativeArea,
            "axisId": cmbAxis === '-1' ? "" : cmbAxis
        }
        $('#spinSearchLoading').show();
        $.ajax({
            type: "POST",
            url: "TimeAnalysis.aspx/SaveLocationArea",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg != null) {
                    if (msg.d[0].IsSuccess !== "true") {
                        $("#lblMessage").html(CreateModal(msg.d[0].Message));
                        $('#MessageModal').modal();
                    } else {
                        $("#lblMessage").html(CreateModal(msg.d[0].Message));
                        $('#MessageModal').modal();
                        $("#divAddLocationArea").addClass('hide');
                        $("#btnAddLocationArea").show('slow');
                        $('#cmbLocationArea').append('<option value="' + msg.d[0].Id + '">' + txtLocationAreaName + '</option>');
                        $("#cmbLocationArea").next().show('slow');
                    }
                } else {
                    alert("خطا در برقراری ارتباط با سرور!");
                }
            },
            complete: function () {
                $('#spinSearchLoading').hide();
            },
            error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
                alert(response.d);
            }
        });
    });
    $("#cmbCity").on('change', function () {
        var getCity = $('#cmbCity').val();
        var getProvince = $('#cmbProvinceSearch').val();
        if (getProvince == "-1") return;
        if (getCity !== "" && getCity !== null) {
            $('#divInNativeArea').show("slow");
            if (getCity == "-1") {
                $('#cmbInNativeArea').val("-1").trigger("change");
                $('#divInNativeArea').hide("slow");
            }
        }
    });
    $("#btnCancelLocationArea").on('click', function () {
        $("#divAddLocationArea").addClass('hide');
        $("#btnAddLocationArea").show('slow');
        $("#cmbLocationArea").next().show('slow');
    });
    $("#btnGoToPrint").on('click', function () {
        let height = $("#divPrintScreen").height();
        let width = $("#divPrintScreen").width();
        let getExport = $('input[type=radio][name=rdoExport]:checked').val();
        let getSize = $("#cmbExportSize").val();
        //getExport = ($("#cmbExportFormat").val() !== "" && $("#cmbExportFormat").val() !== "-1") ? $("#cmbExportFormat").val() : getExport;
        if (getExport == undefined) {
            $("#lblMessage").html(CreateModal("برای خروجی گرفتن باید یکی از فرمتها را انتخاب کنید!"));
            $('#MessageModal').modal();
            return false;
        }
        if ((getSize == "" || getSize == "-1")) {
            $("#lblMessage").html(CreateModal("برای خروجی گرفتن باید ابعاد خروجی را انتخاب کنید!"));
            $('#MessageModal').modal();
            return false;
        }

        if (getExport == "Pdf") {
            html2canvas(document.getElementById("divPrintScreen"), {
                scale: 2,
                width: width,
                height: height,
                useCORS: true,
            }).then(function (canvas) {
                //var img = canvas.toDataURL("image/png", 1);
                var img = canvas.toDataURL("image/jpeg", 1);
                //var doc = new jsPDF('L', 'mm', [297, 210]);
                var doc = new jsPDF('L', 'mm', getSize);
                let ratio = getSize === "A4" ? 0.257 : 0.182;
                doc.addImage(img, 'jpeg', 0, 0, width * ratio, height * ratio);
                doc.save('TimeAnalysis' + getNow + '.pdf');
            });
        }
        else if (getExport == "Word") {
            html2canvas(document.getElementById("divPrintScreen"), {
                scale: 2,
                width: width,
                height: height,
                useCORS: true,
            }).then(function (canvas) {
                //var img = canvas.toDataURL("image/png", 1);
                let img = canvas.toDataURL("image/jpeg", 1).replace("image/jpeg", "image/octet-stream");;
                let imgToWord = document.getElementById("imgConvert");
                imgToWord.src = img;
                Export2Doc("divConvertImg", 'LocationAnalysis' + getNow);
            });
        }
        else if (getExport == "Jpg" || getExport == "Png") {
            html2canvas(document.getElementById("divPrintScreen"), {
                scale: 2,
                width: width,
                height: height,
                useCORS: true,
            }).then(function (canvas) {
                let img = canvas.toDataURL("image/" + getExport.toLowerCase(), 1).replace("image/" + getExport.toLowerCase(), "image/octet-stream");
                let a = document.createElement('a');
                a.href = img;
                a.download = 'TimeAnalysis' + getNow + '.' + getExport.toLowerCase();
                a.click();
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    FillLocationArea();
    //TextLocationAnalysis();
}, false);
function GetTitleLocationAnalysis() {
    let getId = $("#cmbLocationArea").val();
    let cityId = "";
    let obj = {
        "getId": getId
    }
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "/Moderator/Analysis/TimeAnalysis.aspx/GetFillTitleLocationArea",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d.length == 0) {
                    $('#divTitleDescription').html("تعداد اطلاعات ثبت شده برای این گزارش کافی نمی باشد!");
                }
                else if (msg.d[0].IsSuccess !== "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                    $('#divTitleDescription').html("");
                } else {
                    let cityName = msg.d[0].Message;
                    let cityEnName = msg.d[0].MessageFive;
                    let axisName = msg.d[0].MessageTwo;
                    let inNativeArea = msg.d[0].MessageThree;
                    if (inNativeArea == "True") inNativeArea = "درون‌ شهری";
                    else if (inNativeArea == "False") inNativeArea = "برون‌ شهری";
                    else inNativeArea = "درون‌ شهری" + " و " + "برون‌ شهری";
                    if (axisName !== null && axisName !== "null" && axisName !== "") axisName = " در محور " + axisName;
                    else axisName = "";
                    $('#divTitleDescription').html("شهرستان " + cityName + " " + "در محدوده " + inNativeArea + axisName + " براساس تحلیل داده های تصادفات از تاریخ " + setFirstYear + "/01/01" +
                        " تا تاریخ " + setLastYear + " نسبت به سایر واحدهای مکانی هم سطح، در موارد زیر عملکرد ضعیف تری داشته و نیازمند رسیدگی و اصلاح است : ");
                    cityId = msg.d[0].MessageFour;
                    getColorForMap(cityEnName);
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSearchLoading').hide();
            GetLocationAnalysis(cityId);
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
}
function GetLocationAnalysis(cityId) {
    let getId = $("#cmbLocationArea").val();
    let obj = {
        "getId": getId
    }
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "/Moderator/Analysis/LocationAnalysis.aspx/GetLocationAnalysis",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d.length == 0) {
                    $("#divDescription").html("تعداد اطلاعات ثبت شده برای این گزارش کافی نمی باشد!");
                    $('#divTitleDescription').html("");
                }
                else if (msg.d[0].Var2 === "false") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Var1));
                    $('#MessageModal').modal();
                } else {
                    let getHtml = "";
                    getHtml = LocationAnalysis(cityId, msg);
                    $("#divDescription").html(getHtml);
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSearchLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
}
function RandomNumber(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
function LocationAnalysis(cityId, msg) {
    let ret = "";
    let inputVal1 = "0", inputVal2 = "0", inputVal3 = "0", inputVal4 = "0", inputVal5 = "0", inputVal6 = "0", inputVal7 = "0", inputVal8 = "0", inputVal9 = "0",
        inputVal10 = "0", inputVal11 = "0", inputVal12 = "0", inputVal13 = "0", inputVal14 = "0", inputVal15 = "0", inputVal16 = "0", inputVal17 = "0", inputVal18 = "0",
        inputVal19 = "0", inputVal20 = "0", inputVal21 = "0", inputVal22 = "0", inputVal23 = "0", inputVal24 = "0", inputVal25 = "0", inputVal26 = "0", inputVal27 = "0";
    let inputCharakVal1 = [], inputCharakVal2 = [], inputCharakVal3 = [], inputCharakVal4 = [], inputCharakVal5 = [], inputCharakVal6 = [], inputCharakVal7 = [],
        inputCharakVal8 = [], inputCharakVal9 = [], inputCharakVal10 = [], inputCharakVal11 = [], inputCharakVal12 = [], inputCharakVal13 = [], inputCharakVal14 = [],
        inputCharakVal15 = [], inputCharakVal16 = [], inputCharakVal17 = [], inputCharakVal18 = [], inputCharakVal19 = [], inputCharakVal20 = [], inputCharakVal21 = [],
        inputCharakVal22 = [], inputCharakVal23 = [], inputCharakVal24 = [], inputCharakVal25 = [], inputCharakVal26 = [], inputCharakVal27 = [];
    for (i = 0; i < msg.d.length; i++) {
        if (msg.d[i].CityId === cityId) {
            inputVal1 = msg.d[i]["Var1"];
            inputVal2 = msg.d[i]["Var2"];
            inputVal3 = msg.d[i]["Var3"];
            inputVal4 = msg.d[i]["Var4"];
            inputVal5 = msg.d[i]["Var5"];
            inputVal6 = msg.d[i]["Var6"];
            inputVal7 = msg.d[i]["Var7"];
            inputVal8 = msg.d[i]["Var8"];
            inputVal9 = msg.d[i]["Var9"];
            inputVal10 = msg.d[i]["Var10"];
            inputVal11 = msg.d[i]["Var11"];
            inputVal12 = msg.d[i]["Var12"];
            inputVal13 = msg.d[i]["Var13"];
            inputVal14 = msg.d[i]["Var14"];
            inputVal15 = msg.d[i]["Var15"];
            inputVal16 = msg.d[i]["Var16"];
            inputVal17 = msg.d[i]["Var17"];
            inputVal18 = msg.d[i]["Var18"];
            inputVal19 = msg.d[i]["Var19"];
            inputVal20 = msg.d[i]["Var20"];
            inputVal21 = msg.d[i]["Var21"];
            inputVal22 = msg.d[i]["Var22"];
            inputVal23 = msg.d[i]["Var23"];
            inputVal24 = msg.d[i]["Var24"];
            inputVal25 = msg.d[i]["Var25"];
            inputVal26 = msg.d[i]["Var26"];
            inputVal27 = msg.d[i]["Var27"];
        } else {
            inputCharakVal1.push(msg.d[i]["Var1"]);
            inputCharakVal2.push(msg.d[i]["Var2"]);
            inputCharakVal3.push(msg.d[i]["Var3"]);
            inputCharakVal4.push(msg.d[i]["Var4"]);
            inputCharakVal5.push(msg.d[i]["Var5"]);
            inputCharakVal6.push(msg.d[i]["Var6"]);
            inputCharakVal7.push(msg.d[i]["Var7"]);
            inputCharakVal8.push(msg.d[i]["Var8"]);
            inputCharakVal9.push(msg.d[i]["Var9"]);
            inputCharakVal10.push(msg.d[i]["Var10"]);
            inputCharakVal11.push(msg.d[i]["Var11"]);
            inputCharakVal12.push(msg.d[i]["Var12"]);
            inputCharakVal13.push(msg.d[i]["Var13"]);
            inputCharakVal14.push(msg.d[i]["Var14"]);
            inputCharakVal15.push(msg.d[i]["Var15"]);
            inputCharakVal16.push(msg.d[i]["Var16"]);
            inputCharakVal17.push(msg.d[i]["Var17"]);
            inputCharakVal18.push(msg.d[i]["Var18"]);
            inputCharakVal19.push(msg.d[i]["Var19"]);
            inputCharakVal20.push(msg.d[i]["Var20"]);
            inputCharakVal21.push(msg.d[i]["Var21"]);
            inputCharakVal22.push(msg.d[i]["Var22"]);
            inputCharakVal23.push(msg.d[i]["Var23"]);
            inputCharakVal24.push(msg.d[i]["Var24"]);
            inputCharakVal25.push(msg.d[i]["Var25"]);
            inputCharakVal26.push(msg.d[i]["Var26"]);
            inputCharakVal27.push(msg.d[i]["Var27"]);
        }
    }
    let charakInAccident0 = getBoxValues(inputCharakVal1.sort(sortDesc));
    let charakInAccident1 = getBoxValues(inputCharakVal2.sort(sortDesc));
    let charakInAccident2 = getBoxValues(inputCharakVal3.sort(sortDesc));
    let charakInAccident3 = getBoxValues(inputCharakVal4.sort(sortDesc));
    let charakInAccident4 = getBoxValues(inputCharakVal5.sort(sortDesc));
    let charakInAccident5 = getBoxValues(inputCharakVal6.sort(sortDesc));
    let charakInAccident6 = getBoxValues(inputCharakVal7.sort(sortDesc));
    let charakInAccident7 = getBoxValues(inputCharakVal8.sort(sortDesc));
    let charakInAccident8 = getBoxValues(inputCharakVal9.sort(sortDesc));
    let charakInAccident9 = getBoxValues(inputCharakVal10.sort(sortDesc));
    let charakInAccident10 = getBoxValues(inputCharakVal11.sort(sortDesc));
    let charakInAccident11 = getBoxValues(inputCharakVal12.sort(sortDesc));
    let charakInAccident12 = getBoxValues(inputCharakVal13.sort(sortDesc));
    let charakInAccident13 = getBoxValues(inputCharakVal14.sort(sortDesc));
    let charakInAccident14 = getBoxValues(inputCharakVal15.sort(sortDesc));
    let charakInAccident15 = getBoxValues(inputCharakVal16.sort(sortDesc));
    let charakInAccident16 = getBoxValues(inputCharakVal17.sort(sortDesc));
    let charakInAccident17 = getBoxValues(inputCharakVal18.sort(sortDesc));
    let charakInAccident18 = getBoxValues(inputCharakVal19.sort(sortDesc));
    let charakInAccident19 = getBoxValues(inputCharakVal20.sort(sortDesc));
    let charakInAccident20 = getBoxValues(inputCharakVal21.sort(sortDesc));
    let charakInAccident21 = getBoxValues(inputCharakVal22.sort(sortDesc));
    let charakInAccident22 = getBoxValues(inputCharakVal23.sort(sortDesc));
    let charakInAccident23 = getBoxValues(inputCharakVal24.sort(sortDesc));
    let charakInAccident24 = getBoxValues(inputCharakVal25.sort(sortDesc));
    let charakInAccident25 = getBoxValues(inputCharakVal26.sort(sortDesc));
    let charakInAccident26 = getBoxValues(inputCharakVal27.sort(sortDesc));
    if (parseFloat(charakInAccident0[4]) <= parseFloat(inputVal1))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(1) + "</span><br>";
    if (parseFloat(charakInAccident1[4]) <= parseFloat(inputVal2))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(2) + "</span><br>";
    if (parseFloat(charakInAccident2[4]) <= parseFloat(inputVal3))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(3) + "</span><br>";
    if (parseFloat(charakInAccident3[4]) <= parseFloat(inputVal4))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(4) + "</span><br>";
    if (parseFloat(charakInAccident4[4]) <= parseFloat(inputVal5))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(5) + "</span><br>";
    if (parseFloat(charakInAccident5[4]) <= parseFloat(inputVal6))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(6) + "</span><br>";
    if (parseFloat(charakInAccident6[4]) <= parseFloat(inputVal7))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(7) + "</span><br>";
    if (parseFloat(charakInAccident7[4]) <= parseFloat(inputVal8))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(8) + "</span><br>";
    if (parseFloat(charakInAccident8[4]) <= parseFloat(inputVal9))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(9) + "</span><br>";
    if (parseFloat(charakInAccident9[4]) <= parseFloat(inputVal10))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(10) + "</span><br>";
    if (parseFloat(charakInAccident10[4]) <= parseFloat(inputVal11))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(11) + "</span><br>";
    if (parseFloat(charakInAccident11[4]) <= parseFloat(inputVal12))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(12) + "</span><br>";
    if (parseFloat(charakInAccident12[4]) <= parseFloat(inputVal13))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(13) + "</span><br>";
    if (parseFloat(charakInAccident13[4]) <= parseFloat(inputVal14))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(14) + "</span><br>";
    if (parseFloat(charakInAccident14[4]) <= parseFloat(inputVal15))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(15) + "</span><br>";
    if (parseFloat(charakInAccident15[4]) <= parseFloat(inputVal16))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(16) + "</span><br>";
    if (parseFloat(charakInAccident16[4]) <= parseFloat(inputVal17))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(17) + "</span><br>";
    if (parseFloat(charakInAccident17[4]) <= parseFloat(inputVal18))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(18) + "</span><br>";
    if (parseFloat(charakInAccident18[4]) <= parseFloat(inputVal19))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(19) + "</span><br>";
    if (parseFloat(charakInAccident19[4]) <= parseFloat(inputVal20))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(20) + "</span><br>";
    if (parseFloat(charakInAccident20[4]) <= parseFloat(inputVal21))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(21) + "</span><br>";
    if (parseFloat(charakInAccident21[4]) <= parseFloat(inputVal22))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(22) + "</span><br>";
    if (parseFloat(charakInAccident22[4]) <= parseFloat(inputVal23))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(23) + "</span><br>";
    if (parseFloat(charakInAccident23[4]) <= parseFloat(inputVal24))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(24) + "</span><br>";
    if (parseFloat(charakInAccident24[4]) <= parseFloat(inputVal25))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(25) + "</span><br>";
    if (parseFloat(charakInAccident25[4]) <= parseFloat(inputVal26))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(26) + "</span><br>";
    if (parseFloat(charakInAccident26[4]) <= parseFloat(inputVal27))
        ret += "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + GetStringLocationAnalysis(27) + "</span><br>";
    return ret;
}
function GetStringLocationAnalysis(val) {
    let getStr = "";
    switch (val) {
        case 1:
            getStr = "نسبت تصادفات فوتی از مجموع تصادفات فوتی و جرحی";
            break;
        case 2:
            getStr = "نرخ متوفیان تصادف";
            break;
        case 3:
            getStr = "سهم تصادفات دارای مانع دید";
            break;
        case 4:
            getStr = "سهم تصادفات دارای نقص موثر راه";
            break;
        case 5:
            getStr = "سهم تصادفات در شب بدون روشنایی کافی از کل تصادفات";
            break;
        case 6:
            getStr = "سهم تصادفات در شب از کل تصادفات شدید";
            break;
        case 7:
            getStr = "سهم تصادفات در روزهای تعطیل از کل تصادفات";
            break;
        case 8:
            getStr = "سهم تصادفات وسیله نقلیه با عابر از کل تصادفات";
            break;
        case 9:
            getStr = "سهم تصادفات تک وسیله ای از کل تصادفات";
            break;
        case 10:
            getStr = "سهم تصادفات موتورسیکلت از کل تصادفات";
            break;
        case 11:
            getStr = "سهم تصادفات رخ به رخ از تصادفات دو وسیله ای";
            break;
        case 12:
            getStr = "سهم تصادفات زاویه ای از تصادفات دو وسیله ای";
            break;
        case 13:
            getStr = "سهم تصادفات شدید در هوای مه آلود";
            break;
        case 14:
            getStr = "سهم تصادفات شدید در هوای برفی و بارانی";
            break;
        case 15:
            getStr = "زمان پاسخگویی اورژانس و هلال احمر";
            break;
        case 16:
            getStr = "سهم انتقال مجروح در تصادفات شدید توسط خودرو عبوری، چرخبال، پلیس و سایر از کل انتقال مجروحان";
            break;
        case 17:
            getStr = "سهم تصادفات شدید ناشی از تجاوز از سرعت 30 کیلومتر و بیشتر از کل تصادفات";
            break;
        case 18:
            getStr = "سهم تصادفات شدید سبقت غیر مجاز از کل تصادفات شدید";
            break;
        case 19:
            getStr = "سهم تصادفات شدید رانندگی در حالت مستی، روان گردان و افیونی از کل تصادفات شدید";
            break;
        case 20:
            getStr = "سهم تصادفات شدید وسیله نقلیه حامل بار خطرناک و سوختنی از تصادفات شدید";
            break;
        case 21:
            getStr = "سهم تصادفات شدید دارای کاربر ناوگان باری از کل تصادفات شدید";
            break;
        case 22:
            getStr = "سهم تصادفات شدید دارای کاربر ناوگان مسافربری از کل تصادفات شدید";
            break;
        case 23:
            getStr = "سهم تصادفات شدید دارای عابر پیاده از 6 تا 12 سال از کل تصادفات شدید دارای عابر پیاده";
            break;
        case 24:
            getStr = "سهم تصادفات شدید دارای عابر پیاده بالاتر از 60 سال از کل تصادفات شدید دارای عابر پیاده";
            break;
        case 25:
            getStr = "سهم تصادفات شدید موتورسیکلت دارای راکب کمتر از 18 سال از کل تصادفات موتورسیکلت";
            break;
        case 26:
            getStr = "سهم تصادفات شدید همراه با عدم استفاده از کمربند ایمنی از کل تصادفات شدید";
            break;
        case 27:
            getStr = "سهم تصادفات شدید موتورسیکلت همراه با عدم استفاده از کلاه ایمنی از کل تصادفات شدید";
            break;
    }
    return getStr;

}
function getBoxValues(data) {
    var boxValues = [];
    boxValues.push(replaceZero(Math.min.apply(Math, data)), replaceZero(getPercentile(data, 25)), replaceZero(getPercentile(data, 50)), replaceZero(getPercentile(data, 75)), replaceZero(Math.max.apply(Math, data)));
    return boxValues;
}
function replaceZero(a) {
    return a == "Infinity" || a == "-Infinity" || isNaN(a) ? 0 : a;
}
function getPercentile(data, percentile) {
    data.sort(numSort);
    var index = (percentile / 100) * data.length;
    var result;
    if (Math.floor(index) == index) {
        result = (data[(index - 1)] + data[index]) / 2;
    }
    else {
        result = data[Math.floor(index)];
    }
    return result;
}
function sortDesc(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? 1 : -1;
    }
}
function numSort(a, b) {
    return a - b;
}
