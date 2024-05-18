var osmUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNoa2Fuc2F0YXJwb3VyIiwiYSI6ImNrdmp1bXlhaTA1aXkydW81eWF5bmwyejQifQ.j6er3HdjHOguoXgO4KbZ0w',
                        osmAttrib = '',
                        osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
                        map = new L.Map('map', { rotate: true,maxBoundsViscosity: 0.75, touchRotate: true, center: new L.LatLng(35.715298, 51.404343), zoom: 13, zoomControl: false }),
                        drawnItems = L.featureGroup().addTo(map);
osm.addTo(map);
map.options.minZoom = 5;
map.setMaxBounds([[39.902994, 35.589165], [23.386632, 63.865367]]);
map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    var geojson = layer.toGeoJSON();
    console.log(geojson);
    drawnItems.addLayer(layer);
});
L.control.scale({
    position: 'topright'
}).addTo(map);

function polystyleIran(feature) {
    return {
        fillColor: '#fff',
        weight: 1,
        opacity: 0,
        color: '#ff003b',
        fillOpacity: 0.7
    };
}
function polystyle(feature) {
    return {
        fillColor: '#ff003b',
        weight: 3,
        opacity: 1,
        color: '#5693BA',  //Outline color
        fillOpacity: 0,
        dashArray: '5,10'
    };
}
function polyMask(mask, bounds) {
    var bboxPoly = turf.bboxPolygon(bounds);
    return turf.difference(bboxPoly, mask);
}
if ($("#hidLocation").val() != "") {
    var getvalue;
    if ($("#hidLocation").val() == "LoadIranMap") {
        var request = new XMLHttpRequest();
        request.open("GET", "/Geo/Iran.txt", false);
        request.send(null);
        let returnValue = request.responseText;
        let datalayer = L.geoJson(JSON.parse(returnValue), { style: polystyle }, {
            onEachFeature: function (feature, featureLayer) {
                featureLayer.bindPopup(feature.properties.NAME_1);
            }
        }).addTo(map);
        map.fitBounds(datalayer.getBounds());
        getvalue = JSON.parse(returnValue).features[0];
        $("#hidLocation").val(JSON.stringify(getvalue));
        let obj = JSON.parse($("#hidAccidentLocation").val());

        let iran = new L.LayerGroup();
        let desyCircle = LGeo.circle([32.31149, 54.2171693], 1600000, {
                    parts: 60
                }).addTo(iran);
        //var polygon = turf.multiPolygon(JSON.parse(returnValue).features[0].geometry.coordinates[0]);
        let unionTemp;
        for (let i = 0; i < getvalue.geometry.coordinates.length; i++) {
            const searchWithin = turf.polygon(getvalue.geometry.coordinates[i]);
            unionTemp = turf.mask(desyCircle.toGeoJSON(), searchWithin );
        }
        let cityUnion = L.geoJson(unionTemp, { style: polystyleIran }).addTo(map);
        GetLoacationList(obj);
        
    } else {
        getvalue = JSON.parse($("#hidLocation").val());
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
        let obj = JSON.parse($("#hidAccidentLocation").val()); console.log(getvalue);
        GetLoacationList(obj);
    }
    
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
    getvalue = JSON.parse(returnValue);
    $("#hidLocation").val(JSON.stringify(getvalue));

}
function PopupClose() {
    map.closePopup();
}
function AddClassActiveAndicator(id) {
    $('.carousel-indicators li').removeClass('active');
    $(id).addClass('active');
}
function GetSlidShow(id) {
    var obj = { "accidentId": id }
    return $.ajax({
        type: "POST",
        url: "Dashboard.aspx/GetSlideShow",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    });
}
function ClickInMarker(e) {
    console.log(e.target.options.someCustomProperty);
}
function GetLoacationList(obj) {
    for (var i = 0; i < obj.length; i++) {
        var id = obj[i].Id;
        if (id == "") continue;
        var crashType = obj[i].CrashType;
        var checkByPoliceStationAdmin = obj[i].CheckByPoliceStationAdmin;
        var checkByCampAdmin = obj[i].CheckByCampAdmin;
        var latlong = obj[i].Location.split(',');
        var latitude = parseFloat(latlong[0]);
        var longitude = parseFloat(latlong[1]);
        if (latitude == "" || longitude == "") continue;
        var stuSplit = L.latLng(latitude, longitude);
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
        //var isBlink = "";
        var img = "";
        var icon = "";
        var getColor = "";
        if (crashType == "فوتی") {
            getColor = "map-dead-help-color";
            icon = "incomplete-location-red.png";
        } else if (crashType == "جرحی") {
            getColor = "map-jarhi-help-color";
            icon = "incomplete-location-orange.png";
        }
        else if (crashType == "خسارتی") {
            getColor = "yellow";
            icon = "incomplete-location-yellow.png";
        } else {
            getColor = "gray";
            icon = "incomplete-location-gray.png";
        }
        if (checkByPoliceStationAdmin == 'False') {
            img = '<img style="width: 24px;" class="blink" src="/Images/' + icon + '" title="در انتظار تایید پاسگاه"/>';
            //"fa-dot-circle blink ";
        } else {
            img = '<i class="fa fa-location-dot ' + getColor + ' fa-3x"></i>';
        }
        //else if (checkByPoliceStationAdmin == 'True' && checkByCampAdmin == 'False') {

        //    //isBlink = "fa-dot-circle ";
        //}
        //else if (checkByPoliceStationAdmin == 'True' && checkByCampAdmin == 'True') {
        //    //isBlink = "fa-check-circle ";
        //}
        
        var getIcon = L.divIcon({
            //html: '<i class="fa ' + isBlink + getColor + ' fa-3x"></i>',
            html: img,
            //iconSize: [20, 20],
            className: 'myDivIcon'
        });
        var slidShow;
        GetSlidShow(id).done(function (data) {
            if (data != null) {
                if (data.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(data.d[0].SlideShow));
                    $('#MessageModal').modal();
                } else {
                    var indicator = "";
                    for (var i = 0; i < parseInt(data.d[0].Count) ; i++) {
                        if (i == 0) {
                            indicator += '<li onclick="AddClassActiveAndicator(this)" data-target="#carouselExampleIndicators" data-slide-to="' + i + '" class="active"></li>';
                        } else {
                            indicator += '<li onclick="AddClassActiveAndicator(this)" data-target="#carouselExampleIndicators" data-slide-to="' + i + '"></li>';
                        }
                    }
                    let getCollisionOfATwo = data.d[0].CollisionOfATwo;
                    let getCollisionOfA = data.d[0].CollisionOfA;
                    let getColo = data.d[0].CrashType;
                    if (getCollisionOfATwo === "شی ثابت" || getCollisionOfATwo === "واژگونی و سقوط" || getCollisionOfATwo === "خروج از جاده") getColo = "تک وسیله ای" + " - " + getCollisionOfATwo;
                    else if (getCollisionOfA === "وسیله نقلیه" && (getCollisionOfATwo === "یک وسیله نقلیه" || getCollisionOfATwo === "وسیله نقلیه پارک شده")) getColo = "دو وسیله ای" + " - " + data.d[0].TypeOfCollision;
                    slidShow = '<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel"><div class="carousel-inner">' + data.d[0].SlideShow + '</div><a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>' + '<ol class="carousel-indicators">' + indicator + '</ol></div>' +
                        '<br><div class="row form-group"><div class="col-6 text-right">تاریخ تصادف : </div><div class="col-6">' + data.d[0].CrashDate + '</div></div>' +
                        '<div class="row form-group"><div class="col-6 text-right">زمان تصادف : </div><div class="col-6">' + data.d[0].CrashTime + '</div></div>' +
                        '<div class="row form-group"><div class="col-4 text-right">نوع برخورد : </div><div style="font-size: 9px;" class="col-8">' + getColo + '</div></div>' +
                        '<hr><div class="row form-group"><div class="col-5 font-size-10">تعداد متوفیان : </div><div class="col-1">' + data.d[0].DeadCount + '</div>' +
                        '<div class="col-5 font-size-10">تعداد مصدومان : </div><div class="col-1">' + data.d[0].InjuredCount + '</div></div>' +
                        '<div class="row form-group"><div class="col-2 text-center"><i class="fa fa-car fa-2x"></i><hr>' + data.d[0].CarCount + '</div><div class="col-2 text-center"><i class="fa fa-truck fa-2x"></i><hr>' + data.d[0].Car3Count + '</div><div class="col-2 text-center"><i class="fa fa-bus fa-2x"></i><hr>' + data.d[0].Car2Count + '</div><div class="col-2 text-center"><i class="fa fa-bicycle fa-2x"></i><hr>' + data.d[0].BikeRiderCount + '</div><div class="col-2 text-center"><i class="fa fa-walking fa-2x"></i><hr>' + data.d[0].PedestrianCount + '</div><div class="col-2 text-center"><i class="fa fa-motorcycle fa-2x"></i><hr>' + data.d[0].MotorCount + '</div></div>' +
                        '<div class="text-center"><a class="btn btn-warning" target="_blank" href="/Moderator/Event/CheckAccident.aspx?Id=' + id + '">مشاهده گزارش</a></div>';
                }
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        });
        var customPopup = '<i onclick="PopupClose()" class="fa fa-times-circle fa-2x close-popup yellow"></i>' + slidShow;
        var customOptions =
        {
            'maxWidth': '1000',
            'width': '500',
            'className': 'popup-accident'
        }
        var isInside1 = turf.booleanPointInPolygon(pt1, JSON.parse($("#hidLocation").val()));
        if (isInside1 == true) {
            var myMarker = L.marker(stuSplit,
            { title: 'unselected', icon: getIcon, someCustomProperty: id + "," + crashType }).bindPopup(customPopup, customOptions, {
                closeButton: false
            }).addTo(map).on('click', ClickInMarker);
        }
    }

}
function Search() {


    //var getId = id == "" ? $("#txtIdSearch").val() : id;
    var getStatus = $('input[type=radio][name=rdoStatus]:checked').val();
    //alert("getStatus: " + getStatus);

    var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
    //alert("getDateOfAccident: " + getDateOfAccident);

    if (getDateOfAccident == "Date") {
        getDateOfAccident = $("#txtDateRange").val().trim();
       // alert("getDateOfAccident: " + getDateOfAccident);

    }
    var getInNativeArea = $('#cmbInNativeArea').val();
  //  alert("getInNativeArea: " + getInNativeArea);

    var getCrashType = $('input[type=radio][name=rdoIntensity]:checked').val();
   // alert("getCrashType: " + getCrashType);

    var getLocation = $('input[type=radio][name=rdoLocation]:checked').val();
    if (getLocation =="undefined") {
      //  aleret("maloom nist");
    }
    //alert("getLocation: " + getLocation);

    var obj = {

         
        "status": getStatus == undefined ? "" : getStatus,
        "dateOfAccident": getDateOfAccident == undefined ? "" : getDateOfAccident,
        "crashType": getCrashType == undefined ? "" : getCrashType,
        "provinceSearch": $("#cmbProvinceSearch").val(),
        "cityId": $("#cmbCity").val(),
        "location": getLocation == undefined ? "" : getLocation,
        "inNativeArea": getInNativeArea === "-1" || getInNativeArea === "-2" ? "" : getInNativeArea,
        "axisId": $("#cmbAxis").val() === "-1" ? "" : $("#cmbAxis").val()
    }
    $('#spinSearchLoading').show();
    $('#btnSearch').button("loading");
  //  alert(obj.provinceSearch);
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/GetAccidentList",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r != null) {
                var numItems = $('.leaflet-marker-pane').length;
                if (r.d[0].Id == "0") {
                    $("#lblMessage").html(CreateModal(r.d[0].Location));
                    $('#MessageModal').modal();
                    return false;
                } else if (r.d[0].Id == "-1") {
                    $("#lblMessage").html(CreateModal(r.d[0].Location));
                    $('#MessageModal').modal();
                    if (numItems > 0) {
                        $(".leaflet-marker-icon").remove();
                        $(".leaflet-shadow-pane").remove();
                    }
                    return false;
                }
                if (numItems > 0) {
                    $(".leaflet-marker-icon").remove();
                    $(".leaflet-shadow-pane").remove();
                }
                GetLoacationList(r.d);
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSearchLoading').hide();
            $("#btnSearch").button("reset");
        },
        //error: function (response) { if (response.status == 401) location.reload(); },
        error: function (response) { alert("error:_" +response.Message); },
        failure: function (response) {
            alert(response.d);
        }
    });
    return true;
}
document.addEventListener('DOMContentLoaded', function () {
    $('.leaflet-control-scale').appendTo('.dashboard-left');
    $('.leaflet-control-scale').children().last().remove();
    ScaleToFa();
    $('.leaflet-control-attribution').hide();
}, false);
function ScaleToFa() {
    var getText = $('.leaflet-control-scale-line').html();
    $('.leaflet-control-scale-line').html(getText.replace("km", "کیلومتر").replace("m", "متر"));
}
map.on("zoomend", function (e) {
    ScaleToFa();
});
$(document).ready(function () {
    pageLoad();
    $('input[type=radio][name=rdoDate]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoDate]:checked').val();
        if (getVal == "Date") {
            $("#divShowDate").show('slow');
        } else {
            $("#divShowDate").hide('slow');
        }
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
    $("#cmbProvinceSearch").on('change', function () {
        var getProvince = $('#cmbProvinceSearch').val();
        if (getProvince !== "" && getProvince !== null) {
            if (getProvince !== "-1") FillCity();
            Search();
            if (getProvince == "-1") {
                if ($('#divAxis').css('display') !== 'none') {
                    $("#divAxis").hide('slow');
                    $('#cmbAxis').val("-1").trigger("change");
                }
                if ($('#divCity').css('display') !== 'none') {
                    $("#divCity").hide('slow');
                    $('#cmbCity').val("-1").trigger("change");
                }
                $('input[type=radio][name=rdoLocation]').prop("checked", false);
            }
        }
    });
    $("#cmbCity").on('change', function () {
        var getCity = $('#cmbCity').val();
        var getProvince = $('#cmbProvinceSearch').val();
        if (getProvince == "-1") return;
        if (getCity !== "" && getCity !== null) {
            $('#divInNativeArea').show("slow");
            Search();
            if (getCity == "-1") {
                $('#cmbInNativeArea').val("-1").trigger("change");
                $('#divInNativeArea').hide("slow");
            }
        }
    });
    $("#cmbAxis").on('change', function () {
        var getCity = $('#cmbAxis').val();
        var getProvince = $('#cmbProvinceSearch').val();
        if (getProvince == "-1") return;
        if (getCity !== "" && getCity !== null) {
            Search();
        }
    });
    $("#cmbInNativeArea").on('change', function () {
        var getInNativeArea = $('#cmbInNativeArea').val();
        if (getInNativeArea !== "" && getInNativeArea !== null) {
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
                console.log(latit);
                // this is just a marker placed in that position
                var abc = L.marker([latit, longit]).addTo(map);
                // move the map to have the location in its center
                //map.panTo(new L.LatLng(latit, longit));
                //map.setView(latit, longit, 13);
            },
        function (err) {
            console.log(err);
        });
        }
       
    });
    $('input[type=radio][name=rdoLocation]').on('change', function () {
        
        $("#divCity,#divAxis").show('slow');
        $("#cmbCity,#cmbAxis").show('slow');
        $('#divInNativeArea').show("slow");
        //$('#cmbCity,#cmbAxis').val("-1").trigger("change");

        //var getVal = $('input[type=radio][name=rdoLocation]:checked').val();
        //alert(getVal);
        //if (getVal === "City") {
        //    let getProvince = $('#cmbProvinceSearch').val();
        //    if (getProvince === "-1" || getProvince === "") {
        //        $("#lblMessage").html(CreateModal("ابتدا باید یک استان را انتخاب نمایید!"));
        //        $('#MessageModal').modal();
        //        $("input[type=radio][name=rdoLocation]").prop("checked", false);
        //        return;
        //    }
        //    $("#divCity").show('slow');
        //    if ($('#divAxis').css('display') !== 'none') {
        //        $("#divAxis").hide('slow');
        //        $('#cmbAxis').val("-1").trigger("change");
        //    }
        //    FillCity();
        //} else
        //    if (getVal === "Axis") {
        //        alert(aa);
        //    let getProvince = $('#cmbProvinceSearch').val();
        //    if (getProvince === "-1" || getProvince === "") {
        //        $("#lblMessage").html(CreateModal("ابتدا باید یک استان را انتخاب نمایید!"));
        //        $('#MessageModal').modal();
        //        $("input[type=radio][name=rdoLocation]").prop("checked", false);
        //        return;
        //    }
        //    if ($('#divCity').css('display') !== 'none') {
        //        $("#divCity").hide('slow');
        //        $('#cmbCity').val("-1").trigger("change");
        //    }
        //    let obj = {
        //        "provinceId": $("#cmbProvinceSearch").val() === "-1" ? "" : $("#cmbProvinceSearch").val()
        //    }
        //    $('#spinSearchLoading').show();
        //    $.ajax({
        //        type: "POST",
        //        url: "/Moderator/Report/FirstViwe.aspx/GetFillAxis",
        //        data: JSON.stringify(obj),
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: function (msg) {
        //            if (msg != null) {
        //                if (msg.d.length == 0) {
        //                    $('#cmbAxis').html('<option selected="" value="-1">انتخاب محور</option>');
        //                }
        //                else if (msg.d[0].IsSuccess !== "true") {
        //                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
        //                    $('#MessageModal').modal();
        //                } else {
        //                    var optionVal = '';
        //                    $('#cmbAxis').html('<option selected="" value="-1">انتخاب محور</option>');
        //                    for (i = 0; i < msg.d.length; i++) {
        //                        var txt = msg.d[i].Message;
        //                        var id = msg.d[i].Id;
        //                        optionVal += '<option value="' + id + '">' + txt + '</option>';
        //                    }
        //                    $('#cmbAxis').append(optionVal);
        //                }
        //            } else {
        //                alert("خطا در برقراری ارتباط با سرور!");
        //            }
        //        },
        //        complete: function () {
        //            $('#spinSearchLoading').hide();
        //            $("#divAxis").show('slow');
        //        },
        //        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
        //            alert(response.d);
        //        }
        //    });
        //}
        //else {
        //     $("#divCity,#divAxis").show('slow');
        //     $('#cmbCity,#cmbAxis').val("-1").trigger("change");
        //}
    });
    $('.hide-left-panel').click(function () {
        //console.log($('.dashboard-left').width());
        if ($('.dashboard-left').width() > '40') {
            $('.dashboard-left').css('width', '0px');
            $('.dashboard-left').css('padding', '0px');
            $('.map-zoom').css('overflow', 'hidden');
            $('.hide-left-panel').html("<i class='fa fa-angle-double-left fa-2x' style='margin-right:-20px;'></i>");
            $('.map-detail-caption').hide();
            $('.map-detail-left-arr').hide();
            $('.map-plus,.map-minus').css('margin-left', '0');
            $('#divMyLocatoin,#divCompass').css('margin-right', '0');
            $('.map-detail-icon').css('margin-right', '5px');
            $('.line-border').css('width', '25px');
            $('.dashboard-left').css('left', '0');
            $('.leaflet-control-scale').hide();
        } else {
            $('.dashboard-left').css('width', '');
            $('.hide-left-panel').html("<i class='fa fa-angle-double-right fa-2x' style='margin-right:-20px;'></i>");
            $('.map-detail-caption').show();
            $('.map-detail-left-arr').show();
            $('.map-plus,.map-minus').css('margin-left', '');
            $('#divMyLocatoin,#divCompass').css('margin-right', '');
            $('.map-detail-icon').css('margin-right', '');
            $('.line-border').css('width', '');
            $('.dashboard-left').css('left', '0');
            $('.leaflet-control-scale').show();
        }
    });
});
function FillCity() {
    let obj = {
        "provinceId": $("#cmbProvinceSearch").val() === "-1" ? "" : $("#cmbProvinceSearch").val()
    }
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "/Moderator/Report/FirstViwe.aspx/GetFillCity",
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
function openDateRange() {
    var btn = document.getElementById("dateDateRange");
    btn.click(); event.preventDefault();
}
function pageLoad() {
    $("#cmbProvinceSearch").select2({
        placeholder: {
            id: "-1",
            text: "سطح استانی"
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
