<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="AddUser.aspx.cs" Inherits="MersadWebApplication.Moderator.User.AddUser" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">
    <style>
        .admin-after-head, .account {
            display: block;
        }

        .dropzone .dz-preview .dz-image img {
            width: 95px;
            height: 95px;
        }
    </style>
    <%--<script src="/Scripts/angular.min.js"></script>--%>
    <link href="/App_Themes/jquery.md.bootstrap.datetimepicker.style.css?n=14000932" rel="stylesheet" />
    <script src="/Scripts/jquery.md.bootstrap.datetimepicker.js?n=14000932"></script>
    <script src="/Scripts/jsAlertHelper.js"></script>
    <script src="/Scripts/jsNationalIdChecker.js"></script>
    <%--<script src="/Scripts/angular-sanitize.min.js"></script>--%>
    <%-- ReSharper disable once WrongExpressionStatement --%>
    <script>
        function Search() {
            var getId = $("#txtIdSearch").val();
            var getName = $("#txtNameSearch").val();
            var getNationalId = $("#txtNationalIdSearch").val();
            var getUsername = $("#txtUsernameSearch").val();
            var getPlan = $("#cmbPlanSearch").val();
            window.open("UserList.aspx?Id=" + getId + "&Name=" + getName + "&NationalId=" + getNationalId + "&Username=" + getUsername + "&PlanId=" + getPlan, "_blank");
            return true;
        }
        document.onreadystatechange = function () {
            if (document.readyState === "interactive") {
                //LoadHideInput();
            }
            if (document.readyState == "complete") {
                $("#txtPassword,#txtRePassword").attr("type", "password");
                let getId = $("#cmbPoliceStation").val();
                if (getId != null && getId != "" && getId != "-1")
                    $("#cmbPoliceStation").trigger('change');
            }
        }
        function SaveData() {
            if ($("#txtName").val() == "") {
                $("#spnNameError").show("slow");
                $("#txtName").focus();
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
                //$("#spnNationalIdError").attr("title", "کد ملی وارد شده صحیح نمی باشد!");
                //$("#spnNationalIdError").show("slow");
                //$("#txtNationalId").focus();
                return true;
            }
            if ($("#cmbPlan").val() == "" || $("#cmbPlan").val() == "-1") {
                $("#spnPlanError").show("slow");
                $("#cmbPlan").focus();
                return false;
            }
            if ($("#txtFamily").val() == "") {
                $("#spnFamilyError").show("slow"); $("#txtFamily").focus();
                return false;
            }
            if ($("#cmbPoliceStation").val() == "" || $("#cmbPoliceStation").val() == "-1") {
                $("#spnPoliceStationError").show("slow"); $("#cmbPoliceStation").focus();
                return false;
            }
            //if ($("#hidLocation").val() == "") {
            //    $("#lblMessage").html(ErrorMessages("محدوده این کاربر روی نقشه مشخص نشده!"));
            //    return false;
            //}
            if ($("#txtUsername").val() == "") {
                $("#spnUsernameError").show("slow"); $("#txtUsername").focus();
                return false;
            }
            if ($("#txtPassword").val() == "") {
                $("#spnPasswordError").show("slow"); $("#txtPassword").focus();
                return false;
            }
            if ($("#txtRePassword").val() == "") {
                $("#spnRePasswordError").show("slow"); $("#txtRePassword").focus();
                $("#spnRePasswordError").show("slow"); $("#txtRePassword").focus();
                return false;
            }

            if ($("#txtPassword").val() != $("#txtRePassword").val()) {
                $("#spnRePasswordError").attr("title", "رمز عبور و تکرار آن با هم برابر نیست!");
                //$("#lblMessage").html(ErrorMessages("رمز عبور و تکرار آن با هم برابر نیست!"));
                return false;
            }
            var obj = { "id": $("#hidId").val(), "planId": $("#cmbPlan").val(), "name": $("#txtName").val(), "family": $("#txtFamily").val(), "fatherName": $("#txtFatherName").val(), "birthDate": $("#txtBirthDate").val(), "nationalId": $("#txtNationalId").val(), "policeStation": $("#cmbPoliceStation").val(), "username": $("#txtUsername").val(), "password": $("#txtPassword").val(), "area": $("#hidLocation").val(), "guid": $("#hideGuid").val() }

            //if (!Page_ClientValidate("")) { return; }
            $('#spinLoading').show();
            $('#btnSubmit').button("loading");
            $.ajax({
                type: "POST",
                url: "AddUser.aspx/GetInsertOrUpdateUser",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg != null) {
                        if (msg.d[0].IsSuccess != "true") {
                            $("#lblMessage").html(ErrorMessages(msg.d[0].Message));
                        } else {
                            $("#lblMessage").html(SuccessMessages(msg.d[0].Message));
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
        }
        $(document).ready(function () {
            pageLoad();
            Dropzone.autoDiscover = false;
            $("#fileUpload").dropzone({
                url: "/Handle/UserImageHandle.ashx?GUID=" + $("#hideGuid").val() + "&IsRemove=false",
                maxFiles: 1,
                acceptedFiles: ".png,.jpg,.jpeg,.PNG,.JPG,.JPEG",
                clickable: true,
                maxFilesize: 10, // MB
                addRemoveLinks: true,
                parallelUploads: 1,
                uploadMultiple: false,
                success: function (file, response) {
                    //var imgName = response;
                    file.previewElement.classList.add("dz-success");
                }, init: function () {
                    this.on("sending", function (file) {
                        file.myCustomName = $("#hideGuid").val() + ".jpg";
                    });
                    this.on("complete", function (file) {
                        $(".dz-remove").html("<span class='fa fa-trash'></span>");
                        $(".dz-details").remove();
                    });
                    var myDropzone = this;
                    //myDropzone.removeAllFiles();
                    if (window.location.href.indexOf("Id") > -1 && $("#hideGuid").val() !== "") {
                        var hideGuid = $("#hideGuid").val();
                        var mockFile = {
                            name: hideGuid,
                            size: 12345
                        };
                        var twitimg = "/User/" + hideGuid + ".jpg";
                        $.ajax({
                            url: "/Handle/FileIsExistsHandle.ashx?FileName=" + twitimg,
                            type: 'GET',
                            contentType: "application/json; charset=utf-8",
                            //async: false,
                            success: function (data) {
                                if (data == "True") {
                                    myDropzone.emit("addedfile", mockFile);
                                    myDropzone.emit("thumbnail", mockFile, "/MediaUploader" + twitimg);
                                    $(".dz-remove").html("<span class='fa fa-trash'></span>");
                                    $(".dz-progress").remove();
                                    $(".dz-details").remove();
                                }
                            },
                            error: function () {

                            }
                        });
                    }
                },
                removedfile: function (file) {
                    var name = $("#hideGuid").val().replace(".jpg", "");
                    var qString = window.location.href.indexOf("Id") > -1 ? window.location.href.split("?")[1].split("=")[1] : "";
                    $.ajax({
                        type: "POST",
                        url: "/Handle/UserImageHandle.ashx?GUID=" + name + "&IsRemove=true&Id=" + qString
                    });
                    var ref;
                    return (ref = file.previewElement) != null ? ref.parentNode.removeChild(file.previewElement) : void 0;
                },
                error: function (file, response) {
                    file.previewElement.classList.add("dz-error");
                    $(".dz-error-message").html("<span data-dz-errormessage=''>امکان بارگزاری فایل غیر از تصویر امکانپذیر نمی باشد!</span>");
                },
            });
            $('#btnShowPassword').on('click', function () {
                if ($('#txtPassword').attr('type') == 'text') {
                    $('#btnShowPassword').html("<i class='fa fa-eye'></i>&nbsp;نمایش کلمه عبور");
                    //$('.hidepass').show();
                    //$("#txtPassword").attr("readonly", "");
                    //$("#txtRePassword").attr("readonly", "");
                    $("#txtPassword,#txtRePassword").attr("type", "password");
                }
                else {
                    $('#btnShowPassword').html("<i class='fa fa-key'></i>&nbsp;مخفی کردن کلمه عبور");
                    //$('.hidepass').hide();
                    //$("#txtPassword").removeAttr("readonly");
                    //$("#txtRePassword").removeAttr("readonly");
                    $("#txtPassword,#txtRePassword").attr("type", "text");
                }
            });
            $("input[type='text']").on('blur', function () { $(".error").hide("slow"); });
        });

        function pageLoad() {
            $("#cmbPlan").select2({
                placeholder: {
                    id: "-1",
                    text: "سمت را انتخاب کنید"
                },
                //allowClear: true,
                dir: 'rtl',
                //theme: "bootstrap5"
            });
            $("#cmbPlanSearch").select2({
                placeholder: {
                    id: "-1",
                    text: "سمت را انتخاب کنید"
                },
                allowClear: true,
                dir: 'rtl'
            });
            $("#cmbPoliceStation").select2({
                placeholder: {
                    id: "-1",
                    text: "پاسگاه را انتخاب کنید"
                },
                //allowClear: true,
                dir: 'rtl',
                //theme: "bootstrap5"
            });
            $('#date1').MdPersianDateTimePicker({
                targetTextSelector: '#txtBirthDate',
                dateFormat: 'yyyy-MM-dd',
                isGregorian: false,
                enableTimePicker: false,
                englishNumber: false,
                modalMode: true
            });
            if (window.location.href.indexOf("Id") > -1) {
                //$('.hidepass').show();
                //$("#txtPassword").attr("readonly", "");
                //$("#txtRePassword").attr("readonly", "");
                $("#txtPassword,#txtRePassword").attr("type", "password");
            }
        }
        function openCalender() {
            var btn = document.getElementById("date1");
            btn.click(); event.preventDefault();
        }
    </script>
    <script src="/Scripts/leaflet/leaflet-rotate-src.js"></script>
    <link href="/Scripts/leaflet/leaflet.css" rel="stylesheet" />
    <%--<script src="/Scripts/leaflet/leaflet.js"></script>--%>
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
    <script src="/Scripts/leaflet/Leaflet-draw/Control.Draw.js"></script>
    <link href="/App_Themes/dropzone.css" rel="stylesheet" />
    <script src="/Scripts/dropzone-min.js"></script>
    <script src="/Scripts/jsFsType.js"></script>
</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="body-wrapper">
        <div class="admin-right-panel" style="height: 600px;">
            <div class="panel-head">کاربران</div>
            <hr />
            <div class="white-box">
                <div class="btn"><a runat="server" id="lnkAddUser" visible="False" href="/Moderator/User/AddUser.aspx"><i class="fa fa-plus-circle"></i><span>افزودن کاربر جدید</span></a></div>
                <br />
                <hr />
                <div class=" text-center"><span class="badge bg-light text-dark custome-badge">جستجو در کاربران ذخیره شده</span></div>
                <br />
                <input runat="server" clientidmode="Static" id="txtIdSearch" type="number" placeholder="شناسه" dir="rtl" /><br />
                <br />
                <input runat="server" clientidmode="Static" id="txtNameSearch" type="text" placeholder="نام یا نام خانوادگی کاربر" /><br />
                <br />
                <input runat="server" clientidmode="Static" id="txtUsernameSearch" type="text" placeholder="نام کاربری" /><br />
                <br />
                <input runat="server" clientidmode="Static" id="txtNationalIdSearch" type="text" placeholder="کد ملی" />
                <br />
                <br />
                <select runat="server" id="cmbPlanSearch" clientidmode="Static"></select>
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
                <div class="row">
                    <div class="col-12 text-center">
                        <br />
                        <div>
                            <div id="fileUpload" data-dz-message class="dropzone dz-clickable img-user">
                                <div class="dz-default dz-message">
                                    <i class="fa fa-user fa-4x"></i>
                                    <br />
                                    <span class="plus-add-icon"><i class="fa fa-plus fa-2x"></i></span>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" runat="server" id="hideGuid" clientidmode="Static" />
                    </div>
                </div>
                <div class="row trans-back">
                    <div class="col-6">
                        <div class="form-group row">
                            <label for="txtName" class="col-4 col-form-label fa-2x">نام</label>
                            <div class="col-8 error-parent">
                                <span class="error error-icon" id="spnNameError" title="لطفا نام را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input runat="server" clientidmode="Static" type="text" id="txtName" lang="fa-IR" maxlength="32" />
                            </div>
                            <br />
                        </div>
                        <div class="form-group row">
                            <label for="txtFatherName" class="col-4 col-form-label">نام پدر</label>
                            <div class="col-8 error-parent">
                                <input runat="server" clientidmode="Static" type="text" id="txtFatherName" lang="fa-IR" maxlength="32" />
                            </div>
                            <br />
                        </div>
                        <div class="form-group row">
                            <label for="txtNationalId" class="col-4 col-form-label">کد ملی</label>
                            <div class="col-8 error-parent">
                                <span class="error error-icon" id="spnNationalIdError" title="لطفا کد ملی را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input runat="server" clientidmode="Static" type="text" id="txtNationalId" maxlength="10" />
                            </div>
                            <br />
                        </div>
                        <div class="form-group row">
                            <label for="cmbPlan" class="col-4 col-form-label">سمت</label>
                            <div class="col-8 error-parent">
                                <span class="error error-icon" id="spnPlanError" title="لطفا سمت را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select runat="server" id="cmbPlan" clientidmode="Static"></select>
                            </div>
                            <br />
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group row">
                            <label for="txtFamily" class="col-4 col-form-label">نام خانوادگی</label>
                            <div class="col-8 error-parent">
                                <span class="error error-icon" id="spnFamilyError" title="لطفا نام خانوادگی را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input type="text" runat="server" clientidmode="Static" id="txtFamily" lang="fa-IR" maxlength="32" />
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
                        <div class="form-group row">
                            <label for="cmbPoliceStation" class="col-4 col-form-label">پاسگاه</label>
                            <div class="col-8 error-parent">
                                <span class="error error-icon" id="spnPoliceStationError" title="لطفا پاسگاه را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <select runat="server" id="cmbPoliceStation" clientidmode="Static"></select>
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
                <div class="row gray-back">
                    <div class="col-6">
                        <div class="form-group row">
                            <label for="txtUsername" class="col-4 col-form-label">نام کاربری</label>
                            <div class="col-8 error-parent">
                                <span class="error error-icon" id="spnUsernameError" title="لطفا نام کاربری را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                <input type="text" runat="server" clientidmode="Static" id="txtUsername" maxlength="32" autocomplete="off" />
                            </div>
                            <br />
                        </div>
                        <div class="form-group row">
                            <label for="txtPassword" class="col-4 col-form-label">رمز عبور</label>
                            <div class="col-8 error-parent">
                                <div class="inner-addon left-addon">
                                    <span class="error error-icon" id="spnPasswordError" title="لطفا رمز عبور را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <input type="text" runat="server" clientidmode="Static" id="txtPassword" maxlength="32" autocomplete="new-password" />
                                </div>
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
                            <label for="txtRePassword" class="col-4 col-form-label">تکرار رمز عبور</label>
                            <div class="col-8 error-parent">
                                <div class="inner-addon left-addon">
                                    <span class="error error-icon" id="spnRePasswordError" title="لطفا تکرار رمز عبور را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                                    <input type="text" runat="server" clientidmode="Static" id="txtRePassword" maxlength="32" autocomplete="new-password" />
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center">
                            <button type='button' id="btnShowPassword" class="btn btn-success"><i class="fa fa-eye"></i>&nbsp;نمایش کلمه عبور</button>
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
            <div class="d-table-cell align-items-top pl15" style="width: 470px">
                <div id="map" class="map left-user-map" style="width: 470px"></div>
                <script>
                    var osmUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNoa2Fuc2F0YXJwb3VyIiwiYSI6ImNrdmp1bXlhaTA1aXkydW81eWF5bmwyejQifQ.j6er3HdjHOguoXgO4KbZ0w',
                        osmAttrib = '',
                        osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
                        map = new L.Map('map', { rotate: true, touchRotate: true, center: new L.LatLng(35.715298, 51.404343), zoom: 13, zoomControl: false }),
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
                            marker: false,
                            circlemarker: false,
                            polygon: {
                                allowIntersection: false,
                                showArea: true,
                                shapeOptions: {
                                    color: "#ff003b"
                                }
                            }
                        }
                    };
                    function polystyle(feature) {
                        return {
                            fillColor: '#ff003b',
                            weight: 2,
                            opacity: 1,
                            color: '#ff003b',  //Outline color
                            fillOpacity: 0.5
                        };
                    }
                    //if ($("#cmbPoliceStation").val() != "" && $("#cmbPoliceStation").val() != "-1" && $("#cmbPoliceStation").val() != null)
                    //    $("#cmbPoliceStation").trigger("change");
                    //var drawControl = new L.Control.Draw(options);
                    //map.addControl(drawControl);
                    //map.on(L.Draw.Event.CREATED, function (event) {
                    //    var layer = event.layer;
                    //    var geojson = layer.toGeoJSON();
                    //    drawnItems.addLayer(layer);
                    //    $('#hidLocation').val(JSON.stringify(geojson));
                    //});

                    $("#cmbPoliceStation").on('change', function () {
                        $('#spinLoading').show();
                        let getVal = $(this).val();
                        if (getVal === "10015") {
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
                            $('#spinLoading').hide();
                            return false;
                        }

                        var obj = {
                            "policeStationId": $("#cmbPoliceStation").val()
                        }
                        $.ajax({
                            type: "POST",
                            url: "AddUser.aspx/GetArea",
                            data: JSON.stringify(obj),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (msg) {
                                if (msg != null) {
                                    if (msg.d[0].IsSuccess != "true") {
                                        $("#lblMessage").html(CreateModal(msg.d[0].Message));
                                        $('#MessageModal').modal();
                                    } else {
                                        //window.map.removeLayer(window.polygon);
                                        map.eachLayer(function (layer) {
                                            if (layer._path != null) {
                                                layer.remove();
                                            }
                                        });
                                        var getval = JSON.parse(msg.d[0].Message);
                                        var geojsonFeature = {
                                            "type": "FeatureCollection",
                                            "features": [getval]
                                        };
                                        var multipolygon = L.geoJson(geojsonFeature, { style: polystyle });
                                        multipolygon.addTo(map);
                                        map.fitBounds(multipolygon.getBounds());
                                        $('#hidLocation').val(msg.d[0].Message);
                                    }
                                } else {
                                    alert("خطا در برقراری ارتباط با سرور!");
                                }
                            },
                            complete: function () {
                                $('#spinLoading').hide();
                            },
                            error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
                                alert(response.d);
                            }
                        });
                    });
                    if ($("#hidLocation").val() != "") {
                        var getval = JSON.parse($("#hidLocation").val());
                        var geojsonFeature = {
                            "type": "FeatureCollection",
                            "features": [getval]
                        };
                        var multipolygon = L.geoJson(getval, { style: polystyle });
                        multipolygon.addTo(map);
                        map.fitBounds(multipolygon.getBounds());
                    }
                    $('.leaflet-control-attribution').hide();
                </script>
            </div>

        </div>
    </div>
</asp:Content>
