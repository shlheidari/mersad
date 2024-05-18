//'//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//
var osmUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNoa2Fuc2F0YXJwb3VyIiwiYSI6ImNrdmp1bXlhaTA1aXkydW81eWF5bmwyejQifQ.j6er3HdjHOguoXgO4KbZ0w',
    osmAttrib = '',
    osm = L.tileLayer(osmUrl, {
        maxZoom: 22,
        maxNativeZoom: 19, attribution: osmAttrib
    }),
    map = new L.Map('map', {
        rotate: true, touchRotate: true, center: new L.LatLng(35.715298, 51.404343), zoom: 15,
        zoomControl: true
    }),
    drawnItems = L.featureGroup().addTo(map);
osm.addTo(map);
map.options.minZoom = 5;
map.setMaxBounds([[39.902994, 43.589165], [23.386632, 63.865367]]);

var options = {
    position: 'topright',
    edit: {

        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        }
    },
    draw: {
        title: 'منطقه مورد نظر را انتخاب کنید',
        polyline: false,
        rectangle: false,
        circle: false,
        marker: true,
        circlemarker: false,
        polygon: false
    }
};
//var startMarker = L.layerGroup();
var lc = L.control.locate({
    position: 'topright',
    setView: true,
    showCompass: true,
    icon: 'fa fa-crosshairs gray',
    locateOptions: { enableHighAccuracy: true },
    //layer: startMarker,
    //icon: 'icon-location',
    //iconLoading: 'icon-spinner  animate-spin',
    strings: {
        title: "نمایش مکان فعلی من"
    }, onLocationError: function () {
        alert("مشکلی در بدست آوردن موقعیت فعلی شما پیش آمده،لطفا دسترسی به لوکیشن را بررسی کنید!");
    }
}).addTo(map);
lc.stop();
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


//L.Control.geocoder({
//    position: 'bottomright',
//    collapsed: false,
//    placeholder: 'Search...',
//    defaultMarkGeocode: true,
//    geocoder: L.Control.Geocoder.mapbox('pk.eyJ1IjoiYXNoa2Fuc2F0YXJwb3VyIiwiYSI6ImNrdmp1bXlhaTA1aXkydW81eWF5bmwyejQifQ.j6er3HdjHOguoXgO4KbZ0w', {
//        geocodingQueryParams: {
//            country: 'us'
//        }
//    })
//}).addTo(map);
//var geocoder = L.Control.geocoder()
//    .on('markgeocode', function(event) {
//        var center = event.geocode.center;
//        L.marker(center).addTo(map);
//        map.setView(center, map.getZoom());
//    })
//    .addTo(map);
var drawControl = new L.Control.Draw(options);
map.addControl(drawControl);
map.on(L.Draw.Event.CREATED, function (event) {
    var type = event.layerType,
        layer = event.layer;
    console.log("type:" + type);
    if (type === 'marker') {
        if (map.getZoom() != 18) {
            map.setZoom(18);
            return;
        }
        var numItems = $('.leaflet-marker-pane').length;
        //console.log(numItems);
        if (numItems > 0) {
            $(".leaflet-marker-icon").remove();
            $(".leaflet-shadow-pane").remove();
            var stuSplit = L.latLng(layer.getLatLng());
            L.marker(stuSplit, { title: 'نقطه تصادف' }).addTo(map);
            map.setView(stuSplit, 20);
            $('#txtLocation').val(layer.getLatLng());
            var getLocation = $('#txtLocation').val().replaceAll("LatLng(", "").replaceAll(")", "").replaceAll(" ", "").split(',');
            var deg = convertDMS(getLocation[0], getLocation[1]);
            var spltEnter = deg.split('\n');
            //ParseDMS(spltEnter[0]);
            //ParseDMS(spltEnter[1]);
            $('#txtLatitude').val(spltEnter[0]);
            $('#txtLongitude').val(spltEnter[1]);
            //alert("امکان افزودن چند نقطه بر روی نقشه وجود ندارد!");
        } else {
            $('#txtLocation').val(layer.getLatLng());
            drawnItems.addLayer(layer);
            var getLoc = $('#txtLocation').val().replaceAll("LatLng(", "").replaceAll(")", "").replaceAll(" ", "").split(',');
            var deg2 = convertDMS(getLoc[0], getLoc[1]);
            var spltEnter2 = deg2.split('\n');
            $('#txtLatitude').val(spltEnter2[0]);
            $('#txtLongitude').val(spltEnter2[1]);
        }
    }
});
$('.leaflet-control-attribution').hide();
//map.on("draw:deleted", function (e) {
//    drawControl.setDrawingOptions({
//        marker: true
//    });
//    map.removeControl(drawControl);
//    map.addControl(drawControl);
//});
if ($("#txtLatitude").val() != "" && $("#txtLongitude").val() != "") {
    var stuSplit;
    if ($("#txtLatitude").val().indexOf(':') === -1) {
        var lat = parseFloat($("#txtLatitude").val());
        var lon = parseFloat($("#txtLongitude").val());
        $('#txtLocation').val(lat + "," + lon);
        stuSplit = L.latLng(lat, lon);
        var myMarker = L.marker(stuSplit,
            { title: 'نقطه تصادف' })
            .addTo(map);
    } else {
        var lat = ParseDMS($("#txtLatitude").val());
        var lon = ParseDMS($("#txtLongitude").val());
        $('#txtLocation').val(lat + "," + lon);
        stuSplit = L.latLng(lat, lon);
        var myMarker = L.marker(stuSplit,
            { title: 'نقطه تصادف' })
            .addTo(map);
    }
    map.setView(stuSplit, 20);
}
$("#txtLatitude,#txtLongitude").on('blur', function () {
    //var lat = $('#txtLatitude').val();
    //var lon = $('#txtLongitude').val();
    var lat = ParseDMS($("#txtLatitude").val());
    var lon = ParseDMS($("#txtLongitude").val());
    if (lat == "" || lon == "") return true;
    var getLat = parseFloat(lat);
    var getLon = parseFloat(lon);
    if (!!(getLat % 1) && !!(getLon % 1)) {
        $(".leaflet-marker-icon").remove();
        $(".leaflet-shadow-pane").remove();
        var stuSplit = L.latLng(getLat, getLon);
        L.marker(stuSplit, { title: 'نقطه تصادف' }).addTo(map);
        map.setView(stuSplit, 20);
        $('#txtLocation').val(stuSplit);
    }
    //else {
    //    alert("لوکیشن باید عدد اعشاری باشد!");
    //    //$("#lblMessage").html(CreateModal(msg.d[0].Message));
    //    //$('#MessageModal').modal();
    //}
});
var redmap = map
    .addControl(new MapboxGeocoder({
        autocomplete: true
    }));

