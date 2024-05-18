using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator.User
{
    public partial class UserInfo : System.Web.UI.Page
    {
        // Token: 0x060002C8 RID: 712 RVA: 0x0001C80C File Offset: 0x0001AA0C
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
                        long id = Convert.ToInt64(this.Session["UserId"]);
                        string name;
                        string family;
                        string username;
                        string fatherName;
                        string birthDate;
                        string nationalId;
                        string post;
                        string policeStation;
                        string imageUrl;
                        this._sqlHelper.GetUserInfo(id, out name, out family, out username, out fatherName, out birthDate, out nationalId, out post, out policeStation, out imageUrl);
                        this.txtName.Value = name;
                        this.txtFamily.Value = family;
                        this.txtUsername.Value = username;
                        this.txtFatherName.Value = fatherName;
                        this.txtBirthDate.Value = birthDate;
                        this.txtNationalId.Value = nationalId;
                        this.txtPost.Value = post;
                        this.txtPoliceStation.Value = policeStation;
                        bool flag3 = !string.IsNullOrEmpty(imageUrl);
                        if (flag3)
                        {
                            this.imgUser.Src = "/MediaUploader/User/" + imageUrl + ".jpg";
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

        // Token: 0x0400015B RID: 347
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();

        // Token: 0x0400015C RID: 348
        private readonly ClsHelper _helper = new ClsHelper();

    }
}