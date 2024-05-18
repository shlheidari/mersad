function openDateRange() {
    var btn = document.getElementById("dateDateRange");
    btn.click(); event.preventDefault();
}
function pageLoad() {
    $("#cmbProvinceSearch").select2({
        placeholder: {
            id: "-1",
            text: "نام شهری"
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
    $("#cmbMonth").select2({
        placeholder: {
            id: "-1",
            text: "نمایش بر اساس ماه"
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $('#cmbMonth').on('select2:open', function (e) {
        $('input.select2-search__field').prop('placeholder', 'نمایش بر اساس ماه');
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
    $('#cmbCollisionOfATwo').on('select2:open', function (e) {
        $('input.select2-search__field').prop('placeholder', 'نوع برخورد');
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
    $('#cmbCollisionChild1').on('select2:open', function (e) {
        $('input.select2-search__field').prop('placeholder', 'انواع تک وسیله ای');
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
    $('#cmbCollisionChild2').on('select2:open', function (e) {
        $('input.select2-search__field').prop('placeholder', 'انواع دو وسیله ای');
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
    $('#cmbLightingStatus').on('select2:open', function (e) {
        $('input.select2-search__field').prop('placeholder', 'وضعیت روشنایی');
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
    $('#cmbWeather').on('select2:open', function (e) {
        $('input.select2-search__field').prop('placeholder', "وضعیت جوی");
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
    $('#cmbCarriageWayDirection').on('select2:open', function (e) {
        $('input.select2-search__field').prop('placeholder', "سمت جهت راه");
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
    $('#cmbTypeOfWay').on('select2:open', function (e) {
        $('input.select2-search__field').prop('placeholder', "نوع راه");
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
    $('#cmbCarCrashLocation').on('select2:open', function (e) {
        $('input.select2-search__field').prop('placeholder', "موقعیت تصادف");
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
    $('#cmbLocationLandUse').on('select2:open', function (e) {
        $('input.select2-search__field').prop('placeholder', "کاربری محل");
    });
    $("#cmbInFirstView").select2({
        placeholder: {
            id: "-1",
            text: "انتخاب دسته تحلیل "
        },
        allowClear: true,
        dir: 'rtl',
        width: '100%'
    });
    $('#cmbInFirstView').on('select2:open', function (e) {
        $('input.select2-search__field').prop('placeholder', 'انتخاب دسته تحلیل ');
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
    $('#cmbInNativeArea').on('select2:open', function (e) {
        $('input.select2-search__field').prop('placeholder', "حوزه نفوذ");
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
    $('#cmbAxis').on('select2:open', function (e) {
        $('input.select2-search__field').prop('placeholder', "انتخاب محور");
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
    $("#lnkFirstView").addClass("active");
}

var ChartEffectiveWayDefects;
function PEffectiveWayDefects() {
    if ($('#hidPEffectiveWayDefects').val() == "") return;
    var hidPEffectiveWayDefects = JSON.parse("[" + $('#hidPEffectiveWayDefects').val().slice(0, -1) + "]");
    var cnsChartEffectiveWayDefects = document.getElementById('cnsChartEffectiveWayDefects');
    ChartEffectiveWayDefects = new Chart(cnsChartEffectiveWayDefects, {
        type: 'doughnut',
        data: {
            labels: ['ندارد', 'دارد', 'نامشخص'],
            datasets: [{
                label: '',
                data: hidPEffectiveWayDefects,
                backgroundColor: [
                    '#4A8987',
                    '#F59D2D',
                    '#FFD461'
                ],
                borderColor: [
                    '#4A8987',
                    '#F59D2D',
                    '#FFD461'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    display: function (context) {
                        return context.dataset.data[context.dataIndex] !== 0;
                    },
                    textAlign: 'center',
                    color: '#fff',
                    font: {
                        size: 12,
                        family: 'IRANSans'
                    }
                },
                legend: {
                    position: 'left',
                    align: "middle",
                    rtl: true,
                    labels: {
                        font: {
                            family: 'IRANSans',
                            size: 11
                        },
                        boxWidth: 13
                        //usePointStyle: true,
                    }
                },
                title: {
                    display: false,
                    text: 'نقایص موثر راه',
                    font: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }, tooltip: {
                    titleFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    footerFont: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }
            }
        }, plugins: [ChartDataLabels]
    });
}

var ChartBarriersToVision;
function FChartBarriersToVision() {
    if ($('#hidPBarriersToVision').val() == "") return;
    var hidPBarriersToVision = JSON.parse("[" + $('#hidPBarriersToVision').val().slice(0, -1) + "]");
    var cnsChartBarriersToVision = document.getElementById('cnsChartBarriersToVision');
    ChartBarriersToVision = new Chart(cnsChartBarriersToVision, {
        type: 'doughnut',
        data: {
            labels: ['ندارد', 'دارد', 'نامشخص'],
            datasets: [{
                label: '',
                data: hidPBarriersToVision,
                backgroundColor: [
                    '#4A8987',
                    '#F59D2D',
                    '#FFD461'
                ],
                borderColor: [
                    '#4A8987',
                    '#F59D2D',
                    '#FFD461'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    display: function (context) {
                        return context.dataset.data[context.dataIndex] !== 0;
                    },
                    //display: true,
                    textAlign: 'center',
                    color: '#fff', font: {
                        size: 12,
                        family: 'IRANSans'
                    }
                },
                legend: {
                    position: 'left',
                    rtl: true,
                    labels: {
                        font: {
                            family: 'IRANSans',
                            size: 11
                        },
                        boxWidth: 13
                    }
                },
                title: {
                    display: false,
                    text: 'موانع دید',
                    font: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }, tooltip: {
                    titleFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    footerFont: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }
            }
        }, plugins: [ChartDataLabels]
    });
}

var BarChartBarriersToVision;
function FBarChartBarriersToVision() {
    if ($('#hidFBcBarriersToVision').val() == "") return;
    var strArBarriersToVision = JSON.parse("[" + $('#hidFBcBarriersToVision').val().slice(0, -1) + "]");
    var resultBarriersToVision = [];
    //var arrBarriersToVision1 = [strArBarriersToVision[0], "ندارد"];
    var arrBarriersToVision2 = [strArBarriersToVision[0], "درخت، بوته"];
    var arrBarriersToVision3 = [strArBarriersToVision[1], ["ساختمان،", "کیوسک"]];
    var arrBarriersToVision4 = [strArBarriersToVision[2], ["تل خاک و", "مشابه آن"]];
    var arrBarriersToVision5 = [strArBarriersToVision[3], "وسیله متوقف"];
    var arrBarriersToVision6 = [strArBarriersToVision[4], ["وسیله در", "حال حرکت"]];
    var arrBarriersToVision7 = [strArBarriersToVision[5], "نور خورشید"];
    var arrBarriersToVision8 = [strArBarriersToVision[6], "شیب"];
    var arrBarriersToVision9 = [strArBarriersToVision[7], "قوس قائم"];
    var arrBarriersToVision10 = [strArBarriersToVision[8], "مه، دود"];
    var arrBarriersToVision11 = [strArBarriersToVision[9], "کولاک"];
    var arrBarriersToVision12 = [strArBarriersToVision[10], "طوفان شن"];
    var arrBarriersToVision13 = [strArBarriersToVision[11], "تابلو"];
    var arrBarriersToVision14 = [strArBarriersToVision[12], ["نور چراغ وسیله", "نقلیه مقابل"]];
    var arrBarriersToVision15 = [strArBarriersToVision[13], ["یخ‌زدگی شیشه", "وسیله ‌نقلیه"]];
    var arrBarriersToVision16 = [strArBarriersToVision[14], "سایر"];
    //resultBarriersToVision.push(arrBarriersToVision1);
    resultBarriersToVision.push(arrBarriersToVision16);
    resultBarriersToVision.push(arrBarriersToVision2);
    resultBarriersToVision.push(arrBarriersToVision3);
    resultBarriersToVision.push(arrBarriersToVision4);
    resultBarriersToVision.push(arrBarriersToVision5);
    resultBarriersToVision.push(arrBarriersToVision6);
    resultBarriersToVision.push(arrBarriersToVision7);
    resultBarriersToVision.push(arrBarriersToVision8);
    resultBarriersToVision.push(arrBarriersToVision9);
    resultBarriersToVision.push(arrBarriersToVision10);
    resultBarriersToVision.push(arrBarriersToVision11);
    resultBarriersToVision.push(arrBarriersToVision12);
    resultBarriersToVision.push(arrBarriersToVision13);
    resultBarriersToVision.push(arrBarriersToVision14);
    resultBarriersToVision.push(arrBarriersToVision15);

    resultBarriersToVision.sort(sortDesc);
    var arrDataBarriersToVision = [];
    var arrLabelsBarriersToVision = [];
    for (var x = 0; x < resultBarriersToVision.length; x++) {
        arrDataBarriersToVision[x] = resultBarriersToVision[x][0];
        arrLabelsBarriersToVision[x] = resultBarriersToVision[x][1];
    }
    var cnsBarChartBarriersToVision = document.getElementById('cnsBarChartBarriersToVision');
    BarChartBarriersToVision = new Chart(cnsBarChartBarriersToVision, {
        type: 'bar',
        data: {
            labels: arrLabelsBarriersToVision,
            datasets: [{
                label: '',
                data: arrDataBarriersToVision,
                backgroundColor: ['#F59D2D'],
                borderColor: ['#F09D30'],
                borderWidth: 1,
                barThickness: 14
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        labelOffset: -8,
                        maxRotation: 90,
                        minRotation: 90,
                        font: { size: 9, family: 'IRANSans' }
                    },
                    grid: { display: false }
                },
                y: {
                    ticks: {
                        precision: 0, font: {
                            size: 12,
                            family: 'IRANSans'
                        }
                    }, grid: { display: false }
                }
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'left',
                    display: false,
                    labels: {
                        font: {
                            family: 'IRANSans',
                            size: 18
                        }
                    }
                },
                title: {
                    display: false
                }, tooltip: {
                    titleFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    footerFont: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }
            }
        }
    });
}

var ChartRoadwayWidth;
function FChartRoadwayWidth() {
    if ($('#hidPChartRoadwayWidth').val() == "") return;
    var hidPChartRoadwayWidth = JSON.parse("[" + $('#hidPChartRoadwayWidth').val().slice(0, -1) + "]");
    var cnsChartRoadwayWidth = document.getElementById('cnsChartRoadwayWidth');
    ChartRoadwayWidth = new Chart(cnsChartRoadwayWidth, {
        type: 'pie',
        data: {
            labels: ['روستایی', 'فرعی', 'اصلی'],
            datasets: [{
                label: '',
                data: hidPChartRoadwayWidth,
                backgroundColor: [
                    '#4A8987',
                    '#F08976',
                    '#87DCDC'
                ],
                borderColor: [
                    '#4A8987',
                    '#F08976',
                    '#87DCDC'
                ],
                hoverOffset: 4,
                borderWidth: 1,
                offset: 2
                //spacing:0.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    display: function (context) {
                        return context.dataset.data[context.dataIndex] !== 0;
                    },
                    textAlign: 'center',
                    color: '#fff', font: {
                        size: 10,
                        family: 'IRANSans'
                    }
                },
                legend: {
                    position: 'right',
                    rtl: true,
                    labels: {
                        font: {
                            family: 'IRANSans',
                            size: 9
                        }, boxWidth: 13
                    }
                },
                title: {
                    position: 'top',
                    display: false,
                    text: 'شمار تصادفات به تفکیک نوع راه',
                    font: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }, tooltip: {
                    titleFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    footerFont: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }
            }
        }, plugins: [ChartDataLabels]
    });
}

 
var ChartUserSpeed;
function FChartUserSpeed() {
    if ($('#hidBubbleUserSpeed').val() == "") return;
    
    var mahalesokunat = $('#hidmaskouni').val().split(',');
    var edaritejari = $('#hidedaritejari').val().split(',');
    var amouzeshi = $('#hidamouzeshi').val().split(',');
    var gheiremaskouni = $('#hidgheiremaskouni').val().split(',');
    var keshavarzi = $('#hidkeshavarzi').val().split(',');
    var tafrihi = $('#hidtafrihi').val().split(',');
    var sanati = $('#hidsanati').val().split(',');
    var sayer = $('#hidsayer').val().split(',');
    var getNum;
    var arrVal = [];
    var arrMinMax = [];
    for (var i = 0; i <= 7; i++) {
     
        if (parseInt(mahalesokunat[i]) >0) {

            getNum = parseInt(mahalesokunat[i]);
            arrMinMax.push(getNum);
            arrVal.push([i, 0, getNum]);
        }
        if (parseInt(edaritejari[i]) > 0) {
            getNum = parseInt(edaritejari[i]);
            arrMinMax.push(getNum);
            arrVal.push([i, 1, getNum]);
        }
        if (parseInt(amouzeshi[i]) >0) {
            getNum = parseInt(amouzeshi[i]);
            arrMinMax.push(getNum);
            arrVal.push([i, 2, getNum]);
        }
        if (parseInt(gheiremaskouni[i])>0) {
            getNum = parseInt(gheiremaskouni[i]);
            arrMinMax.push(getNum);
            arrVal.push([i, 3, getNum]);
        }
        if (parseInt(keshavarzi[i]) >0) {
            getNum = parseInt(keshavarzi[i]);
            arrMinMax.push(getNum);
            arrVal.push([i, 4, getNum]);
        }
        if (parseInt(tafrihi[i])>0) {
            getNum = parseInt(tafrihi[i]);
            arrMinMax.push(getNum);
            arrVal.push([i, 5, getNum]);
        }
        if (parseInt(sanati[i])>0) {
            getNum = parseInt(sanati[i]);
            arrMinMax.push(getNum);
            arrVal.push([i, 6, getNum]);
        }
        if (parseInt(sayer[i])>0) {
            getNum = parseInt(sayer[i]);
            arrMinMax.push(getNum);
            arrVal.push([i, 7, getNum]);
        }
    }
    var minArray = Math.min.apply(Math, arrMinMax);
    var maxArray = Math.max.apply(Math, arrMinMax);
    ChartUserSpeed = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            renderTo: 'cnsChartUserSpeed',
            style: {
                fontFamily: 'IRANSans'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: 1,
            type: 'category',
            categories: ["10-30", "31-50", "51-70", "71-90", "91-110", "110<"],
            tickmarkPlacement: "on",
            min: 0,
            max: 5,
            labels: {
                formatter: function () {
                    return this.value;
                }
            },
            gridLineColor: '#e6e6e6',
            gridLineDashStyle: 'Dash',
        },
        yAxis: {
            title: {
                enabled: false
            },
            tickInterval: 1,
            type: 'category',
            tickmarkPlacement: "on",
            min: 0,
            max: 7,
            categories: ["مسکونی", "تجاری - اداری", "آموزشی", "غیر مسکونی", "کشاورزی", "تفریحی", "صنعتی", "سایر"],
            labels: {
                step: 1,
                style: {
                    font: '8.5px IRANSans'
                }
            },
            gridLineColor: '#e6e6e6',
            gridLineWidth: 1,
            gridLineDashStyle: 'Dash',
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                var chart = this.series.chart, indexx = this.x, indexy = this.y;
                return '<table style="direction:rtl"><tr><td>' + indexx + '</td></tr>' +
                    '<tr><td>' + chart.yAxis[0].categories[indexy] + '</td></tr>' +
                    '<tr><th>تعداد : </th><td>' + this.point.z + '</td></tr></table>';
            },
            followPointer: true
        },
        plotOptions: {
            series: {
                keys: ['x', 'y', 'z']
            },
            bubble: {
                minSize: "2%",
                maxSize: "6%"
            }
        },
        legend: {
            layout: 'horizontal',
            verticalAlign: 'top',
            align: 'left',
            symbolWidth: 120,
            symbolHeight: 5
        },
        colorAxis: {
            min: minArray,
            max: maxArray,
            minColor: '#ffcc00',
            maxColor: '#e75601',
            reversed: false
        },
        series: [{
            type: 'bubble',
            name: '',
            data: arrVal
        }]
    });
    $("#cnsChartUserSpeed g[class='highcharts-axis highcharts-yaxis'] > path,#cnsChartUserSpeed g[class='highcharts-axis highcharts-xaxis'] > path").attr("stroke", "#666666");
}


var ChartTheGeometry;
function FChartTheGeometry() {
    if ($('#hidFBcTheGeometry').val() == "") return;
    var spltGeometry = $('#hidFBcTheGeometry').val().split('|');
    var hidFBcTheGeometry = JSON.parse("[" + spltGeometry[0].slice(0, -1) + "]");
    var hidFBcTheGeometry2 = JSON.parse("[" + spltGeometry[1].slice(0, -1) + "]");
    var hidFBcTheGeometry3 = JSON.parse("[" + spltGeometry[2].slice(0, -1) + "]");
    var cnsChartTheGeometry = document.getElementById('cnsChartTheGeometry');
    ChartTheGeometry = new Chart(cnsChartTheGeometry, {
        type: 'bar',
        data: {
            labels: [["مستقیم،", "مسطح"], ["مستقیم،", "سربالایی"], ["مستقیم", "سرپایینی"], ["پیچ،", "مسطح"], ["پیچ،", "سربالایی"], ["پیچ،", "سرپایینی"], "تونل", "پل"],
            datasets: [{
                label: ['یک طرفه'],
                data: hidFBcTheGeometry,
                backgroundColor: ['#4A8987'],
                borderColor: ['#4A8987'],
                borderWidth: 1
            }, {
                label: ["دوطرفه", "غیرمجزا"],
                data: hidFBcTheGeometry2,
                backgroundColor: ['#F08976'],
                borderColor: ['#F08976'],
                borderWidth: 1
            }, {
                label: ["دوطرفه با", "جدا کننده ", "فیزیکی"],
                data: hidFBcTheGeometry3,
                backgroundColor: ['#87DCDC'],
                borderColor: ['#87DCDC'],
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                duration: 2000
            },
            indexAxis: 'y',
            responsive: true,
            scales: {
                x: {
                    position: 'top',
                    ticks: {
                        precision: 0,
                        font: {
                            size: 10,
                            family: 'IRANSans'
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 9,
                            family: 'IRANSans'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    rtl: true,
                    display: true,
                    labels: {
                        font: {
                            family: 'IRANSans',
                            size: 9
                        },
                        boxWidth: 13,
                        padding: 14
                    },
                    fullWidth: true
                },
                title: {
                    display: false
                }, tooltip: {
                    titleFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    footerFont: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }
            }
        }
    });
    //Chart.Legend.prototype.afterFit = function () {
    //    this.height = this.height + 50;
    //};
}

var barChartEffectiveWayDefects;
function FBcEffectiveWayDefects() {
    if ($('#hidFBcEffectiveWayDefects').val() == "") return;
    var strAr = JSON.parse("[" + $('#hidFBcEffectiveWayDefects').val().slice(0, -1) + "]");
    var result = [];
    var arr2 = [strAr[0], ["نقص علائم", "عمودی"]];
    var arr3 = [strAr[1], "نقص علائم افقی"];
    var arr4 = [strAr[2], ["کم بودن", "عرض راه"]];
    var arr5 = [strAr[3], ["وجود مانع", "دست‌انداز"]];
    var arr6 = [strAr[4], ["فقدان شانه‌خاکی", "و پارکینگ"]];
    var arr7 = [strAr[5], ["اختلاف سطح", "آسفالت و شانه"]];
    var arr8 = [strAr[6], ["فقدان حفاظ", "ایمنی کنار راه"]];
    var arr9 = [strAr[7], ["غیر استاندارد بودن", "حفاظ کنار راه"]];
    var arr10 = [strAr[8], "نشست جاده‌ای"];
    var arr11 = [strAr[9], "نقص رویه آسفالت"];
    var arr12 = [strAr[10], ["قوس با", "زاویه تند"]];
    var arr13 = [strAr[11], ["شیب عرضی و طولی", "غیر استاندارد"]];
    var arr14 = [strAr[12], ["نقص روشنایی", "راه/معبر"]];
    var arr15 = [strAr[13], ["نقص خط‌کشی", "راه/معبر"]];
    var arr16 = [strAr[14], "سایر"];
    result.push(arr16);
    result.push(arr2);
    result.push(arr3);
    result.push(arr4);
    result.push(arr5);
    result.push(arr6);
    result.push(arr7);
    result.push(arr8);
    result.push(arr9);
    result.push(arr10);
    result.push(arr11);
    result.push(arr12);
    result.push(arr13);
    result.push(arr14);
    result.push(arr15);
    result.sort(sortDesc);
    var arrData = [];
    var arrLabels = [];
    for (var x = 0; x < result.length; x++) {
        arrData[x] = result[x][0];
        arrLabels[x] = result[x][1];
    }
    var cnsBarChartEffectiveWayDefects = document.getElementById('cnsBarChartEffectiveWayDefects');
    barChartEffectiveWayDefects = new Chart(cnsBarChartEffectiveWayDefects, {
        type: 'bar',
        data: {
            labels: arrLabels,
            datasets: [{
                label: '',
                data: arrData,
                backgroundColor: ['#F59D2D'],
                borderColor: ['#F09D30'],
                borderWidth: 1,
                barThickness: 14,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        labelOffset: -8,
                        maxRotation: 90,
                        minRotation: 90,
                        font: {
                            size: 9,
                            family: 'IRANSans'
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        precision: 0,
                        font: {
                            size: 12,
                            family: 'IRANSans'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'left',
                    display: false,
                    labels: {
                        font: {
                            family: 'IRANSans',
                            size: 18
                        }
                    }
                },
                title: {
                    display: false
                }, tooltip: {
                    titleFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    footerFont: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }
            }
        }
    });
}

PEffectiveWayDefects();
FBcEffectiveWayDefects();
FBarChartBarriersToVision();
FChartBarriersToVision();
FChartRoadwayWidth();
FChartUserSpeed();
FChartTheGeometry();

document.addEventListener('DOMContentLoaded', function () {

}, false);

document.onreadystatechange = function () {
    if (document.readyState === "interactive") {   //does same as:  ..addEventListener("DOMContentLoaded"..
        //LoadHideInput();
    }
    if (document.readyState === "complete") {
        //removeData(barChartEffectiveWayDefects);
        //var strAr = JSON.parse("[" + $('#hidFBcEffectiveWayDefects').val() + "]");

        //addData(barChartEffectiveWayDefects, ["ندارد", "نقص علائم عمودی", "نقص علائم افقی", "کم بودن عرض راه", "وجود مانع دست‌انداز", "فقدان شانه‌خاکی و پارکینگ", "اختلاف سطح بین آسفالت و شانه", "فقدان حفاظ ایمنی کنار راه", "غیر استاندارد بودن حفاظ کنار راه", "نشست جاده‌ای", "نقص رویه آسفالت", "قوس با زاویه تند", "شیب عرضی و طولی غیر استاندارد", "نقص روشنایی راه/معبر", "نقص خط‌کشی راه/معبر", "سایر"], strAr);
        //SetFirstChart();
    }
}

function addData(chart, label, data) {
    //chart.data.labels.push(label);
    //chart.data.datasets.forEach((dataset) => {
    //dataset.data.push(data);});
    chart.data.datasets[0].data.push(data);
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets[0].data.pop();
    chart.update();
}

function sortDesc(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? 1 : -1;
    }
}

function sortAsc(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function addCircle(chart) {
    if (this.circle) {
        $(this.circle.element).remove();
    }
    chart.renderer.circle(200, 171, 0).attr({
        fill: '#fff',
    }).attr({
        zIndex: 10000
    }).add();
}
var chartAccidentByDayAndClock;

var chartAccidentByMonthAndClock;

function AccidentByDayAndClock() {
    let splt = $('#hidTimeStepOne').val().split("#");
    let spltTimeStepOneDay0 = splt[0].slice(0, -1).split(',');
    let spltTimeStepOneDay1 = splt[1].slice(0, -1).split(',');
    let spltTimeStepOneDay2 = splt[2].slice(0, -1).split(',');
    let spltTimeStepOneDay3 = splt[3].slice(0, -1).split(',');
    let spltTimeStepOneDay4 = splt[4].slice(0, -1).split(',');
    let spltTimeStepOneDay5 = splt[5].slice(0, -1).split(',');
    let spltTimeStepOneDay6 = splt[6].slice(0, -1).split(',');

    let bubbleInfo = [];
    let bubbleInfoValueForMinMax = [];
    let getNum;
    for (var i = 0; i <= 23; i++) {
        if (spltTimeStepOneDay0[i] !== "0") {
            getNum = parseInt(spltTimeStepOneDay0[i]);
            bubbleInfo.push([i, 0, getNum, "شنبه"]);
            bubbleInfoValueForMinMax.push(getNum);
        }
        if (spltTimeStepOneDay1[i] !== "0") {
            getNum = parseInt(spltTimeStepOneDay1[i]);
            bubbleInfo.push([i, 1, getNum, "یکشنبه"]);
            bubbleInfoValueForMinMax.push(getNum);
        }
        if (spltTimeStepOneDay2[i] !== "0") {
            getNum = parseInt(spltTimeStepOneDay2[i]);
            bubbleInfo.push([i, 2, getNum, "دوشنبه"]);
            bubbleInfoValueForMinMax.push(getNum);
        }
        if (spltTimeStepOneDay3[i] !== "0") {
            getNum = parseInt(spltTimeStepOneDay3[i]);
            bubbleInfo.push([i, 3, getNum, "سه شنبه"]);
            bubbleInfoValueForMinMax.push(getNum);
        }
        if (spltTimeStepOneDay4[i] !== "0") {
            getNum = parseInt(spltTimeStepOneDay4[i]);
            bubbleInfo.push([i, 4, getNum, "چهار شنبه"]);
            bubbleInfoValueForMinMax.push(getNum);
        }
        if (spltTimeStepOneDay5[i] !== "0") {
            getNum = parseInt(spltTimeStepOneDay5[i]);
            bubbleInfo.push([i, 5, getNum, "پنج شنبه"]);
            bubbleInfoValueForMinMax.push(getNum);
        }
        if (spltTimeStepOneDay6[i] !== "0") {
            getNum = parseInt(spltTimeStepOneDay6[i]);
            bubbleInfo.push([i, 6, getNum, "جمعه"]);
            bubbleInfoValueForMinMax.push(getNum);
        }

    }
    var minArray = Math.min.apply(Math, bubbleInfoValueForMinMax);
    var maxArray = Math.max.apply(Math, bubbleInfoValueForMinMax);
    //var minArrayTwo = Math.min.apply(Math, bubbleInfoValueForMinMaxTwo);
    //var maxArrayTwo = Math.max.apply(Math, bubbleInfoValueForMinMaxTwo);

    //bubbleInfo.push([1, 0, parseInt(spltTimeStepOneDay0[0])/*, GetColorScaler(spltTimeStepOneDay0[i])*/]);
    chartAccidentByDayAndClock = new Highcharts.Chart({
        chart: {
            backgroundColor: 'transparent',
            type: 'bubble',
            plotBorderWidth: 0,
            zoomType: 'xy',
            polar: true,
            renderTo: 'divAccidentByDayAndClock',
            style: {
                fontFamily: 'IRANSans'
            },
            margin: [0, 0, 0, 0],
            //marginLeft: 20,
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        //legend: { enabled: false },
        credits: {
            enabled: false
        },
        pane: {
            center: ["55%", "53%"],
            size: '82%',
            startAngle: 0,
            endAngle: 360,
            background: [{
                outerRadius: '103%',
                innerRadius: '14%',
                backgroundColor: "transparent",
                borderWidth: 0,
            }]
        },
        xAxis: {
            tickmarkPlacement: "on",
            tickInterval: 1,
            min: 0,
            max: 24,
            labels: {
                formatter: function () {
                    return this.value;
                }
            },
            lineColor: '#bdbdbd',
            gridLineColor: '#bdbdbd',
            //zIndex: 1
        },
        yAxis: {
            minorGridLineWidth: 0,
            showFirstLabel: false,
            showLastLabel: true,
            tickmarkPlacement: "on",
            tickInterval: 1,
            min: -1,
            max: 6,
            categories: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
            labels: {
                y: 2,
                style: {
                    "font-weight": '800'
                }
            },
            gridLineColor: '#bdbdbd',
            startOnTick: false,
            endOnTick: false
            //zIndex: 1
        },
        tooltip: {
            enabled: true,
            shared: true,
            useHTML: true,
            headerFormat: '<table style="direction:rtl">',
            pointFormat: '<tr><th>ساعت : </th><td>{point.x}</td></tr>' +
                '<tr><th>روز هفته : </th><td>{point.b}</td></tr>' +
                '<tr><th>تعداد : </th><td>{point.z}</td></tr>',
            footerFormat: '</table>',
            followPointer: true
        },
        plotOptions: {
            series: {
                keys: ['x', 'y', 'z', 'b'],
                events: {
                    mouseover: function () {
                        this.group.toFront();//bring series to front when hovered over
                    }
                }
            },
            bubble: {
                minSize: 4,
                maxSize: 14
            }
        },
        legend: {
            layout: 'vertical',
            verticalAlign: 'bottom',
            align: 'left',
            width: 20,
            maxWidth: 20,
            symbolWidth: 5,
            margin: [0, 0, 0, 0],
            symbolHeight: 120
        },
        colorAxis: {
            min: minArray,
            max: maxArray,
            minColor: '#ffcc00',
            maxColor: '#e75601',
            layout: 'vertical',
            reversed: false
        },
        series: [{
            stickyTracking: false,
            //type: 'bubble',
            name: '',
            data: bubbleInfo,
            zIndex: 9
        }]
    });
    $("#divAccidentByDayAndClock > div > svg > defs > clipPath:last-child > circle").attr("r", "180");
    $("#divAccidentByDayAndClock g[class='highcharts-legend-item highcharts-undefined-series highcharts-color-undefined']").attr("transform", "translate(0,-35)");
    $("#divAccidentByDayAndClock .highcharts-legend").attr("transform", "translate(10,246)");
    $("#divAccidentByDayAndClock g[class='highcharts-axis-labels highcharts-coloraxis-labels'] > text").attr("transform", "translate(-12,0)");
}
function AccidentByMonthAndClock() {
    let splt2 = $('#hidTimeStepTwo').val().split("#");

    let spltTimeStepOneMonth0 = splt2[0].slice(0, -1).split(',');
    let spltTimeStepOneMonth1 = splt2[1].slice(0, -1).split(',');
    let spltTimeStepOneMonth2 = splt2[2].slice(0, -1).split(',');
    let spltTimeStepOneMonth3 = splt2[3].slice(0, -1).split(',');
    let spltTimeStepOneMonth4 = splt2[4].slice(0, -1).split(',');
    let spltTimeStepOneMonth5 = splt2[5].slice(0, -1).split(',');
    let spltTimeStepOneMonth6 = splt2[6].slice(0, -1).split(',');
    let spltTimeStepOneMonth7 = splt2[7].slice(0, -1).split(',');
    let spltTimeStepOneMonth8 = splt2[8].slice(0, -1).split(',');
    let spltTimeStepOneMonth9 = splt2[9].slice(0, -1).split(',');
    let spltTimeStepOneMonth10 = splt2[10].slice(0, -1).split(',');
    let spltTimeStepOneMonth11 = splt2[11].slice(0, -1).split(',');
    let bubbleInfoValueForMinMaxTwo = [];
    let bubbleInfoTwo = [];
    let getNum;
    for (var i = 0; i <= 23; i++) {
        if (spltTimeStepOneMonth0[i] !== "0") {
            getNum = parseInt(spltTimeStepOneMonth0[i]);
            bubbleInfoTwo.push([i, 11, getNum, "فروردین"]);
            bubbleInfoValueForMinMaxTwo.push(getNum);
        }
        if (spltTimeStepOneMonth1[i] !== "0") {
            getNum = parseInt(spltTimeStepOneMonth1[i]);
            bubbleInfoTwo.push([i, 10, getNum, "اردیبهشت"]);
            bubbleInfoValueForMinMaxTwo.push(getNum);
        }
        if (spltTimeStepOneMonth2[i] !== "0") {
            getNum = parseInt(spltTimeStepOneMonth2[i]);
            bubbleInfoTwo.push([i, 9, getNum, "خرداد"]);
            bubbleInfoValueForMinMaxTwo.push(getNum);
        }
        if (spltTimeStepOneMonth3[i] !== "0") {
            getNum = parseInt(spltTimeStepOneMonth3[i]);
            bubbleInfoTwo.push([i, 8, getNum, "تیر"]);
            bubbleInfoValueForMinMaxTwo.push(getNum);
        }
        if (spltTimeStepOneMonth4[i] !== "0") {
            getNum = parseInt(spltTimeStepOneMonth4[i]);
            bubbleInfoTwo.push([i, 7, getNum, "مرداد"]);
            bubbleInfoValueForMinMaxTwo.push(getNum);
        }
        if (spltTimeStepOneMonth5[i] !== "0") {
            getNum = parseInt(spltTimeStepOneMonth5[i]);
            bubbleInfoTwo.push([i, 6, getNum, "شهریور"]);
            bubbleInfoValueForMinMaxTwo.push(getNum);
        }
        if (spltTimeStepOneMonth6[i] !== "0") {
            getNum = parseInt(spltTimeStepOneMonth6[i]);
            bubbleInfoTwo.push([i, 5, getNum, "مهر"]);
            bubbleInfoValueForMinMaxTwo.push(getNum);
        }
        if (spltTimeStepOneMonth7[i] !== "0") {
            getNum = parseInt(spltTimeStepOneMonth7[i]);
            bubbleInfoTwo.push([i, 4, getNum, "آبان"]);
            bubbleInfoValueForMinMaxTwo.push(getNum);
        }
        if (spltTimeStepOneMonth8[i] !== "0") {
            getNum = parseInt(spltTimeStepOneMonth8[i]);
            bubbleInfoTwo.push([i, 3, getNum, "آذر"]);
            bubbleInfoValueForMinMaxTwo.push(getNum);
        }
        if (spltTimeStepOneMonth9[i] !== "0") {
            getNum = parseInt(spltTimeStepOneMonth9[i]);
            bubbleInfoTwo.push([i, 2, getNum, "دی"]);
            bubbleInfoValueForMinMaxTwo.push(getNum);
        }
        if (spltTimeStepOneMonth10[i] !== "0") {
            getNum = parseInt(spltTimeStepOneMonth10[i]);
            bubbleInfoTwo.push([i, 1, getNum, "بهمن"]);
            bubbleInfoValueForMinMaxTwo.push(getNum);
        }
        if (spltTimeStepOneMonth11[i] !== "0") {
            getNum = parseInt(spltTimeStepOneMonth11[i]);
            bubbleInfoTwo.push([i, 0, getNum, "اسفند"]);
            bubbleInfoValueForMinMaxTwo.push(getNum);
        }
    }
    var minArray = Math.min.apply(Math, bubbleInfoValueForMinMaxTwo);
    var maxArray = Math.max.apply(Math, bubbleInfoValueForMinMaxTwo);
    chartAccidentByMonthAndClock = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            polar: true,
            renderTo: 'divAccidentByMonthAndClock',
            style: {
                fontFamily: 'IRANSans'
            },
            margin: [0, 0, 0, 0],
            plotBorderWidth: 0,
            zoomType: 'xy',
            //showAxes: true,
            //showEmpty: true
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        pane: {
            center: ["55%", "50%"],
            size: '90%',
            startAngle: 0,
            endAngle: 360,
            background: [{
                outerRadius: '103%',
                innerRadius: '8%',
                backgroundColor: "transparent",
                borderWidth: 0,
            }]
        },
        xAxis: {
            tickmarkPlacement: "on",
            tickInterval: 1,
            min: 0,
            max: 24,
            labels: {
                step: 1,
                formatter: function () {
                    return this.value;
                }
            },
            lineColor: '#bdbdbd',
            gridLineColor: '#bdbdbd',
            zIndex: 1
        },
        yAxis: {
            //minorGridLineWidth: 0,
            showFirstLabel: false,
            showLastLabel: true,
            tickmarkPlacement: "on",
            tickInterval: 1,
            //minorTickInterval: 1,
            min: -1,
            max: 11,
            categories: ["اسفند", "بهمن", "دی", "آذر", "آبان", "مهر", "شهریور", "مرداد", "تیر", "خرداد", "اردیبهشت", "فروردین"],
            labels: {
                step: 1,
                y: 2,
                style: {
                    font: '8px IRANSans',
                    "font-weight": '800'
                },
                zIndex: 1
            },
            gridLineColor: '#bdbdbd'
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<table style="direction:rtl">',
            pointFormat: '<tr><th>ساعت : </th><td>{point.x}</td></tr>' +
                '<tr><th>ماه : </th><td>{point.b}</td></tr>' +
                '<tr><th>تعداد : </th><td>{point.z}</td></tr>',
            footerFormat: '</table>',
            followPointer: true
        },
        plotOptions: {
            series: {
                keys: ['x', 'y', 'z', 'b']
            },
            bubble: {
                minSize: 4,
                maxSize: 14
            }
        },
        legend: {
            layout: 'vertical',
            verticalAlign: 'bottom',
            align: 'left',
            width: 20,
            maxWidth: 20,
            symbolWidth: 5,
            margin: [0, 0, 0, 0],
            symbolHeight: 120
        },
        colorAxis: {
            min: minArray,
            max: maxArray,
            minColor: '#ffcc00',
            maxColor: '#e75601',
            layout: 'vertical',
            reversed: false
        },
        series: [{
            type: 'bubble',
            name: '',
            data: bubbleInfoTwo,
            zIndex: 19
        }]
    });
    $("#divAccidentByMonthAndClock g[class='highcharts-axis-labels highcharts-coloraxis-labels'] > text").attr("transform", "translate(-12,0)");
    $("#divAccidentByMonthAndClock > div > svg > defs > clipPath:last-child > circle").attr("r", "180");
}

var ChartMonthWeek;
function FChartMonthWeek() {
    var spltMonthWeek = $('#hidMonthWeek').val().split('#');
    var spltTMonthWeek0 = spltMonthWeek[0].slice(0, -1).split(',');
    var spltTMonthWeek1 = spltMonthWeek[1].slice(0, -1).split(',');
    var spltTMonthWeek2 = spltMonthWeek[2].slice(0, -1).split(',');
    var spltTMonthWeek3 = spltMonthWeek[3].slice(0, -1).split(',');
    var spltTMonthWeek4 = spltMonthWeek[4].slice(0, -1).split(',');
    var spltTMonthWeek5 = spltMonthWeek[5].slice(0, -1).split(',');
    var spltTMonthWeek6 = spltMonthWeek[6].slice(0, -1).split(',');
    var spltTMonthWeek7 = spltMonthWeek[7].slice(0, -1).split(',');
    var spltTMonthWeek8 = spltMonthWeek[8].slice(0, -1).split(',');
    var spltTMonthWeek9 = spltMonthWeek[9].slice(0, -1).split(',');
    var spltTMonthWeek10 = spltMonthWeek[10].slice(0, -1).split(',');
    var spltTMonthWeek11 = spltMonthWeek[11].slice(0, -1).split(',');

    var arrMonthWeek = [];
    var getNumMonthWeek;
    var arrMonthWeekMinMax = [];
    for (var i = 0; i < 7; i++) {
        if (spltTMonthWeek0[i] !== "0") {
            getNumMonthWeek = parseInt(spltTMonthWeek0[i]);
            arrMonthWeekMinMax.push(getNumMonthWeek);
            arrMonthWeek.push([i, 0, getNumMonthWeek]);
        }
        if (spltTMonthWeek1[i] !== "0") {
            getNumMonthWeek = parseInt(spltTMonthWeek1[i]);
            arrMonthWeekMinMax.push(getNumMonthWeek);
            arrMonthWeek.push([i, 1, getNumMonthWeek]);
        }
        if (spltTMonthWeek2[i] !== "0") {
            getNumMonthWeek = parseInt(spltTMonthWeek2[i]);
            arrMonthWeekMinMax.push(getNumMonthWeek);
            arrMonthWeek.push([i, 2, getNumMonthWeek]);
        }
        if (spltTMonthWeek3[i] !== "0") {
            getNumMonthWeek = parseInt(spltTMonthWeek3[i]);
            arrMonthWeekMinMax.push(getNumMonthWeek);
            arrMonthWeek.push([i, 3, getNumMonthWeek]);
        }
        if (spltTMonthWeek4[i] !== "0") {
            getNumMonthWeek = parseInt(spltTMonthWeek4[i]);
            arrMonthWeekMinMax.push(getNumMonthWeek);
            arrMonthWeek.push([i, 4, getNumMonthWeek]);
        }
        if (spltTMonthWeek5[i] !== "0") {
            getNumMonthWeek = parseInt(spltTMonthWeek5[i]);
            arrMonthWeekMinMax.push(getNumMonthWeek);
            arrMonthWeek.push([i, 5, getNumMonthWeek]);
        }
        if (spltTMonthWeek6[i] !== "0") {
            getNumMonthWeek = parseInt(spltTMonthWeek6[i]);
            arrMonthWeekMinMax.push(getNumMonthWeek);
            arrMonthWeek.push([i, 6, getNumMonthWeek]);
        }
        if (spltTMonthWeek7[i] !== "0") {
            getNumMonthWeek = parseInt(spltTMonthWeek7[i]);
            arrMonthWeekMinMax.push(getNumMonthWeek);
            arrMonthWeek.push([i, 7, getNumMonthWeek]);
        }
        if (spltTMonthWeek8[i] !== "0") {
            getNumMonthWeek = parseInt(spltTMonthWeek8[i]);
            arrMonthWeekMinMax.push(getNumMonthWeek);
            arrMonthWeek.push([i, 8, getNumMonthWeek]);
        }
        if (spltTMonthWeek9[i] !== "0") {
            getNumMonthWeek = parseInt(spltTMonthWeek9[i]);
            arrMonthWeekMinMax.push(getNumMonthWeek);
            arrMonthWeek.push([i, 9, getNumMonthWeek]);
        }
        if (spltTMonthWeek10[i] !== "0") {
            getNumMonthWeek = parseInt(spltTMonthWeek10[i]);
            arrMonthWeekMinMax.push(getNumMonthWeek);
            arrMonthWeek.push([i, 10, getNumMonthWeek]);
        }
        if (spltTMonthWeek11[i] !== "0") {
            getNumMonthWeek = parseInt(spltTMonthWeek11[i]);
            arrMonthWeekMinMax.push(getNumMonthWeek);
            arrMonthWeek.push([i, 11, getNumMonthWeek]);
        }
    }
    var minArray = Math.min.apply(Math, arrMonthWeekMinMax);
    var maxArray = Math.max.apply(Math, arrMonthWeekMinMax);
    ChartMonthWeek = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            renderTo: 'cnsChartMonthWeek',
            style: {
                fontFamily: 'IRANSans'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: 1,
            type: 'category',
            categories: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
            tickmarkPlacement: "on",
            min: 0,
            max: 6,
            labels: {
                formatter: function () {
                    return this.value;
                }
            },
            gridLineColor: '#e6e6e6',
            gridLineDashStyle: 'Dash',
        },
        yAxis: {
            title: {
                enabled: false
            },
            tickInterval: 1,
            type: 'category',
            tickmarkPlacement: "on",
            min: 0,
            max: 11,
            categories: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
            labels: {
                step: 1,
                style: {
                    font: '8.5px IRANSans'
                }
            },
            gridLineColor: '#e6e6e6',
            gridLineWidth: 1,
            gridLineDashStyle: 'Dash',
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                var chart = this.series.chart,
                    index = this.y;
                return '<table style="direction:rtl"><tr><th>روز : </th><td>' + GetDayScalerSmall(this.x) + '</td></tr>' +
                    '<tr><th>ماه : </th><td>' + chart.yAxis[0].categories[index] + '</td></tr>' +
                    '<tr><th>تعداد : </th><td>' + this.point.z + '</td></tr></table>';
            },
            followPointer: true
        },
        plotOptions: {
            series: {
                keys: ['x', 'y', 'z']
            },
            bubble: {
                minSize: 4,
                maxSize: 14
            }
        },
        legend: {
            layout: 'horizontal',
            verticalAlign: 'top',
            align: 'right',
            symbolWidth: 120,
            symbolHeight: 5
        },
        colorAxis: {
            min: minArray,
            max: maxArray,
            minColor: '#ffcc00',
            maxColor: '#e75601',
            reversed: false
        },
        series: [{
            type: 'bubble',
            name: '',
            data: arrMonthWeek
        }]
    });
    $("#cnsChartMonthWeek g[class='highcharts-axis highcharts-yaxis'] > path,#cnsChartMonthWeek g[class='highcharts-axis highcharts-xaxis'] > path").attr("stroke", "#666666");
}

var ChartByHolidayNotHoliday;
function BarChartByHolidayNotHoliday() {
    var spltByHolidayNotHoliday = $('#hidHolidayNotHoliday').val().split('#');
    var holiday = JSON.parse("[" + spltByHolidayNotHoliday[0].slice(0, -1) + "]");
    var notHoliday = JSON.parse("[" + spltByHolidayNotHoliday[1].slice(0, -1) + "]");
    ChartByHolidayNotHoliday = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'column',
            renderTo: 'cnsChartByHolidayNotHoliday',
            //margin: [10, 10, 10, 10],
            style: {
                fontFamily: 'IRANSans'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            gridLineWidth: 0,
            tickInterval: 1,
            type: 'category',
            categories: ["اسفند", "بهمن", "دی", "آذر", "آبان", "مهر", "شهریور", "مرداد", "تیر", "خرداد", "اردیبهشت", "فروردین"],
            tickmarkPlacement: "on",
            min: 0,
            max: 11,
            labels: {
                formatter: function () {
                    return this.value;
                }
            },
            lineWidth: 1,
            lineColor: '#bdbdbd'
        },
        yAxis: {
            title: {
                enabled: false
            },
            tickInterval: 10,
            tickmarkPlacement: "on",
            min: 0,
            max: 1000,
            labels: {
                step: 1,
                style: {
                    font: '8.5px IRANSans'
                }
            },
            gridLineWidth: 0,
            tickWidth: 2,
            tickColor: '#bdbdbd',
            lineWidth: 1,
            lineColor: '#bdbdbd'
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                var chart = this.series.chart;
                return '<table style="direction:rtl">' +
                    '<tr><th>ماه : </th><td>' + chart.xAxis[0].categories[this.point.x] + '</td></tr>' +
                    //'<tr><th>وضعیت : </th><td>' + chart.xAxis[0].categories[this.point.x] + '</td></tr>' +
                    '<tr><th>تعداد : </th><td>' + this.point.y + '</td></tr></table>';
            },
            followPointer: true
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                //dataLabels: {
                //    enabled: true
                //}
            }
        },
        colors: ['#4A8987', '#F08976'],
        legend: {
            rtl: true,
            floating: false,
            layout: 'vertical',
            verticalAlign: 'top',
            align: 'right', itemMarginBottom: 7,
            symbolWidth: 15, symbolHeight: 12,
            symbolRadius: 4, squareSymbol: false,
            itemStyle: {
                fontSize: '9px',
                font: 'IRANSans',
                color: '#626262',
                fontWeight: 'lighter'
            }
        },
        series: [{
            name: 'روزهای غیرتعطیل',
            data: notHoliday
        }, {
            name: 'روزهای تعطیل',
            data: holiday
        }]
    });
}

//<%--اسکریپت مشخصات تصادف--%>

var ChartCollisionOfTwo;
function FChartCollisionOfTwo() {
    var getHide = $('#hidCollisionOfTwo').val().split(",");
    var arrGetHide = [];
    for (var i = 0; i < 5; i++) {
        if (i === 0) arrGetHide.push([parseInt(getHide[i]), 'جلو به عقب']);
        else if (i === 1) arrGetHide.push([parseInt(getHide[i]), 'پهلو به پهلو خلاف جهت']);
        else if (i === 2) arrGetHide.push([parseInt(getHide[i]), 'رخ به رخ']);
        else if (i === 3) arrGetHide.push([parseInt(getHide[i]), 'زاویه‌ای']);
        else if (i === 4) arrGetHide.push([parseInt(getHide[i]), 'پهلو به پهلو هم جهت']);
    }
    ChartCollisionOfTwo = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            renderTo: 'cnsChartCollisionOfTwo',
            margin: [0, 0, 0, 0],
            style: {
                fontFamily: 'IRANSans'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<table style="direction:rtl">' +
                    '<tr><td>' + this.point.name + '</td></tr>' +
                    '<tr><th>تعداد : </th><td>' + this.point.y + '</td></tr></table>';
            },
            followPointer: true
        },
        plotOptions: {
            series: {
                keys: ['y', 'name']
            },
            pie: {
                allowPointSelect: true,
                showInLegend: true
            }
        },
        legend: {
            verticalAlign: 'top',
            y: -10,
            rtl: true,
            floating: false,
            layout: 'horizontal',
            //width: '100%',
            //itemDistance: 50,
            align: 'right',
            itemMarginBottom: 7,
            //itemMarginLeft: 5,
            symbolHeight: 12,
            symbolWidth: 15,
            squareSymbol: false,
            symbolRadius: 4,
            itemStyle: {
                fontSize: '9px',
                font: 'IRANSans',
                color: '#626262',
                fontWeight: 'lighter'
            }
        },
        colors: ['#7e2028', '#f4c5c5', '#c22c38', '#ad656b', '#460d12'],
        series: [{
            type: 'pie', center: ["30%", "50%"],
            innerSize: '50%',
            size: '70%',
            data: arrGetHide,
            ////showInLegend: true,
            dataLabels: {
                formatter: function () {
                    if (this.y > 0) {
                        return this.y;
                    }
                },
                distance: -20
            }
        }],
    });
    //$("#cnsChartCollisionOfTwo .highcharts-legend").attr("transform", "translate(185,0)");
    $("#cnsChartCollisionOfTwo .highcharts-series-group").attr("transform", "translate(0,30)");
    $("#cnsChartCollisionOfTwo g[class='highcharts-data-labels highcharts-series-0 highcharts-pie-series highcharts-tracker']").attr("transform", "translate(0,30)");
    //ChartCollisionOfOne.setSize(400, 300);
}

var ChartTypeOfCollision;
function FChartTypeOfCollision() {
    let getHide = $('#hidTypeOfCollision').val().split(",");
    let strArOtherTypeOfCollision = $('#hidFBcOtherTypeOfCollision').val().split(",");
    let getOtherSum = 0;
    for (let j = 0; j < strArOtherTypeOfCollision.length; j++)getOtherSum += parseInt(strArOtherTypeOfCollision[j]);
    let arrGetHide = [];
    for (let i = 0; i < 6; i++) {
        if (i === 0) arrGetHide.push([parseInt(getHide[i]), 'تک وسیله‌ای']);
        else if (i === 1) arrGetHide.push([parseInt(getHide[i]), 'دو وسیله‌ای']);
        else if (i === 2) arrGetHide.push([parseInt(getHide[i]), 'چند وسیله‌ای']);
        else if (i === 3) arrGetHide.push([parseInt(getHide[i]), 'وسیله نقلیه با موتورسیکلت']);
        else if (i === 4) arrGetHide.push([parseInt(getHide[i]), 'وسیله نقلیه با عابر']);
        else if (i === 5) arrGetHide.push([parseInt(getOtherSum), 'سایر ']);
    }

    ChartTypeOfCollision = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            renderTo: 'cnsChartTypeOfCollision',
            margin: [0, 0, 0, 0],
            style: {
                fontFamily: 'IRANSans'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<table style="direction:rtl">' +
                    '<tr><td>' + this.point.name + '</td></tr>' +
                    '<tr><th>تعداد : </th><td>' + this.point.y + '</td></tr></table>';
            },
            followPointer: true
        },
        plotOptions: {
            series: {
                keys: ['y', 'name']
            }
        },
        legend: {
            rtl: true,
            layout: 'vertical',
            verticalAlign: 'top',
            align: 'right',
            itemMarginBottom: 7,
            symbolHeight: 12,
            symbolWidth: 15,
            squareSymbol: false,
            symbolRadius: 4,
            itemStyle: {
                fontSize: '10px',
                font: 'IRANSans',
                color: '#626262', fontWeight: 'lighter'
            }
        },
        colors: ['#4a8987', '#7e2028', '#cb644e', '#ffd461', '#5693ba', '#f59d2d'],
        series: [{
            center: ["37%", "50%"],
            type: 'pie',
            innerSize: '50%',
            data: arrGetHide,
            showInLegend: true,
            dataLabels: {
                formatter: function () {
                    if (this.y > 0) {
                        return this.y;
                    }
                },
                distance: 10
            }
        }]
    });
}

var ChartCollisionOfOne;
function FChartCollisionOfOne() {
    var getHide = $('#hidCollisionOfOne').val().split(",");
    var arrGetHide = [];
    for (var i = 0; i < 3; i++) {
        if (i === 0) arrGetHide.push([parseInt(getHide[i]), 'خروج از جاده']);
        else if (i === 1) arrGetHide.push([parseInt(getHide[i]), 'واژگونی و سقوط']);
        else if (i === 2) arrGetHide.push([parseInt(getHide[i]), 'برخورد با شی ثابت']);
    }

    ChartCollisionOfOne = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            renderTo: 'cnsChartCollisionOfOne',
            margin: [0, 0, 0, 0],
            //marginTop:20,
            style: {
                fontFamily: 'IRANSans'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<table style="direction:rtl">' +
                    '<tr><td>' + this.point.name + '</td></tr>' +
                    '<tr><th>تعداد : </th><td>' + this.point.y + '</td></tr></table>';
            },
            followPointer: true
        },
        plotOptions: {
            series: {
                keys: ['y', 'name']
            },
            pie: {
                allowPointSelect: true,
                showInLegend: true
            }
        },
        legend: {
            rtl: true,
            layout: 'vertical',
            verticalAlign: 'top',
            align: 'right',
            width: '100%',
            itemMarginBottom: 7,
            symbolHeight: 12,
            symbolWidth: 15,
            squareSymbol: false,
            symbolRadius: 4,
            itemStyle: {
                fontSize: '10px',
                font: 'IRANSans',
                color: '#626262', fontWeight: 'lighter'
            }
        },
        colors: ['#87dcdc', '#4a8987', '#295150'],
        series: [{
            type: 'pie',
            innerSize: '50%',
            size: '75%',
            data: arrGetHide,
            //showInLegend: true,
            dataLabels: {
                formatter: function () {
                    if (this.y > 0) {
                        return this.y;
                    }
                },
                distance: -20
            }
        }]
    });
    //$("#cnsChartCollisionOfOne .highcharts-legend").attr("transform", "translate(185,0)");
    $("#cnsChartCollisionOfOne .highcharts-series-group").attr("transform", "translate(-30,20)");
    $("#cnsChartCollisionOfOne g[class='highcharts-data-labels highcharts-series-0 highcharts-pie-series highcharts-tracker']").attr("transform", "translate(-30,10)");
    //ChartCollisionOfOne.setSize(400, 300);
}

var barChartOtherTypeOfCollision;
function FBcOtherTypeOfCollision() {
    let strAr = JSON.parse("[" + $('#hidFBcOtherTypeOfCollision').val() + "]");
    let result = [];
    let arr1 = [strAr[14], ["دوچرخه با", "دوچرخه"]];
    let arr2 = [strAr[13], ["دوچرخه با وسیله", "پارک شده"]];
    let arr3 = [strAr[12], ["دوچرخه با", "حیوان"]];
    let arr4 = [strAr[11], "دوچرخه با عابر"];
    let arr5 = [strAr[10], "حریق"];
    let arr6 = [strAr[9], "پرتاب سرنشین"];
    let arr7 = [strAr[8], "چند برخوردی"];
    let arr8 = [strAr[7], ["موتورسیکلت با", "شي ثابت"]];
    let arr9 = [strAr[6], ["موتورسیکلت", "با عابر"]];
    let arr10 = [strAr[5], ["موتورسیکلت", "با دوچرخه"]];
    let arr11 = [strAr[4], ["موتورسیکلت با", "وسیله پارک شده"]];
    let arr12 = [strAr[3], ["موتورسیکلت با", "موتورسیکلت"]];
    let arr13 = [strAr[2], ["وسیله نقلیه", "با حیوان"]];
    let arr14 = [strAr[1], ["وسیله نقلیه با وسیله", "پارک شده"]];
    let arr15 = [strAr[0], ["وسیله نقلیه", "با دوچرخه"]];
    result.push(arr1);
    result.push(arr2);
    result.push(arr3);
    result.push(arr4);
    result.push(arr5);
    result.push(arr6);
    result.push(arr7);
    result.push(arr8);
    result.push(arr9);
    result.push(arr10);
    result.push(arr11);
    result.push(arr12);
    result.push(arr13);
    result.push(arr14);
    result.push(arr15);
    result.sort(sortAsc);
    var arrData = [];
    var arrLabels = [];
    for (var x = 0; x < result.length; x++) {
        arrData[x] = result[x][0];
        arrLabels[x] = result[x][1];
    }

    var cnsBarChartOtherTypeOfCollision = document.getElementById('cnsBarChartOtherTypeOfCollision');
    barChartOtherTypeOfCollision = new Chart(cnsBarChartOtherTypeOfCollision, {
        type: 'bar',
        data: {
            labels: arrLabels,
            datasets: [{
                label: '',
                data: arrData,
                backgroundColor: ['#f59d2d'],
                borderColor: ['#f59d2d'],
                borderWidth: 1,
                barThickness: 25,
            }]
        },
        options: {
            //aspectRatio: 4,
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 8,
                            family: 'IRANSans'
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        precision: 0, font: {
                            size: 12,
                            family: 'IRANSans'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                }, tooltip: {
                    titleFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    footerFont: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }
            }
        }
    });
    //
}

//<%--پایان اسکریپت مشخصات تصادف--%>


var ChartVehicleBubble;
function FChartVehicleBubble() {
    var splt = $('#hidVehicleBubble').val().split('#');
    var splt0 = splt[0].slice(0, -1).split(',');
    var splt1 = splt[1].slice(0, -1).split(',');
    var splt2 = splt[2].slice(0, -1).split(',');
    var splt3 = splt[3].slice(0, -1).split(',');
    var splt4 = splt[4].slice(0, -1).split(',');
    var splt5 = splt[5].slice(0, -1).split(',');
    var splt6 = splt[6].slice(0, -1).split(',');
    var splt7 = splt[7].slice(0, -1).split(',');
    var getNum;
    var arrMinMax = [];
    var arrVehicle = [];
    for (var i = 0; i < 6; i++) {
        if (splt0[i] !== "0") {
            getNum = parseInt(splt0[i]);
            arrMinMax.push(getNum);
            arrVehicle.push([7, i, getNum]);
        }
        if (splt1[i] !== "0") {
            getNum = parseInt(splt1[i]);
            arrMinMax.push(getNum);
            arrVehicle.push([6, i, getNum]);
        }
        if (splt2[i] !== "0") {
            getNum = parseInt(splt2[i]);
            arrMinMax.push(getNum);
            arrVehicle.push([5, i, getNum]);
        }
        if (splt3[i] !== "0") {
            getNum = parseInt(splt3[i]);
            arrMinMax.push(getNum);
            arrVehicle.push([4, i, getNum]);
        }
        if (splt4[i] !== "0") {
            getNum = parseInt(splt4[i]);
            arrMinMax.push(getNum);
            arrVehicle.push([3, i, getNum]);
        }
        if (splt5[i] !== "0") {
            getNum = parseInt(splt5[i]);
            arrMinMax.push(getNum);
            arrVehicle.push([2, i, getNum]);
        }
        if (splt6[i] !== "0") {
            getNum = parseInt(splt6[i]);
            arrMinMax.push(getNum);
            arrVehicle.push([1, i, getNum]);
        }
        if (splt7[i] !== "0") {
            getNum = parseInt(splt7[i]);
            arrMinMax.push(getNum);
            arrVehicle.push([0, i, getNum]);
        }
    }
    var minArray = Math.min.apply(Math, arrMinMax);
    var maxArray = Math.max.apply(Math, arrMinMax);
    ChartVehicleBubble = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            renderTo: 'cnsChartVehicleBar',
            style: {
                fontFamily: 'IRANSans'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            tickInterval: 1,
            type: 'category',
            categories: ["سایر", "صنعتی", "تفریحی", "کشاورزی", "غیرمسکونی", "آموزشی", "اداری تجاری", "مسکونی"],
            tickmarkPlacement: "on",
            min: 0,
            max: 7,
            labels: {
                rotation: 90, step: 1, useHTML: true,
                style: {
                    //width: 25,
                    font: '8.5px IRANSans',
                    'text-align': 'justify'
                },
                //formatter: function () {
                //    return this.value;
                //}
            },
            gridLineWidth: 1,
            gridLineColor: '#e6e6e6',
            gridLineDashStyle: 'Dash',
        },
        yAxis: {
            title: {
                enabled: false
            },
            tickInterval: 1,
            type: 'category',
            tickmarkPlacement: "on",
            min: 0,
            max: 5,
            categories: ["سایر", "مواد سوختنی", "محصولات کشاورزی", "مصالح ساختمانی", "مواد خطرناک", "بار ندارد"],
            labels: {
                useHTML: true,
                step: 1,
                style: {
                    width: 44,
                    font: '8.5px IRANSans',
                    'text-align': 'right'
                }
            },
            gridLineColor: '#e6e6e6',
            gridLineWidth: 1,
            gridLineDashStyle: 'Dash'
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                var chart = this.series.chart, indexx = this.x, indexy = this.y;
                return '<table style="direction:rtl"><tr><td>' + indexx + '</td></tr>' +
                    '<tr><td>' + chart.yAxis[0].categories[indexy] + '</td></tr>' +
                    '<tr><th>تعداد : </th><td>' + this.point.z + '</td></tr></table>';
            },
            followPointer: true
        },
        plotOptions: {
            series: {
                keys: ['x', 'y', 'z']
            },
            bubble: {
                minSize: "2%",
                maxSize: "6%"
            }
        },
        legend: {
            layout: 'horizontal',
            verticalAlign: 'top',
            align: 'left',
            symbolWidth: 120,
            symbolHeight: 5
        },
        colorAxis: {
            min: minArray,
            max: maxArray,
            minColor: '#ffcc00',
            maxColor: '#e75601',
            reversed: false
        },
        series: [{
            type: 'bubble',
            name: '',
            data: arrVehicle
        }]
    });
    $("#cnsChartVehicleBar g[class='highcharts-axis highcharts-yaxis'] > path,#cnsChartVehicleBar g[class='highcharts-axis highcharts-xaxis'] > path").attr("stroke", "#666666");
}


var ChartTechnicalDiagnosis;
function BChartTechnicalDiagnosis() {
    var splt = $('#hidVehicleTechnicalDiagnosis').val().split('#');
    var hidDiagnosis1 = JSON.parse("[" + splt[0].slice(0, -1) + "]");
    var hidDiagnosis2 = JSON.parse("[" + splt[1].slice(0, -1) + "]");
    var hidDiagnosis3 = JSON.parse("[" + splt[2].slice(0, -1) + "]");
    ChartTechnicalDiagnosis = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'bar',
            renderTo: 'cnsTechnicalDiagnosis',
            //margin: [0, 0, 0, 0],
            style: {
                fontFamily: 'IRANSans'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            gridLineWidth: 0,
            tickInterval: 1,
            type: 'category',
            categories: ["نقص سیستم روشنایی", "نقص سیستم ترمز", "نقص دستگاه تعلیق", "نقص سیستم فرمان", "فقدان زنجیر چرخدر مواقع ضروری", "صاف بودن لاستیک", "فقدان برف پاک کن در موقع ضروری", "سایر"],
            tickmarkPlacement: "on",
            min: 0,
            max: 7,
            labels: {
                style: {
                    width: '70px',
                    font: '8.5px IRANSans'
                }
            }, lineWidth: 1,
            lineColor: '#bdbdbd'
        },
        yAxis: {
            tickWidth: 2,
            tickColor: '#bdbdbd',
            opposite: true,
            title: {
                enabled: false
            },
            tickInterval: 10,
            tickmarkPlacement: "on",
            min: 0,
            labels: {
                step: 1,
                style: {
                    font: '8.5px IRANSans'
                }
            },
            gridLineWidth: 0,
            lineWidth: 1,
            lineColor: '#bdbdbd'
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                var chart = this.series.chart;
                return '<table style="direction:rtl">' +
                    '<tr><th>ماه : </th><td>' + chart.xAxis[0].categories[this.point.x] + '</td></tr>' +
                    //'<tr><th>وضعیت : </th><td>' + chart.xAxis[0].categories[this.point.x] + '</td></tr>' +
                    '<tr><th>تعداد : </th><td>' + this.point.y + '</td></tr></table>';
            },
            followPointer: true
        },
        plotOptions: {
            bar: {
                stacking: 'normal',

                //dataLabels: {
                //    enabled: true
                //}
            }
        },
        colors: ['#4A8987', '#CB644E', '#87DCDC'],
        legend: {
            x: 15,
            rtl: true,
            floating: true,
            layout: 'vertical',
            verticalAlign: 'middle',
            align: 'right', itemMarginBottom: 7,
            symbolWidth: 15, symbolHeight: 12,
            symbolRadius: 4, squareSymbol: false,
            itemStyle: {
                fontSize: '9px',
                font: 'IRANSans',
                color: '#626262',
                fontWeight: 'lighter'
            }
        },
        series: [{
            name: 'دارد',
            data: hidDiagnosis1
        }, {
            name: 'ندارد',
            data: hidDiagnosis2
        }, {
            name: 'نیاز ندارد',
            data: hidDiagnosis3
        }]

    });
}

var ChartManeuver;
function FChartManeuver() {
    var getHide = $('#hidManeuver').val().split(",");
    var arrGetHide = [];
    for (var i = 0; i < 12; i++) {
        if (i === 0) arrGetHide.push([parseInt(getHide[i]), 'حرکت به جلو']);
        else if (i === 1) arrGetHide.push([parseInt(getHide[i]), 'گردش به چپ']);
        else if (i === 2) arrGetHide.push([parseInt(getHide[i]), 'گردش به راست']);
        else if (i === 3) arrGetHide.push([parseInt(getHide[i]), 'دور زدن']);
        else if (i === 4) arrGetHide.push([parseInt(getHide[i]), 'سبقت']);
        else if (i === 5) arrGetHide.push([parseInt(getHide[i]), 'حرکت به عقب']);
        else if (i === 6) arrGetHide.push([parseInt(getHide[i]), 'شروع حرکت ناگهانی']);
        else if (i === 7) arrGetHide.push([parseInt(getHide[i]), 'توقف ناگهانی']);
        else if (i === 8) arrGetHide.push([parseInt(getHide[i]), 'توقف در خارج راه']);
        else if (i === 9) arrGetHide.push([parseInt(getHide[i]), 'توقف در سطح راه']);
        else if (i === 10) arrGetHide.push([parseInt(getHide[i]), 'حرکت مارپیچ']);
        else if (i === 11) arrGetHide.push([parseInt(getHide[i]), 'سایر']);
    }
    ChartManeuver = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            renderTo: 'cnsChartVehicleContributionManeuver',
            margin: [0, 0, 0, 0],
            //marginTop:20,
            style: {
                fontFamily: 'IRANSans'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<table style="direction:rtl">' +
                    '<tr><td>' + this.point.name + '</td></tr>' +
                    '<tr><th>تعداد : </th><td>' + this.point.y + '</td></tr></table>';
            },
            followPointer: true
        },
        plotOptions: {
            series: {
                keys: ['y', 'name'],
                dataLabels: {
                    enabled: false
                }
            },
            pie: {
                allowPointSelect: true,
                showInLegend: true
            }
        },
        legend: {
            rtl: true,
            layout: 'vertical',
            verticalAlign: 'top',
            align: 'right',
            width: '100%',
            itemMarginBottom: 5,
            symbolHeight: 12,
            symbolWidth: 17,
            squareSymbol: false,
            symbolRadius: 4,
            itemStyle: {
                fontSize: '9px',
                font: 'IRANSans',
                color: '#626262', fontWeight: 'lighter'
            }
        },
        colors: ['#7E2028', '#8EBF93', '#0F527D', '#F08976', '#4A8987', '#5693BA', '#755685', '#FFD461', '#F59D2D', '#8FB9AB', '#CB644E', '#87DCDC'],
        series: [{
            type: 'pie',
            innerSize: '50%',
            size: '50%',
            data: arrGetHide,
            //showInLegend: true,
            //dataLabels: {
            //    formatter: function () {
            //        if (this.y > 0) {
            //            return this.y;
            //        }
            //    },
            //    distance: -20
            //}
        }]
    });
    $("#cnsChartVehicleContributionManeuver g[class='highcharts-series-group']").attr("transform", "translate(-50,-30)");
}

var ChartCodeCausing;
function FChartCodeCausing() {
    var getHide = $('#hidCodeCausing').val().split(",");
    var arrGetHide = [];
    for (var i = 0; i < 7; i++) {
        if (i === 0) arrGetHide.push([parseInt(getHide[i]), "تجاوز از سرعت 30 تا 50 کیلومتر در ساعت"]);
        else if (i === 1) arrGetHide.push([parseInt(getHide[i]), "تجاوز از سرعت 50 کیلومتر در ساعت"]);
        else if (i === 2) arrGetHide.push([parseInt(getHide[i]), "رانندگی در حالت مستی ،داروهای روانگردان و افیونی"]);
        else if (i === 3) arrGetHide.push([parseInt(getHide[i]), "سبقت غیرمجاز در راه های دوطرفه"]);
        else if (i === 4) arrGetHide.push([parseInt(getHide[i]), "عبور از چراغ قرمز راهنمایی"]);
        else if (i === 5) arrGetHide.push([parseInt(getHide[i]), "سایر"]);
    }
    ChartCodeCausing = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            renderTo: 'cnsChartCodeCausingAccident',
            margin: [0, 0, 0, 0],
            //marginTop:20,
            style: {
                fontFamily: 'IRANSans'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<table style="direction:rtl">' +
                    '<tr><td>' + this.point.name + '</td></tr>' +
                    '<tr><th>تعداد : </th><td>' + this.point.y + '</td></tr></table>';
            },
            followPointer: true
        },
        plotOptions: {
            series: {
                keys: ['y', 'name'],
                dataLabels: {
                    enabled: false
                }
            },
            pie: {
                allowPointSelect: true,
                showInLegend: true
            }
        },
        legend: {
            rtl: true,
            layout: 'vertical',
            verticalAlign: 'top',
            align: 'right',
            width: '100%',
            itemMarginBottom: 5,
            symbolHeight: 12,
            symbolWidth: 17,
            squareSymbol: false,
            symbolRadius: 4,
            itemStyle: {
                fontSize: '9px',
                font: 'IRANSans',
                color: '#626262', fontWeight: 'lighter'
            }
        },
        colors: ['#7E2028', '#4A8987', '#F59D2D', '#FFD461', '#F08976', '#87DCDC'],
        series: [{
            type: 'pie',
            innerSize: '50%',
            size: '50%',
            data: arrGetHide
        }]
    });
    $("#cnsChartCodeCausingAccident g[class='highcharts-series-group']").attr("transform", "translate(-60,40)");
}

var ChartIsLocalDriver;
function BChartIsLocalDriver() {
    let splt = $('#hidIsLocalDriver').val().split('#');
    let hidIsLocalDriver1 = JSON.parse("[" + splt[0] + "]");
    let hidIsLocalDriver2 = JSON.parse("[" + splt[1] + "]");
    let cnsChartIsLocalDriver = document.getElementById('cnsChartIsLocalDriver');
    ChartIsLocalDriver = new Chart(cnsChartIsLocalDriver, {
        type: 'bar',
        data: {
            labels: [["تجاوز از سرعت", "مقرره"], ["عدم توانایی در", "کنترل نقلیه"], ["تغییر مسیر", "ناگهانی"], ["نقض ماده 4 قانون", "ایمنی راه ها"], ["نقص فنی مستمر ", "وسیله نقلیه"], ["حرکت در خلاف ", "جهت"], ["عبور از محل ", "ممنوع"], ["انحراف به چپ", ""], ["عدم توجه به ", "جلو"], ["عدم رعایت حق ", "تقدم"], ["عدم رعایت فاصله ", "طولی"], ["عبور از چراغ ", "قرمز"], ["سایر علل", ""]],
            datasets: [
                {
                    label: '',
                    data: hidIsLocalDriver1,
                    backgroundColor: ['#F08976'],
                    borderColor: ['#F08976'],
                    borderWidth: 1,
                    barThickness: 13,
                    barPercentage: 0.5,


                }
            ],

        },
        //
        options: {
            rotation: 90,
            indexAxis: 'y',
            responsive: true,
            scales: {
                x: {
                    position: 'top',
                    display: true,
                    scalePositionBottom: false,
                    ticks: {
                        //maxRotation: 90,
                        //minRotation: 90,
                        font: {
                            size: 9,
                            family: 'IRANSans'
                        }
                    },
                    grid: {
                        display: false
                    },
                    stacked: true
                },
                y: {
                    ticks: {
                        font: {
                            size: 9,
                            family: 'IRANSans'
                        }
                    },
                    grid: {
                        display: false
                    },
                    stacked: true
                }
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    rtl: true,
                    display: false,
                    labels: {
                        font: {
                            family: 'IRANSans',
                            size: 9
                        },
                        boxWidth: 13
                    },
                    maxWidth: 50,
                    //fullWidth: true,
                    align: "start"
                },
                title: {
                    display: false
                }, tooltip: {
                    titleFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    footerFont: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }
            }
        }
    });
}

