function sortChart(chart) {
    var sortDirection = chart.xAxis[0].reversed // true of false
    sortDirection = !sortDirection // flip sort direction
    var sortValue = chart.series[0].options.dataSorting.sortKey
    sortValue = (sortValue == "value") ? "name" : "value"; // flip sort value

    chart.update({
        xAxis: {
            reversed: sortDirection
        },
        series: [{
            options: {
                dataSorting: {
                    sortKey: sortValue
                }
            }
        }]
    });
}
function GetMaxIndex(arrSum) {
    return arrSum.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
}
var firstIndex, secondIndex, thirdIndex, fourthIndex, fifthIndex, sixthIndex, seventhIndex;
function GetMaxValue(newSeriesPoints, each, chart, index) {
    let arrSum = [];
    firstIndex = 0, secondIndex = 1, thirdIndex = 2, fourthIndex = 3, fifthIndex = 4, sixthIndex = 5, seventhIndex = 6;
    let firstSum = 0, secondSum = 0, thirdSum = 0, fourthSum = 0, fifthSum = 0, sixthSum = 0, seventhSum = 0;
    each(newSeriesPoints, function (s, index) {
        chart.series[index].data.forEach(function (point) {
            if (index == 0) firstSum += point.y;
            else if (index == 1) secondSum += point.y;
            else if (index == 2) thirdSum += point.y;
            else if (index == 3) fourthSum += point.y;
            else if (index == 4) fifthSum += point.y;
            else if (index == 5) sixthSum += point.y;
            else if (index == 6) seventhSum += point.y;
        });
    });
    arrSum = [firstSum, secondSum, thirdSum, fourthSum, fifthSum, sixthSum, seventhSum];
    if (index == 1) {
        firstIndex = 1;
        secondIndex = 0;
        thirdIndex = 2;
        fourthIndex = 3;
        fifthIndex = 4;
        sixthIndex = 5;
        seventhIndex = 6;
    }
    else if (index == 2) {
        firstIndex = 2;
        secondIndex = 0;
        thirdIndex = 1;
        fourthIndex = 3;
        fifthIndex = 4;
        sixthIndex = 5;
        seventhIndex = 6;
    }
    else if (index == 3) {
        firstIndex = 3;
        secondIndex = 0;
        thirdIndex = 1;
        fourthIndex = 2;
        fifthIndex = 4;
        sixthIndex = 5;
        seventhIndex = 6;
    }
    else if (index == 4) {
        firstIndex = 4;
        secondIndex = 0;
        thirdIndex = 1;
        fourthIndex = 2;
        fifthIndex = 3;
        sixthIndex = 5;
        seventhIndex = 6;
    }
    else if (index == 5) {
        firstIndex = 5;
        secondIndex = 0;
        thirdIndex = 1;
        fourthIndex = 2;
        fifthIndex = 3;
        sixthIndex = 4;
        seventhIndex = 6;
    }
    else if (index == 6) {
        firstIndex = 6;
        secondIndex = 0;
        thirdIndex = 1;
        fourthIndex = 2;
        fifthIndex = 3;
        sixthIndex = 4;
        seventhIndex = 5;
    }
    else if (index == -1) {
        let getMax = GetMaxIndex(arrSum);
        if (getMax == 0) {
            firstIndex = 0;
            secondIndex = 1;
            thirdIndex = 2;
            fourthIndex = 3;
            fifthIndex = 4;
            sixthIndex = 5;
            seventhIndex = 6;
        }
        else if (getMax == 1) {
            firstIndex = 1;
            secondIndex = 0;
            thirdIndex = 2;
            fourthIndex = 3;
            fifthIndex = 4;
            sixthIndex = 5;
            seventhIndex = 6;
        }
        else if (getMax == 2) {
            firstIndex = 2;
            secondIndex = 0;
            thirdIndex = 1;
            fourthIndex = 3;
            fifthIndex = 4;
            sixthIndex = 5;
            seventhIndex = 6;
        }
        else if (getMax == 3) {
            firstIndex = 3;
            secondIndex = 0;
            thirdIndex = 1;
            fourthIndex = 2;
            fifthIndex = 4;
            sixthIndex = 5;
            seventhIndex = 6;
        }
        else if (getMax == 4) {
            firstIndex = 4;
            secondIndex = 0;
            thirdIndex = 1;
            fourthIndex = 2;
            fifthIndex = 3;
            sixthIndex = 5;
            seventhIndex = 6;
        }
        else if (getMax == 5) {
            firstIndex = 5;
            secondIndex = 0;
            thirdIndex = 1;
            fourthIndex = 2;
            fifthIndex = 3;
            sixthIndex = 4;
            seventhIndex = 6;
        }
        else if (getMax == 6) {
            firstIndex = 6;
            secondIndex = 0;
            thirdIndex = 1;
            fourthIndex = 2;
            fifthIndex = 3;
            sixthIndex = 5;
            seventhIndex = 4;
        }
    }
}

