<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="UploadData.aspx.cs" Inherits="MersadWebApplication.Moderator.UploadData" %>
<asp:Content ID="Content1" runat="server" contentplaceholderid="MainContent">
    <div class="container">
        <div class="row">
            <table class="table">
                <tr>
                    <td style="padding:10px; text-align:center;" class="align-content-center;justify-content-center"><asp:Button style="margin:0 auto;" ID="BtnUploadProccess" runat="server" Text="بارگزاری" CssClass="p-2" OnClick="BtnUploadProccess_Click"  />
                  </td>
                   
                </tr>
                <tr>
                     <td style="padding:10px;">
                     پیام سیستم  <asp:Literal ID="ltDisplayResult" runat="server" Text="-"> 
                        </asp:Literal>
                    </td>
                </tr>
            </table>
        </div>
        <div class="float-start">
            <table class="table">
                <tr>
                    <td>

                    </td>
                    <td style="padding:20px;">
                          </td>
                </tr>
                <tr>
                    <td class="p-5 align-content-center justify-content-center">جدول تصادفات</td>
                    <td class="p-5">
                        <asp:FileUpload id="fuaccident" runat="server"></asp:FileUpload>
                    </td>
                    <td>
                        
                    </td>
                </tr>
                <tr>
                    <td class="p-5 align-content-center justify-content-center">جدول دوچرخه سوار</td>
                    <td class="p-5">
                        <asp:FileUpload id="fubikerider" runat="server"></asp:FileUpload>
                    </td>
                </tr>
                <tr>
                    <td class="p-5 align-content-center justify-content-center">جدول خسارت تصادف</td>
                    <td class="p-5">
                        <asp:FileUpload id="fudamage" runat="server"></asp:FileUpload>
                    </td>
                </tr>
                <tr>
                    <td class="p-5 align-content-center justify-content-center">جدول شرح تصادف</td>
                    <td class="p-5">
                        <asp:FileUpload id="fudescription" runat="server"></asp:FileUpload>
                    </td>
                </tr>
                <tr>
                    <td class="p-5 align-content-center justify-content-center">جدول مسافر تصادف</td>
                    <td class="p-5">
                        <asp:FileUpload id="fupassenger" runat="server"></asp:FileUpload>
                    </td>
                </tr>
                  <tr>
                    <td class="p-5 align-content-center justify-content-center">جدول  تصادف عابر پیاده </td>
                    <td class="p-5">
                        <asp:FileUpload id="fupedstrian" runat="server"></asp:FileUpload>
                    </td>
                </tr> 
                <tr>
                    <td class="p-5 align-content-center justify-content-center">جدول وسیله نقلیه </td>
                    <td class="p-5">
                        <asp:FileUpload id="fuvehicle" runat="server"></asp:FileUpload>
                    </td>
                </tr> <tr>
                    <td class="p-5 align-content-center justify-content-center">جدول شاهد تصادف </td>
                    <td class="p-5">
                        <asp:FileUpload id="fuwitness" runat="server"></asp:FileUpload>
                    </td>
                </tr>
            </table>
        </div>
        

    </div>
</asp:Content>

