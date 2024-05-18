using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MersadWebApplication
{
    public partial class LogOut : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            this.Session.Abandon();
            if (this.Request.Cookies["LoginDetail"] != null)
            {

                this.Response.Cookies["LoginDetail"].Expires = DateTime.Now.AddDays(-1.0);
                this.Response.Redirect("~/Default.aspx");
            }
        }
    }
}