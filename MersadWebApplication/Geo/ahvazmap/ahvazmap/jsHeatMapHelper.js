//var osmUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNoa2Fuc2F0YXJwb3VyIiwiYSI6ImNrdmp1bXlhaTA1aXkydW81eWF5bmwyejQifQ.j6er3HdjHOguoXgO4KbZ0w',
//                        osmAttrib = '',
//                        osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
//                        map = new L.Map('map', { rotate: true, touchRotate: true, center: new L.LatLng(31.3330, 48.6660), zoom: 8, zoomControl: false }),
// drawnItems = L.featureGroup().addTo(map);
//osm.addTo(map);
let crash_source;
let crash_vector;
let heatvector;
var map = new ol.Map({
    view: new ol.View({
        center: [48.6660,31.3330],
        projection: "EPSG:4326",
        zoom: 8,
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    target: 'map'
});


const jarhistyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],
        scale: 0.05,
        src: "./placeholder3.png",
    }),
});

const footistyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],
        scale: 0.05,
        src: "./placeholder.png",
    }),
});

const khesaratistyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],
        scale: 0.05,
        src: "./placeholder4.png",
    }),
});

//$.getJSON("/Geo/Iran.txt", function (data) {
//    // add GeoJSON layer to the map once the file is loaded
//    var datalayer = L.geoJson(data, { style: polystyle('#fff', '#8EBF93', 0) }, {
//        onEachFeature: function (feature, featureLayer) {
//            featureLayer.bindPopup(feature.properties.NAME_1);
//        }
//    }).addTo(map);
//    map.fitBounds(datalayer.getBounds());
//});


//$('.leaflet-control-attribution').hide();
//function polystyle(fillColor, color, fillOpacity) {
//    return {
//        fillColor: fillColor,
//        weight: 2,
//        opacity: 1,
//        color: color,  //Outline color
//        fillOpacity: fillOpacity
//    };
//}

//var options = {
//    position: 'topright',
//    edit: {

//        featureGroup: drawnItems,
//        poly: {
//            allowIntersection: false
//        }
//    },
//    draw: {
//        title: 'منطقه مورد نظر را ترسیم کنید',
//        polyline: false,
//        rectangle: true,
//        circle: false,
//        marker: true,
//        circlemarker: false,
//        polygon: {
//            allowIntersection: false,
//            showArea: true,
//            shapeOptions: {
//                color: '#ff003b'
//            }
//        }
//    }
//};


//var polygonDrawer = new L.Draw.Polygon(map, { shapeOptions: { color: '#f00' } });
//var rectangleDrawer = new L.Draw.Rectangle(map, { shapeOptions: { color: '#f00' } });
//var circleDrawer = new L.Draw.Circle(map, { shapeOptions: { color: '#f00' } });
//var createLayer;
//var heat;
//var locations = [];
//var heatmapLocation = [];
//var geojson;
//let dataCityLayer, dataProvinceLayer;
//function getFeaturesInView() {
//    var features = [];
//    map.eachLayer(function (layer) {
//        if (layer instanceof L.Marker) {
//            if (map.getBounds().contains(layer.getLatLng())) {
//                features.push(layer.feature);
//            }
//        }
//    });
//    return features;
//}
//map.on('draw:created', function (e) {
//    var type = e.layerType;
//    createLayer = e.layer;
//    geojson = createLayer.toGeoJSON();
//    //if (createLayer instanceof L.Circle) {
//    //    L.PM.Utils.circleToPolygon(createLayer, 60).addTo(map);
//    //}else
//        createLayer.addTo(map);
//    $('#divRemoveLayerInMap,#divShowHeatMapDetails').removeAttr("disabled");
//    $('#divCreatePolygon,#divCreateRectangle,#divCreateCircle').attr("disabled", "");

//});
//$('#divRemoveLayerInMap').click(function () {
//    map.removeLayer(createLayer);
//    $('#divRemoveLayerInMap,#divShowHeatMapDetails').attr("disabled", "");
//    $('#divCreatePolygon,#divCreateRectangle,#divCreateCircle').removeAttr("disabled");
//});

//$('#divCreatePolygon').click(function () {
//    polygonDrawer.enable();
//    $('#divCreatePolygon,#divCreateRectangle,#divCreateCircle').attr("disabled", "");
//});
//$('#divCreateRectangle').click(function () {
//    rectangleDrawer.enable();
//    $('#divCreatePolygon,#divCreateRectangle,#divCreateCircle').attr("disabled", "");
//});
//$('#divCreateCircle').click(function () {
//    circleDrawer.enable();
//    $('#divCreatePolygon,#divCreateRectangle,#divCreateCircle').attr("disabled", "");
//});


Search();

//HAMIDCOMMENT: This function is no longer used as we are now receiving the geometry layer directly from the server. Use the new service that accepts a geometry layer instead

//function GetLoacationList(obj) {

//    var numItems = $('.leaflet-marker-pane').length;
//    if (numItems > 0) {

