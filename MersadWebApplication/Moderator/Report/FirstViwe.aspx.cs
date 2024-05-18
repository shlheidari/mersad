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
    public partial class FirstViwe : System.Web.UI.Page
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
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                GetAllAxis();
                if (!CheckSession.ControlSession() || this.IsPostBack)
                    return;
                this._sqlHelper.FiltrafficZonecity(this.cmbProvinceSearch, "traffic", "FillCityID", "trafficzone");
                long int64 = Convert.ToInt64(this.Session["UserId"]);
                bool allAccident = this.Session["UserRoleName"].Equals((object)"SuperAdmin") || this._sqlHelper.Select_AccessToButton(int64, Convert.ToInt64(this.Session["PlanId"]), "AllAccidentList");
                string roadDefects;
                string pieRoadDefects;
                string visualObstruction;
                string pieVisualObstruction;
                string pieRoadwayWidth;
                string geometry1Tarafe;
                string geometry2Tarafe;
                string geometry2TwoTarafe;
                string bubbleUserSpeed;
                string bubbleUserGetSpeed;
                this._sqlHelper.SearchInFirstViewChart(allAccident ? new long?() : new long?(int64), "", "1Year", "", "All", "", new int?(), "All", "", "", "", "", "", "", "", "", "", "", allAccident, new int?(), new bool?(), new bool?(), "", "", new int?(), new bool?(), out roadDefects, out pieRoadDefects, out visualObstruction, out pieVisualObstruction, out pieRoadwayWidth, out geometry1Tarafe, out geometry2Tarafe, out geometry2TwoTarafe, out bubbleUserSpeed, out bubbleUserGetSpeed);
                this.hidFBcEffectiveWayDefects.Value = roadDefects;
                this.hidPEffectiveWayDefects.Value = pieRoadDefects;
                this.hidFBcBarriersToVision.Value = visualObstruction;
                this.hidPBarriersToVision.Value = pieVisualObstruction;
                this.hidPChartRoadwayWidth.Value = pieRoadwayWidth;
                this.hidFBcTheGeometry.Value = geometry1Tarafe + "|" + geometry2Tarafe + "|" + geometry2TwoTarafe;
                this.hidBubbleUserSpeed.Value = bubbleUserSpeed + "|" + bubbleUserGetSpeed;
            }
            catch (Exception ex)
            {
                this.lblMessage.InnerHtml = this._helper.ErrorMessages("خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید");
                this.lblMessage.Visible = true;
                this._sqlHelper.Insert_Exception("", ex.ToString());
            }
        }

        [WebMethod]
        public static List<GetSubmit> LoadAllHide()
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                return !CheckSession.ControlSession() ? FirstViwe.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false") : FirstViwe.GetSubmitMethod("", clsSqlHelper.ArrayFBcEffectiveWayDefects(), "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return FirstViwe.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetSearchFirstView(
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
                    return new List<GetSubmit>()
          {
            new GetSubmit()
            {
              IsSuccess = "false",
              Message = "صفحه را مجدد بارگذاری نمایید!"
            }
          };


                if (provinceId.Contains("نام شهر"))
                {
                    provinceId = null;
                }
                if (cityId.Contains("کد منطقه شهرداری"))
                {
                    cityId = null;
                }
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
                string roadDefects;
                string pieRoadDefects;
                string visualObstruction;
                string pieVisualObstruction;
                string pieRoadwayWidth;
                string geometry1Tarafe;
                string geometry2Tarafe;
                string geometry2TwoTarafe;
                string bubbleUserSpeed;
                string bubbleUserGetSpeed;
                string maskouni, edaritejari, amouzeshi, gheiremaskuni, keshavarzi, tafrihi, sanati, sayer;
                using (DataManagementDataContext context = new DataManagementDataContext())
                {

                    maskouni = GetReturn("1");
                    edaritejari = GetReturn("2");
                    amouzeshi = GetReturn("3");
                    gheiremaskuni = GetReturn("4");
                    keshavarzi = GetReturn("5");
                    tafrihi = GetReturn("6");
                    sanati = GetReturn("7");
                    sayer = GetReturn("8");





                }
                clsSqlHelper.SearchInFirstViewChart(createById, status, dateOfAccident, dateOfAccidentEnd, crashType, "", provinceId1, getDays, month, collisionOfA, lightingStatus, weather, carriageWayDirection, typeOfWay, carCrashLocation, locationLandUse, fromAgeDriver, toAgeDriver, allAccident, cityId1, inNativeArea1, isHoliday1, collisionChild1, collisionChild2, axisId1, isNotLocalDriver1, out roadDefects, out pieRoadDefects, out visualObstruction, out pieVisualObstruction, out pieRoadwayWidth, out geometry1Tarafe, out geometry2Tarafe, out geometry2TwoTarafe, out bubbleUserSpeed, out bubbleUserGetSpeed);
                return new List<GetSubmit>()

        {
          new GetSubmit()
          {
            IsSuccess = "true",
            Message =
            roadDefects +
            "#" + pieRoadDefects +
            "#" + visualObstruction +
            "#" + pieVisualObstruction
            + "#" + pieRoadwayWidth +
            "#" + geometry1Tarafe +
            "#" + geometry2Tarafe +
            "#" + geometry2TwoTarafe +
            "#" + bubbleUserSpeed +
            "#" + bubbleUserGetSpeed+
             "#" + maskouni+
              "#" + edaritejari+
              "#" + amouzeshi+
              "#" + gheiremaskuni+
              "#" + keshavarzi+
              "#" + tafrihi+
              "#" + sanati+
              "#" + sayer


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

        public static string GetReturn(string root)
        {
            string ret = "";
            using (DataManagementDataContext context = new DataManagementDataContext())
            {


                #region Maskouni
                var dsGet1maskouni = (from m in context.CreatDistance(root)
                                      select m).FirstOrDefault();
                string s10ta30 = dsGet1maskouni.item10ta30.ToString();
                ret = dsGet1maskouni.returnFinal;

                #endregion



                return ret;
            }
        }



        [WebMethod]
        public static List<GetSubmit> GetSearchFirstViewTime(
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
                string day0;
                string day1;
                string day2;
                string day3;
                string day4;
                string day5;
                string day6;
                string month0;
                string month1;
                string month2;
                string month3;
                string month4;
                string month5;
                string month6;
                string month7;
                string month8;
                string month9;
                string month10;
                string month11;
                string week0;
                string week1;
                string week2;
                string week3;
                string week4;
                string week5;
                string week6;
                string week7;
                string week8;
                string week9;
                string week10;
                string week11;
                string holiday;
                string notHoliday;
                clsSqlHelper.SearchInFirstViewChartTime(createById, status, dateOfAccident, dateOfAccidentEnd, crashType, "", provinceId1, getDays, month, collisionOfA, lightingStatus, weather, carriageWayDirection, typeOfWay, carCrashLocation, locationLandUse, fromAgeDriver, toAgeDriver, allAccident, cityId1, inNativeArea1, isHoliday1, collisionChild1, collisionChild2, axisId1, isNotLocalDriver1, out day0, out day1, out day2, out day3, out day4, out day5, out day6, out month0, out month1, out month2, out month3, out month4, out month5, out month6, out month7, out month8, out month9, out month10, out month11, out week0, out week1, out week2, out week3, out week4, out week5, out week6, out week7, out week8, out week9, out week10, out week11, out holiday, out notHoliday);
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            IsSuccess = "true",
            Message = day0 + "#" + day1 + "#" + day2 + "#" + day3 + "#" + day4 + "#" + day5 + "#" + day6,
            MessageTwo = month0 + "#" + month1 + "#" + month2 + "#" + month3 + "#" + month4 + "#" + month5 + "#" + month6 + "#" + month7 + "#" + month8 + "#" + month9 + "#" + month10 + "#" + month11,
            Id = week0 + "#" + week1 + "#" + week2 + "#" + week3 + "#" + week4 + "#" + week5 + "#" + week6 + "#" + week7 + "#" + week8 + "#" + week9 + "#" + week10 + "#" + week11,
            MessageThree = holiday + "#" + notHoliday
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
        public static List<GetSubmit> GetSearchFirstViewVehicle(
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
                    return new List<GetSubmit>()
          {
            new GetSubmit()
            {
              IsSuccess = "false",
              Message = "صفحه را مجدد بارگذاری نمایید!"
            }
          };
                if (provinceId.Contains("نام شهر"))
                {
                    provinceId = null;
                }
                if (cityId.Contains("کد منطقه شهرداری"))
                {
                    cityId = null;
                }
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
                string vehicleBar0;
                string vehicleBar1;
                string vehicleBar2;
                string vehicleBar3;
                string vehicleBar4;
                string vehicleBar5;
                string vehicleBar6;
                string vehicleBar7;
                string diagnosis0;
                string diagnosis1;
                string diagnosis2;
                string diagnosis3;
                string diagnosis4;
                string diagnosis5;
                string diagnosis6;
                string diagnosis7;
                string maneuvering0;
                string maneuvering1;
                string maneuvering2;
                string maneuvering3;
                string maneuvering4;
                string maneuvering5;
                string maneuvering6;
                string maneuvering7;
                string maneuvering8;
                string maneuvering9;
                string maneuvering10;
                string maneuvering11;
                string codeCausing0;
                string codeCausing1;
                string codeCausing2;
                string codeCausing3;
                string codeCausing4;
                string codeCausing5;
                string automobilePie;
                string vehicleType;
                string countIsOrNotLocal;
                clsSqlHelper.SearchInFirstViewChartVehicle(createById, status, dateOfAccident, dateOfAccidentEnd, crashType, "", provinceId1, getDays, month, collisionOfA, lightingStatus, weather, carriageWayDirection, typeOfWay, carCrashLocation, locationLandUse, fromAgeDriver, toAgeDriver, allAccident, cityId1, inNativeArea1, isHoliday1, collisionChild1, collisionChild2, axisId1, isNotLocalDriver1, out vehicleBar0, out vehicleBar1, out vehicleBar2, out vehicleBar3, out vehicleBar4, out vehicleBar5, out vehicleBar6, out vehicleBar7, out diagnosis0, out diagnosis1, out diagnosis2, out diagnosis3, out diagnosis4, out diagnosis5, out diagnosis6, out diagnosis7, out maneuvering0, out maneuvering1, out maneuvering2, out maneuvering3, out maneuvering4, out maneuvering5, out maneuvering6, out maneuvering7, out maneuvering8, out maneuvering9, out maneuvering10, out maneuvering11, out codeCausing0, out codeCausing1, out codeCausing2, out codeCausing3, out codeCausing4, out codeCausing5, out automobilePie, out vehicleType, out countIsOrNotLocal);

                string aa = automobilePie + "#" + vehicleType;

                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            IsSuccess = "true",
            Message = vehicleBar0 + "#" + vehicleBar1 + "#" + vehicleBar2 + "#" + vehicleBar3 + "#" + vehicleBar4 + "#" + vehicleBar5 + "#" + vehicleBar6 + "#" + vehicleBar7,
            MessageTwo = diagnosis0 + "#" + diagnosis1 + "#" + diagnosis2 + "#" + diagnosis3 + "#" + diagnosis4 + "#" + diagnosis5 + "#" + diagnosis6 + "#" + diagnosis7,
            Id = maneuvering0 + "," + maneuvering1 + "," + maneuvering2 + "," + maneuvering3 + "," + maneuvering4 + "," + maneuvering5 + "," + maneuvering6 + "," + maneuvering7 + "," + maneuvering8 + "," + maneuvering9 + "," + maneuvering10 + "," + maneuvering11,
            MessageThree = codeCausing0 + "," + codeCausing1 + "," + codeCausing2 + "," + codeCausing3 + "," + codeCausing4 + "," + codeCausing5,
            MessageFour = automobilePie + "#" + vehicleType,
            MessageFive = countIsOrNotLocal
          }
        };
#pragma warning disable CS0162 // Unreachable code detected

#pragma warning restore CS0162 // Unreachable code detected
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
        public static List<GetSubmit> GetSearchFirstViewUser(
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
                    return new List<GetSubmit>()
          {
            new GetSubmit()
            {
              IsSuccess = "false",
              Message = "صفحه را مجدد بارگذاری نمایید!"
            }
          };
                if (provinceId.Contains("نام شهر"))
                {
                    provinceId = null;
                }
                if (cityId.Contains("کد منطقه شهرداری"))
                {
                    cityId = null;
                }
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
                string peapleInAccident;
                string pedestriansSituation;
                string validityDriver0;
                string validityDriver1;
                string validityDriver2;
                string validityDriver3;
                string useBeltsHelmets0InjuredDead0;
                string useBeltsHelmets0InjuredDead1;
                string useBeltsHelmets1InjuredDead0;
                string useBeltsHelmets1InjuredDead1;
                string useBeltsHelmets2InjuredDead0;
                string useBeltsHelmets2InjuredDead1;
                string useBeltsHelmets3InjuredDead0;
                string useBeltsHelmets3InjuredDead1;
                string sexulityInAccidentMan;
                string sexulityInAccidentWoman;
                string ageInAccident0;
                string ageInAccident1;
                string ageInAccident2;
                string ageInAccident3;
                string ageInAccident4;
                string ageInAccident5;
                clsSqlHelper.SearchInFirstViewChartUser(createById, status, dateOfAccident, dateOfAccidentEnd, crashType, "", provinceId1, getDays, month, collisionOfA, lightingStatus, weather, carriageWayDirection, typeOfWay, carCrashLocation, locationLandUse, fromAgeDriver, toAgeDriver, allAccident, cityId1, inNativeArea1, isHoliday1, collisionChild1, collisionChild2, axisId1, isNotLocalDriver1, out peapleInAccident, out pedestriansSituation, out validityDriver0, out validityDriver1, out validityDriver2, out validityDriver3, out useBeltsHelmets0InjuredDead0, out useBeltsHelmets0InjuredDead1, out useBeltsHelmets1InjuredDead0, out useBeltsHelmets1InjuredDead1, out useBeltsHelmets2InjuredDead0, out useBeltsHelmets2InjuredDead1, out useBeltsHelmets3InjuredDead0, out useBeltsHelmets3InjuredDead1, out sexulityInAccidentMan, out sexulityInAccidentWoman, out ageInAccident0, out ageInAccident1, out ageInAccident2, out ageInAccident3, out ageInAccident4, out ageInAccident5);
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            IsSuccess = "true",
            Message = peapleInAccident + "#" + pedestriansSituation,
            MessageTwo = validityDriver0 + "#" + validityDriver1 + "#" + validityDriver2 + "#" + validityDriver3,
            Id = useBeltsHelmets0InjuredDead0 + "#" + useBeltsHelmets0InjuredDead1 + "#" + useBeltsHelmets1InjuredDead0 + "#" + useBeltsHelmets1InjuredDead1 + "#" + useBeltsHelmets2InjuredDead0 + "#" + useBeltsHelmets2InjuredDead1 + "#" + useBeltsHelmets3InjuredDead0 + "#" + useBeltsHelmets3InjuredDead1,
            MessageThree = ageInAccident0 + "#" + ageInAccident1 + "#" + ageInAccident2 + "#" + ageInAccident3 + "#" + ageInAccident4 + "#" + ageInAccident5,
            MessageFour = sexulityInAccidentMan + "#" + sexulityInAccidentWoman
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
        public static List<GetSubmit> GetSearchFirstViewAccidentInfo(
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
                string CollisionOfTwo;
                string TypeOfCollision;
                string CollisionOfOne;
                string OtherTypeOfCollision;
                clsSqlHelper.SearchInFirstViewChartAccidentInfo(createById, status, dateOfAccident, dateOfAccidentEnd, crashType, "", provinceId1, getDays, month, collisionOfA, lightingStatus, weather, carriageWayDirection, typeOfWay, carCrashLocation, locationLandUse, fromAgeDriver, toAgeDriver, allAccident, cityId1, inNativeArea1, isHoliday1, collisionChild1, collisionChild2, axisId1, isNotLocalDriver1, out CollisionOfTwo, out TypeOfCollision, out CollisionOfOne, out OtherTypeOfCollision);
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            IsSuccess = "true",
            Message = CollisionOfTwo,
            MessageTwo = TypeOfCollision,
            Id = CollisionOfOne,
            MessageThree = OtherTypeOfCollision
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
                    return FirstViwe.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                return string.IsNullOrEmpty(provinceId) || provinceId == "-1" ? FirstViwe.GetSubmitMethod("", "ابتدا باید یک استان را انتخاب نمایید!", "", "false") : clsSqlHelper.FillCityWithProvince(Convert.ToInt32(provinceId));
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return FirstViwe.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetFillAxis(string provinceId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return FirstViwe.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                return string.IsNullOrEmpty(provinceId) || provinceId == "-1" ? FirstViwe.GetSubmitMethod("", "ابتدا باید یک استان را انتخاب نمایید!", "", "false") : clsSqlHelper.FillAxisWithProvince(Convert.ToInt32(provinceId));
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return FirstViwe.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
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