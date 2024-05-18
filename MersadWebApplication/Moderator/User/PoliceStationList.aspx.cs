using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator.User
{
    public partial class PoliceStationList : System.Web.UI.Page
    {

        // Token: 0x060002CA RID: 714 RVA: 0x0001C96C File Offset: 0x0001AB6C
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
                        bool flag3 = base.Request.QueryString["Id"] == null && base.Request.QueryString["Name"] == null && base.Request.QueryString["CommanderName"] == null && base.Request.QueryString["NationalId"] == null;
                        if (flag3)
                        {
                            this._sqlHelper.FillGridPoliceStation(this.gridUsers, null, null, null, new int?(100), null, null);
                        }
                        else
                        {
                            DataTable dt = new DataTable();
                            dt.Columns.Add("Id");
                            dt.Columns.Add("CreateDate");
                            dt.Columns.Add("Name");
                            dt.Columns.Add("Code");
                            dt.Columns.Add("Commander");
                            dt.Columns.Add("NationalId");
                            dt.Columns.Add("MilitaryRank");
                            dt.Columns.Add("EditUrl");
                            dt.Rows.Add(new object[]
                            {
                                "",
                                "",
                                "",
                                "",
                                "",
                                "",
                                "",
                                ""
                            });
                            this.gridUsers.DataSource = dt;
                            this.gridUsers.DataBind();
                            this.txtIdSearch.Value = base.Request.QueryString["Id"];
                            this.txtNameSearch.Value = base.Request.QueryString["Name"];
                            this.txtCommanderNameSearch.Value = base.Request.QueryString["CommanderName"];
                            this.txtNationalIdSearch.Value = base.Request.QueryString["NationalId"];
                            ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "key", "Search('');", true);
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

        // Token: 0x060002CB RID: 715 RVA: 0x0001CC40 File Offset: 0x0001AE40
        [WebMethod]
        public static List<GetGridPoliceStation> GetPoliceStationGrid(string name, string nationalId, string commanderName, string rowCount, string id)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetGridPoliceStation> result;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    result = new List<GetGridPoliceStation>
                    {
                        new GetGridPoliceStation
                        {
                            Id = "0",
                            Name = "صفحه را مجدد بارگذاری نمایید!"
                        }
                    };
                }
                else
                {
                    ClsHelper helper = new ClsHelper();
                    bool flag2 = !string.IsNullOrEmpty(id) && !helper.IsNumber(id);
                    if (flag2)
                    {
                        result = new List<GetGridPoliceStation>
                        {
                            new GetGridPoliceStation
                            {
                                Id = "0",
                                Name = "شناسه باید عدد باشد!"
                            }
                        };
                    }
                    else
                    {
                        long? getId = string.IsNullOrEmpty(id) ? null : new long?(Convert.ToInt64(id));
                        List<GetGridPoliceStation> getList = sqlHelper.FillGridPoliceStationAjax(name, nationalId, commanderName, new int?(Convert.ToInt32(rowCount)), getId, null);
                        bool flag3 = getList.Count == 0;
                        if (flag3)
                        {
                            result = new List<GetGridPoliceStation>
                            {
                                new GetGridPoliceStation
                                {
                                    Id = "-1",
                                    Name = "داده ای یافت نشد!"
                                }
                            };
                        }
                        else
                        {
                            result = getList;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                result = new List<GetGridPoliceStation>
                {
                    new GetGridPoliceStation
                    {
                        Id = "0",
                        Name = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید"
                    }
                };
            }
            return result;
        }

        // Token: 0x060002CC RID: 716 RVA: 0x0001CDCC File Offset: 0x0001AFCC
        protected void gridUsers_OnRowCommand(object sender, GridViewCommandEventArgs e)
        {
            try
            {
            }
            catch (Exception)
            {
            }
        }

        // Token: 0x04000167 RID: 359
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();

        // Token: 0x04000168 RID: 360
        private readonly ClsHelper _helper = new ClsHelper();

    }
}