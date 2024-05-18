<%@ Page Title="لیست گزارشات ثبت شده" Language="C#" MasterPageFile="~/Moderator/Admin.Master" AutoEventWireup="true" CodeBehind="AccidentList.aspx.cs" Inherits="MersadWebApplication.Moderator.Event.AccidentList" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">
    <style>
        .admin-after-head, .event {
            display: block;
        }
    </style>
    <script src="/Scripts/jsAlertHelper.js?n=14010316"></script>
    <link href="/App_Themes/jquery.md.bootstrap.datetimepicker.style.css?n=14010316" rel="stylesheet" />
    <script src="/Scripts/jquery.md.bootstrap.datetimepicker.js?n=14010316"></script>
    <link href="/App_Themes/jquery-ui.css" rel="stylesheet" />
    <script src="/Scripts/jquery-ui.js"></script>
    <script src="/Scripts/jsHelper.js?n=14010316"></script>
    <script src="/Scripts/jsAccidentListHelper.js?n=14010316"></script>
   
</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="body-wrapper">
        <div id="divFilter" class="admin-right-panel" >
            <div class="panel-head">فیلترها</div>
            <hr />
            <div class="form-group">
                <div class="white-box">
                    <div style="padding-right: 5px">وضعیت گزارش</div>
                    <hr />
                    <input type="radio" id="rdoAll" name="rdoStatus" value="All" checked="checked">
                    <label for="rdoAll">همه</label>
                    <br />
                    <input type="radio" id="rdoWaitForCheck" name="rdoStatus" value="در انتظار بررسی">
                    <label for="rdoWaitForCheck">در انتظار بررسی</label><br />
                    <input type="radio" id="rdoWaitForEdit" name="rdoStatus" value="نیازمند اصلاح">
                    <label for="rdoWaitForEdit">نیازمند اصلاح</label><br />
                    <input type="radio" id="rdoConfirm" name="rdoStatus" value="تایید شده">
                    <label for="rdoConfirm">تایید شده</label>
                </div>
            </div>
            <div class="form-group">
                <div class="white-box">
                    <div style="padding-right: 5px">تاریخ تصادف</div>
                    <hr />
                    <input type="radio" id="rdoLast24" name="rdoDate" value="24" checked="checked">
                    <label for="rdoLast24">24 ساعت گذشته</label>
                    <br />
                    <input type="radio" id="rdoLastWeek" name="rdoDate" value="7">
                    <label for="rdoLastWeek">هفته گذشته</label><br />
                    <input type="radio" id="rdoLastMonth" name="rdoDate" value="30">
                    <label for="rdoLastMonth">ماه گذشته</label><br />
                    <input type="radio" id="rdoYear" name="rdoDate" value="365">
                    <label for="rdoYear">سال گذشته</label><br />
                    <input type="radio" id="rdoSelectCalender" name="rdoDate" value="Date">
                    <label for="rdoSelectCalender">انتخاب بازه زمانی</label>
                    <div class="form-group" id="divShowDate" style="display: none">
                        <div class="inner-addon left-addon">
                            <div class="input-group-prepend">
                                <span style="cursor: pointer; display: none" class="input-group-text" id="dateDateRange"></span>
                            </div>
                            <i style="cursor: pointer" class="fa fa-calendar fa-2x"></i>
                            <input type="text" placeholder="انتخاب رنج تاریخ" id="txtDateRange" runat="server" clientidmode="Static" onfocus="openDateRange()" aria-label="dateDateRange" aria-describedby="dateDateRange" maxlength="10" readonly="" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="white-box">
                    <div style="padding-right: 5px">ساعت تصادف</div>
                    <hr />
                    <div class="form-group">
                        <div id="slider"></div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <input type="text" id="txtFromClock" placeholder="از ساعت" maxlength="2">
                        </div>
                        <div class="col-6">
                            <input type="text" id="txtToClock" placeholder="تا ساعت" maxlength="2">
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="white-box">
                    <div style="padding-right: 5px">شدت تصادف</div>
                    <hr />
                    <div class="row">
                        <div class="col-5">
                            <input type="radio" id="rdoAllIntensity" name="rdoIntensity" value="All" checked="checked">
                            <label for="rdoAllIntensity">همه موارد</label>
                            <br />
                            <input type="radio" id="rdoDeadIntensity" name="rdoIntensity" value="فوتی">
                            <label for="rdoDeadIntensity">تصادفات فوتی</label>
                        </div>
                        <div class="col-7">
                            <input type="radio" id="rdoInjuredIntensity" name="rdoIntensity" value="جرحی">
                            <label for="rdoInjuredIntensity">تصادفات جرحی</label><br />
                            <input type="radio" id="rdoDamageIntensity" name="rdoIntensity" value="خسارتی">
                            <label for="rdoDamageIntensity">تصادفات خسارتی</label>
                        </div>
                        <div class="col-12">
                            <input type="radio" id="rdoInjuredIntensityandDeadIntensity" name="rdoIntensity" value="جرحی وفوتی">
                            <label for="rdoInjuredIntensityandDeadIntensity">جرحی و فوتی</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="divDownload" class="admin-right-panel" style="display: none; height: 600px">
            <div class="panel-head">ذخیره خروجی گزارشات</div>
            <hr />
            <div class="form-group">
                <div style="color: gray; font-size: 9.5px;">
                    برای انتخاب گزارش های مورد نظر روی آنها کلیک کنید
                </div>
            </div>
            <div class="form-group">
                <div class="white-box">
                    <div style="padding-right: 5px">تنظیمات فایل خروجی</div>
                    <hr />
                    <div class="form-group">
                        <input type="radio" id="rdoExportPdf" name="rdoExport" value="Pdf">
                        <label for="rdoExportPdf"><i class="fa fa-file-pdf fa-2x"></i></label>
                        <input type="radio" id="rdoExportExcel" name="rdoExport" value="Excel">
                        <label for="rdoExportExcel"><i class="fa fa-file-excel fa-2x"></i></label>
                        <input type="radio" id="rdoExportTxt" name="rdoExport" value="Txt">
                        <label for="rdoExportTxt"><i class="fa fa-file-text fa-2x"></i></label>
                        <input type="radio" id="rdoExportJpg" name="rdoExport" value="Jpg">
                        <label for="rdoExportJpg"><i class="fa fa-file-image fa-2x"></i></label>
                    </div>
                    <div class="form-group">
                        <select id="cmbExportFormat">
                            <option selected="" value="-1">سایر فرمت ها</option>
                            <option value="Word">Word</option>
                            <option value="Png">Png</option>
                            <option value="Csv">Csv</option>
                            <option value="Html">Html</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select id="cmbExportSize">
                            <option selected="" value="-1">ابعاد خروجی</option>
                            <option value="A4">A4</option>
                            <option value="A5">A5</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-outline-success" onclick="GoToPrint();">دانلود خروجی</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-table-cell align-items-top" style="width: 1125px">
            <div class="align-items-top">
                <div class="filter-parent">
                    <div class="filter active">
                        <div><i class="fa fa-filter fa-2x"></i></div>
                    </div>
                    <div class="download">
                        <div><i class="fa fa-download fa-2x"></i></div>
                    </div>
                </div>
            </div>
            <div class="align-items-top" style="margin-right: 64px;">
                <div class="row">
                    <div class="col-12 text-center">
                        <br />
                        <div id="lblMessage" runat="server" clientidmode="Static"></div>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-3 error-parent">
                        <button type="button" class="search-icon" onclick="Search();" title="جستجو"><i class="fa fa-search"></i></button>
                        <input runat="server" clientidmode="Static" style="direction: rtl" type="tel" placeholder="جستجوی شماره سریال" id="txtSerial" lang="fa-IR" maxlength="32" />
                    </div>
                    <div class="col-6"></div>
                    <div class="col-3 float-left">
                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" class="btn-check" name="RadioSort" id="rdoDescSort" autocomplete="off" value="Desc" />
                            <label class="btn btn-outline-dark" for="rdoDescSort">جدید ترین</label>
                            <input type="radio" class="btn-check" name="RadioSort" id="rdoAscSort" autocomplete="off" value="Asc" />
                            <label class="btn btn-outline-dark" for="rdoAscSort">قدیمی ترین</label>
                            <label id="selectsort" runat="server" style="visibility: hidden;">desc</label>
                        </div>
                        <span>
                            <span class="gray">مرتب سازی بر اساس</span>&nbsp;<i class="fa fa-bars-sort fa-2x gray"></i></span>
                    </div>
                </div>
                <div class="d-block" style="max-height: 500px; overflow-y: auto;">
                    <div class="spinner-border text-warning" role="status" style="display: none" id="spinSearchLoading">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="table-responsive" style="overflow-x: auto">
                        <asp:GridView runat="server" ID="gridAccident" DataKeyNames="Id" AutoGenerateColumns="False" ClientIDMode="Static" Width="100%"
                            EmptyDataText="داده ای یافت نشد" CssClass="table table-striped table-bordered" Style="border: none; border-collapse: inherit">
                            <Columns>
                                <asp:TemplateField HeaderText="رديف" HeaderStyle-Width="2%" ItemStyle-Width="2%">
                                    <ItemTemplate>
                                        <asp:Label ID="lbl" runat="server" Text="<%#Container.DataItemIndex+1 %>"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:BoundField HeaderText="شماره گزارش" DataField="Id" />
                                <asp:BoundField HeaderText="شماره سریال" DataField="Serial" />
                                <asp:BoundField HeaderText="تاریخ وقوع تصادف " DataField="DateOfAccident" />
                                <asp:BoundField HeaderText="ساعت ثبت گزارش" DataField="SubmitTime" />
                                <asp:BoundField HeaderText="زمان ثبت گزارش در سیستم" DataField="DateInsert" />
                                <%--<asp:BoundField HeaderText="شهرستان" DataField="nameCity" />--%>
                                <asp:BoundField HeaderText="موقعیت تصادف" DataField="AccidentLocation" />
                                <asp:BoundField HeaderText="نوع تصادف" DataField="AccidentType" />
                                <asp:TemplateField HeaderText="وضعیت گزارش">
                                    <ItemTemplate>
                                        <div class="row">

                                            <div class="">
                                                <%# Eval("Status") %>
                                            </div>


                                        </div>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="مشاهده گزارش" HeaderStyle-Width="2%" ItemStyle-Width="2%">
                                    <ItemTemplate>
                                        <a runat="server" target="_blank" href='<%# Eval("CheckUrl").ToString().Replace("CheckAccident?Id","CheckAccident.aspx?Id") %>' title="مشاهده گزارش">
                                            <i class="fa fa-eye fa-2x"></i>
                                        </a>
                                        <div style="float: left">
                                            <i class='<%# Eval("StatusIcon") %>'></i>
                                        </div>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="ویرایش" HeaderStyle-Width="2%" ItemStyle-Width="2%">
                                    <ItemTemplate>
                                        <a runat="server" target="_blank" href='<%# Eval("EditUrl").ToString().Replace("AddAccident?Id","AddAccident.aspx?Id") %>' title="ویرایش">
                                            <i class="fa fa-edit fa-2x"></i>
                                        </a>&nbsp;
                                           <a runat="server" target="_self" title="حذف این گزارش">
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
    </div>
</asp:Content>
