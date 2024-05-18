var osmUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNoa2Fuc2F0YXJwb3VyIiwiYSI6ImNrdmp1bXlhaTA1aXkydW81eWF5bmwyejQifQ.j6er3HdjHOguoXgO4KbZ0w',
                    osmAttrib = '',
                    osm = L.tileLayer(osmUrl, {
                        maxZoom: 22,
                        maxNativeZoom: 19, attribution: osmAttrib
                    }),
                    map = new L.Map('map', {
                        rotate: true, touchRotate: true, center: new L.LatLng(35.715298, 51.404343), zoom: 5,
                        zoomControl: true
                    }),
                    drawnItems = L.featureGroup().addTo(map);
osm.addTo(map);
$.getJSON("/Geo/Iran.txt", function (data) {
    // add GeoJSON layer to the map once the file is loaded
    var datalayer = L.geoJson(data, { style: polystyle('#8EBF93') }, {
        onEachFeature: function (feature, featureLayer) {
            featureLayer.bindPopup(feature.properties.NAME_1);
        }
    }).addTo(map);
    map.fitBounds(datalayer.getBounds());
});
$('.leaflet-control-attribution').hide();

function polystyle(color) {
    return {
        fillColor: '#fff',
        weight: 2,
        opacity: 1,
        color: color,  //Outline color
        fillOpacity: 0
    };
}
function arrayMax(array) {
    return array.reduce((a, b) => Math.max(a, b));
}

