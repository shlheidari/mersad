
using MersadWebApplication.Data;
using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;

namespace MersadWebApplication
{
    public partial class RecoveryPassword : System.Web.UI.Page
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

        protected void BtnGoNext_Click(object sender, EventArgs e)
        {

#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            try
            {
                if (txtCaptcha.Text.ToLower() == _helper.Decode(Session["CaptchaVerify"].ToString()))
                {
                    using (DataManagementDataContext context = new DataManagementDataContext())
                    {
                        var ds = (from m in context.RecoveryPassword_First(txtUsername.Text, txtname.Text, txtFamily.Text, txtFather.Text

                            ).AsEnumerable()
                                  select m).FirstOrDefault();
                        if (ds != null && ds.Username == txtUsername.Text)
                        {
                            message.Visible = false;
                            mvstate.SetActiveView(vwdataReset);
                            ViewState["IsSearched"] = "true";
                        }
                        else
                        {
                            message.Visible = true;
                            ltMessage.Text = "کاربری با این مشخصات پیدا نشد.";
                        }
                    }
                }
                else
                {
                    ltShowCaptha.Text = "کد امنیتی اشتباه است";
                }
            }
            catch (Exception ex)
            {
#pragma warning disable CS0219 // The variable 'omid' is assigned but its value is never used
                string omid = "";
#pragma warning restore CS0219 // The variable 'omid' is assigned but its value is never used
            }
#pragma warning restore CS0168 // The variable 'ex' is declared but never used

        }
        private readonly ClsHelper _helper = new ClsHelper();
        protected void BtnResetPassword_Click(object sender, EventArgs e)
        {
            using (DataManagementDataContext context = new DataManagementDataContext())
            {
                string passencodeShode = "";
                if (ViewState["IsSearched"] != null && ViewState["IsSearched"].ToString() == "true")
                {
                    if (txtPassPath1.Text.Equals(txtPassPath2.Text) && txtPassPath1.Text.Length >= 8&& txtPassPath1.Text.Length <= 10)
                    {
                        TestPassword tp = new TestPassword();
                        switch (tp.returnClass(txtPassPath1.Text))
                        {
                            case 5:
                                LbStrongest.Text = "کلمه عبور شما بسیار قوی است";
                                LbStrongest.ForeColor = System.Drawing.Color.DarkGreen;
                                passencodeShode = _helper.Encode(txtPassPath1.Text);
                                context.UpdatePassword(passencodeShode, txtUsername.Text);
                                Response.Redirect("~/Default.aspx");
                                break;
                            case 4:
                                LbStrongest.Text = "کلمه عبور شما متوسط است";
                                LbStrongest.ForeColor = System.Drawing.Color.Orange;
                                break;
                            case 3:
                                LbStrongest.Text = "کلمه عبور شما متوسط است";
                                LbStrongest.ForeColor = System.Drawing.Color.Orange;
                                break;
                            case 2:
                                LbStrongest.Text = "کلمه عبور شما ضعیف است";
                                LbStrongest.ForeColor = System.Drawing.Color.Red;
                                break;
                            case 1:
                                LbStrongest.Text = "کلمه عبور شما بسیار ضعیف است";
                                LbStrongest.ForeColor = System.Drawing.Color.DarkRed;
                                break;
                        }
                    }
                    else
                    {
                        message.Visible = true;
                        ltMessage.Text = "مقادیر برای کلمه عبور کافی نیست";
                    }
                }

            }
        }

    }
}