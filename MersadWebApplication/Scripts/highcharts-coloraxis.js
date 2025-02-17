﻿/*
 Highcharts JS v10.0.0 (2022-03-07)

 ColorAxis module

 (c) 2012-2021 Pawel Potaczek

 License: www.highcharts.com/license
*/
(function (b) { "object" === typeof module && module.exports ? (b["default"] = b, module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/modules/color-axis", ["highcharts"], function (n) { b(n); b.Highcharts = n; return b }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (b) {
    function n(b, h, t, p) { b.hasOwnProperty(h) || (b[h] = p.apply(null, t), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: h, module: b[h] } }))) } b = b ? b._modules : {}; n(b,
    "Core/Axis/Color/ColorAxisComposition.js", [b["Core/Color/Color.js"], b["Core/Utilities.js"]], function (b, h) {
        var m = b.parse, p = h.addEvent, n = h.extend, y = h.merge, z = h.pick, r = h.splat, u; (function (b) {
            function h() { var c = this, a = this.options; this.colorAxis = []; a.colorAxis && (a.colorAxis = r(a.colorAxis), a.colorAxis.forEach(function (a, d) { a.index = d; new k(c, a) })) } function u(a) {
                var c = this, d = function (d) { d = a.allItems.indexOf(d); -1 !== d && (c.destroyItem(a.allItems[d]), a.allItems.splice(d, 1)) }, e = [], l, k; (this.chart.colorAxis ||
                []).forEach(function (a) { (l = a.options) && l.showInLegend && (l.dataClasses && l.visible ? e = e.concat(a.getDataClassLegendSymbols()) : l.visible && e.push(a), a.series.forEach(function (a) { if (!a.options.showInLegend || l.dataClasses) "point" === a.options.legendType ? a.points.forEach(function (a) { d(a) }) : d(a) })) }); for (k = e.length; k--;) a.allItems.unshift(e[k])
            } function t(a) { a.visible && a.item.legendColor && a.item.legendSymbol.attr({ fill: a.item.legendColor }) } function v() {
                var a = this.chart.colorAxis; a && a.forEach(function (a, d, c) {
                    a.update({},
                    c)
                })
            } function x() { (this.chart.colorAxis && this.chart.colorAxis.length || this.colorAttribs) && this.translateColors() } function q() { var a = this.axisTypes; a ? -1 === a.indexOf("colorAxis") && a.push("colorAxis") : this.axisTypes = ["colorAxis"] } function B(a) { var d = this, c = a ? "show" : "hide"; d.visible = d.options.visible = !!a;["graphic", "dataLabel"].forEach(function (a) { if (d[a]) d[a][c]() }); this.series.buildKDTree() } function f() {
                var a = this, d = this.options.nullColor, c = this.colorAxis, e = this.colorKey; (this.data.length ? this.data :
                this.points).forEach(function (k) { var f = k.getNestedProperty(e); (f = k.options.color || (k.isNull || null === k.value ? d : c && "undefined" !== typeof f ? c.toColor(f, k) : k.color || a.color)) && k.color !== f && (k.color = f, "point" === a.options.legendType && k.legendItem && a.chart.legend.colorizeItem(k, k.visible)) })
            } function a(a) {
                var d = a.prototype.createAxis; a.prototype.createAxis = function (a, c) {
                    if ("colorAxis" !== a) return d.apply(this, arguments); var e = new k(this, y(c.axis, { index: this[a].length, isX: !1 })); this.isDirtyLegend = !0; this.axes.forEach(function (a) {
                        a.series =
                        []
                    }); this.series.forEach(function (a) { a.bindAxes(); a.isDirtyData = !0 }); z(c.redraw, !0) && this.redraw(c.animation); return e
                }
            } function d() { this.elem.attr("fill", m(this.start).tweenTo(m(this.end), this.pos), void 0, !0) } function e() { this.elem.attr("stroke", m(this.start).tweenTo(m(this.end), this.pos), void 0, !0) } var c = [], k; b.compose = function (l, g, b, w, m) {
                k || (k = l); -1 === c.indexOf(g) && (c.push(g), l = g.prototype, l.collectionsWithUpdate.push("colorAxis"), l.collectionsWithInit.colorAxis = [l.addColorAxis], p(g, "afterGetAxes",
                h), a(g)); -1 === c.indexOf(b) && (c.push(b), g = b.prototype, g.fillSetter = d, g.strokeSetter = e); -1 === c.indexOf(w) && (c.push(w), p(w, "afterGetAllItems", u), p(w, "afterColorizeItem", t), p(w, "afterUpdate", v)); -1 === c.indexOf(m) && (c.push(m), n(m.prototype, { optionalAxis: "colorAxis", translateColors: f }), n(m.prototype.pointClass.prototype, { setVisible: B }), p(m, "afterTranslate", x), p(m, "bindAxes", q))
            }; b.pointSetVisible = B
        })(u || (u = {})); return u
    }); n(b, "Core/Axis/Color/ColorAxisDefaults.js", [], function () {
        return {
            lineWidth: 0, minPadding: 0,
            maxPadding: 0, gridLineWidth: 1, tickPixelInterval: 72, startOnTick: !0, endOnTick: !0, offset: 0, marker: { animation: { duration: 50 }, width: .01, color: "#999999" }, labels: { overflow: "justify", rotation: 0 }, minColor: "#e6ebf5", maxColor: "#003399", tickLength: 5, showInLegend: !0
        }
    }); n(b, "Core/Axis/Color/ColorAxis.js", [b["Core/Axis/Axis.js"], b["Core/Color/Color.js"], b["Core/Axis/Color/ColorAxisComposition.js"], b["Core/Axis/Color/ColorAxisDefaults.js"], b["Core/Globals.js"], b["Core/Legend/LegendSymbol.js"], b["Core/Series/SeriesRegistry.js"],
    b["Core/Utilities.js"]], function (b, h, n, p, C, y, z, r) {
        var m = this && this.__extends || function () { var b = function (f, a) { b = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, e) { a.__proto__ = e } || function (a, e) { for (var c in e) e.hasOwnProperty(c) && (a[c] = e[c]) }; return b(f, a) }; return function (f, a) { function d() { this.constructor = f } b(f, a); f.prototype = null === a ? Object.create(a) : (d.prototype = a.prototype, new d) } }(), v = h.parse, t = C.noop, A = z.series, D = r.extend, E = r.isNumber, x = r.merge, q = r.pick; h = function (b) {
            function f(a,
            d) { var e = b.call(this, a, d) || this; e.beforePadding = !1; e.chart = void 0; e.coll = "colorAxis"; e.dataClasses = void 0; e.legendItem = void 0; e.legendItems = void 0; e.name = ""; e.options = void 0; e.stops = void 0; e.visible = !0; e.init(a, d); return e } m(f, b); f.compose = function (a, d, e, c) { n.compose(f, a, d, e, c) }; f.prototype.init = function (a, d) {
                var e = a.options.legend || {}, c = d.layout ? "vertical" !== d.layout : "vertical" !== e.layout, k = d.visible; e = x(f.defaultColorAxisOptions, d, { showEmpty: !1, title: null, visible: e.enabled && !1 !== k }); this.coll = "colorAxis";
                this.side = d.side || c ? 2 : 1; this.reversed = d.reversed || !c; this.opposite = !c; b.prototype.init.call(this, a, e); this.userOptions.visible = k; d.dataClasses && this.initDataClasses(d); this.initStops(); this.horiz = c; this.zoomEnabled = !1
            }; f.prototype.initDataClasses = function (a) {
                var d = this.chart, e = this.options, c = a.dataClasses.length, k, b = 0, f = d.options.chart.colorCount; this.dataClasses = k = []; this.legendItems = []; (a.dataClasses || []).forEach(function (a, g) {
                    a = x(a); k.push(a); if (d.styledMode || !a.color) "category" === e.dataClassColor ?
                    (d.styledMode || (g = d.options.colors, f = g.length, a.color = g[b]), a.colorIndex = b, b++, b === f && (b = 0)) : a.color = v(e.minColor).tweenTo(v(e.maxColor), 2 > c ? .5 : g / (c - 1))
                })
            }; f.prototype.hasData = function () { return !!(this.tickPositions || []).length }; f.prototype.setTickPositions = function () { if (!this.dataClasses) return b.prototype.setTickPositions.call(this) }; f.prototype.initStops = function () { this.stops = this.options.stops || [[0, this.options.minColor], [1, this.options.maxColor]]; this.stops.forEach(function (a) { a.color = v(a[1]) }) };
            f.prototype.setOptions = function (a) { b.prototype.setOptions.call(this, a); this.options.crosshair = this.options.marker }; f.prototype.setAxisSize = function () { var a = this.legendSymbol, d = this.chart, e = d.options.legend || {}, c, b; a ? (this.left = e = a.attr("x"), this.top = c = a.attr("y"), this.width = b = a.attr("width"), this.height = a = a.attr("height"), this.right = d.chartWidth - e - b, this.bottom = d.chartHeight - c - a, this.len = this.horiz ? b : a, this.pos = this.horiz ? e : c) : this.len = (this.horiz ? e.symbolWidth : e.symbolHeight) || f.defaultLegendLength };
            f.prototype.normalizedValue = function (a) { this.logarithmic && (a = this.logarithmic.log2lin(a)); return 1 - (this.max - a) / (this.max - this.min || 1) }; f.prototype.toColor = function (a, d) {
                var e = this.dataClasses, c = this.stops, b; if (e) for (b = e.length; b--;) { var f = e[b]; var g = f.from; c = f.to; if (("undefined" === typeof g || a >= g) && ("undefined" === typeof c || a <= c)) { var h = f.color; d && (d.dataClass = b, d.colorIndex = f.colorIndex); break } } else {
                    a = this.normalizedValue(a); for (b = c.length; b-- && !(a > c[b][0]) ;); g = c[b] || c[b + 1]; c = c[b + 1] || g; a = 1 - (c[0] -
                    a) / (c[0] - g[0] || 1); h = g.color.tweenTo(c.color, a)
                } return h
            }; f.prototype.getOffset = function () { var a = this.legendGroup, d = this.chart.axisOffset[this.side]; if (a) { this.axisParent = a; b.prototype.getOffset.call(this); var e = this.chart.legend; e.allItems.forEach(function (a) { a instanceof f && a.drawLegendSymbol(e, a) }); e.render(); this.chart.getMargins(!0); this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width); this.chart.axisOffset[this.side] = d } }; f.prototype.setLegendColor = function () {
                var a = this.reversed,
                d = a ? 1 : 0; a = a ? 0 : 1; d = this.horiz ? [d, 0, a, 0] : [0, a, 0, d]; this.legendColor = { linearGradient: { x1: d[0], y1: d[1], x2: d[2], y2: d[3] }, stops: this.stops }
            }; f.prototype.drawLegendSymbol = function (a, d) {
                var e = a.padding, c = a.options, b = this.horiz, l = q(c.symbolWidth, b ? f.defaultLegendLength : 12), g = q(c.symbolHeight, b ? 12 : f.defaultLegendLength), h = q(c.labelPadding, b ? 16 : 30); c = q(c.itemDistance, 10); this.setLegendColor(); d.legendSymbol || (d.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, l, g).attr({ zIndex: 1 }).add(d.legendGroup)); this.legendItemWidth =
                l + e + (b ? c : this.options.labels.x + this.maxLabelLength); this.legendItemHeight = g + e + (b ? h : 0)
            }; f.prototype.setState = function (a) { this.series.forEach(function (d) { d.setState(a) }) }; f.prototype.setVisible = function () { }; f.prototype.getSeriesExtremes = function () {
                var a = this.series, d = a.length, b; this.dataMin = Infinity; for (this.dataMax = -Infinity; d--;) {
                    var c = a[d]; var f = c.colorKey = q(c.options.colorKey, c.colorKey, c.pointValKey, c.zoneAxis, "y"); var l = c.pointArrayMap; var g = c[f + "Min"] && c[f + "Max"]; if (c[f + "Data"]) var h = c[f + "Data"];
                    else if (l) { h = []; l = l.indexOf(f); var m = c.yData; if (0 <= l && m) for (b = 0; b < m.length; b++) h.push(q(m[b][l], m[b])) } else h = c.yData; g ? (c.minColorValue = c[f + "Min"], c.maxColorValue = c[f + "Max"]) : (h = A.prototype.getExtremes.call(c, h), c.minColorValue = h.dataMin, c.maxColorValue = h.dataMax); "undefined" !== typeof c.minColorValue && (this.dataMin = Math.min(this.dataMin, c.minColorValue), this.dataMax = Math.max(this.dataMax, c.maxColorValue)); g || A.prototype.applyExtremes.call(c)
                }
            }; f.prototype.drawCrosshair = function (a, d) {
                var e = d && d.plotX,
                c = d && d.plotY, f = this.pos, h = this.len; if (d) { var g = this.toPixels(d.getNestedProperty(d.series.colorKey)); g < f ? g = f - 2 : g > f + h && (g = f + h + 2); d.plotX = g; d.plotY = this.len - g; b.prototype.drawCrosshair.call(this, a, d); d.plotX = e; d.plotY = c; this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, this.chart.styledMode || "object" !== typeof this.crosshair || this.cross.attr({ fill: this.crosshair.color })) }
            }; f.prototype.getPlotLinePath =
            function (a) { var d = this.left, e = a.translatedValue, c = this.top; return E(e) ? this.horiz ? [["M", e - 4, c - 6], ["L", e + 4, c - 6], ["L", e, c], ["Z"]] : [["M", d, e], ["L", d - 6, e + 6], ["L", d - 6, e - 6], ["Z"]] : b.prototype.getPlotLinePath.call(this, a) }; f.prototype.update = function (a, d) { var e = this.chart.legend; this.series.forEach(function (a) { a.isDirtyData = !0 }); (a.dataClasses && e.allItems || this.dataClasses) && this.destroyItems(); b.prototype.update.call(this, a, d); this.legendItem && (this.setLegendColor(), e.colorizeItem(this, !0)) }; f.prototype.destroyItems =
            function () { var a = this.chart; this.legendItem ? a.legend.destroyItem(this) : this.legendItems && this.legendItems.forEach(function (d) { a.legend.destroyItem(d) }); a.isDirtyLegend = !0 }; f.prototype.destroy = function () { this.chart.isDirtyLegend = !0; this.destroyItems(); b.prototype.destroy.apply(this, [].slice.call(arguments)) }; f.prototype.remove = function (a) { this.destroyItems(); b.prototype.remove.call(this, a) }; f.prototype.getDataClassLegendSymbols = function () {
                var a = this, d = a.chart, b = a.legendItems, c = d.options.legend, f = c.valueDecimals,
                h = c.valueSuffix || "", g; b.length || a.dataClasses.forEach(function (c, e) {
                    var k = c.from, m = c.to, l = d.numberFormatter, n = !0; g = ""; "undefined" === typeof k ? g = "< " : "undefined" === typeof m && (g = "> "); "undefined" !== typeof k && (g += l(k, f) + h); "undefined" !== typeof k && "undefined" !== typeof m && (g += " - "); "undefined" !== typeof m && (g += l(m, f) + h); b.push(D({
                        chart: d, name: g, options: {}, drawLegendSymbol: y.drawRectangle, visible: !0, setState: t, isDataClass: !0, setVisible: function () {
                            n = a.visible = !n; a.series.forEach(function (a) {
                                a.points.forEach(function (a) {
                                    a.dataClass ===
                                    e && a.setVisible(n)
                                })
                            }); d.legend.colorizeItem(this, n)
                        }
                    }, c))
                }); return b
            }; f.defaultColorAxisOptions = p; f.defaultLegendLength = 200; f.keepProps = ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"]; return f
        }(b); Array.prototype.push.apply(b.keepProps, h.keepProps); ""; return h
    }); n(b, "masters/modules/coloraxis.src.js", [b["Core/Globals.js"], b["Core/Axis/Color/ColorAxis.js"]], function (b, h) { b.ColorAxis = h; h.compose(b.Chart, b.Fx, b.Legend, b.Series) })
});
//# sourceMappingURL=coloraxis.js.map