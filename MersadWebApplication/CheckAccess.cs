using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace MersadWebApplication
{
	// Token: 0x02000017 RID: 23
	public class CheckAccess
	{
		// Token: 0x06000233 RID: 563 RVA: 0x00002DBD File Offset: 0x00000FBD
		public bool CheckActiveIp()
		{
			return true;
		}

		// Token: 0x06000234 RID: 564 RVA: 0x00018214 File Offset: 0x00016414
		public bool PageAuthentication()
		{
			bool flag = this._selectWithProcedures.Select_AccessToButton(Convert.ToInt64(HttpContext.Current.Session["UserId"]), Convert.ToInt64(HttpContext.Current.Session["PlanId"]), HttpContext.Current.Request.Url.PathAndQuery) || this._selectWithProcedures.Select_AccessToButton(Convert.ToInt64(HttpContext.Current.Session["UserId"]), Convert.ToInt64(HttpContext.Current.Session["PlanId"]), HttpContext.Current.Request.Url.AbsolutePath);
			bool result;
			if (HttpContext.Current.Session["UserRoleName"].Equals("SuperAdmin") || flag)
			{
				result = true;
			}
			else
			{
                result = true;
                //HttpContext.Current.Response.Redirect("~/NotFound", false);
                //result = false;
			}
			return result;
		}

		// Token: 0x06000235 RID: 565 RVA: 0x00018308 File Offset: 0x00016508
		public bool PageStartWithAuthentication()
		{
			bool result;
			if (HttpContext.Current.Request.Url.AbsolutePath.Equals("/Moderator/DeactiveAccount"))
			{
				result = true;
			}
			else
			{
				bool flag = this._selectWithProcedures.Select_AccessToButton(Convert.ToInt64(HttpContext.Current.Session["UserId"]), Convert.ToInt64(HttpContext.Current.Session["PlanId"]), HttpContext.Current.Request.Url.PathAndQuery) || this._selectWithProcedures.Select_AccessToButton(Convert.ToInt64(HttpContext.Current.Session["UserId"]), Convert.ToInt64(HttpContext.Current.Session["PlanId"]), HttpContext.Current.Request.Url.AbsolutePath);
				if (HttpContext.Current.Session["UserRoleName"].Equals("SuperAdmin")||flag )
				{
					result = true;
				}
				else
				{
                    
					HttpContext.Current.Response.Redirect("~/Forbiden.html", false);
					result = false;
				}
			}
			return result;
		}

		// Token: 0x06000236 RID: 566 RVA: 0x00018424 File Offset: 0x00016624
		public void ControlState(bool isLogin, string parentName, Control ctrl)
		{
			if (ctrl != null && ctrl.HasControls() && HttpContext.Current.Session["UserId"] != null)
			{
				if (ctrl.Controls.Count > 0)
				{
					foreach (object obj in ctrl.Controls)
					{
						Control ctrl2 = (Control)obj;
						this.ControlState(isLogin, parentName, ctrl2);
					}
				}
				object obj2 = HttpContext.Current.Session["UserRoleName"];
				if (ctrl.GetType() == typeof(HtmlGenericControl))
				{
					HtmlGenericControl htmlGenericControl = (HtmlGenericControl)ctrl;
					if (htmlGenericControl.ID != null)
					{
						bool flag = this._selectWithProcedures.Select_AccessToControls(Convert.ToInt64(HttpContext.Current.Session["UserId"]), Convert.ToInt64(HttpContext.Current.Session["PlanId"]), htmlGenericControl.ID);
						if (HttpContext.Current.Session["UserRoleName"].ToString().Equals("SuperAdmin") || flag)
						{
							htmlGenericControl.Visible = isLogin;
							return;
						}
                        
                    }
				}
				else if (ctrl.GetType() == typeof(HtmlInputButton))
				{
					HtmlInputButton htmlInputButton = (HtmlInputButton)ctrl;
					if (htmlInputButton.ID != null)
					{
						bool flag2 = this._selectWithProcedures.Select_AccessToControls(Convert.ToInt64(HttpContext.Current.Session["UserId"]), Convert.ToInt64(HttpContext.Current.Session["PlanId"]), htmlInputButton.ID);
						if (HttpContext.Current.Session["UserRoleName"].ToString().Equals("SuperAdmin") || flag2)
						{
							htmlInputButton.Visible = isLogin;
							return;
						}
					}
				}
				else if (ctrl.GetType() == typeof(HtmlAnchor))
				{
					HtmlAnchor htmlAnchor = (HtmlAnchor)ctrl;
					if (htmlAnchor.ID != null)
					{
						bool flag3 = this._selectWithProcedures.Select_AccessToControls(Convert.ToInt64(HttpContext.Current.Session["UserId"]), Convert.ToInt64(HttpContext.Current.Session["PlanId"]), htmlAnchor.ID);
						if (HttpContext.Current.Session["UserRoleName"].ToString().Equals("SuperAdmin") || flag3)
						{
							htmlAnchor.Visible = isLogin;
							return;
						}
					}
				}
				else if (ctrl.GetType() == typeof(HtmlButton))
				{
					HtmlButton htmlButton = (HtmlButton)ctrl;
					if (htmlButton.ID != null)
					{
						bool flag4 = this._selectWithProcedures.Select_AccessToControls(Convert.ToInt64(HttpContext.Current.Session["UserId"]), Convert.ToInt64(HttpContext.Current.Session["PlanId"]), htmlButton.ID);
						if (HttpContext.Current.Session["UserRoleName"].ToString().Equals("SuperAdmin") || flag4)
						{
							htmlButton.Visible = isLogin;
							return;
						}
					}
				}
				else if (ctrl.GetType() == typeof(Button))
				{
					Button button = (Button)ctrl;
					if (button.ID != null)
					{
						bool flag5 = this._selectWithProcedures.Select_AccessToControls(Convert.ToInt64(HttpContext.Current.Session["UserId"]), Convert.ToInt64(HttpContext.Current.Session["PlanId"]), button.ID);
						if (HttpContext.Current.Session["UserRoleName"].ToString().Equals("SuperAdmin") || flag5)
						{
							button.Visible = isLogin;
							return;
						}
					}
				}
				else if (ctrl.GetType() == typeof(LinkButton))
				{
					LinkButton linkButton = (LinkButton)ctrl;
					if (linkButton.ID != null)
					{
						bool flag6 = this._selectWithProcedures.Select_AccessToControls(Convert.ToInt64(HttpContext.Current.Session["UserId"]), Convert.ToInt64(HttpContext.Current.Session["PlanId"]), linkButton.ID);
						if (HttpContext.Current.Session["UserRoleName"].ToString().Equals("SuperAdmin") || flag6)
						{
							linkButton.Visible = isLogin;
							return;
						}
					}
				}
				else if (ctrl.GetType() == typeof(HyperLink))
				{
					HyperLink hyperLink = (HyperLink)ctrl;
					if (hyperLink.ID != null)
					{
						bool flag7 = this._selectWithProcedures.Select_AccessToControls(Convert.ToInt64(HttpContext.Current.Session["UserId"]), Convert.ToInt64(HttpContext.Current.Session["PlanId"]), hyperLink.ID);
						if (HttpContext.Current.Session["UserRoleName"].ToString().Equals("SuperAdmin") || flag7)
						{
							hyperLink.Visible = isLogin;
							return;
						}
					}
				}
				else if (ctrl.GetType() == typeof(CheckBox))
				{
					CheckBox checkBox = (CheckBox)ctrl;
					if (checkBox.ID != null)
					{
						bool flag8 = this._selectWithProcedures.Select_AccessToControls(Convert.ToInt64(HttpContext.Current.Session["UserId"]), Convert.ToInt64(HttpContext.Current.Session["PlanId"]), checkBox.ID);
						if (HttpContext.Current.Session["UserRoleName"].ToString().Equals("SuperAdmin") || flag8)
						{
							checkBox.Visible = isLogin;
						}
					}
				}
			}
		}

		// Token: 0x040000C7 RID: 199
		private readonly ClsSqlHelper _selectWithProcedures = new ClsSqlHelper();
	}
}