//        $(".leaflet-marker-icon").remove();
//        locations = [];
//        heatmapLocation = [];
//    }
//    var numHeat = $('.leaflet-overlay-pane > canvas').length;
//    if (numHeat > 0 && map.hasLayer(heat)) {
//        map.removeLayer(heat);
//        locations = [];
//        heatmapLocation = [];
//    }
//    for (var i = 0; i < obj.length; i++) {
//        var id = obj[i].Id;
//        if (id == "") continue;
//        var crashType = obj[i].CrashType;
//        if (obj[i].Location == "") continue;
//        var latlong = obj[i].Location.split(',');
//        var latitude = parseFloat(latlong[0]);
//        var longitude = parseFloat(latlong[1]);
//        locations.push([latitude, longitude, 1, crashType, id]);
//        heatmapLocation.push([latitude, longitude, 1]);
//    }
//    if (map.getZoom() > 16) {
//        //map.removeLayer(heat);
//        for (var i = 0; i < locations.length; i++) {
//            var getColor = "";
//            var getCrashType = locations[i][3];
//            var getId = locations[i][4];

//            if (getCrashType == "فوتی") {
//                getColor = "red";
//            } else if (getCrashType == "جرحی") {
//                getColor = "orange";
//            }
//            else if (getCrashType == "خسارتی") {
//                getColor = "yellow";
//            }
//            var getIcon = L.divIcon({
//                html: '<i class="fa fa-location-dot ' + getColor + ' fa-3x"></i>',
//                iconSize: [20, 20],
//                className: ''
//            });
//            var stuSplit = L.latLng(locations[i][0], locations[i][1]);
//            new L.Marker(stuSplit, { title: '', icon: getIcon, someCustomProperty: getId }).addTo(map);
//        }
//        $("#divAccidentPower").show("fade");
//        $("#divAccidentHeatRange").hide("fade");
//    } else {
//        $("#divAccidentPower").hide("fade");
//        $("#divAccidentHeatRange").show("fade");
//        heat = L.heatLayer(heatmapLocation, {
//            //radius: 10,
//            blur: 20,
//            maxZoom: 11,
//            gradient: { 0.4: 'blue', 0.6: 'lime', 0.85: 'yellow', 0.97: 'red', 1: 'red' }
//        });
//        map.addLayer(heat);
//    }

//    $('#spinSearchLoading,#spinSearchPerfesionalLoading').hide();
//}




function CountImage(count) {
    if (count == "0") count = "";
    else if (count == "1") count = "<img src='/Images/one.png' />";
    else if (count == "2") count = "<img src='/Images/two.png' />";
    else if (count == "3") count = "<img src='/Images/three.png' />";
    return count;
}



function Search() {
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
        "provinceId":   $("#cmbProvinceSearch").val(),
        "cityId":  $("#cmbCity").val(),
        "inNativeArea":"",
        "axisId":"",
        "collisionChild1": $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
        "collisionChild2": $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
        "isLocalDriver": chkIsLocalDriver == undefined ? "" : chkIsLocalDriver
    }
    $('#spinSearchLoading,#spinSearchPerfesionalLoading').show();
    $.ajax({
        type: "POST",
        url: "HeatMap.aspx/GetSearchHeatMap",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            createjson(r.d);
          
            //console.log(r.d[0].Id)


            //HAMIDCOMMENT:Temporary workaround: Error handling has been temporarily removed from this Ajax snippet due to time constraints. Proper error handling will be implemented in a future update.



            //if (r != null) {
            //    if (r.d[0].Id == "0" || r.d[0].Id == "-1") {
            //        $("#lblMessage").html(CreateModal(r.d[0].Location));
            //        $('#MessageModal').modal();
            //        var numItems = $('.leaflet-marker-pane').length;
            //        if (numItems > 0) {
            //            $(".leaflet-marker-icon").remove();
            //            $(".leaflet-shadow-pane").remove();
            //        }
            //        if (map.hasLayer(heat))
            //            map.removeLayer(heat);
            //        locations = [];
            //        heatmapLocation = [];
            //        return false;
            //    }
            //    GetLoacationList(r.d);

            //}
            //else {
            //    alert("خطا در برقراری ارتباط با سرور!");
            //}
        },
        complete: function (r) {


            //sess();

        },
        //complete: function () {

        //    $('#spinSearchLoading,#spinSearchPerfesionalLoading').hide();
        //},
        //error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
        //    alert(response.d);
        //}
    });


    return true;
}

var vectorSource = new ol.source.Vector({
    format: new ol.format.GeoJSON()
})

var pintvector = new ol.layer.Vector({
    title: 'b_layer',
    source: vectorSource,
    minZoom: 15.5,
    style: function (feature) {
        const type = feature.get("crashtype");
        switch (type) {
            case "جرحی":
                return jarhistyle;
                break;
            case "فوتی":
                return footistyle;
                break;
            default:
                return khesaratistyle;
        }
    },
});


heatvector = new ol.layer.Heatmap({
    maxZoom: 15.5,
    source: vectorSource,
    radius: 3,
});





var jeogsoni = {};

function createjson(list) {
    jeogsoni = {
        "type": "FeatureCollection",
        "features": []
    };
    console.log("HHHHHHHHHHHHHH")
    console.log(list)
    //gj.features.push({ "type": "feature", "geometry": { "type": "linestring", "coordinates": [] }, "properties": { "id": "", "crashtype": "" } });
    //lon = 20;
    //lat = 10;
    //id = 1;
    //crashtype = "رحی"
    //gj.features[0].geometry.coordinates.push([lon, lat]);
    //gj.features[0].properties.id = id;
    //gj.features[0].properties.crashtype = crashtype;
    //console.log(gj)
    for (let i = 0; i < list.length; i++) {
        latlon = list[i].Location;
        mylat = latlon.split(", ")[0];
        mylon = latlon.split(", ")[1];
        id = list[i].Id;
        crashtype = list[i].CrashType;
        jeogsoni.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "id": "", "crashtype": "" } });
        jeogsoni.features[i].geometry.coordinates.push(mylon, mylat);
        jeogsoni.features[i].properties.id = id;
        jeogsoni.features[i].properties.crashtype = crashtype;



    }
    console.log(jeogsoni);
    changemap(jeogsoni)




};


