function ShowSubmitComplete(type) {
    if (type === 'UnSuccess') {
        $("#divUnSuccessComplete").removeClass("hide");
        $("#divSuccessComplete").addClass("hide");
    } else {
        $("#divSuccessComplete").removeClass("hide");
        $("#divUnSuccessComplete").addClass("hide");
    }
    return false;
}
function HideSuccessComplete(type) {
    if (type === 'UnSuccess') {
        $("#divUnSuccessComplete").addClass("hide");
    } else {
        $("#divSuccessComplete").addClass("hide");
    }
    return false;
}
function OpenCommentDialog(type) {

    if (type === 'First') {
        $("#hTitleComment").html("زمان و مکان تصادف");
        alert("First");

    } else if (type === 'Second') {
        $("#hTitleComment").html("مشخصات تصادف");
        alert("Second");

    }
    else if (type === 'Third') {
        $("#hTitleComment").html("مشخصات راه و وضعیت جوی");

        alert("Third");

    }
    else if (type === 'Fourth') {
        $("#hTitleComment").html("علل تصادف");
        alert("Fourth");

    }
    else if (type === 'Fifth') {
        $("#hTitleComment").html("مشخصات افراد و وسایل درگیر در تصادف");
        alert("Fifth");

    }
    else if (type === 'Sixth') {
        $("#hTitleComment").html("اطلاعات مصدومین و متوفیان");
        alert("Sixth");

    }
    else if (type === 'Seventh') {
        $("#hTitleComment").html("کروکی تصادف");
        alert("Seventh");

    }
    $("#CommentModal").modal();
    alert("CommentModal");
    $("#hidCommentType").val(type);
    alert("LoadModal");
    LoadComment();
    return false;
}
function LoadComment() {
    alert("loaded Finish");
    console.log($("#hidCommentType").val());
    alert($("#hidId").val());
    var obj = {
        "accidentId": $("#hidId").val(),
        "type": $("#hidCommentType").val()
    }
    $('#spinCommentLoading').show();
    $.ajax({
        type: "POST",
        url: "CheckAccident.aspx/LoadComment",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            alert('Truw');
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#divCommentMessage").html("<div class='alert alert-danger'>" + msg.d[0].Message + "</div>");
                } else {

                    $("#txtComment").val(msg.d[0].Message);
                    $("#divCommentMessage").show();

                }
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinCommentLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}
function LoadBorderForComment() {
    //if ($("#hidId").val() == "") {
    //    $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
    //    $('#MessageModal').modal();
    //    return false;
    //}
    var obj = {
        "accidentId": $("#hidId").val()
    }
    $.ajax({
        type: "POST",
        url: "CheckAccident.aspx/LoadBorderComment",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split(',');
                    for (var i = 0; i < splt.length; i++) {
                        if (splt[i] === "false") continue;
                        if (i === 0) {
                            $("#FirstStep").css("border", "3px #ffbf00 solid");
                        }
                        else if (i === 1) {
                            $("#SecondStep").css("border", "3px #ffbf00 solid");
                        }
                        else if (i === 2) {
                            $("#ThirdStep").css("border", "3px #ffbf00 solid");
                        }
                        else if (i === 3) {
                            $("#FourthStep").css("border", "3px #ffbf00 solid");
                        }
                        else if (i === 4) {
                            $("#FifthStep").css("border", "3px #ffbf00 solid");
                        }
                        else if (i === 5) {
                            $("#SixthStep").css("border", "3px #ffbf00 solid");
                        }
                        else if (i === 6) {
                            $("#SeventhStep").css("border", "3px #ffbf00 solid");
                        }
                    }
                }
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function SaveComment() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val(),
        "type": $("#hidCommentType").val(),
        "comment": $("#txtComment").val()
    }
    $('#spinCommentLoading').show();
    $.ajax({
        type: "POST",
        url: "CheckAccident.aspx/SaveComment",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess === "true") {
                    $("#divCommentMessage").html("<div class='alert alert-success'>" + msg.d[0].Message + "</div>");
                    var type = $("#hidCommentType").val();
                    if (type === "First") {
                        $("#FirstStep").css("border", "3px #ffbf00 solid");
                    } else if (type === "Second") {
                        $("#SecondStep").css("border", "3px #ffbf00 solid");
                    } else if (type === "Third") {
                        $("#ThirdStep").css("border", "3px #ffbf00 solid");
                    } else if (type === "Fourth") {
                        $("#FourthStep").css("border", "3px #ffbf00 solid");
                    } else if (type === "Fifth") {
                        $("#FifthStep").css("border", "3px #ffbf00 solid");
                    } else if (type === "Sixth") {
                        $("#SixthStep").css("border", "3px #ffbf00 solid");
                    } else if (type === "Seventh") {
                        $("#SeventhStep").css("border", "3px #ffbf00 solid");
                    }
                } else {
                    $("#divCommentMessage").html("<div class='alert alert-danger'>" + msg.d[0].Message + "</div>");
                }
                $("#divCommentMessage").show();
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinCommentLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}
function SubmitComplete(type) {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val(),
        "type": type
    }
    $('#spinUnCompleteLoading,#spinCompleteLoading').show();
    $.ajax({
        type: "POST",
        url: "CheckAccident.aspx/SubmitComplete",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                $("#lblMessage").html(CreateModal(msg.d[0].Message));
                $('#MessageModal').modal();
                $('#divUnSuccessComplete,#divSuccessComplete').addClass("hide");
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinUnCompleteLoading,#spinCompleteLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}
function SaveFifthStepDataTwo() {
    $(".ShowVehiclesInvolved,#btnSubmitFifthStep,#btnSubmitFifthStepTwo,#btnBackFifthStepTwo,#divFifthStepTwo,#divFifthStepTwo2").hide();
    $("#btnSubmitFifthStepThree,#btnBackFifthStepThree,#divFifthStepThree").show();
    LoadFifthStepThree();
    return false;
}
function SaveFifthStepData() {
    $(".ShowVehiclesInvolved,#btnSubmitFifthStep").hide();
    $("#divFifthStepTwo,#btnBackFifthStepTwo,#btnSubmitFifthStepTwo,#divFifthStepTwo2").show();
    LoadFifthStepTwo();
    return false;
}
function pageLoad() {
    $("#lnkAddAccident").addClass("active");
    LoadBorderForComment();
    //$("#cmbProvince").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "استان را انتخاب کنید"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbPoliceAwarenessType").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "نحوه مطلع شدن پلیس"
    //    },
    //    dir: 'rtl',
    //    allowClear: true,
    //    width: '100%'
    //});
    //$("#cmbCrashType").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "نوع تصادف"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbCrashScene").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "وضعیت صحنه تصادف"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbCollisionOfA").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "برخورد یک وسیله نقلیه"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbCollisionOfATwo").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "با"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbRoadDefects").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "نقایص موثر راه"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbCarriageWayDirection").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "سمت جهت راه"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbLightingStatus").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "وضع روشنایی"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbRoadSurfaceCondition").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "شرایط سطح راه"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbVisualObstruction").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "موانع دید"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbShoulderOfTheRoad").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "نوع شانه"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbRoadMaintenance").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "تعمیرات راه"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbRoadAssetsDamage").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "خسارت وارده به تجهیزات"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbLocationLandUse").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "کاربری محل"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbCarCrashLocation").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "موقعیت تصادف"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbWeather").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "وضع هوا"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbGeometricDesign").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "وضع هندسه محل تصادف"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbPavmentMarking").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "خط کشی"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbFinalReason").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "علت تامه تصادف"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbLackOfAttention").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "عدم توجه به جلو ناشی از"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbInabilityControlVehicle").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "عدم توانایی در کنترل وسیله نقلیه ناشی از"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbVehicleFactorInCarCrash").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "عامل وسیله نقلیه در تصادف"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbHumanFactorInCarCrash").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "عامل انسانی موثر در تصادف"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbJudicialCause").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "علت قضایی تصادف"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbVehicleType").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "نوع وسیله نقلیه"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbVehicleManeuvering").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "مانور وسیله نقلیه"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbPlateType").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "نوع پلاک"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbSafetyEquipment").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "تجهیزات ایمنی"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbPathDirection").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "مسیر حرکت"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbFunctionAfterDamage").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "کارایی وسیله بعد از تصادف"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbTechnicalInspection").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "معاینه فنی"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbLoadType").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "نوع بار"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbAccidentTraces").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "آثار باقیمانده درصحنه"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbTypeOfCollision").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "نحوه برخورد"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbSex,#cmbSexPassenger").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "جنسیت"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbSeatBelt").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "کمربند / کلاه ایمنی"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbDriverStatues").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "وضعیت راننده وسیله ‌نقلیه"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbInjuryAtScene,#cmbInjuryPassenger").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "صدمه در صحنه"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbDriverLicenceCategory").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "نوع گواهینامه"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbDriverLicenceStatus").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "وضعیت گواهینامه"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbOnSiteCrossingFacilities,#cmbOnSiteCrossingFacilitiesBikeRiders").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "امکانات عبور در محل"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbSexPedestrians,#cmbSexBikeRiders").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "جنسیت"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbClothesColor,#cmbClothesColorBikeRiders").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "رنگ لباس"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});

    //$("#cmbPedestriansSituation,#cmbBikeRidersSituation,#cmbPassengerSituation").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "وضعیت"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbEducation,#cmbEducationPedestrians,#cmbEducationBikeRiders,#cmbEducationPassenger").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "تحصیلات"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbJob,#cmbJobPedestrians,#cmbJobBikeRiders,#cmbJobPassenger").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "شغل"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbSafetyPassenger").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "ایمنی"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbInjuredTransferMethod").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "نحوه انتقال مجروح"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbOrganizationsToBlame").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "سازمان های مقصر در تصادف"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbSelectAccidentCar").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "وسیله نقلیه آسیب دیده"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbFirstPointCollision").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "اولین نقطه برخورد"
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    //$("#cmbDamagedParts").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: "قسمت های آسیب دیده"
    //    },
    //    dir: 'rtl',
    //    width: '100%',
    //    closeOnSelect: false
    //});
    //$("#").select2({
    //    placeholder: {
    //        id: "-1",
    //        text: ""
    //    },
    //    dir: 'rtl',
    //    width: '100%'
    //});
    $('#dateDateOfAccident').MdPersianDateTimePicker({
        targetTextSelector: '#txtDateOfAccident',
        dateFormat: 'yyyy-MM-dd',
        isGregorian: false,
        enableTimePicker: false,
        fromDate: true,
        toDate: false,
        englishNumber: true,
        modalMode: true,
        groupId: 'group1',
        disableAfterToday: true
    });
    $('#dateDateOfFormCompletion').MdPersianDateTimePicker({
        targetTextSelector: '#txtDateOfFormCompletion',
        dateFormat: 'yyyy-MM-dd',
        isGregorian: false,
        enableTimePicker: false,
        fromDate: true,
        toDate: false,
        englishNumber: true,
        modalMode: true,
        groupId: 'group1'
    });
    $('#dateDateLicenceIssue').MdPersianDateTimePicker({
        targetTextSelector: '#txtDateLicenceIssue',
        dateFormat: 'yyyy-MM-dd',
        isGregorian: false,
        enableTimePicker: false,
        fromDate: true,
        toDate: false,
        englishNumber: true,
        modalMode: true,
        groupId: 'group1'
    });
}
function LoadSecondStep() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    if ($("#hidId").val() == "" || $("#cmbCrashType").val() != "-1") {
        $("#divSecondStep").show();
        $("#divFirstStep,#divThirdStep,#divFourthStep,#divFifthStep,#divSixthStep,#divSeventhStep").hide();
        $("#FirstStep,#ThirdStep,#FourthStep,#FifthStep,#SixthStep,#SeventhStep").removeClass("active");
        $("#SecondStep").addClass("active");
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val()
    }
    $('#spinSecondStepLoading').show();
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/LoadSecondStep",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split("#");
                    if (splt[0] == "") {
                        $("#divSecondStep").show();
                        $("#divFirstStep,#divThirdStep,#divFourthStep,#divFifthStep,#divSixthStep,#divSeventhStep").hide();
                        $("#FirstStep,#ThirdStep,#FourthStep,#FifthStep,#SixthStep,#SeventhStep").removeClass("active");
                        $("#SecondStep").addClass("active");
                        return false;
                    }
                    $("#cmbCrashType").val(splt[0]);
                    $("#cmbCrashScene").val(splt[1]);
                    $('#cmbCrashType,#cmbCrashScene').trigger('change');
                    var addingWitness = splt[2];
                    if (addingWitness == "True") {
                        $("#rdoAddingWitnessYes").prop("checked", true);
                        $("#cmbAddingWitness,#divWitness").show("slow");
                    } else if (addingWitness == "False" || addingWitness == "") $("#rdoAddingWitnessNo").prop("checked", true);
                    $("#cmbCollisionOfA").val(splt[3]);
                    $("#cmbCollisionOfATwo").val(splt[4]);
                    $('#cmbCollisionOfA,#cmbCollisionOfATwo').trigger('change');
                    var typeOfCollision = splt[5];
                    if (typeOfCollision == "برخورد زاویه‌ای") $("#rdoAngle").prop("checked", true);
                    else if (typeOfCollision == "برخورد جلو به عقب") $("#rdoRearEnd").prop("checked", true);
                    else if (typeOfCollision == "برخورد پهلو به پهلو غیر هم جهت") $("#rdoSidewipeOd").prop("checked", true);
                    else if (typeOfCollision == "برخورد رخ به رخ") $("#rdoHeadOn").prop("checked", true);
                    else if (typeOfCollision == "برخورد پهلو به پهلو هم جهت") $("#rdoSidewipeSd").prop("checked", true);
                    var splt2 = msg.d[0].MessageTwo.split("#");
                    $("#txtWitnessName").val(splt2[0]);
                    $("#txtWitnessPhone").val(splt2[1]);
                    $("#divSecondStep").show();
                    $("#divFirstStep,#divThirdStep,#divFourthStep,#divFifthStep,#divSixthStep,#divSeventhStep").hide();
                    $("#FirstStep,#ThirdStep,#FourthStep,#FifthStep,#SixthStep,#SeventhStep").removeClass("active");
                    $("#SecondStep").addClass("active");
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSecondStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadThirdStep() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    if ($("#hidId").val() == "" || $("#cmbRoadDefects").val() != "-1") {
        $("#divThirdStep").show();
        $("#divSecondStep,#divFirstStep,#divFourthStep,#divFifthStep,#divSixthStep,#divSeventhStep").hide();
        $("#SecondStep,#FirstStep,#FourthStep,#FifthStep,#SixthStep,#SeventhStep").removeClass("active");
        $("#ThirdStep").addClass("active");
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val()
    }
    $('#spinThirdStepLoading').show();
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/LoadThirdStep",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split("#");
                    if (splt[0] == "") {
                        $("#divThirdStep").show();
                        $("#divSecondStep,#divFirstStep,#divFourthStep,#divFifthStep,#divSixthStep,#divSeventhStep").hide();
                        $("#SecondStep,#FirstStep,#FourthStep,#FifthStep,#SixthStep,#SeventhStep").removeClass("active");
                        $("#ThirdStep").addClass("active");
                        return false;
                    }
                    $("#cmbRoadDefects").val(splt[0]);
                    $("#cmbCarriageWayDirection").val(splt[1]);
                    $("#cmbLightingStatus").val(splt[2]);
                    $("#cmbRoadSurfaceCondition").val(splt[3]);
                    $("#cmbVisualObstruction").val(splt[4]);
                    $('#cmbRoadDefects,#cmbCarriageWayDirection,#cmbLightingStatus,#cmbRoadSurfaceCondition,#cmbVisualObstruction').trigger('change');
                    var isShoulderRoad = splt[5];
                    if (isShoulderRoad == "True") {
                        $("#rdoShoulderOfTheRoadYes").prop("checked", true);
                        $(".shoulder-hide").show("slow");
                    } else if (isShoulderRoad == "False" || isShoulderRoad == "") $("#rdoShoulderOfTheRoadNo").prop("checked", true);
                    $("#cmbShoulderOfTheRoad").val(splt[6]);
                    $("#txtShouldersWidth").val(splt[7]);
                    if (splt[8] != "") {
                        $("#cmbRoadMaintenance").val(splt[8]);
                        $('#cmbRoadMaintenance').trigger('change');
                    }
                    if (splt[9] != "") {
                        $("#cmbRoadAssetsDamage").val(splt[9]);
                        $('#cmbRoadAssetsDamage').trigger('change');
                    }
                    $("#cmbLocationLandUse").val(splt[10]);
                    $("#cmbCarCrashLocation").val(splt[11]);
                    $("#cmbWeather").val(splt[12]);
                    $("#cmbGeometricDesign").val(splt[13]);
                    $('#cmbShoulderOfTheRoad,#cmbLocationLandUse,#cmbCarCrashLocation,#cmbWeather,#cmbGeometricDesign').trigger('change');
                    if (splt[14] != "") {
                        $("#cmbPavmentMarking").val(splt[14]);
                        $('#cmbPavmentMarking').trigger('change');
                    }
                    $("#txtRoadwayWidthMain").val(splt[15]);
                    $("#txtRoadwayWidthSubsidiary").val(splt[16]);
                    $("#txtRoadwayWidthVillage").val(splt[17]);
                    $("#txtMaximumSpeedLimit").val(splt[18]);
                    $("#divThirdStep").show();
                    $("#divSecondStep,#divFirstStep,#divFourthStep,#divFifthStep,#divSixthStep,#divSeventhStep").hide();
                    $("#SecondStep,#FirstStep,#FourthStep,#FifthStep,#SixthStep,#SeventhStep").removeClass("active");
                    $("#ThirdStep").addClass("active");
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinThirdStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadFourthStep() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    //if ($("#hidId").val() == "" || $("#cmbFinalReason").val() != "-1") {
    //    $("#divFourthStep").show();
    //    $("#divSecondStep,#divThirdStep,#divFirstStep,#divFifthStep,#divSixthStep,#divSeventhStep").hide();
    //    $("#SecondStep,#ThirdStep,#FirstStep,#FifthStep,#SixthStep,#SeventhStep").removeClass("active");
    //    $("#FourthStep").addClass("active");
    //    return false;
    //}
    var obj = {
        "accidentId": $("#hidId").val()
    }
    $('#spinFourthStepLoading').show();
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/LoadFourthStep",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split("#");
                    if (splt[0] == "") {
                        $("#divFourthStep").show();
                        $("#divFifthStep,#divSecondStep,#divThirdStep,#divFirstStep,#divSixthStep,#divSeventhStep").hide();
                        $("#SecondStep,#ThirdStep,#FirstStep,#FifthStep,#SixthStep,#SeventhStep").removeClass("active");
                        $("#FourthStep").addClass("active");
                        return false;
                    }
                    $("#cmbFinalReason").val(splt[0]);
                    if (splt[0] === "عدم توجه به جلو") {
                        $("#divLackOfAttention").show("slow");
                        $("#divInabilityControlVehicle").hide("slow");
                        $("#cmbLackOfAttention").val(splt[1]);
                        $('#cmbLackOfAttention').trigger('change');
                    }
                    if ($("#cmbFinalReason").val() === "عدم توانایی در کنترل نقلیه") {
                        $("#divInabilityControlVehicle").show("slow");
                        $("#divLackOfAttention").hide("slow");
                        $("#cmbInabilityControlVehicle").val(splt[2]);
                        $('#cmbInabilityControlVehicle').trigger('change');
                        return false;
                    }
                    $("#cmbVehicleFactorInCarCrash").val(splt[3]);
                    $('#cmbFinalReason,#cmbVehicleFactorInCarCrash').trigger('change');
                    if (splt[4] != "-1") {
                        $("#cmbHumanFactorInCarCrash").val(splt[4]);
                        $('#cmbHumanFactorInCarCrash').trigger('change');
                    }
                    if (splt[5] != "-1") {
                        $("#cmbJudicialCause").val(splt[5]);
                        $('#cmbJudicialCause').trigger('change');
                    }
                    $("#divFourthStep").show();
                    $("#divFifthStep,#divSecondStep,#divThirdStep,#divFirstStep,#divSixthStep,#divSeventhStep").hide();
                    $("#SecondStep,#ThirdStep,#FirstStep,#FifthStep,#SixthStep,#SeventhStep").removeClass("active");
                    $("#FourthStep").addClass("active");
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinFourthStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadSixStep() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    //if ($("#hidId").val() == "" || $("#cmbFinalReason").val() != "-1") {
    //    $("#divSixthStep").show();
    //    $("#divSecondStep,#divThirdStep,#divFirstStep,#divFifthStep,#divFourthStep,#divSeventhStep").hide();
    //    $("#SecondStep,#ThirdStep,#FirstStep,#FifthStep,#FourthStep,#SeventhStep").removeClass("active");
    //    $("#SixthStep").addClass("active");
    //    return false;
    //}
    var obj = {
        "accidentId": $("#hidId").val()
    }
    $('#spinSixthStepLoading').show();
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/LoadSixthStep",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    $("#divSixthStep").show();
                    $("#divSecondStep,#divThirdStep,#divFourthStep,#divFifthStep,#divFirstStep,#divSeventhStep").hide();
                    $("#SecondStep,#ThirdStep,#FourthStep,#FifthStep,#FirstStep,#SeventhStep").removeClass("active");
                    $("#SixthStep").addClass("active");
                    var splt = msg.d[0].Message.split("#");
                    if (splt[0] == "") return false;
                    $("#txtNumberOfInjured").val(splt[0]);
                    $("#txtNumberOfInjured").trigger("change");
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSixthStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadSeventhStep() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    var url = "/Accident/" + $("#hideAccidentGuid").val().replace(".jpg", "") + ".wav";
    $.ajax({
        url: "/Handle/FileIsExistsHandle.ashx?FileName=" + url,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        //async: false,
        success: function (data) {
            if (data == "True") {
                var recordingsList = document.getElementById("recordingsList");
                var au = document.createElement('audio');
                var li = document.createElement('li');
                au.controls = true;
                au.src = "/MediaUploader/Accident/" + $("#hideAccidentGuid").val().replace(".jpg", "") + ".wav";
                li.appendChild(au);
                li.appendChild(document.createElement('br'));
                var upload = document.createElement('a');
                upload.className = "btn btn-danger";
                upload.href = "javascript:void(0)";
                upload.innerHTML = "حذف فایل صوتی";
                upload.setAttribute("onclick", "DeleteAudio();");
                li.appendChild(document.createTextNode(" "));
                li.appendChild(upload);
                recordingsList.appendChild(li);
                var recordButton = document.getElementById("recordButton");
                recordButton.disabled = true;
            }
        },
        error: function () {

        }
    });
    var obj = {
        "accidentId": $("#hidId").val()
    }
    $('#spinSeventhStepLoading').show();
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/LoadPeopleAccident",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].PeopleAccident === "false") {
                    $("#lblMessage").html(CreateModal(msg.d[0].SelectPeopleAccident));
                    $('#MessageModal').modal();
                } else {
                    $("#divSeventhStep").show();
                    $("#divSecondStep,#divThirdStep,#divFourthStep,#divFifthStep,#divSixthStep,#divFirstStep").hide();
                    $("#SecondStep,#ThirdStep,#FourthStep,#FifthStep,#SixthStep,#FirstStep").removeClass("active");
                    $("#SeventhStep").addClass("active");
                    $("#divGenerateRowPeopleAccidentPercen").html(msg.d[0].PeopleAccident);
                    $("#divGenerateRowPeopleAccident").html(msg.d[0].InputPeopleAccident);
                    $("#cmbSelectAccidentCar").html(msg.d[0].SelectPeopleAccident);
                    $("#txtPrimaryCause").val(msg.d[0].PrimaryCause);
                    $("#txtFormerCause").val(msg.d[0].FormerCause);
                    $("#txtDirectCause").val(msg.d[0].DirectCause);
                    if (msg.d[0].OrganizationsToBlame !== "" && msg.d[0].OrganizationsToBlame !== "وزارت راه" && msg.d[0].OrganizationsToBlame !== "شهردار" && msg.d[0].OrganizationsToBlame !== "دهیاری") {
                        $("#cmbOrganizationsToBlame").val("سایر");
                        $("#txtOrganizationsToBlame").val(msg.d[0].OrganizationsToBlame);
                        $("#txtOtherDirectCausePrecent").val(msg.d[0].DirectCausePrecent);
                    } else {
                        $("#cmbOrganizationsToBlame").val(msg.d[0].OrganizationsToBlame);
                        $("#txtDirectCausePrecent").val(msg.d[0].DirectCausePrecent);
                    }
                    $("#cmbOrganizationsToBlame").trigger("change");
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSeventhStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}
function DeleteAudio() {
    var obj = {
        "accidentId": $("#hidId").val()
    }
    $.ajax({
        type: "POST",
        url: "/Handle/AccidentAudioHandle.ashx?GUID=" + $("#hideAccidentGuid").val() + "&IsRemove=true&Id=" + $("#hidId").val(),
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        //dataType: "json",
        success: function (msg) {
            $("#lblMessage").html(CreateModal("فایل صوتی با موفقیت حذف شد!"));
            $('#MessageModal').modal();
            var recordButton = document.getElementById("recordButton");
            recordButton.disabled = false;
            $("#recordingsList").html("");
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        complete: function () {
            //console.log("complete");
        },
        failure: function (response) {
            alert(response.d);
        }
    });
}
function DeleteAudioModal(name) {
    var obj = {
        "accidentId": $("#hidId").val()
    }
    $.ajax({
        type: "POST",
        url: "/Handle/AccidentAudioHandle.ashx?GUID=" + name + "-" + $("#hideAccidentGuid").val() + "&IsRemove=true&Id=" + $("#hidId").val(),
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (msg) {
            $("#lblMessage").html(CreateModal("فایل صوتی با موفقیت حذف شد!"));
            $('#MessageModal').modal();
            var recordButton = document.getElementById("recordButtonRecord");
            recordButton.disabled = false;
            $("#recordingsListRecord").html("");
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        complete: function () { },
        failure: function (response) {
            alert(response.d);
        }
    });
}
function GetCountFifthStep() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val()
    }
    $('#spinFifthStepLoading').show();
    $.ajax({
        type: "POST",
        url: "CheckAccident.aspx/GetCountFifthStep",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split("#");
                    if (splt[0] == "") return false;
                    $("#txtNumberOfVehiclesInvolved").val(splt[0]);
                    $("#txtNumberOfPedestriansInvolved").val(splt[1]);
                    $("#txtNumberOfBikeRidersInvolved").val(splt[2]);
                    $("#txtNumberOfVehiclesInvolved,#cmbVehiclesInvolved").trigger('change');
                }
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinFifthStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}
function FillVehiclesInvolved() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val(),
        "index": $("#cmbVehiclesInvolved").prop('selectedIndex')
    }
    $('#spinFifthStepLoading').show();
    $.ajax({
        type: "POST",
        url: "CheckAccident.aspx/LoadFifthStep",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split("#");
                    if (splt[2] == "") {
                        $("#rdoDriverFleeNo,#rdoVehicleHaveLoadNo,#rdoSystemIncompatibilityNo,#rdoAirbagFunctionNo,#rdoDriversIdentityYes,#rdoDriversIdentityNo,#rdoDriverLicenceIncompatibilityYes,#rdoDriverLicenceIncompatibilityNo").prop("checked", true);
                        $("#rdoDriverFleeNo,#rdoVehicleHaveLoadNo,#rdoSystemIncompatibilityNo,#rdoAirbagFunctionNo,#rdoDriversIdentityYes,#rdoDriversIdentityNo,#rdoDriverLicenceIncompatibilityYes,#rdoDriverLicenceIncompatibilityNo").trigger('change');
                        $("#rdoDriverFleeYes,#rdoDriverFleeNo,#rdoVehicleHaveLoadYes,#rdoVehicleHaveLoadNo,#rdoSystemIncompatibilityYes,#rdoSystemIncompatibilityNo,#rdoAirbagFunctionYes,#rdoAirbagFunctionNo").prop("checked", false);
                        $("#cmbVehicleType,#cmbVehicleManeuvering,#cmbPlateType,#cmbSafetyEquipment,#cmbPathDirection,#cmbFunctionAfterDamage,#cmbTechnicalInspection,#cmbLoadType,#cmbAccidentTraces,#cmbTypeOfCollision,#cmbSex,#cmbDriverLicenceCategory,#cmbDriverLicenceStatus,#cmbEducation,#cmbJob,#cmbSeatBelt,#cmbInjuryAtScene,#cmbDriverStatues").val('-1');
                        $('#cmbVehicleType,#cmbVehicleManeuvering,#cmbPlateType,#cmbSafetyEquipment,#cmbPathDirection,#cmbFunctionAfterDamage,#cmbTechnicalInspection,#cmbLoadType,#cmbAccidentTraces,#cmbTypeOfCollision,#cmbSex,#cmbDriverLicenceCategory,#cmbDriverLicenceStatus,#cmbEducation,#cmbJob,#cmbSeatBelt,#cmbInjuryAtScene,#cmbDriverStatues').trigger('change');
                        $("#txtPlateNumberBikeFirst,#txtPlateNumberBikeSecond,#txtPlateNumberFirst,#txtPlateNumberSecond,#txtPlateNumberThird,#txtPlateNumberFourt,#txtVehicleSystem,#txtSignsOnRoad,#txtCompanyOrganisation,#txtLoadFreight,#txtCodeCausingAccident,#txtNationalId,#txtFirstName,#txtLastName,#txtFatherName,#txtAge,#txtDriverLicenceNumber,#txtDateLicenceIssue,#txtPlaceLicenceIssue,#txtNumberOfPassengers,#txtTransferMethod,#txtReactionBeforeAccident,#txtBrakeTraceBeforeAccident,#txtBrakeTraceAfterAccident,#txtDistanceMoveAfterAccident,#txtAccelerationIncludings,#txtRoadFrictionFactor,#txtVehiclesHeightFromGround,#txtSlopeDegreeDirection,#txtBrakeAcceleration,#txtRoadsCurveRadius,#txtTierMarks,#txtQuDriverNoticedDanger,#txtQuDriverTime,#txtQuMaximumDistancePieces,#txtBrakeTraceTestSpeed,#txtTestSpeed").val('');
                        $('#divPelak').hide();
                        return false;
                    }
                    var driverFlee = splt[0];
                    if (driverFlee == "True") $("#rdoDriverFleeYes").prop("checked", true);
                    else if (driverFlee == "False") $("#rdoDriverFleeNo").prop("checked", true);
                    var vehicleType = splt[2];
                    $("#cmbVehicleType").val(vehicleType);
                    $('#cmbVehicleType').trigger('change');
                    var plateNumberFirst = splt[1].split("-");
                    if (vehicleType == "موتورسیکلت") {
                        $("#txtPlateNumberBikeFirst").val(plateNumberFirst[0]);
                        $("#txtPlateNumberBikeSecond").val(plateNumberFirst[1]);
                    } else {
                        $("#txtPlateNumberFirst").val(plateNumberFirst[0]);
                        $("#txtPlateNumberSecond").val(plateNumberFirst[1]);
                        $("#txtPlateNumberThird").val(plateNumberFirst[2]);
                        $("#txtPlateNumberFourt").val(plateNumberFirst[3]);
                    }
                    $("#txtVehicleSystem").val(splt[3]);
                    $("#cmbVehicleManeuvering").val(splt[4]);
                    $("#cmbPlateType").val(splt[5]);
                    $("#cmbSafetyEquipment").val(splt[6]);
                    $("#cmbPathDirection").val(splt[7]);
                    $("#txtSignsOnRoad").val(splt[8]);
                    $("#cmbFunctionAfterDamage").val(splt[9]);
                    $("#cmbTechnicalInspection").val(splt[10]);
                    $("#txtCompanyOrganisation").val(splt[11]);
                    var vehicleHaveLoad = splt[12];
                    if (vehicleHaveLoad == "True") {
                        $("#rdoVehicleHaveLoadYes").prop("checked", true);
                        $("#divLoadType,#divLoadFreight").show("slow");
                    } else if (vehicleHaveLoad == "False") {
                        $("#rdoVehicleHaveLoadNo").prop("checked", true);
                        $("#divLoadType,#divLoadFreight").hide("slow");
                    }
                    $("#cmbLoadType").val(splt[13]);
                    $("#txtLoadFreight").val(splt[14]);
                    var systemIncompatibility = splt[15];
                    if (systemIncompatibility == "True") $("#rdoSystemIncompatibilityYes").prop("checked", true);
                    else if (systemIncompatibility == "False") $("#rdoSystemIncompatibilityNo").prop("checked", true);
                    var airbagFunction = splt[16];
                    if (airbagFunction == "True") $("#rdoAirbagFunctionYes").prop("checked", true);
                    else if (airbagFunction == "False") $("#rdoAirbagFunctionNo").prop("checked", true);
                    $("#cmbAccidentTraces").val(splt[17]);
                    $("#cmbTypeOfCollision").val(splt[18]);
                    $('#cmbVehicleManeuvering,#cmbPlateType,#cmbSafetyEquipment,#cmbPathDirection,#cmbFunctionAfterDamage,#cmbTechnicalInspection,#cmbLoadType,#cmbAccidentTraces,#cmbTypeOfCollision').trigger('change');
                    $("#txtCodeCausingAccident").val(splt[19]);
                    var spltMessageTwo = msg.d[0].MessageTwo.split("#");
                    if (spltMessageTwo[0] !== "" || spltMessageTwo[1] !== "") {
                        $('#cmbVehiclesInvolved option[value="' + $("#cmbVehiclesInvolved").val() + '"]').text("راننده : " + spltMessageTwo[0] + " " + spltMessageTwo[1]);
                    }
                }
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinFifthStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}
function FillCmbVehiclesInvolved(index) {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val(),
        "index": index
    }
    $('#spinFifthStepLoading').show();
    $.ajax({
        type: "POST",
        url: "CheckAccident.aspx/FillCmbVehiclesInvolved",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split("#");
                    if (splt[0] !== "" || splt[1] !== "") {
                        $("#cmbVehiclesInvolved > option").each(function () {
                            var intIndex = parseInt(this.value) - 1;
                            if (intIndex == index) {
                                var $option = $(this);
                                $option.attr('value', parseInt(index) + 1);
                                $option.html("راننده : " + splt[0] + " " + splt[1]);
                            }
                        });

                    }
                }
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinFifthStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}
function FillCmbPedestriansInvolved(index) {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val(),
        "index": index
    }
    $('#spinPedestriansLoading').show();
    $.ajax({
        type: "POST",
        url: "CheckAccident.aspx/FillCmbPedestriansInvolved",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split("#");
                    if (splt[0] !== "" || splt[1] !== "") {
                        $('#cmbPedestriansInvolved option[value="' + $("#cmbPedestriansInvolved").val() + '"]').text("عابر : " + splt[0] + " " + splt[1]);
                    }
                }
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinPedestriansLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}
function FillCmbBikeRidersInvolved(index) {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val(),
        "index": index
    }
    $('#spinBikeRidersLoading').show();
    $.ajax({
        type: "POST",
        url: "CheckAccident.aspx/FillCmbBikeRidersInvolved",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split("#");
                    if (splt[0] !== "" || splt[1] !== "") {
                        $('#cmbBikeRidersInvolved option[value="' + $("#cmbBikeRidersInvolved").val() + '"]').text("راننده : " + splt[0] + " " + splt[1]);
                    }
                }
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinBikeRidersLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadFifthStep() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    GetCountFifthStep();
    if ($("#hidId").val() == "" || $("#cmbVehiclesInvolved").val() !== "-1") {
        $("#divFifthStep").show();
        $("#divFourthStep,#divSecondStep,#divThirdStep,#divFirstStep,#divSixthStep,#divSeventhStep").hide();
        $("#FourthStep,#SecondStep,#ThirdStep,#FirstStep,#FifthStep,#SixthStep,#SeventhStep").removeClass("active");
        $("#FifthStep").addClass("active");
        //$("#ShowVehiclesInvolved,#btnSubmitFifthStep").hide();
        //$("#divFifthStepTwo,#btnBackFifthStepTwo,#btnSubmitFifthStepTwo").show();
        return false;
    }
    FillVehiclesInvolved();
    return false;
}

function LoadFifthStepTwo() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    if ($("#txtBrakeTraceBeforeAccident").val() != "" || $("#txtBrakeTraceAfterAccident").val() != "" || $("#txtDistanceMoveAfterAccident").val() != "" || $("#txtAccelerationIncludings").val() != "" || $("#txtRoadFrictionFactor").val() != "" || $("#txtVehiclesHeightFromGround").val() != "" || $("#txtSlopeDegreeDirection").val() != "" || $("#txtBrakeAcceleration").val() != "" || $("#txtRoadsCurveRadius").val() != "" || $("#txtTierMarks").val() != "" || $("#txtQuDriverNoticedDanger").val() != "" || $("#txtQuDriverTime").val() != "" || $("#txtQuMaximumDistancePieces").val() != "" || $("#txtBrakeTraceTestSpeed").val() != "" || $("#txtTestSpeed").val() != "") return false;
    var obj = {
        "accidentId": $("#hidId").val(),
        "index": $("#cmbVehiclesInvolved").prop('selectedIndex')
    }
    $('#spinFifthStepLoading').show();
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/LoadFifthStepTwo",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split("#");
                    if (splt[0] == "") return false;
                    $("#txtBrakeTraceBeforeAccident").val(splt[0]);
                    $("#txtBrakeTraceAfterAccident").val(splt[1]);
                    $("#txtDistanceMoveAfterAccident").val(splt[2]);
                    $("#txtAccelerationIncludings").val(splt[3]);
                    $("#txtRoadFrictionFactor").val(splt[4]);
                    $("#txtVehiclesHeightFromGround").val(splt[5]);
                    $("#txtSlopeDegreeDirection").val(splt[6]);
                    $("#txtBrakeAcceleration").val(splt[7]);
                    $("#txtRoadsCurveRadius").val(splt[8]);
                    $("#txtTierMarks").val(splt[9]);
                    $("#txtQuDriverNoticedDanger").val(splt[10]);
                    $("#txtQuDriverTime").val(splt[11]);
                    $("#txtQuMaximumDistancePieces").val(splt[12]);
                    $("#txtBrakeTraceTestSpeed").val(splt[13]);
                    $("#txtTestSpeed").val(splt[14]);
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinFifthStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadFifthStepThree() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val(),
        "index": $("#cmbVehiclesInvolved").prop('selectedIndex')
    }
    $('#spinFifthStepLoading').show();
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/LoadFifthStepThree",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split("#");
                    if (splt[0] == "") return false;
                    var isDriversIdentity = splt[0];
                    if (isDriversIdentity == "True") {
                        $("#rdoDriversIdentityYes").prop("checked", true);
                        $("#rdoDriversIdentityYes").trigger('change');
                    } else if (isDriversIdentity == "False") {
                        $("#rdoDriversIdentityNo").prop("checked", true);
                        $("#rdoDriversIdentityNo").trigger('change');
                    }
                    $("#cmbSex").val(splt[1]);
                    $("#cmbSeatBelt").val(splt[2]);
                    $("#cmbDriverStatues").val(splt[3]);
                    $("#cmbInjuryAtScene").val(splt[4]);
                    $("#txtReactionBeforeAccident").val(splt[5]);
                    $("#txtNumberOfPassengers").val(splt[6]);
                    $("#txtNationalId").val(splt[7]);
                    $("#txtFirstName").val(splt[8]);
                    $("#txtLastName").val(splt[9]);
                    $("#txtFatherName").val(splt[10]);
                    $("#txtAge").val(splt[11]);
                    $("#txtDriverLicenceNumber").val(splt[12]);
                    $("#txtDateLicenceIssue").val(splt[13]);
                    $("#txtPlaceLicenceIssue").val(splt[14]);
                    $("#cmbDriverLicenceCategory").val(splt[15]);
                    $("#cmbDriverLicenceStatus").val(splt[16]);
                    var isDriverLicenceIncompatibility = splt[17];
                    if (isDriverLicenceIncompatibility == "True") $("#rdoDriverLicenceIncompatibilityYes").prop("checked", true);
                    else if (isDriverLicenceIncompatibility == "False") $("#rdoDriverLicenceIncompatibilityNo").prop("checked", true);
                    $("#cmbEducation").val(splt[18]);
                    $("#cmbJob").val(splt[19]);
                    $("#txtTransferMethod").val(splt[20]); $('#cmbSex,#cmbSeatBelt,#cmbDriverStatues,#cmbInjuryAtScene,#cmbDriverLicenceCategory,#cmbDriverLicenceStatus,#cmbEducation,#cmbJob').trigger('change');
                    $("#ShowVehiclesInvolved,#btnSubmitFifthStep,#btnSubmitFifthStepTwo,#divFifthStepTwo,#divFifthStepTwo2").hide();
                    $("#btnSubmitFifthStepThree,#btnBackFifthStepThree,#divFifthStepThree").show();
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinFifthStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadAccidentPedestrians() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    //if (($("#cmbOnSiteCrossingFacilities").val() != "" && $("#cmbOnSiteCrossingFacilities").val() != "-1") || ($("#cmbSex").val() != "" && $("#cmbSex").val() != "-1") || ($("#cmbClothesColor").val() != "" && $("#cmbClothesColor").val() != "-1") || ($("#cmbPedestriansSituation").val() != "" && $("#cmbPedestriansSituation").val() != "-1") || $("#txtPedestriansAverageSpeed").val() != "" || $("#txtPedestrianThrowDistance").val() != "" || $("#txtNationalIdPedestrians").val() != "" || $("#txtFirstNamePedestrians").val() != "" || $("#txtLastNamePedestrians").val() != "" || $("#txtFatherNamePedestrians").val() != "" || $("#txtAgePedestrians").val() != "" || ($("#cmbEducationPedestrians").val() != "" && $("#cmbEducationPedestrians").val() != "-1") || ($("#cmbJobPedestrians").val() != "" && $("#cmbJobPedestrians").val() != "-1")) return false;
    var obj = {
        "accidentId": $("#hidId").val(),
        "index": $("#cmbPedestriansInvolved").prop('selectedIndex')
    }
    $('#spinPedestriansLoading').show();
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/LoadAccidentPedestrians",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split("#");
                    //console.log(splt);
                    if (splt[0] == "") {
                        $("#rdoPedestriansIdentityNo").prop("checked", true);
                        $("#rdoPedestriansIdentityNo").trigger('change');
                        $("#rdoPedestriansIdentityYes,#rdoPedestriansIdentityNo").prop("checked", false);
                        $("#cmbOnSiteCrossingFacilities,#cmbSexPedestrians,#cmbClothesColor,#cmbPedestriansSituation,#cmbEducationPedestrians,#cmbJobPedestrians,#cmbClothesColor").val('-1');
                        $("#cmbOnSiteCrossingFacilities,#cmbSexPedestrians,#cmbClothesColor,#cmbPedestriansSituation,#cmbEducationPedestrians,#cmbJobPedestrians,#cmbClothesColor").trigger('change');
                        $("#txtPedestriansAverageSpeed,#txtPedestrianThrowDistance,#txtNationalIdPedestrians,#txtFirstNamePedestrians,#txtLastNamePedestrians,#txtFatherNamePedestrians,#txtAgePedestrians").val('');
                        return false;
                    }
                    $("#cmbOnSiteCrossingFacilities").val(splt[0]);
                    var isPedestriansIdentity = splt[1];
                    if (isPedestriansIdentity == "True") {
                        $("#rdoPedestriansIdentityYes").prop("checked", true);
                        $("#rdoPedestriansIdentityYes").trigger('change');
                    } else if (isPedestriansIdentity == "False") {
                        $("#rdoPedestriansIdentityNo").prop("checked", true);
                        $("#rdoPedestriansIdentityNo").trigger('change');
                    }
                    $("#cmbSexPedestrians").val(splt[2]);
                    $("#cmbClothesColor").val(splt[3]);
                    $("#cmbPedestriansSituation").val(splt[4]);
                    $("#txtPedestriansAverageSpeed").val(splt[5]);
                    $("#txtPedestrianThrowDistance").val(splt[6]);
                    $("#txtNationalIdPedestrians").val(splt[7]);
                    $("#txtFirstNamePedestrians").val(splt[8]);
                    $("#txtLastNamePedestrians").val(splt[9]);
                    $("#txtFatherNamePedestrians").val(splt[10]);
                    $("#txtAgePedestrians").val(splt[11]);
                    $("#cmbEducationPedestrians").val(splt[12]);
                    $("#cmbJobPedestrians").val(splt[13]);
                    $('#cmbOnSiteCrossingFacilities,#cmbClothesColor,#cmbPedestriansSituation,#cmbEducationPedestrians,#cmbJobPedestrians,#cmbSexPedestrians').trigger('change');
                    if (isPedestriansIdentity == "True" && (splt[8] !== "" || splt[9] !== "")) {
                        $('#cmbPedestriansInvolved option[value="' + $("#cmbPedestriansInvolved").val() + '"]').text(splt[8] + " " + splt[9]);
                    }
                    //$(".ShowVehiclesInvolved,#divFifthStepTwo,#divFifthStepTwo2,#divFifthStepThree,#divVehiclesButton").hide();
                    //$(".ShowPedestriansInvolved,#divPedestriansButton").show("slow");
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinPedestriansLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadAccidentBikeRiders() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    //if (($("#cmbOnSiteCrossingFacilities").val() != "" && $("#cmbOnSiteCrossingFacilities").val() != "-1") || ($("#cmbSex").val() != "" && $("#cmbSex").val() != "-1") || ($("#cmbClothesColor").val() != "" && $("#cmbClothesColor").val() != "-1") || ($("#cmbBikeRidersSituation").val() != "" && $("#cmbBikeRidersSituation").val() != "-1") || $("#txtBikeRidersAverageSpeed").val() != "" || $("#txtPedestrianThrowDistance").val() != "" || $("#txtNationalIdBikeRiders").val() != "" || $("#txtFirstNameBikeRiders").val() != "" || $("#txtLastNameBikeRiders").val() != "" || $("#txtFatherNameBikeRiders").val() != "" || $("#txtAgeBikeRiders").val() != "" || ($("#cmbEducationBikeRiders").val() != "" && $("#cmbEducationBikeRiders").val() != "-1") || ($("#cmbJobBikeRiders").val() != "" && $("#cmbJobBikeRiders").val() != "-1")) return false;
    var obj = {
        "accidentId": $("#hidId").val(),
        "index": $("#cmbBikeRidersInvolved").prop('selectedIndex')
    }
    $('#spinBikeRidersLoading').show();
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/LoadAccidentBikeRiders",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split("#");
                    if (splt[0] == "") {
                        $("#rdoBikeRidersIdentityNo").prop("checked", true);
                        $("#rdoBikeRidersIdentityNo").trigger('change');
                        $("#rdoBikeRidersIdentityYes,#rdoBikeRidersIdentityNo").prop("checked", false);
                        $("#cmbOnSiteCrossingFacilitiesBikeRiders,#cmbSexBikeRiders,#cmbClothesColorBikeRiders,#cmbBikeRidersSituation,#cmbEducationBikeRiders,#cmbJobBikeRiders").val('-1');
                        $("#cmbOnSiteCrossingFacilitiesBikeRiders,#cmbSexBikeRiders,#cmbClothesColorBikeRiders,#cmbBikeRidersSituation,#cmbEducationBikeRiders,#cmbJobBikeRiders").trigger('change');
                        $("#txtBikeRidersAverageSpeed,#txtBikeRidersThrowDistance,#txtNationalIdBikeRiders,#txtFirstNameBikeRiders,#txtLastNameBikeRiders,#txtFatherNameBikeRiders,#txtAgeBikeRiders").val('');
                        return false;
                    }
                    $("#cmbOnSiteCrossingFacilitiesBikeRiders").val(splt[0]);
                    var isBikeRidersIdentity = splt[1];
                    if (isBikeRidersIdentity == "True") {
                        $("#rdoBikeRidersIdentityYes").prop("checked", true);
                        $("#rdoBikeRidersIdentityYes").trigger('change');
                    } else if (isBikeRidersIdentity == "False") {
                        $("#rdoBikeRidersIdentityNo").prop("checked", true);
                        $("#rdoBikeRidersIdentityNo").trigger('change');
                    }
                    $("#cmbSexBikeRiders").val(splt[2]);
                    $("#cmbClothesColorBikeRiders").val(splt[3]);
                    $("#cmbBikeRidersSituation").val(splt[4]);
                    $("#txtBikeRidersAverageSpeed").val(splt[5]);
                    $("#txtBikeRidersThrowDistance").val(splt[6]);
                    $("#txtNationalIdBikeRiders").val(splt[7]);
                    $("#txtFirstNameBikeRiders").val(splt[8]);
                    $("#txtLastNameBikeRiders").val(splt[9]);
                    $("#txtFatherNameBikeRiders").val(splt[10]);
                    $("#txtAgeBikeRiders").val(splt[11]);
                    $("#cmbEducationBikeRiders").val(splt[12]);
                    $("#cmbJobBikeRiders").val(splt[13]);
                    $('#cmbOnSiteCrossingFacilitiesBikeRiders,#cmbClothesColorBikeRiders,#cmbBikeRidersSituation,#cmbEducationBikeRiders,#cmbJobBikeRiders,#cmbSexBikeRiders').trigger('change');
                    if (isBikeRidersIdentity == "True" && (splt[8] !== "" || splt[9] !== "")) {
                        $('#cmbBikeRidersInvolved option[value="' + $("#cmbBikeRidersInvolved").val() + '"]').text(splt[8] + " " + splt[9]);
                    }
                    //$(".ShowVehiclesInvolved,#divFifthStepTwo,#divFifthStepTwo2,#divFifthStepThree,#divVehiclesButton").hide();
                    //$(".ShowBikeRidersInvolved,#divBikeRidersButton").show("slow");
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinBikeRidersLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function ShowInjuredDetail(id) {
    SelectInput(id);
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    var injuredRole = $('input[type=radio][name=InjuredRole]:checked').val();
    var obj = {
        "id": id,
        "injuredRole": injuredRole
    }
    $('#spinSixthStepLoading').show();
    $.ajax({
        type: "POST",
        url: "CheckAccident.aspx/ShowInjuredDetail",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    if (msg.d[0].Message == "####") {
                        $("#txtFirstNameInjured").val("");
                        $("#txtLastNameInjured").val("");
                        $("#txtAmbulanceCode").val("");
                        $("#txtInjury").val("");
                        $("#cmbInjuredTransferMethod,#cmbInjuryPassenger").val("-1");
                        $("#cmbInjuredTransferMethod,#cmbInjuryPassenger").trigger('change');
                        $("#divInjuredRole").show("slow");
                        ShowDivDet(injuredRole);
                        return false;
                    }
                    var splt = msg.d[0].Message.split("#");
                    $("#txtFirstNameInjured").val(splt[0]);
                    $("#txtLastNameInjured").val(splt[1]);
                    $("#txtAmbulanceCode").val(splt[3]);
                    if (injuredRole == "Driver") {
                        $("#txtInjury").val(splt[4]);
                        $("#txtDriverInjured").val(splt[5]);
                    }
                    else if (injuredRole == "Pedestrian" || injuredRole == "Cyclist") {
                        $("#cmbInjuryPassenger").val(splt[4]);
                        $("#cmbInjuryPassenger").trigger('change');
                    }
                    if (splt[2] != "")
                        $("#cmbInjuredTransferMethod").val(splt[2]);
                    else
                        $("#cmbInjuredTransferMethod").val("-1");
                    $("#cmbInjuredTransferMethod").trigger('change');
                    $("#divInjuredRole").show("slow");
                    var spltPassenger = msg.d[0].Id.split("#");
                    if (injuredRole == "Passenger") {
                        var isIdentity = spltPassenger[0];
                        if (isIdentity == "True") {
                            $("#rdoPassengerIdentityYes").prop("checked", true);
                            $("#rdoPassengerIdentityYes").trigger('change');
                        } else if (isIdentity == "False") {
                            $("#rdoPassengerIdentityNo").prop("checked", true);
                            $("#rdoPassengerIdentityNo").trigger('change');
                        }
                        $("#cmbSexPassenger").val(spltPassenger[1]);
                        $("#txtNationalIdPassenger").val(spltPassenger[2]);
                        $("#txtFatherNamePassenger").val(spltPassenger[3]);
                        $("#txtAgePassenger").val(spltPassenger[4]);
                        $("#cmbEducationPassenger").val(spltPassenger[5]);
                        $("#cmbJobPassenger").val(spltPassenger[6]);
                        $("#cmbInjuryPassenger").val(spltPassenger[7]);
                        $("#cmbSafetyPassenger").val(spltPassenger[8]);
                        $("#cmbPassengerSituation").val(spltPassenger[9]);
                        $("#cmbSexPassenger,#cmbEducationPassenger,#cmbJobPassenger,#cmbInjuryPassenger,#cmbSafetyPassenger,#cmbPassengerSituation").trigger('change');
                    }
                    ShowDivDet(injuredRole);
                }
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSixthStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}
function InjuredDetail(index) {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    var name = $('input[type=radio][name=InjuredRole]').val();
    var obj = {
        "accidentId": $("#hidId").val(),
        "index": index,
        "name": name
    }
    $('#spinSixthStepLoading').show();
    $('#divGenarateInjuredList').children('div').each(function () {
        if ($(this).attr("data-id") == index) {
            $(this).addClass("activeborder");
        } else {
            $(this).removeClass("activeborder");
        }
    });
    $.ajax({
        type: "POST",
        url: "CheckAccident.aspx/LoadInjuredDetail",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split("#");
                    if (splt[0] !== "") {
                        $('#txtFirstNameInjured').val(splt[0]);
                        $('#txtLastNameInjured').val(splt[1]);
                        $('#txtDriverInjured').val(splt[4]);
                        $('#cmbInjuredTransferMethod').val(splt[2]);
                        $('#txtAmbulanceCode').val(splt[3]);
                    }
                    $("#divInjuredDetailReadOnly,#divInjuredDetail").show("slow");
                }
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSixthStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}
function LoadInjuredRole(name) {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val(),
        "name": name
    }
    $('#spinSixthStepLoading').show();
    $.ajax({
        type: "POST",
        url: "CheckAccident.aspx/LoadInjuredRole",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                    $("#divGenarateInjuredList").hide('slow');
                } else {
                    $('#divGenarateInjuredList').html(msg.d[0].Message);
                    if (msg.d[0].Message !== "")
                        $("#divGenarateInjuredList").show('slow');
                }
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSixthStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}
function SelectInjured(index) {
    $('#divGenarateInjured').children('div').each(function () {
        if ($(this).attr("data-index") == index) {
            $(this).addClass("activeborder");
            if ($(this).attr("data-role") == "Pedestrian") {
                $("#rdoIsDrive,#rdoIsCyclist,#rdoIsPassenger").removeAttr("checked");
                $("#rdoIsPedestrian").prop("checked", true);
                $(".InjuredRole").trigger('change');
            } else if ($(this).attr("data-role") == "Driver") {
                $("#rdoIsPedestrian,#rdoIsCyclist,#rdoIsPassenger").removeAttr("checked");
                $("#rdoIsDrive").prop("checked", true);
                $(".InjuredRole").trigger('change');
            } else if ($(this).attr("data-role") == "Cyclist") {
                $("#rdoIsPedestrian,#rdoIsDrive,#rdoIsPassenger").removeAttr("checked");
                $("#rdoIsCyclist").prop("checked", true);
                $(".InjuredRole").trigger('change');
            } else if ($(this).attr("data-role") == "Passenger") {
                $("#rdoIsPedestrian,#rdoIsCyclist,#rdoIsDrive").removeAttr("checked");
                $("#rdoIsPassenger").prop("checked", true);
                $(".InjuredRole").trigger('change');
            }
        } else {
            $(this).removeClass("activeborder");
        }

    });
    return false;
}
function SelectInput(id) {
    $('#divGenarateInjuredList').children('div').each(function () {
        if ($(this).attr("data-id") == id) {
            $(this).addClass("activeborder");
        } else {
            $(this).removeClass("activeborder");
        }
    });
    return false;
}
function FillInjured(index) {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val(),
        "index": index
    }
    $('#spinSixthStepLoading').show();
    $.ajax({
        type: "POST",
        url: "CheckAccident.aspx/FillInjured",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message.split("|");
                    var splt2 = msg.d[0].MessageTwo.split("|");
                    var indx = 0;
                    var spltName;
                    if (splt[0] !== "" || splt[1] !== "" || splt2[0] !== "" || splt2[1] !== "") {
                        $('#divGenarateInjured').html("");
                    }
                    if (splt[1] !== "") {
                        spltName = splt[1].split("#");
                        $.each(spltName, function (index, value) {
                            if (value.trim() !== "") {
                                $('#divGenarateInjured').html($('#divGenarateInjured').html() + "<div data-role='Driver' onclick='SelectInjured(" + indx + ")' class='accident-right' data-index='" + indx + "'>" + value + "</div>");
                                indx++;
                            }
                        });
                    }
                    if (splt[0] !== "") {
                        spltName = splt[0].split("#");
                        $.each(spltName, function (index, value) {
                            if (value.trim() != "") {
                                $('#divGenarateInjured').html($('#divGenarateInjured').html() + "<div data-role='Pedestrian' onclick='SelectInjured(" + indx + ")' class='accident-right' data-index='" + indx + "'>" + value + "</div>");
                                indx++;
                            }
                        });
                    }
                    if (splt2[0] !== "") {
                        spltName = splt2[0].split("#");
                        $.each(spltName, function (index, value) {
                            if (value.trim() !== "") {
                                $('#divGenarateInjured').html($('#divGenarateInjured').html() + "<div data-role='Cyclist' onclick='SelectInjured(" + indx + ")' class='accident-right' data-index='" + indx + "'>" + value + "</div>");
                                indx++;
                            }
                        });
                    }
                    if (splt2[1] !== "") {
                        spltName = splt2[1].split("#");
                        $.each(spltName, function (index, value) {
                            if (value.trim() !== "") {
                                $('#divGenarateInjured').html($('#divGenarateInjured').html() + "<div data-role='Passenger' onclick='SelectInjured(" + indx + ")' class='accident-right' data-index='" + indx + "'>" + value + "</div>");
                                indx++;
                            }
                        });
                    }
                    //$('#divGenarateInjuredList').show("slow");
                }
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSixthStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}
function ShowDivDet(getVal) {
    if (getVal == "Driver") {
        $("#divInjuredDetailReadOnly,#divFirstNameInjured,#divLastNameInjured,#divDriverInjured,#divInjuredDetail,#divInjuredTransferMethod,#divAmbulanceCode").removeClass('hide');
        $("#divPassengerIdentity,#divSexPassenger,#divSafetyPassenger,#divPassengerSituation").addClass('hide');
        $('#cmbInjuryPassenger').next(".select2-container").hide();
        $("#txtInjury").show();
        $(".PassengerIdentityHide").hide();
    } else if (getVal == "Pedestrian" || getVal == "Cyclist") {
        $("#divInjuredDetailReadOnly,#divFirstNameInjured,#divLastNameInjured,#divInjuredDetail,#divInjuredTransferMethod,#divAmbulanceCode").removeClass('hide');
        $('#cmbInjuryPassenger').next(".select2-container").show();
        $("#txtInjury").hide();
        $("#divDriverInjured").addClass('hide');
        $("#divPassengerIdentity,#divSexPassenger,#divSafetyPassenger,#divPassengerSituation").addClass('hide');
        if (getVal == "Cyclist") {
            $(".PassengerIdentityHide,#txtInjury").hide();
        }
    } else if (getVal == "Passenger") {
        $('#cmbInjuryPassenger').next(".select2-container").show();
        $("#txtInjury").hide();
        $("#divInjuredDetailReadOnly,#divPassengerIdentity,#divSexPassenger,#divSafetyPassenger,#divPassengerSituation,#divInjuredDetail,#divInjuredTransferMethod,#divAmbulanceCode").removeClass('hide');
        $("#divDriverInjured,#divFirstNameInjured,#divLastNameInjured").addClass('hide');
    } else {
        $('#cmbInjuryPassenger').next(".select2-container").hide();
        $("#txtInjury").show();
        $(".PassengerIdentityHide,#txtInjury").hide();
    }
}
//function SaveExplanationAudio() {

//    var formData = new FormData();
//    var files = $('.attachment');
//    $.each(files, function (key, value) {
//        var file = $(value).data('file');
//        formData.append(file.name, file);
//    });

//    $.ajax({
//        url: "FileUploadHandler.ashx",
//        type: "POST",
//        contentType: false, // Not to set any content header  
//        processData: false, // Not to process data  
//        data: formData,
//        success: function (result) {
//            alert(result);
//        },
//        error: function (err) {
//            alert(err.statusText);
//        }
//    });
//}
$(document).ready(function () {
     
    $("input[type='text']").on('blur', function () { $(".error").hide("slow"); });
    $('.clockpicker').clockpicker({
        placement: 'bottom',
        align: 'right',
        donetext: 'انتخاب'
    });
    $("#cmbAddingWitness").on('change', function () {
        if ($("#hidId").val() == "") return false;
        $('#spinWitnessLoading').show();
        $('#btnSubmitWitness').button("loading");
        var obj = {
            "accidentId": $("#hidId").val(),
            "index": $("#cmbAddingWitness").prop('selectedIndex')
        }
        $.ajax({
            type: "POST",
            url: "CheckAccident.aspx/GetWitness",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg != null) {
                    if (msg.d[0].IsSuccess != "true") {
                        $("#lblMessage").html(CreateModal(msg.d[0].Message));
                        $('#MessageModal').modal();
                    } else {
                        $("#txtWitnessName").val(msg.d[0].Message);
                        $("#txtWitnessPhone").val(msg.d[0].MessageTwo);
                    }
                }
                else {
                    alert("خطا در برقراری ارتباط با سرور!");
                }
            },
            complete: function () {
                $('#spinWitnessLoading').hide();
                $("#btnSubmitWitness").button("reset");
            },
            error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
                alert(response.d);
            }
        });
        return false;
    });
    $("#cmbCollisionOfA,#cmbCollisionOfATwo").on('change', function () {
        if ($("#cmbCollisionOfA").val() === "وسیله نقلیه" && $("#cmbCollisionOfATwo").val() === "یک وسیله نقلیه") {
            $(".collision-in-line").show("slow");
        } else {
            $(".collision-in-line").hide("slow");
            $(".typeOfCollision").prop("checked", false);
        }
    });
    $("#txtRoadwayWidthMain,#txtRoadwayWidthSubsidiary,#txtRoadwayWidthVillage").on('keyup mouseup', function () {
        if ($("#txtRoadwayWidthMain").val() !== "") $("#txtRoadwayWidthSubsidiary, #txtRoadwayWidthVillage").attr("disabled", "");
        else if ($("#txtRoadwayWidthSubsidiary").val() !== "") $("#txtRoadwayWidthMain, #txtRoadwayWidthVillage").attr("disabled", "");
        else if ($("#txtRoadwayWidthVillage").val() !== "") $("#txtRoadwayWidthMain, #txtRoadwayWidthSubsidiary").attr("disabled", "");
        if ($("#txtRoadwayWidthMain").val() == "" && $("#txtRoadwayWidthSubsidiary").val() == "" && $("#txtRoadwayWidthVillage").val() == "") $("#txtRoadwayWidthMain,#txtRoadwayWidthSubsidiary, #txtRoadwayWidthVillage").removeAttr("disabled");
    });
    $("#cmbVehicleType").on('change', function () {
        if ($("#cmbVehicleType").prop('selectedIndex') > 0)
            $("#divPelak").show("slow");
        if (($("#cmbVehicleType").prop('selectedIndex') > 0 && $("#cmbVehicleType").prop('selectedIndex') < 10) || $("#cmbVehicleType").val() === "تریلی" || $("#cmbVehicleType").val() === "تانکر حمل مواد خطرناک") {
            $("#divPelakKhodro").show("slow");
            $("#divPelakMotor").hide("slow");
        } else if ($("#cmbVehicleType").val() === "موتورسیکلت") {
            $("#divPelakKhodro").hide("slow");
            $("#divPelakMotor").show("slow");
            $("#cmbPlateType,#cmbSafetyEquipment").next(".select2-container").hide("slow");
        }
        if ($("#cmbVehicleType").val() !== "موتورسیکلت" && $("#cmbPlateType").next(".select2-container").css('display') === 'none') $("#cmbPlateType,#cmbSafetyEquipment").next(".select2-container").show("slow");
    });
    $('input[type=radio][name=AddingWitness]').on('change', function () {
        switch ($(this).val()) {
            case 'Yes':
                $("#cmbAddingWitness,#divWitness").show("slow");
                $("#cmbAddingWitness").css("display", "block");
                break;
            case 'No':
                $("#cmbAddingWitness,#divWitness").hide("slow");
                break;
        }
    });
    $('input[type=radio][name=ShoulderOfTheRoad]').on('change', function () {
        switch ($(this).val()) {
            case 'Yes':
                $(".shoulder-hide").show("slow");
                $("#whiteHide").css("height", "auto");
                break;
            case 'No':
                $(".shoulder-hide").hide("slow");
                $("#whiteHide").css("height", "157px");
                break;
        }
    });
    $('input[type=radio][name=VehicleHaveLoad]').on('change', function () {
        switch ($(this).val()) {
            case 'Yes':
                $("#divLoadType,#divLoadFreight").show("slow");
                break;
            case 'No':
                $("#divLoadType,#divLoadFreight").hide("slow");
                break;
        }
    });
    $('input[type=radio][name=DriversIdentity]').on('change', function () {
        switch ($(this).val()) {
            case 'Yes':
                $(".driversIdentityHide").show("slow");
                break;
            case 'No':
                $(".driversIdentityHide").hide("slow");
                break;
        }
    });
    $('input[type=radio][name=PedestriansIdentity]').on('change', function () {
        switch ($(this).val()) {
            case 'Yes':
                $(".pedestriansIdentityHide").show("slow");
                break;
            case 'No':
                $(".pedestriansIdentityHide").hide("slow");
                break;
        }
    });
    $('input[type=radio][name=BikeRidersIdentity]').on('change', function () {
        switch ($(this).val()) {
            case 'Yes':
                $(".BikeRidersIdentityHide").show("slow");
                break;
            case 'No':
                $(".BikeRidersIdentityHide").hide("slow");
                break;
        }
    });
    $("#cmbDriverStatues").on('change', function () {
        var getVal = $(this).val();
        if (getVal === 'در صحنه حضور دارد' || getVal === 'از صحنه متواری شده')
            $("#txtTransferMethod").attr("disabled", "");
        else {
            if ($("#txtTransferMethod").attr("disabled")) $("#txtTransferMethod").removeAttr("disabled");
        }
    });
    $("#cmbInjuredTransferMethod").on('change', function () {
        var getVal = $(this).val();
        if (getVal === 'آمبولانس')
            $("#divAmbulanceCode").removeClass("hide");
        else if (!$("#divAmbulanceCode").hasClass("hide")) {
            $("#divAmbulanceCode").addClass("hide");
        }
    });
    $("#cmbFinalReason").on('change', function () {
        if ($("#cmbFinalReason").val() === "عدم توجه به جلو") {
            $("#divLackOfAttention").show("slow");
            $("#divInabilityControlVehicle").hide("slow");
        } else if ($("#cmbFinalReason").val() === "عدم توانایی در کنترل نقلیه") {
            $("#divInabilityControlVehicle").show("slow");
            $("#divLackOfAttention").hide("slow");
        } else {
            $("#divLackOfAttention,#divInabilityControlVehicle").hide("slow");
        }
    });
    $("#cmbSelectAccidentCar").on('change', function () {
        $('#spinSeventhDamageLoading').show();
        $('#btnSubmitDamage').button("loading");
        var obj = {
            "accidentId": $("#hidId").val(),
            "accidentCar": $("#cmbSelectAccidentCar").val()
        }
        $.ajax({
            type: "POST",
            url: "CheckAccident.aspx/GetAccidentCarDamage",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg != null) {
                    if (msg.d[0].IsSuccess != "true") {
                        $("#lblMessage").html(CreateModal(msg.d[0].Message));
                        $('#MessageModal').modal();
                    } else {
                        $("#cmbFirstPointCollision").val(msg.d[0].Message);
                        var splitString = msg.d[0].MessageTwo.split(",");
                        $("#cmbDamagedParts").val(splitString);
                        $("#cmbFirstPointCollision").trigger("change");
                        $("#cmbDamagedParts").trigger("change");
                    }
                }
                else {
                    alert("خطا در برقراری ارتباط با سرور!");
                }
            },
            complete: function () {
                $('#spinSeventhDamageLoading').hide();
                $("#btnSubmitDamage").button("reset");
            },
            error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
                alert(response.d);
            }
        });
    });
    $("#txtNumberOfVehiclesInvolved").on('click', function () {
        $("#txtNumberOfVehiclesInvolved").removeAttr("readonly");
        if ($("#txtNumberOfVehiclesInvolved").val() == "0") $("#txtNumberOfVehiclesInvolved").val("");
        $("#txtNumberOfPedestriansInvolved,#txtNumberOfBikeRidersInvolved").attr("readonly", "");
        $("#txtNumberOfVehiclesInvolved").focus();
        //ShowPedestriansInvolved/.
    });
    $("#txtNumberOfPedestriansInvolved").on('click', function () {
        $("#txtNumberOfPedestriansInvolved").removeAttr("readonly");
        if ($("#txtNumberOfPedestriansInvolved").val() == "0") $("#txtNumberOfPedestriansInvolved").val("");
        $("#txtNumberOfVehiclesInvolved,#txtNumberOfBikeRidersInvolved").attr("readonly", "");
        $("#txtNumberOfPedestriansInvolved").focus();
    });
    $("#txtNumberOfBikeRidersInvolved").on('click', function () {
        $("#txtNumberOfBikeRidersInvolved").removeAttr("readonly");
        if ($("#txtNumberOfBikeRidersInvolved").val() == "0") $("#txtNumberOfBikeRidersInvolved").val("");
        $("#txtNumberOfPedestriansInvolved,#txtNumberOfVehiclesInvolved").attr("readonly", "");
        $("#txtNumberOfBikeRidersInvolved").focus();
    });
    $("#txtNumberOfVehiclesInvolved").on('keyup focus', function () {
        var getVal = parseInt($(this).val());
        if (getVal > 0) {
            $("#divAddCounterVehiclesInvolved").show("slow");
            $("#cmbVehiclesInvolved").html("");
            for (var i = 1; i <= getVal; i++) {
                var getSel = $("#cmbVehiclesInvolved").html();
                $("#cmbVehiclesInvolved").html(getSel + "<option value='" + i + "'>" + "وسیله نقلیه " + i + "</option>");
            }
            FillVehiclesInvolved();
            $(".ShowVehiclesInvolved,#divVehiclesButton,#btnSubmitFifthStep").show("slow"); $("#btnBackFifthStepTwo,#btnSubmitFifthStepTwo,#btnBackFifthStepThree,#btnSubmitFifthStepThree,.ShowBikeRidersInvolved,.ShowPedestriansInvolved,.pedestriansIdentityHide,.BikeRidersIdentityHide,#divBikeRidersButton,#divPedestriansButton,#divFifthStepTwo,#divFifthStepTwo2").hide();
            $("#cmbVehiclesInvolved option").each(function () {
                var intIndex = parseInt(this.value) - 1;
                FillCmbVehiclesInvolved(intIndex);
                console.log(intIndex);
            });
        } else if (getVal == 0) {
            $("#txtNumberOfVehiclesInvolved").attr("readonly", "");
            $("#txtNumberOfPedestriansInvolved").removeAttr("readonly");
            $("#txtNumberOfPedestriansInvolved").focus();
            $(".ShowVehiclesInvolved,#divAddCounterVehiclesInvolved,#divVehiclesButton").hide("slow");
        } else {
            $(".ShowVehiclesInvolved,#divAddCounterVehiclesInvolved").hide("slow");
        }
    });
    $("#txtNumberOfPedestriansInvolved").on('keydown keyup focus enter', function () {
        var getVal = parseInt($(this).val());
        if (getVal > 0) {
            $(".ShowPedestriansInvolved,#divAddCounterPedestriansInvolved").show("slow");
            $("#cmbPedestriansInvolved").html("");
            for (var i = 1; i <= getVal; i++) {
                var getSel = $("#cmbPedestriansInvolved").html();
                $("#cmbPedestriansInvolved").html(getSel + "<option value='" + i + "'>عابر پیاده درگیر در تصادف " + i.toString() + "</option>");
            }
            LoadAccidentPedestrians();
            $(".ShowVehiclesInvolved,.ShowBikeRidersInvolved,#divFifthStepTwo,#divFifthStepTwo2,#divFifthStepThree,#divVehiclesButton,#divBikeRidersButton").hide();
            $(".ShowPedestriansInvolved,#divPedestriansButton").show("slow");
            $("#cmbPedestriansInvolved > option").each(function () {
                var intIndex = parseInt(this.value) - 1;
                FillCmbPedestriansInvolved(intIndex);
            });
        } else if (getVal == 0) {
            $("#txtNumberOfVehiclesInvolved,#txtNumberOfPedestriansInvolved").attr("readonly", "");
            $("#txtNumberOfBikeRidersInvolved").removeAttr("readonly");
            $(".ShowPedestriansInvolved,#divAddCounterPedestriansInvolved,#divPedestriansButton").hide("slow");
        } else {
            $(".ShowPedestriansInvolved,#divAddCounterPedestriansInvolved").hide("slow");
        }
    });
    //$("#txtSerial").on('keydown keyup', function() {
    //    $(this).val($(this).val().replace(/[^0-9]/g, ''));
    //});
    $("#txtNumberOfBikeRidersInvolved").on('keydown keyup focus enter', function () {
        var getVal = parseInt($(this).val());
        if (getVal > 0) {
            $(".ShowBikeRidersInvolved,#divAddCounterBikeRidersInvolved").show("slow");
            $("#cmbBikeRidersInvolved").html("");
            for (var i = 1; i <= getVal; i++) {
                var getSel = $("#cmbBikeRidersInvolved").html();
                $("#cmbBikeRidersInvolved").html(getSel + "<option value='" + i + "'>دوچرخه ‌سوار درگیر در تصادف " + i.toString() + "</option>");
            }
            LoadAccidentBikeRiders();
            $(".ShowPedestriansInvolved,.ShowVehiclesInvolved,#divFifthStepTwo,#divFifthStepTwo2,#divFifthStepThree,#divVehiclesButton,#divPedestriansButton").hide();
            $(".ShowBikeRidersInvolved,#divBikeRidersButton").show("slow");
            $("#cmbBikeRidersInvolved > option").each(function () {
                var intIndex = parseInt(this.value) - 1;
                FillCmbBikeRidersInvolved(intIndex);
            });

            //}
        } else if (getVal == 0) {
            $("#txtNumberOfVehiclesInvolved,#txtNumberOfPedestriansInvolved").attr("readonly", "");
            //$("#txtNumberOfBikeRidersInvolved").removeAttr("readonly");
            //$("#txtNumberOfBikeRidersInvolved").focus();
            $(".ShowPedestriansInvolved,#divAddCounterPedestriansInvolved,#divBikeRidersButton").hide("slow");

        } else {
            $(".ShowBikeRidersInvolved,#divAddCounterBikeRidersInvolved").hide("slow");
        }
    });
    $("#txtNumberOfBikeRidersInvolved").on('keyup', function () {
        if ($('#txtNumberOfBikeRidersInvolved').val() == "0") $('#SixthStep').trigger("click");
    });
    $("#cmbVehiclesInvolved").on('change', function () {
        if ($("#cmbVehiclesInvolved").val() != null && $("#cmbVehiclesInvolved").val() != "" && $("#cmbVehiclesInvolved").val() != "-1") FillVehiclesInvolved();
    });
    $("#cmbPedestriansInvolved").on('change', function () {
        if ($("#cmbPedestriansInvolved").val() != null && $("#cmbPedestriansInvolved").val() != "" && $("#cmbPedestriansInvolved").val() != "-1") LoadAccidentPedestrians();
    });
    $("#cmbBikeRidersInvolved").on('change', function () {
        if ($("#cmbBikeRidersInvolved").val() != null && $("#cmbBikeRidersInvolved").val() != "" && $("#cmbBikeRidersInvolved").val() != "-1") LoadAccidentBikeRiders();
    });
    $("#txtPlateNumberFourt").on('change keydown keyup', function () {
        var getVal = $(this).val().length;
        if (getVal > 2) {
            $(this).val($(this).val().substring(0, 2));
        }
    });
    $("#txtPlateNumberFirst").on('change keydown keyup', function () {
        var getVal = $(this).val().length;
        if (getVal > 2) {
            $(this).val($(this).val().substring(0, 2));
        }
    });
    $("#txtPlateNumberSecond").on('change keydown keyup', function () {
        var getVal = $(this).val().length;
        if (getVal > 3) {
            $(this).val($(this).val().substring(0, 3));
        }
    });
    $("#txtPlateNumberThird").on('change keydown keyup', function () {
        var getVal = $(this).val().length;
        if (getVal > 1) {
            $(this).val($(this).val().substring(0, 1));
        }
        var regex = RegExp('[0-9]{1}', 'g');
        if (regex.test($("#txtPlateNumberThird").val())) $("#txtPlateNumberThird").val("");
    });
    $("#txtPlateNumberBikeFirst").on('change keydown keyup', function () {
        var getVal = $(this).val().length;
        if (getVal > 3) {
            $(this).val($(this).val().substring(0, 3));
        }
    });
    $("#txtAge").on('change keydown keyup', function () {
        var getVal = parseInt($(this).val());
        if (getVal < 18) {
            $("#cmbDriverLicenceCategory").val("ندارد").trigger("change");
            $("#cmbDriverLicenceStatus").val("غیرمجاز").trigger("change");
            $("#txtDriverLicenceNumber").attr("disabled", "");

        } else {
            $("#cmbDriverLicenceCategory").val("-1").trigger("change");
            $("#cmbDriverLicenceStatus").val("-1").trigger("change");
            $("#txtDriverLicenceNumber").removeAttr("disabled");
        }
    });
    $("#cmbDriverLicenceCategory").on('change', function () {
        var getVal = $(this).val();
        if (getVal === "ندارد") {
            $("#txtDriverLicenceNumber").attr("disabled", "");
        } else $("#txtDriverLicenceNumber").removeAttr("disabled");
    });
    $("#txtPoliceAwarenessTime").on('change', function () {
        var timeOfAccident = $("#txtTimeOfAccident").val().replace(":", "");
        var getVal = $(this).val().replace(":", "");
        var getAccidentDate = $("#txtDateOfAccident").val();
        var getDateOfFormCompletion = $("#txtDateOfFormCompletion").val();
        if (parseInt(timeOfAccident) > parseInt(getVal) && getAccidentDate === getDateOfFormCompletion) {
            $("#lblMessage").html(CreateModal("زمان مطلع شدن پلیس نمیتواند زودتر از زمان تصادف باشد!"));
            $('#MessageModal').modal();
        }
    });
    $("#txtPoliceArrivalTime").on('change', function () {
        var policeAwarenessTime = $("#txtPoliceAwarenessTime").val().replace(":", "");
        var getVal = $(this).val().replace(":", "");
        var getAccidentDate = $("#txtDateOfAccident").val();
        var getDateOfFormCompletion = $("#txtDateOfFormCompletion").val();
        if (parseInt(getVal) < parseInt(policeAwarenessTime) && getAccidentDate === getDateOfFormCompletion) {
            $("#lblMessage").html(CreateModal("زمان رسیدگی پلیس نمیتواند زودتر از زمان مطلع شدن پلیس باشد!"));
            $('#MessageModal').modal();
            return;
        }
        var timeOfAccident = $("#txtTimeOfAccident").val().replace(":", "");
        if (parseInt(getVal) < parseInt(timeOfAccident) && getAccidentDate === getDateOfFormCompletion) {
            $("#lblMessage").html(CreateModal("زمان رسیدگی پلیس نمیتواند زودتر از زمان تصادف باشد!"));
            $('#MessageModal').modal();
            return;
        }
    });
    $("#txtEmsArrivalTime").on('change', function () {
        var timeOfAccident = $("#txtTimeOfAccident").val().replace(":", "");
        var getVal = $(this).val().replace(":", "");
        var getAccidentDate = $("#txtDateOfAccident").val();
        var getDateOfFormCompletion = $("#txtDateOfFormCompletion").val();
        if (parseInt(getVal) < parseInt(timeOfAccident) && getAccidentDate === getDateOfFormCompletion) {
            $("#lblMessage").html(CreateModal("زمان حضور اورژانس نمیتواند زودتر از زمان تصادف باشد!"));
            $('#MessageModal').modal();
        }
    });
    $("#txtSosArrivalTime").on('change', function () {
        var timeOfAccident = $("#txtTimeOfAccident").val().replace(":", "");
        var getVal = $(this).val().replace(":", "");
        var getAccidentDate = $("#txtDateOfAccident").val();
        var getDateOfFormCompletion = $("#txtDateOfFormCompletion").val();
        if (parseInt(getVal) < parseInt(timeOfAccident) && getAccidentDate === getDateOfFormCompletion) {
            $("#lblMessage").html(CreateModal("زمان حضور امداد نمیتواند زودتر از زمان تصادف باشد!"));
            $('#MessageModal').modal();
        }
    });
    $("#txtDateOfFormCompletion").on('change', function () {
        var dateOfAccident = $("#txtDateOfAccident").val().replace("/", "");
        var getVal = $(this).val().replace("/", "");
        if (parseInt(dateOfAccident) > parseInt(getVal)) {
            $("#lblMessage").html(CreateModal("تاریخ تکمیل نمیتواند جلوتر از تاریخ تصادف باشد!"));
            $('#MessageModal').modal();
        }
    });
    $("#txtLongitude").on('focusout', function () {
        var getVal = $(this).val();
        var parts = getVal.split(':');
        if (getVal != "" && (!inRange(parts[1], 0, 60) || !inRange(parts[2], 0, 60))/*!isLongitude(parseInt(getVal))*/ && !$('#MessageModal').is(':visible')) {
            $("#lblMessage").html(CreateModal("طول جغرافیایی وارد شده صحیح نمی باشد!"));
            $('#MessageModal').modal();
        }
    });
    $("#txtLatitude").on('focusout', function () {
        var getVal = $(this).val();
        var parts = getVal.split(':');
        if (getVal != "" && (!inRange(parts[1], 0, 60) || !inRange(parts[2], 0, 60))/*!isLatitude(parseInt(getVal))*/ && !$('#MessageModal').is(':visible')) {
            $("#lblMessage").html(CreateModal("عرض جغرافیایی وارد شده صحیح نمی باشد!"));
            $('#MessageModal').modal();
        }
    });
    $("#txtPlateNumberBikeSecond").on('change keydown keyup', function () {
        var getVal = $(this).val().length;
        if (getVal > 5) {
            $(this).val($(this).val().substring(0, 5));
        }
    });
    $("#FirstStep").on('click focus', function () {
        $("#divFirstStep").show();
        $("#divSecondStep,#divThirdStep,#divFourthStep,#divFifthStep,#divSixthStep,#divSeventhStep").hide();
        $("#SecondStep,#ThirdStep,#FourthStep,#FifthStep,#SixthStep,#SeventhStep").removeClass("active");
        $("#FirstStep").addClass("active");
    });
    $("#SecondStep").on('click focus', function () {
        LoadSecondStep();
    });
    $("#ThirdStep").on('click focus', function () {
        LoadThirdStep();
    });
    $("#FourthStep").on('click focus', function () {
        LoadFourthStep();
    });
    $("#FifthStep").on('click focus', function () {
        LoadFifthStep();
    });
    $("#btnBackFifthStepTwo").on('click', function () {
        $(".ShowVehiclesInvolved,#btnSubmitFifthStep").show();
        $("#divFifthStepTwo,#btnBackFifthStepTwo,#btnSubmitFifthStepTwo,#divFifthStepTwo2").hide();
    });
    $("#btnBackFifthStepThree").on('click', function () {
        $(".ShowVehiclesInvolved,#divFifthStepThree,#divFifthStepThree,#btnSubmitFifthStep,#btnBackFifthStepThree").hide();
        $("#divFifthStepTwo,#divFifthStepTwo2,#btnBackFifthStepTwo,#btnSubmitFifthStepTwo").show();
    });
    $("#btnGoToSixStep").on('click', function () {
        $("#divFifthStep").hide();
        $("#SixthStep").trigger("click");
    });

    $("#txtNumberOfInjured").on('change keyup', function () {
        var getVal = parseInt($(this).val());
        if (getVal > 0) {
            var obj = {
                "accidentId": $("#hidId").val()
            }
            $('#spinSixthStepLoading').show();
            $("#divGenarateInjured").html("");
            $.ajax({
                type: "POST",
                url: "AddAccident.aspx/GetCountInjured",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg != null) {
                        if (msg.d[0].IsSuccess != "true") {
                            $("#lblMessage").html(CreateModal(msg.d[0].Message));
                            $('#MessageModal').modal();
                            $("#divGenarateInjuredList").hide('slow');
                        } else {
                            if (parseInt(msg.d[0].Message) !== getVal && $('#MessageModal').is(':visible')) {
                                $("#lblMessage").html(CreateModal("تعداد نمیتوانید از افراد و وسیله نقلیه درگیر در تصادف،کمتر باشد.تعداد افراد درگیر : " + msg.d[0].Message));
                                $('#MessageModal').modal();
                                return false;
                            }
                            $("#divInjuredRole").show("slow");

                            for (var i = 0; i < getVal; i++) {
                                //var getSel = $("#divGenarateInjured").html();
                                var index = i + 1;
                                $("#divGenarateInjured").html($("#divGenarateInjured").html() + "<div onmousedown='SelectInjured(" + i + ")' onmouseup='SelectInjured(" + i + ")' class='accident-right' data-index='" + i.toString() + "'>" + "مصدوم یا متوفی " + index.toString() + "</div>");
                            }
                            //LoadInjured();
                            if (!$(".ShowVehiclesInvolved").is(':visible')) {
                                $(".ShowVehiclesInvolved,.ShowBikeRidersInvolved,#divFifthStepTwo,#divFifthStepTwo2,#divFifthStepThree,#divVehiclesButton,#divBikeRidersButton").hide();
                                $(".ShowPedestriansInvolved,#divPedestriansButton").show("slow");
                                $("#divGenarateInjured").removeClass("hide");
                                //$("#divGenarateInjured > div").each(function () {
                                //    var intIndex = parseInt($(this).attr("data-index"));
                                //    FillInjured(intIndex);
                                //});
                            }
                            else if (getVal == 0) {
                                $("#divGenarateInjured").html("");
                                $("#divInjuredRole,#divInjuredDetailReadOnly,#divInjuredDetail").hide("slow");
                            } else {
                                //$(".ShowPedestriansInvolved,#divAddCounterPedestriansInvolved").hide("slow");
                            }
                        }
                    } else {
                        alert("خطا در برقراری ارتباط با سرور!");
                    }
                },
                complete: function () {
                    $('#spinSixthStepLoading').hide();
                },
                error: function (response) { if (response.status == 401) location.reload(); },
                failure: function (response) {
                    alert(response.d);
                }
            });
        }
    });
    $('input[type=radio][name=InjuredRole]').on('change', function () {
        var hasSelected = false;
        $("#divGenarateInjured > div").each(function () {
            if ($(this).hasClass("activeborder")) {
                var getVal = $('input[type=radio][name=InjuredRole]:checked').val();
                $("#divInjuredDetailReadOnly,#divInjuredDetail").addClass('hide');
                $("#divGenarateInjuredList").hide('slow');
                if ($('input[type=radio][name=InjuredRole]:checked').is(":checked")) LoadInjuredRole(getVal);
                hasSelected = true;
                return;
            }
        });
        if (!hasSelected) {
            $("#lblMessage").html(CreateModal("ابتدا باید یکی از مصدومین را از لیست انتخاب کنید!"));
            $('#MessageModal').modal();
            $("input[type=radio][name=InjuredRole]").prop("checked", false);
            return false;
        }
    });
    $('input[type=radio][name=PassengerIdentity]').on('change', function () {
        var getVal = $(this).val();
        if (getVal == "Yes") {
            $("#txtFirstNameInjured,#txtLastNameInjured").removeAttr("readonly");
            $("#divLastNameInjured,#divFirstNameInjured").removeClass("hide");
            $(".PassengerIdentityHide").show('slow');
        } else {
            $("#txtFirstNameInjured,#txtLastNameInjured").attr("readonly", "");
            $("#divLastNameInjured,#divFirstNameInjured").addClass("hide");
            $(".PassengerIdentityHide").hide('slow');
        }
    });
    $("#SixthStep").on('click focus', function () {
        LoadSixStep();
    });
    $("#SeventhStep").on('click focus', function () {
        LoadSeventhStep();
        $("#btnSubmitUnSuccess,#btnSubmitSuccess").removeAttr("disabled");
    });
    $("#cmbOrganizationsToBlame").on('change', function () {
        if ($("#cmbOrganizationsToBlame").val() == "سایر") {
            $("#txtDirectCausePrecent").attr("disabled", "");
            $("#txtOrganizationsToBlame,#txtOtherDirectCausePrecent").show("slow");
        } else {
            $("#txtDirectCausePrecent").removeAttr("disabled");
            $("#txtOrganizationsToBlame,#txtOtherDirectCausePrecent").hide("slow");
        }
    });
    $("#cmbDamagedParts").on('change', function () {
        if (jQuery.inArray("-1", $("#cmbDamagedParts").val()) !== -1) {
            var y = $("#cmbDamagedParts").val();
            var removeItem = "-1";
            y = jQuery.grep(y, function (value) {
                return value != removeItem;
            });
            $("#cmbDamagedParts").val(y);
            $("#cmbDamagedParts").trigger("change");
        }
    });
    $("#btnOpenMicPrimaryCause").on('click', function () {
        $("#RecordModal").modal();
        $("#hidRecordType").val("PrimaryCause");
        $("#hTitleRecord").html("ضبط صدا" + " - " + "علل اولیه تصادف");
        if ($("#hidId").val() == "") {
            $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
            $('#MessageModal').modal();
            return;
        }
        GetAudioFile("PrimaryCause");
        $("#divAudioMessage").html("");
    });
    $("#btnOpenMicFormerCause").on('click', function () {
        $("#RecordModal").modal();
        $("#hidRecordType").val("FormerCause");
        $("#hTitleRecord").html("ضبط صدا" + " - " + "علل قبلی تصادف");
        if ($("#hidId").val() == "") {
            $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
            $('#MessageModal').modal();
            return;
        }
        GetAudioFile("FormerCause");
        $("#divAudioMessage").html("");
    });
    $("#btnOpenMicDirectCause").on('click', function () {
        $("#RecordModal").modal();
        $("#hidRecordType").val("DirectCause");
        $("#hTitleRecord").html("ضبط صدا" + " - " + "علل مستقیم تصادف");
        if ($("#hidId").val() == "") {
            $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
            $('#MessageModal').modal();
            return;
        }
        GetAudioFile("DirectCause");
        $("#divAudioMessage").html("");
    });
    $("#spnAccidentPictureHelper").on('click', function () {
        $("#divAccidentPictureHelper").removeClass("hide");
        $("#spnAccidentPictureHelper").hide("slow");
    });
    $("#spnCloseAccidentPictureHelper").on('click', function () {
        $("#divAccidentPictureHelper").addClass("hide");
        $("#spnAccidentPictureHelper").show("slow");
    });
    Dropzone.autoDiscover = false;
    $("#AccidentDiagramUpload").dropzone({
        url: "/Handle/AccidentImageHandle.ashx?GUID=" + $("#hideAccidentGuid").val() + "&IsRemove=false&Id=" + $("#hidId").val(),
        maxFiles: 1,
        //acceptedFiles: ".png,.jpg,.jpeg,.PNG,.JPG,.JPEG",
        acceptedFiles: "image/*",
        capture: "camera",
        clickable: true,
        maxFilesize: 3, // MB
        addRemoveLinks: true,
        parallelUploads: 1,
        uploadMultiple: false,
        success: function (file, response) {
            //var imgName = response;
            file.previewElement.classList.add("dz-success");
        },
        init: function () {
            this.on("sending", function (file) {
                file.myCustomName = $("#hideAccidentGuid").val() + ".jpg";
            });
            this.on("complete", function (file) {
                $(".dz-remove").html("<span class='fa fa-trash'></span>");
                $(".dz-details").remove();
            });
            var myDropzone = this;
            //myDropzone.removeAllFiles();
            if ($("#hideAccidentGuid").val() !== "") {
                var hideGuid = $("#hideAccidentGuid").val();
                var mockFile = {
                    name: hideGuid,
                    size: 12345
                };
                var twitimg = "/Accident/" + hideGuid;
                $.ajax({
                    url: "/Handle/FileIsExistsHandle.ashx?FileName=" + twitimg,
                    type: 'GET',
                    contentType: "application/json; charset=utf-8",
                    //async: false,
                    success: function (data) {
                        if (data == "True") {
                            myDropzone.emit("addedfile", mockFile);
                            myDropzone.emit("thumbnail", mockFile, "/MediaUploader" + twitimg);
                            $(".dz-remove").html("<span class='fa fa-trash'></span>");
                            $(".dz-progress").remove();
                            $(".dz-details").remove();
                        }
                    },
                    error: function () {

                    }
                });
            }
        },
        removedfile: function (file) {
            var name = $("#hideAccidentGuid").val().replace(".jpg", "");
            var qString = $("#hidId").val() !== "" ? $("#hidId").val() : "";
            $.ajax({
                type: "POST",
                url: "/Handle/AccidentImageHandle.ashx?GUID=" + name + "&IsRemove=true&Id=" + qString
            });
            var ref;
            return (ref = file.previewElement) != null ? ref.parentNode.removeChild(file.previewElement) : void 0;
        },
        error: function (file, response) {
            file.previewElement.classList.add("dz-error");
            $(".dz-error-message").html("<span data-dz-errormessage=''>امکان بارگزاری فایل غیر از تصویر امکانپذیر نمی باشد!</span>");
        }
    });
    AccidentPicturesHandle(1);
    AccidentPicturesHandle(2);
    AccidentPicturesHandle(3);
    AccidentPicturesHandle(4);
    AccidentPicturesHandle(5);
    AccidentPicturesHandle(6);
    AccidentPicturesHandle(7);
    AccidentPicturesHandle(8);
    AccidentPicturesHandle(9);
    AccidentPicturesHandle(10);
});
function GetAudioFile(name) {
    var url = "/Accident/" + name + "-" + $("#hideAccidentGuid").val().replace(".jpg", "") + ".wav";
    $.ajax({
        url: "/Handle/FileIsExistsHandle.ashx?FileName=" + url,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data == "True") {
                var recordingsList = document.getElementById("recordingsListRecord");
                recordingsList.innerHTML = "";
                var au = document.createElement('audio');
                var li = document.createElement('li');
                au.controls = true;
                au.src = "/MediaUploader/Accident/" + name + "-" + $("#hideAccidentGuid").val().replace(".jpg", "") + ".wav";
                li.appendChild(au);
                li.appendChild(document.createElement('br'));
                var upload = document.createElement('a');
                upload.className = "btn btn-danger";
                upload.href = "javascript:void(0)";
                upload.innerHTML = "حذف فایل صوتی";
                upload.setAttribute("onclick", "DeleteAudioModal(" + name + ");");
                li.appendChild(document.createTextNode(" "));
                li.appendChild(upload);
                recordingsList.appendChild(li);
                var recordButton = document.getElementById("recordButtonRecord");
                recordButton.disabled = true;
            }
        },
        error: function (response) { if (response.status == 401) location.reload(); }
    });
}
function isLatitude(lat) {
    return isFinite(lat) && Math.abs(lat) <= 90;
}

