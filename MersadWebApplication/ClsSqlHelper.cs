// Decompiled with JetBrains decompiler
// Type: MersadWebApplication.ClsSqlHelper
// Assembly: MersadWebApplication, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 00011582-1D29-40D5-A573-FFFA691809E4
// Assembly location: E:\wwwroot\bin\MersadWebApplication.dll

using MersadWebApplication.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace MersadWebApplication
{
    public class ClsSqlHelper
    {
        private readonly ClsHelper _helper = new ClsHelper();
        private readonly string _constring = ConfigurationManager.ConnectionStrings["MersadConnectionString"].ConnectionString;

        public void GlobalInsert(
          CommandType isStoredProcedure,
          string queryString,
          params SqlParameter[] arrParam)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand(queryString, connection))
                {
                    sqlCommand.CommandType = isStoredProcedure;
                    sqlCommand.CommandTimeout = 360;
                    if (arrParam != null && arrParam.Length != 0)
                        sqlCommand.Parameters.AddRange(arrParam);
                    connection.Open();
                    sqlCommand.ExecuteReader();
                    connection.Close();
                }
            }
        }

        public long GlobalInsertWithReturnId(
          CommandType isStoredProcedure,
          string queryString,
          params SqlParameter[] arrParam)
        {
            long int64;
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand(queryString, connection))
                {
                    sqlCommand.CommandType = isStoredProcedure;
                    sqlCommand.CommandTimeout = 360;
                    if (arrParam != null && arrParam.Length != 0)
                        sqlCommand.Parameters.AddRange(arrParam);
                    SqlParameter sqlParameter1 = new SqlParameter();
                    sqlParameter1.ParameterName = "@returnId";
                    sqlParameter1.Direction = ParameterDirection.Output;
                    sqlParameter1.Size = 20;
                    SqlParameter sqlParameter2 = sqlParameter1;
                    sqlCommand.Parameters.Add(sqlParameter2);
                    connection.Open();
                    sqlCommand.ExecuteNonQuery();
                    int64 = Convert.ToInt64(sqlCommand.Parameters["@returnId"].Value);
                    connection.Close();
                }
            }
            return int64;
        }

        public void GlobalUpdate(
          CommandType isStoredProcedure,
          string queryString,
          params SqlParameter[] arrParam)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand(queryString, connection))
                {
                    sqlCommand.CommandType = isStoredProcedure;
                    sqlCommand.CommandTimeout = 360;
                    if (arrParam != null && arrParam.Length != 0)
                        sqlCommand.Parameters.AddRange(arrParam);
                    connection.Open();
                    sqlCommand.ExecuteReader();
                    connection.Close();
                }
            }
        }

        public long GlobalUpdateWithReturnId(
          CommandType isStoredProcedure,
          string queryString,
          params SqlParameter[] arrParam)
        {
            long int64;
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand(queryString, connection))
                {
                    sqlCommand.CommandType = isStoredProcedure;
                    sqlCommand.CommandTimeout = 360;
                    if (arrParam != null && arrParam.Length != 0)
                        sqlCommand.Parameters.AddRange(arrParam);
                    SqlParameter sqlParameter1 = new SqlParameter();
                    sqlParameter1.ParameterName = "@returnId";
                    sqlParameter1.Direction = ParameterDirection.Output;
                    sqlParameter1.Size = 20;
                    SqlParameter sqlParameter2 = sqlParameter1;
                    sqlCommand.Parameters.Add(sqlParameter2);
                    connection.Open();
                    sqlCommand.ExecuteNonQuery();
                    int64 = Convert.ToInt64(sqlCommand.Parameters["@returnId"].Value);
                    connection.Close();
                }
            }
            return int64;
        }

        public object GlobalObjectReturnConnection(
          CommandType isStoredProcedure,
          string queryString,
          string objectName,
          params SqlParameter[] arrParam)
        {
            object obj = (object)null;
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand(queryString, connection))
                {
                    sqlCommand.CommandType = isStoredProcedure;
                    sqlCommand.CommandTimeout = 360;
                    if (arrParam != null && arrParam.Length != 0)
                        sqlCommand.Parameters.AddRange(arrParam);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read() && !objectName.Equals(""))
                        obj = sqlDataReader[objectName] == DBNull.Value ? (object)null : sqlDataReader[objectName];
                    connection.Close();
                }
            }
            return obj;
        }

        private string GlobalStringReturnWhileConnection(
          CommandType isStoredProcedure,
          string queryString,
          string objectName,
          params SqlParameter[] arrParam)
        {
            string str = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand(queryString, connection))
                {
                    sqlCommand.CommandType = isStoredProcedure;
                    if (arrParam != null && arrParam.Length != 0)
                        sqlCommand.Parameters.AddRange(arrParam);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read() && !objectName.Equals(""))
                        str += sqlDataReader[objectName]?.ToString();
                    connection.Close();
                }
            }
            return str;
        }

        private bool GlobalIsReadReturnBoolean(
          CommandType isStoredProcedure,
          string queryString,
          params SqlParameter[] arrParam)
        {
            bool flag = false;
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand(queryString, connection))
                {
                    sqlCommand.CommandType = isStoredProcedure;
                    if (arrParam != null && arrParam.Length != 0)
                        sqlCommand.Parameters.AddRange(arrParam);
                    connection.Open();
                    if (sqlCommand.ExecuteReader().Read())
                        flag = true;
                    connection.Close();
                }
            }
            return flag;
        }

        private void GlobalConnectionWithRepeater(
          Repeater rpt,
          CommandType isStoredProcedure,
          string queryString,
          params SqlParameter[] arrParam)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand(queryString, connection))
                {
                    sqlCommand.CommandType = isStoredProcedure;
                    if (arrParam != null && arrParam.Length != 0)
                        sqlCommand.Parameters.AddRange(arrParam);
                    connection.Open();
                    rpt.DataSource = (object)sqlCommand.ExecuteReader();
                    rpt.DataBind();
                    connection.Close();
                }
            }
        }

        private void GlobalConnectionWithGridView(
          GridView grid,
          CommandType isStoredProcedure,
          string queryString,
          params SqlParameter[] arrParam)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand(queryString, connection))
                {
                    sqlCommand.CommandType = isStoredProcedure;
                    if (arrParam != null && arrParam.Length != 0)
                        sqlCommand.Parameters.AddRange(arrParam);
                    connection.Open();
                    grid.DataSource = (object)sqlCommand.ExecuteReader();
                    grid.DataBind();
                    connection.Close();
                }
            }
        }

        public void Insert_Login(long userId, string userIp)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@UserId", SqlDbType.BigInt);
            sqlParameter1.Value = (object)userId;
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@UserIp", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)userIp;
            sqlParameterList.Add(sqlParameter2);
            this.GlobalInsert(CommandType.StoredProcedure, "SP_Insert_TBL_Login", sqlParameterList.ToArray());
        }

        public bool Select_AccessToButton(long userId, long planId, string path)
        {
            if (path.Length > 512 || string.IsNullOrEmpty(path))
                return false;
            bool button = false;
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select null from TBL_AccessToButton as acc inner join TBL_Button on acc.ButtonId = TBL_Button.Id where acc.UserId = @UserId and TBL_Button.AbsolutePath = @Path", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@UserId", (object)userId);
                    sqlCommand.Parameters.AddWithValue("@Path", (object)path);
                    connection.Open();
                    if (sqlCommand.ExecuteReader().Read())
                        button = true;
                    connection.Close();
                }
                using (SqlCommand sqlCommand = new SqlCommand("select null from TBL_AccessToButtonPlan as acc inner join TBL_Button on acc.ButtonId = TBL_Button.Id where acc.PlanId = @PlanId and TBL_Button.AbsolutePath = @Path", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@PlanId", (object)planId);
                    sqlCommand.Parameters.AddWithValue("@Path", (object)path);
                    connection.Open();
                    if (sqlCommand.ExecuteReader().Read())
                        button = true;
                    connection.Close();
                }
            }
            return button;
        }

        public bool Select_AccessToControls(long userId, long planId, string btnName)
        {
            if (btnName.Length > 512 || string.IsNullOrEmpty(btnName))
                return false;
            bool controls = false;
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select null from TBL_AccessToButton as acc inner join TBL_Button on acc.ButtonId = TBL_Button.Id where acc.UserId = @UserId and TBL_Button.Name = @Path", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@UserId", (object)userId);
                    sqlCommand.Parameters.AddWithValue("@Path", (object)btnName);
                    connection.Open();
                    if (sqlCommand.ExecuteReader().Read())
                        controls = true;
                    connection.Close();
                }
                using (SqlCommand sqlCommand = new SqlCommand("select null from TBL_AccessToButtonPlan as acc inner join TBL_Button on acc.ButtonId = TBL_Button.Id where acc.PlanId = @PlanId and TBL_Button.Name = @Path", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@PlanId", (object)planId);
                    sqlCommand.Parameters.AddWithValue("@Path", (object)btnName);
                    connection.Open();
                    if (sqlCommand.ExecuteReader().Read())
                        controls = true;
                    connection.Close();
                }
            }
            return controls;
        }

        public void Insert_Exception(string formUrl, string msg)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@FormUrl", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)formUrl;
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Message", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)msg;
            sqlParameterList.Add(sqlParameter2);
            this.GlobalInsert(CommandType.StoredProcedure, "SP_Insert_TBL_Exception", sqlParameterList.ToArray());
        }

        public void Update_UserState(long userId, bool isTrue)
        {
            List<SqlParameter> sqlParameterList1 = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@UserId", SqlDbType.BigInt);
            sqlParameter1.Value = (object)userId;
            sqlParameterList1.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@UserState", SqlDbType.Bit);
            sqlParameter2.Value = (object)isTrue;
            sqlParameterList1.Add(sqlParameter2);
            this.GlobalUpdate(CommandType.Text, "update TBL_User set UserState = @UserState where Id = @UserId", sqlParameterList1.ToArray());
            if (isTrue)
                return;
            List<SqlParameter> sqlParameterList2 = new List<SqlParameter>();
            SqlParameter sqlParameter3 = new SqlParameter("@UserId", SqlDbType.BigInt);
            sqlParameter3.Value = (object)userId;
            sqlParameterList2.Add(sqlParameter3);
            this.GlobalUpdate(CommandType.Text, "update tblogin set LogoutDate = getdate() from (select * from TBL_Login order by Id desc) tblogin where UserId = @UserId", sqlParameterList2.ToArray());
        }

        public string Select_GetAbsolutePath(long planId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter = new SqlParameter("@PlanId", SqlDbType.BigInt);
            sqlParameter.Value = (object)planId;
            sqlParameterList.Add(sqlParameter);
            return this.GlobalObjectReturnConnection(CommandType.Text, "select tb.AbsolutePath from TBL_Plan tp inner join TBL_Button tb on tb.Id = tp.ButtonId where tp.Id = @PlanId", "AbsolutePath", sqlParameterList.ToArray()).ToString();
        }

        public int Select_GetButtonId(long planId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter = new SqlParameter("@PlanId", SqlDbType.BigInt);
            sqlParameter.Value = (object)planId;
            sqlParameterList.Add(sqlParameter);
            return Convert.ToInt32(this.GlobalObjectReturnConnection(CommandType.Text, "select ButtonId from TBL_Plan where Id = @PlanId", "ButtonId", sqlParameterList.ToArray()) ?? (object)0);
        }

        public void Select_GetUserInfo(
          string username,
          string password,
          out bool hasUser,
          out long userId,
          out long planId,
          out string name,
          out string family,
          out string planName,
          out string absPath)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select top(1) tu.Id,tu.IsActive,tu.Name, tu.Family,tu.NationalId,tu.PlanId,tplan.Caption PlanName,iif(tu.DefaultButtonId is not null,(SELECT AbsolutePath FROM TBL_Button where Id = tu.DefaultButtonId),'') as AbsPath from TBL_User tu inner join TBL_Plan tplan on tplan.Id = tu.PlanId where tu.Username = @PropertyCode and tu.Password = @Password", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@PropertyCode", (object)username);
                    sqlCommand.Parameters.AddWithValue("@Password", (object)this._helper.Encode(password));
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        hasUser = true;
                        userId = Convert.ToInt64(sqlDataReader["Id"]);
                        name = sqlDataReader["Name"].ToString();
                        family = sqlDataReader["Family"].ToString();
                        planId = Convert.ToInt64(sqlDataReader["PlanId"]);
                        planName = sqlDataReader["PlanName"].ToString();
                        absPath = sqlDataReader["AbsPath"].ToString();
                    }
                    else
                    {
                        name = family = planName = absPath = "";
                        hasUser = false;
                        userId = planId = 0L;
                    }
                    connection.Close();
                }
            }
        }

        public long Insert_User(
          long planId,
          string name,
          string family,
          string fatherName,
          string birthDate,
          string nationalId,
          long policeStationId,
          string username,
          string password,
          string imageUrl,
          long registerById,
          string area)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Insert";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@PlanId", SqlDbType.BigInt);
            sqlParameter2.Value = (object)planId;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@Name", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)name;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@Family", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)family;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@FatherName", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)fatherName;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@BirthDate", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)birthDate;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@NationalId", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)nationalId;
            sqlParameterList.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@IsActive", SqlDbType.Bit);
            sqlParameter8.Value = (object)true;
            sqlParameterList.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@PoliceStationId", SqlDbType.BigInt);
            sqlParameter9.Value = (object)policeStationId;
            sqlParameterList.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@Username", SqlDbType.NVarChar);
            sqlParameter10.Value = (object)username;
            sqlParameterList.Add(sqlParameter10);
            SqlParameter sqlParameter11 = new SqlParameter("@Password", SqlDbType.NVarChar);
            sqlParameter11.Value = (object)this._helper.Encode(password);
            sqlParameterList.Add(sqlParameter11);
            SqlParameter sqlParameter12 = new SqlParameter("@ImageUrl", SqlDbType.NVarChar);
            sqlParameter12.Value = (object)imageUrl;
            sqlParameterList.Add(sqlParameter12);
            SqlParameter sqlParameter13 = new SqlParameter("@RegisterById", SqlDbType.BigInt);
            sqlParameter13.Value = (object)registerById;
            sqlParameterList.Add(sqlParameter13);
            SqlParameter sqlParameter14 = new SqlParameter("@Area", SqlDbType.NVarChar);
            sqlParameter14.Value = (object)area;
            sqlParameterList.Add(sqlParameter14);
            return this.GlobalInsertWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_User", sqlParameterList.ToArray());
        }

        public long InsertCheck_User_PoliceStation(
          string name,
          string family,
          string nationalId,
          string username)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"InsertCheck";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Name", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)name;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@Family", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)family;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@NationalId", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)nationalId;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@Username", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)username;
            sqlParameterList.Add(sqlParameter5);
            return this.GlobalInsertWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_User", sqlParameterList.ToArray());
        }

        public long InsertCheck_PoliceStation(
          string name,
          string commanderName,
          string commanderFamily,
          string nationalId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"InsertCheck";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Name", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)name;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@CommanderName", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)commanderName;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@CommanderFamily", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)commanderFamily;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@NationalId", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)nationalId;
            sqlParameterList.Add(sqlParameter5);
            return this.GlobalInsertWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_PoliceStation", sqlParameterList.ToArray());
        }

        public long UpdateCheck_PoliceStation(
          long id,
          string name,
          string commanderName,
          string commanderFamily,
          string nationalId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"UpdateCheck";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter2.Value = (object)id;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@Name", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)name;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@CommanderName", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)commanderName;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@CommanderFamily", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)commanderFamily;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@NationalId", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)nationalId;
            sqlParameterList.Add(sqlParameter6);
            return this.GlobalInsertWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_PoliceStation", sqlParameterList.ToArray());
        }

        public long Insert_PoliceStation(
          string name,
          string location,
          string code,
          string commanderName,
          string commanderFamily,
          string nationalId,
          string birthDate,
          string militaryRank,
          long createById,
          string area)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Insert";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Name", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)name;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@Location", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)location;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@Code", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)code;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@CommanderName", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)commanderName;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@CommanderFamily", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)commanderFamily;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@NationalId", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)nationalId;
            sqlParameterList.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@BirthDate", SqlDbType.NVarChar);
            sqlParameter8.Value = (object)birthDate;
            sqlParameterList.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@MilitaryRank", SqlDbType.NVarChar);
            sqlParameter9.Value = (object)militaryRank;
            sqlParameterList.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@IsActive", SqlDbType.Bit);
            sqlParameter10.Value = (object)true;
            sqlParameterList.Add(sqlParameter10);
            SqlParameter sqlParameter11 = new SqlParameter("@CreateById", SqlDbType.BigInt);
            sqlParameter11.Value = (object)createById;
            sqlParameterList.Add(sqlParameter11);
            SqlParameter sqlParameter12 = new SqlParameter("@Area", SqlDbType.NVarChar);
            sqlParameter12.Value = (object)area;
            sqlParameterList.Add(sqlParameter12);
            return this.GlobalInsertWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_PoliceStation", sqlParameterList.ToArray());
        }

        public long Insert_Plan(string name, int btn, long createById)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Insert";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Caption", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)name;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@ButtonId", SqlDbType.Int);
            sqlParameter3.Value = (object)btn;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@CreateUserId", SqlDbType.BigInt);
            sqlParameter4.Value = (object)createById;
            sqlParameterList.Add(sqlParameter4);
            return this.GlobalInsertWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_Plan", sqlParameterList.ToArray());
        }

        public long Insert_Accident(
          string serial,
          int provinceId,
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
          int distanceFromTheOrigin,
          string dateOfAccident,
          string dateOfFormCompletion,
          string location,
          long? submitByUserId,
          int? cityId,
          bool inNativeArea,
          int? axisId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Insert";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Serial", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)serial;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@ProvinceId", SqlDbType.Int);
            sqlParameter3.Value = (object)provinceId;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@CenterCode", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)centerCode;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@CenterName", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)centerName;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@RouteCode", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)routeCode;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@RouteName", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)routeName;
            sqlParameterList.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@SegmentCode", SqlDbType.NVarChar);
            sqlParameter8.Value = (object)segmentCode;
            sqlParameterList.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@SegmentName", SqlDbType.NVarChar);
            sqlParameter9.Value = (object)segmentName;
            sqlParameterList.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@SpotCode", SqlDbType.NVarChar);
            sqlParameter10.Value = (object)spotCode;
            sqlParameterList.Add(sqlParameter10);
            SqlParameter sqlParameter11 = new SqlParameter("@SpotName", SqlDbType.NVarChar);
            sqlParameter11.Value = (object)spotName;
            sqlParameterList.Add(sqlParameter11);
            SqlParameter sqlParameter12 = new SqlParameter("@TimeOfAccident", SqlDbType.NVarChar);
            sqlParameter12.Value = (object)timeOfAccident;
            sqlParameterList.Add(sqlParameter12);
            SqlParameter sqlParameter13 = new SqlParameter("@PoliceAwarenessTime", SqlDbType.NVarChar);
            sqlParameter13.Value = (object)policeAwarenessTime;
            sqlParameterList.Add(sqlParameter13);
            SqlParameter sqlParameter14 = new SqlParameter("@PoliceArrivalTime", SqlDbType.NVarChar);
            sqlParameter14.Value = (object)policeArrivalTime;
            sqlParameterList.Add(sqlParameter14);
            SqlParameter sqlParameter15 = new SqlParameter("@EmsArrivalTime", SqlDbType.NVarChar);
            sqlParameter15.Value = (object)emsArrivalTime;
            sqlParameterList.Add(sqlParameter15);
            SqlParameter sqlParameter16 = new SqlParameter("@SosArrivalTime", SqlDbType.NVarChar);
            sqlParameter16.Value = (object)sosArrivalTime;
            sqlParameterList.Add(sqlParameter16);
            SqlParameter sqlParameter17 = new SqlParameter("@PoliceAwarenessType", SqlDbType.NVarChar);
            sqlParameter17.Value = (object)policeAwarenessType;
            sqlParameterList.Add(sqlParameter17);
            SqlParameter sqlParameter18 = new SqlParameter("@Longitude", SqlDbType.NVarChar);
            sqlParameter18.Value = (object)longitude;
            sqlParameterList.Add(sqlParameter18);
            SqlParameter sqlParameter19 = new SqlParameter("@Latitude", SqlDbType.NVarChar);
            sqlParameter19.Value = (object)latitude;
            sqlParameterList.Add(sqlParameter19);
            SqlParameter sqlParameter20 = new SqlParameter("@DistanceFromTheOrigin", SqlDbType.Int);
            sqlParameter20.Value = (object)distanceFromTheOrigin;
            sqlParameterList.Add(sqlParameter20);
            SqlParameter sqlParameter21 = new SqlParameter("@DateOfAccident", SqlDbType.NVarChar);
            sqlParameter21.Value = (object)dateOfAccident;
            sqlParameterList.Add(sqlParameter21);
            SqlParameter sqlParameter22 = new SqlParameter("@DateOfFormCompletion", SqlDbType.NVarChar);
            sqlParameter22.Value = (object)dateOfFormCompletion;
            sqlParameterList.Add(sqlParameter22);
            SqlParameter sqlParameter23 = new SqlParameter("@Location", SqlDbType.NVarChar);
            sqlParameter23.Value = (object)location;
            sqlParameterList.Add(sqlParameter23);
            SqlParameter sqlParameter24 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter24.Value = (object)submitByUserId;
            sqlParameterList.Add(sqlParameter24);
            SqlParameter sqlParameter25 = new SqlParameter("@CityId", SqlDbType.Int);
            sqlParameter25.Value = (object)cityId;
            sqlParameterList.Add(sqlParameter25);
            SqlParameter sqlParameter26 = new SqlParameter("@InNativeArea", SqlDbType.Bit);
            sqlParameter26.Value = (object)inNativeArea;
            sqlParameterList.Add(sqlParameter26);
            SqlParameter sqlParameter27 = new SqlParameter("@AxisId", SqlDbType.Int);
            sqlParameter27.Value = (object)axisId;
            sqlParameterList.Add(sqlParameter27);
            return this.GlobalInsertWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_Accident", sqlParameterList.ToArray());
        }

        public long Insert_Witness(
          long accidentId,
          byte indexNum,
          string name,
          string phone,
          long? submitByUserId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Insert";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter2.Value = (object)accidentId;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@IndexNum", SqlDbType.TinyInt);
            sqlParameter3.Value = (object)indexNum;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@Name", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)name;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@Phone", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)phone;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter6.Value = (object)submitByUserId;
            sqlParameterList.Add(sqlParameter6);
            return this.GlobalInsertWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_AccidentWitness", sqlParameterList.ToArray());
        }

        public long Insert_AccidentVehicle(
          long accidentId,
          byte indexNum,
          bool? didDriverFleeScene,
          string plateNumber,
          string vehicleType,
          string vehicleSystem,
          string vehicleManeuvering,
          string plateType,
          string safetyEquipment,
          string pathDirection,
          string signsOnRoad,
          string functionAfterDamage,
          string vehicleTechnicalInspection,
          string companyOrganisation,
          bool hasVehicleLoad,
          string loadType,
          short? loadFreight,
          bool? systemIncompatibility,
          bool? airbagFunction,
          string accidentTraces,
          string typeOfCollision,
          string codeCausingAccident,
          long submitByUserId,
          bool? isLocal)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Insert";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter2.Value = (object)accidentId;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@IndexNum", SqlDbType.TinyInt);
            sqlParameter3.Value = (object)indexNum;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@DidDriverFleeScene", SqlDbType.Bit);
            sqlParameter4.Value = (object)didDriverFleeScene;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@PlateNumber", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)plateNumber;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@VehicleType", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)vehicleType;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@VehicleSystem", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)vehicleSystem;
            sqlParameterList.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@VehicleManeuvering", SqlDbType.NVarChar);
            sqlParameter8.Value = (object)vehicleManeuvering;
            sqlParameterList.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@PlateType", SqlDbType.NVarChar);
            sqlParameter9.Value = (object)plateType;
            sqlParameterList.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@SafetyEquipment", SqlDbType.NVarChar);
            sqlParameter10.Value = (object)safetyEquipment;
            sqlParameterList.Add(sqlParameter10);
            SqlParameter sqlParameter11 = new SqlParameter("@PathDirection", SqlDbType.NVarChar);
            sqlParameter11.Value = (object)pathDirection;
            sqlParameterList.Add(sqlParameter11);
            SqlParameter sqlParameter12 = new SqlParameter("@SignsOnRoad", SqlDbType.NVarChar);
            sqlParameter12.Value = (object)signsOnRoad;
            sqlParameterList.Add(sqlParameter12);
            SqlParameter sqlParameter13 = new SqlParameter("@FunctionAfterDamage", SqlDbType.NVarChar);
            sqlParameter13.Value = (object)functionAfterDamage;
            sqlParameterList.Add(sqlParameter13);
            SqlParameter sqlParameter14 = new SqlParameter("@VehicleTechnicalInspection", SqlDbType.NVarChar);
            sqlParameter14.Value = (object)vehicleTechnicalInspection;
            sqlParameterList.Add(sqlParameter14);
            SqlParameter sqlParameter15 = new SqlParameter("@CompanyOrganisation", SqlDbType.NVarChar);
            sqlParameter15.Value = (object)companyOrganisation;
            sqlParameterList.Add(sqlParameter15);
            SqlParameter sqlParameter16 = new SqlParameter("@HasVehicleLoad", SqlDbType.Bit);
            sqlParameter16.Value = (object)hasVehicleLoad;
            sqlParameterList.Add(sqlParameter16);
            SqlParameter sqlParameter17 = new SqlParameter("@LoadType", SqlDbType.NVarChar);
            sqlParameter17.Value = (object)loadType;
            sqlParameterList.Add(sqlParameter17);
            SqlParameter sqlParameter18 = new SqlParameter("@LoadFreight", SqlDbType.SmallInt);
            sqlParameter18.Value = (object)loadFreight;
            sqlParameterList.Add(sqlParameter18);
            SqlParameter sqlParameter19 = new SqlParameter("@SystemIncompatibility", SqlDbType.Bit);
            sqlParameter19.Value = (object)systemIncompatibility;
            sqlParameterList.Add(sqlParameter19);
            SqlParameter sqlParameter20 = new SqlParameter("@AirbagFunction", SqlDbType.Bit);
            sqlParameter20.Value = (object)airbagFunction;
            sqlParameterList.Add(sqlParameter20);
            SqlParameter sqlParameter21 = new SqlParameter("@AccidentTraces", SqlDbType.NVarChar);
            sqlParameter21.Value = (object)accidentTraces;
            sqlParameterList.Add(sqlParameter21);
            SqlParameter sqlParameter22 = new SqlParameter("@TypeOfCollision", SqlDbType.NVarChar);
            sqlParameter22.Value = (object)typeOfCollision;
            sqlParameterList.Add(sqlParameter22);
            SqlParameter sqlParameter23 = new SqlParameter("@CodeCausingAccident", SqlDbType.NVarChar);
            sqlParameter23.Value = (object)codeCausingAccident;
            sqlParameterList.Add(sqlParameter23);
            SqlParameter sqlParameter24 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter24.Value = (object)submitByUserId;
            sqlParameterList.Add(sqlParameter24);
            SqlParameter sqlParameter25 = new SqlParameter("@IsLocal", SqlDbType.Bit);
            sqlParameter25.Value = (object)isLocal;
            sqlParameterList.Add(sqlParameter25);
            return this.GlobalInsertWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_AccidentVehicle", sqlParameterList.ToArray());
        }

        public void GetEditWitness(long accidentId, byte indexNum, out string name, out string phone)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_AccidentWitness", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"SelectEdit");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    sqlCommand.Parameters.AddWithValue("@IndexNum", (object)indexNum);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        name = sqlDataReader["Name"].ToString();
                        phone = sqlDataReader["Phone"].ToString();
                    }
                    else
                        name = phone = "";
                    connection.Close();
                }
            }
        }

        public void GetEditAccidentCarDamage(
          long accidentId,
          long accidentCar,
          out string firstPointCollision,
          out string damagedParts)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select * from TBL_AccidentDamage where AccidentId = @AccidentId and AccidentVehicleId = @AccidentCar", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    sqlCommand.Parameters.AddWithValue("@AccidentCar", (object)accidentCar);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        firstPointCollision = sqlDataReader["FirstCollision"].ToString();
                        damagedParts = sqlDataReader["DamagedParts"].ToString();
                    }
                    else
                        firstPointCollision = damagedParts = "";
                    connection.Close();
                }
            }
        }

        public void GetLoadSecondStep(
          long accidentId,
          out string crashType,
          out string crashScene,
          out string hasAddingWitness,
          out string witnessName,
          out string witnessPhone,
          out string collisionOfA,
          out string collisionOfATwo,
          out string typeOfCollision)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Load_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"LoadSecond");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        crashType = sqlDataReader["CrashType"].ToString();
                        crashScene = sqlDataReader["CrashScene"].ToString();
                        hasAddingWitness = sqlDataReader["HasAddingWitness"].ToString();
                        collisionOfA = sqlDataReader["CollisionOfA"].ToString();
                        collisionOfATwo = sqlDataReader["CollisionOfATwo"].ToString();
                        typeOfCollision = sqlDataReader["TypeOfCollision"].ToString();
                    }
                    else
                        crashType = crashScene = hasAddingWitness = collisionOfA = collisionOfATwo = typeOfCollision = "";
                    connection.Close();
                }
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Load_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"LoadWitness");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        witnessName = sqlDataReader["Name"].ToString();
                        witnessPhone = sqlDataReader["Phone"].ToString();
                    }
                    else
                        witnessName = witnessPhone = "";
                    connection.Close();
                }
            }
        }

        public void GetLoadThirdStep(
          long accidentId,
          out string roadDefects,
          out string carriageWayDirection,
          out string lightingStatus,
          out string roadSurfaceCondition,
          out string visualObstruction,
          out string isShoulderRoad,
          out string shoulderRoad,
          out string shouldersWidth,
          out string roadMaintenance,
          out string roadAssetsDamage,
          out string locationLandUse,
          out string carCrashLocation,
          out string weather,
          out string geometricDesign,
          out string pavmentMarking,
          out string roadwayWidthMain,
          out string roadwayWidthSubsidiary,
          out string roadwayWidthVillage,
          out string maximumSpeedLimit)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Load_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"LoadThird");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        roadDefects = sqlDataReader["RoadDefects"].ToString();
                        carriageWayDirection = sqlDataReader["CarriageWayDirection"].ToString();
                        lightingStatus = sqlDataReader["LightingStatus"].ToString();
                        roadSurfaceCondition = sqlDataReader["RoadSurfaceCondition"].ToString();
                        visualObstruction = sqlDataReader["VisualObstruction"].ToString();
                        isShoulderRoad = sqlDataReader["IsShoulderRoad"].ToString();
                        shoulderRoad = sqlDataReader["ShoulderRoad"].ToString();
                        shouldersWidth = sqlDataReader["ShouldersWidth"].ToString();
                        roadMaintenance = sqlDataReader["RoadMaintenance"].ToString();
                        roadAssetsDamage = sqlDataReader["RoadAssetsDamage"].ToString();
                        locationLandUse = sqlDataReader["LocationLandUse"].ToString();
                        carCrashLocation = sqlDataReader["CarCrashLocation"].ToString();
                        weather = sqlDataReader["Weather"].ToString();
                        geometricDesign = sqlDataReader["GeometricDesign"].ToString();
                        pavmentMarking = sqlDataReader["PavmentMarking"].ToString();
                        roadwayWidthMain = sqlDataReader["RoadwayWidthMain"].ToString();
                        roadwayWidthSubsidiary = sqlDataReader["RoadwayWidthSubsidiary"].ToString();
                        roadwayWidthVillage = sqlDataReader["RoadwayWidthVillage"].ToString();
                        maximumSpeedLimit = sqlDataReader["MaximumSpeedLimit"].ToString();
                    }
                    else
                        roadDefects = carriageWayDirection = lightingStatus = roadSurfaceCondition = visualObstruction = isShoulderRoad = shoulderRoad = shouldersWidth = roadMaintenance = roadAssetsDamage = locationLandUse = carCrashLocation = weather = geometricDesign = pavmentMarking = roadwayWidthMain = roadwayWidthSubsidiary = roadwayWidthVillage = maximumSpeedLimit = "";
                    connection.Close();
                }
            }
        }

        public void GetLoadFourthStep(
          long accidentId,
          out string finalReason,
          out string lackOfAttention,
          out string inabilityControlVehicle,
          out string vehicleFactorInCarCrash,
          out string humanFactorInCarCrash,
          out string judicialCause)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Load_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"LoadFourth");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        finalReason = sqlDataReader["FinalReason"].ToString();
                        lackOfAttention = sqlDataReader["LackOfAttention"].ToString();
                        inabilityControlVehicle = sqlDataReader["InabilityControlVehicle"].ToString();
                        vehicleFactorInCarCrash = sqlDataReader["VehicleFactorInCarCrash"].ToString();
                        humanFactorInCarCrash = sqlDataReader["HumanFactorInCarCrash"].ToString();
                        judicialCause = sqlDataReader["JudicialCause"].ToString();
                    }
                    else
                        finalReason = lackOfAttention = inabilityControlVehicle = vehicleFactorInCarCrash = humanFactorInCarCrash = judicialCause = "";
                    connection.Close();
                }
            }
        }

        public void GetLoadFifthStep(
          long accidentId,
          byte indexNum,
          out string driverFlee,
          out string plateNumberFirst,
          out string vehicleType,
          out string vehicleSystem,
          out string vehicleManeuvering,
          out string plateType,
          out string safetyEquipment,
          out string pathDirection,
          out string signsOnRoad,
          out string functionAfterDamage,
          out string technicalInspection,
          out string companyOrganisation,
          out string vehicleHaveLoad,
          out string loadType,
          out string loadFreight,
          out string systemIncompatibility,
          out string airbagFunction,
          out string accidentTraces,
          out string typeOfCollision,
          out string codeCausingAccident)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_AccidentVehicle", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"LoadVehicle");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    sqlCommand.Parameters.AddWithValue("@IndexNum", (object)indexNum);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        driverFlee = sqlDataReader["DidDriverFleeScene"].ToString();
                        plateNumberFirst = sqlDataReader["PlateNumber"].ToString();
                        vehicleType = sqlDataReader["VehicleType"].ToString();
                        vehicleSystem = sqlDataReader["VehicleSystem"].ToString();
                        vehicleManeuvering = sqlDataReader["VehicleManeuvering"].ToString();
                        plateType = sqlDataReader["PlateType"].ToString();
                        safetyEquipment = sqlDataReader["SafetyEquipment"].ToString();
                        pathDirection = sqlDataReader["PathDirection"].ToString();
                        signsOnRoad = sqlDataReader["SignsOnRoad"].ToString();
                        functionAfterDamage = sqlDataReader["FunctionAfterDamage"].ToString();
                        technicalInspection = sqlDataReader["VehicleTechnicalInspection"].ToString();
                        companyOrganisation = sqlDataReader["CompanyOrganisation"].ToString();
                        vehicleHaveLoad = sqlDataReader["HasVehicleLoad"].ToString();
                        loadType = sqlDataReader["LoadType"].ToString();
                        loadFreight = sqlDataReader["LoadFreight"].ToString();
                        systemIncompatibility = sqlDataReader["SystemIncompatibility"].ToString();
                        airbagFunction = sqlDataReader["AirbagFunction"].ToString();
                        accidentTraces = sqlDataReader["AccidentTraces"].ToString();
                        typeOfCollision = sqlDataReader["TypeOfCollision"].ToString();
                        codeCausingAccident = sqlDataReader["CodeCausingAccident"].ToString();
                    }
                    else
                        driverFlee = plateNumberFirst = vehicleType = vehicleSystem = vehicleManeuvering = plateType = safetyEquipment = pathDirection = signsOnRoad = functionAfterDamage = technicalInspection = companyOrganisation = vehicleHaveLoad = loadType = loadFreight = systemIncompatibility = airbagFunction = accidentTraces = typeOfCollision = codeCausingAccident = "";
                    connection.Close();
                }
            }
        }

        public void GetLoadFifthStepTwo(
          long accidentId,
          byte indexNum,
          out string brakeTraceBeforeAccident,
          out string brakeTraceAfterAccident,
          out string distanceMoveAfterAccident,
          out string accelerationIncludings,
          out string roadFrictionFactor,
          out string vehiclesHeightFromGround,
          out string slopeDegreeDirection,
          out string brakeAcceleration,
          out string roadsCurveRadius,
          out string tierMarks,
          out string quDriverNoticedDanger,
          out string quDriverTime,
          out string quMaximumDistancePieces,
          out string brakeTraceTestSpeed,
          out string testSpeed)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_AccidentVehicle", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"LoadStepTwo");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    sqlCommand.Parameters.AddWithValue("@IndexNum", (object)indexNum);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        brakeTraceBeforeAccident = sqlDataReader["BrakeTraceBeforeAccident"].ToString();
                        brakeTraceAfterAccident = sqlDataReader["BrakeTraceAfterAccident"].ToString();
                        distanceMoveAfterAccident = sqlDataReader["DistanceMoveAfterAccident"].ToString();
                        accelerationIncludings = sqlDataReader["AccelerationIncludings"].ToString();
                        roadFrictionFactor = sqlDataReader["RoadFrictionFactor"].ToString();
                        vehiclesHeightFromGround = sqlDataReader["VehiclesHeightFromGround"].ToString();
                        slopeDegreeDirection = sqlDataReader["SlopeDegreeDirection"].ToString();
                        brakeAcceleration = sqlDataReader["BrakeAcceleration"].ToString();
                        roadsCurveRadius = sqlDataReader["RoadsCurveRadius"].ToString();
                        tierMarks = sqlDataReader["TierMarks"].ToString();
                        quDriverNoticedDanger = sqlDataReader["QuDriverNoticedDanger"].ToString();
                        quDriverTime = sqlDataReader["QuDriverTime"].ToString();
                        quMaximumDistancePieces = sqlDataReader["QuMaximumDistancePieces"].ToString();
                        brakeTraceTestSpeed = sqlDataReader["BrakeTraceTestSpeed"].ToString();
                        testSpeed = sqlDataReader["TestSpeed"].ToString();
                    }
                    else
                        brakeTraceBeforeAccident = brakeTraceAfterAccident = distanceMoveAfterAccident = accelerationIncludings = roadFrictionFactor = vehiclesHeightFromGround = slopeDegreeDirection = brakeAcceleration = roadsCurveRadius = tierMarks = quDriverNoticedDanger = quDriverTime = quMaximumDistancePieces = brakeTraceTestSpeed = testSpeed = "";
                    connection.Close();
                }
            }
        }

        public void GetLoadFifthStepThree(
          long accidentId,
          byte indexNum,
          out string isDriversIdentity,
          out string sex,
          out string seatBelt,
          out string driverStatues,
          out string injuryAtScene,
          out string reactionBeforeAccident,
          out string numberOfPassengers,
          out string nationalId,
          out string firstName,
          out string lastName,
          out string fatherName,
          out string age,
          out string driverLicenceNumber,
          out string dateLicenceIssue,
          out string placeLicenceIssue,
          out string driverLicenceCategory,
          out string driverLicenceStatus,
          out string isDriverLicenceIncompatibility,
          out string education,
          out string job,
          out string transferMethod)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_AccidentVehicle", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"LoadStepThree");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    sqlCommand.Parameters.AddWithValue("@IndexNum", (object)indexNum);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        isDriversIdentity = sqlDataReader["IsDriversIdentity"].ToString();
                        sex = sqlDataReader["Sex"].ToString();
                        seatBelt = sqlDataReader["SeatBelt"].ToString();
                        driverStatues = sqlDataReader["DriverStatues"].ToString();
                        injuryAtScene = sqlDataReader["InjuryAtScene"].ToString();
                        reactionBeforeAccident = sqlDataReader["ReactionBeforeAccident"].ToString();
                        numberOfPassengers = sqlDataReader["NumberOfPassengers"].ToString();
                        nationalId = sqlDataReader["NationalId"].ToString();
                        firstName = sqlDataReader["FirstName"].ToString();
                        lastName = sqlDataReader["LastName"].ToString();
                        fatherName = sqlDataReader["FatherName"].ToString();
                        age = sqlDataReader["Age"].ToString();
                        driverLicenceNumber = sqlDataReader["DriverLicenceNumber"].ToString();
                        dateLicenceIssue = sqlDataReader["DateLicenceIssue"].ToString();
                        placeLicenceIssue = sqlDataReader["PlaceLicenceIssue"].ToString();
                        driverLicenceCategory = sqlDataReader["DriverLicenceCategory"].ToString();
                        driverLicenceStatus = sqlDataReader["DriverLicenceStatus"].ToString();
                        isDriverLicenceIncompatibility = sqlDataReader["IsDriverLicenceIncompatibility"].ToString();
                        education = sqlDataReader["Education"].ToString();
                        job = sqlDataReader["Job"].ToString();
                        transferMethod = sqlDataReader["TransferMethod"].ToString();
                    }
                    else
                        isDriversIdentity = sex = seatBelt = driverStatues = injuryAtScene = reactionBeforeAccident = numberOfPassengers = nationalId = firstName = lastName = fatherName = age = driverLicenceNumber = dateLicenceIssue = placeLicenceIssue = driverLicenceCategory = driverLicenceStatus = isDriverLicenceIncompatibility = education = job = transferMethod = "";
                    connection.Close();
                }
            }
        }

        public void GetLoadAccidentPedestrian(
          long accidentId,
          byte indexNum,
          out string onSiteCrossingFacilities,
          out string isPedestriansIdentity,
          out string sex,
          out string nationalId,
          out string firstName,
          out string lastName,
          out string fatherName,
          out string age,
          out string education,
          out string job,
          out string clothesColor,
          out string pedestriansSituation,
          out string pedestriansAverageSpeed,
          out string pedestrianThrowDistance)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_AccidentPedestrian", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"SelectEdit");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    sqlCommand.Parameters.AddWithValue("@IndexNum", (object)indexNum);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        onSiteCrossingFacilities = sqlDataReader["OnSiteCrossingFacilities"].ToString();
                        isPedestriansIdentity = sqlDataReader["IsPedestriansIdentity"].ToString();
                        sex = sqlDataReader["Sex"].ToString();
                        nationalId = sqlDataReader["NationalId"].ToString();
                        firstName = sqlDataReader["FirstName"].ToString();
                        lastName = sqlDataReader["LastName"].ToString();
                        fatherName = sqlDataReader["FatherName"].ToString();
                        age = sqlDataReader["Age"].ToString();
                        education = sqlDataReader["Education"].ToString();
                        job = sqlDataReader["Job"].ToString();
                        clothesColor = sqlDataReader["ClothesColor"].ToString();
                        pedestriansSituation = sqlDataReader["PedestriansSituation"].ToString();
                        pedestriansAverageSpeed = sqlDataReader["PedestriansAverageSpeed"].ToString();
                        pedestrianThrowDistance = sqlDataReader["PedestrianThrowDistance"].ToString();
                    }
                    else
                        onSiteCrossingFacilities = sex = isPedestriansIdentity = clothesColor = pedestriansSituation = pedestriansAverageSpeed = pedestrianThrowDistance = nationalId = firstName = lastName = fatherName = age = education = job = "";
                    connection.Close();
                }
            }
        }

        public void GetLoadAccidentBikeRiders(
          long accidentId,
          byte indexNum,
          out string onSiteCrossingFacilities,
          out string isIdentity,
          out string sex,
          out string nationalId,
          out string firstName,
          out string lastName,
          out string fatherName,
          out string age,
          out string education,
          out string job,
          out string clothesColor,
          out string situation,
          out string averageSpeed,
          out string throwDistance)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_AccidentBikeRider", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"SelectEdit");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    sqlCommand.Parameters.AddWithValue("@IndexNum", (object)indexNum);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        onSiteCrossingFacilities = sqlDataReader["OnSiteCrossingFacilities"].ToString();
                        isIdentity = sqlDataReader["IsIdentity"].ToString();
                        sex = sqlDataReader["Sex"].ToString();
                        nationalId = sqlDataReader["NationalId"].ToString();
                        firstName = sqlDataReader["FirstName"].ToString();
                        lastName = sqlDataReader["LastName"].ToString();
                        fatherName = sqlDataReader["FatherName"].ToString();
                        age = sqlDataReader["Age"].ToString();
                        education = sqlDataReader["Education"].ToString();
                        job = sqlDataReader["Job"].ToString();
                        clothesColor = sqlDataReader["ClothesColor"].ToString();
                        situation = sqlDataReader["Situation"].ToString();
                        averageSpeed = sqlDataReader["AverageSpeed"].ToString();
                        throwDistance = sqlDataReader["ThrowDistance"].ToString();
                    }
                    else
                        onSiteCrossingFacilities = sex = isIdentity = clothesColor = situation = averageSpeed = throwDistance = nationalId = firstName = lastName = fatherName = age = education = job = "";
                    connection.Close();
                }
            }
        }

        public void GetLoadSixthStep(long accidentId, out string numberOfInjured)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Load_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"LoadSixth");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    numberOfInjured = sqlDataReader.Read() ? sqlDataReader["NumberOfInjured"].ToString() : "";
                    connection.Close();
                }
            }
        }

        public string GetLoadInjured(long accidentId, byte indexNum, string type)
        {
            string loadInjured = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Load_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)type);
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    sqlCommand.Parameters.AddWithValue("@Index", (object)indexNum);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                        loadInjured = loadInjured + sqlDataReader["FirstName"]?.ToString() + " " + sqlDataReader["LastName"]?.ToString() + "#";
                    connection.Close();
                }
            }
            return loadInjured;
        }

        public void GetLoadInjuredDetail(
          long id,
          string type,
          out string firstName,
          out string lastName,
          out string transferMethod,
          out string ambulanceCode,
          out string injuryAtScene,
          out string vehicle)
        {
            firstName = lastName = transferMethod = ambulanceCode = injuryAtScene = vehicle = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Load_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)type);
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)id);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        firstName = sqlDataReader["FirstName"].ToString();
                        lastName = sqlDataReader["LastName"].ToString();
                        transferMethod = sqlDataReader["TransferMethod"].ToString();
                        ambulanceCode = sqlDataReader["AmbulanceCode"].ToString();
                        injuryAtScene = sqlDataReader["InjuryAtScene"].ToString();
                        if (type.Replace("NameInjured", "").Equals("Driver"))
                            vehicle = sqlDataReader["Vehicle"].ToString();
                    }
                    connection.Close();
                }
            }
        }

        public void GetLoadPassenger(
          long id,
          out string isIdentity,
          out string sex,
          out string nationalId,
          out string fatherName,
          out string age,
          out string education,
          out string job,
          out string injuryType,
          out string safety,
          out string situation)
        {
            isIdentity = sex = nationalId = fatherName = age = education = job = injuryType = safety = situation = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Load_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"LoadPassenger");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)id);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        isIdentity = sqlDataReader["IsIdentity"].ToString();
                        sex = sqlDataReader["Sex"].ToString();
                        nationalId = sqlDataReader["NationalId"].ToString();
                        fatherName = sqlDataReader["FatherName"].ToString();
                        age = sqlDataReader["Age"].ToString();
                        education = sqlDataReader["Education"].ToString();
                        job = sqlDataReader["Job"].ToString();
                        injuryType = sqlDataReader["InjuryType"].ToString();
                        safety = sqlDataReader["Safety"].ToString();
                        situation = sqlDataReader["Situation"].ToString();
                    }
                    connection.Close();
                }
            }
        }

        public void FillGridPlan(
          GridView grid,
          string name,
          int? rowCount,
          long? id,
          long? createById)
        {
            List<SqlParameter> sqlParameterList1 = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Select";
            sqlParameterList1.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Caption", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)name;
            sqlParameterList1.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter3.Value = (object)id;
            sqlParameterList1.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@RowCount", SqlDbType.Int);
            sqlParameter4.Value = (object)rowCount;
            sqlParameterList1.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@CreateUserId", SqlDbType.BigInt);
            sqlParameter5.Value = (object)createById;
            sqlParameterList1.Add(sqlParameter5);
            List<SqlParameter> sqlParameterList2 = sqlParameterList1;
            this.GlobalConnectionWithGridView(grid, CommandType.StoredProcedure, "SP_All_TBL_Plan", sqlParameterList2.ToArray());
        }

        public void FillGridUser(
          GridView grid,
          string name,
          string family,
          string nationalId,
          string username,
          int? rowCount,
          long? planId,
          long? id,
          long? createById)
        {
            List<SqlParameter> sqlParameterList1 = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Select";
            sqlParameterList1.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@RowCount", SqlDbType.Int);
            sqlParameter2.Value = (object)rowCount;
            sqlParameterList1.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@IsContainsSearch", SqlDbType.Bit);
            sqlParameter3.Value = (object)true;
            sqlParameterList1.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter4.Value = (object)id;
            sqlParameterList1.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@PlanId", SqlDbType.BigInt);
            sqlParameter5.Value = (object)planId;
            sqlParameterList1.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@Name", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)name;
            sqlParameterList1.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@Family", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)family;
            sqlParameterList1.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@NationalId", SqlDbType.NVarChar);
            sqlParameter8.Value = (object)nationalId;
            sqlParameterList1.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@Username", SqlDbType.NVarChar);
            sqlParameter9.Value = (object)username;
            sqlParameterList1.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@RegisterById", SqlDbType.BigInt);
            sqlParameter10.Value = (object)createById;
            sqlParameterList1.Add(sqlParameter10);
            List<SqlParameter> sqlParameterList2 = sqlParameterList1;
            this.GlobalConnectionWithGridView(grid, CommandType.StoredProcedure, "SP_All_TBL_User", sqlParameterList2.ToArray());
        }

        public void FillGridPoliceStation(
          GridView grid,
          string name,
          string nationalId,
          string commanderName,
          int? rowCount,
          long? id,
          long? createById)
        {
            List<SqlParameter> sqlParameterList1 = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Select";
            sqlParameterList1.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@RowCount", SqlDbType.Int);
            sqlParameter2.Value = (object)rowCount;
            sqlParameterList1.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@IsContainsSearch", SqlDbType.Bit);
            sqlParameter3.Value = (object)true;
            sqlParameterList1.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter4.Value = (object)id;
            sqlParameterList1.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@Name", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)name;
            sqlParameterList1.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@NationalId", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)nationalId;
            sqlParameterList1.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@CommanderName", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)commanderName;
            sqlParameterList1.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@CommanderFamily", SqlDbType.NVarChar);
            sqlParameter8.Value = (object)commanderName;
            sqlParameterList1.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@CreateById", SqlDbType.BigInt);
            sqlParameter9.Value = (object)createById;
            sqlParameterList1.Add(sqlParameter9);
            List<SqlParameter> sqlParameterList2 = sqlParameterList1;
            this.GlobalConnectionWithGridView(grid, CommandType.StoredProcedure, "SP_All_TBL_PoliceStation", sqlParameterList2.ToArray());
        }

        public List<GetGridPlan> FillGridPlanAjax(
          string name,
          int? rowCount,
          long? id,
          long? createById)
        {
            List<GetGridPlan> getGridPlanList = new List<GetGridPlan>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_Plan", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"Select");
                    sqlCommand.Parameters.AddWithValue("@Caption", (object)name);
                    sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                    sqlCommand.Parameters.AddWithValue("@RowCount", (object)rowCount);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        getGridPlanList.Add(new GetGridPlan()
                        {
                            Id = sqlDataReader["Id"].ToString(),
                            Caption = sqlDataReader["Caption"].ToString(),
                            SubmitBy = sqlDataReader["SubmitBy"].ToString(),
                            SubmitDate = sqlDataReader["SubmitDate"].ToString(),
                            EditUrl = sqlDataReader["EditUrl"].ToString()
                        });
                    connection.Close();
                }
            }
            return getGridPlanList;
        }

        public List<GetGridUser> FillGridUserAjax(
          string name,
          string family,
          string nationalId,
          string username,
          int? rowCount,
          long? planId,
          long? id,
          long? createById,
          string sort)
        {
            List<GetGridUser> getGridUserList = new List<GetGridUser>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_User", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"Select");
                    sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                    sqlCommand.Parameters.AddWithValue("@PlanId", (object)planId);
                    sqlCommand.Parameters.AddWithValue("@Name", (object)name);
                    sqlCommand.Parameters.AddWithValue("@Family", (object)family);
                    sqlCommand.Parameters.AddWithValue("@NationalId", (object)nationalId);
                    sqlCommand.Parameters.AddWithValue("@Username", (object)username);
                    sqlCommand.Parameters.AddWithValue("@RowCount", (object)rowCount);
                    sqlCommand.Parameters.AddWithValue("@OrderBy", (object)sort);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        getGridUserList.Add(new GetGridUser()
                        {
                            Id = sqlDataReader["Id"].ToString(),
                            RegisterDate = sqlDataReader["RegisterDate"].ToString(),
                            Username = sqlDataReader["Username"].ToString(),
                            FullName = sqlDataReader["FullName"].ToString(),
                            FatherName = sqlDataReader["FatherName"].ToString(),
                            BirthDate = sqlDataReader["BirthDate"].ToString(),
                            NationalId = sqlDataReader["NationalId"].ToString(),
                            Post = sqlDataReader["Post"].ToString(),
                            PoliceStation = sqlDataReader["PoliceStation"].ToString(),
                            EditUrl = sqlDataReader["EditUrl"].ToString()
                        });
                    connection.Close();
                }
            }
            return getGridUserList;
        }

        public List<GetGridPoliceStation> FillGridPoliceStationAjax(
          string name,
          string nationalId,
          string commanderName,
          int? rowCount,
          long? id,
          long? createById)
        {
            List<GetGridPoliceStation> gridPoliceStationList = new List<GetGridPoliceStation>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_PoliceStation", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"Select");
                    sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                    sqlCommand.Parameters.AddWithValue("@Name", (object)name);
                    sqlCommand.Parameters.AddWithValue("@NationalId", (object)nationalId);
                    sqlCommand.Parameters.AddWithValue("@CommanderName", (object)commanderName);
                    sqlCommand.Parameters.AddWithValue("@CommanderFamily", (object)commanderName);
                    sqlCommand.Parameters.AddWithValue("@RowCount", (object)rowCount);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        gridPoliceStationList.Add(new GetGridPoliceStation()
                        {
                            Id = sqlDataReader["Id"].ToString(),
                            CreateDate = sqlDataReader["CreateDate"].ToString(),
                            Name = sqlDataReader["Name"].ToString(),
                            Code = sqlDataReader["Code"].ToString(),
                            Commander = sqlDataReader["Commander"].ToString(),
                            NationalId = sqlDataReader["NationalId"].ToString(),
                            MilitaryRank = sqlDataReader["MilitaryRank"].ToString(),
                            EditUrl = sqlDataReader["EditUrl"].ToString()
                        });
                    connection.Close();
                }
            }
            return gridPoliceStationList;
        }

        public List<GetSubmit> FillCityWithProvince(int provinceId)
        {
            List<GetSubmit> getSubmitList = new List<GetSubmit>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select Id,Name from TBL_City where ProvinceId = @ProvinceId", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        getSubmitList.Add(new GetSubmit()
                        {
                            Id = sqlDataReader["Id"].ToString(),
                            Message = sqlDataReader["Name"].ToString(),
                            IsSuccess = "true"
                        });
                    connection.Close();
                }
            }
            return getSubmitList;
        }

        public List<GetSubmit> FillAxisWithProvince(int provinceId)
        {
            List<GetSubmit> getSubmitList = new List<GetSubmit>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select Id,Name from TBL_Axis where ProvinceId = @ProvinceId", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        getSubmitList.Add(new GetSubmit()
                        {
                            Id = sqlDataReader["Id"].ToString(),
                            Message = sqlDataReader["Name"].ToString(),
                            IsSuccess = "true"
                        });
                    connection.Close();
                }
            }
            return getSubmitList;
        }

        public List<GetSubmit> FillEventProcess()
        {
            List<GetSubmit> getSubmitList = new List<GetSubmit>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select Id,Caption Name from TBL_EventProcess", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        getSubmitList.Add(new GetSubmit()
                        {
                            Id = sqlDataReader["Id"].ToString(),
                            Message = sqlDataReader["Name"].ToString(),
                            IsSuccess = "true"
                        });
                    connection.Close();
                }
            }
            return getSubmitList;
        }

        public List<GetSubmit> FillProvinceArea(int provinceId)
        {
            List<GetSubmit> getSubmitList = new List<GetSubmit>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select Area from TBL_Province where Id = @ProvinceId", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        getSubmitList.Add(new GetSubmit()
                        {
                            Message = sqlDataReader["Area"].ToString(),
                            IsSuccess = "true"
                        });
                    connection.Close();
                }
            }
            return getSubmitList;
        }

        public List<GetSubmit> GetCityEnglishName(int cityId)
        {
            List<GetSubmit> cityEnglishName = new List<GetSubmit>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select EnglishName from TBL_City where Id = @Id", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@Id", (object)cityId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                        cityEnglishName.Add(new GetSubmit()
                        {
                            Message = sqlDataReader["EnglishName"].ToString(),
                            IsSuccess = "true"
                        });
                    connection.Close();
                }
            }
            return cityEnglishName;
        }

        public void GetUserInfo(
          long id,
          out string name,
          out string family,
          out string username,
          out string fatherName,
          out string birthDate,
          out string nationalId,
          out string post,
          out string policeStation,
          out string imageUrl)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_User", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"SelectInfo");
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        name = sqlDataReader["Name"].ToString();
                        family = sqlDataReader["Family"].ToString();
                        username = sqlDataReader["Username"].ToString();
                        fatherName = sqlDataReader["FatherName"].ToString();
                        birthDate = sqlDataReader["BirthDate"].ToString();
                        nationalId = sqlDataReader["NationalId"].ToString();
                        post = sqlDataReader["Post"].ToString();
                        policeStation = sqlDataReader["PoliceStation"].ToString();
                        imageUrl = sqlDataReader["ImageUrl"].ToString();
                    }
                    else
                        name = family = username = fatherName = birthDate = nationalId = post = policeStation = imageUrl = "";
                    connection.Close();
                }
            }
        }

        public void GetEditPlan(long id, out string name, out string btn)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_Plan", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"SelectEdit");
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        name = sqlDataReader["Caption"].ToString();
                        btn = sqlDataReader["ButtonId"].ToString();
                    }
                    else
                        name = btn = "";
                    connection.Close();
                }
            }
        }

        public void GetEditPoliceStation(
          long id,
          out string name,
          out string location,
          out string code,
          out string commanderName,
          out string commanderFamily,
          out string nationalId,
          out string birthDate,
          out string militaryRank,
          out string area)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_PoliceStation", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"SelectEdit");
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        name = sqlDataReader["Name"].ToString();
                        location = sqlDataReader["Location"].ToString();
                        code = sqlDataReader["Code"].ToString();
                        commanderName = sqlDataReader["CommanderName"].ToString();
                        commanderFamily = sqlDataReader["CommanderFamily"].ToString();
                        nationalId = sqlDataReader["NationalId"].ToString();
                        birthDate = sqlDataReader["BirthDate"].ToString();
                        militaryRank = sqlDataReader["MilitaryRank"].ToString();
                        area = sqlDataReader["Area"].ToString();
                    }
                    else
                        name = location = code = commanderName = commanderFamily = nationalId = birthDate = militaryRank = area = "";
                    connection.Close();
                }
            }
        }

        public void GetEditUser(
          long id,
          out string planId,
          out string name,
          out string family,
          out string fatherName,
          out string birthDate,
          out string nationalId,
          out string policeStationId,
          out string username,
          out string imageUrl,
          out string area,
          out string password)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_User", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"SelectEdit");
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        planId = sqlDataReader["PlanId"].ToString();
                        name = sqlDataReader["Name"].ToString();
                        family = sqlDataReader["Family"].ToString();
                        fatherName = sqlDataReader["FatherName"].ToString();
                        birthDate = sqlDataReader["BirthDate"].ToString();
                        nationalId = sqlDataReader["NationalId"].ToString();
                        policeStationId = sqlDataReader["PoliceStationId"].ToString();
                        username = sqlDataReader["Username"].ToString();
                        imageUrl = sqlDataReader["ImageUrl"].ToString();
                        area = sqlDataReader["Area"].ToString();
                        password = this._helper.Decode(sqlDataReader["Password"].ToString());
                    }
                    else
                        planId = name = family = fatherName = birthDate = nationalId = policeStationId = username = imageUrl = area = password = "";
                    connection.Close();
                }
            }
        }

        public void GetEditAccident(
          long id,
          bool isCheckAccident,
          out string getId,
          bool isFindByUserId,
          out string serial,
          out string provinceId,
          out string centerCode,
          out string centerName,
          out string routeCode,
          out string routeName,
          out string segmentCode,
          out string segmentName,
          out string spotCode,
          out string spotName,
          out string timeOfAccident,
          out string policeAwarenessTime,
          out string policeArrivalTime,
          out string emsArrivalTime,
          out string sosArrivalTime,
          out string policeAwarenessType,
          out string longitude,
          out string latitude,
          out string distanceFromTheOrigin,
          out string dateOfAccident,
          out string dateOfFormCompletion,
          out string location,
          out bool formIsCompleted,
          out string crashType,
          out string crashScene,
          out bool? hasAddingWitness,
          out string collisionOfA,
          out string collisionOfATwo,
          out string typeOfCollision)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    if (isFindByUserId)
                    {
                        sqlCommand.Parameters.AddWithValue("@Type", (object)"EditByUserId");
                        sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)id);
                    }
                    else
                    {
                        sqlCommand.Parameters.AddWithValue("@Type", (object)"SelectEdit");
                        sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                    }
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        formIsCompleted = (bool)sqlDataReader["FormIsCompleted"];
                        if (!formIsCompleted | isCheckAccident)
                        {
                            getId = sqlDataReader["Id"].ToString();
                            serial = sqlDataReader["Serial"].ToString();
                            provinceId = sqlDataReader["ProvinceId"].ToString();
                            centerCode = sqlDataReader["CenterCode"].ToString();
                            centerName = sqlDataReader["CenterName"].ToString();
                            routeCode = sqlDataReader["RouteCode"].ToString();
                            routeName = sqlDataReader["RouteName"].ToString();
                            segmentCode = sqlDataReader["SegmentCode"].ToString();
                            segmentName = sqlDataReader["SegmentName"].ToString();
                            spotCode = sqlDataReader["SpotCode"].ToString();
                            spotName = sqlDataReader["SpotName"].ToString();
                            timeOfAccident = sqlDataReader["TimeOfAccident"].ToString();
                            policeAwarenessTime = sqlDataReader["PoliceAwarenessTime"].ToString();
                            policeArrivalTime = sqlDataReader["PoliceArrivalTime"].ToString();
                            emsArrivalTime = sqlDataReader["EmsArrivalTime"].ToString();
                            sosArrivalTime = sqlDataReader["SosArrivalTime"].ToString();
                            policeAwarenessType = sqlDataReader["PoliceAwarenessType"].ToString();
                            longitude = sqlDataReader["Longitude"].ToString();
                            latitude = sqlDataReader["Latitude"].ToString();
                            distanceFromTheOrigin = sqlDataReader["DistanceFromTheOrigin"].ToString();
                            dateOfAccident = sqlDataReader["DateOfAccident"].ToString();
                            dateOfFormCompletion = sqlDataReader["DateOfFormCompletion"].ToString();
                            location = sqlDataReader["Location"].ToString();
                            crashType = sqlDataReader["CrashType"].ToString();
                            crashScene = sqlDataReader["CrashScene"].ToString();
                            hasAddingWitness = sqlDataReader["HasAddingWitness"] as bool?;
                            collisionOfA = sqlDataReader["CollisionOfA"].ToString();
                            collisionOfATwo = sqlDataReader["CollisionOfATwo"].ToString();
                            typeOfCollision = sqlDataReader["TypeOfCollision"].ToString();
                        }
                        else
                        {
                            hasAddingWitness = new bool?();
                            getId = serial = provinceId = centerCode = centerName = routeCode = routeName = segmentCode = segmentName = spotCode = spotName = timeOfAccident = policeAwarenessTime = policeArrivalTime = emsArrivalTime = sosArrivalTime = policeAwarenessType = dateOfAccident = distanceFromTheOrigin = longitude = latitude = dateOfFormCompletion = location = crashType = crashScene = collisionOfA = collisionOfATwo = typeOfCollision = "";
                        }
                    }
                    else
                    {
                        hasAddingWitness = new bool?();
                        formIsCompleted = false;
                        getId = serial = provinceId = centerCode = centerName = routeCode = routeName = segmentCode = segmentName = spotCode = spotName = timeOfAccident = policeAwarenessTime = policeArrivalTime = emsArrivalTime = sosArrivalTime = policeAwarenessType = dateOfAccident = distanceFromTheOrigin = longitude = latitude = dateOfFormCompletion = location = crashType = crashScene = collisionOfA = collisionOfATwo = typeOfCollision = "";
                    }
                    connection.Close();
                }
            }
        }

        public void SetDeleteUserImage(string imageUrl)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"DeleteImage";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@ImageUrl", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)imageUrl;
            sqlParameterList.Add(sqlParameter2);
            this.GlobalUpdate(CommandType.StoredProcedure, "SP_All_TBL_User", sqlParameterList.ToArray());
        }

        public void SetDeleteAccidentDiagramImage(string imageUrl)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"DeleteDiagramImage";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentDiagramImage", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)imageUrl;
            sqlParameterList.Add(sqlParameter2);
            this.GlobalUpdate(CommandType.StoredProcedure, "SP_All_TBL_Accident", sqlParameterList.ToArray());
        }

        public void SetUpdateAccidentDiagramImage(long accidentId, string imageUrl)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"UpdateAccidentDiagram";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter2.Value = (object)accidentId;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@AccidentDiagramImage", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)imageUrl;
            sqlParameterList.Add(sqlParameter3);
            this.GlobalUpdate(CommandType.StoredProcedure, "SP_All_TBL_Accident", sqlParameterList.ToArray());
        }

        public void SetUpdateExplanationAudio(long accidentId, string audioUrl)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"UpdateExplanationAudio";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter2.Value = (object)accidentId;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@AccidentDiagramImage", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)audioUrl;
            sqlParameterList.Add(sqlParameter3);
            this.GlobalUpdate(CommandType.StoredProcedure, "SP_All_TBL_Accident", sqlParameterList.ToArray());
        }

        public void SetDeleteExplanationAudio(string audioUrl)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"DeleteExplanationAudio";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentDiagramImage", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)audioUrl;
            sqlParameterList.Add(sqlParameter2);
            this.GlobalUpdate(CommandType.StoredProcedure, "SP_All_TBL_Accident", sqlParameterList.ToArray());
        }

        public void SetUpdateAllAudio(string type, long accidentId, string audioUrl)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)type;
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter2.Value = (object)accidentId;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@AccidentDiagramImage", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)audioUrl;
            sqlParameterList.Add(sqlParameter3);
            this.GlobalUpdate(CommandType.StoredProcedure, "SP_All_TBL_Accident", sqlParameterList.ToArray());
        }

        public void SetDeleteAllAudio(string type, string audioUrl)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)type;
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentDiagramImage", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)audioUrl;
            sqlParameterList.Add(sqlParameter2);
            this.GlobalUpdate(CommandType.StoredProcedure, "SP_All_TBL_Accident", sqlParameterList.ToArray());
        }

        public void SetInsertAccidentPicture(long accidentId, string imageUrl)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Insert";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter2.Value = (object)accidentId;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@ImageUrl", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)imageUrl;
            sqlParameterList.Add(sqlParameter3);
            this.GlobalInsert(CommandType.StoredProcedure, "SP_All_TBL_AccidentImage", sqlParameterList.ToArray());
        }

        public void SetDeleteAccidentPicture(string imageUrl)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Delete";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@ImageUrl", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)imageUrl;
            sqlParameterList.Add(sqlParameter2);
            this.GlobalUpdate(CommandType.StoredProcedure, "SP_All_TBL_AccidentImage", sqlParameterList.ToArray());
        }

        public string Select_AccidentPictureGuid(long accidentId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"GetGuid";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter2.Value = (object)accidentId;
            sqlParameterList.Add(sqlParameter2);
            string str = (this.GlobalObjectReturnConnection(CommandType.StoredProcedure, "SP_All_TBL_AccidentImage", "ImageUrl", sqlParameterList.ToArray()) ?? (object)"").ToString();
            return str.Length > 4 ? (str.Substring(0, str.Length - 5) == "" ? Guid.NewGuid().ToString() : str.Substring(0, str.Length - 5)) : Guid.NewGuid().ToString();
        }

        public string Select_AccidentGuid(long accidentId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"GetGuid";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter2.Value = (object)accidentId;
            sqlParameterList.Add(sqlParameter2);
            string str = (this.GlobalObjectReturnConnection(CommandType.StoredProcedure, "SP_All_TBL_Accident", "AccidentDiagramImage", sqlParameterList.ToArray()) ?? (object)"").ToString();
            return str.Length > 4 ? (str == "" ? Guid.NewGuid().ToString() : str) : Guid.NewGuid().ToString();
        }

        public string Select_PeopleAccident(long accidentId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"PeopleAccident";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter2.Value = (object)accidentId;
            sqlParameterList.Add(sqlParameter2);
            return this.GlobalObjectReturnConnection(CommandType.StoredProcedure, "SP_All_Load_Accident", "People", sqlParameterList.ToArray()).ToString();
        }

        public string Select_PoliceStationArea(long userId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"PoliceStationArea";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter2.Value = (object)userId;
            sqlParameterList.Add(sqlParameter2);
            return this.GlobalObjectReturnConnection(CommandType.StoredProcedure, "SP_All_TBL_Accident", "Area", sqlParameterList.ToArray()).ToString();
        }

        public string Select_InputPeopleAccident(long accidentId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"InputPeopleAccident";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter2.Value = (object)accidentId;
            sqlParameterList.Add(sqlParameter2);
            return this.GlobalObjectReturnConnection(CommandType.StoredProcedure, "SP_All_Load_Accident", "People", sqlParameterList.ToArray()).ToString();
        }

        public string Select_OptionPeopleAccident(long accidentId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"OptionPeopleAccident";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter2.Value = (object)accidentId;
            sqlParameterList.Add(sqlParameter2);
            return this.GlobalObjectReturnConnection(CommandType.StoredProcedure, "SP_All_Load_Accident", "People", sqlParameterList.ToArray()).ToString();
        }

        public long SetEditPlan(long id, string name, int btn)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Update";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter2.Value = (object)id;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@Caption", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)name;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@ButtonId", SqlDbType.Int);
            sqlParameter4.Value = (object)btn;
            sqlParameterList.Add(sqlParameter4);
            return this.GlobalUpdateWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_Plan", sqlParameterList.ToArray());
        }

        public long SetEditPoliceStation(
          long id,
          string name,
          string location,
          string code,
          string commanderName,
          string commanderFamily,
          string nationalId,
          string birthDate,
          string militaryRank,
          long createById,
          string area)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Update";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter2.Value = (object)id;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@Name", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)name;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@Location", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)location;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@Code", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)code;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@CommanderName", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)commanderName;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@CommanderFamily", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)commanderFamily;
            sqlParameterList.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@NationalId", SqlDbType.NVarChar);
            sqlParameter8.Value = (object)nationalId;
            sqlParameterList.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@BirthDate", SqlDbType.NVarChar);
            sqlParameter9.Value = (object)birthDate;
            sqlParameterList.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@MilitaryRank", SqlDbType.NVarChar);
            sqlParameter10.Value = (object)militaryRank;
            sqlParameterList.Add(sqlParameter10);
            SqlParameter sqlParameter11 = new SqlParameter("@Area", SqlDbType.NVarChar);
            sqlParameter11.Value = (object)area;
            sqlParameterList.Add(sqlParameter11);
            return this.GlobalUpdateWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_PoliceStation", sqlParameterList.ToArray());
        }

        public long SetEditUser(
          long id,
          long planId,
          string name,
          string family,
          string fatherName,
          string birthDate,
          string nationalId,
          long policeStationId,
          string username,
          string password,
          string imageUrl,
          string area)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Update";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter2.Value = (object)id;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@PlanId", SqlDbType.BigInt);
            sqlParameter3.Value = (object)planId;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@Name", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)name;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@Family", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)family;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@FatherName", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)fatherName;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@BirthDate", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)birthDate;
            sqlParameterList.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@NationalId", SqlDbType.NVarChar);
            sqlParameter8.Value = (object)nationalId;
            sqlParameterList.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@IsActive", SqlDbType.Bit);
            sqlParameter9.Value = (object)true;
            sqlParameterList.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@PoliceStationId", SqlDbType.BigInt);
            sqlParameter10.Value = (object)policeStationId;
            sqlParameterList.Add(sqlParameter10);
            SqlParameter sqlParameter11 = new SqlParameter("@Username", SqlDbType.NVarChar);
            sqlParameter11.Value = (object)username;
            sqlParameterList.Add(sqlParameter11);
            SqlParameter sqlParameter12 = new SqlParameter("@Password", SqlDbType.NVarChar);
            sqlParameter12.Value = (object)this._helper.Encode(password);
            sqlParameterList.Add(sqlParameter12);
            SqlParameter sqlParameter13 = new SqlParameter("@ImageUrl", SqlDbType.NVarChar);
            sqlParameter13.Value = (object)imageUrl;
            sqlParameterList.Add(sqlParameter13);
            SqlParameter sqlParameter14 = new SqlParameter("@Area", SqlDbType.NVarChar);
            sqlParameter14.Value = (object)area;
            sqlParameterList.Add(sqlParameter14);
            return this.GlobalUpdateWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_User", sqlParameterList.ToArray());
        }

        public long SetEditAccidentFirst(
          long? id,
          string serial,
          int provinceId,
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
          int distanceFromTheOrigin,
          string dateOfAccident,
          string dateOfFormCompletion,
          string location,
          long? submitByUserId,
          int? cityId,
          bool inNativeArea,
          int? axisId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"UpdateFirst";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter2.Value = (object)id;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@Serial", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)serial;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@ProvinceId", SqlDbType.Int);
            sqlParameter4.Value = (object)provinceId;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@CenterCode", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)centerCode;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@CenterName", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)centerName;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@RouteCode", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)routeCode;
            sqlParameterList.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@RouteName", SqlDbType.NVarChar);
            sqlParameter8.Value = (object)routeName;
            sqlParameterList.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@SegmentCode", SqlDbType.NVarChar);
            sqlParameter9.Value = (object)segmentCode;
            sqlParameterList.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@SegmentName", SqlDbType.NVarChar);
            sqlParameter10.Value = (object)segmentName;
            sqlParameterList.Add(sqlParameter10);
            SqlParameter sqlParameter11 = new SqlParameter("@SpotCode", SqlDbType.NVarChar);
            sqlParameter11.Value = (object)spotCode;
            sqlParameterList.Add(sqlParameter11);
            SqlParameter sqlParameter12 = new SqlParameter("@SpotName", SqlDbType.NVarChar);
            sqlParameter12.Value = (object)spotName;
            sqlParameterList.Add(sqlParameter12);
            SqlParameter sqlParameter13 = new SqlParameter("@TimeOfAccident", SqlDbType.NVarChar);
            sqlParameter13.Value = (object)timeOfAccident;
            sqlParameterList.Add(sqlParameter13);
            SqlParameter sqlParameter14 = new SqlParameter("@PoliceAwarenessTime", SqlDbType.NVarChar);
            sqlParameter14.Value = (object)policeAwarenessTime;
            sqlParameterList.Add(sqlParameter14);
            SqlParameter sqlParameter15 = new SqlParameter("@PoliceArrivalTime", SqlDbType.NVarChar);
            sqlParameter15.Value = (object)policeArrivalTime;
            sqlParameterList.Add(sqlParameter15);
            SqlParameter sqlParameter16 = new SqlParameter("@EmsArrivalTime", SqlDbType.NVarChar);
            sqlParameter16.Value = (object)emsArrivalTime;
            sqlParameterList.Add(sqlParameter16);
            SqlParameter sqlParameter17 = new SqlParameter("@SosArrivalTime", SqlDbType.NVarChar);
            sqlParameter17.Value = (object)sosArrivalTime;
            sqlParameterList.Add(sqlParameter17);
            SqlParameter sqlParameter18 = new SqlParameter("@PoliceAwarenessType", SqlDbType.NVarChar);
            sqlParameter18.Value = (object)policeAwarenessType;
            sqlParameterList.Add(sqlParameter18);
            SqlParameter sqlParameter19 = new SqlParameter("@Longitude", SqlDbType.NVarChar);
            sqlParameter19.Value = (object)longitude;
            sqlParameterList.Add(sqlParameter19);
            SqlParameter sqlParameter20 = new SqlParameter("@Latitude", SqlDbType.NVarChar);
            sqlParameter20.Value = (object)latitude;
            sqlParameterList.Add(sqlParameter20);
            SqlParameter sqlParameter21 = new SqlParameter("@DistanceFromTheOrigin", SqlDbType.Int);
            sqlParameter21.Value = (object)distanceFromTheOrigin;
            sqlParameterList.Add(sqlParameter21);
            SqlParameter sqlParameter22 = new SqlParameter("@DateOfAccident", SqlDbType.NVarChar);
            sqlParameter22.Value = (object)dateOfAccident;
            sqlParameterList.Add(sqlParameter22);
            SqlParameter sqlParameter23 = new SqlParameter("@DateOfFormCompletion", SqlDbType.NVarChar);
            sqlParameter23.Value = (object)dateOfFormCompletion;
            sqlParameterList.Add(sqlParameter23);
            SqlParameter sqlParameter24 = new SqlParameter("@Location", SqlDbType.NVarChar);
            sqlParameter24.Value = (object)location;
            sqlParameterList.Add(sqlParameter24);
            SqlParameter sqlParameter25 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter25.Value = (object)submitByUserId;
            sqlParameterList.Add(sqlParameter25);
            SqlParameter sqlParameter26 = new SqlParameter("@CityId", SqlDbType.Int);
            sqlParameter26.Value = (object)cityId;
            sqlParameterList.Add(sqlParameter26);
            SqlParameter sqlParameter27 = new SqlParameter("@InNativeArea", SqlDbType.Bit);
            sqlParameter27.Value = (object)inNativeArea;
            sqlParameterList.Add(sqlParameter27);
            SqlParameter sqlParameter28 = new SqlParameter("@AxisId", SqlDbType.Int);
            sqlParameter28.Value = (object)axisId;
            sqlParameterList.Add(sqlParameter28);
            return this.GlobalInsertWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_Accident", sqlParameterList.ToArray());
        }

        public long SetEditAccidentSecond(
          long? id,
          string crashType,
          string crashScene,
          bool? hasAddingWitness,
          string collisionOfA,
          string collisionOfATwo,
          string typeOfCollision,
          long? submitByUserId)
        {
            List<SqlParameter> sqlParameterList1 = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"UpdateSecond";
            sqlParameterList1.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter2.Value = (object)id;
            sqlParameterList1.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@CrashType", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)crashType;
            sqlParameterList1.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@CrashScene", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)crashScene;
            sqlParameterList1.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@CollisionOfA", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)collisionOfA;
            sqlParameterList1.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@CollisionOfATwo", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)collisionOfATwo;
            sqlParameterList1.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@TypeOfCollision", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)typeOfCollision;
            sqlParameterList1.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter8.Value = (object)submitByUserId;
            sqlParameterList1.Add(sqlParameter8);
            List<SqlParameter> sqlParameterList2 = sqlParameterList1;
            if (hasAddingWitness.HasValue)
            {
                List<SqlParameter> sqlParameterList3 = sqlParameterList2;
                SqlParameter sqlParameter9 = new SqlParameter("@HasAddingWitness", SqlDbType.Bit);
                sqlParameter9.Value = (object)hasAddingWitness;
                sqlParameterList3.Add(sqlParameter9);
            }
            return this.GlobalInsertWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_Accident", sqlParameterList2.ToArray());
        }

        public long SetEditAccidentThird(
          long id,
          string roadDefects,
          string carriageWayDirection,
          string lightingStatus,
          string roadSurfaceCondition,
          string visualObstruction,
          bool isShoulderRoad,
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
          byte maximumSpeedLimit,
          long submitByUserId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter1.Value = (object)id;
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@RoadDefects", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)roadDefects;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@CarriageWayDirection", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)carriageWayDirection;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@LightingStatus", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)lightingStatus;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@RoadSurfaceCondition", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)roadSurfaceCondition;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@VisualObstruction", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)visualObstruction;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@IsShoulderRoad", SqlDbType.Bit);
            sqlParameter7.Value = (object)isShoulderRoad;
            sqlParameterList.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@ShoulderRoad", SqlDbType.NVarChar);
            sqlParameter8.Value = (object)shoulderRoad;
            sqlParameterList.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@ShouldersWidth", SqlDbType.NVarChar);
            sqlParameter9.Value = (object)shouldersWidth;
            sqlParameterList.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@RoadMaintenance", SqlDbType.NVarChar);
            sqlParameter10.Value = (object)roadMaintenance;
            sqlParameterList.Add(sqlParameter10);
            SqlParameter sqlParameter11 = new SqlParameter("@RoadAssetsDamage", SqlDbType.NVarChar);
            sqlParameter11.Value = (object)roadAssetsDamage;
            sqlParameterList.Add(sqlParameter11);
            SqlParameter sqlParameter12 = new SqlParameter("@LocationLandUse", SqlDbType.NVarChar);
            sqlParameter12.Value = (object)locationLandUse;
            sqlParameterList.Add(sqlParameter12);
            SqlParameter sqlParameter13 = new SqlParameter("@CarCrashLocation", SqlDbType.NVarChar);
            sqlParameter13.Value = (object)carCrashLocation;
            sqlParameterList.Add(sqlParameter13);
            SqlParameter sqlParameter14 = new SqlParameter("@Weather", SqlDbType.NVarChar);
            sqlParameter14.Value = (object)weather;
            sqlParameterList.Add(sqlParameter14);
            SqlParameter sqlParameter15 = new SqlParameter("@GeometricDesign", SqlDbType.NVarChar);
            sqlParameter15.Value = (object)geometricDesign;
            sqlParameterList.Add(sqlParameter15);
            SqlParameter sqlParameter16 = new SqlParameter("@PavmentMarking", SqlDbType.NVarChar);
            sqlParameter16.Value = (object)pavmentMarking;
            sqlParameterList.Add(sqlParameter16);
            SqlParameter sqlParameter17 = new SqlParameter("@RoadwayWidthMain", SqlDbType.NVarChar);
            sqlParameter17.Value = (object)roadwayWidthMain;
            sqlParameterList.Add(sqlParameter17);
            SqlParameter sqlParameter18 = new SqlParameter("@RoadwayWidthSubsidiary", SqlDbType.NVarChar);
            sqlParameter18.Value = (object)roadwayWidthSubsidiary;
            sqlParameterList.Add(sqlParameter18);
            SqlParameter sqlParameter19 = new SqlParameter("@RoadwayWidthVillage", SqlDbType.NVarChar);
            sqlParameter19.Value = (object)roadwayWidthVillage;
            sqlParameterList.Add(sqlParameter19);
            SqlParameter sqlParameter20 = new SqlParameter("@MaximumSpeedLimit", SqlDbType.TinyInt);
            sqlParameter20.Value = (object)maximumSpeedLimit;
            sqlParameterList.Add(sqlParameter20);
            SqlParameter sqlParameter21 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter21.Value = (object)submitByUserId;
            sqlParameterList.Add(sqlParameter21);
            return this.GlobalUpdateWithReturnId(CommandType.StoredProcedure, "SP_Update_Accident_Third", sqlParameterList.ToArray());
        }

        public long SetEditAccidentFourth(
          long id,
          string finalReason,
          string lackOfAttention,
          string inabilityControlVehicle,
          string vehicleFactorInCarCrash,
          string humanFactorInCarCrash,
          string judicialCause,
          long submitByUserId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter1.Value = (object)id;
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@FinalReason", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)finalReason;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@LackOfAttention", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)lackOfAttention;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@InabilityControlVehicle", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)inabilityControlVehicle;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@VehicleFactorInCarCrash", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)vehicleFactorInCarCrash;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@HumanFactorInCarCrash", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)humanFactorInCarCrash;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@JudicialCause", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)judicialCause;
            sqlParameterList.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter8.Value = (object)submitByUserId;
            sqlParameterList.Add(sqlParameter8);
            return this.GlobalUpdateWithReturnId(CommandType.StoredProcedure, "SP_Update_Accident_Fourth", sqlParameterList.ToArray());
        }

        public long SetFifthUpdateAccidentSecond(
          long id,
          byte index,
          Decimal? brakeTraceBeforeAccident,
          Decimal? brakeTraceAfterAccident,
          Decimal? distanceMoveAfterAccident,
          Decimal? accelerationIncludings,
          Decimal? roadFrictionFactor,
          Decimal? vehiclesHeightFromGround,
          Decimal? slopeDegreeDirection,
          Decimal? brakeAcceleration,
          Decimal? roadsCurveRadius,
          Decimal? tierMarks,
          Decimal? quDriverNoticedDanger,
          Decimal? quDriverTime,
          Decimal? quMaximumDistancePieces,
          Decimal? brakeTraceTestSpeed,
          Decimal? testSpeed,
          long submitByUserId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter1.Value = (object)id;
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@IndexNum", SqlDbType.BigInt);
            sqlParameter2.Value = (object)index;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@BrakeTraceBeforeAccident", SqlDbType.Decimal);
            sqlParameter3.Value = (object)brakeTraceBeforeAccident;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@BrakeTraceAfterAccident", SqlDbType.Decimal);
            sqlParameter4.Value = (object)brakeTraceAfterAccident;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@DistanceMoveAfterAccident", SqlDbType.Decimal);
            sqlParameter5.Value = (object)distanceMoveAfterAccident;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@AccelerationIncludings", SqlDbType.Decimal);
            sqlParameter6.Value = (object)accelerationIncludings;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@RoadFrictionFactor", SqlDbType.Decimal);
            sqlParameter7.Value = (object)roadFrictionFactor;
            sqlParameterList.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@VehiclesHeightFromGround", SqlDbType.Decimal);
            sqlParameter8.Value = (object)vehiclesHeightFromGround;
            sqlParameterList.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@SlopeDegreeDirection", SqlDbType.Decimal);
            sqlParameter9.Value = (object)slopeDegreeDirection;
            sqlParameterList.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@BrakeAcceleration", SqlDbType.Decimal);
            sqlParameter10.Value = (object)brakeAcceleration;
            sqlParameterList.Add(sqlParameter10);
            SqlParameter sqlParameter11 = new SqlParameter("@RoadsCurveRadius", SqlDbType.Decimal);
            sqlParameter11.Value = (object)roadsCurveRadius;
            sqlParameterList.Add(sqlParameter11);
            SqlParameter sqlParameter12 = new SqlParameter("@TierMarks", SqlDbType.Decimal);
            sqlParameter12.Value = (object)tierMarks;
            sqlParameterList.Add(sqlParameter12);
            SqlParameter sqlParameter13 = new SqlParameter("@QuDriverNoticedDanger", SqlDbType.Decimal);
            sqlParameter13.Value = (object)quDriverNoticedDanger;
            sqlParameterList.Add(sqlParameter13);
            SqlParameter sqlParameter14 = new SqlParameter("@QuDriverTime", SqlDbType.Decimal);
            sqlParameter14.Value = (object)quDriverTime;
            sqlParameterList.Add(sqlParameter14);
            SqlParameter sqlParameter15 = new SqlParameter("@QuMaximumDistancePieces", SqlDbType.Decimal);
            sqlParameter15.Value = (object)quMaximumDistancePieces;
            sqlParameterList.Add(sqlParameter15);
            SqlParameter sqlParameter16 = new SqlParameter("@BrakeTraceTestSpeed", SqlDbType.Decimal);
            sqlParameter16.Value = (object)brakeTraceTestSpeed;
            sqlParameterList.Add(sqlParameter16);
            SqlParameter sqlParameter17 = new SqlParameter("@TestSpeed", SqlDbType.Decimal);
            sqlParameter17.Value = (object)testSpeed;
            sqlParameterList.Add(sqlParameter17);
            SqlParameter sqlParameter18 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter18.Value = (object)submitByUserId;
            sqlParameterList.Add(sqlParameter18);
            return this.GlobalUpdateWithReturnId(CommandType.StoredProcedure, "SP_Update_AccidentVehicle_Second", sqlParameterList.ToArray());
        }

        public long SetFifthUpdateAccidentThird(
          long id,
          byte index,
          bool isDriversIdentity,
          string sex,
          string seatBelt,
          string driverStatues,
          string injuryAtScene,
          string reactionBeforeAccident,
          byte numberOfPassengers,
          string nationalId,
          string firstName,
          string lastName,
          string fatherName,
          byte? age,
          Decimal? driverLicenceNumber,
          string dateLicenceIssue,
          string placeLicenceIssue,
          string driverLicenceCategory,
          string driverLicenceStatus,
          bool? isDriverLicenceIncompatibility,
          string education,
          string job,
          string transferMethod,
          long submitByUserId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter1.Value = (object)id;
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@IndexNum", SqlDbType.BigInt);
            sqlParameter2.Value = (object)index;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@IsDriversIdentity", SqlDbType.Decimal);
            sqlParameter3.Value = (object)isDriversIdentity;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@Sex", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)sex;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@SeatBelt", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)seatBelt;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@DriverStatues", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)driverStatues;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@InjuryAtScene", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)injuryAtScene;
            sqlParameterList.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@ReactionBeforeAccident", SqlDbType.NVarChar);
            sqlParameter8.Value = (object)reactionBeforeAccident;
            sqlParameterList.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@NumberOfPassengers", SqlDbType.TinyInt);
            sqlParameter9.Value = (object)numberOfPassengers;
            sqlParameterList.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@NationalId", SqlDbType.NVarChar);
            sqlParameter10.Value = (object)nationalId;
            sqlParameterList.Add(sqlParameter10);
            SqlParameter sqlParameter11 = new SqlParameter("@FirstName", SqlDbType.NVarChar);
            sqlParameter11.Value = (object)firstName;
            sqlParameterList.Add(sqlParameter11);
            SqlParameter sqlParameter12 = new SqlParameter("@LastName", SqlDbType.NVarChar);
            sqlParameter12.Value = (object)lastName;
            sqlParameterList.Add(sqlParameter12);
            SqlParameter sqlParameter13 = new SqlParameter("@FatherName", SqlDbType.NVarChar);
            sqlParameter13.Value = (object)fatherName;
            sqlParameterList.Add(sqlParameter13);
            SqlParameter sqlParameter14 = new SqlParameter("@Age", SqlDbType.TinyInt);
            sqlParameter14.Value = (object)age;
            sqlParameterList.Add(sqlParameter14);
            SqlParameter sqlParameter15 = new SqlParameter("@DriverLicenceNumber", SqlDbType.Decimal);
            sqlParameter15.Value = (object)driverLicenceNumber;
            sqlParameterList.Add(sqlParameter15);
            SqlParameter sqlParameter16 = new SqlParameter("@DateLicenceIssue", SqlDbType.NVarChar);
            sqlParameter16.Value = (object)dateLicenceIssue;
            sqlParameterList.Add(sqlParameter16);
            SqlParameter sqlParameter17 = new SqlParameter("@PlaceLicenceIssue", SqlDbType.NVarChar);
            sqlParameter17.Value = (object)placeLicenceIssue;
            sqlParameterList.Add(sqlParameter17);
            SqlParameter sqlParameter18 = new SqlParameter("@DriverLicenceCategory", SqlDbType.NVarChar);
            sqlParameter18.Value = (object)driverLicenceCategory;
            sqlParameterList.Add(sqlParameter18);
            SqlParameter sqlParameter19 = new SqlParameter("@DriverLicenceStatus", SqlDbType.NVarChar);
            sqlParameter19.Value = (object)driverLicenceStatus;
            sqlParameterList.Add(sqlParameter19);
            SqlParameter sqlParameter20 = new SqlParameter("@IsDriverLicenceIncompatibility", SqlDbType.Bit);
            sqlParameter20.Value = (object)isDriverLicenceIncompatibility;
            sqlParameterList.Add(sqlParameter20);
            SqlParameter sqlParameter21 = new SqlParameter("@Education", SqlDbType.NVarChar);
            sqlParameter21.Value = (object)education;
            sqlParameterList.Add(sqlParameter21);
            SqlParameter sqlParameter22 = new SqlParameter("@Job", SqlDbType.NVarChar);
            sqlParameter22.Value = (object)job;
            sqlParameterList.Add(sqlParameter22);
            SqlParameter sqlParameter23 = new SqlParameter("@TransferMethod", SqlDbType.NVarChar);
            sqlParameter23.Value = (object)transferMethod;
            sqlParameterList.Add(sqlParameter23);
            SqlParameter sqlParameter24 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter24.Value = (object)submitByUserId;
            sqlParameterList.Add(sqlParameter24);
            return this.GlobalUpdateWithReturnId(CommandType.StoredProcedure, "SP_Update_AccidentVehicle_Third", sqlParameterList.ToArray());
        }

        public long SetUpdateAccidentPedestrians(
          long id,
          byte index,
          string onSiteCrossingFacilities,
          bool isPedestriansIdentity,
          string sex,
          string nationalId,
          string firstName,
          string lastName,
          string fatherName,
          byte? age,
          string education,
          string job,
          string clothesColor,
          string pedestriansSituation,
          byte? pedestriansAverageSpeed,
          short? pedestrianThrowDistance,
          long submitByUserId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Insert";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter2.Value = (object)id;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@IndexNum", SqlDbType.BigInt);
            sqlParameter3.Value = (object)index;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@OnSiteCrossingFacilities", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)onSiteCrossingFacilities;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@IsPedestriansIdentity", SqlDbType.Bit);
            sqlParameter5.Value = (object)isPedestriansIdentity;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@Sex", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)sex;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@NationalId", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)nationalId;
            sqlParameterList.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@FirstName", SqlDbType.NVarChar);
            sqlParameter8.Value = (object)firstName;
            sqlParameterList.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@LastName", SqlDbType.NVarChar);
            sqlParameter9.Value = (object)lastName;
            sqlParameterList.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@FatherName", SqlDbType.NVarChar);
            sqlParameter10.Value = (object)fatherName;
            sqlParameterList.Add(sqlParameter10);
            SqlParameter sqlParameter11 = new SqlParameter("@Age", SqlDbType.TinyInt);
            sqlParameter11.Value = (object)age;
            sqlParameterList.Add(sqlParameter11);
            SqlParameter sqlParameter12 = new SqlParameter("@Education", SqlDbType.NVarChar);
            sqlParameter12.Value = (object)education;
            sqlParameterList.Add(sqlParameter12);
            SqlParameter sqlParameter13 = new SqlParameter("@Job", SqlDbType.NVarChar);
            sqlParameter13.Value = (object)job;
            sqlParameterList.Add(sqlParameter13);
            SqlParameter sqlParameter14 = new SqlParameter("@ClothesColor", SqlDbType.NVarChar);
            sqlParameter14.Value = (object)clothesColor;
            sqlParameterList.Add(sqlParameter14);
            SqlParameter sqlParameter15 = new SqlParameter("@PedestriansSituation", SqlDbType.NVarChar);
            sqlParameter15.Value = (object)pedestriansSituation;
            sqlParameterList.Add(sqlParameter15);
            SqlParameter sqlParameter16 = new SqlParameter("@PedestriansAverageSpeed", SqlDbType.TinyInt);
            sqlParameter16.Value = (object)pedestriansAverageSpeed;
            sqlParameterList.Add(sqlParameter16);
            SqlParameter sqlParameter17 = new SqlParameter("@PedestrianThrowDistance", SqlDbType.SmallInt);
            sqlParameter17.Value = (object)pedestrianThrowDistance;
            sqlParameterList.Add(sqlParameter17);
            SqlParameter sqlParameter18 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter18.Value = (object)submitByUserId;
            sqlParameterList.Add(sqlParameter18);
            return this.GlobalUpdateWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_AccidentPedestrian", sqlParameterList.ToArray());
        }

        public long SetUpdateAccidentBikeRiders(
          long id,
          byte index,
          string onSiteCrossingFacilities,
          bool isIdentity,
          string sex,
          string nationalId,
          string firstName,
          string lastName,
          string fatherName,
          byte? age,
          string education,
          string job,
          string clothesColor,
          string situation,
          byte? averageSpeed,
          short? throwDistance,
          long submitByUserId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Insert";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter2.Value = (object)id;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@IndexNum", SqlDbType.BigInt);
            sqlParameter3.Value = (object)index;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@OnSiteCrossingFacilities", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)onSiteCrossingFacilities;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@IsIdentity", SqlDbType.Bit);
            sqlParameter5.Value = (object)isIdentity;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@Sex", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)sex;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@NationalId", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)nationalId;
            sqlParameterList.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@FirstName", SqlDbType.NVarChar);
            sqlParameter8.Value = (object)firstName;
            sqlParameterList.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@LastName", SqlDbType.NVarChar);
            sqlParameter9.Value = (object)lastName;
            sqlParameterList.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@FatherName", SqlDbType.NVarChar);
            sqlParameter10.Value = (object)fatherName;
            sqlParameterList.Add(sqlParameter10);
            SqlParameter sqlParameter11 = new SqlParameter("@Age", SqlDbType.TinyInt);
            sqlParameter11.Value = (object)age;
            sqlParameterList.Add(sqlParameter11);
            SqlParameter sqlParameter12 = new SqlParameter("@Education", SqlDbType.NVarChar);
            sqlParameter12.Value = (object)education;
            sqlParameterList.Add(sqlParameter12);
            SqlParameter sqlParameter13 = new SqlParameter("@Job", SqlDbType.NVarChar);
            sqlParameter13.Value = (object)job;
            sqlParameterList.Add(sqlParameter13);
            SqlParameter sqlParameter14 = new SqlParameter("@ClothesColor", SqlDbType.NVarChar);
            sqlParameter14.Value = (object)clothesColor;
            sqlParameterList.Add(sqlParameter14);
            SqlParameter sqlParameter15 = new SqlParameter("@Situation", SqlDbType.NVarChar);
            sqlParameter15.Value = (object)situation;
            sqlParameterList.Add(sqlParameter15);
            SqlParameter sqlParameter16 = new SqlParameter("@AverageSpeed", SqlDbType.TinyInt);
            sqlParameter16.Value = (object)averageSpeed;
            sqlParameterList.Add(sqlParameter16);
            SqlParameter sqlParameter17 = new SqlParameter("@ThrowDistance", SqlDbType.SmallInt);
            sqlParameter17.Value = (object)throwDistance;
            sqlParameterList.Add(sqlParameter17);
            SqlParameter sqlParameter18 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter18.Value = (object)submitByUserId;
            sqlParameterList.Add(sqlParameter18);
            return this.GlobalUpdateWithReturnId(CommandType.StoredProcedure, "SP_All_TBL_AccidentBikeRider", sqlParameterList.ToArray());
        }

        public long SetUpdatePassenger(
          long id,
          byte index,
          string injuredRole,
          string numberOfInjured,
          bool? passengerIdentity,
          string sex,
          string nationalId,
          string firstName,
          string lastName,
          string fatherName,
          byte? age,
          string education,
          string job,
          string injuryPassenger,
          string safetyPassenger,
          string passengerSituation,
          string transferMethod,
          string ambulanceCode,
          long tableId,
          long submitByUserId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter1.Value = (object)id;
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@IndexNum", SqlDbType.BigInt);
            sqlParameter2.Value = (object)index;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@InjuredRole", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)injuredRole;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@NumberOfInjured", SqlDbType.TinyInt);
            sqlParameter4.Value = (object)numberOfInjured;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@IsIdentity", SqlDbType.Bit);
            sqlParameter5.Value = (object)passengerIdentity;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@Sex", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)sex;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@NationalId", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)nationalId;
            sqlParameterList.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@FirstName", SqlDbType.NVarChar);
            sqlParameter8.Value = (object)firstName;
            sqlParameterList.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@LastName", SqlDbType.NVarChar);
            sqlParameter9.Value = (object)lastName;
            sqlParameterList.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@FatherName", SqlDbType.NVarChar);
            sqlParameter10.Value = (object)fatherName;
            sqlParameterList.Add(sqlParameter10);
            SqlParameter sqlParameter11 = new SqlParameter("@Age", SqlDbType.TinyInt);
            sqlParameter11.Value = (object)age;
            sqlParameterList.Add(sqlParameter11);
            SqlParameter sqlParameter12 = new SqlParameter("@Education", SqlDbType.NVarChar);
            sqlParameter12.Value = (object)education;
            sqlParameterList.Add(sqlParameter12);
            SqlParameter sqlParameter13 = new SqlParameter("@Job", SqlDbType.NVarChar);
            sqlParameter13.Value = (object)job;
            sqlParameterList.Add(sqlParameter13);
            SqlParameter sqlParameter14 = new SqlParameter("@InjuryPassenger", SqlDbType.NVarChar);
            sqlParameter14.Value = (object)injuryPassenger;
            sqlParameterList.Add(sqlParameter14);
            SqlParameter sqlParameter15 = new SqlParameter("@SafetyPassenger", SqlDbType.NVarChar);
            sqlParameter15.Value = (object)safetyPassenger;
            sqlParameterList.Add(sqlParameter15);
            SqlParameter sqlParameter16 = new SqlParameter("@PassengerSituation", SqlDbType.NVarChar);
            sqlParameter16.Value = (object)passengerSituation;
            sqlParameterList.Add(sqlParameter16);
            SqlParameter sqlParameter17 = new SqlParameter("@TransferMethod", SqlDbType.NVarChar);
            sqlParameter17.Value = (object)transferMethod;
            sqlParameterList.Add(sqlParameter17);
            SqlParameter sqlParameter18 = new SqlParameter("@AmbulanceCode", SqlDbType.NVarChar);
            sqlParameter18.Value = (object)ambulanceCode;
            sqlParameterList.Add(sqlParameter18);
            SqlParameter sqlParameter19 = new SqlParameter("@TableId", SqlDbType.BigInt);
            sqlParameter19.Value = (object)tableId;
            sqlParameterList.Add(sqlParameter19);
            SqlParameter sqlParameter20 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter20.Value = (object)submitByUserId;
            sqlParameterList.Add(sqlParameter20);
            return this.GlobalUpdateWithReturnId(CommandType.StoredProcedure, "SP_Update_Accident_Six", sqlParameterList.ToArray());
        }

        public void Select_GetCountFifth(
          long accidentId,
          out string numberVehiclesInvolved,
          out string numberPedestriansInvolved,
          out string numberBikeInvolved)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_AccidentVehicle", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"Count");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        numberVehiclesInvolved = sqlDataReader["NumberVehiclesInvolved"].ToString();
                        numberPedestriansInvolved = sqlDataReader["NumberPedestriansInvolved"].ToString();
                        numberBikeInvolved = sqlDataReader["NumberBikeInvolved"].ToString();
                    }
                    else
                        numberVehiclesInvolved = numberPedestriansInvolved = numberBikeInvolved = "";
                    connection.Close();
                }
            }
        }

        public string Select_InjuredRole(long id, string name)
        {
            string str = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Load_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)("LoadInjuredRole" + name));
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)id);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        str += sqlDataReader["Name"].ToString();
                    connection.Close();
                }
            }
            return str;
        }

        public string Select_GetCountInjured(long id)
        {
            string countInjured = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Load_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"CountInjured");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)id);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                        countInjured = sqlDataReader["CountInjured"].ToString();
                    connection.Close();
                }
            }
            return countInjured;
        }

        public void Select_LoadInjuredDetail(
          long accidentId,
          string name,
          byte index,
          out string getName,
          out string getFamily,
          out string transferMethod,
          out string ambulanceCode,
          out string vehicle)
        {
            vehicle = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Load_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)("NameInjuredRole" + name));
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    sqlCommand.Parameters.AddWithValue("@Index", (object)index);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        getName = sqlDataReader["FirstName"].ToString();
                        getFamily = sqlDataReader["LastName"].ToString();
                        transferMethod = sqlDataReader["TransferMethod"].ToString();
                        ambulanceCode = sqlDataReader["AmbulanceCode"].ToString();
                        if (name.Equals("Driver"))
                            vehicle = sqlDataReader["Vehicle"].ToString();
                    }
                    else
                        getName = getFamily = transferMethod = ambulanceCode = vehicle = "";
                    connection.Close();
                }
            }
        }

        public long SaveSeventhStep(
          long? id,
          string primaryCause,
          string formerCause,
          string directCause,
          string organizationsToBlame,
          string directCausePrecent,
          long? submitByUserId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter1.Value = (object)id;
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@PrimaryCause", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)primaryCause;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@FormerCause", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)formerCause;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@DirectCause", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)directCause;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@OrganizationsToBlame", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)organizationsToBlame;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@DirectCausePrecent", SqlDbType.Decimal);
            sqlParameter6.Value = (object)directCausePrecent;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter7.Value = (object)submitByUserId;
            sqlParameterList.Add(sqlParameter7);
            return this.GlobalInsertWithReturnId(CommandType.StoredProcedure, "SP_Update_Accident_Seventh", sqlParameterList.ToArray());
        }

        public void SaveCompleteForm(long id)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter.Value = (object)id;
            sqlParameterList.Add(sqlParameter);
            this.GlobalUpdate(CommandType.Text, "update TBL_Accident set FormIsCompleted = 1 where Id = @Id", sqlParameterList.ToArray());
        }

        public int Select_GetCountDamage(long id)
        {
            int countDamage = 0;
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select count(*) CountDamage from TBL_AccidentDamage where AccidentId = @AccidentId", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)id);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                        countDamage = Convert.ToInt32(sqlDataReader["CountDamage"]);
                    connection.Close();
                }
            }
            return countDamage;
        }

        public void SaveSeventhStepInput(
          string inputVehicleAccident,
          string inputPedestrianAccident,
          string inputBikeRiderAccident,
          string inputPassengerAccident)
        {
            string str1 = inputVehicleAccident;
            char[] chArray1 = new char[1] { ',' };
            foreach (string str2 in str1.Split(chArray1))
            {
                if (!string.IsNullOrEmpty(str2))
                {
                    string str3 = str2.Split('#')[0];
                    string str4 = str2.Split('#')[1];
                    List<SqlParameter> sqlParameterList = new List<SqlParameter>();
                    SqlParameter sqlParameter1 = new SqlParameter("@Id", SqlDbType.NVarChar);
                    sqlParameter1.Value = (object)str3;
                    sqlParameterList.Add(sqlParameter1);
                    SqlParameter sqlParameter2 = new SqlParameter("@CausePrecent", SqlDbType.NVarChar);
                    sqlParameter2.Value = (object)str4;
                    sqlParameterList.Add(sqlParameter2);
                    this.GlobalUpdate(CommandType.Text, "update TBL_AccidentVehicle set CausePrecent = @CausePrecent where Id = @Id", sqlParameterList.ToArray());
                }
            }
            string str5 = inputPedestrianAccident;
            char[] chArray2 = new char[1] { ',' };
            foreach (string str6 in str5.Split(chArray2))
            {
                if (!string.IsNullOrEmpty(str6))
                {
                    string str7 = str6.Split('#')[0];
                    string str8 = str6.Split('#')[1];
                    List<SqlParameter> sqlParameterList = new List<SqlParameter>();
                    SqlParameter sqlParameter3 = new SqlParameter("@Id", SqlDbType.NVarChar);
                    sqlParameter3.Value = (object)str7;
                    sqlParameterList.Add(sqlParameter3);
                    SqlParameter sqlParameter4 = new SqlParameter("@CausePrecent", SqlDbType.NVarChar);
                    sqlParameter4.Value = (object)str8;
                    sqlParameterList.Add(sqlParameter4);
                    this.GlobalUpdate(CommandType.Text, "update TBL_AccidentPedestrian set CausePrecent = @CausePrecent where Id = @Id", sqlParameterList.ToArray());
                }
            }
            string str9 = inputBikeRiderAccident;
            char[] chArray3 = new char[1] { ',' };
            foreach (string str10 in str9.Split(chArray3))
            {
                if (!string.IsNullOrEmpty(str10))
                {
                    string str11 = str10.Split('#')[0];
                    string str12 = str10.Split('#')[1];
                    List<SqlParameter> sqlParameterList = new List<SqlParameter>();
                    SqlParameter sqlParameter5 = new SqlParameter("@Id", SqlDbType.NVarChar);
                    sqlParameter5.Value = (object)str11;
                    sqlParameterList.Add(sqlParameter5);
                    SqlParameter sqlParameter6 = new SqlParameter("@CausePrecent", SqlDbType.NVarChar);
                    sqlParameter6.Value = (object)str12;
                    sqlParameterList.Add(sqlParameter6);
                    this.GlobalUpdate(CommandType.Text, "update TBL_AccidentBikeRider set CausePrecent = @CausePrecent where Id = @Id", sqlParameterList.ToArray());
                }
            }
            string str13 = inputPassengerAccident;
            char[] chArray4 = new char[1] { ',' };
            foreach (string str14 in str13.Split(chArray4))
            {
                if (!string.IsNullOrEmpty(str14))
                {
                    string str15 = str14.Split('#')[0];
                    string str16 = str14.Split('#')[1];
                    List<SqlParameter> sqlParameterList = new List<SqlParameter>();
                    SqlParameter sqlParameter7 = new SqlParameter("@Id", SqlDbType.NVarChar);
                    sqlParameter7.Value = (object)str15;
                    sqlParameterList.Add(sqlParameter7);
                    SqlParameter sqlParameter8 = new SqlParameter("@CausePrecent", SqlDbType.NVarChar);
                    sqlParameter8.Value = (object)str16;
                    sqlParameterList.Add(sqlParameter8);
                    this.GlobalUpdate(CommandType.Text, "update TBL_AccidentPassenger set CausePrecent = @CausePrecent where Id = @Id", sqlParameterList.ToArray());
                }
            }
        }

        public void SaveSeventhDamage(
          long? id,
          string selectAccidentCar,
          string firstPointCollision,
          string damagedParts)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Insert";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter2.Value = (object)id;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@AccidentVehicleId", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)selectAccidentCar;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@FirstCollision", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)firstPointCollision;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@DamagedParts", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)damagedParts;
            sqlParameterList.Add(sqlParameter5);
            this.GlobalInsert(CommandType.StoredProcedure, "SP_All_TBL_AccidentDamage", sqlParameterList.ToArray());
        }

        public string LoadAccidentComment(long id, string formCaption)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"SelectEdit";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter2.Value = (object)id;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@FormCaption", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)formCaption;
            sqlParameterList.Add(sqlParameter3);
            return (this.GlobalObjectReturnConnection(CommandType.StoredProcedure, "SP_All_TBL_AccidentDescription", "Description", sqlParameterList.ToArray()) ?? (object)"").ToString();
        }

        public void SaveAccidentComment(
          long id,
          string formCaption,
          string description,
          long submitByUserId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Insert";
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@AccidentId", SqlDbType.BigInt);
            sqlParameter2.Value = (object)id;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@FormCaption", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)formCaption;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@Description", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)description;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter5.Value = (object)submitByUserId;
            sqlParameterList.Add(sqlParameter5);
            this.GlobalInsert(CommandType.StoredProcedure, "SP_All_TBL_AccidentDescription", sqlParameterList.ToArray());
        }

        public void FillGridAccident(
          GridView grid,
          int rowCount,
          long? id,
          long? createById,
          string status,
          string dateOfAccident,
          string dateOfAccidentEnd,
          byte? timeAccidentStart,
          byte? timeAccidentEnd,
          string crashType,
          string serial,
          bool allAccident,
          bool isSupeAdmin)
        {
            List<SqlParameter> sqlParameterList1 = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)"Select";
            sqlParameterList1.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@RowCount", SqlDbType.Int);
            sqlParameter2.Value = (object)rowCount;
            sqlParameterList1.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@IsContainsSearch", SqlDbType.Bit);
            sqlParameter3.Value = (object)true;
            sqlParameterList1.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter4.Value = (object)id;
            sqlParameterList1.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@Status", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)status;
            sqlParameterList1.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@DateOfAccident", SqlDbType.NVarChar);
            sqlParameter6.Value = (object)dateOfAccident;
            sqlParameterList1.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@DateOfAccidentEnd", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)dateOfAccidentEnd;
            sqlParameterList1.Add(sqlParameter7);
            SqlParameter sqlParameter8 = new SqlParameter("@TimeAccidentStart", SqlDbType.TinyInt);
            sqlParameter8.Value = (object)timeAccidentStart;
            sqlParameterList1.Add(sqlParameter8);
            SqlParameter sqlParameter9 = new SqlParameter("@TimeAccidentEnd", SqlDbType.TinyInt);
            sqlParameter9.Value = (object)timeAccidentEnd;
            sqlParameterList1.Add(sqlParameter9);
            SqlParameter sqlParameter10 = new SqlParameter("@CrashType", SqlDbType.NVarChar);
            sqlParameter10.Value = (object)crashType;
            sqlParameterList1.Add(sqlParameter10);
            SqlParameter sqlParameter11 = new SqlParameter("@Serial", SqlDbType.NVarChar);
            sqlParameter11.Value = (object)serial;
            sqlParameterList1.Add(sqlParameter11);
            SqlParameter sqlParameter12 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter12.Value = (object)createById;
            sqlParameterList1.Add(sqlParameter12);
            SqlParameter sqlParameter13 = new SqlParameter("@AllAccident", SqlDbType.Bit);
            sqlParameter13.Value = (object)allAccident;
            sqlParameterList1.Add(sqlParameter13);
            SqlParameter sqlParameter14 = new SqlParameter("@IsSuperAdmin", SqlDbType.Bit);
            sqlParameter14.Value = (object)isSupeAdmin;
            sqlParameterList1.Add(sqlParameter14);
            List<SqlParameter> sqlParameterList2 = sqlParameterList1;
            this.GlobalConnectionWithGridView(grid, CommandType.StoredProcedure, "SP_All_TBL_Accident", sqlParameterList2.ToArray());
        }

        public List<GetGridAccident> FillGridAccidentAjax(
          int rowCount,
          long? id,
          long? createById,
          string status,
          string dateOfAccident,
          string dateOfAccidentEnd,
          byte? timeAccidentStart,
          byte? timeAccidentEnd,
          string crashType,
          string serial,
          bool allAccident,
          string sort,
          string listId,
          bool isSupeAdmin)
        {
            List<GetGridAccident> getGridAccidentList = new List<GetGridAccident>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                if (crashType != "جرحی وفوتی")
                {
                    using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_Accident", connection))
                    {
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@Type", (object)"Select");
                        sqlCommand.Parameters.AddWithValue("@RowCount", (object)rowCount);
                        //sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                        sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                        sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                        sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                        sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                        sqlCommand.Parameters.AddWithValue("@TimeAccidentStart", (object)timeAccidentStart);
                        sqlCommand.Parameters.AddWithValue("@TimeAccidentEnd", (object)timeAccidentEnd);
                        sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                        sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                        sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                        sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                        sqlCommand.Parameters.AddWithValue("@OrderBy", (object)sort);
                        sqlCommand.Parameters.AddWithValue("@ListId", (object)listId);
                        sqlCommand.Parameters.AddWithValue("@IsSuperAdmin", (object)isSupeAdmin);
                        connection.Open();
                        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                        while (sqlDataReader.Read())
                        {
                            using (DataManagementDataContext context = new DataManagementDataContext())
                            {
                                string nameCityS = "";
                            var ds=(from m in   context.searchnameSharhrestanByID(int.Parse(sqlDataReader["CityId"].ToString())).AsEnumerable()
                                    select m).FirstOrDefault();
                                if (ds!=null)
                                {
                                    nameCityS= ds.Name;
                                }

                            
                            getGridAccidentList.Add(new GetGridAccident()
                            {
                                Id = sqlDataReader["Id"].ToString(),
                                Serial = sqlDataReader["Serial"].ToString(),
                                SubmitTime = sqlDataReader["SubmitTime"].ToString(),
                                DateOfAccident = sqlDataReader["DateOfAccident"].ToString(),
                                AccidentLocation = sqlDataReader["AccidentLocation"].ToString(),
                                AccidentType = sqlDataReader["AccidentType"].ToString(),
                                Status = sqlDataReader["Status"].ToString(),
                                StatusIcon = sqlDataReader["StatusIcon"].ToString(),
                                DateInsert = sqlDataReader["DateInsert"].ToString(),
                                nameCity = nameCityS
                            });
                            }

                        }
                        connection.Close();
                    }
                }
                else
                {
                    using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_Accident", connection))
                    {
                        crashType = "جرحی";

                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@Type", (object)"Select");
                        sqlCommand.Parameters.AddWithValue("@RowCount", (object)rowCount);
                        sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                        sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                        sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                        sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                        sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                        sqlCommand.Parameters.AddWithValue("@TimeAccidentStart", (object)timeAccidentStart);
                        sqlCommand.Parameters.AddWithValue("@TimeAccidentEnd", (object)timeAccidentEnd);
                        sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                        sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                        sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                        sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                        sqlCommand.Parameters.AddWithValue("@OrderBy", (object)sort);
                        sqlCommand.Parameters.AddWithValue("@ListId", (object)listId);
                        sqlCommand.Parameters.AddWithValue("@IsSuperAdmin", (object)isSupeAdmin);

                        connection.Open();
                        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                        while (sqlDataReader.Read())
                        {
                            using (DataManagementDataContext context = new DataManagementDataContext())
                            {
                                string nameCityS = "";
                                var ds = (from m in context.searchnameSharhrestanByID(int.Parse(sqlDataReader["CityId"].ToString())).AsEnumerable()
                                          select m).FirstOrDefault();
                                if (ds != null)
                                {
                                    nameCityS = ds.Name;
                                }


                                getGridAccidentList.Add(new GetGridAccident()
                                {
                                    Id = sqlDataReader["Id"].ToString(),
                                    Serial = sqlDataReader["Serial"].ToString(),
                                    SubmitTime = sqlDataReader["SubmitTime"].ToString(),
                                    DateOfAccident = sqlDataReader["DateOfAccident"].ToString(),
                                    AccidentLocation = sqlDataReader["AccidentLocation"].ToString(),
                                    AccidentType = sqlDataReader["AccidentType"].ToString(),
                                    Status = sqlDataReader["Status"].ToString(),
                                    StatusIcon = sqlDataReader["StatusIcon"].ToString(),
                                    DateInsert = sqlDataReader["DateInsert"].ToString(),
                                    nameCity = nameCityS
                                });
                            }
                        }
                        connection.Close();
                    }
                    using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_Accident", connection))
                    {
                        crashType = "فوتی";

                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@Type", (object)"Select");
                        sqlCommand.Parameters.AddWithValue("@RowCount", (object)rowCount);
                        sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                        sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                        sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                        sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                        sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                        sqlCommand.Parameters.AddWithValue("@TimeAccidentStart", (object)timeAccidentStart);
                        sqlCommand.Parameters.AddWithValue("@TimeAccidentEnd", (object)timeAccidentEnd);
                        sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                        sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                        sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                        sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                        sqlCommand.Parameters.AddWithValue("@OrderBy", (object)sort);
                        sqlCommand.Parameters.AddWithValue("@ListId", (object)listId);
                        sqlCommand.Parameters.AddWithValue("@IsSuperAdmin", (object)isSupeAdmin);

                        connection.Open();
                        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                        while (sqlDataReader.Read())
                        {
                            using (DataManagementDataContext context = new DataManagementDataContext())
                            {
                                string nameCityS = "";
                                var ds = (from m in context.searchnameSharhrestanByID(int.Parse(sqlDataReader["CityId"].ToString())).AsEnumerable()
                                          select m).FirstOrDefault();
                                if (ds != null)
                                {
                                    nameCityS = ds.Name;
                                }


                                getGridAccidentList.Add(new GetGridAccident()
                                {
                                    Id = sqlDataReader["Id"].ToString(),
                                    Serial = sqlDataReader["Serial"].ToString(),
                                    SubmitTime = sqlDataReader["SubmitTime"].ToString(),
                                    DateOfAccident = sqlDataReader["DateOfAccident"].ToString(),
                                    AccidentLocation = sqlDataReader["AccidentLocation"].ToString(),
                                    AccidentType = sqlDataReader["AccidentType"].ToString(),
                                    Status = sqlDataReader["Status"].ToString(),
                                    StatusIcon = sqlDataReader["StatusIcon"].ToString(),
                                    DateInsert = sqlDataReader["DateInsert"].ToString(),
                                    nameCity = nameCityS
                                });
                            }
                        }
                        connection.Close();
                    }
                }
            }
            return getGridAccidentList;
        }

        public DataTable Select_PrintAccident(
          int rowCount,
          long? id,
          long? createById,
          string status,
          string dateOfAccident,
          string dateOfAccidentEnd,
          byte? timeAccidentStart,
          byte? timeAccidentEnd,
          string crashType,
          string serial,
          bool allAccident,
          bool isSupeAdmin,
          string sort)
        {
            DataTable dataTable = new DataTable();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"Select");
                    sqlCommand.Parameters.AddWithValue("@RowCount", (object)rowCount);
                    sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                    sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                    sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                    sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                    sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                    sqlCommand.Parameters.AddWithValue("@TimeAccidentStart", (object)timeAccidentStart);
                    sqlCommand.Parameters.AddWithValue("@TimeAccidentEnd", (object)timeAccidentEnd);
                    sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                    sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                    sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                    sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                    sqlCommand.Parameters.AddWithValue("@IsSuperAdmin", (object)isSupeAdmin);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                    {
                        int aId =int.Parse( sqlDataReader["Id"].ToString());
                        string aSerial = sqlDataReader["Serial"].ToString();
                        string aSubmitDate = sqlDataReader["SubmitDate"].ToString();
                        string aSubmitTime = sqlDataReader["SubmitTime"].ToString();
                        string aAccidentLocation = sqlDataReader["AccidentLocation"].ToString();
                        string aAccidentType = sqlDataReader["AccidentType"].ToString();
                        string aStatus = sqlDataReader["Status"].ToString();

                        ExportData ed = new ExportData()
                        {
                            Id = aId,
                            Serial = aSerial,
                            SubmitDate = aSubmitDate,
                            SubmitTime = aSubmitTime,
                            AccidentLocation = aAccidentLocation,
                            AccidentType = aAccidentType,
                            Status = aStatus


                        };
                        ListExportData.Add(ed);

                    }


                    dataTable.Columns.Add("Id");
                    dataTable.Columns.Add("Serial");
                    dataTable.Columns.Add("SubmitDate");
                    dataTable.Columns.Add("SubmitTime");
                    dataTable.Columns.Add("AccidentLocation");
                    dataTable.Columns.Add("AccidentType");
                    dataTable.Columns.Add("Status");
                    if (sort == "Asc")
                    {
                        var ds = (from m in ListExportData.AsEnumerable()
                                  orderby m.Id ascending
                                  select m).ToList();
                        for (int i = 0; i < ds.Count; i++)
                        {
                            dataTable.Rows.Add(
                                ds[i].Id.ToString(),
                                ds[i].Serial.ToString(),
                                ds[i].SubmitDate.ToString(),
                                ds[i].SubmitTime.ToString(),
                                ds[i].AccidentLocation.ToString(),
                                ds[i].AccidentType.ToString(),
                                ds[i].Status.ToString());
                        }
                    }
                    if (sort == "desc")
                    {
                        var ds = (from m in ListExportData.AsEnumerable()
                                  orderby m.Id descending
                                  select m).ToList();
                        for (int i = 0; i < ds.Count; i++)
                        {
                            dataTable.Rows.Add(
                                ds[i].Id.ToString(),
                                ds[i].Serial.ToString(),
                                ds[i].SubmitDate.ToString(),
                                ds[i].SubmitTime.ToString(),
                                ds[i].AccidentLocation.ToString(),
                                ds[i].AccidentType.ToString(),
                                ds[i].Status.ToString());
                        }
                    }

                    //while (sqlDataReader.Read())
                    //dataTable.Rows.Add(sqlDataReader["Id"], sqlDataReader["Serial"], sqlDataReader["SubmitDate"], sqlDataReader["SubmitTime"], sqlDataReader["AccidentLocation"], sqlDataReader["AccidentType"], sqlDataReader["Status"]);
                    connection.Close();
                }
            }
            return dataTable;
        }
        public class ExportData
        {

            public int Id { get; set; }
            public string Serial { get; set; }
            public string SubmitDate { get; set; }
            public string SubmitTime { get; set; }
            public string AccidentLocation { get; set; }
            public string AccidentType { get; set; }
            public string Status { get; set; }


        };
        public List<ExportData> ListExportData = new List<ExportData>();
        public List<GetMapAccident> GetAllLocation(
          int rowCount,
          long? createById,
          string status,
          string dateOfAccident,
          string dateOfAccidentEnd,
          string crashType,
          bool allAccident,
          bool isSupeAdmin)
        {
            List<GetMapAccident> allLocation = new List<GetMapAccident>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"Map");
                    sqlCommand.Parameters.AddWithValue("@RowCount", (object)rowCount);
                    if (!string.IsNullOrEmpty(status))
                        sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                    if (!string.IsNullOrEmpty(dateOfAccident))
                        sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                    if (!string.IsNullOrEmpty(dateOfAccidentEnd))
                        sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                    if (!string.IsNullOrEmpty(crashType))
                        sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                    sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                    sqlCommand.Parameters.AddWithValue("@IsSuperAdmin", (object)isSupeAdmin);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        allLocation.Add(new GetMapAccident()
                        {
                            Id = sqlDataReader["Id"].ToString(),
                            Location = sqlDataReader["Location"].ToString(),
                            CrashType = sqlDataReader["CrashType"].ToString(),
                            CheckByPoliceStationAdmin = sqlDataReader["CheckByPoliceStationAdmin"].ToString(),
                            CheckByCampAdmin = sqlDataReader["CheckByCampAdmin"].ToString()
                        });
                    connection.Close();
                }
            }
            return allLocation;
        }

        public List<GetMapAccident> GetSearchAllLocation(
          int rowCount,
          long? id,
          long? createById,
          string status,
          string dateOfAccident,
          string dateOfAccidentEnd,
          string crashType,
          bool allAccident,
          int? provinceId,
          int? cityId,
          string location,
          bool isSupeAdmin,
          bool? inNativeArea,
          int? axisId)
        {
            List<GetMapAccident> searchAllLocation = new List<GetMapAccident>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                if (crashType != "جرحی وفوتی")
                {
                    using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_Accident", connection))
                    {
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@Type", (object)"Map");
                        sqlCommand.Parameters.AddWithValue("@RowCount", (object)rowCount);
                        if (id.HasValue)
                            sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                        sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                        if (!string.IsNullOrEmpty(status))
                            sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                        if (!string.IsNullOrEmpty(dateOfAccident))
                            sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                        if (!string.IsNullOrEmpty(dateOfAccidentEnd))
                            sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                        if (!string.IsNullOrEmpty(crashType))
                            sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                        sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                        sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                        if (provinceId.HasValue)
                            sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                        if (cityId.HasValue)
                            sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                        sqlCommand.Parameters.AddWithValue("@Location", (object)location);
                        sqlCommand.Parameters.AddWithValue("@IsSuperAdmin", (object)isSupeAdmin);
                        sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                        sqlCommand.Parameters.AddWithValue("@AxisId", (object)axisId);
                        connection.Open();
                        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                        while (sqlDataReader.Read())
                            searchAllLocation.Add(new GetMapAccident()
                            {
                                Id = sqlDataReader["Id"].ToString(),
                                Location = sqlDataReader["Location"].ToString(),
                                CrashType = sqlDataReader["CrashType"].ToString(),
                                CheckByPoliceStationAdmin = sqlDataReader["CheckByPoliceStationAdmin"].ToString(),
                                CheckByCampAdmin = sqlDataReader["CheckByCampAdmin"].ToString()
                            });
                        connection.Close();
                    }

                }
                else
                {
                    using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_Accident", connection))
                    {
                        crashType = "فوتی";
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@Type", (object)"Map");
                        sqlCommand.Parameters.AddWithValue("@RowCount", (object)rowCount);
                        if (id.HasValue)
                            sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                        sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                        if (!string.IsNullOrEmpty(status))
                            sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                        if (!string.IsNullOrEmpty(dateOfAccident))
                            sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                        if (!string.IsNullOrEmpty(dateOfAccidentEnd))
                            sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                        if (!string.IsNullOrEmpty(crashType))
                            sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                        sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                        sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                        if (provinceId.HasValue)
                            sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                        if (cityId.HasValue)
                            sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                        sqlCommand.Parameters.AddWithValue("@Location", (object)location);
                        sqlCommand.Parameters.AddWithValue("@IsSuperAdmin", (object)isSupeAdmin);
                        sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                        sqlCommand.Parameters.AddWithValue("@AxisId", (object)axisId);
                        connection.Open();
                        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                        while (sqlDataReader.Read())
                            searchAllLocation.Add(new GetMapAccident()
                            {
                                Id = sqlDataReader["Id"].ToString(),
                                Location = sqlDataReader["Location"].ToString(),
                                CrashType = sqlDataReader["CrashType"].ToString(),
                                CheckByPoliceStationAdmin = sqlDataReader["CheckByPoliceStationAdmin"].ToString(),
                                CheckByCampAdmin = sqlDataReader["CheckByCampAdmin"].ToString()
                            });
                        connection.Close();
                    }
                    using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_Accident", connection))
                    {
                        crashType = "جرحی";

                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@Type", (object)"Map");
                        sqlCommand.Parameters.AddWithValue("@RowCount", (object)rowCount);
                        if (id.HasValue)
                            sqlCommand.Parameters.AddWithValue("@Id", (object)id);
                        sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                        if (!string.IsNullOrEmpty(status))
                            sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                        if (!string.IsNullOrEmpty(dateOfAccident))
                            sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                        if (!string.IsNullOrEmpty(dateOfAccidentEnd))
                            sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                        if (!string.IsNullOrEmpty(crashType))
                            sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                        sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                        sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                        if (provinceId.HasValue)
                            sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                        if (cityId.HasValue)
                            sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                        sqlCommand.Parameters.AddWithValue("@Location", (object)location);
                        sqlCommand.Parameters.AddWithValue("@IsSuperAdmin", (object)isSupeAdmin);
                        sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                        sqlCommand.Parameters.AddWithValue("@AxisId", (object)axisId);
                        connection.Open();
                        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                        while (sqlDataReader.Read())
                            searchAllLocation.Add(new GetMapAccident()
                            {
                                Id = sqlDataReader["Id"].ToString(),
                                Location = sqlDataReader["Location"].ToString(),
                                CrashType = sqlDataReader["CrashType"].ToString(),
                                CheckByPoliceStationAdmin = sqlDataReader["CheckByPoliceStationAdmin"].ToString(),
                                CheckByCampAdmin = sqlDataReader["CheckByCampAdmin"].ToString()
                            });
                        connection.Close();
                    }

                }
            }
            return searchAllLocation;
        }




        public void CheckByPsaOrCamp(string type, long id, bool isChecked, long userId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Type", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)type;
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter2.Value = (object)id;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@IsContainsSearch", SqlDbType.Bit);
            sqlParameter3.Value = (object)isChecked;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter4.Value = (object)userId;
            sqlParameterList.Add(sqlParameter4);
            this.GlobalUpdate(CommandType.StoredProcedure, "SP_All_TBL_Accident", sqlParameterList.ToArray());
        }

        public string GetSlideShow(long accidentId, out int count)
        {
            string slideShow = "";
            count = 0;
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)nameof(GetSlideShow));
                    sqlCommand.Parameters.AddWithValue("@Id", (object)accidentId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                    {
                        slideShow += sqlDataReader["ImageUrl"].ToString();
                        ++count;
                    }
                    connection.Close();
                }
            }
            return slideShow;
        }

        public void GetCrashForPopup(
          long accidentId,
          out string crashDate,
          out string crashTime,
          out string crashType,
          out string deadCount,
          out string injuredCount,
          out string carCount,
          out string car2Count,
          out string car3Count,
          out string motorCount,
          out string passengerCount,
          out string pedestrianCount,
          out string bikeRiderCount,
          out string collisionOfA,
          out string collisionOfATwo,
          out string typeOfCollision)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Load_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"CrashForPopup");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        crashDate = sqlDataReader["CrashDate"].ToString();
                        crashTime = sqlDataReader["CrashTime"].ToString();
                        crashType = sqlDataReader["CrashType"].ToString();
                        deadCount = sqlDataReader["DeadCount"].ToString();
                        injuredCount = sqlDataReader["InjuredCount"].ToString();
                        carCount = sqlDataReader["CarCount"].ToString();
                        car2Count = sqlDataReader["Car2Count"].ToString();
                        car3Count = sqlDataReader["Car3Count"].ToString();
                        motorCount = sqlDataReader["MotorCount"].ToString();
                        passengerCount = sqlDataReader["PassengerCount"].ToString();
                        pedestrianCount = sqlDataReader["PedestrianCount"].ToString();
                        bikeRiderCount = sqlDataReader["BikeRiderCount"].ToString();
                        collisionOfA = sqlDataReader["CollisionOfA"].ToString();
                        collisionOfATwo = sqlDataReader["CollisionOfATwo"].ToString();
                        typeOfCollision = sqlDataReader["TypeOfCollision"].ToString();
                    }
                    else
                        crashDate = crashTime = crashType = deadCount = injuredCount = carCount = car2Count = car3Count = motorCount = passengerCount = pedestrianCount = bikeRiderCount = collisionOfA = collisionOfATwo = typeOfCollision = "";
                    connection.Close();
                }
            }
        }

        public void Select_SeventhAccident(
          long accidentId,
          out string primaryCause,
          out string formerCause,
          out string directCause,
          out string organizationsToBlame,
          out string directCausePrecent)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"SelectEdit");
                    sqlCommand.Parameters.AddWithValue("@Id", (object)accidentId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        primaryCause = sqlDataReader["PrimaryCauseText"].ToString();
                        formerCause = sqlDataReader["FormerCauseText"].ToString();
                        directCause = sqlDataReader["DirectCauseText"].ToString();
                        organizationsToBlame = sqlDataReader["OrganizationsToBlame"].ToString();
                        directCausePrecent = sqlDataReader["DirectCausePrecent"].ToString();
                    }
                    else
                        primaryCause = formerCause = directCause = organizationsToBlame = directCausePrecent = "";
                    connection.Close();
                }
            }
        }

        public void LoadBorderComment(
          long accidentId,
          out string firstBorder,
          out string secondBorder,
          out string thirdBorder,
          out string fourthBorder,
          out string fifthBorder,
          out string sixthBorder,
          out string seventhBorder)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_TBL_AccidentDescription", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"LoadBorder");
                    sqlCommand.Parameters.AddWithValue("@AccidentId", (object)accidentId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        firstBorder = sqlDataReader["FirstBorder"].ToString();
                        secondBorder = sqlDataReader["SecondBorder"].ToString();
                        thirdBorder = sqlDataReader["ThirdBorder"].ToString();
                        fourthBorder = sqlDataReader["FourthBorder"].ToString();
                        fifthBorder = sqlDataReader["FifthBorder"].ToString();
                        sixthBorder = sqlDataReader["SixthBorder"].ToString();
                        seventhBorder = sqlDataReader["SeventhBorder"].ToString();
                    }
                    else
                        firstBorder = secondBorder = thirdBorder = fourthBorder = fifthBorder = sixthBorder = seventhBorder = "";
                    connection.Close();
                }
            }
        }

        public List<GetSubmit> LoadCityListInProvince(int provinceId)
        {
            List<GetSubmit> getSubmitList = new List<GetSubmit>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SELECT TOP (1000) Id,Area,NativeArea,EnglishName FROM TBL_City where ProvinceId = @ProvinceId", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        getSubmitList.Add(new GetSubmit()
                        {
                            Id = sqlDataReader["Id"].ToString(),
                            Message = sqlDataReader["Area"].ToString(),
                            MessageTwo = sqlDataReader["NativeArea"].ToString(),
                            MessageThree = sqlDataReader["EnglishName"].ToString(),
                            IsSuccess = "true"
                        });
                    connection.Close();
                }
            }
            return getSubmitList;
        }

        public void LoadAxisListInProvince(int provinceId, out string id, out string area)
        {
            id = area = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SELECT TOP (1000) Id,Area FROM TBL_Axis where ProvinceId = @ProvinceId", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                    {
                        id = id + sqlDataReader["Id"]?.ToString() + "#";
                        area = area + sqlDataReader["Area"]?.ToString() + "#";
                    }
                    connection.Close();
                }
            }
        }

        public List<GetSubmit> FillTreeButton(long userId, long planId)
        {
            List<GetSubmit> getSubmitList = new List<GetSubmit>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (new SqlCommand("SP_All_TBL_Plan", connection))
#pragma warning disable CS0642 // Possible mistaken empty statement
                    ;
#pragma warning restore CS0642 // Possible mistaken empty statement
            }
            return getSubmitList;
        }

        public void GetDeadOrInjured(
          out string deadCountDaily,
          out string injuredCountDaily,
          out string deadCountYearly,
          out string injuredCountYearly)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Load_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"DeadOrInjured");
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        deadCountDaily = sqlDataReader["DeadCountDaily"].ToString();
                        injuredCountDaily = sqlDataReader["InjuredCountDaily"].ToString();
                        deadCountYearly = sqlDataReader["DeadCountYearly"].ToString();
                        injuredCountYearly = sqlDataReader["InjuredCountYearly"].ToString();
                    }
                    else
                        deadCountDaily = injuredCountDaily = deadCountYearly = injuredCountYearly = "";
                    connection.Close();
                }
            }
        }

        public string Select_PlanName(long id)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter.Value = (object)id;
            sqlParameterList.Add(sqlParameter);
            return this.GlobalObjectReturnConnection(CommandType.Text, "select Caption from TBL_Plan where Id = @Id", "Caption", sqlParameterList.ToArray()).ToString();
        }

        public string GetPoliceStationAreaByUserId(long id)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter = new SqlParameter("@UserId", SqlDbType.BigInt);
            sqlParameter.Value = (object)id;
            sqlParameterList.Add(sqlParameter);
            return this.GlobalObjectReturnConnection(CommandType.Text, "select top(1) tp.Area from TBL_User tu join TBL_PoliceStation tp on tu.PoliceStationId = tp.Id where tu.Id = @UserId", "Area", sqlParameterList.ToArray()).ToString();
        }

        public string GetPoliceStationArea(long id)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter = new SqlParameter("@Id", SqlDbType.BigInt);
            sqlParameter.Value = (object)id;
            sqlParameterList.Add(sqlParameter);
            return this.GlobalObjectReturnConnection(CommandType.Text, "select top(1) Area from TBL_PoliceStation where Id = @Id", "Area", sqlParameterList.ToArray()).ToString();
        }

        public void FillAllHtmlSelect(HtmlSelect cmb, string type, string sp)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sp, connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    if (!string.IsNullOrEmpty(type))
                        sqlCommand.Parameters.AddWithValue("@Type", (object)type);
                    connection.Open();
                    cmb.DataSource = (object)sqlCommand.ExecuteReader();
                    cmb.DataTextField = "Name";
                    cmb.DataValueField = "Id";
                    cmb.DataBind();
                    connection.Close();
                }
            }
        }
        public void FiltrafficZonecity(HtmlSelect cmb, string type, string sp,string val)
        {

            using ( DataManagementDataContext context= new DataManagementDataContext() )
            {
                var ds=(from m in context.filltraffic()
                        select m).ToList();
                if (ds.Count!=0)
                {
                    
                    
                    cmb.DataSource = ds;
                    cmb.DataTextField = val;
                    cmb.DataValueField = val;
                    cmb.DataBind();
                    
                }
            }
 
        }
        public void Filcity(HtmlSelect cmb, string type, string sp, string val)
        {

            using (DataManagementDataContext context = new DataManagementDataContext())
            {
                var ds = (from m in context.fillCity()
                          select m).ToList();
                if (ds.Count != 0)
                {
                    cmb.DataSource = ds;
                    cmb.DataTextField = val;
                    cmb.DataValueField = "id";
                    cmb.DataBind();

                }
            }

        }

        public void FillAllHtmlSelects(DropDownList cmb, string type, string sp)
        {
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sp, connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    if (!string.IsNullOrEmpty(type))
                        sqlCommand.Parameters.AddWithValue("@Type", (object)type);
                    connection.Open();
                    cmb.DataSource = (object)sqlCommand.ExecuteReader();
                    cmb.DataTextField = "Name";
                    cmb.DataValueField = "Id";
                    cmb.DataBind();
                    connection.Close();
                }
            }
        }

        public void SearchInFirstViewChart(
          long? createById,
          string status,
          string dateOfAccident,
          string dateOfAccidentEnd,
          string crashType,
          string serial,
          int? provinceId,
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
          bool allAccident,
          int? cityId,
          bool? inNativeArea,
          bool? isHoliday,
          string collisionChild1,
          string collisionChild2,
          int? axisId,
          bool? isNotLocalDriver,
          out string roadDefects,
          out string pieRoadDefects,
          out string visualObstruction,
          out string pieVisualObstruction,
          out string pieRoadwayWidth,
          out string geometry1Tarafe,
          out string geometry2Tarafe,
          out string geometry2TwoTarafe,
          out string bubbleUserSpeed,
          out string bubbleUserGetSpeed)
        {
            roadDefects = pieRoadDefects = visualObstruction = pieVisualObstruction = pieRoadwayWidth = geometry1Tarafe = geometry2Tarafe = geometry2TwoTarafe = bubbleUserSpeed = bubbleUserGetSpeed = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                try
                {
                    if (crashType != "جرحی وفوتی")
                    {
                        using (SqlCommand sqlCommand = new SqlCommand("SP_All_ChartFirstView", connection))
                        {
                            sqlCommand.CommandType = CommandType.StoredProcedure;
                            sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                            sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                            sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                            sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                            sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                            sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                            sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                            sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                            sqlCommand.Parameters.AddWithValue("@DayOfWeek", (object)getDays);
                            sqlCommand.Parameters.AddWithValue("@Month", (object)month);
                            sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                            sqlCommand.Parameters.AddWithValue("@LightingStatus", (object)lightingStatus);
                            sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                            sqlCommand.Parameters.AddWithValue("@CarriageWayDirection", (object)carriageWayDirection);
                            sqlCommand.Parameters.AddWithValue("@TypeOfWay", (object)typeOfWay);
                            sqlCommand.Parameters.AddWithValue("@CarCrashLocation", (object)carCrashLocation);
                            sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                            sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                            sqlCommand.Parameters.AddWithValue("@FromAgeDriver", (object)fromAgeDriver);
                            sqlCommand.Parameters.AddWithValue("@ToAgeDriver", (object)toAgeDriver);
                            sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                            sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                            sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                            sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                            sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                            sqlCommand.Parameters.AddWithValue("@AxisId", (object)axisId);
                            sqlCommand.Parameters.AddWithValue("@IsNotLocal", (object)isNotLocalDriver);
                            connection.Open();
                            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                            string data21 = "";
                            if (sqlDataReader.Read())
                            {
                                for (int index = 2; index <= 16; ++index)
                                {
                                    roadDefects = roadDefects + sqlDataReader["RoadDefects" + index.ToString()]?.ToString() + ",";
                                    visualObstruction = visualObstruction + sqlDataReader["VisualObstruction" + index.ToString()]?.ToString() + ",";
                                }
                                for (int index = 1; index <= 3; ++index)
                                {
                                    pieRoadDefects = pieRoadDefects + sqlDataReader["PieRoadDefects" + index.ToString()]?.ToString() + ",";
                                    pieVisualObstruction = pieVisualObstruction + sqlDataReader["PieVisualObstruction" + index.ToString()]?.ToString() + ",";
                                    pieRoadwayWidth = pieRoadwayWidth + sqlDataReader["PieRoadwayWidth" + index.ToString()]?.ToString() + ",";
                                }
                                for (int index = 1; index <= 8; ++index)
                                {
                                    geometry1Tarafe = geometry1Tarafe + sqlDataReader["Geometry1Tarafe" + index.ToString()]?.ToString() + ",";
                                     geometry2Tarafe = geometry2Tarafe + sqlDataReader["Geometry2Tarafe" + index.ToString()]?.ToString() + ",";
                                    geometry2TwoTarafe = geometry2TwoTarafe + sqlDataReader["Geometry2TwoTarafe" + index.ToString()]?.ToString() + ",";
                                    
                                    bubbleUserSpeed = bubbleUserSpeed + sqlDataReader["BubbleUserSpeed" + index.ToString()]?.ToString() + ",";
                                    bubbleUserGetSpeed = bubbleUserGetSpeed + sqlDataReader["BubbleUserGetSpeed" + index.ToString()]?.ToString() + ",";
                                }
                            }
                            connection.Close();
                        }
                    }
                    else
                    {
                        if (crashType == "جرحی وفوتی")
                        {

                            using (SqlCommand sqlCommand = new SqlCommand("SP_All_ChartFirstView", connection))
                            {
                                crashType = "جرحی";
                                sqlCommand.CommandType = CommandType.StoredProcedure;
                                sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                                sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                                sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                                sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                                sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                                sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                                sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                                sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                                sqlCommand.Parameters.AddWithValue("@DayOfWeek", (object)getDays);
                                sqlCommand.Parameters.AddWithValue("@Month", (object)month);
                                sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                                sqlCommand.Parameters.AddWithValue("@LightingStatus", (object)lightingStatus);
                                sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                                sqlCommand.Parameters.AddWithValue("@CarriageWayDirection", (object)carriageWayDirection);
                                sqlCommand.Parameters.AddWithValue("@TypeOfWay", (object)typeOfWay);
                                sqlCommand.Parameters.AddWithValue("@CarCrashLocation", (object)carCrashLocation);
                                sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                                sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                                sqlCommand.Parameters.AddWithValue("@FromAgeDriver", (object)fromAgeDriver);
                                sqlCommand.Parameters.AddWithValue("@ToAgeDriver", (object)toAgeDriver);
                                sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                                sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                                sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                                sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                                sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                                sqlCommand.Parameters.AddWithValue("@AxisId", (object)axisId);
                                sqlCommand.Parameters.AddWithValue("@IsNotLocal", (object)isNotLocalDriver);
                                connection.Open();
                                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                                if (sqlDataReader.Read())
                                {
                                    for (int index = 2; index <= 16; ++index)
                                    {
                                        roadDefects = roadDefects + sqlDataReader["RoadDefects" + index.ToString()]?.ToString() + ",";
                                        visualObstruction = visualObstruction + sqlDataReader["VisualObstruction" + index.ToString()]?.ToString() + ",";
                                    }
                                    for (int index = 1; index <= 3; ++index)
                                    {
                                        pieRoadDefects = pieRoadDefects + sqlDataReader["PieRoadDefects" + index.ToString()]?.ToString() + ",";
                                        pieVisualObstruction = pieVisualObstruction + sqlDataReader["PieVisualObstruction" + index.ToString()]?.ToString() + ",";
                                        pieRoadwayWidth = pieRoadwayWidth + sqlDataReader["PieRoadwayWidth" + index.ToString()]?.ToString() + ",";
                                    }
                                    for (int index = 1; index <= 8; ++index)
                                    {
                                        geometry1Tarafe = geometry1Tarafe + sqlDataReader["Geometry1Tarafe" + index.ToString()]?.ToString() + ",";
                                        geometry2Tarafe = geometry2Tarafe + sqlDataReader["Geometry2Tarafe" + index.ToString()]?.ToString() + ",";
                                        geometry2TwoTarafe = geometry2TwoTarafe + sqlDataReader["Geometry2TwoTarafe" + index.ToString()]?.ToString() + ",";
                                        bubbleUserSpeed = bubbleUserSpeed + sqlDataReader["BubbleUserSpeed" + index.ToString()]?.ToString() + ",";
                                        bubbleUserGetSpeed = bubbleUserGetSpeed + sqlDataReader["BubbleUserGetSpeed" + index.ToString()]?.ToString() + ",";
                                    }
                                }
                                connection.Close();
                            }
                            using (SqlCommand sqlCommand = new SqlCommand("SP_All_ChartFirstView", connection))
                            {
                                crashType = "فوتی";
                                sqlCommand.CommandType = CommandType.StoredProcedure;
                                sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                                sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                                sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                                sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                                sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                                sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                                sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                                sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                                sqlCommand.Parameters.AddWithValue("@DayOfWeek", (object)getDays);
                                sqlCommand.Parameters.AddWithValue("@Month", (object)month);
                                sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                                sqlCommand.Parameters.AddWithValue("@LightingStatus", (object)lightingStatus);
                                sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                                sqlCommand.Parameters.AddWithValue("@CarriageWayDirection", (object)carriageWayDirection);
                                sqlCommand.Parameters.AddWithValue("@TypeOfWay", (object)typeOfWay);
                                sqlCommand.Parameters.AddWithValue("@CarCrashLocation", (object)carCrashLocation);
                                sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                                sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                                sqlCommand.Parameters.AddWithValue("@FromAgeDriver", (object)fromAgeDriver);
                                sqlCommand.Parameters.AddWithValue("@ToAgeDriver", (object)toAgeDriver);
                                sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                                sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                                sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                                sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                                sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                                sqlCommand.Parameters.AddWithValue("@AxisId", (object)axisId);
                                sqlCommand.Parameters.AddWithValue("@IsNotLocal", (object)isNotLocalDriver);
                                connection.Open();
                                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                                if (sqlDataReader.Read())
                                {
                                    for (int index = 2; index <= 16; ++index)
                                    {
                                        roadDefects = roadDefects + sqlDataReader["RoadDefects" + index.ToString()]?.ToString() + ",";
                                        visualObstruction = visualObstruction + sqlDataReader["VisualObstruction" + index.ToString()]?.ToString() + ",";
                                    }
                                    for (int index = 1; index <= 3; ++index)
                                    {
                                        pieRoadDefects = pieRoadDefects + sqlDataReader["PieRoadDefects" + index.ToString()]?.ToString() + ",";
                                        pieVisualObstruction = pieVisualObstruction + sqlDataReader["PieVisualObstruction" + index.ToString()]?.ToString() + ",";
                                        pieRoadwayWidth = pieRoadwayWidth + sqlDataReader["PieRoadwayWidth" + index.ToString()]?.ToString() + ",";
                                    }
                                    for (int index = 1; index <= 8; ++index)
                                    {
                                        geometry1Tarafe = geometry1Tarafe + sqlDataReader["Geometry1Tarafe" + index.ToString()]?.ToString() + ",";
                                        geometry2Tarafe = geometry2Tarafe + sqlDataReader["Geometry2Tarafe" + index.ToString()]?.ToString() + ",";
                                        geometry2TwoTarafe = geometry2TwoTarafe + sqlDataReader["Geometry2TwoTarafe" + index.ToString()]?.ToString() + ",";
                                        bubbleUserSpeed = bubbleUserSpeed + sqlDataReader["BubbleUserSpeed" + index.ToString()]?.ToString() + ",";
                                        bubbleUserGetSpeed = bubbleUserGetSpeed + sqlDataReader["BubbleUserGetSpeed" + index.ToString()]?.ToString() + ",";

                                    }
                                }
                                connection.Close();
                            }

                        }
                    }
                }
                catch (Exception ex)
                {
                    string i = ex.Message;
                }
            }
        }

        public void SearchInFirstViewChartTime(
          long? createById,
          string status,
          string dateOfAccident,
          string dateOfAccidentEnd,
          string crashType,
          string serial,
          int? provinceId,
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
          bool allAccident,
          int? cityId,
          bool? inNativeArea,
          bool? isHoliday,
          string collisionChild1,
          string collisionChild2,
          int? axisId,
          bool? isNotLocalDriver,
          out string day0,
          out string day1,
          out string day2,
          out string day3,
          out string day4,
          out string day5,
          out string day6,
          out string month0,
          out string month1,
          out string month2,
          out string month3,
          out string month4,
          out string month5,
          out string month6,
          out string month7,
          out string month8,
          out string month9,
          out string month10,
          out string month11,
          out string week0,
          out string week1,
          out string week2,
          out string week3,
          out string week4,
          out string week5,
          out string week6,
          out string week7,
          out string week8,
          out string week9,
          out string week10,
          out string week11,
          out string holiday,
          out string notHoliday)
        {
            day0 = day1 = day2 = day3 = day4 = day5 = day6 = "";
            month0 = month1 = month2 = month3 = month4 = month5 = month6 = month7 = month8 = month9 = month10 = month11 = "";
            week0 = week1 = week2 = week3 = week4 = week5 = week6 = week7 = week8 = week9 = week10 = week11 = "";
            holiday = notHoliday = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_ChartFirstView_Time", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                    sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                    sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                    sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                    sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                    sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                    sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                    sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                    sqlCommand.Parameters.AddWithValue("@DayOfWeek", (object)getDays);
                    sqlCommand.Parameters.AddWithValue("@Month", (object)month);
                    sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                    sqlCommand.Parameters.AddWithValue("@LightingStatus", (object)lightingStatus);
                    sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                    sqlCommand.Parameters.AddWithValue("@CarriageWayDirection", (object)carriageWayDirection);
                    sqlCommand.Parameters.AddWithValue("@TypeOfWay", (object)typeOfWay);
                    sqlCommand.Parameters.AddWithValue("@CarCrashLocation", (object)carCrashLocation);
                    sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                    sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                    sqlCommand.Parameters.AddWithValue("@FromAgeDriver", (object)fromAgeDriver);
                    sqlCommand.Parameters.AddWithValue("@ToAgeDriver", (object)toAgeDriver);
                    sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                    sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                    sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                    sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                    sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                    sqlCommand.Parameters.AddWithValue("@AxisId", (object)axisId);
                    sqlCommand.Parameters.AddWithValue("@IsNotLocal", (object)isNotLocalDriver);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        for (int index = 0; index <= 23; ++index)
                        {
                            day0 = day0 + sqlDataReader["AccidentByDay0Clock" + index.ToString()]?.ToString() + ",";
                            day1 = day1 + sqlDataReader["AccidentByDay1Clock" + index.ToString()]?.ToString() + ",";
                            day2 = day2 + sqlDataReader["AccidentByDay2Clock" + index.ToString()]?.ToString() + ",";
                            day3 = day3 + sqlDataReader["AccidentByDay3Clock" + index.ToString()]?.ToString() + ",";
                            day4 = day4 + sqlDataReader["AccidentByDay4Clock" + index.ToString()]?.ToString() + ",";
                            day5 = day5 + sqlDataReader["AccidentByDay5Clock" + index.ToString()]?.ToString() + ",";
                            day6 = day6 + sqlDataReader["AccidentByDay6Clock" + index.ToString()]?.ToString() + ",";
                            month0 = month0 + sqlDataReader["AccidentByMonth0Clock" + index.ToString()]?.ToString() + ",";
                            month1 = month1 + sqlDataReader["AccidentByMonth1Clock" + index.ToString()]?.ToString() + ",";
                            month2 = month2 + sqlDataReader["AccidentByMonth2Clock" + index.ToString()]?.ToString() + ",";
                            month3 = month3 + sqlDataReader["AccidentByMonth3Clock" + index.ToString()]?.ToString() + ",";
                            month4 = month4 + sqlDataReader["AccidentByMonth4Clock" + index.ToString()]?.ToString() + ",";
                            month5 = month5 + sqlDataReader["AccidentByMonth5Clock" + index.ToString()]?.ToString() + ",";
                            month6 = month6 + sqlDataReader["AccidentByMonth6Clock" + index.ToString()]?.ToString() + ",";
                            month7 = month7 + sqlDataReader["AccidentByMonth7Clock" + index.ToString()]?.ToString() + ",";
                            month8 = month8 + sqlDataReader["AccidentByMonth8Clock" + index.ToString()]?.ToString() + ",";
                            month9 = month9 + sqlDataReader["AccidentByMonth9Clock" + index.ToString()]?.ToString() + ",";
                            month10 = month10 + sqlDataReader["AccidentByMonth10Clock" + index.ToString()]?.ToString() + ",";
                            month11 = month11 + sqlDataReader["AccidentByMonth11Clock" + index.ToString()]?.ToString() + ",";
                        }
                        for (int index = 0; index < 7; ++index)
                        {
                            week0 = week0 + sqlDataReader["AccidentByMonth0Week" + index.ToString()]?.ToString() + ",";
                            week1 = week1 + sqlDataReader["AccidentByMonth1Week" + index.ToString()]?.ToString() + ",";
                            week2 = week2 + sqlDataReader["AccidentByMonth2Week" + index.ToString()]?.ToString() + ",";
                            week3 = week3 + sqlDataReader["AccidentByMonth3Week" + index.ToString()]?.ToString() + ",";
                            week4 = week4 + sqlDataReader["AccidentByMonth4Week" + index.ToString()]?.ToString() + ",";
                            week5 = week5 + sqlDataReader["AccidentByMonth5Week" + index.ToString()]?.ToString() + ",";
                            week6 = week6 + sqlDataReader["AccidentByMonth6Week" + index.ToString()]?.ToString() + ",";
                            week7 = week7 + sqlDataReader["AccidentByMonth7Week" + index.ToString()]?.ToString() + ",";
                            week8 = week8 + sqlDataReader["AccidentByMonth8Week" + index.ToString()]?.ToString() + ",";
                            week9 = week9 + sqlDataReader["AccidentByMonth9Week" + index.ToString()]?.ToString() + ",";
                            week10 = week10 + sqlDataReader["AccidentByMonth10Week" + index.ToString()]?.ToString() + ",";
                            week11 = week11 + sqlDataReader["AccidentByMonth11Week" + index.ToString()]?.ToString() + ",";
                        }
                        for (int index = 0; index < 12; ++index)
                        {
                            holiday = holiday + sqlDataReader["HolidayInMonth" + index.ToString()]?.ToString() + ",";
                            notHoliday = notHoliday + sqlDataReader["NotHolidayInMonth" + index.ToString()]?.ToString() + ",";
                        }
                    }
                    connection.Close();
                }
            }
        }

        public void SearchInFirstViewChartVehicle(
          long? createById,
          string status,
          string dateOfAccident,
          string dateOfAccidentEnd,
          string crashType,
          string serial,
          int? provinceId,
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
          bool allAccident,
          int? cityId,
          bool? inNativeArea,
          bool? isHoliday,
          string collisionChild1,
          string collisionChild2,
          int? axisId,
          bool? isNotLocalDriver,
          out string vehicleBar0,
          out string vehicleBar1,
          out string vehicleBar2,
          out string vehicleBar3,
          out string vehicleBar4,
          out string vehicleBar5,
          out string vehicleBar6,
          out string vehicleBar7,
          out string diagnosis0,
          out string diagnosis1,
          out string diagnosis2,
          out string diagnosis3,
          out string diagnosis4,
          out string diagnosis5,
          out string diagnosis6,
          out string diagnosis7,
          out string maneuvering0,
          out string maneuvering1,
          out string maneuvering2,
          out string maneuvering3,
          out string maneuvering4,
          out string maneuvering5,
          out string maneuvering6,
          out string maneuvering7,
          out string maneuvering8,
          out string maneuvering9,
          out string maneuvering10,
          out string maneuvering11,
          out string codeCausing0,
          out string codeCausing1,
          out string codeCausing2,
          out string codeCausing3,
          out string codeCausing4,
          out string codeCausing5,
          out string automobilePie,
          out string vehicleType,
          out string countIsOrNotLocal)
        {
            vehicleBar0 = vehicleBar1 = vehicleBar2 = vehicleBar3 = vehicleBar4 = vehicleBar5 = vehicleBar6 = vehicleBar7 = "";
            diagnosis0 = diagnosis1 = diagnosis2 = diagnosis3 = diagnosis4 = diagnosis5 = diagnosis6 = diagnosis7 = "";
            maneuvering0 = maneuvering1 = maneuvering2 = maneuvering3 = maneuvering4 = maneuvering5 = maneuvering6 = maneuvering7 = maneuvering8 = maneuvering9 = maneuvering10 = maneuvering11 = "";
            codeCausing0 = codeCausing1 = codeCausing2 = codeCausing3 = codeCausing4 = codeCausing5 = "";
            automobilePie = vehicleType = "";
            countIsOrNotLocal = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_ChartFirstView_Vehicle", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                    sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                    sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                    sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                    sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                    sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                    sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                    sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                    sqlCommand.Parameters.AddWithValue("@DayOfWeek", (object)getDays);
                    sqlCommand.Parameters.AddWithValue("@Month", (object)month);
                    sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                    sqlCommand.Parameters.AddWithValue("@LightingStatus", (object)lightingStatus);
                    sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                    sqlCommand.Parameters.AddWithValue("@CarriageWayDirection", (object)carriageWayDirection);
                    sqlCommand.Parameters.AddWithValue("@TypeOfWay", (object)typeOfWay);
                    sqlCommand.Parameters.AddWithValue("@CarCrashLocation", (object)carCrashLocation);
                    sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                    sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                    sqlCommand.Parameters.AddWithValue("@FromAgeDriver", (object)fromAgeDriver);
                    sqlCommand.Parameters.AddWithValue("@ToAgeDriver", (object)toAgeDriver);
                    sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                    sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                    sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                    sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                    sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                    sqlCommand.Parameters.AddWithValue("@AxisId", (object)axisId);
                    sqlCommand.Parameters.AddWithValue("@IsNotLocal", (object)isNotLocalDriver);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        for (int index = 0; index < 6; ++index)
                        {
                            vehicleBar0 = vehicleBar0 + sqlDataReader["Vehicle0Bar" + index.ToString()]?.ToString() + ",";
                            vehicleBar1 = vehicleBar1 + sqlDataReader["Vehicle1Bar" + index.ToString()]?.ToString() + ",";
                            vehicleBar2 = vehicleBar2 + sqlDataReader["Vehicle2Bar" + index.ToString()]?.ToString() + ",";
                            vehicleBar3 = vehicleBar3 + sqlDataReader["Vehicle3Bar" + index.ToString()]?.ToString() + ",";
                            vehicleBar4 = vehicleBar4 + sqlDataReader["Vehicle4Bar" + index.ToString()]?.ToString() + ",";
                            vehicleBar5 = vehicleBar5 + sqlDataReader["Vehicle5Bar" + index.ToString()]?.ToString() + ",";
                            vehicleBar6 = vehicleBar6 + sqlDataReader["Vehicle6Bar" + index.ToString()]?.ToString() + ",";
                            vehicleBar7 = vehicleBar7 + sqlDataReader["Vehicle7Bar" + index.ToString()]?.ToString() + ",";
                        }
                        for (int index = 0; index < 3; ++index)
                        {
                            if (index == 0)
                            {
                                diagnosis0 = diagnosis0 + sqlDataReader["Technical" + index.ToString() + "Diagnosis0"]?.ToString() + ",";
                                diagnosis0 = diagnosis0 + sqlDataReader["Technical" + index.ToString() + "Diagnosis1"]?.ToString() + ",";
                                diagnosis0 = diagnosis0 + sqlDataReader["Technical" + index.ToString() + "Diagnosis2"]?.ToString() + ",";
                                diagnosis0 = diagnosis0 + sqlDataReader["Technical" + index.ToString() + "Diagnosis3"]?.ToString() + ",";
                                diagnosis0 = diagnosis0 + sqlDataReader["Technical" + index.ToString() + "Diagnosis4"]?.ToString() + ",";
                                diagnosis0 = diagnosis0 + sqlDataReader["Technical" + index.ToString() + "Diagnosis5"]?.ToString() + ",";
                                diagnosis0 = diagnosis0 + sqlDataReader["Technical" + index.ToString() + "Diagnosis6"]?.ToString() + ",";
                                diagnosis0 = diagnosis0 + sqlDataReader["Technical" + index.ToString() + "Diagnosis7"]?.ToString() + ",";
                            }
                            else if (index == 1)
                            {
                                diagnosis1 = diagnosis1 + sqlDataReader["Technical" + index.ToString() + "Diagnosis0"]?.ToString() + ",";
                                diagnosis1 = diagnosis1 + sqlDataReader["Technical" + index.ToString() + "Diagnosis1"]?.ToString() + ",";
                                diagnosis1 = diagnosis1 + sqlDataReader["Technical" + index.ToString() + "Diagnosis2"]?.ToString() + ",";
                                diagnosis1 = diagnosis1 + sqlDataReader["Technical" + index.ToString() + "Diagnosis3"]?.ToString() + ",";
                                diagnosis1 = diagnosis1 + sqlDataReader["Technical" + index.ToString() + "Diagnosis4"]?.ToString() + ",";
                                diagnosis1 = diagnosis1 + sqlDataReader["Technical" + index.ToString() + "Diagnosis5"]?.ToString() + ",";
                                diagnosis1 = diagnosis1 + sqlDataReader["Technical" + index.ToString() + "Diagnosis6"]?.ToString() + ",";
                                diagnosis1 = diagnosis1 + sqlDataReader["Technical" + index.ToString() + "Diagnosis7"]?.ToString() + ",";
                            }
                            else if (index == 2)
                            {
                                diagnosis2 = diagnosis2 + sqlDataReader["Technical" + index.ToString() + "Diagnosis0"]?.ToString() + ",";
                                diagnosis2 = diagnosis2 + sqlDataReader["Technical" + index.ToString() + "Diagnosis1"]?.ToString() + ",";
                                diagnosis2 = diagnosis2 + sqlDataReader["Technical" + index.ToString() + "Diagnosis2"]?.ToString() + ",";
                                diagnosis2 = diagnosis2 + sqlDataReader["Technical" + index.ToString() + "Diagnosis3"]?.ToString() + ",";
                                diagnosis2 = diagnosis2 + sqlDataReader["Technical" + index.ToString() + "Diagnosis4"]?.ToString() + ",";
                                diagnosis2 = diagnosis2 + sqlDataReader["Technical" + index.ToString() + "Diagnosis5"]?.ToString() + ",";
                                diagnosis2 = diagnosis2 + sqlDataReader["Technical" + index.ToString() + "Diagnosis6"]?.ToString() + ",";
                                diagnosis2 = diagnosis2 + sqlDataReader["Technical" + index.ToString() + "Diagnosis7"]?.ToString() + ",";
                            }
                        }
                        maneuvering0 = sqlDataReader["Maneuvering0"].ToString();
                        maneuvering1 = sqlDataReader["Maneuvering1"].ToString();
                        maneuvering2 = sqlDataReader["Maneuvering2"].ToString();
                        maneuvering3 = sqlDataReader["Maneuvering3"].ToString();
                        maneuvering4 = sqlDataReader["Maneuvering4"].ToString();
                        maneuvering5 = sqlDataReader["Maneuvering5"].ToString();
                        maneuvering6 = sqlDataReader["Maneuvering6"].ToString();
                        maneuvering7 = sqlDataReader["Maneuvering7"].ToString();
                        maneuvering8 = sqlDataReader["Maneuvering8"].ToString();
                        maneuvering9 = sqlDataReader["Maneuvering9"].ToString();
                        maneuvering10 = sqlDataReader["Maneuvering10"].ToString();
                        maneuvering11 = sqlDataReader["Maneuvering11"].ToString();
                        codeCausing0 = sqlDataReader["CodeCausingAccident0"].ToString();
                        codeCausing1 = sqlDataReader["CodeCausingAccident1"].ToString();
                        codeCausing2 = sqlDataReader["CodeCausingAccident2"].ToString();
                        codeCausing3 = sqlDataReader["CodeCausingAccident3"].ToString();
                        codeCausing4 = sqlDataReader["CodeCausingAccident4"].ToString();
                        codeCausing5 = sqlDataReader["CodeCausingAccident5"].ToString();
                        automobilePie = sqlDataReader["Automobile"].ToString();
                        vehicleType = sqlDataReader["VehicleType"].ToString();
                        countIsOrNotLocal = sqlDataReader["CountIsOrNotLocal"].ToString();
                    }
                    connection.Close();
                }
            }
        }

        public void SearchInFirstViewChartAccidentInfo(
          long? createById,
          string status,
          string dateOfAccident,
          string dateOfAccidentEnd,
          string crashType,
          string serial,
          int? provinceId,
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
          bool allAccident,
          int? cityId,
          bool? inNativeArea,
          bool? isHoliday,
          string collisionChild1,
          string collisionChild2,
          int? axisId,
          bool? isNotLocalDriver,
          out string CollisionOfTwo,
          out string TypeOfCollision,
          out string CollisionOfOne,
          out string OtherTypeOfCollision)
        {
            CollisionOfTwo = CollisionOfOne = TypeOfCollision = OtherTypeOfCollision = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_ChartFirstView_AccidentInfo", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                    sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                    sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                    sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                    sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                    sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                    sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                    sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                    sqlCommand.Parameters.AddWithValue("@DayOfWeek", (object)getDays);
                    sqlCommand.Parameters.AddWithValue("@Month", (object)month);
                    sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                    sqlCommand.Parameters.AddWithValue("@LightingStatus", (object)lightingStatus);
                    sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                    sqlCommand.Parameters.AddWithValue("@CarriageWayDirection", (object)carriageWayDirection);
                    sqlCommand.Parameters.AddWithValue("@TypeOfWay", (object)typeOfWay);
                    sqlCommand.Parameters.AddWithValue("@CarCrashLocation", (object)carCrashLocation);
                    sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                    sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                    sqlCommand.Parameters.AddWithValue("@FromAgeDriver", (object)fromAgeDriver);
                    sqlCommand.Parameters.AddWithValue("@ToAgeDriver", (object)toAgeDriver);
                    sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                    sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                    sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                    sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                    sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                    sqlCommand.Parameters.AddWithValue("@AxisId", (object)axisId);
                    sqlCommand.Parameters.AddWithValue("@IsNotLocal", (object)isNotLocalDriver);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        CollisionOfTwo = sqlDataReader[nameof(CollisionOfTwo)].ToString();
                        TypeOfCollision = sqlDataReader[nameof(TypeOfCollision)].ToString();
                        CollisionOfOne = sqlDataReader[nameof(CollisionOfOne)].ToString();
                        OtherTypeOfCollision = sqlDataReader[nameof(OtherTypeOfCollision)].ToString();
                    }
                    connection.Close();
                }
            }
        }

        public void SearchInFirstViewChartUser(
          long? createById,
          string status,
          string dateOfAccident,
          string dateOfAccidentEnd,
          string crashType,
          string serial,
          int? provinceId,
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
          bool allAccident,
          int? cityId,
          bool? inNativeArea,
          bool? isHoliday,
          string collisionChild1,
          string collisionChild2,
          int? axisId,
          bool? isNotLocalDriver,
          out string peapleInAccident,
          out string pedestriansSituation,
          out string validityDriver0,
          out string validityDriver1,
          out string validityDriver2,
          out string validityDriver3,
          out string useBeltsHelmets0InjuredDead0,
          out string useBeltsHelmets0InjuredDead1,
          out string useBeltsHelmets1InjuredDead0,
          out string useBeltsHelmets1InjuredDead1,
          out string useBeltsHelmets2InjuredDead0,
          out string useBeltsHelmets2InjuredDead1,
          out string useBeltsHelmets3InjuredDead0,
          out string useBeltsHelmets3InjuredDead1,
          out string sexulityInAccidentMan,
          out string sexulityInAccidentWoman,
          out string ageInAccident0,
          out string ageInAccident1,
          out string ageInAccident2,
          out string ageInAccident3,
          out string ageInAccident4,
          out string ageInAccident5)
        {
            peapleInAccident = pedestriansSituation = validityDriver0 = validityDriver1 = validityDriver2 = validityDriver3 = "";
            useBeltsHelmets0InjuredDead0 = useBeltsHelmets0InjuredDead1 = useBeltsHelmets1InjuredDead0 = useBeltsHelmets1InjuredDead1 = useBeltsHelmets2InjuredDead0 = useBeltsHelmets2InjuredDead1 = useBeltsHelmets3InjuredDead0 = useBeltsHelmets3InjuredDead1 = "";
            ageInAccident0 = ageInAccident1 = ageInAccident2 = ageInAccident3 = ageInAccident4 = ageInAccident5 = "";
            sexulityInAccidentMan = sexulityInAccidentWoman = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_ChartFirstView_User", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                    sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                    sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                    sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                    sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                    sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                    sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                    sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                    sqlCommand.Parameters.AddWithValue("@DayOfWeek", (object)getDays);
                    sqlCommand.Parameters.AddWithValue("@Month", (object)month);
                    sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                    sqlCommand.Parameters.AddWithValue("@LightingStatus", (object)lightingStatus);
                    sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                    sqlCommand.Parameters.AddWithValue("@CarriageWayDirection", (object)carriageWayDirection);
                    sqlCommand.Parameters.AddWithValue("@TypeOfWay", (object)typeOfWay);
                    sqlCommand.Parameters.AddWithValue("@CarCrashLocation", (object)carCrashLocation);
                    sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                    sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                    sqlCommand.Parameters.AddWithValue("@FromAgeDriver", (object)fromAgeDriver);
                    sqlCommand.Parameters.AddWithValue("@ToAgeDriver", (object)toAgeDriver);
                    sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                    sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                    sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                    sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                    sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                    sqlCommand.Parameters.AddWithValue("@AxisId", (object)axisId);
                    sqlCommand.Parameters.AddWithValue("@IsNotLocal", (object)isNotLocalDriver);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        peapleInAccident = sqlDataReader["PeapleInAccident"].ToString();
                        pedestriansSituation = sqlDataReader["PedestriansSituation"].ToString();
                        validityDriver0 = sqlDataReader["ValidityDriver0"].ToString();
                        validityDriver1 = sqlDataReader["ValidityDriver1"].ToString();
                        validityDriver2 = sqlDataReader["ValidityDriver2"].ToString();
                        validityDriver3 = sqlDataReader["ValidityDriver3"].ToString();
                        useBeltsHelmets0InjuredDead0 = sqlDataReader["UseBeltsHelmets0InjuredDead0"].ToString();
                        useBeltsHelmets0InjuredDead1 = sqlDataReader["UseBeltsHelmets0InjuredDead1"].ToString();
                        useBeltsHelmets1InjuredDead0 = sqlDataReader["UseBeltsHelmets1InjuredDead0"].ToString();
                        useBeltsHelmets1InjuredDead1 = sqlDataReader["UseBeltsHelmets1InjuredDead1"].ToString();
                        useBeltsHelmets2InjuredDead0 = sqlDataReader["UseBeltsHelmets2InjuredDead0"].ToString();
                        useBeltsHelmets2InjuredDead1 = sqlDataReader["UseBeltsHelmets2InjuredDead1"].ToString();
                        useBeltsHelmets3InjuredDead0 = sqlDataReader["UseBeltsHelmets3InjuredDead0"].ToString();
                        useBeltsHelmets3InjuredDead1 = sqlDataReader["UseBeltsHelmets3InjuredDead1"].ToString();
                        sexulityInAccidentMan = sqlDataReader["SexulityInAccidentMan"].ToString();
                        sexulityInAccidentWoman = sqlDataReader["SexulityInAccidentWoman"].ToString();
                        ageInAccident0 = sqlDataReader["AgeInAccident0"].ToString();
                        ageInAccident1 = sqlDataReader["AgeInAccident1"].ToString();
                        ageInAccident2 = sqlDataReader["AgeInAccident2"].ToString();
                        ageInAccident3 = sqlDataReader["AgeInAccident3"].ToString();
                        ageInAccident4 = sqlDataReader["AgeInAccident4"].ToString();
                        ageInAccident5 = sqlDataReader["AgeInAccident5"].ToString();
                    }
                    connection.Close();
                }
            }
        }

        public void SearchInTimeComparison(
          long? createById,
          string sp,
          string type,
          string status,
          string dateOfAccident,
          string dateOfAccidentEnd,
          string crashType,
          string serial,
          int? provinceId,
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
          bool allAccident,
          int? cityId,
          bool? inNativeArea,
          bool? isHoliday,
          string collisionChild1,
          string collisionChild2,
          int? axisId,
          bool? isNotLocalDriver,
          out string firstYear,
          out string secondYear,
          out string thirdYear,
          out string fourthYear,
          out string fifthYear,
          out string yearList)
        {
            firstYear = secondYear = thirdYear = fourthYear = fifthYear = yearList = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                try
                {
                    if (crashType != "جرحی وفوتی")
                     {
                        using (SqlCommand sqlCommand = new SqlCommand(sp, connection))
                        {
                            sqlCommand.CommandType = CommandType.StoredProcedure;
                            sqlCommand.Parameters.AddWithValue("@Type", (object)type);
                            sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                            sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                            sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                            sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                            sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                            sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                            sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                            sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                            sqlCommand.Parameters.AddWithValue("@DayOfWeek", (object)getDays);
                            sqlCommand.Parameters.AddWithValue("@Month", (object)month);
                            sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                            sqlCommand.Parameters.AddWithValue("@LightingStatus", (object)lightingStatus);
                            sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                            sqlCommand.Parameters.AddWithValue("@CarriageWayDirection", (object)carriageWayDirection);
                            sqlCommand.Parameters.AddWithValue("@TypeOfWay", (object)typeOfWay);
                            sqlCommand.Parameters.AddWithValue("@CarCrashLocation", (object)carCrashLocation);
                            sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                            sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                            sqlCommand.Parameters.AddWithValue("@FromAgeDriver", (object)fromAgeDriver);
                            sqlCommand.Parameters.AddWithValue("@ToAgeDriver", (object)toAgeDriver);
                            sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                            sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                            sqlCommand.Parameters.AddWithValue("@IsHoliday", null);
                            sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                            sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                            sqlCommand.Parameters.AddWithValue("@AxisId", (object)10015);
                            sqlCommand.Parameters.AddWithValue("@IsNotLocal", (object)isNotLocalDriver);

                            connection.Open();

                            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                            if (type != "Pedestrian60" && type != "Motor18" && type != "NoCertification" && type != "SafetyBelt" && type != "Helmet" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["FirstYear"].ToString();
                                secondYear = sqlDataReader["SecondYear"].ToString();
                                thirdYear = sqlDataReader["ThirdYear"].ToString();
                                fourthYear = sqlDataReader["FourthYear"].ToString();
                                fifthYear = sqlDataReader["FifthYear"].ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "Pedestrian60" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["PedestrianFarvardin1"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin1All"]?.ToString() + "," + sqlDataReader["PedestrianOrdibehesht1"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht1All"]?.ToString() + "," + sqlDataReader["PedestrianKhordad1"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad1All"]?.ToString() + "," + sqlDataReader["PedestrianTir1"]?.ToString() + "|" + sqlDataReader["PedestrianTir1All"]?.ToString() + "," + sqlDataReader["PedestrianMordad1"]?.ToString() + "|" + sqlDataReader["PedestrianMordad1All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar1"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar1All"]?.ToString() + "," + sqlDataReader["PedestrianMehr1"]?.ToString() + "|" + sqlDataReader["PedestrianMehr1All"]?.ToString() + "," + sqlDataReader["PedestrianAban1"]?.ToString() + "|" + sqlDataReader["PedestrianAban1All"]?.ToString() + "," + sqlDataReader["PedestrianAzar1"]?.ToString() + "|" + sqlDataReader["PedestrianAzar1All"]?.ToString() + "," + sqlDataReader["PedestrianDay1"]?.ToString() + "|" + sqlDataReader["PedestrianDay1All"]?.ToString() + "," + sqlDataReader["PedestrianBahman1"]?.ToString() + "|" + sqlDataReader["PedestrianBahman1All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand1"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["PedestrianFarvardin2"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin2All"]?.ToString() + "," + sqlDataReader["PedestrianOrdibehesht2"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht2All"]?.ToString() + "," + sqlDataReader["PedestrianKhordad2"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad2All"]?.ToString() + "," + sqlDataReader["PedestrianTir2"]?.ToString() + "|" + sqlDataReader["PedestrianTir2All"]?.ToString() + "," + sqlDataReader["PedestrianMordad2"]?.ToString() + "|" + sqlDataReader["PedestrianMordad2All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar2"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar2All"]?.ToString() + "," + sqlDataReader["PedestrianMehr2"]?.ToString() + "|" + sqlDataReader["PedestrianMehr2All"]?.ToString() + "," + sqlDataReader["PedestrianAban2"]?.ToString() + "|" + sqlDataReader["PedestrianAban2All"]?.ToString() + "," + sqlDataReader["PedestrianAzar2"]?.ToString() + "|" + sqlDataReader["PedestrianAzar2All"]?.ToString() + "," + sqlDataReader["PedestrianDay2"]?.ToString() + "|" + sqlDataReader["PedestrianDay2All"]?.ToString() + "," + sqlDataReader["PedestrianBahman2"]?.ToString() + "|" + sqlDataReader["PedestrianBahman2All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand2"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["PedestrianFarvardin3"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin3All"]?.ToString() + "," + sqlDataReader["PedestrianOrdibehesht3"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht3All"]?.ToString() + "," + sqlDataReader["PedestrianKhordad3"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad3All"]?.ToString() + "," + sqlDataReader["PedestrianTir3"]?.ToString() + "|" + sqlDataReader["PedestrianTir3All"]?.ToString() + "," + sqlDataReader["PedestrianMordad3"]?.ToString() + "|" + sqlDataReader["PedestrianMordad3All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar3"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar3All"]?.ToString() + "," + sqlDataReader["PedestrianMehr3"]?.ToString() + "|" + sqlDataReader["PedestrianMehr3All"]?.ToString() + "," + sqlDataReader["PedestrianAban3"]?.ToString() + "|" + sqlDataReader["PedestrianAban3All"]?.ToString() + "," + sqlDataReader["PedestrianAzar3"]?.ToString() + "|" + sqlDataReader["PedestrianAzar3All"]?.ToString() + "," + sqlDataReader["PedestrianDay3"]?.ToString() + "|" + sqlDataReader["PedestrianDay3All"]?.ToString() + "," + sqlDataReader["PedestrianBahman3"]?.ToString() + "|" + sqlDataReader["PedestrianBahman3All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand3"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["PedestrianFarvardin4"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin4All"]?.ToString() + "," + sqlDataReader["PedestrianOrdibehesht4"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht4All"]?.ToString() + "," + sqlDataReader["PedestrianKhordad4"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad4All"]?.ToString() + "," + sqlDataReader["PedestrianTir4"]?.ToString() + "|" + sqlDataReader["PedestrianTir4All"]?.ToString() + "," + sqlDataReader["PedestrianMordad4"]?.ToString() + "|" + sqlDataReader["PedestrianMordad4All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar4"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar4All"]?.ToString() + "," + sqlDataReader["PedestrianMehr4"]?.ToString() + "|" + sqlDataReader["PedestrianMehr4All"]?.ToString() + "," + sqlDataReader["PedestrianAban4"]?.ToString() + "|" + sqlDataReader["PedestrianAban4All"]?.ToString() + "," + sqlDataReader["PedestrianAzar4"]?.ToString() + "|" + sqlDataReader["PedestrianAzar4All"]?.ToString() + "," + sqlDataReader["PedestrianDay4"]?.ToString() + "|" + sqlDataReader["PedestrianDay4All"]?.ToString() + "," + sqlDataReader["PedestrianBahman4"]?.ToString() + "|" + sqlDataReader["PedestrianBahman4All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand4"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["PedestrianFarvardin5"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin5All"]?.ToString() + sqlDataReader["PedestrianOrdibehesht5"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht5All"]?.ToString() + sqlDataReader["PedestrianKhordad5"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad5All"]?.ToString() + sqlDataReader["PedestrianTir5"]?.ToString() + "|" + sqlDataReader["PedestrianTir5All"]?.ToString() + sqlDataReader["PedestrianMordad5"]?.ToString() + "|" + sqlDataReader["PedestrianMordad5All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar5"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar5All"]?.ToString() + "," + sqlDataReader["PedestrianMehr5"]?.ToString() + "|" + sqlDataReader["PedestrianMehr5All"]?.ToString() + "," + sqlDataReader["PedestrianAban5"]?.ToString() + "|" + sqlDataReader["PedestrianAban5All"]?.ToString() + "," + sqlDataReader["PedestrianAzar5"]?.ToString() + "|" + sqlDataReader["PedestrianAzar5All"]?.ToString() + "," + sqlDataReader["PedestrianDay5"]?.ToString() + "|" + sqlDataReader["PedestrianDay5All"]?.ToString() + "," + sqlDataReader["PedestrianBahman5"]?.ToString() + "|" + sqlDataReader["PedestrianBahman5All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand5"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "Motor18" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["MotorFarvardin1"]?.ToString() + "|" + sqlDataReader["MotorFarvardin1All"]?.ToString() + "," + sqlDataReader["MotorOrdibehesht1"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht1All"]?.ToString() + "," + sqlDataReader["MotorKhordad1"]?.ToString() + "|" + sqlDataReader["MotorKhordad1All"]?.ToString() + "," + sqlDataReader["MotorTir1"]?.ToString() + "|" + sqlDataReader["MotorTir1All"]?.ToString() + "," + sqlDataReader["MotorMordad1"]?.ToString() + "|" + sqlDataReader["MotorMordad1All"]?.ToString() + "," + sqlDataReader["MotorShahrivar1"]?.ToString() + "|" + sqlDataReader["MotorShahrivar1All"]?.ToString() + "," + sqlDataReader["MotorMehr1"]?.ToString() + "|" + sqlDataReader["MotorMehr1All"]?.ToString() + "," + sqlDataReader["MotorAban1"]?.ToString() + "|" + sqlDataReader["MotorAban1All"]?.ToString() + "," + sqlDataReader["MotorAzar1"]?.ToString() + "|" + sqlDataReader["MotorAzar1All"]?.ToString() + "," + sqlDataReader["MotorDay1"]?.ToString() + "|" + sqlDataReader["MotorDay1All"]?.ToString() + "," + sqlDataReader["MotorBahman1"]?.ToString() + "|" + sqlDataReader["MotorBahman1All"]?.ToString() + "," + sqlDataReader["MotorEsfand1"]?.ToString() + "|" + sqlDataReader["MotorEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["MotorFarvardin2"]?.ToString() + "|" + sqlDataReader["MotorFarvardin2All"]?.ToString() + "," + sqlDataReader["MotorOrdibehesht2"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht2All"]?.ToString() + "," + sqlDataReader["MotorKhordad2"]?.ToString() + "|" + sqlDataReader["MotorKhordad2All"]?.ToString() + "," + sqlDataReader["MotorTir2"]?.ToString() + "|" + sqlDataReader["MotorTir2All"]?.ToString() + "," + sqlDataReader["MotorMordad2"]?.ToString() + "|" + sqlDataReader["MotorMordad2All"]?.ToString() + "," + sqlDataReader["MotorShahrivar2"]?.ToString() + "|" + sqlDataReader["MotorShahrivar2All"]?.ToString() + "," + sqlDataReader["MotorMehr2"]?.ToString() + "|" + sqlDataReader["MotorMehr2All"]?.ToString() + "," + sqlDataReader["MotorAban2"]?.ToString() + "|" + sqlDataReader["MotorAban2All"]?.ToString() + "," + sqlDataReader["MotorAzar2"]?.ToString() + "|" + sqlDataReader["MotorAzar2All"]?.ToString() + "," + sqlDataReader["MotorDay2"]?.ToString() + "|" + sqlDataReader["MotorDay2All"]?.ToString() + "," + sqlDataReader["MotorBahman2"]?.ToString() + "|" + sqlDataReader["MotorBahman2All"]?.ToString() + "," + sqlDataReader["MotorEsfand2"]?.ToString() + "|" + sqlDataReader["MotorEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["MotorFarvardin3"]?.ToString() + "|" + sqlDataReader["MotorFarvardin3All"]?.ToString() + "," + sqlDataReader["MotorOrdibehesht3"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht3All"]?.ToString() + "," + sqlDataReader["MotorKhordad3"]?.ToString() + "|" + sqlDataReader["MotorKhordad3All"]?.ToString() + "," + sqlDataReader["MotorTir3"]?.ToString() + "|" + sqlDataReader["MotorTir3All"]?.ToString() + "," + sqlDataReader["MotorMordad3"]?.ToString() + "|" + sqlDataReader["MotorMordad3All"]?.ToString() + "," + sqlDataReader["MotorShahrivar3"]?.ToString() + "|" + sqlDataReader["MotorShahrivar3All"]?.ToString() + "," + sqlDataReader["MotorMehr3"]?.ToString() + "|" + sqlDataReader["MotorMehr3All"]?.ToString() + "," + sqlDataReader["MotorAban3"]?.ToString() + "|" + sqlDataReader["MotorAban3All"]?.ToString() + "," + sqlDataReader["MotorAzar3"]?.ToString() + "|" + sqlDataReader["MotorAzar3All"]?.ToString() + "," + sqlDataReader["MotorDay3"]?.ToString() + "|" + sqlDataReader["MotorDay3All"]?.ToString() + "," + sqlDataReader["MotorBahman3"]?.ToString() + "|" + sqlDataReader["MotorBahman3All"]?.ToString() + "," + sqlDataReader["MotorEsfand3"]?.ToString() + "|" + sqlDataReader["MotorEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["MotorFarvardin4"]?.ToString() + "|" + sqlDataReader["MotorFarvardin4All"]?.ToString() + "," + sqlDataReader["MotorOrdibehesht4"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht4All"]?.ToString() + "," + sqlDataReader["MotorKhordad4"]?.ToString() + "|" + sqlDataReader["MotorKhordad4All"]?.ToString() + "," + sqlDataReader["MotorTir4"]?.ToString() + "|" + sqlDataReader["MotorTir4All"]?.ToString() + "," + sqlDataReader["MotorMordad4"]?.ToString() + "|" + sqlDataReader["MotorMordad4All"]?.ToString() + "," + sqlDataReader["MotorShahrivar4"]?.ToString() + "|" + sqlDataReader["MotorShahrivar4All"]?.ToString() + "," + sqlDataReader["MotorMehr4"]?.ToString() + "|" + sqlDataReader["MotorMehr4All"]?.ToString() + "," + sqlDataReader["MotorAban4"]?.ToString() + "|" + sqlDataReader["MotorAban4All"]?.ToString() + "," + sqlDataReader["MotorAzar4"]?.ToString() + "|" + sqlDataReader["MotorAzar4All"]?.ToString() + "," + sqlDataReader["MotorDay4"]?.ToString() + "|" + sqlDataReader["MotorDay4All"]?.ToString() + "," + sqlDataReader["MotorBahman4"]?.ToString() + "|" + sqlDataReader["MotorBahman4All"]?.ToString() + "," + sqlDataReader["MotorEsfand4"]?.ToString() + "|" + sqlDataReader["MotorEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["MotorFarvardin5"]?.ToString() + "|" + sqlDataReader["MotorFarvardin5All"]?.ToString() + sqlDataReader["MotorOrdibehesht5"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht5All"]?.ToString() + sqlDataReader["MotorKhordad5"]?.ToString() + "|" + sqlDataReader["MotorKhordad5All"]?.ToString() + sqlDataReader["MotorTir5"]?.ToString() + "|" + sqlDataReader["MotorTir5All"]?.ToString() + sqlDataReader["MotorMordad5"]?.ToString() + "|" + sqlDataReader["MotorMordad5All"]?.ToString() + "," + sqlDataReader["MotorShahrivar5"]?.ToString() + "|" + sqlDataReader["MotorShahrivar5All"]?.ToString() + "," + sqlDataReader["MotorMehr5"]?.ToString() + "|" + sqlDataReader["MotorMehr5All"]?.ToString() + "," + sqlDataReader["MotorAban5"]?.ToString() + "|" + sqlDataReader["MotorAban5All"]?.ToString() + "," + sqlDataReader["MotorAzar5"]?.ToString() + "|" + sqlDataReader["MotorAzar5All"]?.ToString() + "," + sqlDataReader["MotorDay5"]?.ToString() + "|" + sqlDataReader["MotorDay5All"]?.ToString() + "," + sqlDataReader["MotorBahman5"]?.ToString() + "|" + sqlDataReader["MotorBahman5All"]?.ToString() + "," + sqlDataReader["MotorEsfand5"]?.ToString() + "|" + sqlDataReader["MotorEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "NoCertification" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["NoCertificationFarvardin1"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin1All"]?.ToString() + "," + sqlDataReader["NoCertificationOrdibehesht1"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht1All"]?.ToString() + "," + sqlDataReader["NoCertificationKhordad1"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad1All"]?.ToString() + "," + sqlDataReader["NoCertificationTir1"]?.ToString() + "|" + sqlDataReader["NoCertificationTir1All"]?.ToString() + "," + sqlDataReader["NoCertificationMordad1"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad1All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar1"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar1All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr1"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr1All"]?.ToString() + "," + sqlDataReader["NoCertificationAban1"]?.ToString() + "|" + sqlDataReader["NoCertificationAban1All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar1"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar1All"]?.ToString() + "," + sqlDataReader["NoCertificationDay1"]?.ToString() + "|" + sqlDataReader["NoCertificationDay1All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman1"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman1All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand1"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["NoCertificationFarvardin2"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin2All"]?.ToString() + "," + sqlDataReader["NoCertificationOrdibehesht2"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht2All"]?.ToString() + "," + sqlDataReader["NoCertificationKhordad2"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad2All"]?.ToString() + "," + sqlDataReader["NoCertificationTir2"]?.ToString() + "|" + sqlDataReader["NoCertificationTir2All"]?.ToString() + "," + sqlDataReader["NoCertificationMordad2"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad2All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar2"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar2All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr2"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr2All"]?.ToString() + "," + sqlDataReader["NoCertificationAban2"]?.ToString() + "|" + sqlDataReader["NoCertificationAban2All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar2"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar2All"]?.ToString() + "," + sqlDataReader["NoCertificationDay2"]?.ToString() + "|" + sqlDataReader["NoCertificationDay2All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman2"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman2All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand2"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["NoCertificationFarvardin3"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin3All"]?.ToString() + "," + sqlDataReader["NoCertificationOrdibehesht3"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht3All"]?.ToString() + "," + sqlDataReader["NoCertificationKhordad3"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad3All"]?.ToString() + "," + sqlDataReader["NoCertificationTir3"]?.ToString() + "|" + sqlDataReader["NoCertificationTir3All"]?.ToString() + "," + sqlDataReader["NoCertificationMordad3"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad3All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar3"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar3All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr3"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr3All"]?.ToString() + "," + sqlDataReader["NoCertificationAban3"]?.ToString() + "|" + sqlDataReader["NoCertificationAban3All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar3"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar3All"]?.ToString() + "," + sqlDataReader["NoCertificationDay3"]?.ToString() + "|" + sqlDataReader["NoCertificationDay3All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman3"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman3All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand3"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["NoCertificationFarvardin4"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin4All"]?.ToString() + "," + sqlDataReader["NoCertificationOrdibehesht4"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht4All"]?.ToString() + "," + sqlDataReader["NoCertificationKhordad4"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad4All"]?.ToString() + "," + sqlDataReader["NoCertificationTir4"]?.ToString() + "|" + sqlDataReader["NoCertificationTir4All"]?.ToString() + "," + sqlDataReader["NoCertificationMordad4"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad4All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar4"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar4All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr4"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr4All"]?.ToString() + "," + sqlDataReader["NoCertificationAban4"]?.ToString() + "|" + sqlDataReader["NoCertificationAban4All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar4"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar4All"]?.ToString() + "," + sqlDataReader["NoCertificationDay4"]?.ToString() + "|" + sqlDataReader["NoCertificationDay4All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman4"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman4All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand4"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["NoCertificationFarvardin5"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin5All"]?.ToString() + sqlDataReader["NoCertificationOrdibehesht5"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht5All"]?.ToString() + sqlDataReader["NoCertificationKhordad5"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad5All"]?.ToString() + sqlDataReader["NoCertificationTir5"]?.ToString() + "|" + sqlDataReader["NoCertificationTir5All"]?.ToString() + sqlDataReader["NoCertificationMordad5"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad5All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar5"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar5All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr5"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr5All"]?.ToString() + "," + sqlDataReader["NoCertificationAban5"]?.ToString() + "|" + sqlDataReader["NoCertificationAban5All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar5"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar5All"]?.ToString() + "," + sqlDataReader["NoCertificationDay5"]?.ToString() + "|" + sqlDataReader["NoCertificationDay5All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman5"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman5All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand5"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "SafetyBelt" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["SafetyBeltFarvardin1"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin1All"]?.ToString() + "," + sqlDataReader["SafetyBeltOrdibehesht1"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht1All"]?.ToString() + "," + sqlDataReader["SafetyBeltKhordad1"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad1All"]?.ToString() + "," + sqlDataReader["SafetyBeltTir1"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir1All"]?.ToString() + "," + sqlDataReader["SafetyBeltMordad1"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad1All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar1"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar1All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr1"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr1All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban1"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban1All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar1"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar1All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay1"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay1All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman1"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman1All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand1"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["SafetyBeltFarvardin2"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin2All"]?.ToString() + "," + sqlDataReader["SafetyBeltOrdibehesht2"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht2All"]?.ToString() + "," + sqlDataReader["SafetyBeltKhordad2"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad2All"]?.ToString() + "," + sqlDataReader["SafetyBeltTir2"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir2All"]?.ToString() + "," + sqlDataReader["SafetyBeltMordad2"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad2All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar2"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar2All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr2"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr2All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban2"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban2All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar2"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar2All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay2"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay2All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman2"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman2All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand2"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["SafetyBeltFarvardin3"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin3All"]?.ToString() + "," + sqlDataReader["SafetyBeltOrdibehesht3"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht3All"]?.ToString() + "," + sqlDataReader["SafetyBeltKhordad3"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad3All"]?.ToString() + "," + sqlDataReader["SafetyBeltTir3"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir3All"]?.ToString() + "," + sqlDataReader["SafetyBeltMordad3"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad3All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar3"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar3All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr3"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr3All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban3"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban3All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar3"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar3All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay3"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay3All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman3"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman3All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand3"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["SafetyBeltFarvardin4"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin4All"]?.ToString() + "," + sqlDataReader["SafetyBeltOrdibehesht4"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht4All"]?.ToString() + "," + sqlDataReader["SafetyBeltKhordad4"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad4All"]?.ToString() + "," + sqlDataReader["SafetyBeltTir4"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir4All"]?.ToString() + "," + sqlDataReader["SafetyBeltMordad4"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad4All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar4"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar4All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr4"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr4All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban4"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban4All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar4"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar4All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay4"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay4All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman4"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman4All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand4"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["SafetyBeltFarvardin5"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin5All"]?.ToString() + sqlDataReader["SafetyBeltOrdibehesht5"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht5All"]?.ToString() + sqlDataReader["SafetyBeltKhordad5"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad5All"]?.ToString() + sqlDataReader["SafetyBeltTir5"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir5All"]?.ToString() + sqlDataReader["SafetyBeltMordad5"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad5All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar5"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar5All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr5"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr5All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban5"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban5All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar5"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar5All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay5"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay5All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman5"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman5All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand5"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "Helmet" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["HelmetFarvardin1"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin1All"]?.ToString() + "," + sqlDataReader["HelmetOrdibehesht1"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht1All"]?.ToString() + "," + sqlDataReader["HelmetKhordad1"]?.ToString() + "|" + sqlDataReader["HelmetKhordad1All"]?.ToString() + "," + sqlDataReader["HelmetTir1"]?.ToString() + "|" + sqlDataReader["HelmetTir1All"]?.ToString() + "," + sqlDataReader["HelmetMordad1"]?.ToString() + "|" + sqlDataReader["HelmetMordad1All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar1"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar1All"]?.ToString() + "," + sqlDataReader["HelmetMehr1"]?.ToString() + "|" + sqlDataReader["HelmetMehr1All"]?.ToString() + "," + sqlDataReader["HelmetAban1"]?.ToString() + "|" + sqlDataReader["HelmetAban1All"]?.ToString() + "," + sqlDataReader["HelmetAzar1"]?.ToString() + "|" + sqlDataReader["HelmetAzar1All"]?.ToString() + "," + sqlDataReader["HelmetDay1"]?.ToString() + "|" + sqlDataReader["HelmetDay1All"]?.ToString() + "," + sqlDataReader["HelmetBahman1"]?.ToString() + "|" + sqlDataReader["HelmetBahman1All"]?.ToString() + "," + sqlDataReader["HelmetEsfand1"]?.ToString() + "|" + sqlDataReader["HelmetEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["HelmetFarvardin2"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin2All"]?.ToString() + "," + sqlDataReader["HelmetOrdibehesht2"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht2All"]?.ToString() + "," + sqlDataReader["HelmetKhordad2"]?.ToString() + "|" + sqlDataReader["HelmetKhordad2All"]?.ToString() + "," + sqlDataReader["HelmetTir2"]?.ToString() + "|" + sqlDataReader["HelmetTir2All"]?.ToString() + "," + sqlDataReader["HelmetMordad2"]?.ToString() + "|" + sqlDataReader["HelmetMordad2All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar2"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar2All"]?.ToString() + "," + sqlDataReader["HelmetMehr2"]?.ToString() + "|" + sqlDataReader["HelmetMehr2All"]?.ToString() + "," + sqlDataReader["HelmetAban2"]?.ToString() + "|" + sqlDataReader["HelmetAban2All"]?.ToString() + "," + sqlDataReader["HelmetAzar2"]?.ToString() + "|" + sqlDataReader["HelmetAzar2All"]?.ToString() + "," + sqlDataReader["HelmetDay2"]?.ToString() + "|" + sqlDataReader["HelmetDay2All"]?.ToString() + "," + sqlDataReader["HelmetBahman2"]?.ToString() + "|" + sqlDataReader["HelmetBahman2All"]?.ToString() + "," + sqlDataReader["HelmetEsfand2"]?.ToString() + "|" + sqlDataReader["HelmetEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["HelmetFarvardin3"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin3All"]?.ToString() + "," + sqlDataReader["HelmetOrdibehesht3"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht3All"]?.ToString() + "," + sqlDataReader["HelmetKhordad3"]?.ToString() + "|" + sqlDataReader["HelmetKhordad3All"]?.ToString() + "," + sqlDataReader["HelmetTir3"]?.ToString() + "|" + sqlDataReader["HelmetTir3All"]?.ToString() + "," + sqlDataReader["HelmetMordad3"]?.ToString() + "|" + sqlDataReader["HelmetMordad3All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar3"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar3All"]?.ToString() + "," + sqlDataReader["HelmetMehr3"]?.ToString() + "|" + sqlDataReader["HelmetMehr3All"]?.ToString() + "," + sqlDataReader["HelmetAban3"]?.ToString() + "|" + sqlDataReader["HelmetAban3All"]?.ToString() + "," + sqlDataReader["HelmetAzar3"]?.ToString() + "|" + sqlDataReader["HelmetAzar3All"]?.ToString() + "," + sqlDataReader["HelmetDay3"]?.ToString() + "|" + sqlDataReader["HelmetDay3All"]?.ToString() + "," + sqlDataReader["HelmetBahman3"]?.ToString() + "|" + sqlDataReader["HelmetBahman3All"]?.ToString() + "," + sqlDataReader["HelmetEsfand3"]?.ToString() + "|" + sqlDataReader["HelmetEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["HelmetFarvardin4"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin4All"]?.ToString() + "," + sqlDataReader["HelmetOrdibehesht4"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht4All"]?.ToString() + "," + sqlDataReader["HelmetKhordad4"]?.ToString() + "|" + sqlDataReader["HelmetKhordad4All"]?.ToString() + "," + sqlDataReader["HelmetTir4"]?.ToString() + "|" + sqlDataReader["HelmetTir4All"]?.ToString() + "," + sqlDataReader["HelmetMordad4"]?.ToString() + "|" + sqlDataReader["HelmetMordad4All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar4"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar4All"]?.ToString() + "," + sqlDataReader["HelmetMehr4"]?.ToString() + "|" + sqlDataReader["HelmetMehr4All"]?.ToString() + "," + sqlDataReader["HelmetAban4"]?.ToString() + "|" + sqlDataReader["HelmetAban4All"]?.ToString() + "," + sqlDataReader["HelmetAzar4"]?.ToString() + "|" + sqlDataReader["HelmetAzar4All"]?.ToString() + "," + sqlDataReader["HelmetDay4"]?.ToString() + "|" + sqlDataReader["HelmetDay4All"]?.ToString() + "," + sqlDataReader["HelmetBahman4"]?.ToString() + "|" + sqlDataReader["HelmetBahman4All"]?.ToString() + "," + sqlDataReader["HelmetEsfand4"]?.ToString() + "|" + sqlDataReader["HelmetEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["HelmetFarvardin5"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin5All"]?.ToString() + sqlDataReader["HelmetOrdibehesht5"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht5All"]?.ToString() + sqlDataReader["HelmetKhordad5"]?.ToString() + "|" + sqlDataReader["HelmetKhordad5All"]?.ToString() + sqlDataReader["HelmetTir5"]?.ToString() + "|" + sqlDataReader["HelmetTir5All"]?.ToString() + sqlDataReader["HelmetMordad5"]?.ToString() + "|" + sqlDataReader["HelmetMordad5All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar5"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar5All"]?.ToString() + "," + sqlDataReader["HelmetMehr5"]?.ToString() + "|" + sqlDataReader["HelmetMehr5All"]?.ToString() + "," + sqlDataReader["HelmetAban5"]?.ToString() + "|" + sqlDataReader["HelmetAban5All"]?.ToString() + "," + sqlDataReader["HelmetAzar5"]?.ToString() + "|" + sqlDataReader["HelmetAzar5All"]?.ToString() + "," + sqlDataReader["HelmetDay5"]?.ToString() + "|" + sqlDataReader["HelmetDay5All"]?.ToString() + "," + sqlDataReader["HelmetBahman5"]?.ToString() + "|" + sqlDataReader["HelmetBahman5All"]?.ToString() + "," + sqlDataReader["HelmetEsfand5"]?.ToString() + "|" + sqlDataReader["HelmetEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            connection.Close();
                        }
                    }
                    else
                    {
                        using (SqlCommand sqlCommand = new SqlCommand(sp, connection))
                        {
                            crashType = "جرحی";
                            sqlCommand.CommandType = CommandType.StoredProcedure;
                            sqlCommand.Parameters.AddWithValue("@Type", (object)type);
                            sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                            sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                            sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                            sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                            sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                            sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                            sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                            sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                            sqlCommand.Parameters.AddWithValue("@DayOfWeek", (object)getDays);
                            sqlCommand.Parameters.AddWithValue("@Month", (object)month);
                            sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                            sqlCommand.Parameters.AddWithValue("@LightingStatus", (object)lightingStatus);
                            sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                            sqlCommand.Parameters.AddWithValue("@CarriageWayDirection", (object)carriageWayDirection);
                            sqlCommand.Parameters.AddWithValue("@TypeOfWay", (object)typeOfWay);
                            sqlCommand.Parameters.AddWithValue("@CarCrashLocation", (object)carCrashLocation);
                            sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                            sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                            sqlCommand.Parameters.AddWithValue("@FromAgeDriver", (object)fromAgeDriver);
                            sqlCommand.Parameters.AddWithValue("@ToAgeDriver", (object)toAgeDriver);
                            sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                            sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                            sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                            sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                            sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                            sqlCommand.Parameters.AddWithValue("@AxisId", (object)10015);
                            sqlCommand.Parameters.AddWithValue("@IsNotLocal", (object)isNotLocalDriver);
                            connection.Open();
                            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                            if (type != "Pedestrian60" && type != "Motor18" && type != "NoCertification" && type != "SafetyBelt" && type != "Helmet" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["FirstYear"].ToString();
                                secondYear = sqlDataReader["SecondYear"].ToString();
                                thirdYear = sqlDataReader["ThirdYear"].ToString();
                                fourthYear = sqlDataReader["FourthYear"].ToString();
                                fifthYear = sqlDataReader["FifthYear"].ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "Pedestrian60" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["PedestrianFarvardin1"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin1All"]?.ToString() + "," + sqlDataReader["PedestrianOrdibehesht1"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht1All"]?.ToString() + "," + sqlDataReader["PedestrianKhordad1"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad1All"]?.ToString() + "," + sqlDataReader["PedestrianTir1"]?.ToString() + "|" + sqlDataReader["PedestrianTir1All"]?.ToString() + "," + sqlDataReader["PedestrianMordad1"]?.ToString() + "|" + sqlDataReader["PedestrianMordad1All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar1"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar1All"]?.ToString() + "," + sqlDataReader["PedestrianMehr1"]?.ToString() + "|" + sqlDataReader["PedestrianMehr1All"]?.ToString() + "," + sqlDataReader["PedestrianAban1"]?.ToString() + "|" + sqlDataReader["PedestrianAban1All"]?.ToString() + "," + sqlDataReader["PedestrianAzar1"]?.ToString() + "|" + sqlDataReader["PedestrianAzar1All"]?.ToString() + "," + sqlDataReader["PedestrianDay1"]?.ToString() + "|" + sqlDataReader["PedestrianDay1All"]?.ToString() + "," + sqlDataReader["PedestrianBahman1"]?.ToString() + "|" + sqlDataReader["PedestrianBahman1All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand1"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["PedestrianFarvardin2"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin2All"]?.ToString() + "," + sqlDataReader["PedestrianOrdibehesht2"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht2All"]?.ToString() + "," + sqlDataReader["PedestrianKhordad2"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad2All"]?.ToString() + "," + sqlDataReader["PedestrianTir2"]?.ToString() + "|" + sqlDataReader["PedestrianTir2All"]?.ToString() + "," + sqlDataReader["PedestrianMordad2"]?.ToString() + "|" + sqlDataReader["PedestrianMordad2All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar2"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar2All"]?.ToString() + "," + sqlDataReader["PedestrianMehr2"]?.ToString() + "|" + sqlDataReader["PedestrianMehr2All"]?.ToString() + "," + sqlDataReader["PedestrianAban2"]?.ToString() + "|" + sqlDataReader["PedestrianAban2All"]?.ToString() + "," + sqlDataReader["PedestrianAzar2"]?.ToString() + "|" + sqlDataReader["PedestrianAzar2All"]?.ToString() + "," + sqlDataReader["PedestrianDay2"]?.ToString() + "|" + sqlDataReader["PedestrianDay2All"]?.ToString() + "," + sqlDataReader["PedestrianBahman2"]?.ToString() + "|" + sqlDataReader["PedestrianBahman2All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand2"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["PedestrianFarvardin3"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin3All"]?.ToString() + "," + sqlDataReader["PedestrianOrdibehesht3"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht3All"]?.ToString() + "," + sqlDataReader["PedestrianKhordad3"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad3All"]?.ToString() + "," + sqlDataReader["PedestrianTir3"]?.ToString() + "|" + sqlDataReader["PedestrianTir3All"]?.ToString() + "," + sqlDataReader["PedestrianMordad3"]?.ToString() + "|" + sqlDataReader["PedestrianMordad3All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar3"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar3All"]?.ToString() + "," + sqlDataReader["PedestrianMehr3"]?.ToString() + "|" + sqlDataReader["PedestrianMehr3All"]?.ToString() + "," + sqlDataReader["PedestrianAban3"]?.ToString() + "|" + sqlDataReader["PedestrianAban3All"]?.ToString() + "," + sqlDataReader["PedestrianAzar3"]?.ToString() + "|" + sqlDataReader["PedestrianAzar3All"]?.ToString() + "," + sqlDataReader["PedestrianDay3"]?.ToString() + "|" + sqlDataReader["PedestrianDay3All"]?.ToString() + "," + sqlDataReader["PedestrianBahman3"]?.ToString() + "|" + sqlDataReader["PedestrianBahman3All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand3"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["PedestrianFarvardin4"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin4All"]?.ToString() + "," + sqlDataReader["PedestrianOrdibehesht4"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht4All"]?.ToString() + "," + sqlDataReader["PedestrianKhordad4"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad4All"]?.ToString() + "," + sqlDataReader["PedestrianTir4"]?.ToString() + "|" + sqlDataReader["PedestrianTir4All"]?.ToString() + "," + sqlDataReader["PedestrianMordad4"]?.ToString() + "|" + sqlDataReader["PedestrianMordad4All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar4"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar4All"]?.ToString() + "," + sqlDataReader["PedestrianMehr4"]?.ToString() + "|" + sqlDataReader["PedestrianMehr4All"]?.ToString() + "," + sqlDataReader["PedestrianAban4"]?.ToString() + "|" + sqlDataReader["PedestrianAban4All"]?.ToString() + "," + sqlDataReader["PedestrianAzar4"]?.ToString() + "|" + sqlDataReader["PedestrianAzar4All"]?.ToString() + "," + sqlDataReader["PedestrianDay4"]?.ToString() + "|" + sqlDataReader["PedestrianDay4All"]?.ToString() + "," + sqlDataReader["PedestrianBahman4"]?.ToString() + "|" + sqlDataReader["PedestrianBahman4All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand4"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["PedestrianFarvardin5"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin5All"]?.ToString() + sqlDataReader["PedestrianOrdibehesht5"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht5All"]?.ToString() + sqlDataReader["PedestrianKhordad5"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad5All"]?.ToString() + sqlDataReader["PedestrianTir5"]?.ToString() + "|" + sqlDataReader["PedestrianTir5All"]?.ToString() + sqlDataReader["PedestrianMordad5"]?.ToString() + "|" + sqlDataReader["PedestrianMordad5All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar5"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar5All"]?.ToString() + "," + sqlDataReader["PedestrianMehr5"]?.ToString() + "|" + sqlDataReader["PedestrianMehr5All"]?.ToString() + "," + sqlDataReader["PedestrianAban5"]?.ToString() + "|" + sqlDataReader["PedestrianAban5All"]?.ToString() + "," + sqlDataReader["PedestrianAzar5"]?.ToString() + "|" + sqlDataReader["PedestrianAzar5All"]?.ToString() + "," + sqlDataReader["PedestrianDay5"]?.ToString() + "|" + sqlDataReader["PedestrianDay5All"]?.ToString() + "," + sqlDataReader["PedestrianBahman5"]?.ToString() + "|" + sqlDataReader["PedestrianBahman5All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand5"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "Motor18" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["MotorFarvardin1"]?.ToString() + "|" + sqlDataReader["MotorFarvardin1All"]?.ToString() + "," + sqlDataReader["MotorOrdibehesht1"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht1All"]?.ToString() + "," + sqlDataReader["MotorKhordad1"]?.ToString() + "|" + sqlDataReader["MotorKhordad1All"]?.ToString() + "," + sqlDataReader["MotorTir1"]?.ToString() + "|" + sqlDataReader["MotorTir1All"]?.ToString() + "," + sqlDataReader["MotorMordad1"]?.ToString() + "|" + sqlDataReader["MotorMordad1All"]?.ToString() + "," + sqlDataReader["MotorShahrivar1"]?.ToString() + "|" + sqlDataReader["MotorShahrivar1All"]?.ToString() + "," + sqlDataReader["MotorMehr1"]?.ToString() + "|" + sqlDataReader["MotorMehr1All"]?.ToString() + "," + sqlDataReader["MotorAban1"]?.ToString() + "|" + sqlDataReader["MotorAban1All"]?.ToString() + "," + sqlDataReader["MotorAzar1"]?.ToString() + "|" + sqlDataReader["MotorAzar1All"]?.ToString() + "," + sqlDataReader["MotorDay1"]?.ToString() + "|" + sqlDataReader["MotorDay1All"]?.ToString() + "," + sqlDataReader["MotorBahman1"]?.ToString() + "|" + sqlDataReader["MotorBahman1All"]?.ToString() + "," + sqlDataReader["MotorEsfand1"]?.ToString() + "|" + sqlDataReader["MotorEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["MotorFarvardin2"]?.ToString() + "|" + sqlDataReader["MotorFarvardin2All"]?.ToString() + "," + sqlDataReader["MotorOrdibehesht2"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht2All"]?.ToString() + "," + sqlDataReader["MotorKhordad2"]?.ToString() + "|" + sqlDataReader["MotorKhordad2All"]?.ToString() + "," + sqlDataReader["MotorTir2"]?.ToString() + "|" + sqlDataReader["MotorTir2All"]?.ToString() + "," + sqlDataReader["MotorMordad2"]?.ToString() + "|" + sqlDataReader["MotorMordad2All"]?.ToString() + "," + sqlDataReader["MotorShahrivar2"]?.ToString() + "|" + sqlDataReader["MotorShahrivar2All"]?.ToString() + "," + sqlDataReader["MotorMehr2"]?.ToString() + "|" + sqlDataReader["MotorMehr2All"]?.ToString() + "," + sqlDataReader["MotorAban2"]?.ToString() + "|" + sqlDataReader["MotorAban2All"]?.ToString() + "," + sqlDataReader["MotorAzar2"]?.ToString() + "|" + sqlDataReader["MotorAzar2All"]?.ToString() + "," + sqlDataReader["MotorDay2"]?.ToString() + "|" + sqlDataReader["MotorDay2All"]?.ToString() + "," + sqlDataReader["MotorBahman2"]?.ToString() + "|" + sqlDataReader["MotorBahman2All"]?.ToString() + "," + sqlDataReader["MotorEsfand2"]?.ToString() + "|" + sqlDataReader["MotorEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["MotorFarvardin3"]?.ToString() + "|" + sqlDataReader["MotorFarvardin3All"]?.ToString() + "," + sqlDataReader["MotorOrdibehesht3"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht3All"]?.ToString() + "," + sqlDataReader["MotorKhordad3"]?.ToString() + "|" + sqlDataReader["MotorKhordad3All"]?.ToString() + "," + sqlDataReader["MotorTir3"]?.ToString() + "|" + sqlDataReader["MotorTir3All"]?.ToString() + "," + sqlDataReader["MotorMordad3"]?.ToString() + "|" + sqlDataReader["MotorMordad3All"]?.ToString() + "," + sqlDataReader["MotorShahrivar3"]?.ToString() + "|" + sqlDataReader["MotorShahrivar3All"]?.ToString() + "," + sqlDataReader["MotorMehr3"]?.ToString() + "|" + sqlDataReader["MotorMehr3All"]?.ToString() + "," + sqlDataReader["MotorAban3"]?.ToString() + "|" + sqlDataReader["MotorAban3All"]?.ToString() + "," + sqlDataReader["MotorAzar3"]?.ToString() + "|" + sqlDataReader["MotorAzar3All"]?.ToString() + "," + sqlDataReader["MotorDay3"]?.ToString() + "|" + sqlDataReader["MotorDay3All"]?.ToString() + "," + sqlDataReader["MotorBahman3"]?.ToString() + "|" + sqlDataReader["MotorBahman3All"]?.ToString() + "," + sqlDataReader["MotorEsfand3"]?.ToString() + "|" + sqlDataReader["MotorEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["MotorFarvardin4"]?.ToString() + "|" + sqlDataReader["MotorFarvardin4All"]?.ToString() + "," + sqlDataReader["MotorOrdibehesht4"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht4All"]?.ToString() + "," + sqlDataReader["MotorKhordad4"]?.ToString() + "|" + sqlDataReader["MotorKhordad4All"]?.ToString() + "," + sqlDataReader["MotorTir4"]?.ToString() + "|" + sqlDataReader["MotorTir4All"]?.ToString() + "," + sqlDataReader["MotorMordad4"]?.ToString() + "|" + sqlDataReader["MotorMordad4All"]?.ToString() + "," + sqlDataReader["MotorShahrivar4"]?.ToString() + "|" + sqlDataReader["MotorShahrivar4All"]?.ToString() + "," + sqlDataReader["MotorMehr4"]?.ToString() + "|" + sqlDataReader["MotorMehr4All"]?.ToString() + "," + sqlDataReader["MotorAban4"]?.ToString() + "|" + sqlDataReader["MotorAban4All"]?.ToString() + "," + sqlDataReader["MotorAzar4"]?.ToString() + "|" + sqlDataReader["MotorAzar4All"]?.ToString() + "," + sqlDataReader["MotorDay4"]?.ToString() + "|" + sqlDataReader["MotorDay4All"]?.ToString() + "," + sqlDataReader["MotorBahman4"]?.ToString() + "|" + sqlDataReader["MotorBahman4All"]?.ToString() + "," + sqlDataReader["MotorEsfand4"]?.ToString() + "|" + sqlDataReader["MotorEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["MotorFarvardin5"]?.ToString() + "|" + sqlDataReader["MotorFarvardin5All"]?.ToString() + sqlDataReader["MotorOrdibehesht5"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht5All"]?.ToString() + sqlDataReader["MotorKhordad5"]?.ToString() + "|" + sqlDataReader["MotorKhordad5All"]?.ToString() + sqlDataReader["MotorTir5"]?.ToString() + "|" + sqlDataReader["MotorTir5All"]?.ToString() + sqlDataReader["MotorMordad5"]?.ToString() + "|" + sqlDataReader["MotorMordad5All"]?.ToString() + "," + sqlDataReader["MotorShahrivar5"]?.ToString() + "|" + sqlDataReader["MotorShahrivar5All"]?.ToString() + "," + sqlDataReader["MotorMehr5"]?.ToString() + "|" + sqlDataReader["MotorMehr5All"]?.ToString() + "," + sqlDataReader["MotorAban5"]?.ToString() + "|" + sqlDataReader["MotorAban5All"]?.ToString() + "," + sqlDataReader["MotorAzar5"]?.ToString() + "|" + sqlDataReader["MotorAzar5All"]?.ToString() + "," + sqlDataReader["MotorDay5"]?.ToString() + "|" + sqlDataReader["MotorDay5All"]?.ToString() + "," + sqlDataReader["MotorBahman5"]?.ToString() + "|" + sqlDataReader["MotorBahman5All"]?.ToString() + "," + sqlDataReader["MotorEsfand5"]?.ToString() + "|" + sqlDataReader["MotorEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "NoCertification" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["NoCertificationFarvardin1"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin1All"]?.ToString() + "," + sqlDataReader["NoCertificationOrdibehesht1"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht1All"]?.ToString() + "," + sqlDataReader["NoCertificationKhordad1"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad1All"]?.ToString() + "," + sqlDataReader["NoCertificationTir1"]?.ToString() + "|" + sqlDataReader["NoCertificationTir1All"]?.ToString() + "," + sqlDataReader["NoCertificationMordad1"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad1All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar1"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar1All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr1"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr1All"]?.ToString() + "," + sqlDataReader["NoCertificationAban1"]?.ToString() + "|" + sqlDataReader["NoCertificationAban1All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar1"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar1All"]?.ToString() + "," + sqlDataReader["NoCertificationDay1"]?.ToString() + "|" + sqlDataReader["NoCertificationDay1All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman1"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman1All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand1"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["NoCertificationFarvardin2"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin2All"]?.ToString() + "," + sqlDataReader["NoCertificationOrdibehesht2"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht2All"]?.ToString() + "," + sqlDataReader["NoCertificationKhordad2"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad2All"]?.ToString() + "," + sqlDataReader["NoCertificationTir2"]?.ToString() + "|" + sqlDataReader["NoCertificationTir2All"]?.ToString() + "," + sqlDataReader["NoCertificationMordad2"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad2All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar2"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar2All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr2"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr2All"]?.ToString() + "," + sqlDataReader["NoCertificationAban2"]?.ToString() + "|" + sqlDataReader["NoCertificationAban2All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar2"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar2All"]?.ToString() + "," + sqlDataReader["NoCertificationDay2"]?.ToString() + "|" + sqlDataReader["NoCertificationDay2All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman2"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman2All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand2"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["NoCertificationFarvardin3"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin3All"]?.ToString() + "," + sqlDataReader["NoCertificationOrdibehesht3"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht3All"]?.ToString() + "," + sqlDataReader["NoCertificationKhordad3"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad3All"]?.ToString() + "," + sqlDataReader["NoCertificationTir3"]?.ToString() + "|" + sqlDataReader["NoCertificationTir3All"]?.ToString() + "," + sqlDataReader["NoCertificationMordad3"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad3All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar3"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar3All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr3"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr3All"]?.ToString() + "," + sqlDataReader["NoCertificationAban3"]?.ToString() + "|" + sqlDataReader["NoCertificationAban3All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar3"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar3All"]?.ToString() + "," + sqlDataReader["NoCertificationDay3"]?.ToString() + "|" + sqlDataReader["NoCertificationDay3All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman3"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman3All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand3"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["NoCertificationFarvardin4"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin4All"]?.ToString() + "," + sqlDataReader["NoCertificationOrdibehesht4"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht4All"]?.ToString() + "," + sqlDataReader["NoCertificationKhordad4"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad4All"]?.ToString() + "," + sqlDataReader["NoCertificationTir4"]?.ToString() + "|" + sqlDataReader["NoCertificationTir4All"]?.ToString() + "," + sqlDataReader["NoCertificationMordad4"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad4All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar4"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar4All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr4"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr4All"]?.ToString() + "," + sqlDataReader["NoCertificationAban4"]?.ToString() + "|" + sqlDataReader["NoCertificationAban4All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar4"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar4All"]?.ToString() + "," + sqlDataReader["NoCertificationDay4"]?.ToString() + "|" + sqlDataReader["NoCertificationDay4All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman4"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman4All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand4"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["NoCertificationFarvardin5"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin5All"]?.ToString() + sqlDataReader["NoCertificationOrdibehesht5"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht5All"]?.ToString() + sqlDataReader["NoCertificationKhordad5"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad5All"]?.ToString() + sqlDataReader["NoCertificationTir5"]?.ToString() + "|" + sqlDataReader["NoCertificationTir5All"]?.ToString() + sqlDataReader["NoCertificationMordad5"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad5All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar5"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar5All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr5"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr5All"]?.ToString() + "," + sqlDataReader["NoCertificationAban5"]?.ToString() + "|" + sqlDataReader["NoCertificationAban5All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar5"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar5All"]?.ToString() + "," + sqlDataReader["NoCertificationDay5"]?.ToString() + "|" + sqlDataReader["NoCertificationDay5All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman5"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman5All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand5"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "SafetyBelt" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["SafetyBeltFarvardin1"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin1All"]?.ToString() + "," + sqlDataReader["SafetyBeltOrdibehesht1"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht1All"]?.ToString() + "," + sqlDataReader["SafetyBeltKhordad1"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad1All"]?.ToString() + "," + sqlDataReader["SafetyBeltTir1"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir1All"]?.ToString() + "," + sqlDataReader["SafetyBeltMordad1"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad1All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar1"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar1All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr1"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr1All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban1"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban1All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar1"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar1All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay1"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay1All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman1"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman1All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand1"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["SafetyBeltFarvardin2"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin2All"]?.ToString() + "," + sqlDataReader["SafetyBeltOrdibehesht2"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht2All"]?.ToString() + "," + sqlDataReader["SafetyBeltKhordad2"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad2All"]?.ToString() + "," + sqlDataReader["SafetyBeltTir2"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir2All"]?.ToString() + "," + sqlDataReader["SafetyBeltMordad2"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad2All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar2"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar2All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr2"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr2All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban2"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban2All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar2"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar2All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay2"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay2All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman2"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman2All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand2"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["SafetyBeltFarvardin3"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin3All"]?.ToString() + "," + sqlDataReader["SafetyBeltOrdibehesht3"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht3All"]?.ToString() + "," + sqlDataReader["SafetyBeltKhordad3"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad3All"]?.ToString() + "," + sqlDataReader["SafetyBeltTir3"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir3All"]?.ToString() + "," + sqlDataReader["SafetyBeltMordad3"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad3All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar3"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar3All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr3"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr3All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban3"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban3All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar3"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar3All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay3"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay3All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman3"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman3All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand3"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["SafetyBeltFarvardin4"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin4All"]?.ToString() + "," + sqlDataReader["SafetyBeltOrdibehesht4"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht4All"]?.ToString() + "," + sqlDataReader["SafetyBeltKhordad4"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad4All"]?.ToString() + "," + sqlDataReader["SafetyBeltTir4"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir4All"]?.ToString() + "," + sqlDataReader["SafetyBeltMordad4"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad4All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar4"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar4All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr4"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr4All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban4"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban4All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar4"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar4All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay4"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay4All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman4"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman4All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand4"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["SafetyBeltFarvardin5"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin5All"]?.ToString() + sqlDataReader["SafetyBeltOrdibehesht5"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht5All"]?.ToString() + sqlDataReader["SafetyBeltKhordad5"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad5All"]?.ToString() + sqlDataReader["SafetyBeltTir5"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir5All"]?.ToString() + sqlDataReader["SafetyBeltMordad5"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad5All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar5"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar5All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr5"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr5All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban5"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban5All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar5"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar5All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay5"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay5All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman5"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman5All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand5"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "Helmet" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["HelmetFarvardin1"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin1All"]?.ToString() + "," + sqlDataReader["HelmetOrdibehesht1"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht1All"]?.ToString() + "," + sqlDataReader["HelmetKhordad1"]?.ToString() + "|" + sqlDataReader["HelmetKhordad1All"]?.ToString() + "," + sqlDataReader["HelmetTir1"]?.ToString() + "|" + sqlDataReader["HelmetTir1All"]?.ToString() + "," + sqlDataReader["HelmetMordad1"]?.ToString() + "|" + sqlDataReader["HelmetMordad1All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar1"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar1All"]?.ToString() + "," + sqlDataReader["HelmetMehr1"]?.ToString() + "|" + sqlDataReader["HelmetMehr1All"]?.ToString() + "," + sqlDataReader["HelmetAban1"]?.ToString() + "|" + sqlDataReader["HelmetAban1All"]?.ToString() + "," + sqlDataReader["HelmetAzar1"]?.ToString() + "|" + sqlDataReader["HelmetAzar1All"]?.ToString() + "," + sqlDataReader["HelmetDay1"]?.ToString() + "|" + sqlDataReader["HelmetDay1All"]?.ToString() + "," + sqlDataReader["HelmetBahman1"]?.ToString() + "|" + sqlDataReader["HelmetBahman1All"]?.ToString() + "," + sqlDataReader["HelmetEsfand1"]?.ToString() + "|" + sqlDataReader["HelmetEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["HelmetFarvardin2"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin2All"]?.ToString() + "," + sqlDataReader["HelmetOrdibehesht2"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht2All"]?.ToString() + "," + sqlDataReader["HelmetKhordad2"]?.ToString() + "|" + sqlDataReader["HelmetKhordad2All"]?.ToString() + "," + sqlDataReader["HelmetTir2"]?.ToString() + "|" + sqlDataReader["HelmetTir2All"]?.ToString() + "," + sqlDataReader["HelmetMordad2"]?.ToString() + "|" + sqlDataReader["HelmetMordad2All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar2"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar2All"]?.ToString() + "," + sqlDataReader["HelmetMehr2"]?.ToString() + "|" + sqlDataReader["HelmetMehr2All"]?.ToString() + "," + sqlDataReader["HelmetAban2"]?.ToString() + "|" + sqlDataReader["HelmetAban2All"]?.ToString() + "," + sqlDataReader["HelmetAzar2"]?.ToString() + "|" + sqlDataReader["HelmetAzar2All"]?.ToString() + "," + sqlDataReader["HelmetDay2"]?.ToString() + "|" + sqlDataReader["HelmetDay2All"]?.ToString() + "," + sqlDataReader["HelmetBahman2"]?.ToString() + "|" + sqlDataReader["HelmetBahman2All"]?.ToString() + "," + sqlDataReader["HelmetEsfand2"]?.ToString() + "|" + sqlDataReader["HelmetEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["HelmetFarvardin3"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin3All"]?.ToString() + "," + sqlDataReader["HelmetOrdibehesht3"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht3All"]?.ToString() + "," + sqlDataReader["HelmetKhordad3"]?.ToString() + "|" + sqlDataReader["HelmetKhordad3All"]?.ToString() + "," + sqlDataReader["HelmetTir3"]?.ToString() + "|" + sqlDataReader["HelmetTir3All"]?.ToString() + "," + sqlDataReader["HelmetMordad3"]?.ToString() + "|" + sqlDataReader["HelmetMordad3All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar3"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar3All"]?.ToString() + "," + sqlDataReader["HelmetMehr3"]?.ToString() + "|" + sqlDataReader["HelmetMehr3All"]?.ToString() + "," + sqlDataReader["HelmetAban3"]?.ToString() + "|" + sqlDataReader["HelmetAban3All"]?.ToString() + "," + sqlDataReader["HelmetAzar3"]?.ToString() + "|" + sqlDataReader["HelmetAzar3All"]?.ToString() + "," + sqlDataReader["HelmetDay3"]?.ToString() + "|" + sqlDataReader["HelmetDay3All"]?.ToString() + "," + sqlDataReader["HelmetBahman3"]?.ToString() + "|" + sqlDataReader["HelmetBahman3All"]?.ToString() + "," + sqlDataReader["HelmetEsfand3"]?.ToString() + "|" + sqlDataReader["HelmetEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["HelmetFarvardin4"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin4All"]?.ToString() + "," + sqlDataReader["HelmetOrdibehesht4"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht4All"]?.ToString() + "," + sqlDataReader["HelmetKhordad4"]?.ToString() + "|" + sqlDataReader["HelmetKhordad4All"]?.ToString() + "," + sqlDataReader["HelmetTir4"]?.ToString() + "|" + sqlDataReader["HelmetTir4All"]?.ToString() + "," + sqlDataReader["HelmetMordad4"]?.ToString() + "|" + sqlDataReader["HelmetMordad4All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar4"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar4All"]?.ToString() + "," + sqlDataReader["HelmetMehr4"]?.ToString() + "|" + sqlDataReader["HelmetMehr4All"]?.ToString() + "," + sqlDataReader["HelmetAban4"]?.ToString() + "|" + sqlDataReader["HelmetAban4All"]?.ToString() + "," + sqlDataReader["HelmetAzar4"]?.ToString() + "|" + sqlDataReader["HelmetAzar4All"]?.ToString() + "," + sqlDataReader["HelmetDay4"]?.ToString() + "|" + sqlDataReader["HelmetDay4All"]?.ToString() + "," + sqlDataReader["HelmetBahman4"]?.ToString() + "|" + sqlDataReader["HelmetBahman4All"]?.ToString() + "," + sqlDataReader["HelmetEsfand4"]?.ToString() + "|" + sqlDataReader["HelmetEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["HelmetFarvardin5"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin5All"]?.ToString() + sqlDataReader["HelmetOrdibehesht5"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht5All"]?.ToString() + sqlDataReader["HelmetKhordad5"]?.ToString() + "|" + sqlDataReader["HelmetKhordad5All"]?.ToString() + sqlDataReader["HelmetTir5"]?.ToString() + "|" + sqlDataReader["HelmetTir5All"]?.ToString() + sqlDataReader["HelmetMordad5"]?.ToString() + "|" + sqlDataReader["HelmetMordad5All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar5"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar5All"]?.ToString() + "," + sqlDataReader["HelmetMehr5"]?.ToString() + "|" + sqlDataReader["HelmetMehr5All"]?.ToString() + "," + sqlDataReader["HelmetAban5"]?.ToString() + "|" + sqlDataReader["HelmetAban5All"]?.ToString() + "," + sqlDataReader["HelmetAzar5"]?.ToString() + "|" + sqlDataReader["HelmetAzar5All"]?.ToString() + "," + sqlDataReader["HelmetDay5"]?.ToString() + "|" + sqlDataReader["HelmetDay5All"]?.ToString() + "," + sqlDataReader["HelmetBahman5"]?.ToString() + "|" + sqlDataReader["HelmetBahman5All"]?.ToString() + "," + sqlDataReader["HelmetEsfand5"]?.ToString() + "|" + sqlDataReader["HelmetEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            connection.Close();
                        }
                        using (SqlCommand sqlCommand = new SqlCommand(sp, connection))
                        {
                            crashType = "فوتی";

                            sqlCommand.CommandType = CommandType.StoredProcedure;
                            sqlCommand.Parameters.AddWithValue("@Type", (object)type);
                            sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                            sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                            sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                            sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                            sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                            sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                            sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                            sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                            sqlCommand.Parameters.AddWithValue("@DayOfWeek", (object)getDays);
                            sqlCommand.Parameters.AddWithValue("@Month", (object)month);
                            sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                            sqlCommand.Parameters.AddWithValue("@LightingStatus", (object)lightingStatus);
                            sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                            sqlCommand.Parameters.AddWithValue("@CarriageWayDirection", (object)carriageWayDirection);
                            sqlCommand.Parameters.AddWithValue("@TypeOfWay", (object)typeOfWay);
                            sqlCommand.Parameters.AddWithValue("@CarCrashLocation", (object)carCrashLocation);
                            sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                            sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                            sqlCommand.Parameters.AddWithValue("@FromAgeDriver", (object)fromAgeDriver);
                            sqlCommand.Parameters.AddWithValue("@ToAgeDriver", (object)toAgeDriver);
                            sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                            sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                            sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                            sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                            sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                            sqlCommand.Parameters.AddWithValue("@AxisId", (object)10015);
                            sqlCommand.Parameters.AddWithValue("@IsNotLocal", (object)isNotLocalDriver);
                            connection.Open();
                            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                            if (type != "Pedestrian60" && type != "Motor18" && type != "NoCertification" && type != "SafetyBelt" && type != "Helmet" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["FirstYear"].ToString();
                                secondYear = sqlDataReader["SecondYear"].ToString();
                                thirdYear = sqlDataReader["ThirdYear"].ToString();
                                fourthYear = sqlDataReader["FourthYear"].ToString();
                                fifthYear = sqlDataReader["FifthYear"].ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "Pedestrian60" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["PedestrianFarvardin1"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin1All"]?.ToString() + "," + sqlDataReader["PedestrianOrdibehesht1"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht1All"]?.ToString() + "," + sqlDataReader["PedestrianKhordad1"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad1All"]?.ToString() + "," + sqlDataReader["PedestrianTir1"]?.ToString() + "|" + sqlDataReader["PedestrianTir1All"]?.ToString() + "," + sqlDataReader["PedestrianMordad1"]?.ToString() + "|" + sqlDataReader["PedestrianMordad1All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar1"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar1All"]?.ToString() + "," + sqlDataReader["PedestrianMehr1"]?.ToString() + "|" + sqlDataReader["PedestrianMehr1All"]?.ToString() + "," + sqlDataReader["PedestrianAban1"]?.ToString() + "|" + sqlDataReader["PedestrianAban1All"]?.ToString() + "," + sqlDataReader["PedestrianAzar1"]?.ToString() + "|" + sqlDataReader["PedestrianAzar1All"]?.ToString() + "," + sqlDataReader["PedestrianDay1"]?.ToString() + "|" + sqlDataReader["PedestrianDay1All"]?.ToString() + "," + sqlDataReader["PedestrianBahman1"]?.ToString() + "|" + sqlDataReader["PedestrianBahman1All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand1"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["PedestrianFarvardin2"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin2All"]?.ToString() + "," + sqlDataReader["PedestrianOrdibehesht2"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht2All"]?.ToString() + "," + sqlDataReader["PedestrianKhordad2"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad2All"]?.ToString() + "," + sqlDataReader["PedestrianTir2"]?.ToString() + "|" + sqlDataReader["PedestrianTir2All"]?.ToString() + "," + sqlDataReader["PedestrianMordad2"]?.ToString() + "|" + sqlDataReader["PedestrianMordad2All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar2"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar2All"]?.ToString() + "," + sqlDataReader["PedestrianMehr2"]?.ToString() + "|" + sqlDataReader["PedestrianMehr2All"]?.ToString() + "," + sqlDataReader["PedestrianAban2"]?.ToString() + "|" + sqlDataReader["PedestrianAban2All"]?.ToString() + "," + sqlDataReader["PedestrianAzar2"]?.ToString() + "|" + sqlDataReader["PedestrianAzar2All"]?.ToString() + "," + sqlDataReader["PedestrianDay2"]?.ToString() + "|" + sqlDataReader["PedestrianDay2All"]?.ToString() + "," + sqlDataReader["PedestrianBahman2"]?.ToString() + "|" + sqlDataReader["PedestrianBahman2All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand2"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["PedestrianFarvardin3"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin3All"]?.ToString() + "," + sqlDataReader["PedestrianOrdibehesht3"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht3All"]?.ToString() + "," + sqlDataReader["PedestrianKhordad3"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad3All"]?.ToString() + "," + sqlDataReader["PedestrianTir3"]?.ToString() + "|" + sqlDataReader["PedestrianTir3All"]?.ToString() + "," + sqlDataReader["PedestrianMordad3"]?.ToString() + "|" + sqlDataReader["PedestrianMordad3All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar3"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar3All"]?.ToString() + "," + sqlDataReader["PedestrianMehr3"]?.ToString() + "|" + sqlDataReader["PedestrianMehr3All"]?.ToString() + "," + sqlDataReader["PedestrianAban3"]?.ToString() + "|" + sqlDataReader["PedestrianAban3All"]?.ToString() + "," + sqlDataReader["PedestrianAzar3"]?.ToString() + "|" + sqlDataReader["PedestrianAzar3All"]?.ToString() + "," + sqlDataReader["PedestrianDay3"]?.ToString() + "|" + sqlDataReader["PedestrianDay3All"]?.ToString() + "," + sqlDataReader["PedestrianBahman3"]?.ToString() + "|" + sqlDataReader["PedestrianBahman3All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand3"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["PedestrianFarvardin4"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin4All"]?.ToString() + "," + sqlDataReader["PedestrianOrdibehesht4"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht4All"]?.ToString() + "," + sqlDataReader["PedestrianKhordad4"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad4All"]?.ToString() + "," + sqlDataReader["PedestrianTir4"]?.ToString() + "|" + sqlDataReader["PedestrianTir4All"]?.ToString() + "," + sqlDataReader["PedestrianMordad4"]?.ToString() + "|" + sqlDataReader["PedestrianMordad4All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar4"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar4All"]?.ToString() + "," + sqlDataReader["PedestrianMehr4"]?.ToString() + "|" + sqlDataReader["PedestrianMehr4All"]?.ToString() + "," + sqlDataReader["PedestrianAban4"]?.ToString() + "|" + sqlDataReader["PedestrianAban4All"]?.ToString() + "," + sqlDataReader["PedestrianAzar4"]?.ToString() + "|" + sqlDataReader["PedestrianAzar4All"]?.ToString() + "," + sqlDataReader["PedestrianDay4"]?.ToString() + "|" + sqlDataReader["PedestrianDay4All"]?.ToString() + "," + sqlDataReader["PedestrianBahman4"]?.ToString() + "|" + sqlDataReader["PedestrianBahman4All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand4"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["PedestrianFarvardin5"]?.ToString() + "|" + sqlDataReader["PedestrianFarvardin5All"]?.ToString() + sqlDataReader["PedestrianOrdibehesht5"]?.ToString() + "|" + sqlDataReader["PedestrianOrdibehesht5All"]?.ToString() + sqlDataReader["PedestrianKhordad5"]?.ToString() + "|" + sqlDataReader["PedestrianKhordad5All"]?.ToString() + sqlDataReader["PedestrianTir5"]?.ToString() + "|" + sqlDataReader["PedestrianTir5All"]?.ToString() + sqlDataReader["PedestrianMordad5"]?.ToString() + "|" + sqlDataReader["PedestrianMordad5All"]?.ToString() + "," + sqlDataReader["PedestrianShahrivar5"]?.ToString() + "|" + sqlDataReader["PedestrianShahrivar5All"]?.ToString() + "," + sqlDataReader["PedestrianMehr5"]?.ToString() + "|" + sqlDataReader["PedestrianMehr5All"]?.ToString() + "," + sqlDataReader["PedestrianAban5"]?.ToString() + "|" + sqlDataReader["PedestrianAban5All"]?.ToString() + "," + sqlDataReader["PedestrianAzar5"]?.ToString() + "|" + sqlDataReader["PedestrianAzar5All"]?.ToString() + "," + sqlDataReader["PedestrianDay5"]?.ToString() + "|" + sqlDataReader["PedestrianDay5All"]?.ToString() + "," + sqlDataReader["PedestrianBahman5"]?.ToString() + "|" + sqlDataReader["PedestrianBahman5All"]?.ToString() + "," + sqlDataReader["PedestrianEsfand5"]?.ToString() + "|" + sqlDataReader["PedestrianEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "Motor18" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["MotorFarvardin1"]?.ToString() + "|" + sqlDataReader["MotorFarvardin1All"]?.ToString() + "," + sqlDataReader["MotorOrdibehesht1"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht1All"]?.ToString() + "," + sqlDataReader["MotorKhordad1"]?.ToString() + "|" + sqlDataReader["MotorKhordad1All"]?.ToString() + "," + sqlDataReader["MotorTir1"]?.ToString() + "|" + sqlDataReader["MotorTir1All"]?.ToString() + "," + sqlDataReader["MotorMordad1"]?.ToString() + "|" + sqlDataReader["MotorMordad1All"]?.ToString() + "," + sqlDataReader["MotorShahrivar1"]?.ToString() + "|" + sqlDataReader["MotorShahrivar1All"]?.ToString() + "," + sqlDataReader["MotorMehr1"]?.ToString() + "|" + sqlDataReader["MotorMehr1All"]?.ToString() + "," + sqlDataReader["MotorAban1"]?.ToString() + "|" + sqlDataReader["MotorAban1All"]?.ToString() + "," + sqlDataReader["MotorAzar1"]?.ToString() + "|" + sqlDataReader["MotorAzar1All"]?.ToString() + "," + sqlDataReader["MotorDay1"]?.ToString() + "|" + sqlDataReader["MotorDay1All"]?.ToString() + "," + sqlDataReader["MotorBahman1"]?.ToString() + "|" + sqlDataReader["MotorBahman1All"]?.ToString() + "," + sqlDataReader["MotorEsfand1"]?.ToString() + "|" + sqlDataReader["MotorEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["MotorFarvardin2"]?.ToString() + "|" + sqlDataReader["MotorFarvardin2All"]?.ToString() + "," + sqlDataReader["MotorOrdibehesht2"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht2All"]?.ToString() + "," + sqlDataReader["MotorKhordad2"]?.ToString() + "|" + sqlDataReader["MotorKhordad2All"]?.ToString() + "," + sqlDataReader["MotorTir2"]?.ToString() + "|" + sqlDataReader["MotorTir2All"]?.ToString() + "," + sqlDataReader["MotorMordad2"]?.ToString() + "|" + sqlDataReader["MotorMordad2All"]?.ToString() + "," + sqlDataReader["MotorShahrivar2"]?.ToString() + "|" + sqlDataReader["MotorShahrivar2All"]?.ToString() + "," + sqlDataReader["MotorMehr2"]?.ToString() + "|" + sqlDataReader["MotorMehr2All"]?.ToString() + "," + sqlDataReader["MotorAban2"]?.ToString() + "|" + sqlDataReader["MotorAban2All"]?.ToString() + "," + sqlDataReader["MotorAzar2"]?.ToString() + "|" + sqlDataReader["MotorAzar2All"]?.ToString() + "," + sqlDataReader["MotorDay2"]?.ToString() + "|" + sqlDataReader["MotorDay2All"]?.ToString() + "," + sqlDataReader["MotorBahman2"]?.ToString() + "|" + sqlDataReader["MotorBahman2All"]?.ToString() + "," + sqlDataReader["MotorEsfand2"]?.ToString() + "|" + sqlDataReader["MotorEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["MotorFarvardin3"]?.ToString() + "|" + sqlDataReader["MotorFarvardin3All"]?.ToString() + "," + sqlDataReader["MotorOrdibehesht3"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht3All"]?.ToString() + "," + sqlDataReader["MotorKhordad3"]?.ToString() + "|" + sqlDataReader["MotorKhordad3All"]?.ToString() + "," + sqlDataReader["MotorTir3"]?.ToString() + "|" + sqlDataReader["MotorTir3All"]?.ToString() + "," + sqlDataReader["MotorMordad3"]?.ToString() + "|" + sqlDataReader["MotorMordad3All"]?.ToString() + "," + sqlDataReader["MotorShahrivar3"]?.ToString() + "|" + sqlDataReader["MotorShahrivar3All"]?.ToString() + "," + sqlDataReader["MotorMehr3"]?.ToString() + "|" + sqlDataReader["MotorMehr3All"]?.ToString() + "," + sqlDataReader["MotorAban3"]?.ToString() + "|" + sqlDataReader["MotorAban3All"]?.ToString() + "," + sqlDataReader["MotorAzar3"]?.ToString() + "|" + sqlDataReader["MotorAzar3All"]?.ToString() + "," + sqlDataReader["MotorDay3"]?.ToString() + "|" + sqlDataReader["MotorDay3All"]?.ToString() + "," + sqlDataReader["MotorBahman3"]?.ToString() + "|" + sqlDataReader["MotorBahman3All"]?.ToString() + "," + sqlDataReader["MotorEsfand3"]?.ToString() + "|" + sqlDataReader["MotorEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["MotorFarvardin4"]?.ToString() + "|" + sqlDataReader["MotorFarvardin4All"]?.ToString() + "," + sqlDataReader["MotorOrdibehesht4"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht4All"]?.ToString() + "," + sqlDataReader["MotorKhordad4"]?.ToString() + "|" + sqlDataReader["MotorKhordad4All"]?.ToString() + "," + sqlDataReader["MotorTir4"]?.ToString() + "|" + sqlDataReader["MotorTir4All"]?.ToString() + "," + sqlDataReader["MotorMordad4"]?.ToString() + "|" + sqlDataReader["MotorMordad4All"]?.ToString() + "," + sqlDataReader["MotorShahrivar4"]?.ToString() + "|" + sqlDataReader["MotorShahrivar4All"]?.ToString() + "," + sqlDataReader["MotorMehr4"]?.ToString() + "|" + sqlDataReader["MotorMehr4All"]?.ToString() + "," + sqlDataReader["MotorAban4"]?.ToString() + "|" + sqlDataReader["MotorAban4All"]?.ToString() + "," + sqlDataReader["MotorAzar4"]?.ToString() + "|" + sqlDataReader["MotorAzar4All"]?.ToString() + "," + sqlDataReader["MotorDay4"]?.ToString() + "|" + sqlDataReader["MotorDay4All"]?.ToString() + "," + sqlDataReader["MotorBahman4"]?.ToString() + "|" + sqlDataReader["MotorBahman4All"]?.ToString() + "," + sqlDataReader["MotorEsfand4"]?.ToString() + "|" + sqlDataReader["MotorEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["MotorFarvardin5"]?.ToString() + "|" + sqlDataReader["MotorFarvardin5All"]?.ToString() + sqlDataReader["MotorOrdibehesht5"]?.ToString() + "|" + sqlDataReader["MotorOrdibehesht5All"]?.ToString() + sqlDataReader["MotorKhordad5"]?.ToString() + "|" + sqlDataReader["MotorKhordad5All"]?.ToString() + sqlDataReader["MotorTir5"]?.ToString() + "|" + sqlDataReader["MotorTir5All"]?.ToString() + sqlDataReader["MotorMordad5"]?.ToString() + "|" + sqlDataReader["MotorMordad5All"]?.ToString() + "," + sqlDataReader["MotorShahrivar5"]?.ToString() + "|" + sqlDataReader["MotorShahrivar5All"]?.ToString() + "," + sqlDataReader["MotorMehr5"]?.ToString() + "|" + sqlDataReader["MotorMehr5All"]?.ToString() + "," + sqlDataReader["MotorAban5"]?.ToString() + "|" + sqlDataReader["MotorAban5All"]?.ToString() + "," + sqlDataReader["MotorAzar5"]?.ToString() + "|" + sqlDataReader["MotorAzar5All"]?.ToString() + "," + sqlDataReader["MotorDay5"]?.ToString() + "|" + sqlDataReader["MotorDay5All"]?.ToString() + "," + sqlDataReader["MotorBahman5"]?.ToString() + "|" + sqlDataReader["MotorBahman5All"]?.ToString() + "," + sqlDataReader["MotorEsfand5"]?.ToString() + "|" + sqlDataReader["MotorEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "NoCertification" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["NoCertificationFarvardin1"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin1All"]?.ToString() + "," + sqlDataReader["NoCertificationOrdibehesht1"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht1All"]?.ToString() + "," + sqlDataReader["NoCertificationKhordad1"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad1All"]?.ToString() + "," + sqlDataReader["NoCertificationTir1"]?.ToString() + "|" + sqlDataReader["NoCertificationTir1All"]?.ToString() + "," + sqlDataReader["NoCertificationMordad1"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad1All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar1"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar1All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr1"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr1All"]?.ToString() + "," + sqlDataReader["NoCertificationAban1"]?.ToString() + "|" + sqlDataReader["NoCertificationAban1All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar1"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar1All"]?.ToString() + "," + sqlDataReader["NoCertificationDay1"]?.ToString() + "|" + sqlDataReader["NoCertificationDay1All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman1"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman1All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand1"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["NoCertificationFarvardin2"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin2All"]?.ToString() + "," + sqlDataReader["NoCertificationOrdibehesht2"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht2All"]?.ToString() + "," + sqlDataReader["NoCertificationKhordad2"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad2All"]?.ToString() + "," + sqlDataReader["NoCertificationTir2"]?.ToString() + "|" + sqlDataReader["NoCertificationTir2All"]?.ToString() + "," + sqlDataReader["NoCertificationMordad2"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad2All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar2"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar2All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr2"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr2All"]?.ToString() + "," + sqlDataReader["NoCertificationAban2"]?.ToString() + "|" + sqlDataReader["NoCertificationAban2All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar2"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar2All"]?.ToString() + "," + sqlDataReader["NoCertificationDay2"]?.ToString() + "|" + sqlDataReader["NoCertificationDay2All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman2"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman2All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand2"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["NoCertificationFarvardin3"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin3All"]?.ToString() + "," + sqlDataReader["NoCertificationOrdibehesht3"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht3All"]?.ToString() + "," + sqlDataReader["NoCertificationKhordad3"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad3All"]?.ToString() + "," + sqlDataReader["NoCertificationTir3"]?.ToString() + "|" + sqlDataReader["NoCertificationTir3All"]?.ToString() + "," + sqlDataReader["NoCertificationMordad3"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad3All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar3"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar3All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr3"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr3All"]?.ToString() + "," + sqlDataReader["NoCertificationAban3"]?.ToString() + "|" + sqlDataReader["NoCertificationAban3All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar3"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar3All"]?.ToString() + "," + sqlDataReader["NoCertificationDay3"]?.ToString() + "|" + sqlDataReader["NoCertificationDay3All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman3"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman3All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand3"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["NoCertificationFarvardin4"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin4All"]?.ToString() + "," + sqlDataReader["NoCertificationOrdibehesht4"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht4All"]?.ToString() + "," + sqlDataReader["NoCertificationKhordad4"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad4All"]?.ToString() + "," + sqlDataReader["NoCertificationTir4"]?.ToString() + "|" + sqlDataReader["NoCertificationTir4All"]?.ToString() + "," + sqlDataReader["NoCertificationMordad4"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad4All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar4"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar4All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr4"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr4All"]?.ToString() + "," + sqlDataReader["NoCertificationAban4"]?.ToString() + "|" + sqlDataReader["NoCertificationAban4All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar4"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar4All"]?.ToString() + "," + sqlDataReader["NoCertificationDay4"]?.ToString() + "|" + sqlDataReader["NoCertificationDay4All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman4"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman4All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand4"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["NoCertificationFarvardin5"]?.ToString() + "|" + sqlDataReader["NoCertificationFarvardin5All"]?.ToString() + sqlDataReader["NoCertificationOrdibehesht5"]?.ToString() + "|" + sqlDataReader["NoCertificationOrdibehesht5All"]?.ToString() + sqlDataReader["NoCertificationKhordad5"]?.ToString() + "|" + sqlDataReader["NoCertificationKhordad5All"]?.ToString() + sqlDataReader["NoCertificationTir5"]?.ToString() + "|" + sqlDataReader["NoCertificationTir5All"]?.ToString() + sqlDataReader["NoCertificationMordad5"]?.ToString() + "|" + sqlDataReader["NoCertificationMordad5All"]?.ToString() + "," + sqlDataReader["NoCertificationShahrivar5"]?.ToString() + "|" + sqlDataReader["NoCertificationShahrivar5All"]?.ToString() + "," + sqlDataReader["NoCertificationMehr5"]?.ToString() + "|" + sqlDataReader["NoCertificationMehr5All"]?.ToString() + "," + sqlDataReader["NoCertificationAban5"]?.ToString() + "|" + sqlDataReader["NoCertificationAban5All"]?.ToString() + "," + sqlDataReader["NoCertificationAzar5"]?.ToString() + "|" + sqlDataReader["NoCertificationAzar5All"]?.ToString() + "," + sqlDataReader["NoCertificationDay5"]?.ToString() + "|" + sqlDataReader["NoCertificationDay5All"]?.ToString() + "," + sqlDataReader["NoCertificationBahman5"]?.ToString() + "|" + sqlDataReader["NoCertificationBahman5All"]?.ToString() + "," + sqlDataReader["NoCertificationEsfand5"]?.ToString() + "|" + sqlDataReader["NoCertificationEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "SafetyBelt" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["SafetyBeltFarvardin1"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin1All"]?.ToString() + "," + sqlDataReader["SafetyBeltOrdibehesht1"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht1All"]?.ToString() + "," + sqlDataReader["SafetyBeltKhordad1"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad1All"]?.ToString() + "," + sqlDataReader["SafetyBeltTir1"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir1All"]?.ToString() + "," + sqlDataReader["SafetyBeltMordad1"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad1All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar1"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar1All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr1"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr1All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban1"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban1All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar1"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar1All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay1"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay1All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman1"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman1All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand1"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["SafetyBeltFarvardin2"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin2All"]?.ToString() + "," + sqlDataReader["SafetyBeltOrdibehesht2"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht2All"]?.ToString() + "," + sqlDataReader["SafetyBeltKhordad2"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad2All"]?.ToString() + "," + sqlDataReader["SafetyBeltTir2"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir2All"]?.ToString() + "," + sqlDataReader["SafetyBeltMordad2"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad2All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar2"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar2All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr2"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr2All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban2"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban2All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar2"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar2All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay2"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay2All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman2"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman2All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand2"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["SafetyBeltFarvardin3"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin3All"]?.ToString() + "," + sqlDataReader["SafetyBeltOrdibehesht3"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht3All"]?.ToString() + "," + sqlDataReader["SafetyBeltKhordad3"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad3All"]?.ToString() + "," + sqlDataReader["SafetyBeltTir3"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir3All"]?.ToString() + "," + sqlDataReader["SafetyBeltMordad3"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad3All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar3"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar3All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr3"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr3All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban3"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban3All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar3"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar3All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay3"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay3All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman3"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman3All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand3"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["SafetyBeltFarvardin4"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin4All"]?.ToString() + "," + sqlDataReader["SafetyBeltOrdibehesht4"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht4All"]?.ToString() + "," + sqlDataReader["SafetyBeltKhordad4"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad4All"]?.ToString() + "," + sqlDataReader["SafetyBeltTir4"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir4All"]?.ToString() + "," + sqlDataReader["SafetyBeltMordad4"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad4All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar4"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar4All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr4"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr4All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban4"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban4All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar4"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar4All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay4"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay4All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman4"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman4All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand4"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["SafetyBeltFarvardin5"]?.ToString() + "|" + sqlDataReader["SafetyBeltFarvardin5All"]?.ToString() + sqlDataReader["SafetyBeltOrdibehesht5"]?.ToString() + "|" + sqlDataReader["SafetyBeltOrdibehesht5All"]?.ToString() + sqlDataReader["SafetyBeltKhordad5"]?.ToString() + "|" + sqlDataReader["SafetyBeltKhordad5All"]?.ToString() + sqlDataReader["SafetyBeltTir5"]?.ToString() + "|" + sqlDataReader["SafetyBeltTir5All"]?.ToString() + sqlDataReader["SafetyBeltMordad5"]?.ToString() + "|" + sqlDataReader["SafetyBeltMordad5All"]?.ToString() + "," + sqlDataReader["SafetyBeltShahrivar5"]?.ToString() + "|" + sqlDataReader["SafetyBeltShahrivar5All"]?.ToString() + "," + sqlDataReader["SafetyBeltMehr5"]?.ToString() + "|" + sqlDataReader["SafetyBeltMehr5All"]?.ToString() + "," + sqlDataReader["SafetyBeltAban5"]?.ToString() + "|" + sqlDataReader["SafetyBeltAban5All"]?.ToString() + "," + sqlDataReader["SafetyBeltAzar5"]?.ToString() + "|" + sqlDataReader["SafetyBeltAzar5All"]?.ToString() + "," + sqlDataReader["SafetyBeltDay5"]?.ToString() + "|" + sqlDataReader["SafetyBeltDay5All"]?.ToString() + "," + sqlDataReader["SafetyBeltBahman5"]?.ToString() + "|" + sqlDataReader["SafetyBeltBahman5All"]?.ToString() + "," + sqlDataReader["SafetyBeltEsfand5"]?.ToString() + "|" + sqlDataReader["SafetyBeltEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            else if (type == "Helmet" && sqlDataReader.Read())
                            {
                                firstYear = sqlDataReader["HelmetFarvardin1"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin1All"]?.ToString() + "," + sqlDataReader["HelmetOrdibehesht1"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht1All"]?.ToString() + "," + sqlDataReader["HelmetKhordad1"]?.ToString() + "|" + sqlDataReader["HelmetKhordad1All"]?.ToString() + "," + sqlDataReader["HelmetTir1"]?.ToString() + "|" + sqlDataReader["HelmetTir1All"]?.ToString() + "," + sqlDataReader["HelmetMordad1"]?.ToString() + "|" + sqlDataReader["HelmetMordad1All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar1"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar1All"]?.ToString() + "," + sqlDataReader["HelmetMehr1"]?.ToString() + "|" + sqlDataReader["HelmetMehr1All"]?.ToString() + "," + sqlDataReader["HelmetAban1"]?.ToString() + "|" + sqlDataReader["HelmetAban1All"]?.ToString() + "," + sqlDataReader["HelmetAzar1"]?.ToString() + "|" + sqlDataReader["HelmetAzar1All"]?.ToString() + "," + sqlDataReader["HelmetDay1"]?.ToString() + "|" + sqlDataReader["HelmetDay1All"]?.ToString() + "," + sqlDataReader["HelmetBahman1"]?.ToString() + "|" + sqlDataReader["HelmetBahman1All"]?.ToString() + "," + sqlDataReader["HelmetEsfand1"]?.ToString() + "|" + sqlDataReader["HelmetEsfand1All"]?.ToString();
                                secondYear = sqlDataReader["HelmetFarvardin2"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin2All"]?.ToString() + "," + sqlDataReader["HelmetOrdibehesht2"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht2All"]?.ToString() + "," + sqlDataReader["HelmetKhordad2"]?.ToString() + "|" + sqlDataReader["HelmetKhordad2All"]?.ToString() + "," + sqlDataReader["HelmetTir2"]?.ToString() + "|" + sqlDataReader["HelmetTir2All"]?.ToString() + "," + sqlDataReader["HelmetMordad2"]?.ToString() + "|" + sqlDataReader["HelmetMordad2All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar2"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar2All"]?.ToString() + "," + sqlDataReader["HelmetMehr2"]?.ToString() + "|" + sqlDataReader["HelmetMehr2All"]?.ToString() + "," + sqlDataReader["HelmetAban2"]?.ToString() + "|" + sqlDataReader["HelmetAban2All"]?.ToString() + "," + sqlDataReader["HelmetAzar2"]?.ToString() + "|" + sqlDataReader["HelmetAzar2All"]?.ToString() + "," + sqlDataReader["HelmetDay2"]?.ToString() + "|" + sqlDataReader["HelmetDay2All"]?.ToString() + "," + sqlDataReader["HelmetBahman2"]?.ToString() + "|" + sqlDataReader["HelmetBahman2All"]?.ToString() + "," + sqlDataReader["HelmetEsfand2"]?.ToString() + "|" + sqlDataReader["HelmetEsfand2All"]?.ToString();
                                thirdYear = sqlDataReader["HelmetFarvardin3"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin3All"]?.ToString() + "," + sqlDataReader["HelmetOrdibehesht3"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht3All"]?.ToString() + "," + sqlDataReader["HelmetKhordad3"]?.ToString() + "|" + sqlDataReader["HelmetKhordad3All"]?.ToString() + "," + sqlDataReader["HelmetTir3"]?.ToString() + "|" + sqlDataReader["HelmetTir3All"]?.ToString() + "," + sqlDataReader["HelmetMordad3"]?.ToString() + "|" + sqlDataReader["HelmetMordad3All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar3"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar3All"]?.ToString() + "," + sqlDataReader["HelmetMehr3"]?.ToString() + "|" + sqlDataReader["HelmetMehr3All"]?.ToString() + "," + sqlDataReader["HelmetAban3"]?.ToString() + "|" + sqlDataReader["HelmetAban3All"]?.ToString() + "," + sqlDataReader["HelmetAzar3"]?.ToString() + "|" + sqlDataReader["HelmetAzar3All"]?.ToString() + "," + sqlDataReader["HelmetDay3"]?.ToString() + "|" + sqlDataReader["HelmetDay3All"]?.ToString() + "," + sqlDataReader["HelmetBahman3"]?.ToString() + "|" + sqlDataReader["HelmetBahman3All"]?.ToString() + "," + sqlDataReader["HelmetEsfand3"]?.ToString() + "|" + sqlDataReader["HelmetEsfand3All"]?.ToString();
                                fourthYear = sqlDataReader["HelmetFarvardin4"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin4All"]?.ToString() + "," + sqlDataReader["HelmetOrdibehesht4"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht4All"]?.ToString() + "," + sqlDataReader["HelmetKhordad4"]?.ToString() + "|" + sqlDataReader["HelmetKhordad4All"]?.ToString() + "," + sqlDataReader["HelmetTir4"]?.ToString() + "|" + sqlDataReader["HelmetTir4All"]?.ToString() + "," + sqlDataReader["HelmetMordad4"]?.ToString() + "|" + sqlDataReader["HelmetMordad4All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar4"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar4All"]?.ToString() + "," + sqlDataReader["HelmetMehr4"]?.ToString() + "|" + sqlDataReader["HelmetMehr4All"]?.ToString() + "," + sqlDataReader["HelmetAban4"]?.ToString() + "|" + sqlDataReader["HelmetAban4All"]?.ToString() + "," + sqlDataReader["HelmetAzar4"]?.ToString() + "|" + sqlDataReader["HelmetAzar4All"]?.ToString() + "," + sqlDataReader["HelmetDay4"]?.ToString() + "|" + sqlDataReader["HelmetDay4All"]?.ToString() + "," + sqlDataReader["HelmetBahman4"]?.ToString() + "|" + sqlDataReader["HelmetBahman4All"]?.ToString() + "," + sqlDataReader["HelmetEsfand4"]?.ToString() + "|" + sqlDataReader["HelmetEsfand4All"]?.ToString();
                                fifthYear = sqlDataReader["HelmetFarvardin5"]?.ToString() + "|" + sqlDataReader["HelmetFarvardin5All"]?.ToString() + sqlDataReader["HelmetOrdibehesht5"]?.ToString() + "|" + sqlDataReader["HelmetOrdibehesht5All"]?.ToString() + sqlDataReader["HelmetKhordad5"]?.ToString() + "|" + sqlDataReader["HelmetKhordad5All"]?.ToString() + sqlDataReader["HelmetTir5"]?.ToString() + "|" + sqlDataReader["HelmetTir5All"]?.ToString() + sqlDataReader["HelmetMordad5"]?.ToString() + "|" + sqlDataReader["HelmetMordad5All"]?.ToString() + "," + sqlDataReader["HelmetShahrivar5"]?.ToString() + "|" + sqlDataReader["HelmetShahrivar5All"]?.ToString() + "," + sqlDataReader["HelmetMehr5"]?.ToString() + "|" + sqlDataReader["HelmetMehr5All"]?.ToString() + "," + sqlDataReader["HelmetAban5"]?.ToString() + "|" + sqlDataReader["HelmetAban5All"]?.ToString() + "," + sqlDataReader["HelmetAzar5"]?.ToString() + "|" + sqlDataReader["HelmetAzar5All"]?.ToString() + "," + sqlDataReader["HelmetDay5"]?.ToString() + "|" + sqlDataReader["HelmetDay5All"]?.ToString() + "," + sqlDataReader["HelmetBahman5"]?.ToString() + "|" + sqlDataReader["HelmetBahman5All"]?.ToString() + "," + sqlDataReader["HelmetEsfand5"]?.ToString() + "|" + sqlDataReader["HelmetEsfand5All"]?.ToString();
                                yearList = sqlDataReader["YearList"].ToString();
                            }
                            connection.Close();
                        }
                    }
                }
                catch (Exception ex)
                {
                    string omid = ex.Message;
                }
            }
        }

        public List<GetLocationComparison> SearchInLocationComparison(
          long? createById,
          string sp,
          string type,
          string status,
          string dateOfAccident,
          string dateOfAccidentEnd,
          string crashType,
          string serial,
          int? provinceId,
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
          bool allAccident,
          int? cityId,
          bool? inNativeArea,
          bool? isHoliday,
          string collisionChild1,
          string collisionChild2,
          int? axisId,
          bool? isNotLocalDriver)
        {
            List<GetLocationComparison> locationComparisonList = new List<GetLocationComparison>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sp, connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)type);
                    sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                    sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                    sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                    sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                    sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                    sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                    sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                    sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                    sqlCommand.Parameters.AddWithValue("@DayOfWeek", (object)getDays);
                    sqlCommand.Parameters.AddWithValue("@Month", (object)month);
                    sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                    sqlCommand.Parameters.AddWithValue("@LightingStatus", (object)lightingStatus);
                    sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                    sqlCommand.Parameters.AddWithValue("@CarriageWayDirection", (object)carriageWayDirection);
                    sqlCommand.Parameters.AddWithValue("@TypeOfWay", (object)typeOfWay);
                    sqlCommand.Parameters.AddWithValue("@CarCrashLocation", (object)carCrashLocation);
                    sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                    sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                    sqlCommand.Parameters.AddWithValue("@FromAgeDriver", (object)fromAgeDriver);
                    sqlCommand.Parameters.AddWithValue("@ToAgeDriver", (object)toAgeDriver);
                    sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                    sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                    sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                    sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                    sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                    sqlCommand.Parameters.AddWithValue("@AxisId", (object)axisId);
                    sqlCommand.Parameters.AddWithValue("@IsNotLocal", (object)isNotLocalDriver);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                        locationComparisonList.Add(new GetLocationComparison()
                        {
                            FirstCap = sqlDataReader["FirstCap"].ToString(),
                            SecondCap = sqlDataReader["SecondCap"].ToString(),
                            ThirdCap = sqlDataReader["ThirdCap"].ToString(),
                            FourthCap = sqlDataReader["FourthCap"].ToString(),
                            FifthCap = sqlDataReader["FifthCap"].ToString(),
                            SixthCap = sqlDataReader["SixthCap"].ToString(),
                            SeventhCap = sqlDataReader["SeventhCap"].ToString(),
                            CenterLocation = sqlDataReader["CenterLocation"].ToString(),
                            CityName = sqlDataReader["CityName"].ToString()
                        });
                    connection.Close();
                }
            }
            return locationComparisonList;
        }

        public void SearchInEventProcess(
          long? createById,
          string sp,
          string status,
          string dateOfAccident,
          string dateOfAccidentEnd,
          string crashType,
          string serial,
          int? provinceId,
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
          bool allAccident,
          int? cityId,
          bool? inNativeArea,
          bool? isHoliday,
          string collisionChild1,
          string collisionChild2,
          int? axisId,
          long? eventProcessId,
          int? startYear,
          int? endYear,
          bool? isNotLocalDriver,
          out string firstCap,
          out string secondCap,
          out string thirdCap,
          out string fourthCap,
          out string fifthCap,
          out string sixthCap,
          out string firstCapRange,
          out string secondCapRange,
          out string thirdCapRange,
          out string fourthCapRange,
          out string fifthCapRange,
          out string sixthCapRange,
          out string yearList)
        {
            firstCap = secondCap = thirdCap = fourthCap = fifthCap = sixthCap = yearList = "";
            firstCapRange = secondCapRange = thirdCapRange = fourthCapRange = fifthCapRange = sixthCapRange = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sp, connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@IsContainsSearch", (object)true);
                    sqlCommand.Parameters.AddWithValue("@Status", (object)status);
                    sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                    sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                    sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                    sqlCommand.Parameters.AddWithValue("@Serial", (object)serial);
                    sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)createById);
                    sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                    sqlCommand.Parameters.AddWithValue("@DayOfWeek", (object)getDays);
                    sqlCommand.Parameters.AddWithValue("@Month", (object)month);
                    sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                    sqlCommand.Parameters.AddWithValue("@LightingStatus", (object)lightingStatus);
                    sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                    sqlCommand.Parameters.AddWithValue("@CarriageWayDirection", (object)carriageWayDirection);
                    sqlCommand.Parameters.AddWithValue("@TypeOfWay", (object)typeOfWay);
                    sqlCommand.Parameters.AddWithValue("@CarCrashLocation", (object)carCrashLocation);
                    sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                    sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                    sqlCommand.Parameters.AddWithValue("@FromAgeDriver", (object)fromAgeDriver);
                    sqlCommand.Parameters.AddWithValue("@ToAgeDriver", (object)toAgeDriver);
                    sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                    sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                    sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                    sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                    sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                    sqlCommand.Parameters.AddWithValue("@AxisId", (object)axisId);
                    sqlCommand.Parameters.AddWithValue("@EventProcessId", (object)eventProcessId);
                    sqlCommand.Parameters.AddWithValue("@StartYear", (object)startYear);
                    sqlCommand.Parameters.AddWithValue("@EndYear", (object)endYear);
                    sqlCommand.Parameters.AddWithValue("@IsNotLocal", (object)isNotLocalDriver);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        firstCap = sqlDataReader["First"].ToString();
                        secondCap = sqlDataReader["Second"].ToString();
                        thirdCap = sqlDataReader["Third"].ToString();
                        firstCapRange = sqlDataReader["FirstRange"].ToString();
                        secondCapRange = sqlDataReader["SecondRange"].ToString();
                        thirdCapRange = sqlDataReader["ThirdRange"].ToString();
                        yearList = sqlDataReader["YearList"].ToString();
                        if (sp.Equals("SP_All_EventProcess_LightingStatus") || sp.Equals("SP_All_EventProcess_TwoVehicle"))
                        {
                            fourthCap = sqlDataReader["Fourth"].ToString();
                            fifthCap = sqlDataReader["Fifth"].ToString();
                            fourthCapRange = sqlDataReader["FourthRange"].ToString();
                            fifthCapRange = sqlDataReader["FifthRange"].ToString();
                        }
                        else if (sp.Equals("SP_All_EventProcess_Collision"))
                        {
                            fourthCap = sqlDataReader["Fourth"].ToString();
                            fifthCap = sqlDataReader["Fifth"].ToString();
                            sixthCap = sqlDataReader["Sixth"].ToString();
                            fourthCapRange = sqlDataReader["FourthRange"].ToString();
                            fifthCapRange = sqlDataReader["FifthRange"].ToString();
                            sixthCapRange = sqlDataReader["SixthRange"].ToString();
                        }
                    }
                    connection.Close();
                }
            }
        }

        public List<GetHeatMap> SearchInHeatMap(
          string dateOfAccident,
          string dateOfAccidentEnd,
          bool allAccident,
          string crashType,
          long? submitByUserId,
          string roadway,
          string locationLandUse,
          string visualObstruction,
          string roadDefects,
          bool? isHoliday,
          string collisionOfA,
          string weather,
          string typeOfVehicle,
          string vehicleType,
          string finalReason,
          int? provinceId,
          int? cityId,
          bool? inNativeArea,
          int? axisId,
          string collisionChild1,
          string collisionChild2,
          bool? isLocalDriver)
        {
             List<GetHeatMap> getHeatMapList = new List<GetHeatMap>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                if (crashType != "جرحی وفوتی")
                {
                    using (SqlCommand sqlCommand = new SqlCommand("SP_All_HeatMap", connection))
                    {
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                        sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                        sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                        sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)10031);
                        sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                        sqlCommand.Parameters.AddWithValue("@Roadway", (object)roadway);
                        sqlCommand.Parameters.AddWithValue("@FinalReason", (object)finalReason);
                        sqlCommand.Parameters.AddWithValue("@VisualObstruction", (object)visualObstruction);
                        sqlCommand.Parameters.AddWithValue("@VehicleType", (object)vehicleType);
                        sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                        sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                        sqlCommand.Parameters.AddWithValue("@TypeOfVehicle", (object)typeOfVehicle);
                        sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                        sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                        sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                        sqlCommand.Parameters.AddWithValue("@RoadDefects", (object)roadDefects);
                        if (isHoliday.HasValue)
                            sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                        sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                        sqlCommand.Parameters.AddWithValue("@AxisId", (object)10015);
                        sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                        sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                        //sqlCommand.Parameters.AddWithValue("@IsLocalDriver", (object)isLocalDriver);
                        connection.Open();
                        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                        while (sqlDataReader.Read())
                            getHeatMapList.Add(new GetHeatMap()
                            {
                                Id = sqlDataReader["Id"].ToString(),
                                Location = sqlDataReader["Location"].ToString(),
                                CrashType = sqlDataReader["CrashType"].ToString()
                            });
                        connection.Close();
                    } 
                }
                else
                {
                    using (SqlCommand sqlCommand = new SqlCommand("SP_All_HeatMap", connection))
                    {
                        crashType = "جرحی";
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                        sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                        sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                        sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)10031);
                        sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                        sqlCommand.Parameters.AddWithValue("@Roadway", (object)roadway);
                        sqlCommand.Parameters.AddWithValue("@FinalReason", (object)finalReason);
                        sqlCommand.Parameters.AddWithValue("@VisualObstruction", (object)visualObstruction);
                        sqlCommand.Parameters.AddWithValue("@VehicleType", (object)vehicleType);
                        sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                        sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                        sqlCommand.Parameters.AddWithValue("@TypeOfVehicle", (object)typeOfVehicle);
                        sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                        sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                        sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                        sqlCommand.Parameters.AddWithValue("@RoadDefects", (object)roadDefects);
                        if (isHoliday.HasValue)
                            sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                        sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                        sqlCommand.Parameters.AddWithValue("@AxisId", (object)10015);
                        sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                        sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                        //sqlCommand.Parameters.AddWithValue("@IsLocalDriver", (object)isLocalDriver);
                        connection.Open();
                        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                        while (sqlDataReader.Read())
                            getHeatMapList.Add(new GetHeatMap()
                            {
                                Id = sqlDataReader["Id"].ToString(),
                                Location = sqlDataReader["Location"].ToString(),
                                CrashType = sqlDataReader["CrashType"].ToString()
                            });
                        connection.Close();
                    }
                    using (SqlCommand sqlCommand = new SqlCommand("SP_All_HeatMap", connection))
                    {
                        crashType = "فوتی";
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                        sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                        sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                        sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)10031);
                        sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                        sqlCommand.Parameters.AddWithValue("@Roadway", (object)roadway);
                        sqlCommand.Parameters.AddWithValue("@FinalReason", (object)finalReason);
                        sqlCommand.Parameters.AddWithValue("@VisualObstruction", (object)visualObstruction);
                        sqlCommand.Parameters.AddWithValue("@VehicleType", (object)vehicleType);
                        sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                        sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                        sqlCommand.Parameters.AddWithValue("@TypeOfVehicle", (object)typeOfVehicle);
                        sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                        sqlCommand.Parameters.AddWithValue("@ProvinceId", (object)provinceId);
                        sqlCommand.Parameters.AddWithValue("@CityId", (object)cityId);
                        sqlCommand.Parameters.AddWithValue("@RoadDefects", (object)roadDefects);
                        if (isHoliday.HasValue)
                            sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                        sqlCommand.Parameters.AddWithValue("@InNativeArea", (object)inNativeArea);
                        sqlCommand.Parameters.AddWithValue("@AxisId", (object)10015);
                        sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                        sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                        //sqlCommand.Parameters.AddWithValue("@IsLocalDriver", (object)isLocalDriver);
                        connection.Open();
                        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                        while (sqlDataReader.Read())
                            getHeatMapList.Add(new GetHeatMap()
                            {
                                Id = sqlDataReader["Id"].ToString(),
                                Location = sqlDataReader["Location"].ToString(),
                                CrashType = sqlDataReader["CrashType"].ToString()
                            });
                        connection.Close();
                    }
                }




            }
            return getHeatMapList;
        }

        public List<MersadWebApplication.GetHeatMapDetails> GetHeatMapDetails(string idList)
        {
            List<MersadWebApplication.GetHeatMapDetails> heatMapDetails = new List<MersadWebApplication.GetHeatMapDetails>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_GetHeatMapDetails", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@IdList", (object)idList);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        heatMapDetails.Add(new MersadWebApplication.GetHeatMapDetails()
                        {
                            TimeOfAccident = sqlDataReader["TimeOfAccident"].ToString(),
                            InjuredCount = sqlDataReader["InjuredCount"].ToString(),
                            DeadCount = sqlDataReader["DeadCount"].ToString(),
                            CollisionOfA = sqlDataReader["CollisionOfA"].ToString(),
                            CollisionOfATwo = sqlDataReader["CollisionOfATwo"].ToString(),
                            TypeOfCollision = sqlDataReader["TypeOfCollision"].ToString(),
                            Car = sqlDataReader["Car"].ToString(),
                            Bus = sqlDataReader["Bus"].ToString(),
                            NavyBar = sqlDataReader["NavyBar"].ToString(),
                            MotorCycle = sqlDataReader["MotorCycle"].ToString(),
                            Bike = sqlDataReader["Bike"].ToString(),
                            Pedestrian = sqlDataReader["Pedestrian"].ToString(),
                            VisualObstruction = sqlDataReader["VisualObstruction"].ToString(),
                            RoadDefects = sqlDataReader["RoadDefects"].ToString(),
                            LightingStatus = sqlDataReader["LightingStatus"].ToString(),
                            CarCrashLocation = sqlDataReader["CarCrashLocation"].ToString(),
                            FinalReason = sqlDataReader["FinalReason"].ToString(),
                            LackOfAttention = sqlDataReader["LackOfAttention"].ToString()
                        });
                    connection.Close();
                }
            }
            return heatMapDetails;
        }

        public string ArrayFBcEffectiveWayDefects()
        {
            string str = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Chart", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"F-BcEffectiveWayDefects");
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        for (int index = 1; index <= 16; ++index)
                            str = str + sqlDataReader["RoadDefects" + index.ToString()]?.ToString() + ",";
                    }
                    else
                        str = "";
                    connection.Close();
                }
            }
            return str;
        }

        public string ArrayPEffectiveWayDefects()
        {
            string str = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Chart", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"P-EffectiveWayDefects");
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        for (int index = 1; index <= 3; ++index)
                            str = str + sqlDataReader["PieRoadDefects" + index.ToString()]?.ToString() + ",";
                    }
                    else
                        str = "";
                    connection.Close();
                }
            }
            return str;
        }

        public string ArrayFBcVisualObstruction()
        {
            string str = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Chart", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"F-BcVisualObstruction");
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        for (int index = 1; index <= 16; ++index)
                            str = str + sqlDataReader["VisualObstruction" + index.ToString()]?.ToString() + ",";
                    }
                    else
                        str = "";
                    connection.Close();
                }
            }
            return str;
        }

        public string ArrayPVisualObstruction()
        {
            string str = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Chart", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"P-VisualObstruction");
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        for (int index = 1; index <= 3; ++index)
                            str = str + sqlDataReader["PieVisualObstruction" + index.ToString()]?.ToString() + ",";
                    }
                    else
                        str = "";
                    connection.Close();
                }
            }
            return str;
        }

        public string ArrayPRoadwayWidth()
        {
            string str = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Chart", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"P-RoadwayWidth");
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        for (int index = 1; index <= 3; ++index)
                            str = str + sqlDataReader["PieRoadwayWidth" + index.ToString()]?.ToString() + ",";
                    }
                    else
                        str = "";
                    connection.Close();
                }
            }
            return str;
        }

        public void ArrayBGeometry(out string yekTarafe, out string doTarafe, out string doTwoTarafe)
        {
            yekTarafe = doTarafe = doTwoTarafe = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Chart", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"F-BcGeometry");
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        for (int index = 1; index <= 8; ++index)
                            yekTarafe = yekTarafe + sqlDataReader["Geometry1Tarafe" + index.ToString()]?.ToString() + ",";
                        for (int index = 1; index <= 8; ++index)
                            doTarafe = doTarafe + sqlDataReader["Geometry2Tarafe" + index.ToString()]?.ToString() + ",";
                        for (int index = 1; index <= 8; ++index)
                            doTwoTarafe = doTwoTarafe + sqlDataReader["Geometry2TwoTarafe" + index.ToString()]?.ToString() + ",";
                    }
                    connection.Close();
                }
            }
        }

        public long Insert_EventProcess(
          string eventName,
          string startDate,
          string endDate,
          long userId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Caption", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)eventName;
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@StartDate", SqlDbType.NVarChar);
            sqlParameter2.Value = (object)startDate;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@EndDate", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)endDate;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter4.Value = (object)userId;
            sqlParameterList.Add(sqlParameter4);
            return this.GlobalInsertWithReturnId(CommandType.StoredProcedure, "SP_Insert_EventProcess", sqlParameterList.ToArray());
        }

        public long Insert_LocationArea(
          string locationAreaName,
          int? cityId,
          bool? inNativeArea,
          int? axisId,
          long userId)
        {
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Caption", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)locationAreaName;
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@CityId", SqlDbType.Int);
            sqlParameter2.Value = (object)cityId;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@InNativeArea", SqlDbType.Bit);
            sqlParameter3.Value = (object)inNativeArea;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@AxisId", SqlDbType.Int);
            sqlParameter4.Value = (object)axisId;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@SubmitByUserId", SqlDbType.BigInt);
            sqlParameter5.Value = (object)userId;
            sqlParameterList.Add(sqlParameter5);
            return this.GlobalInsertWithReturnId(CommandType.StoredProcedure, "SP_Insert_LocationArea", sqlParameterList.ToArray());
        }

        public List<GetSafetyIndex> SearchInSafetyIndex(
          string dateOfAccident,
          string dateOfAccidentEnd,
          bool allAccident,
          string crashType,
          long? submitByUserId,
          string roadway,
          string locationLandUse,
          string visualObstruction,
          string roadDefects,
          bool? isHoliday,
          string collisionOfA,
          string weather,
          string typeOfVehicle,
          string vehicleType,
          string finalReason,
          string collisionChild1,
          string collisionChild2,
          bool? isLocalDriver)
        {
            List<GetSafetyIndex> getSafetyIndexList = new List<GetSafetyIndex>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                if (crashType != "جرحی وفوتی")
                {   using (SqlCommand sqlCommand = new SqlCommand("SP_All_SafetyIndex", connection))
                    {
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                        sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                        sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                        sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)submitByUserId);
                        sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                        sqlCommand.Parameters.AddWithValue("@Roadway", (object)roadway);
                        sqlCommand.Parameters.AddWithValue("@FinalReason", (object)finalReason);
                        sqlCommand.Parameters.AddWithValue("@VisualObstruction", (object)visualObstruction);
                        sqlCommand.Parameters.AddWithValue("@VehicleType", (object)vehicleType);
                        sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                        sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                        sqlCommand.Parameters.AddWithValue("@TypeOfVehicle", (object)typeOfVehicle);
                        sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                        sqlCommand.Parameters.AddWithValue("@RoadDefects", (object)roadDefects);
                        if (isHoliday.HasValue)
                            sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                        sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                        sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                        sqlCommand.Parameters.AddWithValue("@IsLocalDriver", (object)isLocalDriver);
                        connection.Open();
                        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                        if (sqlDataReader.Read())
                            getSafetyIndexList.Add(new GetSafetyIndex()
                            {
                                Abadan = sqlDataReader["Abadan"].ToString(),
                                Omidie = sqlDataReader["Omidie"].ToString(),
                                Andimeshk = sqlDataReader["Andimeshk"].ToString(),
                                Ahvaz = sqlDataReader["Ahvaz"].ToString(),
                                Eze = sqlDataReader["Eze"].ToString(),
                                BaghMalek = sqlDataReader["BaghMalek"].ToString(),
                                Mahshahr = sqlDataReader["Mahshahr"].ToString(),
                                Behbahan = sqlDataReader["Behbahan"].ToString(),
                                Khoramshahr = sqlDataReader["Khoramshahr"].ToString(),
                                Dezful = sqlDataReader["Dezful"].ToString(),
                                DahsteAzadegan = sqlDataReader["DahsteAzadegan"].ToString(),
                                Ramshir = sqlDataReader["Ramshir"].ToString(),
                                Ramhormoz = sqlDataReader["Ramhormoz"].ToString(),
                                Shadegan = sqlDataReader["Shadegan"].ToString(),
                                Shush = sqlDataReader["Shush"].ToString(),
                                Shooshtar = sqlDataReader["Shooshtar"].ToString(),
                                Gotvand = sqlDataReader["Gotvand"].ToString(),
                                Lali = sqlDataReader["Lali"].ToString(),
                                MasjedSoleiman = sqlDataReader["MasjedSoleiman"].ToString(),
                                Hendijan = sqlDataReader["Hendijan"].ToString(),
                                Andika = sqlDataReader["Andika"].ToString(),
                                Hoveize = sqlDataReader["Hoveize"].ToString(),
                                Haftkol = sqlDataReader["Haftkol"].ToString(),
                                Bavi = sqlDataReader["Bavi"].ToString(),
                                Karoun = sqlDataReader["Karoun"].ToString(),
                                Hamidie = sqlDataReader["Hamidie"].ToString(),
                                Aghajari = sqlDataReader["Aghajari"].ToString(),
                                Karkhe = sqlDataReader["Karkhe"].ToString(),
                                Dezpart = sqlDataReader["Dezpart"].ToString()
                            });
                        connection.Close();
                    } 
                }
                else
                {
                    using (SqlCommand sqlCommand = new SqlCommand("SP_All_SafetyIndex", connection))
                    {
                        crashType = "جرحی";
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                        sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                        sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                        sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)submitByUserId);
                        sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                        sqlCommand.Parameters.AddWithValue("@Roadway", (object)roadway);
                        sqlCommand.Parameters.AddWithValue("@FinalReason", (object)finalReason);
                        sqlCommand.Parameters.AddWithValue("@VisualObstruction", (object)visualObstruction);
                        sqlCommand.Parameters.AddWithValue("@VehicleType", (object)vehicleType);
                        sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                        sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                        sqlCommand.Parameters.AddWithValue("@TypeOfVehicle", (object)typeOfVehicle);
                        sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                        sqlCommand.Parameters.AddWithValue("@RoadDefects", (object)roadDefects);
                        if (isHoliday.HasValue)
                            sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                        sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                        sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                        sqlCommand.Parameters.AddWithValue("@IsLocalDriver", (object)isLocalDriver);
                        connection.Open();
                        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                        if (sqlDataReader.Read())
                            getSafetyIndexList.Add(new GetSafetyIndex()
                            {
                                Abadan = sqlDataReader["Abadan"].ToString(),
                                Omidie = sqlDataReader["Omidie"].ToString(),
                                Andimeshk = sqlDataReader["Andimeshk"].ToString(),
                                Ahvaz = sqlDataReader["Ahvaz"].ToString(),
                                Eze = sqlDataReader["Eze"].ToString(),
                                BaghMalek = sqlDataReader["BaghMalek"].ToString(),
                                Mahshahr = sqlDataReader["Mahshahr"].ToString(),
                                Behbahan = sqlDataReader["Behbahan"].ToString(),
                                Khoramshahr = sqlDataReader["Khoramshahr"].ToString(),
                                Dezful = sqlDataReader["Dezful"].ToString(),
                                DahsteAzadegan = sqlDataReader["DahsteAzadegan"].ToString(),
                                Ramshir = sqlDataReader["Ramshir"].ToString(),
                                Ramhormoz = sqlDataReader["Ramhormoz"].ToString(),
                                Shadegan = sqlDataReader["Shadegan"].ToString(),
                                Shush = sqlDataReader["Shush"].ToString(),
                                Shooshtar = sqlDataReader["Shooshtar"].ToString(),
                                Gotvand = sqlDataReader["Gotvand"].ToString(),
                                Lali = sqlDataReader["Lali"].ToString(),
                                MasjedSoleiman = sqlDataReader["MasjedSoleiman"].ToString(),
                                Hendijan = sqlDataReader["Hendijan"].ToString(),
                                Andika = sqlDataReader["Andika"].ToString(),
                                Hoveize = sqlDataReader["Hoveize"].ToString(),
                                Haftkol = sqlDataReader["Haftkol"].ToString(),
                                Bavi = sqlDataReader["Bavi"].ToString(),
                                Karoun = sqlDataReader["Karoun"].ToString(),
                                Hamidie = sqlDataReader["Hamidie"].ToString(),
                                Aghajari = sqlDataReader["Aghajari"].ToString(),
                                Karkhe = sqlDataReader["Karkhe"].ToString(),
                                Dezpart = sqlDataReader["Dezpart"].ToString()
                            });
                        connection.Close();
                    }
                    using (SqlCommand sqlCommand = new SqlCommand("SP_All_SafetyIndex", connection))
                    {
                        crashType = "فوتی";

                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@DateOfAccident", (object)dateOfAccident);
                        sqlCommand.Parameters.AddWithValue("@DateOfAccidentEnd", (object)dateOfAccidentEnd);
                        sqlCommand.Parameters.AddWithValue("@CrashType", (object)crashType);
                        sqlCommand.Parameters.AddWithValue("@SubmitByUserId", (object)submitByUserId);
                        sqlCommand.Parameters.AddWithValue("@AllAccident", (object)allAccident);
                        sqlCommand.Parameters.AddWithValue("@Roadway", (object)roadway);
                        sqlCommand.Parameters.AddWithValue("@FinalReason", (object)finalReason);
                        sqlCommand.Parameters.AddWithValue("@VisualObstruction", (object)visualObstruction);
                        sqlCommand.Parameters.AddWithValue("@VehicleType", (object)vehicleType);
                        sqlCommand.Parameters.AddWithValue("@Weather", (object)weather);
                        sqlCommand.Parameters.AddWithValue("@CollisionOfA", (object)collisionOfA);
                        sqlCommand.Parameters.AddWithValue("@TypeOfVehicle", (object)typeOfVehicle);
                        sqlCommand.Parameters.AddWithValue("@LocationLandUse", (object)locationLandUse);
                        sqlCommand.Parameters.AddWithValue("@RoadDefects", (object)roadDefects);
                        if (isHoliday.HasValue)
                            sqlCommand.Parameters.AddWithValue("@IsHoliday", (object)isHoliday);
                        sqlCommand.Parameters.AddWithValue("@CollisionChild1", (object)collisionChild1);
                        sqlCommand.Parameters.AddWithValue("@CollisionChild2", (object)collisionChild2);
                        sqlCommand.Parameters.AddWithValue("@IsLocalDriver", (object)isLocalDriver);
                        connection.Open();
                        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                        if (sqlDataReader.Read())
                            getSafetyIndexList.Add(new GetSafetyIndex()
                            {
                                Abadan = sqlDataReader["Abadan"].ToString(),
                                Omidie = sqlDataReader["Omidie"].ToString(),
                                Andimeshk = sqlDataReader["Andimeshk"].ToString(),
                                Ahvaz = sqlDataReader["Ahvaz"].ToString(),
                                Eze = sqlDataReader["Eze"].ToString(),
                                BaghMalek = sqlDataReader["BaghMalek"].ToString(),
                                Mahshahr = sqlDataReader["Mahshahr"].ToString(),
                                Behbahan = sqlDataReader["Behbahan"].ToString(),
                                Khoramshahr = sqlDataReader["Khoramshahr"].ToString(),
                                Dezful = sqlDataReader["Dezful"].ToString(),
                                DahsteAzadegan = sqlDataReader["DahsteAzadegan"].ToString(),
                                Ramshir = sqlDataReader["Ramshir"].ToString(),
                                Ramhormoz = sqlDataReader["Ramhormoz"].ToString(),
                                Shadegan = sqlDataReader["Shadegan"].ToString(),
                                Shush = sqlDataReader["Shush"].ToString(),
                                Shooshtar = sqlDataReader["Shooshtar"].ToString(),
                                Gotvand = sqlDataReader["Gotvand"].ToString(),
                                Lali = sqlDataReader["Lali"].ToString(),
                                MasjedSoleiman = sqlDataReader["MasjedSoleiman"].ToString(),
                                Hendijan = sqlDataReader["Hendijan"].ToString(),
                                Andika = sqlDataReader["Andika"].ToString(),
                                Hoveize = sqlDataReader["Hoveize"].ToString(),
                                Haftkol = sqlDataReader["Haftkol"].ToString(),
                                Bavi = sqlDataReader["Bavi"].ToString(),
                                Karoun = sqlDataReader["Karoun"].ToString(),
                                Hamidie = sqlDataReader["Hamidie"].ToString(),
                                Aghajari = sqlDataReader["Aghajari"].ToString(),
                                Karkhe = sqlDataReader["Karkhe"].ToString(),
                                Dezpart = sqlDataReader["Dezpart"].ToString()
                            });
                        connection.Close();
                    }
                }
            }
            return getSafetyIndexList;
        }

        public void SafetyIndexCityDetails(out string population, out string areaNumber)
        {
            population = areaNumber = "";
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SP_All_Load_Accident", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@Type", (object)"SafetyIndexCity");
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        population = sqlDataReader["Population"].ToString();
                        areaNumber = sqlDataReader["AreaNumber"].ToString();
                    }
                    connection.Close();
                }
            }
        }

        public List<GetSubmit> GetYear_LocationArea(long id)
        {
            List<GetSubmit> yearLocationArea = new List<GetSubmit>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select Year from TBL_LocationAreaChild where LocationAreaId = @LocationAreaId", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@LocationAreaId", (object)id);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        yearLocationArea.Add(new GetSubmit()
                        {
                            IsSuccess = "true",
                            Message = sqlDataReader["Year"].ToString()
                        });
                    connection.Close();
                }
            }
            return yearLocationArea;
        }

        public List<GetSubmit> GetYear_LocationArea_Title(long id)
        {
            List<GetSubmit> locationAreaTitle = new List<GetSubmit>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select tc.Name CityName,ta.Name AxisName,tp.InNativeArea,tp.CityId,tc.EnglishName from TBL_LocationArea tp left join TBL_City tc on tc.Id = tp.CityId left join TBL_Axis ta on ta.Id = tp.AxisId where tp.Id = @LocationAreaId", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@LocationAreaId", (object)id);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                        locationAreaTitle.Add(new GetSubmit()
                        {
                            IsSuccess = "true",
                            Message = sqlDataReader["CityName"].ToString(),
                            MessageTwo = sqlDataReader["AxisName"].ToString(),
                            MessageThree = sqlDataReader["InNativeArea"].ToString(),
                            MessageFour = sqlDataReader["CityId"].ToString(),
                            MessageFive = sqlDataReader["EnglishName"].ToString()
                        });
                    connection.Close();
                }
            }
            return locationAreaTitle;
        }

        public List<GetSubmit> FillComboLocationArea()
        {
            List<GetSubmit> getSubmitList = new List<GetSubmit>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select Id,Caption as Name from TBL_LocationArea", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        getSubmitList.Add(new GetSubmit()
                        {
                            Id = sqlDataReader["Id"].ToString(),
                            Message = sqlDataReader["Name"].ToString(),
                            IsSuccess = "true"
                        });
                    connection.Close();
                }
            }
            return getSubmitList;
        }

        public List<GetList5MonthThisYear> Fill5MonthThisYear(long getId)
        {
            List<GetList5MonthThisYear> list5MonthThisYearList = new List<GetList5MonthThisYear>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select * from TBL_LocationAreaChild_5Month where LocationAreaId = @LocationAreaId", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@LocationAreaId", (object)getId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        list5MonthThisYearList.Add(new GetList5MonthThisYear()
                        {
                            Year = sqlDataReader["Year"].ToString(),
                            Var1 = sqlDataReader["Var1"].ToString(),
                            Var2 = sqlDataReader["Var2"].ToString(),
                            Var3 = sqlDataReader["Var3"].ToString(),
                            Var4 = sqlDataReader["Var4"].ToString(),
                            Var5 = sqlDataReader["Var5"].ToString(),
                            Var6 = sqlDataReader["Var6"].ToString(),
                            Var7 = sqlDataReader["Var7"].ToString(),
                            Var8 = sqlDataReader["Var8"].ToString(),
                            Var9 = sqlDataReader["Var9"].ToString(),
                            Var10 = sqlDataReader["Var10"].ToString(),
                            Var11 = sqlDataReader["Var11"].ToString(),
                            Var12 = sqlDataReader["Var12"].ToString(),
                            Var13 = sqlDataReader["Var13"].ToString(),
                            Var14 = sqlDataReader["Var14"].ToString(),
                            Var15 = sqlDataReader["Var15"].ToString(),
                            Var16 = sqlDataReader["Var16"].ToString(),
                            Var17 = sqlDataReader["Var17"].ToString(),
                            Var18 = sqlDataReader["Var18"].ToString(),
                            Var19 = sqlDataReader["Var19"].ToString(),
                            Var20 = sqlDataReader["Var20"].ToString(),
                            Var21 = sqlDataReader["Var21"].ToString(),
                            Var22 = sqlDataReader["Var22"].ToString(),
                            Var23 = sqlDataReader["Var23"].ToString(),
                            Var24 = sqlDataReader["Var24"].ToString()
                        });
                    connection.Close();
                }
            }
            return list5MonthThisYearList;
        }

        public List<GetList5MonthThisYear> FillThisYearLocationArea(long getId, string season)
        {
            List<GetList5MonthThisYear> list5MonthThisYearList = new List<GetList5MonthThisYear>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select * from TBL_LocationAreaChild where LocationAreaId = @LocationAreaId and Season = @Season", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@LocationAreaId", (object)getId);
                    sqlCommand.Parameters.AddWithValue("@Season", (object)season);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        list5MonthThisYearList.Add(new GetList5MonthThisYear()
                        {
                            Year = sqlDataReader["Year"].ToString(),
                            Season = sqlDataReader["Season"].ToString(),
                            Var1 = sqlDataReader["Var1"].ToString(),
                            Var2 = sqlDataReader["Var2"].ToString(),
                            Var3 = sqlDataReader["Var3"].ToString(),
                            Var4 = sqlDataReader["Var4"].ToString(),
                            Var5 = sqlDataReader["Var5"].ToString(),
                            Var6 = sqlDataReader["Var6"].ToString(),
                            Var7 = sqlDataReader["Var7"].ToString(),
                            Var8 = sqlDataReader["Var8"].ToString(),
                            Var9 = sqlDataReader["Var9"].ToString(),
                            Var10 = sqlDataReader["Var10"].ToString(),
                            Var11 = sqlDataReader["Var11"].ToString(),
                            Var12 = sqlDataReader["Var12"].ToString(),
                            Var13 = sqlDataReader["Var13"].ToString(),
                            Var14 = sqlDataReader["Var14"].ToString(),
                            Var15 = sqlDataReader["Var15"].ToString(),
                            Var16 = sqlDataReader["Var16"].ToString(),
                            Var17 = sqlDataReader["Var17"].ToString(),
                            Var18 = sqlDataReader["Var18"].ToString(),
                            Var19 = sqlDataReader["Var19"].ToString(),
                            Var20 = sqlDataReader["Var20"].ToString(),
                            Var21 = sqlDataReader["Var21"].ToString(),
                            Var22 = sqlDataReader["Var22"].ToString(),
                            Var23 = sqlDataReader["Var23"].ToString(),
                            Var24 = sqlDataReader["Var24"].ToString()
                        });
                    connection.Close();
                }
            }
            return list5MonthThisYearList;
        }

        public List<GetListLocationAnalysis> FillLocationAnalysis(long getId)
        {
            List<GetListLocationAnalysis> locationAnalysisList = new List<GetListLocationAnalysis>();
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select * from TBL_LocationAreaAnalysis where LocationAreaId = @LocationAreaId", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@LocationAreaId", (object)getId);
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    while (sqlDataReader.Read())
                        locationAnalysisList.Add(new GetListLocationAnalysis()
                        {
                            CityId = sqlDataReader["CityId"].ToString(),
                            Var1 = sqlDataReader["Var1"].ToString(),
                            Var2 = sqlDataReader["Var2"].ToString(),
                            Var3 = sqlDataReader["Var3"].ToString(),
                            Var4 = sqlDataReader["Var4"].ToString(),
                            Var5 = sqlDataReader["Var5"].ToString(),
                            Var6 = sqlDataReader["Var6"].ToString(),
                            Var7 = sqlDataReader["Var7"].ToString(),
                            Var8 = sqlDataReader["Var8"].ToString(),
                            Var9 = sqlDataReader["Var9"].ToString(),
                            Var10 = sqlDataReader["Var10"].ToString(),
                            Var11 = sqlDataReader["Var11"].ToString(),
                            Var12 = sqlDataReader["Var12"].ToString(),
                            Var13 = sqlDataReader["Var13"].ToString(),
                            Var14 = sqlDataReader["Var14"].ToString(),
                            Var15 = sqlDataReader["Var15"].ToString(),
                            Var16 = sqlDataReader["Var16"].ToString(),
                            Var17 = sqlDataReader["Var17"].ToString(),
                            Var18 = sqlDataReader["Var18"].ToString(),
                            Var19 = sqlDataReader["Var19"].ToString(),
                            Var20 = sqlDataReader["Var20"].ToString(),
                            Var21 = sqlDataReader["Var21"].ToString(),
                            Var22 = sqlDataReader["Var22"].ToString(),
                            Var23 = sqlDataReader["Var23"].ToString(),
                            Var24 = sqlDataReader["Var24"].ToString(),
                            Var25 = sqlDataReader["Var25"].ToString(),
                            Var26 = sqlDataReader["Var26"].ToString(),
                            Var27 = sqlDataReader["Var27"].ToString()
                        });
                    connection.Close();
                }
            }
            return locationAnalysisList;
        }

        public bool GetUserForCookie(
          string username,
          string password,
          ref long userId,
          ref string name,
          ref string family,
          ref string getUsername,
          ref long planId,
          ref string planName,
          ref string absPath)
        {
            bool userForCookie = false;
            using (SqlConnection connection = new SqlConnection(this._constring))
            {
                using (SqlCommand sqlCommand = new SqlCommand("select top(1) tu.Id,tu.Name, tu.Family,tu.Username,tu.PlanId,tplan.Caption PlanName,iif(tu.DefaultButtonId is not null,(SELECT AbsolutePath FROM TBL_Button where Id = tu.DefaultButtonId),'') as AbsPath from TBL_User tu inner join TBL_Plan tplan on tplan.Id = tu.PlanId where tu.Username = @Username and tu.Password = @Password", connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@Username", (object)username);
                    sqlCommand.Parameters.AddWithValue("@Password", (object)this._helper.Encode(password));
                    connection.Open();
                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                    if (sqlDataReader.Read())
                    {
                        userForCookie = true;
                        userId = Convert.ToInt64(sqlDataReader["Id"]);
                        name = sqlDataReader["Name"].ToString();
                        family = sqlDataReader["Family"].ToString();
                        getUsername = sqlDataReader["Username"].ToString();
                        planId = Convert.ToInt64(sqlDataReader["PlanId"]);
                        planName = sqlDataReader["PlanName"].ToString();
                        absPath = sqlDataReader["AbsPath"].ToString();
                    }
                    connection.Close();
                }
            }
            return userForCookie;
        }
    }
}
