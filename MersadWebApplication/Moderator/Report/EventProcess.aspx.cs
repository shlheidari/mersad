using MersadWebApplication.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator.Report
{
    public partial class EventProcess : System.Web.UI.Page
    {
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();
        private readonly ClsHelper _helper = new ClsHelper();
        void GetAllAxis()
        {
            using (DataManagementDataContext context = new DataManagementDataContext())
            {

                var ds = (from m in context.fillCity().AsEnumerable()
                          select m).ToList();

                if (ds.Count != 0)
                {
                    cmbCity.DataSource = ds;
                    cmbCity.DataTextField = "cityid";
                    cmbCity.DataValueField = "cityid";
                    cmbCity.DataBind();
                }


            }


        }
        // Token: 0x060002EA RID: 746 RVA: 0x0001FB24 File Offset: 0x0001DD24
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                GetAllAxis();
                if (!CheckSession.ControlSession() || this.IsPostBack)
                    return;
                this._sqlHelper.FiltrafficZonecity(this.cmbProvinceSearch, "traffic", "FillCityID", "trafficzone");

            }
            catch (Exception ex)
            {
                this.lblMessage.InnerHtml = this._helper.ErrorMessages("خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید");
                this.lblMessage.Visible = true;
                this._sqlHelper.Insert_Exception("", ex.ToString());
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetSearchEventProcess(
          string type,
          string status,
          string dateOfAccident,
          string crashType,
          string provinceId,
          string getDays,
          string month,
          string collisionOfA,
          string lightingStatus,
          string weather,
          string carriageWayDirection,
          string typeOfWay,
          string carCrashLocation,
          string locationLandUse,
          string fromAgeDriver,
          string toAgeDriver,
          string cityId,
          string inNativeArea,
          string isHoliday,
          string collisionChild1,
          string collisionChild2,
          string axisId,
          string eventProcessId,
          string startYear,
          string endYear,
          string isNotLocalDriver)
        {
            if (provinceId.Contains("نام شهر"))
            {
                provinceId = null;
            }
            if (cityId.Contains("کد منطقه شهرداری"))
            {
                cityId = null;
            }
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return new List<GetSubmit>()
          {
            new GetSubmit()
            {
              IsSuccess = "false",
              Message = "صفحه را مجدد بارگذاری نمایید!"
            }
          };
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                bool allAccident = HttpContext.Current.Session["UserRoleName"].Equals((object)"SuperAdmin") || clsSqlHelper.Select_AccessToButton(int64, Convert.ToInt64(HttpContext.Current.Session["PlanId"]), "AllAccidentList");
                long? createById = allAccident ? new long?() : new long?(int64);
                string dateOfAccidentEnd = (string)null;
                if (dateOfAccident.IndexOf("-") > 0)
                {
                    string[] strArray = dateOfAccident.Split('-');
                    dateOfAccident = strArray[0];
                    dateOfAccidentEnd = strArray[1];
                }
                int? provinceId1 = string.IsNullOrEmpty(provinceId) || provinceId == "-1" ? new int?() : new int?(Convert.ToInt32(provinceId));
                int? cityId1 = string.IsNullOrEmpty(cityId) || cityId == "-1" ? new int?() : new int?(Convert.ToInt32(cityId));
                int? axisId1 = string.IsNullOrEmpty(axisId) || axisId == "-1" ? new int?() : new int?(Convert.ToInt32(axisId));
                bool? inNativeArea1 = string.IsNullOrEmpty(inNativeArea) ? new bool?() : new bool?(Convert.ToBoolean(inNativeArea));
                bool? isHoliday1 = string.IsNullOrEmpty(isHoliday) ? new bool?() : new bool?(Convert.ToBoolean(isHoliday));
                bool? isNotLocalDriver1 = string.IsNullOrEmpty(isNotLocalDriver) ? new bool?() : new bool?(Convert.ToBoolean(isNotLocalDriver));
                string sixthCapRange = "";
                long? eventProcessId1 = string.IsNullOrEmpty(eventProcessId) || eventProcessId == "-1" ? new long?() : new long?(Convert.ToInt64(eventProcessId));
                int? startYear1 = string.IsNullOrEmpty(startYear) ? new int?() : new int?(Convert.ToInt32(startYear));
                int? endYear1 = string.IsNullOrEmpty(endYear) ? new int?() : new int?(Convert.ToInt32(endYear));
                type = "SP_All_EventProcess_" + type;
                string firstCap;
                string secondCap;
                string thirdCap;
                string fourthCap;
                string fifthCap;
                string sixthCap;
                string firstCapRange;
                string secondCapRange;
                string thirdCapRange;
                string fourthCapRange;
                string fifthCapRange;
                string yearList;
                clsSqlHelper.SearchInEventProcess(createById, type, status, dateOfAccident, dateOfAccidentEnd, crashType, "", provinceId1, getDays, month, collisionOfA, lightingStatus, weather, carriageWayDirection, typeOfWay, carCrashLocation, locationLandUse, fromAgeDriver, toAgeDriver, allAccident, cityId1, inNativeArea1, isHoliday1, collisionChild1, collisionChild2, axisId1, eventProcessId1, startYear1, endYear1, isNotLocalDriver1, out firstCap, out secondCap, out thirdCap, out fourthCap, out fifthCap, out sixthCap, out firstCapRange, out secondCapRange, out thirdCapRange, out fourthCapRange, out fifthCapRange, out sixthCapRange, out yearList);
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            IsSuccess = "true",
            Message = firstCap + "#" + secondCap + "#" + thirdCap + "#" + fourthCap + "#" + fifthCap + "#" + sixthCap,
            MessageTwo = firstCapRange + "#" + secondCapRange + "#" + thirdCapRange + "#" + fourthCapRange + "#" + fifthCapRange + "#" + sixthCapRange,
            MessageThree = yearList
          }
        };
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            IsSuccess = "false",
            Message = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید"
          }
        };
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetFillCity(string provinceId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return new List<GetSubmit>()
          {
            new GetSubmit()
            {
              Message = "صفحه را مجدد بارگذاری نمایید!",
              IsSuccess = "false"
            }
          };
                if (!string.IsNullOrEmpty(provinceId) && !(provinceId == "-1"))
                    return clsSqlHelper.FillCityWithProvince(Convert.ToInt32(provinceId));
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            Message = "ابتدا باید یک استان را انتخاب نمایید!",
            IsSuccess = "false"
          }
        };
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            Message = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید",
            IsSuccess = "false"
          }
        };
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetFillEvent()
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (CheckSession.ControlSession())
                    return clsSqlHelper.FillEventProcess();
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            Message = "صفحه را مجدد بارگذاری نمایید!",
            IsSuccess = "false"
          }
        };
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            Message = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید",
            IsSuccess = "false"
          }
        };
            }
        }

        [WebMethod]
        public static List<GetSubmit> SaveEvent(string eventName, string dateRange)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            ClsHelper clsHelper = new ClsHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return new List<GetSubmit>()
          {
            new GetSubmit()
            {
              Message = "صفحه را مجدد بارگذاری نمایید!",
              IsSuccess = "false"
            }
          };
                if (string.IsNullOrEmpty(eventName))
                    return new List<GetSubmit>()
          {
            new GetSubmit()
            {
              Message = "نام رویداد را وارد نمایید!",
              IsSuccess = "false"
            }
          };
                if (string.IsNullOrEmpty(dateRange))
                    return new List<GetSubmit>()
          {
            new GetSubmit()
            {
              Message = "بازه زمانی رویداد را انتخاب نمایید!",
              IsSuccess = "false"
            }
          };
                if (dateRange.IndexOf("-") > 0)
                {
                    long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                    string[] strArray = dateRange.Split('-');
                    string en1 = clsHelper.ConvertFaNumberToEn(strArray[0]);
                    string en2 = clsHelper.ConvertFaNumberToEn(strArray[1]);
                    long num = clsSqlHelper.Insert_EventProcess(eventName, en1, en2, int64);
                    if (num == -1L)
                        return new List<GetSubmit>()
            {
              new GetSubmit()
              {
                Message = "نام وارد شده قبلا در سیستم ثبت شده!",
                IsSuccess = "false"
              }
            };
                    return new List<GetSubmit>()
          {
            new GetSubmit()
            {
              Id = num.ToString(),
              Message = "رویداد جدید با موفقیت ثبت شد!",
              IsSuccess = "true"
            }
          };
                }
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            Message = "بازه زمانی رویداد بدرستی انتخاب نشده!",
            IsSuccess = "false"
          }
        };
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            Message = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید",
            IsSuccess = "false"
          }
        };
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetFillAxis(string provinceId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return new List<GetSubmit>()
          {
            new GetSubmit()
            {
              Message = "صفحه را مجدد بارگذاری نمایید!",
              IsSuccess = "false"
            }
          };
                if (!string.IsNullOrEmpty(provinceId) && !(provinceId == "-1"))
                    return clsSqlHelper.FillAxisWithProvince(Convert.ToInt32(provinceId));
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            Message = "ابتدا باید یک استان را انتخاب نمایید!",
            IsSuccess = "false"
          }
        };
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            Message = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید",
            IsSuccess = "false"
          }
        };
            }
        }

    }
}