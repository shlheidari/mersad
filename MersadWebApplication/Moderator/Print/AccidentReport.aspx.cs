using Stimulsoft.Report;
using Stimulsoft.Report.Export;
using Stimulsoft.Report.Web;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator.Print
{
    public partial class AccidentReport : System.Web.UI.Page
    {
        // Token: 0x060002EF RID: 751 RVA: 0x00020434 File Offset: 0x0001E634
        protected void Page_Init(object sender, EventArgs e)
        {
            bool flag = !CheckSession.ControlSession();
            if (!flag)
            {
                this._checkAccess = new CheckAccess();
                bool flag2 = !this._checkAccess.PageStartWithAuthentication();
                if (flag2)
                {
                }
            }
        }

        // Token: 0x060002F0 RID: 752 RVA: 0x00020470 File Offset: 0x0001E670
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                bool isPostBack = base.IsPostBack;
                if (!isPostBack)
                {
                    bool flag = base.Request.QueryString["Format"] != null && base.Request.QueryString["Name"] != null;
                    if (flag)
                    {
                        string formatStr = base.Request.QueryString["Format"];
                        bool flag2 = formatStr == "Pdf";
                        StiExportFormat format;
                        if (flag2)
                        {
                            format = StiExportFormat.Pdf;
                        }
                        else
                        {
                            bool flag3 = formatStr == "Excel";
                            if (flag3)
                            {
                                format = StiExportFormat.Excel;
                            }
                            else
                            {
                                bool flag4 = formatStr == "Jpg";
                                if (flag4)
                                {
                                    format = StiExportFormat.ImageJpeg;
                                }
                                else
                                {
                                    bool flag5 = formatStr == "Png";
                                    if (flag5)
                                    {
                                        format = StiExportFormat.ImagePng;
                                    }
                                    else
                                    {
                                        bool flag6 = formatStr == "Txt";
                                        if (flag6)
                                        {
                                            format = StiExportFormat.Text;
                                        }
                                        else
                                        {
                                            bool flag7 = formatStr == "Csv";
                                            if (flag7)
                                            {
                                                format = StiExportFormat.Csv;
                                            }
                                            else
                                            {
                                                bool flag8 = formatStr == "Html";
                                                if (flag8)
                                                {
                                                    format = StiExportFormat.Html;
                                                }
                                                else
                                                {
                                                    bool flag9 = formatStr == "Word";
                                                    if (flag9)
                                                    {
                                                        format = StiExportFormat.Word2007;
                                                    }
                                                    else
                                                    {
                                                        format = StiExportFormat.Excel;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        this.CreateStimulSoftReport(format, base.Request.QueryString["Name"]);
                    }
                }
            }
            catch (Exception ex)
            {
                ClsSqlHelper sqlHelper = this._sqlHelper;
                string formUrl = "/Moderator/Print/AccidentReport";
                Exception ex2 = ex;
                sqlHelper.Insert_Exception(formUrl, ((ex2 != null) ? ex2.ToString() : null) + "\n ExportSize:" + base.Request.QueryString["Name"]);
            }
        }

        // Token: 0x060002F1 RID: 753 RVA: 0x00020618 File Offset: 0x0001E818
        public void CreateStimulSoftReport(StiExportFormat format, string fileName)
        {
            StiReport stReport = new StiReport();
            bool flag = File.Exists(base.Server.MapPath("~\\App_Data\\Report\\" + fileName + ".mrt"));
            if (flag)
            {
                stReport.Load(base.Server.MapPath("~\\App_Data\\Report\\" + fileName + ".mrt"));
            }
            string sort = base.Request.QueryString["sort"]??"";
            string status = base.Request.QueryString["Status"] ?? "";
            string dateOfAccident = base.Request.QueryString["DateOfAccident"] ?? "";
            string timeStart = base.Request.QueryString["TimeStart"] ?? "";
            string timeEnd = base.Request.QueryString["TimeEnd"] ?? "";
            string crashType = base.Request.QueryString["CrashType"] ?? "";
            string serial = base.Request.QueryString["Serial"] ?? "";
            long submitByUserId = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
            bool isSuper = HttpContext.Current.Session["UserRoleName"].Equals("SuperAdmin");
            bool allAccident = isSuper || this._sqlHelper.Select_AccessToButton(submitByUserId, Convert.ToInt64(HttpContext.Current.Session["PlanId"]), "AllAccidentList");
            string dateOfAccidentEnd = null;
            bool flag2 = dateOfAccident.IndexOf("-") > 0;
            if (flag2)
            {
                string[] getDates = dateOfAccident.Split(new char[]
                {
                    '-'
                });
                dateOfAccident = getDates[0];
                dateOfAccidentEnd = getDates[1];
            }
            byte? getTimeAccidentStart = string.IsNullOrEmpty(timeStart) ? null : new byte?(Convert.ToByte(timeStart));
            byte? getTimeAccidentEnd = string.IsNullOrEmpty(timeEnd) ? null : new byte?(Convert.ToByte(timeEnd));
            DataTable body = this._sqlHelper.Select_PrintAccident(200, null, new long?(submitByUserId), status, dateOfAccident, dateOfAccidentEnd, getTimeAccidentStart, getTimeAccidentEnd, crashType, serial, allAccident, isSuper,sort);
            var header = new
            {
                Arm = new Bitmap(base.Server.MapPath("~\\Images\\logo.png")),
                CreateDate = this._helper.GetPersianDate(DateTime.Now)
            };
            stReport.RegData("Body", body);
            stReport.RegData("Header", header);
            stReport.Render(false);
            string formatStr = base.Request.QueryString["Format"];
            base.Response.ContentEncoding = Encoding.UTF8;
            StiPdfExportSettings exportPdfSettings = new StiPdfExportSettings
            {
                ImageQuality = 100f,
                ImageResolution = 800f,
                Compressed = true
            };
            StiJpegExportSettings exportJpegSettings = new StiJpegExportSettings
            {
                ImageResolution = 800
            };
            bool flag3 = formatStr == "Pdf";
            if (flag3)
            {
                StiReportResponse.ResponseAsPdf(stReport, exportPdfSettings);
            }
            else
            {
                bool flag4 = formatStr == "Excel";
                if (flag4)
                {
                    StiReportResponse.ResponseAsXls(stReport);
                }
                else
                {
                    bool flag5 = formatStr == "Jpg";
                    if (flag5)
                    {
                        StiReportResponse.ResponseAsJpeg(stReport, exportJpegSettings);
                    }
                    else
                    {
                        bool flag6 = formatStr == "Png";
                        if (flag6)
                        {
                            StiReportResponse.ResponseAsPng(stReport, exportJpegSettings);
                        }
                        else
                        {
                            
                            bool flag7 = formatStr == "Txt";
                            if (flag7)
                            {
                                StiReportResponse.ResponseAsText(stReport);
                            }
                            else
                            {
                                bool flag8 = formatStr == "Csv";
                                if (flag8)
                                {
                                    StiReportResponse.ResponseAsCsv(stReport);
                                }
                                else
                                {
                                    bool flag9 = formatStr == "Html";
                                    if (flag9)
                                    {
                                        StiReportResponse.ResponseAsHtml5(stReport);
                                    }
                                    else
                                    {
                                        bool flag10 = formatStr == "Word";
                                        if (flag10)
                                        {
                                            StiReportResponse.ResponseAsWord2007(stReport);
                                        }
                                        else
                                        {
                                            StiReportResponse.ResponseAsExcel2007(stReport);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.Context.ApplicationInstance.CompleteRequest();
        }

        // Token: 0x04000196 RID: 406
        private CheckAccess _checkAccess;

        // Token: 0x04000197 RID: 407
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();

        // Token: 0x04000198 RID: 408
        private readonly ClsHelper _helper = new ClsHelper();

    }
}