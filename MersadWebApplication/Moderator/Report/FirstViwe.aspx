<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="FirstViwe.aspx.cs" Inherits="MersadWebApplication.Moderator.Report.FirstViwe" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">
    <style>
        .myDivIcon {
            text-align: center;
            line-height: 20px
        }

        .admin-after-head, .chart-view {
            display: block;
        }

        .btn-check:active + .btn-secondary, .btn-check:checked + .btn-secondary, .btn-secondary.active, .btn-secondary:active, .show > .btn-secondary.dropdown-toggle {
            color: #fff;
            background-color: #ffcf00;
            border-color: #ffcf00;
        }

        .progress-bar {
            background: #89A4FF;
            height: 10px;
            width: 0px;
        }
    </style>
    <script src="/Scripts/chart.min.js"></script>
    <script src="/Scripts/chartjs-plugin-datalabels.js"></script>
    <script src="/Scripts/highcharts.js"></script>
    <script src="/Scripts/highcharts-more.js"></script>
    <link href="/App_Themes/loading-bar.min.css" rel="stylesheet" />
    <script src="/Scripts/loading-bar.min.js"></script>
    <script src="/Scripts/jsModalHelper.js?n=14000918"></script>
    <script src="/Scripts/jquery-3.7.1.min.js"></script>
    <link href="/App_Themes/select2.min.css?n=13990707" rel="stylesheet" />
    <script src="/Scripts/select2.min.js"></script>
    <script src="/Scripts/bootstrap.min.js"></script>
    <link href="/App_Themes/jquery-ui.css" rel="stylesheet" />
    <script src="/Scripts/jquery-ui.js"></script>
    <script src="/Scripts/highcharts-coloraxis.js"></script>

</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <script src="../../Scripts/html2canvas.min.js"></script>

    <script>
        function Export() {
            let element = document.getElementById("SelectExport");
            
            var val = element.value;
            var tex = element.options[element.selectedIndex].text

            html2canvas(document.getElementById(val)).then(function (canvas) {
                const a = document.createElement("a");
                a.href = canvas.toDataURL("image/jpeg", 0.9);
                a.download = tex+".jpg";
                a.click();
            });
        }

    </script>

    <%--<script>
   
    // Download with right click
    $("#capture").click(function () {
        html2canvas("#divFirstView1").then(canvas => {
            const a = document.createElement("a");
            a.href = canvas.toDataURL("image/jpeg");
            a.download = "image.jpeg";
            a.click();
        });
    });
