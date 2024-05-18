using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator.Event
{
    public partial class CheckAccident : System.Web.UI.Page
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
                        this._sqlHelper.FillAllHtmlSelect(this.cmbProvince, "", "SP_Fill_TBL_Province");
                        this.hideAccidentGuid.Value = Guid.NewGuid().ToString();
                        this.hideAccidentPicturesGuid.Value = Guid.NewGuid().ToString();
                        bool flag3 = base.Request.QueryString["Id"] == null;
                        if (!flag3)
                        {
                            long id = Convert.ToInt64(base.Request.QueryString["Id"]);
                            string getId;
                            string serial;
                            string provinceId;
                            string centerCode;
                            string centerName;
                            string routeCode;
                            string routeName;
                            string segmentCode;
                            string segmentName;
                            string spotCode;
                            string spotName;
                            string timeOfAccident;
                            string policeAwarenessTime;
                            string policeArrivalTime;
                            string emsArrivalTime;
                            string sosArrivalTime;
                            string policeAwarenessType;
                            string longitude;
                            string latitude;
                            string distanceFromTheOrigin;
                            string dateOfAccident;
                            string dateOfFormCompletion;
                            string location;
                            bool formIsCompleted;
                            string crashType;
                            string crashScene;
                            bool? hasAddingWitness;
                            string collisionOfA;
                            string collisionOfATwo;
                            string typeOfCollision;
                            this._sqlHelper.GetEditAccident(id, true, out getId, false, out serial, out provinceId, out centerCode, out centerName, out routeCode, out routeName, out segmentCode, out segmentName, out spotCode, out spotName, out timeOfAccident, out policeAwarenessTime, out policeArrivalTime, out emsArrivalTime, out sosArrivalTime, out policeAwarenessType, out longitude, out latitude, out distanceFromTheOrigin, out dateOfAccident, out dateOfFormCompletion, out location, out formIsCompleted, out crashType, out crashScene, out hasAddingWitness, out collisionOfA, out collisionOfATwo, out typeOfCollision);
                            this.SetFormNotComplete(getId, provinceId, serial, centerCode, centerName, routeCode, routeName, segmentCode, segmentName, spotCode, spotName, timeOfAccident, policeAwarenessTime, policeArrivalTime, emsArrivalTime, sosArrivalTime, policeAwarenessType, longitude, latitude, distanceFromTheOrigin, dateOfAccident, dateOfFormCompletion, location);
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

        // Token: 0x060002FE RID: 766 RVA: 0x00021280 File Offset: 0x0001F480
        private void SetFormNotComplete(string getId, string provinceId, string serial, string centerCode, string centerName, string routeCode, string routeName, string segmentCode, string segmentName, string spotCode, string spotName, string timeOfAccident, string policeAwarenessTime, string policeArrivalTime, string emsArrivalTime, string sosArrivalTime, string policeAwarenessType, string longitude, string latitude, string distanceFromTheOrigin, string dateOfAccident, string dateOfFormCompletion, string location)
        {
            this.FillEdit(getId, provinceId, serial, centerCode, centerName, routeCode, routeName, segmentCode, segmentName, spotCode, spotName, timeOfAccident, policeAwarenessTime, policeArrivalTime, emsArrivalTime, sosArrivalTime, policeAwarenessType, longitude, latitude, distanceFromTheOrigin, dateOfAccident, dateOfFormCompletion, location);
            string getGuid = this._sqlHelper.Select_AccidentPictureGuid(Convert.ToInt64(getId));
            string getAccidentGuid = this._sqlHelper.Select_AccidentGuid(Convert.ToInt64(getId));
            this.hideAccidentGuid.Value = getAccidentGuid;
            this.hideAccidentPicturesGuid.Value = getGuid;
        }

        // Token: 0x060002FF RID: 767 RVA: 0x00021300 File Offset: 0x0001F500
        private void FillEdit(string getId, string provinceId, string serial, string centerCode, string centerName, string routeCode, string routeName, string segmentCode, string segmentName, string spotCode, string spotName, string timeOfAccident, string policeAwarenessTime, string policeArrivalTime, string emsArrivalTime, string sosArrivalTime, string policeAwarenessType, string longitude, string latitude, string distanceFromTheOrigin, string dateOfAccident, string dateOfFormCompletion, string location)
        {
            this.hidId.Value = getId;
            this.cmbProvince.Value = provinceId;
            this.txtSerial.Value = serial;
            this.txtCenterCode.Value = centerCode;
            this.txtCenterName.Value = centerName;
            this.txtRouteCode.Value = routeCode;
            this.txtRouteName.Value = routeName;
            this.txtSegmentCode.Value = segmentCode;
            this.txtSegmentName.Value = segmentName;
            this.txtSpotCode.Value = spotCode;
            this.txtSpotName.Value = spotName;
            this.txtTimeOfAccident.Value = timeOfAccident;
            this.txtPoliceAwarenessTime.Value = policeAwarenessTime;
            this.txtPoliceArrivalTime.Value = policeArrivalTime;
            this.txtEmsArrivalTime.Value = emsArrivalTime;
            this.txtSosArrivalTime.Value = sosArrivalTime;
            this.cmbPoliceAwarenessType.Value = policeAwarenessType;
            this.txtLongitude.Value = longitude;
            this.txtLatitude.Value = latitude;
            this.txtDistanceFromTheOrigin.Value = distanceFromTheOrigin;
            this.txtDateOfAccident.Value = dateOfAccident;
            this.txtDateOfFormCompletion.Value = dateOfFormCompletion;
            this.txtLocation.Value = location;
        }

        // Token: 0x06000300 RID: 768 RVA: 0x00021450 File Offset: 0x0001F650
        [WebMethod]
        public static List<GetSubmit> LoadBorderComment(string accidentId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string firstBorder;
                        string secondBorder;
                        string thirdBorder;
                        string fourthBorder;
                        string fifthBorder;
                        string sixthBorder;
                        string seventhBorder;
                        sqlHelper.LoadBorderComment(Convert.ToInt64(accidentId), out firstBorder, out secondBorder, out thirdBorder, out fourthBorder, out fifthBorder, out sixthBorder, out seventhBorder);
                        submitMethod = CheckAccident.GetSubmitMethod("", string.Concat(new string[]
                        {
                            firstBorder,
                            ",",
                            secondBorder,
                            ",",
                            thirdBorder,
                            ",",
                            fourthBorder,
                            ",",
                            fifthBorder,
                            ",",
                            sixthBorder,
                            ",",
                            seventhBorder
                        }), "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000301 RID: 769 RVA: 0x00021598 File Offset: 0x0001F798
        [WebMethod]
        public static List<GetSubmit> LoadComment(string accidentId, string type)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string des = sqlHelper.LoadAccidentComment(Convert.ToInt64(accidentId), type);
                        submitMethod = CheckAccident.GetSubmitMethod("", des, "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000302 RID: 770 RVA: 0x0002166C File Offset: 0x0001F86C
        [WebMethod]
        public static List<GetSubmit> SaveComment(string accidentId, string type, string comment)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        long submitByUserId = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                        sqlHelper.SaveAccidentComment(Convert.ToInt64(accidentId), type, comment, submitByUserId);
                        submitMethod = CheckAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000303 RID: 771 RVA: 0x00021760 File Offset: 0x0001F960
        [WebMethod]
        public static List<GetSubmit> SubmitComplete(string accidentId, string type)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        bool isChecked = type == "Success";
                        long submitByUserId = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                        sqlHelper.CheckByPsaOrCamp("CheckByPsa", Convert.ToInt64(accidentId), isChecked, submitByUserId);
                        submitMethod = CheckAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000304 RID: 772 RVA: 0x0002186C File Offset: 0x0001FA6C
        [WebMethod]
        public static List<GetSubmit> GetWitness(string accidentId, string index)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        bool flag3 = string.IsNullOrEmpty(index);
                        if (flag3)
                        {
                            submitMethod = CheckAccident.GetSubmitMethod("", "شاهد را انتخاب کنید!", "", "false");
                        }
                        else
                        {
                            string name;
                            string phone;
                            sqlHelper.GetEditWitness(Convert.ToInt64(accidentId), Convert.ToByte(index), out name, out phone);
                            submitMethod = CheckAccident.GetSubmitMethod("", name, phone, "true");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000305 RID: 773 RVA: 0x00021974 File Offset: 0x0001FB74
        [WebMethod]
        public static List<GetSubmit> GetAccidentCarDamage(string accidentId, string accidentCar)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        bool flag3 = string.IsNullOrEmpty(accidentCar);
                        if (flag3)
                        {
                            submitMethod = CheckAccident.GetSubmitMethod("", "وسیله نقلیه آسیب دیده را انتخاب کنید!", "", "false");
                        }
                        else
                        {
                            string firstPointCollision;
                            string damagedParts;
                            sqlHelper.GetEditAccidentCarDamage(Convert.ToInt64(accidentId), Convert.ToInt64(accidentCar), out firstPointCollision, out damagedParts);
                            submitMethod = CheckAccident.GetSubmitMethod("", firstPointCollision, damagedParts, "true");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000306 RID: 774 RVA: 0x00021A7C File Offset: 0x0001FC7C
        [WebMethod]
        public static List<GetSubmit> LoadSecondStep(string accidentId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string crashType;
                        string crashScene;
                        string hasAddingWitness;
                        string witnessName;
                        string witnessPhone;
                        string collisionOfA;
                        string collisionOfATwo;
                        string typeOfCollision;
                        sqlHelper.GetLoadSecondStep(Convert.ToInt64(accidentId), out crashType, out crashScene, out hasAddingWitness, out witnessName, out witnessPhone, out collisionOfA, out collisionOfATwo, out typeOfCollision);
                        submitMethod = CheckAccident.GetSubmitMethod("", string.Concat(new string[]
                        {
                            crashType,
                            "#",
                            crashScene,
                            "#",
                            hasAddingWitness,
                            "#",
                            collisionOfA,
                            "#",
                            collisionOfATwo,
                            "#",
                            typeOfCollision
                        }), witnessName + "#" + witnessPhone, "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000307 RID: 775 RVA: 0x00021BC0 File Offset: 0x0001FDC0
        [WebMethod]
        public static List<GetSubmit> LoadThirdStep(string accidentId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string roadDefects;
                        string carriageWayDirection;
                        string lightingStatus;
                        string roadSurfaceCondition;
                        string visualObstruction;
                        string isShoulderRoad;
                        string shoulderRoad;
                        string shouldersWidth;
                        string roadMaintenance;
                        string roadAssetsDamage;
                        string locationLandUse;
                        string carCrashLocation;
                        string weather;
                        string geometricDesign;
                        string pavmentMarking;
                        string roadwayWidthMain;
                        string roadwayWidthSubsidiary;
                        string roadwayWidthVillage;
                        string maximumSpeedLimit;
                        sqlHelper.GetLoadThirdStep(Convert.ToInt64(accidentId), out roadDefects, out carriageWayDirection, out lightingStatus, out roadSurfaceCondition, out visualObstruction, out isShoulderRoad, out shoulderRoad, out shouldersWidth, out roadMaintenance, out roadAssetsDamage, out locationLandUse, out carCrashLocation, out weather, out geometricDesign, out pavmentMarking, out roadwayWidthMain, out roadwayWidthSubsidiary, out roadwayWidthVillage, out maximumSpeedLimit);
                        submitMethod = CheckAccident.GetSubmitMethod("", string.Concat(new string[]
                        {
                            roadDefects,
                            "#",
                            carriageWayDirection,
                            "#",
                            lightingStatus,
                            "#",
                            roadSurfaceCondition,
                            "#",
                            visualObstruction,
                            "#",
                            isShoulderRoad,
                            "#",
                            shoulderRoad,
                            "#",
                            shouldersWidth,
                            "#",
                            roadMaintenance,
                            "#",
                            roadAssetsDamage,
                            "#",
                            locationLandUse,
                            "#",
                            carCrashLocation,
                            "#",
                            weather,
                            "#",
                            geometricDesign,
                            "#",
                            pavmentMarking,
                            "#",
                            roadwayWidthMain,
                            "#",
                            roadwayWidthSubsidiary,
                            "#",
                            roadwayWidthVillage,
                            "#",
                            maximumSpeedLimit
                        }), "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000308 RID: 776 RVA: 0x00021DE0 File Offset: 0x0001FFE0
        [WebMethod]
        public static List<GetSubmit> LoadFourthStep(string accidentId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string finalReason;
                        string lackOfAttention;
                        string inabilityControlVehicle;
                        string vehicleFactorInCarCrash;
                        string humanFactorInCarCrash;
                        string judicialCause;
                        sqlHelper.GetLoadFourthStep(Convert.ToInt64(accidentId), out finalReason, out lackOfAttention, out inabilityControlVehicle, out vehicleFactorInCarCrash, out humanFactorInCarCrash, out judicialCause);
                        submitMethod = CheckAccident.GetSubmitMethod("", string.Concat(new string[]
                        {
                            finalReason,
                            "#",
                            lackOfAttention,
                            "#",
                            inabilityControlVehicle,
                            "#",
                            vehicleFactorInCarCrash,
                            "#",
                            humanFactorInCarCrash,
                            "#",
                            judicialCause
                        }), "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000309 RID: 777 RVA: 0x00021F18 File Offset: 0x00020118
        [WebMethod]
        public static List<GetLoadSeventhStep> LoadPeopleAccident(string accidentId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetLoadSeventhStep> result;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    result = new List<GetLoadSeventhStep>
                    {
                        new GetLoadSeventhStep
                        {
                            SelectPeopleAccident = "صفحه را مجدد بارگذاری نمایید!",
                            PeopleAccident = "false"
                        }
                    };
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        result = new List<GetLoadSeventhStep>
                        {
                            new GetLoadSeventhStep
                            {
                                SelectPeopleAccident = "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!",
                                PeopleAccident = "false"
                            }
                        };
                    }
                    else
                    {
                        string getPeopleAccident = sqlHelper.Select_PeopleAccident(Convert.ToInt64(accidentId));
                        string getInputPeopleAccident = sqlHelper.Select_InputPeopleAccident(Convert.ToInt64(accidentId));
                        string getSelectPeopleAccident = sqlHelper.Select_OptionPeopleAccident(Convert.ToInt64(accidentId));
                        string primaryCause;
                        string formerCause;
                        string directCause;
                        string organizationsToBlame;
                        string directCausePrecent;
                        sqlHelper.Select_SeventhAccident(Convert.ToInt64(accidentId), out primaryCause, out formerCause, out directCause, out organizationsToBlame, out directCausePrecent);
                        result = new List<GetLoadSeventhStep>
                        {
                            new GetLoadSeventhStep
                            {
                                SelectPeopleAccident = getSelectPeopleAccident,
                                PeopleAccident = getPeopleAccident,
                                InputPeopleAccident = getInputPeopleAccident,
                                PrimaryCause = primaryCause,
                                FormerCause = formerCause,
                                DirectCause = directCause,
                                OrganizationsToBlame = organizationsToBlame,
                                DirectCausePrecent = directCausePrecent
                            }
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                result = new List<GetLoadSeventhStep>
                {
                    new GetLoadSeventhStep
                    {
                        SelectPeopleAccident = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید",
                        PeopleAccident = "false"
                    }
                };
            }
            return result;
        }

        // Token: 0x0600030A RID: 778 RVA: 0x000220A0 File Offset: 0x000202A0
        [WebMethod]
        public static List<GetSubmit> LoadSixthStep(string accidentId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string numberOfInjured;
                        sqlHelper.GetLoadSixthStep(Convert.ToInt64(accidentId), out numberOfInjured);
                        string getGuid = sqlHelper.Select_AccidentPictureGuid(Convert.ToInt64(accidentId));
                        string getAccidentGuid = sqlHelper.Select_AccidentGuid(Convert.ToInt64(accidentId));
                        submitMethod = CheckAccident.GetSubmitMethod(getGuid, numberOfInjured, getAccidentGuid, "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x0600030B RID: 779 RVA: 0x0002218C File Offset: 0x0002038C
        [WebMethod]
        public static List<GetSubmit> LoadFifthStep(string accidentId, string index)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string driverFlee;
                        string plateNumberFirst;
                        string vehicleType;
                        string vehicleSystem;
                        string vehicleManeuvering;
                        string plateType;
                        string safetyEquipment;
                        string pathDirection;
                        string signsOnRoad;
                        string functionAfterDamage;
                        string technicalInspection;
                        string companyOrganisation;
                        string vehicleHaveLoad;
                        string loadType;
                        string loadFreight;
                        string systemIncompatibility;
                        string airbagFunction;
                        string accidentTraces;
                        string typeOfCollision;
                        string codeCausingAccident;
                        sqlHelper.GetLoadFifthStep(Convert.ToInt64(accidentId), Convert.ToByte(index), out driverFlee, out plateNumberFirst, out vehicleType, out vehicleSystem, out vehicleManeuvering, out plateType, out safetyEquipment, out pathDirection, out signsOnRoad, out functionAfterDamage, out technicalInspection, out companyOrganisation, out vehicleHaveLoad, out loadType, out loadFreight, out systemIncompatibility, out airbagFunction, out accidentTraces, out typeOfCollision, out codeCausingAccident);
                        string isDriversIdentity;
                        string sex;
                        string seatBelt;
                        string driverStatues;
                        string injuryAtScene;
                        string reactionBeforeAccident;
                        string numberOfPassengers;
                        string nationalId;
                        string firstName;
                        string lastName;
                        string fatherName;
                        string age;
                        string driverLicenceNumber;
                        string dateLicenceIssue;
                        string placeLicenceIssue;
                        string driverLicenceCategory;
                        string driverLicenceStatus;
                        string isDriverLicenceIncompatibility;
                        string education;
                        string job;
                        string transferMethod;
                        sqlHelper.GetLoadFifthStepThree(Convert.ToInt64(accidentId), Convert.ToByte(index), out isDriversIdentity, out sex, out seatBelt, out driverStatues, out injuryAtScene, out reactionBeforeAccident, out numberOfPassengers, out nationalId, out firstName, out lastName, out fatherName, out age, out driverLicenceNumber, out dateLicenceIssue, out placeLicenceIssue, out driverLicenceCategory, out driverLicenceStatus, out isDriverLicenceIncompatibility, out education, out job, out transferMethod);
                        submitMethod = CheckAccident.GetSubmitMethod("", string.Concat(new string[]
                        {
                            driverFlee,
                            "#",
                            plateNumberFirst,
                            "#",
                            vehicleType,
                            "#",
                            vehicleSystem,
                            "#",
                            vehicleManeuvering,
                            "#",
                            plateType,
                            "#",
                            safetyEquipment,
                            "#",
                            pathDirection,
                            "#",
                            signsOnRoad,
                            "#",
                            functionAfterDamage,
                            "#",
                            technicalInspection,
                            "#",
                            companyOrganisation,
                            "#",
                            vehicleHaveLoad,
                            "#",
                            loadType,
                            "#",
                            loadFreight,
                            "#",
                            systemIncompatibility,
                            "#",
                            airbagFunction,
                            "#",
                            accidentTraces,
                            "#",
                            typeOfCollision,
                            "#",
                            codeCausingAccident
                        }), firstName + "#" + lastName, "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x0600030C RID: 780 RVA: 0x00022408 File Offset: 0x00020608
        [WebMethod]
        public static List<GetSubmit> FillCmbVehiclesInvolved(string accidentId, string index)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string isDriversIdentity;
                        string sex;
                        string seatBelt;
                        string driverStatues;
                        string injuryAtScene;
                        string reactionBeforeAccident;
                        string numberOfPassengers;
                        string nationalId;
                        string firstName;
                        string lastName;
                        string fatherName;
                        string age;
                        string driverLicenceNumber;
                        string dateLicenceIssue;
                        string placeLicenceIssue;
                        string driverLicenceCategory;
                        string driverLicenceStatus;
                        string isDriverLicenceIncompatibility;
                        string education;
                        string job;
                        string transferMethod;
                        sqlHelper.GetLoadFifthStepThree(Convert.ToInt64(accidentId), Convert.ToByte(index), out isDriversIdentity, out sex, out seatBelt, out driverStatues, out injuryAtScene, out reactionBeforeAccident, out numberOfPassengers, out nationalId, out firstName, out lastName, out fatherName, out age, out driverLicenceNumber, out dateLicenceIssue, out placeLicenceIssue, out driverLicenceCategory, out driverLicenceStatus, out isDriverLicenceIncompatibility, out education, out job, out transferMethod);
                        submitMethod = CheckAccident.GetSubmitMethod("", firstName + "#" + lastName, "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x0600030D RID: 781 RVA: 0x00022520 File Offset: 0x00020720
        [WebMethod]
        public static List<GetSubmit> FillCmbPedestriansInvolved(string accidentId, string index)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string onSiteCrossingFacilities;
                        string isPedestriansIdentity;
                        string sex;
                        string nationalId;
                        string firstName;
                        string lastName;
                        string fatherName;
                        string age;
                        string education;
                        string job;
                        string clothesColor;
                        string pedestriansSituation;
                        string pedestriansAverageSpeed;
                        string pedestrianThrowDistance;
                        sqlHelper.GetLoadAccidentPedestrian(Convert.ToInt64(accidentId), Convert.ToByte(index), out onSiteCrossingFacilities, out isPedestriansIdentity, out sex, out nationalId, out firstName, out lastName, out fatherName, out age, out education, out job, out clothesColor, out pedestriansSituation, out pedestriansAverageSpeed, out pedestrianThrowDistance);
                        submitMethod = CheckAccident.GetSubmitMethod("", firstName + "#" + lastName, "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x0600030E RID: 782 RVA: 0x0002262C File Offset: 0x0002082C
        [WebMethod]
        public static List<GetSubmit> FillCmbBikeRidersInvolved(string accidentId, string index)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string onSiteCrossingFacilities;
                        string isIdentity;
                        string sex;
                        string nationalId;
                        string firstName;
                        string lastName;
                        string fatherName;
                        string age;
                        string education;
                        string job;
                        string clothesColor;
                        string situation;
                        string averageSpeed;
                        string throwDistance;
                        sqlHelper.GetLoadAccidentBikeRiders(Convert.ToInt64(accidentId), Convert.ToByte(index), out onSiteCrossingFacilities, out isIdentity, out sex, out nationalId, out firstName, out lastName, out fatherName, out age, out education, out job, out clothesColor, out situation, out averageSpeed, out throwDistance);
                        submitMethod = CheckAccident.GetSubmitMethod("", firstName + "#" + lastName, "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x0600030F RID: 783 RVA: 0x00022738 File Offset: 0x00020938
        [WebMethod]
        public static List<GetSubmit> GetCountFifthStep(string accidentId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string numberVehiclesInvolved;
                        string numberPedestriansInvolved;
                        string numberBikeInvolved;
                        sqlHelper.Select_GetCountFifth(Convert.ToInt64(accidentId), out numberVehiclesInvolved, out numberPedestriansInvolved, out numberBikeInvolved);
                        submitMethod = CheckAccident.GetSubmitMethod("", string.Concat(new string[]
                        {
                            numberVehiclesInvolved,
                            "#",
                            numberPedestriansInvolved,
                            "#",
                            numberBikeInvolved
                        }), "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000310 RID: 784 RVA: 0x00022840 File Offset: 0x00020A40
        [WebMethod]
        public static List<GetSubmit> LoadFifthStepTwo(string accidentId, string index)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string brakeTraceBeforeAccident;
                        string brakeTraceAfterAccident;
                        string distanceMoveAfterAccident;
                        string accelerationIncludings;
                        string roadFrictionFactor;
                        string vehiclesHeightFromGround;
                        string slopeDegreeDirection;
                        string brakeAcceleration;
                        string roadsCurveRadius;
                        string tierMarks;
                        string quDriverNoticedDanger;
                        string quDriverTime;
                        string quMaximumDistancePieces;
                        string brakeTraceTestSpeed;
                        string testSpeed;
                        sqlHelper.GetLoadFifthStepTwo(Convert.ToInt64(accidentId), Convert.ToByte(index), out brakeTraceBeforeAccident, out brakeTraceAfterAccident, out distanceMoveAfterAccident, out accelerationIncludings, out roadFrictionFactor, out vehiclesHeightFromGround, out slopeDegreeDirection, out brakeAcceleration, out roadsCurveRadius, out tierMarks, out quDriverNoticedDanger, out quDriverTime, out quMaximumDistancePieces, out brakeTraceTestSpeed, out testSpeed);
                        submitMethod = CheckAccident.GetSubmitMethod("", string.Concat(new string[]
                        {
                            brakeTraceBeforeAccident,
                            "#",
                            brakeTraceAfterAccident,
                            "#",
                            distanceMoveAfterAccident,
                            "#",
                            accelerationIncludings,
                            "#",
                            roadFrictionFactor,
                            "#",
                            vehiclesHeightFromGround,
                            "#",
                            slopeDegreeDirection,
                            "#",
                            brakeAcceleration,
                            "#",
                            roadsCurveRadius,
                            "#",
                            tierMarks,
                            "#",
                            quDriverNoticedDanger,
                            "#",
                            quDriverTime,
                            "#",
                            quMaximumDistancePieces,
                            "#",
                            brakeTraceTestSpeed,
                            "#",
                            testSpeed
                        }), "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000311 RID: 785 RVA: 0x00022A24 File Offset: 0x00020C24
        [WebMethod]
        public static List<GetSubmit> LoadFifthStepThree(string accidentId, string index)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string isDriversIdentity;
                        string sex;
                        string seatBelt;
                        string driverStatues;
                        string injuryAtScene;
                        string reactionBeforeAccident;
                        string numberOfPassengers;
                        string nationalId;
                        string firstName;
                        string lastName;
                        string fatherName;
                        string age;
                        string driverLicenceNumber;
                        string dateLicenceIssue;
                        string placeLicenceIssue;
                        string driverLicenceCategory;
                        string driverLicenceStatus;
                        string isDriverLicenceIncompatibility;
                        string education;
                        string job;
                        string transferMethod;
                        sqlHelper.GetLoadFifthStepThree(Convert.ToInt64(accidentId), Convert.ToByte(index), out isDriversIdentity, out sex, out seatBelt, out driverStatues, out injuryAtScene, out reactionBeforeAccident, out numberOfPassengers, out nationalId, out firstName, out lastName, out fatherName, out age, out driverLicenceNumber, out dateLicenceIssue, out placeLicenceIssue, out driverLicenceCategory, out driverLicenceStatus, out isDriverLicenceIncompatibility, out education, out job, out transferMethod);
                        submitMethod = CheckAccident.GetSubmitMethod("", string.Concat(new string[]
                        {
                            isDriversIdentity,
                            "#",
                            sex,
                            "#",
                            seatBelt,
                            "#",
                            driverStatues,
                            "#",
                            injuryAtScene,
                            "#",
                            reactionBeforeAccident,
                            "#",
                            numberOfPassengers,
                            "#",
                            nationalId,
                            "#",
                            firstName,
                            "#",
                            lastName,
                            "#",
                            fatherName,
                            "#",
                            age,
                            "#",
                            driverLicenceNumber,
                            "#",
                            dateLicenceIssue,
                            "#",
                            placeLicenceIssue,
                            "#",
                            driverLicenceCategory,
                            "#",
                            driverLicenceStatus,
                            "#",
                            isDriverLicenceIncompatibility,
                            "#",
                            education,
                            "#",
                            job,
                            "#",
                            transferMethod
                        }), "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000312 RID: 786 RVA: 0x00022C6C File Offset: 0x00020E6C
        [WebMethod]
        public static List<GetSubmit> LoadAccidentPedestrians(string accidentId, string index)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string onSiteCrossingFacilities;
                        string isPedestriansIdentity;
                        string sex;
                        string nationalId;
                        string firstName;
                        string lastName;
                        string fatherName;
                        string age;
                        string education;
                        string job;
                        string clothesColor;
                        string pedestriansSituation;
                        string pedestriansAverageSpeed;
                        string pedestrianThrowDistance;
                        sqlHelper.GetLoadAccidentPedestrian(Convert.ToInt64(accidentId), Convert.ToByte(index), out onSiteCrossingFacilities, out isPedestriansIdentity, out sex, out nationalId, out firstName, out lastName, out fatherName, out age, out education, out job, out clothesColor, out pedestriansSituation, out pedestriansAverageSpeed, out pedestrianThrowDistance);
                        submitMethod = CheckAccident.GetSubmitMethod("", string.Concat(new string[]
                        {
                            onSiteCrossingFacilities,
                            "#",
                            isPedestriansIdentity,
                            "#",
                            sex,
                            "#",
                            clothesColor,
                            "#",
                            pedestriansSituation,
                            "#",
                            pedestriansAverageSpeed,
                            "#",
                            pedestrianThrowDistance,
                            "#",
                            nationalId,
                            "#",
                            firstName,
                            "#",
                            lastName,
                            "#",
                            fatherName,
                            "#",
                            age,
                            "#",
                            education,
                            "#",
                            job
                        }), "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000313 RID: 787 RVA: 0x00022E3C File Offset: 0x0002103C
        [WebMethod]
        public static List<GetSubmit> LoadAccidentBikeRiders(string accidentId, string index)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string onSiteCrossingFacilities;
                        string isIdentity;
                        string sex;
                        string nationalId;
                        string firstName;
                        string lastName;
                        string fatherName;
                        string age;
                        string education;
                        string job;
                        string clothesColor;
                        string situation;
                        string averageSpeed;
                        string throwDistance;
                        sqlHelper.GetLoadAccidentBikeRiders(Convert.ToInt64(accidentId), Convert.ToByte(index), out onSiteCrossingFacilities, out isIdentity, out sex, out nationalId, out firstName, out lastName, out fatherName, out age, out education, out job, out clothesColor, out situation, out averageSpeed, out throwDistance);
                        submitMethod = CheckAccident.GetSubmitMethod("", string.Concat(new string[]
                        {
                            onSiteCrossingFacilities,
                            "#",
                            isIdentity,
                            "#",
                            sex,
                            "#",
                            clothesColor,
                            "#",
                            situation,
                            "#",
                            averageSpeed,
                            "#",
                            throwDistance,
                            "#",
                            nationalId,
                            "#",
                            firstName,
                            "#",
                            lastName,
                            "#",
                            fatherName,
                            "#",
                            age,
                            "#",
                            education,
                            "#",
                            job
                        }), "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000314 RID: 788 RVA: 0x0002300C File Offset: 0x0002120C
        [WebMethod]
        public static List<GetSubmit> LoadInjuredDetail(string accidentId, string index, string name)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string getName;
                        string getFamily;
                        string transferMethod;
                        string ambulanceCode;
                        string vehicle;
                        sqlHelper.Select_LoadInjuredDetail(Convert.ToInt64(accidentId), name, Convert.ToByte(index), out getName, out getFamily, out transferMethod, out ambulanceCode, out vehicle);
                        submitMethod = CheckAccident.GetSubmitMethod("", string.Concat(new string[]
                        {
                            getName,
                            "#",
                            getFamily,
                            "#",
                            transferMethod,
                            "#",
                            ambulanceCode
                        }), "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000315 RID: 789 RVA: 0x0002312C File Offset: 0x0002132C
        [WebMethod]
        public static List<GetSubmit> LoadInjuredRole(string accidentId, string name)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string getRole = sqlHelper.Select_InjuredRole(Convert.ToInt64(accidentId), name);
                        submitMethod = CheckAccident.GetSubmitMethod("", getRole, "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000316 RID: 790 RVA: 0x00023200 File Offset: 0x00021400
        [WebMethod]
        public static List<GetSubmit> GetCountInjured(string accidentId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string getRole = sqlHelper.Select_GetCountInjured(Convert.ToInt64(accidentId));
                        submitMethod = CheckAccident.GetSubmitMethod("", getRole, "", "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000317 RID: 791 RVA: 0x000232D0 File Offset: 0x000214D0
        [WebMethod]
        public static List<GetSubmit> FillInjured(string accidentId, string index)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(accidentId);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string getNamePedestrian = sqlHelper.GetLoadInjured(Convert.ToInt64(accidentId), Convert.ToByte(index), "NameInjuredRolePedestrian");
                        string getNameDriver = sqlHelper.GetLoadInjured(Convert.ToInt64(accidentId), Convert.ToByte(index), "NameInjuredRoleDriver");
                        string getNameBikeRider = sqlHelper.GetLoadInjured(Convert.ToInt64(accidentId), Convert.ToByte(index), "NameInjuredRoleCyclist");
                        string getNamePassenger = sqlHelper.GetLoadInjured(Convert.ToInt64(accidentId), Convert.ToByte(index), "NameInjuredRolePassenger");
                        submitMethod = CheckAccident.GetSubmitMethod("", getNamePedestrian + "|" + getNameDriver, getNameBikeRider + "|" + getNamePassenger, "true");
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000318 RID: 792 RVA: 0x00023414 File Offset: 0x00021614
        [WebMethod]
        public static List<GetSubmit> ShowInjuredDetail(string id, string injuredRole)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetSubmit> submitMethod;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    submitMethod = CheckAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(id);
                    if (flag2)
                    {
                        submitMethod = CheckAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                    }
                    else
                    {
                        string firstName;
                        string lastName;
                        string transferMethod;
                        string ambulanceCode;
                        string injuryAtScene;
                        string vehicle;
                        sqlHelper.GetLoadInjuredDetail(Convert.ToInt64(id), "NameInjured" + injuredRole, out firstName, out lastName, out transferMethod, out ambulanceCode, out injuryAtScene, out vehicle);
                        bool flag3 = injuredRole.Equals("Passenger");
                        if (flag3)
                        {
                            string isIdentity;
                            string sex;
                            string nationalId;
                            string fatherName;
                            string age;
                            string education;
                            string job;
                            string injuryType;
                            string safety;
                            string situation;
                            sqlHelper.GetLoadPassenger(Convert.ToInt64(id), out isIdentity, out sex, out nationalId, out fatherName, out age, out education, out job, out injuryType, out safety, out situation);
                            submitMethod = CheckAccident.GetSubmitMethod(string.Concat(new string[]
                            {
                                isIdentity,
                                "#",
                                sex,
                                "#",
                                nationalId,
                                "#",
                                fatherName,
                                "#",
                                age,
                                "#",
                                education,
                                "#",
                                job,
                                "#",
                                injuryType,
                                "#",
                                safety,
                                "#",
                                situation
                            }), string.Concat(new string[]
                            {
                                firstName,
                                "#",
                                lastName,
                                "#",
                                transferMethod,
                                "#",
                                ambulanceCode,
                                "#",
                                injuryAtScene
                            }), "", "true");
                        }
                        else
                        {
                            submitMethod = CheckAccident.GetSubmitMethod("", string.Concat(new string[]
                            {
                                firstName,
                                "#",
                                lastName,
                                "#",
                                transferMethod,
                                "#",
                                ambulanceCode,
                                "#",
                                injuryAtScene,
                                "#",
                                vehicle
                            }), "", "true");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                submitMethod = CheckAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
            return submitMethod;
        }

        // Token: 0x06000319 RID: 793 RVA: 0x00018FC0 File Offset: 0x000171C0
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

        // Token: 0x040001A1 RID: 417
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();

        // Token: 0x040001A2 RID: 418
        private readonly ClsHelper _helper = new ClsHelper();


    }
}