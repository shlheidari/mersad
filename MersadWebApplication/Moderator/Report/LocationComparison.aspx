<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="LocationComparison.aspx.cs" Inherits="MersadWebApplication.Moderator.Report.LocationComparison" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">
    <style>
        .myDivIcon {
            text-align: center;
            line-height: 20px;
        }

        .admin-after-head, .chart-view {
            display: block;
        }

        .btn-check:active + .btn-secondary, .btn-check:checked + .btn-secondary, .btn-secondary.active, .btn-secondary:active, .show > .btn-secondary.dropdown-toggle {
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

        hr {
            margin: .5rem 0;
        }
    </style>
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
    <script src="/Scripts/leaflet/leaflet-canvasicon.js"></script>
    <script src="/Scripts/leaflet/leaflet-piechart.js"></script>
    <script src="/Scripts/leaflet/leaflet.ajax.min.js"></script>
    <script src="/Scripts/leaflet/leaflet-transparency.js"></script>
    <link href="/App_Themes/loading-bar.min.css" rel="stylesheet" />
    <script src="/Scripts/loading-bar.min.js"></script>
    <script src="/Scripts/jsModalHelper.js?n=14010321"></script>
    <script src="/Scripts/jquery-3.7.1.min.js"></script>
    <link href="/App_Themes/select2.min.css?n=14010321" rel="stylesheet" />
    <script src="/Scripts/select2.min.js"></script>
    <script src="/Scripts/bootstrap.min.js"></script>
    <link href="/App_Themes/jquery-ui.css" rel="stylesheet" />
    <script src="/Scripts/jquery-ui.js"></script>
    <script src="/Scripts/highcharts.js"></script>
    <script src="/Scripts/highcharts-more.js"></script>
</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <script>
        $(document).ready(function () {
            var wid = window.innerWidth - 230;
            var heigh = window.innerHeight - 185;

            $("#mainContainer").css({ "width": wid, "height": heigh });
            //var widforf = wid / 2.5;
            $("#f").css({ "height": heigh });
            $("#divNormalFilter").css({ "height": heigh + 20 });
            $("#divNormalFilterX").css({ "height": heigh - 40 });
            $("#contains").css({ "height": heigh, "width": wid });
            $("#contains1").css({ "height": heigh, "width": wid });
            $("#contains1_1").css({ "height": heigh - 20 });
            $("#scroll-line-chart").css({ "height": "500" });
            $("#highcharts-omgbeh1-0").css({ "height": heigh - 20 });
            $(".highcharts-background").css({ "height": heigh - 20 });

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
        <div id="divNormalFilter" class="admin-right-panel" style="float: right;">
            <div class="panel-head">
                فیلترها<span class="spinner-border text-warning" role="status" style="display: none" id="spinSearchLoading">
                    <span class="sr-only">Loading...</span>
                </span>
            </div>
            <hr />
            <div id="divNormalFilterX" style="display: block; overflow-y: auto; direction: ltr;">
                <div style="direction: rtl;">
                    <div class="form-group">
                        <div class="white-box">
                            <div style="padding-right: 5px">مقایسه مکانی</div>
                            <hr />
                            <div class="form-group">
                                <div class="cmb-type-chart-time-comp" id="cmbChartLocComp"><span id="spnChartTitleCompTitle">نوع نمودار</span><i class="fas fa-angle-down yellow" style="float: left"></i></div>
                                <div class="div-type-chart-time-comp" id="divChartLocComp" style="z-index: 99999">
                                    <hr />
                                    <div class="row">
                                        <div class="col-6" style="border-left: 1px solid #787878;">
                                            <div><i class="fal fa-exclamation-triangle"></i><span>شدت تصادف : </span></div>
                                            <div class="first-pad-right-radio">
                                                <input type="radio" name="rdoAccident" id="rdoAccidentStatistics" value="AccidentStatistics" />
                                                <label for="rdoAccidentStatistics">سهم خسارتی / جرحی / فوتی</label>
                                                <hr />
                                                <input type="radio" name="rdoAccident" id="rdoAccidentDeceased" value="AccidentDeceased" />
                                                <label for="rdoAccidentDeceased">نرخ متوفیان تصادف</label>
                                                <hr />
                                                <div><i class="fa fa-road"></i><span>محل تصادف : </span></div>
                                                <div class="first-pad-right-radio">
                                                    <input type="radio" name="rdoAccident" id="rdoTypeRoad" value="TypeRoad" />
                                                    <label for="rdoTypeRoad">نوع راه</label>
                                                    <hr />
                                                    <input type="radio" name="rdoAccident" id="rdoLocationLandUse" value="LocationLandUse" />
                                                    <label for="rdoLocationLandUse">کاربری محل</label>
                                                    <hr />
                                                    <input type="radio" name="rdoAccident" id="rdoVisualObstruction" value="VisualObstruction" />
                                                    <label for="rdoVisualObstruction">موانع دید</label>
                                                    <hr />
                                                    <input type="radio" name="rdoAccident" id="rdoRoadDefects" value="RoadDefects" />
                                                    <label for="rdoRoadDefects">نقایص موثر راه</label>
                                                </div>
                                            </div>

                                            <hr />
                                            <div><i class="fa fa-history"></i><span>زمان تصادف : </span></div>
                                            <div class="first-pad-right-radio">
                                                <input type="radio" name="rdoAccident" id="rdoLightingStatus" value="LightingStatus" />
                                                <label for="rdoLightingStatus">وضعیت روشنایی</label>
                                                <hr />
                                                <input type="radio" name="rdoAccident" id="rdoHolidays" value="Holidays" />
                                                <label for="rdoHolidays">روزهای تعطیل</label>
                                            </div>
                                            <hr />
                                            <div><i class="fa fa-tasks"></i><span>مشخصات تصادف : </span></div>
                                            <div class="first-pad-right-child-radio">
                                                <input type="radio" name="rdoAccident" id="rdoTypeOfCollision" value="TypeOfCollision" />
                                                <label for="rdoTypeOfCollision">نحوه و نوع برخورد</label>
                                                <hr />
                                                <div class="first-pad-right-radio">
                                                    <input type="radio" name="rdoAccident" id="rdoSingleVehicle" value="SingleVehicle" />
                                                    <label for="rdoSingleVehicle">تک وسیله ای</label>
                                                    <hr />
                                                    <input type="radio" name="rdoAccident" id="rdoTwoVehicle" value="TwoVehicle" />
                                                    <label for="rdoTwoVehicle">دو وسیله ای</label>
                                                </div>
                                                <hr />
                                                <input type="radio" name="rdoAccident" id="rdoWeather" value="Weather" />
                                                <label for="rdoWeather">شرایط جوی</label>
                                                <hr />
                                                <input type="radio" name="rdoAccident" id="rdoTransferMethod" value="TransferMethod" />
                                                <label for="rdoTransferMethod">نحوه انتقال مجروح</label>
                                                <hr />
                                                <input type="radio" name="rdoAccident" id="rdoTypeAccidentCausingOffense" value="CodeCausing" />
                                                <label for="rdoTypeAccidentCausingOffense">نوع تخلف حادثه ساز</label>
                                            </div>
                                        </div>
                                        <div class="col-6" style="padding-right: 5px">
                                            <div><i class="fa fa-car-bus"></i><span>وسایل نقلیه : </span></div>
                                            <div class="first-pad-right-radio">
                                                <input type="radio" name="rdoAccident" id="rdoLoadType" value="LoadType" />
                                                <label for="rdoLoadType">نوع بار</label>
                                                <hr />
                                                <span>نوع وسایل نقلیه / کاربر : </span>
                                                <div class="first-pad-right-child-radio">
                                                    <input type="radio" name="rdoAccident" id="rdoCar" value="Car" />
                                                    <label for="rdoCar">خودرو سواری</label>
                                                    <hr />
                                                    <input type="radio" name="rdoAccident" id="rdoMotorcycle" value="Motorcycle" />
                                                    <label for="rdoMotorcycle">موتور سیکلت</label>
                                                    <hr />
                                                    <input type="radio" name="rdoAccident" id="rdoPedestrian" value="Pedestrian" />
                                                    <label for="rdoPedestrian">عابر پیاده</label>
                                                    <hr />
                                                    <input type="radio" name="rdoAccident" id="rdoNavyBar" value="NavyBar" />
                                                    <label for="rdoNavyBar">ناوگان باری</label>
                                                    <hr />
                                                    <input type="radio" name="rdoAccident" id="rdoNavyPassenger" value="NavyPassenger" />
                                                    <label for="rdoNavyPassenger">ناوگان مسافربری</label>
                                                </div>
                                            </div>
                                            <hr />
                                            <div><i class="fas fa-users"></i><span>کاربران : </span></div>
                                            <div class="first-pad-right-radio">
                                                <input type="radio" name="rdoAccident" id="rdoCulprit" value="Culprit" />
                                                <label for="rdoCulprit">بومی / غیر بومی</label>
                                                <hr />
                                                <input type="radio" name="rdoAccident" id="rdoAgePedestrian" value="PedestrianAge" />
                                                <label for="rdoAgePedestrian">سن عابران</label>
                                                <hr />
                                                <input type="radio" name="rdoAccident" id="rdoAgeMotorcycleDriver" value="MotorAge" />
                                                <label for="rdoAgeMotorcycleDriver">سن راکب موتور سیکلت</label>
                                                <hr />
                                                <input type="radio" name="rdoAccident" id="rdoSafetyBelt" value="SafetyBelt" />
                                                <label for="rdoSafetyBelt">کمربند ایمنی</label>
                                                <hr />
                                                <input type="radio" name="rdoAccident" id="rdoHelmet" value="Helmet" />
                                                <label for="rdoHelmet">کلاه ایمنی</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="form-group">
                                <div style="padding-right: 5px">مرتب سازی</div>
                                <hr />
                                <div id="divAccidentStatistics" class="getByClass hide">
                                    <input type="radio" name="rdoFilAccidentStatistics" id="rdoFilterDead" value="FilterDead" />
                                    <label for="rdoFilterDead">فوتی</label>
                                    <br />
                                    <input type="radio" name="rdoFilAccidentStatistics" id="rdoFilterInjured" value="FilterInjured" />
                                    <label for="rdoFilterInjured">جرحی</label>
                                    <br />
                                    <input type="radio" name="rdoFilAccidentStatistics" id="rdoFilterDamaged" value="FilterDamaged" />
                                    <label for="rdoFilterDamaged">خسارتی</label>
                                    <br />
                                    <input type="radio" name="rdoFilAccidentStatistics" id="rdoFilAccidentStatisticsWithAll" value="All" checked="checked" />
                                    <label for="rdoFilAccidentStatisticsWithAll">همه</label>
                                </div>
                                <div id="divTypeRoad" class="getByClass hide">
                                    <input type="radio" name="rdoFilTypeRoad" id="rdoFilterVillage" value="FilterVillage" />
                                    <label for="rdoFilterVillage">روستایی</label>
                                    <br />
                                    <input type="radio" name="rdoFilTypeRoad" id="rdoFilterSubsidiary" value="FilterSubsidiary" />
                                    <label for="rdoFilterSubsidiary">فرعی</label>
                                    <br />
                                    <input type="radio" name="rdoFilTypeRoad" id="rdoFilterMain" value="FilterMain" />
                                    <label for="rdoFilterMain">اصلی</label>
                                    <br />
                                    <input type="radio" name="rdoFilTypeRoad" id="rdoFilTypeRoadWithAll" value="All" checked="checked" />
                                    <label for="rdoFilTypeRoadWithAll">همه</label>
                                </div>
                                <div id="divLocationLandUse" class="getByClass hide">
                                    <input type="radio" name="rdoFilLocationLandUse" id="rdoFilterResidential" value="FilterResidential" />
                                    <label for="rdoFilterResidential">مسکونی</label>
                                    <br />
                                    <input type="radio" name="rdoFilLocationLandUse" id="rdoFilterNonResidential" value="FilterNonResidential" />
                                    <label for="rdoFilterNonResidential">غیرمسکونی</label>
                                    <br />
                                    <input type="radio" name="rdoFilLocationLandUse" id="rdoFilLocationLandUseWithAll" value="All" checked="checked" />
                                    <label for="rdoFilLocationLandUseWithAll">همه</label>
                                </div>
                                <div id="divVisualObstruction" class="getByClass hide">
                                    <input type="radio" name="rdoFilVisualObstruction" id="rdoFilterHasObstruction" value="FilterHasObstruction" />
                                    <label for="rdoFilterHasObstruction">دارد</label>
                                    <br />
                                    <input type="radio" name="rdoFilVisualObstruction" id="rdoFilterHasNotObstruction" value="FilterHasNotObstruction" />
                                    <label for="rdoFilterHasNotObstruction">ندارد</label>
                                    <br />
                                    <input type="radio" name="rdoFilVisualObstruction" id="rdoFilVisualObstructionWithAll" value="All" checked="checked" />
                                    <label for="rdoFilVisualObstructionWithAll">همه</label>
                                </div>
                                <div id="divRoadDefects" class="getByClass hide">
                                    <input type="radio" name="rdoFilRoadDefects" id="rdoFilterHasRoadDefects" value="FilterHasRoadDefects" />
                                    <label for="rdoFilterHasRoadDefects">دارد</label>
                                    <br />
                                    <input type="radio" name="rdoFilRoadDefects" id="rdoFilterHasNotRoadDefects" value="FilterHasNotRoadDefects" />
                                    <label for="rdoFilterHasNotRoadDefects">ندارد</label>
                                    <br />
                                    <input type="radio" name="rdoFilRoadDefects" id="rdoFilRoadDefectsWithAll" value="All" checked="checked" />
                                    <label for="rdoFilRoadDefectsWithAll">همه</label>
                                </div>
                                <div id="divCollision" class="getByClass hide">
                                    <input type="radio" name="rdoCollision" id="rdoCollisionOther" value="CollisionOther" />
                                    <label for="rdoCollisionOther">سایر</label>
                                    <br />
                                    <input type="radio" name="rdoCollision" id="rdoCollisionMultiAccident" value="MultiAccident" />
                                    <label for="rdoCollisionMultiAccident">برخورد چند وسیله</label>
                                    <br />
                                    <input type="radio" name="rdoCollision" id="rdoCollisionWithMotor" value="WithMotor" />
                                    <label for="rdoCollisionWithMotor">وسیله نقلیه با موتورسیکلت</label>
                                    <br />
                                    <input type="radio" name="rdoCollision" id="rdoCollisionSingleVehicle" value="SingleVehicle" />
                                    <label for="rdoCollisionSingleVehicle">تک وسیله ای</label>
                                    <br />
                                    <input type="radio" name="rdoCollision" id="rdoCollisionTwoVehicle" value="TwoVehicle" />
                                    <label for="rdoCollisionTwoVehicle">دو وسیله ای</label>
                                    <br />
                                    <input type="radio" name="rdoCollision" id="rdoCollisionWithPedestrian" value="WithPedestrian" />
                                    <label for="rdoCollisionWithPedestrian">وسیله نقلیه با عابر</label>
                                    <br />
                                    <input type="radio" name="rdoCollision" id="rdoCollisionWithAll" value="All" checked="checked" />
                                    <label for="rdoCollisionWithAll">همه</label>
                                </div>
                                <div id="divCollisionSingleVehicle" class="getByClass hide">
                                    <input type="radio" name="rdoCollSingleVehicle" id="rdoOutOfRoad" value="OutOfRoad" />
                                    <label for="rdoOutOfRoad">خروج از جاده</label>
                                    <br />
                                    <input type="radio" name="rdoCollSingleVehicle" id="rdoOverthrowFall" value="OverthrowFall" />
                                    <label for="rdoOverthrowFall">واژگونی و سقوط</label>
                                    <br />
                                    <input type="radio" name="rdoCollSingleVehicle" id="rdoCrashWithFixedObject" value="CrashWithFixedObject" />
                                    <label for="rdoCrashWithFixedObject">برخورد با شی ثابت</label>
                                    <br />
                                    <input type="radio" name="rdoCollSingleVehicle" id="rdoCrashWithAll" value="All" checked="checked" />
                                    <label for="rdoCrashWithAll">همه</label>
                                </div>
                                <div id="divCollisionTwoVehicle" class="getByClass hide">
                                    <input type="radio" name="rdoCollTwoVehicle" id="rdoRearEnd" value="RearEnd" />
                                    <label for="rdoRearEnd">جلو به عقب</label>
                                    <br />
                                    <input type="radio" name="rdoCollTwoVehicle" id="rdoAngle" value="Angle" />
                                    <label for="rdoAngle">زاویه‌ای</label>
                                    <br />
                                    <input type="radio" name="rdoCollTwoVehicle" id="rdoHeadOn" value="HeadOn" />
                                    <label for="rdoHeadOn">رخ به رخ</label>
                                    <br />
                                    <input type="radio" name="rdoCollTwoVehicle" id="rdoSidewipeSd" value="SidewipeSd" />
                                    <label for="rdoSidewipeSd">پهلو به پهلو هم جهت</label>
                                    <br />
                                    <input type="radio" name="rdoCollTwoVehicle" id="rdoSidewipeOd" value="SidewipeOd" />
                                    <label for="rdoSidewipeOd">پهلو به پهلو غیر هم جهت</label>
                                    <br />
                                    <input type="radio" name="rdoCollTwoVehicle" id="rdoTwoVehicleAll" value="All" checked="checked" />
                                    <label for="rdoTwoVehicleAll">همه</label>
                                </div>
                                <div id="divWeather" class="getByClass row hide">
                                    <div class="col-6">
                                        <input type="radio" name="rdoWeather" id="rdoWeatherRainy" value="Rainy" />
                                        <label for="rdoWeatherRainy">بارانی</label>
                                        <br />
                                        <input type="radio" name="rdoWeather" id="rdoWeatherClear" value="Clear" />
                                        <label for="rdoWeatherClear">صاف</label>
                                        <br />
                                        <input type="radio" name="rdoWeather" id="rdoWeatherDust" value="Dust" />
                                        <label for="rdoWeatherDust">غبار آلود</label>
                                        <br />
                                        <input type="radio" name="rdoWeather" id="rdoWeatherStormy" value="Stormy" />
                                        <label for="rdoWeatherStormy">طوفانی</label>
                                        <br />
                                    </div>
                                    <div class="col-6">
                                        <input type="radio" name="rdoWeather" id="rdoWeatherFoggy" value="Foggy" />
                                        <label for="rdoWeatherFoggy">مه آلود</label>
                                        <br />
                                        <input type="radio" name="rdoWeather" id="rdoWeatherSnowy" value="Snowy" />
                                        <label for="rdoWeatherSnowy">برفی</label>
                                        <br />
                                        <input type="radio" name="rdoWeather" id="rdoWeatherCloudy" value="Cloudy" />
                                        <label for="rdoWeatherCloudy">ابری</label>
                                        <br />
                                        <input type="radio" name="rdoWeather" id="rdoWeatherAll" value="All" checked="checked" />
                                        <label for="rdoWeatherAll">همه</label>
                                    </div>
                                </div>
                                <div id="divTransferMethod" class="getByClass hide">
                                    <input type="radio" name="rdoTransferMethod" id="rdoAmbulance" value="Ambulance" />
                                    <label for="rdoAmbulance">آمبولانس</label>
                                    <br />
                                    <input type="radio" name="rdoTransferMethod" id="rdoPassingCar" value="PassingCar" />
                                    <label for="rdoPassingCar">خودرو عبوری</label>
                                    <br />
                                    <input type="radio" name="rdoTransferMethod" id="rdoHelicopter" value="Helicopter" />
                                    <label for="rdoHelicopter">چرخبال</label>
                                    <br />
                                    <input type="radio" name="rdoTransferMethod" id="rdoPolice" value="Police" />
                                    <label for="rdoPolice">پلیس</label>
                                    <br />
                                    <input type="radio" name="rdoTransferMethod" id="rdoOther" value="Other" />
                                    <label for="rdoOther">سایر</label>
                                    <br />
                                    <input type="radio" name="rdoTransferMethod" id="rdoTransferMethodAll" value="All" checked="checked" />
                                    <label for="rdoTransferMethodAll">همه</label>
                                </div>
                                <div id="divCodeCausingAccident" class="getByClass hide">
                                    <input type="radio" name="rdoCodeCausingAccident" id="rdoExceedingSpeedsOver30" value="ExceedingSpeedsOver30" />
                                    <label for="rdoExceedingSpeedsOver30">تجاوز از سرعت 30 تا 50 کیلومتر</label>
                                    <br />
                                    <input type="radio" name="rdoCodeCausingAccident" id="rdoExceedingSpeedsOver50" value="ExceedingSpeedsOver50" />
                                    <label for="rdoExceedingSpeedsOver50">تجاوز از سرعت 50 کیلومتر</label>
                                    <br />
                                    <input type="radio" name="rdoCodeCausingAccident" id="rdoDrivingWhileDrunk" value="DrivingWhileDrunk" />
                                    <label for="rdoDrivingWhileDrunk">رانندگی در حالت مستی، مصرف مخدر و...‌</label>
                                    <br />
                                    <input type="radio" name="rdoCodeCausingAccident" id="rdoIllegalOvertaking" value="IllegalOvertaking" />
                                    <label for="rdoIllegalOvertaking">سبقت غیرمجاز</label>
                                    <br />
                                    <input type="radio" name="rdoCodeCausingAccident" id="rdoCrossRedLight" value="CrossRedLight" />
                                    <label for="rdoCrossRedLight">عبور از چراغ قرمز</label>
                                    <br />
                                    <input type="radio" name="rdoCodeCausingAccident" id="rdoCodeCausingOther" value="Other" />
                                    <label for="rdoCodeCausingOther">سایر</label>
                                    <br />
                                    <input type="radio" name="rdoCodeCausingAccident" id="rdoCodeCausingAll" value="All" checked="checked" />
                                    <label for="rdoCodeCausingAll">همه</label>
                                </div>
                                <div id="divLoadType" class="getByClass hide">
                                    <input type="radio" name="rdoLoadType" id="rdoDangerous" value="Dangerous" />
                                    <label for="rdoDangerous">خطرناک</label>
                                    <br />
                                    <input type="radio" name="rdoLoadType" id="rdoFuel" value="Fuel" />
                                    <label for="rdoFuel">سوختنی</label>
                                    <br />
                                    <input type="radio" name="rdoLoadType" id="rdoLoadTypeOther" value="Other" />
                                    <label for="rdoLoadTypeOther">سایر</label>
                                    <br />
                                    <input type="radio" name="rdoLoadType" id="rdoLoadTypeAll" value="All" checked="checked" />
                                    <label for="rdoLoadTypeAll">همه</label>
                                </div>
                                <div id="divExistsNotExists" class="getByClass hide">
                                    <input type="radio" name="rdoExistsNotExists" id="rdoExists" value="Exists" />
                                    <label for="rdoExists">وجود دارد</label>
                                    <br />
                                    <input type="radio" name="rdoExistsNotExists" id="rdoNotExists" value="NotExists" />
                                    <label for="rdoNotExists">وجود ندارد</label>
                                    <br />
                                    <input type="radio" name="rdoExistsNotExists" id="rdoExistsNotExistsAll" value="All" checked="checked" />
                                    <label for="rdoExistsNotExistsAll">همه</label>
                                </div>
                                <div id="divNativeNonNative" class="getByClass hide">
                                    <input type="radio" name="rdoIsLocal" id="rdoNativeLicensePlate" value="NativeLicensePlate" />
                                    <label for="rdoNativeLicensePlate">پلاک بومی</label>
                                    <br />
                                    <input type="radio" name="rdoIsLocal" id="rdoNonNativeLicensePlate" value="NonNativeLicensePlate" />
                                    <label for="rdoNonNativeLicensePlate">پلاک غیر بومی</label>
                                    <br />
                                    <input type="radio" name="rdoIsLocal" id="rdoNativeNonNativeAll" value="All" checked="checked" />
                                    <label for="rdoNativeNonNativeAll">همه</label>
                                </div>
                                <div id="divPedestrianAge" class="getByClass hide">
                                    <input type="radio" name="rdoAgePedestrian" id="rdoPedestrianAge0" value="PedestrianAge0" />
                                    <label for="rdoPedestrianAge0">از 0 تا 6 سال</label>
                                    <br />
                                    <input type="radio" name="rdoAgePedestrian" id="rdoPedestrianAge6" value="PedestrianAge6" />
                                    <label for="rdoPedestrianAge6">از 6 تا 12</label>
                                    <br />
                                    <input type="radio" name="rdoAgePedestrian" id="rdoPedestrianAge12" value="PedestrianAge12" />
                                    <label for="rdoPedestrianAge12">از 12 تا 18‌</label>
                                    <br />
                                    <input type="radio" name="rdoAgePedestrian" id="rdoPedestrianAge18" value="PedestrianAge18" />
                                    <label for="rdoPedestrianAge18">از 18 تا 60</label>
                                    <br />
                                    <input type="radio" name="rdoAgePedestrian" id="rdoPedestrianAge60" value="PedestrianAge60" />
                                    <label for="rdoPedestrianAge60">بالاتر از 60</label>
                                    <br />
                                    <input type="radio" name="rdoAgePedestrian" id="rdoAgePedestrianAll" value="All" checked="checked" />
                                    <label for="rdoAgePedestrianAll">همه</label>
                                </div>
                                <div id="divMotorAge" class="getByClass hide">
                                    <input type="radio" name="rdoMotorAge" id="rdoLessThan18" value="LessThan18" />
                                    <label for="rdoLessThan18">کمتر از 18</label>
                                    <br />
                                    <input type="radio" name="rdoMotorAge" id="rdoMotorAge18" value="MotorAge18" />
                                    <label for="rdoMotorAge18">از 18 تا 30</label>
                                    <br />
                                    <input type="radio" name="rdoMotorAge" id="rdoMotorAge30" value="MotorAge30" />
                                    <label for="rdoMotorAge30">از 30 تا 60‌</label>
                                    <br />
                                    <input type="radio" name="rdoMotorAge" id="rdoMotorAge60" value="MotorAge60" />
                                    <label for="rdoMotorAge60">بالاتر از 60</label>
                                    <br />
                                    <input type="radio" name="rdoMotorAge" id="rdoMotorAgeAll" value="All" checked="checked" />
                                    <label for="rdoMotorAgeAll">همه</label>
                                </div>
                                <div id="divSafetyBelt" class="getByClass hide">
                                    <input type="radio" name="rdoSafetyBelt" id="rdoUseBelt" value="UseBelt" />
                                    <label for="rdoUseBelt">استفاده از کمربند</label>
                                    <br />
                                    <input type="radio" name="rdoSafetyBelt" id="rdoNonUseBelt" value="NonUseBelt" />
                                    <label for="rdoNonUseBelt">عدم استفاده از کمربند</label>
                                    <br />
                                    <input type="radio" name="rdoSafetyBelt" id="rdoSafetyBeltAll" value="All" checked="checked" />
                                    <label for="rdoSafetyBeltAll">همه</label>
                                </div>
                                <div id="divHelmet" class="getByClass hide">
                                    <input type="radio" name="rdoHelmet" id="rdoUseHelmet" value="UseHelmet" />
                                    <label for="rdoUseHelmet">استفاده از کلاه ایمنی</label>
                                    <br />
                                    <input type="radio" name="rdoHelmet" id="rdoNonUseHelmet" value="NonUseHelmet" />
                                    <label for="rdoNonUseHelmet">عدم استفاده از کلاه ایمنی</label>
                                    <br />
                                    <input type="radio" name="rdoHelmet" id="rdoHelmetAll" value="All" checked="checked" />
                                    <label for="rdoHelmetAll">همه</label>
                                </div>
                                <div id="divLightingStatus" class="getByClass hide">
                                    <input type="radio" name="rdoLightingStatus" id="rdoLightingStatusDay" value="Day" />
                                    <label for="rdoLightingStatusDay">روز</label>
                                    <br />
                                    <input type="radio" name="rdoLightingStatus" id="rdoLightingStatusRise" value="Rise" />
                                    <label for="rdoLightingStatusRise">طلوع</label>
                                    <br />
                                    <input type="radio" name="rdoLightingStatus" id="rdoLightingStatusSunset" value="Sunset" />
                                    <label for="rdoLightingStatusSunset">غروب</label>
                                    <br />
                                    <input type="radio" name="rdoLightingStatus" id="rdoLightingStatusWithLight" value="StatusWithLight" />
                                    <label for="rdoLightingStatusWithLight">شب با روشنایی کافی</label>
                                    <br />
                                    <input type="radio" name="rdoLightingStatus" id="rdoLightingStatusWithOutLight" value="StatusWithOutLight" />
                                    <label for="rdoLightingStatusWithOutLight">شب بدون روشنایی کافی</label>
                                    <br />
                                    <input type="radio" name="rdoLightingStatus" id="rdoStatusLightAll" value="All" checked="checked" />
                                    <label for="rdoStatusLightAll">همه</label>
                                </div>
                                <div id="divHolidays" class="getByClass hide">
                                    <input type="radio" name="rdoGetHoliday" id="rdoIsHolidays" value="Holidays" />
                                    <label for="rdoIsHolidays">تعطیل</label>
                                    <br />
                                    <input type="radio" name="rdoGetHoliday" id="rdoNonHolidays" value="NonHolidays" />
                                    <label for="rdoNonHolidays">غیر تعطیل</label>
                                    <br />
                                    <input type="radio" name="rdoGetHoliday" id="rdoHolidaysAll" value="All" checked="checked" />
                                    <label for="rdoHolidaysAll">همه</label>
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
                            <div style="padding-right: 5px">محدوده مکانی</div>
                            <hr />
                            <div class="form-group">
                                <select runat="server" id="cmbProvinceSearch" clientidmode="Static" class="w-100"></select>
                                <br />
                            </div>
                            <input type="radio" id="rdoCity" name="rdoLocation" value="City">
                            <label for="rdoCity">شهرستان</label><br>
                            <div class="form-group" id="divCity" style="display: none">
                                <select id="cmbCity" class="w-100" style="width: 100%">
                                    <option value="-1" selected>انتخاب شهرستان</option>
                                </select>
                                <br />
                            </div>
                            <div class="form-group" id="divInNativeArea"  >
                                <select id="cmbInNativeArea">
                                    <option selected="" value="-1">حوزه نفوذ</option>
                                    <option value="true">درون‌ شهری</option>
                                    <option value="false">برون ‌شهری</option>
                                    <option value="-2">همه</option>
                                </select>
                            </div>
                            <input type="radio" id="rdoPoliceStation" name="rdoLocation" value="PoliceStation">
                            <label for="rdoPoliceStation">پاسگاه</label><br>
                            
                            
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
                </div>
            </div>
        </div>
        <script>
            $(document).ready(function () {
                var wid = window.innerWidth - 230;
                var heigh = window.innerHeight - 185;
                var sum = wid / 3;
                sum = sum * 2;
                $("#mainMap").css({ "width": sum, "height": heigh });
                $("#map").css({ "width": sum, "height": heigh });




            });
        </script>
        <div id="mainMap" style="float: right;">
            <div class="d-table-cell chart-panel align-items-top">

                <div id="map" class="map" style="border-radius: 15px;"></div>

                <script src="/Scripts/jsLocationComparisonHelperMap.js?n=14010608"></script>
            </div>
            <div class="d-table-cell chart-panel align-items-top " style="width:500px;">
                <div class="gray-box form-group position-relative" style="overflow-x: auto;width:500px; ">
                    <div style="white-space: normal; text-align: center">
                        <span class="title-chart">مقایسه تصادفات</span>&nbsp;<span class="title-chart" id="spnChartTitleCity">استانهای کشور</span>&nbsp;<span class="title-chart">از نظر</span>&nbsp;<span class="title-chart" id="spnChartTitleFirst"></span>&nbsp;<span class="title-chart" id="spnChartTitleSecond"></span>&nbsp;<span class="title-chart">(مرتب سازی بر اساس تعداد</span>&nbsp;<span class="title-chart" id="spnSortTitle">کل تصادفات</span>)<span class="mersad-info-btn">
                            <%--<i class="fa fa-info-circle"></i>--%>
                        </span>
                    </div>
                    <div class="chart-container" id="scroll-line-chart" style="height: 410px; overflow-x: auto">
                        <div id="divAutoGenerateChart"></div>
                    </div>
                    <div id="chart-container-footer"></div>
                </div>
            </div>
        </div>
        <input type="hidden" id="hidFBcTheGeometry" runat="server" clientidmode="Static" />
        <script src="/Scripts/jsLocationComparisonHelper.js?n=14010608"></script>
        <script src="/Scripts/jsLocationComparisonFilter.js?n=14010608"></script>
        <link href="/App_Themes/jquery.md.bootstrap.datetimepicker.style.css?n=14010321" rel="stylesheet" />
        <script src="/Scripts/jquery.md.bootstrap.datetimepicker.js?n=14010321"></script>
        <div id="lblMessage" runat="server" clientidmode="Static"></div>
    </div>
</asp:Content>
