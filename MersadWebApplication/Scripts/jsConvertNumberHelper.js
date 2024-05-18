$(document).ready(function () {
    //$("input[type='text'],input[type='number'],input[type='tel']").on('change input', function () {
    //    var getVal = $(this).val();
    //    console.log("1:"+getVal);
    //    if (getVal === "") return;
    //    var replace = getVal.replaceAll("0", "۰").replaceAll("1", "۱").replaceAll("2", "۲").replaceAll("3", "۳").replaceAll("4", "۴").replaceAll("5", "۵").replaceAll("6", "۶").replaceAll("7", "۷").replaceAll("8", "۸").replaceAll("9", "۹").replaceAll("٠", "۰").replaceAll("١", "۱").replaceAll("٢", "۲").replaceAll("٣", "۳").replaceAll("٤", "۴").replaceAll("۴", "۴").replaceAll("٥", "۵").replaceAll("٦", "۶").replaceAll("٧", "۷").replaceAll("۸", "۸").replaceAll("٩", "۹").replaceAll("٨", "۸");
    //    console.log("2:" + getVal);
    //    $(this).val(replace);
    //    console.log("3:"+getVal);
    //});
});
function ConvertNumberToFa(s)
{
    return s === "" ? s : s.replaceAll("0", "۰").replaceAll("1", "۱").replaceAll("2", "۲").replaceAll("3", "۳").replaceAll("4", "۴").replaceAll("5", "۵").replaceAll("6", "۶").replaceAll("7", "۷").replaceAll("8", "۸").replaceAll("9", "۹").replaceAll("٠", "۰").replaceAll("١", "۱").replaceAll("٢", "۲").replaceAll("٣", "۳").replaceAll("٤", "۴").replaceAll("۴", "۴").replaceAll("٥", "۵").replaceAll("٦", "۶").replaceAll("٧", "۷").replaceAll("۸", "۸").replaceAll("٩", "۹").replaceAll("٨", "۸");
}