</script>--%>




    <div class="body-wrapper">



        <div id="divNormalFilter" class="admin-right-panel">
            <div class="panel-head">
                فیلترها<span class="spinner-border text-warning" role="status" style="display: none" id="spinSearchLoading">
                    <span class="sr-only">Loading...</span>
                </span>
            </div>
            <hr />
            <div class="form-group">
                <div class="white-box">
                    <div style="padding-right: 5px">در یک نگاه</div>
                    <hr />
                    <select id="cmbInFirstView" class="w-100">
                        <option value="-1">انتخاب دسته تحلیل</option>
                        <option value="1" selected="">محل تصادف</option>
                        <option value="2">زمان تصادف</option>
                        <option value="3">مشخصات تصادف</option>
                        <option value="4">وسیله نقلیه</option>
                        <option value="5">کاربران</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="white-box">
                    <div style="padding-right: 5px">بازه زمانی</div>
                    <hr />
                    <div class="row">
                        <div class="col-5">
                            <input type="radio" id="rdoOneYear" name="rdoDate" value="1Year" checked="checked">
                            <label for="rdoOneYear">یک ساله</label>
                            <br />
                            <input type="radio" id="rdoTwoYear" name="rdoDate" value="2Year">
                            <label for="rdoTwoYear">دو ساله</label><br />
                            <%-- <input type="radio" id="rdoAllYear" name="rdoDate" value="All">
                            <label for="rdoAllYear">همه</label>--%>
                            <input type="radio" id="rdoSelectCalender" name="rdoDate" value="Date">
                            <label for="rdoSelectCalender">انتخاب بازه زمانی</label>
                        </div>
                        <div class="col-7">
                            <input type="radio" id="rdoThreeYear" name="rdoDate" value="3Year">
                            <label for="rdoThreeYear">سه ساله</label><br />
                            <input type="radio" id="rdoFiveYear" name="rdoDate" value="5Year">
                            <label for="rdoFiveYear">پنج ساله</label><br />

                        </div>
                    </div>
                    <div class="form-group" id="divShowDate" style="display: none">
                        <div class="inner-addon left-addon">
                            <div class="input-group-prepend">
                                <span style="cursor: pointer; display: none" class="input-group-text" id="dateDateRange"></span>
                            </div>
                            <i style="cursor: pointer" class="fa fa-calendar fa-2x"></i>
                            <input type="text" placeholder="انتخاب رنج تاریخ" id="txtDateRange" runat="server" clientidmode="Static" onfocus="openDateRange()" aria-label="dateDateRange" aria-describedby="dateDateRange" maxlength="10" readonly="" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="white-box">
                    <div style="padding-right: 5px">محدوده مناطق</div>
                    <hr />
                    <div class="form-group row">
                        <div class="col-12">
                            <select runat="server" id="cmbProvinceSearch" clientidmode="Static" class="w-100"></select>
                            

                        </div>
                        <div class="col-12">
                            <select runat="server" id="cmbCity" clientidmode="Static" class="w-100"></select>

                        </div>
                        <br />
                    </div>
                      
                </div>
            </div>
            <div class="form-group">
                <div class="white-box">
                    <div style="padding-right: 5px">شدت تصادف</div>
                    <hr />
                    <div class="row">
                        <div class="col-6">
                            <input type="radio" id="rdoDeadIntensity" name="rdoIntensity" value="فوتی">
                            <label for="rdoDeadIntensity">فوتی</label><br />
                            <input type="radio" id="rdoInjuredIntensity" name="rdoIntensity" value="جرحی">
                            <label for="rdoInjuredIntensity">جرحی</label>
                        </div>
                        <div class="col-6">
                            <input type="radio" id="rdoDamageIntensity" name="rdoIntensity" value="خسارتی">
                            <label for="rdoDamageIntensity">خسارتی</label><br />
                            <input type="radio" id="rdoInjuredIntensityandDeadIntensity" name="rdoIntensity" value="جرحی وفوتی">
                            <label for="rdoInjuredIntensityandDeadIntensity">جرحی و فوتی</label>
                            <%--<input type="radio" id="rdoAllIntensity" name="rdoIntensity" value="All" checked="checked">
                            <label for="rdoAllIntensity">همه</label>--%>
                        </div>
                        <div class="row" style="float: right;">
                            <div class="col-12">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="white-box" id="divProFilter">
                    <div style="padding-right: 5px">فیلترهای پیشرفته</div>
                </div>
            </div>
        </div>
        <div id="divPerfesionalFilter" class="admin-right-panel" style="display: none">
            <div class="panel-head">
                فیلترهای پیشرفته<span class="spinner-border text-warning" role="status" style="display: none" id="spinSearchPerfesionalLoading">
                    <span class="sr-only">Loading...</span>
                </span>
            </div>
            <hr />
            <div style="display: block; height: 530px; overflow-y: auto; direction: ltr;">
                <div style="direction: rtl;">
                    <div class="form-group">
                        <div class="white-box">
                            <div class="form-group" style="padding-right: 5px">نمایش بر اساس روزهای هفته</div>
                            <div class="form-group btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" class="btn-check " name="rdoDays" id="rdoSaturday" autocomplete="off" value="شنبه" />
                                <label class="btn btn-day-week" for="rdoSaturday">ش</label>
                                <input type="radio" class="btn-check " name="rdoDays" id="rdoSunday" autocomplete="off" value="یکشنبه" />
                                <label class="btn btn-day-week" for="rdoSunday">ی</label>
                                <input type="radio" class="btn-check " name="rdoDays" id="rdoMonday" autocomplete="off" value="دوشنبه" />
                                <label class="btn btn-day-week" for="rdoMonday">د</label>
                                <input type="radio" class="btn-check " name="rdoDays" id="rdoTuesday" autocomplete="off" value="سه شنبه" />
                                <label class="btn btn-day-week" for="rdoTuesday">س</label>
                                <input type="radio" class="btn-check " name="rdoDays" id="rdoWednesday" autocomplete="off" value="چهارشنبه" />
                                <label class="btn btn-day-week" for="rdoWednesday">چ</label>
                                <input type="radio" class="btn-check " name="rdoDays" id="rdoThursday" autocomplete="off" value="پنجشنبه" />
                                <label class="btn btn-day-week" for="rdoThursday">پ</label>
                                <input type="radio" class="btn-check " name="rdoDays" id="rdoFriday" autocomplete="off" value="جمعه" />
                                <label class="btn btn-day-week" for="rdoFriday">ج</label>
                            </div>
                            <div class="form-group">
                                <input type="radio" id="rdoAllDays" name="rdoDays" value="All" checked="checked">
                                <label for="rdoAllDays">همه</label>
                            </div>
                            <hr />
                            <div class="form-group" style="padding-right: 5px">تعطیل و غیرتعطیل</div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="form-group">
                                        <input type="radio" id="rdoIsHoliday" name="rdoHoliday" value="true">
                                        <label for="rdoIsHoliday">تعطیلات</label>
                                    </div>
                                </div>
                                <div class="col-5">
                                    <div class="form-group">
                                        <input type="radio" id="rdoNotHoliday" name="rdoHoliday" value="false">
                                        <label for="rdoNotHoliday">غیر تعطیلات</label>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="form-group">
                                        <input type="radio" id="rdoHolidayNotHoliday" name="rdoHoliday" value="All" checked="checked">
                                        <label for="rdoHolidayNotHoliday">همه</label>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div class="form-group">
                                <select id="cmbMonth" class="w-100">
                                    <option selected="" value="-1">نمایش بر اساس ماه</option>
                                    <option value="01">فروردین</option>
                                    <option value="02">اردیبهشت</option>
                                    <option value="03">خرداد</option>
                                    <option value="04">تیر</option>
                                    <option value="05">مرداد</option>
                                    <option value="06">شهریور</option>
                                    <option value="07">مهر</option>
                                    <option value="08">آبان</option>
                                    <option value="09">آذر</option>
                                    <option value="10">دی</option>
                                    <option value="11">بهمن</option>
                                    <option value="12">اسفند</option>
                                </select>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="white-box">
                            <div style="padding-right: 5px">شرایط تصادف</div>
                            <hr />
                            <div class="form-group">
                                <select id="cmbCollisionOfATwo">
                                    <option selected="" value="-1">نوع برخورد</option>
                                    <option value="تک وسیله ای">1. تک وسیله ای</option>
                                    <option value="دو وسیله ای">2. دو وسیله ای</option>
                                    <option value="چند وسیله ای">3. چند وسیله ای</option>
                                    <option value="نقلیه با موتور">4. وسیله نقلیه با موتورسیکلت</option>
                                    <option value="نقلیه با عابر">5. وسیله نقلیه با عابر</option>
                                    <option value="سایر">6. سایر</option>
                                </select>
                            </div>
                            <div class="form-group" id="divCollisionChild1" style="display: none">
                                <select id="cmbCollisionChild1">
                                    <option selected="" value="-1">انواع تک وسیله ای</option>
                                    <option value="شی ثابت">1. شی ثابت</option>
                                    <option value="واژگونی و سقوط">2. واژگونی و سقوط</option>
                                    <option value="خروج از جاده">3. خروج از جاده</option>
                                </select>
                            </div>
                            <div class="form-group" id="divCollisionChild2" style="display: none">
                                <select id="cmbCollisionChild2">
                                    <option selected="" value="-1">انواع دو وسیله ای</option>
                                    <option value="برخورد جلو به عقب">1. جلو به عقب</option>
                                    <option value="برخورد زاویه‌ای">2. زاویه ای</option>
                                    <option value="برخورد پهلو به پهلو هم جهت">3. پهلو به پهلو هم جهت</option>
                                    <option value="برخورد پهلو به پهلو غیر هم جهت">4. پهلو به پهلو خلاف جهت</option>
                                    <option value="برخورد رخ به رخ">5. رخ به رخ</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select id="cmbLightingStatus">
                                    <option selected="" value="-1">وضعیت روشنایی</option>
                                    <option value="روز">1. روز</option>
                                    <option value="طلوع">2. طلوع</option>
                                    <option value="غروب">3. غروب</option>
                                    <option value="شب با روشنایی کافی">4. شب با روشنایی کافی</option>
                                    <option value="شب بدون روشنایی کافی">5. شب بدون روشنایی کافی</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select id="cmbWeather">
                                    <option selected="" value="-1">وضعیت جوی</option>
                                    <option value="صاف">1. صاف</option>
                                    <option value="مه‌آلود">2. مه‌آلود</option>
                                    <option value="برفی">3. برفی</option>
                                    <option value="بارانی">4. بارانی</option>
                                    <option value="طوفانی">5. طوفانی</option>
                                    <option value="ابری">6. ابری</option>
                                    <option value="غبارآلود">7. غبارآلود</option>
                                </select>
                            </div>
                            <%--<div class="form-group" id="divShowDate" style="display: none">
                        <div class="inner-addon left-addon">
                            <div class="input-group-prepend">
                                <span style="cursor: pointer; display: none" class="input-group-text" id="dateDateRange"></span>
                            </div>
                            <i style="cursor: pointer" class="fa fa-calendar fa-2x"></i>
                            <input type="text" placeholder="انتخاب رنج تاریخ" id="Text1" runat="server" clientidmode="Static" onfocus="openDateRange()" aria-label="dateDateRange" aria-describedby="dateDateRange" maxlength="10" readonly="" />
                        </div>
                    </div>--%>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="white-box">
                            <div style="padding-right: 5px">محل تصادف</div>
                            <hr />
                            <div class="form-group row">
                                <div class="col-12">
                                    <select id="cmbCarriageWayDirection">
                                        <option selected="" value="-1">سمت جهت راه</option>
                                        <option value="یک‌طرفه">1. یک‌طرفه</option>
                                        <option value="دوطرفه غیرمجزا">2. دوطرفه غیرمجزا</option>
                                        <option value="دو طرفه مجزا با جداکننده فیزیکی">3. دو طرفه مجزا با جداکننده فیزیکی</option>
                                    </select>
                                </div>
                                <br />
                            </div>
                            <div class="form-group row">
                                <div class="col-12">
                                    <select id="cmbTypeOfWay">
                                        <option selected="" value="-1">نوع راه</option>
                                        <option value="1">1. اصلی</option>
                                        <option value="2">2. فرعی</option>
                                        <option value="3">3. روستایی</option>
                                    </select>
                                </div>
                                <br />
                            </div>
                            <div class="form-group row">
                                <div class="col-12">
                                    <select id="cmbCarCrashLocation">
                                        <option selected="" value="-1">موقعیت تصادف</option>
                                        <option value="باند سواره‌رو">1. باند سواره‌رو</option>
                                        <option value="شانه">2. شانه</option>
                                        <option value="رفوژ میانه‌رو">3. رفوژ میانه‌رو</option>
                                        <option value="کنار جاده">4. کنار جاده</option>
                                        <option value="خارج از حریم جاده">5. خارج از حریم جاده</option>
                                        <option value="سایر">6. سایر</option>
                                    </select>
                                </div>
                                <br />
                            </div>
                            <div class="form-group row">
                                <div class="col-12">
                                    <select id="cmbLocationLandUse">
                                        <option selected="" value="-1">کاربری محل</option>
                                        <option value="مسکونی">1. مسکونی</option>
                                        <option value="اداری تجاری">2. اداری تجاری</option>
                                        <option value="صنعتی">3. صنعتی</option>
                                        <option value="کشاورزی">4. کشاورزی</option>
                                        <option value="آموزشی">5. آموزشی</option>
                                        <option value="تفریحی">6. تفریحی</option>
                                        <option value="غیرمسکونی">7. غیرمسکونی</option>
                                        <option value="سایر">8. سایر</option>
                                    </select>
                                </div>
                                <br />
                            </div>

                        </div>
                    </div>
                    <div class="form-group">
                        <div class="white-box">
                            <div class="form-group" style="padding-right: 5px">مشخصات راننده</div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <input type="checkbox" id="chkIsNotLocalDriver">
                                        <label for="chkIsNotLocalDriver">راننده مقصر غیربومی</label>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div class="form-group">
                                <div style="padding-right: 5px">بازه سنی راننده(های) مقصر</div>
                                <hr />
                                <div class="form-group">
                                    <div id="slider"></div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-6">
                                        <input type="text" id="txtFromAge" placeholder="از سن" maxlength="2">
                                    </div>
                                    <div class="col-6">
                                        <input type="text" id="txtToAge" placeholder="تا سن" maxlength="2">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <button type="button" class="btn-back-to-normal-filter" id="btnBackToNormalFilter"><span>بازگشت به فیلترهای ساده</span>&nbsp;<i class="fa fa-arrow-left yellow"></i></button>
                    <div class="form-group"></div>
                    <br />
                    <br />
                </div>
            </div>
        </div>


        <script>




            $(document).ready(function () {






                var wid = window.innerWidth - 230;
                var heigh = window.innerHeight - 185;

                $("#mainContainer").css({ "width": wid, "height": heigh });
                //var widforf = wid / 2.5;
                $("#f").css({ "height": heigh });
                $("#g1p1").css({ "height": (heigh - 20) / 2 });
                $("#g1p1_0").css({ "height": ((heigh - 30) / 2) - 30 });
                $("#g1p2_0").css({ "height": ((heigh - 30) / 2) - 30 });
                $("#g1p2").css({ "height": (heigh - 20) / 2 });

                //var widfort = widforf /2.5;


                $("#t").css({ "height": heigh });
                var newHei = heigh - 20;
                newHei = newHei / 2;


                $("#g2p3_0").css({ "height": newHei + 155 });


            });
        </script>

        <div id="mainContainer" class="d-table-cell chart-panel align-items-top">

            <div class="w-100" dir="rtl">

                <table class="table" style="width:800px;">
                    <tr>
                        <td>دریافت نسخه نمودار:</td>
                        <td>
                            <select id="SelectExport" style="width: 400px; float: right;">
                                <option value="g1p1">نقایص مؤثر راه</option>
                                <option value="g1p2">موانع دید </option>
                                <option value="sttnr">شماره تصادفات به تفکیک نوع راه</option>
                                <option value="g2p3_0">شماره تصادفات به تفکیک کاربری</option>
                                <option value="aahendese">شماره تصادفات به تفکیک هندسه </option>
                                <option value="StRH">شماره تصادفات به تفکیک ساعت-روز هفته </option>
                                <option value="stRT">شمارت تصادفات روزهای تعطیل </option>
                                <option value="StSM">شماره تصادفات به تفکیک ساعت - ماه </option>
                                <option value="StMRR">شماره تصادفات به تفکیک ماه روز هفته</option>
                                <option value="BDV">برخورد دو وسیله ای </option>
                                <option value="NB">نحوه برخورد </option>
                                <option value="TTV">تصادف تک وسیله ای </option>
                                <option value="SSAB">شماره سایر انواع برخورد </option>
                                <option value="ETT">علت تامه تصادف </option>
                                <option value="NBVN">نوع بار وسیله نقلیه باری</option>
                                <option value="SMVN">سهم مانور وسیله نقلیه</option>
                                <option value="SKVSD">شماره کاربران و وسایل درگیر تصادف </option>
                                <option value="CNTH">کدنوع تخلف </option>
                                <option value="EtGR">اعتبار گواهینامه راننده مقصر</option>
                                <option value="EKE">استفاده از کمربند و کلاه ایمنی</option>
                                <option value="NJAM">نسبت جنسیتی افراد مقصر</option>
                                <option value="TSAM">توزیع سنی افراد مقصر در تصادف</option>
                            </select></td>
                        <td>
                            <div onclick=" Export();" style="padding: 10px; width: 80px; background-color: #9b9898; cursor: pointer;  float: right;">
                                <p>دریافت</p>
                            </div>

                        </td>
                    </tr>
                </table>

            </div>
            <%-- <div style="float: right; clear: both;">

                <div onclick="NaghayesMoaserRah();" style="padding: 10px; width: 200px; background-color: #9b9898; cursor: pointer; margin: 20px; float: right;">
                    <p>دریافت نقایص مؤثر راه</p>
                </div>
                <div onclick="Shomaretasadof();" style="padding: 10px; width: 200px; background-color: #9b9898; cursor: pointer; margin: 20px; float: right;">
                    <p>شمار تصادفات به تفکیک نوع راه  </p>
                </div>
                <div onclick="ShomareTasadofTafkikKarbary();" style="padding: 10px; width: 200px; background-color: #9b9898; cursor: pointer; margin: 20px; float: right;">
                    <p>
                        شمار تصادفات به تفکیک
