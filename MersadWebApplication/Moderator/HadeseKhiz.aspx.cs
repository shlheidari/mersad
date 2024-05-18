using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using MersadWebApplication.Data;
using System.Globalization;
using System.Numerics;
using static Stimulsoft.Base.StiDataLoaderHelper;
using Microsoft.AspNetCore.StaticFiles;
using System.Drawing.Drawing2D;
using System.IO;
using System.Runtime.CompilerServices;
using System.EnterpriseServices;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using Microsoft.Office.Interop.Excel;
using static MersadWebApplication.Moderator.AddNewLocation;

namespace MersadWebApplication.Moderator
{
    public partial class HadeseKhiz : System.Web.UI.Page
    {
        #region FunctionPublic
        public class hd
        {
            public string str { get; set; }

        }

        public class getLocation
        {
            public string id { get; set; }
            public string dateElameNoghteAzSooyePolice { get; set; }
            public int dateElameNoghteAzSooyePoliceInt { get; set; }
            public string dateSabteNoghteDarSamane { get; set; }
            public int dateSabteNoghteDarSamaneInt { get; set; }
            public string datebazdid { get; set; }
            public int datebazdidInt { get; set; }
            public string dateGhararGirieNoghteDarsafeEghdam { get; set; }
            public int dateGhararGirieNoghteDarsafeEghdamInt { get; set; }
            public string dateShorooeejrayeEghdambarayeNoghte { get; set; }
            public int dateShorooeejrayeEghdambarayeNoghteint { get; set; }
            public string dateKhatemeyaftanejrayeEghdam { get; set; }
            public int dateKhatemeyaftanejrayeEghdamint { get; set; }
            public string status { get; set; }
            public string tozihat { get; set; }
            public string latlang { get; set; }
        }

        public static string GetN(string date)
        {
            string ret = "";
            if (date.Length == 1)
            {
                ret = "0" + date;
            }
            else
            {
                ret = date;
            }
            return ret;
        }

        public static Int64 getDateInt(string date)
        {
            Int64 ret = 0;
            string finalFDate = date.Replace("/", "");

            ret = Int64.Parse(finalFDate);

            return ret;
        }
        public static Int64 GetTodayInt()
        {
            Int64 ret = 0;
            PersianCalendar pc = new PersianCalendar();
            DateTime thisDate = DateTime.Now;

            string currentDay = GetN(pc.GetDayOfMonth(thisDate).ToString());
            string currentMounth = GetN(pc.GetMonth(thisDate).ToString());
            string currentyear = pc.GetYear(thisDate).ToString();
            string dateFinalToda = currentyear + "/" + currentMounth + "/" + currentDay;
            ret = getDateInt(dateFinalToda);

            return ret;
        }
        public static string GetTodayStr()
        {

            PersianCalendar pc = new PersianCalendar();
            DateTime thisDate = DateTime.Now;

            string currentDay = GetN(pc.GetDayOfMonth(thisDate).ToString());
            string currentMounth = GetN(pc.GetMonth(thisDate).ToString());
            string currentyear = pc.GetYear(thisDate).ToString();
            string dateFinalToda = currentyear + "/" + currentMounth + "/" + currentDay;


            return dateFinalToda;
        }
        public static Int64 ConvertToInt(string str)
        {
            Int64 ret = 0;
            str = str.Replace("/", "");

            ret = Int64.Parse(str);
            return ret;
        }

        public static string DetectRadioButtonZaman()
        {
            string ret = "";
            //if (rbBzyekhafte.Checked)
            //{
            //    ret = "1hafte";
            //}
            //if (rbBzyekmah.Checked)
            //{
            //    ret = "1mah";

            //}
            //if (rbBzyeksal.Checked)
            //{
            //    ret = "1sal";

            //}
            //if (rbDosal.Checked)
            //{
            //    ret = "2sal";

            //}
            //if (rbbazeZamani.Checked)
            //{
            //    ret = "range";

            //}
            return ret;
        }

        public static string Get1Mah()
        {
            PersianCalendar pc = new PersianCalendar();
            DateTime thisDate = pc.AddMonths(DateTime.Now, -1);

            string currentDay = GetN(pc.GetDayOfMonth(thisDate).ToString());
            string currentMounth = GetN(pc.GetMonth(thisDate).ToString());
            string currentyear = pc.GetYear(thisDate).ToString();

            string dateFinalToda = currentyear + "/" + currentMounth + "/" + currentDay;


            return dateFinalToda;

        }
        public static string Get1week()
        {
            PersianCalendar pc = new PersianCalendar();
            DateTime thisDate = pc.AddWeeks(DateTime.Now, -1);

            string currentDay = GetN(pc.GetDayOfMonth(thisDate).ToString());
            string currentMounth = GetN(pc.GetMonth(thisDate).ToString());
            string currentyear = pc.GetYear(thisDate).ToString();

            string dateFinalToda = currentyear + "/" + currentMounth + "/" + currentDay;


            return dateFinalToda;

        }
        public static string Get1Years()
        {
            PersianCalendar pc = new PersianCalendar();
            DateTime thisDate = pc.AddYears(DateTime.Now, -1);

            string currentDay = GetN(pc.GetDayOfMonth(thisDate).ToString());
            string currentMounth = GetN(pc.GetMonth(thisDate).ToString());
            string currentyear = pc.GetYear(thisDate).ToString();

            string dateFinalToda = currentyear + "/" + currentMounth + "/" + currentDay;


            return dateFinalToda;

        }
        public static string Get2Years()
        {
            PersianCalendar pc = new PersianCalendar();
            DateTime thisDate = pc.AddYears(DateTime.Now, -2);

            string currentDay = GetN(pc.GetDayOfMonth(thisDate).ToString());
            string currentMounth = GetN(pc.GetMonth(thisDate).ToString());
            string currentyear = pc.GetYear(thisDate).ToString();

            string dateFinalToda = currentyear + "/" + currentMounth + "/" + currentDay;


            return dateFinalToda;

        }


