var chartEventProcess;
function EventProcessWithTwo(cap1, cap2, color1, color2) {
    var hidFirst = $('#hidFirst').val().split("#");
    var hidRange = $('#hidRange').val().split("#");
    var hidYear = $('#hidYear').val().split(",");
    var cat = [];
    var getCountYear = 0;
    var rdoDate = $('input[type=radio][name=rdoDate]:checked').val();
    if (rdoDate == '1Year')
        getCountYear = 1;
    else if (rdoDate == '2Year')
        getCountYear = 2;
    else if (rdoDate == '3Year')
        getCountYear = 3;
    else if (rdoDate == '5Year')
        getCountYear = 5;
    else if (rdoDate == 'All')
        getCountYear = 10;
    var startYear = $('#txtStartYear').val();
    var endYear = $('#txtEndYear').val();
    if (rdoDate == 'Date' && startYear != "" && endYear != "") {
        var getDiffYear = parseInt(endYear) - parseInt(startYear);
        if (getDiffYear > 10) {
            $("#lblMessage").html(CreateModal("امکان گزارش گیری برای بیشتر از محدوده 10 سال امکانپذیر نمی باشد!"));
            $('#MessageModal').modal();
            return;
        } else if (getDiffYear < 0) {
            $("#lblMessage").html(CreateModal("امکان گزارش گیری برای کمتر از محدوده 0 سال امکانپذیر نمی باشد!"));
            $('#MessageModal').modal();
            return;
        } else getCountYear = getDiffYear;
    }
    let getFirstYear = hidYear[0],
        getSecondYear = hidYear[1],
        getThirdYear = hidYear[2],
        getFourthYear = hidYear[3],
        getFifthYear = hidYear[4],
        getSixthYear = hidYear[5],
        getSeventhYear = hidYear[6],
        getEightthYear = hidYear[7],
        getNinthYear = hidYear[8],
        getTenthYear = hidYear[9];

    let getFirst = hidFirst[0].split(","),
        getSecond = hidFirst[1].split(","),
        getFirstRange = hidRange[0].split(","),
        getSecondRange = hidRange[1].split(",");
    var val1 = parseInt(getFirst[0]), valTwo1 = parseInt(getSecond[0]),valRange1 = parseInt(getFirstRange[0]), valTwoRange1 = parseInt(getSecondRange[0]);
    var arr1, arr2;
    var arrRange1, arrRange2;
    var val2, valTwo2, valRange2, valTwoRange2;
    var val3, valTwo3, valRange3, valTwoRange3;
    var val4, valTwo4, valRange4, valTwoRange4;
    var val5, valTwo5, valRange5, valTwoRange5;
    var val6, valTwo6, valRange6, valTwoRange6;
    var val7, valTwo7, valRange7, valTwoRange7;
    var val8, valTwo8, valRange8, valTwoRange8;
    var val9, valTwo9, valRange9, valTwoRange9;
    var val10, valTwo10,valRange10, valTwoRange10;

    val2 = parseInt(getFirst[1]), valTwo2 = parseInt(getSecond[1]), valRange2 = parseInt(getFirstRange[1]), valTwoRange2 = parseInt(getSecondRange[1]);
    val3 = parseInt(getFirst[2]), valTwo3 = parseInt(getSecond[2]), valRange3 = parseInt(getFirstRange[2]), valTwoRange3 = parseInt(getSecondRange[2]);
    val4 = parseInt(getFirst[3]), valTwo4 = parseInt(getSecond[3]), valRange4 = parseInt(getFirstRange[3]), valTwoRange4 = parseInt(getSecondRange[3]);
    val5 = parseInt(getFirst[4]), valTwo5 = parseInt(getSecond[4]), valRange5 = parseInt(getFirstRange[4]), valTwoRange5 = parseInt(getSecondRange[4]);
    val6 = parseInt(getFirst[5]), valTwo6 = parseInt(getSecond[5]),valRange6 = parseInt(getFirstRange[5]), valTwoRange6 = parseInt(getSecondRange[5]);
    val7 = parseInt(getFirst[6]), valTwo7 = parseInt(getSecond[6]),valRange7 = parseInt(getFirstRange[6]), valTwoRange7 = parseInt(getSecondRange[6]);
    val8 = parseInt(getFirst[7]), valTwo8 = parseInt(getSecond[7]),valRange8 = parseInt(getFirstRange[7]), valTwoRange8 = parseInt(getSecondRange[7]);
    val9 = parseInt(getFirst[8]), valTwo9 = parseInt(getSecond[8]),valRange9 = parseInt(getFirstRange[8]), valTwoRange9 = parseInt(getSecondRange[8]);
    val10 = parseInt(getFirst[9]), valTwo10 = parseInt(getSecond[9]),valRange10 = parseInt(getFirstRange[9]), valTwoRange10 = parseInt(getSecondRange[9]);
    if (getCountYear == 1) {
        arr1 = { name: cap1, color: color1, data: [val1], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear];
        document.getElementById("crtEventProcess").style.width = "200px";
    } else if (getCountYear == 2) {
        arr1 = { name: cap1, color: color1, data: [val1, val2], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear];
        document.getElementById("crtEventProcess").style.width = "350px";
    }
    else if (getCountYear == 3) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear];
        document.getElementById("crtEventProcess").style.width = "450px";
    }
    else if (getCountYear == 4) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear];
        document.getElementById("crtEventProcess").style.width = "550px";
    }
    else if (getCountYear == 5) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear];
        document.getElementById("crtEventProcess").style.width = "700px";
    }
    else if (getCountYear == 6) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear];
        document.getElementById("crtEventProcess").style.width = "900px";
    }
    else if (getCountYear == 7) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear];
        document.getElementById("crtEventProcess").style.width = "1150px";
    }
    else if (getCountYear == 8) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7, val8], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7, valTwo8], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7, valRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7, valTwoRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear, getEightthYear];
        document.getElementById("crtEventProcess").style.width = "1300px";
    }
    else if (getCountYear == 9) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7, val8, val9], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7, valTwo8, valTwo9], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7, valRange8, valRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7, valTwoRange8, valTwoRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear, getEightthYear, getNinthYear];
        document.getElementById("crtEventProcess").style.width = "1500px";
    }
    else if (getCountYear == 10) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7, val8, val9, val10], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7, valTwo8, valTwo9, valTwo10], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7, valRange8, valRange9, valRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7, valTwoRange8, valTwoRange9, valTwoRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear, getEightthYear, getNinthYear, getTenthYear];
        document.getElementById("crtEventProcess").style.width = "1500px";
    }

    // Create the chart
    chartEventProcess = new Highcharts.Chart('crtEventProcess', {
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'column',
            style: {
                fontFamily: 'IRANSans'
            },
            scrollablePlotArea: {
                minWidth: 180,
                scrollPositionX: 1,
                opacity: 1
            }
        },
        title: { text: '' },
        xAxis: {
            labels: {
                style: {
                    textOverflow: 'none',
                    whiteSpace: 'nowrap'
                },
                formatter: function () {
                    return '<div class="evnt-cap-bar"><div class="rotate90">بازه رویداد</div><div class="rotate90">سایر ایام<br />سال</div></div><div class="evnt-cap-bar-line"></div><div class="text-center" style="color:#4A8987">سال<br>' + this.value + '</div>';
                },
                useHTML: true
            },
            tickLength: 5,
            style: {
                width: 150
            },
            categories: cat
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<b>' + this.series.name + '</b>: ' + this.percentage + ' درصد' + "<br>" + ' سال' + this.x + "<br>" + " دسته :" + this.series.options.group;
            }
        },
        yAxis: {
            min: 0,
            max: 100,
            title: { enabled: false },
            labels: {
                format: '{value}%'
            },
            gridLineColor: 'transparent'
        },
        legend: {
            enabled: false,
            floating: true,
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            itemMarginTop: 10,
            itemMarginBottom: 10,
            useHTML: true,
            symbolWidth: 0
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            column: {
                stacking: 'percent',
                pointWidth: 32,
                groupPadding: 0.02,
                pointPadding: 0
            }
        },
        series: [arrRange2, arrRange1, arr2, arr1]
    }, function (chart) {
        $('#customLegend').html("");
        var $legend = $('#customLegend');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:' + color2 + '"></div><div class="custom-legend-highchart-title" >' + cap2 + '</div></div>');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:' + color1 + '"></div><div class="custom-legend-highchart-title" >' + cap1 + '</div></div>');
        $('#customLegend .custom-legend-highchart').click(function () {
            var inx = $(this).index();
            var series = chart.series;
            if (inx == '0') {
                series[0].visible ?
                    series[0].hide() :
                    series[0].show();
                series[3].visible ?
                    series[3].hide() :
                    series[3].show();
            }
            else if (inx == '1') {
                series[1].visible ?
                    series[1].hide() :
                    series[1].show();
                series[4].visible ?
                    series[4].hide() :
                    series[4].show();
            }
        });
    });
}

