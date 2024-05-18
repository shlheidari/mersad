
//let crash_source;
//let crash_vector;



var style1 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],
        scale: 1,
        src: "./placeholder11.png",
    }),
});

var style2 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],
        scale: 1,
        src: "./placeholder12.png",
    }),
});

var style3 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],
        scale: 1,
        src: "./placeholder13.png",
    }),
});

var style4 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],
        scale: 1,
        src: "./placeholder14.png",
    }),
});



var vectorSource = new ol.source.Vector({
    format: new ol.format.GeoJSON()
})

var pintvector = new ol.layer.Vector({
    title: 'b_layer',
    source: vectorSource,

    style: function (feature) {
        const type = feature.get("crashtype");
        switch (type) {
            case "1":
                return style1;
                break;
            case "2":
                return style2;
                break;
            case "3":
                return style3;
                break;
            default:
                return style4;
        }
},
});










var map = new ol.Map({
    view: new ol.View({
        center: [48.67750, 31.32562],
        projection: "EPSG:4326",
        zoom: 12,
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    /*    overlays: [overlay],*/
    target: 'map'
});


 







