function OpenCommentDialog(type) {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
        $('#MessageModal').modal();
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val(),
        "type": type
    }
    $('#spinCommentLoading').show();
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/LoadComment",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#divCommentMessage").html("<div class='alert alert-danger'>" + msg.d[0].Message + "</div>");
                } else {
                    $("#txtComment").val(msg.d[0].Message);
                }
                $("#CommentModal").modal();
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinCommentLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadBorderForComment() {
    if ($("#hidId").val() == "") {
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val()
    }
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/LoadBorderComment",
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
                            $("#spnOpenCommentFirst").show();
                        } else if (i === 1) {
                            $("#SecondStep").css("border", "3px #ffbf00 solid");
                            $("#spnOpenCommentSecond").show();
                        } else if (i === 2) {
                            $("#ThirdStep").css("border", "3px #ffbf00 solid");
                            $("#spnOpenCommentThird").show();
                        } else if (i === 3) {
                            $("#FourthStep").css("border", "3px #ffbf00 solid");
                            $("#spnOpenCommentFourth").show();
                        } else if (i === 4) {
                            $("#FifthStep").css("border", "3px #ffbf00 solid");
                            $("#spnOpenCommentFifth").show();
                        } else if (i === 5) {
                            $("#SixthStep").css("border", "3px #ffbf00 solid");
                            $("#spnOpenCommentSixth").show();
                        } else if (i === 6) {
                            $("#SeventhStep").css("border", "3px #ffbf00 solid");
                            $("#spnOpenCommentSeventh").show();
                        }
                    }
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () { },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}
function FileIsExistsHandle() {
    var hideGuid = $("#hideAccidentGuid").val();
    var twitimg = "/Accident/" + hideGuid;
    return $.ajax({
        url: "/Handle/FileIsExistsHandle.ashx?FileName=" + twitimg,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        async: false
    });
}
function SaveSeventhStepData() {
    //if ($("#hidId").val() == "") {
    //    alert("Omid");
    //    $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    var isDiagramFail = false;
    FileIsExistsHandle().done(function (data) {
        if (data != null) {
            if (data != "True") {
                isDiagramFail = true;
            }
        }
        else {
            alert("خطا در برقراری ارتباط با سرور!");
        }
    });
    //if (isDiagramFail) {
    //    $("#lblMessage").html(CreateModal("تصویر کروکی را بارگذاری کنید!"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    //if ($('#MessageModal').is(':visible')) return false;
    let getAllVehicleAccident = "", getAllPedestrianAccident = "", getAllBikeRiderAccident = "", getAllPassengerAccident = "", getId = "";
    let divInputVehicleAccident = $('[id^=divInputVehicleAccident]');
    if (divInputVehicleAccident.length) {
        divInputVehicleAccident.each(function () {
            let getVal = $(this).val();
            getId = this.id;
            if (getVal == "") {
                $("#lblMessage").html(CreateModal("درصد تقصیر راننده را وارد کنید!"));
                $('#MessageModal').modal();
                return false;
            }
            getAllVehicleAccident += getId.replace("divInputVehicleAccident", "") + "#" + getVal + ",";
        });
    }
    let divInputPedestrianAccident = $('[id^=divInputPedestrianAccident]');
    if (divInputPedestrianAccident.length) {
        divInputPedestrianAccident.each(function () {
            let getVal2 = $(this).val();
            getId = this.id;
            if (getVal2 == "") {
                $("#lblMessage").html(CreateModal("درصد تقصیر عابر ‌پیاده را وارد کنید!"));
                $('#MessageModal').modal();
                return false;
            }
            getAllPedestrianAccident += getId.replace("divInputPedestrianAccident", "") + "#" + getVal2 + ",";
        });
    }
    let divInputBikeRiderAccident = $('[id^=divInputBikeRiderAccident]');
    if (divInputBikeRiderAccident.length) {
        divInputPedestrianAccident.each(function () {
            let getVal3 = $(this).val();
            getId = this.id;
            if (getVal3 == "") {
                $("#lblMessage").html(CreateModal("درصد تقصیر دوچرخه ‌سوار را وارد کنید!"));
                $('#MessageModal').modal();
                return false;
            }
            getAllBikeRiderAccident += getId.replace("divInputBikeRiderAccident", "") + "#" + getVal3 + ",";
        });
    }
    if ($('[id^=divInputPassengerAccident]').length) {
        getId = $('[id^=divInputPassengerAccident]').attr('id');
        var getVal4 = $('[id^=divInputPassengerAccident]').val();
        if (getVal4 == "") {
            $("#lblMessage").html(CreateModal("درصد تقصیر سرنشین را وارد کنید!"));
            $('#MessageModal').modal();
            //$(this).focus();
            return false;
        }
        getAllPassengerAccident += getId.replace("divInputPassengerAccident", "") + "#" + getVal4 + ",";
    }
    if ($("#cmbOrganizationsToBlame").val() == null || $("#cmbOrganizationsToBlame").val() == "-1") {
        $("#spnOrganizationsToBlameError").show("slow");
        $("#cmbOrganizationsToBlame").focus();
        return false;
    }
    if ($("#cmbOrganizationsToBlame").val() !== "-1" && $("#cmbOrganizationsToBlame").val() != "سایر" && $("#txtDirectCausePrecent").val() == "") {
        $("#spnDirectCausePrecentError").show("slow");
        $("#txtDirectCausePrecent").focus();
        return false;
    }
    if ($("#cmbOrganizationsToBlame").val() !== "-1" && $("#cmbOrganizationsToBlame").val() == "سایر" && $("#txtOrganizationsToBlame").val() == "") {
        $("#spnOrganizationsToBlameTextError").show("slow");
        $("#txtOrganizationsToBlame").focus();
        return false;
    }
    if ($("#cmbOrganizationsToBlame").val() !== "-1" && $("#cmbOrganizationsToBlame").val() == "سایر" && $("#txtOtherDirectCausePrecent").val() == "") {
        $("#spnOtherDirectCausePrecentError").show("slow");
        $("#txtOtherDirectCausePrecent").focus();
        return false;
    }
    $('#spinSeventhStepLoading').show();
    $('#btnSubmitSeventhStep').button("loading");
    var obj = {
        "accidentId": $("#hidId").val(),
        "primaryCause": $("#txtPrimaryCause").val(),
        "formerCause": $("#txtFormerCause").val(),
        "directCause": $("#txtDirectCause").val(),
        "inputVehicleAccident": getAllVehicleAccident,
        "inputPedestrianAccident": getAllPedestrianAccident,
        "inputBikeRiderAccident": getAllBikeRiderAccident,
        "inputPassengerAccident": getAllPassengerAccident,
        "organizationsToBlame": ($("#cmbOrganizationsToBlame").val() == "سایر" ? $("#txtOrganizationsToBlame").val() : ($("#cmbOrganizationsToBlame").val() == null || $("#cmbOrganizationsToBlame").val() == "-1" ? "" : $("#cmbOrganizationsToBlame").val())),
        "directCausePrecent": ($("#cmbOrganizationsToBlame").val() == "سایر" ? $("#txtOtherDirectCausePrecent").val() : ($("#cmbOrganizationsToBlame").val() == null || $("#cmbOrganizationsToBlame").val() == "-1" ? "0" : $("#txtDirectCausePrecent").val()))
    }
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/SaveSeventhStep",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    alert("عملیات ثبت با موفقیت به پایان رسید");
                    window.open("Moderator/Dashboard.aspx");
                   
                    
                }

            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSeventhStepLoading').hide();
            $("#btnSubmitSeventhStep").button("reset");
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
    //$("#divSixthStep").hide();
    //$("#divSeventhStep").show();
    //return false;
}

function SaveSeventhDamage() {
    //if ($("#hidId").val() == "") {
    //    $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    //if ($("#cmbSelectAccidentCar").val() == "" || $("#cmbSelectAccidentCar").val() == "-1") {
    //    $("#spnSelectAccidentCarError").show("slow");
    //    $("#cmbSelectAccidentCar").focus();
    //    return false;
    //}
    //if ($("#cmbFirstPointCollision").val() == "" || $("#cmbFirstPointCollision").val() == "-1") {
    //    $("#spnFirstPointCollisionError").show("slow");
    //    $("#cmbFirstPointCollision").focus();
    //    return false;
    //}
    //if ($("#cmbDamagedParts").val() == "" || $("#cmbDamagedParts").val() == "-1") {
    //    $("#spnDamagedPartsError").show("slow");
    //    $("#cmbDamagedParts").focus();
    //    return false;
    //}
    $('#spinSeventhDamageLoading').show();
    $('#btnSubmitDamage').button("loading");


    
    var damages = $("#cmbDamagedParts").val();
    var obj = {
        "accidentId": $("#hidId").val(),
        "selectAccidentCar": $("#cmbSelectAccidentCar").val(),
        "firstPointCollision": $("#cmbFirstPointCollision").val(),
        "damagedParts": damages + ""
    }
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/SaveSeventhDamage",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblDamageToast").html(CreateToast(msg.d[0].Message));

                } else {
                    $("#lblDamageToast").html(CreateToast(msg.d[0].Message));
                }
                $('#MessageToast').toast('show');
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSeventhDamageLoading').hide();
            $("#btnSubmitDamage").button("reset");
        },
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) { if (response.status == 401) location.reload(); }
    });
    return false;
    //$("#divSixthStep").hide();
    //$("#divSeventhStep").show();
    //return false;
}

function SubmitCompleteForm() {
    var obj = {
        "accidentId": $("#hidId").val()
    }
    $('#spinCompleteFormLoading').show();
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/CompleteForm",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                } else {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                }
                $('#FormIsCompletedModal').modal('hide');
                $('#MessageModal').modal();
                setTimeout(function () { $('#MessageModal').modal('hide'); location.reload(); }, 3000);
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinCompleteFormLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return true;
}