//function sess() {

//    var obj = {
//        "querytype":"1"
//    }
//    $.ajax({
//        type: "POST",
//        url: "HeatMap.aspx/releaseShode",
//        data: JSON.stringify(obj),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (r) {
//            jeogsoni = JSON.parse(r.d[0].Ids);
//            //alert(jeogsoni);
//        },
//        complete: function () {
//            //console.log(jeogsoni)
//            ////L.geoJson(jeogsoni).addTo(map);
//            //var geojsonFormat = new ol.format.GeoJSON();

//            //// reads and converts GeoJSon to Feature Object
//            //var features = geojsonFormat.readFeatures(jeogsoni);
//            //vectorSource.addFeatures(features);

//            //map.addLayer(pintvector)

//            changemap(jeogsoni)
//            console.log(jeogsoni)







//        },
//        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {

//        }
//    });

//}


//function changemap(jeogsoni) {

//    pintvector.getSource().clear();
//    map.removeLayer(pintvector);
//    map.removeLayer(heatvector);
//    //console.log(pintvector);
//    var geojsonformat = new ol.format.GeoJSON();
//    //console.log("first");
//    //console.log(jeogsoni[0]);
//    console.log("SEC");
//    console.log(jeogsoni);
//    var features = geojsonformat.writeFeatures(jeogsoni);
//    vectorSource.addFeatures(jeogsoni);


//    var featurecount = pintvector.getSource().getFeatures().length;
//    console.log(featurecount);
//    map.addLayer(pintvector)
//    //alert("clear");
//    //pintvector.getsource().clear();
//    //console.log("sec");
//    //var featurecount2 = pintvector.getsource().getfeatures().length;
//    //console.log(featurecount2);

//    //map.removelayer(pintvector);
//    map.addLayer(heatvector)


//}





function changemap(jeogsoni) {
    pintvector.getSource().clear();
    map.removeLayer(pintvector);
    map.removeLayer(heatvector);
    //console.log(pintvector);
    var geojsonFormat = new ol.format.GeoJSON();
    var features = geojsonFormat.readFeatures(jeogsoni);
    vectorSource.addFeatures(features);
    console.log("first");

    var featureCount = pintvector.getSource().getFeatures().length;
    console.log(featureCount);
    map.addLayer(pintvector)
    //alert("clear");
    //pintvector.getSource().clear();
    //console.log("sec");
    //var featurecount2 = pintvector.getSource().getFeatures().length;
    //console.log(featurecount2);

    //map.removeLayer(pintvector);
    map.addLayer(heatvector)


}




const draw_source = new ol.source.Vector({ wrapX: false });

const draw_vector = new ol.layer.Vector({
    source: draw_source,
});

const typeSelect = document.getElementById("type");

let draw = new ol.interaction.Draw({
    type: "Circle",

});


function addInteraction() {
    const value = typeSelect.value;
    if (value == "Box") {
        draw = new ol.interaction.Draw({
            source: draw_source,
            type: "Circle",
            geometryFunction: ol.interaction.Draw.createBox(),
        });
        map.addInteraction(draw);
        draw.on("drawstart", drawstart)

    } else if (value !== "None") {
        draw = new ol.interaction.Draw({
            source: draw_source,
            type: typeSelect.value,
        });
        map.addInteraction(draw);
        draw.on("drawstart", drawstart)

    }
}


function drawstart(evt) {
    const ndraw = evt.draw;
    if (draw_vector.getSource().getFeatures().length >= 1) {
        map.removeInteraction(draw);
        map.removeLayer(draw_vector);
        draw_vector.getSource().clear();
        map.addLayer(draw_vector);
        addInteraction();
    }

}

draw.on("drawstart", drawstart)

typeSelect.onchange = function () {
    map.removeInteraction(draw);
    addInteraction();
};



document.getElementById("undo").addEventListener("click", function () {
    var myArray = [];

    if (typeSelect.value == "Circle") {
        draw_vector.getSource().forEachFeature(function (polyfeature) {
            var circuleradios = polyfeature.getGeometry().getRadius();
            console.log(circuleradios);
            var circulecenter = polyfeature.getGeometry().getCenter();
            console.log(circulecenter);
            var options = { steps: 10, units: "degrees" };
            var circle = turf.circle(circulecenter, circuleradios, options);

            pintvector.getSource().forEachFeature(function (pointfeature) {
                var mypointcoords = pointfeature.values_.geometry.flatCoordinates;
                var mypoint = turf.point(mypointcoords);

                if (turf.booleanIntersects(circle, mypoint)) {
                    myArray.push(pointfeature.get("id"));
                }
            });
            console.log(myArray);
        });
    } else {
        draw_vector.getSource().forEachFeature(function (polyfeature) {
            var format = new ol.format.GeoJSON();;
            var geoJsonStr = format.writeFeatures(draw_source.getFeatures());
            var searchWithin = turf.polygon(
                JSON.parse(geoJsonStr).features[0].geometry.coordinates
            );
            console.log(searchWithin);
            pintvector.getSource().forEachFeature(function (pointfeature) {
                var mypointcoords = pointfeature.values_.geometry.flatCoordinates;
                var mypoint = turf.point(mypointcoords);

                if (turf.booleanIntersects(searchWithin, mypoint)) {
                    myArray.push(pointfeature.get("id"));
                }
            });
            console.log(myArray);
            console.log(draw_vector.getSource().getFeatures().length);

        });
    }
});


