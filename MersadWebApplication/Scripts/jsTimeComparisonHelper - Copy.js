var chartTimeComparison;
function CheckThanZero(str) {
    var patt = new RegExp("[1-9]");
    return patt.test(str); // true
}
function TimeComparison(getType) {
    let spltGeometry = $('#hidFBcTheGeometry').val().split("#");
    let arrayPushedYear = [];
    let cat = [];
    let season = $("#cmbSeason").val();
    let month = $("#cmbSelectMonth").val();
    let arraySeasonOrMonth = [];
    let arrayPushed = [];
    let pointType = "", pointTypeMonth = "";
    //First
    var arrayFirst = [];
    var getFirstYear = spltGeometry[5].split(",")[4];
    //const twoGreaterThanZero = arr => arr.filter(x => x > 0).length >= 1;
    if (spltGeometry[5] !== "") {
        let getFirstYearMonth = spltGeometry[4].split(IsSeparateWithOr(getType) ? "|" : ",");
        let farvardin1, ordibehesht1, khordad1, tir1, mordad1, shahrivar1, mehr1, aban1, azar1, day1, bahman1, esfand1;
        let getTotalFirstYear;
        if (getFirstYear != "0") {
            if (IsSeparateWithOr(getType)) {
                let fr1 = parseFloat(getFirstYearMonth[0].split("&")[0]);
                let fr2 = parseFloat(getFirstYearMonth[0].split("&")[1]);
                farvardin1 = fr1 < 1 ? 0 : fr1 * 100 / fr2;
                let or1 = parseFloat(getFirstYearMonth[1].split("&")[0]);
                let or2 = parseFloat(getFirstYearMonth[1].split("&")[1]);
                ordibehesht1 = or1 < 1 ? 0 : or1 * 100 / or2;
                let kr1 = parseFloat(getFirstYearMonth[2].split("&")[0]);
                let kr2 = parseFloat(getFirstYearMonth[2].split("&")[1]);
                khordad1 = kr1 < 1 ? 0 : kr1 * 100 / kr2;
                let tr1 = parseFloat(getFirstYearMonth[3].split("&")[0]);
                let tr2 = parseFloat(getFirstYearMonth[3].split("&")[1]);
                tir1 = tr1 < 1 ? 0 : tr1 * 100 / tr2;
                let mo1 = parseFloat(getFirstYearMonth[4].split("&")[0]);
                let mo2 = parseFloat(getFirstYearMonth[4].split("&")[1]);
                mordad1 = mo1 < 1 ? 0 : mo1 * 100 / mo2;
                let shah1 = parseFloat(getFirstYearMonth[5].split("&")[0]);
                let shah2 = parseFloat(getFirstYearMonth[5].split("&")[1]);
                shahrivar1 = shah1 < 1 ? 0 : shah1 * 100 / shah2;
                let mhr1 = parseFloat(getFirstYearMonth[6].split("&")[0]);
                let mhr2 = parseFloat(getFirstYearMonth[6].split("&")[1]);
                mehr1 = mhr1 < 1 ? 0 : mhr1 * 100 / mhr2;
                let abn1 = parseFloat(getFirstYearMonth[7].split("&")[0]);
                let abn2 = parseFloat(getFirstYearMonth[7].split("&")[1]);
                aban1 = abn1 < 1 ? 0 : abn1 * 100 / abn2;
                let azr1 = parseFloat(getFirstYearMonth[8].split("&")[0]);
                let azr2 = parseFloat(getFirstYearMonth[8].split("&")[1]);
                azar1 = azr1 < 1 ? 0 : azr1 * 100 / azr2;
                let dy1 = parseFloat(getFirstYearMonth[9].split("&")[0]);
                let dy2 = parseFloat(getFirstYearMonth[9].split("&")[1]);
                day1 = dy1 < 1 ? 0 : dy1 * 100 / dy2;
                let bh1 = parseFloat(getFirstYearMonth[10].split("&")[0]);
                let bh2 = parseFloat(getFirstYearMonth[10].split("&")[1]);
                bahman1 = bh1 < 1 ? 0 : bh1 * 100 / bh2;
                let esf1 = parseFloat(getFirstYearMonth[11].split("&")[0]);
                let esf2 = parseFloat(getFirstYearMonth[11].split("&")[1]);
                esfand1 = esf1 < 1 ? 0 : esf1 * 100 / esf2;
                let allMonthVal = fr1 + or1 + kr1 + tr1 + mo1 + shah1 + mhr1 + abn1 + azr1 + dy1 + bh1 + esf1;
                let allMonthValAll = fr2 + or2 + kr2 + tr2 + mo2 + shah2 + mhr2 + abn2 + azr2 + dy2 + bh2 + esf2;
                getTotalFirstYear = allMonthVal < 1 ? 0 : allMonthVal * 100 / allMonthValAll;
            } else {
                farvardin1 = parseFloat(getFirstYearMonth[0]);
                ordibehesht1 = parseFloat(getFirstYearMonth[1]);
                khordad1 = parseFloat(getFirstYearMonth[2]);
                tir1 = parseFloat(getFirstYearMonth[3]);
                mordad1 = parseFloat(getFirstYearMonth[4]);
                shahrivar1 = parseFloat(getFirstYearMonth[5]);
                mehr1 = parseFloat(getFirstYearMonth[6]);
                aban1 = parseFloat(getFirstYearMonth[7]);
                azar1 = parseFloat(getFirstYearMonth[8]);
                day1 = parseFloat(getFirstYearMonth[9]);
                bahman1 = parseFloat(getFirstYearMonth[10]);
                esfand1 = parseFloat(getFirstYearMonth[11]);
                getTotalFirstYear = farvardin1 + ordibehesht1 + khordad1 + tir1 + mordad1 + shahrivar1 + mehr1 + aban1 + azar1 + day1 + bahman1 + esfand1;
            }

            arrayFirst = [{ "name": "فروردین", "y": farvardin1 }, { "name": "اردیبهشت", "y": ordibehesht1, "year": getFirstYear }, { "name": "خرداد", "y": khordad1, "year": getFirstYear }, { "name": "تیر", "y": tir1, "year": getFirstYear }, { "name": "مرداد", "y": mordad1, "year": getFirstYear }, { "name": "شهریور", "y": shahrivar1, "year": getFirstYear }, { "name": "مهر", "y": mehr1, "year": getFirstYear }, { "name": "آبان", "y": aban1, "year": getFirstYear }, { "name": "آذر", "y": azar1, "year": getFirstYear }, { "name": "دی", "y": day1, "year": getFirstYear }, { "name": "بهمن", "y": bahman1, "year": getFirstYear }, { "name": "اسفند", "y": esfand1, "year": getFirstYear }];

            arrayPushedYear = arrayPushedYear.concat([{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": getTotalFirstYear, "year": getFirstYear }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }]);
            //arrayPushedYear = [{ "name": getFirstYear, "y": getTotalFirstYear }];
            cat = [{ name: getFirstYear, categories: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"] }];
            arraySeasonOrMonth = GetArrayByMonth(season, month, farvardin1, ordibehesht1, khordad1, tir1, mordad1, shahrivar1, mehr1, aban1, azar1, day1, bahman1, esfand1);
            document.getElementById("crtTimeComparison").style.width = "1070px";
        }

        //Second
        var arraySecond = [];
        var getSecondYear = spltGeometry[5].split(",")[3];
        var getSecondYearMonth = spltGeometry[3].split(IsSeparateWithOr(getType) ? "|" : ",");
        if (getSecondYear != "0" && getSecondYearMonth != "-1") {
            var farvardin2, ordibehesht2, khordad2, tir2, mordad2, shahrivar2, mehr2, aban2, azar2, day2, bahman2, esfand2;
            let getTotalSecondYear;
            if (IsSeparateWithOr(getType)) {
                let fr12 = parseFloat(getSecondYearMonth[0].split("&")[0]);
                let fr22 = parseFloat(getSecondYearMonth[0].split("&")[1]);
                farvardin2 = fr12 < 1 ? 0 : fr12 * 100 / fr22;
                let or12 = parseFloat(getSecondYearMonth[1].split("&")[0]);
                let or22 = parseFloat(getSecondYearMonth[1].split("&")[1]);
                ordibehesht2 = or12 < 1 ? 0 : or12 * 100 / or22;
                let kr12 = parseFloat(getSecondYearMonth[2].split("&")[0]);
                let kr22 = parseFloat(getSecondYearMonth[2].split("&")[1]);
                khordad2 = kr12 < 1 ? 0 : kr12 * 100 / kr22;
                let tr12 = parseFloat(getSecondYearMonth[3].split("&")[0]);
                let tr22 = parseFloat(getSecondYearMonth[3].split("&")[1]);
                tir2 = tr12 < 1 ? 0 : tr12 * 100 / tr22;
                let mo12 = parseFloat(getSecondYearMonth[4].split("&")[0]);
                let mo22 = parseFloat(getSecondYearMonth[4].split("&")[1]);
                mordad2 = mo12 < 1 ? 0 : mo12 * 100 / mo22;
                let shah12 = parseFloat(getSecondYearMonth[5].split("&")[0]);
                let shah22 = parseFloat(getSecondYearMonth[5].split("&")[1]);
                shahrivar2 = shah12 < 1 ? 0 : shah12 * 100 / shah22;
                let mhr12 = parseFloat(getSecondYearMonth[6].split("&")[0]);
                let mhr22 = parseFloat(getSecondYearMonth[6].split("&")[1]);
                mehr2 = mhr12 < 1 ? 0 : mhr12 * 100 / mhr22;
                let abn12 = parseFloat(getSecondYearMonth[7].split("&")[0]);
                let abn22 = parseFloat(getSecondYearMonth[7].split("&")[1]);
                aban2 = abn12 < 1 ? 0 : abn12 * 100 / abn22;
                let azr12 = parseFloat(getSecondYearMonth[8].split("&")[0]);
                let azr22 = parseFloat(getSecondYearMonth[8].split("&")[1]);
                azar2 = azr12 < 1 ? 0 : azr12 * 100 / azr22;
                let dy12 = parseFloat(getSecondYearMonth[9].split("&")[0]);
                let dy22 = parseFloat(getSecondYearMonth[9].split("&")[1]);
                day2 = dy12 < 1 ? 0 : dy12 * 100 / dy22;
                let bh12 = parseFloat(getSecondYearMonth[10].split("&")[0]);
                let bh22 = parseFloat(getSecondYearMonth[10].split("&")[1]);
                bahman2 = bh12 < 1 ? 0 : bh12 * 100 / bh22;
                let esf12 = parseFloat(getSecondYearMonth[11].split("&")[0]);
                let esf22 = parseFloat(getSecondYearMonth[11].split("&")[1]);
                esfand2 = esf12 < 1 ? 0 : esf12 * 100 / esf22;
                let allMonthVal = fr12 + or12 + kr12 + tr12 + mo12 + shah12 + mhr12 + abn12 + azr12 + dy12 + bh12 + esf12;
                let allMonthValAll = fr22 + or22 + kr22 + tr22 + mo22 + shah22 + mhr22 + abn22 + azr22 + dy22 + bh22 + esf22;
                getTotalSecondYear = allMonthVal < 1 ? 0 : allMonthVal * 100 / allMonthValAll;
            } else {
                farvardin2 = parseFloat(getSecondYearMonth[0]);
                ordibehesht2 = parseFloat(getSecondYearMonth[1]);
                khordad2 = parseFloat(getSecondYearMonth[2]);
                tir2 = parseFloat(getSecondYearMonth[3]);
                mordad2 = parseFloat(getSecondYearMonth[4]);
                shahrivar2 = parseFloat(getSecondYearMonth[5]);
                mehr2 = parseFloat(getSecondYearMonth[6]);
                aban2 = parseFloat(getSecondYearMonth[7]);
                azar2 = parseFloat(getSecondYearMonth[8]);
                day2 = parseFloat(getSecondYearMonth[9]);
                bahman2 = parseFloat(getSecondYearMonth[10]);
                esfand2 = parseFloat(getSecondYearMonth[11]);
                getTotalSecondYear = farvardin2 + ordibehesht2 + khordad2 + tir2 + mordad2 + shahrivar2 + mehr2 + aban2 + azar2 + day2 + bahman2 + esfand2;
            }

            arraySecond = [{ "name": "فروردین", "y": farvardin2 }, { "name": "اردیبهشت", "y": ordibehesht2 }, { "name": "خرداد", "y": khordad2 }, { "name": "تیر", "y": tir2 }, { "name": "مرداد", "y": mordad2 }, { "name": "شهریور", "y": shahrivar2 }, { "name": "مهر", "y": mehr2 }, { "name": "آبان", "y": aban2 }, { "name": "آذر", "y": azar2 }, { "name": "دی", "y": day2 }, { "name": "بهمن", "y": bahman2 }, { "name": "اسفند", "y": esfand2 }];
            arrayPushedYear = arrayPushedYear.concat([{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": getTotalSecondYear, "year": getSecondYear }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }]);
            cat = cat.concat([{ name: getSecondYear, categories: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"] }]);
            var arrSeasonOrMonth2 = GetArrayByMonth(season, month, farvardin2, ordibehesht2, khordad2, tir2, mordad2, shahrivar2, mehr2, aban2, azar2, day2, bahman2, esfand2);
            arraySeasonOrMonth = arrSeasonOrMonth2.length > 0 ? arraySeasonOrMonth.concat(arrSeasonOrMonth2) : arraySeasonOrMonth;
            document.getElementById("crtTimeComparison").style.width = "1070px";
        }
        //Third
        var arrayThird = [];
        var getThirdYear = spltGeometry[5].split(",")[2];
        var getThirdYearMonth = spltGeometry[2].split(IsSeparateWithOr(getType) ? "|" : ",");
        if (getThirdYear != "0" && getThirdYearMonth != "-1") {
            var farvardin3, ordibehesht3, khordad3, tir3, mordad3, shahrivar3, mehr3, aban3, azar3, day3, bahman3, esfand3;
            let getTotalThirdYear;
            if (IsSeparateWithOr(getType)) {
                let fr13 = parseFloat(getThirdYearMonth[0].split("&")[0]);
                let fr23 = parseFloat(getThirdYearMonth[0].split("&")[1]);
                farvardin3 = fr13 < 1 ? 0 : fr13 * 100 / fr23;
                let or13 = parseFloat(getThirdYearMonth[1].split("&")[0]);
                let or23 = parseFloat(getThirdYearMonth[1].split("&")[1]);
                ordibehesht3 = or13 < 1 ? 0 : or13 * 100 / or23;
                let kr13 = parseFloat(getThirdYearMonth[2].split("&")[0]);
                let kr23 = parseFloat(getThirdYearMonth[2].split("&")[1]);
                khordad3 = kr13 < 1 ? 0 : kr13 * 100 / kr23;
                let tr13 = parseFloat(getThirdYearMonth[3].split("&")[0]);
                let tr23 = parseFloat(getThirdYearMonth[3].split("&")[1]);
                tir3 = tr13 < 1 ? 0 : tr13 * 100 / tr23;
                let mo13 = parseFloat(getThirdYearMonth[4].split("&")[0]);
                let mo23 = parseFloat(getThirdYearMonth[4].split("&")[1]);
                mordad3 = mo13 < 1 ? 0 : mo13 * 100 / mo23;
                let shah13 = parseFloat(getThirdYearMonth[5].split("&")[0]);
                let shah23 = parseFloat(getThirdYearMonth[5].split("&")[1]);
                shahrivar3 = shah13 < 1 ? 0 : shah13 * 100 / shah23;
                let mhr13 = parseFloat(getThirdYearMonth[6].split("&")[0]);
                let mhr23 = parseFloat(getThirdYearMonth[6].split("&")[1]);
                mehr3 = mhr13 < 1 ? 0 : mhr13 * 100 / mhr23;
                let abn13 = parseFloat(getThirdYearMonth[7].split("&")[0]);
                let abn23 = parseFloat(getThirdYearMonth[7].split("&")[1]);
                aban3 = abn13 < 1 ? 0 : abn13 * 100 / abn23;
                let azr13 = parseFloat(getThirdYearMonth[8].split("&")[0]);
                let azr23 = parseFloat(getThirdYearMonth[8].split("&")[1]);
                azar3 = azr13 < 1 ? 0 : azr13 * 100 / azr23;
                let dy13 = parseFloat(getThirdYearMonth[9].split("&")[0]);
                let dy23 = parseFloat(getThirdYearMonth[9].split("&")[1]);
                day3 = dy13 < 1 ? 0 : dy13 * 100 / dy23;
                let bh13 = parseFloat(getThirdYearMonth[10].split("&")[0]);
                let bh23 = parseFloat(getThirdYearMonth[10].split("&")[1]);
                bahman3 = bh13 < 1 ? 0 : bh13 * 100 / bh23;
                let esf13 = parseFloat(getThirdYearMonth[11].split("&")[0]);
                let esf23 = parseFloat(getThirdYearMonth[11].split("&")[1]);
                esfand3 = esf13 < 1 ? 0 : esf13 * 100 / esf23;
                let allMonthVal = fr13 + or13 + kr13 + tr13 + mo13 + shah13 + mhr13 + abn13 + azr13 + dy13 + bh13 + esf13;
                let allMonthValAll = fr23 + or23 + kr23 + tr23 + mo23 + shah23 + mhr23 + abn23 + azr23 + dy23 + bh23 + esf23;
                getTotalThirdYear = allMonthVal < 1 ? 0 : allMonthVal * 100 / allMonthValAll;
            } else {
                farvardin3 = parseFloat(getThirdYearMonth[0]);
                ordibehesht3 = parseFloat(getThirdYearMonth[1]);
                khordad3 = parseFloat(getThirdYearMonth[2]);
                tir3 = parseFloat(getThirdYearMonth[3]);
                mordad3 = parseFloat(getThirdYearMonth[4]);
                shahrivar3 = parseFloat(getThirdYearMonth[5]);
                mehr3 = parseFloat(getThirdYearMonth[6]);
                aban3 = parseFloat(getThirdYearMonth[7]);
                azar3 = parseFloat(getThirdYearMonth[8]);
                day3 = parseFloat(getThirdYearMonth[9]);
                bahman3 = parseFloat(getThirdYearMonth[10]);
                esfand3 = parseFloat(getThirdYearMonth[11]);
                getTotalThirdYear = farvardin3 + ordibehesht3 + khordad3 + tir3 + mordad3 + shahrivar3 + mehr3 + aban3 + azar3 + day3 + bahman3 + esfand3;
            }
            arrayThird = [{ "name": "فروردین", "y": farvardin3 }, { "name": "اردیبهشت", "y": ordibehesht3 }, { "name": "خرداد", "y": khordad3 }, { "name": "تیر", "y": tir3 }, { "name": "مرداد", "y": mordad3 }, { "name": "شهریور", "y": shahrivar3 }, { "name": "مهر", "y": mehr3 }, { "name": "آبان", "y": aban3 }, { "name": "آذر", "y": azar3 }, { "name": "دی", "y": day3 }, { "name": "بهمن", "y": bahman3 }, { "name": "اسفند", "y": esfand3 }];
            arrayPushedYear = arrayPushedYear.concat([{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": getTotalThirdYear, "year": getThirdYear }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }]);
            cat = cat.concat([{ name: getThirdYear, categories: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"] }]);
            arraySeasonOrMonth = arraySeasonOrMonth.concat(GetArrayByMonth(season, month, farvardin3, ordibehesht3, khordad3, tir3, mordad3, shahrivar3, mehr3, aban3, azar3, day3, bahman3, esfand3));
            document.getElementById("crtTimeComparison").style.width = "1300px";
        }
        //Fourth
        var arrayFourth = [];
        var getFourthYear = spltGeometry[5].split(",")[1];
        var getFourthYearMonth = spltGeometry[1].split(IsSeparateWithOr(getType) ? "|" : ",");
        if (getFourthYear != "0" && getFourthYearMonth != "-1") {
            var farvardin4, ordibehesht4, khordad4, tir4, mordad4, shahrivar4, mehr4, aban4, azar4, day4, bahman4, esfand4;
            let getTotalFourthYear;
            if (IsSeparateWithOr(getType)) {
                let fr14 = parseFloat(getFourthYearMonth[0].split("&")[0]);
                let fr24 = parseFloat(getFourthYearMonth[0].split("&")[1]);
                farvardin4 = fr14 < 1 ? 0 : fr14 * 100 / fr24;
                let or14 = parseFloat(getFourthYearMonth[1].split("&")[0]);
                let or24 = parseFloat(getFourthYearMonth[1].split("&")[1]);
                ordibehesht4 = or14 < 1 ? 0 : or14 * 100 / or24;
                let kr14 = parseFloat(getFourthYearMonth[2].split("&")[0]);
                let kr24 = parseFloat(getFourthYearMonth[2].split("&")[1]);
                khordad4 = kr14 < 1 ? 0 : kr14 * 100 / kr24;
                let tr14 = parseFloat(getFourthYearMonth[3].split("&")[0]);
                let tr24 = parseFloat(getFourthYearMonth[3].split("&")[1]);
                tir4 = tr14 < 1 ? 0 : tr14 * 100 / tr24;
                let mo14 = parseFloat(getFourthYearMonth[4].split("&")[0]);
                let mo24 = parseFloat(getFourthYearMonth[4].split("&")[1]);
                mordad4 = mo14 < 1 ? 0 : mo14 * 100 / mo24;
                let shah14 = parseFloat(getFourthYearMonth[5].split("&")[0]);
                let shah24 = parseFloat(getFourthYearMonth[5].split("&")[1]);
                shahrivar4 = shah14 < 1 ? 0 : shah14 * 100 / shah24;
                let mhr14 = parseFloat(getFourthYearMonth[6].split("&")[0]);
                let mhr24 = parseFloat(getFourthYearMonth[6].split("&")[1]);
                mehr4 = mhr14 < 1 ? 0 : mhr14 * 100 / mhr24;
                let abn14 = parseFloat(getFourthYearMonth[7].split("&")[0]);
                let abn24 = parseFloat(getFourthYearMonth[7].split("&")[1]);
                aban4 = abn14 < 1 ? 0 : abn14 * 100 / abn24;
                let azr14 = parseFloat(getFourthYearMonth[8].split("&")[0]);
                let azr24 = parseFloat(getFourthYearMonth[8].split("&")[1]);
                azar4 = azr14 < 1 ? 0 : azr14 * 100 / azr24;
                let dy14 = parseFloat(getFourthYearMonth[9].split("&")[0]);
                let dy24 = parseFloat(getFourthYearMonth[9].split("&")[1]);
                day4 = dy14 < 1 ? 0 : dy14 * 100 / dy24;
                let bh14 = parseFloat(getFourthYearMonth[10].split("&")[0]);
                let bh24 = parseFloat(getFourthYearMonth[10].split("&")[1]);
                bahman4 = bh14 < 1 ? 0 : bh14 * 100 / bh24;
                let esf14 = parseFloat(getFourthYearMonth[11].split("&")[0]);
                let esf24 = parseFloat(getFourthYearMonth[11].split("&")[1]);
                esfand4 = esf14 < 1 ? 0 : esf14 * 100 / esf24;
                let allMonthVal = fr14 + or14 + kr14 + tr14 + mo14 + shah14 + mhr14 + abn14 + azr14 + dy14 + bh14 + esf14;
                let allMonthValAll = fr24 + or24 + kr24 + tr24 + mo24 + shah24 + mhr24 + abn24 + azr24 + dy24 + bh24 + esf24;
                getTotalFourthYear = allMonthVal < 1 ? 0 : allMonthVal * 100 / allMonthValAll;
            } else {
                farvardin4 = parseFloat(getFourthYearMonth[0]);
                ordibehesht4 = parseFloat(getFourthYearMonth[1]);
                khordad4 = parseFloat(getFourthYearMonth[2]);
                tir4 = parseFloat(getFourthYearMonth[3]);
                mordad4 = parseFloat(getFourthYearMonth[4]);
                shahrivar4 = parseFloat(getFourthYearMonth[5]);
                mehr4 = parseFloat(getFourthYearMonth[6]);
                aban4 = parseFloat(getFourthYearMonth[7]);
                azar4 = parseFloat(getFourthYearMonth[8]);
                day4 = parseFloat(getFourthYearMonth[9]);
                bahman4 = parseFloat(getFourthYearMonth[10]);
                esfand4 = parseFloat(getFourthYearMonth[11]);
                getTotalFourthYear = farvardin4 + ordibehesht4 + khordad4 + tir4 + mordad4 + shahrivar4 + mehr4 + aban4 + azar4 + day4 + bahman4 + esfand4;
            }
            arrayFourth = [{ "name": "فروردین", "y": farvardin4 }, { "name": "اردیبهشت", "y": ordibehesht4 }, { "name": "خرداد", "y": khordad4 }, { "name": "تیر", "y": tir4 }, { "name": "مرداد", "y": mordad4 }, { "name": "شهریور", "y": shahrivar4 }, { "name": "مهر", "y": mehr4 }, { "name": "آبان", "y": aban4 }, { "name": "آذر", "y": azar4 }, { "name": "دی", "y": day4 }, { "name": "بهمن", "y": bahman4 }, { "name": "اسفند", "y": esfand4 }];
            //arrayPushedYear = arrayPushedYear.concat([{ "name": getFourthYear, "y": getTotalFourthYear }]);
            arrayPushedYear = arrayPushedYear.concat([{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": getTotalFourthYear, "year": getFourthYear }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }]);
            cat = cat.concat([{ name: getFourthYear, categories: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"] }]);
            arraySeasonOrMonth = arraySeasonOrMonth.concat(GetArrayByMonth(season, month, farvardin4, ordibehesht4, khordad4, tir4, mordad4, shahrivar4, mehr4, aban4, azar4, day4, bahman4, esfand4));
            document.getElementById("crtTimeComparison").style.width = "1400px";
        }
        //Fifth
        let arrayFifth = [];
        let getFifthYear = spltGeometry[5].split(",")[0];
        let getFifthYearMonth = spltGeometry[0].split(IsSeparateWithOr(getType) ? "|" : ",");
        if (getFifthYear != "0" && getFifthYearMonth != "-1") {
            let farvardin5, ordibehesht5, khordad5, tir5, mordad5, shahrivar5, mehr5, aban5, azar5, day5, bahman5, esfand5;
            let getTotalFifthYear;
            if (IsSeparateWithOr(getType)) {
                let fr15 = parseFloat(getFifthYearMonth[0].split("&")[0]);
                let fr25 = parseFloat(getFifthYearMonth[0].split("&")[1]);
                farvardin5 = fr15 < 1 ? 0 : fr15 * 100 / fr25;
                let or15 = parseFloat(getFifthYearMonth[1].split("&")[0]);
                let or25 = parseFloat(getFifthYearMonth[1].split("&")[1]);
                ordibehesht5 = or15 < 1 ? 0 : or15 * 100 / or25;
                let kr15 = parseFloat(getFifthYearMonth[2].split("&")[0]);
                let kr25 = parseFloat(getFifthYearMonth[2].split("&")[1]);
                khordad5 = kr15 < 1 ? 0 : kr15 * 100 / kr25;
                let tr15 = parseFloat(getFifthYearMonth[3].split("&")[0]);
                let tr25 = parseFloat(getFifthYearMonth[3].split("&")[1]);
                tir5 = tr15 < 1 ? 0 : tr15 * 100 / tr25;
                let mo15 = parseFloat(getFifthYearMonth[4].split("&")[0]);
                let mo25 = parseFloat(getFifthYearMonth[4].split("&")[1]);
                mordad5 = mo15 < 1 ? 0 : mo15 * 100 / mo25;
                let shah15 = parseFloat(getFifthYearMonth[5].split("&")[0]);
                let shah25 = parseFloat(getFifthYearMonth[5].split("&")[1]);
                shahrivar5 = shah15 < 1 ? 0 : shah15 * 100 / shah25;
                let mhr15 = parseFloat(getFifthYearMonth[6].split("&")[0]);
                let mhr25 = parseFloat(getFifthYearMonth[6].split("&")[1]);
                mehr5 = mhr15 < 1 ? 0 : mhr15 * 100 / mhr25;
                let abn15 = parseFloat(getFifthYearMonth[7].split("&")[0]);
                let abn25 = parseFloat(getFifthYearMonth[7].split("&")[1]);
                aban5 = abn15 < 1 ? 0 : abn15 * 100 / abn25;
                let azr15 = parseFloat(getFifthYearMonth[8].split("&")[0]);
                let azr25 = parseFloat(getFifthYearMonth[8].split("&")[1]);
                azar5 = azr15 < 1 ? 0 : azr15 * 100 / azr25;
                let dy15 = parseFloat(getFifthYearMonth[9].split("&")[0]);
                let dy25 = parseFloat(getFifthYearMonth[9].split("&")[1]);
                day5 = dy15 < 1 ? 0 : dy15 * 100 / dy25;
                let bh15 = parseFloat(getFifthYearMonth[10].split("&")[0]);
                let bh25 = parseFloat(getFifthYearMonth[10].split("&")[1]);
                bahman5 = bh15 < 1 ? 0 : bh15 * 100 / bh25;
                let esf15 = parseFloat(getFifthYearMonth[11].split("&")[0]);
                let esf25 = parseFloat(getFifthYearMonth[11].split("&")[1]);
                esfand5 = esf15 < 1 ? 0 : esf15 * 100 / esf25;
                let allMonthVal = fr15 + or15 + kr15 + tr15 + mo15 + shah15 + mhr15 + abn15 + azr15 + dy15 + bh15 + esf15;
                let allMonthValAll = fr25 + or25 + kr25 + tr25 + mo25 + shah25 + mhr25 + abn25 + azr25 + dy25 + bh25 + esf25;
                getTotalFifthYear = allMonthVal < 1 ? 0 : allMonthVal * 100 / allMonthValAll;
            } else {
                farvardin5 = parseFloat(getFifthYearMonth[0]);
                ordibehesht5 = parseFloat(getFifthYearMonth[1]);
                khordad5 = parseFloat(getFifthYearMonth[2]);
                tir5 = parseFloat(getFifthYearMonth[3]);
                mordad5 = parseFloat(getFifthYearMonth[4]);
                shahrivar5 = parseFloat(getFifthYearMonth[5]);
                mehr5 = parseFloat(getFifthYearMonth[6]);
                aban5 = parseFloat(getFifthYearMonth[7]);
                azar5 = parseFloat(getFifthYearMonth[8]);
                day5 = parseFloat(getFifthYearMonth[9]);
                bahman5 = parseFloat(getFifthYearMonth[10]);
                esfand5 = parseFloat(getFifthYearMonth[11]);
                getTotalFifthYear = farvardin5 + ordibehesht5 + khordad5 + tir5 + mordad5 + shahrivar5 + mehr5 + aban5 + azar5 + day5 + bahman5 + esfand5;
            }
            arrayFifth = [{ "name": "فروردین", "y": farvardin5 }, { "name": "اردیبهشت", "y": ordibehesht5 }, { "name": "خرداد", "y": khordad5 }, { "name": "تیر", "y": tir5 }, { "name": "مرداد", "y": mordad5 }, { "name": "شهریور", "y": shahrivar5 }, { "name": "مهر", "y": mehr5 }, { "name": "آبان", "y": aban5 }, { "name": "آذر", "y": azar5 }, { "name": "دی", "y": day5 }, { "name": "بهمن", "y": bahman5 }, { "name": "اسفند", "y": esfand5 }];
            arrayPushedYear = arrayPushedYear.concat([{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": getTotalFifthYear, "year": getFifthYear }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }]);
            cat = cat.concat([{ name: getFifthYear, categories: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"] }]);
            arraySeasonOrMonth = arraySeasonOrMonth.concat(GetArrayByMonth(season, month, farvardin5, ordibehesht5, khordad5, tir5, mordad5, shahrivar5, mehr5, aban5, azar5, day5, bahman5, esfand5));
            document.getElementById("crtTimeComparison").style.width = "1700px";
        }
        arrayPushed = arrayFirst.concat(arraySecond, arrayThird, arrayFourth, arrayFifth);
        let getAccidentRdo = $('input[type=radio][name=rdoAccident]:checked').attr("id");
        if (getType == "Pedestrian60" || getType == "Motor18" || getType == "NoCertification" || getType == "SafetyBelt" || getType == "Helmet" || getAccidentRdo == "rdoTypeOfCollision" || getAccidentRdo == "rdoSingleVehicle") {
            pointType = '<b>{point.y}</b> درصد<br/>';
            pointTypeMonth = '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> درصد<br/>';
        } else {
            pointType = '<b>{point.y}</b> عدد<br/>';
            pointTypeMonth = '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> عدد<br/>';
        }
    }
    //
    // Create the chart
    chartTimeComparison = new Highcharts.Chart('crtTimeComparison', {
        chart: {
            backgroundColor: '#f1f1f1',
            type: 'line',
            style: {
                fontFamily: 'IRANSans'
            },
            scrollablePlotArea: {
                minWidth: 700,
                scrollPositionX: 0,
                opacity: 1
            },
            events: {
                load: function () {
                    this.series.forEach(function (s) {
                        s.update({
                            showInLegend: s.points.length
                        });
                    });
                }
            }
        },
        title: { text: '' },
        xAxis: [
            {
                categories: cat,
                //reversed: true,
                drawHorizontalBorders: false,
                lineWidth: 1,
                lineColor: '#bdbdbd',
                gridLineWidth: 1,
                gridLineColor: '#e6e6e6',
                gridLineDashStyle: 'Dash',
                labels: {
                    groupedOptions: [
                        {
                            useHTML: true,
                            borderWidth: 2,
                            borderColor: 'black',
                            style: {
                                color: "#4A8987",
                                font: '12px IRANSans',
                            },
                            rotation: 0,
                            lineWidth: 1,
                            lineColor: '#bdbdbd',
                        }],
                    rotation: 90,
                    style: {
                        font: '9px IRANSans',
                    },
                    "enableTrimming": false
                }
            }
        ],
        yAxis: {
            title: { enabled: false },
            tickInterval: 10,
            tickmarkPlacement: "on",
            min: 0.1,
            max: 100,
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
        legend: {
            enabled: true,
            floating: true,
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            itemMarginTop: 10,
            itemMarginBottom: 10,
            useHTML: true,
            symbolWidth: 0,
            labelFormatter: function () {
                if (this.name == "ByYear") {
                    return '<div><span class="font-size-14 gray">' + "روند سالانه" + '</span><span class="custom-legend-highcharts" style="background-color:#4A8987"></span></div>';
                }
                if (this.name == "ByMonth") {
                    return '<div><span class="font-size-14 gray">' + "روند ماهانه" + '</span><span class="custom-legend-highcharts" style="background-color:#CB644E"></span></div>';
                }
                if (this.name == "ByDate") {
                    return '<div><span class="font-size-14 gray">' + "روند بازه انتخابی" + '</span><span class="custom-legend-highcharts" style="background-color:#7E2028"></span></div>';
                }
                return '';
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: false
                },
                formatter: function () {
                    if (this.y !== 0)
                        return this.y;
                }
            }
        },
        "series": [{
            "name": "ByMonth",
            'color': '#CB644E',
            "data": arrayPushed,
            tooltip: {
                pointFormat: pointTypeMonth
            },
            lineWidth: 1,
            marker: {
                symbol: 'circle',
                radius: 3,
                //lineColor: 'white',
                //lineWidth: 8
            },
        }, {
            type: "line",
            "name": "ByYear",
            'color': '#4A8987',
            "data": arrayPushedYear,
            connectNulls: true,
            pointPlacement: 0.3,
            lineWidth: 2,
            marker: {
                symbol: 'circle',
                radius: 5,
                //lineColor: 'white',
                //lineWidth: 8
            },
            //dashStyle: 'shortdash',
            tooltip: {
                headerFormat: '<span style="font-size:11px">{point.year}</span><br>',
                pointFormat: pointType
            }
        }, {
            type: "line",
            "name": "ByDate",
            'color': '#7E2028',
            "data": arraySeasonOrMonth,
            //pointPlacement: 0.3,
            lineWidth: 3,
            marker: {
                symbol: 'circle',
                radius: 4,
                //lineColor: 'white',
                //lineWidth: 8
            },
            //dashStyle: 'shortdash',
            tooltip: {
                headerFormat: '<span style="font-size:11px">{point.year}</span><br>',
                pointFormat: pointType
            }
        }
        ]
    });
    //$("#crtTimeComparison g[class='highcharts-axis highcharts-xaxis'] > path").attr("stroke-width", "0");
    let resArr = [];
    arrayPushed.filter(function (item) {
        if (item.y > -1) resArr.push(item.y);
    });
    let largestVal1;
    if (IsSeparateWithOr(getType))
        largestVal1 = resArr.sort((a, b) => a - b).reverse()[0];
    else
        for (let i = 0; i < 5; i++) {
            largestVal1 = JSON.parse("[" + spltGeometry[i] + "]").sort((a, b) => a - b).reverse()[0];
            if (largestVal1 > 0) break;
        }
    if (largestVal1 <= 0 && chartTimeComparison) {
        $("#crtTimeComparison").html("");
        $("#lblMessage").html(CreateModal("داده ای یافت نشد!"));
        $('#MessageModal').modal();
    }
}

//TimeComparison();
function IsSeparateWithOr(getType) {
    if (getType == "OutOfRoad" || getType == "OverthrowFall" || getType == "CrashWithFixedObject" || getType == "CrashWithAll" || getType == "RearEnd" || getType == "Angle" || getType == "SidewipeOd" || getType == "SidewipeSd" || getType == "HeadOn" || getType == "AllCollision" || getType == "SingleVehicle" || getType == "TwoVehicle" || getType == "MultiAccident" || getType == "WithPedestrian" || getType == "WithMotor" || getType == "CollisionOther" || getType == "AllVehicle" || getType == "Helmet" || getType == "SafetyBelt" || getType == "NoCertification" || getType == "Motor18" || getType == "Pedestrian60") return true;
    return false;
}
function GetArrayByMonth(season, month, farvardin, ordibehesht, khordad, tir, mordad, shahrivar, mehr, aban, azar, day, bahman, esfand) {
    var arraySeasonOrMonth = [];

    if (month === "-1" && season !== "-1") {
        if (season === "01")
            arraySeasonOrMonth = [{ "name": "فروردین", "y": farvardin }, { "name": "اردیبهشت", "y": ordibehesht }, { "name": "خرداد", "y": khordad }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": null }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }];
        else if (season === "02")
            arraySeasonOrMonth = [{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": tir }, { "name": "مرداد", "y": mordad }, { "name": "شهریور", "y": shahrivar }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }];
        else if (season === "03")
            arraySeasonOrMonth = [{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": null }, { "name": "مهر", "y": mehr }, { "name": "آبان", "y": aban }, { "name": "آذر", "y": azar }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }];
        else if (season === "04")
            arraySeasonOrMonth = [{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": null }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": day }, { "name": "بهمن", "y": bahman }, { "name": "اسفند", "y": esfand }];
    }
    else if (month === "01")
        arraySeasonOrMonth = [{ "name": "فروردین", "y": farvardin }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": null }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }];
    else if (month === "02")
        arraySeasonOrMonth = [{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": ordibehesht }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": null }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }];
    else if (month === "03")
        arraySeasonOrMonth = [{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": khordad }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": null }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }];
    else if (month === "04")
        arraySeasonOrMonth = [{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": tir }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": null }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }];
    else if (month === "05")
        arraySeasonOrMonth = [{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": mordad }, { "name": "شهریور", "y": null }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }];
    else if (month === "06")
        arraySeasonOrMonth = [{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": shahrivar }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }];
    else if (month === "07")
        arraySeasonOrMonth = [{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": null }, { "name": "مهر", "y": mehr }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }];
    else if (month === "08")
        arraySeasonOrMonth = [{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": null }, { "name": "مهر", "y": null }, { "name": "آبان", "y": aban }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }];
    else if (month === "09")
        arraySeasonOrMonth = [{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": null }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": azar }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }];
    else if (month === "10")
        arraySeasonOrMonth = [{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": null }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": day }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": null }];
    else if (month === "11")
        arraySeasonOrMonth = [{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": null }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": bahman }, { "name": "اسفند", "y": null }];
    else if (month === "12")
        arraySeasonOrMonth = [{ "name": "فروردین", "y": null }, { "name": "اردیبهشت", "y": null }, { "name": "خرداد", "y": null }, { "name": "تیر", "y": null }, { "name": "مرداد", "y": null }, { "name": "شهریور", "y": null }, { "name": "مهر", "y": null }, { "name": "آبان", "y": null }, { "name": "آذر", "y": null }, { "name": "دی", "y": null }, { "name": "بهمن", "y": null }, { "name": "اسفند", "y": esfand }];
    return arraySeasonOrMonth;
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
function FillCity() {
    let obj = {
        "provinceId": $("#cmbProvinceSearch").val() === "-1" ? "" : $("#cmbProvinceSearch").val()
    }
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "TimeComparison.aspx/GetFillCity",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess !== "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var optionVal = '';
                    $('#cmbCity').html('<option selected="" value="-1">انتخاب شهرستان</option>');
                    for (i = 0; i < msg.d.length; i++) {
                        var txt = msg.d[i].Message;
                        var id = msg.d[i].Id;
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
        dir: 'rtl'
    });
    $("#cmbCity").select2({
        placeholder: {
            id: "-1",
            text: "انتخاب شهرستان"
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
    $("#cmbCollisionChild2").select2({
        placeholder: {
            id: "-1",
            text: "انواع دو وسیله ای"
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
    $("#lnkTimeComparison").addClass("active");
}
function ChangeTitle() {
    let divTypeOfRoad = $("#divTypeOfRoad").hasClass('hide');
    let divLightingStatus = $("#divLightingStatus").hasClass('hide');
    let divCollision = $("#divCollision").hasClass('hide');
    let divCollisionSingleVehicle = $("#divCollisionSingleVehicle").hasClass('hide');
    let divCollisionTwoVehicle = $("#divCollisionTwoVehicle").hasClass('hide');
    let divFinalReason = $("#divFinalReason").hasClass('hide');
    let divCodeCausingAccident = $("#divCodeCausingAccident").hasClass('hide');
    let divNativeNonNative = $("#divNativeNonNative").hasClass('hide');
    let getRadioTitle = "";
    let getRadioAttrId = null;
    console.log(divCollisionSingleVehicle);
    if (!divTypeOfRoad) {
        getRadioAttrId = $('input[type=radio][name=rdoRoadway]:checked').attr("id");
        getRadioTitle = $("label[for='" + getRadioAttrId + "']").text();
    } else if (!divLightingStatus) {
        getRadioAttrId = $('input[type=radio][name=rdoLightingStatus]:checked').attr("id");
        getRadioTitle = $("label[for='" + getRadioAttrId + "']").text();
    } else if (!divCollision) {
        getRadioAttrId = $('input[type=radio][name=rdoCollision]:checked').attr("id");
        getRadioTitle = $("label[for='" + getRadioAttrId + "']").text();
    } else if (!divCollisionSingleVehicle) {
        getRadioAttrId = $('input[type=radio][name=rdoCollSingleVehicle]:checked').attr("id");
        getRadioTitle = $("label[for='" + getRadioAttrId + "']").text();
        console.log(getRadioAttrId);
    } else if (!divCollisionTwoVehicle) {
        getRadioAttrId = $('input[type=radio][name=rdoCollTwoVehicle]:checked').attr("id");
        getRadioTitle = $("label[for='" + getRadioAttrId + "']").text();
    } else if (!divFinalReason) {
        getRadioAttrId = $('input[type=radio][name=rdoFinalReason]:checked').attr("id");
        getRadioTitle = $("label[for='" + getRadioAttrId + "']").text();
    } else if (!divCodeCausingAccident) {
        getRadioAttrId = $('input[type=radio][name=rdoCodeCausingAccident]:checked').attr("id");
        getRadioTitle = $("label[for='" + getRadioAttrId + "']").text();
    } else if (!divNativeNonNative) {
        getRadioAttrId = $('input[type=radio][name=rdoIsLocal]:checked').attr("id");
        getRadioTitle = $("label[for='" + getRadioAttrId + "']").text();
    }
    let getIntensityTitle = getRadioTitle == "" ? "" : "(" + getRadioTitle + ")";
    let getProvince = $('#cmbProvinceSearch').val();
    let getProvinceTitle = "";
    let getCity = $('#cmbCity').val();
    let getCityTitle = "";
    let getDateOfAccident = $('input[type=radio][name=rdoDate]:checked').val();
    let getDateOfAccidentTitle = "";
    if (getProvince !== "" && getProvince !== null && getProvince !== "-1") {
        getProvinceTitle = " " + "استان" + $('#cmbProvinceSearch > option:selected').text().split("-")[1];
    }
    if (getCity !== "" && getCity !== null && getCity !== "-1") {
        getCityTitle = " " + "شهرستان" + $('#cmbCity > option:selected').text();
    }
    if (getDateOfAccident === "1Year") getDateOfAccidentTitle = " " + "در یک سال گذشته";
    else if (getDateOfAccident === "2Year") getDateOfAccidentTitle = " " + "در دو سال گذشته";
    else if (getDateOfAccident === "3Year") getDateOfAccidentTitle = " " + "در سه سال گذشته";
    else if (getDateOfAccident === "5Year") getDateOfAccidentTitle = " " + "در پنج سال گذشته";
    else if (getDateOfAccident === "All") getDateOfAccidentTitle = " " + "در پنج سال گذشته";
    else if (getDateOfAccident === "Date") getDateOfAccidentTitle = " " + "در بازه زمانی " + $('#txtDateRange').val().replace("-", "تا");
    $("#spnChartTitle").html("روند ماهانه / سالانه " + $('#spnChartTimeCompTitle').text() + " " + getIntensityTitle + getProvinceTitle + getCityTitle + getDateOfAccidentTitle);
}
$(document).ready(function () {
    pageLoad();
    $("#cmbChartTimeComp").on('click', function () {
        if ($("#divChartTimeComp").css("display") == "none") {
            $("#divChartTimeComp").show('slow');
        } else {
            $("#divChartTimeComp").hide('slow');
        }
    });
    /*OLD*/
    //$('input[type=radio][name=rdoLocation]').on('change', function () {
    //    var getVal = $('input[type=radio][name=rdoLocation]:checked').val();
    //    if (getVal === "City") {
    //        let getProvince = $('#cmbProvinceSearch').val();
    //        if (getProvince === "-1" || getProvince === "") {
    //            $("#lblMessage").html(CreateModal("ابتدا باید یک استان را انتخاب نمایید!"));
    //            $('#MessageModal').modal();
    //            $("input[type=radio][name=rdoLocation]").prop("checked", false);
    //            return;
    //        }
    //        $("#divCity").show('slow');
    //        if ($('#divAxis').css('display') !== 'none') {
    //            $("#divAxis").hide('slow');
    //            $('#cmbAxis').val("-1").trigger("change");
    //        }
    //        if ($('#divInNativeArea').css('display') !== 'none') {
    //            $("#divInNativeArea").hide('slow');
    //            $('#cmbInNativeArea').val("-1").trigger("change");
    //        }
    //        FillCity();
    //    } else if (getVal === "Axis") {
    //        let getProvince = $('#cmbProvinceSearch').val();
    //        if (getProvince === "-1" || getProvince === "") {
    //            $("#lblMessage").html(CreateModal("ابتدا باید یک استان را انتخاب نمایید!"));
    //            $('#MessageModal').modal();
    //            $("input[type=radio][name=rdoLocation]").prop("checked", false);
    //            return;
    //        }
    //        if ($('#divCity').css('display') !== 'none') {
    //            $("#divCity").hide('slow');
    //            $('#cmbCity').val("-1").trigger("change");
    //        }
    //        let obj = {
    //            "provinceId": $("#cmbProvinceSearch").val() === "-1" ? "" : $("#cmbProvinceSearch").val()
    //        }
    //        $('#spinSearchLoading').show();
    //        $.ajax({
    //            type: "POST",
    //            url: "TimeComparison.aspx/GetFillAxis",
    //            data: JSON.stringify(obj),
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: function (msg) {
    //                if (msg != null) {
    //                    if (msg.d.length == 0) {
    //                        $('#cmbAxis').html('<option selected="" value="-1">انتخاب محور</option>');
    //                    }
    //                    else if (msg.d[0].IsSuccess !== "true") {
    //                        $("#lblMessage").html(CreateModal(msg.d[0].Message));
    //                        $('#MessageModal').modal();
    //                    } else {
    //                        var optionVal = '';
    //                        $('#cmbAxis').html('<option selected="" value="-1">انتخاب محور</option>');
    //                        for (i = 0; i < msg.d.length; i++) {
    //                            var txt = msg.d[i].Message;
    //                            var id = msg.d[i].Id;
    //                            optionVal += '<option value="' + id + '">' + txt + '</option>';
    //                        }
    //                        $('#cmbAxis').append(optionVal);
    //                    }
    //                } else {
    //                    alert("خطا در برقراری ارتباط با سرور!");
    //                }
    //            },
    //            complete: function () {
    //                $('#spinSearchLoading').hide();
    //                $("#divAxis").show('slow');
    //            },
    //            error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
    //                alert(response.d);
    //            }
    //        });
    //    }
    //    else {
    //        $("#divCity,#divAxis").hide('slow');
    //        $('#cmbCity,#cmbAxis').val("-1").trigger("change");
    //    }
    //});
    $('input[type=radio][name=rdoLocation]').on('change', function () {

        $("#divCity,#divAxis").show('slow');
        $("#cmbCity,#cmbAxis").show('slow');
        $('#divInNativeArea').show("slow");

    });
    $('input[type=radio][name=rdoAccident]').on('change', function () {
        var idVal = $(this).attr("id");
        let getTitleText = $("label[for='" + idVal + "']").text();
        $("#spnChartTimeCompTitle").html(getTitleText);
        $("#divChartTimeComp").hide('slow');
        $("#divTypeOfRoad,#divLightingStatus,#divCollision,#divCollisionSingleVehicle,#divCollisionTwoVehicle,#divFinalReason,#divCodeCausingAccident,#divNativeNonNative").removeClass('hide');
        $("#divTypeOfRoad,#divLightingStatus,#divCollision,#divCollisionSingleVehicle,#divCollisionTwoVehicle,#divFinalReason,#divCodeCausingAccident,#divNativeNonNative").addClass('hide');

        if (idVal === 'rdoTypeRoad') {
            $("#divTypeOfRoad").removeClass('hide');
            $("#rdoRoadwayWidthAll").prop("checked", true);
            $("#rdoRoadwayWidthAll").trigger("change");
        } else {
            $("input[type=radio][name=rdoRoadway]").prop("checked", false);
        }
        if (idVal === 'rdoAccidentTime') {
            $("#divLightingStatus").removeClass('hide');
            $("#rdoStatusLightAll").prop("checked", true);
            $("#rdoStatusLightAll").trigger("change");
        } else {
            $("input[type=radio][name=rdoLightingStatus]").prop("checked", false);
        }
        if (idVal === 'rdoTypeOfCollision') {
            $("#divCollision").removeClass('hide');
            $("#rdoAllVehicle").prop("checked", true);
            $("#rdoAllVehicle").trigger("change");
        } else
            $("input[type=radio][name=rdoCollision]").prop("checked", false);
        if (idVal === 'rdoSingleVehicle') {
            $("#divCollisionSingleVehicle").removeClass('hide');
            $("#rdoCrashWithAll").prop("checked", true);
            $("#rdoCrashWithAll").trigger("change");
        } else
            $("input[type=radio][name=rdoCollSingleVehicle]").prop("checked", false);
        if (idVal === 'rdoTwoVehicle') {
            $("#divCollisionTwoVehicle").removeClass('hide');
            $("#rdoTwoVehicleAll").prop("checked", true);
            $("#rdoTwoVehicleAll").trigger("change");
        } else $("input[type=radio][name=rdoCollTwoVehicle]").prop("checked", false);
        if (idVal === 'rdoCompleteCause') {
            $("#divFinalReason").removeClass('hide');
            $("#rdoAllFinalReason").prop("checked", true);
            $("#rdoAllFinalReason").trigger("change");
        } else $("input[type=radio][name=rdoFinalReason]").prop("checked", false);
        //if (idVal === 'rdoFinalReason') $("#divFinalReason").removeClass('hide');
        if (idVal === 'rdoTypeAccidentCausingOffense') {
            $("#divCodeCausingAccident").removeClass('hide');
            $("#rdoAllCodeCausing").prop("checked", true);
            $("#rdoAllCodeCausing").trigger("change");
        } else $("input[type=radio][name=rdoCodeCausingAccident]").prop("checked", false);
        if (idVal === 'rdoCulprit') {
            $("#divNativeNonNative").removeClass('hide');
            $("#rdoAllLicensePlate").prop("checked", true);
            $("#rdoAllLicensePlate").trigger("change");
        } else $("input[type=radio][name=rdoIsLocal]").prop("checked", false);
        //$("input[type=radio][name=rdoTypeAccidentCausingOffense]").prop("checked", false);
        if (idVal !== 'rdoTypeRoad' && idVal !== 'rdoAccidentTime' && idVal !== 'rdoTypeOfCollision' && idVal !== 'rdoSingleVehicle' && idVal !== 'rdoTwoVehicle' && idVal !== 'rdoCompleteCause' && idVal !== 'rdoTypeAccidentCausingOffense' && idVal !== 'rdoCulprit')
            LoadHideInput("");
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
        LoadHideInput(getVal);
        //LoadHideInput("");
    });
    $('input[type=radio][name=rdoDate]').on('change', function () {
        var getVal = $('input[type=radio][name=rdoDate]:checked').val();
        if (getVal === "Date") {
            $("#divShowDate").show('slow');
        } else {
            $("#divShowDate").hide('slow');
            LoadHideInput("");
        }
    });
    $('input[type=radio][name=rdoStatus],input[type=radio][name=rdoIntensity]').on('change', function () {
        LoadHideInput("");
    });
    $('input[type=radio][name=rdoDays]').on('change', function () {
        //var getDateOfAccident = $('input[type=radio][name=rdoDays]:checked').val();
        LoadHideInput("");
    });
    $('#txtDateRange').on('change', function () {
        var getDateOfAccident = $('#txtDateRange').val();
        if (getDateOfAccident !== "") {
            LoadHideInput("");
        }
    });
    $("#cmbProvinceSearch").on('change', function () {
        var getProvince = $('#cmbProvinceSearch').val();
        if (getProvince !== "" && getProvince !== null) {
            if (getProvince !== "-1") FillCity();
            LoadHideInput("");
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
        ChangeTitle();
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
    $("#cmbAxis").on('change', function () {
        var getCity = $('#cmbAxis').val();
        var getProvince = $('#cmbProvinceSearch').val();
        if (getProvince == "-1") return;
        if (getCity !== "" && getCity !== null) {
            LoadHideInput("");
        }
    });
    $("#cmbInNativeArea").on('change', function () {
        var getInNativeArea = $('#cmbInNativeArea').val();
        if (getInNativeArea !== "" && getInNativeArea !== null) {
            LoadHideInput("");
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
    $("#chkIsNotLocalDriver").on('change', function () {
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
    if ($('input[type=radio][name=rdoRoadway]').is(':checked'))
        getType = $('input[type=radio][name=rdoRoadway]:checked').val();
    else if ($('input[type=radio][name=rdoLightingStatus]').is(':checked'))
        getType = $('input[type=radio][name=rdoLightingStatus]:checked').val();
    else if ($('input[type=radio][name=rdoCollision]').is(':checked'))
        getType = $('input[type=radio][name=rdoCollision]:checked').val();
    else if ($('input[type=radio][name=rdoCollSingleVehicle]').is(':checked'))
        getType = $('input[type=radio][name=rdoCollSingleVehicle]:checked').val();
    else if ($('input[type=radio][name=rdoCollTwoVehicle]').is(':checked'))
        getType = $('input[type=radio][name=rdoCollTwoVehicle]:checked').val();
    else if ($('input[type=radio][name=rdoFinalReason]').is(':checked'))
        getType = $('input[type=radio][name=rdoFinalReason]:checked').val();
    else if ($('input[type=radio][name=rdoCodeCausingAccident]').is(':checked'))
        getType = $('input[type=radio][name=rdoCodeCausingAccident]:checked').val();
    else if ($('input[type=radio][name=rdoIsLocal]').is(':checked'))
        getType = $('input[type=radio][name=rdoIsLocal]:checked').val();
    //rdoSingleVehicle
    getType = getType == "" ? $('input[type=radio][name=rdoAccident]:checked').val() : getType;
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
    let typeForIf = "";
    if (getType == "OutOfRoad" || getType == "OverthrowFall" || getType == "CrashWithFixedObject" || getType == "CrashWithAll" || getType == "RearEnd" || getType == "Angle" || getType == "SidewipeOd" || getType == "SidewipeSd" || getType == "HeadOn" || getType == "AllCollision" || getType == "SingleVehicle" || getType == "TwoVehicle" || getType == "MultiAccident" || getType == "WithPedestrian" || getType == "WithMotor" || getType == "CollisionOther" || getType == "AllVehicle" || getType == "Helmet" || getType == "SafetyBelt" || getType == "NoCertification" || getType == "Motor18" || getType == "Pedestrian60") typeForIf = "GetWithAll";
    else typeForIf = "GetWithOutAll";
    var obj = {
        "type": getType == undefined ? "" : getType,
        "typeForIf": typeForIf,
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
        "inNativeArea": getInNativeArea === "-1" || getInNativeArea === "-2" ? "" : getInNativeArea,
        "isHoliday": getIsHoliday == undefined || getIsHoliday == "All" ? "" : getIsHoliday,
        "collisionChild1": $('#cmbCollisionOfATwo').val() !== "تک وسیله ای" || $("#cmbCollisionChild1").val() === "-1" ? "" : $("#cmbCollisionChild1").val(),
        "collisionChild2": $('#cmbCollisionOfATwo').val() !== "دو وسیله ای" || $("#cmbCollisionChild2").val() === "-1" ? "" : $("#cmbCollisionChild2").val(),
        "axisId": $("#cmbAxis").val() === "-1" ? "" : $("#cmbAxis").val(),
        "isNotLocalDriver": chkIsNotLocalDriver
    }
    $('#spinSearchLoading').show();
    $.ajax({
        type: "POST",
        url: "TimeComparison.aspx/GetSearchTimeComparison",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg != null) {
                if (msg.d[0].IsSuccess !== "true") {
                    $("#lblMessage").html(CreateModal(msg.d[0].Message));
                    $('#MessageModal').modal();
                } else {
                    var splt = msg.d[0].Message;
                    if (chartTimeComparison)
                        chartTimeComparison.destroy();
                    $('#hidFBcTheGeometry').val(splt);

                    TimeComparison(getType);
                    ChangeTitle();
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