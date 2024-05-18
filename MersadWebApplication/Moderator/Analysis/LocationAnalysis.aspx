<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="LocationAnalysis.aspx.cs" Inherits="MersadWebApplication.Moderator.Analysis.LocationAnalysis" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">
    <style>
        .myDivIcon {
            text-align: center;
            line-height: 20px
        }

        .admin-after-head, .analysis {
            display: block;
        }

        .btn-check:active + .btn-secondary, .btn-check:checked + .btn-secondary, .btn-secondary.active, .btn-secondary:active, .show > .btn-secondary.dropdown-toggle {
            color: #fff;
            background-color: #ffcf00;
            border-color: #ffcf00;
        }
    </style>
    <script src="/Scripts/jsLocationAnalysisHelper.js?n=14010608"></script>
    <script src="/Scripts/leaflet/leaflet-rotate-src.js"></script>
    <link href="/Scripts/leaflet/leaflet.css" rel="stylesheet" />
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
    <script src="/Scripts/jsModalHelper.js?n=14010321"></script>
    <script src="/Scripts/jquery-3.7.1.min.js"></script>
    <link href="/App_Themes/select2.min.css?n=14010321" rel="stylesheet" />
    <script src="/Scripts/select2.min.js"></script>
    <script src="/Scripts/bootstrap.min.js"></script>
    <script src="/Scripts/jalali-moment.browser.js"></script>
    <script src="/Scripts/jstat.min.js"></script>
    <script src="/Scripts/jspdf.debug.js"></script>
    <script src="/Scripts/html2canvas.min.js"></script>
    <script src="/Scripts/jquery.inlineStyler.min.js"></script>
    <script src="/Scripts/jsHelper.js?n=14010321"></script>
</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <script>
        $(document).ready(function () {
            var wid = window.innerWidth - 230;
            var heigh = window.innerHeight - 185;
            $("#mainContainer").css({ "width": wid, "height": heigh });
            $("#divPrintScreen").css({ "width": wid, "height": heigh });
            //var widforf = wid / 2.5;
            $("#f").css({ "height": heigh });
            var vwit = wid-650;
            


            $("#r").css({ "height": heigh, "width": "600px" });
            $("#rr").css({ "height": heigh, "width": "600px" });
            $("#l").css({ "height": heigh, "width": vwit });
            $("#map").css({ "height": heigh, "width": vwit });
            $("#ll").css({ "height": heigh - 40, "width": lwid });
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
            $("#t").css({ "height": heigh });
            var newHei = heigh - 20;
            newHei = newHei / 2;
            $("#g2p3_0").css({ "height": newHei + 155 });
        });
    </script>
    <div class="body-wrapper">
        <div id="divNormalFilter" class="admin-right-panel">
            <div class="panel-head">
                تنظیمات<span class="spinner-border text-warning" role="status" style="display: none" id="spinSearchLoading">
                    <span class="sr-only">Loading...</span>
                </span>
            </div>
            <hr />
            <div class="form-group">
                <div class="white-box">
                    <div style="padding-right: 5px" class="font-size-12-w gray">محدوده مکانی</div>
                    <hr />
                    <button type="button" id="btnAddLocationArea" style="background: transparent; border: none;"><i style="font-size: 1.5em;" class="fa fa-circle-plus fa-2x yellow"></i><span>افزودن محدوده مکانی جدید</span></button>
                    <div class="form-group">
                        <div id="divAddLocationArea" class="hide">
                            <div class="form-group">
                                <input id="txtLocationAreaName" type="text" placeholder="نام محدوده مکانی" maxlength="128" /><br />
                            </div>
                            <input type="radio" id="rdoCity" name="rdoLocation" value="City">
                            <label for="rdoCity">شهرستان</label><br>
                            <div class="form-group" id="divCity" style="display: none">
                                <select id="cmbCity" class="w-100" style="width: 100%">
                                    <option value="-1" selected>انتخاب شهرستان</option>
                                </select>
                                <br />
                            </div>
                            <div class="form-group" id="divInNativeArea" style="display: none">
                                <select id="cmbInNativeArea">
                                    <option selected="" value="-1">حوزه نفوذ</option>
                                    <option value="true">درون‌ شهری</option>
                                    <option value="false">برون ‌شهری</option>
                                    <option value="">همه</option>
                                </select>
                            </div>
                            <input type="radio" id="rdoPoliceStation" name="rdoLocation" value="PoliceStation">
                            <label for="rdoPoliceStation">پاسگاه</label><br>
                            <input type="radio" id="rdoMehvar" name="rdoLocation" value="Axis">
                            <label for="rdoMehvar">محور</label><br>
                            <div class="form-group" id="divAxis" style="display: none">
                                <select id="cmbAxis">
                                    <option selected="" value="-1">انتخاب محور</option>
                                </select>
                            </div>
                            <br />
                            <div class="text-center">
                                <button type="button" id="btnCancelLocationArea" class="btn btn-light"><span>انصراف</span></button>
                                <button type="button" id="btnSubmitLocationArea" class="btn btn-warning"><span>افزودن</span></button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <select id="cmbLocationArea" class="w-100"></select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="white-box">
                    <div style="padding-right: 5px" class="font-size-12-w gray">تنظیمات فایل خروجی</div>
                    <hr />
                    <div class="form-group">
                        <input type="radio" id="rdoExportPdf" name="rdoExport" value="Pdf">
                        <label for="rdoExportPdf"><i class="fa fa-file-pdf fa-2x"></i></label>
                        &nbsp;
                        <input type="radio" id="rdoExportTxt" name="rdoExport" value="Word">
                        <label for="rdoExportTxt"><i class="fa fa-file-word fa-2x"></i></label>
                        &nbsp;
                        <input type="radio" id="rdoExportPng" name="rdoExport" value="Png">
                        <label for="rdoExportPng"><i class="fa fa-file-image fa-2x"></i></label>
                        &nbsp;
                        <input type="radio" id="rdoExportJpg" name="rdoExport" value="Jpg">
                        <label for="rdoExportJpg"><i class="fa fa-file-image fa-2x"></i></label>
                    </div>
                    <div class="form-group">
                        <select id="cmbExportSize">
                            <option selected="" value="-1">ابعاد خروجی</option>
                            <option value="A4">A4</option>
                            <option value="A5">A5</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-outline-success" id="btnGoToPrint">دانلود خروجی</button>
                    </div>
                </div>
            </div>
            <div class="form-group"></div>
            <br />
            <br />
        </div>
        <div id="divPrintScreen" class="d-table-cell align-items-top">
            <div id="r" class="d-table-cell chart-panel align-items-top"  >
                <div id="rr" class="gray-box form-group" >
                    <div class="fa-2x fw-bolder yellow"><i class="fa fa-crosshairs "></i>&nbsp;<span>تحلیل مکانی</span></div>
                    <br />
                    <div id="divTitleDescription" class="font-size-12-w gray wordwrap"></div>
                    <div id="divDescription" class="position-relative">
                    </div>
                </div>
            </div>
            <div id="l" class="d-table-cell align-items-top position-relative" >
                <div id="map" class="map left-user-map" style="top: 10px;"></div>
                <script src="/Scripts/jsLocationAnalysisMapHelper.js?n=14010321"></script>
            </div>
        </div>
    </div>
    <div id="lblMessage"></div>
    <div id="divConvertImg" style="display: none">
        <table id="tblWorksheet">
            <tbody>
                <tr>
                    <td>
                        <img id="imgConvert" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</asp:Content>

