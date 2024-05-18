<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="HadeseKhiz.aspx.cs" Inherits="MersadWebApplication.Moderator.User.HadeseKhiz" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="Head" runat="server">
    <script src="../../Scripts/jquery-3.7.1.min.js"></script>
    <script src="../../Scripts/bootstrap.min.js"></script>
    <script src="../../Scripts/Test.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/ol@v8.2.0/dist/ol.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v8.2.0/ol.css">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script>
        $(document).ready(function () {
            var wid = window.innerWidth - 230;
            var heigh = window.innerHeight - 185;
            //if ((heigh - 40) > 1152) {
            //    $("#HellowWorldPopups").css({ "height": 1150 });
            //    $("#PanelAddLocation").css({ "height": 1150 });
            //}
            //else {
            //    $("#PanelAddLocation").css({ "height": heigh - 40 });
            //    $("#HellowWorldPopups").css({ "height": heigh - 40 });
            //}
            $("#PanelAddLocation").css({ "height": heigh - 40 });
            $("#HellowWorldPopups").css({ "height": heigh - 40 });
            $("#mainContainer").css({ "width": wid, "height": heigh });
            $("#map").css({ "width": 100%, "height": heigh + 20 });
            //var widforf = wid / 2.5;
            $("#f").css({ "height": heigh });
            $("#adminright").css({ "height": window.innerHeight - 90 });
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

    

    <div id="adminright" class="admin-right-panel" style="overflow-y: auto; float: right !important;">
        <div class="panel-head">
            فیلترها<span class="spinner-border text-warning" role="status" style="display: none" id="spinSearchLoading">
                <span class="sr-only">Loading...</span>
            </span>

        </div>
        <hr />
        <script>
            var getSelectBazeZamani = "0";
            var fromDate = "0";
            var toDate = "0";
            var noe = "0";




            function GetSlidShow() {

                if ($('#rdElameNoghteAzSooyePolice').is(':checked')) {
                    noe = "ElameNoghteAzSooyePolice";
                }
                else {
                    if ($('#rdSabteNoghteDarSamane').is(':checked')) {
                        noe = "SabteNoghteDarSamane";
                    }
                    else {
                        if ($('#rdbazdid').is(':checked')) {
                            noe = "bazdid";
                        }
                        else {
                            if ($('#rdGhararGirieNoghteDarsafeEghdam').is(':checked')) {
                                noe = "GhararGirieNoghteDarsafeEghdam";
                            }
                            else {
                                if ($('#rdShorooeejrayeEghdambarayeNoghte').is(':checked')) {
                                    noe = "ShorooeejrayeEghdambarayeNoghte";
                                }
                                else {
                                    if ($('#rdKhatemeyaftanejrayeEghdam').is(':checked')) {
                                        noe = "KhatemeyaftanejrayeEghdam";
                                    }
                                    else {
                                        noe = "0";
                                    }
                                }
                            }
                        }
                    }
                }


                if ($('#rbDosal').is(':checked')) {
                    getSelectBazeZamani = "2sal";
                    fromDate = "0";
                    toDate = "0";

                }
                else {
                    if ($('#rbBzyeksal').is(':checked')) {
                        getSelectBazeZamani = "1sal";
                        fromDate = "0";
                        toDate = "0";

                    }
                    else {
                        if ($('#rbBzyekhafte').is(':checked')) {
                            getSelectBazeZamani = "1hafte";
                            fromDate = "0";
                            toDate = "0";


                        }
                        else {
                            if ($('#rbbazeZamani').is(':checked')) {
                                fromDate = $("#txtFromDate").val();
                                toDate = $("#txtToDate").val();
                                getSelectBazeZamani = "range";

                            }

                        }
                    }
                }





                if (noe != "0" && getSelectBazeZamani != "0") {
                    var obj = {
                        "StatusBazeZamani": getSelectBazeZamani,
                        "DateFrom": fromDate,
                        "DateTo": toDate,
                        "type": noe
                    }
                    $.ajax({
                        type: "POST",
                        url: "HadeseKhiz.aspx/GetList",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (r) {
                            var bsjson = JSON.parse(r.d[0].str);                            
                            changemap(bsjson)


                        },
                        complete: function (r) {




                        },

                    });
                }
                else {

                }

            }

            function justSelectStateDate() {
                if ($('#rbDosal').is(':checked')) {
                    $("#divShowDate").fadeOut(100);
                }
                else {
                    if ($('#rbBzyeksal').is(':checked')) {
                        $("#divShowDate").fadeOut(100);
                    }
                    else {
                        if ($('#rbBzyekhafte').is(':checked')) {
                            $("#divShowDate").fadeOut(100);

                        }
                        else {
                            if ($('#rbbazeZamani').is(':checked')) {
                                $("#divShowDate").fadeIn(100);

                            }

                        }
                    }
                }
            }

        </script>


        <div class="form-group">
            <div class="white-box">
                <div style="padding-right: 5px">بازه زمانی</div>

                <hr />
                <div class="row form-group">

                    <div class="col-6">
                        <input type="radio" id="rbBzyekhafte" name="BazeZamani" value="یک هفته" onclick="justSelectStateDate()" />
                        <label for="rbBzyekhafte">یک هفته گذشته</label>
                    </div>
                    <div class="col-6">
                        <input type="radio" id="rbBzyekmah" name="BazeZamani" value="" onclick="justSelectStateDate()" />
                        <label for="rbBzyekmah">یک ماه گذشته</label>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-6">
                        <input type="radio" id="rbBzyeksal" name="BazeZamani" onclick="justSelectStateDate()" />
                        <label for="rbBzyeksal">یک سال گذشته</label>
                    </div>
                    <div class="col-6">
                        <input type="radio" id="rbDosal" name="BazeZamani" value="دو سال" onclick="justSelectStateDate()" />
                        <label for="rbDosal">دوسال گذشته</label>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-6">
                        <input type="radio" id="rbbazeZamani" name="BazeZamani" onclick="justSelectStateDate()">
                        <label for="rbbazeZamani">بازده زمانی</label>
                    </div>

                </div>

                <div id="divShowDate" style="display: none">
                    <div class="inner-addon left-addon">
                        <div class="input-group-prepend">
                            <span style="cursor: pointer; display: none" class="input-group-text" id="dateDateRange"></span>
                        </div>
                       <%--<i style="cursor: pointer" class="fa fa-calendar fa-2x"></i>--%>

                        <link href="../../jsdatetime/jquery.mpdatepicker.css" rel="stylesheet" />
                        <script src="../../jsdatetime/jquery.mpdatepicker.js"></script>

                        <script type="text/javascript">
                            $(function () {
                                $(".rangeFrom").mpdatepicker({
                                    'timePicker': false,
                                    onOpen: function () {
                                        console.log('open');
                                    },
                                    onSelect: function (selected) {
                                        console.log('select', selected);
                                    },
                                    onChange: function (oldVal, newVal) {
                                        console.log('change', oldVal, newVal);
                                    },
                                    onClose: function () {
                                        console.log('close');
                                    },
                                });
                            });
                            $(function () {
                                $(".rangeTo").mpdatepicker({
                                    'timePicker': false,
                                    onOpen: function () {
                                        console.log('open');
                                    },
                                    onSelect: function (selected) {
                                        console.log('select', selected);
                                    },
                                    onChange: function (oldVal, newVal) {
                                        console.log('change', oldVal, newVal);
                                    },
                                    onClose: function () {
                                        console.log('close');
                                    },
                                });
                            });
    </script>
                        <input type="text" class="rangeFrom" placeholder="از تاریخ" id="txtFromDate" maxlength="10" readonly="" />
                        <input type="text" placeholder="تا تاریخ" id="txtToDate" class="rangeTo" maxlength="10" readonly="" />
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group" style="padding-bottom: 15px;">
            <div class="white-box">
                <div style="padding-right: 5px">نوع نقطه حادثه خیز</div>
                <hr />
                <div class="row form-group">
                    <div class="col-6">
                        <input type="radio" id="rdElameNoghteAzSooyePolice" name="noghthadesekhiz" />
                        <label for="rdElameNoghteAzSooyePolice">اعلام شده</label>

                    </div>
                    <div class="col-6">
                        <input type="radio" id="rdSabteNoghteDarSamane" name="noghthadesekhiz" />
                        <label for="rdSabteNoghteDarSamane">ثبت شده شده</label>

                    </div>
                </div>

                <div class="row form-group">

                    <div class="col-6">
                        <input type="radio" id="rdbazdid" name="noghthadesekhiz" />
                        <label for="rdbazdid">بازدید شده</label>

                    </div>
                    <div class="col-6">
                        <input type="radio" id="rdGhararGirieNoghteDarsafeEghdam" name="noghthadesekhiz" text="صف اقدام" />
                        <label for="rdGhararGirieNoghteDarsafeEghdam">در صف اقدام</label>

                    </div>

                </div>


                <div class="row">

                    <div class="col-6">
                        <input type="radio" id="rdShorooeejrayeEghdambarayeNoghte" name="noghthadesekhiz" text="اقدام شده" />
                        <label for="rdShorooeejrayeEghdambarayeNoghte">اقدام شروع شده</label>
                    </div>

                    <div class="col-12">
                        <input type="radio" id="rdKhatemeyaftanejrayeEghdam" name="noghthadesekhiz" text="اقدام شده" />
                        <label for="rdKhatemeyaftanejrayeEghdam">اجرای اقدام خاتمه یافته</label>

                    </div>
                </div>
                <div class="row mt-2">
                </div>
            </div>

        </div>
        <button type="button" onclick="GetSlidShow()" style="margin: 20px 50px 0px 0px; padding: 10px;" title="بررسی">نمایش نقاط</button>

        <br />


        <br />

    </div>






    <div id="mainContainer" class="map-left-panel">


        <script>

            $(document).ready(function () {

                var wid = window.innerWidth - 500;
                var hei = window.innerHeight - 150;


                $("#addNewa").css({ "top": hei });
                $("#addNewa").css({ "left": wid });

            });


            function GetDisplay(di) {
                var obj = {
                    "test": di

                }
                $.ajax({
                    type: "POST",
                    url: "HadeseKhiz.aspx/ShowDetail",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (r) {

                        $("#<%=hdnSelectedTicket.ClientID%>").val(r.d[0].date1);



                        $("#<%= btnRef.ClientID %>").click();
                    },
                    complete: function (r) {
                        console.log(r)


                    },

                });
            }

        </script>

        <a href="AddNewLocation.aspx" target="_parent">
            <img id="addNewa" src="../../images/addlocation.png" style="position: absolute; width: 206px; height: 83px; z-index: 100;" />
        </a>

        <div id="map" class="map" style="position: relative; outline: none;"></div>

        <script src="../../Scripts/blackspot.js"></script>
    

        <script>


            function changemap(bsjson) {
                console.log(bsjson);
                pintvector.getSource().clear();
                map.removeLayer(pintvector);

                var geojsonFormat = new ol.format.GeoJSON();
                var features = geojsonFormat.readFeatures(bsjson);
                vectorSource.addFeatures(features);
                map.addLayer(pintvector)



            }

            map.on('singleclick', function (evt) {
                const coordinate = evt.coordinate;
                $("#<%= PanelAddLocation.ClientID %>").fadeIn();
                map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                    const fid = feature.get('id');

                    var Omid = feature.getGeometry().getCoordinates();
                    GetDisplay(fid);



                  $('#<%= aa.ClientID%>').val(fids);

                   $("#<%= PanelAddLocation.ClientID %>").fadeIn();
                   $("#<%= btnRef.ClientID %>").click();

                });


            });



        </script>
        <div class="dashboard-left">

            <asp:HiddenField ID="hdnSelectedTicket" runat="server" ClientIDMode="Static" />
            <%--<div class="hide-left-panel"><i class="fa fa-angle-double-right fa-2x" style="margin-right: 10px;"></i></div>--%>
            <div class="map-zoom">
                <div class="map-plus" id="divZoomIn" title="بزرگنمایی"><i class="fa fa-plus"></i></div>
                <div class="map-minus" id="divZoomOut" title="کوچکنمایی"><i class="fa fa-minus"></i></div>
            </div>
            <div class="map-detail map-my-loc" id="divMyLocatoin" title="لوکیشن فعلی"><i class="fa fa-crosshairs"></i></div>
            <div class="map-detail map-compass" id="divCompass" title="شمال">
                <img style="width: 30px;" src="/Images/compass.png" />
            </div>

            <div class="map-detail-title-first hide"><span class="map-detail-caption">در انتظار تایید قرارگاه</span><i class="fa fa-caret-left map-detail-left-arr"></i><i class="fa fa-dot-circle map-detail-icon" title="در انتظار تایید قرارگاه"></i></div>

            <div class="map-detail-title"><span class="map-detail-caption">اعلام شده</span><i class="fa fa-caret-left map-detail-left-arr"></i><i class="map-cube-help map-elamshode fa-2x map-detail-icon" title="اعلام شده"></i></div>
            <div class="map-detail-title"><span class="map-detail-caption">بازدید شده</span><i class="fa fa-caret-left map-detail-left-arr"></i><i class="map-cube-help map_bazdidShode fa-2x map-detail-icon" title="بازدید شده"></i></div>
            <div class="map-detail-title"><span class="map-detail-caption">صف اقدام</span><i class="fa fa-caret-left map-detail-left-arr"></i><i class="map-cube-help MapSafeEghda map-detail-icon" title="صف اقدام"></i></div>
            <div class="map-detail-title">
                <span class="map-detail-caption">اقدام شده</span><i class="fa fa-caret-left map-detail-left-arr"></i><i class="map-cube-help eghdamShode map-detail-icon" title="اقدام شده"></i>
            </div>

        </div>


    </div>




    <style>
        .ModalPopupBG {
            background-color: black;
            filter: alpha(opacity=50);
            opacity: 0.7;
        }


        .HellowWorldPopups {
            min-width: 614px;
            background: white;
        }
    </style>
    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>



    <script>
            function closeAddLocation() {
                $("#PanelAddLocation").fadeOut();
            }
    </script>


    <div runat="server" id="PanelAddLocation" style="overflow: scroll; max-height:100%; z-index: 1000; display: none; position: absolute; background-color: white; padding-bottom: 20px; width: 614px; top: 0; left: 0; margin-left: 90px; margin-top: 145px;">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>
                <asp:Label ID="aa" runat="server"></asp:Label>
                <%--<label id="smal"></label>--%>
                <asp:Button ID="btnRef" runat="server" Style="visibility: hidden;" OnClick="btnRef_Click" hidden="true" />
                <div id="headerAdd" style="background-color: #858585; height: 41px;">
                    <script>
                        function GetHide() {
                            $("#<%= PanelAddLocation.ClientID  %>").fadeOut();
                        }
                    </script>


                    <asp:ImageButton Style="padding: 0px !important; float: left; margin-top: 10px; margin-left: 10px;" ID="ImageButton1" runat="server" ImageUrl="~/Images/BtnClose.png" Width="21" Height="20" OnClientClick="GetHide()" />
                    <asp:ImageButton Style="padding: 0px !important; float: right; margin-top: 10px; margin-right: 10px; border-radius: 0px; border: none;" ID="ImageButton2" runat="server" ImageUrl="~/Images/gridTop.png" Width="27" Height="21" />
                </div>
                <div id="HellowWorldPopups" class="HellowWorldPopup">
                    <div class="container">
                        <div class="row" style="border-radius: 7px; font-size: 18px; border: 1px solid #DDDDDD; padding: 5px; margin: 10px;">

                            <span style="float: right; width: 160px;">وضعیت کنونی نقطه:</span>
                            <asp:DropDownList ID="ddlListStatus" runat="server" Style="padding-right: 10px; width: 300px; height: 40px;"></asp:DropDownList>
                        </div>
                        <div class="row" style="border-radius: 7px; font-size: 18px; border: 1px solid #DDDDDD; padding: 5px; margin: 10px;">
                            <table class="table">
                                <tr>
                                    <td style="width: 17px; border-bottom: none;">
                                        <img src="../../Images/cal.png" /></td>
                                    <td style="border-bottom: none;">تاریخ اعلام نقطه از سوی پلیس</td>
                                    <td style="border-bottom: none;">


                                        <asp:TextBox ID="txtinsertelamenoghtesooyePolice" placeholder="انتخاب تاریخ" CssClass="rangeFrom mpdatepicker" runat="server"></asp:TextBox>

                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 17px; border-bottom: none;">
                                        <img src="../../Images/cal.png" /></td>

                                    <td style="border-bottom: none;">تاریخ ثبت نقطه در سامانه </td>
                                    <td style="border-bottom: none;">


                                        <asp:TextBox class="rangeFrom mpdatepicker" ID="txtinsertinDatabase" placeholder="انتخاب تاریخ" runat="server"></asp:TextBox>
                                    </td>

                                </tr>
                                <tr>
                                    <td style="width: 17px; border-bottom: none;">
                                        <img src="../../Images/cal.png" /></td>

                                    <td style="border-bottom: none;">تاریخ بازدید</td>
                                    <td style="border-bottom: none;">


                                        <asp:TextBox ID="txtinsertdatebazdid" class="rangeFrom mpdatepicker" placeholder="انتخاب تاریخ" runat="server"></asp:TextBox>


                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 17px; border-bottom: none;">
                                        <img src="../../Images/cal.png" /></td>

                                    <td style="border-bottom: none;">تاریخ قرار گیری نقطه درصف اقدام</td>
                                    <td style="border-bottom: none;">


                                        <asp:TextBox ID="txtinsertDategharargiridarsaf" class="rangeFrom mpdatepicker" placeholder="انتخاب تاریخ" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 17px; border-bottom: none;">
                                        <img src="../../Images/cal.png" /></td>

                                    <td style="border-bottom: none;">تاریخ شروع اجرای اقدام برای نقطه</td>
                                    <td style="border-bottom: none;">


                                        <asp:TextBox ID="txtinserttarikheshorooeejrayeeghdambarayeNoghte" class="rangeFrom mpdatepicker" placeholder="انتخاب تاریخ" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 17px; border-bottom: none;">
                                        <img src="../../Images/cal.png" /></td>

                                    <td style="border-bottom: none;">تاریخ خاتمه یافتن اجرای اقدام </td>
                                    <td style="border-bottom: none;">


                                        <asp:TextBox ID="txtinserttarikhekhatemeyaftanejrayeeghdam" class="rangeFrom mpdatepicker" placeholder="انتخاب تاریخ" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>

                        </div>
                        <div class="row" style="border-radius: 7px; font-size: 18px; border: 1px solid #DDDDDD; padding: 5px; margin: 10px; max-height: 300px; height: 300px;">

                            <table class="table">
                                <tr>
                                    <td style="border-bottom: 0px; height: 20px;">
                                        <img src="../../Images/doc.png" style="width: 20px; height: 20px;" />
                                        اسناد مرتبط با نقاط حادثه خیز

                                    </td>
                                </tr>
                                <tr>
                                    <td style="border-bottom: 0px; height: 200px; max-height: 200px; overflow: scroll; background-image: url(../../IMAGES/backUpload1.png); background-position: center; background-repeat: no-repeat;">
                                        <div class="w-100 h-100" style="overflow: scroll">
                                            <asp:Repeater ID="rptDisplayItemAsnad" runat="server" OnItemCommand="rptDisplayItemAsnad_ItemCommand">
                                                <ItemTemplate>
                                                    <div class="col-4" style="margin: 10px; float: right; width: 137px; height: 97px; background-image: url(../../images/wordIcon.png);" runat="server" visible='<%# Eval("DataType").Equals(".docx")||Eval("DataType").Equals(".doc") %>'>
                                                        <asp:ImageButton runat="server" Width="50" Height="45" CommandArgument='<%# Eval("id") %>' CommandName="Delete" ImageUrl="~/Images/DeleteImage.jpg" Style="border-radius: 1px !important;" />
                                                    </div>
                                                    <div class="col-4" style="margin: 10px; float: right; width: 137px; height: 97px; background-image: url(../../images/excelIcon.png);" runat="server" visible='<%#  Eval("DataType").Equals(".xlsx")||Eval("DataType").Equals(".xls") %>'>
                                                        <asp:ImageButton runat="server" Width="50" Height="45" CommandArgument='<%# Eval("id") %>' CommandName="Delete" ImageUrl="~/Images/DeleteImage.jpg" Style="border-radius: 1px !important;" />
                                                    </div>
                                                    <div class="col-4" style="margin: 10px; float: right; width: 137px; height: 97px; background-image: url(../../images/PowerPointIcon.png);" runat="server" visible='<%# Eval("DataType").Equals(".pptx")||Eval("DataType").Equals(".ppt") %>'>
                                                        <asp:ImageButton runat="server" Width="50" Height="45" CommandArgument='<%# Eval("id") %>' CommandName="Delete" ImageUrl="~/Images/DeleteImage.jpg" Style="border-radius: 1px !important;" />
                                                    </div>
                                                </ItemTemplate>
                                            </asp:Repeater>

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border-bottom: 0px; height: 70px">
                                        <asp:FileUpload ID="fileUploadAsnad" runat="server" Style="width: 300px; border: none !important; border-radius: 0px;" /><asp:Button ID="BtnUploadasnad" runat="server" Style="padding: 10px;" Text="بارگذاری" OnClick="BtnUploadasnad_Click" />
                                    </td>
                                </tr>
                            </table>


                        </div>
                        <div class="row" style="border-radius: 7px; font-size: 18px; border: 1px solid #DDDDDD; padding: 5px; margin: 10px; max-height: 300px; height: 300px;">

                            <table class="table">
                                <tr>
                                    <td style="border-bottom: 0px; height: 20px;">
                                        <img src="../../Images/iconCamera.png" style="width: 20px; height: 20px;" />
                                        تصاویر و ویدیوهای مربوط به نقاط حادثه خیز

                                    </td>
                                </tr>
                                <tr>
                                    <td style="border-bottom: 0px; height: 200px; max-height: 200px; overflow: scroll; background-image: url(../../IMAGES/backGroupVideo.png); background-position: center; background-repeat: no-repeat;">
                                        <div class="w-100 h-100" style="overflow: scroll">
                                            <asp:Repeater ID="rptListImageAndVideo" runat="server" OnItemCommand="rptListImageAndVideo_ItemCommand">
                                                <ItemTemplate>
                                                    <div class="col-4" style="margin: 10px; float: right; width: 137px; height: 97px;" runat="server" visible='<%# Eval("DataType").Equals(".jpg")||Eval("DataType").Equals(".png") %>'>
                                                        <img src='<%# "../../temp/"+ Eval("addressFile") %>' style="margin: 10px; float: right; width: 137px; height: 97px;" />
                                                        <asp:ImageButton runat="server" Width="50" Height="45" CommandArgument='<%# Eval("id") %>' CommandName="Delete" ImageUrl="~/Images/DeleteImage.jpg" Style="border-radius: 1px !important; margin-top: -40px;" />
                                                    </div>
                                                    <div class="col-4" style="margin: 10px; float: right; width: 137px; height: 97px; background-image: url(../../images/mp4.png);" runat="server" visible='<%#  Eval("DataType").Equals(".mp4") %>'>
                                                        <asp:ImageButton runat="server" Width="50" Height="45" CommandArgument='<%# Eval("id") %>' CommandName="Delete" ImageUrl="~/Images/DeleteImage.jpg" Style="border-radius: 1px !important;" />
                                                    </div>

                                                </ItemTemplate>
                                            </asp:Repeater>

                                        </div>


                                    </td>
                                </tr>
                                <tr>
                                    <td style="border-bottom: 0px; height: 70px">
                                        <asp:FileUpload ID="fileUploadMedia" runat="server" Style="width: 300px; border: none !important; border-radius: 0px;" /><asp:Button ID="BtnAddMedia" runat="server" Style="padding: 10px;" Text="بارگذاری" OnClick="BtnAddMedia_Click" />
                                    </td>
                                </tr>
                            </table>


                        </div>

                        <div class="row" style="border-radius: 7px; font-size: 18px; border: 1px solid #DDDDDD; padding: 5px; margin: 10px; max-height: 300px; height: 300px;">
                            <asp:TextBox TextMode="MultiLine" ID="txtTozihat" runat="server" CssClass="w-100" Style="height: 290px;"></asp:TextBox>
                        </div>
                        <div class="row align-content-end justify-content-end" style="padding: 10px; margin: 10px; max-height: 80px; height: 80px; text-align: left;">
                            <asp:Button ID="Insertlocationtion" runat="server" CssClass="btn-login" type="button" Text="ثبت" Style="width: 60px; height: 40px; text-align: center;" OnClick="UpdateLocation_Click" />
                        </div>
                        <div style="line-height: 10px;"></div>
                    </div>
                </div>

            </ContentTemplate>

        </asp:UpdatePanel>
    </div>
</asp:Content>