function isLongitude(lng) {
    return isFinite(lng) && Math.abs(lng) <= 180;
}
function AccidentPicturesHandle(num) {
    $("#AccidentPicturesUpload" + num).dropzone({
        url: "/Handle/AccidentPicturesHandle.ashx?GUID=" + $("#hideAccidentPicturesGuid").val() + num + "&IsRemove=false&Id=" + $("#hidId").val(),
        maxFiles: 1,
        //acceptedFiles: ".png,.jpg,.jpeg,.PNG,.JPG,.JPEG",
        acceptedFiles: "image/*",
        capture: "camera",
        clickable: true,
        maxFilesize: 3, // MB
        addRemoveLinks: true,
        parallelUploads: 1,
        uploadMultiple: false,
        success: function (file, response) {
            //var imgName = response;
            file.previewElement.classList.add("dz-success");
        },
        init: function () {
            this.on("sending", function (file) {
                file.myCustomName = $("#hideAccidentPicturesGuid").val() + num + ".jpg";
            });
            this.on("complete", function (file) {
                $(".dz-remove").html("<span class='fa fa-trash'></span>");
                $(".dz-details").remove();
                var getInt = parseInt(num) + 1;
                $("#AccidentPicturesUpload" + getInt).removeClass("hide");
            });
            var myDropzone = this;
            //myDropzone.removeAllFiles();
            if ($("#hideAccidentPicturesGuid").val() !== "") {
                var hideGuid = $("#hideAccidentPicturesGuid").val() + num;
                var mockFile = {
                    name: hideGuid,
                    size: 12345
                };
                var twitimg = "/Accident/" + hideGuid + ".jpg";
                $.ajax({
                    url: "/Handle/FileIsExistsHandle.ashx?FileName=" + twitimg,
                    type: 'GET',
                    contentType: "application/json; charset=utf-8",
                    //async: false,
                    success: function (data) {
                        if (data == "True") {
                            myDropzone.emit("addedfile", mockFile);
                            myDropzone.emit("thumbnail", mockFile, "/MediaUploader" + twitimg);
                            $(".dz-remove").html("<span class='fa fa-trash'></span>");
                            $(".dz-progress").remove();
                            $(".dz-details").remove();
                            $("#AccidentPicturesUpload" + num).removeClass("hide");
                        }
                    },
                    error: function () {

                    }
                });
            }
        },
        removedfile: function (file) {
            var name = $("#hideAccidentPicturesGuid").val() + num;
            var qString = $("#hidId").val() !== "" ? $("#hidId").val() : "";
            $.ajax({
                type: "POST",
                url: "/Handle/AccidentPicturesHandle.ashx?GUID=" + name + "&IsRemove=true&Id=" + qString
            });
            var ref;
            return (ref = file.previewElement) != null ? ref.parentNode.removeChild(file.previewElement) : void 0;
        },
        error: function (file, response) {
            file.previewElement.classList.add("dz-error");
            $(".dz-error-message").html("<span data-dz-errormessage=''>امکان بارگزاری فایل غیر از تصویر امکانپذیر نمی باشد!</span>");
        }
    });
}
function openDateOfAccident() {
    var btn = document.getElementById("dateDateOfAccident");
    btn.click(); event.preventDefault();
}
function openDateOfFormCompletion() {
    var btn = document.getElementById("dateDateOfFormCompletion");
    btn.click(); event.preventDefault();
}
function openDateLicenceIssue() {
    var btn = document.getElementById("dateDateLicenceIssue");
    btn.click(); event.preventDefault();
}

