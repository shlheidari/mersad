<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="SafetyIndex.aspx.cs" Inherits="MersadWebApplication.Moderator.Map.SafetyIndex" %>


<asp:Content runat="server" ContentPlaceHolderID="Head">
    <style>
        .myDivIcon {
            text-align: center; /* Horizontally center the text (icon) */
            line-height: 20px; /* Vertically center the text (icon) */
        }

        .admin-after-head, .map-panel {
            display: block;
        }

        .btn-check:active + .btn-secondary, .btn-check:checked + .btn-secondary, .btn-secondary.active, .btn-secondary:active, .show > .btn-secondary.dropdown-toggle {
            color: #fff;
            background-color: #ffcf00;
            border-color: #ffcf00;
        }
    </style>
    <script src="/Scripts/jsModalHelper.js?n=14010321"></script>
    <script src="/Scripts/jquery-3.7.1.min.js"></script>
    <script src="/Scripts/leaflet/leaflet-rotate-src.js"></script>
    <link href="/Scripts/leaflet/leaflet.css" rel="stylesheet" />
    <script src="/Scripts/leaflet/leaflet.js"></script>
    <%--<script src="/Scripts/leaflet/leaflet.ajax.min.js"></script>--%>
    <script src="/Scripts/leaflet/Leaflet-draw/Leaflet.draw.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/Leaflet.Draw.Event.js"></script>
    <link rel="stylesheet" href="/Scripts/leaflet/Leaflet-draw/leaflet.draw.css" />
    <script src="/Scripts/leaflet/Leaflet-draw/Toolbar.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/Tooltip.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/ext/GeometryUtil.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/ext/LatLngUtil.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/ext/LineUtil.Intersect.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/ext/Polygon.Intersect.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/ext/Polyline.Intersect.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/ext/TouchEvents.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/draw/DrawToolbar.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/draw/handler/Draw.Feature.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/draw/handler/Draw.SimpleShape.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/draw/handler/Draw.Polyline.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/draw/handler/Draw.Marker.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/draw/handler/Draw.Circle.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/draw/handler/Draw.CircleMarker.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/draw/handler/Draw.Polygon.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/draw/handler/Draw.Rectangle.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/edit/EditToolbar.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/edit/handler/EditToolbar.Edit.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/edit/handler/EditToolbar.Delete.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/Control.Draw.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/edit/handler/Edit.Poly.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/edit/handler/Edit.SimpleShape.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/edit/handler/Edit.Rectangle.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/edit/handler/Edit.Marker.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/edit/handler/Edit.CircleMarker.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/edit/handler/Edit.Circle.js"></script>
    <script src="/Scripts/leaflet/leaflet.circle.topolygon-src.min.js"></script>
    <script src="/Scripts/turf.min.js?n=14000918"></script>

    <link href="/App_Themes/select2.min.css?n=14010321" rel="stylesheet" />
    <script src="/Scripts/select2.min.js"></script>
    <script src="/Scripts/bootstrap.min.js"></script>
    <script src="/Scripts/html2canvas.min.js"></script>
