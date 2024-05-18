<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="MersadWebApplication.Moderator.Dashboard" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">
    <style>
        .myDivIcon {
            text-align: center; /* Horizontally center the text (icon) */
            line-height: 20px; /* Vertically center the text (icon) */
        }
    </style>

    <script src="/Scripts/jsModalHelper.js?n=14000918"></script>
    <script src="/Scripts/jquery-3.7.1.min.js"></script>
    <script>


        $(document).ready(function () {


            var width = (window.innerWidth) - 80;
            var Height = (window.innerHeight) - 115;
            var Height = (window.innerHeight) - 115;

            $(".admin-right-panel").css({ "height": Height });
            $(".map-left-panel").css({ "height": Height });
            $("#map").css({ "height": Height });




        });
    </script>
    <script src="/Scripts/leaflet/leaflet-src.js"></script>
    <%--<script src="/Scripts/leaflet/leaflet-rotate-src.js"></script>--%>
    <link href="/Scripts/leaflet/leaflet.css" rel="stylesheet" />
    <script src="/Scripts/leaflet/Leaflet-draw/Leaflet.draw.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/Leaflet.Draw.Event.js"></script>
    <link rel="stylesheet" href="/Scripts/leaflet/Leaflet-draw/leaflet.draw.css" />
    <script src="/Scripts/leaflet/Leaflet-draw/ext/GeometryUtil.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/ext/LatLngUtil.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/ext/LineUtil.Intersect.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/ext/Polygon.Intersect.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/ext/Polyline.Intersect.js"></script>
    <script src="/Scripts/leaflet/Leaflet-draw/ext/TouchEvents.js"></script>
    <script src="/Scripts/turf.min.js?n=14000918"></script>
    <script src="/Scripts/leaflet/leaflet-geodesy.js"></script>
    <link href="/Scripts/leaflet/leaflet-locatecontrol/L.Control.Locate.css" rel="stylesheet" />
    <script src="/Scripts/leaflet/leaflet-locatecontrol/L.Control.Locate.min.js"></script>
    <link href="/App_Themes/select2.min.css?n=13990707" rel="stylesheet" />
    <script src="/Scripts/select2.min.js"></script>
    <script src="/Scripts/bootstrap.min.js"></script>