function arrayMin(array) {
    return array.reduce((a, b) => Math.min(a, b));
}
function getRadius(val,arr) {
    const max = 42;
    const min = 10.5;
    let getMaxValue = arrayMax(arr);
    let getMinValue = arrayMin(arr);
    if (val >= getMaxValue) return max;
    if (val <= getMinValue) return min;
    let diffMinMax = getMaxValue - getMinValue;
    //let firstFace = val / diffMinMax;
    let secondFace = (max * max) - (min * min);
    let firstResult = (val * secondFace) / diffMinMax;
    let radius = Math.sqrt(firstResult);
    return radius.toFixed(2);
}
function AddPiechartMarker1(color1, val1, latLng, arr) {
    let centerLocation1 = parseFloat(latLng.split(",")[0]);
    let centerLocation2 = parseFloat(latLng.split(",")[1]);
    let rad = getRadius(parseFloat(val1), arr);
    L.piechartMarker(
        L.latLng([centerLocation1, centerLocation2]),
        {
            radius: rad,
            data: [
                { name: '1', value: parseFloat(val1), style: { fillStyle: color1, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
            ]
        }
    ).addTo(map);
}
function AddPiechartMarker2(color1, color2, val1, val2, latLng, arr) {
    let centerLocation1 = parseFloat(latLng.split(",")[0]);
    let centerLocation2 = parseFloat(latLng.split(",")[1]);
    let rad = getRadius(parseFloat(val1) + parseFloat(val2), arr);
    L.piechartMarker(
        L.latLng([centerLocation1, centerLocation2]),
        {
            radius: rad,
            data: [
                { name: '1', value: parseInt(val1), style: { fillStyle: color1, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '2', value: parseInt(val2), style: { fillStyle: color2, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } }
            ]
        }
    ).addTo(map);
}
function AddPiechartMarker3(color1, color2, color3, val1, val2, val3, latLng, arr) {
    let centerLocation1 = parseFloat(latLng.split(",")[0]);
    let centerLocation2 = parseFloat(latLng.split(",")[1]);
    let rad = getRadius(parseFloat(val1) + parseFloat(val2) + parseFloat(val3), arr);
    L.piechartMarker(
        L.latLng([centerLocation1, centerLocation2]),
        {
            radius: rad,
            data: [
                { name: '1', value: parseInt(val1), style: { fillStyle: color1, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '2', value: parseInt(val2), style: { fillStyle: color2, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '3', value: parseInt(val3), style: { fillStyle: color3, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } }
            ]
        }
    ).addTo(map);
}
function AddPiechartMarker4(color1, color2, color3, color4, val1, val2, val3, val4, latLng, arr) {
    let centerLocation1 = parseFloat(latLng.split(",")[0]);
    let centerLocation2 = parseFloat(latLng.split(",")[1]);
    let rad = getRadius(parseFloat(val1) + parseFloat(val2) + parseFloat(val3) + parseFloat(val4), arr);
    L.piechartMarker(
        L.latLng([centerLocation1, centerLocation2]),
        {
            radius: rad,
            data: [
                { name: '1', value: parseInt(val1), style: { fillStyle: color1, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '2', value: parseInt(val2), style: { fillStyle: color2, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '3', value: parseInt(val3), style: { fillStyle: color3, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '4', value: parseInt(val4), style: { fillStyle: color4, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } }
            ]
        }
    ).addTo(map);
}
function AddPiechartMarker5(color1, color2, color3, color4, color5, val1, val2, val3, val4, val5, latLng, arr) {
    let centerLocation1 = parseFloat(latLng.split(",")[0]);
    let centerLocation2 = parseFloat(latLng.split(",")[1]);
    let rad = getRadius(parseFloat(val1) + parseFloat(val2) + parseFloat(val3) + parseFloat(val4) + parseFloat(val5), arr);
    L.piechartMarker(
        L.latLng([centerLocation1, centerLocation2]),
        {
            radius: rad,
            data: [
                { name: '1', value: parseInt(val1), style: { fillStyle: color1, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '2', value: parseInt(val2), style: { fillStyle: color2, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '3', value: parseInt(val3), style: { fillStyle: color3, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '4', value: parseInt(val4), style: { fillStyle: color4, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '5', value: parseInt(val5), style: { fillStyle: color5, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } }
            ]
        }
    ).addTo(map);
}
function AddPiechartMarker6(color1, color2, color3, color4, color5, color6, val1, val2, val3, val4, val5, val6, latLng, arr) {
    let centerLocation1 = parseFloat(latLng.split(",")[0]);
    let centerLocation2 = parseFloat(latLng.split(",")[1]);
    let rad = getRadius(parseFloat(val1) + parseFloat(val2) + parseFloat(val3) + parseFloat(val4) + parseFloat(val5) + parseFloat(val6), arr);
    L.piechartMarker(
        L.latLng([centerLocation1, centerLocation2]),
        {
            radius: rad,
            data: [
                { name: '1', value: parseInt(val1), style: { fillStyle: color1, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '2', value: parseInt(val2), style: { fillStyle: color2, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '3', value: parseInt(val3), style: { fillStyle: color3, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '4', value: parseInt(val4), style: { fillStyle: color4, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '5', value: parseInt(val5), style: { fillStyle: color5, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '6', value: parseInt(val6), style: { fillStyle: color6, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } }
            ]
        }
    ).addTo(map);
}
function AddPiechartMarker7(color1, color2, color3, color4, color5, color6, color7, val1, val2, val3, val4, val5, val6, val7, latLng, arr) {
    let centerLocation1 = parseFloat(latLng.split(",")[0]);
    let centerLocation2 = parseFloat(latLng.split(",")[1]);
    let rad = getRadius(parseFloat(val1) + parseFloat(val2) + parseFloat(val3) + parseFloat(val4) + parseFloat(val5) + parseFloat(val6) + parseFloat(val7), arr);
    L.piechartMarker(
        L.latLng([centerLocation1, centerLocation2]),
        {
            radius: rad,
            data: [
                { name: '1', value: parseInt(val1), style: { fillStyle: color1, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '2', value: parseInt(val2), style: { fillStyle: color2, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '3', value: parseInt(val3), style: { fillStyle: color3, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '4', value: parseInt(val4), style: { fillStyle: color4, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '5', value: parseInt(val5), style: { fillStyle: color5, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '6', value: parseInt(val6), style: { fillStyle: color6, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } },
                { name: '7', value: parseInt(val7), style: { fillStyle: color7, strokeStyle: 'rgba(0,0,0,.95)', lineWidth: 0.2 } }
            ]
        }
    ).addTo(map);
}
$('input[type=radio][name=rdoAccident]').on('change', function () {
    var idVal = $(this).attr("id");
    var getVal = $(this).val();
    $("#spnChartTitleCompTitle").html($("label[for='" + idVal + "']").text());
    $("#divChartLocComp").hide('slow');
    $(".getByClass").removeClass("hide");
    $(".getByClass").addClass("hide");
    $("#spnChartTitleFirst").html($("#spnChartTitleCompTitle").html());
    $("#spnSortTitle").html("کل تصادفات");
    
    //$("#spnChartTitleSecond").html("("+"مرتب سازی بر اساس " + $("#rdo").html()+")");
    if (getVal == "AccidentStatistics") {
        $('#rdoFilAccidentStatisticsWithAll').prop("checked", true);
        LoadInput3(getVal, '#CB644E', '#F59D2D', '#FFD461', 'فوتی', 'جرحی', 'خسارتی');
        $("#divAccidentStatistics").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoFilAccidentStatistics]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoFilAccidentStatisticsWithAll').trigger("change");
    }
    else if (getVal == "AccidentDeceased") {
        LoadInput1(getVal,null, '#CB644E', 'نرخ متوفیان تصادف');
    }
    else if (getVal == "TypeRoad") {
        $('#rdoFilTypeRoadWithAll').prop("checked", true);
        LoadInput3(getVal, '#4A8987', '#CB644E', '#87DCDC', 'روستایی', 'فرعی', 'اصلی');
        $("#divTypeRoad").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoFilTypeRoad]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoFilTypeRoadWithAll').trigger("change");
    }
    else if (getVal == "LocationLandUse") {
        $('#rdoFilLocationLandUseWithAll').prop("checked", true);
        LoadInput2(getVal, '#FFD461', '#7E2028', 'مسکونی', 'غیرمسکونی');
        $("#divLocationLandUse").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoFilLocationLandUse]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoFilLocationLandUseWithAll').trigger("change");
    }
    else if (getVal == "VisualObstruction") {
        $('#rdoFilVisualObstructionWithAll').prop("checked", true);
        LoadInput2(getVal, '#CB644E', '#4A8987', 'دارد', 'ندارد');
        $("#divVisualObstruction").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoFilVisualObstruction]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoFilVisualObstructionWithAll').trigger("change");
    }
    else if (getVal == "RoadDefects") {
        $('#rdoFilRoadDefectsWithAll').prop("checked", true);
        LoadInput2(getVal, '#CB644E', '#4A8987', 'دارد', 'ندارد');
        $("#divRoadDefects").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoFilRoadDefects]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoFilRoadDefectsWithAll').trigger("change");
    }
    else if (getVal == "TypeOfCollision") {
        $('#rdoCollisionWithAll').prop("checked", true);
        LoadInput6(getVal, '#F59D2D', '#CB644E', '#FFD461', '#4A8987', '#7E2028', '#5693BA', 'سایر', 'برخورد چند وسیله', 'برخورد وسیله نقلیه با موتورسیکلت', 'تصادف تک وسیله ای', 'برخورد وسیله نقلیه با وسیله نقلیه', 'برخورد وسیله نقلیه با عابر');
        $("#divCollision").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoCollision]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoCollisionWithAll').trigger("change");
    }
    else if (getVal == "SingleVehicle") {
        $('#rdoCrashWithAll').prop("checked", true);
        LoadInput3(getVal, '#87DCDC', '#4A8987', '#FFD461', 'خروج از جاده', 'واژگونی و سقوط', 'برخورد با شی ثابت');
        $("#divCollisionSingleVehicle").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoCollSingleVehicle]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoCrashWithAll').trigger("change");
    }
    else if (getVal == "TwoVehicle") {
        $('#rdoTwoVehicleAll').prop("checked", true);
        LoadInput5(getVal, '#7E2028', '#FFD461', '#F08976', '#87DCDC', '#4A8987', 'جلو به عقب', 'برخورد زاویه‌ای', 'برخورد رخ به رخ', 'پهلو به پهلو هم جهت', 'پهلو به پهلو غیر هم جهت');
        $("#divCollisionTwoVehicle").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoCollTwoVehicle]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoTwoVehicleAll').trigger("change");
    }
    else if (getVal == "Weather") {
        $('#rdoWeatherAll').prop("checked", true);
        LoadInput7(getVal, '#0F527D', '#87DCDC', '#F59D2D', '#7E2028', '#FFD461', '#4A8987', '#8EBF93', 'بارانی', 'صاف', 'غبار آلود', 'طوفانی', 'مه آلود', 'برفی', 'ابری');
        $("#divWeather").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoWeather]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoWeatherAll').trigger("change");
    }
    else if (getVal == "TransferMethod") {
        $('#rdoTransferMethodAll').prop("checked", true);
        LoadInput5(getVal, '#87DCDC', '#F59D2D', '#4A8987', '#FFD461', '#CB644E', 'آمبولانس', 'خودرو عبوری', 'چرخبال', 'پلیس', 'سایر');
        $("#divTransferMethod").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoTransferMethod]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoTransferMethodAll').trigger("change");
    }
    else if (getVal == "CodeCausing") {
        $('#rdoCodeCausingAll').prop("checked", true);
        LoadInput6(getVal, '#7E2028', '#4A8987', '#F59D2D', '#FFD461', '#F08976', '#87DCDC', 'تجاوز از سرعت بیش از 30 تا 50 کیلومتر در ساعت', 'تجاوز از سرعت بیش از 50 کیلومتر در ساعت', 'رانندگی در حالت مستی، مصرف مخدر و...', 'سبقت غیر مجاز در راه های دو طرفه', 'عبور از چراغ قرمز', 'سایر');
        $("#divCodeCausingAccident").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoCodeCausingAccident]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoCodeCausingAll').trigger("change");
    }
    else if (getVal == "LoadType") {
        $('#rdoLoadTypeAll').prop("checked", true);
        LoadInput3(getVal, '#7E2028', '#F08976', '#4A8987', 'خطرناک', 'سوختنی', 'سایر');
        $("#divLoadType").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoLoadType]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoLoadTypeAll').trigger("change");
    }
    else if (getVal == "Car" || getVal == "Motorcycle" || getVal == "Pedestrian" || getVal == "NavyBar" || getVal == "NavyPassenger") {
        $('#rdoExistsNotExistsAll').prop("checked", true);
        LoadInput2(getVal, '#4A8987', '#CB644E', 'وجود دارد', 'وجود ندارد');
        $("#divExistsNotExists").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoExistsNotExists]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoExistsNotExistsAll').trigger("change");
    }
    else if (getVal == "Culprit") {
        $('#rdoNativeNonNativeAll').prop("checked", true);
        LoadInput2(getVal, '#4A8987', '#F08976', 'بومی', 'غیر بومی');
        $("#divNativeNonNative").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoIsLocal]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoNativeNonNativeAll').trigger("change");
    }
    else if (getVal == "PedestrianAge") {
        $('#rdoAgePedestrianAll').prop("checked", true);
        LoadInput5(getVal, '#F59D2D', '#4A8987', '#87DCDC', '#FFD461', '#7E2028', 'از 0 تا 6 سال', 'از 6 تا 12', 'از 12 تا 18', 'از 18 تا 60', 'بالاتر از 60');
        $("#divPedestrianAge").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoAgePedestrian]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoAgePedestrianAll').trigger("change");
    }
    else if (getVal == "MotorAge") {
        $('#rdoMotorAgeAll').prop("checked", true);
        LoadInput4(getVal, '#F59D2D', '#4A8987', '#87DCDC', '#FFD461', 'کمتر از 18', 'از 18 تا 30', 'از 30 تا 60', 'بالاتر از 60');
        $("#divMotorAge").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoMotorAge]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoMotorAgeAll').trigger("change");
    }
    else if (getVal == "SafetyBelt") {
        $('#rdoSafetyBeltAll').prop("checked", true);
        LoadInput2(getVal, '#4A8987', '#7E2028', 'استفاده از کمربند', 'عدم استفاده از کمربند');
        $("#divSafetyBelt").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoSafetyBelt]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoSafetyBeltAll').trigger("change");
    }
    else if (getVal == "Helmet") {
        $('#rdoHelmetAll').prop("checked", true);
        LoadInput2(getVal, '#4A8987', '#7E2028', 'استفاده از کلاه ایمنی', 'عدم استفاده از کلاه ایمنی');
        $("#divHelmet").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoHelmet]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoHelmetAll').trigger("change");
    }
    else if (getVal == "LightingStatus") {
        $('#rdoStatusLightAll').prop("checked", true);
        LoadInput5(getVal, '#F59D2D', '#4A8987', '#87DCDC', '#FFD461', '#7E2028', 'روز', 'طلوع', 'غروب', 'شب با روشنایی کافی', 'شب بدون روشنایی کافی');
        $("#divLightingStatus").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoLightingStatus]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoStatusLightAll').trigger("change");
    }
    else if (getVal == "Holidays") {
        $('#rdoHolidaysAll').prop("checked", true);
        LoadInput2(getVal, '#4A8987', '#7E2028', 'تعطیل', 'غیر تعطیل');
        $("#divHolidays").removeClass("hide");
        let geRadio = $('input[type=radio][name=rdoGetHoliday]:checked');
        let getRadioVal = geRadio.val();
        if (getRadioVal == "All") $('#rdoHolidaysAll').trigger("change");
    }
});

function toDegreesMinutesAndSeconds(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);
    return degrees + ":" + minutes + ":" + seconds;
}

function convertDMS(lat, lng) {
    var latitude = toDegreesMinutesAndSeconds(lat);
    var latitudeCardinal = lat >= 0 ? ":N" : ":S";
    var longitude = toDegreesMinutesAndSeconds(lng);
    var longitudeCardinal = lng >= 0 ? ":E" : ":W";
    return latitude + latitudeCardinal + "\n" + longitude + longitudeCardinal;
}
function ParseDMS(input) {
    var parts = input.split(':');
    var lat = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
    //var lng = ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
    return lat;
}
function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var deg = (Number(degrees) + Number(minutes) / 60 + Number(seconds) / 3600).toFixed(6);
    if (direction == "S" || direction == "W") {
        deg = deg * -1;
    } // Don't do anything for N or E
    return deg;
}
function inRange(value, a, b) {
    return value >= a && value <= b;
}
function LoadHideInput(getType) {
    //$("#divAutoGenerateChart").html("");
    //$("#divAutoGenerateChartTitle").html("");
    if ($(".leaflet-marker-pane").children().length > 0) $(".leaflet-marker-pane").html("");
    //var getId = id == "" ? $("#txtIdSearch").val() : id;
    getType = getType == "" ? $('input[type=radio][name=rdoAccident]:checked').val() : getType;
    var provinceId = $('input[type=radio][name=rdoDate]:checked').val();
    if (provinceId === "Date") {
        provinceId = $("#txtDateRange").val().trim();
    }
    var getCrashType = $('input[type=radio][name=rdoIntensity]:checked').val();
    var getDays = $('input[type=radio][name=rdoDays]:checked').val();
    var getInNativeArea = $('#cmbInNativeArea').val();
    var getIsHoliday = $('input[type=radio][name=rdoHoliday]:checked').val();
    let chkIsNotLocalDriver = $('#chkIsNotLocalDriver').prop('checked');
    var obj = {
        "type": getType == undefined ? "" : getType,
        "status": "",
        "dateOfAccident": provinceId == undefined ? "" : provinceId,
        "crashType": getCrashType == undefined ? "" : getCrashType,
        "provinceId": $("#cmbProvinceSearch").val() === "-1" ? "" : $("#cmbProvinceSearch").val(),
        "getDays": getDays == undefined ? "All" : getDays,
        "month": $("#cmbMonth").val() === "-1" ? "" : $("#cmbMonth").val(),
        "collisionOfA": $("#cmbCollisionOfATwo").val() === "-1" ? "" : $("#cmbCollisionOfATwo").val(),
        "lightingStatus": $("#cmbLightingStatus").val() === "-1" ? "" : $("#cmbLightingStatus").val(),
        "weather": $("#cmbWeather").val() === "-1" ? "" : $("#cmbWeather").val(),
        "carriageWayDirection": $("#cmbCarriageWayDirection").val() === "-1" ? "" : $("#cmbCarriageWayDirection").val(),
        "typeOfWay": $("#cmbTypeOfWay").val() === "-1" ? "" : $("#cmbTypeOfWay").val(),
        "carCrashLocation": $("#cmbCarCrashLocation").val() === "-1" ? "" : $("#cmbCarCrashLocation").val(),
        "locationLandUse": $("#cmbLocationLandUse").val() === "-1" ? "" : $("#cmbLocationLandUse").val(),
        "fromAgeDriver": $("#txtFromAge").val().replaceAll("از سن : ", ""),
        "toAgeDriver": $("#txtToAge").val().replaceAll("تا سن : ", ""),
        "cityId": $("#cmbCity").val() === "-1" ? "" : $("#cmbCity").val(),
        "inNativeArea": getInNativeArea === "-1" || getInNativeArea === "-2" ? "" : getInNativeArea,
        "isHoliday": getIsHoliday == undefined || getIsHoliday == "All" ? "" : getIsHoliday,
        "collisionChild1": $('#cmbCollisionOfATwo').val() !== "تک وسیله ای" || $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
        "collisionChild2": $('#cmbCollisionOfATwo').val() !== "دو وسیله ای" || $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
        "axisId": $("#cmbAxis").val() === "-1" ? "" : $("#cmbAxis").val(),
        "isNotLocalDriver": chkIsNotLocalDriver
    }
    $('#spinSearchLoading').show();
    return $.ajax({
        type: "POST",
        url: "LocationComparison.aspx/GetSearchLocationComparison",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false
    });
}
var loadInput1Array = [], loadInput2Array = [], loadInput3Array = [], loadInput4Array = [], loadInput5Array = [], loadInput6Array = [], loadInput7Array = [], loadInput1ArrayCityName = [], loadInputSumArray = [];
function LoadInput1(type, childRadio, color, cap) {
    loadInput1Array = [], loadInput1ArrayCityName = [];
    LoadHideInput(type).done(function (data) {
        if (data != null) {
            if (data.d[0].CenterLocation == "false" && data.d[0].CityName != null) {
                $("#lblMessage").html(CreateModal(data.d[0].CityName));
                $('#MessageModal').modal();
            } else {
                if (data.d.length == 1 && data.d[0].CityName != null) {
                    let cityName = data.d[0].CityName;
                    let centerLocation = data.d[0].CenterLocation;
                    let firstCap = data.d[0].FirstCap;
                    if (childRadio === "FirstCap") firstCap = data.d[0].FirstCap;
                    else if (childRadio === "SecondCap") firstCap = data.d[0].SecondCap;
                    else if (childRadio === "ThirdCap") firstCap = data.d[0].ThirdCap;
                    else if (childRadio === "FourthCap") firstCap = data.d[0].FourthCap;
                    else if (childRadio === "FifthCap") firstCap = data.d[0].FifthCap;
                    else if (childRadio === "SixthCap") firstCap = data.d[0].SixthCap;
                    else if (childRadio == "SeventhCap") firstCap = data.d[0].SeventhCap;
                    if (firstCap != "0") {
                        let castFloat = parseFloat(firstCap);
                        //let isFloatNum = castFloat < 1 && castFloat > 0 ? parseFloat(castFloat.toFixed(3)) : castFloat;
                        loadInput1Array.push(castFloat);
                        loadInput1ArrayCityName.push(cityName);
                        AddPiechartMarker1(color, firstCap, centerLocation, loadInput1Array);
                    }
                }
                else if (data.d.length > 1) {
                    for (i = 0; i < data.d.length; i++) {
                        let cityName = data.d[i].CityName;
                        let centerLocation = data.d[i].CenterLocation;
                        let firstCap = data.d[i].FirstCap;
                        if (childRadio === "FirstCap") firstCap = data.d[i].FirstCap;
                        else if (childRadio === "SecondCap") firstCap = data.d[i].SecondCap;
                        else if (childRadio === "ThirdCap") firstCap = data.d[i].ThirdCap;
                        else if (childRadio === "FourthCap") firstCap = data.d[i].FourthCap;
                        else if (childRadio === "FifthCap") firstCap = data.d[i].FifthCap;
                        else if (childRadio === "SixthCap") firstCap = data.d[i].SixthCap;
                        else if (childRadio == "SeventhCap") firstCap = data.d[i].SeventhCap;
                        if (firstCap != "0") {
                            let castFloat = parseFloat(firstCap);
                            //let isFloatNum = castFloat < 1 && castFloat > 0 ? parseFloat(castFloat.toFixed(3)) : castFloat;
                            //loadInput1Array.push({ 'val': isFloatNum, 'name': cityName });
                            loadInput1Array.push(castFloat);
                            loadInput1ArrayCityName.push(cityName);
                            AddPiechartMarker1(color, firstCap, centerLocation, loadInput1Array);
                        }
                    }
                }
                loadInput1Array.sort(function (a, b) {
                    return ((a.val < b.val) ? 1 : ((a.val == b.val) ? 0 : -1));
                });
                HighchartWith1(color, loadInput1Array, loadInput1ArrayCityName);
            }
            let contHtml = "<span class='chart-container-footer-color' style='background-color:" + color + "'></span>&nbsp;<span style='vertical-align: super'>" + cap + "</span><br><span class='chart-container-footer-border'>/</span>&nbsp;<span style='vertical-align: super'>مرز محدوده</span>";
            $("#chart-container-footer").html(contHtml);
            $("#chart-container-footer").show();
            $('#spinSearchLoading').hide();
        }
        else {
            alert("خطا در برقراری ارتباط با سرور!");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(textStatus);
    });
}
function LoadInput2(type, color1, color2, cap1, cap2) {
    loadInput1Array = [], loadInput1ArrayCityName = [], loadInput2Array = [], loadInputSumArray = [];
    LoadHideInput(type).done(function (data) {
        if (data != null) {
            if (data.d[0].CenterLocation == "false" && data.d[0].CityName != null) {
                $("#lblMessage").html(CreateModal(data.d[0].CityName));
                $('#MessageModal').modal();
            } else {
                if (data.d.length == 1 && data.d[0].CityName != null) {
                    let cityName = data.d[0].CityName;
                    let centerLocation = data.d[0].CenterLocation;
                    let firstCap = data.d[0].FirstCap;
                    let secondCap = data.d[0].SecondCap;
                    let f1 = parseFloat(firstCap);
                    let f2 = parseFloat(secondCap);
                    loadInput1Array.push(f1);
                    loadInput2Array.push(f2);
                    loadInput1ArrayCityName.push(cityName);
                    let sum = f1 + f2;
                    loadInputSumArray.push(sum);
                    AddPiechartMarker2(color1, color2, firstCap, secondCap, centerLocation, loadInputSumArray);
                }
                else if (data.d.length > 1) {
                    for (i = 0; i < data.d.length; i++) {
                        let centerLocation = data.d[i].CenterLocation;
                        let cityName = data.d[i].CityName;
                        let firstCap = data.d[i].FirstCap;
                        let secondCap = data.d[i].SecondCap;
                        if (firstCap != "0" || secondCap != "0") {
                            let f1 = parseFloat(firstCap);
                            let f2 = parseFloat(secondCap);
                            loadInput1Array.push(f1);
                            loadInput2Array.push(f2);
                            loadInput1ArrayCityName.push(cityName);
                            let sum = f1 + f2;
                            loadInputSumArray.push(sum);
                            AddPiechartMarker2(color1, color2, firstCap, secondCap, centerLocation, loadInputSumArray);
                        }
                    }
                }
                HighchartWith2(color1, color2, loadInput1Array, loadInput2Array, cap1, cap2, loadInput1ArrayCityName);
            }
            var contHtml = "<div class='row'><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color1 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap1 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color2 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap2 + "</span></div><div class='col-4'><span class='chart-container-footer-border'>/</span>&nbsp;<span style='vertical-align: super'>مرز محدوده</span></div></div>";
            $("#chart-container-footer").html(contHtml);
            $("#chart-container-footer").show();
            $('#spinSearchLoading').hide();
        }
        else {
            alert("خطا در برقراری ارتباط با سرور!");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(textStatus);
    });
}
function LoadInput3(type, color1, color2, color3, cap1, cap2, cap3) {
    loadInput1Array = [], loadInput1ArrayCityName = [], loadInput2Array = [], loadInput3Array = [], loadInputSumArray = [];
    LoadHideInput(type).done(function (data) {
        if (data != null) {
            if (data.d[0].CenterLocation == "false" && data.d[0].CityName != null) {
                $("#lblMessage").html(CreateModal(data.d[0].CityName));
                $('#MessageModal').modal();
            } else {
                if (data.d.length == 1 && data.d[0].CityName != null) {
                    let cityName = data.d[0].CityName;
                    let centerLocation = data.d[0].CenterLocation;
                    let firstCap = data.d[0].FirstCap;
                    let secondCap = data.d[0].SecondCap;
                    let thirdCap = data.d[0].ThirdCap;
                    let f1 = parseFloat(firstCap);
                    let f2 = parseFloat(secondCap);
                    let f3 = parseFloat(thirdCap);
                    loadInput1Array.push(f1);
                    loadInput2Array.push(f2);
                    loadInput3Array.push(f3);
                    loadInput1ArrayCityName.push(cityName);
                    let sum = f1 + f2 + f3;
                    loadInputSumArray.push(sum);
                    AddPiechartMarker3(color1, color2, color3, firstCap, secondCap, thirdCap, centerLocation, loadInputSumArray);
                }
                else if (data.d.length > 1) {
                    for (i = 0; i < data.d.length; i++) {
                        let centerLocation = data.d[i].CenterLocation;
                        let cityName = data.d[i].CityName;
                        let firstCap = data.d[i].FirstCap;
                        let secondCap = data.d[i].SecondCap;
                        let thirdCap = data.d[i].ThirdCap;
                        //if (cityName == "اهواز")
                        if (firstCap != "0" || secondCap != "0" || thirdCap != "0") {
                            let f1 = parseFloat(firstCap);
                            let f2 = parseFloat(secondCap);
                            let f3 = parseFloat(thirdCap);
                            loadInput1Array.push(f1);
                            loadInput2Array.push(f2);
                            loadInput3Array.push(f3);
                            loadInput1ArrayCityName.push(cityName);
                            let sum = f1 + f2 + f3;
                            loadInputSumArray.push(sum);
                            AddPiechartMarker3(color1, color2, color3, firstCap, secondCap, thirdCap, centerLocation, loadInputSumArray);
                        }
                    }
                }
                HighchartWith3(color1, color2, color3, loadInput1Array, loadInput2Array, loadInput3Array, cap1, cap2, cap3, loadInput1ArrayCityName);
            }
            var contHtml = "<div class='row'><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color1 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap1 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color2 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap2 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color3 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap3 + "</span></div><div class='col-4'><span class='chart-container-footer-border'>/</span>&nbsp;<span style='vertical-align: super'>مرز محدوده</span></div></div>";
            $("#chart-container-footer").html(contHtml);
            $("#chart-container-footer").show();
            $('#spinSearchLoading').hide();

        }
        else {
            alert("خطا در برقراری ارتباط با سرور!");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(textStatus);
    });

}
function LoadInput4(type, color1, color2, color3, color4, cap1, cap2, cap3, cap4) {
    loadInput1Array = [], loadInput1ArrayCityName = [], loadInput2Array = [], loadInput3Array = [], loadInput4Array = [], loadInputSumArray = [];
    LoadHideInput(type).done(function (data) {
        if (data != null) {
            if (data.d[0].CenterLocation == "false" && data.d[0].CityName != null) {
                $("#lblMessage").html(CreateModal(data.d[0].CityName));
                $('#MessageModal').modal();
            } else {
                if (data.d.length == 1 && data.d[0].CityName != null) {
                    let cityName = data.d[0].CityName;
                    let centerLocation = data.d[0].CenterLocation;
                    let f1 = data.d[0].FirstCap;
                    let f2 = data.d[0].SecondCap;
                    let f3 = data.d[0].ThirdCap;
                    let f4 = data.d[0].FourthCap;
                    let fc1 = parseFloat(f1);
                    let fc2 = parseFloat(f2);
                    let fc3 = parseFloat(f3);
                    let fc4 = parseFloat(f4);
                    loadInput1Array.push(fc1);
                    loadInput2Array.push(fc2);
                    loadInput3Array.push(fc3);
                    loadInput4Array.push(fc4);
                    loadInput1ArrayCityName.push(cityName);
                    let sum = fc1 + fc2 + fc3 + fc4;
                    loadInputSumArray.push(sum);
                    AddPiechartMarker4(color1, color2, color3, color4, f1, f2, f3, f4, centerLocation, loadInputSumArray);
                }
                else if (data.d.length > 1) {
                    for (i = 0; i < data.d.length; i++) {
                        let cityName = data.d[i].CityName;
                        let centerLocation = data.d[i].CenterLocation;
                        let f1 = data.d[i].FirstCap;
                        let f2 = data.d[i].SecondCap;
                        let f3 = data.d[i].ThirdCap;
                        let f4 = data.d[i].FourthCap;
                        if (f1 != "0" || f2 != "0" || f3 != "0" || f4 != "0") {
                            let fc1 = parseFloat(f1);
                            let fc2 = parseFloat(f2);
                            let fc3 = parseFloat(f3);
                            let fc4 = parseFloat(f4);
                            loadInput1Array.push(fc1);
                            loadInput2Array.push(fc2);
                            loadInput3Array.push(fc3);
                            loadInput4Array.push(fc4);
                            loadInput1ArrayCityName.push(cityName);
                            let sum = fc1 + fc2 + fc3 + fc4;
                            loadInputSumArray.push(sum);
                            AddPiechartMarker4(color1, color2, color3, color4, f1, f2, f3, f4, centerLocation, loadInputSumArray);
                        }
                    }
                }
                HighchartWith4(color1, color2, color3, color4, loadInput1Array, loadInput2Array, loadInput3Array, loadInput4Array, cap1, cap2, cap3, cap4, loadInput1ArrayCityName);
            }
            var contHtml = "<div class='row'><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color1 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap1 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color2 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap2 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color3 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap3 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color4 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap4 + "</span></div><div class='col-4'><span class='chart-container-footer-border'>/</span>&nbsp;<span style='vertical-align: super'>مرز محدوده</span></div></div>";
            $("#chart-container-footer").html(contHtml);
            $("#chart-container-footer").show();
            $('#spinSearchLoading').hide();
        }
        else {
            alert("خطا در برقراری ارتباط با سرور!");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(textStatus);
    });
}
function LoadInput5(type, color1, color2, color3, color4, color5, cap1, cap2, cap3, cap4, cap5) {
    loadInput1Array = [], loadInput1ArrayCityName = [], loadInput2Array = [], loadInput3Array = [], loadInput4Array = [], loadInput5Array = [], loadInputSumArray = [];
    LoadHideInput(type).done(function (data) {
        if (data != null) {
            if (data.d[0].CenterLocation == "false" && data.d[0].CityName != null) {
                $("#lblMessage").html(CreateModal(data.d[0].CityName));
                $('#MessageModal').modal();
            } else {
                if (data.d.length == 1 && data.d[0].CityName != null) {
                    let cityName = data.d[0].CityName;
                    let centerLocation = data.d[0].CenterLocation;
                    let f1 = data.d[0].FirstCap;
                    let f2 = data.d[0].SecondCap;
                    let f3 = data.d[0].ThirdCap;
                    let f4 = data.d[0].FourthCap;
                    let f5 = data.d[0].FifthCap;
                    let fc1 = parseFloat(f1);
                    let fc2 = parseFloat(f2);
                    let fc3 = parseFloat(f3);
                    let fc4 = parseFloat(f4);
                    let fc5 = parseFloat(f5);
                    loadInput1Array.push(fc1);
                    loadInput2Array.push(fc2);
                    loadInput3Array.push(fc3);
                    loadInput4Array.push(fc4);
                    loadInput5Array.push(fc5);
                    loadInput1ArrayCityName.push(cityName);
                    let sum = fc1 + fc2 + fc3 + fc4 + fc5;
                    loadInputSumArray.push(sum);
                    AddPiechartMarker5(color1, color2, color3, color4, color5, f1, f2, f3, f4, f5, centerLocation, loadInputSumArray);
                }
                else if (data.d.length > 1) {
                    for (i = 0; i < data.d.length; i++) {
                        let cityName = data.d[i].CityName;
                        let centerLocation = data.d[i].CenterLocation;
                        let f1 = data.d[i].FirstCap;
                        let f2 = data.d[i].SecondCap;
                        let f3 = data.d[i].ThirdCap;
                        let f4 = data.d[i].FourthCap;
                        let f5 = data.d[i].FifthCap;
                        if (f1 != "0" || f2 != "0" || f3 != "0" || f4 != "0" || f5 != "0") {
                            let fc1 = parseFloat(f1);
                            let fc2 = parseFloat(f2);
                            let fc3 = parseFloat(f3);
                            let fc4 = parseFloat(f4);
                            let fc5 = parseFloat(f5);
                            loadInput1Array.push(fc1);
                            loadInput2Array.push(fc2);
                            loadInput3Array.push(fc3);
                            loadInput4Array.push(fc4);
                            loadInput5Array.push(fc5);
                            loadInput1ArrayCityName.push(cityName);
                            let sum = fc1 + fc2 + fc3 + fc4 + fc5;
                            loadInputSumArray.push(sum);
                            AddPiechartMarker5(color1, color2, color3, color4, color5, f1, f2, f3, f4, f5, centerLocation, loadInputSumArray);
                        }
                    }
                }
                HighchartWith5(color1, color2, color3, color4, color5, loadInput1Array, loadInput2Array, loadInput3Array, loadInput4Array, loadInput5Array, cap1, cap2, cap3, cap4, cap5, loadInput1ArrayCityName);
            }
            var contHtml = "<div class='row'><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color1 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap1 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color2 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap2 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color3 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap3 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color4 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap4 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color5 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap5 + "</span></div><div class='col-4'><span class='chart-container-footer-border'>/</span>&nbsp;<span style='vertical-align: super'>مرز محدوده</span></div></div>";
            $("#chart-container-footer").html(contHtml);
            $("#chart-container-footer").show();
            $('#spinSearchLoading').hide();
        }
        else {
            alert("خطا در برقراری ارتباط با سرور!");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(textStatus);
    });
}
function LoadInput6(type, color1, color2, color3, color4, color5, color6, cap1, cap2, cap3, cap4, cap5, cap6) {
    loadInput1Array = [], loadInput1ArrayCityName = [], loadInput2Array = [], loadInput3Array = [], loadInput4Array = [], loadInput5Array = [], loadInput6Array = [], loadInputSumArray = [];
    LoadHideInput(type).done(function (data) {
        if (data != null) {
            if (data.d[0].CenterLocation == "false" && data.d[0].CityName != null) {
                $("#lblMessage").html(CreateModal(data.d[0].CityName));
                $('#MessageModal').modal();
            } else {
                if (data.d.length == 1 && data.d[0].CityName != null) {
                    let cityName = data.d[0].CityName;
                    let centerLocation = data.d[0].CenterLocation;
                    let f1 = data.d[0].FirstCap;
                    let f2 = data.d[0].SecondCap;
                    let f3 = data.d[0].ThirdCap;
                    let f4 = data.d[0].FourthCap;
                    let f5 = data.d[0].FifthCap;
                    let f6 = data.d[0].SixthCap;
                    let fc1 = parseFloat(f1);
                    let fc2 = parseFloat(f2);
                    let fc3 = parseFloat(f3);
                    let fc4 = parseFloat(f4);
                    let fc5 = parseFloat(f5);
                    let fc6 = parseFloat(f6);
                    loadInput1Array.push(fc1);
                    loadInput2Array.push(fc2);
                    loadInput3Array.push(fc3);
                    loadInput4Array.push(fc4);
                    loadInput5Array.push(fc5);
                    loadInput6Array.push(fc6);
                    loadInput1ArrayCityName.push(cityName);
                    let sum = fc1 + fc2 + fc3 + fc4 + fc5 + fc6;
                    loadInputSumArray.push(sum);
                    AddPiechartMarker6(color1, color2, color3, color4, color5, color6, f1, f2, f3, f4, f5, f6, centerLocation, loadInputSumArray);
                }
                else if (data.d.length > 1) {
                    for (i = 0; i < data.d.length; i++) {
                        let cityName = data.d[i].CityName;
                        let centerLocation = data.d[i].CenterLocation;
                        let f1 = data.d[i].FirstCap;
                        let f2 = data.d[i].SecondCap;
                        let f3 = data.d[i].ThirdCap;
                        let f4 = data.d[i].FourthCap;
                        let f5 = data.d[i].FifthCap;
                        let f6 = data.d[i].SixthCap;
                        if (f1 != "0" || f2 != "0" || f3 != "0" || f4 != "0" || f5 != "0" || f6 != "0") {
                            let fc1 = parseFloat(f1);
                            let fc2 = parseFloat(f2);
                            let fc3 = parseFloat(f3);
                            let fc4 = parseFloat(f4);
                            let fc5 = parseFloat(f5);
                            let fc6 = parseFloat(f6);
                            loadInput1Array.push(fc1);
                            loadInput2Array.push(fc2);
                            loadInput3Array.push(fc3);
                            loadInput4Array.push(fc4);
                            loadInput5Array.push(fc5);
                            loadInput6Array.push(fc6);
                            loadInput1ArrayCityName.push(cityName);
                            let sum = fc1 + fc2 + fc3 + fc4 + fc5 + fc6;
                            loadInputSumArray.push(sum);
                            AddPiechartMarker6(color1, color2, color3, color4, color5, color6, f1, f2, f3, f4, f5, f6, centerLocation, loadInputSumArray);
                        }
                    }
                }
                HighchartWith6(color1, color2, color3, color4, color5, color6, loadInput1Array, loadInput2Array, loadInput3Array, loadInput4Array, loadInput5Array, loadInput6Array, cap1, cap2, cap3, cap4, cap5, cap6, loadInput1ArrayCityName);
            }
            var contHtml = "<div class='row'><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color1 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap1 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color2 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap2 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color3 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap3 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color4 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap4 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color5 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap5 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color6 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap6 + "</span></div><div class='col-4'><span class='chart-container-footer-border'>/</span>&nbsp;<span style='vertical-align: super'>مرز محدوده</span></div></div>";
            $("#chart-container-footer").html(contHtml);
            $("#chart-container-footer").show();
            $('#spinSearchLoading').hide();
        }
        else {
            alert("خطا در برقراری ارتباط با سرور!");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(textStatus);
    });
}
function LoadInput7(type, color1, color2, color3, color4, color5, color6, color7, cap1, cap2, cap3, cap4, cap5, cap6, cap7) {
    loadInput1Array = [], loadInput1ArrayCityName = [], loadInput2Array = [], loadInput3Array = [], loadInput4Array = [], loadInput5Array = [], loadInput6Array = [], loadInput7Array = [], loadInputSumArray = [];
    LoadHideInput(type).done(function (data) {
        if (data != null) {
            if (data.d[0].CenterLocation == "false" && data.d[0].CityName != null) {
                $("#lblMessage").html(CreateModal(data.d[0].CityName));
                $('#MessageModal').modal();
            } else {
                if (data.d.length == 1 && data.d[0].CityName != null) {
                    let cityName = data.d[0].CityName;
                    let centerLocation = data.d[0].CenterLocation;
                    let f1 = data.d[0].FirstCap;
                    let f2 = data.d[0].SecondCap;
                    let f3 = data.d[0].ThirdCap;
                    let f4 = data.d[0].FourthCap;
                    let f5 = data.d[0].FifthCap;
                    let f6 = data.d[0].SixthCap;
                    let f7 = data.d[0].SeventhCap;
                    let fc1 = parseFloat(f1);
                    let fc2 = parseFloat(f2);
                    let fc3 = parseFloat(f3);
                    let fc4 = parseFloat(f4);
                    let fc5 = parseFloat(f5);
                    let fc6 = parseFloat(f6);
                    let fc7 = parseFloat(f7);
                    loadInput1Array.push(fc1);
                    loadInput2Array.push(fc2);
                    loadInput3Array.push(fc3);
                    loadInput4Array.push(fc4);
                    loadInput5Array.push(fc5);
                    loadInput6Array.push(fc6);
                    loadInput7Array.push(fc7);
                    loadInput1ArrayCityName.push(cityName);
                    AddPiechartMarker7(color1, color2, color3, color4, color5, color6, color7, f1, f2, f3, f4, f5, f6, f7, centerLocation, loadInputSumArray);
                }
                else if (data.d.length > 1) {
                    for (i = 0; i < data.d.length; i++) {
                        let cityName = data.d[i].CityName;
                        let centerLocation = data.d[i].CenterLocation;
                        let f1 = data.d[i].FirstCap;
                        let f2 = data.d[i].SecondCap;
                        let f3 = data.d[i].ThirdCap;
                        let f4 = data.d[i].FourthCap;
                        let f5 = data.d[i].FifthCap;
                        let f6 = data.d[i].SixthCap;
                        let f7 = data.d[i].SeventhCap;
                        if (f1 != "0" || f2 != "0" || f3 != "0" || f4 != "0" || f5 != "0" || f6 != "0" || f7 != "0") {
                            let fc1 = parseFloat(f1);
                            let fc2 = parseFloat(f2);
                            let fc3 = parseFloat(f3);
                            let fc4 = parseFloat(f4);
                            let fc5 = parseFloat(f5);
                            let fc6 = parseFloat(f6);
                            let fc7 = parseFloat(f7);
                            loadInput1Array.push(fc1);
                            loadInput2Array.push(fc2);
                            loadInput3Array.push(fc3);
                            loadInput4Array.push(fc4);
                            loadInput5Array.push(fc5);
                            loadInput6Array.push(fc6);
                            loadInput7Array.push(fc7);
                            loadInput1ArrayCityName.push(cityName);
                            let sum = fc1 + fc2 + fc3 + fc4 + fc5 + fc6 + fc7;
                            loadInputSumArray.push(sum);
                            AddPiechartMarker7(color1, color2, color3, color4, color5, color6, color7, f1, f2, f3, f4, f5, f6, f7, centerLocation, loadInputSumArray);
                        }
                    }
                }
                HighchartWith7(color1, color2, color3, color4, color5, color6, color7, loadInput1Array, loadInput2Array, loadInput3Array, loadInput4Array, loadInput5Array, loadInput6Array, loadInput7Array, cap1, cap2, cap3, cap4, cap5, cap6, cap7, loadInput1ArrayCityName);
            }
            var contHtml = "<div class='row'><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color1 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap1 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color2 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap2 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color3 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap3 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color4 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap4 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color5 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap5 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color6 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap6 + "</span></div><div class='col-4'><span class='chart-container-footer-color' style='background-color:" + color7 + "'></span>&nbsp;<span class='wordwrap font-size-10' style='vertical-align: super'>" + cap7 + "</span></div><div class='col-4'><span class='chart-container-footer-border'>/</span>&nbsp;<span style='vertical-align: super'>مرز محدوده</span></div></div>";
            $("#chart-container-footer").html(contHtml);
            $("#chart-container-footer").show();
            $('#spinSearchLoading').hide();
        }
        else {
            alert("خطا در برقراری ارتباط با سرور!");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(textStatus);
    });
}