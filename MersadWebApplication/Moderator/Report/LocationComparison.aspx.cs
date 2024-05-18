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
    public partial class LocationComparison : System.Web.UI.Page
    {
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();
        private readonly ClsHelper _helper = new ClsHelper();

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!CheckSession.ControlSession() || this.IsPostBack)
                    return;
                this._sqlHelper.FillAllHtmlSelect(this.cmbProvinceSearch, "Dashboard", "SP_Fill_TBL_Province");
            }
            catch (Exception ex)
            {
                this.lblMessage.InnerHtml = this._helper.ErrorMessages("خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید");
                this.lblMessage.Visible = true;
                this._sqlHelper.Insert_Exception("", ex.ToString());
            }
        }

        [WebMethod]
        public static List<GetLocationComparison> GetSearchLocationComparison(
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
          string isNotLocalDriver)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return new List<GetLocationComparison>()
          {
            new GetLocationComparison()
            {
              CenterLocation = "false",
              CityName = "صفحه را مجدد بارگذاری نمایید!"
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
                string sp = "SP_All_ChartLocationComparison_Type";
                List<GetLocationComparison> locationComparison = new List<GetLocationComparison>();
                int? nullable = provinceId1;
                int num1 = 13;
                if (nullable.GetValueOrDefault() == num1 & nullable.HasValue && !cityId1.HasValue)
                {
                    int[] numArray = new int[29]
                    {
            130,
            131,
            132,
            133,
            134,
            135,
            136,
            137,
            138,
            139,
            140,
            141,
            142,
            143,
            144,
            145,
            146,
            147,
            148,
            149,
            358,
            359,
            360,
            361,
            362,
            363,
            364,
            365,
            366
                    };
                    foreach (int num2 in numArray)
                    {
                        List<GetLocationComparison> collection = clsSqlHelper.SearchInLocationComparison(createById, sp, type, status, dateOfAccident, dateOfAccidentEnd, crashType, "", provinceId1, getDays, month, collisionOfA, lightingStatus, weather, carriageWayDirection, typeOfWay, carCrashLocation, locationLandUse, fromAgeDriver, toAgeDriver, allAccident, new int?(num2), inNativeArea1, isHoliday1, collisionChild1, collisionChild2, axisId1, isNotLocalDriver1);
                        locationComparison.AddRange((IEnumerable<GetLocationComparison>)collection);
                    }
                }
                else
                {
                    provinceId1 = new int?(13);
                    List<GetLocationComparison> collection = clsSqlHelper.SearchInLocationComparison(createById, sp, type, status, dateOfAccident, dateOfAccidentEnd, crashType, "", provinceId1, getDays, month, collisionOfA, lightingStatus, weather, carriageWayDirection, typeOfWay, carCrashLocation, locationLandUse, fromAgeDriver, toAgeDriver, allAccident, cityId1, inNativeArea1, isHoliday1, collisionChild1, collisionChild2, axisId1, isNotLocalDriver1);
                    locationComparison.AddRange((IEnumerable<GetLocationComparison>)collection);
                }
                return locationComparison;
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return new List<GetLocationComparison>()
        {
          new GetLocationComparison()
          {
            CenterLocation = "false",
            FirstCap = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید"
          }
        };
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetFillCityEnName(string cityId)
        {
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
                if (!string.IsNullOrEmpty(cityId) && !(cityId == "-1"))
                    return clsSqlHelper.GetCityEnglishName(Convert.ToInt32(cityId));
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            IsSuccess = "false",
            Message = "جاوا اسکریپت مرورگر خود را فعال کنید!"
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