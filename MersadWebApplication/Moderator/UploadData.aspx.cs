
using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.IO;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Routing;
using System.Web.UI;
using System.Web.UI.WebControls;
using static MersadWebApplication.Moderator.UploadData;
using static System.Net.Mime.MediaTypeNames;
using SQL = System.Data;
using Excel = Microsoft.Office.Interop.Excel;
using System.Reflection;
using System.Text;
using System.Data.SqlClient;
using System.Runtime.InteropServices;
using System.Net;
using System.Data.OleDb;
using IronXL;
using Microsoft.Office.Interop.Excel;
using ExcelDataReader;
using System.Data;
using MersadWebApplication.Data;
using SixLabors.ImageSharp.PixelFormats;

namespace MersadWebApplication.Moderator
{
    public partial class UploadData : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        public class TableAccident
        {

            public int ID { get; set; }
            public string Serial { get; set; }
            public int ProvinceId { get; set; }
            public string CenterCode { get; set; }
            public string CenterName { get; set; }
            public string RouteCode { get; set; }
            public string RouteName { get; set; }
            public string SegmentCode { get; set; }
            public string SegmentName { get; set; }
            public string SpotCode { get; set; }
            public string SpotName { get; set; }
            public string TimeOfAccident { get; set; }
            public string PoliceAwarenessTime { get; set; }
            public string PoliceArrivalTime { get; set; }
            public string EmsArrivalTime { get; set; }
            public string SosArrivalTime { get; set; }
            public string PoliceAwarenessType { get; set; }
            public string Longitude { get; set; }
            public string Latitude { get; set; }
            public int DistanceFromTheOrigin { get; set; }
            public string DateOfAccident { get; set; }
            public string DateOfFormCompletion { get; set; }
            public string CrashType { get; set; }
            public string CrashScene { get; set; }
            public bool HasAddingWitness { get; set; }
            public string CollisionOfA { get; set; }
            public string CollisionOfATwo { get; set; }
            public string TypeOfCollision { get; set; }
            public string Location { get; set; }
            public string SubmitDate { get; set; }
            public int SubmitByUserId { get; set; }
            public bool FormIsCompleted { get; set; }
            public string RoadDefects { get; set; }
            public string CarriageWayDirection { get; set; }
            public string LightingStatus { get; set; }
            public string RoadSurfaceCondition { get; set; }
            public string VisualObstruction { get; set; }
            public bool IsShoulderRoad { get; set; }
            public string ShoulderRoad { get; set; }
            public string ShouldersWidth { get; set; }
            public string RoadMaintenance { get; set; }
            public string RoadAssetsDamage { get; set; }
            public string LocationLandUse { get; set; }
            public string CarCrashLocation { get; set; }
            public string Weather { get; set; }
            public string GeometricDesign { get; set; }
            public string PavmentMarking { get; set; }
            public string RoadwayWidthMain { get; set; }
            public string RoadwayWidthSubsidiary { get; set; }
            public string RoadwayWidthVillage { get; set; }
            public int MaximumSpeedLimit { get; set; }
            public string FinalReason { get; set; }
            public string LackOfAttention { get; set; }
            public string InabilityControlVehicle { get; set; }
            public string VehicleFactorInCarCrash { get; set; }
            public string HumanFactorInCarCrash { get; set; }
            public string JudicialCause { get; set; }
            public int NumberVehiclesInvolved { get; set; }
            public int NumberPedestriansInvolved { get; set; }
            public int NumberBikeInvolved { get; set; }
            public int NumberOfInjured { get; set; }
            public string AccidentDiagramImage { get; set; }
            public string ExplanationAudio { get; set; }
            public string PrimaryCauseAudio { get; set; }
            public string FormerCauseAudio { get; set; }
            public string DirectCauseAudio { get; set; }
            public string PrimaryCauseText { get; set; }
            public string FormerCauseText { get; set; }
            public string DirectCauseText { get; set; }
            public string OrganizationsToBlame { get; set; }
            public int DirectCausePrecent { get; set; }
            public int CausePrecent { get; set; }
            public int Status { get; set; }
            public string StatusIcon { get; set; }
            public bool CheckByPoliceStationAdmin { get; set; }
            public int PoliceStationAdminId { get; set; }
            public string PoliceStationAdminDatetime { get; set; }
            public bool CheckByCampAdmin { get; set; }
            public int CampUserId { get; set; }
            public string CampDatetime { get; set; }
            public bool InNativeArea { get; set; }
            public int CityId { get; set; }
            public int AxisId { get; set; }
            public bool IsHoliday { get; set; }
            public string DayOfWeekFa { get; set; }
            public string EventDay { get; set; }
            public string DateInsert { get; set; }

        };
        public List<TableAccident> listTableAccident = new List<TableAccident>();
        public class TableAccidentBikeRider
        {
            public int Id { get; set; }
            public int AccidentId { get; set; }
            public int IndexNum { get; set; }
            public string OnSiteCrossingFacilities { get; set; }
            public bool IsIdentity { get; set; }
            public string Sex { get; set; }
            public string NationalId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string FatherName { get; set; }
            public int Age { get; set; }
            public string Education { get; set; }
            public string Job { get; set; }
            public string ClothesColor { get; set; }
            public int AverageSpeed { get; set; }
            public int ThrowDistance { get; set; }
            public string Situation { get; set; }
            public string TransferMethod { get; set; }
            public string AmbulanceCode { get; set; }
            public int CausePrecent { get; set; }
            public string InjuryType { get; set; }
        };
        public List<TableAccidentBikeRider> listTableAccidentBikeRider = new List<TableAccidentBikeRider>();
        public class AccidentDamage
        {
            public int Id { get; set; }
            public int AccidentId { get; set; }
            public int AccidentVehicleId { get; set; }
            public string FirstCollision { get; set; }
            public string DamagedParts { get; set; }
        };
        public List<AccidentDamage> listTBL_AccidentDamage = new List<AccidentDamage>();
        public class AccidentDescription
        {
            public int Id { get; set; }
            public int AccidentId { get; set; }
            public string FormCaption { get; set; }
            public string Description { get; set; }
            public string CreateDate { get; set; }
            public string CreateTime { get; set; }
            public int CreateByUserId { get; set; }
            public string LastEditDate { get; set; }
            public string LastEditTime { get; set; }
            public int LastEditByUserId { get; set; }
            public int IsActive { get; set; }
        };
        public List<AccidentDescription> listAccidentDescription = new List<AccidentDescription>();
        public class AccidentPassenger
        {
            public int Id { get; set; }
            public int AccidentId { get; set; }
            public int IndexNum { get; set; }
            public bool IsIdentity { get; set; }
            public string Sex { get; set; }
            public string NationalId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string FatherName { get; set; }
            public int Age { get; set; }
            public string Education { get; set; }
            public string Job { get; set; }
            public string InjuryType { get; set; }
            public string Safety { get; set; }
            public string Situation { get; set; }
            public string TransferMethod { get; set; }
            public string AmbulanceCode { get; set; }
            public int CausePrecent { get; set; }

        };
        public List<AccidentPassenger> listAccidentPassenger = new List<AccidentPassenger>();
        public class AccidentPedestrian
        {
            public int Id { get; set; }
            public int AccidentId { get; set; }
            public int IndexNum { get; set; }
            public string OnSiteCrossingFacilities { get; set; }
            public bool IsPedestriansIdentity { get; set; }
            public string Sex { get; set; }
            public string NationalId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string FatherName { get; set; }
            public int Age { get; set; }
            public string Education { get; set; }
            public string Job { get; set; }
            public string ClothesColor { get; set; }
            public int PedestriansAverageSpeed { get; set; }
            public int PedestrianThrowDistance { get; set; }
            public string PedestriansSituation { get; set; }
            public string TransferMethod { get; set; }
            public string AmbulanceCode { get; set; }
            public int CausePrecent { get; set; }
            public string InjuryType { get; set; }
        };
        public List<AccidentPedestrian> listAccidentPedestrian = new List<AccidentPedestrian>();
        public class AccidentVehicle
        {
            public int Id { get; set; }
            public int AccidentId { get; set; }
            public int IndexNum { get; set; }
            public bool DidDriverFleeScene { get; set; }
            public string PlateNumber { get; set; }
            public string VehicleType { get; set; }
            public string VehicleSystem { get; set; }
            public string VehicleManeuvering { get; set; }
            public string PlateType { get; set; }
            public string SafetyEquipment { get; set; }
            public string PathDirection { get; set; }
            public string SignsOnRoad { get; set; }
            public string FunctionAfterDamage { get; set; }
            public string VehicleTechnicalInspection { get; set; }
            public string CompanyOrganisation { get; set; }
            public bool HasVehicleLoad { get; set; }
            public string LoadType { get; set; }
            public int LoadFreight { get; set; }
            public bool SystemIncompatibility { get; set; }
            public bool AirbagFunction { get; set; }
            public string AccidentTraces { get; set; }
            public string TypeOfCollision { get; set; }
            public string CodeCausingAccident { get; set; }
            public int BrakeTraceBeforeAccident { get; set; }
            public int BrakeTraceAfterAccident { get; set; }
            public int DistanceMoveAfterAccident { get; set; }
            public int AccelerationIncludings { get; set; }
            public int RoadFrictionFactor { get; set; }
            public int VehiclesHeightFromGround { get; set; }
            public int SlopeDegreeDirection { get; set; }
            public int BrakeAcceleration { get; set; }
            public int RoadsCurveRadius { get; set; }
            public int TierMarks { get; set; }
            public int QuDriverNoticedDanger { get; set; }
            public int QuDriverTime { get; set; }
            public int QuMaximumDistancePieces { get; set; }
            public int BrakeTraceTestSpeed { get; set; }
            public int TestSpeed { get; set; }
            public bool IsDriversIdentity { get; set; }
            public string Sex { get; set; }
            public string SeatBelt { get; set; }
            public string DriverStatues { get; set; }
            public string InjuryAtScene { get; set; }
            public string ReactionBeforeAccident { get; set; }
            public int NumberOfPassengers { get; set; }
            public string NationalId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string FatherName { get; set; }
            public int Age { get; set; }
            public int DriverLicenceNumber { get; set; }
            public string DateLicenceIssue { get; set; }
            public string PlaceLicenceIssue { get; set; }
            public string DriverLicenceCategory { get; set; }
            public string DriverLicenceStatus { get; set; }
            public bool IsDriverLicenceIncompatibility { get; set; }
            public string Education { get; set; }
            public string Job { get; set; }
            public string TransferMethod { get; set; }
            public string AmbulanceCode { get; set; }
            public int CausePrecent { get; set; }
            public bool IsLocal { get; set; }

        };

