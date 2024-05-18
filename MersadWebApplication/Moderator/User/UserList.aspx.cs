using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator.User
{
    public partial class UserList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (!flag)
                {
                    bool flag2 = !base.IsPostBack;
                    if (flag2)
                    {
                        this._sqlHelper.FillAllHtmlSelects(this.cmbPlanSearch, "FillCmb", "SP_All_TBL_Plan");
                        bool flag3 = base.Request.QueryString["Id"] == null && base.Request.QueryString["Name"] == null && base.Request.QueryString["Username"] == null && base.Request.QueryString["NationalId"] == null && base.Request.QueryString["PlanId"] == null;
                        if (flag3)
                        {
                            long submitByUserId = Convert.ToInt64(this.Session["UserId"]);
                            long? getUserId = (this.Session["UserRoleName"].Equals("SuperAdmin") || this._sqlHelper.Select_AccessToButton(submitByUserId, Convert.ToInt64(this.Session["PlanId"]), "AllUserList")) ? null : new long?(submitByUserId);
                            this._sqlHelper.FillGridUser(this.gridUsers, null, null, null, null, new int?(100), null, null, getUserId);
                        }
                        else
                        {
                            DataTable dt = new DataTable();
                            dt.Columns.Add("Id");
                            dt.Columns.Add("RegisterDate");
                            dt.Columns.Add("Username");
                            dt.Columns.Add("FullName");
                            dt.Columns.Add("FatherName");
                            dt.Columns.Add("BirthDate");
                            dt.Columns.Add("NationalId");
                            dt.Columns.Add("Post");
                            dt.Columns.Add("PoliceStation");
                            dt.Columns.Add("EditUrl");
                            dt.Rows.Add(new object[]
                            {
                                "",
                                "",
                                "",
                                "",
                                "",
                                "",
                                "",
                                "",
                                "",
                                ""
                            });
                            this.gridUsers.DataSource = dt;
                            this.gridUsers.DataBind();
                            this.txtIdSearch.Value = base.Request.QueryString["Id"];
                            this.txtNameSearch.Value = base.Request.QueryString["Name"];
                            this.txtUsernameSearch.Value = base.Request.QueryString["Username"];
                            this.txtNationalIdSearch.Value = base.Request.QueryString["NationalId"];
                            this.cmbPlanSearch.Text = base.Request.QueryString["PlanId"];
                            ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "key", "Search('');", true);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                this.lblMessage.InnerHtml = this._helper.ErrorMessages("خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید");
                this.lblMessage.Visible = true;
                this._sqlHelper.Insert_Exception("", ex.ToString());
            }
        }

        // Token: 0x060002CF RID: 719 RVA: 0x0001D1CC File Offset: 0x0001B3CC
        [WebMethod]
        public static List<GetGridUser> GetUserGrid(string name, string nationalId, string username, string rowCount, string planId, string id, string sort)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetGridUser> result;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    result = new List<GetGridUser>
                    {
                        new GetGridUser
                        {
                            Id = "0",
                            FullName = "صفحه را مجدد بارگذاری نمایید!"
                        }
                    };
                }
                else
                {
                    ClsHelper helper = new ClsHelper();
                    bool flag2 = !string.IsNullOrEmpty(id) && !helper.IsNumber(id);
                    if (flag2)
                    {
                        result = new List<GetGridUser>
                        {
                            new GetGridUser
                            {
                                Id = "0",
                                FullName = "شناسه باید عدد باشد!"
                            }
                        };
                    }
                    else
                    {
                        long? getId = string.IsNullOrEmpty(id) ? null : new long?(Convert.ToInt64(id));
                        long? getPlanId = (string.IsNullOrEmpty(planId) || planId.Equals("-1")) ? null : new long?(Convert.ToInt64(planId));
                        long submitByUserId = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                        long? getUserId = (HttpContext.Current.Session["UserRoleName"].Equals("SuperAdmin") || sqlHelper.Select_AccessToButton(submitByUserId, Convert.ToInt64(HttpContext.Current.Session["PlanId"]), "AllUserList")) ? null : new long?(submitByUserId);
                        List<GetGridUser> getPlans = sqlHelper.FillGridUserAjax(name, name, nationalId, username, new int?(Convert.ToInt32(rowCount)), getPlanId, getId, getUserId, sort);
                        bool flag3 = getPlans.Count == 0;
                        if (flag3)
                        {
                            result = new List<GetGridUser>
                            {
                                new GetGridUser
                                {
                                    Id = "-1",
                                    FullName = "داده ای یافت نشد!"
                                }
                            };
                        }
                        else
                        {
                            result = getPlans;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                result = new List<GetGridUser>
                {
                    new GetGridUser
                    {
                        Id = "0",
                        FullName = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید"
                    }
                };
            }
            return result;
        }

        // Token: 0x060002D0 RID: 720 RVA: 0x0001CDCC File Offset: 0x0001AFCC
        protected void gridUsers_OnRowCommand(object sender, GridViewCommandEventArgs e)
        {
            try
            {
            }
            catch (Exception)
            {
            }
        }

        // Token: 0x04000170 RID: 368
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();

        // Token: 0x04000171 RID: 369
        private readonly ClsHelper _helper = new ClsHelper();

        // Token: 0x04000172 RID: 370
      
    }
}