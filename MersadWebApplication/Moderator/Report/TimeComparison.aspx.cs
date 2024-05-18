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
    public partial class TimeComparison : System.Web.UI.Page
    {
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
                bool flag = !CheckSession.ControlSession();
                if (!flag)
                {
                    bool flag2 = !base.IsPostBack;
                    if (flag2)
                    {
                this._sqlHelper.FiltrafficZonecity(this.cmbProvinceSearch, "traffic", "FillCityID", "trafficzone");

                        long submitByUserId = Convert.ToInt64(this.Session["UserId"]);
                        bool allAccident = this.Session["UserRoleName"].Equals("SuperAdmin") || this._sqlHelper.Select_AccessToButton(submitByUserId, Convert.ToInt64(this.Session["PlanId"]), "AllAccidentList");
                        long? getUserId = allAccident ? null : new long?(submitByUserId);
                        string firstYear;
                        string secondYear;
                        string thirdYear;
                        string fourthYear;
                        string fifthYear;
                        string yearList;
                        this._sqlHelper.SearchInTimeComparison(getUserId, "SP_All_ChartTimeComparison", "", "", "", null, "", "", null, "3Year", "", "", "", "", "", "", "", "", "", "", allAccident, null, null, null, "", "", null, null, out firstYear, out secondYear, out thirdYear, out fourthYear, out fifthYear, out yearList);
                        this.hidFBcTheGeometry.Value = string.Concat(new string[]
                        {
                            firstYear,
                            "#",
                            secondYear,
                            "#",
                            thirdYear,
                            "#",
                            fourthYear,
                            "#",
                            fifthYear,
                            "#",
                            yearList
                        });
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

        // Token: 0x060002EB RID: 747 RVA: 0x0001FD64 File Offset: 0x0001DF64
        [WebMethod]
        public static List<GetSubmit> GetSearchTimeComparison(string type, string status, string dateOfAccident, string crashType, string provinceId, string getDays, string month, string collisionOfA, string lightingStatus, string weather, string carriageWayDirection, string typeOfWay, string carCrashLocation, string locationLandUse, string fromAgeDriver, string toAgeDriver, string cityId, string inNativeArea, string isHoliday, string collisionChild1, string collisionChild2, string axisId, string isNotLocalDriver)
        {
            if (provinceId.Contains("نام شهر"))
            {
                provinceId = null;
            }
            if (cityId.Contains("کد منطقه شهرداری"))
            {
                cityId = null;
            }
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> result;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    result = new List<GetSubmit>
                    {
                        new GetSubmit
                        {
                            IsSuccess = "false",
                            Message = "صفحه را مجدد بارگذاری نمایید!"
                        }
                    };
                }
                else
                {
                    long submitByUserId = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                    bool allAccident = HttpContext.Current.Session["UserRoleName"].Equals("SuperAdmin") || sqlHelper.Select_AccessToButton(submitByUserId, Convert.ToInt64(HttpContext.Current.Session["PlanId"]), "AllAccidentList");
                    //long? getUserId = allAccident ? null : new long?(submitByUserId);
                    long? getUserId = 10028;
                    string dateOfAccidentEnd = null;
                    bool flag2 = dateOfAccident.IndexOf("-") > 0;
                    if (flag2)
                    {
                        string[] getDates = dateOfAccident.Split(new char[]
                        {
                            '-'
                        });
                        dateOfAccident = getDates[0];
                        dateOfAccidentEnd = getDates[1];
                    }
                    int? getProvinceSearch = (string.IsNullOrEmpty(provinceId) || provinceId == "-1") ? null : new int?(Convert.ToInt32(provinceId));
                    int? getCitySearch = (string.IsNullOrEmpty(cityId) || cityId == "-1") ? null : new int?(Convert.ToInt32(cityId));
                    int? getAxisId = (string.IsNullOrEmpty(axisId) || axisId == "-1") ? null : new int?(Convert.ToInt32(axisId));
                    bool? getInNativeAreaSearch = string.IsNullOrEmpty(inNativeArea) ? null : new bool?(Convert.ToBoolean(inNativeArea));
                    bool? getIsHoliday = string.IsNullOrEmpty(isHoliday) ? null : new bool?(Convert.ToBoolean(isHoliday));
                    bool? getIsNotLocalDriver = string.IsNullOrEmpty(isNotLocalDriver) ? null : new bool?(Convert.ToBoolean(isNotLocalDriver));
                    string sp = "SP_All_ChartTimeComparison";
                    bool flag3 = type == "Subsidiary" ||type== "MainWay"|| type == "Village" || type == "SubsidiaryVillage" || type == "StatusWithLight" || type == "StatusWithOutLight" || type == "StatusLightAll";
                    if (flag3)
                    {
                        sp = "SP_All_ChartTimeComparison_Part2";
                    }
                    else
                    {
                        bool flag4 = type == "SingleVehicle" || type == "TwoVehicle" || type == "MultiAccident" || type == "WithPedestrian" || type == "WithMotor" || type == "CollisionOther" || type == "AllVehicle";
                        if (flag4)
                        {
                            sp = "SP_All_ChartTimeComparison_Part3";
                        }
                        else
                        {
                            bool flag5 = type == "OutOfRoad" || type == "OverthrowFall" || type == "CrashWithFixedObject" || type == "CrashWithAll" || type == "RearEnd" || type == "Angle" || type == "SidewipeOd" || type == "SidewipeSd" || type == "HeadOn" || type == "AllCollision";
                            if (flag5)
                            {
                                sp = "SP_All_ChartTimeComparison_Part4";
                            }
                            else
                            {
                                bool flag6 = type == "FatigueDrowsiness" || type == "ExceedingSpeed" || type == "LackAttentionFront" || type == "FailureObserveDistance" || type == "NonObservancePriority" || type == "DeviationLeft" || type == "CrossingPlaceProhibited" || type == "MoveOppositeDirection" || type == "TechnicalDefectsVehicle" || type == "SuddenDiversion" || type == "ViolationArticle4" || type == "AllFinalReason";
                                if (flag6)
                                {
                                    sp = "SP_All_ChartTimeComparison_Part5";
                                }
                                else
                                {
                                    bool flag7 = type == "ExceedingSpeedsOver50" || type == "DrivingWhileDrunk" || type == "ExceedingSpeedsOver30" || type == "IllegalOvertaking" || type == "CrossRedLight" || type == "NativeLicensePlate" || type == "NonNativeLicensePlate" || type == "AllCodeCausing" || type == "AllLicensePlate";
                                    if (flag7)
                                    {
                                        sp = "SP_All_ChartTimeComparison_Part6";
                                    }
                                    else
                                    {
                                        bool flag8 = type == "FuelMaterials" || type == "TechnicalProblem" || type == "Car" || type == "Motorcycle" || type == "Pedestrian" || type == "NavyBar" || type == "NavyPassenger";
                                        if (flag8)
                                        {
                                            sp = "SP_All_ChartTimeComparison_Part7";
                                        }
                                        else
                                        {
                                            bool flag9 = type == "Pedestrian60";
                                            if (flag9)
                                            {
                                                sp = "SP_All_ChartTimeComparison_Part8";
                                            }
                                            else
                                            {
                                                bool flag10 = type == "Motor18";
                                                if (flag10)
                                                {
                                                    sp = "SP_All_ChartTimeComparison_Part9";
                                                }
                                                else
                                                {
                                                    bool flag11 = type == "NoCertification";
                                                    if (flag11)
                                                    {
                                                        sp = "SP_All_ChartTimeComparison_NoCertification";
                                                    }
                                                    else
                                                    {
                                                        bool flag12 = type == "SafetyBelt";
                                                        if (flag12)
                                                        {
                                                            sp = "SP_All_ChartTimeComparison_SafetyBelt";
                                                        }
                                                        else
                                                        {
                                                            bool flag13 = type == "Helmet";
                                                            if (flag13)
                                                            {
                                                                sp = "SP_All_ChartTimeComparison_Helmet";
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
                    string firstYear;
                    string secondYear;
                    string thirdYear;
                    string fourthYear;
                    string fifthYear;
                    string yearList;
                    sqlHelper.SearchInTimeComparison(getUserId, sp, type, status, dateOfAccident, dateOfAccidentEnd, crashType, "", getProvinceSearch, getDays, month, collisionOfA, lightingStatus, weather, carriageWayDirection, typeOfWay, carCrashLocation, locationLandUse, fromAgeDriver, toAgeDriver, allAccident, getCitySearch, getInNativeAreaSearch, getIsHoliday, collisionChild1, collisionChild2, getAxisId, getIsNotLocalDriver, out firstYear, out secondYear, out thirdYear, out fourthYear, out fifthYear, out yearList);
                    result = new List<GetSubmit>
                    {
                        new GetSubmit
                        {
                            IsSuccess = "true",
                            Message = string.Concat(new string[]
                            {
                                firstYear,
                                "#",
                                secondYear,
                                "#",
                                thirdYear,
                                "#",
                                fourthYear,
                                "#",
                                fifthYear,
                                "#",
                                yearList,
                                "#Pedestrian60"
                            })
                        }
                    };
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                result = new List<GetSubmit>
                {
                    new GetSubmit
                    {
                        IsSuccess = "false",
                        Message = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید"
                    }
                };
            }
            return result;
        }

        // Token: 0x060002EC RID: 748 RVA: 0x0001A6DC File Offset: 0x000188DC
        [WebMethod]
        public static List<GetSubmit> GetFillCity(string provinceId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> result;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    result = new List<GetSubmit>
                    {
                        new GetSubmit
                        {
                            Message = "صفحه را مجدد بارگذاری نمایید!",
                            IsSuccess = "false"
                        }
                    };
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(provinceId) || provinceId == "-1";
                    if (flag2)
                    {
                        result = new List<GetSubmit>
                        {
                            new GetSubmit
                            {
                                Message = "ابتدا باید یک استان را انتخاب نمایید!",
                                IsSuccess = "false"
                            }
                        };
                    }
                    else
                    {
                        result = sqlHelper.FillCityWithProvince(Convert.ToInt32(provinceId));
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                result = new List<GetSubmit>
                {
                    new GetSubmit
                    {
                        Message = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید",
                        IsSuccess = "false"
                    }
                };
            }
            return result;
        }

        // Token: 0x060002ED RID: 749 RVA: 0x0001DBC0 File Offset: 0x0001BDC0
        [WebMethod]
        public static List<GetSubmit> GetFillAxis(string provinceId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> result;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    result = new List<GetSubmit>
                    {
                        new GetSubmit
                        {
                            Message = "صفحه را مجدد بارگذاری نمایید!",
                            IsSuccess = "false"
                        }
                    };
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(provinceId) || provinceId == "-1";
                    if (flag2)
                    {
                        result = new List<GetSubmit>
                        {
                            new GetSubmit
                            {
                                Message = "ابتدا باید یک استان را انتخاب نمایید!",
                                IsSuccess = "false"
                            }
                        };
                    }
                    else
                    {
                        result = sqlHelper.FillAxisWithProvince(Convert.ToInt32(provinceId));
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                result = new List<GetSubmit>
                {
                    new GetSubmit
                    {
                        Message = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید",
                        IsSuccess = "false"
                    }
                };
            }
            return result;
        }

        // Token: 0x04000190 RID: 400
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();

        // Token: 0x04000191 RID: 401
        private readonly ClsHelper _helper = new ClsHelper();

        // Token: 0x04000192 RID: 402
     
    }
}