</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <script>
        $(document).ready(function () {
            var wid = window.innerWidth - 230;
            var heigh = window.innerHeight - 185;

            $("#mainContainer").css({ "width": wid, "height": heigh });
            $("#map").css({ "width": wid, "height": heigh + 20 });
            //var widforf = wid / 2.5;
            $("#f").css({ "height": heigh });
            $("#divNormalFilter").css({ "height": heigh + 40 });
            $("#divNormalFilterX").css({ "height": heigh - 40 });
            $("#contains").css({ "height": heigh, "width": wid });
            $("#contains1").css({ "height": heigh, "width": wid });
            $("#contains1_1").css({ "height": heigh - 100, "width": wid - 20 });

            $("#crtTimeComparison").css({ "height": heigh });


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
                    <div style="padding-right: 5px">نوع گزارش</div>
                    <hr />
                    <select id="cmbTypeOfReport" class="w-100">
                        <option value="-1">انتخاب نوع گزارش</option>
                        <option value="1" selected="">براساس جمعیت</option>
                        <option value="2">براساس مساحت</option>
                        <option value="3">براساس تصادف</option>
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
                            <input type="radio" id="rdoAllYear" name="rdoDate" value="All">
                            <label for="rdoAllYear">همه</label>
                        </div>
                        <div class="col-7">
                            <input type="radio" id="rdoThreeYear" name="rdoDate" value="3Year">
                            <label for="rdoThreeYear">سه ساله</label><br />
                            <input type="radio" id="rdoFiveYear" name="rdoDate" value="5Year">
                            <label for="rdoFiveYear">پنج ساله</label><br />
                            <input type="radio" id="rdoSelectCalender" name="rdoDate" value="Date">
                            <label for="rdoSelectCalender">انتخاب بازه زمانی</label>
                        </div>
                    </div>

                    <div class="form-group" id="divShowDate" style="display: none">
                        <hr />
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
                        <div class="row" style="float: right;">
                            <div class="col-12">
                                <input type="radio" id="rdoInjuredIntensityandDeadIntensity" name="rdoIntensity" value="جرحی وفوتی">
                                <label for="rdoInjuredIntensityandDeadIntensity">جرحی و فوتی</label>
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
            <div class="form-group"></div>
            <br />
            <br />
        </div>
        <div id="divPerfesionalFilter" class="admin-right-panel" style="display: none">
            <div class="panel-head">
                فیلترهای پیشرفته<span class="spinner-border text-warning" role="status" style="display: none" id="spinSearchPerfesionalLoading">
                    <span class="sr-only">Loading...</span>
                </span>
            </div>
            <hr />
            <div style="display: block; height: 530px; overflow-y: auto; direction: ltr;">
                <div class="form-group" style="direction: rtl;">
                    <div class="white-box">
                        <div class="form-group" style="padding-right: 5px">نوع راه</div>
                        <div class="row">
                            <div class="col-6">
                                <input type="radio" name="rdoRoadway" id="rdoRoadwayWidthMain" value="RoadwayMain" />
                                <label for="rdoRoadwayWidthMain">راه اصلی</label>
                                <br />
                                <input type="radio" name="rdoRoadway" id="rdoRoadwayWidthVillage" value="Village" />
                                <label for="rdoRoadwayWidthVillage">راه روستایی</label>
                            </div>
                            <div class="col-6">
                                <input type="radio" name="rdoRoadway" id="rdoRoadwayWidthSubsidiary" value="Subsidiary" />
                                <label for="rdoRoadwayWidthSubsidiary">راه فرعی</label>
                                <br />
                                <input type="radio" name="rdoRoadway" id="rdoRoadwayAll" value="All" checked="checked">
                                <label for="rdoRoadwayAll">همه</label>
                            </div>
                        </div>
                        <hr />
                        <div class="form-group" style="padding-right: 5px">کاربری محل</div>
                        <div class="row">
                            <div class="col-6">
                                <input type="radio" name="rdoFilLocationLandUse" id="rdoFilterResidential" value="مسکونی" />
                                <label for="rdoFilterResidential">مسکونی</label>
                                <br />
                                <input type="radio" name="rdoFilLocationLandUse" id="rdoFilLocationLandUseWithAll" value="All" checked="checked" />
                                <label for="rdoFilLocationLandUseWithAll">همه</label>
                            </div>
                            <div class="col-6">
                                <input type="radio" name="rdoFilLocationLandUse" id="rdoFilterNonResidential" value="غیرمسکونی" />
                                <label for="rdoFilterNonResidential">غیرمسکونی</label>
                                <br />
                            </div>
                        </div>
                        <hr />
                        <div class="form-group" style="padding-right: 5px">موانع دید</div>
                        <div class="row">
                            <div class="col-4">
                                <input type="radio" name="rdoFilVisualObstruction" id="rdoFilterHasObstruction" value="دارد" />
                                <label for="rdoFilterHasObstruction">دارد</label>
                                <br />
                            </div>
                            <div class="col-4">
                                <input type="radio" name="rdoFilVisualObstruction" id="rdoFilterHasNotObstruction" value="ندارد" />
                                <label for="rdoFilterHasNotObstruction">ندارد</label>
                                <br />
                            </div>
                            <div class="col-4">
                                <input type="radio" name="rdoFilVisualObstruction" id="rdoFilVisualObstructionWithAll" value="All" checked="checked" />
                                <label for="rdoFilVisualObstructionWithAll">همه</label>
                                <br />
                            </div>
                        </div>
                        <hr />
                        <div class="form-group" style="padding-right: 5px">نقایص موثر راه</div>
                        <div class="row">
                            <div class="col-4">
                                <input type="radio" name="rdoFilRoadDefects" id="rdoFilterHasRoadDefects" value="دارد" />
                                <label for="rdoFilterHasRoadDefects">دارد</label>
                                <br />
                            </div>
                            <div class="col-4">
                                <input type="radio" name="rdoFilRoadDefects" id="rdoFilterHasNotRoadDefects" value="ندارد" />
                                <label for="rdoFilterHasNotRoadDefects">ندارد</label>
                                <br />
                            </div>
                            <div class="col-4">
                                <input type="radio" name="rdoFilRoadDefects" id="rdoFilRoadDefectsWithAll" value="All" checked="checked" />
                                <label for="rdoFilRoadDefectsWithAll">همه</label>
                                <br />
                            </div>
                        </div>
                        <hr />
                        <div class="form-group" style="padding-right: 5px">تعطیل و غیرتعطیل</div>
                        <div class="row">
                            <div class="col-4">
                                <div class="form-group">
                                    <input type="radio" name="rdoHoliday" id="rdoIsHoliday" value="true">
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
                                    <input type="radio" name="rdoHoliday" id="rdoHolidayNotHoliday" value="" checked="checked">
                                    <label for="rdoHolidayNotHoliday">همه</label>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="form-group" style="padding-right: 5px">نحوه و نوع برخورد</div>
                        <div class="row">
                            <div class="col-5">
                                <div class="form-group">
                                    <input type="radio" name="rdoCollision" id="rdoCollisionSingleVehicle" value="تک وسیله ای" />
                                    <label for="rdoCollisionSingleVehicle">تک وسیله ای</label>
                                </div>
                            </div>
                            <div class="col-7">
                                <div class="form-group" id="divCollisionChild1" style="display: none">
                                    <select id="cmbCollisionChild1">
                                        <option selected="" value="-1">انواع تک وسیله ای</option>
                                        <option value="شی ثابت">1. شی ثابت</option>
                                        <option value="واژگونی و سقوط">2. واژگونی و سقوط</option>
                                        <option value="خروج از جاده">3. خروج از جاده</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-5">
                                <div class="form-group">
                                    <input type="radio" name="rdoCollision" id="rdoCollisionTwoVehicle" value="دو وسیله ای" />
                                    <label for="rdoCollisionTwoVehicle">دو وسیله ای</label>
                                </div>
                            </div>
                            <div class="col-7">
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
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <input type="radio" name="rdoCollision" id="rdoCollisionWithMotor" value="نقلیه با موتور" />
                                    <label for="rdoCollisionWithMotor">وسیله نقلیه با موتورسیکلت</label>
                                </div>
                                <div class="form-group">
                                    <input type="radio" name="rdoCollision" id="rdoCollisionWithPedestrian" value="نقلیه با عابر" />
                                    <label for="rdoCollisionWithPedestrian">وسیله نقلیه با عابر</label>
                                </div>
                                <div class="form-group">
                                    <input type="radio" name="rdoCollision" id="rdoCollisionWithAll" value="All" checked="checked" />
                                    <label for="rdoCollisionWithAll">همه</label>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="form-group" style="padding-right: 5px">شرایط جوی</div>
                        <div class="form-group">
                            <select id="cmbWeather">
                                <option selected="" value="-1">همه</option>
                                <option value="صاف">1. صاف</option>
                                <option value="مه‌آلود">2. مه‌آلود</option>
                                <option value="برفی">3. برفی</option>
                                <option value="بارانی">4. بارانی</option>
                                <option value="طوفانی">5. طوفانی</option>
                                <option value="ابری">6. ابری</option>
                                <option value="غبارآلود">7. غبارآلود</option>
                            </select>
                        </div>
                        <hr />
                        <div class="form-group" style="padding-right: 5px">نوع وسیله / کاربر</div>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <input type="radio" name="rdoTypeOfVehicle" id="rdoCar" value="Car" />
                                    <label for="rdoCar">خودروی سواری</label>
                                </div>
                                <div class="form-group">
                                    <input type="radio" name="rdoTypeOfVehicle" id="rdoPedestrian" value="Pedestrian" />
                                    <label for="rdoPedestrian">عابر پیاده</label>
                                </div>
                                <div class="form-group">
                                    <input type="radio" name="rdoTypeOfVehicle" id="rdoMotorcycle" value="Motorcycle" />
                                    <label for="rdoMotorcycle">موتور سیلکت</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <input type="radio" name="rdoTypeOfVehicle" id="rdoPassengerFleet" value="NavyPassenger" />
                                    <label for="rdoPassengerFleet">ناوگان مسافربری</label>
                                </div>
                                <div class="form-group">
                                    <input type="radio" name="rdoTypeOfVehicle" id="rdoCargoFleet" value="NavyBar" />
                                    <label for="rdoCargoFleet">ناوگان باری</label>
                                </div>
                                <div class="form-group">
                                    <input type="radio" name="rdoTypeOfVehicle" id="rdoTypeOfVehicleAll" value="All" checked="checked" />
                                    <label for="rdoTypeOfVehicleAll">همه</label>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="form-group" style="padding-right: 5px">راننده مقصر</div>
                        <div class="row">
                            <div class="col-4">
                                <input type="radio" name="rdoDriverBlame" id="rdoDriverBlameNative" value="true" />
                                <label for="rdoDriverBlameNative">بومی</label>
                                <br />
                            </div>
                            <div class="col-4">
                                <input type="radio" name="rdoDriverBlame" id="rdoDriverBlameNonNative" value="false" />
                                <label for="rdoDriverBlameNonNative">غیربومی</label>
                                <br />
                            </div>
                            <div class="col-4">
                                <input type="radio" name="rdoDriverBlame" id="rdoDriverBlameAll" value="" checked="checked" />
                                <label for="rdoDriverBlameAll">همه</label>
                                <br />
                            </div>
                        </div>
                        <hr />
                        <div class="form-group" style="padding-right: 5px">علت تامه</div>
                        <div class="form-group row">
                            <div class="col-12">
                                <select id="cmbFinalReason" class="w-100">
                                    <option selected="" value="-1">همه</option>
                                    <option value="تجاوز از سرعت مقرره">1. تجاوز از سرعت مقرره</option>
                                    <option value="عدم توجه به جلو">2. عدم توجه به جلو</option>
                                    <option value="تغییر مسیر ناگهانی">3. تغییر مسیر ناگهانی</option>
                                    <option value="نقض ماده 4 قانون ایمنی راه ها">4. نقض ماده 4 قانون ایمنی راه ها</option>
                                    <option value="نقص فنی مستمر وسیله نقلیه">5. نقص فنی مستمر وسیله نقلیه</option>
                                    <option value="حرکت در خلاف جهت">6. حرکت در خلاف جهت</option>
                                    <option value="عبور از محل ممنوع">7. عبور از محل ممنوع</option>
                                    <option value="انحراف به چپ">8. انحراف به چپ</option>
                                    <option value="عدم رعایت حق تقدم">9. عدم رعایت حق تقدم</option>
                                    <option value="عدم توانایی در کنترل نقلیه">10. ناتوانی در کنترل وسیله نقلیه</option>
                                    <option value="عدم رعایت فاصله طولی">11. عدم رعایت فاصله طولی</option>
                                    <option value="سایر علل">12. سایر علل</option>
                                </select>
                            </div>
                        </div>
                        <hr />
                        <div class="form-group" style="padding-right: 5px">وسیله نقلیه باری</div>
                        <div class="form-group">
                            <input type="radio" name="rdoDangerousMaterials" id="rdoIsDangerousMaterials" value="DangerousMaterials" />
                            <label for="rdoIsDangerousMaterials">حامل مواد سوختنی و خطرناک</label>
                        </div>
                        <div class="form-group">
                            <input type="radio" name="rdoDangerousMaterials" id="rdoDangerousMaterialsAll" value="All" checked="checked" />
                            <label for="rdoDangerousMaterialsAll">همه</label>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn-back-to-normal-filter" id="btnBackToNormalFilter"><span>بازگشت به فیلترهای ساده</span>&nbsp;<i class="fa fa-arrow-left yellow"></i></button>
                <div class="form-group"></div>
                <br />
            </div>
        </div>

        <input type="hidden" id="hidPopulation" runat="server" clientidmode="Static" />
        <input type="hidden" id="hidAreaNumber" runat="server" clientidmode="Static" />
        <div class="d-table-cell align-items-top" style="height: 600px; width: 1129px">
            <%--<div class="align-items-top">
                <div class="filter-parent">
                    <div class="filter active">
                        <div><i class="fa fa-filter fa-2x"></i></div>
                    </div>
                </div>
            </div>--%>

            <div class="map-left-panel">
                <div id="map" class="map" style="height: 600px"></div>
                <div id="divShowDetails" style="display: none"></div>
                <script src="/Scripts/jsSafetyIndexMapHelper.js?n=14010530"></script>
                <link href="/App_Themes/jquery.md.bootstrap.datetimepicker.style.css?n=14010321" rel="stylesheet" />
                <script src="/Scripts/jquery.md.bootstrap.datetimepicker.js?n=14010321"></script>
                <div class="dashboard-left" style="height: 600px">
                    <div class="hide-left-panel"><i class="fa fa-angle-double-right fa-2x"></i></div>
                    <br />
                    <div class="map-zoom">
                        <div class="map-plus" id="divZoomIn" title="بزرگنمایی"><i class="fa fa-plus"></i></div>
                        <div class="map-minus" id="divZoomOut" title="کوچکنمایی"><i class="fa fa-minus"></i></div>
                    </div>
                    <div class="map-detail map-my-loc" id="divMyLocatoin" title="لوکیشن فعلی"><i class="fa fa-crosshairs"></i></div>
                    <div class="map-detail map-compass hide" id="divCompass" title="نامشخص"><i class="fa fa-compass"></i></div>
                    <div class="row" id="divAccidentHeatRange">
                        <div class="row">
                            <div class="col-12 text-center">
                                <p id="divMaxIndex" class="badge bg-danger">تراکم زیاد</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-5" id="arrow-precent">
                            </div>
                            <div class="col-7 text-center">
                                <div class="left-panel-color-safety-index"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 text-center mt-3">
                                <p id="divMinIndex" class="badge bg-success">تراکم کم</p>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 15px">
                        <span class="wordwrap" id="spnTitleOfTypeReport">تصادف بر نفر</span><br />
                    </div>
                    <div style="margin-right: 10px; margin-top: 100px; display: none" id="divAccidentPower">
                        <div class="wordwrap">شدت تصادف</div>
                        <div class="map-detail-title">
                            <div class="in-map-boxed-color map-dead-help" title="فوتی">فوتی</div>
                        </div>
                        <div class="map-detail-title">
                            <div class="in-map-boxed-color map-jarhi-help" title="جرحی">جرحی</div>
                        </div>
                        <div class="map-detail-title">
                            <div class="in-map-boxed-color map-khesarati-help" title="خسارتی">خسارتی</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div id="lblMessage"></div>
</asp:Content>
