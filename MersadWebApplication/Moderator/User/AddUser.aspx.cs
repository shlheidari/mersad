using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator.User
{
    public partial class AddUser : System.Web.UI.Page
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
                        this._sqlHelper.FillAllHtmlSelect(this.cmbPlan, "FillCmb", "SP_All_TBL_Plan");
                        this._sqlHelper.FillAllHtmlSelect(this.cmbPlanSearch, "FillCmb", "SP_All_TBL_Plan");
                        this._sqlHelper.FillAllHtmlSelect(this.cmbPoliceStation, "FillCmb", "SP_All_TBL_PoliceStation");
                        bool flag3 = base.Request.QueryString["Id"] == null;
                        if (flag3)
                        {
                            Guid guid = Guid.NewGuid();
                            this.hideGuid.Value = guid.ToString();
                        }
                        else
                        {
                            long id = Convert.ToInt64(base.Request.QueryString["Id"]);
                            string planId;
                            string name;
                            string family;
                            string fatherName;
                            string birthDate;
                            string nationalId;
                            string policeStationId;
                            string username;
                            string imageUrl;
                            string area;
                            string password;
                            this._sqlHelper.GetEditUser(id, out planId, out name, out family, out fatherName, out birthDate, out nationalId, out policeStationId, out username, out imageUrl, out area, out password);
                            this.cmbPlan.Value = planId;
                            this.txtName.Value = name;
                            this.txtFamily.Value = family;
                            this.txtFatherName.Value = fatherName;
                            this.txtBirthDate.Value = birthDate;
                            this.txtNationalId.Value = nationalId;
                            this.txtNationalId.Value = nationalId;
                            this.txtBirthDate.Value = birthDate;
                            this.cmbPoliceStation.Value = policeStationId;
                            this.txtUsername.Value = username;
                            this.txtPassword.Value = (this.txtRePassword.Value = password);
                            this.hidId.Value = id.ToString();
                            this.hideGuid.Value = imageUrl;
                            this.hidLocation.Value = area;
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

        // Token: 0x060002AE RID: 686 RVA: 0x0001B1C4 File Offset: 0x000193C4
        [WebMethod]
        public static List<GetSubmit> GetInsertOrUpdateUser(
            string id,
            string planId,
            string name,
            string family,
            string fatherName,
            string birthDate,
            string nationalId,
            string policeStation,
            string username,
            string password,             
            string guid)
        {
            string area = "";
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = AddUser.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    long registerById = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                    bool flag2 = string.IsNullOrEmpty(planId) || planId.Equals("-1");
                    if (flag2)
                    {
                        submitMethod = AddUser.GetSubmitMethod("", "سمت را انتخاب کنید!", "", "false");
                    }
                    else
                    {
                        bool flag3 = string.IsNullOrEmpty(name) || string.IsNullOrEmpty(family);
                        if (flag3)
                        {
                            submitMethod = AddUser.GetSubmitMethod("", "نام و نام خانوادگی را وارد کنید!", "", "false");
                        }
                        else
                        {
                            bool flag4 = string.IsNullOrEmpty(nationalId);
                            if (flag4)
                            {
                                submitMethod = AddUser.GetSubmitMethod("", "کد ملی را وارد کنید!", "", "false");
                            }
                            else
                            {
                                bool flag5 = string.IsNullOrEmpty(policeStation) || policeStation.Equals("-1");
                                if (flag5)
                                {
                                    submitMethod = AddUser.GetSubmitMethod("", "پاسگاه را انتخاب کنید!", "", "false");
                                }
                                else
                                {
                                    bool flag6 = string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password);
                                    if (flag6)
                                    {
                                        submitMethod = AddUser.GetSubmitMethod("", "نام کاربری یا کلمه عبور را وارد کنید!", "", "false");
                                    }
                                    else
                                    {
                                        ClsHelper helper = new ClsHelper();
                                        bool flag7 = !helper.IsValidNationalCode(nationalId);
                                        if (flag7)
                                        {
                                            submitMethod = AddUser.GetSubmitMethod("", "کد ملی وارد شده صحیح نمی باشد!", "", "false");
                                        }
                                        else
                                        {
                                            bool flag8 = !string.IsNullOrEmpty(birthDate);
                                            if (flag8)
                                            {
                                                DateTime bday = helper.GetGregorianDate(birthDate);
                                                int age = DateTime.Today.Year - bday.Year;
                                                bool flag9 = age < 18;
                                                if (flag9)
                                                {
                                                    return AddUser.GetSubmitMethod("", "سن وارد شده کمتر از 18 سال است!", "", "false");
                                                }
                                            }
                                            ClsHelper.PasswordScore ps = helper.CheckStrength(password);
                                            bool flag10 = ps.Equals(ClsHelper.PasswordScore.Blank) || ps.Equals(ClsHelper.PasswordScore.VeryWeak) || ps.Equals(ClsHelper.PasswordScore.Weak);
                                            if (flag10)
                                            {
                                                submitMethod = AddUser.GetSubmitMethod("", "رمز عبور وارد شده ضعیف است!", "", "false");
                                            }
                                            else
                                            {
                                                long ret = string.IsNullOrEmpty(id) ? sqlHelper.Insert_User(Convert.ToInt64(planId), name, family, fatherName, birthDate, nationalId, Convert.ToInt64(policeStation), username, password, guid, registerById, area) : sqlHelper.SetEditUser(Convert.ToInt64(id), Convert.ToInt64(planId), name, family, fatherName, birthDate, nationalId, Convert.ToInt64(policeStation), username, password, guid, area);
                                                bool flag11 = ret.Equals(-1L);
                                                if (flag11)
                                                {
                                                    submitMethod = AddUser.GetSubmitMethod("", "نام و نام خانوادگی وارد شده،از قبل وجود دارد!", "", "false");
                                                }
                                                else
                                                {
                                                    bool flag12 = ret.Equals(-2L);
                                                    if (flag12)
                                                    {
                                                        submitMethod = AddUser.GetSubmitMethod("", "کد ملی وارد شده،از قبل وجود دارد!", "", "false");
                                                    }
                                                    else
                                                    {
                                                        bool flag13 = ret.Equals(-3L);
                                                        if (flag13)
                                                        {
                                                            submitMethod = AddUser.GetSubmitMethod("", "نام کاربری وارد شده،از قبل وجود دارد!", "", "false");
                                                        }
                                                        else
                                                        {
                                                            submitMethod = AddUser.GetSubmitMethod(ret.ToString(), "اطلاعات با موفقیت ثبت و ذخیره شد!", guid, "true");
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = AddUser.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x060002AF RID: 687 RVA: 0x0001B590 File Offset: 0x00019790
        [WebMethod]
        public static List<GetSubmit> GetArea(string policeStationId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = AddUser.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(policeStationId);
                    if (flag2)
                    {
                        submitMethod = AddUser.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string area = sqlHelper.GetPoliceStationArea(Convert.ToInt64(policeStationId));
                        submitMethod = AddUser.GetSubmitMethod("", area, "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = AddUser.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x060002B0 RID: 688 RVA: 0x00018FC0 File Offset: 0x000171C0
        private static List<GetSubmit> GetSubmitMethod(string id, string msg, string msgTwo, string success)
        {
            return new List<GetSubmit>
            {
                new GetSubmit
                {
                    Id = id,
                    Message = msg,
                    MessageTwo = msgTwo,
                    IsSuccess = success
                }
            };
        }

        // Token: 0x0400012E RID: 302
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();

        // Token: 0x0400012F RID: 303
        private readonly ClsHelper _helper = new ClsHelper();


    }
}