</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="body-wrapper">
        <div class="admin-right-panel" style="overflow-y: auto;">
            <div class="panel-head">
                فیلترها<span class="spinner-border text-warning" role="status" style="display: none" id="spinSearchLoading">
                    <span class="sr-only">Loading...</span>
                </span>
           
            </div>
            <hr />
            <div class="form-group">
                <div class="white-box">
                    <div style="padding-right: 5px">وضعیت گزارش</div>
                    <hr />
                    <div class="row form-group">
                        <div class="col-6">
                            <input type="radio" id="rdoAll" name="rdoStatus" value="All" checked="checked">
                            <label for="rdoAll">همه</label>
                        </div>
                        <div class="col-6">
                            <input type="radio" id="rdoWaitForCheck" name="rdoStatus" value="در انتظار بررسی">
                            <label for="rdoWaitForCheck">در انتظار بررسی</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <input type="radio" id="rdoWaitForEdit" name="rdoStatus" value="نیازمند اصلاح">
                            <label for="rdoWaitForEdit">نیازمند اصلاح</label>
                        </div>
                        <div class="col-6">
                            <input type="radio" id="rdoConfirm" name="rdoStatus" value="تایید شده">
                            <label for="rdoConfirm">تایید شده</label>
                        </div>
                    </div>

                </div>
            </div>
            <div class="form-group">
                <div class="white-box">
                    <div style="padding-right: 5px">تاریخ تصادف</div>
                    <hr />
                    <div class="row form-group">
                        <div class="col-6">
                            <input type="radio" id="rdoLast24" name="rdoDate" value="24" checked="checked">
                            <label for="rdoLast24">24 ساعت گذشته</label>
                        </div>
                        <div class="col-6">
                            <input type="radio" id="rdoLastWeek" name="rdoDate" value="7">
                            <label for="rdoLastWeek">هفته گذشته</label>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-6">
                            <input type="radio" id="rdoLastMonth" name="rdoDate" value="30">
                            <label for="rdoLastMonth">ماه گذشته</label>
                        </div>
                        <div class="col-6">
                            <input type="radio" id="rdoYear" name="rdoDate" value="365">
                            <label for="rdoYear">سال گذشته</label>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-6">
                            <input type="radio" id="rdoSelectCalender" name="rdoDate" value="Date">
                            <label for="rdoSelectCalender">انتخاب بازه زمانی</label>
                        </div>
                        <%--<div class="col-6">
                            <input type="radio" id="rdoAllS" name="rdoDate" value="All">
                            <label for="rdoAllS">همه</label>
                        </div>--%>
                    </div>

                    <div id="divShowDate" style="display: none">
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
            <div class="form-group" style="padding-bottom:15px;">
                <div class="white-box">
                    <div style="padding-right: 5px">شدت تصادف</div>
                    <hr />
                    <div class="row form-group">
                        <div class="col-6">
                             <input type="radio" id="rdoInjuredIntensityandDeadIntensity" name="rdoIntensity" value="جرحی وفوتی">
                            <label for="rdoInjuredIntensityandDeadIntensity">جرحی و فوتی</label>
                        </div>
                        <div class="col-6">
                            <input type="radio" id="rdoDeadIntensity" name="rdoIntensity" value="فوتی">
                            <label for="rdoDeadIntensity">تصادفات فوتی</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <input type="radio" id="rdoInjuredIntensity" name="rdoIntensity" value="جرحی">
                            <label for="rdoInjuredIntensity">تصادفات جرحی</label>
                        </div>
                        <div class="col-6">
                            <input type="radio" id="rdoDamageIntensity" name="rdoIntensity" value="خسارتی">
                            <label for="rdoDamageIntensity">تصادفات خسارتی</label>
                        </div>
                    </div>
                     
                </div>

            </div>
             <input id="Button1" type="button" value="جستجو" onclick="Search()" />
            <br />
             

            <br />
               
        </div>
        <input type="hidden" id="hidLocation" runat="server" clientidmode="Static" />
        <input type="hidden" id="hidAccidentLocation" runat="server" clientidmode="Static" />
        <div class="d-table-cell align-items-top">
            <div class="map-left-panel">
                <div id="map" class="map"></div>
                <script src="/Scripts/jsDashboadMapHelper.js?n=14010316"></script>
                <link href="/App_Themes/jquery.md.bootstrap.datetimepicker.style.css?n=14010316" rel="stylesheet" />
                <script src="/Scripts/jquery.md.bootstrap.datetimepicker.js?n=14010316"></script>
                <div class="dashboard-left"  >
                    <div class="hide-left-panel"><i class="fa fa-angle-double-right fa-2x"  style="margin-right:-20px;" ></i></div>
                    <div class="map-zoom">
                        <div class="map-plus" id="divZoomIn" title="بزرگنمایی"><i class="fa fa-plus"></i></div>
                        <div class="map-minus" id="divZoomOut" title="کوچکنمایی"><i class="fa fa-minus"></i></div>
                    </div>
                    <div class="map-detail map-my-loc" id="divMyLocatoin" title="لوکیشن فعلی"><i class="fa fa-crosshairs"></i></div>
                    <div class="map-detail map-compass" id="divCompass" title="شمال">
                        <img style="width: 30px;" src="/Images/compass.png" />
                    </div>
                    <div class="map-detail-title-first" style="margin-top: 30px">
                        <span class="map-detail-caption">تایید<br />
                            نهایی</span><i class="fa fa-caret-left map-detail-left-arr"></i><i class="fa fa-location-dot map-detail-icon" title="تایید نهایی"></i>
                    </div>
                    <div class="map-detail-title-first hide"><span class="map-detail-caption">در انتظار تایید قرارگاه</span><i class="fa fa-caret-left map-detail-left-arr"></i><i class="fa fa-dot-circle map-detail-icon" title="در انتظار تایید قرارگاه"></i></div>
                    <div class="map-detail-title-first">
                        <span class="map-detail-caption">در انتظار<br />
                            تایید<br />
                            پاسگاه</span><i class="fa fa-caret-left map-detail-left-arr"></i><img style="width: 24px; margin-right: 4px" class="blink" src="/Images/incomplete-location-gray.png" title="در انتظار تایید پاسگاه" />
                    </div>
                    <div class="map-detail-title"><span class="map-detail-caption">فوتی</span><i class="fa fa-caret-left map-detail-left-arr"></i><i class="map-cube-help map-dead-help fa-2x map-detail-icon" title="فوتی"></i></div>
                    <div class="map-detail-title"><span class="map-detail-caption">جرحی</span><i class="fa fa-caret-left map-detail-left-arr"></i><i class="map-cube-help map-jarhi-help fa-2x map-detail-icon" title="جرحی"></i></div>
                    <div class="map-detail-title"><span class="map-detail-caption">خسارتی</span><i class="fa fa-caret-left map-detail-left-arr"></i><i class="map-cube-help map-khesarati-help map-detail-icon" title="خسارتی"></i></div>
                    <div class="map-detail-title">
                        <span class="map-detail-caption">در حال<br />
                            تکمیل</span><i class="fa fa-caret-left map-detail-left-arr"></i><i class="map-cube-help map-not-complete-help map-detail-icon" title="در حال تکمیل"></i>
                    </div>
                    <%--<div style="text-align: center; margin-top: 15px">
                        <span>متر 1000</span><br />
                        <i class="line-border"></i>
                    </div>--%>
                </div>
            </div>
        </div>
        <div id="lblMessage" runat="server" clientidmode="Static"></div>
    </div>
</asp:Content>