        public static Int64 retDateFinal()
        {
            string zaman = DetectRadioButtonZaman();
#pragma warning disable CS0219 // The variable 'noghte' is assigned but its value is never used
            string noghte = "DetectNoe();";
#pragma warning restore CS0219 // The variable 'noghte' is assigned but its value is never used
            Int64 datee = 0;

            if (zaman == "1mah")
            {
                datee = ConvertToInt(Get1Mah());
            }
            if (zaman == "1hafte")
            {
                datee = ConvertToInt(Get1week());
            }
            if (zaman == "1sal")
            {
                datee = ConvertToInt(Get1Years());
            }
            if (zaman == "2sal")
            {
                datee = ConvertToInt(Get2Years());
            }
            return datee;
        }
        #endregion

        #region FunctionGenerateLocations

        public class retList
        {
            public string date1 { get; set; }
        };


        [WebMethod]
        public static List<retList> ShowDetail(string test)
        {


            List<retList> listretList = new List<retList>();



            retList rl = new retList()
            {
                date1 = test
            };

            listretList.Add(rl);

            return listretList;
        }




       
        string GetStateBazeZamani()
        {
            string ret = "";
            //if (rbBzyekhafte.Checked)
            //{
            //    ret = "YekHafte";
            //}
            //if (rbBzyekmah.Checked)
            //{
            //    ret = "YekHafte";
            //}
            //if (rbBzyeksal.Checked)
            //{
            //    ret = "Bzyeksal";
            //}
            //if (rbDosal.Checked)
            //{
            //    ret = "Dosal";
            //}
            //if (rbbazeZamani.Checked)
            //{
            //    ret = "bazeZamani";
            //}

            return ret;
        }