function pageLoad() {
    $("#cmbProvinceSearch").select2({
        placeholder: {
            id: "-1",
            text: "کد محدوده ترافیکی"
        },
        allowClear: true,
        dir: 'rtl'
    });
    $("#cmbCity").select2({
        placeholder: {
            id: "-1",
            text: "کد منطقه شهرداری"
        },
        allowClear: true,
        dir: 'rtl'
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
        groupId: 'group1',
        rangeSelector: true
    });
    $("#lnkHeatMap").addClass("active");

}



function openDateRange() {
    var btn = document.getElementById("dateDateRange");
    btn.click(); event.preventDefault();
}

function CloseDetails() {
    $('#divShowDetails').hide("fade");
    $('#divShowHeatMapDetails').removeAttr("disabled");
}

function ShowGuide() {
    $('#divShowGuide').show("fade");
}
function CloseGuide() {
    $('#divShowGuide').hide("fade");
}
function convertToImage() {
    $('#spinTblLoading').show("fade");
    $('#divShowDetails table tbody').css("max-height", "3000px");
    html2canvas(document.querySelector("#divShowDetails"), { useCORS: true }).then(function (canvas) {
        var fName = (Math.random() + 1).toString(36).substring(7);
        saveAs(canvas.toDataURL(), fName + '.jpg');
    });
    $('#divShowDetails table tbody').css("max-height", "300px");
    $('#spinTblLoading').hide("fade");
}
function saveAs(uri, filename) {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);

    } else {

        window.open(uri);

    }
}



