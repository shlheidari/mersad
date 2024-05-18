<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="AddNewLocation.aspx.cs" Inherits="MersadWebApplication.Moderator.AddNewLocation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Head" runat="server">
    <script src="../Scripts/jquery-3.7.1.min.js"></script>
    <script src="../Scripts/bootstrap.min.js"></script>
    <script src="../Scripts/Test.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/ol@v8.2.0/dist/ol.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v8.2.0/ol.css">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <script>
        $(document).ready(function () {
            var wid = window.innerWidth - 230;
            var heigh = window.innerHeight - 185;
            if ((heigh - 40) > 1152) {
                $("#HellowWorldPopups").css({ "height": 1150 });
                $("#PanelAddLocation").css({ "height": 1150 });

            }
            else {
                $("#PanelAddLocation").css({ "height": heigh - 40 });
                $("#HellowWorldPopups").css({ "height": heigh - 40 });
            }



            $("#mainContainer").css({ "width": wid + 200, "height": heigh + 40 });
            $("#map").css({ "width": wid + 200, "height": heigh + 40 });
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
    <div id="mainContainer" class="map-left-panel">
        <script>
            $(document).ready(function () {

                var wid = window.innerWidth - 200;
                var hei = window.innerHeight - 150;
                $("#addNewa").css({ "top": hei });
                $("#addNewa").css({ "left": wid });
            });
        </script>

        <img id="addNewa" src="../images/addlocation.png" style="position: absolute; width: 206px; height: 83px; z-index: 100;" />

        <div id="map" class="map"></div>
        <script src="../Scripts/blackspot.js"></script>
        <asp:HiddenField ID="hdnSelectedTicket" runat="server" ClientIDMode="Static" />
        <script>


            function changemap(bsjson) {
                pintvector.getSource().clear();
                map.removeLayer(pintvector);

                var geojsonFormat = new ol.format.GeoJSON();
                var features = geojsonFormat.readFeatures(bsjson);
                vectorSource.addFeatures(features);
                map.addLayer(pintvector)



            }

            map.on('singleclick', function (evt) {
                var coordinate = evt.coordinate;
                $('#hdnSelectedTicket').val(coordinate);                
                var value = $('#hdnSelectedTicket').val();              
                getCurrent(value);     
                $("#<%= PanelAddLocation.ClientID %>").fadeIn();
            });

            function getCurrent(coordinate) {
                var obj = {
                    "MyLocation": coordinate
                     
                }
                $.ajax({
                    type: "POST",
                    url: "AddNewLocation.aspx/GoMyLocation",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (r) {
                        var bsjson = JSON.parse(r.d[0].str);
                        $("#<%= PanelAddLocation.ClientID %>").fadeIn(200);


                    },
                    complete: function (r) {




                    },

                });
            }


        </script>
        <div class="dashboard-left">
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

        .HellowWorldPopup {
            min-width: 614px;
            background: white;
        }
    </style>

    <link href="../jsdatetime/jquery.mpdatepicker.css" rel="stylesheet" />
    <script src="../jsdatetime/jquery.mpdatepicker.js"></script>
    <script type="text/javascript">
        $(function () {
            $(".sample-date-picker").mpdatepicker({
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
    <script type="text/javascript">
        $(function () {
            $(".sample-date-picker2").mpdatepicker({
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
    <script type="text/javascript">
        $(function () {
            $(".sample-date-picker3").mpdatepicker({
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
    <script type="text/javascript">
        $(function () {
            $(".sample-date-picker4").mpdatepicker({
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
    <script type="text/javascript">
        $(function () {
            $(".sample-date-picker5").mpdatepicker({
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
    <script>
        function closeAddLocation() {
            $("#<%= PanelAddLocation.ClientID %>").fadeOut();
        }
    </script>

    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
    <div   runat="server" id="PanelAddLocation" style="z-index: 1000;display:none;  position: absolute; background-color: white; padding-bottom: 20px; width: 614px; top: 0; left: 0; margin-left: 90px; margin-top: 105px;">
        <div id="headerAdd" style="background-color: #858585; height: 41px;">
            <asp:ImageButton Style="padding: 0px !important; float: left; margin-top: 10px; margin-left: 10px;" ID="ImageButton1" runat="server" ImageUrl="~/Images/BtnClose.png" Width="21" Height="20"  />
            <asp:ImageButton Style="padding: 0px !important; float: right; margin-top: 10px; margin-right: 10px; border-radius: 0px; border: none;" ID="ImageButton2" runat="server" ImageUrl="~/Images/gridTop.png" Width="27" Height="21" />
        </div>
        <div id="HellowWorldPopups" class="HellowWorldPopup" style="overflow: scroll;">
            <div class="container">
                <div class="row" style="border-radius: 7px; font-size: 18px; border: 1px solid #DDDDDD; padding: 5px; margin: 10px;">
                    <asp:Button ID="BtnAdd" runat="server" Text="" Style="visibility: hidden;" OnClick="BtnAdd_Click" />
                    <span style="float: right; width: 160px;">وضعیت کنونی نقطه:</span>
                    <asp:DropDownList ID="ddlListStatus" runat="server" Style="padding-right: 10px; width: 300px; height: 40px;"></asp:DropDownList>
                </div>
                <div class="row" style="border-radius: 7px; font-size: 18px; border: 1px solid #DDDDDD; padding: 5px; margin: 10px;">
                    <table class="table">
                        <tr>
                            <td style="width: 17px; border-bottom: none;">
                                <img src="../Images/cal.png" /></td>
                            <td style="border-bottom: none;">تاریخ اعلام نقطه از سوی پلیس</td>
                            <td style="border-bottom: none;">


                                <asp:TextBox ID="txtinsertelamenoghtesooyePolice" placeholder="انتخاب تاریخ" CssClass="sample-date-picker" runat="server"></asp:TextBox>

                            </td>
                        </tr>
                        <tr>
                            <td style="width: 17px; border-bottom: none;">
                                <img src="../Images/cal.png" /></td>

                            <td style="border-bottom: none;">تاریخ ثبت نقطه در سامانه </td>
                            <td style="border-bottom: none;">


                                <asp:TextBox class="sample-date-picker2" ID="txtinsertinDatabase" placeholder="انتخاب تاریخ" runat="server"></asp:TextBox>
                            </td>

                        </tr>
                        <tr>
                            <td style="width: 17px; border-bottom: none;">
                                <img src="../Images/cal.png" /></td>

                            <td style="border-bottom: none;">تاریخ بازدید</td>
                            <td style="border-bottom: none;">


                                <asp:TextBox ID="txtinsertdatebazdid" class="sample-date-picker3" placeholder="انتخاب تاریخ" runat="server"></asp:TextBox>


                            </td>
                        </tr>
                        <tr>
                            <td style="width: 17px; border-bottom: none;">
                                <img src="../Images/cal.png" /></td>

                            <td style="border-bottom: none;">تاریخ قرار گیری نقطه درصف اقدام</td>
                            <td style="border-bottom: none;">


                                <asp:TextBox ID="txtinsertDategharargiridarsaf" class="sample-date-picker4" placeholder="انتخاب تاریخ" runat="server"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 17px; border-bottom: none;">
                                <img src="../Images/cal.png" /></td>

                            <td style="border-bottom: none;">تاریخ شروع اجرای اقدام برای نقطه</td>
                            <td style="border-bottom: none;">


                                <asp:TextBox ID="txtinserttarikheshorooeejrayeeghdambarayeNoghte" class="sample-date-picker5" placeholder="انتخاب تاریخ" runat="server"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 17px; border-bottom: none;">
                                <img src="../Images/cal.png" /></td>

                            <td style="border-bottom: none;">تاریخ خاتمه یافتن اجرای اقدام </td>
                            <td style="border-bottom: none;">


                                <asp:TextBox ID="txtinserttarikhekhatemeyaftanejrayeeghdam" class="sample-date-picker5" placeholder="انتخاب تاریخ" runat="server"></asp:TextBox>
                            </td>
                        </tr>
                    </table>

                </div>
                <div class="row" style="border-radius: 7px; font-size: 18px; border: 1px solid #DDDDDD; padding: 5px; margin: 10px; max-height: 300px; height: 300px;">

                    <table class="table">
                        <tr>
                            <td style="border-bottom: 0px; height: 20px;">
                                <img src="../Images/doc.png" style="width: 20px; height: 20px;" />
                                اسناد مرتبط با نقاط حادثه خیز

                            </td>
                        </tr>
                        <tr>
                            <td style="border-bottom: 0px; height: 200px; max-height: 200px; overflow: scroll; background-image: url(../IMAGES/backUpload1.png); background-position: center; background-repeat: no-repeat;">
                                <div class="w-100 h-100" style="overflow: scroll">
                                    <asp:Repeater ID="rptDisplayItemAsnad" runat="server" OnItemCommand="rptDisplayItemAsnad_ItemCommand">
                                        <ItemTemplate>
                                            <div class="col-4" style="margin: 10px; float: right; width: 137px; height: 97px; background-image: url(../images/wordIcon.png);" runat="server" visible='<%# Eval("DataType").Equals(".docx")||Eval("DataType").Equals(".doc") %>'>
                                                <asp:ImageButton runat="server" Width="50" Height="45" CommandArgument='<%# Eval("id") %>' CommandName="Delete" ImageUrl="~/Images/DeleteImage.jpg" Style="border-radius: 1px !important;" />
                                            </div>
                                            <div class="col-4" style="margin: 10px; float: right; width: 137px; height: 97px; background-image: url(../images/excelIcon.png);" runat="server" visible='<%#  Eval("DataType").Equals(".xlsx")||Eval("DataType").Equals(".xls") %>'>
                                                <asp:ImageButton runat="server" Width="50" Height="45" CommandArgument='<%# Eval("id") %>' CommandName="Delete" ImageUrl="~/Images/DeleteImage.jpg" Style="border-radius: 1px !important;" />
                                            </div>
                                            <div class="col-4" style="margin: 10px; float: right; width: 137px; height: 97px; background-image: url(../images/PowerPointIcon.png);" runat="server" visible='<%# Eval("DataType").Equals(".pptx")||Eval("DataType").Equals(".ppt") %>'>
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
                                <img src="../Images/iconCamera.png" style="width: 20px; height: 20px;" />
                                تصاویر و ویدیوهای مربوط به نقاط حادثه خیز

                            </td>
                        </tr>
                        <tr>
                            <td style="border-bottom: 0px; height: 200px; max-height: 200px; overflow: scroll; background-image: url(../IMAGES/backGroupVideo.png); background-position: center; background-repeat: no-repeat;">
                                <div class="w-100 h-100" style="overflow: scroll">
                                    <asp:Repeater ID="rptListImageAndVideo" runat="server" OnItemCommand="rptListImageAndVideo_ItemCommand">
                                        <ItemTemplate>
                                            <div class="col-4" style="margin: 10px; float: right; width: 137px; height: 97px;" runat="server" visible='<%# Eval("DataType").Equals(".jpg")||Eval("DataType").Equals(".png") %>'>
                                                <img src='<%# "../temp/"+ Eval("addressFile") %>' style="margin: 10px; float: right; width: 137px; height: 97px;" />
                                                <asp:ImageButton runat="server" Width="50" Height="45" CommandArgument='<%# Eval("id") %>' CommandName="Delete" ImageUrl="~/Images/DeleteImage.jpg" Style="border-radius: 1px !important; margin-top: -40px;" />
                                            </div>
                                            <div class="col-4" style="margin: 10px; float: right; width: 137px; height: 97px; background-image: url(../images/mp4.png);" runat="server" visible='<%#  Eval("DataType").Equals(".mp4") %>'>
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
                    <asp:Button ID="Insertlocation" runat="server" CssClass="btn-login" type="button" Text="ثبت" Style="width: 60px; height: 40px; text-align: center;" OnClick="Insertlocation_Click" />
                </div>
                <div style="line-height: 10px;"></div>
            </div>
        </div>
    </div>
    <style>
        .download {
            padding: 1.25rem;
            border: 0;
            border-radius: 3px;
            background-color: #4F46E5;
            color: #fff;
            cursor: pointer;
            text-decoration: none;
        }

            .download:hover {
                color: #fff
            }

        #carbonads {
            display: block;
            overflow: hidden;
            max-width: 728px;
            position: relative;
            font-size: 22px;
            box-sizing: content-box
        }

            #carbonads > span {
                display: block
            }

            #carbonads a {
                color: #4F46E5;
                text-decoration: none
            }

                #carbonads a:hover {
                    color: #4F46E5
                }

        .carbon-wrap {
            display: flex;
            align-items: center
        }

        .carbon-img {
            display: block;
            margin: 0;
            line-height: 1
        }

            .carbon-img img {
                display: block;
                height: 90px;
                width: auto
            }

        .carbon-text {
            display: block;
            padding: 0 1em;
            line-height: 1.35;
            text-align: left
        }

        .carbon-poweredby {
            display: block;
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 6px 10px;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: .5px;
            font-weight: 600;
            font-size: 8px;
            border-top-left-radius: 4px;
            line-height: 1;
            color: #aaa !important
        }

        @media only screen and (min-width:320px) and (max-width:759px) {
            .carbon-text {
                font-size: 14px
            }
        }
    </style>
</asp:Content>
