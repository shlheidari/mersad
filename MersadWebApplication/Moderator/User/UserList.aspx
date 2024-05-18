<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="UserList.aspx.cs" Inherits="MersadWebApplication.Moderator.User.UserList" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">
    <style>
        .admin-after-head, .account {
            display: block;
        }
    </style>
    <script src="/Scripts/jsAlertHelper.js"></script>
    <script>
        function Search(id) {
            var sort = "desc";
            if ($("#rdoAscSort").is(":checked")) sort = "Asc";
            var getId = id == "" ? $("#txtIdSearch").val() : id;
            var obj = {
                "name": $("#txtNameSearch").val(),
                "nationalId": $("#txtNationalIdSearch").val(),
                "username": $("#txtUsernameSearch").val(),
                "rowCount": "100",
                "planId": $("#cmbPlanSearch").val(),
                "id": getId,
                "sort": sort
            }
            $('#spinSearchLoading').show();
            $('#btnSearch').button("loading");
            $.ajax({
                type: "POST",
                url: "UserList.aspx/GetUserGrid",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) {
                    if (r != null) {
                        var table = $("[id*=gridUsers]");
                        if (r.d[0].Id == "0") {
                            $("#lblMessage").html(ErrorMessages(r.d[0].FullName));
                            return false;
                        } else if (r.d[0].Id == "-1") {
                            table.find("tr:last-child").clone(true);
                            $("tr", table).not($("tr:first-child", table)).remove();
                            table.append("<tr><td colspan='11'>" + r.d[0].FullName + "</td></tr>");
                            return false;
                        }
                        table.find("tr:last-child").clone(true);
                        $("tr", table).not($("tr:first-child", table)).remove();
                        var hasTh = table.has('tbody tr th').length;
                        if (hasTh === 0) {
                            table.html('<tbody><tr><th scope="col" style="width:2%;">رديف</th><th scope="col">شماره سریال</th><th scope="col">تاریخ ثبت کاربر</th><th scope="col">نام کاربری</th><th scope="col">نام و نام خانوادگی</th><th scope="col">نام پدر</th><th scope="col">تاریخ تولد</th><th scope="col">کد ملی</th><th scope="col">سمت</th><th scope="col">پاسگاه</th><th scope="col" style="width:2%;">ویرایش</th></tr></tbody>');
                        }
                        for (var i = 0; i < r.d.length; i++) {
                            var counter = i + 1;
                            table.append("<tr><td>" + counter + "</td><td>" + r.d[i].Id + "</td><td>" + r.d[i].RegisterDate + "</td><td>" + r.d[i].Username + "</td>" + "<td>" + r.d[i].FullName + "</td><td>" + r.d[i].FatherName + "</td><td>" + r.d[i].BirthDate + "</td><td>" + r.d[i].NationalId + "</td><td>" + r.d[i].Post + "</td><td>" + r.d[i].PoliceStation + "</td><td>" +
                                "<a target='_blank' href='" + r.d[i].EditUrl + "' title='ویرایش'><i class='fa fa-edit fa-2x'></i></a>" + "</td></tr>");
                        }
                    }
                    else {
                        alert("خطا در برقراری ارتباط با سرور!");
                    }
                },
                complete: function () {
                    $('#spinSearchLoading').hide();
                    $("#btnSearch").button("reset");
                },
                error: function (response) { if (response.status == 401) location.reload(); }, failure: function (response) {
                    alert(response.d);
                }
            });
            return true;
        }
        function pageLoad() {
            $("#cmbPlanSearch").select2({
                placeholder: {
                    id: "-1",
                    text: "سمت را انتخاب کنید"
                },
                allowClear: true,
                dir: 'rtl'
            });
            $("#lnkUserList").addClass("active");
        }
        $(document).ready(function () {
            pageLoad();
            $("input[type='text']").on('blur', function () { $(".error").hide("slow"); });
            $('input[type=radio][name=RadioSort]').on('change', function () {
                Search("");
            });
        });

    </script>