function SaveSixthStepData() {
    //if ($("#hidId").val() == "") {
    //    $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    //if ($("#txtNumberOfInjured").val() == "") {
    //    $("#spnNumberOfInjuredError").show("slow");
    //    $("#txtNumberOfInjured").focus();
    //    return false;
    //}
    $("#txtNumberOfInjured").val(ConvertFaNumberToEn($("#txtNumberOfInjured").val()));
    var obj = {};
    if ($("#txtNumberOfInjured").val() == "0") {
        obj = {
            "id": $("#hidId").val(),
            "index": "",
            "injuredRole": "",
            "numberOfInjured": $("#txtNumberOfInjured").val(),
            "passengerIdentity": "",
            "sex": "",
            "nationalId": "",
            "firstName": "",
            "lastName": "",
            "fatherName": "",
            "age": "",
            "education": "",
            "job": "",
            "injuryPassenger": "",
            "safetyPassenger": "",
            "passengerSituation": "",
            "injuredTransferMethod": "",
            "ambulanceCode": "",
            "tableId": ""
        }
    } else {
        var injuredRole = $('input[type=radio][name=InjuredRole]:checked').val();
        //if (injuredRole == "") {
        //    $("#lblMessage").html(CreateModal("از بین نقشها یکی را انتخاب کنید"));
        //    $('#MessageModal').modal();
        //    return false;
        //}
        var activeborder = $('#divGenarateInjured').find('.activeborder');
        if (activeborder == "") {
            $("#lblMessage").html(CreateModal("ابتدا باید یکی از مصدومین یا متوفیان را انتخاب کنید"));
            $('#MessageModal').modal();
            return false;
        }
        var getTable = $('#divGenarateInjuredList').find('.activeborder');
        if (getTable == "") {
            $("#lblMessage").html(CreateModal("ابتدا باید یکی از کاربران را انتخاب کنید"));
            $('#MessageModal').modal();
            return false;
        }
        var passengerIdentity = $('input[type=radio][name=PassengerIdentity]:checked').val();
        //if (injuredRole == "Passenger" && passengerIdentity == "") {
        //    $("#lblMessage").html(CreateModal("به این سوال پاسخ دهید : آیا هویت سرنشین معلوم است؟"));
        //    $('#MessageModal').modal();
        //    return false;
        //}
        if (injuredRole == "Passenger" && passengerIdentity == "Yes") {
            if ($("#cmbSexPassenger").val() == null || $("#cmbSexPassenger").val() == "-1") {
                $("#spnSexPassengerError").show("slow");
                $("#cmbSexPassenger").focus();
                return false;
            }
            if ($("#txtNationalIdPassenger").val() == "") {
                $("#spnNationalIdPassengerError").show("slow");
                $("#txtNationalIdPassenger").focus();
                return false;
            }
            if ($("#txtAgePassenger").val() == "") {
                $("#spnAgePassengerError").show("slow");
                $("#txtAgePassenger").focus();
                return false;
            }
        }
        //if ($("#txtInjury").css('display') == 'none' && ($("#cmbInjuryPassenger").val() == null || $("#cmbInjuryPassenger").val() == "-1")) {
        //    $("#spnInjuryPassengerError").show("slow");
        //    $("#cmbInjuryPassenger").focus();
        //    return false;
        //}
        //if (injuredRole == "Passenger" && ($("#cmbSafetyPassenger").val() == null || $("#cmbSafetyPassenger").val() == "-1")) {
        //    $("#spnSafetyPassengerError").show("slow");
        //    $("#cmbSafetyPassenger").focus();
        //    return false;
        //}
        //if (injuredRole == "Passenger" && ($("#cmbPassengerSituation").val() == null || $("#cmbSafetyPassenger").val() == "-1")) {
        //    $("#spnPassengerSituationError").show("slow");
        //    $("#cmbPassengerSituation").focus();
        //    return false;
        //}
        //if ($("#cmbInjuredTransferMethod").val() == null || $("#cmbInjuredTransferMethod").val() == "-1") {
        //    $("#spnInjuredTransferMethodError").show("slow");
        //    $("#cmbInjuredTransferMethod").focus();
        //    return false;
        //}
        //if ($("#cmbInjuredTransferMethod").val() == "آمبولانس" && $("#txtAmbulanceCode").val() == "") {
        //    $("#spnAmbulanceCodeError").show("slow");
        //    $("#txtAmbulanceCode").focus();
        //    return false;
        //}
        var index = parseInt(activeborder.attr("data-index"));
        var tableId = parseInt(getTable.attr("data-id"));

        if (injuredRole == "Passenger" && (passengerIdentity == "Yes" || passengerIdentity == "No")) {
            var iden = passengerIdentity == "Yes" ? "true" : "false";
            obj = {
                "id": $("#hidId").val(),
                "index": index,
                "injuredRole": injuredRole,
                "numberOfInjured": $("#txtNumberOfInjured").val(),
                "passengerIdentity": iden,
                "sex": $("#cmbSexPassenger").val(),
                "nationalId": $("#txtNationalIdPassenger").val(),
                "firstName": $("#txtFirstNameInjured").val(),
                "lastName": $("#txtLastNameInjured").val(),
                "fatherName": $("#txtFatherNamePassenger").val(),
                "age": $("#txtAgePassenger").val(),
                "education": $("#cmbEducationPassenger").val(),
                "job": $("#cmbJobPassenger").val(),
                "injuryPassenger": $("#cmbInjuryPassenger").val(),
                "safetyPassenger": $("#cmbSafetyPassenger").val(),
                "passengerSituation": $("#cmbPassengerSituation").val(),
                "injuredTransferMethod": $("#cmbInjuredTransferMethod").val(),
                "ambulanceCode": $("#txtAmbulanceCode").val(),
                "tableId": tableId
            }
        } else {
            obj = {
                "id": $("#hidId").val(),
                "index": index,
                "injuredRole": injuredRole,
                "numberOfInjured": $("#txtNumberOfInjured").val(),
                "passengerIdentity": "",
                "sex": "",
                "nationalId": "",
                "firstName": $("#txtFirstNameInjured").val(),
                "lastName": $("#txtLastNameInjured").val(),
                "fatherName": "",
                "age": "",
                "education": "",
                "job": "",
                "injuryPassenger": $("#cmbInjuryPassenger").val(),
                "safetyPassenger": "",
                "passengerSituation": "",
                "injuredTransferMethod": $("#cmbInjuredTransferMethod").val(),
                "ambulanceCode": $("#txtAmbulanceCode").val(),
                "tableId": tableId
            }
        }
    }
    $('#spinSixthStepLoading').show();
    $('#btnSubmitSixthStep').button("loading");
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/UpdateSixthStepAccident",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                } else {
                    if ($("#txtNumberOfInjured").val() == "0") {
                        $("#divSixthStep").hide();
                        $("#divSeventhStep").show();
                        $("#SeventhStep").trigger("click");
                        $("#lblMessage").html(CreateModal(msg.d[0].Message));
                        $('#MessageModal').modal();
                    }
                    for (i = 0; i < $("#divGenarateInjured > div").length; i++) {
                        if ($("#divGenarateInjured > div").filter('[data-index="' + i + '"]').hasClass("activeborder")) {
                            let j = i + 1;
                            if ($("#divGenarateInjured > div").filter('[data-index="' + j + '"]').length) {
                                $('input[type=radio][name=InjuredRole]').prop('checked', false);
                                $("#divGenarateInjured > div").filter('[data-index="' + j + '"]').trigger("onmousedown");
                                $("#divGenarateInjuredList,#divInjuredDetail,#divInjuredDetailReadOnly").hide();
                                $("#lblMessage").html(CreateModal("اطلاعات مصدوم و متوفی درگیر در تصادف با موفقیت ثبت شد"));
                                $('#MessageModal').modal();
                                return;
                            } else {
                                $("#divSixthStep").hide();
                                $("#divSeventhStep").show();
                                $("#SeventhStep").trigger("click");
                                $("#lblMessage").html(CreateModal(msg.d[0].Message));
                                $('#MessageModal').modal();
                                return;
                            }
                        }
                    }

                }
                $('#MessageModal').modal();
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSixthStepLoading').hide();
            $("#btnSubmitSixthStep").button("reset");
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function SaveBikeRiders() {
    //if ($("#hidId").val() == "") {
    //    $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    //if ($("#cmbOnSiteCrossingFacilitiesBikeRiders").val() == "" || $("#cmbOnSiteCrossingFacilitiesBikeRiders").val() == "-1") {
    //    $("#spnOnSiteCrossingFacilitiesBikeRidersError").show("slow");
    //    $("#cmbOnSiteCrossingFacilitiesBikeRiders").focus();
    //    return false;
    //}
    var bikeRidersIdentity = "";
    if ($("#rdoBikeRidersIdentityYes").is(":checked")) bikeRidersIdentity = "true";
    else if ($("#rdoBikeRidersIdentityNo").is(":checked")) bikeRidersIdentity = "false";
    //if (bikeRidersIdentity == "") {
    //    $("#lblMessage").html(CreateModal("به این سوال پاسخ دهید : آیا هویت دوچرخه سوار معلوم است؟"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    //if (bikeRidersIdentity == "true") {
    //    if ($("#txtNationalIdBikeRiders").val() == "") {
    //        $("#spnNationalIdBikeRidersError").show("slow");
    //        $("#txtNationalIdBikeRiders").focus();
    //        return false;
    //    }
    //    if ($("#txtFirstNameBikeRiders").val() == "") {
    //        $("#spnFirstNameBikeRidersError").show("slow");
    //        $("#txtFirstNameBikeRiders").focus();
    //        return false;
    //    }
    //    if ($("#txtLastNameBikeRiders").val() == "") {
    //        $("#spnLastNameBikeRidersError").show("slow");
    //        $("#txtLastNameBikeRiders").focus();
    //        return false;
    //    }
    //    if ($("#txtFatherNameBikeRiders").val() == "") {
    //        $("#spnFatherNameBikeRidersError").show("slow");
    //        $("#txtFatherNameBikeRiders").focus();
    //        return false;
    //    }
    //    if ($("#txtAgeBikeRiders").val() == "") {
    //        $("#spnAgeBikeRidersError").show("slow");
    //        $("#txtAgeBikeRiders").focus();
    //        return false;
    //    }
    //}
    //if ($("#cmbSexBikeRiders").val() == "" || $("#cmbSexBikeRiders").val() == "-1") {
    //    $("#spnSexBikeRidersError").show("slow");
    //    $("#cmbSexBikeRiders").focus();
    //    return false;
    //}
    //if ($("#cmbClothesColorBikeRiders").val() == "" || $("#cmbClothesColorBikeRiders").val() == "-1") {
    //    $("#spnClothesColorBikeRidersError").show("slow");
    //    $("#cmbClothesColorBikeRiders").focus();
    //    return false;
    //}
    //if ($("#cmbBikeRidersSituation").val() == "" || $("#cmbBikeRidersSituation").val() == "-1") {
    //    $("#spnBikeRidersSituationError").show("slow");
    //    $("#cmbBikeRidersSituation").focus();
    //    return false;
    //}
    $('#spinBikeRidersLoading').show();
    $('#btnSubmitBikeRiders').button("loading");
    var obj = {
        "id": $("#hidId").val(),
        "index": $("#cmbBikeRidersInvolved").prop('selectedIndex'),
        "onSiteCrossingFacilities": $("#cmbOnSiteCrossingFacilitiesBikeRiders").val(),
        "isIdentity": bikeRidersIdentity,
        "sex": $("#cmbSexBikeRiders").val(),
        "nationalId": $("#txtNationalIdBikeRiders").val(),
        "firstName": $("#txtFirstNameBikeRiders").val(),
        "lastName": $("#txtLastNameBikeRiders").val(),
        "fatherName": $("#txtFatherNameBikeRiders").val(),
        "age": $("#txtAgeBikeRiders").val(),
        "education": $("#cmbEducationBikeRiders").val(),
        "job": $("#cmbJobBikeRiders").val(),
        "clothesColor": $("#cmbClothesColorBikeRiders").val(),
        "situation": $("#cmbBikeRidersSituation").val(),
        "averageSpeed": $("#txtBikeRidersAverageSpeed").val(),
        "throwDistance": $("#txtBikeRidersThrowDistance").val(),
    }
    
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/UpdateAccidentBikeRiders",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    if (bikeRidersIdentity === "true") {
                        $('#cmbBikeRidersInvolved option[value="' + $("#cmbBikeRidersInvolved").val() + '"]').text($("#txtFirstNameBikeRiders").val() + " " + $("#txtLastNameBikeRiders").val());
                    }
                    if (parseInt($("#cmbBikeRidersInvolved").prop('selectedIndex')) + 1 < parseInt($("#txtNumberOfBikeRidersInvolved").val())) {
                        $("#cmbOnSiteCrossingFacilities,#cmbSexBikeRiders,#cmbEducationBikeRiders,#cmbJobBikeRiders,#cmbClothesColor").val("-1");
                        $("#txtNationalIdBikeRiders,#txtFirstNameBikeRiders,#txtLastNameBikeRiders,#txtFatherNameBikeRiders,#txtAgeBikeRiders,#cmbBikeRidersSituation,#txtBikeRidersAverageSpeed,#txtPedestrianThrowDistance").val("");
                        $("#cmbOnSiteCrossingFacilities,#cmbSexBikeRiders,#cmbEducationBikeRiders,#cmbJobBikeRiders,#cmbClothesColor,#cmbBikeRidersSituation").trigger("change");
                        $("#rdoBikeRidersIdentityYes,#rdoBikeRidersIdentityNo").prop("checked", false);
                        $("#rdoBikeRidersIdentityYes,#rdoBikeRidersIdentityNo").trigger('change');
                        $("#cmbBikeRidersInvolved").val((parseInt($("#cmbBikeRidersInvolved").prop('selectedIndex')) + 2).toString());
                        $("#lblVehiclesToast").html(CreateToast(msg.d[0].Message));
                    } else {
                        $("#lblVehiclesToast").html(CreateToast("شما اطلاعات تمام دوچرخه سواران درگیر در تصادف را با موفقیت ثبت کردید"));
                        $("#txtNumberOfBikeRidersInvolved").focus();
                        $("#btnGoToSixStep").removeClass("hide");
                    }
                }

            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinBikeRidersLoading').hide();
            $("#btnSubmitBikeRiders").button("reset");
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function SavePedestrians() {
    //if ($("#hidId").val() == "") {
    //    $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    //if ($("#cmbOnSiteCrossingFacilities").val() == "" || $("#cmbOnSiteCrossingFacilities").val() == "-1") {
    //    $("#spnOnSiteCrossingFacilitiesError").show("slow");
    //    $("#cmbOnSiteCrossingFacilities").focus();
    //    return false;
    //}
    var pedestriansIdentity = "";
    if ($("#rdoPedestriansIdentityYes").is(":checked")) pedestriansIdentity = "true";
    else if ($("#rdoPedestriansIdentityNo").is(":checked")) pedestriansIdentity = "false";
    //if (pedestriansIdentity == "") {
    //    $("#lblMessage").html(CreateModal("به این سوال پاسخ دهید : آیا هویت عابر پیاده معلوم است؟"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    //if (pedestriansIdentity == "true") {
    //    if ($("#txtNationalIdPedestrians").val() == "") {
    //        $("#spnNationalIdPedestriansError").show("slow");
    //        $("#txtNationalIdPedestrians").focus();
    //        return false;
    //    }
    //    if ($("#txtFirstNamePedestrians").val() == "") {
    //        $("#spnFirstNamePedestriansError").show("slow");
    //        $("#txtFirstNamePedestrians").focus();
    //        return false;
    //    }
    //    if ($("#txtLastNamePedestrians").val() == "") {
    //        $("#spnLastNamePedestriansError").show("slow");
    //        $("#txtLastNamePedestrians").focus();
    //        return false;
    //    }
    //    if ($("#txtFatherNamePedestrians").val() == "") {
    //        $("#spnFatherNamePedestriansError").show("slow");
    //        $("#txtFatherNamePedestrians").focus();
    //        return false;
    //    }
    //    if ($("#txtAgePedestrians").val() == "") {
    //        $("#spnAgePedestriansError").show("slow");
    //        $("#txtAgePedestrians").focus();
    //        return false;
    //    }
    //}
    //if ($("#cmbSexPedestrians").val() == "" || $("#cmbSexPedestrians").val() == "-1") {
    //    $("#spnSexPedestriansError").show("slow");
    //    $("#cmbSexPedestrians").focus();
    //    return false;
    //}
    //if ($("#cmbClothesColor").val() == "" || $("#cmbClothesColor").val() == "-1") {
    //    $("#spnClothesColorError").show("slow");
    //    $("#cmbClothesColor").focus();
    //    return false;
    //}
    //if ($("#cmbPedestriansSituation").val() == "" || $("#cmbPedestriansSituation").val() == "-1") {
    //    $("#spnPedestriansSituationError").show("slow");
    //    $("#cmbPedestriansSituation").focus();
    //    return false;
    //}
    $('#spinPedestriansLoading').show();
    $('#btnSubmitPedestrians').button("loading");
    var obj = {
        "id": $("#hidId").val(),
        "index": $("#cmbPedestriansInvolved").prop('selectedIndex'),
        "onSiteCrossingFacilities": $("#cmbOnSiteCrossingFacilities").val(),
        "isPedestriansIdentity": pedestriansIdentity,
        "sex": $("#cmbSexPedestrians").val(),
        "nationalId": $("#txtNationalIdPedestrians").val(),
        "firstName": $("#txtFirstNamePedestrians").val(),
        "lastName": $("#txtLastNamePedestrians").val(),
        "fatherName": $("#txtFatherNamePedestrians").val(),
        "age": $("#txtAgePedestrians").val(),
        "education": $("#cmbEducationPedestrians").val(),
        "job": $("#cmbJobPedestrians").val(),
        "clothesColor": $("#cmbClothesColor").val(),
        "pedestriansSituation": $("#cmbPedestriansSituation").val(),
        "pedestriansAverageSpeed": $("#txtPedestriansAverageSpeed").val(),
        "pedestrianThrowDistance": $("#txtPedestrianThrowDistance").val(),
    }
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/UpdateAccidentPedestrians",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            try {
                if (msg != null) {
                    if (msg.d[0].IsSuccess != "true") {
                        $("#lblMessage").html(CreateModal(msg.d[0].Message));
                        $('#MessageModal').modal();
                    } else {
                        if (pedestriansIdentity === "true") {
                            $('#cmbPedestriansInvolved option[value="' + $("#cmbPedestriansInvolved").val() + '"]').text($("#txtFirstNamePedestrians").val() + " " + $("#txtLastNamePedestrians").val());
                        }
                        if (parseInt($("#cmbPedestriansInvolved").prop('selectedIndex')) + 1 < parseInt($("#txtNumberOfPedestriansInvolved").val())) {
                            $("#cmbOnSiteCrossingFacilities,#cmbSexPedestrians,#cmbEducationPedestrians,#cmbJobPedestrians,#cmbClothesColor").val("-1");
                            $("#txtNationalIdPedestrians,#txtFirstNamePedestrians,#txtLastNamePedestrians,#txtFatherNamePedestrians,#txtAgePedestrians,#cmbPedestriansSituation,#txtPedestriansAverageSpeed,#txtPedestrianThrowDistance").val("");
                            $("#cmbOnSiteCrossingFacilities,#cmbSexPedestrians,#cmbEducationPedestrians,#cmbJobPedestrians,#cmbClothesColor,#cmbPedestriansSituation").trigger("change");
                            $("#rdoPedestriansIdentityYes,#rdoPedestriansIdentityNo").prop("checked", false);
                            $("#rdoPedestriansIdentityYes,#rdoPedestriansIdentityNo").trigger('change');
                            $("#cmbPedestriansInvolved").val((parseInt($("#cmbPedestriansInvolved").prop('selectedIndex')) + 2).toString());
                            $("#lblVehiclesToast").html(CreateToast(msg.d[0].Message));
                        } else {
                            $("#lblVehiclesToast").html(CreateToast("شما اطلاعات تمام عابرین ‌پیاده درگیر در تصادف را با موفقیت ثبت کردید"));
                            $("#txtNumberOfBikeRidersInvolved").focus();
                            $("#txtNumberOfBikeRidersInvolved").trigger("click");
                        }
                        $('#MessageToast').toast('show');
                    }
                } else {
                    alert("خطا در برقراری ارتباط با سرور!");
                }
            } catch (e) {
                console.log(e);
            }

        },
        complete: function () {
            $('#spinPedestriansLoading').hide();
            $("#btnSubmitPedestrians").button("reset");
        },
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) { if (response.status == 401) location.reload(); }
        //error: function (jqXHR, exception) {
        //var msg = '';
        //    if (jqXHR.status === 0) {
        //        msg = 'Not connect.\n Verify Network.';
        //    } else if (jqXHR.status == 404) {
        //        msg = 'Requested page not found. [404]';
        //    } else if (jqXHR.status == 500) {
        //        msg = 'Internal Server Error [500].';
        //    } else if (exception === 'parsererror') {
        //        msg = 'Requested JSON parse failed.';
        //    } else if (exception === 'timeout') {
        //        msg = 'Time out error.';
        //    } else if (exception === 'abort') {
        //        msg = 'Ajax request aborted.';
        //    } else {
        //        msg = 'Uncaught Error.\n' + jqXHR.responseText;
        //    }
        //    console.log(msg);
        //}
    });
    return false;
}