        public List<AccidentVehicle> listAccidentVehicle = new List<AccidentVehicle>();
        public class AccidentWitness
        {
            public int Id { get; set; }
            public int AccidentId { get; set; }
            public int IndexNum { get; set; }
            public string Name { get; set; }
            public string Phone { get; set; }
        };

        public List<AccidentWitness> listAccidentWitness = new List<AccidentWitness>();

        protected void Button1_Click(object sender, EventArgs e)
        {


        }
        void damage()
        {
            int f1 = 0;
            int f2 = 0;
            string f3 = "";
            string f4 = "";
            if (fudamage.HasFile)
            {
                string nameFileAccident = Guid.NewGuid().ToString() + ".xlsx";
                string addressFileAccident = Server.MapPath("~/DataForImport/" + nameFileAccident);
                fudamage.SaveAs(addressFileAccident);

                using (var stream = File.Open(addressFileAccident, FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        var data = reader.AsDataSet();
                        System.Data.DataTable dt = data.Tables[0];
                        int col = dt.Columns.Count;
                        int row = dt.Rows.Count;
                        using (DataManagementDataContext context = new DataManagementDataContext())
                        {
                            var ds = (from m in dt.AsEnumerable()
                                      select m).ToList();


                            for (int i = 1; i < ds.Count; i++)
                            {

                                if (ds[i][1] != null) { if (ds[i][1].ToString().Length > 0) { f1 = int.Parse(ds[i][1].ToString()); } } else { f1 = 0; }
                                if (ds[i][2] != null) { if (ds[i][2].ToString().Length > 0) { f2 = byte.Parse(ds[i][2].ToString()); } } else { f2 = 0; }
                                if (ds[i][3] != null) { if (ds[i][3].ToString().Length > 0) { f3 = ds[i][3].ToString(); } } else { f3 = ""; }
                                if (ds[i][4] != null) { if (ds[i][4].ToString().Length > 0) { f4 = ds[i][4].ToString(); } } else { f4 = ""; }
                                context.insertdamage(f1,f2,f3,f4);

                            }
                        }


                    }

                }


            }
        }

