<%@ Page Title="" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="PoliceStationList.aspx.cs" Inherits="MersadWebApplication.Moderator.User.PoliceStationList" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">
    <style>
        .admin-after-head, .account {
            display: block;
        }
    </style>
    <script src="/Scripts/jsAlertHelper.js"></script>
    <script>
        function Search(id) {
            var getId = id == "" ? $("#txtIdSearch").val() : id;
            var obj = {
                "name": $("#txtNameSearch").val(),
                "nationalId": $("#txtNationalIdSearch").val(),
                "commanderName": $("#txtCommanderNameSearch").val(),
                "rowCount": "100",
                "id": getId
            }
            $('#spinSearchLoading').show();
            $('#btnSearch').button("loading");
            $.ajax({
                type: "POST",
                url: "PoliceStationList.aspx/GetPoliceStationGrid",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) {
                    if (r != null) {
                        var table = $("[id*=gridUsers]");
                        if (r.d[0].Id == "0") {
                            $("#lblMessage").html(ErrorMessages(r.d[0].Name));
                            return false;
                        } else if (r.d[0].Id == "-1") {
                            table.find("tr:last-child").clone(true);
                            $("tr", table).not($("tr:first-child", table)).remove();
                            table.append("<tr><td colspan='11'>" + r.d[0].Name + "</td></tr>");
                            return false;
                        }
                        table.find("tr:last-child").clone(true);
                        $("tr", table).not($("tr:first-child", table)).remove();
                        var hasTh = table.has('tbody tr th').length;
                        if (hasTh === 0) {
                            table.html('<tbody><tr><th scope="col" style="width:2.8%;">رديف</th><th scope="col">شماره سریال</th><th scope="col">تاریخ ثبت</th><th scope="col">نام پاسگاه</th><th scope="col">کد پاسگاه</th><th scope="col">نام فرمانده</th><th scope="col">کد ملی</th><th scope="col">درجه نظامی</th><th scope="col">ویرایش</th></tr></tbody>');
                        }
                        for (var i = 0; i < r.d.length; i++) {
                            var counter = i + 1;
                            table.append("<tr><td>" + counter + "</td><td>" + r.d[i].Id + "</td><td>" + r.d[i].CreateDate + "</td><td>" + r.d[i].Name + "</td>" + "<td>" + r.d[i].Code + "</td><td>" + r.d[i].Commander + "</td><td>" + r.d[i].NationalId + "</td><td>" + r.d[i].MilitaryRank + "</td><td>" +
                                "<a target='_blank' href='" + r.d[i].EditUrl + ".aspx' title='ویرایش'><i class='fa fa-edit fa-2x'></i></a>" + "</td></tr>");
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
            $("#lnkPoliceStationList").addClass("active");
        }
        $(document).ready(function () {
            $("input[type='text']").on('blur', function () { $(".error").hide("slow"); });
            pageLoad();
        });

    </script>

</asp:Content>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="body-wrapper">
        <div class="admin-right-panel" style="height: 600px;">
            <div class="panel-head">پاسگاه</div>
            <hr />
            <div class="white-box">
                <div class="btn"><a runat="server" id="lnkPoliceStation" visible="False" href="/Moderator/User/AddPoliceStation.aspx"><i class="fa fa-user-police"></i><span>افزودن پاسگاه جدید</span></a></div>
                <hr />
                <div class=" text-center"><span class="badge bg-light text-dark custome-badge">جستجو در پاسگاههای ذخیره شده</span></div>
                <br />
                <input runat="server" clientidmode="Static" id="txtIdSearch" type="number" placeholder="شماره سریال" dir="rtl" /><br />
                <br />
                <input runat="server" clientidmode="Static" id="txtNameSearch" type="text" placeholder="نام پاسگاه" /><br />
                <br />
                <input runat="server" clientidmode="Static" id="txtCommanderNameSearch" type="text" placeholder="نام یا نام خانوادگی فرمانده" /><br />
                <br />
                <input runat="server" clientidmode="Static" id="txtNationalIdSearch" type="text" placeholder="کد ملی فرمانده" />
                <br />
                <br />
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
            <div class="d-block" style="max-height: 500px; overflow-y: auto;">
                <div class="table-responsive" style="overflow-x: auto">
                    <asp:GridView runat="server" ID="gridUsers" DataKeyNames="Id" AutoGenerateColumns="False" ClientIDMode="Static"
                        EmptyDataText="داده ای یافت نشد" CssClass="table table-striped table-bordered table-condensed"
                        OnRowCommand="gridUsers_OnRowCommand" Style="border-collapse: inherit !important;">
                        <Columns>
                            <asp:TemplateField HeaderText="رديف" HeaderStyle-Width="2.8%" ItemStyle-Width="2.8%">
                                <ItemTemplate>
                                    <asp:Label ID="lbl" runat="server" Text="<%#Container.DataItemIndex+1 %>"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:BoundField HeaderText="شماره سریال" DataField="Id" />
                            <asp:BoundField HeaderText="تاریخ ثبت" DataField="CreateDate" />
                            <asp:BoundField HeaderText="نام پاسگاه" DataField="Name" />
                            <asp:BoundField HeaderText="کد پاسگاه" DataField="Code" />
                            <asp:BoundField HeaderText="نام فرمانده" DataField="Commander" />
                            <asp:BoundField HeaderText="کد ملی" DataField="NationalId" />
                            <asp:BoundField HeaderText="درجه نظامی" DataField="MilitaryRank" />
                            <asp:TemplateField HeaderText="ویرایش">
                                <ItemTemplate>
                                    <a runat="server" target="_blank" href='<%# Eval("EditUrl").ToString().Replace("AddPoliceStation?Id=","AddPoliceStation.aspx?Id=") %>' title="ویرایش">
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