var ChartUserAndVehiclePie;
function BUserAndVehiclePie() {
    var hidUserAndVehicle = JSON.parse("[" + $('#hidUserAndVehicle').val().split("#")[0] + "]");
    var cnsUserAndVehiclePie = document.getElementById('cnsUserAndVehiclePie');
    ChartUserAndVehiclePie = new Chart(cnsUserAndVehiclePie, {
        type: 'pie',
        data: {
            labels: ['سواری', 'غیر سواری', 'موتور سیکلت', 'عابر پیاده'],
            datasets: [{
                label: '',
                data: hidUserAndVehicle,
                backgroundColor: [
                    '#F08976',
                    '#4A8987',
                    '#87DCDC',
                    '#7E2028'
                ],
                borderColor: [
                    '#F08976',
                    '#4A8987',
                    '#87DCDC',
                    '#7E2028'
                ],
                hoverOffset: 4,
                borderWidth: 1,
                offset: 2
                //spacing:0.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    display: function (context) {
                        return context.dataset.data[context.dataIndex] !== 0;
                    },
                    textAlign: 'center',
                    color: '#fff',
                    formatter: function (val, ctx) {
                        return ctx.chart.data.labels[ctx.dataIndex];
                    },
                    font: {
                        size: 8,
                        family: 'IRANSans'
                    }
                },
                legend: {
                    display: false
                },
                title: {
                    display: false
                }, tooltip: {
                    bodyFont: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }
            }
        }, plugins: [ChartDataLabels]
    });
}

