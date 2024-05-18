import Map from 'http://localhost:12839/Scripts/ol/Map.js';
import View from 'http://localhost:12839/Scripts/ol/View.js';
import TileLayer from 'http://localhost:12839/Scripts/ol/layer/Tile.js';
import XYZ from 'http://localhost:12839/Scripts/ol/source/XYZ.js';

var map = new Map({
    layers: [
      new TileLayer({
          source: new OSM(),
      }) ],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});