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
using System.Web.Razor.Parser.SyntaxTree;
using AjaxControlToolkit;
using System.Runtime.Remoting;
using static Stimulsoft.Report.StiOptions.Export;

namespace MersadWebApplication.Moderator.User
{
    public partial class AddNewLocation : System.Web.UI.Page
    {
        #region FunctionPublic
        public class hd
        {
            public string str { get; set; }

        }

        public class getLocation
        {
            public int id { get; set; }
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

        string GetN(string date)
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

        int getDateInt(string date)
        {
            int ret = 0;
            string finalFDate = date.Replace("/", "");

            ret = int.Parse(finalFDate);

            return ret;
        }
        Int64 TodayInt()
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
        string TodayStr()
        {

            PersianCalendar pc = new PersianCalendar();
            DateTime thisDate = DateTime.Now;

            string currentDay = GetN(pc.GetDayOfMonth(thisDate).ToString());
            string currentMounth = GetN(pc.GetMonth(thisDate).ToString());
            string currentyear = pc.GetYear(thisDate).ToString();
            string dateFinalToda = currentyear + "/" + currentMounth + "/" + currentDay;


            return dateFinalToda;
        }
        Int64 ConvertToInt(string str)
        {
            Int64 ret = 0;
            str = str.Replace("/", "");

            ret = Int64.Parse(str);
            return ret;
        }

        string Get1Mah()
        {
            PersianCalendar pc = new PersianCalendar();
            DateTime thisDate = pc.AddMonths(DateTime.Now, -1);

            string currentDay = GetN(pc.GetDayOfMonth(thisDate).ToString());
            string currentMounth = GetN(pc.GetMonth(thisDate).ToString());
            string currentyear = pc.GetYear(thisDate).ToString();

            string dateFinalToda = currentyear + "/" + currentMounth + "/" + currentDay;


            return dateFinalToda;

        }
        string Get1week()
        {
            PersianCalendar pc = new PersianCalendar();
            DateTime thisDate = pc.AddWeeks(DateTime.Now, -1);

            string currentDay = GetN(pc.GetDayOfMonth(thisDate).ToString());
            string currentMounth = GetN(pc.GetMonth(thisDate).ToString());
            string currentyear = pc.GetYear(thisDate).ToString();

            string dateFinalToda = currentyear + "/" + currentMounth + "/" + currentDay;


            return dateFinalToda;

        }
        string Get1Years()
        {
            PersianCalendar pc = new PersianCalendar();
            DateTime thisDate = pc.AddYears(DateTime.Now, -1);

            string currentDay = GetN(pc.GetDayOfMonth(thisDate).ToString());
            string currentMounth = GetN(pc.GetMonth(thisDate).ToString());
            string currentyear = pc.GetYear(thisDate).ToString();

            string dateFinalToda = currentyear + "/" + currentMounth + "/" + currentDay;


            return dateFinalToda;

        }
        string Get2Years()
        {
            PersianCalendar pc = new PersianCalendar();
            DateTime thisDate = pc.AddYears(DateTime.Now, -2);

            string currentDay = GetN(pc.GetDayOfMonth(thisDate).ToString());
            string currentMounth = GetN(pc.GetMonth(thisDate).ToString());
            string currentyear = pc.GetYear(thisDate).ToString();

            string dateFinalToda = currentyear + "/" + currentMounth + "/" + currentDay;


            return dateFinalToda;

        }

        #endregion

        void fillAllCombo()
        {
            using (DataManagementDataContext context = new DataManagementDataContext())
            {
                var ds = (from m in context.allSelect()
                          select m).ToList();
                ddlListStatus.DataSource = ds;
                ddlListStatus.SelectedIndex = 0;
                ddlListStatus.DataValueField = "id";
                ddlListStatus.DataTextField = "statustext";

                ddlListStatus.DataBind();
            }
        }