        [WebMethod]
        public static List<hd> GetList(
            string StatusBazeZamani,
                    string DateFrom,
                    string DateTo,
                    string type)
        {
            HttpContext.Current.Session["DataMedia"] = null;
            HttpContext.Current.Session["DataSanad"] = null;
            #region variable
            List<getLocation> ListgetLocation = new List<getLocation>();
            List<hd> ListHd = new List<hd>();
            string valsabet = File.ReadAllText(HttpContext.Current.Server.MapPath("~/tempSabet.txt"));
            string sid = "";
            string sdateElameNoghteAzSooyePolice = "";
            int sdateElameNoghteAzSooyePoliceInt = 0;
            string sdateSabteNoghteDarSamane = "";
            int sdateSabteNoghteDarSamaneInt = 0;
            string sdatebazdid = "";
            int sdatebazdidInt = 0;
            string sdateGhararGirieNoghteDarsafeEghdam = "";
            int sdateGhararGirieNoghteDarsafeEghdamInt = 0;
            string sdateShorooeejrayeEghdambarayeNoghte = "";
            int sdateShorooeejrayeEghdambarayeNoghteint = 0;
            string sdateKhatemeyaftanejrayeEghdam = "";
            int sdateKhatemeyaftanejrayeEghdamint = 0;
            string sstatus = "";
            string stozihat = "";
            string slatlang = "";
            Int64 todayint = GetTodayInt();
            Int64 DateLast = 0;
#pragma warning disable CS0219 // The variable 'Noe' is assigned but its value is never used
            string Noe = "";
#pragma warning restore CS0219 // The variable 'Noe' is assigned but its value is never used
            #endregion
            using (DataManagementDataContext context = new DataManagementDataContext())
            {


                if (StatusBazeZamani == "range")
                {
                    todayint = getDateInt(DateFrom);
                    DateLast = getDateInt(DateTo);
                }
                else
                {

                    if (StatusBazeZamani == "1hafte")
                    {
                        todayint = getDateInt(Get1week());
                        DateLast = GetTodayInt();
                    }
                    if (StatusBazeZamani == "1sal")
                    {
                        DateLast = GetTodayInt();
                        todayint = getDateInt(Get1Years());
                    }
                    if (StatusBazeZamani == "2sal")
                    {
                        todayint = getDateInt(Get2Years());
                        DateLast = GetTodayInt();

                    }

                }



                #region Query
                var ds = (from m in context.SelectLocation(

                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            type,
                            14021001,
                            14021001).AsEnumerable()
                          select m).ToList();
                #endregion
                string id = "";
                string latlang = "";
                string status = "";
                string featuress = "";
                string locations = "";
                if (ds.Count == 1)
                {

                    locations = File.ReadAllText(HttpContext.Current.Server.MapPath("~/feture.txt"));
                    id = ds[ds.Count - 1].idnew.ToString();
                    latlang = ds[ds.Count - 1].latlang.ToString();
                    status = ds[ds.Count - 1].status.ToString();
                    locations = locations.Replace("Omid", id);
                    locations = locations.Replace("lt", latlang);
                    locations = locations.Replace("crtype", status);
                    locations = locations.Replace("edame", "");
                    featuress = featuress + locations;
                    valsabet = valsabet.Replace("badane", featuress);
                    hd h = new hd()
                    {
                        str = valsabet
                    };
                    ListHd.Add(h);
#pragma warning disable CS0472 // The result of the expression is always 'true' since a value of type 'int' is never equal to 'null' of type 'int?'
                    if (ds[0].id != null) { sid = ds[0].idnew.ToString(); } else { sid = ""; }
#pragma warning restore CS0472 // The result of the expression is always 'true' since a value of type 'int' is never equal to 'null' of type 'int?'
                    if (ds[0].dateElameNoghteAzSooyePolice != null) { sdateElameNoghteAzSooyePolice = ds[0].dateElameNoghteAzSooyePolice.ToString(); } else { sdateElameNoghteAzSooyePolice = ""; }
                    if (ds[0].dateElameNoghteAzSooyePoliceInt != null) { sdateElameNoghteAzSooyePoliceInt = int.Parse(ds[0].dateElameNoghteAzSooyePoliceInt.ToString()); } else { sdateElameNoghteAzSooyePoliceInt = 0; }
                    if (ds[0].dateSabteNoghteDarSamane != null) { sdateSabteNoghteDarSamane = ds[0].dateSabteNoghteDarSamane.ToString(); } else { sdateSabteNoghteDarSamane = ""; }
                    if (ds[0].dateSabteNoghteDarSamaneInt != null) { sdateSabteNoghteDarSamaneInt = int.Parse(ds[0].dateSabteNoghteDarSamaneInt.ToString()); } else { sdateSabteNoghteDarSamaneInt = 0; }
                    if (ds[0].datebazdid != null) { sdatebazdid = ds[0].datebazdid.ToString(); } else { sdatebazdid = ""; }
                    if (ds[0].datebazdidInt != null) { sdatebazdidInt = int.Parse(ds[0].datebazdidInt.ToString()); } else { sdatebazdidInt = 0; }
                    if (ds[0].dateGhararGirieNoghteDarsafeEghdam != null) { sdateGhararGirieNoghteDarsafeEghdam = ds[0].dateGhararGirieNoghteDarsafeEghdam.ToString(); } else { sdateGhararGirieNoghteDarsafeEghdam = ""; }
                    if (ds[0].dateGhararGirieNoghteDarsafeEghdamInt != null) { sdateGhararGirieNoghteDarsafeEghdamInt = int.Parse(ds[0].dateGhararGirieNoghteDarsafeEghdamInt.ToString()); } else { sdateGhararGirieNoghteDarsafeEghdamInt = 0; }
                    if (ds[0].dateShorooeejrayeEghdambarayeNoghte != null) { sdateShorooeejrayeEghdambarayeNoghte = ds[0].dateShorooeejrayeEghdambarayeNoghte.ToString(); } else { sdateShorooeejrayeEghdambarayeNoghte = ""; }
                    if (ds[0].dateShorooeejrayeEghdambarayeNoghteint != null) { sdateShorooeejrayeEghdambarayeNoghteint = int.Parse(ds[0].dateShorooeejrayeEghdambarayeNoghteint.ToString()); } else { sdateShorooeejrayeEghdambarayeNoghteint = 0; }
                    if (ds[0].dateKhatemeyaftanejrayeEghdam != null) { sdateKhatemeyaftanejrayeEghdam = ds[0].dateKhatemeyaftanejrayeEghdam.ToString(); } else { sdateKhatemeyaftanejrayeEghdam = ""; }
                    if (ds[0].dateKhatemeyaftanejrayeEghdamint != null) { sdateKhatemeyaftanejrayeEghdamint = int.Parse(ds[0].dateKhatemeyaftanejrayeEghdamint.ToString()); } else { sdateKhatemeyaftanejrayeEghdamint = 0; }
                    if (ds[0].status != null) { sstatus = ds[0].status.ToString(); } else { sstatus = ""; }
                    if (ds[0].tozihat != null) { stozihat = ds[0].tozihat.ToString(); } else { stozihat = ""; }
                    if (ds[0].latlang != null) { slatlang = ds[0].latlang.ToString(); } else { slatlang = ""; }



                    getLocation gll = new getLocation()
                    {
                        id = sid,
                        dateElameNoghteAzSooyePolice = sdateElameNoghteAzSooyePolice,
                        dateElameNoghteAzSooyePoliceInt = sdateElameNoghteAzSooyePoliceInt,
                        dateSabteNoghteDarSamane = sdateSabteNoghteDarSamane,
                        dateSabteNoghteDarSamaneInt = sdateSabteNoghteDarSamaneInt,
                        datebazdid = sdatebazdid,
                        datebazdidInt = sdatebazdidInt,
                        dateGhararGirieNoghteDarsafeEghdam = sdateGhararGirieNoghteDarsafeEghdam,
                        dateGhararGirieNoghteDarsafeEghdamInt = sdateGhararGirieNoghteDarsafeEghdamInt,
                        dateShorooeejrayeEghdambarayeNoghte = sdateShorooeejrayeEghdambarayeNoghte,
                        dateShorooeejrayeEghdambarayeNoghteint = sdateShorooeejrayeEghdambarayeNoghteint,
                        dateKhatemeyaftanejrayeEghdam = sdateKhatemeyaftanejrayeEghdam,
                        dateKhatemeyaftanejrayeEghdamint = sdateKhatemeyaftanejrayeEghdamint,
                        status = sstatus,
                        tozihat = stozihat,
                        latlang = slatlang
                    };
                    ListgetLocation.Add(gll);
                    hd hs = new hd()
                    {
                        str = valsabet
                    };
                    ListHd.Add(hs);
                }
                if (ds.Count > 1)
                {
                    for (int i = 0; i < ds.Count - 1; i++)
                    {
                        locations = "";
                        locations = File.ReadAllText(HttpContext.Current.Server.MapPath("~/feture.txt"));
                        id = ds[i].idnew.ToString();
                        latlang = ds[i].latlang.ToString();
                        status = ds[i].status.ToString();
                        locations = locations.Replace("Omid", id);
                        locations = locations.Replace("lt", latlang);
                        locations = locations.Replace("crtype", status);
                        locations = locations.Replace("edame", ",");
                        featuress = featuress + locations;

#pragma warning disable CS0472 // The result of the expression is always 'true' since a value of type 'int' is never equal to 'null' of type 'int?'
                        if (ds[i].id != null) { sid = ds[i].idnew.ToString(); } else { sid = ""; }
#pragma warning restore CS0472 // The result of the expression is always 'true' since a value of type 'int' is never equal to 'null' of type 'int?'
                        if (ds[i].dateElameNoghteAzSooyePolice != null) { sdateElameNoghteAzSooyePolice = ds[i].dateElameNoghteAzSooyePolice.ToString(); } else { sdateElameNoghteAzSooyePolice = ""; }
                        if (ds[i].dateElameNoghteAzSooyePoliceInt != null) { sdateElameNoghteAzSooyePoliceInt = int.Parse(ds[i].dateElameNoghteAzSooyePoliceInt.ToString()); } else { sdateElameNoghteAzSooyePoliceInt = 0; }
                        if (ds[i].dateSabteNoghteDarSamane != null) { sdateSabteNoghteDarSamane = ds[i].dateSabteNoghteDarSamane.ToString(); } else { sdateSabteNoghteDarSamane = ""; }
                        if (ds[i].dateSabteNoghteDarSamaneInt != null) { sdateSabteNoghteDarSamaneInt = int.Parse(ds[i].dateSabteNoghteDarSamaneInt.ToString()); } else { sdateSabteNoghteDarSamaneInt = 0; }
                        if (ds[i].datebazdid != null) { sdatebazdid = ds[i].datebazdid.ToString(); } else { sdatebazdid = ""; }
                        if (ds[i].datebazdidInt != null) { sdatebazdidInt = int.Parse(ds[i].datebazdidInt.ToString()); } else { sdatebazdidInt = 0; }
                        if (ds[i].dateGhararGirieNoghteDarsafeEghdam != null) { sdateGhararGirieNoghteDarsafeEghdam = ds[i].dateGhararGirieNoghteDarsafeEghdam.ToString(); } else { sdateGhararGirieNoghteDarsafeEghdam = ""; }
                        if (ds[i].dateGhararGirieNoghteDarsafeEghdamInt != null) { sdateGhararGirieNoghteDarsafeEghdamInt = int.Parse(ds[i].dateGhararGirieNoghteDarsafeEghdamInt.ToString()); } else { sdateGhararGirieNoghteDarsafeEghdamInt = 0; }
                        if (ds[i].dateShorooeejrayeEghdambarayeNoghte != null) { sdateShorooeejrayeEghdambarayeNoghte = ds[i].dateShorooeejrayeEghdambarayeNoghte.ToString(); } else { sdateShorooeejrayeEghdambarayeNoghte = ""; }
                        if (ds[i].dateShorooeejrayeEghdambarayeNoghteint != null) { sdateShorooeejrayeEghdambarayeNoghteint = int.Parse(ds[i].dateShorooeejrayeEghdambarayeNoghteint.ToString()); } else { sdateShorooeejrayeEghdambarayeNoghteint = 0; }
                        if (ds[i].dateKhatemeyaftanejrayeEghdam != null) { sdateKhatemeyaftanejrayeEghdam = ds[i].dateKhatemeyaftanejrayeEghdam.ToString(); } else { sdateKhatemeyaftanejrayeEghdam = ""; }
                        if (ds[i].dateKhatemeyaftanejrayeEghdamint != null) { sdateKhatemeyaftanejrayeEghdamint = int.Parse(ds[i].dateKhatemeyaftanejrayeEghdamint.ToString()); } else { sdateKhatemeyaftanejrayeEghdamint = 0; }
                        if (ds[i].status != null) { sstatus = ds[i].status.ToString(); } else { sstatus = ""; }
                        if (ds[i].tozihat != null) { stozihat = ds[i].tozihat.ToString(); } else { stozihat = ""; }
                        if (ds[i].latlang != null) { slatlang = ds[i].latlang.ToString(); } else { slatlang = ""; }

                        getLocation glls = new getLocation()
                        {
                            id = sid,
                            dateElameNoghteAzSooyePolice = sdateElameNoghteAzSooyePolice,
                            dateElameNoghteAzSooyePoliceInt = sdateElameNoghteAzSooyePoliceInt,
                            dateSabteNoghteDarSamane = sdateSabteNoghteDarSamane,
                            dateSabteNoghteDarSamaneInt = sdateSabteNoghteDarSamaneInt,
                            datebazdid = sdatebazdid,
                            datebazdidInt = sdatebazdidInt,
                            dateGhararGirieNoghteDarsafeEghdam = sdateGhararGirieNoghteDarsafeEghdam,
                            dateGhararGirieNoghteDarsafeEghdamInt = sdateGhararGirieNoghteDarsafeEghdamInt,
                            dateShorooeejrayeEghdambarayeNoghte = sdateShorooeejrayeEghdambarayeNoghte,
                            dateShorooeejrayeEghdambarayeNoghteint = sdateShorooeejrayeEghdambarayeNoghteint,
                            dateKhatemeyaftanejrayeEghdam = sdateKhatemeyaftanejrayeEghdam,
                            dateKhatemeyaftanejrayeEghdamint = sdateKhatemeyaftanejrayeEghdamint,
                            status = sstatus,
                            tozihat = stozihat,
                            latlang = slatlang
                        };
                        ListgetLocation.Add(glls);
                    }
                    locations = File.ReadAllText(HttpContext.Current.Server.MapPath("~/feture.txt"));
                    id = ds[ds.Count - 1].idnew.ToString();
                    latlang = ds[ds.Count - 1].latlang.ToString();
                    status = ds[ds.Count - 1].status.ToString();
                    locations = locations.Replace("Omid", id);
                    locations = locations.Replace("lt", latlang);
                    locations = locations.Replace("crtype", status);
                    locations = locations.Replace("edame", "");
                    featuress = featuress + locations;
                    valsabet = valsabet.Replace("badane", featuress);
                    hd h = new hd()
                    {
                        str = valsabet
                    };
                    ListHd.Add(h);
#pragma warning disable CS0472 // The result of the expression is always 'true' since a value of type 'int' is never equal to 'null' of type 'int?'
                    if (ds[ds.Count - 1].id != null) { sid = ds[ds.Count - 1].idnew.ToString(); } else { sid = ""; }
#pragma warning restore CS0472 // The result of the expression is always 'true' since a value of type 'int' is never equal to 'null' of type 'int?'
                    if (ds[ds.Count - 1].dateElameNoghteAzSooyePolice != null) { sdateElameNoghteAzSooyePolice = ds[ds.Count - 1].dateElameNoghteAzSooyePolice.ToString(); } else { sdateElameNoghteAzSooyePolice = ""; }
                    if (ds[ds.Count - 1].dateElameNoghteAzSooyePoliceInt != null) { sdateElameNoghteAzSooyePoliceInt = int.Parse(ds[ds.Count - 1].dateElameNoghteAzSooyePoliceInt.ToString()); } else { sdateElameNoghteAzSooyePoliceInt = 0; }
                    if (ds[ds.Count - 1].dateSabteNoghteDarSamane != null) { sdateSabteNoghteDarSamane = ds[ds.Count - 1].dateSabteNoghteDarSamane.ToString(); } else { sdateSabteNoghteDarSamane = ""; }
                    if (ds[ds.Count - 1].dateSabteNoghteDarSamaneInt != null) { sdateSabteNoghteDarSamaneInt = int.Parse(ds[ds.Count - 1].dateSabteNoghteDarSamaneInt.ToString()); } else { sdateSabteNoghteDarSamaneInt = 0; }
                    if (ds[ds.Count - 1].datebazdid != null) { sdatebazdid = ds[ds.Count - 1].datebazdid.ToString(); } else { sdatebazdid = ""; }
                    if (ds[ds.Count - 1].datebazdidInt != null) { sdatebazdidInt = int.Parse(ds[ds.Count - 1].datebazdidInt.ToString()); } else { sdatebazdidInt = 0; }
                    if (ds[ds.Count - 1].dateGhararGirieNoghteDarsafeEghdam != null) { sdateGhararGirieNoghteDarsafeEghdam = ds[ds.Count - 1].dateGhararGirieNoghteDarsafeEghdam.ToString(); } else { sdateGhararGirieNoghteDarsafeEghdam = ""; }
                    if (ds[ds.Count - 1].dateGhararGirieNoghteDarsafeEghdamInt != null) { sdateGhararGirieNoghteDarsafeEghdamInt = int.Parse(ds[ds.Count - 1].dateGhararGirieNoghteDarsafeEghdamInt.ToString()); } else { sdateGhararGirieNoghteDarsafeEghdamInt = 0; }
                    if (ds[ds.Count - 1].dateShorooeejrayeEghdambarayeNoghte != null) { sdateShorooeejrayeEghdambarayeNoghte = ds[ds.Count - 1].dateShorooeejrayeEghdambarayeNoghte.ToString(); } else { sdateShorooeejrayeEghdambarayeNoghte = ""; }
                    if (ds[ds.Count - 1].dateShorooeejrayeEghdambarayeNoghteint != null) { sdateShorooeejrayeEghdambarayeNoghteint = int.Parse(ds[ds.Count - 1].dateShorooeejrayeEghdambarayeNoghteint.ToString()); } else { sdateShorooeejrayeEghdambarayeNoghteint = 0; }
                    if (ds[ds.Count - 1].dateKhatemeyaftanejrayeEghdam != null) { sdateKhatemeyaftanejrayeEghdam = ds[ds.Count - 1].dateKhatemeyaftanejrayeEghdam.ToString(); } else { sdateKhatemeyaftanejrayeEghdam = ""; }
                    if (ds[ds.Count - 1].dateKhatemeyaftanejrayeEghdamint != null) { sdateKhatemeyaftanejrayeEghdamint = int.Parse(ds[ds.Count - 1].dateKhatemeyaftanejrayeEghdamint.ToString()); } else { sdateKhatemeyaftanejrayeEghdamint = 0; }
                    if (ds[ds.Count - 1].status != null) { sstatus = ds[ds.Count - 1].status.ToString(); } else { sstatus = ""; }
                    if (ds[ds.Count - 1].tozihat != null) { stozihat = ds[ds.Count - 1].tozihat.ToString(); } else { stozihat = ""; }
                    if (ds[ds.Count - 1].latlang != null) { slatlang = ds[ds.Count - 1].latlang.ToString(); } else { slatlang = ""; }



                    getLocation gll = new getLocation()
                    {
                        id = sid,
                        dateElameNoghteAzSooyePolice = sdateElameNoghteAzSooyePolice,
                        dateElameNoghteAzSooyePoliceInt = sdateElameNoghteAzSooyePoliceInt,
                        dateSabteNoghteDarSamane = sdateSabteNoghteDarSamane,
                        dateSabteNoghteDarSamaneInt = sdateSabteNoghteDarSamaneInt,
                        datebazdid = sdatebazdid,
                        datebazdidInt = sdatebazdidInt,
                        dateGhararGirieNoghteDarsafeEghdam = sdateGhararGirieNoghteDarsafeEghdam,
                        dateGhararGirieNoghteDarsafeEghdamInt = sdateGhararGirieNoghteDarsafeEghdamInt,
                        dateShorooeejrayeEghdambarayeNoghte = sdateShorooeejrayeEghdambarayeNoghte,
                        dateShorooeejrayeEghdambarayeNoghteint = sdateShorooeejrayeEghdambarayeNoghteint,
                        dateKhatemeyaftanejrayeEghdam = sdateKhatemeyaftanejrayeEghdam,
                        dateKhatemeyaftanejrayeEghdamint = sdateKhatemeyaftanejrayeEghdamint,
                        status = sstatus,
                        tozihat = stozihat,
                        latlang = slatlang
                    };
                    ListgetLocation.Add(gll);

                }


            }
            return ListHd;
        }






