﻿//useGeographic();

//var source = new VectorSource({
//    url: '../Geo/Iran-City.geojson',
//    format: new GeoJSON(),
//});
var map = new ol.Map({
    target: 'map',
    layers: [
      new TileLayer({
          source: new OSM(),
      }),
      new VectorLayer({
          source: source,
      }),
    ],
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});
//const map = new Map({
//    target: 'map',
//    layers: [
//      new TileLayer({
//          source: new OSM(),
//      }),
//      new VectorLayer({
//          source: source,
//      }),
//    ],
//    view: new View({
//        center: [0, 0],
//        zoom: 2,
//    }),
//});

var select = new Select();

var modify = new Modify({
    features: select.getFeatures(),
});

var draw = new Draw({
    type: 'Polygon',
    source: source,
});

var snap = new Snap({
    source: source,
});

function removeInteractions() {
    map.removeInteraction(modify);
    map.removeInteraction(select);
    map.removeInteraction(draw);
    map.removeInteraction(select);
}

var mode = document.getElementById('mode');
function onChange() {
    removeInteractions();
    switch (mode.value) {
        case 'draw': {
            map.addInteraction(draw);
            map.addInteraction(snap);
            break;
        }
        case 'modify': {
            map.addInteraction(select);
            map.addInteraction(modify);
            map.addInteraction(snap);
            break;
        }
        default: {
            // pass
        }
    }
}
mode.addEventListener('change', onChange);
onChange();