        #region FunctionGenerateLocations
        [WebMethod]
        public static List<hd> GetList(string test)
        {

            List<getLocation> ListgetLocation = new List<getLocation>();
            List<hd> ListHd = new List<hd>();
            string valsabet = File.ReadAllText(HttpContext.Current.Server.MapPath("~/tempSabet.txt"));
            int sid = 0;
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

            using (DataManagementDataContext context = new DataManagementDataContext())
            {
                #region none
                //@id int,
                //@dateElameNoghteAzSooyePolice    nvarchar(50),
                //@dateElameNoghteAzSooyePoliceInt int ,
                //@dateSabteNoghteDarSamane                     nvarchar(50),
                //@dateSabteNoghteDarSamaneInt                  int ,
                //@datebazdid                                    nvarchar(50),
                //@datebazdidInt                                 int ,
                //@dateGhararGirieNoghteDarsafeEghdam             nvarchar(50),
                //@dateGhararGirieNoghteDarsafeEghdamInt          int ,
                //@dateShorooeejrayeEghdambarayeNoghte            nvarchar(50),	
                //@dateShorooeejrayeEghdambarayeNoghteint         int ,
                //@dateKhatemeyaftanejrayeEghdam                          nvarchar(50),
                //@dateKhatemeyaftanejrayeEghdamint                       int ,
                //@status    nvarchar(50),
                //@tozihat ntext,
                //@latlang nvarchar(50),
                //@datemaster nvarchar(50),
                //@datemasterint int,
                //@typebazezamany nvarchar(50),
                //@todaydate int,
                //@getlastDate int

                #endregion

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
                    "", 0, 0



                    ).AsEnumerable()
                          select m).ToList();
                string id = "";
                string latlang = "";
                string status = "";
                string featuress = "";
                string locations = "";
                for (int i = 0; i < ds.Count - 1; i++)
                {
                    locations = "";
                    locations = File.ReadAllText(HttpContext.Current.Server.MapPath("~/feture.txt"));
                    id = ds[i].id.ToString();
                    latlang = ds[i].latlang.ToString();
                    status = ds[i].status.ToString();
                    locations = locations.Replace("Omid", id);
                    locations = locations.Replace("lt", latlang);
                    locations = locations.Replace("crtype", status);
                    locations = locations.Replace("edame", ",");
                    featuress = featuress + locations;

#pragma warning disable CS0472 // The result of the expression is always 'true' since a value of type 'int' is never equal to 'null' of type 'int?'
                    if (ds[i].id != null) { sid = int.Parse(ds[i].id.ToString()); } else { sid = 0; }
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
                id = ds[ds.Count - 1].id.ToString();
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
                if (ds[ds.Count - 1].id != null) { sid = int.Parse(ds[ds.Count - 1].id.ToString()); } else { sid = 0; }
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




            return ListHd;
        }






        #endregion