        #endregion

        protected void rbbazeZamani_CheckedChanged(object sender, EventArgs e)
        {


        }

        protected void BtnAccept_Click(object sender, EventArgs e)
        {

            Int64 a = retDateFinal();

        }


        protected void Page_Load(object sender, EventArgs e)
        {

            using (DataManagementDataContext context = new DataManagementDataContext())
            {


            }
        }

        protected void rptDisplayItemAsnad_ItemCommand(object source, RepeaterCommandEventArgs e)
        {

        }

        protected void rptListImageAndVideo_ItemCommand(object source, RepeaterCommandEventArgs e)
        {

        }

        protected void rptListImageAndVideo_ItemCommand1(object source, RepeaterCommandEventArgs e)
        {

        }

        protected void rptDisplayItemAsnad_ItemCommand1(object source, RepeaterCommandEventArgs e)
        {

        }

        void DisplayItems()
        {
            if (Session["DataSanad"] != null)
            {
                var GetList = (List<dataSourceSanad>)Session["DataSanad"];

                var ds = (from m in GetList.AsEnumerable()
                          select m);
                rptDisplayItemAsnad.DataSource = ds;
                rptDisplayItemAsnad.DataBind();
            }

        }
        void DisplayItemsMultiMedia()
        {
            if (Session["DataMedia"] != null)
            {
                var GetList = (List<dataSourceSanad>)Session["DataMedia"];

                var ds = (from m in GetList.AsEnumerable()
                          select m);
                rptListImageAndVideo.DataSource = ds;
                rptListImageAndVideo.DataBind();
            }

        }
        public class dataSourceSanad
        {
            public string id { get; set; }
            public string addressFile { get; set; }
            public string DataType { get; set; }
        };
        public List<dataSourceSanad> ListdataSourceSanads = new List<dataSourceSanad>();
        public List<dataSourceSanad> ListDataMultiMedia = new List<dataSourceSanad>();
        protected void BtnAddMedia_Click(object sender, EventArgs e)
        {

            if (Session["DataMedia"] == null)
            {
                Session["DataMedia"] = null;
                ListdataSourceSanads.Clear();
                Session["DataMedia"] = ListdataSourceSanads;
                if (fileUploadMedia.HasFile)
                {
                    if (Path.GetExtension(fileUploadMedia.FileName) == ".mp4")
                    {
                        long a = fileUploadMedia.FileContent.Length;
                        var GetList = (List<dataSourceSanad>)Session["DataMedia"];
                        int idd = GetList.Count + 1;
                        string ids = idd.ToString();
                        string NewFileName = Guid.NewGuid().ToString() + ".mp4";
                        fileUploadMedia.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                        dataSourceSanad ds = new dataSourceSanad()
                        {
                            id = ids,
                            addressFile = NewFileName,
                            DataType = ".mp4"
                        };
                        GetList.Add(ds);

                        Session["DataMedia"] = GetList;
                    }
                    if (Path.GetExtension(fileUploadMedia.FileName) == ".jpg" || Path.GetExtension(fileUploadMedia.FileName) == ".png")
                    {
                        if (Path.GetExtension(fileUploadMedia.FileName) == ".png")
                        {
                            var GetList = (List<dataSourceSanad>)Session["DataMedia"];
                            int idd = GetList.Count + 1;
                            string ids = idd.ToString();
                            string NewFileName = Guid.NewGuid().ToString() + ".png";
                            fileUploadMedia.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                            dataSourceSanad ds = new dataSourceSanad()
                            {
                                id = ids,
                                addressFile = NewFileName,
                                DataType = ".png"
                            };
                            GetList.Add(ds);

                            Session["DataMedia"] = GetList;
                        }
                        if (Path.GetExtension(fileUploadMedia.FileName) == ".jpg")
                        {
                            var GetList = (List<dataSourceSanad>)Session["DataMedia"];
                            int idd = GetList.Count + 1;
                            string ids = idd.ToString();
                            string NewFileName = Guid.NewGuid().ToString() + ".jpg";
                            fileUploadMedia.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                            dataSourceSanad ds = new dataSourceSanad()
                            {
                                id = ids,
                                addressFile = NewFileName,
                                DataType = ".jpg"
                            };
                            GetList.Add(ds);

                            Session["DataMedia"] = GetList;
                        }

                    }


                }
            }
            else
            {

                if (fileUploadMedia.HasFile)
                {
                    if (fileUploadMedia.HasFile)
                    {
                        if (Path.GetExtension(fileUploadMedia.FileName) == ".mp4")
                        {

                            long a = fileUploadMedia.FileContent.Length;
                            if (Path.GetExtension(fileUploadMedia.FileName) == ".mp4")
                            {
                                var GetList = (List<dataSourceSanad>)Session["DataMedia"];
                                int idd = GetList.Count + 1;
                                string ids = idd.ToString();
                                string NewFileName = Guid.NewGuid().ToString() + ".mp4";
                                fileUploadMedia.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                                dataSourceSanad ds = new dataSourceSanad()
                                {
                                    id = ids,
                                    addressFile = NewFileName,
                                    DataType = ".mp4"
                                };
                                GetList.Add(ds);

                                Session["DataMedia"] = GetList;
                            }
                        }
                        if (Path.GetExtension(fileUploadMedia.FileName) == ".jpg" || Path.GetExtension(fileUploadMedia.FileName) == ".png")
                        {
                            if (Path.GetExtension(fileUploadMedia.FileName) == ".jpg")
                            {
                                var GetList = (List<dataSourceSanad>)Session["DataMedia"];
                                int idd = GetList.Count + 1;
                                string ids = idd.ToString();
                                string NewFileName = Guid.NewGuid().ToString() + ".jpg";
                                fileUploadMedia.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                                dataSourceSanad ds = new dataSourceSanad()
                                {
                                    id = ids,
                                    addressFile = NewFileName,
                                    DataType = ".jpg"
                                };
                                GetList.Add(ds);

                                Session["DataMedia"] = GetList;
                            }
                            if (Path.GetExtension(fileUploadMedia.FileName) == ".png")
                            {
                                var GetList = (List<dataSourceSanad>)Session["DataMedia"];
                                int idd = GetList.Count + 1;
                                string ids = idd.ToString();
                                string NewFileName = Guid.NewGuid().ToString() + ".png";
                                fileUploadMedia.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                                dataSourceSanad ds = new dataSourceSanad()
                                {
                                    id = ids,
                                    addressFile = NewFileName,
                                    DataType = ".png"
                                };
                                GetList.Add(ds);

                                Session["DataMedia"] = GetList;
                            }

                        }



                    }
                }
            }
            DisplayItemsMultiMedia();
            PanelAddLocation.Style.Remove("display");
        }