$(document).ready(function () {
    pageLoad();
    $("#cmbProvinceSearch").on('change', function () {
        Search();
    });
    $("#cmbCity").on('change', function () {
        Search();
    });

    $("#divProFilter").on('click', function () {
        $('#divNormalFilter').hide("slow");
        $('#divPerfesionalFilter').show("slow");
    });
    $("#btnBackToNormalFilter").on('click', function () {
        $('#divNormalFilter').show("slow");
        $('#divPerfesionalFilter').hide("slow");
    });
    

    //HAMIDCOMMENT: Commented out due to input geometry type change. Potential for re-use with minor modifications; however, time constraints prevent thorough evaluation at this time.

    $('#divShowHeatMapDetails').click(function () {
        //var tableheadder = '<div></div>';
       
        var starterBody = '<tbody>';
        var tableBody = "";
        var closeTable = "</tbody></table>'";
        var getListId
            = "";
        var myArray = [];

        if (typeSelect.value == "Circle") {
            draw_vector.getSource().forEachFeature(function (polyfeature) {
                var circuleradios = polyfeature.getGeometry().getRadius();
                console.log(circuleradios);
                var circulecenter = polyfeature.getGeometry().getCenter();
                console.log(circulecenter);
                var options = { steps: 10, units: "degrees" };
                var circle = turf.circle(circulecenter, circuleradios, options);

                pintvector.getSource().forEachFeature(function (pointfeature) {
                    var mypointcoords = pointfeature.values_.geometry.flatCoordinates;
                    var mypoint = turf.point(mypointcoords);

                    if (turf.booleanIntersects(circle, mypoint)) {
                        myArray.push(pointfeature.get("id"));
                    }
                });
                console.log(myArray);
            });
        } else {
            draw_vector.getSource().forEachFeature(function (polyfeature) {
                var format = new ol.format.GeoJSON();;
                var geoJsonStr = format.writeFeatures(draw_source.getFeatures());
                var searchWithin = turf.polygon(
                    JSON.parse(geoJsonStr).features[0].geometry.coordinates
                );
                console.log(searchWithin);
                pintvector.getSource().forEachFeature(function (pointfeature) {
                    var mypointcoords = pointfeature.values_.geometry.flatCoordinates;
                    var mypoint = turf.point(mypointcoords);

                    if (turf.booleanIntersects(searchWithin, mypoint)) {
                        myArray.push(pointfeature.get("id"));
                    }
                });
                console.log(myArray);
                console.log(draw_vector.getSource().getFeatures().length);

            });
        }


        var text = myArray.toString();
        var obj = { "idList": text }
        $.ajax({
            type: "POST",
            url: "HeatMap.aspx/GetHeatMapDetails",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg != null) {
                    if (msg.d[0].TimeOfAccident == "-1") {
                        $("#lblMessage").html(CreateModal(msg.d[0].Message));
                        $('#MessageModal').modal();
                    } else {
                        console.log(msg.d)
                        for (i = 0; i < msg.d.length; i++) {
                            var timeOfAccident = msg.d[i].TimeOfAccident;
                            var injuredCount = CountImage(msg.d[i].InjuredCount);
                            var deadCount = CountImage(msg.d[i].DeadCount);
                            var collisionOfA = msg.d[i].CollisionOfA;
                            var collisionOfATwo = msg.d[i].CollisionOfATwo;
                            let typeOfCollision = msg.d[i].TypeOfCollision;
                          /*  if (collisionOfA == "وسیله نقلیه" && (collisionOfATwo.indexOf("وسیله نقلیه") >= 0)) {*/
                                if (typeOfCollision == "برخورد زاویه‌ای") typeOfCollision = "<img src='/Images/angle-gray.png' />";
                                else if (typeOfCollision == "برخورد رخ به رخ") typeOfCollision = "<img src='/Images/head-on-gray.png' />";
                                else if (typeOfCollision == "برخورد پهلو به پهلو هم جهت") typeOfCollision = "<img src='/Images/sidewipe-sd-gray.png' />";
                                else if (typeOfCollision == "برخورد جلو به عقب") typeOfCollision = "<img src='/Images/rear-end-gray.png' />";
                                else if (typeOfCollision == "برخورد پهلو به پهلو غیر هم جهت") typeOfCollision = "<img src='/Images/sidewipe-od-gray.png' />";
                                
                            /*}*/
                            else if (collisionOfATwo == "واژگونی و سقوط") typeOfCollision = "<img src='/Images/overthrowfall.png' />";
                            else if (collisionOfATwo == "شی ثابت") typeOfCollision = "<img src='/Images/fixedobject.png' />";
                            else if (collisionOfATwo == "خروج از جاده") typeOfCollision = "<img src='/Images/khorojazmasir.png' />";

                            var car = msg.d[i].Car;
                            car = car == "0" ? "" : car;
                            var bus = msg.d[i].Bus;
                            bus = bus == "0" ? "" : bus;
                            console.log(msg.d[i].Bus)
                            var navyBar = msg.d[i].NavyBar;
                            navyBar = navyBar == "0" ? "" : navyBar;
                            var motorCycle = msg.d[i].MotorCycle;
                            motorCycle = motorCycle == "0" ? "" : motorCycle;
                            var bike = msg.d[i].Bike;
                            bike = bike == "0" ? "" : bike;
                            var pedestrian = msg.d[i].Pedestrian;
                            pedestrian = pedestrian == "0" ? "" : pedestrian;
                            var visualObstruction = msg.d[i].VisualObstruction;
                            visualObstruction = visualObstruction == "ندارد" || visualObstruction == "" ? "" : "<i class='fa fa-circle gray'></i>";
                            var roadDefects = msg.d[i].RoadDefects;
                            roadDefects = roadDefects == "ندارد" || roadDefects == "" ? "" : "<i class='fa fa-circle gray'></i>";
                            var lightingStatus = msg.d[i].LightingStatus;
                            if (lightingStatus == "روز") lightingStatus = "<img src='/Images/sun.png' />";
                            else if (lightingStatus == "طلوع") lightingStatus = "<img src='/Images/rise.png' />";
                            else if (lightingStatus == "غروب") lightingStatus = "<img src='/Images/sunset.png' />";
                            else if (lightingStatus == "شب با روشنایی کافی") lightingStatus = "<img src='/Images/lamp.png' />";
                            else if (lightingStatus == "شب بدون روشنایی کافی") lightingStatus = "<img src='/Images/moon.png' />";
                            var carCrashLocation = msg.d[i].CarCrashLocation;
                            if (carCrashLocation == "شانه") carCrashLocation = "<img src='/Images/shane.png' />";
                            else if (carCrashLocation == "رفوژ میانه‌رو") carCrashLocation = "<img src='/Images/rofoj-miyane-ro.png' />";
                            else if (carCrashLocation == "باند سواره‌رو") carCrashLocation = "<img src='/Images/bande-savare.png' />";
                            else if (carCrashLocation == "کنار جاده") carCrashLocation = "<img src='/Images/kenarjadeh-harim.png' />";
                            else if (carCrashLocation == "خارج از حریم جاده") carCrashLocation = "<img src='/Images/kharejazharimrah.png' />";
                            else if (carCrashLocation == "سایر") carCrashLocation = "<img src='/Images/other.png' />";
                            var finalReason = msg.d[i].FinalReason;
                            var lackOfAttention = msg.d[i].LackOfAttention;
                            if (finalReason == "تجاوز از سرعت مقرره") finalReason = "<img src='/Images/not-allow-speed.png' />";
                            else if (finalReason == "عدم توجه به جلو" && lackOfAttention == "خستگی و خواب آلودگی") finalReason = "<img src='/Images/sleepy.png' />";
                            else if (finalReason == "تغییر مسیر ناگهانی") finalReason = "<img src='/Images/taghirmasirnagahani.png' />";
                            else if (finalReason == "نقض ماده 4 قانون ایمنی راه ها") finalReason = "<img src='/Images/naghsemadeh4.png' />";
                            else if (finalReason == "نقص فنی مستمر وسیله نقلیه") finalReason = "<img src='/Images/naghsefanivasile.png' />";
                            else if (finalReason == "حرکت در خلاف جهت") finalReason = "<img src='/Images/harkatekhalafjahat.png' />";
                            else if (finalReason == "عبور از محل ممنوع") finalReason = "<img src='/Images/obormamno.png' />";
                            else if (finalReason == "انحراف به چپ") finalReason = "<img src='/Images/enherafbechap.png' />";
                            else if (finalReason == "عدم توجه به جلو") finalReason = "<img src='/Images/adametavajobejolo.png' />";
                            else if (finalReason == "عدم رعایت حق تقدم") finalReason = "<img src='/Images/adamhaghtaghaadom.png' />";
                            else if (finalReason == "عدم توانایی در کنترل نقلیه") finalReason = "<img src='/Images/natavanidarcontrolvasile.png' />";
                            else if (finalReason == "عدم رعایت فاصله طولی") finalReason = "<img src='/Images/adamrayatfaseletoli.png' />";
                            else if (finalReason == "سایر علل") finalReason = "<img src='/Images/other.png' />";
                            else finalReason = "<img src='/Images/other.png' />";
                            tableBody += '<tr><td>' + timeOfAccident + '</td><td>' + deadCount + '</td><td>' + injuredCount + '</td><td>' + typeOfCollision + '</td><td class="table-count-number">' + car + '</td><td class="table-count-number">' + bus + '</td><td class="table-count-number">' + navyBar + '</td><td class="table-count-number">' + motorCycle + '</td><td class="table-count-number">' + bike + '</td><td class="table-count-number">' + pedestrian + '</td><td>' + visualObstruction + '</td><td>' + roadDefects + '</td><td>' + lightingStatus + '</td><td>' + carCrashLocation + '</td><td>' + finalReason + '</td></tr>';
                        }
                        
                        $("#divShowDetails").show("fade");
                        $("#divShowHeatMapDetails").attr("disabled", "");
                        //$("#lnkGoToAccidentList").attr("href", "/Moderator/Event/AccidentList.aspx?ListId=" + getListId.slice(0, -1));
                        
                        //$("#lnkGoToAccidentList").attr("href", "/Moderator/Event/AccidentList.aspx?ListId=" + text);
                        var header = '<div class="row"><div class="col-6 text-start"><i class="fa fa-table fa-2x yellow"></i>&nbsp;<span class="table-head-text yellow">جدول داده تصادفات</span></div><div class="col-6 text-end"><a class="table-button-white" onclick="ShowGuide()"><i class="fa fa-info"></i>&nbsp;<span >راهنما</span></a>&nbsp;<a target="_blank" href="/Moderator/Event/AccidentList.aspx?ListId=' + text +' "lnkgotoaccidentlist" class="table-button-white"><i class="fa fa-file-text"></i>&nbsp;<span >اطلاعات خام</span></a>&nbsp;<a id="lnkconverttoimage" onclick="convertToImage()" class="table-button-white"><i class="fa fa-download"></i>&nbsp;<span >ذخیره جدول</span></a>&nbsp;<span class="spinner-border text-warning" role="status" style="display: none" id="spintblloading">< span class="sr-only" > loading...</span ></span>&nbsp;<a style="margin-left: -10px;margin-right: 10px"><i onclick="CloseDetails()" class="fa fa-times-circle fa-2x yellow"></i></a></div></div><table id="tbldetails" class="table table-responsive"><thead><tr><td><img src="/images/clock.png"/></td><td><img src="/images/dead.png"/></td><td><img src="/images/injured.png"/></td><td><img src="/images/carcrashed.png"/></td><td><img src="/images/car.png"/></td><td><img src="/images/bus.png"/></td><td><img src="/images/navybar.png"/></td><td><img src="/images/motor.png"/></td><td><img src="/images/bike.png"/></td><td><img src="/images/passer.png"/></td><td><img src="/images/vision.png"/></td><td><img src="/images/barrier.png"/></td><td><img src="/images/lightning.png"/></td><td><img src="/images/pin.png"/></td><td><img src="/images/question.png"/></td></tr></thead>';
                     $("#divShowDetails").html(header + starterBody + tableBody + closeTable);
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

    //    var getIsCircle;
    //    if (createLayer instanceof L.Circle) getIsCircle = true;
    //    //var tableHeadder = '<div></div>';
    //    var header = '<div class="row"><div class="col-6 text-start"><i class="fa fa-table fa-2x yellow"></i>&nbsp;<span class="table-head-text yellow">جدول داده تصادفات</span></div><div class="col-6 text-end"><a class="table-button-white" onclick="ShowGuide()"><i class="fa fa-info"></i>&nbsp;<span >راهنما</span></a>&nbsp;<a target="_blank" href="#" id="lnkGoToAccidentList" class="table-button-white"><i class="fa fa-file-text"></i>&nbsp;<span >اطلاعات خام</span></a>&nbsp;<a id="lnkConvertToImage" onclick="convertToImage()" class="table-button-white"><i class="fa fa-download"></i>&nbsp;<span >ذخیره جدول</span></a>&nbsp;<span class="spinner-border text-warning" role="status" style="display: none" id="spinTblLoading">< span class="sr-only" > Loading...</span ></span>&nbsp;<a style="margin-left: -10px;margin-right: 10px"><i onclick="CloseDetails()" class="fa fa-times-circle fa-2x yellow"></i></a></div></div><table id="tblDetails" class="table table-responsive"><thead><tr><td><img src="/Images/clock.png"/></td><td><img src="/Images/dead.png"/></td><td><img src="/Images/injured.png"/></td><td><img src="/Images/carcrashed.png"/></td><td><img src="/Images/car.png"/></td><td><img src="/Images/bus.png"/></td><td><img src="/Images/navybar.png"/></td><td><img src="/Images/motor.png"/></td><td><img src="/Images/bike.png"/></td><td><img src="/Images/passer.png"/></td><td><img src="/Images/vision.png"/></td><td><img src="/Images/barrier.png"/></td><td><img src="/Images/lightning.png"/></td><td><img src="/Images/pin.png"/></td><td><img src="/Images/question.png"/></td></tr></thead>';
    //    var starterBody = '<tbody>';
    //    var tableBody = "";
    //    var closeTable = "</tbody></table>'";
    //    var getListId = "";
    //    for (var i = 0; i < locations.length; i++) {
    //        var getId = locations[i][4];
    //        if (locations[i][0] == "" || locations[i][1] == "") continue;
    //        var latitude = parseFloat(locations[i][0]);
    //        var longitude = parseFloat(locations[i][1]);
    //        var pt1 = {
    //            "type": "Feature",
    //            "properties": {
    //                "marker-color": "#f00"
    //            },
    //            "geometry": {
    //                "type": "Point",
    //                "coordinates": [longitude, latitude]
    //            }
    //        };
    //        if (getIsCircle) {
    //            var radius = createLayer.getRadius(); //in meters
    //            var circleCenterPoint = createLayer.getLatLng();
    //            var getdis = circleCenterPoint.distanceTo([latitude, longitude]) <= radius;
    //            if (getdis) {
    //                getListId += getId + ",";
    //            }

    //        } else {
    //            var isInside1 = turf.booleanPointInPolygon(pt1, geojson);
    //            if (isInside1 == true) {
    //                getListId += getId + ",";
    //            }
    //        }
    //    }

    //    var obj = { "idList": getListId.slice(0, -1) }
    //    $('#spinSearchLoading').show();
    //    $.ajax({
    //        type: "POST",
    //        url: "HeatMap.aspx/GetHeatMapDetails",
    //        data: JSON.stringify(obj),
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (msg) {
    //            if (msg != null) {
    //                if (msg.d[0].TimeOfAccident == "-1") {
    //                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
    //                    $('#MessageModal').modal();
    //                } else {
    //                    console.log(msg.d)
    //                    for (i = 0; i < msg.d.length; i++) {
    //                        var timeOfAccident = msg.d[i].TimeOfAccident;
    //                        var injuredCount = CountImage(msg.d[i].InjuredCount);
    //                        var deadCount = CountImage(msg.d[i].DeadCount);
    //                        var collisionOfA = msg.d[i].CollisionOfA;
    //                        var collisionOfATwo = msg.d[i].CollisionOfATwo;
    //                        var typeOfCollision = msg.d[i].TypeOfCollision;
    //                        if (collisionOfA == "وسیله نقلیه" && (collisionOfATwo.indexOf("وسیله نقلیه") >= 0)) {
    //                            if (typeOfCollision == "برخورد زاویه‌ای") typeOfCollision = "<img src='/Images/angle-gray.png' />";
    //                            else if (typeOfCollision == "برخورد رخ به رخ") typeOfCollision = "<img src='/Images/head-on-gray.png' />";
    //                            else if (typeOfCollision == "برخورد پهلو به پهلو هم جهت") typeOfCollision = "<img src='/Images/sidewipe-sd-gray.png' />";
    //                            else if (typeOfCollision == "برخورد جلو به عقب") typeOfCollision = "<img src='/Images/rear-end-gray.png' />";
    //                            else if (typeOfCollision == "برخورد پهلو به پهلو غیر هم جهت") typeOfCollision = "<img src='/Images/sidewipe-od-gray.png' />";
    //                        }
    //                        else if (collisionOfATwo == "واژگونی و سقوط") typeOfCollision = "<img src='/Images/overthrowfall.png' />";
    //                        else if (collisionOfATwo == "شی ثابت") typeOfCollision = "<img src='/Images/fixedobject.png' />";
    //                        else if (collisionOfATwo == "خروج از جاده") typeOfCollision = "<img src='/Images/khorojazmasir.png' />";

    //                        var car = msg.d[i].Car;
    //                        car = car == "0" ? "" : car;
    //                        var bus = msg.d[i].Bus;
    //                        bus = bus == "0" ? "" : bus;
    //                        console.log(msg.d[i].Bus)
    //                        var navyBar = msg.d[i].NavyBar;
    //                        navyBar = navyBar == "0" ? "" : navyBar;
    //                        var motorCycle = msg.d[i].MotorCycle;
    //                        motorCycle = motorCycle == "0" ? "" : motorCycle;
    //                        var bike = msg.d[i].Bike;
    //                        bike = bike == "0" ? "" : bike;
    //                        var pedestrian = msg.d[i].Pedestrian;
    //                        pedestrian = pedestrian == "0" ? "" : pedestrian;
    //                        var visualObstruction = msg.d[i].VisualObstruction;
    //                        visualObstruction = visualObstruction == "ندارد" || visualObstruction == "" ? "" : "<i class='fa fa-circle gray'></i>";
    //                        var roadDefects = msg.d[i].RoadDefects;
    //                        roadDefects = roadDefects == "ندارد" || roadDefects == "" ? "" : "<i class='fa fa-circle gray'></i>";
    //                        var lightingStatus = msg.d[i].LightingStatus;
    //                        if (lightingStatus == "روز") lightingStatus = "<img src='/Images/sun.png' />";
    //                        else if (lightingStatus == "طلوع") lightingStatus = "<img src='/Images/rise.png' />";
    //                        else if (lightingStatus == "غروب") lightingStatus = "<img src='/Images/sunset.png' />";
    //                        else if (lightingStatus == "شب با روشنایی کافی") lightingStatus = "<img src='/Images/lamp.png' />";
    //                        else if (lightingStatus == "شب بدون روشنایی کافی") lightingStatus = "<img src='/Images/moon.png' />";
    //                        var carCrashLocation = msg.d[i].CarCrashLocation;
    //                        if (carCrashLocation == "شانه") carCrashLocation = "<img src='/Images/shane.png' />";
    //                        else if (carCrashLocation == "رفوژ میانه‌رو") carCrashLocation = "<img src='/Images/rofoj-miyane-ro.png' />";
    //                        else if (carCrashLocation == "باند سواره‌رو") carCrashLocation = "<img src='/Images/bande-savare.png' />";
    //                        else if (carCrashLocation == "کنار جاده") carCrashLocation = "<img src='/Images/kenarjadeh-harim.png' />";
    //                        else if (carCrashLocation == "خارج از حریم جاده") carCrashLocation = "<img src='/Images/kharejazharimrah.png' />";
    //                        else if (carCrashLocation == "سایر") carCrashLocation = "<img src='/Images/other.png' />";
    //                        var finalReason = msg.d[i].FinalReason;
    //                        var lackOfAttention = msg.d[i].LackOfAttention;
    //                        if (finalReason == "تجاوز از سرعت مقرره") finalReason = "<img src='/Images/not-allow-speed.png' />";
    //                        else if (finalReason == "عدم توجه به جلو" && lackOfAttention == "خستگی و خواب آلودگی") finalReason = "<img src='/Images/sleepy.png' />";
    //                        else if (finalReason == "تغییر مسیر ناگهانی") finalReason = "<img src='/Images/taghirmasirnagahani.png' />";
    //                        else if (finalReason == "نقض ماده 4 قانون ایمنی راه ها") finalReason = "<img src='/Images/naghsemadeh4.png' />";
    //                        else if (finalReason == "نقص فنی مستمر وسیله نقلیه") finalReason = "<img src='/Images/naghsefanivasile.png' />";
    //                        else if (finalReason == "حرکت در خلاف جهت") finalReason = "<img src='/Images/harkatekhalafjahat.png' />";
    //                        else if (finalReason == "عبور از محل ممنوع") finalReason = "<img src='/Images/obormamno.png' />";
    //                        else if (finalReason == "انحراف به چپ") finalReason = "<img src='/Images/enherafbechap.png' />";
    //                        else if (finalReason == "عدم توجه به جلو") finalReason = "<img src='/Images/adametavajobejolo.png' />";
    //                        else if (finalReason == "عدم رعایت حق تقدم") finalReason = "<img src='/Images/adamhaghtaghaadom.png' />";
    //                        else if (finalReason == "عدم توانایی در کنترل نقلیه") finalReason = "<img src='/Images/natavanidarcontrolvasile.png' />";
    //                        else if (finalReason == "عدم رعایت فاصله طولی") finalReason = "<img src='/Images/adamrayatfaseletoli.png' />";
    //                        else if (finalReason == "سایر علل") finalReason = "<img src='/Images/other.png' />";
    //                        else finalReason = "<img src='/Images/other.png' />";
    //                        tableBody += '<tr><td>' + timeOfAccident + '</td><td>' + deadCount + '</td><td>' + injuredCount + '</td><td>' + typeOfCollision + '</td><td class="table-count-number">' + car + '</td><td class="table-count-number">' + bus + '</td><td class="table-count-number">' + navyBar + '</td><td class="table-count-number">' + motorCycle + '</td><td class="table-count-number">' + bike + '</td><td class="table-count-number">' + pedestrian + '</td><td>' + visualObstruction + '</td><td>' + roadDefects + '</td><td>' + lightingStatus + '</td><td>' + carCrashLocation + '</td><td>' + finalReason + '</td></tr>';
    //                    }
    //                    $("#divShowDetails").html(header + starterBody + tableBody + closeTable);
    //                    $("#divShowDetails").show("fade");
    //                    $("#divShowHeatMapDetails").attr("disabled","");
    //                    $("#lnkGoToAccidentList").attr("href", "/Moderator/Event/AccidentList.aspx?ListId=" + getListId.slice(0, -1));
    //                }
    //            } else {
    //                alert("خطا در برقراری ارتباط با سرور!");
    //            }
    //        },
    //        complete: function () {
    //            $('#spinSearchLoading').hide();
    //        },
    //        error: function (response) {if (response.status == 401) location.reload();},failure: function (response) {
    //            alert(response.d);
    //        }
    //    });

    //});



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

    $('input[type=radio][name=rdoLocation]').on('change', function () {

        $("#divCity,#divAxis").show('slow');
        $("#cmbCity,#cmbAxis").show('slow');
        $('#divInNativeArea').show("slow");

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
    $(".filter").on('click', function () {
        $("#divTools").hide();
        $("#divNormalFilter").show();
        $(".filter").addClass("active");
        $(".tools").removeClass("active");
    });
    $(".tools").on('click', function () {
        $("#divNormalFilter,#divPerfesionalFilter").hide();
        $("#divTools").show();
        $(".tools").addClass("active");
        $(".filter").removeClass("active");
    });
});
function FillCity() {
    
}