var ChartUserAndVehicleBar;
function BUserAndVehicleBar() {
    //var hidUserAndVehicle = JSON.parse("[" + $('#hidUserAndVehicle').val().split("#")[1] + "]");
    var hidUserAndVehicle = $('#hidUserAndVehicle').val().split("#")[1];
    var data = [];
    let names = ["مینی بوس", "اتوبوس", "وانت بار", "کامیون", "کامیونت", "آمبولانس", "خودرو آتش ‌نشانی", "خودرو پلیس", "تریلی", "دوچرخه", "ادوات کشاورزی", "ادوات راه‌سازی", "تانکر مواد خطرناک", "سایر"];
    for (var i = 0; i < 15; i++) {
        data.push([names[i], parseInt(hidUserAndVehicle.split(",")[i])]);
    }
    //hidUserAndVehicle.sort(sortDesc);
    ChartUserAndVehicleBar = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'column',
            renderTo: 'cnsUserAndVehicleBar',
            //margin: [10, 10, 10, 10],
            style: {
                fontFamily: 'IRANSans'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            gridLineWidth: 0,
            tickInterval: 1,
            type: 'category',
            //categories: ["مینی بوس", "اتوبوس", "وانت بار", "کامیون", "کامیونت", "آمبولانس", "خودرو آتش ‌نشانی", "خودرو پلیس", "موتورسیکلت", "تریلی", "دوچرخه", "ادوات کشاورزی", "ادوات راه‌سازی", "تانکر مواد خطرناک", "سایر"],
            tickmarkPlacement: "on",
            min: 0,
            max: 14,

            labels: {
                rotation: 90,
                //step: 1,
                style: {
                    zIndex: 0,
                    width: 50,
                    font: '8.5px IRANSans',
                    'text-align': 'left'
                },
            },
            lineWidth: 1,
            lineColor: '#bdbdbd'
        },
        yAxis: {
            title: {
                enabled: false
            },
            tickInterval: 10,
            tickmarkPlacement: "on",
            min: 0,
            labels: {
                step: 1,
                style: {
                    font: '8.5px IRANSans'
                }
            },
            gridLineWidth: 0,
            tickWidth: 2,
            tickColor: '#bdbdbd',
            lineWidth: 1,
            lineColor: '#bdbdbd'
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                var chart = this.series.chart;
                return '<table style="z-index:99999;direction:rtl">' +
                    '<tr><th>عنوان : </th><td>' + this.point.name + '</td></tr>' +
                    //'<tr><th>وضعیت : </th><td>' + chart.xAxis[0].categories[this.point.x] + '</td></tr>' +
                    '<tr><th>تعداد : </th><td>' + this.point.y + '</td></tr></table>';
            },
            followPointer: true
        },
        colors: ['#4A8987'],
        legend: {
            enabled: false
        },
        series: [{
            //name: '',
            dataSorting: {
                enabled: true,
                sortKey: 'y'
            },
            data: data
        }]
    });
}

