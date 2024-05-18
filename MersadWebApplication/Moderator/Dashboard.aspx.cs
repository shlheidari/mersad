using MersadWebApplication.Data;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator
{
    public partial class Dashboard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                GetAllAxis();
                if (!CheckSession.ControlSession() || this.IsPostBack)
                    return;
                this._sqlHelper.FiltrafficZonecity(this.cmbProvinceSearch,"traffic", "FillCityID", "trafficzone");
                
                long int64 = Convert.ToInt64(this.Session["UserId"]);
                string area;
                this._sqlHelper.GetEditUser(int64, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out area, out string _);
                bool isSupeAdmin = HttpContext.Current.Session["UserRoleName"].Equals((object)"SuperAdmin");
                this.hidLocation.Value = isSupeAdmin ? "LoadIranMap" : area;
                JavaScriptSerializer scriptSerializer = new JavaScriptSerializer();
                bool allAccident = isSupeAdmin || this._sqlHelper.Select_AccessToButton(int64, Convert.ToInt64(HttpContext.Current.Session["PlanId"]), "AllAccidentList");
                this.hidAccidentLocation.Value = scriptSerializer.Serialize((object)this._sqlHelper.GetAllLocation(1000, new long?(int64), "All", "24", (string)null, "All", allAccident, isSupeAdmin));
            }
            catch (Exception ex)
            {
                this.lblMessage.InnerHtml = this._helper.ErrorMessages("خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید");
                this.lblMessage.Visible = true;
                this._sqlHelper.Insert_Exception("", ex.ToString());
            }
        }






        [WebMethod]
        public static List<GetPopupAccident> GetSlideShow(string accidentId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return new List<GetPopupAccident>()
          {
            new GetPopupAccident()
            {
              SlideShow = "صفحه را مجدد بارگذاری نمایید!",
              IsSuccess = "false"
            }
          };
                if (string.IsNullOrEmpty(accidentId))
                    return new List<GetPopupAccident>()
          {
            new GetPopupAccident()
            {
              SlideShow = "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!",
              IsSuccess = "false"
            }
          };
                int count;
                string slideShow = clsSqlHelper.GetSlideShow(Convert.ToInt64(accidentId), out count);
                string crashDate;
                string crashTime;
                string crashType;
                string deadCount;
                string injuredCount;
                string carCount;
                string car2Count;
                string car3Count;
                string motorCount;
                string passengerCount;
                string pedestrianCount;
                string bikeRiderCount;
                string collisionOfA;
                string collisionOfATwo;
                string typeOfCollision;
                clsSqlHelper.GetCrashForPopup(Convert.ToInt64(accidentId), out crashDate, out crashTime, out crashType, out deadCount, out injuredCount, out carCount, out car2Count, out car3Count, out motorCount, out passengerCount, out pedestrianCount, out bikeRiderCount, out collisionOfA, out collisionOfATwo, out typeOfCollision);
                return new List<GetPopupAccident>()
        {
          new GetPopupAccident()
          {
            SlideShow = slideShow,
            Count = count.ToString(),
            CrashDate = crashDate,
            CrashTime = crashTime,
            CrashType = crashType,
            DeadCount = deadCount,
            InjuredCount = injuredCount,
            CarCount = carCount,
            Car2Count = car2Count,
            Car3Count = car3Count,
            MotorCount = motorCount,
            PassengerCount = passengerCount,
            PedestrianCount = pedestrianCount,
            BikeRiderCount = bikeRiderCount,
            CollisionOfA = collisionOfA,
            CollisionOfATwo = collisionOfATwo,
            TypeOfCollision = typeOfCollision,
            IsSuccess = "true"
          }
        };
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return new List<GetPopupAccident>()
        {
          new GetPopupAccident()
          {
            SlideShow = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید",
            IsSuccess = "false"
          }
        };
            }
        }

        public static List<GetFillAxis> fillAxes = new List<GetFillAxis>();


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

        void GetAccidentListList()
        {
#pragma warning disable CS0219 // The variable 'status' is assigned but its value is never used
            string status;
#pragma warning restore CS0219 // The variable 'status' is assigned but its value is never used
#pragma warning disable CS0219 // The variable 'dateOfAccident' is assigned but its value is never used
            string dateOfAccident;
#pragma warning restore CS0219 // The variable 'dateOfAccident' is assigned but its value is never used
#pragma warning disable CS0219 // The variable 'crashType' is assigned but its value is never used
            string crashType;
#pragma warning restore CS0219 // The variable 'crashType' is assigned but its value is never used
#pragma warning disable CS0219 // The variable 'provinceSearch' is assigned but its value is never used
            string provinceSearch;
#pragma warning restore CS0219 // The variable 'provinceSearch' is assigned but its value is never used
#pragma warning disable CS0219 // The variable 'cityId' is assigned but its value is never used
            string cityId;
#pragma warning restore CS0219 // The variable 'cityId' is assigned but its value is never used
#pragma warning disable CS0219 // The variable 'location' is assigned but its value is never used
            string location;
#pragma warning restore CS0219 // The variable 'location' is assigned but its value is never used
#pragma warning disable CS0219 // The variable 'inNativeArea' is assigned but its value is never used
            string inNativeArea;
#pragma warning restore CS0219 // The variable 'inNativeArea' is assigned but its value is never used
#pragma warning disable CS0219 // The variable 'axisId' is assigned but its value is never used
            string axisId;
#pragma warning restore CS0219 // The variable 'axisId' is assigned but its value is never used
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();



            status = "";
            dateOfAccident = "";
            crashType = "";
            provinceSearch = "";
            cityId = "";
            location = "";
            inNativeArea = "";
            axisId = "";










        }


       

        [WebMethod]
      static  public  List<GetMapAccident> GetAccidentList(
          string status,
          string dateOfAccident,
          string crashType,
          string provinceSearch,
          string cityId,
          string location,
          string inNativeArea,
          string axisId)
        {

            if (provinceSearch.Contains("نام شهر"))
            {
                provinceSearch = null;
            }
            if (cityId.Contains("کد منطقه شهرداری"))
            {
                cityId = null;
            }
             
           
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return new List<GetMapAccident>()
          {
            new GetMapAccident()
            {
              Id = "0",
              Location = "صفحه را مجدد بارگذاری نمایید!"
            }
          };
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                bool isSupeAdmin = HttpContext.Current.Session["UserRoleName"].Equals((object)"SuperAdmin");
                bool allAccident = isSupeAdmin || clsSqlHelper.Select_AccessToButton(int64, Convert.ToInt64(HttpContext.Current.Session["PlanId"]), "AllAccidentList");
                string dateOfAccidentEnd = (string)null;
                if (dateOfAccident.IndexOf("-") > 0)
                {
                    string[] strArray = dateOfAccident.Split('-');
                    dateOfAccident = strArray[0];
                    dateOfAccidentEnd = strArray[1];
                }
                int? provinceId = string.IsNullOrEmpty(provinceSearch) || provinceSearch == "-1" ? new int?() : new int?(Convert.ToInt32(provinceSearch));
                //int? provinceId = 13;
                int? cityId1 = string.IsNullOrEmpty(cityId) || cityId == "-1" ? new int?() : new int?(Convert.ToInt32(cityId));
                //int? cityId1 =137;
                int? axisId1 = string.IsNullOrEmpty(axisId) || axisId == "-1" ? new int?() : new int?(Convert.ToInt32(axisId));
                //int? axisId1 = null;

                //bool? inNativeArea1 = string.IsNullOrEmpty(inNativeArea) ? new bool?() : new bool?(Convert.ToBoolean(inNativeArea));
                bool? inNativeArea1 =false;

                List<GetMapAccident> searchAllLocation = clsSqlHelper.GetSearchAllLocation(200, new long?(), new long?(int64), status, dateOfAccident, dateOfAccidentEnd, crashType, allAccident, provinceId, cityId1, location, isSupeAdmin, inNativeArea1, axisId1);
                if (searchAllLocation.Count != 0)
                    return searchAllLocation;

                
                return new List<GetMapAccident>()
        {
          new GetMapAccident()
          {
            Id = "-1",
            Location = "داده ای یافت نشد!"
          }
        };
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return new List<GetMapAccident>()
        {
          new GetMapAccident()
          {
            Id = "0",
            Location = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید"
          }
        };
            }
        }




        [WebMethod]
        public static List<GetMapAccident> GetAccidentLista(
         )
        {
            List<GetMapAccident> ls= new List<GetMapAccident>();
            GetMapAccident ass = new GetMapAccident()
            {
                Location= "0",
                CheckByCampAdmin="",
                CheckByPoliceStationAdmin="",
                CrashType= ""
            };
            ls.Add(ass);
            return ls;

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
        public static List<GetSubmit> GetFillMasterData()
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
                string timeWithMonthName = new ClsHelper().GetPersianDateTimeWithMonthName(DateTime.Now);
                string deadCountDaily;
                string injuredCountDaily;
                string deadCountYearly;
                string injuredCountYearly;
                clsSqlHelper.GetDeadOrInjured(out deadCountDaily, out injuredCountDaily, out deadCountYearly, out injuredCountYearly);
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            Message = injuredCountDaily + "," + deadCountDaily + "," + injuredCountYearly + "," + deadCountYearly,
            MessageTwo = timeWithMonthName,
            MessageThree = HttpContext.Current.Session["FullUserName"].ToString(),
            IsSuccess = "true"
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

        // Token: 0x04000114 RID: 276
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();

        // Token: 0x04000115 RID: 277
        private readonly ClsHelper _helper = new ClsHelper();

        protected void BtnExport_Click(object sender, EventArgs e)
        {

        }
    }
}