function EventProcessWithThree(cap1, cap2, cap3, color1, color2, color3) {
    var hidFirst = $('#hidFirst').val().split("#");
    var hidRange = $('#hidRange').val().split("#");
    var hidYear = $('#hidYear').val().split(",");
    var cat = [];
    var getCountYear = 0;
    var rdoDate = $('input[type=radio][name=rdoDate]:checked').val();
    if (rdoDate == '1Year')
        getCountYear = 1;
    else if (rdoDate == '2Year')
        getCountYear = 2;
    else if (rdoDate == '3Year')
        getCountYear = 3;
    else if (rdoDate == '5Year')
        getCountYear = 5;
    else if (rdoDate == 'All')
            getCountYear = 10;
    var startYear = $('#txtStartYear').val();
    var endYear = $('#txtEndYear').val();
    if (rdoDate == 'Date' && startYear != "" && endYear != "") {
        var getDiffYear = parseInt(endYear) - parseInt(startYear)+1;
        if (getDiffYear > 10) {
            $("#lblMessage").html(CreateModal("امکان گزارش گیری برای بیشتر از محدوده 10 سال امکانپذیر نمی باشد!"));
            $('#MessageModal').modal();
            return;
        } else if (getDiffYear < 0) {
            $("#lblMessage").html(CreateModal("امکان گزارش گیری برای کمتر از محدوده 0 سال امکانپذیر نمی باشد!"));
            $('#MessageModal').modal();
            return;
        } else getCountYear = getDiffYear;
    }
    
    let getFirstYear = hidYear[0],
        getSecondYear = hidYear[1],
        getThirdYear = hidYear[2],
        getFourthYear = hidYear[3],
        getFifthYear = hidYear[4],
        getSixthYear = hidYear[5],
        getSeventhYear = hidYear[6],
        getEightthYear = hidYear[7],
        getNinthYear = hidYear[8],
        getTenthYear = hidYear[9];
    let getFirst = hidFirst[0].split(","),
        getSecond = hidFirst[1].split(","),
        getThird = hidFirst[2].split(","),
        getFirstRange = hidRange[0].split(","),
        getSecondRange = hidRange[1].split(","),
        getThirdRange = hidRange[2].split(",");
    var val1 = parseInt(getFirst[0]), valTwo1 = parseInt(getSecond[0]), valThree1 = parseInt(getThird[0]), valRange1 = parseInt(getFirstRange[0]), valTwoRange1 = parseInt(getSecondRange[0]), valThreeRange1 = parseInt(getThirdRange[0]);
    var arr1, arr2, arr3;
    var arrRange1, arrRange2, arrRange3;
    var val2, valTwo2, valThree2, valRange2, valTwoRange2, valThreeRange2;
    var val3, valTwo3, valThree3, valRange3, valTwoRange3, valThreeRange3;
    var val4, valTwo4, valThree4, valRange4, valTwoRange4, valThreeRange4;
    var val5, valTwo5, valThree5, valRange5, valTwoRange5, valThreeRange5;
    var val6, valTwo6, valThree6, valRange6, valTwoRange6, valThreeRange6;
    var val7, valTwo7, valThree7, valRange7, valTwoRange7, valThreeRange7;
    var val8, valTwo8, valThree8, valRange8, valTwoRange8, valThreeRange8;
    var val9, valTwo9, valThree9, valRange9, valTwoRange9, valThreeRange9;
    var val10, valTwo10, valThree10, valRange10, valTwoRange10, valThreeRange10;
    
    val2 = parseInt(getFirst[1]), valTwo2 = parseInt(getSecond[1]), valThree2 = parseInt(getThird[1]), valRange2 = parseInt(getFirstRange[1]), valTwoRange2 = parseInt(getSecondRange[1]), valThreeRange2 = parseInt(getThirdRange[1]);
    val3 = parseInt(getFirst[2]), valTwo3 = parseInt(getSecond[2]), valThree3 = parseInt(getThird[2]), valRange3 = parseInt(getFirstRange[2]), valTwoRange3 = parseInt(getSecondRange[2]), valThreeRange3 = parseInt(getThirdRange[2]);
    val4 = parseInt(getFirst[3]), valTwo4 = parseInt(getSecond[3]), valThree4 = parseInt(getThird[3]), valRange4 = parseInt(getFirstRange[3]), valTwoRange4 = parseInt(getSecondRange[3]), valThreeRange4 = parseInt(getThirdRange[3]);
    val5 = parseInt(getFirst[4]), valTwo5 = parseInt(getSecond[4]), valThree5 = parseInt(getThird[4]), valRange5 = parseInt(getFirstRange[4]), valTwoRange5 = parseInt(getSecondRange[4]), valThreeRange5 = parseInt(getThirdRange[4]);
    val6 = parseInt(getFirst[5]), valTwo6 = parseInt(getSecond[5]), valThree6 = parseInt(getThird[5]), valRange6 = parseInt(getFirstRange[5]), valTwoRange6 = parseInt(getSecondRange[5]), valThreeRange6 = parseInt(getThirdRange[5]);
    val7 = parseInt(getFirst[6]), valTwo7 = parseInt(getSecond[6]), valThree7 = parseInt(getThird[6]), valRange7 = parseInt(getFirstRange[6]), valTwoRange7 = parseInt(getSecondRange[6]), valThreeRange7 = parseInt(getThirdRange[6]);
    val8 = parseInt(getFirst[7]), valTwo8 = parseInt(getSecond[7]), valThree8 = parseInt(getThird[7]), valRange8 = parseInt(getFirstRange[7]), valTwoRange8 = parseInt(getSecondRange[7]), valThreeRange8 = parseInt(getThirdRange[7]);
    val9 = parseInt(getFirst[8]), valTwo9 = parseInt(getSecond[8]), valThree9 = parseInt(getThird[8]), valRange9 = parseInt(getFirstRange[8]), valTwoRange9 = parseInt(getSecondRange[8]), valThreeRange9 = parseInt(getThirdRange[8]);
    val10 = parseInt(getFirst[9]), valTwo10 = parseInt(getSecond[9]), valThree10 = parseInt(getThird[9]), valRange10 = parseInt(getFirstRange[9]), valTwoRange10 = parseInt(getSecondRange[9]), valThreeRange10 = parseInt(getThirdRange[9]);
    if (getCountYear == 1) {
        arr1 = { name: cap1, color: color1, data: [val1], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear];
        document.getElementById("crtEventProcess").style.width = "180px";
    }else if(getCountYear == 2) {
        arr1 = { name: cap1, color: color1, data: [val1, val2], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear];
        document.getElementById("crtEventProcess").style.width = "350px";
    }
    else if (getCountYear == 3) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear];
        document.getElementById("crtEventProcess").style.width = "450px";
    }
    else if (getCountYear == 4) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear];
        document.getElementById("crtEventProcess").style.width = "550px";
    }
    else if (getCountYear == 5) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear];
        document.getElementById("crtEventProcess").style.width = "700px";
    }
    else if (getCountYear == 6) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear];
        document.getElementById("crtEventProcess").style.width = "900px";
    }
    else if (getCountYear == 7) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6, valThree7], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6, valThreeRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear];
        document.getElementById("crtEventProcess").style.width = "1150px";
    }
    else if (getCountYear == 8) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7, val8], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7, valTwo8], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6, valThree7, valThree8], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7, valRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7, valTwoRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6, valThreeRange7, valThreeRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear, getEightthYear];
        document.getElementById("crtEventProcess").style.width = "1300px";
    }
    else if (getCountYear == 9) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7, val8, val9], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7, valTwo8, valTwo9], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6, valThree7, valThree8, valThree9], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7, valRange8, valRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7, valTwoRange8, valTwoRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6, valThreeRange7, valThreeRange8, valThreeRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear, getEightthYear, getNinthYear];
        document.getElementById("crtEventProcess").style.width = "1500px";
    }
    else if (getCountYear == 10) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7, val8, val9, val10], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7, valTwo8, valTwo9, valTwo10], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6, valThree7, valThree8, valThree9, valThree10], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7, valRange8, valRange9, valRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7, valTwoRange8, valTwoRange9, valTwoRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6, valThreeRange7, valThreeRange8, valThreeRange9, valThreeRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear, getEightthYear, getNinthYear, getTenthYear];
        document.getElementById("crtEventProcess").style.width = "1500px";
    }
    
    // Create the chart
    chartEventProcess = new Highcharts.Chart('crtEventProcess', {
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'column',
            style: {
                fontFamily: 'IRANSans'
            },
            scrollablePlotArea: {
                minWidth: 180,
                scrollPositionX: 1,
                opacity: 1
            }
        },
        title: { text: '' },
        xAxis: {
            labels: {
                style: {
                    textOverflow: 'none',
                    whiteSpace: 'nowrap'
                },
                formatter: function () {
                    return '<div class="evnt-cap-bar"><div class="rotate90">بازه رویداد</div><div class="rotate90">سایر ایام<br />سال</div></div><div class="evnt-cap-bar-line"></div><div class="text-center" style="color:#4A8987">سال<br>' + this.value + '</div>';
                },
                //format: '<div style="text-align:center;">&nbsp; بازه رویداد&nbsp; سایر ایام سال<br /></div><hr>' + this.value,
                useHTML: true
            },
            tickLength: 5,
            style: {
                width: 120
            },
            categories: cat
            //categories: [{ name: getFirstYear, categories: ["بازه رویداد", "سایر ایام سال"] }, { name: getSecondYear, categories: ["بازه رویداد", "سایر ایام سال"] }, { name: getThirdYear, categories: ["بازه رویداد", "سایر ایام سال"] }, { name: getFourthYear, categories: ["بازه رویداد", "سایر ایام سال"] }, { name: getFifthYear, categories: ["بازه رویداد", "سایر ایام سال"] }, { name: getSixthYear, categories: ["بازه رویداد", "سایر ایام سال"] }, { name: getSeventhYear, categories: ["بازه رویداد", "سایر ایام سال"] }, { name: getEightthYear, categories: ["بازه رویداد", "سایر ایام سال"] }, { name: getNinthYear, categories: ["بازه رویداد", "سایر ایام سال"] }, { name: getTenthYear, categories: ["بازه رویداد", "سایر ایام سال"] }]
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<b>' + this.series.name + '</b>: ' + this.percentage + ' درصد' + "<br>" + ' سال' + this.x + "<br>" + " دسته :" + this.series.options.group;
            }
        },
        yAxis: {
            min: 0,
            max:100,
            title: { enabled: false },
            labels: {
                format: '{value}%'
            },
            gridLineColor: 'transparent'
        },
        legend: {
            enabled: false,
            floating: true,
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            itemMarginTop: 10,
            itemMarginBottom: 10,
            useHTML: true,
            symbolWidth: 0
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            column: {
                stacking: 'percent',
                pointWidth: 32,
                groupPadding: 0.02,
                pointPadding: 0
            }
        },
        series: [arrRange3,arrRange2 ,arrRange1,arr3,arr2,arr1]
    }, function (chart) {
        $('#customLegend').html("");
        var $legend = $('#customLegend');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:'+color3+'"></div><div class="custom-legend-highchart-title" >'+ cap3 +'</div></div>');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:'+color2+'"></div><div class="custom-legend-highchart-title" >'+ cap2 +'</div></div>');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:'+color1+'"></div><div class="custom-legend-highchart-title" >'+ cap1 +'</div></div>');
        $('#customLegend .custom-legend-highchart').click(function () {
            var inx = $(this).index();
            var series = chart.series;
            if (inx == '0') {
                series[0].visible ?
                    series[0].hide() :
                    series[0].show();
                series[3].visible ?
                    series[3].hide() :
                    series[3].show();
            }
            else if (inx == '1') {
                series[1].visible ?
                    series[1].hide() :
                    series[1].show();
                series[4].visible ?
                    series[4].hide() :
                    series[4].show();
            }
            else if (inx == '2') {
                series[2].visible ?
                    series[2].hide() :
                    series[2].show();
                series[5].visible ?
                    series[5].hide() :
                    series[5].show();
            }
        });
    });
}
function EventProcessWithFive(cap1, cap2, cap3, cap4, cap5, color1, color2, color3, color4, color5) {
    var hidFirst = $('#hidFirst').val().split("#");
    var hidRange = $('#hidRange').val().split("#");
    var hidYear = $('#hidYear').val().split(",");
    var cat = [];
    var getCountYear = 0;
    var rdoDate = $('input[type=radio][name=rdoDate]:checked').val();
    if (rdoDate == '1Year')
        getCountYear = 1;
    else if (rdoDate == '2Year')
        getCountYear = 2;
    else if (rdoDate == '3Year')
        getCountYear = 3;
    else if (rdoDate == '5Year')
        getCountYear = 5;
    else if (rdoDate == 'All')
        getCountYear = 10;
    var startYear = $('#txtStartYear').val();
    var endYear = $('#txtEndYear').val();
    if (rdoDate == 'Date' && startYear != "" && endYear != "") {
        var getDiffYear = parseInt(endYear) - parseInt(startYear);
        if (getDiffYear > 10) {
            $("#lblMessage").html(CreateModal("امکان گزارش گیری برای بیشتر از محدوده 10 سال امکانپذیر نمی باشد!"));
            $('#MessageModal').modal();
            return;
        } else if (getDiffYear < 0) {
            $("#lblMessage").html(CreateModal("امکان گزارش گیری برای کمتر از محدوده 0 سال امکانپذیر نمی باشد!"));
            $('#MessageModal').modal();
            return;
        } else getCountYear = getDiffYear;
    }
    let getFirstYear = hidYear[0],
        getSecondYear = hidYear[1],
        getThirdYear = hidYear[2],
        getFourthYear = hidYear[3],
        getFifthYear = hidYear[4],
        getSixthYear = hidYear[5],
        getSeventhYear = hidYear[6],
        getEightthYear = hidYear[7],
        getNinthYear = hidYear[8],
        getTenthYear = hidYear[9];
    let getFirst = hidFirst[0].split(","),
        getSecond = hidFirst[1].split(","),
        getThird = hidFirst[2].split(","),
        getFourth = hidFirst[3].split(","),
        getFifth = hidFirst[4].split(","),
        getFirstRange = hidRange[0].split(","),
        getSecondRange = hidRange[1].split(","),
        getThirdRange = hidRange[2].split(","),
        getFourthRange = hidRange[3].split(","),
        getFifthRange = hidRange[4].split(",");
    var val1 = parseInt(getFirst[0]), valTwo1 = parseInt(getSecond[0]), valThree1 = parseInt(getThird[0]), valFourth1 = parseInt(getFourth[0]), valFifth1 = parseInt(getFifth[0]), valRange1 = parseInt(getFirstRange[0]), valTwoRange1 = parseInt(getSecondRange[0]), valThreeRange1 = parseInt(getThirdRange[0]), valFourthRange1 = parseInt(getFourthRange[0]), valFifthRange1 = parseInt(getFifthRange[0]);
    var arr1, arr2, arr3, arr4, arr5;
    var arrRange1, arrRange2, arrRange3, arrRange4, arrRange5;
    var val2, valTwo2, valThree2, valFourth2, valFifth2, valRange2, valTwoRange2, valThreeRange2, valFourthRange2, valFifthRange2;
    var val3, valTwo3, valThree3, valFourth3, valFifth3, valRange3, valTwoRange3, valThreeRange3, valFourthRange3, valFifthRange3;
    var val4, valTwo4, valThree4, valFourth4, valFifth4, valRange4, valTwoRange4, valThreeRange4, valFourthRange4, valFifthRange4;
    var val5, valTwo5, valThree5, valFourth5, valFifth5, valRange5, valTwoRange5, valThreeRange5, valFourthRange5, valFifthRange5;
    var val6, valTwo6, valThree6, valFourth6, valFifth6, valRange6, valTwoRange6, valThreeRange6, valFourthRange6, valFifthRange6;
    var val7, valTwo7, valThree7, valFourth7, valFifth7, valRange7, valTwoRange7, valThreeRange7, valFourthRange7, valFifthRange7;
    var val8, valTwo8, valThree8, valFourth8, valFifth8, valRange8, valTwoRange8, valThreeRange8, valFourthRange8, valFifthRange8;
    var val9, valTwo9, valThree9, valFourth9, valFifth9, valRange9, valTwoRange9, valThreeRange9, valFourthRange9, valFifthRange9;
    var val10, valTwo10, valThree10, valFourth10, valFifth10, valRange10, valTwoRange10, valThreeRange10, valFourthRange10, valFifthRange10;

    val2 = parseInt(getFirst[1]), valTwo2 = parseInt(getSecond[1]), valThree2 = parseInt(getThird[1]), valFourth2 = parseInt(getFourth[1]), valFifth2 = parseInt(getFifth[1]), valRange2 = parseInt(getFirstRange[1]), valTwoRange2 = parseInt(getSecondRange[1]), valThreeRange2 = parseInt(getThirdRange[1]), valFourthRange2 = parseInt(getFourthRange[1]), valFifthRange2 = parseInt(getFifthRange[1]);
    val3 = parseInt(getFirst[2]), valTwo3 = parseInt(getSecond[2]), valThree3 = parseInt(getThird[2]), valFourth3 = parseInt(getFourth[2]), valFifth3 = parseInt(getFifth[2]), valRange3 = parseInt(getFirstRange[2]), valTwoRange3 = parseInt(getSecondRange[2]), valThreeRange3 = parseInt(getThirdRange[2]), valFourthRange3 = parseInt(getFourthRange[2]), valFifthRange3 = parseInt(getFifthRange[2]);
    val4 = parseInt(getFirst[3]), valTwo4 = parseInt(getSecond[3]), valThree4 = parseInt(getThird[3]), valFourth4 = parseInt(getFourth[3]), valFifth4 = parseInt(getFifth[3]), valRange4 = parseInt(getFirstRange[3]), valTwoRange4 = parseInt(getSecondRange[3]), valThreeRange4 = parseInt(getThirdRange[3]), valFourthRange4 = parseInt(getFourthRange[3]), valFifthRange4 = parseInt(getFifthRange[3]);
    val5 = parseInt(getFirst[4]), valTwo5 = parseInt(getSecond[4]), valThree5 = parseInt(getThird[4]), valFourth5 = parseInt(getFourth[4]), valFifth5 = parseInt(getFifth[4]), valRange5 = parseInt(getFirstRange[4]), valTwoRange5 = parseInt(getSecondRange[4]), valThreeRange5 = parseInt(getThirdRange[4]), valFourthRange5 = parseInt(getFourthRange[4]), valFifthRange5 = parseInt(getFifthRange[4]);
    val6 = parseInt(getFirst[5]), valTwo6 = parseInt(getSecond[5]), valThree6 = parseInt(getThird[5]), valFourth6 = parseInt(getFourth[5]), valFifth6 = parseInt(getFifth[5]), valRange6 = parseInt(getFirstRange[5]), valTwoRange6 = parseInt(getSecondRange[5]), valThreeRange6 = parseInt(getThirdRange[5]), valFourthRange6 = parseInt(getFourthRange[5]), valFifthRange6 = parseInt(getFifthRange[5]);
    val7 = parseInt(getFirst[6]), valTwo7 = parseInt(getSecond[6]), valThree7 = parseInt(getThird[6]), valFourth7 = parseInt(getFourth[6]), valFifth7 = parseInt(getFifth[6]), valRange7 = parseInt(getFirstRange[6]), valTwoRange7 = parseInt(getSecondRange[6]), valThreeRange7 = parseInt(getThirdRange[6]), valFourthRange7 = parseInt(getFourthRange[6]), valFifthRange7 = parseInt(getFifthRange[6]);
    val8 = parseInt(getFirst[7]), valTwo8 = parseInt(getSecond[7]), valThree8 = parseInt(getThird[7]), valFourth8 = parseInt(getFourth[7]), valFifth8 = parseInt(getFifth[7]), valRange8 = parseInt(getFirstRange[7]), valTwoRange8 = parseInt(getSecondRange[7]), valThreeRange8 = parseInt(getThirdRange[7]), valFourthRange8 = parseInt(getFourthRange[7]), valFifthRange8 = parseInt(getFifthRange[7]);
    val9 = parseInt(getFirst[8]), valTwo9 = parseInt(getSecond[8]), valThree9 = parseInt(getThird[8]), valFourth9 = parseInt(getFourth[8]), valFifth9 = parseInt(getFifth[8]), valRange9 = parseInt(getFirstRange[8]), valTwoRange9 = parseInt(getSecondRange[8]), valThreeRange9 = parseInt(getThirdRange[8]), valFourthRange9 = parseInt(getFourthRange[8]), valFifthRange9 = parseInt(getFifthRange[8]);
    val10 = parseInt(getFirst[9]), valTwo10 = parseInt(getSecond[9]), valThree10 = parseInt(getThird[9]), valFourth10 = parseInt(getFourth[9]), valFifth10 = parseInt(getFifth[9]), valRange10 = parseInt(getFirstRange[9]), valTwoRange10 = parseInt(getSecondRange[9]), valThreeRange10 = parseInt(getThirdRange[9]), valFourthRange10 = parseInt(getFourthRange[9]), valFifthRange10 = parseInt(getFifthRange[9]);
    if (getCountYear == 1) {
        arr1 = { name: cap1, color: color1, data: [val1], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear];
        document.getElementById("crtEventProcess").style.width = "180px";
    } else if (getCountYear == 2) {
        arr1 = { name: cap1, color: color1, data: [val1, val2], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear];
        document.getElementById("crtEventProcess").style.width = "350px";
    }
    else if (getCountYear == 3) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear];
        document.getElementById("crtEventProcess").style.width = "450px";
    }
    else if (getCountYear == 4) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3, valFourth4], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3, valFifth4], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3, valFourthRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3, valFifthRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear];
        document.getElementById("crtEventProcess").style.width = "550px";
    }
    else if (getCountYear == 5) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3, valFourth4, valFourth5], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3, valFifth4, valFifth5], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3, valFourthRange4, valFourthRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3, valFifthRange4, valFifthRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear];
        document.getElementById("crtEventProcess").style.width = "700px";
    }
    else if (getCountYear == 6) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3, valFourth4, valFourth5, valFourth6], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3, valFifth4, valFifth5, valFifth6], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3, valFourthRange4, valFourthRange5, valFourthRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3, valFifthRange4, valFifthRange5, valFifthRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear];
        document.getElementById("crtEventProcess").style.width = "900px";
    }
    else if (getCountYear == 7) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6, valThree7], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3, valFourth4, valFourth5, valFourth6, valFourth7], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3, valFifth4, valFifth5, valFifth6, valFifth7], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6, valThreeRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3, valFourthRange4, valFourthRange5, valFourthRange6, valFourthRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3, valFifthRange4, valFifthRange5, valFifthRange6, valFifthRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear];
        document.getElementById("crtEventProcess").style.width = "1150px";
    }
    else if (getCountYear == 8) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7, val8], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7, valTwo8], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6, valThree7, valThree8], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3, valFourth4, valFourth5, valFourth6, valFourth7, valFourth8], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3, valFifth4, valFifth5, valFifth6, valFifth7, valFifth8], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7, valRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7, valTwoRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6, valThreeRange7, valThreeRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3, valFourthRange4, valFourthRange5, valFourthRange6, valFourthRange7, valFourthRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3, valFifthRange4, valFifthRange5, valFifthRange6, valFifthRange7, valFifthRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear, getEightthYear];
        document.getElementById("crtEventProcess").style.width = "1300px";
    }
    else if (getCountYear == 9) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7, val8, val9], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7, valTwo8, valTwo9], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6, valThree7, valThree8, valThree9], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3, valFourth4, valFourth5, valFourth6, valFourth7, valFourth8, valFourth9], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3, valFifth4, valFifth5, valFifth6, valFifth7, valFifth8, valFifth9], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7, valRange8, valRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7, valTwoRange8, valTwoRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6, valThreeRange7, valThreeRange8, valThreeRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3, valFourthRange4, valFourthRange5, valFourthRange6, valFourthRange7, valFourthRange8, valFourthRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3, valFifthRange4, valFifthRange5, valFifthRange6, valFifthRange7, valFifthRange8, valFifthRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear, getEightthYear, getNinthYear];
        document.getElementById("crtEventProcess").style.width = "1500px";
    }
    else if (getCountYear == 10) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7, val8, val9, val10], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7, valTwo8, valTwo9, valTwo10], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6, valThree7, valThree8, valThree9, valThree10], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3, valFourth4, valFourth5, valFourth6, valFourth7, valFourth8, valFourth9, valFourth10], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3, valFifth4, valFifth5, valFifth6, valFifth7, valFifth8, valFifth9, valFifth10], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7, valRange8, valRange9, valRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7, valTwoRange8, valTwoRange9, valTwoRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6, valThreeRange7, valThreeRange8, valThreeRange9, valThreeRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3, valFourthRange4, valFourthRange5, valFourthRange6, valFourthRange7, valFourthRange8, valFourthRange9, valFourthRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3, valFifthRange4, valFifthRange5, valFifthRange6, valFifthRange7, valFifthRange8, valFifthRange9, valFifthRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear, getEightthYear, getNinthYear, getTenthYear];
        document.getElementById("crtEventProcess").style.width = "1500px";
    }
    // Create the chart
    chartEventProcess = new Highcharts.Chart('crtEventProcess', {
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'column',
            style: {
                fontFamily: 'IRANSans'
            },
            scrollablePlotArea: {
                minWidth: 180,
                scrollPositionX: 1,
                opacity: 1
            }
        },
        title: { text: '' },
        xAxis: {
            labels: {
                style: {
                    textOverflow: 'none',
                    whiteSpace: 'nowrap'
                },
                formatter: function () {
                    return '<div class="evnt-cap-bar"><div class="rotate90">بازه رویداد</div><div class="rotate90">سایر ایام<br />سال</div></div><div class="evnt-cap-bar-line"></div><div class="text-center" style="color:#4A8987">سال<br>' + this.value + '</div>';
                },
                //format: '<div style="text-align:center;">&nbsp; بازه رویداد&nbsp; سایر ایام سال<br /></div><hr>' + this.value,
                useHTML: true
            },
            tickLength: 5,
            style: {
                width: 150
            },
            categories: cat
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<b>' + this.series.name + '</b>: ' + this.percentage + ' درصد' + "<br>" + ' سال' + this.x + "<br>" + " دسته :" + this.series.options.group;
            }
        },
        yAxis: {
            min: 0,
            max: 100,
            title: { enabled: false },
            labels: {
                format: '{value}%'
            },
            gridLineColor: 'transparent'
        },
        legend: {
            enabled: false,
            floating: true,
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            itemMarginTop: 10,
            itemMarginBottom: 10,
            useHTML: true,
            symbolWidth: 0
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            column: {
                stacking: 'percent',
                pointWidth: 32,
                groupPadding: 0.02,
                pointPadding: 0
            }
        },
        series: [arrRange5, arrRange4, arrRange3, arrRange2, arrRange1,arr5,arr4,arr3,arr2,arr1]
    }, function (chart) {
        $('#customLegend').html("");
        var $legend = $('#customLegend');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:' + color1 + '"></div><div class="custom-legend-highchart-title" >' + cap1 + '</div></div>');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:' + color2 + '"></div><div class="custom-legend-highchart-title" >' + cap2 + '</div></div>');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:' + color3 + '"></div><div class="custom-legend-highchart-title" >' + cap3 + '</div></div>');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:' + color4 + '"></div><div class="custom-legend-highchart-title" >' + cap4 + '</div></div>');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:' + color5 + '"></div><div class="custom-legend-highchart-title" >' + cap5 + '</div></div>');
        $('#customLegend .custom-legend-highchart').click(function () {
            let inx = $(this).index();
            let series = chart.series;
            if (inx == 0) {
                series[4].visible ?
                    series[4].hide() :
                    series[4].show();
                series[9].visible ?
                    series[9].hide() :
                    series[9].show();
            }
            else if (inx == '1') {
                series[3].visible ?
                    series[3].hide() :
                    series[3].show();
                series[8].visible ?
                    series[8].hide() :
                    series[8].show();
            }
            else if (inx == '2') {
                series[2].visible ?
                    series[2].hide() :
                    series[2].show();
                series[7].visible ?
                    series[7].hide() :
                    series[7].show();
            }
            else if (inx == '3') {
                series[1].visible ?
                    series[1].hide() :
                    series[1].show();
                series[6].visible ?
                    series[6].hide() :
                    series[6].show();
            }
            else if (inx == '4') {
                series[0].visible ?
                    series[0].hide() :
                    series[0].show();
                series[5].visible ?
                    series[5].hide() :
                    series[5].show();
            }
        });
    });
}
function EventProcessWithSix(cap1, cap2, cap3, cap4, cap5, cap6, color1, color2, color3, color4, color5, color6) {
    var hidFirst = $('#hidFirst').val().split("#");
    var hidRange = $('#hidRange').val().split("#");
    var hidYear = $('#hidYear').val().split(",");
    var cat = [];
    var getCountYear = 0;
    var rdoDate = $('input[type=radio][name=rdoDate]:checked').val();
    if (rdoDate == '1Year')
        getCountYear = 1;
    else if (rdoDate == '2Year')
        getCountYear = 2;
    else if (rdoDate == '3Year')
        getCountYear = 3;
    else if (rdoDate == '5Year')
        getCountYear = 5;
    else if (rdoDate == 'All')
        getCountYear = 10;
    var startYear = $('#txtStartYear').val();
    var endYear = $('#txtEndYear').val();
    if (rdoDate == 'Date' && startYear != "" && endYear != "") {
        var getDiffYear = parseInt(endYear) - parseInt(startYear);
        if (getDiffYear > 9) {
            $("#lblMessage").html(CreateModal("امکان گزارش گیری برای بیشتر از محدوده 10 سال امکانپذیر نمی باشد!"));
            $('#MessageModal').modal();
            return;
        } else if (getDiffYear < 0) {
            $("#lblMessage").html(CreateModal("امکان گزارش گیری برای کمتر از محدوده 0 سال امکانپذیر نمی باشد!"));
            $('#MessageModal').modal();
            return;
        } else getCountYear = getDiffYear;
    }
    let getFirstYear = hidYear[0],
        getSecondYear = hidYear[1],
        getThirdYear = hidYear[2],
        getFourthYear = hidYear[3],
        getFifthYear = hidYear[4],
        getSixthYear = hidYear[5],
        getSeventhYear = hidYear[6],
        getEightthYear = hidYear[7],
        getNinthYear = hidYear[8],
        getTenthYear = hidYear[9];

    let getFirst = hidFirst[0].split(","),
        getSecond = hidFirst[1].split(","),
        getThird = hidFirst[2].split(","),
        getFourth = hidFirst[3].split(","),
        getFifth = hidFirst[4].split(","),
        getSixth = hidFirst[5].split(","),
        getFirstRange = hidRange[0].split(","),
        getSecondRange = hidRange[1].split(","),
        getThirdRange = hidRange[2].split(","),
        getFourthRange = hidRange[3].split(","),
        getFifthRange = hidRange[4].split(","),
        getSixthRange = hidRange[5].split(",");
    var val1 = parseInt(getFirst[0]), valTwo1 = parseInt(getSecond[0]), valThree1 = parseInt(getThird[0]), valFourth1 = parseInt(getFourth[0]), valFifth1 = parseInt(getFifth[0]), valSixth1 = parseInt(getSixth[0]), valRange1 = parseInt(getFirstRange[0]), valTwoRange1 = parseInt(getSecondRange[0]), valThreeRange1 = parseInt(getThirdRange[0]), valFourthRange1 = parseInt(getFourthRange[0]), valFifthRange1 = parseInt(getFifthRange[0]), valSixthRange1 = parseInt(getSixthRange[0]);
    var arr1, arr2, arr3, arr4, arr5, arr6;
    var arrRange1, arrRange2, arrRange3, arrRange4, arrRange5, arrRange6;
    var val2, valTwo2, valThree2, valFourth2, valFifth2, valSixth2, valRange2, valTwoRange2, valThreeRange2, valFourthRange2, valFifthRange2, valSixthRange2;
    var val3, valTwo3, valThree3, valFourth3, valFifth3, valSixth3, valRange3, valTwoRange3, valThreeRange3, valFourthRange3, valFifthRange3, valSixthRange3;
    var val4, valTwo4, valThree4, valFourth4, valFifth4, valSixth4, valRange4, valTwoRange4, valThreeRange4, valFourthRange4, valFifthRange4, valSixthRange4;
    var val5, valTwo5, valThree5, valFourth5, valFifth5, valSixth5, valRange5, valTwoRange5, valThreeRange5, valFourthRange5, valFifthRange5, valSixthRange5;
    var val6, valTwo6, valThree6, valFourth6, valFifth6, valSixth6, valRange6, valTwoRange6, valThreeRange6, valFourthRange6, valFifthRange6, valSixthRange6;
    var val7, valTwo7, valThree7, valFourth7, valFifth7, valSixth7, valRange7, valTwoRange7, valThreeRange7, valFourthRange7, valFifthRange7, valSixthRange7;
    var val8, valTwo8, valThree8, valFourth8, valFifth8, valSixth8, valRange8, valTwoRange8, valThreeRange8, valFourthRange8, valFifthRange8, valSixthRange8;
    var val9, valTwo9, valThree9, valFourth9, valFifth9, valSixth9, valRange9, valTwoRange9, valThreeRange9, valFourthRange9, valFifthRange9, valSixthRange9;
    var val10, valTwo10, valThree10, valFourth10, valFifth10, valSixth10, valRange10, valTwoRange10, valThreeRange10, valFourthRange10, valFifthRange10, valSixthRange10;

    val2 = parseInt(getFirst[1]), valTwo2 = parseInt(getSecond[1]), valThree2 = parseInt(getThird[1]), valFourth2 = parseInt(getFourth[1]), valFifth2 = parseInt(getFifth[1]), valSixth2 = parseInt(getSixth[1]), valRange2 = parseInt(getFirstRange[1]), valTwoRange2 = parseInt(getSecondRange[1]), valThreeRange2 = parseInt(getThirdRange[1]), valFourthRange2 = parseInt(getFourthRange[1]), valFifthRange2 = parseInt(getFifthRange[1]), valSixthRange2 = parseInt(getSixthRange[1]);
    val3 = parseInt(getFirst[2]), valTwo3 = parseInt(getSecond[2]), valThree3 = parseInt(getThird[2]), valFourth3 = parseInt(getFourth[2]), valFifth3 = parseInt(getFifth[2]), valSixth3 = parseInt(getSixth[2]), valRange3 = parseInt(getFirstRange[2]), valTwoRange3 = parseInt(getSecondRange[2]), valThreeRange3 = parseInt(getThirdRange[2]), valFourthRange3 = parseInt(getFourthRange[2]), valFifthRange3 = parseInt(getFifthRange[2]), valSixthRange3 = parseInt(getSixthRange[2]);
    val4 = parseInt(getFirst[3]), valTwo4 = parseInt(getSecond[3]), valThree4 = parseInt(getThird[3]), valFourth4 = parseInt(getFourth[3]), valFifth4 = parseInt(getFifth[3]), valSixth4 = parseInt(getSixth[3]), valRange4 = parseInt(getFirstRange[3]), valTwoRange4 = parseInt(getSecondRange[3]), valThreeRange4 = parseInt(getThirdRange[3]), valFourthRange4 = parseInt(getFourthRange[3]), valFifthRange4 = parseInt(getFifthRange[3]), valSixthRange4 = parseInt(getSixthRange[3]);
    val5 = parseInt(getFirst[4]), valTwo5 = parseInt(getSecond[4]), valThree5 = parseInt(getThird[4]), valFourth5 = parseInt(getFourth[4]), valFifth5 = parseInt(getFifth[4]), valSixth5 = parseInt(getSixth[4]), valRange5 = parseInt(getFirstRange[4]), valTwoRange5 = parseInt(getSecondRange[4]), valThreeRange5 = parseInt(getThirdRange[4]), valFourthRange5 = parseInt(getFourthRange[4]), valFifthRange5 = parseInt(getFifthRange[4]), valSixthRange5 = parseInt(getSixthRange[4]);
    val6 = parseInt(getFirst[5]), valTwo6 = parseInt(getSecond[5]), valThree6 = parseInt(getThird[5]), valFourth6 = parseInt(getFourth[5]), valFifth6 = parseInt(getFifth[5]), valSixth6 = parseInt(getSixth[5]), valRange6 = parseInt(getFirstRange[5]), valTwoRange6 = parseInt(getSecondRange[5]), valThreeRange6 = parseInt(getThirdRange[5]), valFourthRange6 = parseInt(getFourthRange[5]), valFifthRange6 = parseInt(getFifthRange[5]), valSixthRange6 = parseInt(getSixthRange[5]);
    val7 = parseInt(getFirst[6]), valTwo7 = parseInt(getSecond[6]), valThree7 = parseInt(getThird[6]), valFourth7 = parseInt(getFourth[6]), valFifth7 = parseInt(getFifth[6]), valSixth7 = parseInt(getSixth[6]), valRange7 = parseInt(getFirstRange[6]), valTwoRange7 = parseInt(getSecondRange[6]), valThreeRange7 = parseInt(getThirdRange[6]), valFourthRange7 = parseInt(getFourthRange[6]), valFifthRange7 = parseInt(getFifthRange[6]), valSixthRange7 = parseInt(getSixthRange[6]);
    val8 = parseInt(getFirst[7]), valTwo8 = parseInt(getSecond[7]), valThree8 = parseInt(getThird[7]), valFourth8 = parseInt(getFourth[7]), valFifth8 = parseInt(getFifth[7]), valSixth8 = parseInt(getSixth[7]), valRange8 = parseInt(getFirstRange[7]), valTwoRange8 = parseInt(getSecondRange[7]), valThreeRange8 = parseInt(getThirdRange[7]), valFourthRange8 = parseInt(getFourthRange[7]), valFifthRange8 = parseInt(getFifthRange[7]), valSixthRange8 = parseInt(getSixthRange[7]);
    val9 = parseInt(getFirst[8]), valTwo9 = parseInt(getSecond[8]), valThree9 = parseInt(getThird[8]), valFourth9 = parseInt(getFourth[8]), valFifth9 = parseInt(getFifth[8]), valSixth9 = parseInt(getSixth[8]), valRange9 = parseInt(getFirstRange[8]), valTwoRange9 = parseInt(getSecondRange[8]), valThreeRange9 = parseInt(getThirdRange[8]), valFourthRange9 = parseInt(getFourthRange[8]), valFifthRange9 = parseInt(getFifthRange[8]), valSixthRange9 = parseInt(getSixthRange[8]);
    val10 = parseInt(getFirst[9]), valTwo10 = parseInt(getSecond[9]), valThree10 = parseInt(getThird[9]), valFourth10 = parseInt(getFourth[9]), valFifth10 = parseInt(getFifth[9]), valSixth10 = parseInt(getSixth[9]), valRange10 = parseInt(getFirstRange[9]), valTwoRange10 = parseInt(getSecondRange[9]), valThreeRange10 = parseInt(getThirdRange[9]), valFourthRange10 = parseInt(getFourthRange[9]), valFifthRange10 = parseInt(getFifthRange[9]), valSixthRange10 = parseInt(getSixthRange[9]);
    if (getCountYear == 1) {
        arr1 = { name: cap1, color: color1, data: [val1], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1], stack: 1, group: "سایر ایام سال" }
        arr6 = { name: cap6, color: color6, data: [valSixth1], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange6 = { name: cap6, color: color6, data: [valSixthRange1], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear];
        document.getElementById("crtEventProcess").style.width = "180px";
    } else if (getCountYear == 2) {
        arr1 = { name: cap1, color: color1, data: [val1, val2], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2], stack: 1, group: "سایر ایام سال" }
        arr6 = { name: cap6, color: color6, data: [valSixth1, valSixth2], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange6 = { name: cap6, color: color6, data: [valSixthRange1, valSixthRange2], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear];
        document.getElementById("crtEventProcess").style.width = "350px";
    }
    else if (getCountYear == 3) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3], stack: 1, group: "سایر ایام سال" }
        arr6 = { name: cap6, color: color6, data: [valSixth1, valSixth2, valSixth3], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange6 = { name: cap6, color: color6, data: [valSixthRange1, valSixthRange2, valSixthRange3], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear];
        document.getElementById("crtEventProcess").style.width = "450px";
    }
    else if (getCountYear == 4) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3, valFourth4], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3, valFifth4], stack: 1, group: "سایر ایام سال" }
        arr6 = { name: cap6, color: color6, data: [valSixth1, valSixth2, valSixth3, valSixth4], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3, valFourthRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3, valFifthRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange6 = { name: cap6, color: color6, data: [valSixthRange1, valSixthRange2, valSixthRange3, valSixthRange4], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear];
        document.getElementById("crtEventProcess").style.width = "550px";
    }
    else if (getCountYear == 5) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3, valFourth4, valFourth5], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3, valFifth4, valFifth5], stack: 1, group: "سایر ایام سال" }
        arr6 = { name: cap6, color: color6, data: [valSixth1, valSixth2, valSixth3, valSixth4, valSixth5], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3, valFourthRange4, valFourthRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3, valFifthRange4, valFifthRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange6 = { name: cap6, color: color6, data: [valSixthRange1, valSixthRange2, valSixthRange3, valSixthRange4, valSixthRange5], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear];
        document.getElementById("crtEventProcess").style.width = "700px";
    }
    else if (getCountYear == 6) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3, valFourth4, valFourth5, valFourth6], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3, valFifth4, valFifth5, valFifth6], stack: 1, group: "سایر ایام سال" }
        arr6 = { name: cap6, color: color6, data: [valSixth1, valSixth2, valSixth3, valSixth4, valSixth5, valSixth6], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3, valFourthRange4, valFourthRange5, valFourthRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3, valFifthRange4, valFifthRange5, valFifthRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange6 = { name: cap6, color: color6, data: [valSixthRange1, valSixthRange2, valSixthRange3, valSixthRange4, valSixthRange5, valSixthRange6], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear];
        document.getElementById("crtEventProcess").style.width = "900px";
    }
    else if (getCountYear == 7) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6, valThree7], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3, valFourth4, valFourth5, valFourth6, valFourth7], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3, valFifth4, valFifth5, valFifth6, valFifth7], stack: 1, group: "سایر ایام سال" }
        arr6 = { name: cap6, color: color6, data: [valSixth1, valSixth2, valSixth3, valSixth4, valSixth5, valSixth6, valSixth7], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6, valThreeRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3, valFourthRange4, valFourthRange5, valFourthRange6, valFourthRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3, valFifthRange4, valFifthRange5, valFifthRange6, valFifthRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange6 = { name: cap6, color: color6, data: [valSixthRange1, valSixthRange2, valSixthRange3, valSixthRange4, valSixthRange5, valSixthRange6, valSixthRange7], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear];
        document.getElementById("crtEventProcess").style.width = "1150px";
    }
    else if (getCountYear == 8) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7, val8], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7, valTwo8], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6, valThree7, valThree8], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3, valFourth4, valFourth5, valFourth6, valFourth7, valFourth8], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3, valFifth4, valFifth5, valFifth6, valFifth7, valFifth8], stack: 1, group: "سایر ایام سال" }
        arr6 = { name: cap6, color: color6, data: [valSixth1, valSixth2, valSixth3, valSixth4, valSixth5, valSixth6, valSixth7, valSixth8], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7, valRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7, valTwoRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6, valThreeRange7, valThreeRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3, valFourthRange4, valFourthRange5, valFourthRange6, valFourthRange7, valFourthRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3, valFifthRange4, valFifthRange5, valFifthRange6, valFifthRange7, valFifthRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange6 = { name: cap6, color: color6, data: [valSixthRange1, valSixthRange2, valSixthRange3, valSixthRange4, valSixthRange5, valSixthRange6, valSixthRange7, valSixthRange8], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear, getEightthYear];
        document.getElementById("crtEventProcess").style.width = "1300px";
    }
    else if (getCountYear == 9) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7, val8, val9], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7, valTwo8, valTwo9], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6, valThree7, valThree8, valThree9], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3, valFourth4, valFourth5, valFourth6, valFourth7, valFourth8, valFourth9], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3, valFifth4, valFifth5, valFifth6, valFifth7, valFifth8, valFifth9], stack: 1, group: "سایر ایام سال" }
        arr6 = { name: cap6, color: color6, data: [valSixth1, valSixth2, valSixth3, valSixth4, valSixth5, valSixth6, valSixth7, valSixth8, valSixth9], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7, valRange8, valRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7, valTwoRange8, valTwoRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6, valThreeRange7, valThreeRange8, valThreeRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3, valFourthRange4, valFourthRange5, valFourthRange6, valFourthRange7, valFourthRange8, valFourthRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3, valFifthRange4, valFifthRange5, valFifthRange6, valFifthRange7, valFifthRange8, valFifthRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange6 = { name: cap6, color: color6, data: [valSixthRange1, valSixthRange2, valSixthRange3, valSixthRange4, valSixthRange5, valSixthRange6, valSixthRange7, valSixthRange8, valSixthRange9], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear, getEightthYear, getNinthYear];
        document.getElementById("crtEventProcess").style.width = "1500px";
    }
    else if (getCountYear == 10) {
        arr1 = { name: cap1, color: color1, data: [val1, val2, val3, val4, val5, val6, val7, val8, val9, val10], stack: 1, group: "سایر ایام سال" }
        arr2 = { name: cap2, color: color2, data: [valTwo1, valTwo2, valTwo3, valTwo4, valTwo5, valTwo6, valTwo7, valTwo8, valTwo9, valTwo10], stack: 1, group: "سایر ایام سال" }
        arr3 = { name: cap3, color: color3, data: [valThree1, valThree2, valThree3, valThree4, valThree5, valThree6, valThree7, valThree8, valThree9, valThree10], stack: 1, group: "سایر ایام سال" }
        arr4 = { name: cap4, color: color4, data: [valFourth1, valFourth2, valFourth3, valFourth4, valFourth5, valFourth6, valFourth7, valFourth8, valFourth9, valFourth10], stack: 1, group: "سایر ایام سال" }
        arr5 = { name: cap5, color: color5, data: [valFifth1, valFifth2, valFifth3, valFifth4, valFifth5, valFifth6, valFifth7, valFifth8, valFifth9, valFifth10], stack: 1, group: "سایر ایام سال" }
        arr6 = { name: cap6, color: color6, data: [valSixth1, valSixth2, valSixth3, valSixth4, valSixth5, valSixth6, valSixth7, valSixth8, valSixth9, valSixth10], stack: 1, group: "سایر ایام سال" }
        arrRange1 = { name: cap1, color: color1, data: [valRange1, valRange2, valRange3, valRange4, valRange5, valRange6, valRange7, valRange8, valRange9, valRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange2 = { name: cap2, color: color2, data: [valTwoRange1, valTwoRange2, valTwoRange3, valTwoRange4, valTwoRange5, valTwoRange6, valTwoRange7, valTwoRange8, valTwoRange9, valTwoRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange3 = { name: cap3, color: color3, data: [valThreeRange1, valThreeRange2, valThreeRange3, valThreeRange4, valThreeRange5, valThreeRange6, valThreeRange7, valThreeRange8, valThreeRange9, valThreeRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange4 = { name: cap4, color: color4, data: [valFourthRange1, valFourthRange2, valFourthRange3, valFourthRange4, valFourthRange5, valFourthRange6, valFourthRange7, valFourthRange8, valFourthRange9, valFourthRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange5 = { name: cap5, color: color5, data: [valFifthRange1, valFifthRange2, valFifthRange3, valFifthRange4, valFifthRange5, valFifthRange6, valFifthRange7, valFifthRange8, valFifthRange9, valFifthRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        arrRange6 = { name: cap6, color: color6, data: [valSixthRange1, valSixthRange2, valSixthRange3, valSixthRange4, valSixthRange5, valSixthRange6, valSixthRange7, valSixthRange8, valSixthRange9, valSixthRange10], showInLegend: false, stack: 2, group: "بازه رویداد" }
        cat = [getFirstYear, getSecondYear, getThirdYear, getFourthYear, getFifthYear, getSixthYear, getSeventhYear, getEightthYear, getNinthYear, getTenthYear];
        document.getElementById("crtEventProcess").style.width = "1500px";
    }
    // Create the chart
    chartEventProcess = new Highcharts.Chart('crtEventProcess', {
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'column',
            style: {
                fontFamily: 'IRANSans'
            },
            scrollablePlotArea: {
                minWidth: 180,
                scrollPositionX: 1,
                opacity: 1
            }
        },
        title: { text: '' },
        xAxis: {
            labels: {
                style: {
                    textOverflow: 'none',
                    whiteSpace: 'nowrap'
                },
                formatter: function () {
                    return '<div class="evnt-cap-bar"><div class="rotate90">بازه رویداد</div><div class="rotate90">سایر ایام<br />سال</div></div><div class="evnt-cap-bar-line"></div><div class="text-center" style="color:#4A8987">سال<br>' + this.value + '</div>';
                },
                useHTML: true
            },
            tickLength: 5,
            style: {
                width: 150
            },
            categories: cat
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<b>' + this.series.name + '</b>: ' + this.percentage + ' درصد' + "<br>" + ' سال' + this.x + "<br>" + " دسته :" + this.series.options.group;
            }
        },
        yAxis: {
            min: 0,
            max: 100,
            title: { enabled: false },
            labels: {
                format: '{value}%'
            },
            gridLineColor: 'transparent'
        },
        legend: {
            enabled: false,
            floating: true,
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            itemMarginTop: 10,
            itemMarginBottom: 10,
            useHTML: true,
            symbolWidth: 0
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            column: {
                stacking: 'percent',
                pointWidth: 32,
                groupPadding: 0.02,
                pointPadding: 0
            }
        },
        series: [arrRange6, arrRange5, arrRange4, arrRange3, arrRange2, arrRange1, arr6, arr5, arr4, arr3, arr2, arr1]
    }, function (chart) {
        $('#customLegend').html("");
        var $legend = $('#customLegend');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:' + color6 + '"></div><div class="custom-legend-highchart-title" >' + cap6 + '</div></div>');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:' + color5 + '"></div><div class="custom-legend-highchart-title" >' + cap5 + '</div></div>');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:' + color4 + '"></div><div class="custom-legend-highchart-title" >' + cap4 + '</div></div>');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:' + color3 + '"></div><div class="custom-legend-highchart-title" >' + cap3 + '</div></div>');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:' + color2 + '"></div><div class="custom-legend-highchart-title" >' + cap2 + '</div></div>');
        $legend.append('<div class="custom-legend-highchart"><div class="custom-legend-highchart-point" style="background-color:' + color1 + '"></div><div class="custom-legend-highchart-title" >' + cap1 + '</div></div>');
        $('#customLegend .custom-legend-highchart').click(function () {
            var inx = $(this).index();
            var series = chart.series;
            if (inx == '0') {
                series[0].visible ?
                    series[0].hide() :
                    series[0].show();
                series[6].visible ?
                    series[6].hide() :
                    series[6].show();
            }
            else if (inx == '1') {
                series[1].visible ?
                    series[1].hide() :
                    series[1].show();
                series[7].visible ?
                    series[7].hide() :
                    series[7].show();
            }
            else if (inx == '2') {
                series[2].visible ?
                    series[2].hide() :
                    series[2].show();
                series[8].visible ?
                    series[8].hide() :
                    series[8].show();
            }
            else if (inx == '3') {
                series[3].visible ?
                    series[3].hide() :
                    series[3].show();
                series[9].visible ?
                    series[9].hide() :
                    series[9].show();
            }
            else if (inx == '4') {
                series[4].visible ?
                    series[4].hide() :
                    series[4].show();
                series[10].visible ?
                    series[10].hide() :
                    series[10].show();
            }
            else if (inx == '5') {
                series[5].visible ?
                    series[5].hide() :
                    series[5].show();
                series[11].visible ?
                    series[11].hide() :
                    series[11].show();
            }
        });
    });
}
function pageLoad() {
    $("#cmbProvinceSearch").select2({
        placeholder: {
            id: "-1",
            text: "محدوده ترافیکی"
        },
        allowClear: true,
        dir: 'rtl'
    });
    $("#cmbCity").select2({
        placeholder: {
            id: "-1",
            text: " کد شهری"
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
    $("#cmbMonth").select2({
        placeholder: {
            id: "-1",
            text: "نمایش بر اساس ماه"
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
        //groupId: 'group1',
        rangeSelector: true
    });
    $("#lnkEventProcess").addClass("active");
    $.ajax({
        type: "POST",
        url: "EventProcess.aspx/GetFillEvent",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess !== "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var optionVal = '';
                    for (i = 0; i < msg.d.length; i++) {
                        var txt = msg.d[i].Message;
                        var id = msg.d[i].Id;
                        optionVal += '<option value="' + id + '">' + txt + '</option>';
                    }
                    $('#cmbEventTime').append(optionVal);
                }
            } else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
            $('#spinSearchLoading').hide();
        },
        error: function (response) {if (response.status == 401) location.reload();},failure: function (response) {
            alert(response.d);
        }
    });
}
function openDateRange() {
    var btn = document.getElementById("dateDateRange");
    btn.click(); event.preventDefault();
}
function FillCity() {
    //let obj = {
    //    "provinceId": $("#cmbProvinceSearch").val() === "-1" ? "" : $("#cmbProvinceSearch").val()
    //}
    //$('#spinSearchLoading').show();
    //$.ajax({
    //    type: "POST",
    //    url: "EventProcess.aspx/GetFillCity",
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
    //                $('#cmbCity').html('<option selected="" value="-1">انتخاب شهرستان</option>');
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
    $("#cmbChartEvent").on('click', function () {
        if ($("#divChartEvent").css("display") == "none") {
            $("#divChartEvent").show('slow');
        } else {
            $("#divChartEvent").hide('slow');
        }
    });
    $("#cmbEventTime").on('change', function () {
        $('input[type=radio][name=rdoAccident]:checked').trigger("change");
    });
    $('#chkIsNotLocalDriver').on('change', function () {
        $('input[type=radio][name=rdoAccident]:checked').trigger("change");
    });
    /*old*/

    
    $('input[type=radio][name=rdoAccident]').on('change', function () {
        var idVal = $(this).attr("id");
        var getVal = $('input[type=radio][name=rdoAccident]:checked').val();
        if (getVal == "AccidentDeceased" || getVal == "LocationLandUse" || getVal == "CompleteCause" || getVal == "TypeAccidentCausingOffense" || getVal == "Culprit" || getVal == "NoCertification" || getVal == "" || getVal == "SafetyBelt" || getVal == "Helmet") {
            $("#lblMessage").html(CreateModal("در دست طراحی!"));
            $('#MessageModal').modal();
            return;
        }
        LoadHideInput(getVal);
        //if (getVal)
        var getText = $("label[for='" + idVal + "']").text();
        $("#spnChartEventTitle").html(getText);
        $("#divChartEvent").hide('slow');
    });
    $('#btnAddEvent').on('click', function () {
        if ($("#divAddEvent").hasClass('hide')) {
            $("#divAddEvent").removeClass('hide');
            $("#btnAddEvent").hide('slow');
            $("#txtEventName").focus();
        }
    });
    $('#btnSubmitEvent').on('click', function () {
        var txtEventName = $('#txtEventName').val();
        if (txtEventName === "") {
            $("#lblMessage").html(CreateModal("نام رویداد را وارد نمایید!"));
            $('#MessageModal').modal();
            $('#txtEventName').focus();
            return;
        }
        var txtDateRange = $('#txtDateRange').val();
        if (txtDateRange === "") {
            $("#lblMessage").html(CreateModal("بازه زمانی رویداد را انتخاب نمایید!"));
            $('#MessageModal').modal();
            $('#txtEventName').focus();
            return;
        }
        var obj = {
            "eventName": txtEventName,
            "dateRange": txtDateRange
        }
        $('#spinSearchLoading').show();
        $.ajax({
            type: "POST",
            url: "EventProcess.aspx/SaveEvent",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg != null) {
                    if (msg.d[0].IsSuccess !== "true") {
                        $("#lblMessage").html(CreateModal(msg.d[0].Message));
                        $('#MessageModal').modal();
                    } else {
                        $("#lblMessage").html(CreateModal(msg.d[0].Message));
                        $('#MessageModal').modal();
                        $("#divAddEvent").addClass('hide');
                        $("#btnAddEvent").show('slow');
                        $('#cmbEventTime').append('<option value="' + msg.d[0].Id + '">' + 'Option ' + txtEventName + '</option>');
                    }
                } else {
                    alert("خطا در برقراری ارتباط با سرور!");
                }
            },
            complete: function () {
                $('#spinSearchLoading').hide();
            },
            error: function (response) {if (response.status == 401) location.reload();},failure: function (response) {
                alert(response.d);
            }
        });
    });
    $('input[type=radio][name=rdoRoadway]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoRoadway]:checked').val();
        LoadHideInput(getVal);
    });
    $('input[type=radio][name=rdoLightingStatus]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoLightingStatus]:checked').val();
        LoadHideInput(getVal);
    });
    $('input[type=radio][name=rdoCollision]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoCollision]:checked').val();
        LoadHideInput(getVal);
    });
    $('input[type=radio][name=rdoCollSingleVehicle]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoCollSingleVehicle]:checked').val();
        LoadHideInput(getVal);
    });
    $('input[type=radio][name=rdoCollTwoVehicle]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoCollTwoVehicle]:checked').val();
        LoadHideInput(getVal);
    });
    $('input[type=radio][name=rdoFinalReason]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoFinalReason]:checked').val();
        LoadHideInput(getVal);
    });
    $('input[type=radio][name=rdoCodeCausingAccident]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoCodeCausingAccident]:checked').val();
        LoadHideInput(getVal);
    });
    $('input[type=radio][name=rdoIsLocal]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoIsLocal]:checked').val();
        //LoadHideInput(getVal);
        LoadHideInput("");
    });
    $('input[type=radio][name=rdoDate]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoDate]:checked').val();
        if (getVal === "Date") {
            $("#divShowDate").show('slow');
        } else {
            $("#divShowDate").hide('slow');
        }
    });
    $('#txtEndYear').on('keyup', function (event) {
        if (event.keyCode === 13) {
            var txtStartYear = $('#txtStartYear').val();
            var txtEndYear = $('#txtEndYear').val();
            if (txtStartYear.length == 4 && txtEndYear.length == 4) {
                $('input[type=radio][name=rdoAccident]:checked').trigger("change");
            }
        }
    });
    $('input[type=radio][name=rdoStatus],input[type=radio][name=rdoIntensity]').on('change', function () {
        LoadHideInput("");
    });
    $('input[type=radio][name=rdoDate]').on('change', function () {
        var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
        if (getDateOfAccident !== "Date") {
            LoadHideInput("");
        }
    });
    $('input[type=radio][name=rdoDays]').on('change', function () {
        //var getDateOfAccident = $('input[type=radio][name=rdoDays]:checked').val();
        LoadHideInput("");
    });
    $("#cmbProvinceSearch").on('change', function () {
        var getProvince = $('#cmbProvinceSearch').val();
        if (getProvince !== "" && getProvince !== null) {
            if (getProvince !== "-1") FillCity();
            LoadHideInput("");
            if (getProvince == "-1") {
                
                if ($('#divCity').css('display') !== 'none') {
                    $("#divCity").hide('slow');
                    $('#cmbCity').val("-1").trigger("change");
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
            LoadHideInput("");
            if (getCity == "-1") {
                $('#cmbInNativeArea').val("-1").trigger("change");
                $('#divInNativeArea').hide("slow");
            }
        }
    });
    
    $("#cmbSelectMonth").on('change', function () {
        var getMonth = $('#cmbSelectMonth').val();
        if (getMonth !== "" && getMonth !== null) {
            LoadHideInput("");
        }
    });
    $("#cmbSeason").on('change', function () {
        var getSeason = $('#cmbSeason').val();
        if (getSeason !== "" && getSeason !== null) {
            LoadHideInput("");
        }
    });
    $("#cmbMonth").on('change', function () {
        var getMonth = $('#cmbMonth').val();
        if (getMonth !== "" && getMonth !== null) {
            LoadHideInput("");
        }
    });
    $("#cmbCollisionOfATwo").on('change', function () {
        var getVal = $('#cmbCollisionOfATwo').val();
        if (getVal !== "" && getVal !== null) {
            if (getVal == "تک وسیله ای") $("#divCollisionChild1").show("slow");
            else $("#divCollisionChild1").hide("slow");
            if (getVal == "دو وسیله ای") $("#divCollisionChild2").show("slow");
            else $("#divCollisionChild2").hide("slow");
            LoadHideInput("");
        }
    });
    $("#cmbCollisionChild1").on('change', function () {
        var getVal = $('#cmbCollisionChild1').val();
        if (getVal !== "" && getVal !== null) {
            LoadHideInput("");
        }
    });
    $("#cmbCollisionChild2").on('change', function () {
        var getVal = $('#cmbCollisionChild2').val();
        if (getVal !== "" && getVal !== null) {
            LoadHideInput("");
        }
    });
    $("#cmbLightingStatus").on('change', function () {
        var getVal = $('#cmbLightingStatus').val();
        if (getVal !== "" && getVal !== null) {
            LoadHideInput("");
        }
    });
    $("#cmbWeather").on('change', function () {
        var getVal = $('#cmbWeather').val();
        if (getVal !== "" && getVal !== null) {
            LoadHideInput("");
        }
    });
    $("#cmbCarriageWayDirection").on('change', function () {
        var getVal = $('#cmbCarriageWayDirection').val();
        if (getVal !== "" && getVal !== null) {
            LoadHideInput("");
        }
    });
    $("#cmbTypeOfWay").on('change', function () {
        var getVal = $('#cmbTypeOfWay').val();
        if (getVal !== "" && getVal !== null) {
            LoadHideInput("");
        }
    });
    $("#cmbCarCrashLocation").on('change', function () {
        var getVal = $('#cmbCarCrashLocation').val();
        if (getVal !== "" && getVal !== null) {
            LoadHideInput("");
        }
    });
    $("#cmbLocationLandUse").on('change', function () {
        var getVal = $('#cmbLocationLandUse').val();
        if (getVal !== "" && getVal !== null) {
            LoadHideInput("");
        }
    });
    $('input[type=radio][name=rdoHoliday]').on('change', function () {
        LoadHideInput("");
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
            LoadHideInput("");
        }
    });
});
function LoadHideInput(getType) {
    //var getId = id == "" ? $("#txtIdSearch").val() : id;
    getType = getType == "" ? $('input[type=radio][name=rdoAccident]:checked').val() : getType;
    if (getType == undefined) {
        $("#lblMessage").html(CreateModal("ابتدا باید دسته تحلیل را انتخاب کنید!"));
        $('#MessageModal').modal();
    } else {
        var getStatus = $('input[type=radio][name=rdoStatus]:checked').val();
        var getStartYear = "", getEndYear = "";
        var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
        if (getDateOfAccident === "Date") {
            getStartYear = $("#txtStartYear").val();
            getEndYear = $("#txtEndYear").val();
        }
        var getCrashType = $('input[type=radio][name=rdoIntensity]:checked').val();
        var getDays = $('input[type=radio][name=rdoDays]:checked').val();
       
        var getIsHoliday = $('input[type=radio][name=rdoHoliday]:checked').val();
        let chkIsNotLocalDriver = $('#chkIsNotLocalDriver').prop('checked');
        var obj = {
            "type": getType == undefined ? "" : getType,
            "status": getStatus == undefined ? "" : getStatus,
            "dateOfAccident": getDateOfAccident == undefined ? "" : getDateOfAccident,
            "crashType": getCrashType == undefined ? "" : getCrashType,
            "provinceId": $("#cmbProvinceSearch").val() === "-1" ? "" : $("#cmbProvinceSearch").val(),
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
            "cityId": $("#cmbCity").val() === "-1" ? "" : $("#cmbCity").val(),
            "inNativeArea":"",
            "isHoliday": getIsHoliday == undefined || getIsHoliday == "All" ? "" : getIsHoliday,
            "collisionChild1": $('#cmbCollisionOfATwo').val() !== "تک وسیله ای" || $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
            "collisionChild2": $('#cmbCollisionOfATwo').val() !== "دو وسیله ای" || $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
            "axisId": "",
            "eventProcessId": $("#cmbEventTime").val() === "-1" || $("#cmbEventTime").val() === undefined ? "" : $("#cmbEventTime").val(),
            "startYear": getStartYear,
            "endYear": getEndYear,
            "isNotLocalDriver": chkIsNotLocalDriver
        }
        $('#spinSearchLoading').show();
        $.ajax({
            type: "POST",
            url: "EventProcess.aspx/GetSearchEventProcess",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg != null) {
                    if (msg.d[0].IsSuccess !== "true") {
                        $("#lblMessage").html(CreateModal(msg.d[0].Message));
                        $('#MessageModal').modal();
                    } else {
                        if ($('#crtEventProcess').length > 0) {
                            $('#crtEventProcess').html("");
                        }
                        //if (chartEventProcess && chartEventProcess != null)
                        //    chartEventProcess.destroy();
                        $('#hidFirst').val(msg.d[0].Message);
                        $('#hidRange').val(msg.d[0].MessageTwo);
                        $('#hidYear').val(msg.d[0].MessageThree);
                        if (msg.d[0].MessageThree != "") {
                            if (getType == "AccidentStatistics") EventProcessWithThree("فوتی", "جرحی", "خسارتی", '#CB644E', '#F59D2D', '#FFD461');
                            else if (getType == "SingleVehicle") EventProcessWithThree("تصادف با شی ثابت", "واژگونی و سقوط", "خروج از جاده", '#4A8987', '#8FB9AB', '#87DCDC');
                            else if (getType == "TypeRoad") EventProcessWithThree("روستایی", "فرعی","اصلی" , '#87DCDC', '#F08976', '#4A8987');
                            else if (getType == "CarriageWayDirection") EventProcessWithThree("یک‌طرفه",
                                "دو طرفه بدون جداکننده",
                                "دو طرفه با جداکننده فیزیکی",
                                '#4A8987',
                                '#F08976',
                                '#87DCDC');
                            else if (getType == "LightingStatus") EventProcessWithFive("روز",
                                "طلوع", "غروب", "شب با روشنایی کافی", "شب بدون روشنایی کافی", '#87DCDC', '#F59D2D', '#7E2028', '#FFD461', '#4A8987');
                            else if (getType == "TwoVehicle") EventProcessWithFive("زاویه‌ای",
                                "جلو به عقب",
                                "پهلو به پهلو خلاف جهت",
                                "پهلو به پهلو هم جهت","رخ به رخ",
                                 '#460D12', '#C22C38', '#F4C5C5', '#7E2028', '#AE666C');
                            else if (getType == "Collision") EventProcessWithSix("تک وسیله ای",
                                "دو وسیله ای",
                                "چند وسیله ای",
                                "وسیله نقلیه با موتورسیکلت",
                                "وسیله نقلیه با عابر",
                                "سایر",
                                '#4A8987', '#7E2028', '#CB644E', '#FFD461', '#5693BA', '#F59D2D');
                        }
                        ShowTitle();
                        //EventProcess(getType);
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
function toEnglishDigits(str) {
    // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
    var e = '۰'.charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function (t) {
        return t.charCodeAt(0) - e;
    });
    // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
    e = '٠'.charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function (t) {
        return t.charCodeAt(0) - e;
    });
    return str;
}
function ShowTitle() {
    var getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
    var getStartYear = "", getEndYear = "";
    var dt = new Date().toLocaleDateString('fa-IR').slice(0, 4);
    dt = parseInt(toEnglishDigits(dt));
    if (getDateOfAccident === "Date") {
        getStartYear = $("#txtStartYear").val();
        getEndYear = $("#txtEndYear").val();
    } else if (getDateOfAccident === "1Year") {
        getStartYear = dt;
        getEndYear = dt;
    }
    else if (getDateOfAccident === "2Year") {
        getStartYear = dt;
        getEndYear = dt - 1;
    }
    else if (getDateOfAccident === "3Year") {
        getStartYear = dt;
        getEndYear = dt - 2;
    }
    else if (getDateOfAccident === "5Year") {
        getStartYear = dt;
        getEndYear = dt - 4;
    }
    var getText = $("#spnChartEventTitle").html();
    let getEventTime = $("#cmbEventTime").val() !== "-1" && $("#cmbEventTime").val() !== null ? " بازه " + $("#cmbEventTime > option:selected").text() + " و " : "";
    $("#spnChartTitle").html("مقایسه شمار تصادفات بر اساس " + getText + " ثبت شده در  " + getEventTime + " سایر ایام سال از سال " + getEndYear + " تا " + getStartYear);
}