using MersadWebApplication.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using GeoJSON.Net;
using GeoJSON.Net.CoordinateReferenceSystem;
using GeoJSON.Net.Converters;
using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;
namespace MersadWebApplication.Moderator.Map
{
    public partial class Newmap : System.Web.UI.Page
    {
        // Token: 0x060002F8 RID: 760 RVA: 0x00020D8C File Offset: 0x0001EF8C
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
                        this._sqlHelper.FillAllHtmlSelect(this.cmbProvinceSearch, "Dashboard", "SP_Fill_TBL_Province");

                    }
                }
            }
            catch (Exception ex)
            {
                this._sqlHelper.Insert_Exception("", ex.ToString());
            }
        }
        void GetAllAxis()
        {
            using (DataManagementDataContext context = new DataManagementDataContext())
            {

                var ds = (from m in context.GetAllAxis().AsEnumerable()
                          select m).ToList();

                if (ds.Count != 0)
                {
                    cmbAxis.DataSource = ds;
                    cmbAxis.DataTextField = "Name";
                    cmbAxis.DataValueField = "Id";
                    cmbAxis.DataBind();
                }


            }


        }

        [WebMethod]
        public static List<GetHeatMap> GetNewHeatMapMR(string dateOfAccident, string crashType, string roadway, string locationLandUse, string visualObstruction, string roadDefects, string isHoliday, string collisionOfA, string weather, string typeOfVehicle, string vehicleType, string finalReason, string provinceId, string cityId, string inNativeArea, string axisId, string collisionChild1, string collisionChild2, string isLocalDriver)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetHeatMap> result;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    result = new List<GetHeatMap>
                    {
                        new GetHeatMap
                        {
                            Id = "0",
                            Location = "صفحه را مجدد بارگذاری نمایید!"
                        }
                    };
                }
                else
                {
                    long submitByUserId = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                    bool allAccident = HttpContext.Current.Session["UserRoleName"].Equals("SuperAdmin") || sqlHelper.Select_AccessToButton(submitByUserId, Convert.ToInt64(HttpContext.Current.Session["PlanId"]), "AllAccidentList");
                    long? getUserId = allAccident ? null : new long?(submitByUserId);
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
                    int? getCitySearch = string.IsNullOrEmpty(cityId) ? null : new int?(Convert.ToInt32(cityId));
                    int? getAxisId = (string.IsNullOrEmpty(axisId) || axisId == "-1") ? null : new int?(Convert.ToInt32(axisId));
                    bool? getInNativeAreaSearch = string.IsNullOrEmpty(inNativeArea) ? null : new bool?(Convert.ToBoolean(inNativeArea));
                    bool? getIsHoliday = string.IsNullOrEmpty(isHoliday) ? null : new bool?(Convert.ToBoolean(isHoliday));
                    bool? getIsLocalDriver = string.IsNullOrEmpty(isLocalDriver) ? null : new bool?(Convert.ToBoolean(isLocalDriver));
                    List<GetHeatMap> lst = sqlHelper.SearchInHeatMap(dateOfAccident, dateOfAccidentEnd, allAccident, crashType, getUserId, roadway, locationLandUse, visualObstruction, roadDefects, getIsHoliday, collisionOfA, weather, typeOfVehicle, vehicleType, finalReason, getProvinceSearch, getCitySearch, getInNativeAreaSearch, getAxisId, collisionChild1, collisionChild2, getIsLocalDriver);

                     
                    
                    
                    bool flag3 = lst.Count == 0;

                    if (lst.Count == 0)
                    {
                        result = new List<GetHeatMap>
                        {
                            new GetHeatMap
                            {
                                Id = "-1",
                                Location = "داده ای یافت نشد!"
                            }
                        };
                    }
                    else
                    {
                        result = lst;
                    }

                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                result = new List<GetHeatMap>
                {
                    new GetHeatMap
                    {
                        Id = "0",
                        Location = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید"
                    }
                };
            }
            return result;
        }

        // Token: 0x060002F9 RID: 761 RVA: 0x00020E04 File Offset: 0x0001F004
        [WebMethod]
        public static List<GetHeatMap> GetSearchHeatMap(string dateOfAccident, string crashType, string roadway, string locationLandUse, string visualObstruction, string roadDefects, string isHoliday, string collisionOfA, string weather, string typeOfVehicle, string vehicleType, string finalReason, string provinceId, string cityId, string inNativeArea, string axisId, string collisionChild1, string collisionChild2, string isLocalDriver)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetHeatMap> result;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    result = new List<GetHeatMap>
                    {
                        new GetHeatMap
                        {
                            Id = "0",
                            Location = "صفحه را مجدد بارگذاری نمایید!"
                        }
                    };
                }
                else
                {
                    long submitByUserId = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                    bool allAccident = HttpContext.Current.Session["UserRoleName"].Equals("SuperAdmin") || sqlHelper.Select_AccessToButton(submitByUserId, Convert.ToInt64(HttpContext.Current.Session["PlanId"]), "AllAccidentList");
                    long? getUserId = allAccident ? null : new long?(submitByUserId);
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
                    int? getCitySearch = string.IsNullOrEmpty(cityId) ? null : new int?(Convert.ToInt32(cityId));
                    int? getAxisId = (string.IsNullOrEmpty(axisId) || axisId == "-1") ? null : new int?(Convert.ToInt32(axisId));
                    bool? getInNativeAreaSearch = string.IsNullOrEmpty(inNativeArea) ? null : new bool?(Convert.ToBoolean(inNativeArea));
                    bool? getIsHoliday = string.IsNullOrEmpty(isHoliday) ? null : new bool?(Convert.ToBoolean(isHoliday));
                    bool? getIsLocalDriver = string.IsNullOrEmpty(isLocalDriver) ? null : new bool?(Convert.ToBoolean(isLocalDriver));
                    List<GetHeatMap> lst = sqlHelper.SearchInHeatMap(dateOfAccident, dateOfAccidentEnd, allAccident, crashType, getUserId, roadway, locationLandUse, visualObstruction, roadDefects, getIsHoliday, collisionOfA, weather, typeOfVehicle, vehicleType, finalReason, getProvinceSearch, getCitySearch, getInNativeAreaSearch, getAxisId, collisionChild1, collisionChild2, getIsLocalDriver);
                    bool flag3 = lst.Count == 0;

                    if (lst.Count == 0)
                    {
                        result = new List<GetHeatMap>
                        {
                            new GetHeatMap
                            {
                                Id = "-1",
                                Location = "داده ای یافت نشد!"
                            }
                        };
                    }
                    else
                    {
                        result = lst;
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                result = new List<GetHeatMap>
                {
                    new GetHeatMap
                    {
                        Id = "0",
                        Location = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید"
                    }
                };
            }
            return result;
        }

        // Token: 0x060002FA RID: 762 RVA: 0x00020CA0 File Offset: 0x0001EEA0
        [WebMethod]
        public static List<GetHeatMapDetails> GetHeatMapDetails(string idList)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetHeatMapDetails> result;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    result = new List<GetHeatMapDetails>
                    {
                        new GetHeatMapDetails
                        {
                            TimeOfAccident = "-1",
                            InjuredCount = "صفحه را مجدد بارگذاری نمایید!"
                        }
                    };
                }
                else
                {
                    List<GetHeatMapDetails> lst = sqlHelper.GetHeatMapDetails(idList);
                    bool flag2 = lst.Count == 0;
                    if (flag2)
                    {
                        result = new List<GetHeatMapDetails>
                        {
                            new GetHeatMapDetails
                            {
                                TimeOfAccident = "-1",
                                InjuredCount = "داده ای یافت نشد!"
                            }
                        };
                    }
                    else
                    {
                        result = lst;
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                result = new List<GetHeatMapDetails>
                {
                    new GetHeatMapDetails
                    {
                        TimeOfAccident = "-1",
                        InjuredCount = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید"
                    }
                };
            }
            return result;
        }

        // Token: 0x060002FB RID: 763 RVA: 0x00018FC0 File Offset: 0x000171C0
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

        // Token: 0x0400019E RID: 414
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();


    }
}