        void bikeRider()
        {
            int f1 = 0;
            byte f2 = 0;
            string f3 = "";
            bool f4 = false;
            string f5 = "";
            string f6 = "";
            string f7 = "";
            string f8 = "";
            string f9 = "";
            byte f10 = 0;
            string f11 = "";
            string f12 = "";
            string f13 = "";
            byte f14 = 0;
            Int16 f15 = 0;
            string f16 = "";
            string f17 = "";
            string f18 = "";
            decimal f19 = 0;
            string f20 = "";


            if (fubikerider.HasFile)
            {
                string nameFileAccident = Guid.NewGuid().ToString() + ".xlsx";
                string addressFileAccident = Server.MapPath("~/DataForImport/" + nameFileAccident);
                fubikerider.SaveAs(addressFileAccident);

                using (var stream = File.Open(addressFileAccident, FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        var data = reader.AsDataSet();
                        System.Data.DataTable dt = data.Tables[0];
                        int col = dt.Columns.Count;
                        int row = dt.Rows.Count;
                        using (DataManagementDataContext context = new DataManagementDataContext())
                        {
                            var ds = (from m in dt.AsEnumerable()
                                      select m).ToList();


                            for (int i = 1; i < ds.Count; i++)
                            {

                                if (ds[i][1] != null) { if (ds[i][1]      .ToString().Length > 0) { f1 = int.Parse(ds[i][1].ToString()); } } else { f1 = 0; }
                                if (ds[i][2] != null) { if (ds[i][2]      .ToString().Length > 0) { f2 = byte.Parse(ds[i][2].ToString()); } } else { f2 = 0; }
                                if (ds[i][3] != null) { if (ds[i][3]      .ToString().Length > 0) { f3 = ds[i][3].ToString(); } } else { f3 = ""; }
                                if (ds[i][4] != null) { if (ds[i][4]      .ToString().Length > 0) { f4 = bool.Parse(ds[i][4].ToString()); } } else { f4 = false; }
                                if (ds[i][5] != null) { if (ds[i][5]      .ToString().Length > 0) { f5 = ds[i][5].ToString(); } } else { f5 = ""; }
                                if (ds[i][6] != null) { if (ds[i][6]      .ToString().Length > 0) { f6 = ds[i][6].ToString(); } } else { f6 = ""; }
                                if (ds[i][7] != null) { if (ds[i][7]      .ToString().Length > 0) { f7 = ds[i][7].ToString(); } } else { f7 = ""; }
                                if (ds[i][8] != null) { if (ds[i][8]      .ToString().Length > 0) { f8 = ds[i][8].ToString(); } } else { f8 = ""; }
                                if (ds[i][9] != null) { if (ds[i][9]      .ToString().Length > 0) { f9 = ds[i][9].ToString(); } } else { f9 = ""; }
                                if (ds[i][10] != null) { if(ds[i][10]    .ToString().Length > 0) { f10 = byte.Parse(ds[i][10].ToString()); } } else { f10 = 0; }
                                if (ds[i][11] != null) { if(ds[i][11]    .ToString().Length > 0) { f11 = ds[i][11].ToString(); } } else { f11 = ""; }
                                if (ds[i][12] != null) { if(ds[i][12]    .ToString().Length > 0) { f12 = ds[i][12].ToString(); } } else { f12 = ""; }
                                if (ds[i][13] != null) { if(ds[i][13]    .ToString().Length > 0) { f13 = ds[i][13].ToString(); } } else { f13 = ""; }
                                if (ds[i][14] != null) { if(ds[i][14]    .ToString().Length > 0) { f14 = byte.Parse(ds[i][14].ToString()); } } else { f14 = 0; }
                                if (ds[i][15] != null) { if(ds[i][15]    .ToString().Length > 0) { f15 = short.Parse(ds[i][15].ToString()); } } else { f15 = 0; }
                                if (ds[i][16] != null) { if(ds[i][16]    .ToString().Length > 0) { f16 = ds[i][16].ToString(); } } else { f16 = ""; }
                                if (ds[i][17] != null) { if(ds[i][17]    .ToString().Length > 0) { f17 = ds[i][17].ToString(); } } else { f17 = ""; }
                                if (ds[i][18] != null) { if(ds[i][18]    .ToString().Length > 0) { f18 = ds[i][18].ToString(); } } else { f18 = ""; }
                                if (ds[i][19] != null) { if(ds[i][19]    .ToString().Length > 0) { f19 = decimal.Parse(ds[i][19].ToString()); } } else { f19 = 0; }
                                if (ds[i][20] != null) { if(ds[i][20]    .ToString().Length > 0) { f20 = ds[i][20].ToString(); } else { f20 = ""; } }


                                context.insertBikeRider(
                                    f1,
                                    f2,
                                                                       f3,
                                                                       f4,
                                                                       f5,
                                                                       f6,
                                                                       f7,
                                                                       f8,
                                                                       f9,
                                                                       f10,
                                                                       f11,
                                                                       f12,
                                                                       f13,
                                                                       f14,
                                                                       f15,
                                                                       f16,
                                                                       f17,
                                                                       f18,
                                                                       f19,
                                                                        f20


                                                                       );












                            }
                        }


                    }

                }
            }

        }
        void description()
        {
            int f1 = 0;
            string  f2 = "";
            string f3 = "";
            string f4 = "";
            string f5 = "";
            Int64 f6 = 0;
            string f7 = "";
            string f8 = "";
            Int64 f9 = 0;
            bool f10 = false;
           


            if (fudescription.HasFile)
            {
                string nameFileAccident = Guid.NewGuid().ToString() + ".xlsx";
                string addressFileAccident = Server.MapPath("~/DataForImport/" + nameFileAccident);
                fudescription.SaveAs(addressFileAccident);

                using (var stream = File.Open(addressFileAccident, FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        var data = reader.AsDataSet();
                        System.Data.DataTable dt = data.Tables[0];
                        int col = dt.Columns.Count;
                        int row = dt.Rows.Count;
                        using (DataManagementDataContext context = new DataManagementDataContext())
                        {
                            var ds = (from m in dt.AsEnumerable()
                                      select m).ToList();


                            for (int i = 1; i < ds.Count; i++)
                            {

                                if (ds[i][1] != null) { if (ds[i][1].ToString().Length > 0) { f1 = int.Parse(ds[i][1].ToString()); } } else { f1 = 0; }
                                if (ds[i][2] != null) { if (ds[i][2].ToString().Length > 0) { f2 = ds[i][2].ToString(); } } else { f2 =""; }
                                if (ds[i][3] != null) { if (ds[i][3].ToString().Length > 0) { f3 = ds[i][3].ToString(); } } else { f3 = ""; }
                                if (ds[i][4] != null) { if (ds[i][4].ToString().Length > 0) { f4 =ds[i][4].ToString(); } } else { f4 = ""; }
                                if (ds[i][5] != null) { if (ds[i][5].ToString().Length > 0) { f5 = ds[i][5].ToString(); } } else { f5 = ""; }
                                if (ds[i][6] != null) { if (ds[i][6].ToString().Length > 0) { f6 =long.Parse( ds[i][6].ToString()); } } else { f6 = 0; }
                                if (ds[i][7] != null) { if (ds[i][7].ToString().Length > 0) { f7 = ds[i][7].ToString(); } } else { f7 = ""; }
                                if (ds[i][8] != null) { if (ds[i][8].ToString().Length > 0) { f8 = ds[i][8].ToString(); } } else { f8 = ""; }
                                if (ds[i][9] != null) { if (ds[i][9].ToString().Length > 0) { f9 = long.Parse(ds[i][9].ToString()); } } else { f9 = 0; }
                                if (ds[i][10] != null) { if (ds[i][10].ToString().Length > 0) { f10 = bool.Parse(ds[i][10].ToString()); } } else { f10 = false; }
                   

                                context.insertdescription(
                                    f1,
                                    f2,
                                                                       f3,
                                                                       f4,
                                                                       f5,
                                                                       f6,
                                                                       f7,
                                                                       f8,
                                                                       f9,f10
                                                                        
                                                                       


                                                                       );












                            }
                        }


                    }

                }
            }

        }
      

        void passenger()
        {
            #region vat
            Int64 f1 = 0;
            byte f2 =0;
            bool f3 = false;
            string f4 = "";
            string f5 = "";
            string f6 = "";
            string f7 = "";
            string f8 = "";
            byte f9 = 0;
            string f10 = "";
            string f11 = "";
            string f12 = "";
            string f13 = "";
            string f14 = "";
            string f15 = "";
            string f16 = "";
            decimal f17 = 0;

            #endregion
            if (fupassenger.HasFile)
            {
                string nameFileAccident = Guid.NewGuid().ToString() + ".xlsx";
                string addressFileAccident = Server.MapPath("~/DataForImport/" + nameFileAccident);
                fupassenger.SaveAs(addressFileAccident);
                ImportDataAccident(addressFileAccident);
                using (var stream = File.Open(addressFileAccident, FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        var data = reader.AsDataSet();
                        System.Data.DataTable dt = data.Tables[0];
                        int col = dt.Columns.Count;
                        int row = dt.Rows.Count;
                        using (DataManagementDataContext context = new DataManagementDataContext())
                        {
                            var ds = (from m in dt.AsEnumerable()
                                      select m).ToList();


                            for (int i = 1; i < ds.Count; i++)
                            {

                                if (ds[i][1] != null) { if (ds[i][1].ToString().Length > 0) { f1 = Int64.Parse(ds[i][1].ToString()); } } else { f1 = 0; }
                                if (ds[i][2] != null) { if (ds[i][2].ToString().Length > 0) { f2 = byte.Parse(ds[i][2].ToString()); } } else { f2 = 0; }
                                if (ds[i][3] != null) { if (ds[i][3].ToString().Length > 0) { f3 = bool.Parse(ds[i][3].ToString()); } } else { f3 = false; }
                                if (ds[i][4] != null) { if (ds[i][4].ToString().Length > 0) { f4 = ds[i][4].ToString(); } } else { f4 = ""; }
                                if (ds[i][5] != null) { if (ds[i][5].ToString().Length > 0) { f5 = ds[i][5].ToString(); } } else { f5 = ""; }
                                if (ds[i][6] != null) { if (ds[i][6].ToString().Length > 0) { f6 = ds[i][6].ToString(); } } else { f6 = ""; }
                                if (ds[i][7] != null) { if (ds[i][7].ToString().Length > 0) { f7 = ds[i][7].ToString(); } } else { f7 = ""; }
                                if (ds[i][8] != null) { if (ds[i][8].ToString().Length > 0) { f8 = ds[i][8].ToString(); } } else { f8 = ""; }
                                if (ds[i][9] != null) { if (ds[i][9].ToString().Length > 0) { f9 = byte.Parse(ds[i][9].ToString()); } } else { f9 = 0; }
                                if (ds[i][10] != null) { if (ds[i][10].ToString().Length > 0) { f10 = ds[i][10].ToString(); } } else { f10 = ""; }
                                if (ds[i][11] != null) { if (ds[i][11].ToString().Length > 0) { f11 = ds[i][11].ToString(); } } else { f11 = ""; }
                                if (ds[i][12] != null) { if (ds[i][12].ToString().Length > 0) { f12 = ds[i][12].ToString(); } } else { f12 = ""; }
                                if (ds[i][13] != null) { if (ds[i][13].ToString().Length > 0) { f13 = ds[i][13].ToString(); } } else { f13 = ""; }
                                if (ds[i][14] != null) { if (ds[i][14].ToString().Length > 0) { f14 = ds[i][14].ToString(); } } else { f14 = ""; }
                                if (ds[i][15] != null) { if (ds[i][15].ToString().Length > 0) { f15 = ds[i][15].ToString(); } } else { f15 = ""; }
                                if (ds[i][16] != null) { if (ds[i][16].ToString().Length > 0) { f16 = ds[i][16].ToString(); } } else { f16 = ""; }
                                if (ds[i][17] != null) { if (ds[i][17].ToString().Length > 0) { f17 = decimal.Parse(ds[i][17].ToString()); } } else { f17 = 0; }


                                context.insertintopassenger(
                                    f1,
                                    f2,
                                                                       f3,
                                                                       f4,
                                                                       f5,
                                                                       f6,
                                                                       f7,
                                                                       f8,
                                                                       f9,
                                                                       f10,
                                                                       f11,
                                                                       f12,
                                                                       f13,
                                                                       f14,
                                                                       f15,
                                                                       f16,
                                                                       f17


                                                                       );












                            }
                        }


                    }

                } 
            }
        }