کاربری    
                    </p>
                </div>
                <div onclick="MavaneDid();" style="padding: 10px; width: 100px; background-color: #9b9898; cursor: pointer; margin: 20px; float: right;">
                    <p>موانع دید </p>
                </div>
                <div onclick="Hendese();" style="padding: 10px; width: 200px; background-color: #9b9898; cursor: pointer; margin: 20px; float: right;">
                    <p>
                        مار تصادفات به تفکیک هندسه   


                    </p>
                </div>
            </div>--%>
            <div id="divFirstView1">
                <div id="f" class="d-table-cell align-items-top pl15 col-6">
                    <div id="g1p1" class="gray-box form-group position-relative mb13 ">
                        <%--نقایص موثر راه--%>
                        <div class="chart-effective-way-defects">
                            <span class="title-chart" data-toggle="tooltip" data-placement="top" title="Tooltip on top">نقایص موثر راه</span>&nbsp;<span class="mersad-info-btn" title="نقصصصص مؤؤؤؤثر راه">
                                <i class="fa fa-info-circle" title="نقصصصص مؤؤؤؤثر راه"></i>
                            </span>
                        </div>
                        <div class="chart-container dounaght-in-bar">
                            <canvas class="position-absolute" id="cnsChartEffectiveWayDefects" height="225"></canvas>
                        </div>
                        <div id="g1p1_0" class="chart-container">
                            <canvas id="cnsBarChartEffectiveWayDefects" height="250"></canvas>
                        </div>
                    </div>
                    <div id="g1p2" class="gray-box form-group position-relative">
                        <%--موانع دید--%>
                        <div class="chart-effective-way-defects">
                            <span class="title-chart">موانع دید</span>&nbsp;<span class="mersad-info-btn">
                                <%--<%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                        </div>
                        <div class="chart-container dounaght-in-bar">
                            <canvas class="position-absolute" id="cnsChartBarriersToVision" height="225"></canvas>
                        </div>
                        <div id="g1p2_0" class="chart-container">
                            <canvas id="cnsBarChartBarriersToVision" height="250"></canvas>
                        </div>
                    </div>
                </div>
                <div id="t" class="d-table-cell align-items-top pl15 col-4 ">
                    <div id="sttnr" class="gray-box form-group position-relative mb13">
                        <%--شمار تصادفات به تفکیک نوع راه--%>
                        <div>
                            <span class="title-chart">شمار تصادفات به تفکیک نوع راه</span>&nbsp;<span class="mersad-info-btn">
                                <%--<%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                        </div>
                        <div class="chart-container">
                            <canvas id="cnsChartRoadwayWidth" height="140"></canvas>
                        </div>
                    </div>
                    <div id="g2p3_0" class="gray-box form-group ">
                        <div class="text-center position-relative">
                            <div style="z-index: 9; right: 0; position: absolute">
                                <span class="title-chart">شمار تصادفات به تفکیک</span><br />
                                <span class="title-chart">کاربری - سرعت مجاز</span> &nbsp;<span class="mersad-info-btn">
                                    <%--<%--<i class="fa fa-info-circle"></i>--%>
                                </span>
                            </div>
                        </div>
                        <div class="chart-container  h-75">
                            <div id="cnsChartUserSpeed" style=""></div>
                        </div>
                        <div class="text-center">
                            <span style="color: #858585">سرعت مجاز - km/h</span>
                        </div>
                    </div>
                </div>
                <div id="aahendese" class="d-table-cell align-items-top  col-2">
                    <div class="gray-box form-group text-center">
                        <div>
                            <span class="title-chart">شمار تصادفات به تفکیک هندسه و </span>&nbsp;<span class="mersad-info-btn">
                                <%--<%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                            <br />
                            <span class="title-chart">وضعیت میانه راه</span>
                        </div>
                        <div class="chart-container">
                            <canvas id="cnsChartTheGeometry" height="495" width="260"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div id="divFirstView2" style="display: none">
                <div class="d-table-cell align-items-top mb13 pl15">
                    <div id="StRH" class="gray-box form-group position-relative align-items-top" style="display: inline-block; height: 380px; width: 370px; margin-left: 10px">
                        <div class="text-center position-relative">
                            <div style="z-index: 9; left: 0; position: absolute">
                                <span class="title-chart">شمار تصادفات به تفکیک</span>&nbsp;<span class="mersad-info-btn">
                                    <%--<%--<i class="fa fa-info-circle"></i>--%>
                                    <br />
                                    <span class="title-chart">ساعت - روز هفته</span>
                                </span>
                            </div>
                        </div>
                        <div class="chart-container">
                            <div id="divAccidentByDayAndClock" style="height: 340px"></div>
                        </div>
                    </div>
                    <div id="StSM" class="gray-box form-group position-relative" style="display: inline-block; width: 440px">
                        <div class="text-center position-relative">
                            <div style="z-index: 9; left: 0; position: absolute">
                                <span class="title-chart">شمار تصادفات به</span>&nbsp;<span class="mersad-info-btn">
                                    <%--<%--<i class="fa fa-info-circle"></i>--%>
                                    <br />
                                    <span class="title-chart">تفکیک ساعت - ماه</span>
                                </span>
                            </div>
                        </div>
                        <div class="chart-container">
                            <div id="divAccidentByMonthAndClock" style="height: 360px"></div>
                        </div>
                    </div>
                    <div id="stRT" class="gray-box form-group text-center" style="height: 175px">
                        <div>
                            <span class="title-chart">شمار تصادفات روزهای تعطیل / غیر تعطیل به تفکیک ماه </span>&nbsp;<span class="mersad-info-btn">
                                <%--<%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                        </div>
                        <div class="chart-container">
                            <div id="cnsChartByHolidayNotHoliday" style="border-radius: 20px; height: 140px"></div>
                        </div>
                    </div>
                </div>
                <div id="StMRR" class="d-table-cell align-items-top" style="width: 280px">
                    <div class="gray-box form-group text-center">
                        <div>
                            <span class="title-chart">شمار تصادفات به تفکیک ماه - روز هفته </span>&nbsp;<span class="mersad-info-btn">
                                <%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                        </div>
                        <div class="chart-container">
                            <div id="cnsChartMonthWeek" style="height: 520px"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="divFirstView3" style="display: none">
                <div id="BDV" class="d-table-cell align-items-top mb13 pl15" style="width: 320px">
                    <div class="gray-box form-group ">
                        <div>
                            <span class="title-chart">برخورد دو وسیله ای </span>&nbsp;<span class="mersad-info-btn">
                                <%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                        </div>
                        <div class="chart-container">
                            <div id="cnsChartCollisionOfTwo" style="height: 230px"></div>
                        </div>
                    </div>
                </div>
                <div id="NB" class="d-table-cell align-items-top mb13 pl15" style="width: 500px">
                    <div class="gray-box form-group">
                        <div>
                            <span class="title-chart">نحوه برخورد</span>&nbsp;<span class="mersad-info-btn">
                                <%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                        </div>
                        <div class="chart-container">
                            <div id="cnsChartTypeOfCollision" style="height: 230px"></div>
                        </div>
                        <div class="position-relative">
                            <div style="position: absolute; right: -15px; bottom: 10px; width: 100px;">
                                <div class="row">
                                    <div class="col-2">
                                        <div class="arrow-right"></div>
                                    </div>
                                    <div class="col-10" style="color: #7e2028">دو وسیله ای</div>
                                </div>
                            </div>
                        </div>
                        <div class="position-relative">
                            <div style="position: absolute; left: -19px; bottom: 10px; width: 80px;">
                                <div class="row">
                                    <div class="col-10" style="color: #4a8987">تک وسیله ای</div>
                                    <div class="col-2">
                                        <div class="arrow-left"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="position-relative text-center">
                            <div style="position: absolute; right: 50%; bottom: -20px; width: 21px;">
                                <div style="color: #f59d2d">سایر</div>
                                <div class="arrow-down"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="TTV" class="d-table-cell align-items-top mb13" style="width: 280px">
                    <div class="gray-box form-group">
                        <div>
                            <span class="title-chart">تصادف تک وسیله ای</span>&nbsp;<span class="mersad-info-btn">
                                <%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                        </div>
                        <div class="chart-container">
                            <div id="cnsChartCollisionOfOne" style="height: 230px"></div>
                        </div>
                    </div>
                </div>
                <div id="SSAB" class="d-block" style="margin-top: 3px">
                    <div class="gray-box form-group">
                        <div>
                            <span class="title-chart">شمار سایر انواع برخورد</span>&nbsp;<span class="mersad-info-btn">
                                <%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                        </div>
                        <div class="chart-container">
                            <canvas id="cnsBarChartOtherTypeOfCollision" height="230" width="1090"></canvas>
                        </div>
                    </div>
                </div>

            </div>
            <div id="divFirstView4" style="display: none">
                <div id="ETT" class="d-table-cell align-items-top mb13 pl15" style="width: 200px">
                    <div class="gray-box form-group text-justify">
                        <div>
                            <span class="title-chart">علت تامه تصادف  </span>&nbsp;<span class="mersad-info-btn">
                                <%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                            <br />
                            
                        </div>
                        <div class="chart-container">
                            <canvas id="cnsChartIsLocalDriver" height="490" width="200"></canvas>
                        </div>
                    </div>
                </div>
                <div id="NBVN" class="d-table-cell align-items-top mb13 ml13" style="width: 580px">
                    <div class="gray-box form-group position-relative d-inline-block ml13 w-100" style="margin-left: 10px; width: 330px">
                        <div class="text-center">
                            <span class="title-chart">نوع بار وسیله نقلیه باری به تفکیک نوع کاربری محل</span>&nbsp;<span class="mersad-info-btn">
                                <%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                        </div>
                        <div class="chart-container">
                            <div id="cnsChartVehicleBar" style="height: 330px"></div>
                        </div>
                    </div>

                    <div id="SKVSD" class="gray-box form-group text-center ml13">
                        <div>
                            <span class="title-chart">شمار کاربران و وسایل درگیر تصادف </span>&nbsp;<span class="mersad-info-btn">
                                <%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                        </div>
                        <div class="d-block">
                            <div class="d-inline-block" style="width: 130px">
                                <div class="chart-container">
                                    <canvas id="cnsUserAndVehiclePie" height="120"></canvas>
                                </div>
                            </div>
                            <div class="d-inline-block" style="width: 470px">
                                <div class="chart-container">
                                    <div id="cnsUserAndVehicleBar" style="height: 120px"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div id="SMVN" class="d-table-cell align-items-top mb13">
                    <div class="gray-box form-group text-center mb13" style="width: 275px">
                        <div>
                            <span class="title-chart">سهم مانور وسیله نقلیه </span>&nbsp;<span class="mersad-info-btn">
                                <%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                        </div>
                        <div class="chart-container">
                            <div id="cnsChartVehicleContributionManeuver" style="height: 260px"></div>
                        </div>
                    </div>
                    <div id="CNTH" class="gray-box form-group text-center" style="width: 275px">
                        <div>
                            <span class="title-chart">کد نوع تخلف حادثه ساز </span>&nbsp;<span class="mersad-info-btn">
                                <%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                        </div>
                        <div class="chart-container">
                            <div id="cnsChartCodeCausingAccident" style="height: 195px"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="divFirstView5" style="display: none">
                <div class="d-table-cell align-items-top mb13 pl15" style="width: 300px">
                    <div class="gray-box form-group text-center position-relative" style="height: 135px">
                        <div class="text-right position-absolute" style="top: 8px; right: 11px; z-index: 9; width: 200px;">
                            <span class="title-chart">شمار افراد درگیر در تصادف </span>&nbsp;<span class="mersad-info-btn">
                                <%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                        </div>
                        <div class="chart-container">
                            <div id="cnsChartCountPeapleInAccident" style="height: 120px"></div>
                        </div>
                    </div>
                </div>
                <div class="d-table-cell align-items-top mb13" style="width: 805px">
                    <div class="gray-box form-group text-center position-relative" style="height: 135px;">
                        <div class="text-right position-absolute" style="top: 8px; right: 11px; z-index: 9; width: 200px;">
                            <span class="title-chart">وضعیت عابر پیاده در تصادف </span>&nbsp;<span class="mersad-info-btn">
                                <%--<i class="fa fa-info-circle"></i>--%>
                            </span>
                        </div>
                        <div class="chart-container" style="transform: translate(0, -3px);">
                            <div id="cnsChartPedestriansSituation" style="height: 125px"></div>
                        </div>
                    </div>
                </div>
                <div class="d-block" style="margin-top: 3px">
                    <div class="d-table-cell align-items-top mb13 pl15" style="width: 545px">
                        <div id="EtGR" class="d-block" style="margin-top: 3px">
                            <div class="gray-box form-group text-justify" style="height: 200px">
                                <div>
                                    <span class="title-chart">اعتبار گواهینامه راننده مقصر </span>&nbsp;<span class="mersad-info-btn">
                                        <%--<i class="fa fa-info-circle"></i>--%>
                                    </span>
                                </div>
                                <div class="chart-container" style="margin-top: -17px">
                                    <canvas id="cnsChartValidityDriverLicense" height="160"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="d-block" style="margin-top: 3px">
                            <div id="EKE" class="gray-box form-group text-justify" style="height: 200px">
                                <div class="text-center mb-4">
                                    <span class="title-chart">استفاده از کمربند و کلاه ایمنی برای مصدومین و متوفیان </span>&nbsp;<span class="mersad-info-btn">
                                        <%--<i class="fa fa-info-circle"></i>--%>
                                    </span>
                                </div>
                                <div class="chart-container">
                                    <div class="row">
                                        <div   class="col-2">
                                            <div class="mb-3" style="font-size: 8px">
                                                <span style="display: inline-block; width: 15px; height: 12px; background-color: #4A8987"></span>&nbsp;<span>بستن کمربند</span><br />
                                                <span>استفاده از کلاه ایمنی</span>
                                            </div>
                                            <div>
                                                <span style="display: inline-block; width: 15px; height: 12px; background-color: #7E2028"></span>&nbsp;<span style="font-size: 8px">عدم استفاده از<br />
                                                    تجهیزات ایمنی</span>
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="text-center position-relative mb-3" style="margin-left: 12px;">
                                                <canvas id="cnsChartUseBeltsHelmetsInjuredDead" height="105"></canvas>
                                                <div class="position-absolute" style="top: -1px; left: -1.5px">
                                                    <img src="/Images/belt-back.png" />
                                                </div>
                                            </div>
                                            <div class="text-center font-size-9">راننده سواری</div>
                                        </div>
                                        <div class="col-3 text-center">
                                            <div class="text-center">
                                                <div class="text-center position-relative mb-3">
                                                    <canvas id="cnsChartUseHelmetsInjuredDead" height="103"></canvas>
                                                    <div class="position-absolute" style="top: -1px; left: -1px">
                                                        <img src="/Images/helmet-back.png" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="text-center font-size-9">راکب موتور سیکلت</div>
                                        </div>
                                        <div class="col-3 text-center">
                                            <div class="text-center position-relative mb-3" style="margin-left: 48px;">
                                                <canvas id="cnsChartUseBeltsHelmetsInjuredDead2" height="105"></canvas>
                                                <div class="position-absolute" style="top: -1px; left: -1.5px">
                                                    <img src="/Images/belt-back.png" />
                                                </div>
                                            </div>
                                            <div class="text-center font-size-9">راننده ناوگان سنگین باری</div>
                                        </div>
                                        <div class="col-2 text-center ">
                                            <div class="text-center position-relative mb-3" style="margin-left: 12.5px;">
                                                <canvas id="cnsChartUseBeltsHelmetsInjuredDead3" height="105"></canvas>
                                                <div class="position-absolute" style="top: -1px; left: -1.5px">
                                                    <img src="/Images/belt-back.png" />
                                                </div>
                                            </div>
                                            <div class="text-center font-size-9">راننده ناوگان مسافری</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-table-cell align-items-top mb13" style="width: 560px">
                        <div class="gray-box form-group" style="height: 410px; overflow-x: auto">
                            <div class="row">
                                <div id="NJAM" class="col-6">
                                    <div class="text-center">
                                        <span class="title-chart">نسبت جنسیتی افراد درگیر در تصادف </span>&nbsp;<span class="mersad-info-btn">
                                            <%--<i class="fa fa-info-circle"></i>--%>
                                        </span>
                                    </div>
                                    <div class="chart-container">
                                        <div id="cnsChartSexulityInAccident" style="height: 340px"></div>
                                    </div>
                                    <span>(درصد)</span>
                                </div>
                                <div id="TSAM" class="col-6">
                                    <div class="text-center">
                                        <span class="title-chart">توزیع سنی افراد درگیر در تصادف </span>&nbsp;<span class="mersad-info-btn">
                                            <%--<i class="fa fa-info-circle"></i>--%>
                                        </span>
                                    </div>
                                    <div style="height: 15px"></div>
                                    <div class="chart-container">
                                        <div id="cnsChartAgeInAccident" style="height: 325px"></div>
                                    </div>
                                    <div class="text-left" style="transform: translate(0, -13px);">(سال)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <input type="hidden" id="hidFBcEffectiveWayDefects" runat="server" clientidmode="Static" />
            <input type="hidden" id="hidPEffectiveWayDefects" runat="server" clientidmode="Static" />
            <input type="hidden" id="hidFBcBarriersToVision" runat="server" clientidmode="Static" />
            <input type="hidden" id="hidPBarriersToVision" runat="server" clientidmode="Static" />
            <input type="hidden" id="hidPChartRoadwayWidth" runat="server" clientidmode="Static" />
            <input type="hidden" id="hidFBcTheGeometry" runat="server" clientidmode="Static" />
            <input type="hidden" id="hidBubbleUserSpeed" runat="server" clientidmode="Static" />
            <input type="hidden" id="hidmaskouni" runat="server" clientidmode="Static" />
            <input type="hidden" id="hidedaritejari" runat="server" clientidmode="Static" />
            <input type="hidden" id="hidamouzeshi" runat="server" clientidmode="Static" />
             <input type="hidden" id="hidgheiremaskouni" runat="server" clientidmode="Static" />
            <input type="hidden" id="hidkeshavarzi" runat="server" clientidmode="Static" />
            <input type="hidden" id="hidtafrihi" runat="server" clientidmode="Static" />
            <input type="hidden" id="hidsanati" runat="server" clientidmode="Static" />
            <input type="hidden" id="hidsayer" runat="server" clientidmode="Static" />

            <input type="hidden" id="hidTimeStepOne" />
            <input type="hidden" id="hidTimeStepTwo" />
            <input type="hidden" id="hidMonthWeek" />
            <input type="hidden" id="hidHolidayNotHoliday" />
            <input type="hidden" id="hidVehicleBubble" />
            <input type="hidden" id="hidVehicleTechnicalDiagnosis" />
            <input type="hidden" id="hidManeuver" />
            <input type="hidden" id="hidCodeCausing" />
            <input type="hidden" id="hidUserAndVehicle" />
            <input type="hidden" id="hidPeapleInAccidentPedestriansSituation" />
            <input type="hidden" id="hidValidityDriver" />
            <input type="hidden" id="hidUseBeltsHelmetsInjuredDead" />
            <input type="hidden" id="hidSexulityInAccident" />
            <input type="hidden" id="hidAgeInAccident" />
            <input type="hidden" id="hidCollisionOfTwo" />
            <input type="hidden" id="hidTypeOfCollision" />
            <input type="hidden" id="hidCollisionOfOne" />
            <input type="hidden" id="hidFBcOtherTypeOfCollision" />
            <input type="hidden" id="hidIsLocalDriver" />
            <script src="/Scripts/jsFirstViewHelper.js?n=14010409"></script>
            <link href="/App_Themes/jquery.md.bootstrap.datetimepicker.style.css?n=14010321" rel="stylesheet" />
            <script src="/Scripts/jquery.md.bootstrap.datetimepicker.js?n=14010321"></script>
        </div>
        <div id="lblMessage" runat="server" clientidmode="Static"></div>
    </div>
</asp:Content>

