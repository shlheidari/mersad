<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="MersadWebApplication.Default" %>
 
<asp:Content runat="server" ContentPlaceHolderID="Head">
    <script>
        $(document).ready(function () {
            $(".login-form").fadeIn(2000);
        });
    </script>
</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
   
      
        
    <div class="login-bg">
        <div class="login-form">
            <h6 class="login-head">ورود به سامانه</h6>
            <div class="inner-addon right-addon">
                    <i class="fa fa-user fa-2x"></i>
                    <input runat="server" id="txtUsername" type="text" placeholder="نام کاربری" />
                </div><br />
            <div class="inner-addon right-addon">
                    <i class="fa fa-lock fa-2x"></i>
                    <input runat="server" id="txtPassword" type="password" placeholder="رمز عبور" />
                </div><br />
            <label class="checkbox-group">مرا بخاطر بسپار<input type="checkbox" checked="checked"><span class="checkmark"></span></label>
            <div class="button-group">
                <button type="button" runat="server" onserverclick="btnLogin_OnClick" class="btn-login">ورود</button>
                <br />
                <a href="RecoveryPassword.aspx" class="remember-password">فراموشی رمز عبور</a>
                <br />
                   <asp:Image ID="Image2" runat="server" Height="55px" ImageUrl="~/Captcha.aspx" Width="186px" /><br />
                <span style="padding:5px">
                    کد امنیتی را در کادر پائین وارد کنید
                </span>
                 <asp:TextBox ID="txtCaptcha" runat="server"></asp:TextBox>
                <asp:Label ID="ltShowCaptha" runat="server" >



                </asp:Label>
                <script>
                    function closp() {
                        $("#myClose").fadeOut();
                    }
                </script>
                <div class="row" id="lblMessage" runat="server"></div>
            </div>
        </div>
    </div>
</asp:Content>