        void pedest()
        {
            Int64 f1 = 0;
            byte f2 = 0;
            string f3 = "";
            bool f4 = false;
            string f5 = "";
            string f6 = "";
            string f7 = "";
            string f8 = "";
            string f9 = "";
            byte f10 = 0;
            string f11 = "";
            string f12 = "";
            string f13 = "";
            byte f14 = 0;
            Int16 f15 = 0;
            string f16 = "";
            string f17 = "";
            string f18 = "";
            decimal f19 = 0;
            string f20 = "";


            if (fupedstrian.HasFile)
            {
                string nameFileAccident = Guid.NewGuid().ToString() + ".xlsx";
                string addressFileAccident = Server.MapPath("~/DataForImport/" + nameFileAccident);
                fupedstrian.SaveAs(addressFileAccident);

                using (var stream = File.Open(addressFileAccident, FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        var data = reader.AsDataSet();
                        System.Data.DataTable dt = data.Tables[0];
                        int col = dt.Columns.Count;
                        int row = dt.Rows.Count;
                        using (DataManagementDataContext context = new DataManagementDataContext())
                        {
                            var ds = (from m in dt.AsEnumerable()
                                      select m).ToList();


                            for (int i = 1; i < ds.Count; i++)
                            {

                                if (ds[i][1] != null) { if (ds[i][1].ToString().Length > 0) { f1 = Int64.Parse(ds[i][1].ToString()); } } else { f1 = 0; }
                                if (ds[i][2] != null) { if (ds[i][2].ToString().Length > 0) { f2 = byte.Parse(ds[i][2].ToString()); } } else { f2 = 0; }
                                if (ds[i][3] != null) { if (ds[i][3].ToString().Length > 0) { f3 = ds[i][3].ToString(); } } else { f3 = ""; }
                                if (ds[i][4] != null) { if (ds[i][4].ToString().Length > 0) { f4 = bool.Parse(ds[i][4].ToString()); } } else { f4 = false; }
                                if (ds[i][5] != null) { if (ds[i][5].ToString().Length > 0) { f5 = ds[i][5].ToString(); } } else { f5 = ""; }
                                if (ds[i][6] != null) { if (ds[i][6].ToString().Length > 0) { f6 = ds[i][6].ToString(); } } else { f6 = ""; }
                                if (ds[i][7] != null) { if (ds[i][7].ToString().Length > 0) { f7 = ds[i][7].ToString(); } } else { f7 = ""; }
                                if (ds[i][8] != null) { if (ds[i][8].ToString().Length > 0) { f8 = ds[i][8].ToString(); } } else { f8 = ""; }
                                if (ds[i][9] != null) { if (ds[i][9].ToString().Length > 0) { f9 = ds[i][9].ToString(); } } else { f9 = ""; }
                                if (ds[i][10] != null) { if (ds[i][10].ToString().Length > 0) { f10 = byte.Parse(ds[i][10].ToString()); } } else { f10 = 0; }
                                if (ds[i][11] != null) { if (ds[i][11].ToString().Length > 0) { f11 = ds[i][11].ToString(); } } else { f11 = ""; }
                                if (ds[i][12] != null) { if (ds[i][12].ToString().Length > 0) { f12 = ds[i][12].ToString(); } } else { f12 = ""; }
                                if (ds[i][13] != null) { if (ds[i][13].ToString().Length > 0) { f13 = ds[i][13].ToString(); } } else { f13 = ""; }
                                if (ds[i][14] != null) { if (ds[i][14].ToString().Length > 0) { f14 = byte.Parse(ds[i][14].ToString()); } } else { f14 = 0; }
                                if (ds[i][15] != null) { if (ds[i][15].ToString().Length > 0) { f15 = short.Parse(ds[i][15].ToString()); } } else { f15 = 0; }
                                if (ds[i][16] != null) { if (ds[i][16].ToString().Length > 0) { f16 = ds[i][16].ToString(); } } else { f16 = ""; }
                                if (ds[i][17] != null) { if (ds[i][17].ToString().Length > 0) { f17 = ds[i][17].ToString(); } } else { f17 = ""; }
                                if (ds[i][18] != null) { if (ds[i][18].ToString().Length > 0) { f18 = ds[i][18].ToString(); } } else { f18 = ""; }
                                if (ds[i][19] != null) { if (ds[i][19].ToString().Length > 0) { f19 = decimal.Parse(ds[i][19].ToString()); } } else { f19 = 0; }
                                if (ds[i][20] != null) { if (ds[i][20].ToString().Length > 0) { f20 = ds[i][20].ToString(); } else { f20 = ""; } }


                                context.insertintopredist(
                                    f1,
                                    f2,
                                                                       f3,
                                                                       f4,
                                                                       f5,
                                                                       f6,
                                                                       f7,
                                                                       f8,
                                                                       f9,
                                                                       f10,
                                                                       f11,
                                                                       f12,
                                                                       f13,
                                                                       f14,
                                                                       f15,
                                                                       f16,
                                                                       f17,
                                                                       f18,
                                                                       f19,
                                                                        f20


                                                                       );












                            }
                        }


                    }

                }
            }

        }

