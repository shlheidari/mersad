<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="AddAccident.aspx.cs" Inherits="MersadWebApplication.Moderator.Event.AddAccident" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">
    <style>
        .admin-after-head, .event {
            display: block;
        }
    </style>
    <script src="/Scripts/jsHelper.js?n=14010321"></script>
    <script src="/Scripts/jsModalHelper.js?n=14010321"></script>
    <script src="/Scripts/jsToastHelper.js"></script>
    <link href="/App_Themes/bootstrap-clockpicker.min.css" rel="stylesheet" />
    <script src="/Scripts/bootstrap-clockpicker.min.js"></script>
    <link href="/App_Themes/jquery.md.bootstrap.datetimepicker.style.css?n=14010321" rel="stylesheet" />
    <script src="/Scripts/jquery.md.bootstrap.datetimepicker.js?n=14010321"></script>
    
    <script src="/Scripts/jsAccidentHelper.js?n=14010526"></script>
    <script src="/Scripts/jsFsType.js"></script>
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
    <%--<link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
    <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>--%>
    <%--    <link rel="stylesheet" href="https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.css"/>
    <script src="https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.umd.js"></script>--%>
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.js"></script>
    <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js'></script>
    <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css' type='text/css' />
    <link href="/Scripts/leaflet/leaflet-locatecontrol/L.Control.Locate.css" rel="stylesheet" />
    <script src="/Scripts/leaflet/leaflet-locatecontrol/L.Control.Locate.min.js"></script>
    <link href="/App_Themes/dropzone.css" rel="stylesheet" />
    <script src="/Scripts/dropzone-min.js"></script>
    <script src="/Scripts/turf.min.js?n=14000918"></script>
