using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MersadWebApplication
{
    public partial class Site : System.Web.UI.MasterPage
    {
        // Token: 0x0600029B RID: 667 RVA: 0x00019C70 File Offset: 0x00017E70
        protected void Page_Init(object sender, EventArgs e)
        {
            
            HttpCookie requestCookie = base.Request.Cookies["__AntiXsrfToken"];
            Guid requestCookieGuidValue;
            bool flag = requestCookie != null && Guid.TryParse(requestCookie.Value, out requestCookieGuidValue);
            if (flag)
            {
                this._antiXsrfTokenValue = requestCookie.Value;
                this.Page.ViewStateUserKey = this._antiXsrfTokenValue;
            }
            else
            {
                this._antiXsrfTokenValue = Guid.NewGuid().ToString("N");
                this.Page.ViewStateUserKey = this._antiXsrfTokenValue;
                HttpCookie responseCookie = new HttpCookie("__AntiXsrfToken")
                {
                    HttpOnly = true,
                    Value = this._antiXsrfTokenValue
                };
                bool flag2 = FormsAuthentication.RequireSSL && base.Request.IsSecureConnection;
                if (flag2)
                {
                    responseCookie.Secure = true;
                }
                base.Response.Cookies.Set(responseCookie);
            }
            this.Page.PreLoad += this.master_Page_PreLoad;
        }

        // Token: 0x0600029C RID: 668 RVA: 0x00019D6C File Offset: 0x00017F6C
        protected void master_Page_PreLoad(object sender, EventArgs e)
        { 
            bool flag = !base.IsPostBack;
            if (flag)
            {
                this.ViewState["__AntiXsrfToken"] = this.Page.ViewStateUserKey;
                this.ViewState["__AntiXsrfUserName"] = (this.Context.User.Identity.Name ?? string.Empty);
            }
            else
            {
                bool flag2 = (string)this.ViewState["__AntiXsrfToken"] != this._antiXsrfTokenValue || (string)this.ViewState["__AntiXsrfUserName"] != (this.Context.User.Identity.Name ?? string.Empty);
                if (flag2)
                {
                    throw new InvalidOperationException("Validation of Anti-XSRF token failed.");
                }
            }
        }

        // Token: 0x0600029D RID: 669 RVA: 0x00019E48 File Offset: 0x00018048
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        // Token: 0x0600029E RID: 670 RVA: 0x00002DF2 File Offset: 0x00000FF2
        protected void Unnamed_LoggingOut(object sender, LoginCancelEventArgs e)
        {
        }

        // Token: 0x040000F5 RID: 245
        private const string AntiXsrfTokenKey = "__AntiXsrfToken";

        // Token: 0x040000F6 RID: 246
        private const string AntiXsrfUserNameKey = "__AntiXsrfUserName";

        // Token: 0x040000F7 RID: 247
        private string _antiXsrfTokenValue;

        // Token: 0x040000F8 RID: 248
#pragma warning disable CS0169 // The field 'Site._checkAccess' is never used
        private CheckAccess _checkAccess;
#pragma warning restore CS0169 // The field 'Site._checkAccess' is never used

    }
}