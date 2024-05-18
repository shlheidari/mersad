using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator.Map
{
    public partial class SafetyIndex : System.Web.UI.Page
    {
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!CheckSession.ControlSession() || this.IsPostBack)
                    return;
                string population;
                string areaNumber;
                this._sqlHelper.SafetyIndexCityDetails(out population, out areaNumber);
                this.hidPopulation.Value = population;
                this.hidAreaNumber.Value = areaNumber;
            }
            catch (Exception ex)
            {
                this._sqlHelper.Insert_Exception("", ex.ToString());
            }
        }

        [WebMethod]
        public static List<GetSafetyIndex> GetSearchSafetyIndex(
          string dateOfAccident,
          string crashType,
          string roadway,
          string locationLandUse,
          string visualObstruction,
          string roadDefects,
          string isHoliday,
          string collisionOfA,
          string weather,
          string typeOfVehicle,
          string vehicleType,
          string finalReason,
          string collisionChild1,
          string collisionChild2,
          string isLocalDriver)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return new List<GetSafetyIndex>()
          {
            new GetSafetyIndex()
            {
              Abadan = "-1",
              Ahvaz = "صفحه را مجدد بارگذاری نمایید!"
            }
          };
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                bool allAccident = HttpContext.Current.Session["UserRoleName"].Equals((object)"SuperAdmin") || clsSqlHelper.Select_AccessToButton(int64, Convert.ToInt64(HttpContext.Current.Session["PlanId"]), "AllAccidentList");
                long? submitByUserId = allAccident ? new long?() : new long?(int64);
                string dateOfAccidentEnd = (string)null;
                if (dateOfAccident.IndexOf("-") > 0)
                {
                    string[] strArray = dateOfAccident.Split('-');
                    dateOfAccident = strArray[0];
                    dateOfAccidentEnd = strArray[1];
                }
                bool? isHoliday1 = string.IsNullOrEmpty(isHoliday) ? new bool?() : new bool?(Convert.ToBoolean(isHoliday));
                bool? isLocalDriver1 = string.IsNullOrEmpty(isLocalDriver) ? new bool?() : new bool?(Convert.ToBoolean(isLocalDriver));
                List<GetSafetyIndex> searchSafetyIndex = clsSqlHelper.SearchInSafetyIndex(dateOfAccident, dateOfAccidentEnd, allAccident, crashType, submitByUserId, roadway, locationLandUse, visualObstruction, roadDefects, isHoliday1, collisionOfA, weather, typeOfVehicle, vehicleType, finalReason, collisionChild1, collisionChild2, isLocalDriver1);
                if (searchSafetyIndex.Count != 0)
                    return searchSafetyIndex;
                return new List<GetSafetyIndex>()
        {
          new GetSafetyIndex()
          {
            Abadan = "-2",
            Ahvaz = "داده ای یافت نشد!"
          }
        };
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return new List<GetSafetyIndex>()
        {
          new GetSafetyIndex()
          {
            Abadan = "-3",
            Ahvaz = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید"
          }
        };
            }
        }

        [WebMethod]
        public static List<MersadWebApplication.GetHeatMapDetails> GetHeatMapDetails(string idList)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return new List<MersadWebApplication.GetHeatMapDetails>()
          {
            new MersadWebApplication.GetHeatMapDetails()
            {
              TimeOfAccident = "-1",
              InjuredCount = "صفحه را مجدد بارگذاری نمایید!"
            }
          };
                List<MersadWebApplication.GetHeatMapDetails> heatMapDetails = clsSqlHelper.GetHeatMapDetails(idList);
                if (heatMapDetails.Count != 0)
                    return heatMapDetails;
                return new List<MersadWebApplication.GetHeatMapDetails>()
        {
          new MersadWebApplication.GetHeatMapDetails()
          {
            TimeOfAccident = "-1",
            InjuredCount = "داده ای یافت نشد!"
          }
        };
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return new List<MersadWebApplication.GetHeatMapDetails>()
        {
          new MersadWebApplication.GetHeatMapDetails()
          {
            TimeOfAccident = "-1",
            InjuredCount = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید"
          }
        };
            }
        }

        private static List<GetSubmit> GetSubmitMethod(
          string id,
          string msg,
          string msgTwo,
          string success)
        {
            return new List<GetSubmit>()
      {
        new GetSubmit()
        {
          Id = id,
          Message = msg,
          MessageTwo = msgTwo,
          IsSuccess = success
        }
      };
        }

    }
}