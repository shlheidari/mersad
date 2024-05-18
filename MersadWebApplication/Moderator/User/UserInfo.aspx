<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="UserInfo.aspx.cs" Inherits="MersadWebApplication.Moderator.User.UserInfo" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">
    <style>
        .admin-after-head,.account {
            display: block;
        }
        .img-user-info img {
            width: 114px !important;height: 115px !important;
        }
    </style>
    <script>
        $(document).ready(function () {
        });
        document.addEventListener('DOMContentLoaded', function () {
            if ($("#imgUser").attr("src") === "#") {
                $("#spnUserDef").show();
                $("#imgUser").hide();
            } else {
                $("#imgUser").show();
                $("#spnUserDef").hide();
            }
        }, false);
    </script>
</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="body-wrapper">
        <div class="d-table-cell align-items-top padding-all" style="width: 1250px">
            <div class="row">
                <div class="col-12 padding-all">
                    <div class="img-user-info"><img id="imgUser" clientidmode="Static" runat="server" src="#" style="display: none"/><i id="spnUserDef" style="display: none" class="fa fa-user fa-4x"></i></div>
                    <div class="inline-block">
                        <label class="font-size-12-w">نام کاربری</label>&nbsp;&nbsp;<input  id="txtUsername" runat="server" clientidmode="Static" type="text" readonly=""/></div>
                    <div class="row mt-5">
                        <div class="col-4">
                            <div class="form-group row">
                                <label for="txtName" class="col-3 font-size-12-w">نام</label>
                                <div class="col-9">
                                    <input  runat="server" clientidmode="Static" type="text" id="txtName" lang="fa-IR" maxlength="32" readonly="" />
                                </div>
                                <br />
                            </div>
                            <div class="form-group row">
                                <label for="txtFatherName" class="col-3 font-size-12-w">نام پدر</label>
                                <div class="col-9 error-parent">
                                    <input  runat="server" clientidmode="Static" type="text" id="txtFatherName" lang="fa-IR" maxlength="32" readonly=""/>
                                </div>
                                <br />
                            </div>
                            <div class="form-group row">
                                <label for="txtNationalId" class="col-3 font-size-12-w">کد ملی</label>
                                <div class="col-9 error-parent">
                                    <input  runat="server" clientidmode="Static" type="text" id="txtNationalId" maxlength="10" readonly=""/>
                                </div>
                                <br />
                            </div>
                            <div class="form-group row">
                                <label for="txtPost" class="col-3 font-size-12-w">سمت</label>
                                <div class="col-9 error-parent">
                                    <input  runat="server" clientidmode="Static" type="text" id="txtPost" readonly=""/>
                                </div>
                                <br />
                            </div>
                        </div>
                        <div class="col-1"></div>
                        <div class="col-4">
                            <div class="form-group row">
                                <label for="txtName" class="col-3 font-size-12-w">نام خانوادگی</label>
                                <div class="col-9">
                                    <input  runat="server" clientidmode="Static" type="text" id="txtFamily" lang="fa-IR" maxlength="32" readonly=""/>
                                </div>
                                <br />
                            </div>
                            <div class="form-group row">
                                <label for="txtBirthDate" class="col-3 font-size-12-w">تاریخ تولد</label>
                                <div class="col-9">
                                    <div class="inner-addon left-addon">
                                        <i style="cursor: pointer" class="fa fa-calendar fa-2x"></i>
                                        <input type="text" id="txtBirthDate" runat="server" clientidmode="Static"  readonly="" />
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div class="form-group row">
                                <label class="col-3 col-form-label">&nbsp;</label>
                                <div class="col-9"></div>
                                <br />
                                <br />
                            </div>
                            <div class="form-group row">
                                <label for="txtPoliceStation" class="col-3 font-size-12-w">پاسگاه</label>
                                <div class="col-9 error-parent">
                                    <input  runat="server" clientidmode="Static" type="text" id="txtPoliceStation" readonly=""/>
                                </div>
                                <br />
                            </div>
                        </div>
                        <div class="col-3"></div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-right">
                            <br />
                            <br />
                            <div id="lblMessage" runat="server" clientidmode="Static"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