//geocoder.query('Cologne', showMap);

//var RedLayer = L.mapbox.tileLayer('hoge6b01.kb0pcgai'),
//    PencilLayer = L.mapbox.tileLayer('examples.a4c252ab').addTo(redmap);

//var baseMaps = {
//    "Red": RedLayer,
//    "Pencil": PencilLayer
//};
////var latlng = L.latLng(50.5, 30.5);
//var geocoder = new MapboxGeocoder({
//    // Initialize the geocoder
//    accessToken: osmUrl.access_token, // Set the access token
//    mapboxgl: osmUrl, // Set the mapbox-gl instance
//    marker: true, // Do not use the default marker style
//    placeholder: 'Search for places in Berkeley', // Placeholder text for the search bar
//    //bbox: [-122.30937, 37.84214, -122.23715, 37.89838], // Boundary for Berkeley
//    //proximity: {
//    //    longitude: -122.25948,
//    //    latitude: 37.87221
//    //} // Coordinates of UC Berkeley
//});
//map.addControl(geocoder);
//var marker = L.marker(latlng, {
//    draggable: true,
//    autoPan: true
//}).addTo(map);
//var searchControl = new GeoSearch.GeoSearchControl({
//    //showMarker: false,
//    //maxMarkers: 1,
//    //autoClose: false,
//    //searchLabel: 'Enter address',
//    //marker: marker,
//    provider: new GeoSearch.OpenStreetMapProvider(), // required
//    //autoComplete: true, // optional: true|false  - default true
//    //autoCompleteDelay: 250, // optional: number      - default 250
//});
//map.addControl(searchControl);
//map.on('geosearch/showlocation', function() {
//    if (marker) {
//        map.removeControl(marker);
//    }
//});
//map.on('geosearch/showlocation',function () {
//    if (marker) {
//        map.removeControl(marker);
//    }
//// The marker class extends the layer class,
//// so you can search for it among the layers
//    map.eachLayer(function(layer) {
//        if (item == L.Marker) {
//            // Once you found it, set the properties
//            item.options.draggable = true;
//            item.options.autoPan = true;
//            // Then enable the dragging. Without this, it wont work
//            item.dragging.enable();
//        }
//    });
//});
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
    ////var dd = degrees + minutes / 60 + seconds / (60 * 60);
    //degrees = parseFloat(degrees);
    //minutes = parseFloat(minutes) || 0;
    //seconds = parseFloat(seconds) || 0;
    //var sign = degrees < 0 ? -1 : 1;
    //if (!inRange(minutes, 0, 60)) throw new Error('Minutes out of range');
    //if (!inRange(seconds, 0, 60)) throw new Error('Seconds out of range');
    //return (degrees + sign * minutes / 60 + sign * seconds / 3600);
    ////if (direction == "S" || direction == "W") {
    ////    dd = dd * -1;
    ////} // Don't do anything for N or E
    ////return dd;
}
function inRange(value, a, b) {
    return value >= a && value <= b;
}