<script src="/Scripts/leaflet/leaflet-geodesy.js"></script>
</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="body-wrapper">
        <div class="admin-right-panel" style="overflow-y: auto; height: 600px">
            <div class="panel-head">ثبت رخداد جدید</div>
            <hr />
            <div id="FirstStep" class="accident-right active"><span>زمان و مکان تصادف</span><i class="fa fa-clock fa-2x"></i></div>
            <%--<div class="accident-right"><span>موقعیت روی نقشه</span><i class="fa fa-map-marker-plus fa-2x"></i></div>--%>
            <div id="SecondStep" class="accident-right"><span>مشخصات تصادف</span><i class="fa fa-circle-exclamation fa-2x"></i></div>
            <div id="ThirdStep" class="accident-right"><span>مشخصات راه و وضعیت جوی</span><i class="fa fa-map-signs fa-2x"></i></div>
            <div id="FourthStep" class="accident-right"><span>علل تصادف</span><i class="fa fa-circle-question fa-2x"></i></div>
            <div id="FifthStep" class="accident-right"><span>افراد و وسایل درگیر در تصادف</span><i class="fa fa-user-group fa-2x"></i></div>
            <div id="SixthStep" class="accident-right"><span>اطلاعات مصدومین و متوفیان</span><i class="fa fa-plus-square fa-2x"></i></div>
            <div id="SeventhStep" class="accident-right"><span>کروکی تصادف</span><i class="fa fa-camera-polaroid fa-2x"></i></div>
        </div>
        <div class="d-table-cell chart-panel align-items-top padding-all">
            <div id="lblToast"></div>
            <div id="divFirstStep" style="width: 1120px">
                <div class="row">
                    <div class="col-3">
                        <div class="form-group row">
                            <label for="txtSerial" class="col-4 col-form-label fa-2x">شماره سریال</label>
                            <div class="col-8 error-parent">
                                <span class="error error-icon" id="spnSerialError" title="لطفا شماره سریال را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input runat="server" clientidmode="Static" type="tel" id="txtSerial" lang="fa-IR" maxlength="32" />
                            </div>
                            <br />
                        </div>
                        <label class="fa-2x">زمان و مکان تصادف</label><span id="spnOpenCommentFirst" style="display: none" onclick="OpenCommentDialog('First')"><i class="fa fa-comment-dots fa-3x fa-flip-horizontal gray"></i></span>
                    </div>
                </div>
                <div class="row ">
                    <div class="col-4">
                        <div class="white-box-shadow height-250">
                            <div class="form-group row">
                                <label for="cmbProvince" class="col-4 col-form-label fa-2x">استان</label>
                                <div class="col-8 error-parent">
                                    <span class="error error-icon" id="spnProvinceError" title="لطفا استان را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <select runat="server" id="cmbProvince" clientidmode="Static" class="w-100"></select>
                                </div>
                                <br />
                                <input type="hidden" runat="server" clientidmode="Static" id="txtLocation" readonly="" />
                            </div>
                            <div class="form-group row zero-margin-bottom">
                                <label for="txtCenterCode" class="col-4 col-form-label">مرکز</label>
                                <div class="col-8 error-parent">
                                    <div class="form-group row">
                                        <div class="col-4 zero-padding-left">
                                            <input runat="server" class="first-input" clientidmode="Static" id="txtCenterCode" maxlength="16" type="number" placeholder="کد مرکز" />
                                        </div>
                                        <div class="col-8 zero-padding-left">
                                            <input runat="server" class="second-input" clientidmode="Static" id="txtCenterName" maxlength="64" type="text" placeholder="نام مرکز" />
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div class="form-group row zero-margin-bottom">
                                <label for="txtRouteCode" class="col-4 col-form-label">راه</label>
                                <div class="col-8 error-parent">
                                    <div class="form-group row">
                                        <div class="col-4 zero-padding-left">
                                            <input runat="server" class="first-input" clientidmode="Static" id="txtRouteCode" maxlength="16" type="text" placeholder="کد راه" />
                                        </div>
                                        <div class="col-8 zero-padding-left">
                                            <input runat="server" class="second-input" clientidmode="Static" id="txtRouteName" maxlength="64" type="text" placeholder="نام راه" />
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div class="form-group row zero-margin-bottom">
                                <label for="txtSegmentCode" class="col-4 col-form-label">قطعه</label>
                                <div class="col-8">
                                    <div class="form-group row">
                                        <div class="col-4 zero-padding-left">
                                            <input runat="server" class="first-input" clientidmode="Static" id="txtSegmentCode" maxlength="16" type="text" placeholder="کد قطعه" />
                                        </div>
                                        <div class="col-8 zero-padding-left">
                                            <input runat="server" class="second-input" clientidmode="Static" id="txtSegmentName" maxlength="64" type="text" placeholder="نام قطعه" />
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div class="form-group row zero-margin-bottom">
                                <label for="txtSpotCode" class="col-4 col-form-label">نقطه</label>
                                <div class="col-8 error-parent">
                                    <div class="form-group row">
                                        <div class="col-4 zero-padding-left">
                                            <input runat="server" class="first-input" clientidmode="Static" id="txtSpotCode" maxlength="16" type="text" placeholder="کد نقطه" />
                                        </div>
                                        <div class="col-8 zero-padding-left">

                                            <input runat="server" class="second-input" clientidmode="Static" id="txtSpotName" maxlength="64" type="text" placeholder="نام نقطه" />
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="white-box-shadow height-250">
                            <div class="form-group row">
                                <label class="col-6 col-form-label">زمان وقوع تصادف</label>
                                <div class="col-6 error-parent">
                                    <div class="clockpicker">
                                        <span class="error error-icon" id="spnTimeOfAccidentError" title="لطفا زمان وقوع تصادف را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" runat="server" clientidmode="Static" id="txtTimeOfAccident" class="input-time" maxlength="5" placeholder="00:00" readonly="" />
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div class="form-group row">
                                <label class="col-6 col-form-label">زمان مطلع شدن پلیس</label>
                                <div class="col-6 error-parent">
                                    <div class="clockpicker">
                                        
                                        <span class="error error-icon" id="spnPoliceAwarenessTimeError" title="لطفا زمانمطلع شدن پلیس را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" runat="server" clientidmode="Static" id="txtPoliceAwarenessTime" class="input-time" maxlength="5" placeholder="00:00" readonly="" />
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div class="form-group row">
                                <label class="col-6 col-form-label">زمان رسیدگی پلیس</label>
                                <div class="col-6 error-parent">
                                    <div class="clockpicker">
                                        <span class="error error-icon" id="spnPoliceArrivalTimeError" title="لطفا زمان رسیدگی پلیس را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" runat="server" clientidmode="Static" id="txtPoliceArrivalTime" class="input-time" maxlength="5" placeholder="00:00" readonly="" />
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div class="form-group row">
                                <label class="col-6 col-form-label">زمان حضور اورژانس</label>
                                <div class="col-6 error-parent">
                                    <div class="clockpicker">
                                        <input type="text" runat="server" clientidmode="Static" id="txtEmsArrivalTime" class="input-time" maxlength="5" placeholder="00:00" readonly="" />
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div class="form-group row">
                                <label class="col-6 col-form-label">زمان حضور امداد</label>
                                <div class="col-6 error-parent">
                                    <div class="clockpicker">
                                        <input type="text" runat="server" clientidmode="Static" id="txtSosArrivalTime" class="input-time" maxlength="5" placeholder="00:00" readonly="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="white-box-shadow">
                            <div class="form-group row">
                                <select id="cmbPoliceAwarenessType" runat="server" clientidmode="Static" class="w-100">
                                    <option selected="" value="-1">نحوه مطلع شدن پلیس</option>
                                    <option value="ایستگاه SOS">1. ایستگاه SOS</option>
                                    <option value="حضوری">2. حضوری</option>
                                    <option value="مرکز110">3. مرکز110</option>
                                    <option value="گشت پلیس">4. گشت پلیس</option>
                                    <option value="مقام قضائی">5. مقام قضائی</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div class="white-box-shadow" style="min-height: 155px">
                            <div class="form-group row">
                                <label class="col-4 col-form-label">تاریخ تصادف</label>
                                <div class="col-8 error-parent">
                                    <div class="left-addon"><span class="error error-icon" id="spnDateOfAccidentError" title="لطفا تاریخ تصادف را وارد کنید"><i style="color: #ff3535" class="fa fa-warning fa-2x"></i></span></div>
                                    <div class="inner-addon left-addon">
                                        <div class="input-group-prepend">
                                            <span style="cursor: pointer; display: none" class="input-group-text" id="dateDateOfAccident"></span>
                                        </div>
                                        <i style="cursor: pointer" class="fa fa-calendar fa-2x"></i>
                                        <input type="text"  id="txtDateOfAccident" runat="server" clientidmode="Static" onfocus="openDateOfAccident()" aria-label="dateDateOfAccident" aria-describedby="dateDateOfAccident" maxlength="10"  />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-4 col-form-label">تاریخ تکمیل</label>
                                <div class="col-8 error-parent">
                                    <div class="left-addon">
                                        <span class="error error-icon" id="spnDateOfFormCompletionError" title="لطفا تاریخ تکمیل را وارد کنید"><i style="color: #ff3535" class="fa fa-warning fa-2x"></i></span>
                                    </div>
                                    <div class="inner-addon left-addon">
                                        <div class="input-group-prepend">
                                            <span style="cursor: pointer; display: none" class="input-group-text" id="dateDateOfFormCompletion"></span>
                                        </div>
                                        <i style="cursor: pointer" class="fa fa-calendar fa-2x"></i>
                                        <input type="text" id="txtDateOfFormCompletion" runat="server" clientidmode="Static" onfocus="openDateOfFormCompletion()" aria-label="dateDateOfFormCompletion" aria-describedby="dateDateOfFormCompletion" maxlength="10" readonly="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="white-box-shadow height-250">
                            <div class="form-group row">
                                <label class="col-12 col-form-label">مختصات جغرافیایی (GPS)</label>
                            </div>
                            <div class="form-group row">
                                <div class="col-12 error-parent">
                                    <span class="error error-icon" id="spnLongitudeError" title="لطفا طول جغرافیایی را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <input type="text" runat="server" clientidmode="Static" id="txtLongitude" style="direction: ltr" class="input-time" maxlength="12" placeholder="x ..... : ..... : ....." />
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-12 error-parent">
                                    <span class="error error-icon" id="spnLatitudeError" title="لطفا عرض جغرافیایی را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <input type="text" runat="server" clientidmode="Static" id="txtLatitude" style="direction: ltr" class="input-time" maxlength="12" placeholder="y ..... : ..... : ....." />
                                </div>
                                <hr />
                            </div>
                            <div class="form-group row">
                                <label for="txtDistanceFromTheOrigin" class="col-5 zero-padding-left col-form-label">فاصله از مبدا</label>
                                <div class="col-4 zero-padding-left">
                                    <input type="number" runat="server" clientidmode="Static" id="txtDistanceFromTheOrigin" class="input-time" min="0" max="10000" placeholder="....." />
                                </div>
                                <label class="col-3 zero-padding-left col-form-label">کیلومتر</label>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-12 text-center">
                        <div id="map" class="map accident-map">
                            <div class="inner-map">
                                <div class="alert alert-dark alert-in-map">
                                    <button type='button' class='close-in-map' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                                    لطفا موقعیت تصادف را روی نقشه انتخاب کنید
                                </div>
                            </div>
                        </div>
                        <script src="/Scripts/jsAccidentMapHelper.js?n=14010321"></script>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <button type='button' id="btnSubmit" class="btn-login" onclick="SaveData()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">ثبت</button>
                        <div class="spinner-border text-warning" role="status" style="display: none" id="spinLoading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="divSecondStep" style="width: 1120px;display: none">
                <label class="fa-2x">مشخصات تصادف</label><span id="spnOpenCommentSecond" style="display: none" onclick="OpenCommentDialog('Second')"><i class="fa fa-comment-dots fa-3x fa-flip-horizontal gray"></i></span>
                <div class="row ">
                    <div class="col-2">
                        <div class="white-box-shadow height-250">
                            <div class="form-group row">
                                <div class="col-12 error-parent">
                                    <span class="error error-icon" id="spnCrashTypeError" title="لطفا نوع تصادف را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <select id="cmbCrashType">
                                        <option selected="" value="-1">نوع تصادف</option>
                                        <option value="فوتی">1. فوتی</option>
                                        <option value="جرحی">2. جرحی</option>
                                        <option value="خسارتی">3. خسارتی</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-12">
                                    <select id="cmbCrashScene">
                                        <option selected="" value="-1">وضعیت صحنه تصادف</option>
                                        <option value="بهم خورده">1. بهم خورده</option>
                                        <option value="حفظ شده">2. حفظ شده</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="white-box-shadow height-250">
                            <div class="row">
                                <div class="col-6">
                                    <div style="font-size: 10px">آیا شاهدی برای تصادف وجود دارد؟</div>
                                    <div style="margin-bottom: 8px;margin-top: 5px; float: left">
                                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" class="btn-check" name="AddingWitness" id="rdoAddingWitnessYes" autocomplete="off" value="Yes" />
                                            <label class="btn btn-outline-warning" for="rdoAddingWitnessYes">بله</label>
                                            <input type="radio" class="btn-check" name="AddingWitness" id="rdoAddingWitnessNo" autocomplete="off" value="No" />
                                            <label class="btn btn-outline-secondary" for="rdoAddingWitnessNo">خیر</label>
                                        </div>
                                    </div>
                                    <select id="cmbAddingWitness" style="margin-top: 5px; display: none">
                                        <%--<option selected="" value="-1">شاهدین تصادف</option>--%>
                                        <option selected="" value="1">1 شاهد برای تصادف وجود دارد + </option>
                                        <option value="2">2 شاهد برای تصادف وجود دارد + </option>
                                        <option value="3">3 شاهد برای تصادف وجود دارد + </option>
                                        <option value="4">4 شاهد برای تصادف وجود دارد + </option>
                                        <option value="5">5 شاهد برای تصادف وجود دارد + </option>
                                    </select>
                                </div>
                                <div class="col-6" id="divWitness" style="display: none">
                                    <div class="row">
                                        <div class="col-12 error-parent">
                                            <span class="error error-icon" id="spnWitnessNameError" title="لطفا نام و نام خانوادگی شاهد را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                            <input type="text" id="txtWitnessName" placeholder="نام و نام خانوادگی" lang="fa-IR" maxlength="64" />
                                        </div>
                                        <br />
                                    </div>
                                    <br />
                                    <div class="row" style="margin-top: 5px">
                                        <div class="col-12 error-parent">
                                            <span class="error error-icon" id="spnWitnessPhoneError" title="لطفا شماره تلفن شاهد را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                            <input type="tel" id="txtWitnessPhone" placeholder="شماره تلفن شاهد" lang="fa-IR" maxlength="32" />
                                            <br />
                                        </div>
                                        <br />
                                        <div class="row" style="margin-top: 5px">
                                            <div class="col-6">
                                                <button type='button' id="btnSubmitWitness" class="btn btn-outline-success" onclick="SaveWitnessData()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">تایید</button>
                                            </div>
                                            <div class="col-6">
                                                <div class="spinner-border text-warning" role="status" style="display: none" id="spinWitnessLoading">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12" id="lblWitnessToast"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="white-box-shadow height-250">
                            <div class="row align-items-center form-group">
                                <div class="col-3">
                                    <label>نوع برخورد</label>
                                    <div class="error-parent">
                                        <span class="error error-icon" id="spnCollisionOfAError" title="لطفا نوع برخورد را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <select id="cmbCollisionOfA">
                                            <option selected="" value="-1">برخورد یک وسیله نقلیه</option>
                                            <option value="وسیله نقلیه">1. وسیله نقلیه</option>
                                            <option value="موتورسیکلت">2. موتورسیکلت</option>
                                            <option value="دوچرخه">3. دوچرخه</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-3 error-parent" style="margin-top: 20px">
                                    <span class="error error-icon" id="spnCollisionOfATwoError" title="لطفا نوع برخورد 'با' را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <select id="cmbCollisionOfATwo">
                                        <option selected="" value="-1">با</option>
                                        <option value="موتورسیکلت">1. موتورسیکلت</option>
                                        <option value="دوچرخه">2. دوچرخه</option>
                                        <option value="یک وسیله نقلیه">3. یک وسیله نقلیه</option>
                                        <option value="چند وسیله نقلیه">4. چند وسیله نقلیه</option>
                                        <option value="وسیله نقلیه پارک شده">5. وسیله نقلیه پارک شده</option>
                                        <option value="عابرپیاده">6. عابرپیاده</option>
                                        <option value="حیوان / احشام">7. حیوان / احشام</option>
                                        <option value="شی ثابت">8. شی ثابت</option>
                                        <option value="واژگونی و سقوط">9. واژگونی و سقوط</option>
                                        <option value="خروج از جاده">10. خروج از جاده</option>
                                        <option value="ایجاد حریق">11. ایجاد حریق</option>
                                        <option value="پرتاب سرنشین">12. پرتاب سرنشین</option>
                                        <option value="چند برخوردی">13. چند برخوردی</option>
                                        <option value="سایر">14. سایر</option>
                                    </select>
                                </div>
                                <div class="col-3 collision-in-line">
                                    <div class="row align-items-center">
                                        <div class="col-10">
                                            <input type="radio" class="btn-check typeOfCollision" value="برخورد جلو به عقب" name="TypeOfCollision" id="rdoRearEnd" autocomplete="off" />
                                            <label class="btn btn-outline-secondary rdo-type-collision" for="rdoRearEnd">
                                                <span>
                                                    <img src="/Images/rear-end.png" /></span><span>برخورد جلو به عقب
                                                    </span>
                                            </label>
                                        </div>
                                        <div class="col-2">
                                            <span class="mersad-info-btn">
                                                <%--<%--<i class="fa fa-info-circle"></i>--%>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 collision-in-line">
                                    <div class="row align-items-center">
                                        <div class="col-10">
                                            <input type="radio" class="btn-check typeOfCollision" value="برخورد پهلو به پهلو غیر هم جهت" name="TypeOfCollision" id="rdoSidewipeOd" autocomplete="off" />
                                            <label class="btn btn-outline-secondary rdo-type-collision" for="rdoSidewipeOd">
                                                <span>
                                                    <img src="/Images/sidewipe-od.png" /></span><span>برخورد پهلو به پهلو غیر هم جهت
                                                    </span>
                                            </label>
                                        </div>
                                        <div class="col-2">
                                            <span class="mersad-info-btn">
                                                <%--<%--<i class="fa fa-info-circle"></i>--%>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="collision-in-line">
                                <div class="row align-items-center form-group">
                                    <div class="col-3">
                                        <label>نحوه برخورد</label>
                                    </div>
                                    <div class="col-3">
                                        <div class="row align-items-center">
                                            <div class="col-10">
                                                <input type="radio" class="btn-check typeOfCollision" value="برخورد زاویه‌ای" name="TypeOfCollision" id="rdoAngle" autocomplete="off" />
                                                <label class="btn btn-outline-secondary rdo-type-collision" for="rdoAngle">
                                                    <span>
                                                        <img src="/Images/angle.png" style="width: 45px" /></span><span>برخورد زاویه‌ای
                                                        </span>
                                                </label>
                                            </div>
                                            <div class="col-2 mersad-info-btn">
                                                <%--<%--<i class="fa fa-info-circle"></i>--%>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="row align-items-center">
                                            <div class="col-10">
                                                <input type="radio" class="btn-check typeOfCollision" value="برخورد رخ به رخ" name="TypeOfCollision" id="rdoHeadOn" autocomplete="off" />
                                                <label class="btn btn-outline-secondary rdo-type-collision" for="rdoHeadOn">
                                                    <span>
                                                        <img src="/Images/head-on.png" /></span><span>برخورد رخ به رخ
                                                        </span>
                                                </label>
                                            </div>
                                            <div class="col-2 mersad-info-btn">
                                                <%--<%--<i class="fa fa-info-circle"></i>--%>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="row align-items-center">
                                            <div class="col-10">
                                                <input type="radio" class="btn-check typeOfCollision" value="برخورد پهلو به پهلو هم جهت" name="TypeOfCollision" id="rdoSidewipeSd" autocomplete="off" />
                                                <label class="btn btn-outline-secondary rdo-type-collision" for="rdoSidewipeSd">
                                                    <span>
                                                        <img src="/Images/sidewipe-sd.png" /></span><span>برخورد پهلو به پهلو هم جهت
                                                        </span>
                                                </label>
                                            </div>
                                            <div class="col-2 mersad-info-btn">
                                                <%--<%--<i class="fa fa-info-circle"></i>--%>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <button type='button' id="btnSubmitSecondStep" class="btn-login" onclick="SaveSecondStepData()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">ثبت</button>
                        <div class="spinner-border text-warning" role="status" style="display: none" id="spinSecondStepLoading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="divThirdStep" style="display: none;width: 1120px">
                <label class="fa-2x">مشخصات راه و وضعیت جوی</label><span id="spnOpenCommentThird" style="display: none" onclick="OpenCommentDialog('Third')"><i class="fa fa-comment-dots fa-3x fa-flip-horizontal gray"></i></span>
                <div class="row ">
                    <div class="col-3">
                        <div class="white-box-shadow height-250">
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnRoadDefectsError" title="لطفا نقایص موثر راه را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbRoadDefects">
                                    <option selected="" value="-1">نقایص موثر راه</option>
                                    <option value="ندارد">1. ندارد</option>
                                    <option value="نقص علائم عمودی">2. نقص علائم عمودی</option>
                                    <option value="نقص علائم افقی">3. نقص علائم افقی</option>
                                    <option value="کم بودن عرض راه">4. کم بودن عرض راه</option>
                                    <option value="وجود مانع دست‌انداز">5. وجود مانع دست‌انداز</option>
                                    <option value="فقدان شانه‌خاکی و پارکینگ">6. فقدان شانه‌خاکی و پارکینگ</option>
                                    <option value="اختلاف سطح بین آسفالت و شانه">7. اختلاف سطح بین آسفالت و شانه</option>
                                    <option value="فقدان حفاظ ایمنی کنار راه">8. فقدان حفاظ ایمنی کنار راه</option>
                                    <option value="غیر استاندارد بودن حفاظ کنار راه">9. غیر استاندارد بودن حفاظ کنار راه</option>
                                    <option value="نشست جاده‌ای">10. نشست جاده‌ای</option>
                                    <option value="نقص رویه آسفالت">11. نقص رویه آسفالت</option>
                                    <option value="قوس با زاویه تند">12. قوس با زاویه تند</option>
                                    <option value="شیب عرضی و طولی غیر استاندارد">13. شیب عرضی و طولی غیر استاندارد</option>
                                    <option value="نقص روشنایی راه/معبر">14. نقص روشنایی راه/معبر</option>
                                    <option value="نقص خط‌کشی راه/معبر">15. نقص خط‌کشی راه/معبر</option>
                                    <option value="سایر">16. سایر</option>
                                </select>
                            </div>
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnCarriageWayDirectionError" title="لطفا سمت جهت راه را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbCarriageWayDirection">
                                    <option selected="" value="-1">سمت جهت راه</option>
                                    <option value="یک‌طرفه">1. یک‌طرفه</option>
                                    <option value="دوطرفه غیرمجزا">2. دوطرفه غیرمجزا</option>
                                    <option value="دو طرفه مجزا با جداکننده فیزیکی">3. دو طرفه مجزا با جداکننده فیزیکی</option>
                                </select>
                            </div>
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnLightingStatusError" title="لطفا وضع روشنایی را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbLightingStatus">
                                    <option selected="" value="-1">وضع روشنایی</option>
                                    <option value="روز">1. روز</option>
                                    <option value="طلوع">2. طلوع</option>
                                    <option value="غروب">3. غروب</option>
                                    <option value="شب با روشنایی کافی">4. شب با روشنایی کافی</option>
                                    <option value="شب بدون روشنایی کافی">5. شب بدون روشنایی کافی</option>
                                </select>
                            </div>
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnRoadSurfaceConditionError" title="لطفا شرایط سطح راه را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbRoadSurfaceCondition">
                                    <option selected="" value="-1">شرایط سطح راه</option>
                                    <option value="خشک و معمولی">1. خشک و معمولی</option>
                                    <option value="مرطوب و خیس">2. مرطوب و خیس</option>
                                    <option value="یخبندان و برفی">3. یخبندان و برفی</option>
                                    <option value="شنی و خاکی">4. شنی و خاکی</option>
                                    <option value="گل‌آلود">5. گل‌آلود</option>
                                </select>
                            </div>
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnVisualObstructionError" title="لطفا موانع دید را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbVisualObstruction">
                                    <option selected="" value="-1">موانع دید</option>
                                    <option value="ندارد">1. ندارد</option>
                                    <option value="درخت، بوته">2. درخت، بوته</option>
                                    <option value="ساختمان، کیوسک">3. ساختمان، کیوسک</option>
                                    <option value="تل خاک و مشابه آن">4. تل خاک و مشابه آن</option>
                                    <option value="وسیله متوقف">5. وسیله متوقف</option>
                                    <option value="وسیله در حال حرکت">6. وسیله در حال حرکت</option>
                                    <option value="نور خورشید">7. نور خورشید</option>
                                    <option value="شیب">8. شیب</option>
                                    <option value="قوس قائم">9. قوس قائم</option>
                                    <option value="مه، دود">10. مه، دود</option>
                                    <option value="کولاک">11. کولاک</option>
                                    <option value="طوفان شن">12. طوفان شن</option>
                                    <option value="تابلو">13. تابلو</option>
                                    <option value="نور چراغ وسیله ‌نقلیه مقابل">14. نور چراغ وسیله ‌نقلیه مقابل</option>
                                    <option value="یخ‌زدگی شیشه وسیله ‌نقلیه">15. یخ‌زدگی شیشه وسیله ‌نقلیه</option>
                                    <option value="سایر">16. سایر</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="white-box-shadow">
                            <div class="form-group row">
                                <div class="col-6">
                                    <div style="font-size: 10px">آیا مسیر دارای شانه است؟</div>
                                </div>
                                <div class="col-6">
                                    <div style="float: left">
                                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" class="btn-check isShoulderRoad" name="ShoulderOfTheRoad" id="rdoShoulderOfTheRoadYes" autocomplete="off" value="Yes" />
                                            <label class="btn btn-outline-warning" for="rdoShoulderOfTheRoadYes">بله</label>
                                            <input type="radio" class="btn-check isShoulderRoad" name="ShoulderOfTheRoad" id="rdoShoulderOfTheRoadNo" autocomplete="off" value="No" />
                                            <label class="btn btn-outline-secondary" for="rdoShoulderOfTheRoadNo">خیر</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="hide shoulder-hide">
                                <div class="form-group error-parent">
                                    <span class="error error-icon" id="spnShoulderOfTheRoadError" title="لطفا نوع شانه را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <select id="cmbShoulderOfTheRoad" style="margin-top: 5px;">
                                        <option selected="" value="-1">نوع شانه</option>
                                        <option value="شانه خاکی">1. شانه خاکی</option>
                                        <option value="شانه آسفالته">2. شانه آسفالته</option>
                                    </select>
                                </div>
                                <div class="form-group row">
                                    <label for="txtShouldersWidth" class="col-3 zero-padding-left col-form-label">عرض شانه</label>
                                    <div class="col-3 zero-padding-left">
                                        <input type="number" id="txtShouldersWidth" class="input-time" placeholder="....." min="0" max="1000" />
                                    </div>
                                    <label class="col-3 zero-padding-left col-form-label">متر</label><div class="col-3"></div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="white-box-shadow" id="whiteHide" style="height: 157px">
                            <div class="form-group">
                                <select id="cmbRoadMaintenance">
                                    <option selected="" value="-1">تعمیرات راه</option>
                                    <option value="در حال تعمیر نیست">1. در حال تعمیر نیست</option>
                                    <option value="در حال تعمیر بدون علائم کافی">2. در حال تعمیر بدون علائم کافی</option>
                                    <option value="در حال تعمیر با علائم کافی">3. در حال تعمیر با علائم کافی</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select id="cmbRoadAssetsDamage">
                                    <option selected="" value="-1">خسارت وارده به تجهیزات</option>
                                    <option value="ندارد">1. ندارد</option>
                                    <option value="علائم و تابلو">2. علائم و تابلو</option>
                                    <option value="حفاظ راه">3. حفاظ راه</option>
                                    <option value="رویه راه">4. رویه راه</option>
                                    <option value="سایر">5. سایر</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="white-box-shadow height-250">
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnLocationLandUseError" title="لطفا کاربری محل را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
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
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnCarCrashLocationError" title="لطفا موقعیت تصادف را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
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
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnWeatherError" title="لطفا وضع هوا را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbWeather">
                                    <option selected="" value="-1">وضع هوا</option>
                                    <option value="صاف">1. صاف</option>
                                    <option value="مه‌آلود">2. مه‌آلود</option>
                                    <option value="برفی">3. برفی</option>
                                    <option value="بارانی">4. بارانی</option>
                                    <option value="طوفانی">5. طوفانی</option>
                                    <option value="ابری">6. ابری</option>
                                    <option value="غبارآلود">7. غبارآلود</option>
                                </select>
                            </div>
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnGeometricDesignError" title="لطفا وضع هندسه محل تصادف را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbGeometricDesign">
                                    <option selected="" value="-1">وضع هندسه محل تصادف</option>
                                    <option value="مستقیم، مسطح">1. مستقیم، مسطح</option>
                                    <option value="مستقیم، سربالایی">2. مستقیم، سربالایی</option>
                                    <option value="مستقیم سرپایینی">3. مستقیم سرپایینی</option>
                                    <option value="پیچ، مسطح">4. پیچ، مسطح</option>
                                    <option value="پیچ سربالایی">5. پیچ سربالایی</option>
                                    <option value="پیچ سرپایینی">6. پیچ سرپایینی</option>
                                    <option value="تونل">7. تونل</option>
                                    <option value="پل">8. پل</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select id="cmbPavmentMarking">
                                    <option selected="" value="-1">خط کشی</option>
                                    <option value="ندارد">1. ندارد</option>
                                    <option value="مقطع">2. مقطع</option>
                                    <option value="ممتد">3. ممتد</option>
                                    <option value="دوبل">4. دوبل</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="white-box-shadow height-250">
                            <div class="form-group row">
                                <div class="col-3">
                                    <div style="font-size: 9px; margin-top: 5px">عرض راه(متر)</div>
                                </div>
                                <div class="col-3 error-parent">
                                    <span class="error error-icon" id="spnRoadwayWidthMainError" title="لطفا عرض راه را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <input runat="server" clientidmode="Static" type="number" id="txtRoadwayWidthMain" placeholder="اصلی" title="اصلی" min="0" max="1000" />
                                    <br />
                                </div>
                                <div class="col-3 error-parent">
                                    <span class="error error-icon" id="spnRoadwayWidthSubsidiaryError" title="لطفا عرض راه را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <input runat="server" clientidmode="Static" type="number" id="txtRoadwayWidthSubsidiary" placeholder="فرعی" title="فرعی" min="0" max="1000" />
                                    <br />
                                </div>
                                <div class="col-3 error-parent">
                                    <span class="error error-icon" id="spnRoadwayWidthVillageError" title="لطفا عرض راه را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <input runat="server" clientidmode="Static" type="number" id="txtRoadwayWidthVillage" placeholder="روستایی" title="روستایی" min="0" max="1000" />
                                    <br />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="txtMaximumSpeedLimit" class="col-5 zero-padding-left col-form-label">حداکثر سرعت مجاز راه</label>
                                <div class="col-3 zero-padding-left error-parent">
                                    <span class="error error-icon" id="spnMaximumSpeedLimitError" title="لطفا حداکثر سرعت مجاز راه را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <input type="number" id="txtMaximumSpeedLimit" min="0" max="124" class="input-time" placeholder="....." />
                                </div>
                                <label class="col-4 zero-padding-left col-form-label">(کیلومتر بر ساعت)</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <button type='button' id="btnSubmitThirdStep" class="btn-login" onclick="SaveThirdStepData()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">ثبت</button>
                        <div class="spinner-border text-warning" role="status" style="display: none" id="spinThirdStepLoading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="divFourthStep" style="display: none;width: 1120px">
                <label class="fa-2x">علل تصادف</label><span id="spnOpenCommentFourth" style="display: none" onclick="OpenCommentDialog('Fourth')"><i class="fa fa-comment-dots fa-3x fa-flip-horizontal gray"></i></span>
                <div class="row">
                    <div class="col-12">
                        <div class="white-box-shadow">
                            <div class="row">
                                <div class="col-3">
                                    <div class="form-group error-parent">
                                        <span class="error error-icon" id="spnFinalReasonError" title="لطفا علت تامه تصادف را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <select id="cmbFinalReason">
                                            <option selected="" value="-1">علت تامه تصادف</option>
                                            <option value="عدم رعایت فاصله طولی">1. عدم رعایت فاصله طولی</option>
                                            <option value="عدم رعایت فاصله عرضی">2. عدم رعایت فاصله عرضی</option>
                                            <option value="عدم رعایت حق تقدم">3. عدم رعایت حق تقدم</option>
                                            <option value="عدم توجه به جلو">4. عدم توجه به جلو</option>
                                            <option value="عدم توانایی در کنترل نقلیه">5. عدم توانایی در کنترل وسیله نقلیه ناشی از ...</option>
                                            <option value="تجاوز از سرعت مقرره">6. تجاوز از سرعت مقرره</option>
                                            <option value="تجاوز به چپ ناشی از سبقت">7. تجاوز به چپ ناشی از سبقت</option>
                                            <option value="انحراف به چپ">8. انحراف به چپ</option>
                                            <option value="انحراف به راست">9. انحراف به راست</option>
                                            <option value="گردش به طرز غلط">10. گردش به طرز غلط</option>
                                            <option value="عبور از محل ممنوع">11. عبور از محل ممنوع</option>
                                            <option value="حرکت در خلاف جهت">12. حرکت در خلاف جهت</option>
                                            <option value="حرکت با دنده عقب">13. حرکت با دنده عقب</option>
                                            <option value="نقص فنی حادث وسیله نقلیه">14. نقص فنی حادث وسیله نقلیه</option>
                                            <option value="نقص فنی مستمر وسیله نقلیه">15. نقص فنی مستمر وسیله نقلیه</option>
                                            <option value="تغییر مسیر ناگهانی">16. تغییر مسیر ناگهانی</option>
                                            <option value="خطای عابر">17. خطای عابر</option>
                                            <option value="نقض ماده 4 قانون ایمنی راه ها">18. نقض ماده 4 قانون ایمنی راه ها</option>
                                            <option value="نقض مقررات حمل بار">19. نقض مقررات حمل بار</option>
                                            <option value="یدک کشی به طرز غلط">20. یدک کشی به طرز غلط</option>
                                            <option value="عبور از چراغ قرمز">21. عبور از چراغ قرمز</option>
                                            <option value="دور زدن در محل ممنوع">22. دور زدن در محل ممنوع</option>
                                            <option value="نقض ماده 211 و 212 آیین نامه راهور ناجا">23. نقض ماده 211 و 212 آیین نامه راهور ناجا</option>
                                            <option value="باز نمودن ناگهانی درب وسیله نقلیه">24. باز نمودن ناگهانی درب وسیله نقلیه</option>
                                            <option value="سایر علل">25. سایر علل</option>
                                            <option value="نقص راه">26. نقص راه</option>
                                        </select>
                                    </div>
                                    <div class="form-group hide error-parent" id="divLackOfAttention">
                                        <span class="error error-icon" id="spnLackOfAttentionError" title="لطفا علت عدم توجه به جلو را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <select id="cmbLackOfAttention">
                                            <option selected="" value="-1">عدم توجه به جلو ناشی از</option>
                                            <option value="استفاده از تلفن همراه یا نصب تجهیزات الکترونیکی روی داشبورد">1. استفاده از تلفن همراه یا نصب تجهیزات الکترونیکی روی داشبورد</option>
                                            <option value="خستگی و خواب آلودگی">2. خستگی و خواب آلودگی</option>
                                            <option value="وجود بیلبورد تبلیغاتی یا تلویزیون شهری در حاشیه یا مقابل دید رانندگان">3. وجود بیلبورد تبلیغاتی یا تلویزیون شهری در حاشیه یا مقابل دید رانندگان</option>
                                            <option value="مشاجره لفظی راننده با سرنشین">4. مشاجره لفظی راننده با سرنشین</option>
                                            <option value="خوردن و آشامیدن">5. خوردن و آشامیدن</option>
                                            <option value="سگ گردانی">6. سگ گردانی</option>
                                            <option value="بی حجابی">7. بی حجابی</option>
                                            <option value="رانندگی درحالت اطلاع از خبر ناگوار یا حمل بیمار و مصدوم با خودروی خود">8. رانندگی درحالت اطلاع از خبر ناگوار یا حمل بیمار و مصدوم با خودروی خود</option>
                                            <option value="سوار کردن اطفال زیر 12 سال در صندلی جلو">9. سوار کردن اطفال زیر 12 سال در صندلی جلو</option>
                                        </select>
                                    </div>
                                    <div class="form-group hide" id="divInabilityControlVehicle">
                                        <span class="error error-icon" id="spnInabilityControlVehicleError" title="لطفا علت عدم توانایی در کنترل وسیله را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <select id="cmbInabilityControlVehicle">
                                            <option selected="" value="-1">عدم توانایی در کنترل وسیله نقلیه ناشی از</option>
                                            <option value="تخطی از سرعت مطمئنه">1. تخطی از سرعت مطمئنه</option>
                                            <option value="مصرف مشروبات الکلی">2. مصرف مشروبات الکلی</option>
                                            <option value="مصرف مواد مخدر و روان گردان">3. مصرف مواد مخدر و روان گردان</option>
                                            <option value="نقص عضو موثر">4. نقص عضو موثر</option>
                                            <option value="ضعف ناشی از کهولت سن یا عارض شدن بیماری موجب سلب توانایی در رانندگی">5. ضعف ناشی از کهولت سن یا عارض شدن بیماری موجب سلب توانایی در رانندگی</option>
                                            <option value="حجم بار غیر متعارف از نظر حجم وزن و ابعاد">6. حجم بار غیر متعارف از نظر حجم وزن و ابعاد</option>
                                            <option value="رانندگی بدون گواهینامه مجاز">7. رانندگی بدون گواهینامه مجاز</option>
                                            <option value="دادن اجازه رانندگی به فرد فاقد مهارت لازم">8. دادن اجازه رانندگی به فرد فاقد مهارت لازم</option>
                                            <option value="در آغوش گرفتن اطفال در هنگام رانندگی">9. در آغوش گرفتن اطفال در هنگام رانندگی</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-3 error-parent">
                                    <span class="error error-icon" id="spnVehicleFactorInCarCrashError" title="لطفا عامل وسیله نقلیه در تصادف را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <select id="cmbVehicleFactorInCarCrash">
                                        <option selected="" value="-1">عامل وسیله نقلیه در تصادف</option>
                                        <option value="ندارد">1. ندارد</option>
                                        <option value="نقص سیستم روشنایی">2. نقص سیستم روشنایی</option>
                                        <option value="نقص سیستم ترمز">3. نقص سیستم ترمز</option>
                                        <option value="نقص سیستم فرمان">4. نقص سیستم فرمان</option>
                                        <option value="صاف بودن لاستیک">5. صاف بودن لاستیک</option>
                                        <option value="فقدان زنجیر چرخ در مواقع ضروری">6. فقدان زنجیر چرخ در مواقع ضروری</option>
                                        <option value="فقدان برف پاک کن در موقع ضروری">7. فقدان برف پاک کن در موقع ضروری</option>
                                        <option value="نقص دستگاه تعلیق">8. نقص دستگاه تعلیق</option>
                                        <option value="سایر نقایص">9. سایر نقایص</option>
                                    </select>
                                </div>
                                <div class="col-3">
                                    <select id="cmbHumanFactorInCarCrash">
                                        <option selected="" value="-1">عامل انسانی موثر در تصادف</option>
                                        <option value="ندارد">1. ندارد</option>
                                        <option value="مهار نکردن محموله به طرز صحیح">2. مهار نکردن محموله به طرز صحیح</option>
                                        <option value="عجله و شتاب بی مورد">3. عجله و شتاب بی مورد</option>
                                    </select>
                                </div>
                                <div class="col-3">
                                    <select id="cmbJudicialCause">
                                        <option selected="" value="-1">علت قضایی تصادف</option>
                                        <option value="بی احتیاطی">1. بی احتیاطی</option>
                                        <option value="بی مبالاتی">2. بی مبالاتی</option>
                                        <option value="عدم رعایت نظامات دولتی">3. عدم رعایت نظامات دولتی</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <button type='button' id="btnSubmitFourthStep" class="btn-login" onclick="SaveFourthStepData()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">ثبت</button>
                        <div class="spinner-border text-warning" role="status" style="display: none" id="spinFourthStepLoading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="divFifthStep" style="display: none;width: 1120px">
                <label class="fa-2x">مشخصات افراد و وسایل درگیر در تصادف</label><span id="spnOpenCommentFifth" style="display: none" onclick="OpenCommentDialog('Fifth')"><i class="fa fa-comment-dots fa-3x fa-flip-horizontal gray"></i></span>
                <div class="row">
                    <div class="col-3">
                        <div class="form-group row">
                            <div class="col-9">
                                <div><i class="fas fa-car-crash fa-2x gray"></i>&nbsp;<span>وسایل ‌نقلیه</span></div>
                                <label class="">تعداد وسایل ‌نقلیه درگیر در تصادف </label>
                            </div>
                            <div class="col-3 error-parent">
                                <br />
                                <span class="error error-icon" id="spnNumberOfVehiclesInvolvedError" title="لطفا تعداد وسایل ‌نقلیه درگیر در تصادف را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input type="number" min="0" max="10" id="txtNumberOfVehiclesInvolved" />
                            </div>
                        </div>
                        <div class="form-group hide" id="divAddCounterVehiclesInvolved">
                            <select id="cmbVehiclesInvolved"></select>
                        </div>
                        <div><i class="fas fa-walking fa-2x gray"></i>&nbsp;<span>عابرین ‌پیاده</span></div>
                        <div class="form-group row">
                            <label class="col-9">تعداد عابرین درگیر در تصادف </label>
                            <div class="col-3 error-parent">
                                <span class="error error-icon" id="spnNumberOfPedestriansInvolvedError" title="لطفا تعداد عابرین درگیر در تصادف را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input type="number" min="0" max="10" id="txtNumberOfPedestriansInvolved" readonly="" />
                            </div>
                        </div>
                        <div class="form-group hide" id="divAddCounterPedestriansInvolved">
                            <select id="cmbPedestriansInvolved"></select>
                        </div>
                        <div><i class="fas fa-biking fa-2x gray"></i>&nbsp;<span>دوچرخه ‌سواران</span></div>
                        <div class="form-group row">
                            <label class="col-9">تعداد دوچرخه ‌سواران درگیر در تصادف </label>
                            <div class="col-3 error-parent">
                                <span class="error error-icon" id="spnNumberOfBikeRidersInvolvedError" title="لطفا تعداد دوچرخه ‌سواران درگیر در تصادف را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input type="number" min="0" max="10" id="txtNumberOfBikeRidersInvolved" readonly="" />
                            </div>
                        </div>
                        <div class="form-group hide" id="divAddCounterBikeRidersInvolved">
                            <select id="cmbBikeRidersInvolved"></select>
                        </div>
                    </div>
                    <div class="col-3 hide ShowVehiclesInvolved">
                        <div class="white-box-shadow">
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnVehicleTypeError" title="لطفا نوع وسیله نقلیه را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbVehicleType">
                                    <option selected="" value="-1">نوع وسیله نقلیه</option>
                                    <option value="سواری">1. سواری</option>
                                    <option value="مینی ‌بوس">2. مینی ‌بوس</option>
                                    <option value="اتوبوس">3. اتوبوس</option>
                                    <option value="وانت ‌بار">4. وانت ‌بار</option>
                                    <option value="کامیون">5. کامیون</option>
                                    <option value="کامیونت">6. کامیونت</option>
                                    <option value="آمبولانس">7. آمبولانس</option>
                                    <option value="خودرو آتش ‌نشانی">8. خودرو آتش ‌نشانی</option>
                                    <option value="خودرو پلیس">9. خودرو پلیس</option>
                                    <option value="موتورسیکلت">10. موتورسیکلت</option>
                                    <option value="تریلی">11. تریلی</option>
                                    <option value="دوچرخه">12. دوچرخه</option>
                                    <option value="ادوات کشاورزی">13. ادوات کشاورزی</option>
                                    <option value="ادوات راه‌سازی">14. ادوات راه‌سازی</option>
                                    <option value="تانکر حمل مواد خطرناک">15. تانکر حمل مواد خطرناک</option>
                                    <option value="سایر">16. سایر</option>
                                </select>
                            </div>
                            <div class="form-group row">
                                <div class="col-8">
                                    <div style="font-size: 10px">آیا راننده متواری شده است؟</div>
                                </div>
                                <div class="col-4">
                                    <div style="float: left">
                                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" class="btn-check driverFlee" name="DriverFlee" id="rdoDriverFleeYes" autocomplete="off" value="Yes" />
                                            <label class="btn btn-outline-warning" for="rdoDriverFleeYes">بله</label>
                                            <input type="radio" class="btn-check driverFlee" name="DriverFlee" id="rdoDriverFleeNo" autocomplete="off" value="No" />
                                            <label class="btn btn-outline-secondary" for="rdoDriverFleeNo">خیر</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="divPelak" class="hide">
                                <div class="form-group row align-items-center">
                                    <div class="col-4">
                                        <div>پلاک</div>
                                    </div>
                                    <div class="col-8">
                                        <div class="form-group">
                                            <div class="pelak-inline hide" id="divPelakKhodro">
                                                <div style="width: 35px">
                                                    <img src="/Images/iran-top-pelak.jpg" class="ir-plk-img" />
                                                    <input type="number" id="txtPlateNumberFirst" class="ir-pelak iran-plk text-center" min="0" max="99" />
                                                </div>
                                                <input type="number" id="txtPlateNumberSecond" class="ir-pelak text-center" min="0" max="999" />
                                                <input type="text" id="txtPlateNumberThird" lang="fa-IR" style="width: 30px" class="ir-pelak text-center" maxlength="1" />
                                                <input type="number" id="txtPlateNumberFourt" style="width: 35px" class="ir-pelak text-center" min="0" max="99" />
                                                <img class="left-pelak" src="/Images/iran-left-pelak.jpg" />
                                            </div>
                                            <div class="hide" id="divPelakMotor" style="width: 100px;float: left;">
                                                <div class="pelak-inline">
                                                    <input type="number" id="txtPlateNumberBikeFirst" style="height: 32.5px;border-top-right-radius: 6px !important;" class="ir-pelak mtr-plk left-pelak text-center" min="0" max="999" />
                                                    <img src="/Images/iran-left-pelak.jpg" style="width: 20px" class="left-pelak" />
                                                </div>
                                                <input type="number" id="txtPlateNumberBikeSecond" style="border-bottom-right-radius: 6px !important;border-bottom-left-radius: 6px !important;border-top: none !important" class="ir-pelak text-center" min="0" max="99999" />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div class="form-group row">
                                <div class="col-4" style="font-size: 10px">سیستم وسیله نقلیه</div>
                                <div class="col-8 error-parent">
                                    <span class="error error-icon" id="spnVehicleSystemError" title="لطفا سیستم وسیله نقلیه را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <input type="text" id="txtVehicleSystem" maxlength="32" />
                                </div>
                            </div>
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnVehicleManeuveringError" title="لطفا مانور وسیله نقلیه را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbVehicleManeuvering">
                                    <option selected="" value="-1">مانور وسیله نقلیه</option>
                                    <option value="حرکت به جلو">1. حرکت به جلو</option>
                                    <option value="گردش به چپ">2. گردش به چپ</option>
                                    <option value="گردش به راست">3. گردش به راست</option>
                                    <option value="دور زدن">4. دور زدن</option>
                                    <option value="سبقت">5. سبقت</option>
                                    <option value="حرکت به عقب">6. حرکت به عقب</option>
                                    <option value="شروع به حرکت ناگهانی">7. شروع به حرکت ناگهانی</option>
                                    <option value="توقف ناگهانی">8. توقف ناگهانی</option>
                                    <option value="توقف در خارج راه">9. توقف در خارج راه</option>
                                    <option value="توقف در سطح راه">10. توقف در سطح راه</option>
                                    <option value="حرکت مارپیچ">11. حرکت مارپیچ</option>
                                    <option value="سایر">12. سایر</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select id="cmbPlateType">
                                    <option selected="" value="-1">نوع پلاک</option>
                                    <option value="شخصی">1. شخصی</option>
                                    <option value="دولتی">2. دولتی</option>
                                    <option value="عمومی">3. عمومی</option>
                                    <option value="سرویس">4. سرویس</option>
                                    <option value="کنسولی">5. کنسولی</option>
                                    <option value="نظامی">6. نظامی</option>
                                    <option value="انتظامی">7. انتظامی</option>
                                    <option value="تعمیری">8. تعمیری</option>
                                    <option value="گذر موقت">9. گذر موقت</option>
                                    <option value="بین المللی">10. بین المللی</option>
                                    <option value="ترانزیت">11. ترانزیت</option>
                                    <option value="کشاورزی">12. کشاورزی</option>
                                    <option value="عمرانی">13. عمرانی</option>
                                    <option value="ویژه">14. ویژه</option>
                                    <option value="سیاسی">15. سیاسی</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select id="cmbSafetyEquipment">
                                    <option selected="" value="-1">تجهیزات ایمنی</option>
                                    <option value="ندارد">1. ندارد</option>
                                    <option value="Air Bag">2. Air Bag</option>
                                    <option value="ABS">3. ABS</option>
                                    <option value="Air Bag + ABS">4. Air Bag + ABS</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select id="cmbPathDirection">
                                    <option selected="" value="-1">مسیر حرکت</option>
                                    <option value="شمال به جنوب">1. شمال به جنوب</option>
                                    <option value="جنوب به شمال">2. جنوب به شمال</option>
                                    <option value="شرق به غرب">3. شرق به غرب</option>
                                    <option value="غرب به شرق">4. غرب به شرق</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 hide ShowVehiclesInvolved">
                        <div class="white-box-shadow">
                            <div class="form-group">
                                <input type="text" id="txtSignsOnRoad" maxlength="32" placeholder="تابلوهای نصب شده در مسیر جرکت وسیله نقلیه" title="تابلوهای نصب شده در مسیر جرکت وسیله نقلیه" />
                            </div>
                            <div class="form-group">
                                <select id="cmbFunctionAfterDamage">
                                    <option selected="" value="-1">کارایی وسیله بعد از تصادف</option>
                                    <option value="قابل حرکت">1. قابل حرکت</option>
                                    <option value="غیر قابل حرکت زیر 60درصد">2. غیر قابل حرکت زیر 60درصد</option>
                                    <option value="غیر قابل حرکت بالای 60درصد">3. غیر قابل حرکت بالای 60درصد</option>
                                </select>
                            </div>
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnTechnicalInspectionError" title="لطفا معاینه فنی را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbTechnicalInspection">
                                    <option selected="" value="-1">معاینه فنی</option>
                                    <option value="دارد">1. دارد</option>
                                    <option value="ندارد">2. ندارد</option>
                                    <option value="نیاز ندارد">3. نیاز ندارد</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <div style="font-size: 10px">سازمان متبوعه / شرکت یا موسسه</div>
                            </div>
                            <div class="form-group">
                                <input type="text" id="txtCompanyOrganisation" maxlength="32" />
                            </div>
                            <div class="form-group row">
                                <div class="col-8">
                                    <div style="font-size: 10px">آیا وسیله نقلیه دارای بار است؟</div>
                                </div>
                                <div class="col-4">
                                    <div style="float: left">
                                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" class="btn-check vehicleHaveLoad" name="VehicleHaveLoad" id="rdoVehicleHaveLoadYes" autocomplete="off" value="Yes" />
                                            <label class="btn btn-outline-warning" for="rdoVehicleHaveLoadYes">بله</label>
                                            <input type="radio" class="btn-check vehicleHaveLoad" name="VehicleHaveLoad" id="rdoVehicleHaveLoadNo" autocomplete="off" value="No" />
                                            <label class="btn btn-outline-secondary" for="rdoVehicleHaveLoadNo">خیر</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group hide error-parent" id="divLoadType">
                                <span class="error error-icon" id="spnLoadTypeError" title="لطفا نوع بار را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbLoadType">
                                    <option selected="" value="-1">نوع بار</option>
                                    <%--<option value="بار ندارد">1. بار ندارد</option>--%>
                                    <option value="مواد سوختنی">1. مواد سوختنی</option>
                                    <option value="محصولات کشاورزی">2. محصولات کشاورزی</option>
                                    <option value="مصالح ساختمانی">3. مصالح ساختمانی</option>
                                    <option value="مواد خطرناک">4. مواد خطرناک</option>
                                    <option value="سایر">5. سایر</option>
                                </select>
                            </div>
                            <div class="hide" id="divLoadFreight">
                                <div class="form-group row align-items-center">
                                    <div class="col-6">
                                        <div style="font-size: 10px">وزن تقریبی بار (کیلوگرم)</div>
                                    </div>
                                    <div class="col-6">
                                        <input type="number" id="txtLoadFreight" min="0" max="32000" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 hide ShowVehiclesInvolved">
                        <div class="white-box-shadow">
                            <div class="form-group row">
                                <div class="col-8">
                                    <div style="font-size: 10px">آیا اطلاعات با سیستم شماره گذاری تطابق دارد؟</div>
                                </div>
                                <div class="col-4">
                                    <div style="float: left">
                                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" class="btn-check" name="SystemIncompatibility" id="rdoSystemIncompatibilityYes" autocomplete="off" value="Yes" />
                                            <label class="btn btn-outline-warning" for="rdoSystemIncompatibilityYes">بله</label>
                                            <input type="radio" class="btn-check" name="SystemIncompatibility" id="rdoSystemIncompatibilityNo" autocomplete="off" value="No" />
                                            <label class="btn btn-outline-secondary" for="rdoSystemIncompatibilityNo">خیر</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-8">
                                    <div style="font-size: 10px">آیا سیستم AirBag عمل نموده است؟</div>
                                </div>
                                <div class="col-4">
                                    <div style="float: left">
                                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" class="btn-check" name="AirbagFunction" id="rdoAirbagFunctionYes" autocomplete="off" value="Yes" />
                                            <label class="btn btn-outline-warning" for="rdoAirbagFunctionYes">بله</label>
                                            <input type="radio" class="btn-check" name="AirbagFunction" id="rdoAirbagFunctionNo" autocomplete="off" value="No" />
                                            <label class="btn btn-outline-secondary" for="rdoAirbagFunctionNo">خیر</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <select id="cmbAccidentTraces">
                                    <option selected="" value="-1">آثار باقیمانده درصحنه</option>
                                    <option value="کندگی آسفالت">1. کندگی آسفالت</option>
                                    <option value="ریختگی قطعات">2. ریختگی قطعات</option>
                                    <option value="ریختگی روغن">3. ریختگی روغن</option>
                                    <option value="سایر">4. سایر</option>
                                </select>
                            </div>
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnTypeOfCollisionError" title="لطفا نحوه برخورد را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbTypeOfCollision">
                                    <option selected="" value="-1">نحوه برخورد</option>
                                    <option value="جلو">1. جلو</option>
                                    <option value="پشت">2. پشت</option>
                                    <option value="پهلو راست">3. پهلو راست</option>
                                    <option value="پهلو چپ">4. پهلو چپ</option>
                                </select>
                            </div>
                            <div class="form-group row align-items-center">
                                <div class="col-6">
                                    <div style="font-size: 10px">کد نوع تخلف حادثه ­ساز</div>
                                </div>
                                <div class="col-6 error-parent">
                                    <span class="error error-icon" id="spnCodeCausingAccidentError" title="لطفا کد نوع تخلف حادثه ­ساز را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <input type="text" id="txtCodeCausingAccident" maxlength="32" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="divFifthStepTwo" class="col-6 hide">
                        <div class="white-box-shadow row">
                            <div class="col-6">
                                <div class="form-group row">
                                    <div class="col-2">اثر ترمز</div>
                                    <div class="col-5">
                                        <input type="number" id="txtBrakeTraceBeforeAccident" min="0" max="10000" placeholder="قبل از برخورد" />
                                    </div>
                                    <div class="col-5">
                                        <input type="number" id="txtBrakeTraceAfterAccident" min="0" max="10000" placeholder="بعد از برخورد" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="number" id="txtDistanceMoveAfterAccident" min="0" max="10000" placeholder="فاصله پیموده شده پس از تصادف" />
                                </div>
                                <div class="form-group">
                                    <input type="number" id="txtAccelerationIncludings" min="0" max="10000" placeholder="شتاب با احتساب شتاب شیب" />
                                </div>
                                <div class="form-group">
                                    <input type="number" id="txtRoadFrictionFactor" min="0" max="10000" placeholder="ضریب اصطکاک جاده" />
                                </div>
                                <div class="form-group">
                                    <input type="number" id="txtVehiclesHeightFromGround" min="0" max="10000" placeholder="ارتفاع وسیله از سطح زمین" />
                                </div>
                            </div>
                            <div class="col-6" style="margin-top: 30px">
                                <div class="form-group"></div>
                                <div class="form-group">
                                    <input type="number" id="txtSlopeDegreeDirection" min="0" max="10000" placeholder="درجه و جهت شیب" />
                                </div>
                                <div class="form-group">
                                    <input type="number" id="txtBrakeAcceleration" min="0" max="10000" placeholder="شتاب ترمز" />
                                </div>
                                <div class="form-group">
                                    <input type="number" id="txtRoadsCurveRadius" min="0" max="10000" placeholder="شعاع پیچ" />
                                </div>
                                <div class="form-group">
                                    <input type="number" id="txtTierMarks" min="0" max="10000" placeholder="کشیدگی لاستیک" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="divFifthStepTwo2" class="col-3 hide">
                        <div class="form-group white-box-shadow">
                            <div class="form-group">
                                <input type="number" id="txtQuDriverNoticedDanger" min="0" max="10000" placeholder="راننده حدود چه فاصله ای متوجه خطر شده" />
                            </div>
                            <div class="form-group">
                                <input type="number" id="txtQuDriverTime" min="0" max="10000" placeholder="زمان راننده از نقطه رویت حقیقی تا نقطه برخورد" />
                            </div>
                            <div class="form-group">
                                <input type="number" id="txtQuMaximumDistancePieces" min="0" max="10000" placeholder="حداکثر فاصله قطعات پرتاب شده از نقطه برخورد" />
                            </div>
                        </div>
                        <div class="white-box-shadow">
                            <div class="form-group">
                                <input type="number" id="txtBrakeTraceTestSpeed" min="0" max="10000" placeholder="اثر ترمز سرعت آزمایشی" />
                            </div>
                            <div class="form-group">
                                <input type="number" id="txtTestSpeed" min="0" max="10000" placeholder="سرعت آزمایشی" />
                            </div>
                        </div>
                    </div>
                    <div id="divFifthStepThree" class="col-9 hide">
                        <div class="row">
                            <div class="col-4">
                                <div class="white-box-shadow">
                                    <div class=" form-group row">
                                        <div class="col-8">
                                            <div style="font-size: 10px">آیا هویت راننده معلوم است؟</div>
                                        </div>
                                        <div class="col-4">
                                            <div style="float: left">
                                                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                                    <input type="radio" class="btn-check driversIdentity" name="DriversIdentity" id="rdoDriversIdentityYes" autocomplete="off" value="Yes" />
                                                    <label class="btn btn-outline-warning" for="rdoDriversIdentityYes">بله</label>
                                                    <input type="radio" class="btn-check driversIdentity" name="DriversIdentity" id="rdoDriversIdentityNo" autocomplete="off" value="No" />
                                                    <label class="btn btn-outline-secondary" for="rdoDriversIdentityNo">خیر</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="driversIdentityHide">
                                        <div class="form-group row">
                                            <label for="txtNationalId" class="col-4 col-form-label">کد ملی</label>
                                            <div class="col-8 error-parent">
                                                <span class="error error-icon" id="spnNationalIdError" title="لطفا کد ملی را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                                <input type="text" id="txtNationalId" maxlength="10" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group error-parent">
                                        <span class="error error-icon" id="spnSexError" title="لطفا جنسیت را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <select id="cmbSex">
                                            <option selected="" value="-1">جنسیت</option>
                                            <option value="مرد">1. مرد</option>
                                            <option value="زن">2. زن</option>
                                            <option value="نامعلوم">3. نامعلوم</option>
                                        </select>
                                    </div>
                                    <div class="driversIdentityHide">
                                        <div class="form-group row">
                                            <label for="txtFirstName" class="col-4 col-form-label">نام</label>
                                            <div class="col-8 error-parent">
                                                <span class="error error-icon" id="spnFirstNameError" title="لطفا نام را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                                <input type="text" id="txtFirstName" maxlength="10" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="driversIdentityHide">
                                        <div class="form-group row">
                                            <label for="txtLastName" class="col-4 col-form-label">نام خانوادگی</label>
                                            <div class="col-8 error-parent">
                                                <span class="error error-icon" id="spnLastNameError" title="لطفا نام خانوادگی را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                                <input type="text" id="txtLastName" maxlength="10" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="driversIdentityHide">
                                        <div class="form-group row">
                                            <label for="txtFatherName" class="col-4 col-form-label">نام پدر</label>
                                            <div class="col-8 error-parent">
                                                <span class="error error-icon" id="spnFatherNameError" title="لطفا نام پدر را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                                <input type="text" id="txtFatherName" maxlength="10" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="driversIdentityHide">
                                        <div class="form-group row">
                                            <label for="txtAge" class="col-4 col-form-label">سن</label>
                                            <div class="col-8 error-parent">
                                                <span class="error error-icon" id="spnAgeError" title="لطفا سن را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                                <input type="number" id="txtAge" min="0" max="139" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 ">
                                <div class="white-box-shadow">
                                    <div class="driversIdentityHide">
                                        <div class="form-group row">
                                            <label for="txtDriverLicenceNumber" class="col-4 col-form-label">شماره گواهینامه</label>
                                            <div class="col-8 error-parent">
                                                <span class="error error-icon" id="spnDriverLicenceNumberError" title="لطفا شماره گواهینامه را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                                <input type="number" id="txtDriverLicenceNumber" min="0" max="10000000000000" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="driversIdentityHide">
                                        <div class="form-group row">
                                            <label class="col-form-label">تاریخ و محل صدور گواهینامه</label>
                                            <div class="row">
                                                <div class="col-8 error-parent">
                                                    <div class="left-addon"><span class="error error-icon" id="spnDateLicenceIssueError" title="لطفا تاریخ صدور گواهینامه را وارد کنید"><i class="fa fa-warning fa-2x"></i></span></div>
                                                    <div class="inner-addon left-addon">
                                                        <div class="input-group-prepend">
                                                            <span style="cursor: pointer; display: none" class="input-group-text" id="dateDateLicenceIssue"></span>
                                                        </div>
                                                        <i style="cursor: pointer" class="fa fa-calendar fa-2x"></i>

                                                        <input type="text" id="txtDateLicenceIssue" runat="server" clientidmode="Static" onfocus="openDateLicenceIssue()" aria-label="dateDateLicenceIssue" aria-describedby="dateDateLicenceIssue" maxlength="10" />
                                                    </div>
                                                </div>
                                                <div class="col-4 error-parent">
                                                    <input type="text" id="txtPlaceLicenceIssue" maxlength="32" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="driversIdentityHide">
                                        <div class="form-group error-parent">
                                            <span class="error error-icon" id="spnDriverLicenceCategoryError" title="لطفا نوع گواهینامه را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                            <select id="cmbDriverLicenceCategory">
                                                <option selected="" value="-1">نوع گواهینامه</option>
                                                <option value="ندارد">1. ندارد</option>
                                                <option value="رویت نشد">2. رؤیت نشد</option>
                                                <option value="ب یک">3. ب یک</option>
                                                <option value="پایه دو">4. پایه دو</option>
                                                <option value="پایه یک">5. پایه یک</option>
                                                <option value="موتورسکلت">6. موتورسکلت</option>
                                                <option value="ویژه">7. ویژه</option>
                                                <option value="بین‌المللی">8. بین‌المللی</option>
                                                <option value="نظامی">9. نظامی</option>
                                                <option value="ب دو">10. ب دو</option>
                                                <option value="پایه سه">11. پایه سه</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="driversIdentityHide">
                                        <div class="form-group error-parent">
                                            <span class="error error-icon" id="spnDriverLicenceStatusError" title="لطفا وضعیت گواهینامه را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                            <select id="cmbDriverLicenceStatus">
                                                <option selected="" value="-1">وضعیت گواهینامه</option>
                                                <option value="مجاز">1. مجاز</option>
                                                <option value="غیرمجاز">2. غیرمجاز</option>
                                                <option value="تاریخ منقضی">3. تاریخ منقضی</option>
                                                <option value="محروم از رانندگی">4. محروم از رانندگی</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class=" form-group row">
                                        <div class="col-12">
                                            <div style="font-size: 10px">آیا اطلاعات با سیستم صدور گواهینامه تطابق دارد؟</div>
                                        </div>
                                        <div class="col-12">
                                            <div style="float: left">
                                                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                                    <input type="radio" class="btn-check" name="DriverLicenceIncompatibility" id="rdoDriverLicenceIncompatibilityYes" autocomplete="off" value="Yes" />
                                                    <label class="btn btn-outline-warning" for="rdoDriverLicenceIncompatibilityYes">بله</label>
                                                    <input type="radio" class="btn-check" name="DriverLicenceIncompatibility" id="rdoDriverLicenceIncompatibilityNo" autocomplete="off" value="No" />
                                                    <label class="btn btn-outline-secondary" for="rdoDriverLicenceIncompatibilityNo">خیر</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-9" style="font-size: 10px">تعداد سرنشینان وسیله نقلیه (به جز راننده)</div>
                                        <div class="col-3 error-parent">
                                            <span class="error error-icon" id="spnNumberOfPassengersError" title="لطفا تعداد سرنشینان وسیله نقلیه را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                            <input type="number" id="txtNumberOfPassengers" min="0" max="250" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col-4">
                                <div class="white-box-shadow">
                                    <div class="driversIdentityHide">
                                        <div class="form-group row">
                                            <select id="cmbEducation">
                                                <option selected="" value="-1">تحصیلات</option>
                                                <option value="نامشخص">1. نامشخص</option>
                                                <option value="بی ‌سواد">2. بی ‌سواد</option>
                                                <option value="زیر دیپلم">3. زیر دیپلم</option>
                                                <option value="دیپلم">4. دیپلم</option>
                                                <option value="فوق دیپلم">5. فوق دیپلم</option>
                                                <option value="لیسانس">6. لیسانس</option>
                                                <option value="فوق لیسانس">7. فوق لیسانس</option>
                                                <option value="بالاتر">8. بالاتر</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="driversIdentityHide">
                                        <div class="form-group row">
                                            <select id="cmbJob">
                                                <option selected="" value="-1">شغل</option>
                                                <option value="نامشخص">1. نامشخص</option>
                                                <option value="راننده">2. راننده</option>
                                                <option value="کارگر">3. کارگر</option>
                                                <option value="نظامی">4. نظامی</option>
                                                <option value="آزاد">5. آزاد</option>
                                                <option value="دانش ‌آموز">6. دانش‌ آموز</option>
                                                <option value="دانشجو">7. دانشجو</option>
                                                <option value="سایر">8. سایر</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group error-parent">
                                        <span class="error error-icon" id="spnSeatBeltError" title="لطفا کمربند / کلاه ایمنی را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <select id="cmbSeatBelt">
                                            <option selected="" value="-1">کمربند / کلاه ایمنی</option>
                                            <option value="نامشخص">1. نامشخص</option>
                                            <option value="استفاده کرده">2. استفاده کرده</option>
                                            <option value="استفاده نکرده">3. استفاده نکرده</option>
                                        </select>
                                    </div>
                                    <div class="form-group error-parent">
                                        <span class="error error-icon" id="spnInjuryAtSceneError" title="لطفا صدمه در صحنه را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <select id="cmbInjuryAtScene">
                                            <option selected="" value="-1">صدمه در صحنه</option>
                                            <option value="صدمه ندیده">1. صدمه ندیده</option>
                                            <option value="مصدوم">2. مصدوم</option>
                                            <option value="متوفی">3. متوفی</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <select id="cmbDriverStatues">
                                            <option selected="" value="-1">وضعیت راننده وسیله ‌نقلیه</option>
                                            <option value="در صحنه حضور دارد">1. در صحنه حضور دارد</option>
                                            <option value="از صحنه متواری شده">2. از صحنه متواری شده</option>
                                            <option value="به بیمارستان منتقل شده">3. به بیمارستان منتقل شده</option>
                                            <option value="در صحنه فوت شده">4. در صحنه فوت شده</option>
                                        </select>
                                    </div>
                                    <div class="form-group row align-items-center">
                                        <div class="col-3">نحوه انتقال</div>
                                        <div class="col-9 error-parent">
                                            <span class="error error-icon" id="spnTransferMethodError" title="لطفا نحوه انتقال را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                            <input type="text" id="txtTransferMethod" maxlength="32" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div>عکس­ العمل راننده قبل از تصادف</div>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" id="txtReactionBeforeAccident" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 hide ShowPedestriansInvolved">
                        <div class="white-box-shadow">
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnOnSiteCrossingFacilitiesError" title="لطفا امکانات عبور در محل را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbOnSiteCrossingFacilities">
                                    <option selected="" value="-1">امکانات عبور در محل</option>
                                    <option value="ندارد">1. ندارد</option>
                                    <option value="نیاز ندارد">2. نیاز ندارد</option>
                                    <option value="پل عابر">3. پل عابر</option>
                                    <option value="زیرگذر">4. زیرگذر</option>
                                    <option value="خط کشی ویژه عابر پیاده">5. خط کشی ویژه عابر پیاده</option>
                                    <option value="چراغ راهنمایی">6. چراغ راهنمایی</option>
                                    <option value="سایر">7. سایر</option>
                                </select>
                            </div>
                            <div class=" form-group row">
                                <div class="col-8">
                                    <div style="font-size: 10px">آیا هویت عابر پیاده معلوم است؟</div>
                                </div>
                                <div class="col-4">
                                    <div style="float: left">
                                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" class="btn-check pedestriansIdentity" name="PedestriansIdentity" id="rdoPedestriansIdentityYes" autocomplete="off" value="Yes" />
                                            <label class="btn btn-outline-warning" for="rdoPedestriansIdentityYes">بله</label>
                                            <input type="radio" class="btn-check pedestriansIdentity" name="PedestriansIdentity" id="rdoPedestriansIdentityNo" autocomplete="off" value="No" />
                                            <label class="btn btn-outline-secondary" for="rdoPedestriansIdentityNo">خیر</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pedestriansIdentityHide">
                                <div class="form-group row">
                                    <label for="txtNationalIdPedestrians" class="col-4 col-form-label">کد ملی</label>
                                    <div class="col-8 error-parent">
                                        <span class="error error-icon" id="spnNationalIdPedestriansError" title="لطفا کد ملی را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" id="txtNationalIdPedestrians" maxlength="10" />
                                    </div>
                                </div>
                            </div>

                            <div class="pedestriansIdentityHide">
                                <div class="form-group row">
                                    <label for="txtFirstNamePedestrians" class="col-4 col-form-label">نام</label>
                                    <div class="col-8 error-parent">
                                        <span class="error error-icon" id="spnFirstNamePedestriansError" title="لطفا نام را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" id="txtFirstNamePedestrians" maxlength="10" />
                                    </div>
                                </div>
                            </div>
                            <div class="pedestriansIdentityHide">
                                <div class="form-group row">
                                    <label for="txtLastNamePedestrians" class="col-4 col-form-label">نام خانوادگی</label>
                                    <div class="col-8 error-parent">
                                        <span class="error error-icon" id="spnLastNamePedestriansError" title="لطفا نام خانوادگی را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" id="txtLastNamePedestrians" maxlength="10" />
                                    </div>
                                </div>
                            </div>
                            <div class="pedestriansIdentityHide">
                                <div class="form-group row">
                                    <label for="txtFatherNamePedestrians" class="col-4 col-form-label">نام پدر</label>
                                    <div class="col-8 error-parent">
                                        <span class="error error-icon" id="spnFatherNamePedestriansError" title="لطفا نام پدر را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" id="txtFatherNamePedestrians" maxlength="10" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-3 hide ShowPedestriansInvolved">
                        <div class="white-box-shadow">
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnSexPedestriansError" title="لطفا جنسیت را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbSexPedestrians">
                                    <option selected="" value="-1">جنسیت</option>
                                    <option value="مرد">1. مرد</option>
                                    <option value="زن">2. زن</option>
                                    <option value="نامعلوم">3. نامعلوم</option>
                                </select>
                            </div>
                            <div class="pedestriansIdentityHide">
                                <div class="form-group row">
                                    <label for="txtAgePedestrians" class="col-4 col-form-label">سن</label>
                                    <div class="col-8 error-parent">
                                        <span class="error error-icon" id="spnAgePedestriansError" title="لطفا سن را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="number" id="txtAgePedestrians" min="0" max="139" />
                                    </div>
                                </div>
                            </div>
                            <div class="pedestriansIdentityHide">
                                <div class="form-group row">
                                    <select id="cmbEducationPedestrians">
                                        <option selected="" value="-1">تحصیلات</option>
                                        <option value="نامشخص">1. نامشخص</option>
                                        <option value="بی ‌سواد">2. بی ‌سواد</option>
                                        <option value="زیر دیپلم">3. زیر دیپلم</option>
                                        <option value="دیپلم">4. دیپلم</option>
                                        <option value="فوق دیپلم">5. فوق دیپلم</option>
                                        <option value="لیسانس">6. لیسانس</option>
                                        <option value="فوق لیسانس">7. فوق لیسانس</option>
                                        <option value="بالاتر">8. بالاتر</option>
                                    </select>
                                </div>
                            </div>
                            <div class="pedestriansIdentityHide">
                                <div class="form-group">
                                    <select id="cmbJobPedestrians">
                                        <option selected="" value="-1">شغل</option>
                                        <option value="نامشخص">1. نامشخص</option>
                                        <option value="راننده">2. راننده</option>
                                        <option value="کارگر">3. کارگر</option>
                                        <option value="نظامی">4. نظامی</option>
                                        <option value="آزاد">5. آزاد</option>
                                        <option value="دانش ‌آموز">6. دانش‌ آموز</option>
                                        <option value="دانشجو">7. دانشجو</option>
                                        <option value="سایر">8. سایر</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnClothesColorError" title="لطفا رنگ لباس را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbClothesColor">
                                    <option selected="" value="-1">رنگ لباس</option>
                                    <option value="روشن">1. روشن</option>
                                    <option value="تیره">2. تیره</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 hide ShowPedestriansInvolved">
                        <div class="white-box-shadow">
                            <div class="form-group row">
                                <label for="txtPedestriansAverageSpeed" class="col-5 col-form-label">سرعت متوسط عابر پیاده</label>
                                <div class="col-7">
                                    <input type="number" id="txtPedestriansAverageSpeed" min="0" max="29" placeholder="متر بر ثانیه" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="txtPedestrianThrowDistance" class="col-5 col-form-label">فاصله پرتاب عابر پیاده</label>
                                <div class="col-7">
                                    <input type="number" id="txtPedestrianThrowDistance" min="0" max="1000" placeholder="متر" />
                                </div>
                            </div>
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnPedestriansSituationError" title="لطفا وضعیت را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbPedestriansSituation">
                                    <option selected="" value="-1">وضعیت</option>
                                    <option value="عبور از عرض راه از مسیر مجاز">1. عبور از عرض راه از مسیر مجاز</option>
                                    <option value="عبور از عرض راه از مسیر غیرمجاز">2. عبور از عرض راه از مسیر غیرمجاز</option>
                                    <option value="در حالت ایستاده کنار راه">3. در حالت ایستاده کنار راه</option>
                                    <option value="در حال سوار یا پیاده شدن از وسیله ‌نقلیه">4. در حال سوار یا پیاده شدن از وسیله ‌نقلیه</option>
                                    <option value="عبور همسو با حرکت وسیله‌ نقلیه">5. عبور همسو با حرکت وسیله ‌نقلیه</option>
                                    <option value="عبور در خلاف حرکت وسیله‌ نقلیه">6. عبور در خلاف حرکت وسیله ‌نقلیه</option>
                                    <option value="خارج از مسیر سواره رو">7. خارج از مسیر سواره رو</option>
                                    <option value="در حال کار کردن/ کار روی وسیله نقلیه">8. در حال کار کردن/ کار روی وسیله نقلیه</option>
                                    <option value="پریدن ناگهانی در جلوی وسیله‌ نقلیه">9. پریدن ناگهانی در جلوی وسیله‌ نقلیه</option>
                                    <option value="دویدن ناگهانی بر روی راه">10. دویدن ناگهانی بر روی راه</option>
                                    <option value="در حال هل دادن وسیله ‌نقلیه">11. در حال هل دادن وسیله ‌نقلیه</option>
                                    <option value="عبور از موانع راه">12. عبور از موانع راه</option>
                                    <option value="سایر موارد">13. سایر موارد</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 hide ShowBikeRidersInvolved">
                        <div class="white-box-shadow">
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnOnSiteCrossingFacilitiesBikeRidersError" title="لطفا امکانات عبور در محل را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbOnSiteCrossingFacilitiesBikeRiders">
                                    <option selected="" value="-1">امکانات عبور در محل</option>
                                    <option value="ندارد">1. ندارد</option>
                                    <option value="نیاز ندارد">2. نیاز ندارد</option>
                                    <option value="پل عابر">3. پل عابر</option>
                                    <option value="زیرگذر">4. زیرگذر</option>
                                    <option value="خط کشی ویژه عابر پیاده">5. خط کشی ویژه عابر پیاده</option>
                                    <option value="چراغ راهنمایی">6. چراغ راهنمایی</option>
                                    <option value="سایر">7. سایر</option>
                                </select>
                            </div>
                            <div class=" form-group row">
                                <div class="col-8">
                                    <div style="font-size: 10px">آیا هویت دوچرخه سوار معلوم است؟</div>
                                </div>
                                <div class="col-4">
                                    <div style="float: left">
                                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" class="btn-check BikeRidersIdentity" name="BikeRidersIdentity" id="rdoBikeRidersIdentityYes" autocomplete="off" value="Yes" />
                                            <label class="btn btn-outline-warning" for="rdoBikeRidersIdentityYes">بله</label>
                                            <input type="radio" class="btn-check BikeRidersIdentity" name="BikeRidersIdentity" id="rdoBikeRidersIdentityNo" autocomplete="off" value="No" />
                                            <label class="btn btn-outline-secondary" for="rdoBikeRidersIdentityNo">خیر</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="BikeRidersIdentityHide">
                                <div class="form-group row">
                                    <label for="txtNationalIdBikeRiders" class="col-4 col-form-label">کد ملی</label>
                                    <div class="col-8 error-parent">
                                        <span class="error error-icon" id="spnNationalIdBikeRidersError" title="لطفا کد ملی را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" id="txtNationalIdBikeRiders" maxlength="10" />
                                    </div>
                                </div>
                            </div>
                            <div class="BikeRidersIdentityHide">
                                <div class="form-group row">
                                    <label for="txtFirstNameBikeRiders" class="col-4 col-form-label">نام</label>
                                    <div class="col-8 error-parent">
                                        <span class="error error-icon" id="spnFirstNameBikeRidersError" title="لطفا نام را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" id="txtFirstNameBikeRiders" maxlength="10" />
                                    </div>
                                </div>
                            </div>
                            <div class="BikeRidersIdentityHide">
                                <div class="form-group row">
                                    <label for="txtLastNameBikeRiders" class="col-4 col-form-label">نام خانوادگی</label>
                                    <div class="col-8 error-parent">
                                        <span class="error error-icon" id="spnLastNameBikeRidersError" title="لطفا نام خانوادگی را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" id="txtLastNameBikeRiders" maxlength="10" />
                                    </div>
                                </div>
                            </div>
                            <div class="BikeRidersIdentityHide">
                                <div class="form-group row">
                                    <label for="txtFatherNameBikeRiders" class="col-4 col-form-label">نام پدر</label>
                                    <div class="col-8 error-parent">
                                        <span class="error error-icon" id="spnFatherNameBikeRidersError" title="لطفا نام پدر را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" id="txtFatherNameBikeRiders" maxlength="10" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-3 hide ShowBikeRidersInvolved">
                        <div class="white-box-shadow">
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnSexBikeRidersError" title="لطفا جنسیت را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbSexBikeRiders">
                                    <option selected="" value="-1">جنسیت</option>
                                    <option value="مرد">1. مرد</option>
                                    <option value="زن">2. زن</option>
                                    <option value="نامعلوم">3. نامعلوم</option>
                                </select>
                            </div>
                            <div class="BikeRidersIdentityHide">
                                <div class="form-group row">
                                    <label for="txtAgeBikeRiders" class="col-4 col-form-label">سن</label>
                                    <div class="col-8 error-parent">
                                        <span class="error error-icon" id="spnAgeBikeRidersError" title="لطفا سن را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="number" id="txtAgeBikeRiders" min="0" max="139" />
                                    </div>
                                </div>
                            </div>
                            <div class="BikeRidersIdentityHide">
                                <div class="form-group row">
                                    <select id="cmbEducationBikeRiders">
                                        <option selected="" value="-1">تحصیلات</option>
                                        <option value="نامشخص">1. نامشخص</option>
                                        <option value="بی ‌سواد">2. بی ‌سواد</option>
                                        <option value="زیر دیپلم">3. زیر دیپلم</option>
                                        <option value="دیپلم">4. دیپلم</option>
                                        <option value="فوق دیپلم">5. فوق دیپلم</option>
                                        <option value="لیسانس">6. لیسانس</option>
                                        <option value="فوق لیسانس">7. فوق لیسانس</option>
                                        <option value="بالاتر">8. بالاتر</option>
                                    </select>
                                </div>
                            </div>
                            <div class="BikeRidersIdentityHide">
                                <div class="form-group">
                                    <select id="cmbJobBikeRiders">
                                        <option selected="" value="-1">شغل</option>
                                        <option value="نامشخص">1. نامشخص</option>
                                        <option value="راننده">2. راننده</option>
                                        <option value="کارگر">3. کارگر</option>
                                        <option value="نظامی">4. نظامی</option>
                                        <option value="آزاد">5. آزاد</option>
                                        <option value="دانش ‌آموز">6. دانش‌ آموز</option>
                                        <option value="دانشجو">7. دانشجو</option>
                                        <option value="سایر">8. سایر</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnClothesColorBikeRidersError" title="لطفا رنگ لباس را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbClothesColorBikeRiders">
                                    <option selected="" value="-1">رنگ لباس</option>
                                    <option value="روشن">1. روشن</option>
                                    <option value="تیره">2. تیره</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 hide ShowBikeRidersInvolved">
                        <div class="white-box-shadow">
                            <div class="form-group row">
                                <label for="txtBikeRidersAverageSpeed" class="col-4 col-form-label">سرعت متوسط دوچرخه سوار</label>
                                <div class="col-8">
                                    <input type="number" id="txtBikeRidersAverageSpeed" min="0" max="29" placeholder="کیلومتر بر ساعت" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="txtBikeRidersThrowDistance" class="col-4 col-form-label">فاصله پرتاب دوچرخه سوار</label>
                                <div class="col-8">
                                    <input type="number" id="txtBikeRidersThrowDistance" min="0" max="1000" placeholder="متر" />
                                </div>
                            </div>
                            <div class="form-group error-parent">
                                <span class="error error-icon" id="spnBikeRidersSituationError" title="لطفا وضعیت را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select id="cmbBikeRidersSituation">
                                    <option selected="" value="-1">وضعیت</option>
                                    <option value="عبور از عرض راه از مسیر مجاز">1. عبور از عرض راه از مسیر مجاز</option>
                                    <option value="عبور از عرض راه از مسیر غیرمجاز">2. عبور از عرض راه از مسیر غیرمجاز</option>
                                    <option value="در حالت ایستاده کنار راه">3. در حالت ایستاده کنار راه</option>
                                    <option value="در حال سوار یا پیاده شدن از وسیله ‌نقلیه">4. در حال سوار یا پیاده شدن از وسیله ‌نقلیه</option>
                                    <option value="عبور همسو با حرکت وسیله‌ نقلیه">5. عبور همسو با حرکت وسیله ‌نقلیه</option>
                                    <option value="عبور در خلاف حرکت وسیله‌ نقلیه">6. عبور در خلاف حرکت وسیله ‌نقلیه</option>
                                    <option value="خارج از مسیر سواره رو">7. خارج از مسیر سواره رو</option>
                                    <option value="در حال کار کردن/ کار روی وسیله نقلیه">8. در حال کار کردن/ کار روی وسیله نقلیه</option>
                                    <option value="پریدن ناگهانی در جلوی وسیله‌ نقلیه">9. پریدن ناگهانی در جلوی وسیله‌ نقلیه</option>
                                    <option value="دویدن ناگهانی بر روی راه">10. دویدن ناگهانی بر روی راه</option>
                                    <option value="در حال هل دادن وسیله ‌نقلیه">11. در حال هل دادن وسیله ‌نقلیه</option>
                                    <option value="عبور از موانع راه">12. عبور از موانع راه</option>
                                    <option value="سایر موارد">13. سایر موارد</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="row">
                        <div class="col-12" id="lblVehiclesToast"></div>
                    </div>
                    <div class="col-12 text-center hide" id="divVehiclesButton">
                        <button type='button' id="btnSubmitFifthStep" class="btn-login" onclick="SaveFifthStepData()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">ثبت و مرحله بعد</button>
                        <button type='button' id="btnBackFifthStepTwo" class="btn btn-outline-info hide" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">برگشت به مرحله قبل</button>
                        <button type='button' id="btnSubmitFifthStepTwo" class="btn-login hide" onclick="SaveFifthStepDataTwo()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">ثبت و مرحله بعد</button>
                        <button type='button' id="btnBackFifthStepThree" class="btn btn-outline-info hide" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">برگشت به مرحله قبل</button>
                        <button type='button' id="btnSubmitFifthStepThree" class="btn-login hide" onclick="SaveFifthStepDataThree()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">ثبت و دخیره</button>
                        <div class="spinner-border text-warning" role="status" style="display: none" id="spinFifthStepLoading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div class="col-12 text-center hide" id="divPedestriansButton">
                        <button type='button' id="btnSubmitPedestrians" class="btn-login" onclick="SavePedestrians()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">ثبت و دخیره</button>
                        <div class="spinner-border text-warning" role="status" style="display: none" id="spinPedestriansLoading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div class="col-12 text-center hide" id="divBikeRidersButton">
                        <button type='button' id="btnSubmitBikeRiders" class="btn-login" onclick="SaveBikeRiders()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">ثبت و دخیره</button>
                        <button type='button' id="btnGoToSixStep" class="btn btn-outline-success hide" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">رفتن به مرحله بعد</button>
                        <div class="spinner-border text-warning" role="status" style="display: none" id="spinBikeRidersLoading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="divSixthStep" style="display: none;width: 1120px">
                <label class="fa-2x">اطلاعات مصدومین و متوفیان</label><span id="spnOpenCommentSixth" style="display: none" onclick="OpenCommentDialog('Sixth')"><i class="fa fa-comment-dots fa-3x fa-flip-horizontal gray"></i></span>
                <div class="row">
                    <div class="col-3">
                        <div class="form-group row">
                            <label for="txtNumberOfInjured" class="col-8 zero-padding-left col-form-label">تعداد مصدومین و متوفیان در تصادف</label>
                            <div class="col-4 error-parent">
                                <span class="error error-icon" id="spnNumberOfInjuredError" title="لطفا تعداد مصدومین و متوفیان در تصادف را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input type="number" min="0" max="30" id="txtNumberOfInjured" />
                            </div>
                        </div>
                        <div class="form-group row" id="divGenarateInjured"></div>
                    </div>
                    <div class="col-3 hide" id="divInjuredRole">
                        <div class="form-group">
                            <input type="radio" class="btn-check InjuredRole" name="InjuredRole" id="rdoIsDrive" autocomplete="off" value="Driver" />
                            <label class="btn btn-outline-warning" for="rdoIsDrive">راننده</label>
                            <input type="radio" class="btn-check InjuredRole" name="InjuredRole" id="rdoIsPedestrian" autocomplete="off" value="Pedestrian" />
                            <label class="btn btn-outline-warning" for="rdoIsPedestrian">عابر پیاده</label>
                            <input type="radio" class="btn-check InjuredRole" name="InjuredRole" id="rdoIsCyclist" autocomplete="off" value="Cyclist" />
                            <label class="btn btn-outline-warning" for="rdoIsCyclist">دوچرخه سوار</label>
                            <input type="radio" class="btn-check InjuredRole" name="InjuredRole" id="rdoIsPassenger" autocomplete="off" value="Passenger" />
                            <label class="btn btn-outline-warning" for="rdoIsPassenger">سرنشین</label>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <div class="white-box-shadow hide" id="divGenarateInjuredList">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group row">
                            <div class="col-12">
                                <div class="white-box-shadow hide" id="divInjuredDetailReadOnly">
                                    <div class=" form-group row hide" id="divPassengerIdentity">
                                        <div class="col-8">
                                            <div style="font-size: 10px">آیا هویت سرنشین معلوم است؟</div>
                                        </div>
                                        <div class="col-4">
                                            <div style="float: left">
                                                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                                    <input type="radio" class="btn-check PassengerIdentity" name="PassengerIdentity" id="rdoPassengerIdentityYes" autocomplete="off" value="Yes" />
                                                    <label class="btn btn-outline-warning" for="rdoPassengerIdentityYes">بله</label>
                                                    <input type="radio" class="btn-check PassengerIdentity" name="PassengerIdentity" id="rdoPassengerIdentityNo" autocomplete="off" value="No" />
                                                    <label class="btn btn-outline-secondary" for="rdoPassengerIdentityNo">خیر</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group error-parent hide" id="divSexPassenger">
                                        <span class="error error-icon" id="spnSexPassengerError" title="لطفا جنسیت را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <div class="row">
                                            <select id="cmbSexPassenger">
                                                <option selected="" value="-1">جنسیت</option>
                                                <option value="مرد">1. مرد</option>
                                                <option value="زن">2. زن</option>
                                                <option value="نامعلوم">3. نامعلوم</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row hide" id="divFirstNameInjured">
                                        <label class="col-3 zero-padding-left col-form-label">نام</label>
                                        <div class="col-9">
                                            <input type="text" maxlength="32" id="txtFirstNameInjured" readonly="" />
                                        </div>
                                    </div>
                                    <div class="form-group row hide" id="divLastNameInjured">
                                        <label class="col-3 zero-padding-left col-form-label">نام خانوادگی</label>
                                        <div class="col-9">
                                            <input type="text" maxlength="32" id="txtLastNameInjured" readonly="" />
                                        </div>
                                    </div>
                                    <div class="PassengerIdentityHide">
                                        <div class="form-group row">
                                            <label for="txtFatherNamePassenger" class="col-4 col-form-label">نام پدر</label>
                                            <div class="col-8">
                                                <input type="text" id="txtFatherNamePassenger" maxlength="10" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="PassengerIdentityHide">
                                        <div class="form-group row">
                                            <label for="txtNationalIdPassenger" class="col-4 col-form-label">کد ملی</label>
                                            <div class="col-8 error-parent">
                                                <span class="error error-icon" id="spnNationalIdPassengerError" title="لطفا کد ملی را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                                <input type="text" id="txtNationalIdPassenger" maxlength="10" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="PassengerIdentityHide">
                                        <div class="form-group row">
                                            <label for="txtAgePassenger" class="col-4 col-form-label">سن</label>
                                            <div class="col-8 error-parent">
                                                <span class="error error-icon" id="spnAgePassengerError" title="لطفا سن را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                                <input type="number" id="txtAgePassenger" min="0" max="139" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row hide" id="divDriverInjured">
                                        <label class="col-4 zero-padding-left col-form-label">راننده وسیله نقلیه</label>
                                        <div class="col-8">
                                            <input type="text" maxlength="64" id="txtDriverInjured" readonly="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group row">
                            <div class="col-12">
                                <div class="white-box-shadow hide" id="divInjuredDetail">
                                    <div class="PassengerIdentityHide">
                                        <div class="form-group row">
                                            <select id="cmbEducationPassenger">
                                                <option selected="" value="-1">تحصیلات</option>
                                                <option value="نامشخص">1. نامشخص</option>
                                                <option value="بی ‌سواد">2. بی ‌سواد</option>
                                                <option value="زیر دیپلم">3. زیر دیپلم</option>
                                                <option value="دیپلم">4. دیپلم</option>
                                                <option value="فوق دیپلم">5. فوق دیپلم</option>
                                                <option value="لیسانس">6. لیسانس</option>
                                                <option value="فوق لیسانس">7. فوق لیسانس</option>
                                                <option value="بالاتر">8. بالاتر</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="PassengerIdentityHide">
                                        <div class="form-group row">
                                            <select id="cmbJobPassenger">
                                                <option selected="" value="-1">شغل</option>
                                                <option value="نامشخص">1. نامشخص</option>
                                                <option value="راننده">2. راننده</option>
                                                <option value="کارگر">3. کارگر</option>
                                                <option value="نظامی">4. نظامی</option>
                                                <option value="آزاد">5. آزاد</option>
                                                <option value="دانش ‌آموز">6. دانش‌ آموز</option>
                                                <option value="دانشجو">7. دانشجو</option>
                                                <option value="سایر">8. سایر</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12 error-parent">
                                            <input type="text" maxlength="32" id="txtInjury" placeholder="صدمه" readonly="" />
                                            <span class="error error-icon" id="spnInjuryPassengerError" title="لطفا صدمه در صحنه را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                            <select id="cmbInjuryPassenger">
                                                <option selected="" value="-1">صدمه در صحنه</option>
                                                <option value="مصدوم">1. مصدوم</option>
                                                <option value="متوفی">2. متوفی</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group error-parent hide" id="divSafetyPassenger">
                                        <span class="error error-icon" id="spnSafetyPassengerError" title="لطفا ایمنی را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <div class="row">
                                            <select id="cmbSafetyPassenger">
                                                <option selected="" value="-1">ایمنی</option>
                                                <option value="نامشخص">1. نامشخص</option>
                                                <option value="از کمربند/کلاه ایمنی استفاده کرده">2. از کمربند/کلاه ایمنی استفاده کرده</option>
                                                <option value="از کمربند/کلاه ایمنی استفاده نکرده">3. از کمربند/کلاه ایمنی استفاده نکرده</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group error-parent hide" id="divPassengerSituation">
                                        <span class="error error-icon" id="spnPassengerSituationError" title="لطفا وضعیت را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <div class="row">
                                            <select id="cmbPassengerSituation">
                                                <option selected="" value="-1">وضعیت</option>
                                                <option value="صندلی جلو سواری">1. صندلی جلو سواری</option>
                                                <option value="صندلی عقب سواری">2. صندلی عقب سواری</option>
                                                <option value="سرنشین موتورسیکلت">3. سرنشین موتورسیکلت</option>
                                                <option value="سرنشین اتوبوس">4. سرنشین اتوبوس</option>
                                                <option value="سرنشین کامیون">5. سرنشین کامیون</option>
                                                <option value="ایستاده در اتوبوس و ...">6. ایستاده در اتوبوس و ...</option>
                                                <option value="در محل بار">7. در محل بار</option>
                                                <option value="سایر">8. سایر</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row hide" id="divInjuredTransferMethod">
                                        <div class="col-12 error-parent">
                                            <span class="error error-icon" id="spnInjuredTransferMethodError" title="لطفا نحوه انتقال مجروح را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                            <select id="cmbInjuredTransferMethod">
                                                <option selected="" value="-1">نحوه انتقال مجروح</option>
                                                <option value="آمبولانس">1. آمبولانس</option>
                                                <option value="خودرو عبوری">2. خودرو عبوری</option>
                                                <option value="چرخبال">3. چرخبال</option>
                                                <option value="پلیس">4. پلیس</option>
                                                <option value="سایر">5. سایر</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row hide" id="divAmbulanceCode">
                                        <label class="col-5 zero-padding-left col-form-label">کد آمبولانس</label>
                                        <div class="col-7 error-parent">
                                            <span class="error error-icon" id="spnAmbulanceCodeError" title="لطفا کد آمبولانس را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                            <input type="text" maxlength="32" id="txtAmbulanceCode" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <button type='button' id="btnSubmitSixthStep" class="btn-login" onclick="SaveSixthStepData()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">ثبت</button>
                        <div class="spinner-border text-warning" role="status" style="display: none" id="spinSixthStepLoading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="divSeventhStep" style="display: none;width: 1120px">
                <label class="fa-2x">کروکی تصادف</label><span id="spnOpenCommentSeventh" style="display: none" onclick="OpenCommentDialog('Seventh')"><i class="fa fa-comment-dots fa-3x fa-flip-horizontal gray"></i></span>
                <div class="row">
                    <div class="col-2">
                        <div class="form-group white-box-shadow">
                            <div class="form-group"><i class="fa fa-pen-swirl fa-2x yellow"></i>&nbsp;<span>نصویر کروکی</span></div>
                            <div class="form-group"><span class="wordwrap">لطفا تصویر کروکی ترسیم شده را بارگذاری نمایید</span></div>
                            <div id="AccidentDiagramUpload" data-dz-message class="dropzone dz-clickable custome-drop">
                                <div class="dz-default dz-message">
                                    <i class="fa fa-camera fa-3x yellow"></i>
                                    <br />
                                    <span>بارگذاری تصویر کروکی</span>
                                </div>
                            </div>
                            <input type="hidden" runat="server" id="hideAccidentGuid" clientidmode="Static" />
                        </div>
                        <div class="form-group white-box-shadow">
                            <div class="form-group"><span>اطلاعات تکمیلی</span></div>
                            <div class="form-group">
                                <label for="txtPrimaryCause" class="form-group">علل اولیه تصادف</label>
                                <div class="row align-items-center">
                                    <div class="col-10">
                                        <input type="text" maxlength="256" id="txtPrimaryCause" placeholder="... جزییات تصادف را وارد نمایید" />
                                    </div>
                                    <div class="col-2">
                                        <i class="fa fa-microphone fa-2x yellow" id="btnOpenMicPrimaryCause" style="visibility:hidden;"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="txtFormerCause" class="form-group">علل قبلی تصادف</label>
                                <div class="row align-items-center">
                                    <div class="col-10">
                                        <input type="text" maxlength="256" id="txtFormerCause" placeholder="... جزییات تصادف را وارد نمایید" />
                                    </div>
                                    <div class="col-2">
                                        <i class="fa fa-microphone fa-2x yellow" id="btnOpenMicFormerCause"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="txtDirectCause" class="form-group">علل مستقیم تصادف</label>
                                <div class="row align-items-center">
                                    <div class="col-10">
                                        <input type="text" maxlength="256" id="txtDirectCause" placeholder="... جزییات تصادف را وارد نمایید" />
                                    </div>
                                    <div class="col-2">
                                        <i class="fa fa-microphone fa-2x yellow" id="btnOpenMicDirectCause"  style="visibility:hidden;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group white-box-shadow">
                            <div class="form-group"><i class="fa fa-microphone fa-2x yellow"></i>&nbsp;<span>فایل صوتی کروکی</span></div>
                            <div class="form-group"><span>لطفا صحنه تصادف را در قالب یک فایل صوتی شرح دهید</span></div>
                            <div id="controls">
                                <span class="inline text-warning" style="display: none;visibility:hidden;" id="spinRecordLoading"  >
                                    <i class="fa fa-microphone fa-2x blink"></i>
                                </span>
                                <button type="button" id="recordButton" class="btn btn-outline-success">ضبط</button>
                                <button type="button" id="pauseButton" class="btn btn-outline-warning" disabled>مکث</button>
                                <button type="button" id="stopButton" class="btn btn-outline-danger" disabled>توقف</button>
                            </div>
                            <ol id="recordingsList"></ol>
                            <script src="/Scripts/recorder.js"></script>
                            <script src="/Scripts/jsExplanationAudio.js?n=14010321"></script>
                        </div>
                        <div class="form-group white-box-shadow">
                            <div class="form-group"><span>افراد و سازمان های مقصر در تصادف</span></div>
                            <div class="form-group row">
                                <div class="col-8">
                                    <div class="form-group">افراد درگیر در تصادف</div>
                                    <div id="divGenerateRowPeopleAccidentPercen"></div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group text-center">درصد</div>
                                    <div id="divGenerateRowPeopleAccident"></div>
                                </div>
                            </div>
                            <hr />
                            <br />
                            <div class="form-group row">
                                <div class="col-8">
                                    <div class="form-group error-parent">
                                        <%--<span class="error error-icon" id="spnOrganizationsToBlameError" title="لطفا سازمان مقصر در تصادف را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>--%>
                                        <select id="cmbOrganizationsToBlame">
                                            <option value="-1" selected="">سازمان های مقصر در تصادف</option>
                                            <option value="وزارت راه">1. وزارت راه</option>
                                            <option value="شهرداری">2. شهرداری</option>
                                            <option value="دهیاری">3. دهیاری</option>
                                            <option value="سایر">4. سایر</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group error-parent">
                                        <%--<span class="error error-icon" id="spnDirectCausePrecentError" title="لطفا سازمان مقصر در تصادف را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>--%>
                                        <input type="number" max="100" min="0" step="0.1" id="txtDirectCausePrecent" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-8">
                                    <div class="form-group error-parent">
                                        <span class="error error-icon" id="spnOrganizationsToBlameTextError" title="لطفا نام سازمان مقصر در تصادف را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" id="txtOrganizationsToBlame" placeholder="سایر ..." style="display: none" />
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group error-parent">
                                        <span class="error error-icon" id="spnOtherDirectCausePrecentError" title="لطفا درصد را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="number" max="100" min="0" step="0.1" id="txtOtherDirectCausePrecent" style="display: none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group white-box-shadow">
                            <div class="form-group"><i class="fa fa-camera fa-2x yellow"></i>&nbsp;<span>تصاویر صحنه تصادف</span><span id="spnAccidentPictureHelper" class="fa fa-info-circle yellow fa-2x" style="float: left"></span></div>
                            <div class="form-group"><span>لطفا تصاویر صحنه تصادف را بارگذاری نمایید</span></div>
                            <div class="form-group row">
                                <div class="col-6">
                                    <div id="AccidentPicturesUpload1" data-dz-message class="dropzone dz-clickable custome-drop-picture">
                                        <div class="dz-default dz-message">
                                            <i class="fa fa-camera fa-3x yellow"></i>
                                            <br />
                                            <span>بارگذاری تصویر اول</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div id="AccidentPicturesUpload2" data-dz-message class="dropzone dz-clickable custome-drop-picture hide">
                                        <div class="dz-default dz-message">
                                            <i class="fa fa-camera fa-3x yellow"></i>
                                            <br />
                                            <span>بارگذاری تصویر دوم</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-6">
                                    <div id="AccidentPicturesUpload3" data-dz-message class="dropzone dz-clickable custome-drop-picture hide">
                                        <div class="dz-default dz-message">
                                            <i class="fa fa-camera fa-3x yellow"></i>
                                            <br />
                                            <span>بارگذاری تصویر سوم</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div id="AccidentPicturesUpload4" data-dz-message class="dropzone dz-clickable custome-drop-picture hide">
                                        <div class="dz-default dz-message">
                                            <i class="fa fa-camera fa-3x yellow"></i>
                                            <br />
                                            <span>بارگذاری تصویر چهارم</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-6">
                                    <div id="AccidentPicturesUpload5" data-dz-message class="dropzone dz-clickable custome-drop-picture hide">
                                        <div class="dz-default dz-message">
                                            <i class="fa fa-camera fa-3x yellow"></i>
                                            <br />
                                            <span>بارگذاری تصویر پنجم</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div id="AccidentPicturesUpload6" data-dz-message class="dropzone dz-clickable custome-drop-picture hide">
                                        <div class="dz-default dz-message">
                                            <i class="fa fa-camera fa-3x yellow"></i>
                                            <br />
                                            <span>بارگذاری تصویر ششم</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-6">
                                    <div id="AccidentPicturesUpload7" data-dz-message class="dropzone dz-clickable custome-drop-picture hide">
                                        <div class="dz-default dz-message">
                                            <i class="fa fa-camera fa-3x yellow"></i>
                                            <br />
                                            <span>بارگذاری تصویر هفتم</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div id="AccidentPicturesUpload8" data-dz-message class="dropzone dz-clickable custome-drop-picture hide">
                                        <div class="dz-default dz-message">
                                            <i class="fa fa-camera fa-3x yellow"></i>
                                            <br />
                                            <span>بارگذاری تصویر هشتم</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-6">
                                    <div id="AccidentPicturesUpload9" data-dz-message class="dropzone dz-clickable custome-drop-picture hide">
                                        <div class="dz-default dz-message">
                                            <i class="fa fa-camera fa-3x yellow"></i>
                                            <br />
                                            <span>بارگذاری تصویر نهم</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div id="AccidentPicturesUpload10" data-dz-message class="dropzone dz-clickable custome-drop-picture hide">
                                        <div class="dz-default dz-message">
                                            <i class="fa fa-camera fa-3x yellow"></i>
                                            <br />
                                            <span>بارگذاری تصویر دهم</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" runat="server" id="hideAccidentPicturesGuid" clientidmode="Static" />
                            <div class="form-group hide" id="divAccidentPictureHelper">
                                <span><i id="spnCloseAccidentPictureHelper" class="fa fa-times-circle yellow fa-2x"></i>&nbsp;<span>راهنمای عکسبرداری از صحنه تصادف</span></span>
                                <br />
                                <hr />
                                <br />
                                <span class="wordwrap" style="text-align: justify; display: block; line-height: 2">تصاویر باید واضح باشند و زوایای مختلف صحنه تصادف را ثبت کنند. مطابق تصویر زیر از چهار جهت استاندارد عکسبرداری کرده و بنا به تشخیص زوایای بیشتر نیز ثبت شوند.</span>
                                <div class="text-center">
                                    <img src="/Images/accident-picture-help.jpg" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-group white-box-shadow">
                            <div class="form-group"><i class="fa fa-car-crash fa-2x yellow"></i>&nbsp;<span>قسمت های آسیب دیده وسایل نقلیه</span></div>
                            <div class="row">
                                <div class="col-5">
                                    <div class="form-group error-parent">
                                        <span class="error error-icon" id="spnSelectAccidentCarError" title="لطفا وسیله نقلیه آسیب دیده را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <select id="cmbSelectAccidentCar"></select>
                                    </div>
                                    <div class="form-group error-parent">
                                        <span class="error error-icon" id="spnFirstPointCollisionError" title="لطفا اولین نقطه برخورد را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <select id="cmbFirstPointCollision">
                                            <option selected="" value="-1">اولین نقطه برخورد</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                        </select>
                                    </div>
                                    <div class="form-group error-parent">
                                        <span class="error error-icon" id="spnDamagedPartsError" title="لطفا قسمت های آسیب دیده را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <select id="cmbDamagedParts" multiple="multiple">
                                            <option selected="" value="-1">قسمت های آسیب دیده</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                        </select>
                                    </div>
                                    <div class="form-group error-parent">
                                        <button type='button' id="btnSubmitDamage" class="btn-login" onclick="SaveSeventhDamage()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">ثبت و ذخیره</button>
                                        <div class="spinner-border text-warning" role="status" style="display: none" id="spinSeventhDamageLoading">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-7">
                                    <div class="text-center">
                                        <img style="width: 100%" src="/Images/car-accident.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12" id="lblDamageToast"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <button type='button' id="btnSubmitSeventhStep" class="btn-login" onclick="SaveSeventhStepData()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">ثبت</button>
                        <button type='button' id="btnFormCompleted" class="btn-login hide" data-toggle="modal" data-target="#FormIsCompletedModal" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">تایید و اتمام رخداد</button>
                        <div class="spinner-border text-warning" role="status" style="display: none" id="spinSeventhStepLoading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <br />
                <div id="lblMessage" runat="server" clientidmode="Static"></div>
                <input type="hidden" id="hidId" runat="server" clientidmode="Static" />
            </div>
        </div>
        <br />
    </div>
    <div class='modal fade' id='RecordModal' tabindex='-1'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h5 class='modal-title' style='padding-right: 20px' id="hTitleRecord">ضبط صدا</h5>
                    <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                </div>
                <div class='modal-body'>
                    <div id="controlsRecord">
                        <span class="inline text-warning" style="display: none" id="spinModalRecordLoading">
                            <i class="fa fa-microphone fa-2x blink"></i>
                        </span>
                        <button type="button" id="recordButtonRecord" class="btn btn-outline-success">ضبط</button>
                        <button type="button" id="pauseButtonRecord" class="btn btn-outline-warning" disabled>مکث</button>
                        <button type="button" id="stopButtonRecord" class="btn btn-outline-danger" disabled>توقف</button>
                    </div>
                    <ol id="recordingsListRecord"></ol>
                    <br />
                    <div class="alert alert-success" id="divAudioMessage"></div>
                    <script src="/Scripts/jsCauseAudio.js?n=14010321"></script>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-outline-success' data-dismiss='modal'>بستن این پنجره</button>
                </div>
            </div>
        </div>
    </div>
    <div class='modal fade' id='FormIsCompletedModal' tabindex='-1'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h5 class='modal-title' style='padding-right: 20px'>تایید تکمیل فرم تصادف</h5>
                    <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                </div>
                <div class='modal-body'>
                    <div class="alert alert-success">اطلاعات با موفقیت ثبت و ذخیره شد!</div>
                    <div>
                        آیا از اتمام ثبت اطمینان دارید؟
                    </div>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-outline-success' onclick="SubmitCompleteForm();">بله</button>
                    <button type='button' class='btn btn-outline-danger' onclick="$('#FormIsCompletedModal').modal('hide');" data-dismiss='modal'>خیر</button>
                    <div class="spinner-border text-warning" role="status" style="display: none" id="spinCompleteFormLoading">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class='modal fade' id='CommentModal' tabindex='-1'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h5 class='modal-title' style='padding-right: 20px' id="hTitleComment">مشاهده نظر</h5>
                    <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                </div>
                <div class='modal-body'>
                    <h4>نکات نیازمند اصلاح : </h4>
                    <textarea id="txtComment" style="height: 165px" readonly=""></textarea>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-outline-primary' onclick="$('#CommentModal').modal('hide');" data-dismiss='modal'>بستن این پنجره</button>
                    <div class="spinner-border text-warning" role="status" style="display: none" id="spinCommentLoading">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="form-group" style="display: none" id="divCommentMessage"></div>
                </div>
            </div>
        </div>
    </div>
    <input type="hidden" id="hidRecordType" runat="server" clientidmode="Static" />
    <input type="hidden" id="hidPoliceStationArea" runat="server" clientidmode="Static" />
</asp:Content>
