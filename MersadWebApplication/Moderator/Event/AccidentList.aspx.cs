using MersadWebApplication.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator.Event
{
    public partial class AccidentList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {

                if (!Page.IsPostBack)
                {
                    if (Request.QueryString["Del_Id"]!=null)
                    {
                        if (Request.QueryString["Del_Id"].ToString()!="")
                        {
                            using (DataManagementDataContext context= new DataManagementDataContext())
                            {
                                int id = int.Parse(Request.QueryString["Del_Id"].ToString());
                                context.DeleteAccidentReport(id);
                                Response.Redirect("~/Moderator/Event/AccidentList.aspx");
                            }
                        }
                        else
                        {
                            long submitByUserId = Convert.ToInt64(this.Session["UserId"]);
                            bool isSuper = HttpContext.Current.Session["UserRoleName"].Equals("SuperAdmin");
                            bool allAccident = isSuper || this._sqlHelper.Select_AccessToButton(submitByUserId, Convert.ToInt64(HttpContext.Current.Session["PlanId"]), "AllAccidentList");
                            this._sqlHelper.FillGridAccident(this.gridAccident, 200, null, new long?(submitByUserId), "All", "24", null, null, null, "All", null, allAccident, isSuper);
                        }
                    }
                    else
                    {
                        long submitByUserId = Convert.ToInt64(this.Session["UserId"]);
                        bool isSuper = HttpContext.Current.Session["UserRoleName"].Equals("SuperAdmin");
                       bool allAccident = isSuper || this._sqlHelper.Select_AccessToButton(submitByUserId, Convert.ToInt64(HttpContext.Current.Session["PlanId"]), "AllAccidentList");
                       this._sqlHelper.FillGridAccident(this.gridAccident, 200, null, new long?(submitByUserId), "All", "24", null, null, null, "All", null, allAccident, isSuper);
                    }

                }
            }
            catch (Exception ex)
            {
                //this.lblMessage.InnerHtml = this._helper.ErrorMessages("خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید");
                //this.lblMessage.Visible = true;
                this._sqlHelper.Insert_Exception("", ex.ToString());
            }
        }

        // Token: 0x06000348 RID: 840 RVA: 0x00028D0C File Offset: 0x00026F0C
        [WebMethod]
        public static List<GetGridAccident> GetAccidentGrid(string status, string dateOfAccident, string timeAccidentStart, string timeAccidentEnd, string crashType, string serial, string sort, string listId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetGridAccident> result;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    result = new List<GetGridAccident>
                    {
                        new GetGridAccident
                        {
                            Id = "0",
                            Serial = "صفحه را مجدد بارگذاری نمایید!"
                        }
                    };
                }
                else
                {
                    if (true)
                    {
                        long submitByUserId = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                        bool isSuper = HttpContext.Current.Session["UserRoleName"].Equals("SuperAdmin");
                        bool allAccident = isSuper || sqlHelper.Select_AccessToButton(submitByUserId, Convert.ToInt64(HttpContext.Current.Session["PlanId"]), "AllAccidentList");
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
                        byte? getTimeAccidentStart = string.IsNullOrEmpty(timeAccidentStart) ? null : new byte?(Convert.ToByte(timeAccidentStart));
                        byte? getTimeAccidentEnd = string.IsNullOrEmpty(timeAccidentEnd) ? null : new byte?(Convert.ToByte(timeAccidentEnd));
                        List<GetGridAccident> getAccidents = sqlHelper.FillGridAccidentAjax(200, null, new long?(submitByUserId), status, dateOfAccident, dateOfAccidentEnd, getTimeAccidentStart, getTimeAccidentEnd, crashType, serial, allAccident, sort, listId, isSuper);
                        bool flag3 = getAccidents.Count == 0;
                        if (flag3)
                        {
                            result = new List<GetGridAccident>
                        {
                            new GetGridAccident
                            {
                                Id = "-1",
                                Serial = "داده ای یافت نشد!"
                            }
                        };
                        }
                        else
                        {
                            result = getAccidents;
                        } 
                    }

                    else
                    {

                    }

                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                result = new List<GetGridAccident>
                {
                    new GetGridAccident
                    {
                        Id = "0",
                        Serial = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید"
                    }
                };
            }
            return result;
        }

        // Token: 0x06000349 RID: 841 RVA: 0x0001CDCC File Offset: 0x0001AFCC
        protected void gridUsers_OnRowCommand(object sender, GridViewCommandEventArgs e)
        {
            try
            {
            }
            catch (Exception)
            {
            }
        }

        // Token: 0x040001E4 RID: 484
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();

        // Token: 0x040001E5 RID: 485
        private readonly ClsHelper _helper = new ClsHelper();


    }
}