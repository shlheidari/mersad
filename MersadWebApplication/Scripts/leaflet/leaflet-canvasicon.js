(function () {
    'use strict';
    L.CanvasIcon = L.Icon.extend({
        options: {
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            drawIcon: null,
            className: 'leaflet-canvas-icon'
        },
        createIcon: function (icon) {
            var size = L.point(this.options.iconSize);
            if (!icon || (icon.tagName != 'CANVAS')) {
                icon = document.createElement('canvas');
            }
            icon.width = size.x;
            icon.height = size.y;
            this._setIconStyles(icon, 'icon');
            return icon;
        },
        createShadow: function (icon) {
            return null;
        },
        _setIconStyles: function (icon, type) {
            if (typeof this.options.drawIcon == 'function') {
                this.options.drawIcon.apply(this, arguments);
            }
            L.Icon.prototype._setIconStyles.apply(this, arguments);
        }
    });
    L.canvasIcon = function (options) {
        return new L.CanvasIcon(options);
    };
    if ((typeof define == 'function') && define.amd) {
        define(L.CanvasIcon);
    }
})();