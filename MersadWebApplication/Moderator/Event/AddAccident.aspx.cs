using MersadWebApplication.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Web;
using System.Web.Routing;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator.Event
{
    public partial class AddAccident : System.Web.UI.Page
    {
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();
        private readonly ClsHelper _helper = new ClsHelper();


        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!CheckSession.ControlSession() || this.IsPostBack)
                    return;
                this._sqlHelper.FillAllHtmlSelect(this.cmbProvince, "", "SP_Fill_TBL_Province");
                HtmlInputHidden hideAccidentGuid = this.hideAccidentGuid;
                Guid guid = Guid.NewGuid();
                string str1 = guid.ToString();
                hideAccidentGuid.Value = str1;
                HtmlInputHidden accidentPicturesGuid = this.hideAccidentPicturesGuid;
                guid = Guid.NewGuid();
                string str2 = guid.ToString();
                accidentPicturesGuid.Value = str2;
                this.hidPoliceStationArea.Value = this._sqlHelper.Select_PoliceStationArea(Convert.ToInt64(this.Session["UserId"]));
                if (this.Request.QueryString["Id"] == null)
                    return;
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
                this._sqlHelper.GetEditAccident(Convert.ToInt64(this.Request.QueryString["Id"]), true, out getId, false, out serial, out provinceId, out centerCode, out centerName, out routeCode, out routeName, out segmentCode, out segmentName, out spotCode, out spotName, out timeOfAccident, out policeAwarenessTime, out policeArrivalTime, out emsArrivalTime, out sosArrivalTime, out policeAwarenessType, out longitude, out latitude, out distanceFromTheOrigin, out dateOfAccident, out dateOfFormCompletion, out location, out bool _, out string _, out string _, out bool? _, out string _, out string _, out string _);
                this.SetFormNotComplete(getId, provinceId, serial, centerCode, centerName, routeCode, routeName, segmentCode, segmentName, spotCode, spotName, timeOfAccident, policeAwarenessTime, policeArrivalTime, emsArrivalTime, sosArrivalTime, policeAwarenessType, longitude, latitude, distanceFromTheOrigin, dateOfAccident, dateOfFormCompletion, location);
            }
            catch (Exception ex)
            {
                this.lblMessage.InnerHtml = this._helper.ErrorMessages("خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید");
                this.lblMessage.Visible = true;
                this._sqlHelper.Insert_Exception("", ex.ToString());
            }
        }

        private void SetFormNotComplete(
          string getId,
          string provinceId,
          string serial,
          string centerCode,
          string centerName,
          string routeCode,
          string routeName,
          string segmentCode,
          string segmentName,
          string spotCode,
          string spotName,
          string timeOfAccident,
          string policeAwarenessTime,
          string policeArrivalTime,
          string emsArrivalTime,
          string sosArrivalTime,
          string policeAwarenessType,
          string longitude,
          string latitude,
          string distanceFromTheOrigin,
          string dateOfAccident,
          string dateOfFormCompletion,
          string location)
        {
            if (string.IsNullOrEmpty(getId))
                return;
            this.FillEdit(getId, provinceId, serial, centerCode, centerName, routeCode, routeName, segmentCode, segmentName, spotCode, spotName, timeOfAccident, policeAwarenessTime, policeArrivalTime, emsArrivalTime, sosArrivalTime, policeAwarenessType, longitude, latitude, distanceFromTheOrigin, dateOfAccident, dateOfFormCompletion, location);
            string str = this._sqlHelper.Select_AccidentPictureGuid(Convert.ToInt64(getId));
            this.hideAccidentGuid.Value = this._sqlHelper.Select_AccidentGuid(Convert.ToInt64(getId));
            this.hideAccidentPicturesGuid.Value = str;
        }

        private void FillEdit(
          string getId,
          string provinceId,
          string serial,
          string centerCode,
          string centerName,
          string routeCode,
          string routeName,
          string segmentCode,
          string segmentName,
          string spotCode,
          string spotName,
          string timeOfAccident,
          string policeAwarenessTime,
          string policeArrivalTime,
          string emsArrivalTime,
          string sosArrivalTime,
          string policeAwarenessType,
          string longitude,
          string latitude,
          string distanceFromTheOrigin,
          string dateOfAccident,
          string dateOfFormCompletion,
          string location)
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

        [WebMethod]
        public static List<GetSubmit> LoadBorderComment(string accidentId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(accidentId))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                string firstBorder;
                string secondBorder;
                string thirdBorder;
                string fourthBorder;
                string fifthBorder;
                string sixthBorder;
                string seventhBorder;
                clsSqlHelper.LoadBorderComment(Convert.ToInt64(accidentId), out firstBorder, out secondBorder, out thirdBorder, out fourthBorder, out fifthBorder, out sixthBorder, out seventhBorder);
                return AddAccident.GetSubmitMethod("", firstBorder + "," + secondBorder + "," + thirdBorder + "," + fourthBorder + "," + fifthBorder + "," + sixthBorder + "," + seventhBorder, "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }


        [WebMethod]
        public static List<GetSubmit> LoadComment(string accidentId, string type)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                return string.IsNullOrEmpty(accidentId) ? AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false") : AddAccident.GetSubmitMethod("", clsSqlHelper.LoadAccidentComment(Convert.ToInt64(accidentId), type), "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }
        //InsetAccidetnt

        [WebMethod]
        public static List<GetSubmit> GetFirstInsertUpdateAccident(
          string id,
          string serial,
          string provinceId,
          string centerCode,
          string centerName,
          string routeCode,
          string routeName,
          string segmentCode,
          string segmentName,
          string spotCode,
          string spotName,
          string timeOfAccident,
          string policeAwarenessTime,
          string policeArrivalTime,
          string emsArrivalTime,
          string sosArrivalTime,
          string policeAwarenessType,
          string longitude,
          string latitude,
          string distanceFromTheOrigin,
          string dateOfAccident,
          string dateOfFormCompletion,
          string location,
          string cityId,
          string isArea,
          string isNativeArea,
          string axisId,
          string inPoliceStationArea)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(serial))
                //    return AddAccident.GetSubmitMethod("", "شماره سریال را وارد کنید!", "", "false");
                //if (string.IsNullOrEmpty(provinceId) || provinceId.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "استان را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(timeOfAccident))
                //    return AddAccident.GetSubmitMethod("", "زمان وقوع تصادف را وارد کنید!", "", "false");
                //if (string.IsNullOrEmpty(policeAwarenessTime))
                //    return AddAccident.GetSubmitMethod("", "زمان مطلع شدن پلیس را وارد کنید!", "", "false");
                //if (string.IsNullOrEmpty(policeArrivalTime))
                //    return AddAccident.GetSubmitMethod("", "زمان رسیدگی پلیس را وارد کنید!", "", "false");
                //if (string.IsNullOrEmpty(dateOfAccident))
                //    return AddAccident.GetSubmitMethod("", "تاریخ تصادف را وارد کنید!", "", "false");
                //if (string.IsNullOrEmpty(dateOfFormCompletion))
                //    return AddAccident.GetSubmitMethod("", "تاریخ تکمیل را وارد کنید!", "", "false");
                //if (string.IsNullOrEmpty(longitude))
                //    return AddAccident.GetSubmitMethod("", "طول جغرافیایی را وارد کنید!", "", "false");
                //if (string.IsNullOrEmpty(latitude))
                //    return AddAccident.GetSubmitMethod("", "عرض جغرافیایی را وارد کنید!", "", "false");
                //if (string.IsNullOrEmpty(location))
                //    return AddAccident.GetSubmitMethod("", "لطفا موقعیت تصادف را روی نقشه انتخاب کنید!", "", "false");
                ClsHelper clsHelper = new ClsHelper();
                //if (!string.IsNullOrEmpty(distanceFromTheOrigin) && !clsHelper.IsNumber(distanceFromTheOrigin))
                //    return AddAccident.GetSubmitMethod("", "فاصله از مبدا وارد شده صحیح نمی باشد!", "", "false");
                int num1 = 0;
                if (!string.IsNullOrEmpty(timeOfAccident))
                    num1 = Convert.ToInt32(timeOfAccident.Replace(":", ""));
                int num2 = 0;
                if (!string.IsNullOrEmpty(policeAwarenessTime))
                    num2 = Convert.ToInt32(policeAwarenessTime.Replace(":", ""));
                //  if (num1 > num2 && dateOfAccident == dateOfFormCompletion)
                //         return AddAccident.GetSubmitMethod("", "زمان مطلع شدن پلیس نمیتواند زودتر از زمان تصادف باشد!", "", "false");
                //int num3 = 0;
                //    if (!string.IsNullOrEmpty(policeAwarenessTime))
                //       num3 = Convert.ToInt32(policeArrivalTime.Replace(":", ""));
                // if (num3 < num2 && dateOfAccident == dateOfFormCompletion)
                //     return AddAccident.GetSubmitMethod("", "زمان رسیدگی پلیس نمیتواند زودتر از زمان مطلع شدن پلیس باشد!", "", "false");
                //  if (!string.IsNullOrEmpty(policeAwarenessTime) && num3 < num1 && dateOfAccident == dateOfFormCompletion)
                //      return AddAccident.GetSubmitMethod("", "زمان رسیدگی پلیس نمیتواند زودتر از زمان تصادف باشد!", "", "false");
                //int num4 = 0;
                //  if (!string.IsNullOrEmpty(emsArrivalTime))
                //      num4 = Convert.ToInt32(emsArrivalTime.Replace(":", ""));
                //  if (!string.IsNullOrEmpty(emsArrivalTime) && num4 < num1 && dateOfAccident == dateOfFormCompletion)
                //      return AddAccident.GetSubmitMethod("", "زمان حضور اورژانس نمیتواند زودتر از زمان تصادف باشد!", "", "false");
                //int num5 = 0;
                //   if (!string.IsNullOrEmpty(sosArrivalTime))
                //       num5 = Convert.ToInt32(sosArrivalTime.Replace(":", ""));
                //if (!string.IsNullOrEmpty(sosArrivalTime) && num5 < num1 && dateOfAccident == dateOfFormCompletion)
                //    return AddAccident.GetSubmitMethod("", "زمان حضور امداد نمیتواند زودتر از زمان تصادف باشد!", "", "false");
               // int num6 = 0;
                //if (!string.IsNullOrEmpty(dateOfAccident))
                //   num6 = Convert.ToInt32(dateOfAccident.Replace("/", ""));
                //  if (!string.IsNullOrEmpty(dateOfAccident) && num6 > Convert.ToInt32(clsHelper.GetPersianDate(DateTime.Now).Replace("/", "")))
                //      return AddAccident.GetSubmitMethod("", "تاریخ تصادف نمیتواند جلوتر از تاریخ روز باشد!", "", "false");
                //int num7 = 0;
                //  if (!string.IsNullOrEmpty(dateOfFormCompletion))
                //      num7 = Convert.ToInt32(dateOfFormCompletion.Replace("/", ""));
                // if (!string.IsNullOrEmpty(dateOfFormCompletion) && num6 > num7)
                //     return AddAccident.GetSubmitMethod("", "تاریخ تکمیل نمیتواند جلوتر از تاریخ تصادف باشد!", "", "false");

                //if (!inPoliceStationArea.ToLower().Equals("true"))
                //    return AddAccident.GetSubmitMethod("", "نقطه تصادف انتخاب شده با استان انتخابی همخوانی ندارد،در صورت اطمینان از درست بودن هر دو مورد،با پشتیبان تماس بگیرید!", "", "false");


                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                int int32 = string.IsNullOrEmpty(distanceFromTheOrigin) ? 0 : Convert.ToInt32(distanceFromTheOrigin);
                int? axisId1 = 10015;
                long num8 = string.IsNullOrEmpty(id) ? clsSqlHelper.Insert_Accident(serial, Convert.ToInt32(provinceId), centerCode, centerName, routeCode, routeName, segmentCode, segmentName, spotCode, spotName, timeOfAccident, policeAwarenessTime, policeArrivalTime, emsArrivalTime, sosArrivalTime, policeAwarenessType, longitude, latitude, int32, dateOfAccident, dateOfFormCompletion, location, new long?(int64), new int?(Convert.ToInt32(cityId)), Convert.ToBoolean(isNativeArea), axisId1) : clsSqlHelper.SetEditAccidentFirst(new long?(Convert.ToInt64(id)), serial, Convert.ToInt32(provinceId), centerCode, centerName, routeCode, routeName, segmentCode, segmentName, spotCode, spotName, timeOfAccident, policeAwarenessTime, policeArrivalTime, emsArrivalTime, sosArrivalTime, policeAwarenessType, longitude, latitude, int32, dateOfAccident, dateOfFormCompletion, location, new long?(int64), new int?(Convert.ToInt32(cityId)), Convert.ToBoolean(isNativeArea), axisId1);
                if (num8.Equals(-1L))
                    return AddAccident.GetSubmitMethod("", "شماره سریال وارد شده،از قبل وجود دارد!", "", "false");
                return num8.Equals(-2L) ? AddAccident.GetSubmitMethod("", "این رخداد توسط شما ایجاد نشده و امکان ویرایش آن برای شما امکانپذیر نیست!", "", "false") : AddAccident.GetSubmitMethod(num8.ToString(), "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> SecondUpdateAccident(
          string id,
          string crashType,
          string crashScene,
          string hasAddingWitness,
          string collisionOfA,
          string collisionOfATwo,
          string typeOfCollision)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                // if (!CheckSession.ControlSession())
                //     return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(id))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(crashType) || crashType.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "نوع تصادف را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(collisionOfA) || collisionOfA.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "نوع برخورد را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(collisionOfATwo) || collisionOfATwo.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "نوع برخورد 'با' را انتخاب کنید!", "", "false");
                //if (collisionOfA.Equals("وسیله نقلیه") && collisionOfATwo.Equals("یک وسیله نقلیه") && string.IsNullOrEmpty(typeOfCollision))
                //    return AddAccident.GetSubmitMethod("", "نحوه برخورد را انتخاب کنید!", "", "false");
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                bool? hasAddingWitness1 = string.IsNullOrEmpty(hasAddingWitness) ? new bool?() : new bool?(Convert.ToBoolean(hasAddingWitness));
                return clsSqlHelper.SetEditAccidentSecond(new long?(Convert.ToInt64(id)), crashType, crashScene, hasAddingWitness1, collisionOfA, collisionOfATwo, typeOfCollision, new long?(int64)).Equals(-1L) ? AddAccident.GetSubmitMethod("", "تنها ثبت کننده رخداد تصادف،امکان ویرایش آن را دارد!", "", "false") : AddAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> SaveWitness(
          string accidentId,
          string index,
          string witnessName,
          string witnessPhone)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(accidentId))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(witnessName))
                //    return AddAccident.GetSubmitMethod("", "نام و نام خانوادگی شاهد را وارد کنید!", "", "false");
                //if (string.IsNullOrEmpty(witnessPhone))
                //    return AddAccident.GetSubmitMethod("", "شماره تلفن شاهد را وارد کنید!", "", "false");
                string name;
                string phone;
                clsSqlHelper.GetEditWitness(Convert.ToInt64(accidentId), (byte)((uint)Convert.ToByte(index) - 1U), out name, out phone);
                // if (string.IsNullOrEmpty(name) && string.IsNullOrEmpty(phone) && !index.Equals("0"))
                //     return AddAccident.GetSubmitMethod("", "ابتدا باید اطلاعات شاهد قبلی را ثبت کنید!", "", "false");
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                return clsSqlHelper.Insert_Witness(Convert.ToInt64(accidentId), Convert.ToByte(index), witnessName, witnessPhone, new long?(int64)).Equals(-1L) ? AddAccident.GetSubmitMethod("", "تنها ثبت کننده رخداد تصادف،امکان ثبت شاهد آن را دارد!", "", "false") : AddAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetWitness(string accidentId, string index)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(accidentId))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(index))
                //    return AddAccident.GetSubmitMethod("", "شاهد را انتخاب کنید!", "", "false");
                string name;
                string phone;
                clsSqlHelper.GetEditWitness(Convert.ToInt64(accidentId), Convert.ToByte(index), out name, out phone);
                return AddAccident.GetSubmitMethod("", name, phone, "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetAccidentCarDamage(string accidentId, string accidentCar)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(accidentId))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(accidentCar))
                //    return AddAccident.GetSubmitMethod("", "وسیله نقلیه آسیب دیده را انتخاب کنید!", "", "false");
                string firstPointCollision;
                string damagedParts;
                clsSqlHelper.GetEditAccidentCarDamage(Convert.ToInt64(accidentId), Convert.ToInt64(accidentCar), out firstPointCollision, out damagedParts);
                return AddAccident.GetSubmitMethod("", firstPointCollision, damagedParts, "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> LoadSecondStep(string accidentId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(accidentId))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                string crashType;
                string crashScene;
                string hasAddingWitness;
                string witnessName;
                string witnessPhone;
                string collisionOfA;
                string collisionOfATwo;
                string typeOfCollision;
                clsSqlHelper.GetLoadSecondStep(Convert.ToInt64(accidentId), out crashType, out crashScene, out hasAddingWitness, out witnessName, out witnessPhone, out collisionOfA, out collisionOfATwo, out typeOfCollision);
                return AddAccident.GetSubmitMethod("", crashType + "#" + crashScene + "#" + hasAddingWitness + "#" + collisionOfA + "#" + collisionOfATwo + "#" + typeOfCollision, witnessName + "#" + witnessPhone, "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> LoadThirdStep(string accidentId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(accidentId))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
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
                clsSqlHelper.GetLoadThirdStep(Convert.ToInt64(accidentId), out roadDefects, out carriageWayDirection, out lightingStatus, out roadSurfaceCondition, out visualObstruction, out isShoulderRoad, out shoulderRoad, out shouldersWidth, out roadMaintenance, out roadAssetsDamage, out locationLandUse, out carCrashLocation, out weather, out geometricDesign, out pavmentMarking, out roadwayWidthMain, out roadwayWidthSubsidiary, out roadwayWidthVillage, out maximumSpeedLimit);
                return AddAccident.GetSubmitMethod("", roadDefects + "#" + carriageWayDirection + "#" + lightingStatus + "#" + roadSurfaceCondition + "#" + visualObstruction + "#" + isShoulderRoad + "#" + shoulderRoad + "#" + shouldersWidth + "#" + roadMaintenance + "#" + roadAssetsDamage + "#" + locationLandUse + "#" + carCrashLocation + "#" + weather + "#" + geometricDesign + "#" + pavmentMarking + "#" + roadwayWidthMain + "#" + roadwayWidthSubsidiary + "#" + roadwayWidthVillage + "#" + maximumSpeedLimit, "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> ThirdUpdateAccident(
          string id,
          string roadDefects,
          string carriageWayDirection,
          string lightingStatus,
          string roadSurfaceCondition,
          string visualObstruction,
          string isShoulderRoad,
          string shoulderRoad,
          string shouldersWidth,
          string roadMaintenance,
          string roadAssetsDamage,
          string locationLandUse,
          string carCrashLocation,
          string weather,
          string geometricDesign,
          string pavmentMarking,
          string roadwayWidthMain,
          string roadwayWidthSubsidiary,
          string roadwayWidthVillage,
          string maximumSpeedLimit)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(id))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(roadDefects))
                //    return AddAccident.GetSubmitMethod("", "نقایص موثر راه را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(carriageWayDirection))
                //    return AddAccident.GetSubmitMethod("", "سمت جهت راه را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(lightingStatus))
                //    return AddAccident.GetSubmitMethod("", "وضع روشنایی را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(roadSurfaceCondition))
                //    return AddAccident.GetSubmitMethod("", "شرایط سطح راه را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(visualObstruction))
                //    return AddAccident.GetSubmitMethod("", "موانع دید را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(isShoulderRoad))
                //    return AddAccident.GetSubmitMethod("", "آیا مسیر دارای شانه است؟", "", "false");
                //if (!string.IsNullOrEmpty(isShoulderRoad) && string.IsNullOrEmpty(shoulderRoad))
                //    return AddAccident.GetSubmitMethod("", "نوع شانه را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(locationLandUse))
                //    return AddAccident.GetSubmitMethod("", "کاربری محل را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(carCrashLocation))
                //    return AddAccident.GetSubmitMethod("", "موقعیت تصادف را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(weather))
                //    return AddAccident.GetSubmitMethod("", "وضع هوا را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(geometricDesign))
                //    return AddAccident.GetSubmitMethod("", "وضع هندسه محل تصادف را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(roadwayWidthMain) && string.IsNullOrEmpty(roadwayWidthSubsidiary) && string.IsNullOrEmpty(roadwayWidthVillage))
                //return AddAccident.GetSubmitMethod("", "عرض راه را وارد کنید!", "", "false");
                //if (string.IsNullOrEmpty(maximumSpeedLimit))
                //    return AddAccident.GetSubmitMethod("", "حداکثر سرعت مجاز راه را وارد کنید!", "", "false");
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                return clsSqlHelper.SetEditAccidentThird(Convert.ToInt64(id), roadDefects, carriageWayDirection, lightingStatus, roadSurfaceCondition, visualObstruction, Convert.ToBoolean(isShoulderRoad), shoulderRoad, shouldersWidth, roadMaintenance, roadAssetsDamage, locationLandUse, carCrashLocation, weather, geometricDesign, pavmentMarking, roadwayWidthMain, roadwayWidthSubsidiary, roadwayWidthVillage, Convert.ToByte(maximumSpeedLimit), int64).Equals(-1L) ? AddAccident.GetSubmitMethod("", "تنها ثبت کننده رخداد تصادف،امکان ویرایش آن را دارد!", "", "false") : AddAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> FourthUpdateAccident(
          string id,
          string finalReason,
          string lackOfAttention,
          string inabilityControlVehicle,
          string vehicleFactorInCarCrash,
          string humanFactorInCarCrash,
          string judicialCause)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(id))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(finalReason))
                //    return AddAccident.GetSubmitMethod("", "نقایص موثر راه را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(lackOfAttention))
                //    return AddAccident.GetSubmitMethod("", "سمت جهت راه را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(inabilityControlVehicle))
                //    return AddAccident.GetSubmitMethod("", "وضع روشنایی را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(vehicleFactorInCarCrash))
                //    return AddAccident.GetSubmitMethod("", "شرایط سطح راه را انتخاب کنید!", "", "false");
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                return clsSqlHelper.SetEditAccidentFourth(Convert.ToInt64(id), finalReason, lackOfAttention, inabilityControlVehicle, vehicleFactorInCarCrash, humanFactorInCarCrash, judicialCause, int64).Equals(-1L) ? AddAccident.GetSubmitMethod("", "تنها ثبت کننده رخداد تصادف،امکان ویرایش آن را دارد!", "", "false") : AddAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> FifthUpdateAccident(
          string id,
          string index,
          string numberOfVehiclesInvolved,
          string vehicleType,
          string driverFlee,
          string plateNumberFirst,
          string vehicleSystem,
          string vehicleManeuvering,
          string plateType,
          string safetyEquipment,
          string pathDirection,
          string signsOnRoad,
          string functionAfterDamage,
          string technicalInspection,
          string companyOrganisation,
          string vehicleHaveLoad,
          string loadType,
          string loadFreight,
          string systemIncompatibility,
          string airbagFunction,
          string accidentTraces,
          string typeOfCollision,
          string codeCausingAccident,
          string isLocal)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(id))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(numberOfVehiclesInvolved))
                //    return AddAccident.GetSubmitMethod("", "تعداد وسایل \u200Cنقلیه درگیر در تصادف را وارد کنید!", "", "false");
                //if (string.IsNullOrEmpty(vehicleType) || vehicleType.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "نوع وسیله نقلیه را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(vehicleSystem))
                //    return AddAccident.GetSubmitMethod("", "سیستم وسیله نقلیه را وارد کنید!", "", "false");
                //if (string.IsNullOrEmpty(vehicleManeuvering) || vehicleManeuvering.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "مانور وسیله نقلیه را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(technicalInspection) || technicalInspection.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "معاینه فنی را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(vehicleHaveLoad))
                //    return AddAccident.GetSubmitMethod("", "به این سوال پاسخ دهید : آیا وسیله نقلیه دارای بار است؟", "", "false");
                //if (string.IsNullOrEmpty(typeOfCollision) || typeOfCollision.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "نحوه برخورد را انتخاب کنید!", "", "false");
                //if (vehicleHaveLoad.Equals("true") && (string.IsNullOrEmpty(loadType) || loadType.Equals("-1")))
                //    return AddAccident.GetSubmitMethod("", "نوع بار را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(codeCausingAccident))
                //    return AddAccident.GetSubmitMethod("", " کد نوع تخلف حادثه \u00ADساز را وارد کنید!", "", "false");
                string str;
                if (!vehicleType.Equals("موتورسیکلت"))
                    str = plateNumberFirst.Split('|')[0];
                else
                    str = plateNumberFirst.Split('|')[1];
                plateNumberFirst = str;
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                bool? didDriverFleeScene = string.IsNullOrEmpty(driverFlee) ? new bool?() : new bool?(Convert.ToBoolean(driverFlee));
                bool? systemIncompatibility1 = string.IsNullOrEmpty(systemIncompatibility) ? new bool?() : new bool?(Convert.ToBoolean(systemIncompatibility));
                bool? airbagFunction1 = string.IsNullOrEmpty(airbagFunction) ? new bool?() : new bool?(Convert.ToBoolean(airbagFunction));
                short? loadFreight1 = string.IsNullOrEmpty(loadFreight) ? new short?() : new short?(Convert.ToInt16(loadFreight));
                bool? isLocal1 = string.IsNullOrEmpty(isLocal) ? new bool?() : new bool?(Convert.ToBoolean(isLocal));
                return clsSqlHelper.Insert_AccidentVehicle(Convert.ToInt64(id), Convert.ToByte(index), didDriverFleeScene, plateNumberFirst, vehicleType, vehicleSystem, vehicleManeuvering, plateType, safetyEquipment, pathDirection, signsOnRoad, functionAfterDamage, technicalInspection, companyOrganisation, Convert.ToBoolean(vehicleHaveLoad), loadType, loadFreight1, systemIncompatibility1, airbagFunction1, accidentTraces, typeOfCollision, codeCausingAccident, int64, isLocal1).Equals(-1L) ? AddAccident.GetSubmitMethod("", "تنها ثبت کننده رخداد تصادف،امکان ویرایش آن را دارد!", "", "false") : AddAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> FifthUpdateAccidentSecond(
          string id,
          string index,
          string brakeTraceBeforeAccident,
          string brakeTraceAfterAccident,
          string distanceMoveAfterAccident,
          string accelerationIncludings,
          string roadFrictionFactor,
          string vehiclesHeightFromGround,
          string slopeDegreeDirection,
          string brakeAcceleration,
          string roadsCurveRadius,
          string tierMarks,
          string quDriverNoticedDanger,
          string quDriverTime,
          string quMaximumDistancePieces,
          string brakeTraceTestSpeed,
          string testSpeed)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(id))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                Decimal? brakeTraceBeforeAccident1 = string.IsNullOrEmpty(brakeTraceBeforeAccident) ? new Decimal?() : new Decimal?(Convert.ToDecimal(brakeTraceBeforeAccident));
                Decimal? brakeTraceAfterAccident1 = string.IsNullOrEmpty(brakeTraceAfterAccident) ? new Decimal?() : new Decimal?(Convert.ToDecimal(brakeTraceAfterAccident));
                Decimal? distanceMoveAfterAccident1 = string.IsNullOrEmpty(distanceMoveAfterAccident) ? new Decimal?() : new Decimal?(Convert.ToDecimal(distanceMoveAfterAccident));
                Decimal? accelerationIncludings1 = string.IsNullOrEmpty(accelerationIncludings) ? new Decimal?() : new Decimal?(Convert.ToDecimal(accelerationIncludings));
                Decimal? roadFrictionFactor1 = string.IsNullOrEmpty(roadFrictionFactor) ? new Decimal?() : new Decimal?(Convert.ToDecimal(roadFrictionFactor));
                Decimal? vehiclesHeightFromGround1 = string.IsNullOrEmpty(vehiclesHeightFromGround) ? new Decimal?() : new Decimal?(Convert.ToDecimal(vehiclesHeightFromGround));
                Decimal? slopeDegreeDirection1 = string.IsNullOrEmpty(slopeDegreeDirection) ? new Decimal?() : new Decimal?(Convert.ToDecimal(slopeDegreeDirection));
                Decimal? brakeAcceleration1 = string.IsNullOrEmpty(brakeAcceleration) ? new Decimal?() : new Decimal?(Convert.ToDecimal(brakeAcceleration));
                Decimal? roadsCurveRadius1 = string.IsNullOrEmpty(roadsCurveRadius) ? new Decimal?() : new Decimal?(Convert.ToDecimal(roadsCurveRadius));
                Decimal? tierMarks1 = string.IsNullOrEmpty(tierMarks) ? new Decimal?() : new Decimal?(Convert.ToDecimal(tierMarks));
                Decimal? quDriverNoticedDanger1 = string.IsNullOrEmpty(quDriverNoticedDanger) ? new Decimal?() : new Decimal?(Convert.ToDecimal(quDriverNoticedDanger));
                Decimal? quDriverTime1 = string.IsNullOrEmpty(quDriverTime) ? new Decimal?() : new Decimal?(Convert.ToDecimal(quDriverTime));
                Decimal? quMaximumDistancePieces1 = string.IsNullOrEmpty(quMaximumDistancePieces) ? new Decimal?() : new Decimal?(Convert.ToDecimal(quMaximumDistancePieces));
                Decimal? brakeTraceTestSpeed1 = string.IsNullOrEmpty(brakeTraceTestSpeed) ? new Decimal?() : new Decimal?(Convert.ToDecimal(brakeTraceTestSpeed));
                Decimal? testSpeed1 = string.IsNullOrEmpty(testSpeed) ? new Decimal?() : new Decimal?(Convert.ToDecimal(testSpeed));
                return clsSqlHelper.SetFifthUpdateAccidentSecond(Convert.ToInt64(id), Convert.ToByte(index), brakeTraceBeforeAccident1, brakeTraceAfterAccident1, distanceMoveAfterAccident1, accelerationIncludings1, roadFrictionFactor1, vehiclesHeightFromGround1, slopeDegreeDirection1, brakeAcceleration1, roadsCurveRadius1, tierMarks1, quDriverNoticedDanger1, quDriverTime1, quMaximumDistancePieces1, brakeTraceTestSpeed1, testSpeed1, int64).Equals(-1L) ? AddAccident.GetSubmitMethod("", "تنها ثبت کننده رخداد تصادف،امکان ویرایش آن را دارد!", "", "false") : AddAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> FifthUpdateAccidentThird(
          string id,
          string index,
          string isDriversIdentity,
          string sex,
          string seatBelt,
          string driverStatues,
          string injuryAtScene,
          string reactionBeforeAccident,
          string numberOfPassengers,
          string nationalId,
          string firstName,
          string lastName,
          string fatherName,
          string age,
          string driverLicenceNumber,
          string dateLicenceIssue,
          string placeLicenceIssue,
          string driverLicenceCategory,
          string driverLicenceStatus,
          string isDriverLicenceIncompatibility,
          string education,
          string job,
          string transferMethod)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(id))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(isDriversIdentity))
                //    return AddAccident.GetSubmitMethod("", "به این سوال پاسخ دهید : آیا هویت راننده معلوم است؟", "", "false");
                //if (string.IsNullOrEmpty(sex) || sex.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "جنسیت را انتخاب کنید!", "", "false");
                byte? age1 = string.IsNullOrEmpty(age) ? new byte?() : new byte?(Convert.ToByte(age));
                //if (isDriversIdentity == "true")
                //{
                //    if (nationalId == "")
                //        return AddAccident.GetSubmitMethod("", "کد ملی را وارد کنید!", "", "false");
                //    if (!new ClsHelper().IsValidNationalCode(nationalId))
                //        return AddAccident.GetSubmitMethod("", "کد ملی وارد شده صحیح نمی باشد!", "", "false");
                //    if (firstName == "")
                //        return AddAccident.GetSubmitMethod("", "نام را وارد کنید!", "", "false");
                //    if (lastName == "")
                //        return AddAccident.GetSubmitMethod("", "نام خانوادگی را وارد کنید!", "", "false");
                //    if (fatherName == "")
                //        return AddAccident.GetSubmitMethod("", "نام پدر را وارد کنید!", "", "false");
                //    if (age == "")
                //        return AddAccident.GetSubmitMethod("", "سن را وارد کنید!", "", "false");
                //    byte? nullable1 = age1;
                //    int? nullable2 = nullable1.HasValue ? new int?((int)nullable1.GetValueOrDefault()) : new int?();
                //    int num1 = 17;
                //    if (nullable2.GetValueOrDefault() > num1 & nullable2.HasValue && driverLicenceNumber == "")
                //        return AddAccident.GetSubmitMethod("", "شماره گواهینامه را وارد کنید!", "", "false");
                //    nullable1 = age1;
                //    nullable2 = nullable1.HasValue ? new int?((int)nullable1.GetValueOrDefault()) : new int?();
                //    int num2 = 17;
                //    if (nullable2.GetValueOrDefault() > num2 & nullable2.HasValue && dateLicenceIssue == "")
                //        return AddAccident.GetSubmitMethod("", "تاریخ صدور گواهینامه را وارد کنید!", "", "false");
                //    nullable1 = age1;
                //    nullable2 = nullable1.HasValue ? new int?((int)nullable1.GetValueOrDefault()) : new int?();
                //    int num3 = 17;
                //    if (nullable2.GetValueOrDefault() > num3 & nullable2.HasValue && (driverLicenceCategory == "" || driverLicenceCategory.Equals("-1")))
                //        return AddAccident.GetSubmitMethod("", "نوع گواهینامه را انتخاب کنید!", "", "false");
                //    nullable1 = age1;
                //    nullable2 = nullable1.HasValue ? new int?((int)nullable1.GetValueOrDefault()) : new int?();
                //    int num4 = 17;
                //    if (nullable2.GetValueOrDefault() > num4 & nullable2.HasValue && (driverLicenceStatus == "" || driverLicenceStatus.Equals("-1")))
                //        return AddAccident.GetSubmitMethod("", "وضعیت گواهینامه را انتخاب کنید!", "", "false");
                //    nullable1 = age1;
                //    nullable2 = nullable1.HasValue ? new int?((int)nullable1.GetValueOrDefault()) : new int?();
                //    int num5 = 17;
                //    if (nullable2.GetValueOrDefault() > num5 & nullable2.HasValue && string.IsNullOrEmpty(isDriverLicenceIncompatibility))
                //        return AddAccident.GetSubmitMethod("", "به این سوال پاسخ دهید : آیا اطلاعات با سیستم صدور گواهینامه تطابق دارد؟", "", "false");
                //    if (driverStatues != "در صحنه حضور دارد" && driverStatues != "از صحنه متواری شده" && transferMethod == "")
                //        return AddAccident.GetSubmitMethod("", "نحوه انتقال را وارد کنید!", "", "false");
                //}
                //if (numberOfPassengers == "")
                //    return AddAccident.GetSubmitMethod("", "تعداد سرنشینان وسیله نقلیه را وارد کنید!", "", "false");
                //if (seatBelt == "" || seatBelt.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "کمربند / کلاه ایمنی را انتخاب کنید!", "", "false");
                //if (injuryAtScene == "" || injuryAtScene.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "صدمه در صحنه را انتخاب کنید!", "", "false");
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                Decimal? driverLicenceNumber1 = string.IsNullOrEmpty(driverLicenceNumber) ? new Decimal?() : new Decimal?(Convert.ToDecimal(driverLicenceNumber));
                bool? isDriverLicenceIncompatibility1 = string.IsNullOrEmpty(isDriverLicenceIncompatibility) ? new bool?() : new bool?(Convert.ToBoolean(isDriverLicenceIncompatibility));
                return clsSqlHelper.SetFifthUpdateAccidentThird(Convert.ToInt64(id), Convert.ToByte(index), Convert.ToBoolean(isDriversIdentity), sex, seatBelt, driverStatues, injuryAtScene, reactionBeforeAccident, Convert.ToByte(numberOfPassengers), nationalId, firstName, lastName, fatherName, age1, driverLicenceNumber1, dateLicenceIssue, placeLicenceIssue, driverLicenceCategory, driverLicenceStatus, isDriverLicenceIncompatibility1, education, job, transferMethod, int64).Equals(-1L) ? AddAccident.GetSubmitMethod("", "تنها ثبت کننده رخداد تصادف،امکان ویرایش آن را دارد!", "", "false") : AddAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> UpdateAccidentPedestrians(
          string id,
          string index,
          string onSiteCrossingFacilities,
          string isPedestriansIdentity,
          string sex,
          string nationalId,
          string firstName,
          string lastName,
          string fatherName,
          string age,
          string education,
          string job,
          string clothesColor,
          string pedestriansSituation,
          string pedestriansAverageSpeed,
          string pedestrianThrowDistance)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(id))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(onSiteCrossingFacilities) || onSiteCrossingFacilities.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "امکانات عبور در محل را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(isPedestriansIdentity))
                //    return AddAccident.GetSubmitMethod("", "به این سوال پاسخ دهید : آیا هویت عابر پیاده معلوم است؟", "", "false");
                //if (string.IsNullOrEmpty(sex) || sex.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "جنسیت را انتخاب کنید!", "", "false");
                //if (isPedestriansIdentity == "true")
                //{
                //    if (nationalId == "")
                //        return AddAccident.GetSubmitMethod("", "کد ملی را وارد کنید!", "", "false");
                //    if (!new ClsHelper().IsValidNationalCode(nationalId))
                //        return AddAccident.GetSubmitMethod("", "کد ملی وارد شده صحیح نمی باشد!", "", "false");
                //    if (firstName == "")
                //        return AddAccident.GetSubmitMethod("", "نام را وارد کنید!", "", "false");
                //    if (lastName == "")
                //        return AddAccident.GetSubmitMethod("", "نام خانوادگی را وارد کنید!", "", "false");
                //    if (fatherName == "")
                //        return AddAccident.GetSubmitMethod("", "نام پدر را وارد کنید!", "", "false");
                //    if (age == "")
                //        return AddAccident.GetSubmitMethod("", "سن را وارد کنید!", "", "false");
                //}
                //if (string.IsNullOrEmpty(clothesColor) || clothesColor.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "رنگ لباسرا انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(pedestriansSituation) || pedestriansSituation.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "وضعیت را انتخاب کنید!", "", "false");
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                byte? age1 = string.IsNullOrEmpty(age) ? new byte?() : new byte?(Convert.ToByte(age));
                byte? pedestriansAverageSpeed1 = string.IsNullOrEmpty(pedestriansAverageSpeed) ? new byte?() : new byte?(Convert.ToByte(pedestriansAverageSpeed));
                short? pedestrianThrowDistance1 = string.IsNullOrEmpty(pedestrianThrowDistance) ? new short?() : new short?(Convert.ToInt16(pedestrianThrowDistance));
                return clsSqlHelper.SetUpdateAccidentPedestrians(
                    Convert.ToInt64(id),
                    Convert.ToByte(index), 
                    onSiteCrossingFacilities,
                    Convert.ToBoolean(isPedestriansIdentity),
                    sex,
                    nationalId, 
                    firstName,
                    lastName, 
                    fatherName, 
                    age1, 
                    education,
                    job,
                    clothesColor, 
                    pedestriansSituation,
                    pedestriansAverageSpeed1,
                    pedestrianThrowDistance1,
                    int64).Equals(-1L) 
                    ? AddAccident.GetSubmitMethod("", "تنها ثبت کننده رخداد تصادف،امکان ویرایش آن را دارد!", "", "false") : AddAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> UpdateAccidentBikeRiders(
          string id,
          string index,
          string onSiteCrossingFacilities,
          string isIdentity,
          string sex,
          string nationalId,
          string firstName,
          string lastName,
          string fatherName,
          string age,
          string education,
          string job,
          string clothesColor,
          string situation,
          string averageSpeed,
          string throwDistance)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(id))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(onSiteCrossingFacilities) || onSiteCrossingFacilities.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "امکانات عبور در محل را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(isIdentity))
                //    return AddAccident.GetSubmitMethod("", "به این سوال پاسخ دهید : آیا هویت دوچرخه سوار معلوم است؟", "", "false");
                //if (string.IsNullOrEmpty(sex) || sex.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "جنسیت را انتخاب کنید!", "", "false");
                //if (isIdentity == "true")
                //{
                //    if (nationalId == "")
                //        return AddAccident.GetSubmitMethod("", "کد ملی را وارد کنید!", "", "false");
                //    if (!new ClsHelper().IsValidNationalCode(nationalId))
                //        return AddAccident.GetSubmitMethod("", "کد ملی وارد شده صحیح نمی باشد!", "", "false");
                //    if (firstName == "")
                //        return AddAccident.GetSubmitMethod("", "نام را وارد کنید!", "", "false");
                //    if (lastName == "")
                //        return AddAccident.GetSubmitMethod("", "نام خانوادگی را وارد کنید!", "", "false");
                //    if (fatherName == "")
                //        return AddAccident.GetSubmitMethod("", "نام پدر را وارد کنید!", "", "false");
                //    if (age == "")
                //        return AddAccident.GetSubmitMethod("", "سن را وارد کنید!", "", "false");
                //}
                //if (string.IsNullOrEmpty(clothesColor) || clothesColor.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "رنگ لباسرا انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(situation) || situation.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "وضعیت را انتخاب کنید!", "", "false");
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                byte? age1 = string.IsNullOrEmpty(age) ? new byte?() : new byte?(Convert.ToByte(age));
                byte? averageSpeed1 = string.IsNullOrEmpty(averageSpeed) ? new byte?() : new byte?(Convert.ToByte(averageSpeed));
                short? throwDistance1 = string.IsNullOrEmpty(throwDistance) ? new short?() : new short?(Convert.ToInt16(throwDistance));
                return clsSqlHelper.SetUpdateAccidentBikeRiders(
                    Convert.ToInt64(id), 
                    Convert.ToByte(index), 
                    onSiteCrossingFacilities, 
                    Convert.ToBoolean(isIdentity), 
                    sex,
                    nationalId,
                    firstName,
                    lastName, 
                    fatherName,
                    age1, 
                    education,
                    job,
                    clothesColor,
                    situation,
                    averageSpeed1,
                    throwDistance1,
                    int64).Equals(-1L) ? AddAccident.GetSubmitMethod("", "تنها ثبت کننده رخداد تصادف،امکان ویرایش آن را دارد!", "", "false") : AddAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> UpdateSixthStepAccident(
          string id,
          string index,
          string injuredRole,
          string numberOfInjured,
          string passengerIdentity,
          string sex,
          string nationalId,
          string firstName,
          string lastName,
          string fatherName,
          string age,
          string education,
          string job,
          string injuryPassenger,
          string safetyPassenger,
          string passengerSituation,
          string injuredTransferMethod,
          string ambulanceCode,
          string tableId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (numberOfInjured == "0")
                //{
                //    clsSqlHelper.SetUpdatePassenger(Convert.ToInt64(id), (byte)0, "", "0", new bool?(), (string)null, (string)null, (string)null, (string)null, (string)null, new byte?(), (string)null, (string)null, (string)null, (string)null, (string)null, (string)null, (string)null, 0L, 0L);
                //    return AddAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
                //}
                //if (string.IsNullOrEmpty(id))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(index))
                //    return AddAccident.GetSubmitMethod("", "ابتدا باید یکی از مصدومین یا متوفیان را انتخاب کنید!", "", "false");
                //if (string.IsNullOrEmpty(numberOfInjured))
                //    return AddAccident.GetSubmitMethod("", "تعداد مصدومین و متوفیان در تصادف را وارد کنید!", "", "false");
                //if (string.IsNullOrEmpty(injuredRole))
                //    return AddAccident.GetSubmitMethod("", "از بین نقشها یکی را انتخاب کنید!", "", "false");
                if (injuredRole == "Passenger" && string.IsNullOrEmpty(passengerIdentity))
                    return AddAccident.GetSubmitMethod("", "به این سوال پاسخ دهید : آیا هویت سرنشین معلوم است؟!", "", "false");
                //if (passengerIdentity == "true")
                //{
                //    if (string.IsNullOrEmpty(sex) || sex.Equals("-1"))
                //        return AddAccident.GetSubmitMethod("", "جنسیت را انتخاب کنید!", "", "false");
                //    if (nationalId == "")
                //        return AddAccident.GetSubmitMethod("", "کد ملی را وارد کنید!", "", "false");
                //    if (!new ClsHelper().IsValidNationalCode(nationalId))
                //        return AddAccident.GetSubmitMethod("", "کد ملی وارد شده صحیح نمی باشد!", "", "false");
                //    if (string.IsNullOrEmpty(age))
                //        return AddAccident.GetSubmitMethod("", "سن را وارد کنید!", "", "false");
                //    if (string.IsNullOrEmpty(safetyPassenger) || safetyPassenger.Equals("-1"))
                //        return AddAccident.GetSubmitMethod("", "ایمنی را انتخاب کنید!", "", "false");
                //    if (string.IsNullOrEmpty(passengerSituation) || passengerSituation.Equals("-1"))
                //        return AddAccident.GetSubmitMethod("", "وضعیت را انتخاب کنید!", "", "false");
                //}
                //if (string.IsNullOrEmpty(injuredTransferMethod) || injuredTransferMethod.Equals("-1"))
                //    return AddAccident.GetSubmitMethod("", "نحوه انتقال مجروح را انتخاب کنید!", "", "false");
                //if (injuredTransferMethod == "آمبولانس" && string.IsNullOrEmpty(ambulanceCode))
                //    return AddAccident.GetSubmitMethod("", "کد آمبولانس را وارد کنید!", "", "false");
                //if (injuredRole != "Driver" && (string.IsNullOrEmpty(injuryPassenger) || injuryPassenger.Equals("-1")))
                //    return AddAccident.GetSubmitMethod("", "صدمه در صحنه را انتخاب کنید!", "", "false");
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                bool? passengerIdentity1 = !(injuredRole == "Passenger") || string.IsNullOrEmpty(passengerIdentity) ? new bool?() : new bool?(Convert.ToBoolean(passengerIdentity));
                byte? age1 = string.IsNullOrEmpty(age) ? new byte?() : new byte?(Convert.ToByte(age));



                return clsSqlHelper.SetUpdatePassenger(
                    Convert.ToInt64(id),
                    Convert.ToByte(0), 
                    injuredRole, 
                    numberOfInjured,
                    passengerIdentity1,
                    sex, nationalId, 
                    firstName, 
                    lastName, 
                    fatherName,
                    age1, 
                    education,
                    job, 
                    injuryPassenger, 
                    safetyPassenger,
                    passengerSituation, 
                    injuredTransferMethod,
                    ambulanceCode,
                    Convert.ToInt64(0),
                    int64).Equals(-1L) ?
                    AddAccident.GetSubmitMethod("", "تنها ثبت کننده رخداد تصادف،امکان ویرایش آن را دارد!", "", "false") : AddAccident.GetSubmitMethod("", "اطلاعات مصدومین و متوفیان درگیر در تصادف با موفقیت ثبت شد", "", "true");
            }

            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> SaveSeventhDamage(
          string accidentId,
          string selectAccidentCar,
          string firstPointCollision,
          string damagedParts)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(accidentId))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(selectAccidentCar))
                //    return AddAccident.GetSubmitMethod("", "وسیله نقلیه آسیب دیده را انتخاب کنید!", "", "false");
                damagedParts = damagedParts.Replace("#", ",");
                clsSqlHelper.SaveSeventhDamage(new long?(Convert.ToInt64(accidentId)), selectAccidentCar, firstPointCollision, damagedParts);
                return AddAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> CompleteForm(string accidentId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(accidentId))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                clsSqlHelper.SaveCompleteForm(Convert.ToInt64(accidentId));
                return AddAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> SaveSeventhStep(
          string accidentId,
          string primaryCause,
          string formerCause,
          string directCause,
          string inputVehicleAccident,
          string inputPedestrianAccident,
          string inputBikeRiderAccident,
          string inputPassengerAccident,
          string organizationsToBlame,
          string directCausePrecent)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(accidentId))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (clsSqlHelper.Select_GetCountDamage(Convert.ToInt64(accidentId)) == 0)
                //    return AddAccident.GetSubmitMethod("", "ابتدا باید قسمت های آسیب دیده وسایل نقلیه را ثبت نمایید!", "", "false");
                string numberOfInjured;
                clsSqlHelper.GetLoadSixthStep(Convert.ToInt64(accidentId), out numberOfInjured);
                string crashType;
                clsSqlHelper.GetEditAccident(Convert.ToInt64(accidentId), false, out string _, false, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out bool _, out crashType, out string _, out bool? _, out string _, out string _, out string _);
                //if (crashType.Equals("جرحی") && (string.IsNullOrEmpty(numberOfInjured) || numberOfInjured.Equals("0")))
                //    return AddAccident.GetSubmitMethod("", "این تصادف به عنوان جرحی ثبت شده و حتما باید مصدوم یا متوفی داشته باشد!", "", "false");
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                clsSqlHelper.SaveSeventhStep(new long?(Convert.ToInt64(accidentId)), primaryCause, formerCause, directCause, organizationsToBlame, directCausePrecent, new long?(int64));
                clsSqlHelper.SaveSeventhStepInput(inputVehicleAccident, inputPedestrianAccident, inputBikeRiderAccident, inputPassengerAccident);
                return AddAccident.GetSubmitMethod("", "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
               
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> LoadFourthStep(string accidentId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                    //return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(accidentId))
                    //return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                string finalReason;
                string lackOfAttention;
                string inabilityControlVehicle;
                string vehicleFactorInCarCrash;
                string humanFactorInCarCrash;
                string judicialCause;
                clsSqlHelper.GetLoadFourthStep(Convert.ToInt64(accidentId), out finalReason, out lackOfAttention, out inabilityControlVehicle, out vehicleFactorInCarCrash, out humanFactorInCarCrash, out judicialCause);
                return AddAccident.GetSubmitMethod("", finalReason + "#" + lackOfAttention + "#" + inabilityControlVehicle + "#" + vehicleFactorInCarCrash + "#" + humanFactorInCarCrash + "#" + judicialCause, "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetLoadSeventhStep> LoadPeopleAccident(string accidentId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return new List<GetLoadSeventhStep>()
          {
            new GetLoadSeventhStep()
            {
              SelectPeopleAccident = "صفحه را مجدد بارگذاری نمایید!",
              PeopleAccident = "false"
            }
          };
                if (string.IsNullOrEmpty(accidentId))
                    return new List<GetLoadSeventhStep>()
          {
            new GetLoadSeventhStep()
            {
              SelectPeopleAccident = "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!",
              PeopleAccident = "false"
            }
          };
                string str1 = clsSqlHelper.Select_PeopleAccident(Convert.ToInt64(accidentId));
                string str2 = clsSqlHelper.Select_InputPeopleAccident(Convert.ToInt64(accidentId));
                string str3 = clsSqlHelper.Select_OptionPeopleAccident(Convert.ToInt64(accidentId));
                string primaryCause;
                string formerCause;
                string directCause;
                string organizationsToBlame;
                string directCausePrecent;
                clsSqlHelper.Select_SeventhAccident(Convert.ToInt64(accidentId), out primaryCause, out formerCause, out directCause, out organizationsToBlame, out directCausePrecent);
                return new List<GetLoadSeventhStep>()
        {
          new GetLoadSeventhStep()
          {
            SelectPeopleAccident = str3,
            PeopleAccident = str1,
            InputPeopleAccident = str2,
            PrimaryCause = primaryCause,
            FormerCause = formerCause,
            DirectCause = directCause,
            OrganizationsToBlame = organizationsToBlame,
            DirectCausePrecent = directCausePrecent
          }
        };
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return new List<GetLoadSeventhStep>()
        {
          new GetLoadSeventhStep()
          {
            SelectPeopleAccident = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید",
            PeopleAccident = "false"
          }
        };
            }
        }

        [WebMethod]
        public static List<GetSubmit> LoadSixthStep(string accidentId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                //    return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(accidentId))
                //    return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                string numberOfInjured;
                clsSqlHelper.GetLoadSixthStep(Convert.ToInt64(accidentId), out numberOfInjured);
                string id = clsSqlHelper.Select_AccidentPictureGuid(Convert.ToInt64(accidentId));
                string msgTwo = clsSqlHelper.Select_AccidentGuid(Convert.ToInt64(accidentId));
                return AddAccident.GetSubmitMethod(id, numberOfInjured, msgTwo, "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> LoadFifthStep(string accidentId, string index)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                //if (!CheckSession.ControlSession())
                    //return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                //if (string.IsNullOrEmpty(accidentId))
                    //return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
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
                clsSqlHelper.GetLoadFifthStep(Convert.ToInt64(accidentId), Convert.ToByte(index), out driverFlee, out plateNumberFirst, out vehicleType, out vehicleSystem, out vehicleManeuvering, out plateType, out safetyEquipment, out pathDirection, out signsOnRoad, out functionAfterDamage, out technicalInspection, out companyOrganisation, out vehicleHaveLoad, out loadType, out loadFreight, out systemIncompatibility, out airbagFunction, out accidentTraces, out typeOfCollision, out codeCausingAccident);
                string firstName;
                string lastName;
                clsSqlHelper.GetLoadFifthStepThree(Convert.ToInt64(accidentId), Convert.ToByte(index), out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out firstName, out lastName, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _);
                return AddAccident.GetSubmitMethod("", driverFlee + "#" + plateNumberFirst + "#" + vehicleType + "#" + vehicleSystem + "#" + vehicleManeuvering + "#" + plateType + "#" + safetyEquipment + "#" + pathDirection + "#" + signsOnRoad + "#" + functionAfterDamage + "#" + technicalInspection + "#" + companyOrganisation + "#" + vehicleHaveLoad + "#" + loadType + "#" + loadFreight + "#" + systemIncompatibility + "#" + airbagFunction + "#" + accidentTraces + "#" + typeOfCollision + "#" + codeCausingAccident, firstName + "#" + lastName, "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> FillCmbVehiclesInvolved(string accidentId, string index)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
              // if (!CheckSession.ControlSession())
              //     return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
              // if (string.IsNullOrEmpty(accidentId))
              //     return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                string firstName;
                string lastName;
                clsSqlHelper.GetLoadFifthStepThree(Convert.ToInt64(accidentId), Convert.ToByte(index), out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out firstName, out lastName, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _);
                return AddAccident.GetSubmitMethod("", firstName + "#" + lastName, "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> FillCmbPedestriansInvolved(string accidentId, string index)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
              //  if (!CheckSession.ControlSession())
              //      return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
              //  if (string.IsNullOrEmpty(accidentId))
              //      return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                string firstName;
                string lastName;
                clsSqlHelper.GetLoadAccidentPedestrian(Convert.ToInt64(accidentId), Convert.ToByte(index), out string _, out string _, out string _, out string _, out firstName, out lastName, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _);
                return AddAccident.GetSubmitMethod("", firstName + "#" + lastName, "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> FillCmbBikeRidersInvolved(string accidentId, string index)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
              // if (!CheckSession.ControlSession())
              //     return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
              // if (string.IsNullOrEmpty(accidentId))
              //     return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                string firstName;
                string lastName;
                clsSqlHelper.GetLoadAccidentBikeRiders(Convert.ToInt64(accidentId), Convert.ToByte(index), out string _, out string _, out string _, out string _, out firstName, out lastName, out string _, out string _, out string _, out string _, out string _, out string _, out string _, out string _);
                return AddAccident.GetSubmitMethod("", firstName + "#" + lastName, "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetCountFifthStep(string accidentId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
              //  if (!CheckSession.ControlSession())
              //      return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
              //  if (string.IsNullOrEmpty(accidentId))
              //      return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                string numberVehiclesInvolved;
                string numberPedestriansInvolved;
                string numberBikeInvolved;
                clsSqlHelper.Select_GetCountFifth(Convert.ToInt64(accidentId), out numberVehiclesInvolved, out numberPedestriansInvolved, out numberBikeInvolved);
                return AddAccident.GetSubmitMethod("", numberVehiclesInvolved + "#" + numberPedestriansInvolved + "#" + numberBikeInvolved, "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> LoadFifthStepTwo(string accidentId, string index)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
            //   if (!CheckSession.ControlSession())
            //       return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
            //   if (string.IsNullOrEmpty(accidentId))
            //       return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
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
                clsSqlHelper.GetLoadFifthStepTwo(Convert.ToInt64(accidentId), Convert.ToByte(index), out brakeTraceBeforeAccident, out brakeTraceAfterAccident, out distanceMoveAfterAccident, out accelerationIncludings, out roadFrictionFactor, out vehiclesHeightFromGround, out slopeDegreeDirection, out brakeAcceleration, out roadsCurveRadius, out tierMarks, out quDriverNoticedDanger, out quDriverTime, out quMaximumDistancePieces, out brakeTraceTestSpeed, out testSpeed);
                return AddAccident.GetSubmitMethod("", brakeTraceBeforeAccident + "#" + brakeTraceAfterAccident + "#" + distanceMoveAfterAccident + "#" + accelerationIncludings + "#" + roadFrictionFactor + "#" + vehiclesHeightFromGround + "#" + slopeDegreeDirection + "#" + brakeAcceleration + "#" + roadsCurveRadius + "#" + tierMarks + "#" + quDriverNoticedDanger + "#" + quDriverTime + "#" + quMaximumDistancePieces + "#" + brakeTraceTestSpeed + "#" + testSpeed, "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> LoadFifthStepThree(string accidentId, string index)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
               // if (!CheckSession.ControlSession())
               //     return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
               // if (string.IsNullOrEmpty(accidentId))
               //     return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
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
                clsSqlHelper.GetLoadFifthStepThree(Convert.ToInt64(accidentId), Convert.ToByte(index), out isDriversIdentity, out sex, out seatBelt, out driverStatues, out injuryAtScene, out reactionBeforeAccident, out numberOfPassengers, out nationalId, out firstName, out lastName, out fatherName, out age, out driverLicenceNumber, out dateLicenceIssue, out placeLicenceIssue, out driverLicenceCategory, out driverLicenceStatus, out isDriverLicenceIncompatibility, out education, out job, out transferMethod);
                return AddAccident.GetSubmitMethod("", isDriversIdentity + "#" + sex + "#" + seatBelt + "#" + driverStatues + "#" + injuryAtScene + "#" + reactionBeforeAccident + "#" + numberOfPassengers + "#" + nationalId + "#" + firstName + "#" + lastName + "#" + fatherName + "#" + age + "#" + driverLicenceNumber + "#" + dateLicenceIssue + "#" + placeLicenceIssue + "#" + driverLicenceCategory + "#" + driverLicenceStatus + "#" + isDriverLicenceIncompatibility + "#" + education + "#" + job + "#" + transferMethod, "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> LoadAccidentPedestrians(string accidentId, string index)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
              // if (!CheckSession.ControlSession())
              //     return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
              // if (string.IsNullOrEmpty(accidentId))
              //     return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
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
                clsSqlHelper.GetLoadAccidentPedestrian(Convert.ToInt64(accidentId), Convert.ToByte(index), out onSiteCrossingFacilities, out isPedestriansIdentity, out sex, out nationalId, out firstName, out lastName, out fatherName, out age, out education, out job, out clothesColor, out pedestriansSituation, out pedestriansAverageSpeed, out pedestrianThrowDistance);
                return AddAccident.GetSubmitMethod("", onSiteCrossingFacilities + "#" + isPedestriansIdentity + "#" + sex + "#" + clothesColor + "#" + pedestriansSituation + "#" + pedestriansAverageSpeed + "#" + pedestrianThrowDistance + "#" + nationalId + "#" + firstName + "#" + lastName + "#" + fatherName + "#" + age + "#" + education + "#" + job, "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> LoadAccidentBikeRiders(string accidentId, string index)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
            //    if (!CheckSession.ControlSession())
            //        return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
            //    if (string.IsNullOrEmpty(accidentId))
            //        return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
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
                clsSqlHelper.GetLoadAccidentBikeRiders(Convert.ToInt64(accidentId), Convert.ToByte(index), out onSiteCrossingFacilities, out isIdentity, out sex, out nationalId, out firstName, out lastName, out fatherName, out age, out education, out job, out clothesColor, out situation, out averageSpeed, out throwDistance);
                return AddAccident.GetSubmitMethod("", onSiteCrossingFacilities + "#" + isIdentity + "#" + sex + "#" + clothesColor + "#" + situation + "#" + averageSpeed + "#" + throwDistance + "#" + nationalId + "#" + firstName + "#" + lastName + "#" + fatherName + "#" + age + "#" + education + "#" + job, "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> LoadInjuredDetail(string accidentId, string index, string name)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
              // if (!CheckSession.ControlSession())
              //     return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
              // if (string.IsNullOrEmpty(accidentId))
              //     return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                string getName;
                string getFamily;
                string transferMethod;
                string ambulanceCode;
                string vehicle;
                clsSqlHelper.Select_LoadInjuredDetail(Convert.ToInt64(accidentId), name, Convert.ToByte(index), out getName, out getFamily, out transferMethod, out ambulanceCode, out vehicle);
                return AddAccident.GetSubmitMethod("", getName + "#" + getFamily + "#" + transferMethod + "#" + ambulanceCode + "#" + vehicle, "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> LoadInjuredRole(string accidentId, string name)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
             //   if (!CheckSession.ControlSession())
             //       return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                return string.IsNullOrEmpty(accidentId) ? AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false") : AddAccident.GetSubmitMethod("", clsSqlHelper.Select_InjuredRole(Convert.ToInt64(accidentId), name), "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetCountInjured(string accidentId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
              //  if (!CheckSession.ControlSession())
              //      return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                return string.IsNullOrEmpty(accidentId) ? AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false") : AddAccident.GetSubmitMethod("", clsSqlHelper.Select_GetCountInjured(Convert.ToInt64(accidentId)), "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> FillInjured(string accidentId, string index)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
               // if (!CheckSession.ControlSession())
               //     return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
               // if (string.IsNullOrEmpty(accidentId))
               //     return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                return AddAccident.GetSubmitMethod("", clsSqlHelper.GetLoadInjured(Convert.ToInt64(accidentId), Convert.ToByte(index), "NameInjuredRolePedestrian") + "|" + clsSqlHelper.GetLoadInjured(Convert.ToInt64(accidentId), Convert.ToByte(index), "NameInjuredRoleDriver"), clsSqlHelper.GetLoadInjured(Convert.ToInt64(accidentId), Convert.ToByte(index), "NameInjuredRoleCyclist") + "|" + clsSqlHelper.GetLoadInjured(Convert.ToInt64(accidentId), Convert.ToByte(index), "NameInjuredRolePassenger"), "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> ShowInjuredDetail(string id, string injuredRole)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
              //  if (!CheckSession.ControlSession())
              //      return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
              //  if (string.IsNullOrEmpty(id))
              //      return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                string firstName;
                string lastName;
                string transferMethod;
                string ambulanceCode;
                string injuryAtScene;
                string vehicle;
                clsSqlHelper.GetLoadInjuredDetail(Convert.ToInt64(id), "NameInjured" + injuredRole, out firstName, out lastName, out transferMethod, out ambulanceCode, out injuryAtScene, out vehicle);
                if (injuredRole.Equals("Passenger"))
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
                    clsSqlHelper.GetLoadPassenger(Convert.ToInt64(id), out isIdentity, out sex, out nationalId, out fatherName, out age, out education, out job, out injuryType, out safety, out situation);
                    return AddAccident.GetSubmitMethod(isIdentity + "#" + sex + "#" + nationalId + "#" + fatherName + "#" + age + "#" + education + "#" + job + "#" + injuryType + "#" + safety + "#" + situation, firstName + "#" + lastName + "#" + transferMethod + "#" + ambulanceCode + "#" + injuryAtScene, "", "true");
                }
                return AddAccident.GetSubmitMethod("", firstName + "#" + lastName + "#" + transferMethod + "#" + ambulanceCode + "#" + injuryAtScene + "#" + vehicle, "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetCityListInProvince(string provinceId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
             //   if (!CheckSession.ControlSession())
             //       return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                return string.IsNullOrEmpty(provinceId) ? AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false") : clsSqlHelper.LoadCityListInProvince(Convert.ToInt32(provinceId));
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetAxisListInProvince(string provinceId)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
              //  if (!CheckSession.ControlSession())
              //      return AddAccident.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
              //  if (string.IsNullOrEmpty(provinceId))
              //      return AddAccident.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
                string id;
                string area;
                clsSqlHelper.LoadAxisListInProvince(Convert.ToInt32(provinceId), out id, out area);
                return AddAccident.GetSubmitMethod(id, area, "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return AddAccident.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
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

        protected void btnSubmit_Click(object sender, EventArgs e)
        {

        }
    }
}