var ChartPeapleInAccident;
function FChartPeapleInAccident() {
    var getHide = $('#hidPeapleInAccidentPedestriansSituation').val().split("#")[0].split(",");
    var arrGetHide = [];
    for (var i = 0; i < 3; i++) {
        if (i === 0) arrGetHide.push([parseInt(getHide[i]), 'متوفیان']);
        else if (i === 1) arrGetHide.push([parseInt(getHide[i]), 'مصدومان']);
        else if (i === 2) arrGetHide.push([parseInt(getHide[i]), 'آسیب ندیده']);
    }
    ChartPeapleInAccident = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            renderTo: 'cnsChartCountPeapleInAccident',
            //margin: [0, 0, 0, 0],
            //marginTop:20,
            marginRight: 100,
            style: {
                fontFamily: 'IRANSans'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<table style="direction:rtl">' +
                    '<tr><td>' + this.point.name + '</td></tr>' +
                    '<tr><th>تعداد : </th><td>' + this.point.y + " نفر" + '</td></tr></table>';
            },
            followPointer: true
        },
        plotOptions: {
            series: {
                keys: ['y', 'name']
            },
            pie: {
                allowPointSelect: true,
                showInLegend: true,
                dataLabels: {
                    formatter: function () {
                        return " نفر " + this.point.y;
                    },
                    distance: '-35%',
                    padding: 0,
                    borderWidth: 0,
                    style: {
                        fontSize: '9px',
                        color: "#fff", textShadow: false,
                        textOutline: false
                    }
                }
            }
        },
        legend: {
            floating: true,
            rtl: true,
            layout: 'vertical',
            verticalAlign: 'middle',
            align: 'right',
            //width: '600px',
            itemMarginBottom: 5,
            symbolHeight: 12,
            symbolWidth: 17,
            squareSymbol: false,
            symbolRadius: 4,
            itemStyle: {
                fontSize: '9px',
                font: 'IRANSans',
                color: '#626262', fontWeight: 'lighter'
            }
        },
        colors: ['#CB644E', '#F59D2D', '#FFD461'],
        series: [{
            type: 'pie',
            size: '160%',
            data: arrGetHide
        }]
    });

}

