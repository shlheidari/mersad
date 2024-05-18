using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator.Analysis
{
    public partial class LocationAnalysis : System.Web.UI.Page
    {
           // Token: 0x0600034B RID: 843 RVA: 0x00002DF2 File Offset: 0x00000FF2
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        // Token: 0x0600034C RID: 844 RVA: 0x00028F14 File Offset: 0x00027114
        [WebMethod]
        public static List<GetListLocationAnalysis> GetLocationAnalysis(string getId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetListLocationAnalysis> result;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    result = new List<GetListLocationAnalysis>
                    {
                        new GetListLocationAnalysis
                        {
                            Var1 = "صفحه را مجدد بارگذاری نمایید!",
                            Var2 = "false"
                        }
                    };
                }
                else
                {
                    bool flag2 = string.IsNullOrEmpty(getId);
                    if (flag2)
                    {
                        result = new List<GetListLocationAnalysis>
                        {
                            new GetListLocationAnalysis
                            {
                                Var1 = "یک محدوده مکانی را انتخاب نمایید!",
                                Var2 = "false"
                            }
                        };
                    }
                    else
                    {
                        result = sqlHelper.FillLocationAnalysis(Convert.ToInt64(getId));
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                result = new List<GetListLocationAnalysis>
                {
                    new GetListLocationAnalysis
                    {
                        Var1 = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید",
                        Var2 = "false"
                    }
                };
            }
            return result;
        }

    }
}