//Filter1
function Filter1ChartBar(newSeriesPoints, each, chart) {
    newSeriesPoints[0].sort(function (a, b) {
        return b.y - a.y;
    });
    each(newSeriesPoints[0], function (pointS1, index) {
        pointS1.x = index;
    });
    each(newSeriesPoints, function (s, index) {
        chart.series[index].setData(newSeriesPoints[index], true, false, false);
    });
}
//Filter2
function Filter2ChartBar(newSeriesPoints, each, chart, index, sortTitle) {
    GetMaxValue(newSeriesPoints, each, chart, index);
    newSeriesPoints[firstIndex].sort(function (a, b) {
        return b.y - a.y;
    });
    each(newSeriesPoints[firstIndex], function (pointS1, index) {
        pointS1.x = index;
        each(newSeriesPoints[secondIndex], function (pointS2, i) {
            if (pointS1.name === pointS2.name) {
                pointS2.x = pointS1.x;
            }
        });
    });
    each(newSeriesPoints, function (s, index) {
        chart.series[index].setData(newSeriesPoints[index], true, false, false);
    });
    if (index == -1) {
        chart.series[firstIndex].show();
        chart.series[secondIndex].show();
    } else {
        chart.series[firstIndex].show("slow");
        chart.series[secondIndex].hide();
    }
    $("#spnSortTitle").html(sortTitle);
}
//Filter3
function Filter3ChartBar(newSeriesPoints, each, chart, index, sortTitle) {
    GetMaxValue(newSeriesPoints, each, chart, index);
    newSeriesPoints[firstIndex].sort(function (a, b) {
        return b.y - a.y;
    });
    each(newSeriesPoints[firstIndex], function (pointS1, index) {
        pointS1.x = index;
        each(newSeriesPoints[secondIndex], function (pointS2, i) {
            if (pointS1.name === pointS2.name) {
                pointS2.x = pointS1.x;
            }
        });
        each(newSeriesPoints[thirdIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
    });
    each(newSeriesPoints, function (s, index) {
        chart.series[index].setData(newSeriesPoints[index], true, false, false);
    });
    if (index == -1) {
        chart.series[firstIndex].show();
        chart.series[secondIndex].show();
        chart.series[thirdIndex].show();
    } else {
        chart.series[firstIndex].show("slow");
        chart.series[secondIndex].hide();
        chart.series[thirdIndex].hide();
    }
    $("#spnSortTitle").html(sortTitle);
}
//Filter4
function Filter4ChartBar(newSeriesPoints, each, chart, index, sortTitle) {
    GetMaxValue(newSeriesPoints, each, chart, index);
    newSeriesPoints[firstIndex].sort(function (a, b) {
        return b.y - a.y;
    });
    each(newSeriesPoints[firstIndex], function (pointS1, index) {
        pointS1.x = index;
        each(newSeriesPoints[secondIndex], function (pointS2, i) {
            if (pointS1.name === pointS2.name) {
                pointS2.x = pointS1.x;
            }
        });
        each(newSeriesPoints[thirdIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
        each(newSeriesPoints[fourthIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
    });
    
    each(newSeriesPoints, function (s, index) {
        chart.series[index].setData(newSeriesPoints[index], true, false, false);
    });
    if (index == -1) {
        chart.series[firstIndex].show();
        chart.series[secondIndex].show();
        chart.series[thirdIndex].show();
        chart.series[fourthIndex].show();
    } else {
        chart.series[firstIndex].show("slow");
        chart.series[secondIndex].hide();
        chart.series[thirdIndex].hide();
        chart.series[fourthIndex].hide();
    }
    $("#spnSortTitle").html(sortTitle);
}
//Filter5
function Filter5ChartBar(newSeriesPoints, each, chart, index, sortTitle) {
    GetMaxValue(newSeriesPoints, each, chart, index);
    newSeriesPoints[firstIndex].sort(function (a, b) {
        return b.y - a.y;
    });
    newSeriesPoints[secondIndex].sort(function (a, b) {
        return b.y - a.y;
    });
    newSeriesPoints[thirdIndex].sort(function (a, b) {
        return b.y - a.y;
    });
    newSeriesPoints[fourthIndex].sort(function (a, b) {
        return b.y - a.y;
    });
    newSeriesPoints[fifthIndex].sort(function (a, b) {
        return b.y - a.y;
    });
    each(newSeriesPoints[firstIndex], function (pointS1, index) {
        pointS1.x = index;
        each(newSeriesPoints[secondIndex], function (pointS2, i) {
            if (pointS1.name === pointS2.name) {
                pointS2.x = pointS1.x;
            }
        });
        each(newSeriesPoints[thirdIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
        each(newSeriesPoints[fourthIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
        each(newSeriesPoints[fifthIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
    });
    each(newSeriesPoints, function (s, index) {
        chart.series[index].update({
            series: [{
                dataSorting: {
                    enabled: true
                }
            }]
        }, false);
        chart.series[index].setData(newSeriesPoints[index], true, false, false);
    });
    if (index == -1) {
        chart.series[firstIndex].show();
        chart.series[secondIndex].show();
        chart.series[thirdIndex].show();
        chart.series[fourthIndex].show();
        chart.series[fifthIndex].show();
    } else {
        chart.series[firstIndex].show("slow");
        chart.series[secondIndex].hide();
        chart.series[thirdIndex].hide();
        chart.series[fourthIndex].hide();
        chart.series[fifthIndex].hide();
    }
    $("#spnSortTitle").html(sortTitle);
}
//Filter6
function Filter6ChartBar(newSeriesPoints, each, chart, index, sortTitle) {
    GetMaxValue(newSeriesPoints, each, chart, index);
    newSeriesPoints[firstIndex].sort(function (a, b) {
        return b.y - a.y;
    });
    each(newSeriesPoints[firstIndex], function (pointS1, index) {
        pointS1.x = index;
        each(newSeriesPoints[secondIndex], function (pointS2, i) {
            if (pointS1.name === pointS2.name) {
                pointS2.x = pointS1.x;
            }
        });
        each(newSeriesPoints[thirdIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
        each(newSeriesPoints[fourthIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
        each(newSeriesPoints[fifthIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
        each(newSeriesPoints[sixthIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
    });
    each(newSeriesPoints, function (s, index) {
        chart.series[index].setData(newSeriesPoints[index], true, false, false);
    });
    if (index == -1) {
        chart.series[firstIndex].show();
        chart.series[secondIndex].show();
        chart.series[thirdIndex].show();
        chart.series[fourthIndex].show();
        chart.series[fifthIndex].show();
        chart.series[sixthIndex].show();
    } else {
        chart.series[firstIndex].show();
        chart.series[secondIndex].hide();
        chart.series[thirdIndex].hide();
        chart.series[fourthIndex].hide();
        chart.series[fifthIndex].hide();
        chart.series[sixthIndex].hide();
    }
    $("#spnSortTitle").html(sortTitle);
}
//Filter7
function Filter7ChartBar(newSeriesPoints, each, chart, index, sortTitle) {
    GetMaxValue(newSeriesPoints, each, chart, index);    
    newSeriesPoints[firstIndex].sort(function (a, b) {
        return b.y - a.y;
    });
    each(newSeriesPoints[firstIndex], function (pointS1, index) {
        pointS1.x = index;
        each(newSeriesPoints[secondIndex], function (pointS2, i) {
            if (pointS1.name === pointS2.name) {
                pointS2.x = pointS1.x;
            }
        });
        each(newSeriesPoints[thirdIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
        each(newSeriesPoints[fourthIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
        each(newSeriesPoints[fifthIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
        each(newSeriesPoints[sixthIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
        each(newSeriesPoints[seventhIndex], function (pointS3, i) {
            if (pointS1.name === pointS3.name) {
                pointS3.x = pointS1.x;
            }
        });
    });
    
    each(newSeriesPoints, function (s, index) {
        chart.series[index].setData(newSeriesPoints[index], true, false, false);
    });
    if (index == -1) {
        chart.series[firstIndex].show();
        chart.series[secondIndex].show();
        chart.series[thirdIndex].show();
        chart.series[fourthIndex].show();
        chart.series[fifthIndex].show();
        chart.series[sixthIndex].show();
        chart.series[seventhIndex].show();
    } else {
        chart.series[firstIndex].show();
        chart.series[secondIndex].hide();
        chart.series[thirdIndex].hide();
        chart.series[fourthIndex].hide();
        chart.series[fifthIndex].hide();
        chart.series[sixthIndex].hide();
        chart.series[seventhIndex].hide();
    }
    $("#spnSortTitle").html(sortTitle);
}
