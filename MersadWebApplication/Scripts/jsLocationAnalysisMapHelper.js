var osmUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNoa2Fuc2F0YXJwb3VyIiwiYSI6ImNrdmp1bXlhaTA1aXkydW81eWF5bmwyejQifQ.j6er3HdjHOguoXgO4KbZ0w',
    osmAttrib = '',
    osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
    map = new L.Map('map', { rotate: true, touchRotate: true, center: new L.LatLng(35.715298, 51.404343), zoom: 13, zoomControl: false }),
    drawnItems = L.featureGroup().addTo(map);
osm.addTo(map);
var options = {
    position: 'topright',
    edit: {

        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        }
    },
    draw: {
        title: 'منطقه مورد نظر را ترسیم کنید',
        polyline: false,
        rectangle: true,
        circle: false,
        marker: false,
        circlemarker: false,
        polygon: {
            allowIntersection: false,
            showArea: true,
            shapeOptions: {
                color: "#ff003b"
            }
        }
    }
};
function polystyle(feature) {
    return {
        fillColor: '#ff003b',
        weight: 2,
        opacity: 1,
        color: '#D0243D',  //Outline color
        fillOpacity: 0
    };
}
function polyStyleAnalysis() {
    return {
        fillColor: "#ffcc00",
        weight: 2,
        opacity: 0,
        color: "#ffcc00",
        fillOpacity: 0.5
    };
}
function getColorForMap(city) {
    $.getJSON("/Geo/Khozestan/" + city + ".txt", function (data) {
        let dataLayer = L.geoJson(data, { style: polyStyleAnalysis() }, {
            onEachFeature: function (feature, featureLayer) {
                featureLayer.bindPopup(feature.properties.NAME_1);
            }
        }).addTo(map);
        map.fitBounds(dataLayer.getBounds());
    });
}
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
$('.leaflet-control-attribution').hide();