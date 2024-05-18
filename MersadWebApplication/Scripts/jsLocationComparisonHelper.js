function openDateRange() {
    let btn = document.getElementById("dateDateRange");
    btn.click(); event.preventDefault();
}
function pageLoad() {
    $("#cmbProvinceSearch").select2({
        placeholder: {
            id: "-1",
            text: "سطح استانی"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbCity").select2({
        placeholder: {
            id: "-1",
            text: "انتخاب شهرستان"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbMonth").select2({
        placeholder: {
            id: "-1",
            text: "نمایش بر اساس ماه"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $("#cmbCollisionOfATwo").select2({
        placeholder: {
            id: "-1",
            text: "نوع برخورد"
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
            text: "وضعیت جوی"
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
        //groupId: 'group1',
        rangeSelector: true
    });
    $("#lnkLocationComparison").addClass("active");
}
function CapLen(val) {
    let min = 30;
    let max = 400;
    if (val.length == 0) $("#divAutoGenerateChart").css("height", "0");
    for (let i = 0; i < val.length; i++) {
        if (min > max) {
            $("#divAutoGenerateChart").css("height", max + "px");
            return;
        }
        min = min + 20;
    }
    $("#divAutoGenerateChart").css("height", min + "px");
}
let dataCityLayer, dataProvinceLayer;
let ChartHighchart;
var easeOutBounce = function (pos) {
    if ((pos) < (1 / 2.75)) {
        return (7.5625 * pos * pos);
    }
    if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
    }
    if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
    }
    return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
};

Math.easeOutBounce = easeOutBounce;
function HighchartWith1(color1, arrayVal, cap1) {
    if (ChartHighchart) ChartHighchart.destroy();
    if ($("#divAutoGenerateChart").html() != "") $("#divAutoGenerateChart").html("");
    let colors = [color1];
    let arrVal1 = [];
    //let dataSum = arrayVal.reduce((a, b) => a + b, 0);
    for (i = 0; i < arrayVal.length; i++) {
        arrVal1.push(arrayVal[i] * 100);
    }
    CapLen(arrayVal);
    ChartHighchart = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'bar',
            renderTo: "divAutoGenerateChart",
            style: {
                fontFamily: 'IRANSans'
            },
            animation: {
                duration: 1000,
                //easing: easeOutBounce
            },
            ignoreHiddenSeries: true,
            events: {
                load: function () {
                    let series = this.series,
                        newPoints,
                        newSeriesPoints = [],
                        each = Highcharts.each;

                    each(series, function (s, index) {
                        newPoints = [];
                        each(s.points, function (point, i) {
                            point.update({
                                name: cap1[i]
                            }, false);
                            newPoints.push({
                                x: point.x,
                                y: point.y,
                                name: point.name
                            });
                        });
                        newSeriesPoints.push(newPoints);
                    });
                    this.redraw();
                    setTimeout(function () {
                        Filter1ChartBar(newSeriesPoints, each, ChartHighchart);
                    }, 1000);
                    
                },
            }
            //margin: [0, 0, 0, 0]
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        legend: { enabled: false },
        credits: {
            enabled: false
        },
        colors: colors,
        xAxis: {
            opposite: true,
            enabled: true,
            gridLineWidth: 0,
            tickInterval: 1,
            type: 'category',
            tickWidth: 0,
            tickLength: 0,
            minorTickLength: 0,
            lineColor: 'transparent',
            gridLineColor: 'transparent',
            labels: {
                animation: {
                    duration: 1000,
                    //easing: easeOutBounce
                },
                animate: true
            }
        },
        yAxis: {
            visible: false,
            reversed: true,
            min: 0,
            max: 100,
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<table style="direction:rtl">' + '<tr><th>عنوان : </th><td>' + "نرخ متوفیان" + ' - ' + 'درصد : ' + this.y + ' % ' + '</td></tr></table>';
            },
            followPointer: true,
            style: {
                zIndex: 100
            }
        },
        plotOptions: {
            bar: {
                stacking: 'normal'
            },
            series: {
                groupPadding: 0
            }
        },
        series: [{ pointWidth: 15, name: cap1, data: arrVal1 }]
    });
}
function HighchartWith2(color1, color2, val1, val2, cap1, cap2, catnm) {
    if (ChartHighchart) ChartHighchart.destroy();
    if ($("#divAutoGenerateChart").html() != "") $("#divAutoGenerateChart").html("");
    CapLen(val1);
    let colors = [color1, color2];
    let dataSum1;
    let arrVal1 = [], arrVal2 = [];
    for (let i = 0; i < val1.length; i++) {
        dataSum1 = val1[i] + val2[i];
        arrVal1.push(val1[i] / dataSum1 * 100);
        arrVal2.push(val2[i] / dataSum1 * 100);
    }
    ChartHighchart = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'bar',
            renderTo: "divAutoGenerateChart",
            style: {
                fontFamily: 'IRANSans'
            },
            animation: {
                duration: 1000
            },
            ignoreHiddenSeries: true,
            events: {
                load: function () {
                    let series = this.series,
                        newPoints,
                        newSeriesPoints = [],
                        each = Highcharts.each;

                    each(series, function (s, index) {
                        newPoints = [];
                        each(s.points, function (point, i) {
                            point.update({
                                name: catnm[i]
                            }, false);
                            newPoints.push({
                                x: point.x,
                                y: point.y,
                                name: point.name
                            });
                        });
                        newSeriesPoints.push(newPoints);
                    });
                    this.redraw();
                    $('input[type=radio][name=rdoFilLocationLandUse]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoFilLocationLandUse]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "FilterResidential") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "FilterNonResidential") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "All") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });
                    $('input[type=radio][name=rdoFilVisualObstruction]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoFilVisualObstruction]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "FilterHasObstruction") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "FilterHasNotObstruction")
                            Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "All") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });
                    $('input[type=radio][name=rdoFilRoadDefects]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoFilRoadDefects]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "FilterHasRoadDefects") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "FilterHasNotRoadDefects")
                            Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "All") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });
                    $('input[type=radio][name=rdoExistsNotExists]').on('change', function () {
                        let getVal = $('input[type=radio][name=rdoAccident]:checked').val();
                        let geRadio = $('input[type=radio][name=rdoExistsNotExists]:checked');
                        let getType = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "Car" || getVal == "Motorcycle" || getVal == "Pedestrian" || getVal == "NavyBar" || getVal == "NavyPassenger") {
                            if (getType == "Exists") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                            else if (getType == "NotExists") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                            else if (getType == "All")
                                Filter2ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                        }
                    });
                    $('input[type=radio][name=rdoIsLocal]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoIsLocal]:checked');
                        let getType = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getType == "NativeLicensePlate") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getType == "NonNativeLicensePlate")
                            Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getType == "All") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });
                    $('input[type=radio][name=rdoSafetyBelt]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoSafetyBelt]:checked');
                        let getType = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getType == "UseBelt") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getType == "NonUseBelt") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getType == "All") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });
                    $('input[type=radio][name=rdoHelmet]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoHelmet]:checked');
                        let getType = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getType == "UseHelmet") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getType == "NonUseHelmet") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getType == "All") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });
                    $('input[type=radio][name=rdoGetHoliday]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoGetHoliday]:checked');
                        let getType = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getType == "Holidays") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getType == "NonHolidays") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getType == "All") Filter2ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });
                }
            }
            //margin: [0, 0, 0, 0]
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        legend: { enabled: false },
        credits: {
            enabled: false
        },
        colors: colors,
        xAxis: {
            opposite: true,
            enabled: true,
            gridLineWidth: 0,
            tickInterval: 1,
            type: 'category',
            tickWidth: 0,
            tickLength: 0,
            minorTickLength: 0,
            lineColor: 'transparent',
            gridLineColor: 'transparent',
            labels: {
                animation: {
                    duration: 1000
                },
                animate: true
            }
        },
        yAxis: {
            visible: false,
            reversed: true,
            min: 0,
            max: 100,
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<table style="direction:rtl">' + '<tr><th>عنوان : </th><td>' + this.series.name + ' - ' + 'درصد : ' + this.y + ' % ' + '</td></tr></table>';
            },
            followPointer: true,
            style: {
                zIndex: 100
            }
        },
        plotOptions: {
            bar: {
                stacking: 'normal'
            },
            series: {
                groupPadding: 0
            }
        },
        series: [{ pointWidth: 15, name: cap1, data: arrVal1 }, { pointWidth: 15, name: cap2, data: arrVal2}]
    });
}
function HighchartWith3(color1, color2, color3, val1, val2, val3, cap1, cap2, cap3, catnm) {
    if (ChartHighchart) ChartHighchart.destroy();
    if ($("#divAutoGenerateChart").html() != "") $("#divAutoGenerateChart").html("");
    CapLen(val1);
    //let autoSeries1 = GenerateSplitSeries(val1, cap1);
    let dataSum1;
    let arrVal1 = [], arrVal2 = [], arrVal3 = [];
    for (let i = 0; i < val1.length; i++) {
        dataSum1 = val1[i] + val2[i] + val3[i];
        arrVal1.push(val1[i] / dataSum1 * 100);
        arrVal2.push(val2[i] / dataSum1 * 100);
        arrVal3.push(val3[i] / dataSum1 * 100);
    }
    let colors = [color1, color2, color3];
    ChartHighchart = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'bar',
            renderTo: "divAutoGenerateChart",
            style: {
                fontFamily: 'IRANSans'
            },
            animation: {
                duration: 1000
            },
            ignoreHiddenSeries: true,
            events: {
                load: function () {
                    let series = this.series,
                        newPoints,
                        newSeriesPoints = [],
                        each = Highcharts.each;

                    each(series, function (s, index) {
                        newPoints = [];
                        each(s.points, function (point, i) {
                            point.update({
                                name: catnm[i]
                            }, false);
                            newPoints.push({
                                x: point.x,
                                y: point.y,
                                name: point.name
                            });
                        });
                        newSeriesPoints.push(newPoints);
                    });
                    this.redraw();
                    
                    $('input[type=radio][name=rdoFilAccidentStatistics]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoFilAccidentStatistics]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "FilterDead") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "FilterInjured") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "FilterDamaged") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, 2, getLabel);
                        else if (getVal == "All") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, -1,"کل تصادفات");
                    });
                    $('input[type=radio][name=rdoFilTypeRoad]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoFilTypeRoad]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "FilterVillage") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "FilterSubsidiary") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "FilterMain") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, 2, getLabel);
                        else if (getVal == "All") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });
                    $('input[type=radio][name=rdoCollSingleVehicle]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoCollSingleVehicle]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "OutOfRoad") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "OverthrowFall") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "CrashWithFixedObject") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, 2, getLabel);
                        else if (getVal == "All") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });
                    $('input[type=radio][name=rdoLoadType]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoLoadType]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "Dangerous") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "Fuel") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "Other") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, 2, getLabel);
                        else if (getVal == "All") Filter3ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });
                }
            }
            //margin: [0, 0, 0, 0]
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        legend: { enabled: false },
        credits: {
            enabled: false
        },
        colors: colors,
        xAxis: {
            opposite: true,
            enabled: true,
            gridLineWidth: 0,
            tickInterval: 1,
            type: 'category',
            tickWidth: 0,
            tickLength: 0,
            minorTickLength: 0,
            lineColor: 'transparent',
            gridLineColor: 'transparent',
            labels: {
                animation: {
                    duration: 1000
                },
                animate: true
            }
        },
        yAxis: {
            visible: false,
            reversed: true,
            min: 0,
            max: 100,
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<table style="direction:rtl">' + '<tr><th>عنوان : </th><td>' + this.series.name + ' - ' + 'درصد : ' + this.y + ' % ' + '</td></tr></table>';
            },
            followPointer: true,
            style: {
                zIndex: 100
            }
        },
        plotOptions: {
            bar: {
                stacking: 'normal'
            },
            series: {
                groupPadding: 0
            }
        },
        series: [{ pointHeight: 15, name: cap1, data: arrVal1 }, { pointHeight: 15, name: cap2, data: arrVal2}, { pointHeight: 15, name: cap3, data: arrVal3 }]
    });
}
function HighchartWith4(color1, color2, color3, color4, val1, val2, val3, val4, cap1, cap2, cap3, cap4, catnm) {
    if (ChartHighchart) ChartHighchart.destroy();
    if ($("#divAutoGenerateChart").html() != "") $("#divAutoGenerateChart").html("");
    CapLen(val1);
    let dataSum1;
    let arrVal1 = [], arrVal2 = [], arrVal3 = [], arrVal4 = [];
    for (let i = 0; i < val1.length; i++) {
        dataSum1 = val1[i] + val2[i] + val3[i] + val4[i];
        arrVal1.push(val1[i] / dataSum1 * 100);
        arrVal2.push(val2[i] / dataSum1 * 100);
        arrVal3.push(val3[i] / dataSum1 * 100);
        arrVal4.push(val4[i] / dataSum1 * 100);
    }
    let colors = [color1, color2, color3, color4];
    ChartHighchart = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'bar',
            renderTo: "divAutoGenerateChart",
            style: {
                fontFamily: 'IRANSans'
            },
            animation: {
                duration: 1000
            },
            ignoreHiddenSeries: true,
            events: {
                load: function () {
                    let series = this.series,
                        newPoints,
                        newSeriesPoints = [],
                        each = Highcharts.each;

                    each(series, function (s, index) {
                        newPoints = [];
                        each(s.points, function (point, i) {
                            point.update({
                                name: catnm[i]
                            }, false);
                            newPoints.push({
                                x: point.x,
                                y: point.y,
                                name: point.name
                            });
                        });
                        newSeriesPoints.push(newPoints);
                    });
                    this.redraw();
                    $('input[type=radio][name=rdoMotorAge]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoMotorAge]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "LessThan18") Filter4ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "MotorAge18") Filter4ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "MotorAge30") Filter4ChartBar(newSeriesPoints, each, ChartHighchart, 2, getLabel);
                        else if (getVal == "MotorAge60") Filter4ChartBar(newSeriesPoints, each, ChartHighchart, 3, getLabel);
                        else if (getVal == "All") Filter4ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });

                },
            }
            //margin: [0, 0, 0, 0]
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        legend: { enabled: false },
        credits: {
            enabled: false
        },
        colors: colors,
        xAxis: {
            opposite: true,
            enabled: true,
            gridLineWidth: 0,
            tickInterval: 1,
            type: 'category',
            tickWidth: 0,
            tickLength: 0,
            minorTickLength: 0,
            lineColor: 'transparent',
            gridLineColor: 'transparent',
            labels: {
                animate: true
            }
        },
        yAxis: {
            visible: false,
            reversed: true,
            min: 0,
            max: 100,
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<table style="direction:rtl">' + '<tr><th>عنوان : </th><td>' + this.series.name + ' - ' + 'درصد : ' + this.y + ' % ' + '</td></tr></table>';
            },
            followPointer: true,
            style: {
                zIndex: 100
            }
        },
        plotOptions: {
            bar: {
                stacking: 'normal'
            },
            series: {
                groupPadding: 0
            }
        },
        series: [{ pointWidth: 15, name: cap1, data: arrVal1 }, { pointWidth: 15, name: cap2, data: arrVal2 }, { pointWidth: 15, name: cap3, data: arrVal3 }, { pointWidth: 15, name: cap4, data: arrVal4 }]
    });
}
function HighchartWith5(color1, color2, color3, color4, color5, val1, val2, val3, val4, val5, cap1, cap2, cap3, cap4, cap5, catnm) {
    if (ChartHighchart) ChartHighchart.destroy();
    if ($("#divAutoGenerateChart").html() != "") $("#divAutoGenerateChart").html("");
    CapLen(val1);
    let dataSum1;
    let arrVal1 = [], arrVal2 = [], arrVal3 = [], arrVal4 = [], arrVal5 = [];
    for (let i = 0; i < val1.length; i++) {
        dataSum1 = val1[i] + val2[i] + val3[i] + val4[i] + val5[i];
        arrVal1.push(val1[i] / dataSum1 * 100);
        arrVal2.push(val2[i] / dataSum1 * 100);
        arrVal3.push(val3[i] / dataSum1 * 100);
        arrVal4.push(val4[i] / dataSum1 * 100);
        arrVal5.push(val5[i] / dataSum1 * 100);
    }
    let colors = [color1, color2, color3, color4, color5];
    ChartHighchart = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'bar',
            renderTo: "divAutoGenerateChart",
            style: {
                fontFamily: 'IRANSans'
            },
            animation: {
                duration: 1000
            },
            ignoreHiddenSeries: true,
            events: {
                load: function () {
                    let series = this.series,
                        newPoints,
                        newSeriesPoints = [],
                        each = Highcharts.each;

                    each(series, function (s, index) {
                        newPoints = [];
                        each(s.points, function (point, i) {
                            point.update({
                                name: catnm[i]
                            }, false);
                            newPoints.push({
                                x: point.x,
                                y: point.y,
                                name: point.name
                            });
                        });
                        newSeriesPoints.push(newPoints);
                    });
                    this.redraw();
                    $('input[type=radio][name=rdoCollTwoVehicle]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoCollTwoVehicle]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "RearEnd") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "Angle") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "HeadOn") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 2, getLabel);
                        else if (getVal == "SidewipeSd") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 3, getLabel);
                        else if (getVal == "SidewipeOd") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 4, getLabel);
                        else if (getVal == "All") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });
                    $('input[type=radio][name=rdoTransferMethod]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoTransferMethod]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "Ambulance") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "PassingCar") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "Helicopter") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 2, getLabel);
                        else if (getVal == "Police") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 3, getLabel);
                        else if (getVal == "Other") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 4, getLabel);
                        else if (getVal == "All") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });
                    $('input[type=radio][name=rdoAgePedestrian]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoAgePedestrian]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "PedestrianAge0") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "PedestrianAge6") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "PedestrianAge12") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 2, getLabel);
                        else if (getVal == "PedestrianAge18") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 3, getLabel);
                        else if (getVal == "PedestrianAge60") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 4, getLabel);
                        else if (getVal == "All") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });
                    $('input[type=radio][name=rdoLightingStatus]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoLightingStatus]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "Day") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "Rise") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "Sunset") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 2, getLabel);
                        else if (getVal == "StatusWithLight") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 3, getLabel);
                        else if (getVal == "StatusWithOutLight") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, 4, getLabel);
                        else if (getVal == "All") Filter5ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });

                },
            }
            //margin: [0, 0, 0, 0]
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        legend: { enabled: false },
        credits: {
            enabled: false
        },
        colors: colors,
        xAxis: {
            opposite: true,
            enabled: true,
            gridLineWidth: 0,
            tickInterval: 1,
            type: 'category',
            tickWidth: 0,
            tickLength: 0,
            minorTickLength: 0,
            lineColor: 'transparent',
            gridLineColor: 'transparent',
            labels: {
                animate: true
            }
        },
        yAxis: {
            visible: false,
            reversed: true,
            min: 0,
            max: 100,
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<table style="direction:rtl">' + '<tr><th>عنوان : </th><td>' + this.series.name + ' - ' + 'درصد : ' + this.y + ' % ' + '</td></tr></table>';
            },
            followPointer: true,
            style: {
                zIndex: 100
            }
        },
        plotOptions: {
            bar: {
                stacking: 'normal'
            },
            series: {
                groupPadding: 0
            }
        },
        series: [{ pointWidth: 15, name: cap1, data: arrVal1 }, { pointWidth: 15, name: cap2, data: arrVal2 }, { pointWidth: 15, name: cap3, data: arrVal3 }, { pointWidth: 15, name: cap4, data: arrVal4 }, { pointWidth: 15, name: cap5, data: arrVal5 }]
    });
}
function HighchartWith6(color1, color2, color3, color4, color5, color6, val1, val2, val3, val4, val5, val6, cap1, cap2, cap3, cap4, cap5, cap6, catnm) {
    if (ChartHighchart) ChartHighchart.destroy();
    if ($("#divAutoGenerateChart").html() != "") $("#divAutoGenerateChart").html("");
    CapLen(val1);
    let dataSum1;
    let arrVal1 = [], arrVal2 = [], arrVal3 = [], arrVal4 = [], arrVal5 = [], arrVal6 = [];
    for (let i = 0; i < val1.length; i++) {
        dataSum1 = val1[i] + val2[i] + val3[i] + val4[i] + val5[i] + val6[i];
        arrVal1.push(val1[i] / dataSum1 * 100);
        arrVal2.push(val2[i] / dataSum1 * 100);
        arrVal3.push(val3[i] / dataSum1 * 100);
        arrVal4.push(val4[i] / dataSum1 * 100);
        arrVal5.push(val5[i] / dataSum1 * 100);
        arrVal6.push(val6[i] / dataSum1 * 100);
    }
    let colors = [color1, color2, color3, color4, color5, color6];
    ChartHighchart = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'bar',
            renderTo: "divAutoGenerateChart",
            style: {
                fontFamily: 'IRANSans'
            },
            animation: {
                duration: 1000
            },
            ignoreHiddenSeries: true,
            events: {
                load: function () {
                    let series = this.series,
                        newPoints,
                        newSeriesPoints = [],
                        each = Highcharts.each;

                    each(series, function (s, index) {
                        newPoints = [];
                        each(s.points, function (point, i) {
                            point.update({
                                name: catnm[i]
                            }, false); 
                            newPoints.push({
                                x: point.x,
                                y: point.y,
                                name: point.name
                            });
                        });
                        newSeriesPoints.push(newPoints);
                    });
                    this.redraw();
                    $('input[type=radio][name=rdoCollision]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoCollision]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "CollisionOther") Filter6ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "MultiAccident") Filter6ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "WithMotor") Filter6ChartBar(newSeriesPoints, each, ChartHighchart, 2, getLabel);
                        else if (getVal == "SingleVehicle") Filter6ChartBar(newSeriesPoints, each, ChartHighchart, 3, getLabel);
                        else if (getVal == "TwoVehicle") Filter6ChartBar(newSeriesPoints, each, ChartHighchart, 4, getLabel);
                        else if (getVal == "WithPedestrian") Filter6ChartBar(newSeriesPoints, each, ChartHighchart, 5, getLabel);
                        else if (getVal == "All") Filter6ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });
                    $('input[type=radio][name=rdoCodeCausingAccident]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoCodeCausingAccident]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "ExceedingSpeedsOver30") Filter6ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "ExceedingSpeedsOver50") Filter6ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "DrivingWhileDrunk") Filter6ChartBar(newSeriesPoints, each, ChartHighchart, 2, getLabel);
                        else if (getVal == "IllegalOvertaking") Filter6ChartBar(newSeriesPoints, each, ChartHighchart, 3, getLabel);
                        else if (getVal == "CrossRedLight") Filter6ChartBar(newSeriesPoints, each, ChartHighchart, 4, getLabel);
                        else if (getVal == "Other") Filter6ChartBar(newSeriesPoints, each, ChartHighchart, 5, getLabel);
                        else if (getVal == "All") Filter6ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });

                },
            }
            //margin: [0, 0, 0, 0]
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        legend: { enabled: false },
        credits: {
            enabled: false
        },
        colors: colors,
        xAxis: {
            opposite: true,
            enabled: true,
            gridLineWidth: 0,
            tickInterval: 1,
            type: 'category',
            tickWidth: 0,
            tickLength: 0,
            minorTickLength: 0,
            lineColor: 'transparent',
            gridLineColor: 'transparent',
            labels: {
                animate: true
            }
        },
        yAxis: {
            visible: false,
            reversed: true,
            min: 0,
            max: 100,
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<table style="direction:rtl">' + '<tr><th>عنوان : </th><td>' + this.series.name + ' - ' + 'درصد : ' + this.y + ' % ' + '</td></tr></table>';
            },
            followPointer: true,
            style: {
                zIndex: 100
            }
        },
        plotOptions: {
            bar: {
                stacking: 'normal'
            },
            series: {
                grouping: false,
                groupPadding: 0
            }
        },
        series: [{ pointWidth: 15, name: cap1, data: arrVal1 }, { pointWidth: 15, name: cap2, data: arrVal2 }, { pointWidth: 15, name: cap3, data: arrVal3 }, { pointWidth: 15, name: cap4, data: arrVal4 }, { pointWidth: 15, name: cap5, data: arrVal5 }, { pointWidth: 15, name: cap6, data: arrVal6 }]
    });
}
function HighchartWith7(color1, color2, color3, color4, color5, color6, color7, val1, val2, val3, val4, val5, val6, val7, cap1, cap2, cap3, cap4, cap5, cap6, cap7, catnm) {
    if (ChartHighchart) ChartHighchart.destroy();
    if ($("#divAutoGenerateChart").html() != "") $("#divAutoGenerateChart").html("");
    CapLen(val1);
    let dataSum1;
    let arrVal1 = [], arrVal2 = [], arrVal3 = [], arrVal4 = [], arrVal5 = [], arrVal6 = [], arrVal7 = [];
    for (let i = 0; i < val1.length; i++) {
        dataSum1 = val1[i] + val2[i] + val3[i] + val4[i] + val5[i] + val6[i] + val7[i];
        arrVal1.push(val1[i] / dataSum1 * 100);
        arrVal2.push(val2[i] / dataSum1 * 100);
        arrVal3.push(val3[i] / dataSum1 * 100);
        arrVal4.push(val4[i] / dataSum1 * 100);
        arrVal5.push(val5[i] / dataSum1 * 100);
        arrVal6.push(val6[i] / dataSum1 * 100);
        arrVal7.push(val7[i] / dataSum1 * 100);
    }
    let colors = [color1, color2, color3, color4, color5, color6, color7];
    ChartHighchart = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'bar',
            renderTo: "divAutoGenerateChart",
            style: {
                fontFamily: 'IRANSans'
            },
            animation: {
                duration: 1000
            },
            ignoreHiddenSeries: true,
            events: {
                load: function () {
                    let series = this.series,
                        newPoints,
                        newSeriesPoints = [],
                        each = Highcharts.each;

                    each(series, function (s, index) {
                        newPoints = [];
                        each(s.points, function (point, i) {
                            point.update({
                                name: catnm[i]
                            }, false);
                            newPoints.push({
                                x: point.x,
                                y: point.y,
                                name: point.name
                            });
                        });
                        newSeriesPoints.push(newPoints);
                    });
                    this.redraw();
                    $('input[type=radio][name=rdoWeather]').on('change', function () {
                        let geRadio = $('input[type=radio][name=rdoWeather]:checked');
                        let getVal = geRadio.val();
                        let getLabelId = geRadio.attr("id");
                        let getLabel = $("label[for='" + getLabelId + "']").text();
                        if (getVal == "Rainy") Filter7ChartBar(newSeriesPoints, each, ChartHighchart, 0, getLabel);
                        else if (getVal == "Clear") Filter7ChartBar(newSeriesPoints, each, ChartHighchart, 1, getLabel);
                        else if (getVal == "Dust") Filter7ChartBar(newSeriesPoints, each, ChartHighchart, 2, getLabel);
                        else if (getVal == "Stormy") Filter7ChartBar(newSeriesPoints, each, ChartHighchart, 3, getLabel);
                        else if (getVal == "Foggy") Filter7ChartBar(newSeriesPoints, each, ChartHighchart, 4, getLabel);
                        else if (getVal == "Snowy") Filter7ChartBar(newSeriesPoints, each, ChartHighchart, 5, getLabel);
                        else if (getVal == "Cloudy") Filter7ChartBar(newSeriesPoints, each, ChartHighchart, 6, getLabel);
                        else if (getVal == "All") Filter7ChartBar(newSeriesPoints, each, ChartHighchart, -1, "کل تصادفات");
                    });

                },
            }
            //margin: [0, 0, 0, 0]
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        legend: { enabled: false },
        credits: {
            enabled: false
        },
        colors: colors,
        xAxis: {
            opposite: true,
            enabled: true,
            gridLineWidth: 0,
            tickInterval: 1,
            type: 'category',
            tickWidth: 0,
            tickLength: 0,
            minorTickLength: 0,
            lineColor: 'transparent',
            gridLineColor: 'transparent',
            labels: {
                animate: true
            }
        },
        yAxis: {
            visible: false,
            reversed: true,
            min: 0,
            max: 100,
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<table style="direction:rtl">' + '<tr><th>عنوان : </th><td>' + this.series.name + ' - ' + 'درصد : ' + this.y + ' % ' + '</td></tr></table>';
            },
            followPointer: true,
            style: {
                zIndex: 100
            }
        },
        plotOptions: {
            bar: {
                stacking: 'normal'
            },
            series: {
                groupPadding: 0
            }
        },
        series: [{ pointWidth: 15, name: cap1, data: arrVal1 }, { pointWidth: 15, name: cap2, data: arrVal2 }, { pointWidth: 15, name: cap3, data: arrVal3 }, { pointWidth: 15, name: cap4, data: arrVal4 }, { pointWidth: 15, name: cap5, data: arrVal5 }, { pointWidth: 15, name: cap6, data: arrVal6 }, { pointWidth: 15, name: cap7, data: arrVal7 }]
    });
}
function FillCity() {
    let obj = {
        "provinceId": $("#cmbProvinceSearch").val() === "-1" ? "" : $("#cmbProvinceSearch").val()
    }
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "LocationComparison.aspx/GetFillCity",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess !== "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    let optionVal = '';
                    $('#cmbCity').html('<option selected="" value="-1">انتخاب شهرستان</option>');
                    for (i = 0; i < msg.d.length; i++) {
                        let txt = msg.d[i].Message;
                        let id = msg.d[i].Id;
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

$(document).ready(function () {
    pageLoad();
    $("#cmbChartLocComp").on('click', function () {
        if ($("#divChartLocComp").css("display") == "none") {
            $("#divChartLocComp").show('slow');
        } else {
            $("#divChartLocComp").hide('slow');
        }
    });
    $('input[type=radio][name=rdoLocation]').on('change', function () {
        let getVal = $('input[type=radio][name=rdoLocation]:checked').val();
        if (getVal === "City") {
            let getProvince = $('#cmbProvinceSearch').val();
            if (getProvince === "-1" || getProvince === "") {
                $("#lblMessage").html(CreateModal("ابتدا باید یک استان را انتخاب نمایید!"));
                $('#MessageModal').modal();
                $("input[type=radio][name=rdoLocation]").prop("checked", false);
                return;
            }
            $("#divCity").show('slow');
            if ($('#divAxis').css('display') !== 'none') {
                $("#divAxis").hide('slow');
                $('#cmbAxis').val("-1").trigger("change");
            }
            if ($('#divInNativeArea').css('display') !== 'none') {
                $("#divInNativeArea").hide('slow');
                $('#cmbInNativeArea').val("-1").trigger("change");
            }
            FillCity();
        }
        else if (getVal === "Axis") {
            let getProvince = $('#cmbProvinceSearch').val();
            if (getProvince === "-1" || getProvince === "") {
                $("#lblMessage").html(CreateModal("ابتدا باید یک استان را انتخاب نمایید!"));
                $('#MessageModal').modal();
                $("input[type=radio][name=rdoLocation]").prop("checked", false);
                return;
            }
            if ($('#divCity').css('display') !== 'none') {
                $("#divCity").hide('slow');
                $('#cmbCity').val("-1").trigger("change");
            }
            let obj = {
                "provinceId": $("#cmbProvinceSearch").val() === "-1" ? "" : $("#cmbProvinceSearch").val()
            }
            $('#spinSearchLoading').show();
            $.ajax({
                type: "POST",
                url: "FirstViwe.aspx/GetFillAxis",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg != null) {
                        if (msg.d.length == 0) {
                            $('#cmbAxis').html('<option selected="" value="-1">انتخاب محور</option>');
                        }
                        else if (msg.d[0].IsSuccess !== "true") {
                            $("#lblMessage").html(CreateModal(msg.d[0].Message));
                            $('#MessageModal').modal();
                        } else {
                            let optionVal = '';
                            $('#cmbAxis').html('<option selected="" value="-1">انتخاب محور</option>');
                            for (i = 0; i < msg.d.length; i++) {
                                let txt = msg.d[i].Message;
                                let id = msg.d[i].Id;
                                optionVal += '<option value="' + id + '">' + txt + '</option>';
                            }
                            $('#cmbAxis').append(optionVal);
                        }
                    } else {
                        alert("خطا در برقراری ارتباط با سرور!");
                    }
                },
                complete: function () {
                    $('#spinSearchLoading').hide();
                    $("#divAxis").show('slow');
                },
                error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
                    alert(response.d);
                }
            });
        }
        else {
            $("#divCity,#divAxis").hide('slow');
            $('#cmbCity,#cmbAxis').val("-1").trigger("change");
        }
    });
    $('input[type=radio][name=rdoDate]').on('change', function () {
        let getVal = $('input[type=radio][name=rdoDate]:checked').val();
        if (getVal === "Date") {
            $("#divShowDate").show('slow');
        } else {
            $("#divShowDate").hide('slow');
        }
    });
    $('input[type=radio][name=rdoIntensity]').on('change', function () {
        $('input[type=radio][name=rdoAccident]:checked').trigger("change");;
    });
    $('input[type=radio][name=rdoDate]').on('change', function () {
        let provinceId = $('input[type=radio][name=rdoDate]:checked').val();
        if (provinceId !== "Date") {
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
    $('input[type=radio][name=rdoDays]').on('change', function () {
        $('input[type=radio][name=rdoAccident]:checked').trigger("change");
    });
    $('#txtDateRange').on('change', function () {
        let provinceId = $('#txtDateRange').val();
        if (provinceId !== "") {
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
    $('#chkIsNotLocalDriver').on('change', function () {
        $('input[type=radio][name=rdoAccident]:checked').trigger("change");
    });
    $("#cmbProvinceSearch").on('change', function () {
        $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        let provinceId = $(this).val();
        if (provinceId == "" || provinceId == "-1" || provinceId == null) {
            if (dataProvinceLayer)
                map.removeLayer(dataProvinceLayer);
            $("#spnChartTitleCity").html("استانهای کشور");
            //$.getJSON("/Geo/Iran.txt", function (data) {
            //    // add GeoJSON layer to the map once the file is loaded
            //    let datalayer = L.geoJson(data, {
            //        onEachFeature: function (feature, featureLayer) {
            //            featureLayer.bindPopup(feature.properties.NAME_1);
            //        }
            //    }, { style: polystyle }).addTo(map);
            //    map.fitBounds(datalayer.getBounds());
            //});
        } else if (provinceId == "13") {
            $('#spinSearchLoading').show();
            let request = new XMLHttpRequest();
            request.open("GET", "/Geo/Province/Isfahan.txt", false);
            request.send(null);
            let returnValue = request.responseText;
            dataProvinceLayer = L.geoJson(JSON.parse(returnValue),
                { style: polystyle("#7E2028") },
                {
                    onEachFeature: function(feature, featureLayer) {
                        featureLayer.bindPopup(feature.properties.NAME_1);
                    }
                }).addTo(map);
            map.fitBounds(dataProvinceLayer.getBounds());
            $('#spinSearchLoading').hide();
        } else {
            if (dataProvinceLayer)
                map.removeLayer(dataProvinceLayer);
        }
        
        if (provinceId !== "-1") {
            $("#spnChartTitleCity").html("شهرستانهای استان " + $(this).find(':selected').text().split('-')[1]);
            FillCity();
        }
        if (provinceId == "-1") {
            if ($('#divAxis').css('display') !== 'none') {
                $("#divAxis").hide('slow');
                $('#cmbAxis').val("-1").trigger("change");
            }
            if ($('#divCity').css('display') !== 'none') {
                $("#divCity").hide('slow');
                $('#cmbCity').val("-1").trigger("change");
            }
            if ($('#divInNativeArea').css('display') !== 'none') {
                $("#divInNativeArea").hide('slow');
                $('#cmbInNativeArea').val("-1").trigger("change");
            }
            
            $('input[type=radio][name=rdoLocation]').prop("checked", false);
            
        }
        if (dataCityLayer)
            map.removeLayer(dataCityLayer);
    });
    $("#cmbCity").on('change', function () {
        let getCity = $('#cmbCity').val();
        let getProvince = $('#cmbProvinceSearch').val();
        if (getProvince == "-1") return;
        if (getCity !== "" && getCity !== null) {
            $('#divInNativeArea').show("slow");
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
            if (getCity == "-1") {
                $('#cmbInNativeArea').val("-1").trigger("change");
                $('#divInNativeArea').hide("slow");
                if (dataCityLayer)
                    map.removeLayer(dataCityLayer);
                $("#spnChartTitleCity").html("شهرستانهای استان " + $('#cmbProvinceSearch').find(':selected').text().split('-')[1]);
            } else {
                $("#spnChartTitleCity").html("شهرستان " + $(this).find(':selected').text());
                let obj = {
                    "cityId": getCity
                }
                $('#spinSearchLoading').show();
                $.ajax({
                    type: "POST",
                    url: "/Moderator/Report/LocationComparison.aspx/GetFillCityEnName",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        if (msg != null) {
                            if (msg.d[0].IsSuccess !== "true") {
                                $("#lblMessage").html(CreateModal(msg.d[0].Message));
                                $('#MessageModal').modal();
                            } else {
                                if (dataCityLayer)
                                    map.removeLayer(dataCityLayer);
                                let cityEnName = msg.d[0].Message;
                                let request = new XMLHttpRequest();
                                request.open("GET", "/Geo/Khozestan/" + cityEnName + ".txt", false);
                                request.send(null);
                                let returnValue = request.responseText;
                                dataCityLayer = L.geoJson(JSON.parse(returnValue), { style: polystyle("#00fbff") }, {
                                    onEachFeature: function (feature, featureLayer) {
                                        featureLayer.bindPopup(feature.properties.NAME_1);
                                    }
                                }).addTo(map);
                                map.fitBounds(dataCityLayer.getBounds());
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
        }
    });
    $("#cmbAxis").on('change', function () {
        let getCity = $('#cmbAxis').val();
        let getProvince = $('#cmbProvinceSearch').val();
        if (getProvince == "-1") return;
        if (getCity !== "" && getCity !== null) {
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
    $("#cmbInNativeArea").on('change', function () {
        let getInNativeArea = $('#cmbInNativeArea').val();
        if (getInNativeArea !== "" && getInNativeArea !== null) {
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
    $("#cmbMonth").on('change', function () {
        let getMonth = $('#cmbMonth').val();
        if (getMonth !== "" && getMonth !== null) {
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
    $("#cmbCollisionOfATwo").on('change', function () {
        let getVal = $('#cmbCollisionOfATwo').val();
        if (getVal !== "" && getVal !== null) {
            if (getVal == "تک وسیله ای") $("#divCollisionChild1").show("slow");
            else $("#divCollisionChild1").hide("slow");
            if (getVal == "دو وسیله ای") $("#divCollisionChild2").show("slow");
            else $("#divCollisionChild2").hide("slow");
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
    $("#cmbCollisionChild1").on('change', function () {
        let getVal = $('#cmbCollisionChild1').val();
        if (getVal !== "" && getVal !== null) {
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
    $("#cmbCollisionChild2").on('change', function () {
        let getVal = $('#cmbCollisionChild2').val();
        if (getVal !== "" && getVal !== null) {
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
    $("#cmbLightingStatus").on('change', function () {
        let getVal = $('#cmbLightingStatus').val();
        if (getVal !== "" && getVal !== null) {
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
    $("#cmbWeather").on('change', function () {
        let getVal = $('#cmbWeather').val();
        if (getVal !== "" && getVal !== null) {
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
    $("#cmbCarriageWayDirection").on('change', function () {
        let getVal = $('#cmbCarriageWayDirection').val();
        if (getVal !== "" && getVal !== null) {
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
    $("#cmbTypeOfWay").on('change', function () {
        let getVal = $('#cmbTypeOfWay').val();
        if (getVal !== "" && getVal !== null) {
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
    $("#cmbCarCrashLocation").on('change', function () {
        let getVal = $('#cmbCarCrashLocation').val();
        if (getVal !== "" && getVal !== null) {
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
    $("#cmbLocationLandUse").on('change', function () {
        let getVal = $('#cmbLocationLandUse').val();
        if (getVal !== "" && getVal !== null) {
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
    $('input[type=radio][name=rdoHoliday]').on('change', function () {
        $('input[type=radio][name=rdoAccident]:checked').trigger("change");
    });
    $("#divProFilter").on('click', function () {
        $('#divNormalFilter').hide("slow");
        $('#divPerfesionalFilter').show("slow");
    });
    $("#btnBackToNormalFilter").on('click', function () {
        $('#divNormalFilter').show("slow");
        $('#divPerfesionalFilter').hide("slow");
    });
    $("#slider").slider({
        range: true,
        min: 0,
        max: 120,
        values: [0, 120],
        slide: function (event, ui) {
            $("#txtFromAge").val("از سن : " + ui.values[0]);
            $("#txtToAge").val("تا سن : " + ui.values[1]);
        }, change: function () {
            $('input[type=radio][name=rdoAccident]:checked').trigger("change");
        }
    });
});
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
