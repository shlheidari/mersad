<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RecoveryPassword.aspx.cs" Inherits="MersadWebApplication.RecoveryPassword" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>فراموشی رمز و بازنشانی کلمه عبور</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="Scripts/jquery-3.7.1.min.js"></script>
    <style>
        @font-face {
            font-family: ir;
            src: url('../App_Themes/fonts/IRANSans-Light.eot');
            src: local('☺'), url('../App_Themes/fonts/IRANSans-Light.woff') format('woff'), url('../App_Themes/fonts/IRANSans-Light.ttf') format('truetype');
        }

        table tr td {
            font-family: ir;
            padding: 5px;
            vertical-align: middle;
        }
    </style>
    <script>
        $(document).ready(function () {
            var wid = window.innerWidth;
            var hi = window.innerHeight;
            $(".Main").css({ "width": wid, "height": hi });
            $("#ss").css({ "height": hi });
            $("#message").fadeIn(500).fadeOut(10000);

        });
    </script>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.rtl.min.css" integrity="sha384-gXt9imSW0VcJVHezoNQsP+TNrjYXoGcrqBZJpry9zJt8PCQjobwmhMGaDHTASo9N" crossorigin="anonymous">
</head>
<body>
    <form id="form1" class="Main" runat="server" style="background-color: #1e88fa">

        <div class="container w-100 h-100">
            <div id="ss" class="row justify-content-center align-content-center">
                <div id="message" visible="false" runat="server" class="alert alert-danger" role="alert" style="position: absolute;width:300px;font-family:ir">
                    <asp:Literal ID="ltMessage" runat="server"></asp:Literal>
                </div>
               
                <div style="width: 400px; height: 580px; background-color: white; border: 1px solid #d3c7c7; border-radius: 15px; text-align: center; padding: 10px;" dir="rtl">
                    <div class="font-weight-bold" style="font-family: ir">فراموشی رمز عبور</div>
                    <asp:MultiView ID="mvstate" runat="server" ActiveViewIndex="0">
                        <asp:View ID="vwdatainsert" runat="server">
                            <table class="table mt-5" style="float: right;">
                                <tr>
                                    <td style="width: 100px; text-align: left;">نام کاربری</td>
                                    <td style="text-align: right;">
                                        <asp:TextBox ID="txtUsername" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 100px; text-align: left;">نام </td>
                                    <td style="text-align: right;">
                                        <asp:TextBox ID="txtname" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 100px; text-align: left;">نام خانوادگی</td>
                                    <td style="text-align: right;">
                                        <asp:TextBox ID="txtFamily" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 100px; text-align: left;">&nbsp;نام پدر</td>
                                    <td style="text-align: right;">
                                        <asp:TextBox ID="txtFather" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: center;">
                                           <asp:Image ID="Image2" runat="server" Height="55px" ImageUrl="~/Captcha.aspx" Width="186px" /><br />
               <br /> <span style="padding:5px">
                    کد امنیتی را در کادر پائین وارد کنید
                </span>
                                        <br />
                 <asp:TextBox ID="txtCaptcha" runat="server"></asp:TextBox><br />
                <asp:Label ID="ltShowCaptha" runat="server" ></asp:Label>

                                    </td>
                                </tr>
                                <tr>
                                    <td style="border-bottom: none;"></td>
                                    <td style="border-bottom: none; text-align: center; padding-top: 10px;">
                                        <asp:Button ID="BtnGoNext" runat="server" Text="بازنشانی رمز" OnClick="BtnGoNext_Click"></asp:Button>&nbsp;
                                <asp:Button ID="BtnCancel" runat="server" Text="لغو عملیات" PostBackUrl="~/Default.aspx"></asp:Button>&nbsp;

                                    </td>
                                </tr>

                            </table>
                        </asp:View>
                        <asp:View ID="vwdataReset" runat="server">
                            <table class="table mt-5" style="float: right;">
                                <tr>
                                    <td style="text-align: right;" colspan="2"><strong>کلمه عبور باید بین 8 تا 10 کاراکتر باشد .</strong></td>
                                </tr>
                                <tr>
                                    <td style="width: 100px; text-align: left;">کلمه عبور جدید</td>
                                    <td style="text-align: right;">
                                        <asp:TextBox ID="txtPassPath1" runat="server" TextMode="Password" MaxLength="10"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 100px; text-align: left;">تکرارکلمه عبور جدید </td>
                                    <td style="text-align: right;">
                                        <asp:TextBox ID="txtPassPath2" runat="server" TextMode="Password" MaxLength="10"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 100px; text-align: left;">درجه قوی بودن</td>
                                    <td style="text-align: right;">
                                        <asp:Label ID="LbStrongest" runat="server" Text=""></asp:Label>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border-bottom: none;"></td>
                                    <td style="border-bottom: none; text-align: center; padding-top: 10px;">
                                        <asp:Button ID="BtnResetPassword" runat="server" Text="بازنشانی رمز" OnClick="BtnResetPassword_Click"></asp:Button>&nbsp;
                                <asp:Button ID="btnCancelّFinal" runat="server" Text="لغو عملیات" PostBackUrl="~/Default.aspx"></asp:Button>&nbsp;

                                    </td>
                                </tr>

                            </table>
                        </asp:View>
                    </asp:MultiView>
                </div>



            </div>



        </div>
        <script src="js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </form>
</body>
</html>
