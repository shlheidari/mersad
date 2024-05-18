using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator
{
    public partial class Admin : System.Web.UI.MasterPage
    {
        // Token: 0x060002A0 RID: 672 RVA: 0x00019EA0 File Offset: 0x000180A0
        protected void Page_Init(object sender, EventArgs e)
        {
            if (HttpContext.Current.Session["Username"] == null || HttpContext.Current.Session["Password"] == null)
            {
                Response.Redirect("~/GetLogin.html");
            }
            this._checkAccess = new CheckAccess();
            bool flag = !CheckSession.ControlSession();
            if (!flag)
            {
                bool flag2 = !this._checkAccess.PageStartWithAuthentication();
                if (flag2)
                {
                }
            }
        }

        // Token: 0x060002A1 RID: 673 RVA: 0x00019EDC File Offset: 0x000180DC
        protected void Page_Load(object sender, EventArgs e)
        {
            if (HttpContext.Current.Session["Username"] == null || HttpContext.Current.Session["Password"] == null)
            {
                Response.Redirect("~/GetLogin.html");
            }
            try
            {
                bool flag = !this._checkAccess.CheckActiveIp();
                if (flag)
                {
                    this.Page.ClientScript.RegisterStartupScript(this.Page.GetType(), "CallMyFunction", "document.head.innerHTML = '';document.body.innerHTML = \"{ Invalid Request! }\";document.body.style.color = \"white\";document.body.style.backgroundColor  = \"black\";", true);
                }
                else
                {
                    bool flag2 = !CheckSession.ControlSession();
                    if (!flag2)
                    {
                        this._checkAccess = new CheckAccess();
                        bool flag3 = !this._checkAccess.PageStartWithAuthentication();
                        if (!flag3)
                        {
                            bool isPostBack = base.IsPostBack;
                            if (!isPostBack)
                            {
                                long submitByUserId = Convert.ToInt64(base.Session["UserId"]);
                                bool addAccident = base.Session["UserRoleName"].Equals("SuperAdmin") || this._sqlHelper.Select_AccessToButton(submitByUserId, Convert.ToInt64(base.Session["PlanId"]), "/Moderator/Event/AddAccident");
                                bool accidentList = base.Session["UserRoleName"].Equals("SuperAdmin") || this._sqlHelper.Select_AccessToButton(submitByUserId, Convert.ToInt64(base.Session["PlanId"]), "/Moderator/Event/AccidentList");
                                //this.lnkAddAccident.Visible = addAccident;
                                //this.lnkAccidentList2.Visible = accidentList;
                                foreach (object obj in this.Controls)
                                {
                                    Control control = (Control)obj;
                                    this._checkAccess.ControlState(true, "bodyMaster", control);
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                this._sqlHelper.Insert_Exception("", ex.ToString());
            }
        }

        // Token: 0x040000FB RID: 251
        private CheckAccess _checkAccess;

        // Token: 0x040000FC RID: 252
        private readonly ClsHelper _helper = new ClsHelper();

        // Token: 0x040000FD RID: 253
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();

        // Token: 0x040000FE RID: 254
       
    }
}