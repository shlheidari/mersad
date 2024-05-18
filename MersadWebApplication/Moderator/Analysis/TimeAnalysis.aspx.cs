using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator.Analysis
{
    public partial class TimeAnalysis : System.Web.UI.Page
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
                    }
                }
            }
            catch (Exception ex)
            {
                this._sqlHelper.Insert_Exception("", ex.ToString());
            }
        }

        // Token: 0x0600034F RID: 847 RVA: 0x00029058 File Offset: 0x00027258
        [WebMethod]
        public static List<GetSubmit> SaveLocationArea(string locationAreaName, string cityId, string inNativeArea, string axisId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            ClsHelper helper = new ClsHelper();
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
                    bool flag2 = string.IsNullOrEmpty(locationAreaName);
                    if (flag2)
                    {
                        result = new List<GetSubmit>
                        {
                            new GetSubmit
                            {
                                Message = "نام محدوده مکانی را وارد نمایید!",
                                IsSuccess = "false"
                            }
                        };
                    }
                    else
                    {
                        bool flag3 = string.IsNullOrEmpty(cityId);
                        if (flag3)
                        {
                            result = new List<GetSubmit>
                            {
                                new GetSubmit
                                {
                                    Message = "شهرستان را انتخاب نمایید!",
                                    IsSuccess = "false"
                                }
                            };
                        }
                        else
                        {
                            long submitByUserId = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                            int? getCitySearch = (string.IsNullOrEmpty(cityId) || cityId == "-1") ? null : new int?(Convert.ToInt32(cityId));
                            int? getAxisId = (string.IsNullOrEmpty(axisId) || axisId == "-1") ? null : new int?(Convert.ToInt32(axisId));
                            bool? getInNativeAreaSearch = string.IsNullOrEmpty(inNativeArea) ? null : new bool?(Convert.ToBoolean(inNativeArea));
                            long getExists = sqlHelper.Insert_LocationArea(locationAreaName, getCitySearch, getInNativeAreaSearch, getAxisId, submitByUserId);
                            bool flag4 = getExists == -1L;
                            if (flag4)
                            {
                                result = new List<GetSubmit>
                                {
                                    new GetSubmit
                                    {
                                        Message = "نام محدوده مکانی وارد شده قبلا در سیستم ثبت شده!",
                                        IsSuccess = "false"
                                    }
                                };
                            }
                            else
                            {
                                result = new List<GetSubmit>
                                {
                                    new GetSubmit
                                    {
                                        Id = getExists.ToString(),
                                        Message = "محدوده مکانی جدید با موفقیت ثبت شد!",
                                        IsSuccess = "true"
                                    }
                                };
                            }
                        }
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

        // Token: 0x06000350 RID: 848 RVA: 0x000292A4 File Offset: 0x000274A4
        [WebMethod]
        public static List<GetSubmit> GetFillYear(string getId)
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
                    bool flag2 = string.IsNullOrEmpty(getId);
                    if (flag2)
                    {
                        result = new List<GetSubmit>
                        {
                            new GetSubmit
                            {
                                Message = "یک محدوده مکانی را انتخاب نمایید!",
                                IsSuccess = "false"
                            }
                        };
                    }
                    else
                    {
                        long getComboId = Convert.ToInt64(getId);
                        result = sqlHelper.GetYear_LocationArea(getComboId);
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

        // Token: 0x06000351 RID: 849 RVA: 0x00029390 File Offset: 0x00027590
        [WebMethod]
        public static List<GetSubmit> GetFillTitleLocationArea(string getId)
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
                    bool flag2 = string.IsNullOrEmpty(getId);
                    if (flag2)
                    {
                        result = new List<GetSubmit>
                        {
                            new GetSubmit
                            {
                                Message = "یک محدوده مکانی را انتخاب نمایید!",
                                IsSuccess = "false"
                            }
                        };
                    }
                    else
                    {
                        long getComboId = Convert.ToInt64(getId);
                        result = sqlHelper.GetYear_LocationArea_Title(getComboId);
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

        // Token: 0x06000352 RID: 850 RVA: 0x0002947C File Offset: 0x0002767C
        [WebMethod]
        public static List<GetSubmit> GetFillComboLocationArea()
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
                    result = sqlHelper.FillComboLocationArea();
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

        // Token: 0x06000353 RID: 851 RVA: 0x00029524 File Offset: 0x00027724
        [WebMethod]
        public static List<GetList5MonthThisYear> Get5MonthThisYear(string getId)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetList5MonthThisYear> result;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    result = new List<GetList5MonthThisYear>
                    {
                        new GetList5MonthThisYear
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
                        result = new List<GetList5MonthThisYear>
                        {
                            new GetList5MonthThisYear
                            {
                                Var1 = "یک محدوده مکانی را انتخاب نمایید!",
                                Var2 = "false"
                            }
                        };
                    }
                    else
                    {
                        result = sqlHelper.Fill5MonthThisYear(Convert.ToInt64(getId));
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                result = new List<GetList5MonthThisYear>
                {
                    new GetList5MonthThisYear
                    {
                        Var1 = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید",
                        Var2 = "false"
                    }
                };
            }
            return result;
        }

        // Token: 0x06000354 RID: 852 RVA: 0x0002960C File Offset: 0x0002780C
        [WebMethod]
        public static List<GetList5MonthThisYear> GetThisYearLocationArea(string getId, string season)
        {
            ClsSqlHelper sqlHelper = new ClsSqlHelper();
            List<GetList5MonthThisYear> result;
            try
            {
                bool flag = !CheckSession.ControlSession();
                if (flag)
                {
                    result = new List<GetList5MonthThisYear>
                    {
                        new GetList5MonthThisYear
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
                        result = new List<GetList5MonthThisYear>
                        {
                            new GetList5MonthThisYear
                            {
                                Var1 = "یک محدوده مکانی را انتخاب نمایید!",
                                Var2 = "false"
                            }
                        };
                    }
                    else
                    {
                        result = sqlHelper.FillThisYearLocationArea(Convert.ToInt64(getId), season);
                    }
                }
            }
            catch (Exception ex)
            {
                sqlHelper.Insert_Exception("", ex.ToString());
                result = new List<GetList5MonthThisYear>
                {
                    new GetList5MonthThisYear
                    {
                        Var1 = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید",
                        Var2 = "false"
                    }
                };
            }
            return result;
        }

        // Token: 0x040001EA RID: 490
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();

        // Token: 0x040001EB RID: 491
        private readonly ClsHelper _helper = new ClsHelper();

    }
}