        void vehicle()
        {
            if (fuvehicle.HasFile)
            {
                #region vat
                Int64 f1 = 0;
                byte f2 = 0;
                bool f3 = false;
                string f4 = "";
                string f5 = "";
                string f6 = "";
                string f7 = "";
                string f8 = "";
                string f9 = "";
                string f10 = "";
                string f11 = "";
                string f12 = "";
                string f13 = "";
                string f14 = "";
                bool f15 = false;
                string f16 = "";
                Int16 f17 = 0;
                bool f18 = false;
                bool f19 = false;
                string f20 = "";
                string f21 = "";
                string f22 = "";
                decimal f23 = 0;
                decimal f24 = 0;
                decimal f25 = 0;
                decimal f26 = 0;
                decimal f27 = 0;
                decimal f28 = 0;
                decimal f29 = 0;
                decimal f30 = 0;
                decimal f31 = 0;
                decimal f32 = 0;
                decimal f33 = 0;
                decimal f34 = 0;
                decimal f35 = 0;
                decimal f36 = 0;
                decimal f37 = 0;
                bool f38 = false;
                string f39 = "";
                string f40 = "";
                string f41 = "";
                string f42 = "";
                string f43 = "";
                byte f44 = 0;
                string f45 = "";
                string f46 = "";
                string f47 = "";
                string f48 = "";
                byte f49 = 0;
                decimal f50 = 0;
                string f51 = "";
                string f52 = "";
                string f53 = "";
                string f54 = "";
                bool f55 = false;
                string f56 = "";
                string f57 = "";
                string f58 = "";
                string f59 = "";
                decimal f60 = 0;
                bool f61 = false;
               
                #endregion
                string nameFileAccident = Guid.NewGuid().ToString() + ".xlsx";
                string addressFileAccident = Server.MapPath("~/DataForImport/" + nameFileAccident);
                fuvehicle.SaveAs(addressFileAccident);
                ImportDataAccident(addressFileAccident);
                using (var stream = File.Open(addressFileAccident, FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        var data = reader.AsDataSet();
                        System.Data.DataTable dt = data.Tables[0];
                        int col = dt.Columns.Count;
                        int row = dt.Rows.Count;
                        using (DataManagementDataContext context = new DataManagementDataContext())
                        {
                            var ds = (from m in dt.AsEnumerable()
                                      select m).ToList();


                            for (int i = 1; i < ds.Count; i++)
                            {

                                if (ds[i][1] != null) { if (ds[i][1].ToString().Length > 0) { f1 = Int64.Parse(ds[i][1].ToString()); } } else { f1 = 0; }
                                if (ds[i][2] != null) { if (ds[i][2].ToString().Length > 0) { f2 =byte.Parse( ds[i][2].ToString()); } } else { f2 = 0; }
                                if (ds[i][3] != null) { if (ds[i][3].ToString().Length > 0) { f3 = bool.Parse(ds[i][3].ToString()); } } else { f3 = false; }
                                if (ds[i][4] != null) { if (ds[i][4].ToString().Length > 0) { f4 = ds[i][4].ToString(); } } else { f4 = ""; }
                                if (ds[i][5] != null) { if (ds[i][5].ToString().Length > 0) { f5 = ds[i][5].ToString(); } } else { f5 = ""; }
                                if (ds[i][6] != null) { if (ds[i][6].ToString().Length > 0) { f6 = ds[i][6].ToString(); } } else { f6 = ""; }
                                if (ds[i][7] != null) { if (ds[i][7].ToString().Length > 0) { f7 = ds[i][7].ToString(); } } else { f7 = ""; }
                                if (ds[i][8] != null) { if (ds[i][8].ToString().Length > 0) { f8 = ds[i][8].ToString(); } } else { f8 = ""; }
                                if (ds[i][9] != null) { if (ds[i][9].ToString().Length > 0) { f9 = ds[i][9].ToString(); } } else { f9 = ""; }
                                if (ds[i][10] != null) { if (ds[i][10].ToString().Length > 0) { f10 = ds[i][10].ToString(); } } else { f10 = ""; }
                                if (ds[i][11] != null) { if (ds[i][11].ToString().Length > 0) { f11 = ds[i][11].ToString(); } } else { f11 = ""; }
                                if (ds[i][12] != null) { if (ds[i][12].ToString().Length > 0) { f12 = ds[i][12].ToString(); } } else { f12 = ""; }
                                if (ds[i][13] != null) { if (ds[i][13].ToString().Length > 0) { f13 = ds[i][13].ToString(); } } else { f13 = ""; }
                                if (ds[i][14] != null) { if (ds[i][14].ToString().Length > 0) { f14 = ds[i][14].ToString(); } } else { f14 = ""; }
                                if (ds[i][15] != null) { if (ds[i][15].ToString().Length > 0) { f15 =bool.Parse( ds[i][15].ToString()); } } else { f15 = false; }
                                if (ds[i][16] != null) { if (ds[i][16].ToString().Length > 0) { f16 = ds[i][16].ToString(); } } else { f16 = ""; }
                                if (ds[i][17] != null) { if (ds[i][17].ToString().Length > 0) { f17 = short.Parse(ds[i][17].ToString()); } } else { f17 = 0; }
                                if (ds[i][18] != null) { if (ds[i][18].ToString().Length > 0) { f18 =bool.Parse(ds[i][18].ToString()); } } else { f18 = false; }
                                if (ds[i][19] != null) { if (ds[i][19].ToString().Length > 0) { f19 =bool.Parse(ds[i][19].ToString()); } } else { f19 = false; }
                                if (ds[i][20] != null) { if (ds[i][20].ToString().Length > 0) { f20 =ds[i][20].ToString(); } else { f20 = ""; } }
                                if (ds[i][21] != null) { if (ds[i][21].ToString().Length > 0) { f21 =ds[i][21].ToString(); } } else { f21 = ""; }
                                if (ds[i][22] != null) { if (ds[i][22].ToString().Length > 0) { f22 =ds[i][22].ToString(); } } else { f22 = ""; }
                                if (ds[i][23] != null) { if (ds[i][23].ToString().Length > 0) { f23 =decimal.Parse(ds[i][23].ToString()); } } else { f23 =0; }
                                if (ds[i][24] != null) { if (ds[i][24].ToString().Length > 0) { f24 =decimal.Parse(ds[i][24].ToString()); } } else { f24 =0; }
                                if (ds[i][25] != null) { if (ds[i][25].ToString().Length > 0) { f25 = decimal.Parse(ds[i][25].ToString()); } else { f25 = 0; } }
                                if (ds[i][26] != null) { if (ds[i][26].ToString().Length > 0) { f26 =decimal.Parse( ds[i][26].ToString()); } } else { f26 = 0; }
                                if (ds[i][27] != null) { if (ds[i][27].ToString().Length > 0) { f27 =decimal.Parse( ds[i][27].ToString()); } } else { f27 = 0; }
                                if (ds[i][28] != null) { if (ds[i][28].ToString().Length > 0) { f28 =decimal.Parse( ds[i][28].ToString()); } } else { f28 = 0; }
                                if (ds[i][29] != null) { if (ds[i][29].ToString().Length > 0) { f29 =decimal.Parse( ds[i][29].ToString()); } } else { f29 = 0; }
                                if (ds[i][30] != null) { if (ds[i][30].ToString().Length > 0) { f30 = decimal.Parse(ds[i][30].ToString()); } } else { f30 = 0; }
                                if (ds[i][31] != null) { if (ds[i][31].ToString().Length > 0) { f31 = decimal .Parse(ds[i][31].ToString()); } } else { f31 = 0; }
                                if (ds[i][32] != null) { if (ds[i][32].ToString().Length > 0) { f32 = decimal.Parse(ds[i][32].ToString()); } } else { f32 = 0; }
                                if (ds[i][33] != null) { if (ds[i][33].ToString().Length > 0) { f33 = decimal.Parse(ds[i][33].ToString()); } } else { f33 = 0; }
                                if (ds[i][34] != null) { if (ds[i][34].ToString().Length > 0) { f34 = decimal.Parse(ds[i][34].ToString()); } } else { f34 = 0; }
                                if (ds[i][35] != null) { if (ds[i][35].ToString().Length > 0) { f35 = decimal.Parse(ds[i][35].ToString()); } } else { f35 = 0; }
                                if (ds[i][36] != null) { if (ds[i][36].ToString().Length > 0) { f36 = decimal.Parse(ds[i][36].ToString()); } } else { f36 = 0; }
                                if (ds[i][37] != null) { if (ds[i][37].ToString().Length > 0) { f37 = decimal.Parse(ds[i][37].ToString()); } } else { f37 = 0; }
                                if (ds[i][38] != null) { if (ds[i][38].ToString().Length > 0) { f38 = bool.Parse(ds[i][38].ToString()); } } else { f38 = false; }
                                if (ds[i][39] != null) { if (ds[i][39].ToString().Length > 0) { f39 = ds[i][39].ToString(); } } else { f39 = ""; }
                                if (ds[i][40] != null) { if (ds[i][40].ToString().Length > 0) { f40 = ds[i][40].ToString(); } } else { f40 = ""; }
                                if (ds[i][41] != null) { if (ds[i][41].ToString().Length > 0) { f41 = ds[i][41].ToString(); } } else { f41 = ""; }
                                if (ds[i][42] != null) { if (ds[i][42].ToString().Length > 0) { f42 = ds[i][42].ToString(); } } else { f42 = ""; }
                                if (ds[i][43] != null) { if (ds[i][43].ToString().Length > 0) { f43 = ds[i][43].ToString(); } } else { f43 = ""; }
                                if (ds[i][44] != null) { if (ds[i][44].ToString().Length > 0) { f44 =byte.Parse( ds[i][44].ToString()); } } else { f44 =0; }
                                if (ds[i][45] != null) { if (ds[i][45].ToString().Length > 0) { f45 = ds[i][45].ToString(); } } else { f45 = ""; }
                                if (ds[i][46] != null) { if (ds[i][46].ToString().Length > 0) { f46 = ds[i][46].ToString(); } } else { f46 = ""; }
                                if (ds[i][47] != null) { if (ds[i][47].ToString().Length > 0) { f47 = ds[i][47].ToString(); } } else { f47 = ""; }
                                if (ds[i][48] != null) { if (ds[i][48].ToString().Length > 0) { f48 = ds[i][48].ToString(); } } else { f48 = ""; }
                                if (ds[i][49] != null) { if (ds[i][49].ToString().Length > 0) { f49 = byte.Parse(ds[i][49].ToString()); } } else { f49 = 0; }
                                if (ds[i][50] != null) { if (ds[i][50].ToString().Length > 0) { f50 = decimal.Parse( ds[i][50].ToString()); } } else { f50 = 0; }
                                if (ds[i][51] != null) { if (ds[i][51].ToString().Length > 0) { f51 = ds[i][51].ToString(); } else { f51 = ""; } }
                                if (ds[i][52] != null) { if (ds[i][52].ToString().Length > 0) { f52 = ds[i][52].ToString(); } } else { f52 = ""; }
                                if (ds[i][53] != null) { if (ds[i][53].ToString().Length > 0) { f53 = ds[i][53].ToString(); } } else { f53 = ""; }
                                if (ds[i][54] != null) { if (ds[i][54].ToString().Length > 0) { f54 = ds[i][54].ToString(); } } else { f54 = ""; }
                                if (ds[i][55] != null) { if (ds[i][55].ToString().Length > 0) { f55 = bool.Parse(ds[i][55].ToString()); } } else { f55 =false; }
                                if (ds[i][56] != null) { if (ds[i][56].ToString().Length > 0) { f56 = ds[i][56].ToString(); } } else { f56 = ""; }
                                if (ds[i][57] != null) { if (ds[i][57].ToString().Length > 0) { f57 = ds[i][57].ToString(); } } else { f57 = ""; }
                                if (ds[i][58] != null) { if (ds[i][58].ToString().Length > 0) { f58 =ds[i][58].ToString(); } } else { f58 = ""; }
                                if (ds[i][59] != null) { if (ds[i][59].ToString().Length > 0) { f59 =ds[i][59].ToString(); } } else { f59 = ""; }
                                if (ds[i][60] != null) { if (ds[i][60].ToString().Length > 0) { f60 = decimal.Parse(ds[i][60].ToString()); } } else { f60 = 0; }
                                if (ds[i][61] != null) { if (ds[i][61].ToString().Length > 0) { f61 = bool.Parse(ds[i][61].ToString()); } } else { f61 =false; }
                                 

                                context.insertVehicle(f1,
                                    f2,
                                                                       f3,
                                                                       f4,
                                                                       f5,
                                                                       f6,
                                                                       f7,
                                                                       f8,
                                                                       f9,
                                                                       f10,
                                                                       f11,
                                                                       f12,
                                                                       f13,
                                                                       f14,
                                                                       f15,
                                                                       f16,
                                                                       f17,
                                                                       f18,
                                                                       f19,
                                                                        f20,
                                                                       f21,
                                                                       f22,
                                                                       f23,
                                                                       f24,
                                                                        f25,
                                                                       f26,
                                                                       f27,
                                                                       f28,
                                                                       f29,
                                                                       f30,
                                                                     f31,
                                                                       f32,
                                                                       f33,
                                                                       f34,
                                                                       f35,
                                                                       f36,
                                                                       f37,
                                                                       f38,
                                                                       f39,
                                                                       f40,
                                                                       f41,
                                                                       f42,
                                                                       f43,
                                                                       f44,
                                                                       f45,
                                                                       f46,
                                                                       f47,
                                                                       f48,
                                                                       f49,
                                                                       f50,
                                                                       f51,
                                                                       f52,
                                                                       f53,
                                                                       f54,
                                                                       f55,
                                                                       f56,
                                                                       f57,
                                                                       f58,
                                                                       f59,
                                                                       f60,
                                                                       f61

                                                                       );












                            }
                        }


                    }

                }
            }
        }

