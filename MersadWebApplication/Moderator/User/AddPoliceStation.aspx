<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="AddPoliceStation.aspx.cs" Inherits="MersadWebApplication.Moderator.User.AddPoliceStation" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">
    <style>
        .admin-after-head, .account {
            display: block;
        }

        #btnClearMap {
            position: absolute;
            top: 690px;
        }
    </style>
    <link href="/App_Themes/jquery.md.bootstrap.datetimepicker.style.css?n=14000931" rel="stylesheet" />
    <script src="/Scripts/jquery.md.bootstrap.datetimepicker.js?n=14000931"></script>
    <script src="/Scripts/jsAlertHelper.js"></script>
    <script src="/Scripts/jsHelper.js"></script>
    <script src="/Scripts/jsNationalIdChecker.js"></script>

    <script>
        function Search() {
            var getId = $("#txtIdSearch").val();
            var getName = $("#txtNameSearch").val();
            var getNationalId = $("#txtNationalIdSearch").val();
            var getCommanderName = $("#txtCommanderNameSearch").val();
            window.open("PoliceStationList?Id=" + getId + "&Name=" + getName + "&NationalId=" + getNationalId + "&CommanderName=" + getCommanderName, "_blank");
            return true;
        }
        function SaveData() {
            if ($("#txtName").val() == "") {
                $("#spnNameError").show("slow");
                $("#txtName").focus();
                return false;
            }
            if ($("#txtLocation").val() == "") {
                $("#spnLocationError").show("slow");
                $("#txtLocation").focus();
                return false;
            }
            if ($("#txtCode").val() == "") {
                $("#spnCodeError").show("slow"); $("#txtCode").focus();
                return false;
            }
            if ($("#txtCommanderName").val() == "") {
                $("#spnCommanderNameError").show("slow");
                $("#txtCommanderName").focus();
                return false;
            }
            if ($("#txtCommanderFamily").val() == "") {
                $("#spnCommanderFamilyError").show("slow");
                $("#txtCommanderFamily").focus();
                return false;
            }
            if ($("#txtNationalId").val() == "") {
                $("#spnNationalIdError").show("slow");
                $("#txtNationalId").focus();
                return false;
            }
            if ($("#txtNationalId").val().length != 10) {
                $("#spnNationalIdError").attr("title", "کد ملی باید 10 رقم باشد!");
                $("#spnNationalIdError").show("slow");
                $("#txtNationalId").focus();
                return false;
            }
            if (!isValidIranianNationalCode($("#txtNationalId").val())) {
                $("#spnNationalIdError").attr("title", "کد ملی وارد شده صحیح نمی باشد!");
                $("#spnNationalIdError").show("slow");
                $("#txtNationalId").focus();
                return false;
            }
            if ($("#hidLocation").val() == "") {
                $("#lblMessage").html(ErrorMessages("محدوده این پاسگاه روی نقشه مشخص نشده!"));
                $('html, body').animate({
                    scrollTop: $("#lblMessage").offset().top
                }, 1500);
                return false;
            }
            if ($("#txtUsername").val() == "" && $("#hidId").val() == "") {
                $("#spnUsernameError").show("slow"); $("#txtUsername").focus();
                return false;
            }
            if ($("#txtPassword").val() == "" && $("#hidId").val() == "") {
                $("#spnPasswordError").show("slow"); $("#txtPassword").focus();
                return false;
            }
            if ($("#txtRePassword").val() == "" && $("#hidId").val() == "") {
                $("#spnRePasswordError").show("slow"); $("#txtRePassword").focus();
                return false;
            }
            if ($("#txtPassword").val() != $("#txtRePassword").val()) {
                $("#spnRePasswordError").attr("title", "رمز عبور و تکرار آن با هم برابر نیست!");
                $("#spnRePasswordError").show("slow"); $("#txtRePassword").focus();
                //$("#lblMessage").html(ErrorMessages("رمز عبور و تکرار آن با هم برابر نیست!"));
                return false;
            }
            var obj = {
                "id": $("#hidId").val(),
                "name": $("#txtName").val(),
                "location": $("#txtLocation").val().replace("LatLng(", "").replace(")", ""),
                "code": $("#txtCode").val(),
                "commanderName": $("#txtCommanderName").val(),
                "commanderFamily": $("#txtCommanderFamily").val(),
                "nationalId": $("#txtNationalId").val(),
                "birthDate": $("#txtBirthDate").val(),
                "militaryRank": $("#txtMilitaryRank").val(),
                "username": $("#txtUsername").val(),
                "password": $("#txtPassword").val(),
                "area": $("#hidLocation").val()
            }
            $('#spinLoading').show();
            $('#btnSubmit').button("loading");
            $.ajax({
                type: "POST",
                url: "AddPoliceStation.aspx/GetInsertOrUpdatePoliceStation",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg != null) {
                        if (msg.d[0].IsSuccess != "true") {
                            $("#lblMessage").html(ErrorMessages(msg.d[0].Message));
                            $('html, body').animate({
                                scrollTop: $("#lblMessage").offset().top
                            }, 1500);
                        } else {
                            $("#lblMessage").html(SuccessMessages(msg.d[0].Message)); $('html, body').animate({
                                scrollTop: $("#lblMessage").offset().top
                            }, 1500);
                        }
                    }
                    else {
                        alert("خطا در برقراری ارتباط با سرور!");
                    }
                },
                complete: function () {
                    $('#spinLoading').hide();
                    $("#btnSubmit").button("reset");
                },
                error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
                    alert(response.d);
                }
            });
            return true;
        }
        $(document).ready(function () {
            pageLoad();
            $("input[type='text']").on('blur', function () { $(".error").hide("slow"); });
        });

        function pageLoad() {
            $('#date1').MdPersianDateTimePicker({
                targetTextSelector: '#txtBirthDate',
                dateFormat: 'yyyy-MM-dd',
                isGregorian: false,
                enableTimePicker: false,
                fromDate: false,
                toDate: false,
                englishNumber: false,
                modalMode: true
            });
            if ($("#hidId").val() != "") {
                $("#txtUsername,#txtPassword,#txtRePassword").attr("readonly", "");
                $("#divAlertDisableUser").css("display", "");
                $(".gray-back").hide();
            }
        }
        function openCalender() {
            var btn = document.getElementById("date1");
            btn.click(); event.preventDefault();
        }
    </script>

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
    <script src="/Scripts/jsFsType.js"></script>
