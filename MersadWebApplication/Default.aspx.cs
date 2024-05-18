using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MersadWebApplication
{
    public partial class Default : System.Web.UI.Page
    {
        // Token: 0x06000239 RID: 569 RVA: 0x00018A38 File Offset: 0x00016C38
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["UserCannot"] == null)
            {
                Session["UserCannot"] = "0";
            }
             
            try
            {
                bool flag = !base.IsPostBack;
                if (flag)
                {
                    bool flag2 = this.Session["UserId"] != null;
                    if (flag2)
                    {
                        bool flag3 = base.Request.QueryString["ReturnUrl"] != "" && base.Request.QueryString["ReturnUrl"] != null;
                        if (flag3)
                        {
                            base.Response.Redirect(base.Request.QueryString["ReturnUrl"], false);
                            return;
                        }
                        string abs = this._sqlHelper.Select_GetAbsolutePath((long)this.Session["PlanId"]);
                        base.Response.Redirect("~" + abs, false);
                    }
                    bool flag4 = base.Request.QueryString["Username"] != "" && base.Request.QueryString["Username"] != null && base.Request.QueryString["Password"] != "" && base.Request.QueryString["Password"] != null;
                    if (flag4)
                    {
                        bool flag5 = this.GoToLogin(base.Request.QueryString["Username"], base.Request.QueryString["Password"]);
                        if (flag5)
                        {
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                this._sqlHelper.Insert_Exception("/Login", ex.ToString());
            }
        }

        // Token: 0x0600023A RID: 570 RVA: 0x00018C08 File Offset: 0x00016E08
        protected void btnLogin_OnClick(object sender, EventArgs e)
        {
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            try
            {

                if (txtCaptcha.Text.ToLower() == _helper.Decode(Session["CaptchaVerify"].ToString()) && Session["UserCannot"] != null)
                {
                    int Counts = int.Parse(Session["UserCannot"].ToString());
                    if (Counts <= 3)
                    {

                        ltShowCaptha.Text = "";
                        ltShowCaptha.ForeColor = System.Drawing.Color.Red;
                        try
                        {
                            this.lblMessage.Visible = false;
                            bool flag = string.IsNullOrEmpty(this.txtUsername.Value) || string.IsNullOrEmpty(this.txtPassword.Value);
                            if (flag)
                            {
                                this.lblMessage.InnerHtml = this._helper.ErrorMessages("نام کاربری یا کلمه عبور را وارد نمایید!");
                                this.lblMessage.Visible = true;

                                this.txtUsername.Focus();


                            }
                            else
                            {
                                bool flag2 = this.GoToLogin(this.txtUsername.Value, this.txtPassword.Value);
                                if (flag2)
                                {
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            this.lblMessage.InnerHtml = this._helper.ErrorMessages("خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید");
                            this.lblMessage.Visible = true;
                            this._sqlHelper.Insert_Exception("/Login", ex.ToString());
                        }
                    }
                    else
                    {
                        this.lblMessage.InnerHtml = this._helper.ErrorMessages("تعداد ورود اشتباه به سامانه بیشتر از سه بار مباشد.!");
                        this.lblMessage.Visible = true;
                        this.txtUsername.Focus();


                    }
                }
                else
                {
                    ltShowCaptha.Text = "کدامنیتی اشتباه است";
                    ltShowCaptha.ForeColor = System.Drawing.Color.Red;
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

        // Token: 0x0600023B RID: 571 RVA: 0x00018D00 File Offset: 0x00016F00
        private bool GoToLogin(string username, string password)
        {
            bool hasUser;
            long userId;
            long planId;
            string name;
            string family;
            string planName;
            string absPath;
            this._sqlHelper.Select_GetUserInfo(username, password, out hasUser, out userId, out planId, out name, out family, out planName, out absPath);
            bool flag = !hasUser;
            bool result;





            if (flag)
            {
                this.lblMessage.InnerHtml = this._helper.ErrorMessages("نام کاربری یا کلمه عبور صحیح نمی باشد!");
                this.lblMessage.Visible = true;
                this.txtUsername.Focus();
                result = true;
                int Counts = int.Parse(Session["UserCannot"].ToString());
                Counts = Counts + 1;
                Session["UserCannot"] = Counts;
            }
            else
            {
                this._sqlHelper.Update_UserState(userId, true);
                this.Session["UserId"] = userId;
                this.Session["FullUserName"] = name + " " + family;
                this.Session["Username"] = username;
                this.Session["PlanId"] = planId;
                this.Session["UserRoleName"] = planName;
                HttpCookie mycookie = new HttpCookie("LoginDetail");
                Session["Username"] = this._helper.EncodeCookie(username);
                Session["Password"] = this._helper.EncodeCookie(password);
                mycookie.Expires = DateTime.Now.AddDays(1.0);
                base.Response.Cookies.Add(mycookie);
                this._sqlHelper.Insert_Login(userId, base.Request.UserHostAddress);
                string abs = (absPath == "") ? this._sqlHelper.Select_GetAbsolutePath(planId) : absPath;
                GC.Collect();
                bool flag2 = base.Request.QueryString["ReturnUrl"] != "" && base.Request.QueryString["ReturnUrl"] != null;
                if (flag2)
                {
                    base.Response.Redirect(base.Request.QueryString["ReturnUrl"], false);
                    result = true;
                }
                else
                {
                    base.Response.Redirect("~" + abs, false);
                    result = false;
                }
            }

            return result;
        }

        // Token: 0x040000C8 RID: 200
        private readonly ClsHelper _helper = new ClsHelper();

        // Token: 0x040000C9 RID: 201
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();


    }
}