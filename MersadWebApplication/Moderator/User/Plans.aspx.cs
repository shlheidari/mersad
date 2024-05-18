using MersadWebApplication.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace MersadWebApplication.Moderator.User
{
    public partial class Plans : System.Web.UI.Page
    {
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();
        private readonly ClsHelper _helper = new ClsHelper();
      

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!CheckSession.ControlSession() || this.IsPostBack)
                {
                    return;
                }
                this._sqlHelper.FillAllHtmlSelects(this.cmbButton, "FillCmbBtn", "SP_All_TBL_Plan");
                this._sqlHelper.FillGridPlan(this.gridPlans, (string)null, new int?(100), new long?(), new long?());
                this.FillTree();
                if (this.Request.QueryString["Id"] == null)
                {
                    return;
                }
                long int64 = Convert.ToInt64(this.Request.QueryString["Id"]);
                string name;
                string btn;
                this._sqlHelper.GetEditPlan(int64, out name, out btn);
                this.txtName.Value = name;
                this.cmbButton.Text = btn;
                this.hidId.Value = int64.ToString();
            }
            catch (Exception ex)
            {
                this.lblMessage.InnerHtml = this._helper.ErrorMessages("خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید");
                this.lblMessage.Visible = true;
                this._sqlHelper.Insert_Exception("", ex.ToString());
            }
        }

        private void FillTree()
        {
            using (DataManagementDataContext DataManagementDataContext = new DataManagementDataContext())            {
                foreach (TBL_Parent tblParent in (IEnumerable<TBL_Parent>)DataManagementDataContext.TBL_Parents)
                {
                    TreeNode treeNode = new TreeNode();
                    treeNode.Text = tblParent.Caption;
                    int id = tblParent.Id;
                    treeNode.Value = id.ToString();
                    treeNode.SelectAction = TreeNodeSelectAction.None;
                    TreeNode child1 = treeNode;
                    this.treeNode.Nodes.Add(child1);
                    if (this.Session["UserRoleName"].Equals((object)"SuperAdmin"))
                    {
                        foreach (TBL_Button tblButton in (IEnumerable<TBL_Button>)tblParent.TBL_Buttons.OrderBy<TBL_Button, int>((Func<TBL_Button, int>)(c => c.OrderBy)))
                        {
                            TreeNodeCollection childNodes = child1.ChildNodes;
                            TreeNode child2 = new TreeNode();
                            child2.Text = tblButton.Caption;
                            id = tblButton.Id;
                            child2.Value = id.ToString();
                            child2.SelectAction = TreeNodeSelectAction.None;
                            childNodes.Add(child2);
                        }
                    }
                    else
                    {
                       var tblAccessToButtons = DataManagementDataContext.TBL_AccessToButtons;
                        Expression<Func<TBL_AccessToButton, bool>> predicate = (Expression<Func<TBL_AccessToButton, bool>>)(d => d.UserId.Equals(this.Session["UserId"]));
                        foreach (TBL_AccessToButton tblAccessToButton in (IEnumerable<TBL_AccessToButton>)tblAccessToButtons.Where<TBL_AccessToButton>(predicate))
                        {
                            TBL_AccessToButton i1 = tblAccessToButton;
                            foreach (TBL_Button tblButton in (IEnumerable<TBL_Button>)tblParent.TBL_Buttons.Where<TBL_Button>((Func<TBL_Button, bool>)(c => c.Id.Equals(i1.ButtonId))).OrderBy<TBL_Button, int>((Func<TBL_Button, int>)(c => c.OrderBy)))
                            {
                                TreeNodeCollection childNodes = child1.ChildNodes;
                                TreeNode child3 = new TreeNode();
                                child3.Text = tblButton.Caption;
                                id = tblButton.Id;
                                child3.Value = id.ToString();
                                child3.SelectAction = TreeNodeSelectAction.None;
                                childNodes.Add(child3);
                            }
                        }
                    }
                }
            }
            GC.Collect();
        }

        private void UnCheckTree()
        {
            if (this.treeNode.Nodes.Count <= 0)
                return;
            foreach (TreeNode node in this.treeNode.Nodes)
            {
                node.Checked = false;
                if (node.ChildNodes.Count > 0)
                {
                    foreach (TreeNode childNode in node.ChildNodes)
                        childNode.Checked = false;
                }
            }
        }




        [WebMethod]
        public static List<GetGridPlan> GetPlanGrid(string name, string id)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return new List<GetGridPlan>()
          {
            new GetGridPlan()
            {
              Id = "0",
              Caption = "صفحه را مجدد بارگذاری نمایید!"
            }
          };
                ClsHelper clsHelper = new ClsHelper();
                if (!string.IsNullOrEmpty(id) && !clsHelper.IsNumber(id))
                    return new List<GetGridPlan>()
          {
            new GetGridPlan()
            {
              Id = "0",
              Caption = "شناسه باید عدد باشد!"
            }
          };
                List<GetGridPlan> planGrid = clsSqlHelper.FillGridPlanAjax(name, new int?(100), string.IsNullOrEmpty(id) ? new long?() : new long?(Convert.ToInt64(id)), new long?());
                if (planGrid.Count != 0)
                    return planGrid;
                return new List<GetGridPlan>()
        {
          new GetGridPlan()
          {
            Id = "-1",
            Caption = "داده ای یافت نشد!"
          }
        };
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return new List<GetGridPlan>()
        {
          new GetGridPlan()
          {
            Id = "0",
            Caption = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید"
          }
        };
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetButton()
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return new List<GetSubmit>()
          {
            new GetSubmit()
            {
              Id = "0",
              Message = "صفحه را مجدد بارگذاری نمایید!"
            }
          };
                return new List<GetSubmit>()
        {
          new GetSubmit() { Id = "-1", Message = "داده ای یافت نشد!" }
        };
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return new List<GetSubmit>()
        {
          new GetSubmit()
          {
            Id = "0",
            Message = "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید"
          }
        };
            }
        }

        [WebMethod]
        public static List<GetSubmit> GetInsertOrUpdatePlan(string id, string name, string btn)
        {
            ClsSqlHelper clsSqlHelper = new ClsSqlHelper();
            try
            {
                if (!CheckSession.ControlSession())
                    return Plans.GetSubmitMethod("", "صفحه را مجدد بارگذاری نمایید!", "", "false");
                if (string.IsNullOrEmpty(name))
                    return Plans.GetSubmitMethod("", "عنوان سمت را وارد کنید!", "", "false");
                if (string.IsNullOrEmpty(btn) || btn.Equals("-1"))
                    return Plans.GetSubmitMethod("", "صفحه پیش فرض را انتخاب کنید!", "", "false");
                long int64 = Convert.ToInt64(HttpContext.Current.Session["UserId"]);
                long num = string.IsNullOrEmpty(id) ? clsSqlHelper.Insert_Plan(name, Convert.ToInt32(btn), int64) : clsSqlHelper.SetEditPlan(Convert.ToInt64(id), name, Convert.ToInt32(btn));
                return num.Equals(-1L) ? Plans.GetSubmitMethod("", "عنوان سمت وارد شده،از قبل وجود دارد!", "", "false") : Plans.GetSubmitMethod(num.ToString(), "اطلاعات با موفقیت ثبت و ذخیره شد!", "", "true");
            }
            catch (Exception ex)
            {
                clsSqlHelper.Insert_Exception("", ex.ToString());
                return Plans.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
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

        protected void gridPlans_OnRowCommand(object sender, GridViewCommandEventArgs e)
        {
            try
            {
                if (!CheckSession.ControlSession())
                    return;
                this.lblMessage.Visible = false;
                long id = Convert.ToInt64(e.CommandArgument);
                this.hidenId.Value = id.ToString();
                if (!e.CommandName.Equals("AuthenticationRow"))
                    return;
                this.lblAuthenticationMessage.Visible = false;
                this.UnCheckTree();
                int buttonId = this._sqlHelper.Select_GetButtonId(id);
                using (DataManagementDataContext DataManagementDataContext = new DataManagementDataContext())
                {
                    this.lblNameForAut.InnerHtml = "(" + this._sqlHelper.Select_PlanName(id) + ")";
                    List<TBL_AccessToButtonPlan> list = DataManagementDataContext.TBL_AccessToButtonPlans.Where<TBL_AccessToButtonPlan>((Expression<Func<TBL_AccessToButtonPlan, bool>>)(c => c.PlanId == id)).ToList<TBL_AccessToButtonPlan>();
                    foreach (TreeNode node in this.treeNode.Nodes)
                    {
                        if (node.ChildNodes.Count != 0)
                        {
                            foreach (TreeNode childNode in node.ChildNodes)
                            {
                                TreeNode cNode = childNode;
                                TBL_AccessToButtonPlan accessToButtonPlan = list.FirstOrDefault<TBL_AccessToButtonPlan>((Func<TBL_AccessToButtonPlan, bool>)(c => c.ButtonId == Convert.ToInt32(cNode.Value)));
                                if (cNode.Value.Equals(buttonId.ToString()))
                                    cNode.Checked = true;
                                else if (accessToButtonPlan != null)
                                    cNode.Checked = true;
                            }
                        }
                    }
                }
                System.Web.UI.ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "key", "$('#AuthenticationDialog').modal();", true);
            }
            catch (Exception ex)
            {
                this.lblMessage.InnerHtml = this._helper.ErrorMessages("خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید");
                this.lblMessage.Visible = true;
                this._sqlHelper.Insert_Exception("", ex.ToString());
            }
        }

        protected void btnSaveAuthentication_Click(object sender, EventArgs e)
        {
            try
            {
                if (!CheckSession.ControlSession())
                    return;
                this.lblAuthenticationMessage.Visible = false;
                long id = Convert.ToInt64(this.hidenId.Value);
                int buttonId = this._sqlHelper.Select_GetButtonId(id);
                if (this.treeNode.Nodes.Count > 0)
                {
                    foreach (TreeNode node in this.treeNode.Nodes)
                    {
                        if (node.ChildNodes.Count != 0)
                        {
                            foreach (TreeNode childNode in node.ChildNodes)
                            {
                                if (childNode.Value.Equals(buttonId.ToString()) && !childNode.Checked)
                                {
                                    this.lblAuthenticationMessage.InnerHtml = this._helper.ErrorMessages("صفحه پیش فرض تعیین شده برای این طرح،باید در سطح دسترسی انتخاب شود");
                                    this.lblAuthenticationMessage.Visible = true;
                                    System.Web.UI.ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "key", "$('#AuthenticationDialog').modal();", true);
                                    return;
                                }
                            }
                        }
                    }
                }
                using (DataManagementDataContext DataManagementDataContext = new DataManagementDataContext())
                {
                    IQueryable<TBL_AccessToButtonPlan> queryable = DataManagementDataContext.TBL_AccessToButtonPlans.Where<TBL_AccessToButtonPlan>((Expression<Func<TBL_AccessToButtonPlan, bool>>)(c => c.PlanId.Equals(id)));
                    if (queryable.Any<TBL_AccessToButtonPlan>())
                    {
                        DataManagementDataContext.TBL_AccessToButtonPlans.DeleteAllOnSubmit<TBL_AccessToButtonPlan>((IEnumerable<TBL_AccessToButtonPlan>)queryable);
                        DataManagementDataContext.SubmitChanges();
                    }
                    List<TBL_AccessToButtonPlan> entities = new List<TBL_AccessToButtonPlan>();
                    if (this.treeNode.Nodes.Count > 0)
                    {
                        foreach (TreeNode node in this.treeNode.Nodes)
                        {
                            if (node.ChildNodes.Count != 0)
                                entities.AddRange(node.ChildNodes.Cast<TreeNode>().Where<TreeNode>((Func<TreeNode, bool>)(cNode => cNode.Checked)).Select<TreeNode, TBL_AccessToButtonPlan>((Func<TreeNode, TBL_AccessToButtonPlan>)(cNode => new TBL_AccessToButtonPlan()
                                {
                                    PlanId = Convert.ToInt64(this.hidenId.Value),
                                    ButtonId = Convert.ToInt32(cNode.Value)
                                })));
                        }
                    }
                    if (entities.Count > 0)
                    {
                        DataManagementDataContext.TBL_AccessToButtonPlans.InsertAllOnSubmit<TBL_AccessToButtonPlan>((IEnumerable<TBL_AccessToButtonPlan>)entities);
                        DataManagementDataContext.SubmitChanges();
                    }
                }
                this.lblAuthenticationMessage.InnerHtml = this._helper.SuccessMessages("سطح دسترسی با موفقیت ثبت شد");
                this.lblAuthenticationMessage.Visible = true;
                System.Web.UI.ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "key", "$('#AuthenticationDialog').modal();", true);
            }
            catch (Exception ex)
            {
                this.lblMessage.InnerHtml = this._helper.ErrorMessages("خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید");
                this.lblMessage.Visible = true;
                this._sqlHelper.Insert_Exception("", ex.ToString());
                System.Web.UI.ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "key", "$('#AuthenticationDialog').modal();", true);
            }
        }

    }
}