        void witnes()
        {
            if (fuwitness.HasFile)
            {
                #region vat
                Int64 f1 = 0;
                byte f2 = 0;
                string f3 = "";
                string f4 = "";
                

                #endregion
                string nameFileAccident = Guid.NewGuid().ToString() + ".xlsx";
                string addressFileAccident = Server.MapPath("~/DataForImport/" + nameFileAccident);
                fuwitness.SaveAs(addressFileAccident);
                ImportDataAccident(addressFileAccident);
                using (var stream = File.Open(addressFileAccident, FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        var data = reader.AsDataSet();
                        System.Data.DataTable dt = data.Tables[0];
                        int col = dt.Columns.Count;
                        int row = dt.Rows.Count;
                        using (DataManagementDataContext context = new DataManagementDataContext())
                        {
                            var ds = (from m in dt.AsEnumerable()
                                      select m).ToList();


                            for (int i = 1; i < ds.Count; i++)
                            {

                                if (ds[i][1] != null) { if (ds[i][1].ToString().Length > 0) { f1 = Int64.Parse(ds[i][1].ToString()); } } else { f1 = 0; }
                                if (ds[i][2] != null) { if (ds[i][2].ToString().Length > 0) { f2 = byte.Parse(ds[i][2].ToString()); } } else { f2 = 0; }
                                if (ds[i][3] != null) { if (ds[i][3].ToString().Length > 0) { f3 =ds[i][3].ToString(); } } else { f3 = ""; }
                                if (ds[i][4] != null) { if (ds[i][4].ToString().Length > 0) { f4 = ds[i][4].ToString(); } } else { f4 = ""; }
                                 

                                context.insetintowitness(f1,
                                    f2,
                                                                       f3,
                                                                       f4
                                                                     
                                                                       );












                            }
                        }


                    }

                }
            }
        }
        protected void BtnUploadProccess_Click(object sender, EventArgs e)
        {
            damage();
            bikeRider();
            description();
            witnes();
            vehicle();
            pedest();
            passenger();
            #region vat
            Int64 f1 = 0;
            string f2 = "";
            int f3 = 0;
            string f4 = "";
            string f5 = "";
            string f6 = "";
            string f7 = "";
            string f8 = "";
            string f9 = "";
            string f10 = "";
            string f11 = "";
            string f12 = "";
            string f13 = "";
            string f14 = "";
            string f15 = "";
            string f16 = "";
            string f17 = "";
            string f18 = "";
            string f19 = "";
            int f20 = 0;
            string f21 = "";
            string f22 = "";
            string f23 = "";
            string f24 = "";
            bool f25 = false;
            string f26 = "";
            string f27 = "";
            string f28 = "";
            string f29 = "";
            string f30 = "";
            int f31 = 0;
            bool f32 = false;
            string f33 = "";
            string f34 = "";
            string f35 = "";
            string f36 = "";
            string f37 = "";
            bool f38 = false;
            string f39 = "";
            string f40 = "";
            string f41 = "";
            string f42 = "";
            string f43 = "";
            string f44 = "";
            string f45 = "";
            string f46 = "";
            string f47 = "";
            string f48 = "";
            string f49 = "";
            string f50 = "";
            byte f51 = 0;
            string f52 = "";
            string f53 = "";
            string f54 = "";
            string f55 = "";
            string f56 = "";
            string f57 = "";
            byte f58 = 0;
            byte f59 = 0;
            byte f60 = 0;
            byte f61 = 0;
            string f62 = "";
            string f63 = "";
            string f64 = "";
            string f65 = "";
            string f66 = "";
            string f67 = "";
            string f68 = "";
            string f69 = "";
            string f70 = "";
            decimal f71 = 0;
            decimal f72 = 0;
            string f73 = "";
            string f74 = "";
            bool f75 = false;
            int f76 = 0;
            string f77 = "";
            bool f78 = false;
            int f79 = 0;
            string f80 = "";
            bool f81 = false;
            int f82 = 0;
            int f83 = 0;
            bool f84 = false;
            string f85 = "";
            string f86 = "";
            string f87 = "";
            #endregion
            string nameFileAccident = Guid.NewGuid().ToString() + ".xlsx";
            string addressFileAccident = Server.MapPath("~/DataForImport/" + nameFileAccident);
            fuaccident.SaveAs(addressFileAccident);
            ImportDataAccident(addressFileAccident);
            using (var stream = File.Open(addressFileAccident, FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    var data = reader.AsDataSet();
                    System.Data.DataTable dt = data.Tables[0];
                    int col = dt.Columns.Count;
                    int row = dt.Rows.Count;
                    using (DataManagementDataContext context = new DataManagementDataContext())
                    {
                        var ds = (from m in dt.AsEnumerable()
                                  select m).ToList();


                        for (int i = 1; i < ds.Count; i++)
                        {

                            if (ds[i][1] != null) { if (ds[i][1].ToString().Length > 0) { f1 = Int64.Parse(ds[i][1].ToString()); } } else { f1 = 0; }
                            if (ds[i][2] != null) { if (ds[i][2].ToString().Length > 0) { f2 = ds[i][2].ToString(); } } else { f2 = ""; }
                            if (ds[i][3] != null) { if (ds[i][3].ToString().Length > 0) { f3 = int.Parse(ds[i][3].ToString()); } } else { f3 = 0; }
                            if (ds[i][4] != null) { if (ds[i][4].ToString().Length > 0) { f4 = ds[i][4].ToString(); } } else { f4 = ""; }
                            if (ds[i][5] != null) { if (ds[i][5].ToString().Length > 0) { f5 = ds[i][5].ToString(); } } else { f5 = ""; }
                            if (ds[i][6] != null) { if (ds[i][6].ToString().Length > 0) { f6 = ds[i][6].ToString(); } } else { f6 = ""; }
                            if (ds[i][7] != null) { if (ds[i][7].ToString().Length > 0) { f7 = ds[i][7].ToString(); } } else { f7 = ""; }
                            if (ds[i][8] != null) { if (ds[i][8].ToString().Length > 0) { f8 = ds[i][8].ToString(); } } else { f8 = ""; }
                            if (ds[i][9] != null) { if (ds[i][9].ToString().Length > 0) { f9 = ds[i][9].ToString(); } } else { f9 = ""; }
                            if (ds[i][10] != null) { if (ds[i][10].ToString().Length > 0) { f10 = ds[i][10].ToString(); } } else { f10 = ""; }
                            if (ds[i][11] != null) { if (ds[i][11].ToString().Length > 0) { f11 = ds[i][11].ToString(); } } else { f11 = ""; }
                            if (ds[i][12] != null) { if (ds[i][12].ToString().Length > 0) { f12 = ds[i][12].ToString(); } } else { f12 = ""; }
                            if (ds[i][13] != null) { if (ds[i][13].ToString().Length > 0) { f13 = ds[i][13].ToString(); } } else { f13 = ""; }
                            if (ds[i][14] != null) { if (ds[i][14].ToString().Length > 0) { f14 = ds[i][14].ToString(); } } else { f14 = ""; }
                            if (ds[i][15] != null) { if (ds[i][15].ToString().Length > 0) { f15 = ds[i][15].ToString(); } } else { f15 = ""; }
                            if (ds[i][16] != null) { if (ds[i][16].ToString().Length > 0) { f16 = ds[i][16].ToString(); } } else { f16 = ""; }
                            if (ds[i][17] != null) { if (ds[i][17].ToString().Length > 0) { f17 = ds[i][17].ToString(); } } else { f17 = ""; }
                            if (ds[i][18] != null) { if (ds[i][18].ToString().Length > 0) { f18 = ds[i][18].ToString(); } } else { f18 = ""; }
                            if (ds[i][19] != null) { if (ds[i][19].ToString().Length > 0) { f19 = ds[i][19].ToString(); } } else { f19 = ""; }
                            if (ds[i][20] != null) { if (ds[i][20].ToString().Length > 0) { f20 = int.Parse(ds[i][20].ToString()); } else { f20 = 0; } }
                            if (ds[i][21] != null) { if (ds[i][21].ToString().Length > 0) { f21 = ds[i][21].ToString(); } } else { f21 = ""; }
                            if (ds[i][22] != null) { if (ds[i][22].ToString().Length > 0) { f22 = ds[i][22].ToString(); } } else { f22 = ""; }
                            if (ds[i][23] != null) { if (ds[i][23].ToString().Length > 0) { f23 = ds[i][23].ToString(); } } else { f23 = ""; }
                            if (ds[i][24] != null) { if (ds[i][24].ToString().Length > 0) { f24 = ds[i][24].ToString(); } } else { f24 = ""; }
                            if (ds[i][25] != null) { if (ds[i][25].ToString().Length > 0) { f25 = bool.Parse(ds[i][25].ToString()); } else { f25 = false; } }
                            if (ds[i][26] != null) { if (ds[i][26].ToString().Length > 0) { f26 = ds[i][26].ToString(); } } else { f26 = ""; }
                            if (ds[i][27] != null) { if (ds[i][27].ToString().Length > 0) { f27 = ds[i][27].ToString(); } } else { f27 = ""; }
                            if (ds[i][28] != null) { if (ds[i][28].ToString().Length > 0) { f28 = ds[i][28].ToString(); } } else { f28 = ""; }
                            if (ds[i][29] != null) { if (ds[i][29].ToString().Length > 0) { f29 = ds[i][29].ToString(); } } else { f29 = ""; }
                            if (ds[i][30] != null) { if (ds[i][30].ToString().Length > 0) { f30 = ds[i][30].ToString(); } } else { f30 = ""; }
                            if (ds[i][31] != null) { if (ds[i][31].ToString().Length > 0) { f31 = int.Parse(ds[i][31].ToString()); } } else { f31 = 0; }
                            if (ds[i][32] != null) { if (ds[i][32].ToString().Length > 0) { f32 = bool.Parse(ds[i][32].ToString()); } } else { f32 = false; }
                            if (ds[i][33] != null) { if (ds[i][33].ToString().Length > 0) { f33 = ds[i][33].ToString(); } } else { f33 = ""; }
                            if (ds[i][34] != null) { if (ds[i][34].ToString().Length > 0) { f34 = ds[i][34].ToString(); } } else { f34 = ""; }
                            if (ds[i][35] != null) { if (ds[i][35].ToString().Length > 0) { f35 = ds[i][35].ToString(); } } else { f35 = ""; }
                            if (ds[i][36] != null) { if (ds[i][36].ToString().Length > 0) { f36 = ds[i][36].ToString(); } } else { f36 = ""; }
                            if (ds[i][37] != null) { if (ds[i][37].ToString().Length > 0) { f37 = ds[i][37].ToString(); } } else { f37 = ""; }
                            if (ds[i][38] != null) { if (ds[i][38].ToString().Length > 0) { f38 = bool.Parse(ds[i][38].ToString()); } } else { f38 = false; }
                            if (ds[i][39] != null) { if (ds[i][39].ToString().Length > 0) { f39 = ds[i][39].ToString(); } } else { f39 = ""; }
                            if (ds[i][40] != null) { if (ds[i][40].ToString().Length > 0) { f40 = ds[i][40].ToString(); } } else { f40 = ""; }
                            if (ds[i][41] != null) { if (ds[i][41].ToString().Length > 0) { f41 = ds[i][41].ToString(); } } else { f41 = ""; }
                            if (ds[i][42] != null) { if (ds[i][42].ToString().Length > 0) { f42 = ds[i][42].ToString(); } } else { f42 = ""; }
                            if (ds[i][43] != null) { if (ds[i][43].ToString().Length > 0) { f43 = ds[i][43].ToString(); } } else { f43 = ""; }
                            if (ds[i][44] != null) { if (ds[i][44].ToString().Length > 0) { f44 = ds[i][44].ToString(); } } else { f44 = ""; }
                            if (ds[i][45] != null) { if (ds[i][45].ToString().Length > 0) { f45 = ds[i][45].ToString(); } } else { f45 = ""; }
                            if (ds[i][46] != null) { if (ds[i][46].ToString().Length > 0) { f46 = ds[i][46].ToString(); } } else { f46 = ""; }
                            if (ds[i][47] != null) { if (ds[i][47].ToString().Length > 0) { f47 = ds[i][47].ToString(); } } else { f47 = ""; }
                            if (ds[i][48] != null) { if (ds[i][48].ToString().Length > 0) { f48 = ds[i][48].ToString(); } } else { f48 = ""; }
                            if (ds[i][49] != null) { if (ds[i][49].ToString().Length > 0) { f49 = ds[i][49].ToString(); } } else { f49 = ""; }
                            if (ds[i][50] != null) { if (ds[i][50].ToString().Length > 0) { f50 = ds[i][50].ToString(); } } else { f50 = ""; }
                            if (ds[i][51] != null) { if (ds[i][51].ToString().Length > 0) { f51 = byte.Parse(ds[i][51].ToString()); } else { f51 = 0; } }
                            if (ds[i][52] != null) { if (ds[i][52].ToString().Length > 0) { f52 = ds[i][52].ToString(); } } else { f52 = ""; }
                            if (ds[i][53] != null) { if (ds[i][53].ToString().Length > 0) { f53 = ds[i][53].ToString(); } } else { f53 = ""; }
                            if (ds[i][54] != null) { if (ds[i][54].ToString().Length > 0) { f54 = ds[i][54].ToString(); } } else { f54 = ""; }
                            if (ds[i][55] != null) { if (ds[i][55].ToString().Length > 0) { f55 = ds[i][55].ToString(); } } else { f55 = ""; }
                            if (ds[i][56] != null) { if (ds[i][56].ToString().Length > 0) { f56 = ds[i][56].ToString(); } } else { f56 = ""; }
                            if (ds[i][57] != null) { if (ds[i][57].ToString().Length > 0) { f57 = ds[i][57].ToString(); } } else { f57 = ""; }
                            if (ds[i][58] != null) { if (ds[i][58].ToString().Length > 0) { f58 = byte.Parse(ds[i][58].ToString()); } } else { f58 = 0; }
                            if (ds[i][59] != null) { if (ds[i][59].ToString().Length > 0) { f59 = byte.Parse(ds[i][59].ToString()); } } else { f59 = 0; }
                            if (ds[i][60] != null) { if (ds[i][60].ToString().Length > 0) { f60 = byte.Parse(ds[i][60].ToString()); } } else { f60 = 0; }
                            if (ds[i][61] != null) { if (ds[i][61].ToString().Length > 0) { f61 = byte.Parse(ds[i][61].ToString()); } } else { f61 = 0; }
                            if (ds[i][62] != null) { if (ds[i][62].ToString().Length > 0) { f62 = ds[i][62].ToString(); } } else { f62 = ""; }
                            if (ds[i][63] != null) { if (ds[i][63].ToString().Length > 0) { f63 = ds[i][63].ToString(); } } else { f63 = ""; }
                            if (ds[i][64] != null) { if (ds[i][64].ToString().Length > 0) { f64 = ds[i][64].ToString(); } } else { f64 = ""; }
                            if (ds[i][65] != null) { if (ds[i][65].ToString().Length > 0) { f65 = ds[i][65].ToString(); } } else { f65 = ""; }
                            if (ds[i][66] != null) { if (ds[i][66].ToString().Length > 0) { f66 = ds[i][66].ToString(); } } else { f66 = ""; }
                            if (ds[i][67] != null) { if (ds[i][67].ToString().Length > 0) { f67 = ds[i][67].ToString(); } } else { f67 = ""; }
                            if (ds[i][68] != null) { if (ds[i][68].ToString().Length > 0) { f68 = ds[i][68].ToString(); } } else { f68 = ""; }
                            if (ds[i][69] != null) { if (ds[i][69].ToString().Length > 0) { f69 = ds[i][69].ToString(); } } else { f69 = ""; }
                            if (ds[i][70] != null) { if (ds[i][70].ToString().Length > 0) { f70 = ds[i][70].ToString(); } } else { f70 = ""; }
                            if (ds[i][71] != null) { if (ds[i][71].ToString().Length > 0) { f71 = decimal.Parse(ds[i][71].ToString()); } } else { f71 = 0; }
                            if (ds[i][72] != null) { if (ds[i][72].ToString().Length > 0) { f72 = decimal.Parse(ds[i][72].ToString()); } } else { f72 = 0; }
                            if (ds[i][73] != null) { if (ds[i][73].ToString().Length > 0) { f73 = ds[i][73].ToString(); } } else { f73 = ""; }
                            if (ds[i][74] != null) { if (ds[i][74].ToString().Length > 0) { f74 = ds[i][74].ToString(); } } else { f74 = ""; }
                            if (ds[i][75] != null) { if (ds[i][75].ToString().Length > 0) { f75 = bool.Parse(ds[i][75].ToString()); } } else { f75 = false; }
                            if (ds[i][76] != null) { if (ds[i][76].ToString().Length > 0) { f76 = int.Parse(ds[i][76].ToString()); } } else { f76 = 0; }
                            if (ds[i][77] != null) { if (ds[i][77].ToString().Length > 0) { f77 = ds[i][77].ToString(); } } else { f77 = ""; }
                            if (ds[i][78] != null) { if (ds[i][78].ToString().Length > 0) { f78 = bool.Parse(ds[i][78].ToString()); } } else { f78 = false; }
                            if (ds[i][79] != null) { if (ds[i][79].ToString().Length > 0) { f79 = int.Parse(ds[i][79].ToString()); } } else { f79 = 0; }
                            if (ds[i][80] != null) { if (ds[i][80].ToString().Length > 0) { f80 = ds[i][80].ToString(); } } else { f80 = ""; }
                            if (ds[i][81] != null) { if (ds[i][81].ToString().Length > 0) { f81 = bool.Parse(ds[i][81].ToString()); } } else { f81 = false; }
                            if (ds[i][82] != null) { if (ds[i][82].ToString().Length > 0) { f82 = int.Parse(ds[i][82].ToString()); } } else { f82 = 0; }
                            if (ds[i][83] != null) { if (ds[i][83].ToString().Length > 0) { f83 = int.Parse(ds[i][83].ToString()); } } else { f83 = 0; }
                            if (ds[i][84] != null) { if (ds[i][84].ToString().Length > 0) { f84 = bool.Parse(ds[i][84].ToString()); } } else { f84 = false; }
                            if (ds[i][85] != null) { if (ds[i][85].ToString().Length > 0) { f85 = ds[i][85].ToString(); } } else { f85 = ""; }
                            if (ds[i][86] != null) { if (ds[i][86].ToString().Length > 0) { f86 = ds[i][86].ToString(); } } else { f86 = ""; }
                            if (ds[i][87] != null) { if (ds[i][87].ToString().Length > 0) { f87 = ds[i][87].ToString(); } } else { f87 = ""; }

                            context.InsertRecordAccident(
                                f2,
                                                                   f3,
                                                                   f4,
                                                                   f5,
                                                                   f6,
                                                                   f7,
                                                                   f8,
                                                                   f9,
                                                                   f10,
                                                                   f11,
                                                                   f12,
                                                                   f13,
                                                                   f14,
                                                                   f15,
                                                                   f16,
                                                                   f17,
                                                                   f18,
                                                                   f19,
                                                                    f20,
                                                                   f21,
                                                                   f22,
                                                                   f23,
                                                                   f24,
                                                                    f25,
                                                                   f26,
                                                                   f27,
                                                                   f28,
                                                                   f29,
                                                                   f30,
                                                                 f31,
                                                                   f32,
                                                                   f33,
                                                                   f34,
                                                                   f35,
                                                                   f36,
                                                                   f37,
                                                                   f38,
                                                                   f39,
                                                                   f40,
                                                                   f41,
                                                                   f42,
                                                                   f43,
                                                                   f44,
                                                                   f45,
                                                                   f46,
                                                                   f47,
                                                                   f48,
                                                                   f49,
                                                                   f50,
                                                                   f51,
                                                                   f52,
                                                                   f53,
                                                                   f54,
                                                                   f55,
                                                                   f56,
                                                                   f57,
                                                                   f58,
                                                                   f59,
                                                                   f60,
                                                                   f61,
                                                                   f62,
                                                                   f63,
                                                                   f64,
                                                                   f65,
                                                                   f66,
                                                                   f67,
                                                                   f68,
                                                                   f69,
                                                                   f70,
                                                                   f71,
                                                                   f72,
                                                                   f73,
                                                                   f74,
                                                                   f75,
                                                                   f76,
                                                                   f77,
                                                                   f78,
                                                                   f79,
                                                                   f80,
                                                                   f81,
                                                                   f82,
                                                                   f83,
                                                                   f84,
                                                                   f85,
                                                                   f86,
                                                                   f87

                                                                   );












                        }
                    }


                }

            }
            ltDisplayResult.Text = "عملیات با موفقیت انجام شد";
        }
        void ImportDataAccident(string addressFileAccident)
        {

        }
        void DownloadDataExcelFile_TBLAccident(string Filename)
        {



        }
    }
}