</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="body-wrapper">
        <div class="admin-right-panel" style="height: 600px;">
            <div class="panel-head">پاسگاه</div>
            <hr />
            <div class="white-box">
                <div class="btn"><a runat="server" id="lnkPoliceStation" visible="False" href="/Moderator/User/AddPoliceStation.aspx"><i class="fa fa-user-police"></i><span>افزودن پاسگاه جدید</span></a></div>
                <hr />
                <div class=" text-center"><span class="badge bg-light text-dark custome-badge">جستجو در پاسگاههای ذخیره شده</span></div>
                <br />
                <input runat="server" clientidmode="Static" id="txtIdSearch" type="number" placeholder="شماره سریال" dir="rtl" /><br />
                <br />
                <input runat="server" clientidmode="Static" id="txtNameSearch" type="text" placeholder="نام پاسگاه" /><br />
                <br />
                <input runat="server" clientidmode="Static" id="txtCommanderNameSearch" type="text" placeholder="نام یا نام خانوادگی فرمانده" /><br />
                <br />
                <input runat="server" clientidmode="Static" id="txtNationalIdSearch" type="text" placeholder="کد ملی فرمانده" />
                <br />
                <br />
                <div class=" text-center">
                    <button type='button' id="btnSearch" class="btn-login text-center" onclick="Search('')" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">جستجو</button>
                    <div class="spinner-border text-warning" role="status" style="display: none" id="spinSearchLoading">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-table-cell align-items-top padding-all">
            <div class="d-table-cell align-items-top pl15" style="width: 650px">
                <div class="row trans-back">
                    <div class="col-12">
                        <div class="row ">
                            <div class="col-6">
                                <div class="form-group row">
                                    <label for="txtName" class="col-4 col-form-label fa-2x">نام پاسگاه</label>
                                    <div class="col-8 error-parent">
                                        <span class="error error-icon" id="spnNameError" title="لطفا نام پاسگاه را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" runat="server" clientidmode="Static" id="txtName" lang="fa-IR" maxlength="32" />
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-12">
                                <div class="form-group row">
                                    <label for="txtLocation" class="col-2 col-form-label">موقعیت مکانی</label><div class="col-10 error-parent">
                                        <span class="error error-icon" id="spnLocationError" title="لطفا موقعیت مکانی را با استفاده از مارکر روی نقشه انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" runat="server" clientidmode="Static" id="txtLocation" readonly="" />
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-6">
                                <div class="form-group row">
                                    <label for="txtCode" class="col-4 col-form-label">کد پاسگاه</label><div class="col-8 error-parent">
                                        <span class="error error-icon" id="spnCodeError" title="لطفا کد پاسگاه را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                        <input type="text" runat="server" clientidmode="Static" id="txtCode" />
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="row ">
                    <div class="col-12">
                        <h3>اطلاعات فرمانده پاسگاه</h3>
                    </div>
                </div>
                <div class="row trans-back">
                    <div class="col-6">
                        <div class="form-group row">
                            <label for="txtCommanderName" class="col-4 col-form-label">نام</label><div class="col-8 error-parent">
                                <span class="error error-icon" id="spnCommanderNameError" title="لطفا نام فرمانده را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input type="text" runat="server" clientidmode="Static" id="txtCommanderName" />
                            </div>
                            <br />
                        </div>
                        <div class="form-group row">
                            <label for="txtNationalId" class="col-4 col-form-label">کد ملی</label>
                            <div class="col-8 error-parent">
                                <span class="error error-icon" id="spnNationalIdError" title="لطفا کد ملی را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input type="text" runat="server" clientidmode="Static" id="txtNationalId" maxlength="10" />
                            </div>
                            <br />
                        </div>
                        <div class="form-group row">
                            <label for="txtMilitaryRank" class="col-4 col-form-label">درجه نظامی</label><div class="col-8">
                                <input type="text" runat="server" clientidmode="Static" id="txtMilitaryRank" />
                            </div>
                            <br />
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group row">
                            <label for="txtCommanderFamily" class="col-4 col-form-label">نام خانوادگی</label>
                            <div class="col-8 error-parent">
                                <span class="error error-icon" id="spnCommanderFamilyError" title="لطفا نام خانوادگی فرمانده را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input type="text" runat="server" clientidmode="Static" id="txtCommanderFamily" />
                            </div>
                            <br />
                        </div>
                        <div class="form-group row">
                            <label for="txtBirthDate" class="col-4 col-form-label">تاریخ تولد</label>
                            <div class="col-8">
                                <div class="inner-addon left-addon">
                                    <div class="input-group-prepend">
                                        <span style="cursor: pointer; display: none" class="input-group-text" id="date1"></span>
                                    </div>
                                    <i style="cursor: pointer" class="fa fa-calendar fa-2x"></i>
                                    <input type="text" id="txtBirthDate" runat="server" clientidmode="Static" onfocus="openCalender()" aria-label="date1" aria-describedby="date1" maxlength="10" />
                                </div>
                            </div>
                            <br />
                        </div>
                        <div class="form-group row">
                            <label class="col-4 col-form-label">&nbsp;</label>
                            <div class="col-8"></div>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
                <div class="row gray-back">
                    <div class="col-6">
                        <div class="form-group row">
                            <label for="txtUsername" class="col-4 col-form-label">نام کاربری</label><div class="col-8 error-parent">
                                <span class="error error-icon" id="spnUsernameError" title="لطفا نام کاربری را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input type="text" id="txtUsername" value="" autocomplete="off" />
                            </div>
                            <br />
                        </div>
                        <div class="form-group row">
                            <label for="txtPassword" class="col-4 col-form-label">رمز عبور</label><div class="col-8 error-parent">
                                <span class="error error-icon" id="spnPasswordError" title="لطفا رمز عبور را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input type="password" id="txtPassword" value="" autocomplete="new-password" />
                            </div>
                            <br />
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group row">
                            <label class="col-4 col-form-label">&nbsp;</label>
                            <div class="col-8"></div>
                            <br />
                            <br />
                        </div>
                        <div class="form-group row">
                            <label for="txtRePassword" class="col-4 col-form-label">تکرار رمز عبور</label><div class="col-8 error-parent">
                                <span class="error error-icon" id="spnRePasswordError" title="لطفا تکرار رمز عبور را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input type="password" runat="server" value="" id="txtRePassword" clientidmode="Static" autocomplete="new-password" />
                            </div>
                            <br />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12" style="display: none" id="divAlertDisableUser">
                            <div class="alert alert-info"><strong>توجه</strong>&nbsp;<span>در حالت ویرایش پاسگاه،امکان ویرایش اطلاعات کاربری وجود ندارد،برای تغییر اطلاعات کاربری از بخش ویرایش کاربر اقدام نمایید!</span></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <button type='button' id="btnSubmit" class="btn-login" onclick="SaveData()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">تایید</button>
                        <div class="spinner-border text-warning" role="status" style="display: none" id="spinLoading">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <br />
                        <br />
                        <div id="lblMessage" runat="server" clientidmode="Static"></div>
                        <input type="hidden" id="hidLocation" runat="server" clientidmode="Static" />
                        <input type="hidden" id="hidId" runat="server" clientidmode="Static" />
                    </div>
                </div>
            </div>
            <div class="d-table-cell align-items-top pl15 text-center" style="width: 470px">
                <div id="map" class="map left-user-map"></div>
                <button type='button' id="btnClearMap" class="btn btn-outline-danger" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">حذف منطقه و موقعیت مکانی ذخیره شده</button>
                <script>
                    var osmUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNoa2Fuc2F0YXJwb3VyIiwiYSI6ImNrdmp1bXlhaTA1aXkydW81eWF5bmwyejQifQ.j6er3HdjHOguoXgO4KbZ0w',
                        osmAttrib = '',
                        osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
                        map = new L.Map('map', { rotate: true, touchRotate: true, center: new L.LatLng(35.715298, 51.404343), zoom: 13, zoomControl: true }),
                        drawnItems = L.featureGroup().addTo(map);
                    osm.addTo(map);
                    var options = {
                        position: 'topright',
                        edit: {

                            featureGroup: drawnItems,
                            poly: {
                                allowIntersection: false
                            }
                        },
                        draw: {
                            title: 'منطقه مورد نظر را ترسیم کنید',
                            polyline: false,
                            rectangle: true,
                            circle: false,
                            marker: true,
                            circlemarker: false,
                            polygon: {
                                allowIntersection: false,
                                showArea: true,
                                shapeOptions: {
                                    color: '#ff003b'
                                }
                            }
                        }
                    };

                    var drawControl = new L.Control.Draw(options);
                    map.addControl(drawControl);
                    map.on(L.Draw.Event.CREATED, function (event) {
                        var type = event.layerType,
                            layer = event.layer;
                        if (type === 'marker') {
                            var numItems = $('.leaflet-marker-pane').length;
                            if (numItems > 0) {
                                $(".leaflet-marker-icon").remove();
                                $(".leaflet-shadow-pane").remove();
                                $('#txtLocation').val(layer.getLatLng());
                                drawnItems.addLayer(layer);
                            } else {
                                $('#txtLocation').val(layer.getLatLng());
                                drawnItems.addLayer(layer);
                            }
                        } else {
                            var geojson = layer.toGeoJSON();
                            drawnItems.addLayer(layer);
                            $('#hidLocation').val(JSON.stringify(geojson));
                        }
                    });
                    function polystyle(feature) {
                        return {
                            fillColor: '#ff003b',
                            weight: 2,
                            opacity: 1,
                            color: '#ff003b',  //Outline color
                            fillOpacity: 0.5
                        };
                    }
                    let multipolygon;
                    let myMarker;
                    if ($("#hidLocation").val() != "") {
                        let getval = JSON.parse($("#hidLocation").val());
                        let geojsonFeature = {
                            "type": "FeatureCollection",
                            "features": [getval]
                        };
                        //L.geoJSON(geojsonFeature).addTo(map);
                        multipolygon = L.geoJson(geojsonFeature, { style: polystyle });
                        multipolygon.addTo(map);
                        map.fitBounds(multipolygon.getBounds());
                        let latlong = $("#txtLocation").val().split(',');
                        let latitude = parseFloat(latlong[0]);
                        let longitude = parseFloat(latlong[1]);
                        let stuSplit = L.latLng(latitude, longitude);
                        myMarker = L.marker(stuSplit,
                            { title: 'unselected' })
                            .addTo(map);
                    } else {
                        let getId = GetURLParameter("Id");
                        if (getId === "10015") {
                            let request = new XMLHttpRequest();
                            request.open("GET", "/Geo/Province/Isfahan.txt", false);
                            request.send(null);
                            let returnValue = request.responseText;
                            let datalayer = L.geoJson(JSON.parse(returnValue), { style: polystyle }, {
                                onEachFeature: function (feature, featureLayer) {
                                    featureLayer.bindPopup(feature.properties.NAME_1);
                                }
                            }).addTo(map);
                            map.fitBounds(datalayer.getBounds());
                            let latlong = $("#txtLocation").val().split(',');
                            let latitude = parseFloat(latlong[0]);
                            let longitude = parseFloat(latlong[1]);
                            let stuSplit = L.latLng(latitude, longitude);
                            myMarker = L.marker(stuSplit,
                                { title: 'unselected' })
                                .addTo(map);
                        }
                    }
                    $('.leaflet-control-attribution').hide();
                    $(document).ready(function () {
                        $('#btnClearMap').click(function () {
                            if ($("#txtLocation").val() != "") {
                                if (myMarker) {
                                    map.removeLayer(myMarker);
                                    $("#txtLocation").val("");
                                }
                            }
                            if ($("#hidLocation").val() != "") {
                                if (multipolygon) {
                                    map.removeLayer(multipolygon);
                                    $("#hidLocation").val("");
                                }
                            }
                        });
                    });

                </script>
            </div>
        </div>
    </div>
</asp:Content>
