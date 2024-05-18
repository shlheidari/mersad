<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="Plans.aspx.cs" Inherits="MersadWebApplication.Moderator.User.Plans" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">
    <style>
        .admin-after-head, .account {
            display: block;
        }
    </style>
    <%--<script src="/Scripts/jsAlertHelper.js"></script>--%>
    <script>
        //function SaveData() {
        //    if ($("#txtName").val() == "") {
        //        $("#spnNameError").show("slow");
        //        $("#txtName").focus();
        //        return false;
        //    }
        //    if ($("#cmbButton").val() == "" || $("#cmbButton").val() == "-1") {
        //        $("#spnButtonError").show("slow"); $("#cmbButton").focus();
        //        return false;
        //    }
        //    var obj = {
        //        "id": $("#hidId").val(),
        //        "name": $("#txtName").val(),
        //        "btn": $("#cmbButton").val()
        //    }
        //    $('#spinLoading').show();
        //    $('#btnSubmit').button("loading");
        //    $.ajax({
        //        type: "POST",
        //        url: "Plans.aspx/GetInsertOrUpdatePlan",
        //        data: JSON.stringify(obj),
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: function (msg) {
        //            if (msg != null) {
        //                if (msg.d[0].IsSuccess != "true") {
        //                    $("#lblMessage").html(ErrorMessages(msg.d[0].Message));
        //                    $('html, body').animate({
        //                        scrollTop: $("#lblMessage").offset().top
        //                    }, 1500);
        //                } else {
        //                    Search(msg.d[0].Id);
        //                    $("#lblMessage").html(SuccessMessages(msg.d[0].Message)); $('html, body').animate({
        //                        scrollTop: $("#lblMessage").offset().top
        //                    }, 1500);
        //                }
        //            }
        //            else {
        //                alert("خطا در برقراری ارتباط با سرور!");
        //            }
        //        },
        //        complete: function () {
        //            $('#spinLoading').hide();
        //            $("#btnSubmit").button("reset");
        //        },
        //        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
        //            alert(response.d);
        //        }
        //    });
        //    return true;
        //}
        //function Search(id) {
        //    var getId = id == "" ? $("#txtIdSearch").val() : id;
        //    var obj = {
        //        "name": $("#txtNameSearch").val(),
        //        "id": getId
        //    }
        //    $('#spinSearchLoading').show();
        //    $('#btnSearch').button("loading");
        //    $.ajax({
        //        type: "POST",
        //        url: "Plans.aspx/GetPlanGrid",
        //        data: JSON.stringify(obj),
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: function (r) {
        //            if (r != null) {
        //                var table = $("[id*=gridPlans]");
        //                if (r.d[0].Id == "0") {
        //                    $("#lblMessage").html(ErrorMessages(r.d[0].Caption));
        //                    return false;
        //                } else if (r.d[0].Id == "-1") {
        //                    table.find("tr:last-child").clone(true);
        //                    $("tr", table).not($("tr:first-child", table)).remove();
        //                    table.append("<tr><td colspan='11'>" + r.d[0].Caption + "</td></tr>");
        //                    return false;
        //                }
        //                table.find("tr:last-child").clone(true);
        //                $("tr", table).not($("tr:first-child", table)).remove();
        //                var hasTh = table.has('tbody tr th').length;
        //                if (hasTh === 0) {
        //                    table.html('<tbody><tr><th scope="col" style="width:2%;">رديف</th><th scope="col" style="width:2.6%;">شناسه</th><th scope="col">عنوان نقش</th><th scope="col">ثبت کننده</th><th scope="col">تاریخ ثبت</th><th scope="col" style="width:3%;">سطح دسترسی</th><th scope="col" style="width:2%;">ویرایش</th></tr></tbody>');
        //                }
        //                for (var i = 0; i < r.d.length; i++) {
        //                    var counter = i + 1;
        //                    table.append("<tr><td>" + counter + "</td><td>" + r.d[i].Id + "</td><td>" + r.d[i].Caption + "</td><td>" + r.d[i].SubmitBy + "</td>" + "<td>" + r.d[i].SubmitDate + "</td><td>" + "<a id=\"btnOpenAuthentication\" href=\"javascript:__doPostBack(\'ctl00$MainContent$gridPlans$ctl02$btnOpenAuthentication\'" + ",\'\' )\"><i class='fa fa-user-lock fa-2x yellow'></i></a>" +
        //                        "</td><td><a target='_blank' href='" + r.d[i].EditUrl + ".aspx' title='ویرایش'><i class='fa fa-edit fa-2x'></i></a>" + "</td></tr>");
        //                }

        //            }
        //            else {
        //                alert("خطا در برقراری ارتباط با سرور!");
        //            }
        //        },
        //        complete: function () {
        //            $('#spinSearchLoading').hide();
        //            $("#btnSearch").button("reset");
        //        },
        //        error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
        //            alert(response.d);
        //        }
        //    });
        //    return true;
        //}

        //function pageLoad() {
        //    $("#cmbButton").select2({
        //        placeholder: {
        //            id: "-1",
        //            text: "صفحه پیش فرض را انتخاب کنید"
        //        },
        //        //allowClear: true,
        //        dir: 'rtl'
        //    });
        //    $("#lnkPlans").addClass("active");
        //}
        //$(document).ready(function () {
        //    pageLoad();
        //    $("input[type='text']").on('blur', function () { $(".error").hide("slow"); });
        //});
    </script>
    <%--<script src="/Scripts/jsFsType.js"></script>--%>
</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager runat="server" AsyncPostBackTimeout="36000"></asp:ScriptManager>
    <div class="body-wrapper">
        <div class="admin-right-panel" style="height: 600px;">
            <div class="panel-head">نقش کاربران</div>
            <hr />
            <div class="white-box">
                <div class="btn"><a runat="server" id="lnkPlans" visible="False" href="/Moderator/User/Plans.aspx"><i class="fa fa-plus-circle"></i><span>افزودن سمت جدید</span></a></div>
                <hr />
                <div class=" text-center"><span class="badge bg-light text-dark custome-badge">جستجو در سمت های ذخیره شده</span></div>
                <br />
                <input id="txtNameSearch" type="text" placeholder="عنوان سمت" /><br />
                <br />
                <input id="txtIdSearch" type="number" placeholder="شناسه" dir="rtl" />
                <div class=" text-center">
                    <button type='button' id="btnSearch" class="btn-login text-center" onclick="Search('')" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">جستجو</button>
                    <div class="spinner-border text-warning" role="status" style="display: none" id="spinSearchLoading">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-table-cell align-items-top padding-all" style="width: 1150px">
            <div class="row ">
                <div class="col-5">
                    <div class="form-group row">
                        <label for="txtName" style="padding-top: 10px" class="col-2 col-form-label fa-2x">عنوان سمت</label>
                        <div class="col-10 error-parent">
                            <span class="error error-icon" id="spnNameError" title="لطفا عنوان سمت را وارد کنید"><i class="fa fa-warning fa-2x"></i></span>
                            <input runat="server" clientidmode="Static" type="text" placeholder="عنوان سمت" id="txtName" lang="fa-IR" maxlength="32" />
                        </div>
                        <br />
                    </div>
                </div>
                <div class="col-5">
                    <div class="form-group row">
                        <label for="cmbButton" style="padding-top: 10px" class="col-2 col-form-label">صفحه پیش فرض</label>
                        <div class="col-10 error-parent">
                            <span class="error error-icon" id="spnButtonError" title="لطفا صفحه پیش فرض را انتخاب کنید"><i class="fa fa-warning fa-2x"></i></span>
                            <asp:DropDownList ID="cmbButton" runat="server"></asp:DropDownList> 
                            
                            
                        </div>
                        <br />
                    </div>
                </div>
                <div class="col-2">
                    <div class="form-group row">
                        <div class="col-12">
                            <button type='button' id="btnSubmit" style="margin: 0" class="btn-login" onclick="SaveData()" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">تایید</button>
                            <div class="spinner-border text-warning" role="status" style="display: none" id="spinLoading">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <br />
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
            <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                <Triggers>
                    <asp:AsyncPostBackTrigger ControlID="gridPlans" />
                    <asp:AsyncPostBackTrigger ControlID="btnSaveAuthentication" />
                </Triggers>
                <ContentTemplate>
                    <div class="d-block" style="max-height: 500px; overflow-y: auto;">
                        <div class="table-responsive" style="overflow-x: auto">




                            <asp:GridView runat="server" ID="gridPlans" DataKeyNames="Id" AutoGenerateColumns="False" ClientIDMode="Static" Width="100%"
                                EmptyDataText="داده ای یافت نشد" OnRowCommand="gridPlans_OnRowCommand" CssClass="table table-striped table-bordered" Style="border: none; border-collapse: inherit">
                                <Columns>
                                    <asp:TemplateField HeaderText="رديف" HeaderStyle-Width="2%" ItemStyle-Width="2%">
                                        <ItemTemplate>
                                            <asp:Label ID="lbl" runat="server" Text="<%#Container.DataItemIndex+1 %>"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:BoundField HeaderText="شناسه" DataField="Id" HeaderStyle-Width="2.6%" ItemStyle-Width="2.6%" />
                                    <asp:BoundField HeaderText="عنوان نقش" DataField="Caption" />
                                    <asp:BoundField HeaderText="ثبت کننده" DataField="SubmitBy" />
                                    <asp:BoundField HeaderText="تاریخ ثبت" DataField="SubmitDate" />
                                    <asp:TemplateField HeaderText="سطح دسترسی" ItemStyle-HorizontalAlign="Center" HeaderStyle-Width="3%" ItemStyle-Width="3%">
                                        <ItemTemplate>
                                            <asp:LinkButton ID="btnOpenAuthentication" runat="server" CausesValidation="False" CommandName="AuthenticationRow" CommandArgument='<%#Eval("Id") %>'><i class="fa fa-user-lock fa-2x yellow"></i></asp:LinkButton>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <%--<asp:TemplateField HeaderText="سطح دسترسی" HeaderStyle-Width="2%" ItemStyle-Width="2%" Visible="False">
                                    <ItemTemplate>
                                        <button type="button" id="btnAccess" data-id='<%#Eval("Id")%>'><i class="fa fa-user-lock fa-2x yellow"></i></button>
                                        <div class="spinner-border text-warning" role="status" style="display: none" id="spinAccessLoading">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </ItemTemplate>
                                </asp:TemplateField>--%>
                                    <asp:TemplateField HeaderText="ویرایش" HeaderStyle-Width="2%" ItemStyle-Width="2%">
                                        <ItemTemplate>
                                            <a runat="server" target="_blank" href='<%# Eval("EditUrl").ToString().Replace("Plans?Id","Plans.aspx?Id") %>' title="ویرایش">
                                                <i class="fa fa-edit fa-2x"></i>
                                            </a>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <%--<asp:TemplateField HeaderText="حذف" HeaderStyle-Width="3%" ItemStyle-Width="3%">
                        <ItemTemplate>
                            <asp:ImageButton ID="btnRemove" runat="server" CausesValidation="False" Width="20" ImageUrl="/Images/remove.png" CommandName="DeleteRow" OnClientClick=" return confirm('آیا برای حذف این مورد اطمینان دارید؟'); " CommandArgument='<%#Eval("Id") %>' />
                        </ItemTemplate>
                    </asp:TemplateField>--%>
                                </Columns>
                            </asp:GridView>
                        </div>

                    </div>
                    <div class="modal fade" id="AuthenticationDialog" role="dialog" data-backdrop="static">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title" style="margin-right: 20px">ایجاد سطح دسترسی برای طرح&nbsp;<span runat="server" id="lblNameForAut"></span></h4>
                                    <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                                </div>
                                <div class="modal-body" style="text-align: center">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <asp:TreeView ID="treeNode" ClientIDMode="Static" runat="server" ShowCheckBoxes="All" ShowLines="true" SelectionAction="None" />
                                            <div id="divTreeAuthentication"></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div id="lblAuthenticationMessage" runat="server" visible="False"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <asp:Button ID="btnSaveAuthentication" runat="server" Text="ثبت" data-loading-text="در حال پردازش . . ." CssClass="btn btn-success" OnClick="btnSaveAuthentication_Click" />
                                    <%--<button type='button' class='btn btn-outline-success' onclick="SubmitAuthentication();">ثبت</button>--%>
                                    <button type="button" class="btn btn-default" onclick="$('#AuthenticationDialog').modal('hide');" data-dismiss="modal">بستن پنجره</button>
                                    <div class="spinner-border text-warning" role="status" style="display: none" id="spinSaveAccessLoading">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <asp:HiddenField runat="server" ID="hidenId" />
                </ContentTemplate>
            </asp:UpdatePanel>
        </div>
    </div>
</asp:Content>