        protected void rbbazeZamani_CheckedChanged(object sender, EventArgs e)
        {


        }

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {


                DisplayItems();
                using (DataManagementDataContext context = new DataManagementDataContext())
                {

                    fillAllCombo();
                }
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
        protected void BtnUploadasnad_Click(object sender, EventArgs e)
        {
            if (Session["DataSanad"] == null)
            {
                Session["DataSanad"] = null;
                ListdataSourceSanads.Clear();
                Session["DataSanad"] = ListdataSourceSanads;
                if (fileUploadAsnad.HasFile)
                {
                    if (Path.GetExtension(fileUploadAsnad.FileName) == ".jpg")
                    {
                        var GetList = (List<dataSourceSanad>)Session["DataSanad"];
                        int idd = GetList.Count + 1;
                        string ids = idd.ToString();
                        string NewFileName = Guid.NewGuid().ToString() + ".jpg";
                        fileUploadAsnad.SaveAs(Server.MapPath("~/Temp/") + NewFileName);
                        dataSourceSanad ds = new dataSourceSanad()
                        {
                            id = ids,
                            addressFile = NewFileName,
                            DataType = ".jpg"
                        };
                        GetList.Add(ds);

                        Session["DataSanad"] = GetList;
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
        protected void rptDisplayItemAsnad_ItemCommand(object source, RepeaterCommandEventArgs e)
        {
            if (e.CommandName == "Delete")
            {
                string idd = e.CommandArgument.ToString();

                var GetList = (List<dataSourceSanad>)Session["DataSanad"];

                var ds = (from m in GetList.AsEnumerable()
                          where m.id == idd
                          select m).FirstOrDefault();
                if (ds != null)
                {
                    GetList.Remove(ds);
                    DisplayItems();
                }



            }
        }

        protected void rptListImageAndVideo_ItemCommand(object source, RepeaterCommandEventArgs e)
        {
            if (e.CommandName == "Delete")
            {
                string idd = e.CommandArgument.ToString();

                var GetList = (List<dataSourceSanad>)Session["DataMedia"];

                var ds = (from m in GetList.AsEnumerable()
                          where m.id == idd
                          select m).FirstOrDefault();
                if (ds != null)
                {
                    GetList.Remove(ds);
                    DisplayItems();
                }



            }
        }
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
        public class getCurrent
        {
            public string latlangs { get; set; }
        };

        [WebMethod]
        public static List<getCurrent> GetClicked(string test)
        {
            HttpContext.Current.Session["DataSanad"] = null;
            HttpContext.Current.Session["DataMedia"] = null;
            getCurrent gc = new getCurrent()
            {

                latlangs = test
            };
            List<getCurrent> list = new List<getCurrent>();
            list.Add(gc);
            return list;
        }

        [WebMethod]
        public static List<hd> GoMyLocation(object MyLocation)
        {
            string aaa = MyLocation.ToString();
            HttpContext.Current.Session["DataSanad"] = null;
            HttpContext.Current.Session["DataMedia"] = null;
            hd gc = new hd()
            {

                str = aaa
            };
            List<hd> list = new List<hd>();
            list.Add(gc);
            return list;
        }

        protected void Insertlocation_Click(object sender, EventArgs e)
        {
            string latlang = hdnSelectedTicket.Value;
            string ids = latlang;

            string sinsertelamenoghtesooyePolice = "";
            int sinsertelamenoghtesooyePoliceint = 0;
            string stxtinsertinDatabase = "";
            int stxtinsertinDatabaseint = 0;
            string sstxtinsertdatebazdid = "";
            int sstxtinsertdatebazdidint = 0;
            string stxtinsertDategharargiridarsaf = "";
            int stxtinsertDategharargiridarsafint = 0;
            string stxtinserttarikheshorooeejrayeeghdambarayeNoghte = "";
            int stxtinserttarikheshorooeejrayeeghdambarayeNoghteint = 0;
            string stxtinserttarikhekhatemeyaftanejrayeeghdam = "";
            int stxtinserttarikhekhatemeyaftanejrayeeghdamint = 0;
            #region CheckValidator

            if (txtinsertelamenoghtesooyePolice.Text != "")
            {
                sinsertelamenoghtesooyePoliceint = getDateInt(txtinsertelamenoghtesooyePolice.Text);
                sinsertelamenoghtesooyePolice = txtinsertelamenoghtesooyePolice.Text;
            }
            else
            {
                sinsertelamenoghtesooyePoliceint = 0;
                sinsertelamenoghtesooyePolice = "";
            }
            if (txtinsertinDatabase.Text != "")
            {
                stxtinsertinDatabaseint = getDateInt(txtinsertinDatabase.Text);
                stxtinsertinDatabase = txtinsertinDatabase.Text;
            }
            else
            {
                stxtinsertinDatabaseint = 0;
                stxtinsertinDatabase = "";
            }
            if (txtinsertdatebazdid.Text != "")
            {
                sstxtinsertdatebazdid = txtinsertdatebazdid.Text;
                sstxtinsertdatebazdidint = getDateInt(txtinsertdatebazdid.Text);

            }
            else
            {
                sstxtinsertdatebazdid = "";
                sstxtinsertdatebazdidint = 0;
            }
            if (txtinsertDategharargiridarsaf.Text != "")
            {
                stxtinsertDategharargiridarsaf = txtinsertDategharargiridarsaf.Text;
                stxtinsertDategharargiridarsafint = getDateInt(txtinsertDategharargiridarsaf.Text);
            }
            else
            {
                stxtinsertDategharargiridarsaf = "";
                stxtinsertDategharargiridarsafint = 0;
            }
            if (txtinserttarikheshorooeejrayeeghdambarayeNoghte.Text != "")
            {
                stxtinserttarikheshorooeejrayeeghdambarayeNoghte = txtinserttarikheshorooeejrayeeghdambarayeNoghte.Text;
                stxtinserttarikheshorooeejrayeeghdambarayeNoghteint = getDateInt(txtinserttarikheshorooeejrayeeghdambarayeNoghte.Text);
            }
            else
            {
                stxtinserttarikheshorooeejrayeeghdambarayeNoghte = "";
                stxtinserttarikheshorooeejrayeeghdambarayeNoghteint = 0;
            }
            if (txtinserttarikhekhatemeyaftanejrayeeghdam.Text != "")
            {
                stxtinserttarikhekhatemeyaftanejrayeeghdam = txtinserttarikhekhatemeyaftanejrayeeghdam.Text;
                stxtinserttarikhekhatemeyaftanejrayeeghdamint = getDateInt(txtinserttarikhekhatemeyaftanejrayeeghdam.Text);
            }
            else
            {
                stxtinserttarikhekhatemeyaftanejrayeeghdam = "";
                stxtinserttarikhekhatemeyaftanejrayeeghdamint = 0;
            }
            #endregion

            using (DataManagementDataContext context = new DataManagementDataContext())
            {
                context.insertDataDate(
                    sinsertelamenoghtesooyePolice,
                    sinsertelamenoghtesooyePoliceint,
                    stxtinsertinDatabase,
                    stxtinsertinDatabaseint,
                    sstxtinsertdatebazdid,
                    sstxtinsertdatebazdidint,
                    stxtinsertDategharargiridarsaf,
                    stxtinsertDategharargiridarsafint,
                    stxtinserttarikheshorooeejrayeeghdambarayeNoghte,
                   stxtinserttarikheshorooeejrayeeghdambarayeNoghteint,
                    stxtinserttarikhekhatemeyaftanejrayeeghdam,
                   stxtinserttarikhekhatemeyaftanejrayeeghdamint,
                    ddlListStatus.SelectedValue,
                    txtTozihat.Text, latlang, latlang);

                var GetListSanad = (List<dataSourceSanad>)Session["DataSanad"];
                var GetListMedia = (List<dataSourceSanad>)Session["DataMedia"];

                if (GetListSanad != null)
                {
                    var dsgetDataSanad = (from m in GetListSanad.AsEnumerable()
                                          select m).ToList();
                    if (dsgetDataSanad.Count != 0)
                    {
                        for (int i = 0; i < dsgetDataSanad.Count; i++)
                        {
                            string SourceFile = Server.MapPath("~/temp/" + dsgetDataSanad[i].addressFile);
                            string DestinationFile = Server.MapPath("~/DownloadFile/" + dsgetDataSanad[i].addressFile);
                            string sou = "DownloadFile/" + dsgetDataSanad[i].addressFile;
                            string datafile = dsgetDataSanad[i].DataType;
                            File.Move(SourceFile, DestinationFile);
                            context.insertIntoFiles(ids, sou, datafile);
                        }
                    }
                }
                if (GetListMedia != null)
                {
                    var dsgetDataMedia = (from m in GetListMedia.AsEnumerable()
                                          select m).ToList();
                    if (dsgetDataMedia.Count != 0)
                    {
                        for (int i = 0; i < dsgetDataMedia.Count; i++)
                        {
                            string SourceFile = Server.MapPath("~/temp/" + dsgetDataMedia[i].addressFile);
                            string DestinationFile = Server.MapPath("~/DownloadFile/" + dsgetDataMedia[i].addressFile);
                            string sou = "DownloadFile/" + dsgetDataMedia[i].addressFile;
                            string datafile = dsgetDataMedia[i].DataType;
                            File.Move(SourceFile, DestinationFile);
                            context.insertIntoFiles(ids, sou, datafile);
                        }
                    }
                }



            }
            Session["DataSanad"] = null;
            Session["DataMedia"] = null;
        }

        protected void BtnAdd_Click(object sender, EventArgs e)
        {
            Session["DataSanad"] = null;
            Session["DataMedia"] = null;
        }
    }
}