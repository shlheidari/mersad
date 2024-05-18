<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="EventProcess.aspx.cs" Inherits="MersadWebApplication.Moderator.Report.EventProcess" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">
    <style>
        .myDivIcon {
            text-align: center;
            line-height: 20px;
        }

        .admin-after-head, .chart-view {
            display: block;
        }

        .btn-check:active + .btn-secondary, .btn-check:checked + .btn-seconday, .btn-secondary.active, .btn-secondary:active, .show > .btn-secondary.dropdown-toggle {
            color: #fff;
            background-color: #ffcf00;
            border-color: #ffcf00;
        }

        .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: normal !important;
        }

        .progress-bar {
            background: #89A4FF;
            height: 10px;
            width: 0;
        }
    </style>
    <script src="/Scripts/highcharts.js"></script>
    <script src="/Scripts/highcharts-more.js"></script>
    <link href="/App_Themes/loading-bar.min.css" rel="stylesheet" />
    <script src="/Scripts/loading-bar.min.js"></script>
    <script src="/Scripts/jsModalHelper.js?n=14010321"></script>
    <script src="/Scripts/jquery-3.7.1.min.js"></script>
    <link href="/App_Themes/select2.min.css?n=14010321" rel="stylesheet" />
    <script src="/Scripts/select2.min.js"></script>
    <script src="/Scripts/bootstrap.min.js"></script>
    <link href="/App_Themes/jquery-ui.css" rel="stylesheet" />
    <script src="/Scripts/jquery-ui.js"></script>