function SaveFifthStepDataThree() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
        $('#MessageModal').modal();
        return false;
    }
    var driversIdentity = "";
    if ($("#rdoDriversIdentityYes").is(":checked")) driversIdentity = "true";
    else if ($("#rdoDriversIdentityNo").is(":checked")) driversIdentity = "false";
    if (driversIdentity == "") {
        $("#lblMessage").html(CreateModal("به این سوال پاسخ دهید : آیا هویت راننده معلوم است؟"));
        $('#MessageModal').modal();
        return false;
    }
    if ($("#cmbSex").val() == "" || $("#cmbSex").val() == "-1") {
        $("#spnSexError").show("slow");
        $("#cmbSex").focus();
        return false;
    }
    if (driversIdentity == "true") {
        if ($("#txtNationalId").val() == "") {
            $("#spnNationalIdError").show("slow");
            $("#txtNationalId").focus();
            return false;
        }
        if ($("#txtFirstName").val() == "") {
            $("#spnFirstNameError").show("slow");
            $("#txtFirstName").focus();
            return false;
        }
        if ($("#txtLastName").val() == "") {
            $("#spnLastNameError").show("slow");
            $("#txtLastName").focus();
            return false;
        }
        if ($("#txtFatherName").val() == "") {
            $("#spnFatherNameError").show("slow");
            $("#txtFatherName").focus();
            return false;
        }
        if ($("#txtAge").val() == "") {
            $("#spnAgeError").show("slow");
            $("#txtAge").focus();
            return false;
        }
        if (!$("#txtDriverLicenceNumber").attr("disabled") && $("#txtDriverLicenceNumber").val() == "") {
            $("#spnDriverLicenceNumberError").show("slow");
            $("#txtDriverLicenceNumber").focus();
            return false;
        }
        if (!$("#txtDriverLicenceNumber").attr("disabled") && $("#txtDateLicenceIssue").val() == "") {
            $("#spnDateLicenceIssueError").show("slow");
            return false;
        }
        if (!$("#txtDriverLicenceNumber").attr("disabled") && ($("#cmbDriverLicenceCategory").val() == "" || $("#cmbDriverLicenceCategory").val() == "-1")) {
            $("#spnDriverLicenceCategoryError").show("slow");
            $("#cmbDriverLicenceCategory").focus();
            return false;
        }
        if (!$("#txtDriverLicenceNumber").attr("disabled") && ($("#cmbDriverLicenceStatus").val() == "" || $("#cmbDriverLicenceStatus").val() == "-1")) {
            $("#spnDriverLicenceStatusError").show("slow");
            $("#cmbDriverLicenceStatus").focus();
            return false;
        }
        var driverLicenceIncompatibility = "";
        if ($("#rdoDriverLicenceIncompatibilityYes").is(":checked")) driverLicenceIncompatibility = "true";
        else if ($("#rdoDriverLicenceIncompatibilityNo").is(":checked")) driverLicenceIncompatibility = "false";
        if (!$("#txtDriverLicenceNumber").attr("disabled") && driverLicenceIncompatibility == "") {
            $("#lblMessage").html(CreateModal("به این سوال پاسخ دهید : آیا اطلاعات با سیستم صدور گواهینامه تطابق دارد؟"));
            $('#MessageModal').modal();
            return false;
        }
        if (!$("#txtTransferMethod").attr("disabled") && $("#txtTransferMethod").val() == "") {
            $("#spnTransferMethodError").show("slow");
            $("#txtTransferMethod").focus();
            return false;
        }
    }
    if ($("#txtNumberOfPassengers").val() == "") {
        $("#spnNumberOfPassengersError").show("slow");
        $("#txtNumberOfPassengers").focus();
        return false;
    }
    if ($("#cmbSeatBelt").val() == "" || $("#cmbSeatBelt").val() == "-1") {
        $("#spnSeatBeltError").show("slow");
        $("#cmbSeatBelt").focus();
        return false;
    }
    if ($("#cmbInjuryAtScene").val() == "" || $("#cmbInjuryAtScene").val() == "-1") {
        $("#spnInjuryAtSceneError").show("slow");
        $("#cmbInjuryAtScene").focus();
        return false;
    }

    $('#spinFifthStepLoading').show();
    $('#btnSubmitFifthStepThree').button("loading");
    var isDriversIdentity = "";
    if ($("#rdoDriversIdentityYes").is(":checked")) isDriversIdentity = "true";
    else if ($("#rdoDriversIdentityNo").is(":checked")) isDriversIdentity = "false";
    var isDriverLicenceIncompatibility = "";
    if ($("#rdoDriverLicenceIncompatibilityYes").is(":checked")) isDriverLicenceIncompatibility = "true";
    else if ($("#rdoDriverLicenceIncompatibilityNo").is(":checked")) isDriverLicenceIncompatibility = "false";
    var obj = {
        "id": $("#hidId").val(),
        "index": $("#cmbVehiclesInvolved").prop('selectedIndex'),
        "isDriversIdentity": isDriversIdentity,
        "sex": $("#cmbSex").val(),
        "seatBelt": $("#cmbSeatBelt").val(),
        "driverStatues": $("#cmbDriverStatues").val(),
        "injuryAtScene": $("#cmbInjuryAtScene").val(),
        "reactionBeforeAccident": $("#txtReactionBeforeAccident").val(),
        "numberOfPassengers": $("#txtNumberOfPassengers").val(),
        "nationalId": $("#txtNationalId").val(),
        "firstName": $("#txtFirstName").val(),
        "lastName": $("#txtLastName").val(),
        "fatherName": $("#txtFatherName").val(),
        "age": $("#txtAge").val(),
        "driverLicenceNumber": $("#txtDriverLicenceNumber").val(),
        "dateLicenceIssue": $("#txtDateLicenceIssue").val(),
        "placeLicenceIssue": $("#txtPlaceLicenceIssue").val(),
        "driverLicenceCategory": $("#cmbDriverLicenceCategory").val(),
        "driverLicenceStatus": $("#cmbDriverLicenceStatus").val(),
        "isDriverLicenceIncompatibility": isDriverLicenceIncompatibility,
        "education": $("#cmbEducation").val(),
        "job": $("#cmbJob").val(),
        "transferMethod": $("#txtTransferMethod").val()
    }
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/FifthUpdateAccidentThird",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    if (isDriversIdentity === "true") {
                        var $option = $('#cmbVehiclesInvolved :selected');
                        $option.attr('value', $("#cmbVehiclesInvolved :selected").val());
                        $option.text("راننده : " + $("#txtFirstName").val() + " " + $("#txtLastName").val());
                        //$('#cmbVehiclesInvolved :selected option[value="' + $("#cmbVehiclesInvolved :selected").val() + '"]').text("راننده : " + $("#txtFirstName").val() + " " + $("#txtLastName").val());
                    }
                    if (parseInt($("#cmbVehiclesInvolved").prop('selectedIndex')) + 1 < parseInt($("#txtNumberOfVehiclesInvolved").val())) {
                        $("#lblVehiclesToast").html(CreateToast(msg.d[0].Message));
                        $("#btnBackFifthStepThree,#btnSubmitFifthStepThree,#divFifthStepThree").hide();
                        $(".ShowVehiclesInvolved,#btnSubmitFifthStep,#btnSubmitFifthStep").show();
                        //.ShowVehiclesInvolved,#btnSubmitFifthStep,
                        //                        $("#btnSubmitFifthStepTwo,#btnBackFifthStepTwo,#divFifthStepTwo,#divFifthStepTwo2").hide();
                        //                        $("#btnSubmitFifthStepThree,#btnBackFifthStepThree,#divFifthStepThree").show();

                        $("#cmbVehiclesInvolved").val((parseInt($("#cmbVehiclesInvolved :selected").val()) + 1).toString());
                        $("#cmbVehiclesInvolved").trigger("change");
                    } else {
                        $("#lblVehiclesToast").html(CreateToast("اطلاعات تمام وسایل ‌نقلیه درگیر در تصادف را با موفقیت ثبت کردید"));
                        $("#txtNumberOfPedestriansInvolved").removeAttr("readonly");
                        $("#txtNumberOfPedestriansInvolved").trigger("click");
                        $("#txtNumberOfPedestriansInvolved").focus();
                    }
                    $('#MessageToast').toast('show');
                }

            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinFifthStepLoading').hide();
            $("#btnSubmitFifthStepTwo").button("reset");
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function SaveFifthStepDataTwo() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
        $('#MessageModal').modal();
        return false;
    }
    $('#spinFifthStepLoading').show();
    $('#btnSubmitFifthStepTwo').button("loading");
    var obj = {
        "id": $("#hidId").val(),
        "index": $("#cmbVehiclesInvolved").prop('selectedIndex'),
        "brakeTraceBeforeAccident": $("#txtBrakeTraceBeforeAccident").val(),
        "brakeTraceAfterAccident": $("#txtBrakeTraceAfterAccident").val(),
        "distanceMoveAfterAccident": $("#txtDistanceMoveAfterAccident").val(),
        "accelerationIncludings": $("#txtAccelerationIncludings").val(),
        "roadFrictionFactor": $("#txtRoadFrictionFactor").val(),
        "vehiclesHeightFromGround": $("#txtVehiclesHeightFromGround").val(),
        "slopeDegreeDirection": $("#txtSlopeDegreeDirection").val(),
        "brakeAcceleration": $("#txtBrakeAcceleration").val(),
        "roadsCurveRadius": $("#txtRoadsCurveRadius").val(),
        "tierMarks": $("#txtTierMarks").val(),
        "quDriverNoticedDanger": $("#txtQuDriverNoticedDanger").val(),
        "quDriverTime": $("#txtQuDriverTime").val(),
        "quMaximumDistancePieces": $("#txtQuMaximumDistancePieces").val(),
        "brakeTraceTestSpeed": $("#txtBrakeTraceTestSpeed").val(),
        "testSpeed": $("#txtTestSpeed").val()
    }
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/FifthUpdateAccidentSecond",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    $("#lblVehiclesToast").html(CreateToast(msg.d[0].Message));
                    $(".ShowVehiclesInvolved,#btnSubmitFifthStep,#btnSubmitFifthStepTwo,#btnBackFifthStepTwo,#divFifthStepTwo,#divFifthStepTwo2").hide();
                    $("#btnSubmitFifthStepThree,#btnBackFifthStepThree,#divFifthStepThree").show();
                    LoadFifthStepThree();
                    $('#MessageToast').toast('show');
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinFifthStepLoading').hide();
            $("#btnSubmitFifthStepTwo").button("reset");
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function SaveFifthStepData() {
    //if ($("#hidId").val() == "") {
    //    $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    //if ($("#txtNumberOfVehiclesInvolved").val() == "") {
    //    $("#spnNumberOfVehiclesInvolvedError").show("slow");
    //    $("#txtNumberOfVehiclesInvolved").focus();
    //    return false;
    //}
    //if ($("#txtNumberOfVehiclesInvolved").val() == "0") {
    //    $("#txtNumberOfVehiclesInvolved,#txtNumberOfBikeRidersInvolved").attr("readonly", "");
    //    $("#txtNumberOfPedestriansInvolved").removeAttr("readonly");
    //    //
    //    return false;
    //}
    //if ($("#cmbVehicleType").val() == "" || $("#cmbVehicleType").val() == "-1") {
    //    $("#spnVehicleTypeError").show("slow");
    //    $("#cmbVehicleType").focus();
    //    return false;
    //}
    var driverFlee = "";
    if ($("#rdoDriverFleeYes").is(":checked")) driverFlee = "true";
    else if ($("#rdoDriverFleeNo").is(":checked")) driverFlee = "false";
    if (driverFlee == "true" && (($("#cmbVehicleType").prop('selectedIndex') > 0 && $("#cmbVehicleType").prop('selectedIndex') < 12) || $("#cmbVehicleType").val() === "تانکر حمل مواد خطرناک") && ($("#txtPlateNumberFirst").val() == "" || $("#txtPlateNumberSecond").val() == "" || $("#txtPlateNumberThird").val() == "" || $("#txtPlateNumberFourt").val() == "")) {
        $("#lblMessage").html(CreateModal("پلاک وسیله نقلیه را وارد کنید!"));
        $('#MessageModal').modal();
        return false;
    }
    if (driverFlee == "true" && (($("#cmbVehicleType").prop('selectedIndex') > 0 && $("#cmbVehicleType").prop('selectedIndex') < 12) || $("#cmbVehicleType").val() === "تانکر حمل مواد خطرناک")) {
        if ($("#cmbVehicleType").val() != "موتورسیکلت") {
            var getPlateNumberFourt = $("#txtPlateNumberFourt").val().length;
            var getPlateNumberFirst = $("#txtPlateNumberFirst").val().length;
            var getPlateNumberSecond = $("#txtPlateNumberSecond").val().length;
            var getPlateNumberThird = $("#txtPlateNumberThird").val().length;
            if (getPlateNumberFourt != 2 || getPlateNumberFirst != 2 || getPlateNumberSecond != 3 || getPlateNumberThird != 1) {
                $("#lblMessage").html(CreateModal("پلاک وارد شده صحیح نمی باشد!"));
                $('#MessageModal').modal();
                return false;
            }
        } else {
            var getPlateNumberBikeFirst = $("#txtPlateNumberBikeFirst").val().length;
            var getPlateNumberBikeSecond = $("#txtPlateNumberBikeSecond").val().length;
            if (getPlateNumberBikeFirst != 3 || getPlateNumberBikeSecond != 5) {
                $("#lblMessage").html(CreateModal("پلاک وارد شده صحیح نمی باشد!"));
                $('#MessageModal').modal();
                return false;
            }
        }
    }
    //if (($("#cmbVehicleType").val() == "موتورسیکلت") && ($("#txtPlateNumberBikeFirst").val() == "" || $("#txtPlateNumberBikeSecond").val() == "")) {
    //    $("#lblMessage").html(CreateModal("پلاک موتورسیکلت را وارد کنید!"));
    //    $('#MessageModal').modal();
    //    return false;
    //}

    //if ($("#txtVehicleSystem").val() == "") {
    //    $("#spnVehicleSystemError").show("slow");
    //    $("#txtVehicleSystem").focus();
    //    return false;
    //}
    //if ($("#cmbVehicleManeuvering").val() == "" || $("#cmbVehicleManeuvering").val() == "-1") {
    //    $("#spnVehicleManeuveringError").show("slow");
    //    $("#cmbVehicleManeuvering").focus();
    //    return false;
    //}
    //if ($("#cmbTechnicalInspection").val() == "" || $("#cmbTechnicalInspection").val() == "-1") {
    //    $("#spnTechnicalInspectionError").show("slow");
    //    $("#cmbTechnicalInspection").focus();
    //    return false;
    //}
    //if (!$(".vehicleHaveLoad").is(":checked")) {
    //    $("#lblMessage").html(CreateModal("به این سوال پاسخ دهید : آیا وسیله نقلیه دارای بار است؟"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    //if ($("#rdoVehicleHaveLoadYes").is(":checked") && ($("#cmbLoadType").val() == "" || $("#cmbLoadType").val() == "-1")) {
    //    $("#spnLoadTypeError").show("slow");
    //    $("#cmbLoadType").focus();
    //    return false;
    //}
    //if ($("#cmbTypeOfCollision").val() == "" || $("#cmbTypeOfCollision").val() == "-1") {
    //    $("#spnTypeOfCollisionError").show("slow");
    //    $("#cmbTypeOfCollision").focus();
    //    return false;
    //}
    //if ($("#txtCodeCausingAccident").val() == "") {
    //    $("#spnCodeCausingAccidentError").show("slow");
    //    $("#txtCodeCausingAccident").focus();
    //    return false;
    //}
    $('#spinFifthStepLoading').show();
    $('#btnSubmitFifthStep').button("loading");
    var vehicleHaveLoad = "";
    if ($("#rdoVehicleHaveLoadYes").is(":checked")) vehicleHaveLoad = "true";
    else if ($("#rdoVehicleHaveLoadNo").is(":checked")) vehicleHaveLoad = "false";
    var systemIncompatibility = "";
    if ($("#rdoSystemIncompatibilityYes").is(":checked")) systemIncompatibility = "true";
    else if ($("#rdoSystemIncompatibilityNo").is(":checked")) systemIncompatibility = "false";
    var airbagFunction = "";
    if ($("#rdoAirbagFunctionYes").is(":checked")) airbagFunction = "true";
    else if ($("#rdoAirbagFunctionNo").is(":checked")) airbagFunction = "false";
    let isLocal = "false";
    let plateNumberBikeFirst = $("#txtPlateNumberBikeFirst").val() === "" ? 0 : parseInt($("#txtPlateNumberBikeFirst").val());
    let plateNumberFirst = $("#txtPlateNumberFirst").val() === "" ? 0 : parseInt($("#txtPlateNumberFirst").val());
    if ($("#cmbVehicleType").val() === "موتورسیکلت" && ((plateNumberBikeFirst >= 563 && plateNumberBikeFirst <= 569) || plateNumberBikeFirst === 851))
        isLocal = "true";
    else if ($("#cmbVehicleType").val() !== "موتورسیکلت" && (plateNumberFirst === 14 || plateNumberFirst === 24 || plateNumberFirst === 34))
        isLocal = "true";
    var obj = {
        "id": $("#hidId").val(),
        "index": $("#cmbVehiclesInvolved").prop('selectedIndex'),
        "numberOfVehiclesInvolved": $("#txtNumberOfVehiclesInvolved").val(),
        //"numberOfPedestriansInvolved": $("#txtNumberOfPedestriansInvolved").val(),
        //"numberOfBikeRidersInvolved": $("#txtNumberOfBikeRidersInvolved").val(),
        "vehicleType": $("#cmbVehicleType").val(),
        "driverFlee": driverFlee,
        "plateNumberFirst": $("#txtPlateNumberFirst").val() + "-" + $("#txtPlateNumberSecond").val() + "-" + $("#txtPlateNumberThird").val() + "-" + $("#txtPlateNumberFourt").val() + "|" + $("#txtPlateNumberBikeFirst").val() + "-" + $("#txtPlateNumberBikeSecond").val(),
        "vehicleSystem": $("#txtVehicleSystem").val(),
        "vehicleManeuvering": $("#cmbVehicleManeuvering").val(),
        "plateType": $("#cmbPlateType").val(),
        "safetyEquipment": $("#cmbSafetyEquipment").val(),
        "pathDirection": $("#cmbPathDirection").val(),
        "signsOnRoad": $("#txtSignsOnRoad").val(),
        "functionAfterDamage": $("#cmbFunctionAfterDamage").val(),
        "technicalInspection": $("#cmbTechnicalInspection").val(),
        "companyOrganisation": $("#txtCompanyOrganisation").val(),
        "vehicleHaveLoad": vehicleHaveLoad,
        "loadType": $("#cmbLoadType").val(),
        "loadFreight": $("#txtLoadFreight").val(),
        "systemIncompatibility": systemIncompatibility,
        "airbagFunction": airbagFunction,
        "accidentTraces": $("#cmbAccidentTraces").val(),
        "typeOfCollision": $("#cmbTypeOfCollision").val(),
        "codeCausingAccident": $("#txtCodeCausingAccident").val(),
        "isLocal": isLocal
    }
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/FifthUpdateAccident",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    $("#lblVehiclesToast").html(CreateToast(msg.d[0].Message));
                    $('#MessageToast').toast('show');
                    $(".ShowVehiclesInvolved,#btnSubmitFifthStep").hide();
                    $("#divFifthStepTwo,#btnBackFifthStepTwo,#btnSubmitFifthStepTwo,#divFifthStepTwo2").show();
                    LoadFifthStepTwo();
                }

            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinFifthStepLoading').hide();
            $("#btnSubmitFifthStep").button("reset");
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function SaveFourthStepData() {
    //if ($("#hidId").val() == "") {
    //    $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    //if ($("#cmbFinalReason").val() == "" || $("#cmbFinalReason").val() == "-1") {
    //    $("#spnFinalReasonError").show("slow");
    //    $("#cmbFinalReason").focus();
    //    return false;
    //}
    //if ($("#cmbFinalReason").val() === "عدم توجه به جلو" && ($("#cmbLackOfAttention").val() == "" || $("#cmbLackOfAttention").val() == "-1")) {
    //    $("#spnLackOfAttentionError").show("slow");
    //    $("#cmbLackOfAttention").focus();
    //    return false;
    //}
    //if ($("#cmbFinalReason").val() === "عدم توانایی در کنترل نقلیه" && ($("#cmbInabilityControlVehicle").val() == "" || $("#cmbInabilityControlVehicle").val() == "-1")) {
    //    $("#spnInabilityControlVehicleError").show("slow");
    //    $("#cmbInabilityControlVehicle").focus();
    //    return false;
    //}
    //if ($("#cmbVehicleFactorInCarCrash").val() == "" || $("#cmbVehicleFactorInCarCrash").val() == "-1") {
    //    $("#spnVehicleFactorInCarCrashError").show("slow");
    //    $("#cmbVehicleFactorInCarCrash").focus();
    //    return false;
    //}
    var obj = {
        "id": $("#hidId").val(),
        "finalReason": $("#cmbFinalReason").val(),
        "lackOfAttention": $("#cmbLackOfAttention").val(),
        "inabilityControlVehicle": $("#cmbInabilityControlVehicle").val(),
        "vehicleFactorInCarCrash": $("#cmbVehicleFactorInCarCrash").val(),
        "humanFactorInCarCrash": $("#cmbHumanFactorInCarCrash").val(),
        "judicialCause": $("#cmbJudicialCause").val()
    }
    $('#spinFourthStepLoading').show();
    $('#btnSubmitFourthStep').button("loading");
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/FourthUpdateAccident",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                } else {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $("#divFourthStep").hide();
                    $("#divFifthStep").show();
                    $("#FourthStep").removeClass("active");
                    $("#FifthStep").addClass("active");
                    $("#FifthStep").trigger("click");
                    //LoadFourthStep(); 

                }
                $('#MessageModal').modal();
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinFourthStepLoading').hide();
            $("#btnSubmitFourthStep").button("reset");
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function SaveThirdStepData() {
    //if ($("#hidId").val() == "") {
    //    $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    //if ($("#cmbRoadDefects").val() == "" || $("#cmbRoadDefects").val() == "-1") {
    //    $("#spnRoadDefectsError").show("slow");
    //    $("#cmbRoadDefects").focus();
    //    return false;
    //}
    //if ($("#cmbCarriageWayDirection").val() == "" || $("#cmbCarriageWayDirection").val() == "-1") {
    //    $("#spnCarriageWayDirectionError").show("slow");
    //    $("#cmbCarriageWayDirection").focus();
    //    return false;
    //}
    //if ($("#cmbLightingStatus").val() == "" || $("#cmbLightingStatus").val() == "-1") {
    //    $("#spnLightingStatusError").show("slow");
    //    $("#cmbLightingStatus").focus();
    //    return false;
    //}
    //if ($("#cmbRoadSurfaceCondition").val() == "" || $("#cmbRoadSurfaceCondition").val() == "-1") {
    //    $("#spnRoadSurfaceConditionError").show("slow");
    //    $("#cmbRoadSurfaceCondition").focus();
    //    return false;
    //}
    //if ($("#cmbVisualObstruction").val() == "" || $("#cmbVisualObstruction").val() == "-1") {
    //    $("#spnVisualObstructionError").show("slow");
    //    $("#cmbVisualObstruction").focus();
    //    return false;
    //}
    //if (!$(".isShoulderRoad").is(":checked")) {
    //    $("#lblMessage").html(CreateModal("به این سوال پاسخ دهید : آیا مسیر دارای شانه است؟"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    //if ($(".isShoulderRoad").is(":checked") && $("#cmbShoulderOfTheRoad").val() == "") {
    //    $("#spnShoulderOfTheRoadError").show("slow");
    //    $("#cmbShoulderOfTheRoad").focus();
    //    return false;
    //}
    //if ($("#cmbLocationLandUse").val() == "" || $("#cmbLocationLandUse").val() == "-1") {
    //    $("#spnLocationLandUseError").show("slow");
    //    $("#cmbLocationLandUse").focus();
    //    return false;
    //}
    //if ($("#cmbCarCrashLocation").val() == "" || $("#cmbCarCrashLocation").val() == "-1") {
    //    $("#spnCarCrashLocationError").show("slow");
    //    $("#cmbCarCrashLocation").focus();
    //    return false;
    //}
    //if ($("#cmbWeather").val() == "" || $("#cmbWeather").val() == "-1") {
    //    $("#spnWeatherError").show("slow");
    //    $("#cmbWeather").focus();
    //    return false;
    //}
    //if ($("#cmbGeometricDesign").val() == "" || $("#cmbGeometricDesign").val() == "-1") {
    //    $("#spnGeometricDesignError").show("slow");
    //    $("#cmbGeometricDesign").focus();
    //    return false;
    //}
    //if ($("#txtRoadwayWidthMain").val() == "" && $("#txtRoadwayWidthSubsidiary").val() == "" && $("#txtRoadwayWidthVillage").val() == "") {
    //    $("#lblMessage").html(CreateModal("عرض راه را وارد کنید"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    //if ($("#txtMaximumSpeedLimit").val() == "" || $("#txtMaximumSpeedLimit").val() == "-1") {
    //    $("#spnMaximumSpeedLimitError").show("slow");
    //    $("#txtMaximumSpeedLimit").focus();
    //    return false;
    //}
    var shoulderOfTheRoad;
    if ($("#rdoShoulderOfTheRoadYes").is(":checked")) shoulderOfTheRoad = "true";
    else if ($("#rdoShoulderOfTheRoadNo").is(":checked")) shoulderOfTheRoad = "false";
    var obj = {
        "id": $("#hidId").val(),
        "roadDefects": $("#cmbRoadDefects").val(),
        "carriageWayDirection": $("#cmbCarriageWayDirection").val(),
        "lightingStatus": $("#cmbLightingStatus").val(),
        "roadSurfaceCondition": $("#cmbRoadSurfaceCondition").val(),
        "visualObstruction": $("#cmbVisualObstruction").val(),
        "isShoulderRoad": shoulderOfTheRoad,
        "shoulderRoad": $("#cmbShoulderOfTheRoad").val(),
        "shouldersWidth": $("#txtShouldersWidth").val(),
        "roadMaintenance": $("#cmbRoadMaintenance").val(),
        "roadAssetsDamage": $("#cmbRoadAssetsDamage").val(),
        "locationLandUse": $("#cmbLocationLandUse").val(),
        "carCrashLocation": $("#cmbCarCrashLocation").val(),
        "weather": $("#cmbWeather").val(),
        "geometricDesign": $("#cmbGeometricDesign").val(),
        "pavmentMarking": $("#cmbPavmentMarking").val(),
        "roadwayWidthMain": $("#txtRoadwayWidthMain").val(),
        "roadwayWidthSubsidiary": $("#txtRoadwayWidthSubsidiary").val(),
        "roadwayWidthVillage": $("#txtRoadwayWidthVillage").val(),
        "maximumSpeedLimit": $("#txtMaximumSpeedLimit").val(),
    }
    $('#spinThirdStepLoading').show();
    $('#btnSubmitThirdStep').button("loading");
  
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/ThirdUpdateAccident",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                } else {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $("#divThirdStep").hide();
                    $("#divFourthStep").show();
                    $("#ThirdStep").removeClass("active");
                    $("#FourthStep").addClass("active");
                }
                $('#MessageModal').modal();
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinThirdStepLoading').hide();
            $("#btnSubmitThirdStep").button("reset");
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function SaveWitnessData() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مرحله قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    if ($("#txtWitnessName").val() == "") {
        $("#spnWitnessNameError").show("slow");
        $("#txtWitnessName").focus();
        return false;
    }
    if ($("#txtWitnessPhone").val() == "") {
        $("#spnWitnessPhoneError").show("slow");
        $("#txtWitnessPhone").focus();
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val(),
        "index": $("#cmbAddingWitness").prop('selectedIndex'),
        "witnessName": $("#txtWitnessName").val(),
        "witnessPhone": $("#txtWitnessPhone").val()
    }
    $('#spinWitnessLoading').show();
    $('#btnSubmitWitness').button("loading");
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/SaveWitness",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblWitnessToast").html(CreateToast(msg.d[0].Message));
                } else {
                    $("#lblWitnessToast").html(CreateToast(msg.d[0].Message));
                }
                $('#MessageToast').toast('show');
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinWitnessLoading').hide();
            $("#btnSubmitWitness").button("reset");
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function SaveSecondStepData() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html("ابتدا باید اطلاعات مرحله قبل را تکمیل کنید!");
        $('#MessageModal').modal();
        return false;
    }
    if ($("#cmbCrashType").val() == "" || $("#cmbCrashType").val() == "-1") {
        $("#spnCrashTypeError").show("slow");
        $("#cmbCrashType").focus();
        return false;
    }
    if ($("#cmbCollisionOfA").val() == "" || $("#cmbCollisionOfA").val() == "-1") {
        $("#spnCollisionOfAError").show("slow");
        $("#cmbCollisionOfA").focus();
        return false;
    }
    if ($("#cmbCollisionOfATwo").val() == "" || $("#cmbCollisionOfATwo").val() == "-1") {
        $("#spnCollisionOfATwoError").show("slow");
        $("#cmbCollisionOfATwo").focus();
        return false;
    }
    if (($("#cmbCollisionOfA").val() === "وسیله نقلیه" && $("#cmbCollisionOfATwo").val() === "یک وسیله نقلیه") && !$(".typeOfCollision").is(":checked")) {
        $("#lblMessage").html(CreateModal("در حالت برخورد وسیله نقلیه با وسیله نقلیه،حتما باید نوع برخورد را انتخاب نمایید!"));
        $('#MessageModal').modal();
        return false;
    }
    var addingWitness;
    if ($("#rdoAddingWitnessYes").is(":checked")) addingWitness = "true";
    else if ($("#rdoAddingWitnessNo").is(":checked")) addingWitness = "false";
    else addingWitness = "";

    var obj = {
        "id": $("#hidId").val(),
        "crashType": $("#cmbCrashType").val(),
        "crashScene": $("#cmbCrashScene").val(),
        "hasAddingWitness": addingWitness,
        "collisionOfA": $("#cmbCollisionOfA").val(),
        "collisionOfATwo": $("#cmbCollisionOfATwo").val(),
        "typeOfCollision": $(".typeOfCollision:checked").val() == undefined ? "" : $(".typeOfCollision:checked").val()
    }
    $('#spinSecondStepLoading').show();
    $('#btnSubmitSecondStep').button("loading");
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/SecondUpdateAccident",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                } else {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    LoadThirdStep();
                }
                $('#MessageModal').modal();
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSecondStepLoading').hide();
            $("#btnSubmitSecondStep").button("reset");
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}
function GetCityListInProvince(id) {
    var obj = { "provinceId": id }
    return $.ajax({
        type: "POST",
        url: "AddAccident.aspx/GetCityListInProvince",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    });
}
function GetAxisListInProvince(id) {
    var obj = { "provinceId": id }
    return $.ajax({
        type: "POST",
        url: "AddAccident.aspx/GetAxisListInProvince",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    });
}
var count = 0;
function SaveData() {
    $("#SecondStep").trigger("click");
   
    //if ($("#txtSerial").val() == "") {
    //    $("#spnSerialError").attr("title", "لطفا شماره سریال را وارد کنید");
    //    $("#spnSerialError").show("slow");
    //    $("#txtSerial").focus();
    //    return false;
    //}
    //var regex = RegExp('[0-9]{2}/[0-9]{7}', 'g');
    //if ($("#cmbProvince").val() == "" || $("#cmbProvince").val() == "-1") {
    //    $("#spnProvinceError").show("slow");
    //    $("#cmbProvince").focus();
    //    return false;
    //}
    //if ($("#txtTimeOfAccident").val() == "") {
    //    $("#spnTimeOfAccidentError").show("slow");
    //    $("#txtTimeOfAccident").focus();
    //    return false;
    //}
    //if ($("#txtPoliceAwarenessTime").val() == "") {
    //    $("#spnPoliceAwarenessTimeError").show("slow");
    //    $("#txtPoliceAwarenessTime").focus();
    //    return false;
    //}
    //if ($("#txtPoliceArrivalTime").val() == "") {
    //    $("#spnPoliceArrivalTimeError").show("slow");
    //    $("#txtPoliceArrivalTime").focus();
    //    return false;
    //}
    //if ($("#txtLongitude").val() == "") {
    //    $("#spnLongitudeError").show("slow");
    //    $("#txtLongitude").focus();
    //    return false;
    //}
    //if ($("#txtLatitude").val() == "") {
    //    $("#spnLatitudeError").show("slow");
    //    $("#txtLatitude").focus();
    //    return false;
    //}
    //if ($("#txtDateOfAccident").val() == "") {
    //    $("#spnDateOfAccidentError").show("slow");
    //    //$("#txtDateOfAccident").focus();
    //    return false;
    //}
    //if ($("#txtDateOfFormCompletion").val() == "") {
    //    $("#spnDateOfFormCompletionError").show("slow");
    //    $("#txtDateOfFormCompletion").focus();
    //    return false;
    //}
    //if ($("#txtLongitude").val() != "") {
    //    var getVal = $("#txtLongitude").val();
    //    var parts = getVal.split(':');
    //    if ((!inRange(parts[1], 0, 60) || !inRange(parts[2], 0, 60))/*!isLongitude(parseInt(getVal))*/ && !$('#MessageModal').is(':visible')) {
    //        $("#lblMessage").html(CreateModal("طول جغرافیایی وارد شده صحیح نمی باشد!"));
    //        $('#MessageModal').modal();
    //        return false;
    //    }
    //}
    //if ($("#txtLatitude").val() != "") {
    //    var getVal2 = $("#txtLatitude").val();
    //    var parts2 = getVal2.split(':');
    //    if ((!inRange(parts2[1], 0, 60) || !inRange(parts2[2], 0, 60))/*!isLongitude(parseInt(getVal))*/ && !$('#MessageModal').is(':visible')) {
    //        $("#lblMessage").html(CreateModal("عرض جغرافیایی وارد شده صحیح نمی باشد!"));
    //        $('#MessageModal').modal();
    //        return false;
    //    }
    //}
    var getLocation = $('#txtLocation').val().replace("LatLng(", "").replace(")", "");
    var latlong = getLocation.split(',');
    var latitude = parseFloat(latlong[0]);
    var longitude = parseFloat(latlong[1]);

    var pt1 = {
        "type": "Feature",
        "properties": {
            "marker-color": "#f00"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [longitude, latitude]
        }
    };
    var cityId = -2;
    var isArea = false, isNativeArea = false;
    var inPoliceStationArea = false;
    //if ($("#hidPoliceStationArea").val() !== "") {
    //    var objPoliceStationArea = JSON.parse($("#hidPoliceStationArea").val());
    //    inPoliceStationArea = turf.inside(pt1, objPoliceStationArea);
    //} else {
    //    var request = new XMLHttpRequest();
    //    request.open("GET", "/Geo/Province/Isfahan.txt", false);
    //    request.send(null);
    //    var returnValue = request.responseText;
    //    getvalue = JSON.parse(returnValue);
    //    inPoliceStationArea = turf.inside(pt1, getvalue);
    //}
    //if (!inPoliceStationArea) {
    //    $("#lblMessage").html(CreateModal("نقطه تصادف انتخاب شده با استان انتخابی همخوانی ندارد،در صورت اطمینان از درست بودن هر دو مورد،با پشتیبان تماس بگیرید!"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    ////GetCityListInProvince($("#cmbProvince").val()).done(function (data) {
    //    if (data != null) {
    //        if (data.d[0].IsSuccess != "true") {
    //            $("#lblMessage").html(CreateModal(data.d[0].Message));
    //            $('#MessageModal').modal();
    //        } else {
    //            for (let i = 0; i < data.d.length ; i++) {
    //                let getId = data.d[i].Id;
    //                let getArea = data.d[i].Message;
    //                let getNativeArea = data.d[i].MessageTwo;
    //                let getEnglishName = data.d[i].MessageThree;
    //                let objArea = getArea === "" ? "" : JSON.parse(getArea);
    //                let objNativeArea = getNativeArea === "" ? "" : JSON.parse(getNativeArea);
    //                isArea = objArea === "" ? false : turf.inside(pt1, objArea);
    //                if (!isArea) {
    //                    let request = new XMLHttpRequest();
    //                    alert(getEnglishName);
    //                    request.open("GET", "/Geo/Isfahan/" + getEnglishName + ".txt", false);
    //                    request.send(null);
    //                    let returnValue = JSON.parse(request.responseText);
    //                    isArea = turf.inside(pt1, returnValue);
    //                    if (!isArea) continue;
    //                } 
    //                isNativeArea = objNativeArea === "" ? false : turf.inside(pt1, objNativeArea);
    //                if (isNativeArea) {
    //                    cityId = getId;
    //                    break;
    //                }
    //                if (isArea && !isNativeArea) {
    //                    cityId = getId;
    //                    break;
    //                }
    //            }
    //        }
    //    }
    //    else {
    //        alert("خطا در برقراری ارتباط با سرور!");
    //    }
    //});
    var isAxisArea = false;
    var axisId = -1;
    //GetAxisListInProvince($("#cmbProvince").val()).done(function (data) {
    //    if (data != null) {
    //        if (data.d[0].IsSuccess != "true") {
    //            $("#lblMessage").html(CreateModal(data.d[0].Message));
    //            $('#MessageModal').modal();
    //        } else {
    //            let getId = data.d[0].Id.slice(0, -1).split('#');
    //            let getArea = data.d[0].Message.slice(0, -1).split('#');
    //            for (var i = 0; i < getId.length ; i++) {
    //                axisId = getId[i];
    //                var objArea = JSON.parse(getArea[i]);
    //                isAxisArea = turf.inside(pt1, objArea);
    //                if (!isAxisArea) continue;
    //            }
    //        }
    //    }
    //    else {
    //        alert("خطا در برقراری ارتباط با سرور!");
    //    }
    //});

    //if ($("#cmbButton").val() == "" || $("#cmbButton").val() == "-1") {
    //    $("#spnButtonError").show("slow");
    //    $("#cmbButton").focus();
    //    return false;
    //} 

    var obj = {
        "id": $("#hidId").val(),
        "serial": $("#txtSerial").val(),
        "provinceId": $("#cmbProvince").val(),
        "centerCode": $("#txtCenterCode").val(),
        "centerName": $("#txtCenterName").val(),
        "routeCode": $("#txtRouteCode").val(),
        "routeName": $("#txtRouteName").val(),
        "segmentCode": $("#txtSegmentCode").val(),
        "segmentName": $("#txtSegmentName").val(),
        "spotCode": $("#txtSpotCode").val(),
        "spotName": $("#txtSpotName").val(),
        "timeOfAccident": $("#txtTimeOfAccident").val(),
        "policeAwarenessTime": $("#txtPoliceAwarenessTime").val(),
        "policeArrivalTime": $("#txtPoliceArrivalTime").val(),
        "emsArrivalTime": $("#txtEmsArrivalTime").val(),
        "sosArrivalTime": $("#txtSosArrivalTime").val(),
        "policeAwarenessType": $("#cmbPoliceAwarenessType").val(),
        "longitude": $("#txtLongitude").val(),
        "latitude": $("#txtLatitude").val(),
        "distanceFromTheOrigin": $("#txtDistanceFromTheOrigin").val(),
        "dateOfAccident": $("#txtDateOfAccident").val(),
        "dateOfFormCompletion": $("#txtDateOfFormCompletion").val(),
        "location": getLocation,
        "cityId": cityId,
        "isArea": isArea,
        "isNativeArea": isNativeArea,
        "axisId": isAxisArea ? axisId : "",
        "inPoliceStationArea": inPoliceStationArea
    }
    $('#spinLoading').show();
    $('#btnSubmit').button("loading");
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/GetFirstInsertUpdateAccident",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {

                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                    $('#hidId').val(msg.d[0].Id);
                    $("#SecondStep").trigger("click");
                    //$("#lblMessage").html(SuccessMessages(msg.d[0].Message)); $('html, body').animate({
                    //    scrollTop: $("#lblMessage").offset().top
                    //}, 1500);
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinLoading').hide();
            $("#btnSubmit").button("reset");
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return true;
}
function Search(id) {
    var getId = id == "" ? $("#txtIdSearch").val() : id;
    var obj = {
        "name": $("#txtNameSearch").val(),
        "id": getId
    }
    $('#spinSearchLoading').show();
    $('#btnSearch').button("loading");
    $.ajax({
        type: "POST",
        url: "Plans.aspx/GetPlanGrid",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r != null) {
                var table = $("[id*=gridPlans]");
                if (r.d[0].Id == "0") {
                    $("#lblMessage").html(ErrorMessages(r.d[0].Caption));
                    return false;
                } else if (r.d[0].Id == "-1") {
                    table.find("tr:last-child").clone(true);
                    $("tr", table).not($("tr:first-child", table)).remove();
                    table.append("<tr><td colspan='11'>" + r.d[0].Caption + "</td></tr>");
                    return false;
                }
                table.find("tr:last-child").clone(true);
                $("tr", table).not($("tr:first-child", table)).remove();
                for (var i = 0; i < r.d.length; i++) {
                    var counter = i + 1;
                    table.append("<tr><td>" + counter + "</td><td>" + r.d[i].Id + "</td><td>" + r.d[i].Caption + "</td><td>" + r.d[i].SubmitBy + "</td>" + "<td>" + r.d[i].SubmitDate + "</td><td>" +
                        "<a target='_blank' href='" + r.d[i].EditUrl + ".aspx ' title='ویرایش'><i class='fa fa-edit fa-2x'></i></a>" + "</td></tr>");
                }

            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSearchLoading').hide();
            $("#btnSearch").button("reset");
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return true;
}
function pageLoad() {
    $("#lnkAddAccident").addClass("active");
    LoadBorderForComment();
    $("#cmbProvince").select2({
        placeholder: {
            id: "-1",
            text: "استان را انتخاب کنید"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbPoliceAwarenessType").select2({
        placeholder: {
            id: "-1",
            text: "نحوه مطلع شدن پلیس"
        },
        dir: 'rtl',
        allowClear: true,
        width: '100%'
    });
    $("#cmbCrashType").select2({
        placeholder: {
            id: "-1",
            text: "نوع تصادف"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbCrashScene").select2({
        placeholder: {
            id: "-1",
            text: "وضعیت صحنه تصادف"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbCollisionOfA").select2({
        placeholder: {
            id: "-1",
            text: "برخورد یک وسیله نقلیه"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbCollisionOfATwo").select2({
        placeholder: {
            id: "-1",
            text: "با"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbRoadDefects").select2({
        placeholder: {
            id: "-1",
            text: "نقایص موثر راه"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbCarriageWayDirection").select2({
        placeholder: {
            id: "-1",
            text: "سمت جهت راه"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbLightingStatus").select2({
        placeholder: {
            id: "-1",
            text: "وضع روشنایی"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbRoadSurfaceCondition").select2({
        placeholder: {
            id: "-1",
            text: "شرایط سطح راه"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbVisualObstruction").select2({
        placeholder: {
            id: "-1",
            text: "موانع دید"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbShoulderOfTheRoad").select2({
        placeholder: {
            id: "-1",
            text: "نوع شانه"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbRoadMaintenance").select2({
        placeholder: {
            id: "-1",
            text: "تعمیرات راه"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbRoadAssetsDamage").select2({
        placeholder: {
            id: "-1",
            text: "خسارت وارده به تجهیزات"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbLocationLandUse").select2({
        placeholder: {
            id: "-1",
            text: "کاربری محل"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbCarCrashLocation").select2({
        placeholder: {
            id: "-1",
            text: "موقعیت تصادف"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbWeather").select2({
        placeholder: {
            id: "-1",
            text: "وضع هوا"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbGeometricDesign").select2({
        placeholder: {
            id: "-1",
            text: "وضع هندسه محل تصادف"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbPavmentMarking").select2({
        placeholder: {
            id: "-1",
            text: "خط کشی"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbFinalReason").select2({
        placeholder: {
            id: "-1",
            text: "علت تامه تصادف"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbLackOfAttention").select2({
        placeholder: {
            id: "-1",
            text: "عدم توجه به جلو ناشی از"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbInabilityControlVehicle").select2({
        placeholder: {
            id: "-1",
            text: "عدم توانایی در کنترل وسیله نقلیه ناشی از"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbVehicleFactorInCarCrash").select2({
        placeholder: {
            id: "-1",
            text: "عامل وسیله نقلیه در تصادف"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbHumanFactorInCarCrash").select2({
        placeholder: {
            id: "-1",
            text: "عامل انسانی موثر در تصادف"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbJudicialCause").select2({
        placeholder: {
            id: "-1",
            text: "علت قضایی تصادف"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbVehicleType").select2({
        placeholder: {
            id: "-1",
            text: "نوع وسیله نقلیه"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbPlateType").select2({
        placeholder: {
            id: "-1",
            text: "نوع پلاک"
        },
        dir: 'rtl',
        width: '100%'
    });

    $("#cmbVehicleManeuvering").select2({
        placeholder: {
            id: "-1",
            text: "مانور وسیله نقلیه"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbPlateType").select2({
        placeholder: {
            id: "-1",
            text: "نوع پلاک"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbSafetyEquipment").select2({
        placeholder: {
            id: "-1",
            text: "تجهیزات ایمنی"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbPathDirection").select2({
        placeholder: {
            id: "-1",
            text: "مسیر حرکت"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbFunctionAfterDamage").select2({
        placeholder: {
            id: "-1",
            text: "کارایی وسیله بعد از تصادف"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbTechnicalInspection").select2({
        placeholder: {
            id: "-1",
            text: "معاینه فنی"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbLoadType").select2({
        placeholder: {
            id: "-1",
            text: "نوع بار"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbAccidentTraces").select2({
        placeholder: {
            id: "-1",
            text: "آثار باقیمانده درصحنه"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbTypeOfCollision").select2({
        placeholder: {
            id: "-1",
            text: "نحوه برخورد"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbSex,#cmbSexPassenger").select2({
        placeholder: {
            id: "-1",
            text: "جنسیت"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbSeatBelt").select2({
        placeholder: {
            id: "-1",
            text: "کمربند / کلاه ایمنی"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbDriverStatues").select2({
        placeholder: {
            id: "-1",
            text: "وضعیت راننده وسیله ‌نقلیه"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbInjuryAtScene,#cmbInjuryPassenger").select2({
        placeholder: {
            id: "-1",
            text: "صدمه در صحنه"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbDriverLicenceCategory").select2({
        placeholder: {
            id: "-1",
            text: "نوع گواهینامه"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbDriverLicenceStatus").select2({
        placeholder: {
            id: "-1",
            text: "وضعیت گواهینامه"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbOnSiteCrossingFacilities,#cmbOnSiteCrossingFacilitiesBikeRiders").select2({
        placeholder: {
            id: "-1",
            text: "امکانات عبور در محل"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbSexPedestrians,#cmbSexBikeRiders").select2({
        placeholder: {
            id: "-1",
            text: "جنسیت"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbClothesColor,#cmbClothesColorBikeRiders").select2({
        placeholder: {
            id: "-1",
            text: "رنگ لباس"
        },
        dir: 'rtl',
        width: '100%'
    });

    $("#cmbPedestriansSituation,#cmbBikeRidersSituation,#cmbPassengerSituation").select2({
        placeholder: {
            id: "-1",
            text: "وضعیت"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbEducation,#cmbEducationPedestrians,#cmbEducationBikeRiders,#cmbEducationPassenger").select2({
        placeholder: {
            id: "-1",
            text: "تحصیلات"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbJob,#cmbJobPedestrians,#cmbJobBikeRiders,#cmbJobPassenger").select2({
        placeholder: {
            id: "-1",
            text: "شغل"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbSafetyPassenger").select2({
        placeholder: {
            id: "-1",
            text: "ایمنی"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbInjuredTransferMethod").select2({
        placeholder: {
            id: "-1",
            text: "نحوه انتقال مجروح"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbOrganizationsToBlame").select2({
        placeholder: {
            id: "-1",
            text: "سازمان های مقصر در تصادف"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbSelectAccidentCar").select2({
        placeholder: {
            id: "-1",
            text: "وسیله نقلیه آسیب دیده"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbFirstPointCollision").select2({
        placeholder: {
            id: "-1",
            text: "اولین نقطه برخورد"
        },
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbDamagedParts").select2({
        placeholder: {
            id: "-1",
            text: "قسمت های آسیب دیده"
        },
        dir: 'rtl',
        width: '100%',
        closeOnSelect: false
    });
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
        disableAfterToday: true,

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
        //fromDate: true,
        //toDate: false,
        englishNumber: true,
        modalMode: true,
        groupId: 'group1'
    });
}

function LoadSecondStep() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadThirdStep() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadFourthStep() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadSixStep() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadSeventhStep() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        error: function (response) { if (response.status == 401) location.reload(); }
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
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
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
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
        $('#MessageModal').modal();
        return false;
    }
    var obj = {
        "accidentId": $("#hidId").val()
    }
    $('#spinFifthStepLoading').show();
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/GetCountFifthStep",
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
                    //$("#txtNumberOfVehiclesInvolved").trigger('change');
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        complete: function () {
            $('#spinFifthStepLoading').hide();
        },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function FillVehiclesInvolved() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        url: "AddAccident.aspx/LoadFifthStep",
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
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinFifthStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function FillCmbVehiclesInvolved(index) {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        url: "AddAccident.aspx/FillCmbVehiclesInvolved",
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
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinFifthStepLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function FillCmbPedestriansInvolved(index) {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        url: "AddAccident.aspx/FillCmbPedestriansInvolved",
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
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinPedestriansLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function FillCmbBikeRidersInvolved(index) {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        url: "AddAccident.aspx/FillCmbBikeRidersInvolved",
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
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinBikeRidersLoading').hide();
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadFifthStep() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadFifthStepThree() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadAccidentPedestrians() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function LoadAccidentBikeRiders() {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return false;
}

function ShowInjuredDetail(id) {
    SelectInput(id);
    //if ($("#hidId").val() == "") {
    //    $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
    //    $('#MessageModal').modal();
    //    return false;
    //}
    var injuredRole = $('input[type=radio][name=InjuredRole]:checked').val();
    var obj = {
        "id": id,
        "injuredRole": injuredRole
    }
    console.log(id);
    console.log(injuredRole);
    $("#divGenarateInjuredList,#divInjuredDetail,#divInjuredDetailReadOnly").show();
    $('#spinSixthStepLoading').show();
    $.ajax({
        type: "POST",
        url: "AddAccident.aspx/ShowInjuredDetail",
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
                    //
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
    return false;
}

function InjuredDetail(index) {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        url: "AddAccident.aspx/LoadInjuredDetail",
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
    return false;
}

function LoadInjuredRole(name) {
    if ($("#hidId").val() == "") {
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        url: "AddAccident.aspx/LoadInjuredRole",
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
        $("#lblMessage").html(CreateModal("ابتدا باید اطلاعات مراحل قبل را تکمیل کنید!"));
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
        url: "AddAccident.aspx/FillInjured",
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
                    $('#divGenarateInjuredList').show("slow");
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
function SaveExplanationAudio() {

    var formData = new FormData();
    var files = $('.attachment');
    $.each(files, function (key, value) {
        var file = $(value).data('file');
        formData.append(file.name, file);
    });

    $.ajax({
        url: "FileUploadHandler.ashx",
        type: "POST",
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        data: formData,
        success: function (result) {
            alert(result);
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
}
$(document).ready(function () {
    pageLoad();
    $("input[type='text']").on('blur', function () {
        $(".error").hide("slow");
    });
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
            url: "AddAccident.aspx/GetWitness",
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
                } else {
                    alert("خطا در برقراری ارتباط با سرور!");
                }
            },
            complete: function () {
                $('#spinWitnessLoading').hide();
                $("#btnSubmitWitness").button("reset");
            },
            error: function (response) { if (response.status == 401) location.reload(); },
            failure: function (response) {
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
            url: "AddAccident.aspx/GetAccidentCarDamage",
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
                } else {
                    alert("خطا در برقراری ارتباط با سرور!");
                }
            },
            complete: function () {
                $('#spinSeventhDamageLoading').hide();
                $("#btnSubmitDamage").button("reset");
            },
            error: function (response) { if (response.status == 401) location.reload(); },
            failure: function (response) {
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
        $(".ShowVehiclesInvolved,#divFifthStepThree,#divFifthStepThree,#btnSubmitFifthStep,#btnSubmitFifthStepThree,#btnBackFifthStepThree").hide();
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
        url: "/Handle/AccidentImageHandle.ashx?GUID=" + $("#hideAccidentGuid").val() + "&IsRemove=false&Id=",
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
            this.on("processing", function (file) {
                this.options.url = this.options.url + $("#hidId").val();
            });
            this.on("sending", function (file, xhr, formData) {
                if (file.size < 1024 * 1024 * 2/*2MB*/) {
                    this.options.resizeWidth = 2000;
                    this.options.resizeQuality = 0.75;
                }
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
                    error: function (response) { if (response.status == 401) location.reload(); }
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
            if (response.status == 401) location.reload();
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
    $("#cmbProvince").on('change', function () {
        let provinceId = $(this).val();
        if ($("#hidPoliceStationArea").val() !== "") {
            let getvalue = JSON.parse($("#hidPoliceStationArea").val());
            let geojsonFeature = {
                "type": "FeatureCollection",
                "features": [getvalue]
            };
            let multipolygon = L.geoJson(geojsonFeature, { style: polystyle });
            let iran = new L.LayerGroup();
            let desyCircle = LGeo.circle([32.31149, 54.2171693], 1600000, {
                parts: 60
            }).addTo(iran);
            let unionTemp = turf.mask(desyCircle.toGeoJSON(), getvalue);
            let cityUnion = L.geoJson(unionTemp, { style: polystyleIran }).addTo(map);
            multipolygon.addTo(map);
            map.fitBounds(multipolygon.getBounds());
        } else {
            /*let iran = new L.LayerGroup();*/
            let request = new XMLHttpRequest();
            //request.open("GET", "/Geo/Province/Isfahan.txt", false);
            request.open("GET", "/Geo/Province/Isfahan.txt", false);
            request.send(null);
            let returnValue = request.responseText;
            let datalayer = L.geoJson(JSON.parse(returnValue), { style: polystyle }, {
                onEachFeature: function (feature, featureLayer) {
                    featureLayer.bindPopup(feature.properties.NAME_1);
                }
            }).addTo(map);
            map.fitBounds(datalayer.getBounds());
            //getvalue = JSON.parse(returnValue).geometry;
            //console.log(getvalue.coordinates);
            //let iran = new L.LayerGroup();
            //let desyCircle = LGeo.circle([32.31149, 54.2171693], 1600000, {
            //    parts: 60
            //}).addTo(iran);
            ////var polygon = turf.multiPolygon(JSON.parse(returnValue).features[0].geometry.coordinates[0]);
            //let unionTemp;
            //for (let i = 0; i < getvalue.coordinates.length; i++) {
            //    const searchWithin = turf.polygon(getvalue.coordinates[i]);
            //    unionTemp = turf.mask(desyCircle.toGeoJSON(), searchWithin);
            //}
            //let cityUnion = L.geoJson(unionTemp, { style: polystyleIran }).addTo(map);

            //$.getJSON("/Geo/Province/Isfahan.txt", function (data) {
            //    let dataLayer = L.geoJson(data, { style: polystyle }, {
            //        onEachFeature: function (feature, featureLayer) {
            //            featureLayer.bindPopup(feature.properties.NAME_1);
            //        }
            //    }).addTo(map);
            //    map.fitBounds(dataLayer.getBounds());
            //    let iran = new L.LayerGroup();
            //    let desyCircle = LGeo.circle([32.31149, 54.2171693], 1600000, {
            //        parts: 60
            //    }).addTo(iran);
            //    //var polygon = turf.multiPolygon(data.coordinates[0]);

            //    let unionTemp;
            //    let searchWithin;
            //    for (let i = 0; i < data.geometry.coordinates.length; i++) {
            //        searchWithin = turf.polygon(data.geometry.coordinates[i]);
            //        //console.log(searchWithin);
            //        unionTemp = turf.mask(desyCircle.toGeoJSON(), searchWithin);
            //        console.log(unionTemp);
            //    } 

            //    let cityUnion = L.geoJson(unionTemp, { style: polystyleIran }).addTo(map);
            //    //let getvalue = JSON.parse(data);
            //    //let desyCircle = LGeo.circle([32.31149, 54.2171693], 1600000, {
            //    //    parts: 60
            //    //}).addTo(iran);

            //    ////console.log(dataLayer.toGeoJSON().features[0]);
            //    //let unionTemp = turf.mask(desyCircle.toGeoJSON(), data.features);
            //    //console.log(data.features);
            //    //let cityUnion = L.geoJson(unionTemp, { style: polystyleIran }).addTo(map);

            //});
        }

    });
});
function isLatitude(lat) {
    return isFinite(lat) && Math.abs(lat) <= 90;
}
function isLongitude(lng) {
    return isFinite(lng) && Math.abs(lng) <= 180;
}
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
function AccidentPicturesHandle(num) {
    $("#AccidentPicturesUpload" + num).dropzone({
        url: "/Handle/AccidentPicturesHandle.ashx?GUID=" + $("#hideAccidentPicturesGuid").val() + num + "&IsRemove=false&Id=",
        maxFiles: 1,
        //acceptedFiles: ".png,.jpg,.jpeg,.PNG,.JPG,.JPEG",
        acceptedFiles: "image/*",
        capture: "camera",
        clickable: true,
        maxFilesize: 20, // MB
        addRemoveLinks: true,
        parallelUploads: 1,
        uploadMultiple: false,
        success: function (file, response) {
            //var imgName = response;
            file.previewElement.classList.add("dz-success");
        },
        init: function () {
            this.on("processing", function (file) {
                this.options.url = this.options.url + $("#hidId").val();
            });
            this.on("sending", function (file) {
                if (file.size < 1024 * 1024 * 2/*2MB*/) {
                    this.options.resizeWidth = 2000;
                    this.options.resizeQuality = 0.75;
                }
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
                            var getInt = parseInt(num) + 1;
                            $("#AccidentPicturesUpload" + getInt).removeClass("hide");
                        }
                    },
                    error: function (response) { if (response.status == 401) location.reload(); }
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
            if (response.status == 401) location.reload();
        }
    });
}
function openDateOfAccident() {
    var btn = document.getElementById("dateDateOfAccident");
    btn.click();
    event.preventDefault();
}
function openDateOfFormCompletion() {
    var btn = document.getElementById("dateDateOfFormCompletion");
    btn.click();
    event.preventDefault();
}
function openDateLicenceIssue() {
    var btn = document.getElementById("dateDateLicenceIssue");
    btn.click();
    event.preventDefault();
}
function inRange(value, a, b) {
    return value >= a && value <= b;
}
document.addEventListener('DOMContentLoaded', function () {
    let getId = GetURLParameter("Id");
    if (getId !== "" && getId !== undefined && getId !== null) {
        if ($("#hidPoliceStationArea").val() !== "") {
            let getvalue = JSON.parse($("#hidPoliceStationArea").val());
            let geojsonFeature = {
                "type": "FeatureCollection",
                "features": [getvalue]
            };
            let multipolygon = L.geoJson(geojsonFeature, { style: polystyle });
            let iran = new L.LayerGroup();
            let desyCircle = LGeo.circle([32.31149, 54.2171693], 1600000, {
                parts: 60
            }).addTo(iran);
            let unionTemp = turf.mask(desyCircle.toGeoJSON(), getvalue);
            let cityUnion = L.geoJson(unionTemp, { style: polystyleIran }).addTo(map);
            multipolygon.addTo(map);
            map.fitBounds(multipolygon.getBounds());
        } else {
            let request = new XMLHttpRequest();
            request.open("GET", "/Geo/Province/Isfahan.txt", false);
            request.send(null);
            let returnValue = request.responseText;
            let datalayer = L.geoJson(JSON.parse(returnValue), { style: polystyle }, {
                onEachFeature: function (feature, featureLayer) {
                    featureLayer.bindPopup(feature.properties.NAME_1);
                }
            }).addTo(map);
            map.fitBounds(datalayer.getBounds());
        }
        //$("#cmbProvince").trigger("change.select2");
    }
}, false);