        protected void btnRef_Click(object sender, EventArgs e)
        {



            PanelAddLocation.Style.Remove("display");
            string id = hdnSelectedTicket.Value;


            using (DataManagementDataContext context = new DataManagementDataContext())
            {
                var ds = (from m in context.GetAllFilesById(id).AsEnumerable()
                          select m).ToList();

                if (ds.Count != 0)
                {
                    for (int i = 0; i < ds.Count; i++)
                    {
                        if (ds[i].dataType == ".doc" ||
                            ds[i].dataType == ".docx" ||
                            ds[i].dataType == ".xls" ||
                            ds[i].dataType == ".xlsx" ||
                            ds[i].dataType == ".ppt" ||
                            ds[i].dataType == ".pptx"
                            )
                        {
                            string datat = ds[i].dataType;

                            string filaddress = "../" + ds[i].AddressFile;


                            string ids = ds[i].idDate;
                            dataSourceSanad dss = new dataSourceSanad()
                            {
                                addressFile = filaddress,
                                DataType = datat,
                                id = ids

                            };
                            ListdataSourceSanads.Add(dss);
                        }
                        if (ds[i].dataType == ".mp4" ||
                           ds[i].dataType == ".jpg" ||
                           ds[i].dataType == ".png"
                           )
                        {
                            string filaddress = "../" + ds[i].AddressFile;

                            string ids = ds[i].idDate;
                            string datat = ds[i].dataType;
                            dataSourceSanad dss = new dataSourceSanad()
                            {
                                addressFile = filaddress,
                                DataType = ds[i].dataType,
                                id = ids

                            };
                            ListDataMultiMedia.Add(dss);
                        }
                    }
                    rptDisplayItemAsnad.DataSource = ListdataSourceSanads;
                    rptDisplayItemAsnad.DataBind();
                    rptListImageAndVideo.DataSource = ListDataMultiMedia;
                    rptListImageAndVideo.DataBind();
                }



            }


        }