var ChartPedestriansSituation;
function FChartPedestriansSituation() {
    var getHide = $('#hidPeapleInAccidentPedestriansSituation').val().split("#")[1].split(",");
    var arrGetHide = [];
    for (var i = 0; i < 13; i++) {
        if (i === 0) arrGetHide.push([parseInt(getHide[i]), "عبور از عرض راه از مسیر مجاز"]);
        else if (i === 1) arrGetHide.push([parseInt(getHide[i]), "عبور از عرض راه از مسیر غیرمجاز"]);
        else if (i === 2) arrGetHide.push([parseInt(getHide[i]), "در حالت ایستاده کنار راه"]);
        else if (i === 3) arrGetHide.push([parseInt(getHide[i]), "در حال سوار یا پیاده شدن از وسیله ‌نقلیه"]);
        else if (i === 4) arrGetHide.push([parseInt(getHide[i]), "عبور خارج از مسیر سواره رو"]);
        else if (i === 5) arrGetHide.push([parseInt(getHide[i]), "دویدن ناگهانی بر روی راه"]);
        else if (i === 6) arrGetHide.push([parseInt(getHide[i]), "در حال هل دادن وسیله ‌نقلیه"]);
        else if (i === 7) arrGetHide.push([parseInt(getHide[i]), "عبور از موانع راه"]);
        else if (i === 8) arrGetHide.push([parseInt(getHide[i]), "عبور همسو با حرکت وسیله‌ نقلیه"]);
        else if (i === 9) arrGetHide.push([parseInt(getHide[i]), "عبور در خلاف حرکت وسیله‌ نقلیه"]);
        else if (i === 10) arrGetHide.push([parseInt(getHide[i]), "در حال کار کردن/ کار روی وسیله نقلیه"]);
        else if (i === 11) arrGetHide.push([parseInt(getHide[i]), "پریدن ناگهانی در جلوی وسیله‌ نقلیه"]);
        else if (i === 12) arrGetHide.push([parseInt(getHide[i]), "سایر موارد"]);
    }
    ChartPedestriansSituation = new Highcharts.Chart({
        chart: {
            backgroundColor: 'transparent',
            renderTo: 'cnsChartPedestriansSituation',
            //margin: [0, 0, 0, 0],
            //marginTop:20,
            marginRight: 600,
            style: {
                fontFamily: 'IRANSans'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<table style="direction:rtl">' +
                    '<tr><td>' + this.point.name + '</td></tr>' +
                    '<tr><th>تعداد : </th><td>' + this.point.y + '</td></tr></table>';
            },
            followPointer: true
        },
        plotOptions: {
            series: {
                keys: ['y', 'name'],
                dataLabels: {
                    enabled: false
                }
            },
            pie: {
                allowPointSelect: true,
                showInLegend: true
            }
        },
        legend: {
            floating: true,
            rtl: true,
            //layout: 'horizontal',
            verticalAlign: 'middle',
            align: 'right',
            width: '600px',
            itemMarginBottom: 5,
            symbolHeight: 12,
            symbolWidth: 17,
            squareSymbol: false,
            symbolRadius: 4,
            itemStyle: {
                fontSize: '9px',
                font: 'IRANSans',
                color: '#626262',
                fontWeight: 'lighter'
            }
        },
        colors: ['#7E2028', '#8EBF93', '#0F527D', '#F08976', '#5693BA', '#F59D2D', '#8FB9AB', '#CB644E', '#4A8987', '#D0243D', '#755685', '#87DCDC', '#FFD461'],
        series: [{
            type: 'pie',
            innerSize: '50%',
            size: '160%',
            data: arrGetHide
        }]
    });
    $("#cnsChartPedestriansSituation .highcharts-legend").attr({ transform: "translate(177,25)" });
}

var ChartValidityDriverLicenseBar;
function BValidityDriverLicenseBar() {
    var hidValidityDriver0 = $('#hidValidityDriver').val().split("#")[0].split(",");
    var hidValidityDriver1 = $('#hidValidityDriver').val().split("#")[1].split(",");
    var hidValidityDriver2 = $('#hidValidityDriver').val().split("#")[2].split(",");
    var hidValidityDriver3 = $('#hidValidityDriver').val().split("#")[3].split(",");
    var getValidityDriver01 = parseInt(hidValidityDriver0[0]);
    var getValidityDriver02 = parseInt(hidValidityDriver0[1]);
    var getValidityDriver03 = parseInt(hidValidityDriver0[2]);
    var getValidityDriver04 = parseInt(hidValidityDriver0[3]);

    var getValidityDriver11 = parseInt(hidValidityDriver2[0]);
    var getValidityDriver12 = parseInt(hidValidityDriver2[1]);
    var getValidityDriver13 = parseInt(hidValidityDriver2[2]);
    var getValidityDriver14 = parseInt(hidValidityDriver2[3]);

    var getValidityDriver21 = parseInt(hidValidityDriver1[0]);
    var getValidityDriver22 = parseInt(hidValidityDriver1[1]);
    var getValidityDriver23 = parseInt(hidValidityDriver1[2]);
    var getValidityDriver24 = parseInt(hidValidityDriver1[3]);

    var getValidityDriver31 = parseInt(hidValidityDriver3[0]);
    var getValidityDriver32 = parseInt(hidValidityDriver3[1]);
    var getValidityDriver33 = parseInt(hidValidityDriver3[2]);
    var getValidityDriver34 = parseInt(hidValidityDriver3[3]);

    var getSumValidityDriver0 = getValidityDriver01 + getValidityDriver11 + getValidityDriver21 + getValidityDriver31;
    var getSumValidityDriver1 = getValidityDriver02 + getValidityDriver12 + getValidityDriver22 + getValidityDriver32;
    var getSumValidityDriver2 = getValidityDriver03 + getValidityDriver13 + getValidityDriver23 + getValidityDriver33;
    var getSumValidityDriver3 = getValidityDriver04 + getValidityDriver14 + getValidityDriver24 + getValidityDriver34;
    //part 1
    var precet1 = getValidityDriver01 == 0 ? 0 : getValidityDriver01 * 100 / getSumValidityDriver0;
    var precet2 = getValidityDriver02 == 0 ? 0 : getValidityDriver02 * 100 / getSumValidityDriver1;
    var precet3 = getValidityDriver03 == 0 ? 0 : getValidityDriver03 * 100 / getSumValidityDriver2;
    var precet4 = getValidityDriver04 == 0 ? 0 : getValidityDriver04 * 100 / getSumValidityDriver3;
    //part 2
    var precet1Part2 = getValidityDriver11 == 0 ? 0 : getValidityDriver11 * 100 / getSumValidityDriver0;
    var precet2Part2 = getValidityDriver12 == 0 ? 0 : getValidityDriver12 * 100 / getSumValidityDriver1;
    var precet3Part2 = getValidityDriver13 == 0 ? 0 : getValidityDriver13 * 100 / getSumValidityDriver2;
    var precet4Part2 = getValidityDriver14 == 0 ? 0 : getValidityDriver14 * 100 / getSumValidityDriver3;
    //part 3
    var precet1Part3 = getValidityDriver21 == 0 ? 0 : getValidityDriver21 * 100 / getSumValidityDriver0;
    var precet2Part3 = getValidityDriver22 == 0 ? 0 : getValidityDriver22 * 100 / getSumValidityDriver1;
    var precet3Part3 = getValidityDriver23 == 0 ? 0 : getValidityDriver23 * 100 / getSumValidityDriver2;
    var precet4Part3 = getValidityDriver24 == 0 ? 0 : getValidityDriver24 * 100 / getSumValidityDriver3;
    //part 4
    var precet1Part4 = getValidityDriver31 == 0 ? 0 : getValidityDriver31 * 100 / getSumValidityDriver0;
    var precet2Part4 = getValidityDriver32 == 0 ? 0 : getValidityDriver32 * 100 / getSumValidityDriver1;
    var precet3Part4 = getValidityDriver33 == 0 ? 0 : getValidityDriver33 * 100 / getSumValidityDriver2;
    var precet4Part4 = getValidityDriver34 == 0 ? 0 : getValidityDriver34 * 100 / getSumValidityDriver3;

    var jsonMojaz = JSON.parse("[" + precet1 + "," + precet2 + "," + precet3 + "," + precet4 + "]");
    var jsonMongazi = JSON.parse("[" + precet1Part2 + "," + precet2Part2 + "," + precet3Part2 + "," + precet4Part2 + "]");
    var jsonGheirMojaz = JSON.parse("[" + precet1Part3 + "," + precet2Part3 + "," + precet3Part3 + "," + precet4Part3 + "]");
    var jsonMahroom = JSON.parse("[" + precet1Part4 + "," + precet2Part4 + "," + precet3Part4 + "," + precet4Part4 + "]");

    var cnsChartValidityDriverLicense = document.getElementById('cnsChartValidityDriverLicense');
    ChartValidityDriverLicenseBar = new Chart(cnsChartValidityDriverLicense, {
        type: 'bar',
        data: {
            labels: ["راننده سواری", "راکب موتورسیکلت", "راننده ناوگان سنگین باری", "راننده ناوگان مسافری"],
            datasets: [{
                label: 'مجاز',
                data: jsonMojaz, barThickness: 12,
                backgroundColor: '#4A8987'
            },
            {
                label: 'منقضی',
                data: jsonMongazi, barThickness: 12,
                backgroundColor: '#FFD461'
            },
            {
                label: 'غیرمجاز',
                data: jsonGheirMojaz, barThickness: 12,
                backgroundColor: '#F59D2D'
            },
            {
                label: 'محروم از رانندگی',
                data: jsonMahroom, barThickness: 12,
                backgroundColor: '#7E2028'
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    display: true,
                    ticks: {
                        font: {
                            size: 9,
                            family: 'IRANSans'
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        font: {
                            size: 9,
                            family: 'IRANSans'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            indexAxis: 'y',
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: true,
                    labels: {
                        font: {
                            family: 'IRANSans',
                            size: 9
                        }, width: 300,
                        boxWidth: 10,
                        padding: 15
                    }
                },
                title: {
                    display: false
                }, tooltip: {
                    callbacks: {
                        label: function (context) {
                            var label = context.dataset.label || '';
                            return label + " : " + Math.round(context.parsed.x) + ' درصد';
                        }
                    },
                    titleFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    footerFont: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }
            }
        }
    });
}

var ChartSexulityInAccidentBar;
function BSexulityInAccidentBar() {
    var getSexulityInAccident0 = JSON.parse("[" + $('#hidSexulityInAccident').val().split("#")[0] + "]");
    var getSexulityInAccident1 = JSON.parse("[" + $('#hidSexulityInAccident').val().split("#")[1] + "]");
    console.log(getSexulityInAccident0);
    console.log(getSexulityInAccident1);
    //getSexulityInAccident0 = getSexulityInAccident0.map(i=>Number(i));
    //getSexulityInAccident1 = getSexulityInAccident1.map(i=>Number(i));
    //var hidDiagnosis3 = JSON.parse("[" + splt[2].slice(0, -1) + "]");
    ChartSexulityInAccidentBar = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'bar',
            renderTo: 'cnsChartSexulityInAccident',
            marginTop: 25,
            //margin: [0, 0, 0, 0],
            style: {
                fontFamily: 'IRANSans'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            gridLineWidth: 0,
            tickInterval: 1,
            type: 'category',
            categories: ["راننده سواری <---", "راکب موتورسیکلت <---", "راننده ناوگان سنگین <--- (باری)", "راننده ناوگان مسافری <---", "عابر پیاده <---", "دوچرخه سوار <---"],
            tickmarkPlacement: "on",
            min: 0,
            max: 5,
            labels: {
                //align: 'center',
                style: {
                    width: '95px',
                    font: '8.5px IRANSans'
                }
            }, lineWidth: 1,
            lineColor: '#bdbdbd',
            //        tickWidth: 2,
            //tickColor: '#bdbdbd',
        },
        yAxis: {

            //opposite: true,
            title: {
                enabled: false
            },
            tickInterval: 25,
            tickmarkPlacement: "on",
            min: 0,
            labels: {
                step: 1,
                style: {
                    font: '8.5px IRANSans'
                }
            },
            gridLineWidth: 0,
            lineWidth: 1,
            lineColor: '#bdbdbd'
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                var chart = this.series.chart;
                return '<table style="direction:rtl">' +
                    '<tr><th>مقصر : </th><td>' + chart.xAxis[0].categories[this.point.x] + '</td></tr>' +
                    //'<tr><th>وضعیت : </th><td>' + chart.xAxis[0].categories[this.point.x] + '</td></tr>' +
                    '<tr><th>درصد : </th><td>' + Math.round(this.point.percentage) + ' % </td></tr></table>';
            },
            followPointer: true
        },
        plotOptions: {
            bar: {
                stacking: 'percent',

                //dataLabels: {
                //    enabled: true
                //}
            }
        },
        colors: ['#4A8987', '#F08976'],
        legend: {
            //x:15,
            rtl: true,
            floating: true,
            //layout: 'vertical',
            verticalAlign: 'top',
            align: 'right', itemMarginBottom: 7,
            symbolWidth: 15, symbolHeight: 12,
            symbolRadius: 4, squareSymbol: false,
            itemStyle: {
                fontSize: '9px',
                font: 'IRANSans',
                color: '#626262',
                fontWeight: 'lighter'
            }
        },
        series: [{
            name: 'مرد',
            data: getSexulityInAccident0
        }, {
            name: 'زن',
            data: getSexulityInAccident1
        }]

    });

}

var ChartAgeInAccidentBar;
function getPercentile(data, percentile) {
    data.sort(numSort);
    var index = (percentile / 100) * data.length;
    var result;
    if (Math.floor(index) == index) {
        result = (data[(index - 1)] + data[index]) / 2;
    }
    else {
        result = data[Math.floor(index)];
    }
    return result;
}

