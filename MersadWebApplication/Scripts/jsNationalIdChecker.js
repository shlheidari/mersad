function isValidIranianNationalCode(input) {
    input = ConvertFaNumberToEn(input);
    if (!/^\d{10}$/.test(input))
        return false;
    switch (input) {
        case "0000000000": case "1111111111": case "2222222222": case "3333333333": case "4444444444": case "5555555555": case "6666666666": case "7777777777": case "8888888888": case "9999999999": case "0123456789":
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
    s = s.replace("۰", "0");
    s = s.replace("۱", "1");
    s = s.replace("۲", "2");
    s = s.replace("۳", "3");
    s = s.replace("۴", "4");
    s = s.replace("۵", "5");
    s = s.replace("۶", "6");
    s = s.replace("۷", "7");
    s = s.replace("۸", "8");
    s = s.replace("۹", "9");
    return s;
}