        protected void UpdateLocation_Click(object sender, EventArgs e)
        {
            string id = hdnSelectedTicket.Value;

        }
        protected void BtnUploadasnad_Click(object sender, EventArgs e)
        {
            if (Session["DataSanad"] == null)
            {
                Session["DataSanad"] = null;
                ListdataSourceSanads.Clear();
                Session["DataSanad"] = ListdataSourceSanads;
                if (fileUploadAsnad.HasFile)
                {
                    if (Path.GetExtension(fileUploadAsnad.FileName) == ".xlsx" || Path.GetExtension(fileUploadAsnad.FileName) == ".xls")
                    {
                        if (Path.GetExtension(fileUploadAsnad.FileName) == ".xlsx")
                        {
                            var GetList = (List<dataSourceSanad>)Session["DataSanad"];
                            int idd = GetList.Count + 1;
                            string ids = idd.ToString();
                            string NewFileName = Guid.NewGuid().ToString() + ".xlsx";
                            fileUploadAsnad.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                            dataSourceSanad ds = new dataSourceSanad()
                            {
                                id = ids,
                                addressFile = NewFileName,
                                DataType = ".xlsx"
                            };
                            GetList.Add(ds);

                            Session["DataSanad"] = GetList;
                        }

                        if (Path.GetExtension(fileUploadAsnad.FileName) == ".xls")
                        {
                            var GetList = (List<dataSourceSanad>)Session["DataSanad"];
                            int idd = GetList.Count + 1;
                            string ids = idd.ToString();
                            string NewFileName = Guid.NewGuid().ToString() + ".xls";
                            fileUploadAsnad.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                            dataSourceSanad ds = new dataSourceSanad()
                            {
                                id = ids,
                                addressFile = NewFileName,
                                DataType = ".xls"
                            };
                            GetList.Add(ds);

                            Session["DataSanad"] = GetList;
                        }
                    }
                    if (Path.GetExtension(fileUploadAsnad.FileName) == ".docx" || Path.GetExtension(fileUploadAsnad.FileName) == ".doc")
                    {
                        if (Path.GetExtension(fileUploadAsnad.FileName) == ".docx")
                        {
                            var GetList = (List<dataSourceSanad>)Session["DataSanad"];
                            int idd = GetList.Count + 1;
                            string ids = idd.ToString();
                            string NewFileName = Guid.NewGuid().ToString() + ".docx";
                            fileUploadAsnad.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                            dataSourceSanad ds = new dataSourceSanad()
                            {
                                id = ids,
                                addressFile = NewFileName,
                                DataType = ".docx"
                            };
                            GetList.Add(ds);

                            Session["DataSanad"] = GetList;
                        }
                        if (Path.GetExtension(fileUploadAsnad.FileName) == ".doc")
                        {
                            var GetList = (List<dataSourceSanad>)Session["DataSanad"];
                            int idd = GetList.Count + 1;
                            string ids = idd.ToString();
                            string NewFileName = Guid.NewGuid().ToString() + ".doc";
                            fileUploadAsnad.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                            dataSourceSanad ds = new dataSourceSanad()
                            {
                                id = ids,
                                addressFile = NewFileName,
                                DataType = ".doc"
                            };
                            GetList.Add(ds);

                            Session["DataSanad"] = GetList;
                        }

                    }
                    if (Path.GetExtension(fileUploadAsnad.FileName) == ".pptx" || Path.GetExtension(fileUploadAsnad.FileName) == ".ppt")
                    {
                        if (Path.GetExtension(fileUploadAsnad.FileName) == ".pptx")
                        {
                            var GetList = (List<dataSourceSanad>)Session["DataSanad"];
                            int idd = GetList.Count + 1;
                            string ids = idd.ToString();
                            string NewFileName = Guid.NewGuid().ToString() + ".pptx";
                            fileUploadAsnad.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                            dataSourceSanad ds = new dataSourceSanad()
                            {
                                id = ids,
                                addressFile = NewFileName,
                                DataType = ".pptx"
                            };
                            GetList.Add(ds);

                            Session["DataSanad"] = GetList;
                        }
                        if (Path.GetExtension(fileUploadAsnad.FileName) == ".ppt")
                        {
                            var GetList = (List<dataSourceSanad>)Session["DataSanad"];
                            int idd = GetList.Count + 1;
                            string ids = idd.ToString();
                            string NewFileName = Guid.NewGuid().ToString() + ".ppt";
                            fileUploadAsnad.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                            dataSourceSanad ds = new dataSourceSanad()
                            {
                                id = ids,
                                addressFile = NewFileName,
                                DataType = ".ppt"
                            };
                            GetList.Add(ds);

                            Session["DataSanad"] = GetList;
                        }

                    }
                }
            }
            else
            {

                if (fileUploadAsnad.HasFile)
                {
                    if (fileUploadAsnad.HasFile)
                    {
                        if (Path.GetExtension(fileUploadAsnad.FileName) == ".xlsx" || Path.GetExtension(fileUploadAsnad.FileName) == ".xls")
                        {
                            if (Path.GetExtension(fileUploadAsnad.FileName) == ".xlsx")
                            {
                                var GetList = (List<dataSourceSanad>)Session["DataSanad"];
                                int idd = GetList.Count + 1;
                                string ids = idd.ToString();
                                string NewFileName = Guid.NewGuid().ToString() + ".xlsx";
                                fileUploadAsnad.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                                dataSourceSanad ds = new dataSourceSanad()
                                {
                                    id = ids,
                                    addressFile = NewFileName,
                                    DataType = ".xlsx"
                                };
                                GetList.Add(ds);

                                Session["DataSanad"] = GetList;
                            }

                            if (Path.GetExtension(fileUploadAsnad.FileName) == ".xls")
                            {
                                var GetList = (List<dataSourceSanad>)Session["DataSanad"];
                                int idd = GetList.Count + 1;
                                string ids = idd.ToString();
                                string NewFileName = Guid.NewGuid().ToString() + ".xls";
                                fileUploadAsnad.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                                dataSourceSanad ds = new dataSourceSanad()
                                {
                                    id = ids,
                                    addressFile = NewFileName,
                                    DataType = ".xls"
                                };
                                GetList.Add(ds);

                                Session["DataSanad"] = GetList;
                            }
                        }
                        if (Path.GetExtension(fileUploadAsnad.FileName) == ".docx" || Path.GetExtension(fileUploadAsnad.FileName) == ".doc")
                        {
                            if (Path.GetExtension(fileUploadAsnad.FileName) == ".docx")
                            {
                                var GetList = (List<dataSourceSanad>)Session["DataSanad"];
                                int idd = GetList.Count + 1;
                                string ids = idd.ToString();
                                string NewFileName = Guid.NewGuid().ToString() + ".docx";
                                fileUploadAsnad.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                                dataSourceSanad ds = new dataSourceSanad()
                                {
                                    id = ids,
                                    addressFile = NewFileName,
                                    DataType = ".docx"
                                };
                                GetList.Add(ds);

                                Session["DataSanad"] = GetList;
                            }
                            if (Path.GetExtension(fileUploadAsnad.FileName) == ".doc")
                            {
                                var GetList = (List<dataSourceSanad>)Session["DataSanad"];
                                int idd = GetList.Count + 1;
                                string ids = idd.ToString();
                                string NewFileName = Guid.NewGuid().ToString() + ".doc";
                                fileUploadAsnad.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                                dataSourceSanad ds = new dataSourceSanad()
                                {
                                    id = ids,
                                    addressFile = NewFileName,
                                    DataType = ".doc"
                                };
                                GetList.Add(ds);

                                Session["DataSanad"] = GetList;
                            }

                        }
                        if (Path.GetExtension(fileUploadAsnad.FileName) == ".pptx" || Path.GetExtension(fileUploadAsnad.FileName) == ".ppt")
                        {
                            if (Path.GetExtension(fileUploadAsnad.FileName) == ".pptx")
                            {
                                var GetList = (List<dataSourceSanad>)Session["DataSanad"];
                                int idd = GetList.Count + 1;
                                string ids = idd.ToString();
                                string NewFileName = Guid.NewGuid().ToString() + ".pptx";
                                fileUploadAsnad.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                                dataSourceSanad ds = new dataSourceSanad()
                                {
                                    id = ids,
                                    addressFile = NewFileName,
                                    DataType = ".pptx"
                                };
                                GetList.Add(ds);

                                Session["DataSanad"] = GetList;
                            }
                            if (Path.GetExtension(fileUploadAsnad.FileName) == ".ppt")
                            {
                                var GetList = (List<dataSourceSanad>)Session["DataSanad"];
                                int idd = GetList.Count + 1;
                                string ids = idd.ToString();
                                string NewFileName = Guid.NewGuid().ToString() + ".ppt";
                                fileUploadAsnad.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                                dataSourceSanad ds = new dataSourceSanad()
                                {
                                    id = ids,
                                    addressFile = NewFileName,
                                    DataType = ".ppt"
                                };
                                GetList.Add(ds);

                                Session["DataSanad"] = GetList;
                            }

                        }
                    }
                }
            }
            DisplayItems();
            PanelAddLocation.Style.Remove("display");


        }





        void FillDataFile()
        {

            using (DataManagementDataContext context = new DataManagementDataContext())
            {
                var ds = (from m in context.GetAllFilesById(hdnSelectedTicket.Value)
                          select m).ToList();
                for (int i = 0; i < ds.Count; i++)
                {
                    string idd = ds[i].id.ToString();
                    string sFileAddress = ds[i].AddressFile.ToString();
                    string sdataType = ds[i].dataType.ToString();
                    if (sdataType == "" || sdataType == "" || sdataType == "")
                    {
                        dataSourceSanad dss = new dataSourceSanad()
                        {
                            id = idd,
                            DataType = sdataType,
                            addressFile = sFileAddress,
                        };

                    }
                }
            }
        }
    }


}