function numSort(a, b) {
    return a - b;
}
function replaceZero(a) {
    return a == "Infinity" || a == "-Infinity" || isNaN(a) ? 0 : a;
}
function getBoxValues(data) {
    var boxValues = [];
    boxValues.push(replaceZero(Math.min.apply(Math, data)), replaceZero(getPercentile(data, 25)), replaceZero(getPercentile(data, 50)), replaceZero(getPercentile(data, 75)), replaceZero(Math.max.apply(Math, data)));
    return boxValues;
}
function BAgeInAccidentBar() {
    let splt = $('#hidAgeInAccident').val().split("#");

    let ageInAccident0 = getBoxValues(JSON.parse("[" + splt[0] + "]"));
    let ageInAccident1 = getBoxValues(JSON.parse("[" + splt[1] + "]"));
    let ageInAccident2 = getBoxValues(JSON.parse("[" + splt[2] + "]"));
    let ageInAccident3 = getBoxValues(JSON.parse("[" + splt[3] + "]"));
    let ageInAccident4 = getBoxValues(JSON.parse("[" + splt[4] + "]"));
    let ageInAccident5 = getBoxValues(JSON.parse("[" + splt[5] + "]"));

    ChartAgeInAccidentBar = new Highcharts.Chart({
        chart: {
            backgroundColor: '#f1f1f1',
            renderTo: 'cnsChartAgeInAccident',
            type: 'boxplot',
            inverted: true,

            //margin: [0, 0, 0, 0],
            //marginTop:20,
            //marginRight: 600,
            style: {
                fontFamily: 'IRANSans'
            },
            events: {
                load: function () {
                    var points = this.series[0].points,
                        color,
                        length = points.length;

                    Highcharts.each(points, function (point, i) {
                        if (i == 0 || i == 2 || i == 4) color = '#F59D2D';
                        else color = '#FFD461';
                        point.update({
                            fillColor: color,
                            stemColor: color,
                            whiskerColor: color
                        }, false);
                    });

                    this.redraw();
                }
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: ['--->', '--->', '--->', '--->', '--->', '--->'],
            opposite: true,
            gridLineWidth: 1,
            gridLineColor: '#e6e6e6',
            gridLineDashStyle: 'Dot',
            ////type: 'category',
            //tickmarkPlacement: "on",
            min: 0,
            max: 5,
            //tickInterval: 25,
            //tickWidth: 2,
            //tickColor: '#bdbdbd',
            labels: {
                //step: 1,
                style: {
                    //display: 'none',
                    font: '8.5px IRANSans',
                    'text-align': 'left'
                },
            },
            lineWidth: 1,
            lineColor: '#bdbdbd'
        },
        yAxis: {
            title: {
                enabled: false
            },
            //tickInterval: 1,
            //tickmarkPlacement: "on",
            //min: 0,
            //max:5,
            labels: {
                style: {
                    font: '8.5px IRANSans'
                }
            },
            gridLineWidth: 0,
            //tickWidth: 2,
            //tickColor: '#bdbdbd',
            lineWidth: 1,
            lineColor: '#bdbdbd'
        },
        tooltip: {
            //shared: true,
            useHTML: true,
            formatter: function () {
                var chart = this.series.chart, getX = this.point.x, getTitle = "";
                if (getX == 0) getTitle = "راننده سواری";
                else if (getX == 1) getTitle = "راکب موتورسیکلت";
                else if (getX == 2) getTitle = "راننده ناوگان سنگین (باری)";
                else if (getX == 3) getTitle = "راننده ناوگان مسافری";
                else if (getX == 4) getTitle = "عابر پیاده";
                else if (getX == 5) getTitle = "دوچرخه سوار";
                return '<table style="direction:rtl">' +
                    '<tr><th>مقصر : </th><td>' + getTitle + '</td></tr>' +
                    //'<tr><th>وضعیت : </th><td>' + chart.xAxis[0].categories[this.point.x] + '</td></tr>' +
                    '<tr><th>کمترین : </th><td>' + this.point.low + ' سال</td></tr>' +
                    '<tr><th>چارک اول : </th><td>' + this.point.q1 + ' سال</td></tr>' +
                    '<tr><th>چارک میانی : </th><td>' + this.point.median + ' سال</td></tr>' +
                    '<tr><th>چارک آخر : </th><td>' + this.point.q3 + ' سال</td></tr>' +
                    '<tr><th>بیشترین : </th><td>' + this.point.high + ' سال</td></tr>' +
                    '</table>';
            }
            //followPointer: true
        },
        plotOptions: {
            series: {
                grouping: false,
                pointRange: 1,
                pointPadding: 0,
                groupPadding: 0,
                pointWidth: 20,
                states: {
                    hover: {
                        lineWidthPlus: 0
                    }
                }
            },
            boxplot: {
                hideZero: true,
                //boxDashStyle: 'Dash',
                fillColor: '#F59D2D',
                lineWidth: 0,
                medianColor: '#fff',
                //medianDashStyle: 'ShortDot',
                medianWidth: 2,
                stemColor: '#F59D2D',
                stemDashStyle: 'line',
                stemWidth: 1,
                whiskerColor: '#F59D2D',
                //whiskerLength: '20%',
                whiskerWidth: 2
            }
        },
        //colors: ['#F59D2D', '#F59D2D', '#F59D2D'],
        legend: {
            enabled: false
        },
        series: [{
            name: 'S1',
            data: [
                ageInAccident0, ageInAccident1,
                ageInAccident2, ageInAccident3,
                ageInAccident4, ageInAccident5
            ],
            tooltip: {
                headerFormat: '<em>Experiment No {point.key}</em><br/>'
            }
        }
        ]
        //legend: {
        //    floating: true,
        //    rtl: true,
        //    //layout: 'horizontal',
        //    verticalAlign: 'middle',
        //    align: 'right',
        //    width: '600px',
        //    itemMarginBottom: 5,
        //    symbolHeight: 12,
        //    symbolWidth: 17,
        //    squareSymbol: false,
        //    symbolRadius: 4,
        //    itemStyle: {
        //        fontSize: '9px',
        //        font: 'IRANSans',
        //        color: '#626262', fontWeight: 'lighter'
        //    }
        //},
        //colors: ['#7E2028','#8EBF93','#0F527D','#F08976','#5693BA','#F59D2D','#8FB9AB','#CB644E','#4A8987','#D0243D','#755685','#87DCDC','#FFD461'],
        //series: [{
        //    type: 'bar',
        //    //innerSize: '50%',
        //    //size: '160%',
        //    data: [,,]
        //}]
    });

}
var ChartBeltsHelmetsBar;
function BBeltsHelmetsBar() {
    var intBeltsHelmets1 = parseInt($('#hidUseBeltsHelmetsInjuredDead').val().split("#")[0]);
    var intBeltsHelmets2 = parseInt($('#hidUseBeltsHelmetsInjuredDead').val().split("#")[1]);
    var precet1 = intBeltsHelmets1 == 0 ? 0 : intBeltsHelmets1 * 100 / (intBeltsHelmets1 + intBeltsHelmets2);
    var precet2 = intBeltsHelmets2 == 0 ? 0 : intBeltsHelmets2 * 100 / (intBeltsHelmets2 + intBeltsHelmets1);
    var hidUseBeltsHelmetsInjuredDead0 = JSON.parse("[" + precet1 + "]");
    var hidUseBeltsHelmetsInjuredDead1 = JSON.parse("[" + precet2 + "]");
    var cnsChartUseBeltsHelmetsInjuredDead = document.getElementById('cnsChartUseBeltsHelmetsInjuredDead');
    ChartBeltsHelmetsBar = new Chart(cnsChartUseBeltsHelmetsInjuredDead, {
        type: 'bar',
        data: {
            labels: ["", ""],
            datasets: [{
                label: '',
                data: hidUseBeltsHelmetsInjuredDead0, barThickness: 38,
                backgroundColor: '#4A8987',
                datalabels: {
                    anchor: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'start';
                    },
                    align: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'top';
                    },
                    offset: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 2 : 4;
                    }
                }
            },
            {
                label: '',
                data: hidUseBeltsHelmetsInjuredDead1, barThickness: 38,
                backgroundColor: '#7E2028',
                datalabels: {
                    anchor: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'start';
                    },
                    align: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'top';
                    },
                    offset: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 2 : 4;
                    }
                }
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    display: false
                },
                y: {
                    display: false,
                    stacked: true
                }
            },
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    formatter: function (value) {
                        return Math.round(value) + "%";
                    },
                    textAlign: 'center',
                    color: '#fff',
                    font: {
                        family: 'IRANSans',
                        size: 9
                    }
                },
                legend: {
                    display: false
                },
                title: {
                    display: false
                }, tooltip: {
                    titleFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    footerFont: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }
            }
        }, plugins: [ChartDataLabels]
    });
}
var ChartHelmetsBar;
function BHelmetsBar() {
    var intBeltsHelmets1 = parseInt($('#hidUseBeltsHelmetsInjuredDead').val().split("#")[2]);
    var intBeltsHelmets2 = parseInt($('#hidUseBeltsHelmetsInjuredDead').val().split("#")[3]);
    var precet1 = intBeltsHelmets1 == 0 ? 0 : intBeltsHelmets1 * 100 / (intBeltsHelmets1 + intBeltsHelmets2);
    var precet2 = intBeltsHelmets2 == 0 ? 0 : intBeltsHelmets2 * 100 / (intBeltsHelmets2 + intBeltsHelmets1);
    var hidUseBeltsHelmetsInjuredDead2 = JSON.parse("[" + precet1 + "]");
    var hidUseBeltsHelmetsInjuredDead3 = JSON.parse("[" + precet2 + "]");
    var cnsChartUseHelmetsInjuredDead = document.getElementById('cnsChartUseHelmetsInjuredDead');
    ChartHelmetsBar = new Chart(cnsChartUseHelmetsInjuredDead, {
        type: 'bar',
        data: {
            labels: ["", ""],
            datasets: [{
                label: '',
                data: hidUseBeltsHelmetsInjuredDead2, barThickness: 132,
                backgroundColor: '#4A8987',
                datalabels: {
                    anchor: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'end';
                    },
                    align: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'start';
                    },
                    offset: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 5 : 9;
                    }
                }
            },
            {
                label: '',
                data: hidUseBeltsHelmetsInjuredDead3, barThickness: 132,
                backgroundColor: '#7E2028',
                datalabels: {
                    anchor: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'end';
                    },
                    align: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'start';
                    },
                    offset: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 5 : 9;
                    }
                }
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    display: false,
                    ticks: {
                        font: {
                            size: 9,
                            family: 'IRANSans'
                        },
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        stepSize: 25
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: false,
                    stacked: true,
                    ticks: {
                        font: {
                            size: 9,
                            family: 'IRANSans'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    formatter: function (value) {
                        return Math.round(value) + "%";
                    },
                    textAlign: 'center',
                    color: '#fff',
                    font: {
                        family: 'IRANSans',
                        size: 9
                    }
                },
                legend: {
                    display: false
                },
                title: {
                    display: false
                }, tooltip: {
                    titleFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    footerFont: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }
            }
        }, plugins: [ChartDataLabels]
    });
}
var ChartBeltsHelmetsBar2;
function BBeltsHelmetsBar2() {
    var intBeltsHelmets1 = parseInt($('#hidUseBeltsHelmetsInjuredDead').val().split("#")[4]);
    var intBeltsHelmets2 = parseInt($('#hidUseBeltsHelmetsInjuredDead').val().split("#")[5]);
    var precet1 = intBeltsHelmets1 == 0 ? 0 : intBeltsHelmets1 * 100 / (intBeltsHelmets1 + intBeltsHelmets2);
    var precet2 = intBeltsHelmets2 == 0 ? 0 : intBeltsHelmets2 * 100 / (intBeltsHelmets2 + intBeltsHelmets1);
    var hidUseBeltsHelmetsInjuredDead4 = JSON.parse("[" + precet1 + "]");
    var hidUseBeltsHelmetsInjuredDead5 = JSON.parse("[" + precet2 + "]");
    var cnsChartUseBeltsHelmetsInjuredDead2 = document.getElementById('cnsChartUseBeltsHelmetsInjuredDead2');
    ChartBeltsHelmetsBar2 = new Chart(cnsChartUseBeltsHelmetsInjuredDead2, {
        type: 'bar',
        data: {
            labels: ["", ""],
            datasets: [{
                label: '',
                data: hidUseBeltsHelmetsInjuredDead4, barThickness: 38,
                backgroundColor: '#4A8987',
                datalabels: {
                    anchor: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'start';
                    },
                    align: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'top';
                    },
                    offset: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 2 : 4;
                    }
                }
            },
            {
                label: '',
                data: hidUseBeltsHelmetsInjuredDead5, barThickness: 38,
                backgroundColor: '#7E2028',
                datalabels: {
                    anchor: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'start';
                    },
                    align: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'top';
                    },
                    offset: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 2 : 4;
                    }
                }
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    display: false,
                    ticks: {
                        font: {
                            size: 9,
                            family: 'IRANSans'
                        },
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        stepSize: 25
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: false,
                    stacked: true,
                    grid: {
                        display: false
                    }
                }
            },
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    formatter: function (value) {
                        return Math.round(value) + "%";
                    },
                    textAlign: 'center',
                    color: '#fff',
                    font: {
                        family: 'IRANSans',
                        size: 9
                    }
                },
                legend: {
                    display: false
                },
                title: {
                    display: false
                }, tooltip: {
                    display: false
                }
            }
        }, plugins: [ChartDataLabels]
    });
}
var ChartBeltsHelmetsBar3;
function BBeltsHelmetsBar3() {
    var intBeltsHelmets1 = parseInt($('#hidUseBeltsHelmetsInjuredDead').val().split("#")[6]);
    var intBeltsHelmets2 = parseInt($('#hidUseBeltsHelmetsInjuredDead').val().split("#")[7]);
    var precet1 = intBeltsHelmets1 == 0 ? 0 : intBeltsHelmets1 * 100 / (intBeltsHelmets1 + intBeltsHelmets2);
    var precet2 = intBeltsHelmets2 == 0 ? 0 : intBeltsHelmets2 * 100 / (intBeltsHelmets2 + intBeltsHelmets1);
    var hidUseBeltsHelmetsInjuredDead6 = JSON.parse("[" + precet1 + "]");
    var hidUseBeltsHelmetsInjuredDead7 = JSON.parse("[" + precet2 + "]");
    var cnsChartUseBeltsHelmetsInjuredDead3 = document.getElementById('cnsChartUseBeltsHelmetsInjuredDead3');
    ChartBeltsHelmetsBar3 = new Chart(cnsChartUseBeltsHelmetsInjuredDead3, {
        type: 'bar',
        data: {
            labels: ["", ""],
            datasets: [{
                data: hidUseBeltsHelmetsInjuredDead6, barThickness: 38,
                backgroundColor: '#4A8987',
                datalabels: {
                    anchor: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'start';
                    },
                    align: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'top';
                    },
                    offset: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 2 : 4;
                    }
                }
            },
            {
                data: hidUseBeltsHelmetsInjuredDead7, barThickness: 38,
                backgroundColor: '#7E2028',
                datalabels: {
                    anchor: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'start';
                    },
                    align: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 'center' : 'top';
                    },
                    offset: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        return value.x < 100 ? 2 : 4;
                    }
                }
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    display: false,
                    ticks: {
                        font: {
                            size: 9,
                            family: 'IRANSans'
                        },
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        //stepSize: 25
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    //barThickness: 10,
                    display: false,
                    stacked: true,
                    ticks: {
                        font: {
                            size: 9,
                            family: 'IRANSans'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    formatter: function (value) {
                        return Math.round(value) + "%";
                    },
                    textAlign: 'center',
                    color: '#fff',
                    font: {
                        family: 'IRANSans',
                        size: 9
                    }
                },
                legend: {
                    display: false,
                },
                title: {
                    display: false
                }, tooltip: {
                    titleFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'IRANSans'
                    },
                    footerFont: {
                        size: 12,
                        family: 'IRANSans'
                    }
                }
            }
        }, plugins: [ChartDataLabels]
    });
}

