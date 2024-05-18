var osmUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNoa2Fuc2F0YXJwb3VyIiwiYSI6ImNrdmp1bXlhaTA1aXkydW81eWF5bmwyejQifQ.j6er3HdjHOguoXgO4KbZ0w',
                        osmAttrib = '',
    osm = L.tileLayer(osmUrl, { maxZoom: 16, minZoom: 5, attribution: osmAttrib }),
    map = new L.Map('map', { rotate: true, touchRotate: true, center: new L.LatLng(30.551455, 49.187615), zoom: 6, zoomControl: false }),
                        drawnItems = L.featureGroup().addTo(map);
osm.addTo(map);
map.options.minZoom = 5;
Search();
map.on("zoomend", function () {
    //if()
    //map.setZoom(1);
});
function polyStyle(fillColor, color, fillOpacity) {
    return {
        fillColor: fillColor,
        weight: 2,
        opacity: 1,
        color: color,
        fillOpacity: fillOpacity
    };
}
function Search() {
    var typeOfReport = $('#cmbTypeOfReport').val();
    if (typeOfReport === "" || typeOfReport === "-1" || typeOfReport === null) {
        $("#lblMessage").html(CreateModal("ابتدا باید نوع گزارش را انتخاب کنید!"));
        $('#MessageModal').modal();
        return false;
    }
    let numItems = $('.leaflet-overlay-pane').length;
    if (numItems > 0 && $('.leaflet-overlay-pane').html() !== "") {
        $(".leaflet-interactive").remove();
    }
    //var getId = id == "" ? $("#txtIdSearch").val() : id;
    //var getStatus = $('input[type=radio][name=rdoStatus]:checked').val();
    var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
    if (getDateOfAccident == "Date") {
        getDateOfAccident = $("#txtDateRange").val().trim();
    }
    var getCrashType = $('input[type=radio][name=rdoIntensity]:checked').val();
    var getRoadway = $('input[type=radio][name=rdoRoadway]:checked').val();
    var getFilLocationLandUse = $('input[type=radio][name=rdoFilLocationLandUse]:checked').val();
    var getFilVisualObstruction = $('input[type=radio][name=rdoFilVisualObstruction]:checked').val();
    var getFilRoadDefects = $('input[type=radio][name=rdoFilRoadDefects]:checked').val();
    var getHoliday = $('input[type=radio][name=rdoHoliday]:checked').val();
    var getCollision = $('input[type=radio][name=rdoCollision]:checked').val();
    var getTypeOfVehicle = $('input[type=radio][name=rdoTypeOfVehicle]:checked').val();
    //var getInNativeArea = $('input[type=radio][name=rdoDriverBlame]:checked').val();
    var getDangerousMaterials = $('input[type=radio][name=rdoDangerousMaterials]:checked').val();
    var weather = $("#cmbWeather").val() === "-1" ? "" : $("#cmbWeather").val();
    var finalReason = $("#cmbFinalReason").val() === "-1" ? "" : $("#cmbFinalReason").val();
    let chkIsLocalDriver = $('input[type=radio][name=rdoDriverBlame]:checked').val();
    var obj = {
        "dateOfAccident": getDateOfAccident == undefined ? "" : getDateOfAccident,
        "crashType": getCrashType == undefined ? "" : getCrashType,
        "roadway": getRoadway == undefined ? "" : getRoadway,
        "locationLandUse": getFilLocationLandUse == undefined ? "" : getFilLocationLandUse,
        "visualObstruction": getFilVisualObstruction == undefined ? "" : getFilVisualObstruction,
        "roadDefects": getFilRoadDefects == undefined ? "All" : getFilRoadDefects,
        "isHoliday": getHoliday == undefined ? "" : getHoliday,
        "collisionOfA": getCollision == undefined ? "" : getCollision,
        "weather": weather,
        "typeOfVehicle": getTypeOfVehicle == undefined ? "" : getTypeOfVehicle,
        "vehicleType": getDangerousMaterials == undefined ? "" : getDangerousMaterials,
        "finalReason": finalReason,
        "collisionChild1": getCollision !== "تک وسیله ای" || $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
        "collisionChild2": getCollision !== "دو وسیله ای" || $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
        "isLocalDriver": chkIsLocalDriver == undefined ? "" : chkIsLocalDriver
    }
    $('#spinSearchLoading,#spinSearchPerfesionalLoading').show();
    $.ajax({
        type: "POST",
        url: "SafetyIndex.aspx/GetSearchSafetyIndex",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r != null) {
                if (r.d[0].Abadan == "-1" || r.d[0].Abadan == "-2" || r.d[0].Abadan == "-3") {
                    $("#lblMessage").html(CreateModal(r.d[0].Location));
                    $('#MessageModal').modal();
                    return false;
                } else {
                    let abadan = parseFloat(r.d[0].Abadan);
                    let aghajari = parseFloat(r.d[0].Aghajari);
                    let ahvaz = parseFloat(r.d[0].Ahvaz);
                    let andika = parseFloat(r.d[0].Andika);
                    let andimeshk = parseFloat(r.d[0].Andimeshk);
                    let baghMalek = parseFloat(r.d[0].BaghMalek);
                    let bavi = parseFloat(r.d[0].Bavi);
                    let behbahan = parseFloat(r.d[0].Behbahan);
                    let dahsteAzadegan = parseFloat(r.d[0].DahsteAzadegan);
                    let dezful = parseFloat(r.d[0].Dezful);
                    let dezpart = parseFloat(r.d[0].Dezpart);
                    let eze = parseFloat(r.d[0].Eze);
                    let gotvand = parseFloat(r.d[0].Gotvand);
                    let haftkol = parseFloat(r.d[0].Haftkol);
                    let hamidie = parseFloat(r.d[0].Hamidie);
                    let hendijan = parseFloat(r.d[0].Hendijan);
                    let hoveize = parseFloat(r.d[0].Hoveize);
                    let karkhe = parseFloat(r.d[0].Karkhe);
                    let karoun = parseFloat(r.d[0].Karoun);
                    let khoramshahr = parseFloat(r.d[0].Khoramshahr);
                    let lali = parseFloat(r.d[0].Lali);
                    let mahshahr = parseFloat(r.d[0].Mahshahr);
                    let masjedSoleiman = parseFloat(r.d[0].MasjedSoleiman);
                    let omidie = parseFloat(r.d[0].Omidie);
                    let ramhormoz = parseFloat(r.d[0].Ramhormoz);
                    let ramshir = parseFloat(r.d[0].Ramshir);
                    let shadegan = parseFloat(r.d[0].Shadegan);
                    let shooshtar = parseFloat(r.d[0].Shooshtar);
                    let shush = parseFloat(r.d[0].Shush);
                    
                    let arr = [];
                    if (abadan > 0) {
                        abadan = abadan / GetFloatReport(typeOfReport, 0);
                        arr.push(abadan);
                    }
                    if (omidie > 0) {
                        omidie = omidie / GetFloatReport(typeOfReport, 1);
                        arr.push(omidie);
                    }
                    if (andimeshk > 0) {
                        andimeshk = andimeshk / GetFloatReport(typeOfReport, 2);
                        arr.push(andimeshk);
                    }
                    if (ahvaz > 0) {
                        ahvaz = ahvaz / GetFloatReport(typeOfReport, 3);
                        arr.push(ahvaz);
                    }
                    if (eze > 0) {
                        eze = eze / GetFloatReport(typeOfReport, 4);
                        arr.push(eze);
                    }
                    if (baghMalek > 0) {
                        baghMalek = baghMalek / GetFloatReport(typeOfReport, 5);
                        arr.push(baghMalek);
                    }
                    if (mahshahr > 0) {
                        mahshahr = mahshahr / GetFloatReport(typeOfReport, 6);
                        arr.push(mahshahr);
                    }
                    if (behbahan > 0) {
                        behbahan = behbahan / GetFloatReport(typeOfReport, 7);
                        arr.push(behbahan);
                    }
                    if (khoramshahr > 0) {
                        khoramshahr = khoramshahr / GetFloatReport(typeOfReport, 8);
                        arr.push(khoramshahr);
                    }
                    if (dezful > 0) {
                        dezful = dezful / GetFloatReport(typeOfReport, 9);
                        arr.push(dezful);
                    } 
                    if (dahsteAzadegan > 0) {
                        dahsteAzadegan = dahsteAzadegan / GetFloatReport(typeOfReport, 10);
                        arr.push(dahsteAzadegan);
                    }
                    if (ramshir > 0) {
                        ramshir = ramshir / GetFloatReport(typeOfReport, 11);
                        arr.push(ramshir);
                    }
                    if (ramhormoz > 0) {
                        ramhormoz = ramhormoz / GetFloatReport(typeOfReport, 12);
                        arr.push(ramhormoz);
                    }
                    if (shadegan > 0) {
                        shadegan = shadegan / GetFloatReport(typeOfReport, 13);
                        arr.push(shadegan);
                    }
                    if (shush > 0) {
                        shush = shush / GetFloatReport(typeOfReport, 14);
                        arr.push(shush);
                    }
                    if (shooshtar > 0) {
                        shooshtar = shooshtar / GetFloatReport(typeOfReport, 15);
                        arr.push(shooshtar);
                    }
                    if (gotvand > 0) {
                        gotvand = gotvand / GetFloatReport(typeOfReport, 16);
                        arr.push(gotvand);
                    }
                    if (lali > 0) {
                        lali = lali / GetFloatReport(typeOfReport, 17);
                        arr.push(lali);
                    }
                    if (masjedSoleiman > 0) {
                        masjedSoleiman = masjedSoleiman / GetFloatReport(typeOfReport, 18);
                        arr.push(masjedSoleiman);
                    }
                    if (hendijan > 0) {
                        hendijan = hendijan / GetFloatReport(typeOfReport, 19);
                        arr.push(hendijan);
                    }
                    if (andika > 0) {
                        andika = andika / GetFloatReport(typeOfReport, 20);
                        arr.push(andika);
                    }
                    if (hoveize > 0) {
                        hoveize = hoveize / GetFloatReport(typeOfReport, 21);
                        arr.push(hoveize);
                    }
                    if (haftkol > 0) {
                        haftkol = haftkol / GetFloatReport(typeOfReport, 22);
                        arr.push(haftkol);
                    }
                    if (bavi > 0) {
                        bavi = bavi / GetFloatReport(typeOfReport, 23);
                        arr.push(bavi);
                    }
                    if (karoun > 0) {
                        karoun = karoun / GetFloatReport(typeOfReport, 24);
                        arr.push(karoun);
                    }
                    if (hamidie > 0) {
                        hamidie = hamidie / GetFloatReport(typeOfReport, 25);
                        arr.push(hamidie);
                    }
                    if (aghajari > 0) {
                        aghajari = aghajari / GetFloatReport(typeOfReport, 26);
                        arr.push(aghajari);
                    }
                    if (karkhe > 0) {
                        karkhe = karkhe / GetFloatReport(typeOfReport, 27);
                        arr.push(karkhe);
                    }
                    if (dezpart > 0) {
                        dezpart = dezpart / GetFloatReport(typeOfReport, 28);
                        arr.push(dezpart);
                    }
                    let minArray = Math.min.apply(Math, arr);
                    let maxArray = Math.max.apply(Math, arr);
                    let midArray = maxArray / 2;
                    getColorForMap(abadan, "Abadan", minArray, maxArray, midArray);
                    getColorForMap(aghajari, "Aghajari", minArray, maxArray, midArray);
                    getColorForMap(ahvaz, "Ahvaz", minArray, maxArray, midArray);
                    getColorForMap(andika, "Andika", minArray, maxArray, midArray);
                    getColorForMap(andimeshk, "Andimeshk", minArray, maxArray, midArray);
                    getColorForMap(baghMalek, "BaghMalek", minArray, maxArray, midArray);
                    getColorForMap(bavi, "Bavi", minArray, maxArray, midArray);
                    getColorForMap(behbahan, "Behbahan", minArray, maxArray, midArray);
                    getColorForMap(dahsteAzadegan, "DahsteAzadegan", minArray, maxArray, midArray);
                    getColorForMap(dezful, "Dezful", minArray, maxArray, midArray);
                    getColorForMap(dezpart, "Dezpart", minArray, maxArray, midArray);
                    getColorForMap(eze, "Eze", minArray, maxArray, midArray);
                    getColorForMap(gotvand, "Gotvand", minArray, maxArray, midArray);
                    getColorForMap(haftkol, "Haftkol", minArray, maxArray, midArray);
                    getColorForMap(hamidie, "Hamidie", minArray, maxArray, midArray);
                    getColorForMap(hendijan, "Hendijan", minArray, maxArray, midArray);
                    getColorForMap(hoveize, "Hoveize", minArray, maxArray, midArray);
                    getColorForMap(karkhe, "Karkhe", minArray, maxArray, midArray);
                    getColorForMap(karoun, "Karoun", minArray, maxArray, midArray);
                    getColorForMap(khoramshahr, "Khoramshahr", minArray, maxArray, midArray);
                    getColorForMap(lali, "Lali", minArray, maxArray, midArray);
                    getColorForMap(mahshahr, "Mahshahr", minArray, maxArray, midArray);
                    getColorForMap(masjedSoleiman, "MasjedSoleiman", minArray, maxArray, midArray);
                    getColorForMap(omidie, "Omidie", minArray, maxArray, midArray);
                    getColorForMap(ramhormoz, "Ramhormoz", minArray, maxArray, midArray);
                    getColorForMap(ramshir, "Ramshir", minArray, maxArray, midArray);
                    getColorForMap(shadegan, "Shadegan", minArray, maxArray, midArray);
                    getColorForMap(shooshtar, "Shooshtar", minArray, maxArray, midArray);
                    getColorForMap(shush, "Shush", minArray, maxArray, midArray);
                    if (minArray >= 1 && maxArray >= 1) {
                        $('#divMinIndex').html(minArray);
                        $('#divMaxIndex').html(maxArray);
                    } else {
                        $('#divMinIndex').html(minArray.toFixed(8));
                        $('#divMaxIndex').html(maxArray.toFixed(8));
                    }
                }
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSearchLoading,#spinSearchPerfesionalLoading').hide();
            map.setView(new L.LatLng(30.551455, 49.187615), 4);
        },
        error: function (response) {if (response.status == 401) location.reload();},failure: function (response) {
            alert(response.d);
        }
    });
    return true;
}
function pageLoad() {
    $("#cmbTypeOfReport").select2({
        placeholder: {
            id: "-1",
            text: "انتخاب نوع گزارش"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbSelectMonth").select2({
        placeholder: {
            id: "-1",
            text: "ماه"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbFinalReason").select2({
        placeholder: {
            id: "-1",
            text: "همه"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbSeason").select2({
        placeholder: {
            id: "-1",
            text: "فصل"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbCollisionChild1").select2({
        placeholder: {
            id: "-1",
            text: "انواع تک وسیله ای"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbCollisionChild2").select2({
        placeholder: {
            id: "-1",
            text: "انواع دو وسیله ای"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbLightingStatus").select2({
        placeholder: {
            id: "-1",
            text: "وضعیت روشنایی"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbWeather").select2({
        placeholder: {
            id: "-1",
            text: "همه"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });

    $("#cmbCarriageWayDirection").select2({
        placeholder: {
            id: "-1",
            text: "سمت جهت راه"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbTypeOfWay").select2({
        placeholder: {
            id: "-1",
            text: "نوع راه"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbCarCrashLocation").select2({
        placeholder: {
            id: "-1",
            text: "موقعیت تصادف"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbLocationLandUse").select2({
        placeholder: {
            id: "-1",
            text: "کاربری محل"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbEventTime").select2({
        placeholder: {
            id: "-1",
            text: "انتخاب رویداد"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });

    $('#dateDateRange').MdPersianDateTimePicker({
        targetTextSelector: '#txtDateRange',
        dateFormat: 'yyyy-MM-dd',
        isGregorian: false,
        enableTimePicker: false,
        englishNumber: true,
        modalMode: true,
        //groupId: 'group1',
        rangeSelector: true
    }); 
    $("#lnkSafetyIndex").addClass("active");
}
function openDateRange() {
    var btn = document.getElementById("dateDateRange");
    btn.click(); event.preventDefault();
}
function GetFloatReport(report, index) {
    let hidPopulation = $("#hidPopulation").val().split(",");
    let hidAreaNumber = $("#hidAreaNumber").val().split(",");
    if (report === "1") return parseFloat(hidPopulation[index]);
    else if (report === "2") return parseFloat(hidAreaNumber[index]);
    else if (report === "3") return 1;
}
$(document).ready(function () {
    pageLoad();
    $("#divProFilter").on('click', function () {
        $('#divNormalFilter').hide("slow");
        $('#divPerfesionalFilter').show("slow");
    });
    $("#btnBackToNormalFilter").on('click', function () {
        $('#divNormalFilter').show("slow");
        $('#divPerfesionalFilter').hide("slow");
    });
    $('input[type=radio][name=rdoDate]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoDate]:checked').val();
        if (getVal == "Date") {
            $("#divShowDate").show('slow');
        } else {
            $("#divShowDate").hide('slow');
        }
    });
    $('input[type=radio][name=rdoStatus],input[type=radio][name=rdoIntensity],input[type=radio][name=rdoRoadway],input[type=radio][name=rdoFilLocationLandUse],input[type=radio][name=rdoFilVisualObstruction],input[type=radio][name=rdoFilRoadDefects],input[type=radio][name=rdoHoliday],input[type=radio][name=rdoTypeOfVehicle],input[type=radio][name=rdoDriverBlame],input[type=radio][name=rdoDangerousMaterials]').on('change', function () {
        Search();
    });
    $('input[type=radio][name=rdoCollision]').on('change', function () {
        var getCollision = $('input[type=radio][name=rdoCollision]:checked').val();
        if (getCollision == "تک وسیله ای") $("#divCollisionChild1").show("slow");
        else $("#divCollisionChild1").hide("slow");
        if (getCollision == "دو وسیله ای") $("#divCollisionChild2").show("slow");
        else $("#divCollisionChild2").hide("slow");
        Search();
    });
    $('input[type=radio][name=rdoDate]').on('change', function () {
        var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
        if (getDateOfAccident !== "Date") {
            Search();
        }
    });
    $("#cmbTypeOfReport").on('change', function () {
        let getText = "تصادف بر نفر";
        
        let getTypeOfReport = $('#cmbTypeOfReport').val();
        if (getTypeOfReport !== "" && getTypeOfReport !== null && getTypeOfReport !== "-1") {
            if (getTypeOfReport === "1") getText = "تصادف بر نفر";
            else if (getTypeOfReport === "2") getText = "تصادف بر کیلومتر مربع";
            else if (getTypeOfReport === "3") getText = "تصادف";
            Search();
        }
        $('#spnTitleOfTypeReport').html(getText);
    });
    $('#txtDateRange').on('change', function () {
        var getDateOfAccident = $('#txtDateRange').val();
        if (getDateOfAccident !== "") {
            Search();
        }
    });
    $("#cmbWeather").on('change', function () {
        var getWeather = $('#cmbWeather').val();
        if (getWeather !== "" && getWeather !== null) {
            Search();
        }
    });
    $("#cmbFinalReason").on('change', function () {
        var getFinalReason = $('#cmbFinalReason').val();
        if (getFinalReason !== "" && getFinalReason !== null) {
            Search();
        }
    });
    $("#cmbCollisionChild1").on('change', function () {
        var getVal = $('#cmbCollisionChild1').val();
        if (getVal !== "" && getVal !== null) {
            Search();
        }
    });
    $("#cmbCollisionChild2").on('change', function () {
        var getVal = $('#cmbCollisionChild2').val();
        if (getVal !== "" && getVal !== null) {
            Search();
        }
    });
    $('#divZoomIn').click(function () {
        map.setZoom(map.getZoom() + 1);
    });
    $('#divZoomOut').click(function () {
        map.setZoom(map.getZoom() - 1);
    });
    $('#divMyLocatoin').click(function () {
        map.locate({ setView: true, watch: true, maxZoom: 12 });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latit = position.coords.latitude;
                var longit = position.coords.longitude;
                // this is just a marker placed in that position
                var abc = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
                // move the map to have the location in its center
                map.panTo(new L.LatLng(latit, longit));
            });
        }
        map.setView(lat, lng, zoom);
    });
    $('#divCompass').click(function () {
        $('.map-left-panel').css("-webkit-transform", "rotate(180deg)");
        $('.map-left-panel').css("-moz-transform", "rotate(180deg)");
        $('.map-left-panel').css("-o-transform", "rotate(180deg)");
        $('.map-left-panel').css("-ms-transform", "rotate(180deg)");
        $('.map-left-panel').css("transform", "rotate(180deg)");
        $('.map-left-panel').css("-webkit-transition", "all 0.4s ease");
        $('.map-left-panel').css("-moz-transition", "all 0.4s ease");
        $('.map-left-panel').css("-o-transition", "all 0.4s ease");
        $('.map-left-panel').css("transition", "all 0.4s ease");
    });
    $('.hide-left-panel').click(function () {
        if ($('.dashboard-left').width() > '40') {
            $('.dashboard-left').css('width', '40px');
            $('.hide-left-panel').html("<i class='fa fa-angle-double-left fa-2x'></i>");
            $('.map-detail-caption').hide();
            $('.map-detail-left-arr').hide();
            $('.map-plus,.map-minus').css('margin-left', '0');
            $('#divMyLocatoin,#divCompass').css('margin-right', '0');
            $('.map-detail-icon').css('margin-right', '5px');
            $('.line-border').css('width', '25px');
            $('.in-map-boxed-color').css('width', '32px');
            $('.in-map-boxed-color').css('font-size', '7.5px');
            $('#divAccidentPower').css('margin-right', '0');
            $('#arrow-precent').hide();
            $('.dashboard-left').css('left', '0');
            $('.leaflet-control-scale').hide();
            $('#divAccidentPower > .wordwrap').css('font-size', '9px');
        } else {
            $('.dashboard-left').css('width', '');
            $('.hide-left-panel').html("<i class='fa fa-angle-double-right fa-2x'></i>");
            $('.map-detail-caption').show();
            $('.map-detail-left-arr').show();
            $('.map-plus,.map-minus').css('margin-left', '');
            $('#divMyLocatoin,#divCompass').css('margin-right', '');
            $('.map-detail-icon').css('margin-right', '');
            $('.line-border').css('width', '');
            $('.in-map-boxed-color').css('width', '50px');
            $('.in-map-boxed-color').css('font-size', '10px');
            $('#divAccidentPower').css('margin-right', '10px');
            $('#arrow-precent').show();
            $('.dashboard-left').css('left', '0');
            $('.leaflet-control-scale').show();
            $('#divAccidentPower > .wordwrap').css('font-size', 'inherit');
        }
    });
    //$(".filter").on('click', function () {
    //    $("#divNormalFilter").show();
    //    $(".filter").addClass("active");
    //});
    //$(".tools").on('click', function () {
    //    $("#divNormalFilter,#divPerfesionalFilter").hide();
    //    $("#divTools").show();
    //    $(".tools").addClass("active");
    //    $(".filter").removeClass("active");
    //});
});
function getColorForMap(num, city, minArray, maxArray, midArray) {
    let getColor;
    let fillOpacity = 0.1;;
    if (num === 0) {
        getColor = "#8EBF93";
        fillOpacity = 0.1;
    }
    else if (num <= minArray) {
        getColor = "#F59D2D";
        fillOpacity = 0.2;
    }
    else if (num > minArray && num <= midArray) {
        getColor = "#FFCC00";
        fillOpacity = 0.3;
    }
    else if (num > midArray && num < maxArray) {
        getColor = "#F08976";
        fillOpacity = 0.4;
    }
    else if (num === maxArray) {
        getColor = "#D0243D";
        fillOpacity = 0.5;
    }
    else getColor = "#8EBF93";
    $.getJSON("/Geo/Khozestan/" + city +".txt", function (data) {
        let dataLayer = L.geoJson(data, { style: polyStyle(getColor, getColor, fillOpacity) }, {
            onEachFeature: function (feature, featureLayer) {
                featureLayer.bindPopup(feature.properties.NAME_1);
            }
        }).addTo(map);
        //map.fitBounds(dataLayer.getBounds());
    });
}
