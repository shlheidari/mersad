const d = Date.now();
var getNow = new Intl.DateTimeFormat('fa-IR-u-nu-latn').format(d);
var year = getNow.split('/')[0];
var month = getNow.split('/')[1];
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
    $("#lnkTimeAnalysis2").addClass("active");
    //$.ajax({
    //    type: "POST",
    //    url: "/Moderator/Report/EventProcess.aspx/GetFillEvent",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (msg) {
    //        if (msg != null) {
    //            if (msg.d[0].IsSuccess !== "true") {
    //                $("#lblMessage").html(CreateModal(msg.d[0].Message));
    //                $('#MessageModal').modal();
    //            } else {
    //                var optionVal = '';
    //                for (i = 0; i < msg.d.length; i++) {
    //                    var txt = msg.d[i].Message;
    //                    var id = msg.d[i].Id;
    //                    optionVal += '<option value="' + id + '">' + txt + '</option>';
    //                }
    //                $('#cmbEventTime').append(optionVal);
    //            }
    //        } else {
    //            alert("خطا در برقراری ارتباط با سرور!");
    //        }
    //    },
    //    complete: function () {
    //        $('#spinSearchLoading').hide();
    //    },
    //    error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
    //        alert(response.d);
    //    }
    //});
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
                if (msg.d.length === 0) return;
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
                        let setYearListIndicator = "";
                        setYearListIndicator += '<div class="carousel-item"><span class="fs-3 fw-bold yellow" > سال ' + '1400' + '</span ></div>';
                        setYearListIndicator += '<div class="carousel-item active"><span class="fs-3 fw-bold yellow"> سال ' + '1401' + '</span ></div>';
                        setYearListIndicator += '<div class="carousel-item"><span class="fs-3 fw-bold yellow" > سال ' + '1402' + '</span ></div>';

                        $('#divYearList').html(setYearListIndicator);
                        $('#spnPreviousYear').html("سال " + (parseInt(year) - 1));
                        $('#spnNextYear').html("سال " + (parseInt(year) + 1));
                        $('#carouselExampleControls').css("display", "block");
                        //$('#cmbAxis').html('<option selected="" value="-1">انتخاب محور</option>');
                    }
                    else if (msg.d[0].IsSuccess !== "true") {
                        $("#lblMessage").html(CreateModal(msg.d[0].Message));
                        $('#MessageModal').modal();
                    } else {
                        let setYearListIndicator = "";
                        for (var i = 0; i < msg.d.length; i++) {
                            if (msg.d[i].Message == year)
                                setYearListIndicator += '<div class="carousel-item active"><span class="fs-3 fw-bold yellow"> سال ' + msg.d[i].Message + '</span></div>';
                            else
                                setYearListIndicator += '<div class="carousel-item"><span class="fs-3 fw-bold yellow"> سال ' + msg.d[i].Message + '</span></div>';
                        }
                        $('#divYearList').html(setYearListIndicator);
                        $('#spnPreviousYear').html("سال " + (parseInt(year) - 1));
                        $('#spnNextYear').html("سال " + (parseInt(year) + 1));
                        $('#carouselExampleControls').css("display", "block");
                    }
                } else {
                    alert("خطا در برقراری ارتباط با سرور!");
                }
            },
            complete: function () {
                $('#spinSearchLoading').hide();
                Get5MonthThisYear();
                GetTitleTimeAnalysis();
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
    $("#btnNoroz").on('click', function () {
        const elem = $("#btnNoroz");
        elem[0].style.removeProperty('border');
        if ($("#btnNoroz").html() === "") {
            CheckSeasonSpring();
            CheckSeasonSummer();
            CheckSeasonFall();
            CheckSeasonWinter();
            CheckArbaeen();
            $("#btnNoroz").fadeOut();
            $("#lblNoroz").hide();
            $("#btnNoroz").html('<span class="semi-item-clicked">عید<br>نوروز</span>');
            $("#btnNoroz").addClass("noroz-a");
            $("#btnNoroz").fadeIn("slow");
            GetSeasonThisYear("Noroz");
            $("#spnPopTitle").html('عید نوروز');
            $("#divPop,#divPopLine").removeAttr('style');
            $("#divPop").fadeIn("slow");
            $("#divPop").css({ "right": "20px", "top": "55px" });
            $("#divPopLine").css({ "right": "150px", "top": "88px", "height": "298px" });
            $("#divPopLine").slideDown();
            GetTitleTimeAnalysis();
        } else {
            $("#btnNoroz").fadeOut();
            $("#btnNoroz").html('');
            $("#btnNoroz").removeClass("noroz-a");
            $("#btnNoroz,#lblNoroz").fadeIn("slow");
            $("#divPopLine").slideUp();
            $("#divPop").fadeOut("slow");
        }
    });
    $("#btnSeasonSpring").on('click', function () {
        const elem = $("#btnSeasonSpring");
        elem[0].style.removeProperty('border');
        if ($("#btnSeasonSpring").html() === "") {
            CheckNoroz();
            CheckSeasonSummer();
            CheckSeasonFall();
            CheckSeasonWinter();
            CheckArbaeen();
            $("#btnSeasonSpring").fadeOut();
            $("#lblSeasonSpring").hide();
            $("#btnSeasonSpring").html('<span style="transform: rotate(26deg) !important;" class="semi-item-clicked">فصل<br>بهار</span>');
            $("#btnSeasonSpring").css({ "top": "24px", "right": "14px" });
            $("#btnSeasonSpring").addClass("cm-items-click");
            $("#btnSeasonSpring").fadeIn("slow");
            GetSeasonThisYear("Spring");
            $("#spnPopTitle").html('فصل بهار');
            $("#divPop,#divPopLine").removeAttr('style');
            $("#divPop").fadeIn("slow");
            $("#divPop").css({ "right": "140px", "top": "40px" });
            $("#divPopLine").css({ "right": "272px", "top": "75px", "height": "260px" });
            $("#divPopLine").slideDown();
            GetTitleTimeAnalysis();
        } else {
            $("#btnSeasonSpring").fadeOut();
            $("#btnSeasonSpring").html('');
            $("#btnSeasonSpring").css({ "top": "40px", "right": "25px" });
            $("#btnSeasonSpring").removeClass("cm-items-click");
            $("#btnSeasonSpring,#lblSeasonSpring").fadeIn("slow");
            $("#divPopLine").slideUp();
            $("#divPop").fadeOut("slow");
        }
    });
    $("#btnSeasonSummer").on('click', function () {
        const elem = $("#btnSeasonSummer");
        elem[0].style.removeProperty('border');
        if ($("#btnSeasonSummer").html() === "") {
            CheckNoroz();
            CheckSeasonSpring();
            CheckSeasonFall();
            CheckSeasonWinter();
            CheckArbaeen();
            $("#btnSeasonSummer").fadeOut();
            $("#lblSeasonSummer").hide();
            $("#btnSeasonSummer").html('<span style="right: 2px;font-size: 12.5px;transform: rotate(0deg) !important;" class="semi-item-clicked">فصل<br>تابستان</span>');
            $("#btnSeasonSummer").css({ "top": "13px", "right": "8px" });
            $("#btnSeasonSummer").addClass("cm-items-click");
            $("#btnSeasonSummer").fadeIn("slow");
            GetSeasonThisYear("Summer");
            $("#spnPopTitle").html('فصل تابستان');
            $("#divPop,#divPopLine").removeAttr('style');
            $("#divPop").fadeIn("slow");
            $("#divPop").css({ "right": "300px", "top": "40px" });
            $("#divPopLine").css({ "right": "432px", "top": "74px", "height": "241px" });
            $("#divPopLine").slideDown();
            GetTitleTimeAnalysis();
        } else {
            $("#btnSeasonSummer").fadeOut();
            $("#btnSeasonSummer").html('');
            $("#btnSeasonSummer").css({ "top": "26px", "right": "22px" });
            $("#btnSeasonSummer").removeClass("cm-items-click");
            $("#btnSeasonSummer,#lblSeasonSummer").fadeIn("slow");
            $("#divPopLine").slideUp();
            $("#divPop").fadeOut("slow");
        }
    });
    $("#btnSeasonFall").on('click', function () {
        const elem = $("#btnSeasonFall");
        elem[0].style.removeProperty('border');
        if ($("#btnSeasonFall").html() === "") {
            CheckNoroz();
            CheckSeasonSpring();
            CheckSeasonSummer();
            CheckSeasonWinter();
            CheckArbaeen();
            $("#btnSeasonFall").fadeOut();
            $("#lblSeasonFall").hide();
            $("#btnSeasonFall").html('<span style="left: 6px;transform: rotate(345deg) !important" class="semi-item-clicked">فصل<br>پاییز</span>');
            $("#btnSeasonFall").css({ "top": "2px", "right": "-13px" });
            $("#btnSeasonFall").addClass("cm-items-click");
            $("#btnSeasonFall").fadeIn("slow");
            GetSeasonThisYear("Fall");
            $("#spnPopTitle").html('فصل پاییز');
            $("#divPop,#divPopLine").removeAttr('style');
            $("#divPop").fadeIn("slow");
            $("#divPop").css({ "left": "140px", "top": "40px" });
            $("#divPopLine").css({ "left": "272px", "top": "75px", "height": "260px" });
            $("#divPopLine").slideDown();
            GetTitleTimeAnalysis();
        } else {
            $("#btnSeasonFall").fadeOut();
            $("#btnSeasonFall").html('');
            $("#btnSeasonFall").css({ "top": "16px", "right": "4px" });
            $("#btnSeasonFall").removeClass("cm-items-click");
            $("#btnSeasonFall,#lblSeasonFall").fadeIn("slow");
            $("#divPopLine").slideUp();
            $("#divPop").fadeOut("slow");
        }
    });
    $("#btnSeasonWinter").on('click', function () {
        const elem = $("#btnSeasonWinter");
        elem[0].style.removeProperty('border');
        if ($("#btnSeasonWinter").html() === "") {
            CheckNoroz();
            CheckSeasonSpring();
            CheckSeasonSummer();
            CheckSeasonFall();
            CheckArbaeen();
            $("#btnSeasonWinter").fadeOut();
            $("#lblSeasonWinter").hide();
            $("#btnSeasonWinter").html('<span style="transform: rotate(329deg) !important;right: 5px;font-size: 12.5px;" class="semi-item-clicked">فصل<br>زمستان</span>');
            $("#btnSeasonWinter").css({ "top": "-10px", "right": "-14px" });
            $("#btnSeasonWinter").addClass("cm-items-click");
            $("#btnSeasonWinter").fadeIn("slow");
            GetSeasonThisYear("Winter");
            $("#spnPopTitle").html('فصل زمستان');
            $("#divPop,#divPopLine").removeAttr('style');
            $("#divPop").fadeIn("slow");
            $("#divPop").css({ "left": "9px", "top": "55px" });
            $("#divPopLine").css({ "left": "144px", "top": "88px", "height": "298px" });
            $("#divPopLine").slideDown();
            GetTitleTimeAnalysis();
        } else {
            $("#btnSeasonWinter").fadeOut();
            $("#btnSeasonWinter").html('');
            $("#btnSeasonWinter").css({ "top": "4px", "right": "5px" });
            $("#btnSeasonWinter").removeClass("cm-items-click");
            $("#btnSeasonWinter,#lblSeasonWinter").fadeIn("slow");
            $("#divPopLine").slideUp();
            $("#divPop").fadeOut("slow");
        }
    });
    $("#btnArbaeen").on('click', function () {
        const elem = $("#btnArbaeen");
        elem[0].style.removeProperty('border');
        if ($("#btnArbaeen").html() === "") {
            CheckNoroz();
            CheckSeasonSpring();
            CheckSeasonSummer();
            CheckSeasonFall();
            CheckSeasonWinter();
            CheckArbaeen();
            $("#btnArbaeen").fadeOut();
            $("#lblArbaeen").hide();
            $("#btnArbaeen").html('<span style="transform: rotate(0deg) !important;right: 4px;font-size: 12.5px;" class="semi-item-clicked">اربعین<br>حسینی</span>');
            $("#btnArbaeen").css({ "top": "-1px", "right": "11px" });
            $("#btnArbaeen").addClass("cm-items-click");
            $("#btnArbaeen").fadeIn("slow");
            GetSeasonThisYear("Arbaeen");
            $("#spnPopTitle").html('اربعین حسینی');
            $("#divPop,#divPopLine").removeAttr('style');
            $("#divPop").fadeIn("slow");
            $("#divPop").css({ "right": "300px", "top": "40px" });
            $("#divPopLine").css({ "right": "432px", "top": "74px", "height": "313px" });
            $("#divPopLine").slideDown();
            GetTitleTimeAnalysis();
        } else {
            $("#btnArbaeen").fadeOut();
            $("#btnArbaeen").html('');
            $("#btnArbaeen").css({ "top": "29px", "right": "25px" });
            $("#btnArbaeen").removeClass("cm-items-click");
            $("#btnArbaeen,#lblArbaeen").fadeIn("slow");
            $("#divPopLine").slideUp();
            $("#divPop").fadeOut("slow");
        }
    });
    $('#carouselExampleControls').bind('slid.bs.carousel', function (e) {
        Get5MonthThisYear();
        if ($("#btnNoroz").html() !== "") $("#btnNoroz").trigger("click");
        else if ($("#btnSeasonSpring").html() !== "") $("#btnSeasonSpring").trigger("click");
        else if ($("#btnSeasonSummer").html() !== "") $("#btnSeasonSummer").trigger("click");
        else if ($("#btnSeasonFall").html() !== "") $("#btnSeasonFall").trigger("click");
        else if ($("#btnSeasonWinter").html() !== "") $("#btnSeasonWinter").trigger("click");
        else if ($("#btnArbaeen").html() !== "") $("#btnArbaeen").trigger("click");
        $("#divTitleDescription").html('');
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
        //else if (getExport == "Excel") {
        //    html2canvas(document.getElementById("divPrintScreen"), {
        //        scale: 2,
        //        width: width,
        //        height: height,
        //        useCORS: true,
        //    }).then(function (canvas) {
        //        var img = canvas.toDataURL("image/jpeg", 0.9); //image data of canvas

        //        var a = document.createElement("a"); //Create <a>
        //        //a.href = "data:image/png;base64," + ImageBase64; 
        //        a.href = img;
        //        let fileName = "export";
        //        a.download = fileName + ".jpeg"; //File name Here
        //        let blob = dataURItoBlob(img);
        //        let imgToWord = document.getElementById("imgConvert");
        //        imgToWord.src = URL.createObjectURL(blob);
        //        //$(".bodyMaster").inlineStyler(); 
        //        //console.log($("#divPrintScreen").html());
        //        var uri = 'data:application/vnd.ms-excel;base64,'
        //            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><link href="https://mersadapp.ir/App_Themes/solid.min.css" rel="stylesheet" /><link href="https://mersadapp.ir/App_Themes/fontawesome.min.css" rel="stylesheet"/><script src="https://mersadapp.ir/Scripts/fontawesome.min.js"/><script src="https://mersadapp.ir/Scripts/jquery-3.6.0.min.js"/><link href="/App_Themes/bootstrap.rtl.min.css?n=14010321" rel="stylesheet" /><script src="https://mersadapp.ir/Scripts/popper.min.js"/><script src="https://mersadapp.ir/Scripts/bootstrap.min.js"/><link href="https://mersadapp.ir/App_Themes/style.css?n=14010321" rel="stylesheet" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table><tbody><tr><td>{table}</td></tr></tbody></table></body></html>'
        //            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        //            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
        //        var ctx = { worksheet: 'Worksheet', table: document.getElementById("divPrintScreen").innerHTML };
        //        //var ctx = { worksheet: 'Worksheet', table: URL.createObjectURL(blob) };
        //        //var ctx = { worksheet: name || 'Hoja1', table: fileName + ".jpeg" }
        //        //window.location.href = uri + base64(format(template, ctx))
        //        var link = document.createElement("a");
        //        link.download = fileName + ".xls";
        //        link.href = uri + base64(format(template, ctx));
        //        link.click();
        //        //var img = canvas.toDataURL("image/png", 1);
        //        //var img = canvas.toDataURL("image/jpeg", 1);
        //        //let blob = dataURItoBlob(img)
        //        ////var url = URL.createObjectURL(new Blob([img], { type: 'application/octet-stream' }));
        //        //console.log(URL.createObjectURL(blob));
        //        //let imgToWord = document.getElementById("imgConvert");
        //        //imgToWord.src = URL.createObjectURL(blob);

        //        //////exportExcel();
        //        ////Export2Excel("divConvertImg", 'ConvertImg');
        //        ////var fileName = 'text.xls';
        //        ////var blob = new Blob([imgToWord], { type: "application/vnd.ms-excel" });
        //        ////window.saveAs(blob, fileName);


        //        ////e.preventDefault();
        //        //window.open('data:application/vnd.ms-excel,' + encodeURIComponent($("#divConvertImg > table").html())); 
        //        ////e.preventDefault();
        //    });
        //}
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
                Export2Doc("divConvertImg", 'TimeAnalysis' + getNow);
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
function dataURItoBlob(dataUri) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataUri.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataUri.split(',')[1]);
    else
        byteString = unescape(dataUri.split(',')[1]);

    // separate out the mime component
    var mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}
function CheckNoroz() {
    const elem = $("#btnNoroz");
    elem[0].style.removeProperty('border');
    if ($("#btnNoroz").html() !== "") {
        $("#btnNoroz").fadeOut();
        $("#btnNoroz").html('');
        $("#btnNoroz").removeClass("noroz-a");
        $("#btnNoroz,#lblNoroz").fadeIn("slow");
    }
}
function CheckSeasonSpring() {
    const elem = $("#btnSeasonSpring");
    elem[0].style.removeProperty('border');
    if ($("#btnSeasonSpring").html() !== "") {
        $("#btnSeasonSpring").fadeOut();
        $("#btnSeasonSpring").html('');
        $("#btnSeasonSpring").css({ "top": "40px", "right": "25px" });
        $("#btnSeasonSpring").removeClass("cm-items-click");
        $("#btnSeasonSpring,#lblSeasonSpring").fadeIn("slow");
    }
}
function CheckSeasonSummer() {
    const elem = $("#btnSeasonSummer");
    elem[0].style.removeProperty('border');
    if ($("#btnSeasonSummer").html() !== "") {
        $("#btnSeasonSummer").fadeOut();
        $("#btnSeasonSummer").html('');
        $("#btnSeasonSummer").css({ "top": "26px", "right": "22px" });
        $("#btnSeasonSummer").removeClass("cm-items-click");
        $("#btnSeasonSummer,#lblSeasonSummer").fadeIn("slow");
    }
}
function CheckSeasonFall() {
    const elem = $("#btnSeasonFall");
    elem[0].style.removeProperty('border');
    if ($("#btnSeasonFall").html() !== "") {
        $("#btnSeasonFall").fadeOut();
        $("#btnSeasonFall").html('');
        $("#btnSeasonFall").css({ "top": "16px", "right": "4px" });
        $("#btnSeasonFall").removeClass("cm-items-click");
        $("#btnSeasonFall,#lblSeasonFall").fadeIn("slow");
    }
}
function CheckSeasonWinter() {
    const elem = $("#btnSeasonWinter");
    elem[0].style.removeProperty('border');
    if ($("#btnSeasonWinter").html() !== "") {
        $("#btnSeasonWinter").fadeOut();
        $("#btnSeasonWinter").html('');
        $("#btnSeasonWinter").css({ "top": "4px", "right": "5px" });
        $("#btnSeasonWinter").removeClass("cm-items-click");
        $("#btnSeasonWinter,#lblSeasonWinter").fadeIn("slow");
    }
}
function CheckArbaeen() {
    const elem = $("#btnArbaeen");
    elem[0].style.removeProperty('border');
    if ($("#btnArbaeen").html() !== "") {
        $("#btnArbaeen").fadeOut();
        $("#btnArbaeen").html('');
        $("#btnArbaeen").css({ "top": "29px", "right": "25px" });
        $("#btnArbaeen").removeClass("cm-items-click");
        $("#btnArbaeen,#lblArbaeen").fadeIn("slow");
    }
}
document.addEventListener('DOMContentLoaded', function () {
    FillLocationArea();
}, false);
function GetTitleTimeAnalysis() {
    let getId = $("#cmbLocationArea").val();
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
                    $('#divTitleDescription').html("");
                }
                else if (msg.d[0].IsSuccess !== "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                    $('#divTitleDescription').html("");
                } else {
                    let cityName = msg.d[0].Message;
                    let axisName = msg.d[0].MessageTwo;
                    let inNativeArea = msg.d[0].MessageThree;
                    if (inNativeArea == "True") inNativeArea = "درون‌ شهری";
                    else if (inNativeArea == "False") inNativeArea = "برون‌ شهری";
                    else inNativeArea = "درون‌ شهری" + " و " + "برون‌ شهری";
                    if (axisName !== null && axisName !== "null" && axisName !== "") axisName = " در محور " + axisName;
                    else axisName = "";
                    let getThisYear = $("#spnLeftPanelYearTitle").html();
                    if (getThisYear === year) getThisYear = "امسال";
                    $('#divTitleDescription').html("عملکرد شهرستان " + cityName + " " + "در محدوده " + inNativeArea + axisName + " در " + $("#spnPopTitle").html() +
                        " " + getThisYear + " براساس تحلیل داده های تصادفات در بازه زمانی سال های گذشته به صورت زیر بوده است :");
                    $('.circle-parent').css("top", "181px");
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSearchLoading').hide();
            Get5MonthThisYear();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
}

function GetMonthNumberCaption(month) {
    if (month == 1) return "X";
    if (month == 2) return "یک";
    if (month == 3) return "دو";
    if (month == 4) return "سه";
    if (month == 5) return "چهار";
    if (month == 6) return "پنج";
    if (month == 7) return "شش";
    if (month == 8) return "هفت";
    if (month == 9) return "هشت";
    if (month == 10) return "نه";
    if (month == 11) return "ده";
    if (month == 12) return "یازده";
}
function Get5MonthThisYear() {
    let getId = $("#cmbLocationArea").val();
    let getSelectedYear = $("#divYearList > div[class='carousel-item active'] > span").html().replace("سال ", "").trim();
    $("#spnLeftPanelYearTitle").html(getSelectedYear);
    let getMonthCap = GetMonthNumberCaption(month);
    if (getMonthCap == "X") {
        $("#spnLeftPanelMonthTitle").html("داده ای در این بخش برای سال روبرو موجود نیست = ");
        return;
    }
    $("#spnLeftPanelMonthTitle").html(getMonthCap + " ماهه نخست سال ");
    /*console.log(getSelectedYear === year)*/
    if (getSelectedYear === year) $(".left-panel-info-title").css("background-color", "#ffcc00");
    else $(".left-panel-info-title").removeAttr("style");
    let getLenYear = $("#divYearList > div").length;
    if (getLenYear < 3) {
        $("#divLeftPanelDescription").html("تعداد سالها ثبت شده برای این گزارش کافی نمی باشد!");
        return;
    }
    let obj = {
        "getId": getId
    }
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "/Moderator/Analysis/TimeAnalysis.aspx/Get5MonthThisYear",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d.length == 0) {
                    $("#divLeftPanelDescription").html("تعداد سالها ثبت شده برای این گزارش کافی نمی باشد!");
                }
                else if (msg.d[0].Var2 === "false") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Var1));
                    $('#MessageModal').modal();
                } else {
                    let getHtml = "";
                    getHtml += TimeAnalysis(msg, getSelectedYear, 1);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 2);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 3);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 4);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 5);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 6);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 7);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 8);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 9);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 10);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 11);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 12);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 13);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 14);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 15);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 16);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 17);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 18);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 19);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 20);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 21);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 22);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 23);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 24);
                    if (getHtml == "")
                        $("#divLeftPanelDescription").html("تعداد سالها ثبت شده برای این گزارش کافی نمی باشد!");
                    else $("#divLeftPanelDescription").html(getHtml);
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
function GetSeasonThisYear(season) {
    let getId = $("#cmbLocationArea").val();
    let getSelectedYear = $("#divYearList > div[class='carousel-item active'] > span").html().replace("سال ", "").trim();
    $("#spnLeftPanelYearTitle").html(getSelectedYear);
    if (season === "Noroz") {
        if ((getSelectedYear === year && getNow.split("/")[1] === "01" && parseInt(getNow.split("/")[2]) < 15) || (getSelectedYear == parseInt(year) - 1 && getNow.split("/")[1] === "12" && parseInt(getNow.split("/")[2]) >= 25)) {
            const elem = $("#btnNoroz");
            elem[0].style.setProperty('border', '8px solid #ffcc00', 'important');
            $("#btnNoroz > span").html("اکنون");
            $(".pop-panel-info-title").css("background-color", "#ffcc00");
        } else {
            $("#btnNoroz > span").html("عید<br>نوروز");
            $(".pop-panel-info-title").removeAttr("style");
        }
    }
    else if (season === "Spring") {
        if (getSelectedYear === year && parseInt(getNow.split("/")[1]) < 4) {
            const elem = $("#btnSeasonSpring");
            elem[0].style.setProperty('border', '8px solid #ffcc00', 'important');
            $("#btnSeasonSpring > span").html("اکنون");
            $("#btnSeasonSpring > span").css("top", "12px");
            $(".pop-panel-info-title").css("background-color", "#ffcc00");
        } else {
            $("#btnSeasonSpring > span").html("فصل<br>بهار");
            $(".pop-panel-info-title").removeAttr("style");
        }
    }
    else if (season === "Summer") {
        if (getSelectedYear === year && parseInt(getNow.split("/")[1]) > 3 && parseInt(getNow.split("/")[1]) < 7) {
            const elem = $("#btnSeasonSummer");
            elem[0].style.setProperty('border', '8px solid #ffcc00', 'important');
            $("#btnSeasonSummer > span").html("اکنون");
            $("#btnSeasonSummer > span").css("right", "8px");
            $("#btnSeasonSummer > span").css("top", "13px");
            $(".pop-panel-info-title").css("background-color", "#ffcc00");
        } else {
            $("#btnSeasonSummer > span").html("فصل<br>تابستان");
            $(".pop-panel-info-title").removeAttr("style");
        }
    }
    else if (season === "Fall") {
        if (getSelectedYear === year && parseInt(getNow.split("/")[1]) > 6 && parseInt(getNow.split("/")[1]) < 10) {
            const elem = $("#btnSeasonFall");
            elem[0].style.setProperty('border', '8px solid #ffcc00', 'important');
            $("#btnSeasonFall > span").html("اکنون");
            $(".pop-panel-info-title").css("background-color", "#ffcc00");
        } else {
            $("#btnSeasonFall > span").html("فصل<br>پاییز");
            $(".pop-panel-info-title").removeAttr("style");
        }
    }
    else if (season === "Winter") {
        if (getSelectedYear === year && parseInt(getNow.split("/")[1]) > 9) {
            const elem = $("#btnSeasonWinter");
            elem[0].style.setProperty('border', '8px solid #ffcc00', 'important');
            $("#btnSeasonWinter > span").html("اکنون");
            $(".pop-panel-info-title").css("background-color", "#ffcc00");
        } else {
            $("#btnSeasonWinter > span").html("فصل<br>زمستان");
            $(".pop-panel-info-title").removeAttr("style");
        }
    }
    else if (season === "Arbaeen") {
        let getDayDate = parseInt(getNow.split("/")[2]);
        let getIsArbaeen = false;
        if (year === "1401" && getNow.split("/")[1] === "06" && getDayDate > 6 && getDayDate < 22) getIsArbaeen = true;
        else if (year === "1402" && (getNow.split("/")[1] === "05" && getDayDate > 26) && (getNow.split("/")[1] === "06" && getDayDate < 11)) getIsArbaeen = true;
        else if (year === "1403" && getNow.split("/")[1] === "05" && getDayDate > 15 && getDayDate < 31) getIsArbaeen = true;
        else if (year === "1404" && getNow.split("/")[1] === "05" && getDayDate > 4 && getDayDate < 20) getIsArbaeen = true;
        else if (year === "1405" && (getNow.split("/")[1] === "04" && getDayDate > 24) && (getNow.split("/")[1] === "05" && getDayDate < 9)) getIsArbaeen = true;
        else if (year === "1406" && getNow.split("/")[1] === "04" && getDayDate > 14 && getDayDate < 30) getIsArbaeen = true;
        else if (year === "1407" && getNow.split("/")[1] === "04" && getDayDate > 4 && getDayDate < 20) getIsArbaeen = true;
        else if (year === "1408" && (getNow.split("/")[1] === "03" && getDayDate > 24) && (getNow.split("/")[1] === "04" && getDayDate < 9)) getIsArbaeen = true;
        else if (year === "1409" && getNow.split("/")[1] === "03" && getDayDate > 12 && getDayDate < 28) getIsArbaeen = true;
        if (getSelectedYear === year && getIsArbaeen) {
            const elem = $("#btnArbaeen");
            elem[0].style.setProperty('border', '8px solid #ffcc00', 'important');
            $("#btnArbaeen > span").html("اکنون");
            $(".pop-panel-info-title").css("background-color", "#ffcc00");
        } else {
            $("#btnArbaeen > span").html("اربعین<br>حسینی");
            $(".pop-panel-info-title").removeAttr("style");
        }
    }
    let getLenYear = $("#divYearList > div").length;
    if (getLenYear < 3) {
        $("#divPopDescription").html("تعداد سالها ثبت شده برای این گزارش کافی نمی باشد!");
        return;
    }
    let obj = {
        "getId": getId,
        "season": season
    }
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "/Moderator/Analysis/TimeAnalysis.aspx/GetThisYearLocationArea",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d.length == 0) {
                    $("#divPopDescription").html("تعداد سالها ثبت شده برای این گزارش کافی نمی باشد!");
                }
                else if (msg.d[0].Var2 === "false") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Var1));
                    $('#MessageModal').modal();
                } else {
                    let getHtml = "";
                    getHtml += TimeAnalysis(msg, getSelectedYear, 1);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 2);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 3);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 4);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 5);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 6);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 7);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 8);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 9);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 10);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 11);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 12);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 13);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 14);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 15);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 16);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 17);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 18);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 19);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 20);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 21);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 22);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 23);
                    getHtml += TimeAnalysis(msg, getSelectedYear, 24);
                    $("#divPopDescription").html(getHtml);

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
function TimeAnalysis(msg, getSelectedYear, val) {
    let getVal1;
    let getTotalVal1 = 0;
    let getCountOldYear = 0;
    let intYear = parseInt(msg.d[i].Year);
    let intSelectedYear = parseInt(getSelectedYear);
    let getValSelectedYear = 0;
    const inputVal1 = [];
    for (i = 0; i < msg.d.length; i++) {
        if (intYear < intSelectedYear) {
            getVal1 = parseInt(msg.d[i]["Var" + val]);
            inputVal1.push(getVal1);
            getCountOldYear++;
            getTotalVal1 += parseInt(msg.d[i]["Var" + val]);
        }
        if (intYear === intSelectedYear) getValSelectedYear = parseInt(msg.d[i]["Var" + val]);
    }
    const varianceVal1 = jStat.variance(inputVal1, true);
    let setResultVal1T = (getValSelectedYear - (getTotalVal1 / getCountOldYear)) / Math.sqrt(varianceVal1 * ((1 / getCountOldYear) + 1));
    let setDistVal1T = Number(jStat.studentt.cdf(Number(setResultVal1T.toFixed(2)), getCountOldYear - 1).toFixed(4));
    if (setDistVal1T > 0.9) {
        return "<i class='fal fa-exclamation-triangle red'></i>&nbsp<span class='font-size-12-w'>" + "افزایش " + GetStringTimeAnalysis(val) + "</span><br>";
    } else if (setDistVal1T < 0.1) {
        return "<i class='fa fa-check-circle-o green'></i>&nbsp<span class='font-size-12-w'>" + "کاهش " + GetStringTimeAnalysis(val) + "</span><br>";
    } else return "";
}
function GetStringTimeAnalysis(val) {
    let getStr = "";
    switch (val) {
        case 1:
            getStr = "شمار تصادفات فوتی و جرحی";
            break;
        case 2:
            getStr = "نرخ متوفیان تصادف";
            break;
        case 3:
            getStr = "سهم تصادفات فوتی از کل تصادفات شدید";
            break;
        case 4:
            getStr = "شمار تصادفات شدید در محورهای فرعی";
            break;
        case 5:
            getStr = "شمار تصادفات شدید در محورهای روستایی";
            break;
        case 6:
            getStr = "سهم تصادفات در شب بدون روشنایی کافی از کل تصادفات شدید";
            break;
        case 7:
            getStr = "سهم تصادفات در شب از کل تصادفات شدید";
            break;
        case 8:
            getStr = "شمار تصادفات شدید وسیله نقلیه با عابر";
            break;
        case 9:
            getStr = "شمار تصادفات شدید وسیله با موتور";
            break;
        case 10:
            getStr = "سهم تصادفات شدید تک وسیله ای از کل تصادفات شدید";
            break;
        case 11:
            getStr = "سهم تصادفات رخ به رخ از کل تصادفات شدید";
            break;
        case 12:
            getStr = "سهم تصادفات زاویه ای از کل تصادفات شدید";
            break;
        case 13:
            getStr = "سهم تصادفات خستگی و خواب آلودگی از کل تصادفات شدید";
            break;
        case 14:
            getStr = "سهم تصادفات ناشی از تجاوز از سرعت 30 کیلومتر و بیشتر";
            break;
        case 15:
            getStr = "سهم تصادفات ناشی از سبقت غیر مجاز";
            break;
        case 16:
            getStr = "سهم تصادفات در حالت مستی، روان گردان و افیونی";
            break;
        case 17:
            getStr = "شمار تصادفات وسیله نقلیه حامل بار خطرناک و سوختنی";
            break;
        case 18:
            getStr = "سهم تصادفات دارای کاربر ناوگان باری";
            break;
        case 19:
            getStr = "سهم تصادفات دارای کاربر ناوگان مسافربری";
            break;
        case 20:
            getStr = "شمار تصادفات دارای عابر پیاده بالاتر از 60 سال از کل تصادفات";
            break;
        case 21:
            getStr = "شمار تصادفات موتورسیکلت دارای راکب کمتر از 18 سال از کل تصادفات";
            break;
        case 22:
            getStr = "سهم تصادفات رانندگان یا راکبان فاقد گواهینامه معتبر";
            break;
        case 23:
            getStr = "سهم تصادفات رانندگان همراه با عدم استفاده از کمربند ایمنی";
            break;
        case 24:
            getStr = "سهم تصادفات موتورسیکلت همراه با عدم استفاده از کلاه ایمنی";
            break;
    }
    return getStr;

}