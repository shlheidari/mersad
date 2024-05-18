function isValidIranianNationalCode(input) {
    input = ConvertFaNumberToEn(input);
    if (!/^\d{10}$/.test(input))
        return false;
    switch (input) {
        case "0000000000": case "1111111111": case "2222222222": case "3333333333": case "4444444444": case "5555555555": case "6666666666": case "7777777777": case "8888888888": case "9999999999":
            return false;
    }
    var check = parseInt(input[9]);
    var sum = 0;
    var i;
    for (i = 0; i < 9; ++i) {
        sum += parseInt(input[i]) * (10 - i);
    }
    sum %= 11;
    return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
}
function ConvertFaNumberToEn(s) {
    s = s.replaceAll("۰", "0").replaceAll("٠", "0");
    s = s.replaceAll("۱", "1").replaceAll("١", "1");
    s = s.replaceAll("۲", "2").replaceAll("٢", "2");
    s = s.replaceAll("۳", "3").replaceAll("٣", "3");
    s = s.replaceAll("۴", "4").replaceAll("٤", "4").replaceAll("۴", "4");
    s = s.replaceAll("۵", "5").replaceAll("٥", "5");
    s = s.replaceAll("۶", "6").replaceAll("٦", "6");
    s = s.replaceAll("۷", "7").replaceAll("٧", "7");
    s = s.replaceAll("۸", "8").replaceAll("۸", "8").replaceAll("٨", "8");
    s = s.replaceAll("۹", "9").replaceAll("٩", "9");
    return s;
}
function GetURLParameter(sParam) {
    var sPageUrl = window.location.search.substring(1);
    var sUrlVariables = sPageUrl.split("&");
    for (var i = 0; i < sUrlVariables.length; i++) {
        var sParameterName = sUrlVariables[i].split("=");
        if (sParameterName[0] == sParam) {
            if (sParameterName.length > 2) return sParameterName[1] + "=" + sParameterName[2];
            return sParameterName[1];
        }
    }
    return "";
}
function Export2Doc(element, filename = '') {
    var meta = "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>";
    var head = "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n";
    var html = document.getElementById(element).innerHTML;
    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    var css = (
        '<style>' +
        'img {width:300px;}table {border-collapse: collapse; border-spacing: 0;}td{padding: 6px;}' +
        '</style>'
    );
    var options = { maxWidth: 624 };
    var images = Array();
    var img = $("#" + element).find("img");
    for (var i = 0; i < img.length; i++) {
        var w = Math.min(img[i].width, options.maxWidth);
        var h = img[i].height * (w / img[i].width);
        var canvas = document.createElement("CANVAS");
        canvas.width = w;
        canvas.height = h;
        var context = canvas.getContext('2d');
        context.drawImage(img[i], 0, 0, w, h);
        var uri = canvas.toDataURL("image/png");
        $(img[i]).attr("src", img[i].src);
        img[i].width = w;
        img[i].height = h;
        images[i] = {
            type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
            encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
            location: $(img[i]).attr("src"),
            data: uri.substring(uri.indexOf(",") + 1)
        };
    }
    var imgMetaData = "\n";
    for (var i = 0; i < images.length; i++) {
        imgMetaData += "--NEXT.ITEM-BOUNDARY\n";
        imgMetaData += "Content-Location: " + images[i].location + "\n";
        imgMetaData += "Content-Type: " + images[i].type + "\n";
        imgMetaData += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
        imgMetaData += images[i].data + "\n\n";
    }
    imgMetaData += "--NEXT.ITEM-BOUNDARY--";
    var output = meta.replace("_html_", head.replace("_styles_", css) + html) + imgMetaData;
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(output);
    filename = filename ? filename + '.doc' : 'document.doc';
    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {

        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.click();
    }
    document.body.removeChild(downloadLink);
}
