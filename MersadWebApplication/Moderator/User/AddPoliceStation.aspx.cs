using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator.User
{
    public partial class AddPoliceStation : System.Web.UI.Page
    {
        // Token: 0x060002A9 RID: 681 RVA: 0x0001A930 File Offset: 0x00018B30
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
                        bool flag3 = base.Request.QueryString["Id"] == null;
                        if (!flag3)
                        {
                            long id = Convert.ToInt64(base.Request.QueryString["Id"]);
                            string name;
                            string location;
                            string code;
                            string commanderName;
                            string commanderFamily;
                            string nationalId;
                            string birthDate;
                            string militaryRank;
                            string area;
                            this._sqlHelper.GetEditPoliceStation(id, out name, out location, out code, out commanderName, out commanderFamily, out nationalId, out birthDate, out militaryRank, out area);
                            this.txtName.Value = name;
                            this.txtLocation.Value = location;
                            this.txtCode.Value = code;
                            this.txtCommanderName.Value = commanderName;
                            this.txtCommanderFamily.Value = commanderFamily;
                            this.txtNationalId.Value = nationalId;
                            this.txtBirthDate.Value = birthDate;
                            this.txtMilitaryRank.Value = militaryRank;
                            this.hidLocation.Value = area;
                            this.hidId.Value = id.ToString();
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

        // Token: 0x060002AA RID: 682 RVA: 0x0001AAB8 File Offset: 0x00018CB8
        [WebMethod]
        public static List<GetSubmit> GetInsertOrUpdatePoliceStation(string id, string name, string location, string code, string commanderName, string commanderFamily, string nationalId, string birthDate, string militaryRank, string username, string password, string area)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = AddPoliceStation.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(name);
                    if (flag2)
                    {
                        submitMethod = AddPoliceStation.GetSubmitMethod("", "نام پاسگاه را وارد کنید!", "", "false");
                    }
                    else
                    {
                        bool flag3 = string.IsNullOrEmpty(commanderName) || string.IsNullOrEmpty(commanderFamily);
                        if (flag3)
                        {
                            submitMethod = AddPoliceStation.GetSubmitMethod("", "نام و نام خانوادگی فرمانده را وارد کنید!", "", "false");
                        }
                        else
                        {
                            bool flag4 = string.IsNullOrEmpty(nationalId);
                            if (flag4)
                            {
                                submitMethod = AddPoliceStation.GetSubmitMethod("", "کد ملی را وارد کنید!", "", "false");
                            }
                            else
                            {
                                bool flag5 = string.IsNullOrEmpty(area);
                                if (flag5)
                                {
                                    submitMethod = AddPoliceStation.GetSubmitMethod("", "محدوده این پاسگاه روی نقشه مشخص نشده!", "", "false");
                                }
                                else
                                {
                                    ClsHelper helper = new ClsHelper();
                                    bool flag6 = !helper.IsValidNationalCode(nationalId);
                                    if (flag6)
                                    {
                                        submitMethod = AddPoliceStation.GetSubmitMethod("", "کد ملی وارد شده صحیح نمی باشد!", "", "false");
                                    }
                                    else
                                    {
                                        bool flag7 = !string.IsNullOrEmpty(birthDate);
                                        if (flag7)
                                        {
                                            DateTime bday = helper.GetGregorianDate(birthDate);
                                            int age = DateTime.Today.Year - bday.Year;
                                            bool flag8 = age < 18;
                                            if (flag8)
                                            {
                                                return AddPoliceStation.GetSubmitMethod("", "سن وارد شده کمتر از 18 سال است!", "", "false");
                                            }
                                        }
                                        long createById = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                                        long checkingPoliceStation = string.IsNullOrEmpty(id) ? sqlHelper.InsertCheck_PoliceStation(name, commanderName, commanderFamily, nationalId) : sqlHelper.UpdateCheck_PoliceStation(Convert.ToInt64(id), name, commanderName, commanderFamily, nationalId);
                                        bool flag9 = checkingPoliceStation.Equals(-1L);
                                        if (flag9)
                                        {
                                            submitMethod = AddPoliceStation.GetSubmitMethod("", "نام پاسگاه وارد شده،در جدول پاسگاه از قبل وجود دارد!", "", "false");
                                        }
                                        else
                                        {
                                            bool flag10 = checkingPoliceStation.Equals(-2L);
                                            if (flag10)
                                            {
                                                submitMethod = AddPoliceStation.GetSubmitMethod("", "کد ملی وارد شده،در جدول پاسگاه از قبل وجود دارد!", "", "false");
                                            }
                                            else
                                            {
                                                bool flag11 = checkingPoliceStation.Equals(-3L);
                                                if (flag11)
                                                {
                                                    submitMethod = AddPoliceStation.GetSubmitMethod("", "نام و نام خانوادگی فرمانده وارد شده،در جدول پاسگاه از قبل وجود دارد!", "", "false");
                                                }
                                                else
                                                {
                                                    bool flag12 = string.IsNullOrEmpty(id);
                                                    if (flag12)
                                                    {
                                                        bool flag13 = string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password);
                                                        if (flag13)
                                                        {
                                                            return AddPoliceStation.GetSubmitMethod("", "نام کاربری یا کلمه عبور را وارد کنید!", "", "false");
                                                        }
                                                        ClsHelper.PasswordScore ps = helper.CheckStrength(password);
                                                        bool flag14 = ps.Equals(ClsHelper.PasswordScore.Blank) || ps.Equals(ClsHelper.PasswordScore.VeryWeak) || ps.Equals(ClsHelper.PasswordScore.Weak);
                                                        if (flag14)
                                                        {
                                                            return AddPoliceStation.GetSubmitMethod("", "رمز عبور وارد شده ضعیف است!", "", "false");
                                                        }
                                                        long checkingUserPoliceStation = sqlHelper.InsertCheck_User_PoliceStation(commanderName, commanderFamily, nationalId, username);
                                                        bool flag15 = checkingUserPoliceStation.Equals(-1L);
                                                        if (flag15)
                                                        {
                                                            return AddPoliceStation.GetSubmitMethod("", "نام و نام خانوادگی فرمانده وارد شده،در جدول کاربران از قبل وجود دارد!", "", "false");
                                                        }
                                                        bool flag16 = checkingUserPoliceStation.Equals(-2L);
                                                        if (flag16)
                                                        {
                                                            return AddPoliceStation.GetSubmitMethod("", "کد ملی وارد شده،در جدول کاربران از قبل وجود دارد!", "", "false");
                                                        }
                                                        bool flag17 = checkingUserPoliceStation.Equals(-3L);
                                                        if (flag17)
                                                        {
                                                            return AddPoliceStation.GetSubmitMethod("", "نام کاربری وارد شده،در جدول کاربران از قبل وجود دارد!", "", "false");
                                                        }
                                                    }
                                                    long ret = string.IsNullOrEmpty(id) ? sqlHelper.Insert_PoliceStation(name, location, code, commanderName, commanderFamily, nationalId, birthDate, militaryRank, createById, area) : sqlHelper.SetEditPoliceStation(Convert.ToInt64(id), name, location, code, commanderName, commanderFamily, nationalId, birthDate, militaryRank, createById, area);
                                                    bool flag18 = string.IsNullOrEmpty(id);
                                                    if (flag18)
                                                    {
                                                        long registerById = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                                                        sqlHelper.Insert_User(5L, commanderName, commanderFamily, "", birthDate, nationalId, ret, username, password, "", registerById, area);
                                                    }
                                                    submitMethod = AddPoliceStation.GetSubmitMethod(ret.ToString(), "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
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
                submitMethod = AddPoliceStation.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x060002AB RID: 683 RVA: 0x00018FC0 File Offset: 0x000171C0
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

        // Token: 0x0400011B RID: 283
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();

        // Token: 0x0400011C RID: 284
        private readonly ClsHelper _helper = new ClsHelper();

    }
}