function GetColorScaler(num, minArray, maxArray) {
    var getAvgArr = maxArray / 2;
    if (num < minArray && num > getAvgArr)
        return "#ffcc00";
    else if (num == getAvgArr)
        return "#f09d30";
    else if (num > getAvgArr)
        return "#e75601";
    else return "#ffcc00";
}
function GetDayScalerSmall(num) {
    if (num === "ش")
        return "شنبه";
    else if (num === "ی")
        return "یکشنبه";
    else if (num === "د")
        return "دوشنبه";
    else if (num === "س")
        return "سه شنبه";
    else if (num === "چ")
        return "چهارشنبه";
    else if (num === "پ")
        return "پنج شنبه";
    else if (num === "ج")
        return "جمعه";
    else return "";
}
function GetDayScaler(num) {
    if (num === 0)
        return "شنبه";
    else if (num === 1)
        return "یکشنبه";
    else if (num === 2)
        return "دوشنبه";
    else if (num === 3)
        return "سه شنبه";
    else if (num === 4)
        return "چهار شنبه";
    else if (num === 5)
        return "پنج شنبه";
    else if (num === 6)
        return "جمعه";
    else return "";
}
function FillCity() {
    //let obj = {
    //    "provinceId": $("#cmbProvinceSearch").val() === "-1" ? "" : $("#cmbProvinceSearch").val()
    //}
    //$('#spinSearchLoading').show();
    //$.ajax({
    //    type: "POST",
    //    url: "FirstViwe.aspx/GetFillCity",
    //    data: JSON.stringify(obj),
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (msg) {
    //        if (msg != null) {
    //            if (msg.d[0].IsSuccess !== "true") {
    //                $("#lblMessage").html(CreateModal(msg.d[0].Message));
    //                $('#MessageModal').modal();
    //            } else {
    //                var optionVal = '';
    //                $('#cmbCity').html('<option selected="" value="-1">;کد شهری</option>');
    //                for (i = 0; i < msg.d.length; i++) {
    //                    var txt = msg.d[i].Message;
    //                    var id = msg.d[i].Id;
    //                    optionVal += '<option value="' + id + '">' + txt + '</option>';
    //                }
    //                $('#cmbCity').append(optionVal);
    //            }
    //        } else {
    //            alert("خطا در برقراری ارتباط با سرور!");
    //        }
    //    },
    //    complete: function () {
    //        $('#spinSearchLoading').hide();
    //    },
    //    error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
    //        alert(response.d);
    //    }
    //});
}

$(document).ready(function () {
    pageLoad();
    $('input[type=radio][name=rdoDate]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoDate]:checked').val();
        if (getVal === "Date") {
            $("#divShowDate").show('slow');
        } else {
            $("#divShowDate").hide('slow');
        }
    });
    $('input[type=radio][name=rdoLocation]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoLocation]:checked').val();
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
        } else if (getVal === "Axis") {
            let getProvince = $('#cmbProvinceSearch').val();
            if (getProvince === "-1" || getProvince === "") {
                $("#lblMessage").html(CreateModal("ابتدا باید !"));
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
                            var optionVal = '';
                            $('#cmbAxis').html('<option selected="" value="-1">انتخاب محور</option>');
                            for (i = 0; i < msg.d.length; i++) {
                                var txt = msg.d[i].Message;
                                var id = msg.d[i].Id;
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

    $('input[type=radio][name=rdoStatus],input[type=radio][name=rdoIntensity]').on('change', function () {
        var cmbInFirstView = $('#cmbInFirstView').val();
        if (cmbInFirstView === "1")
            LoadHideInput();
        else if (cmbInFirstView === "2")
            LoadHideInputTime();
        else if (cmbInFirstView === "3")
            LoadHideInputAccidentInfo();
        else if (cmbInFirstView === "4")
            LoadHideInputVehicle();
        else if (cmbInFirstView === "5")
            LoadHideInputUser();
    });
    $('input[type=radio][name=rdoDate]').on('change', function () {
        var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
        if (getDateOfAccident !== "Date") {
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
    $('input[type=radio][name=rdoDays]').on('change', function () {
        //var getDateOfAccident = $('input[type=radio][name=rdoDays]:checked').val();
        var cmbInFirstView = $('#cmbInFirstView').val();
        if (cmbInFirstView === "1")
            LoadHideInput();
        else if (cmbInFirstView === "2")
            LoadHideInputTime();
        else if (cmbInFirstView === "3")
            LoadHideInputAccidentInfo();
        else if (cmbInFirstView === "4")
            LoadHideInputVehicle();
        else if (cmbInFirstView === "5")
            LoadHideInputUser();
    });
    $('#txtDateRange').on('change', function () {
        var getDateOfAccident = $('#txtDateRange').val();
        if (getDateOfAccident !== "") {
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
    $("#cmbInFirstView").on('change', function () {
        var cmbInFirstView = $('#cmbInFirstView').val();
        if (cmbInFirstView !== "" && cmbInFirstView !== "-1" && cmbInFirstView !== null) {
            if (cmbInFirstView === "1") {
                $("#divFirstView1").show();
                $("#divFirstView2,#divFirstView3,#divFirstView4,#divFirstView5").hide();
                LoadHideInput();
            }
            else if (cmbInFirstView === "2") {
                $("#divFirstView2").show();
                $("#divFirstView1,#divFirstView3,#divFirstView4,#divFirstView5").hide();
                LoadHideInputTime();
            }
            else if (cmbInFirstView === "3") {
                $("#divFirstView3").show();
                $("#divFirstView1,#divFirstView2,#divFirstView4,#divFirstView5").hide();
                LoadHideInputAccidentInfo();
            }
            else if (cmbInFirstView === "4") {
                $("#divFirstView4").show();
                $("#divFirstView1,#divFirstView2,#divFirstView3,#divFirstView5").hide();
                LoadHideInputVehicle();
            }
            else if (cmbInFirstView === "5") {
                $("#divFirstView5").show();
                $("#divFirstView1,#divFirstView2,#divFirstView3,#divFirstView4").hide();
                LoadHideInputUser();
            }
        }
    });
    $("#cmbProvinceSearch").on('change', function () {
        var getProvince = $('#cmbProvinceSearch').val();
        if (getProvince !== "" && getProvince !== null) {
            if (getProvince !== "-1") FillCity();
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
            if (getProvince == "-1") {
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
        }
    });
    $("#cmbCity").on('change', function () {
        var getCity = $('#cmbCity').val();
        var getProvince = $('#cmbProvinceSearch').val();
        if (getProvince == "-1") return;
        if (getCity !== "" && getCity !== null) {
            $('#divInNativeArea').show("slow");
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
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
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
    $("#cmbInNativeArea").on('change', function () {
        var getInNativeArea = $('#cmbInNativeArea').val();
        if (getInNativeArea !== "" && getInNativeArea !== null) {
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
    $("#cmbMonth").on('change', function () {
        var getMonth = $('#cmbMonth').val();
        if (getMonth !== "" && getMonth !== null) {
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
    $('input[type=radio][name=rdoHoliday]').on('change', function () {
        var cmbInFirstView = $('#cmbInFirstView').val();
        if (cmbInFirstView === "1")
            LoadHideInput();
        else if (cmbInFirstView === "2")
            LoadHideInputTime();
        else if (cmbInFirstView === "3")
            LoadHideInputAccidentInfo();
        else if (cmbInFirstView === "4")
            LoadHideInputVehicle();
        else if (cmbInFirstView === "5")
            LoadHideInputUser();
    });
    //
    $("#cmbCollisionOfATwo").on('change', function () {
        var getVal = $('#cmbCollisionOfATwo').val();
        if (getVal !== "" && getVal !== null) {
            if (getVal == "تک وسیله ای") $("#divCollisionChild1").show("slow");
            else $("#divCollisionChild1").hide("slow");
            if (getVal == "دو وسیله ای") $("#divCollisionChild2").show("slow");
            else $("#divCollisionChild2").hide("slow");
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
    $("#cmbCollisionChild1").on('change', function () {
        var getVal = $('#cmbCollisionChild1').val();
        if (getVal !== "" && getVal !== null) {
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
    $("#cmbCollisionChild2").on('change', function () {
        var getVal = $('#cmbCollisionChild2').val();
        if (getVal !== "" && getVal !== null) {
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
    $("#cmbLightingStatus").on('change', function () {
        var getVal = $('#cmbLightingStatus').val();
        if (getVal !== "" && getVal !== null) {
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
    $("#cmbWeather").on('change', function () {
        var getVal = $('#cmbWeather').val();
        if (getVal !== "" && getVal !== null) {
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
    $("#cmbCarriageWayDirection").on('change', function () {
        var getVal = $('#cmbCarriageWayDirection').val();
        if (getVal !== "" && getVal !== null) {
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
    $("#cmbTypeOfWay").on('change', function () {
        var getVal = $('#cmbTypeOfWay').val();
        if (getVal !== "" && getVal !== null) {
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
    $("#cmbCarCrashLocation").on('change', function () {
        var getVal = $('#cmbCarCrashLocation').val();
        if (getVal !== "" && getVal !== null) {
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
    $("#cmbLocationLandUse").on('change', function () {
        var getVal = $('#cmbLocationLandUse').val();
        if (getVal !== "" && getVal !== null) {
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
    $("#chkIsNotLocalDriver").on('change', function () {
        var cmbInFirstView = $('#cmbInFirstView').val();
        if (cmbInFirstView === "1")
            LoadHideInput();
        else if (cmbInFirstView === "2")
            LoadHideInputTime();
        else if (cmbInFirstView === "3")
            LoadHideInputAccidentInfo();
        else if (cmbInFirstView === "4")
            LoadHideInputVehicle();
        else if (cmbInFirstView === "5")
            LoadHideInputUser();
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
            var cmbInFirstView = $('#cmbInFirstView').val();
            if (cmbInFirstView === "1")
                LoadHideInput();
            else if (cmbInFirstView === "2")
                LoadHideInputTime();
            else if (cmbInFirstView === "3")
                LoadHideInputAccidentInfo();
            else if (cmbInFirstView === "4")
                LoadHideInputVehicle();
            else if (cmbInFirstView === "5")
                LoadHideInputUser();
        }
    });
});
function LoadHideInput() {
    //var getId = id == "" ? $("#txtIdSearch").val() : id;
    var getStatus = $('input[type=radio][name=rdoStatus]:checked').val();
    var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
    if (getDateOfAccident === "Date") {
        getDateOfAccident = $("#txtDateRange").val().trim();
    }
    var getCrashType = $('input[type=radio][name=rdoIntensity]:checked').val();
    var getDays = $('input[type=radio][name=rdoDays]:checked').val();

    var getIsHoliday = $('input[type=radio][name=rdoHoliday]:checked').val();
    let chkIsNotLocalDriver = $('#chkIsNotLocalDriver').prop('checked');
    var obj = {
        //"status": getStatus == undefined ? "" : getStatus,
        //"dateOfAccident": getDateOfAccident == undefined ? "" : getDateOfAccident,
        //"crashType": getCrashType == undefined ? "" : getCrashType,
        //"provinceId": $("#cmbProvinceSearch").val(),
        //"getDays": getDays == undefined ? "All" : getDays,
        //"month": $("#cmbMonth").val() === "-1" ? "" : $("#cmbMonth").val(),
        //"collisionOfA": $("#cmbCollisionOfATwo").val() === "-1" ? "" : $("#cmbCollisionOfATwo").val(),
        //"lightingStatus": $("#cmbLightingStatus").val() === "-1" ? "" : $("#cmbLightingStatus").val(),
        //"weather": $("#cmbWeather").val() === "-1" ? "" : $("#cmbWeather").val(),
        //"carriageWayDirection": $("#cmbCarriageWayDirection").val() === "-1" ? "" : $("#cmbCarriageWayDirection").val(),
        //"typeOfWay": $("#cmbTypeOfWay").val() === "-1" ? "" : $("#cmbTypeOfWay").val(),
        //"carCrashLocation": $("#cmbCarCrashLocation").val() === "-1" ? "" : $("#cmbCarCrashLocation").val(),
        //"locationLandUse": $("#cmbLocationLandUse").val() === "-1" ? "" : $("#cmbLocationLandUse").val(),
        //"fromAgeDriver": $("#txtFromAge").val().replaceAll("از سن : ", ""),
        //"toAgeDriver": $("#txtToAge").val().replaceAll("تا سن : ", ""),
        //"cityId":$("#cmbCity").val(),
        //"inNativeArea": getInNativeArea === "-1" || getInNativeArea === "-2" ? "" : getInNativeArea,
        //"isHoliday": getIsHoliday == undefined || getIsHoliday == "All" ? "" : getIsHoliday,
        //"collisionChild1": $('#cmbCollisionOfATwo').val() !== "تک وسیله ای" || $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
        //"collisionChild2": $('#cmbCollisionOfATwo').val() !== "دو وسیله ای" || $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
        //"axisId": $("#cmbAxis").val() === "-1" ? "" : $("#cmbAxis").val(),
        //"isNotLocalDriver": chkIsNotLocalDriver


        "status": getStatus == undefined ? "" : getStatus,
        "dateOfAccident": getDateOfAccident == undefined ? "" : getDateOfAccident,
        "crashType": getCrashType == undefined ? "" : getCrashType,
        "provinceId": $("#cmbProvinceSearch").val(),
        "getDays": getDays == undefined ? "All" : getDays,
        "month": $("#cmbMonth").val() === "-1" ? "" : $("#cmbMonth").val(),
        "collisionOfA": $("#cmbCollisionOfATwo").val() === "-1" ? "" : $("#cmbCollisionOfATwo").val(),
        "lightingStatus": $("#cmbLightingStatus").val() === "-1" ? "" : $("#cmbLightingStatus").val(),
        "weather": $("#cmbWeather").val() === "-1" ? "" : $("#cmbWeather").val(),
        "carriageWayDirection": $("#cmbCarriageWayDirection").val() === "-1" ? "" : $("#cmbCarriageWayDirection").val(),
        "typeOfWay": $("#cmbTypeOfWay").val() === "-1" ? "" : $("#cmbTypeOfWay").val(),
        "carCrashLocation": $("#cmbCarCrashLocation").val() === "-1" ? "" : $("#cmbCarCrashLocation").val(),
        "locationLandUse": $("#cmbLocationLandUse").val() === "-1" ? "" : $("#cmbLocationLandUse").val(),
        "fromAgeDriver": $("#txtFromAge").val().replaceAll("از سن : ", ""),
        "toAgeDriver": $("#txtToAge").val().replaceAll("تا سن : ", ""),
        "cityId": $("#cmbCity").val(),
        "inNativeArea": "",
        "isHoliday": getIsHoliday == undefined || getIsHoliday == "All" ? "" : getIsHoliday,
        "collisionChild1": $('#cmbCollisionOfATwo').val() !== "تک وسیله ای" || $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
        "collisionChild2": $('#cmbCollisionOfATwo').val() !== "دو وسیله ای" || $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
        "axisId": "",
        "isNotLocalDriver": chkIsNotLocalDriver
    }
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "FirstViwe.aspx/GetSearchFirstView",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess != "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                     
                } else {
                    var splt = msg.d[0].Message.split("#");
                     
                    barChartEffectiveWayDefects.destroy();
                    ChartEffectiveWayDefects.destroy();
                    BarChartBarriersToVision.destroy();
                    ChartBarriersToVision.destroy();
                    ChartRoadwayWidth.destroy();
                    ChartTheGeometry.destroy();
                    ChartUserSpeed.destroy();
                    $('#hidFBcEffectiveWayDefects').val(splt[0]);
                    $('#hidPEffectiveWayDefects').val(splt[1]);
                    $('#hidFBcBarriersToVision').val(splt[2]);
                    $('#hidPBarriersToVision').val(splt[3]);
                    $('#hidPChartRoadwayWidth').val(splt[4]);
                    $('#hidFBcTheGeometry').val(splt[5] + "|" + splt[6] + "|" + splt[7]);
                    $('#hidBubbleUserSpeed').val(splt[10]);
                    $('#hidmaskouni').val(splt[10]);
                    $('#hidedaritejari').val(splt[11]);
                    $('#hidamouzeshi').val(splt[12]);
                    $('#hidgheiremaskouni').val(splt[13]);
                    $('#hidkeshavarzi').val(splt[14]);
                    $('#hidtafrihi').val(splt[15]);
                    $('#hidsanati').val(splt[16]);
                    $('#hidsayer').val(splt[17]);










                    PEffectiveWayDefects();
                    FBcEffectiveWayDefects();
                    FBarChartBarriersToVision();
                    FChartBarriersToVision();
                    FChartRoadwayWidth();
                    FChartTheGeometry();
                    FChartUserSpeed();
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
function LoadHideInputAccidentInfo() {
    //var getId = id == "" ? $("#txtIdSearch").val() : id;
    var getStatus = $('input[type=radio][name=rdoStatus]:checked').val();
    var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
    if (getDateOfAccident === "Date") {
        getDateOfAccident = $("#txtDateRange").val().trim();
    }
    var getCrashType = $('input[type=radio][name=rdoIntensity]:checked').val();
    var getDays = $('input[type=radio][name=rdoDays]:checked').val();
    var getInNativeArea = $('#cmbInNativeArea').val();
    var getIsHoliday = $('input[type=radio][name=rdoHoliday]:checked').val();
    let chkIsNotLocalDriver = $('#chkIsNotLocalDriver').prop('checked');
    var obj = {
        //"status": getStatus == undefined ? "" : getStatus,
        //"dateOfAccident": getDateOfAccident == undefined ? "" : getDateOfAccident,
        //"crashType": getCrashType == undefined ? "" : getCrashType,
        //"provinceId":  $("#cmbProvinceSearch").val(),
        //"getDays": getDays == undefined ? "All" : getDays,
        //"month": $("#cmbMonth").val() === "-1" ? "" : $("#cmbMonth").val(),
        //"collisionOfA": $("#cmbCollisionOfATwo").val() === "-1" ? "" : $("#cmbCollisionOfATwo").val(),
        //"lightingStatus": $("#cmbLightingStatus").val() === "-1" ? "" : $("#cmbLightingStatus").val(),
        //"weather": $("#cmbWeather").val() === "-1" ? "" : $("#cmbWeather").val(),
        //"carriageWayDirection": $("#cmbCarriageWayDirection").val() === "-1" ? "" : $("#cmbCarriageWayDirection").val(),
        //"typeOfWay": $("#cmbTypeOfWay").val() === "-1" ? "" : $("#cmbTypeOfWay").val(),
        //"carCrashLocation": $("#cmbCarCrashLocation").val() === "-1" ? "" : $("#cmbCarCrashLocation").val(),
        //"locationLandUse": $("#cmbLocationLandUse").val() === "-1" ? "" : $("#cmbLocationLandUse").val(),
        //"fromAgeDriver": $("#txtFromAge").val().replaceAll("از سن : ", ""),
        //"toAgeDriver": $("#txtToAge").val().replaceAll("تا سن : ", ""),
        //"cityId": $("#cmbCity").val(),
        //"inNativeArea": getInNativeArea = "-1",
        //"isHoliday": getIsHoliday == undefined || getIsHoliday == "All" ? "" : getIsHoliday,
        //"collisionChild1": $('#cmbCollisionOfATwo').val() !== "تک وسیله ای" || $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
        //"collisionChild2": $('#cmbCollisionOfATwo').val() !== "دو وسیله ای" || $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
        //"axisId": $("#cmbAxis").val() === "-1" ? "" : $("#cmbAxis").val(),
        //"isNotLocalDriver": chkIsNotLocalDriver


        "status": getStatus == undefined ? "" : getStatus,
        "dateOfAccident": getDateOfAccident == undefined ? "" : getDateOfAccident,
        "crashType": getCrashType == undefined ? "" : getCrashType,
        "provinceId": $("#cmbProvinceSearch").val(),
        "getDays": getDays == undefined ? "All" : getDays,
        "month": $("#cmbMonth").val() === "-1" ? "" : $("#cmbMonth").val(),
        "collisionOfA": $("#cmbCollisionOfATwo").val() === "-1" ? "" : $("#cmbCollisionOfATwo").val(),
        "lightingStatus": $("#cmbLightingStatus").val() === "-1" ? "" : $("#cmbLightingStatus").val(),
        "weather": $("#cmbWeather").val() === "-1" ? "" : $("#cmbWeather").val(),
        "carriageWayDirection": $("#cmbCarriageWayDirection").val() === "-1" ? "" : $("#cmbCarriageWayDirection").val(),
        "typeOfWay": $("#cmbTypeOfWay").val() === "-1" ? "" : $("#cmbTypeOfWay").val(),
        "carCrashLocation": $("#cmbCarCrashLocation").val() === "-1" ? "" : $("#cmbCarCrashLocation").val(),
        "locationLandUse": $("#cmbLocationLandUse").val() === "-1" ? "" : $("#cmbLocationLandUse").val(),
        "fromAgeDriver": $("#txtFromAge").val().replaceAll("از سن : ", ""),
        "toAgeDriver": $("#txtToAge").val().replaceAll("تا سن : ", ""),
        "cityId": $("#cmbCity").val(),
        "inNativeArea": "",
        "isHoliday": getIsHoliday == undefined || getIsHoliday == "All" ? "" : getIsHoliday,
        "collisionChild1": $('#cmbCollisionOfATwo').val() !== "تک وسیله ای" || $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
        "collisionChild2": $('#cmbCollisionOfATwo').val() !== "دو وسیله ای" || $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
        "axisId": "",
        "isNotLocalDriver": chkIsNotLocalDriver
    }
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "FirstViwe.aspx/GetSearchFirstViewAccidentInfo",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess !== "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    $('#hidCollisionOfTwo').val(msg.d[0].Message);

                    $('#hidTypeOfCollision').val(msg.d[0].MessageTwo);
                    $('#hidCollisionOfOne').val(msg.d[0].Id);
                    $('#hidFBcOtherTypeOfCollision').val(msg.d[0].MessageThree);
                    if (ChartCollisionOfTwo) ChartCollisionOfTwo.destroy();
                    if (ChartTypeOfCollision) ChartTypeOfCollision.destroy();
                    if (ChartCollisionOfOne) ChartCollisionOfOne.destroy();
                    if (barChartOtherTypeOfCollision) barChartOtherTypeOfCollision.destroy();

                    FChartCollisionOfTwo();
                    FChartTypeOfCollision();
                    FChartCollisionOfOne();
                    FBcOtherTypeOfCollision();
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
function LoadHideInputTime() {
    //var getId = id == "" ? $("#txtIdSearch").val() : id;
    var getStatus = $('input[type=radio][name=rdoStatus]:checked').val();
    var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
    if (getDateOfAccident === "Date") {
        getDateOfAccident = $("#txtDateRange").val().trim();
    }
    var getCrashType = $('input[type=radio][name=rdoIntensity]:checked').val();
    var getDays = $('input[type=radio][name=rdoDays]:checked').val();
    var getInNativeArea = $('#cmbInNativeArea').val();
    var getIsHoliday = $('input[type=radio][name=rdoHoliday]:checked').val();
    let chkIsNotLocalDriver = $('#chkIsNotLocalDriver').prop('checked');
    var obj = {
        //"status": getStatus == undefined ? "" : getStatus,
        //"dateOfAccident": getDateOfAccident == undefined ? "" : getDateOfAccident,
        //"crashType": getCrashType == undefined ? "" : getCrashType,
        //"provinceId": $("#cmbProvinceSearch").val() === "-1" ? "" : $("#cmbProvinceSearch").val(),
        //"getDays": getDays == undefined ? "All" : getDays,
        //"month": $("#cmbMonth").val() === "-1" ? "" : $("#cmbMonth").val(),
        //"collisionOfA": $("#cmbCollisionOfATwo").val() === "-1" ? "" : $("#cmbCollisionOfATwo").val(),
        //"lightingStatus": $("#cmbLightingStatus").val() === "-1" ? "" : $("#cmbLightingStatus").val(),
        //"weather": $("#cmbWeather").val() === "-1" ? "" : $("#cmbWeather").val(),
        //"carriageWayDirection": $("#cmbCarriageWayDirection").val() === "-1" ? "" : $("#cmbCarriageWayDirection").val(),
        //"typeOfWay": $("#cmbTypeOfWay").val() === "-1" ? "" : $("#cmbTypeOfWay").val(),
        //"carCrashLocation": $("#cmbCarCrashLocation").val() === "-1" ? "" : $("#cmbCarCrashLocation").val(),
        //"locationLandUse": $("#cmbLocationLandUse").val() === "-1" ? "" : $("#cmbLocationLandUse").val(),
        //"fromAgeDriver": $("#txtFromAge").val().replaceAll("از سن : ", ""),
        //"toAgeDriver": $("#txtToAge").val().replaceAll("تا سن : ", ""),
        //"cityId": $("#cmbCity").val() === "-1" ? "" : $("#cmbCity").val(),
        //"inNativeArea": getInNativeArea === "-1" || getInNativeArea === "-2" ? "" : getInNativeArea,
        //"isHoliday": getIsHoliday == undefined || getIsHoliday == "All" ? "" : getIsHoliday,
        //"collisionChild1": $('#cmbCollisionOfATwo').val() !== "تک وسیله ای" || $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
        //"collisionChild2": $('#cmbCollisionOfATwo').val() !== "دو وسیله ای" || $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
        //"axisId": $("#cmbAxis").val() === "-1" ? "" : $("#cmbAxis").val(),
        //"isNotLocalDriver": chkIsNotLocalDriver


        "status": getStatus == undefined ? "" : getStatus,
        "dateOfAccident": getDateOfAccident == undefined ? "" : getDateOfAccident,
        "crashType": getCrashType == undefined ? "" : getCrashType,
        "provinceId": $("#cmbProvinceSearch").val(),
        "getDays": getDays == undefined ? "All" : getDays,
        "month": $("#cmbMonth").val() === "-1" ? "" : $("#cmbMonth").val(),
        "collisionOfA": $("#cmbCollisionOfATwo").val() === "-1" ? "" : $("#cmbCollisionOfATwo").val(),
        "lightingStatus": $("#cmbLightingStatus").val() === "-1" ? "" : $("#cmbLightingStatus").val(),
        "weather": $("#cmbWeather").val() === "-1" ? "" : $("#cmbWeather").val(),
        "carriageWayDirection": $("#cmbCarriageWayDirection").val() === "-1" ? "" : $("#cmbCarriageWayDirection").val(),
        "typeOfWay": $("#cmbTypeOfWay").val() === "-1" ? "" : $("#cmbTypeOfWay").val(),
        "carCrashLocation": $("#cmbCarCrashLocation").val() === "-1" ? "" : $("#cmbCarCrashLocation").val(),
        "locationLandUse": $("#cmbLocationLandUse").val() === "-1" ? "" : $("#cmbLocationLandUse").val(),
        "fromAgeDriver": $("#txtFromAge").val().replaceAll("از سن : ", ""),
        "toAgeDriver": $("#txtToAge").val().replaceAll("تا سن : ", ""),
        "cityId": $("#cmbCity").val(),
        "inNativeArea": "",
        "isHoliday": getIsHoliday == undefined || getIsHoliday == "All" ? "" : getIsHoliday,
        "collisionChild1": $('#cmbCollisionOfATwo').val() !== "تک وسیله ای" || $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
        "collisionChild2": $('#cmbCollisionOfATwo').val() !== "دو وسیله ای" || $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
        "axisId": "",
        "isNotLocalDriver": chkIsNotLocalDriver
    }
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "FirstViwe.aspx/GetSearchFirstViewTime",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess !== "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    if (chartAccidentByDayAndClock) chartAccidentByDayAndClock.destroy();
                    if (chartAccidentByMonthAndClock) chartAccidentByMonthAndClock.destroy();
                    if (ChartMonthWeek) ChartMonthWeek.destroy();
                    if (ChartByHolidayNotHoliday) ChartByHolidayNotHoliday.destroy();
                    $('#hidTimeStepOne').val(msg.d[0].Message);
                    $('#hidTimeStepTwo').val(msg.d[0].MessageTwo);
                    $('#hidMonthWeek').val(msg.d[0].Id);
                    $('#hidHolidayNotHoliday').val(msg.d[0].MessageThree);
                    AccidentByDayAndClock();
                    AccidentByMonthAndClock();
                    FChartMonthWeek();
                    BarChartByHolidayNotHoliday();
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
function LoadHideInputVehicle() {
    //var getId = id == "" ? $("#txtIdSearch").val() : id;
    var getStatus = $('input[type=radio][name=rdoStatus]:checked').val();
    var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
    if (getDateOfAccident === "Date") {
        getDateOfAccident = $("#txtDateRange").val().trim();
    }
    var getCrashType = $('input[type=radio][name=rdoIntensity]:checked').val();
    var getDays = $('input[type=radio][name=rdoDays]:checked').val();
    var getInNativeArea = $('#cmbInNativeArea').val();
    var getIsHoliday = $('input[type=radio][name=rdoHoliday]:checked').val();
    let chkIsNotLocalDriver = $('#chkIsNotLocalDriver').prop('checked');
    var obj = {
        //"status": getStatus == undefined ? "" : getStatus,
        //"dateOfAccident": getDateOfAccident == undefined ? "" : getDateOfAccident,
        //"crashType": getCrashType == undefined ? "" : getCrashType,
        //"provinceId": $("#cmbProvinceSearch").val() === "-1" ? "" : $("#cmbProvinceSearch").val(),
        //"getDays": getDays == undefined ? "All" : getDays,
        //"month": $("#cmbMonth").val() === "-1" ? "" : $("#cmbMonth").val(),
        //"collisionOfA": $("#cmbCollisionOfATwo").val() === "-1" ? "" : $("#cmbCollisionOfATwo").val(),
        //"lightingStatus": $("#cmbLightingStatus").val() === "-1" ? "" : $("#cmbLightingStatus").val(),
        //"weather": $("#cmbWeather").val() === "-1" ? "" : $("#cmbWeather").val(),
        //"carriageWayDirection": $("#cmbCarriageWayDirection").val() === "-1" ? "" : $("#cmbCarriageWayDirection").val(),
        //"typeOfWay": $("#cmbTypeOfWay").val() === "-1" ? "" : $("#cmbTypeOfWay").val(),
        //"carCrashLocation": $("#cmbCarCrashLocation").val() === "-1" ? "" : $("#cmbCarCrashLocation").val(),
        //"locationLandUse": $("#cmbLocationLandUse").val() === "-1" ? "" : $("#cmbLocationLandUse").val(),
        //"fromAgeDriver": $("#txtFromAge").val().replaceAll("از سن : ", ""),
        //"toAgeDriver": $("#txtToAge").val().replaceAll("تا سن : ", ""),
        //"cityId": $("#cmbCity").val() === "-1" ? "" : $("#cmbCity").val(),
        //"inNativeArea": getInNativeArea === "-1" || getInNativeArea === "-2" ? "" : getInNativeArea,
        //"isHoliday": getIsHoliday == undefined || getIsHoliday == "All" ? "" : getIsHoliday,
        //"collisionChild1": $('#cmbCollisionOfATwo').val() !== "تک وسیله ای" || $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
        //"collisionChild2": $('#cmbCollisionOfATwo').val() !== "دو وسیله ای" || $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
        //"axisId": $("#cmbAxis").val() === "-1" ? "" : $("#cmbAxis").val(),
        //"isNotLocalDriver": chkIsNotLocalDriver


        "status": getStatus == undefined ? "" : getStatus,
        "dateOfAccident": getDateOfAccident == undefined ? "" : getDateOfAccident,
        "crashType": getCrashType == undefined ? "" : getCrashType,
        "provinceId": $("#cmbProvinceSearch").val(),
        "getDays": getDays == undefined ? "All" : getDays,
        "month": $("#cmbMonth").val() === "-1" ? "" : $("#cmbMonth").val(),
        "collisionOfA": $("#cmbCollisionOfATwo").val() === "-1" ? "" : $("#cmbCollisionOfATwo").val(),
        "lightingStatus": $("#cmbLightingStatus").val() === "-1" ? "" : $("#cmbLightingStatus").val(),
        "weather": $("#cmbWeather").val() === "-1" ? "" : $("#cmbWeather").val(),
        "carriageWayDirection": $("#cmbCarriageWayDirection").val() === "-1" ? "" : $("#cmbCarriageWayDirection").val(),
        "typeOfWay": $("#cmbTypeOfWay").val() === "-1" ? "" : $("#cmbTypeOfWay").val(),
        "carCrashLocation": $("#cmbCarCrashLocation").val() === "-1" ? "" : $("#cmbCarCrashLocation").val(),
        "locationLandUse": $("#cmbLocationLandUse").val() === "-1" ? "" : $("#cmbLocationLandUse").val(),
        "fromAgeDriver": $("#txtFromAge").val().replaceAll("از سن : ", ""),
        "toAgeDriver": $("#txtToAge").val().replaceAll("تا سن : ", ""),
        "cityId": $("#cmbCity").val(),
        "inNativeArea": "",
        "isHoliday": getIsHoliday == undefined || getIsHoliday == "All" ? "" : getIsHoliday,
        "collisionChild1": $('#cmbCollisionOfATwo').val() !== "تک وسیله ای" || $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
        "collisionChild2": $('#cmbCollisionOfATwo').val() !== "دو وسیله ای" || $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
        "axisId": "",
        "isNotLocalDriver": chkIsNotLocalDriver
    }
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "FirstViwe.aspx/GetSearchFirstViewVehicle",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess !== "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    if (ChartVehicleBubble)
                        ChartVehicleBubble.destroy();
                    if (ChartTechnicalDiagnosis) ChartTechnicalDiagnosis.destroy();
                    if (ChartManeuver) ChartManeuver.destroy();
                    if (ChartCodeCausing) ChartCodeCausing.destroy();
                    if (ChartIsLocalDriver) ChartIsLocalDriver.destroy();
                    if (ChartUserAndVehiclePie) ChartUserAndVehiclePie.destroy();
                    if (ChartUserAndVehicleBar) ChartUserAndVehicleBar.destroy();
                    $('#hidVehicleBubble').val(msg.d[0].Message);
                    $('#hidVehicleTechnicalDiagnosis').val(msg.d[0].MessageTwo);
                    $('#hidManeuver').val(msg.d[0].Id);
                    $('#hidCodeCausing').val(msg.d[0].MessageThree);
                    $('#hidUserAndVehicle').val(msg.d[0].MessageFour);
                    $('#hidIsLocalDriver').val(msg.d[0].MessageFive);
                    FChartVehicleBubble();
                    //BChartTechnicalDiagnosis();
                    FChartManeuver();
                    FChartCodeCausing();
                    BUserAndVehiclePie();
                    BUserAndVehicleBar();
                    BChartIsLocalDriver();
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
function LoadHideInputUser() {
    //var getId = id == "" ? $("#txtIdSearch").val() : id;
    var getStatus = $('input[type=radio][name=rdoStatus]:checked').val();
    var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
    if (getDateOfAccident === "Date") {
        getDateOfAccident = $("#txtDateRange").val().trim();
    }
    var getCrashType = $('input[type=radio][name=rdoIntensity]:checked').val();
    var getDays = $('input[type=radio][name=rdoDays]:checked').val();
    var getInNativeArea = $('#cmbInNativeArea').val();
    var getIsHoliday = $('input[type=radio][name=rdoHoliday]:checked').val();
    let chkIsNotLocalDriver = $('#chkIsNotLocalDriver').prop('checked');
    var obj = {
        //"status": getStatus == undefined ? "" : getStatus,
        //"dateOfAccident": getDateOfAccident == undefined ? "" : getDateOfAccident,
        //"crashType": getCrashType == undefined ? "" : getCrashType,
        //"provinceId": $("#cmbProvinceSearch").val() === "-1" ? "" : $("#cmbProvinceSearch").val(),
        //"getDays": getDays == undefined ? "All" : getDays,
        //"month": $("#cmbMonth").val() === "-1" ? "" : $("#cmbMonth").val(),
        //"collisionOfA": $("#cmbCollisionOfATwo").val() === "-1" ? "" : $("#cmbCollisionOfATwo").val(),
        //"lightingStatus": $("#cmbLightingStatus").val() === "-1" ? "" : $("#cmbLightingStatus").val(),
        //"weather": $("#cmbWeather").val() === "-1" ? "" : $("#cmbWeather").val(),
        //"carriageWayDirection": $("#cmbCarriageWayDirection").val() === "-1" ? "" : $("#cmbCarriageWayDirection").val(),
        //"typeOfWay": $("#cmbTypeOfWay").val() === "-1" ? "" : $("#cmbTypeOfWay").val(),
        //"carCrashLocation": $("#cmbCarCrashLocation").val() === "-1" ? "" : $("#cmbCarCrashLocation").val(),
        //"locationLandUse": $("#cmbLocationLandUse").val() === "-1" ? "" : $("#cmbLocationLandUse").val(),
        //"fromAgeDriver": $("#txtFromAge").val().replaceAll("از سن : ", ""),
        //"toAgeDriver": $("#txtToAge").val().replaceAll("تا سن : ", ""),
        //"cityId": $("#cmbCity").val() === "-1" ? "" : $("#cmbCity").val(),
        //"inNativeArea": getInNativeArea === "-1" || getInNativeArea === "-2" ? "" : getInNativeArea,
        //"isHoliday": getIsHoliday == undefined || getIsHoliday == "All" ? "" : getIsHoliday,
        //"collisionChild1": $('#cmbCollisionOfATwo').val() !== "تک وسیله ای" || $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
        //"collisionChild2": $('#cmbCollisionOfATwo').val() !== "دو وسیله ای" || $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
        //"axisId": $("#cmbAxis").val() === "-1" ? "" : $("#cmbAxis").val(),
        //"isNotLocalDriver": chkIsNotLocalDriver



        "status": getStatus == undefined ? "" : getStatus,
        "dateOfAccident": getDateOfAccident == undefined ? "" : getDateOfAccident,
        "crashType": getCrashType == undefined ? "" : getCrashType,
        "provinceId": $("#cmbProvinceSearch").val(),
        "getDays": getDays == undefined ? "All" : getDays,
        "month": $("#cmbMonth").val() === "-1" ? "" : $("#cmbMonth").val(),
        "collisionOfA": $("#cmbCollisionOfATwo").val() === "-1" ? "" : $("#cmbCollisionOfATwo").val(),
        "lightingStatus": $("#cmbLightingStatus").val() === "-1" ? "" : $("#cmbLightingStatus").val(),
        "weather": $("#cmbWeather").val() === "-1" ? "" : $("#cmbWeather").val(),
        "carriageWayDirection": $("#cmbCarriageWayDirection").val() === "-1" ? "" : $("#cmbCarriageWayDirection").val(),
        "typeOfWay": $("#cmbTypeOfWay").val() === "-1" ? "" : $("#cmbTypeOfWay").val(),
        "carCrashLocation": $("#cmbCarCrashLocation").val() === "-1" ? "" : $("#cmbCarCrashLocation").val(),
        "locationLandUse": $("#cmbLocationLandUse").val() === "-1" ? "" : $("#cmbLocationLandUse").val(),
        "fromAgeDriver": $("#txtFromAge").val().replaceAll("از سن : ", ""),
        "toAgeDriver": $("#txtToAge").val().replaceAll("تا سن : ", ""),
        "cityId": $("#cmbCity").val(),
        "inNativeArea": "",
        "isHoliday": getIsHoliday == undefined || getIsHoliday == "All" ? "" : getIsHoliday,
        "collisionChild1": $('#cmbCollisionOfATwo').val() !== "تک وسیله ای" || $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
        "collisionChild2": $('#cmbCollisionOfATwo').val() !== "دو وسیله ای" || $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
        "axisId": "",
        "isNotLocalDriver": chkIsNotLocalDriver
    }
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "FirstViwe.aspx/GetSearchFirstViewUser",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess !== "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    if (ChartPeapleInAccident)
                        ChartPeapleInAccident.destroy();
                    if (ChartPedestriansSituation) ChartPedestriansSituation.destroy();
                    if (ChartValidityDriverLicenseBar) ChartValidityDriverLicenseBar.destroy();
                    if (ChartSexulityInAccidentBar) ChartSexulityInAccidentBar.destroy();
                    if (ChartAgeInAccidentBar) ChartAgeInAccidentBar.destroy();
                    if (ChartBeltsHelmetsBar) ChartBeltsHelmetsBar.destroy();
                    if (ChartHelmetsBar) ChartHelmetsBar.destroy();
                    if (ChartBeltsHelmetsBar2) ChartBeltsHelmetsBar2.destroy();
                    if (ChartBeltsHelmetsBar3) ChartBeltsHelmetsBar3.destroy();
                    $('#hidPeapleInAccidentPedestriansSituation').val(msg.d[0].Message);
                    $('#hidValidityDriver').val(msg.d[0].MessageTwo);
                    $('#hidSexulityInAccident').val(msg.d[0].MessageFour);
                    $('#hidAgeInAccident').val(msg.d[0].MessageThree);
                    $('#hidUseBeltsHelmetsInjuredDead').val(msg.d[0].Id);

                    FChartPeapleInAccident();
                    FChartPedestriansSituation();
                    BValidityDriverLicenseBar();
                    BSexulityInAccidentBar();
                    BAgeInAccidentBar();

                    BBeltsHelmetsBar();
                    BHelmetsBar();
                    BBeltsHelmetsBar2();
                    BBeltsHelmetsBar3();
                    //myloader();
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