</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
         <script>
            $(document).ready( function () {
                var wid = window.innerWidth-230;
                var heigh = window.innerHeight - 185;

                $("#mainContainer").css({ "width": wid, "height": heigh });
                //var widforf = wid / 2.5;
                $("#f").css({ "height": heigh });
                //$("#divNormalFilter").css({ "height": heigh+20 });
                $("#divNormalFilterX").css({ "height": heigh-40 });
                $("#contains").css({ "height": heigh, "width": wid });
                $("#contains1").css({ "height": heigh, "width": wid });
                $("#contains1_1").css({ "height": heigh-20 });
                $("#scroll-line-chart").css({ "height": heigh-20 });
                $("#highcharts-omgbeh1-0").css({ "height": heigh-20 });
                $(".highcharts-background").css({ "height": heigh-20 });

                $("#crtTimeComparison").css({ "height": heigh  });

                
                $("#g1p1").css({ "height": (heigh-20) /2});
                $("#g1p1_0").css({ "height": ((heigh - 30) / 2) - 30 });
                $("#g1p2_0").css({ "height": ((heigh - 30) / 2) - 30 });
                $("#g1p2").css({ "height": (heigh-20) /2});
               
                //var widfort = widforf /2.5;
                
                
                $("#t").css({ "height": heigh });
                var newHei = heigh - 20;
                newHei = newHei / 2;


                $("#g2p3_0").css({ "height": newHei+155 });
             

            });
         </script>
    <div class="body-wrapper">
        <div id="divNormalFilter" class="admin-right-panel" >
            <div class="panel-head">
                فیلترها<span class="spinner-border text-warning" role="status" style="display: none" id="spinSearchLoading">
                    <span class="sr-only">Loading...</span>
                </span>
            </div>
            <hr />
            <div id="divNormalFilterX"  style="display: block; overflow-y: auto; direction: ltr;">
                <div style="direction: rtl;">
                    <div class="form-group">
                        <div class="white-box">
                            <div style="padding-right: 5px">روند رویداد</div>
                            <hr />
                            <div class="form-group">
                                <div class="cmb-type-chart-time-comp" id="cmbChartEvent"><span id="spnChartEventTitle">انتخاب دسته تحلیل</span><i class="fas fa-angle-down yellow" style="float: left"></i></div>
                                <div class="div-type-chart-time-comp" id="divChartEvent">
                                    <hr />
                                    <div class="row">
                                        <div class="col-6" style="border-left: 1px solid #787878;">
                                            <div><i class="fal fa-exclamation-triangle"></i><span>شدت تصادف : </span></div>
                                            <div class="first-pad-right-radio">
                                                <input type="radio" name="rdoAccident" id="rdoAccidentStatistics" value="AccidentStatistics" />
                                                <label for="rdoAccidentStatistics">سهم خسارتی / جرحی / فوتی</label>
                                                <%--<hr />
                                                <input type="radio" name="rdoAccident" id="rdoAccidentDeceased" value="AccidentDeceased" />
                                                <label for="rdoAccidentDeceased">نرخ متوفیان تصادف</label>--%>
                                            </div>
                                            <hr />
                                            <div><i class="fa fa-road"></i><span>محل تصادف : </span></div>
                                            <div class="first-pad-right-radio">
                                                <input type="radio" name="rdoAccident" id="rdoTypeRoad" value="TypeRoad" />
                                                <label for="rdoTypeRoad">نوع راه</label>
                                                <hr />
                                                <input type="radio" name="rdoAccident" id="rdoCarriageWayDirection" value="CarriageWayDirection" />
                                                <label for="rdoCarriageWayDirection">سمت جهت راه</label>
                                               <%-- <hr />
                                                <input type="radio" name="rdoAccident" id="rdoLocationLandUse" value="LocationLandUse" />
                                                <label for="rdoLocationLandUse">کاربری محل</label>--%>
                                            </div>
                                            <hr />
                                            <div><i class="fa fa-history"></i><span>زمان تصادف : </span></div>
                                            <div class="first-pad-right-radio">
                                                <input type="radio" name="rdoAccident" id="rdoLightingStatus" value="LightingStatus" />
                                                <label for="rdoLightingStatus">وضعیت روشنایی</label>
                                            </div>
                                        </div>
                                        <div class="col-6" style="padding-right: 5px">
                                            <div><i class="fa fa-tasks"></i><span>مشخصات تصادف : </span></div>
                                            <div class="first-pad-right-child-radio">
                                                <input type="radio" name="rdoAccident" id="rdoTypeOfCollision" value="Collision" />
                                                <label for="rdoTypeOfCollision">نحوه و نوع برخورد</label>
                                                <hr />
                                                <div class="first-pad-right-radio">
                                                    <input type="radio" name="rdoAccident" id="rdoSingleVehicle" value="SingleVehicle" />
                                                    <label for="rdoSingleVehicle">تک وسیله ای</label>
                                                    <hr />
                                                    <input type="radio" name="rdoAccident" id="rdoTwoVehicle" value="TwoVehicle" />
                                                    <label for="rdoTwoVehicle">دو وسیله ای</label>
                                                </div>
                                              <%--  <hr />
                                                <input type="radio" name="rdoAccident" id="rdoCompleteCause" value="CompleteCause" />
                                                <label for="rdoCompleteCause">علت تامه</label>--%>
                                              <%--  <hr />
                                                <input type="radio" name="rdoAccident" id="rdoTypeAccidentCausingOffense" value="TypeAccidentCausingOffense" />
                                                <label for="rdoTypeAccidentCausingOffense">نوع تخلف حادثه ساز</label>--%>
                                            </div>
                                           <%-- <hr />
                                            <div><i class="fas fa-users"></i><span>کاربران : </span></div>
                                            <div class="first-pad-right-radio">
                                                <input type="radio" name="rdoAccident" id="rdoCulprit" value="Culprit" />
                                                <label for="rdoCulprit">مقصر بومی / غیر بومی</label>
                                                <hr />
                                                <input type="radio" name="rdoAccident" id="rdoNoCertification" value="NoCertification" />
                                                <label for="rdoNoCertification">فاقد گواهینامه معتبر</label>
                                                <hr />
                                                <input type="radio" name="rdoAccident" id="rdoSafetyBelt" value="SafetyBelt" />
                                                <label for="rdoSafetyBelt">کمربند ایمنی</label>
                                                <hr />
                                                <input type="radio" name="rdoAccident" id="rdoHelmet" value="Helmet" />
                                                <label for="rdoHelmet">کلاه ایمنی</label>
                                            </div>--%>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="form-group">
                                <hr />
                                <div class="form-group">
                                    <select id="cmbEventTime" class="w-100" style="display: none"></select>
                                </div>
                                <button type="button" id="btnAddEvent" style="background: transparent; border: none;"><i style="font-size: 1.5em;" class="fa fa-calendar-plus fa-2x yellow"></i>&nbsp;<span>افزودن رویداد</span></button>
                                <div id="divAddEvent" class="hide">
                                    <div style="font-size: 14px; padding-right: 5px">افزودن رویداد جدید</div>
                                    <hr />
                                    <div class="form-group">
                                        <input id="txtEventName" type="text" placeholder="نام رویداد" maxlength="128" /><br />
                                    </div>
                                    <div style="padding-right: 5px">بازه زمانی رویداد</div>
                                    <hr />
                                    <div class="inner-addon left-addon">
                                        <div class="input-group-prepend">
                                            <span style="cursor: pointer; display: none" class="input-group-text" id="dateDateRange"></span>
                                        </div>
                                        <i style="cursor: pointer" class="fa fa-calendar fa-2x"></i>
                                        <input type="text" placeholder="انتخاب بازه زمانی" id="txtDateRange" onclick="openDateRange()" aria-label="dateDateRange" aria-describedby="dateDateRange" maxlength="10" readonly="" />
                                    </div>
                                    <br />
                                    <button type="button" id="btnSubmitEvent" class="btn btn-success"><span>ثبت و ذخیره</span></button>
                                </div>
                            </div>
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
                                    <input type="radio" id="rdoSelectCalender" name="rdoDate" value="Date">
                                    <label for="rdoSelectCalender">انتخاب بازه زمانی</label>
                                    <%--<input type="radio" id="rdoAllYear" name="rdoDate" value="All">
                                    <label for="rdoAllYear">همه</label>--%>
                                </div>
                                <div class="col-7">
                                    <input type="radio" id="rdoThreeYear" name="rdoDate" value="3Year">
                                    <label for="rdoThreeYear">سه ساله</label><br />
                                    <input type="radio" id="rdoFiveYear" name="rdoDate" value="5Year">
                                    <label for="rdoFiveYear">پنج ساله</label><br />

                                </div>
                            </div>
                            <hr />
                            <div class="row" id="divShowDate" style="display: none">
                                <div class="col-6">
                                    <label for="txtStartYear">از سال</label>&nbsp;<input type="number" style="width: 60px;" id="txtStartYear" />
                                </div>

                                <div class="col-6">
                                    <label for="txtEndYear">تا سال</label>&nbsp;<input type="number" style="width: 60px;" id="txtEndYear" />
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
                                    <input type="radio" id="rdoAllIntensity" name="rdoIntensity" value="All" checked="checked">
                                    <label for="rdoAllIntensity">همه</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="white-box" id="divProFilter">
                            <div style="padding-right: 5px">فیلترهای پیشرفته</div>
                        </div>
                    </div>
                    <div class="form-group"></div>
                    <br />
                    <br />
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
            <div style="display: block;  overflow-y: scroll; direction: ltr;">
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
                                        <option value="‌1">1. اصلی</option>
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
                                        <input type="text" id="txtFromAge" placeholder="از سن" readonly="">
                                    </div>
                                    <div class="col-6">
                                        <input type="text" id="txtToAge" placeholder="تا سن" readonly="">
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
        <div id="contains" class="d-table-cell chart-panel align-items-top">
            <script src="../../Scripts/html2canvas.min.js"></script>
             <script>
                 function Export() {

                     html2canvas(document.getElementById("contains1")).then(function (canvas) {
                         const a = document.createElement("a");
                         a.href = canvas.toDataURL("image/jpeg", 1.0);
                         a.download = "EventProccess.jpg";
                         a.click();
                     });
                 }

             </script>
            <div style="padding:10px;background-color:#808080;width:130px;height:30px; cursor:pointer;" onclick="Export();" >
                 
                    دریافت خروجی گزارش
                 
            </div>
            <div id="contains1" class="gray-box form-group position-relative" style=" overflow-x: auto">
                <div>
                    <span class="title-chart" id="spnChartTitle"></span>&nbsp;<span class="mersad-info-btn">
                        <%--<%--<i class="fa fa-info-circle"></i>--%>
                    </span>
                </div>
                <div class="row">
                    <div class="col-2" style="padding: 35px 5px">
                        <div id="customLegend"></div>
                    </div>
                    <div id="contains1_1"  class="col-10">
                        <div   class="chart-container h-100" id="scroll-line-chart" style="direction: ltr; overflow-x: auto">
                            <div id="crtEventProcess" style=" width: auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="lblMessage" runat="server" clientidmode="Static"></div>
        <input type="hidden" id="hidFirst" />
        <input type="hidden" id="hidRange" />
        <input type="hidden" id="hidYear" />
        <script src="/Scripts/jsEventProcessHelper.js?n=14010607"></script>
        <link href="/App_Themes/jquery.md.bootstrap.datetimepicker.style.css?n=14010321" rel="stylesheet" />
        <script src="/Scripts/jquery.md.bootstrap.datetimepicker.js?n=14010321"></script>
    </div>
</asp:Content>