</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="body-wrapper">
        <div class="admin-right-panel" style="height: 600px;">
            <div class="panel-head">کاربران</div>
            <hr />
            <div class="white-box">
                <a class="btn" runat="server" id="lnkAddUser" visible="False" href="/Moderator/User/AddUser.aspx"><i class="fa fa-user-circle fa-2x"></i><span>افزودن کاربر جدید</span></a>
                <hr />
                <div class=" text-center"><span class="badge bg-light text-dark custome-badge">جستجو در کاربران ذخیره شده</span></div>
                <br />
                <input runat="server" clientidmode="Static" id="txtIdSearch" type="number" placeholder="شماره سریال" dir="rtl" /><br />
                <br />
                <input runat="server" clientidmode="Static" id="txtNameSearch" type="text" placeholder="نام یا نام خانوادگی کاربر" /><br />
                <br />
                <input runat="server" clientidmode="Static" id="txtUsernameSearch" type="text" placeholder="نام کاربری" /><br />
                <br />
                <input runat="server" clientidmode="Static" id="txtNationalIdSearch" type="text" placeholder="کد ملی" />
                <br />
                <br />
                <asp:DropDownList ID="cmbPlanSearch" runat="server"></asp:DropDownList>
                
                <div class=" text-center">
                    <button type='button' id="btnSearch" class="btn-login text-center" onclick="Search('')" data-loading-text="<i class='fa fa-spinner fa-spin '></i> در حال پردازش اطلاعات">جستجو</button>
                    <div class="spinner-border text-warning" role="status" style="display: none" id="spinSearchLoading">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-table-cell align-items-top padding-all" style="width: 1150px">
            <div class="row">
                <div class="col-12 text-center">
                    <br />
                    <div id="lblMessage" runat="server" clientidmode="Static"></div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-3 error-parent">
                </div>
                <div class="col-6"></div>
                <div class="col-3 float-left">
                  <%--  <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" class="btn-check" name="RadioSort" id="rdoDescSort" autocomplete="off" value="Desc" />
                        <label class="btn btn-outline-dark" for="rdoDescSort">جدید ترین</label>
                        <input type="radio" class="btn-check" name="RadioSort" id="rdoAscSort" autocomplete="off" value="Asc" />
                        <label class="btn btn-outline-dark" for="rdoAscSort">قدیمی ترین</label>
                    </div>
                    &nbsp;
                    <span><span class="gray">مرتب سازی بر اساس</span>&nbsp;<i class="fa fa-bars-sort fa-2x gray"></i></span>--%>
                </div>
            </div>
            <div class="d-block" style="max-height: 500px; overflow-y: auto;">
                <div class="table-responsive" style="overflow-x: auto">
                    <asp:GridView runat="server" ID="gridUsers" DataKeyNames="Id" AutoGenerateColumns="False" ClientIDMode="Static" Width="100%"
                        EmptyDataText="داده ای یافت نشد" CssClass="table table-striped table-bordered" Style="border: none; border-collapse: inherit">
                        <Columns>
                            <asp:TemplateField HeaderText="رديف" HeaderStyle-Width="2%" ItemStyle-Width="2%">
                                <ItemTemplate>
                                    <asp:Label ID="lbl" runat="server" Text="<%#Container.DataItemIndex+1 %>"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:BoundField HeaderText="شماره سریال" DataField="Id" />
                            <asp:BoundField HeaderText="تاریخ ثبت کاربر" DataField="RegisterDate" />
                            <asp:BoundField HeaderText="نام کاربری" DataField="Username" />
                            <asp:BoundField HeaderText="نام و نام خانوادگی" DataField="FullName" />
                            <asp:BoundField HeaderText="نام پدر" DataField="FatherName" />
                            <asp:BoundField HeaderText="تاریخ تولد" DataField="BirthDate" />
                            <asp:BoundField HeaderText="کد ملی" DataField="NationalId" />
                            <asp:BoundField HeaderText="سمت" DataField="Post" />
                            <asp:BoundField HeaderText="پاسگاه" DataField="PoliceStation" />
                            <%--<asp:TemplateField HeaderText="سطح دسترسی" HeaderStyle-Width="2%" ItemStyle-Width="2%">
                                    <ItemTemplate>
                                        <button type="button"><i class="fa fa-user-lock fa-2x yellow"></i></button>
                                        <asp:ImageButton ID="btnOpenAuthentication" runat="server" CausesValidation="False" Width="20" ImageUrl="/Images/Sms/profile.png" CommandName="AuthenticationRow" CommandArgument='<%#Eval("Id") %>' />
                                    </ItemTemplate>
                                </asp:TemplateField>--%>
                            <asp:TemplateField HeaderText="ویرایش" HeaderStyle-Width="2%" ItemStyle-Width="2%">
                                <ItemTemplate>
                                    <a runat="server" target="_blank" href='<%# Eval("EditUrl").ToString().Replace("AddUser?Id","AddUser.aspx?Id") %>' title="ویرایش">
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
        </div>
    </div>
</asp:Content>
