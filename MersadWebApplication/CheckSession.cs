using System;
using System.Web;

namespace MersadWebApplication
{
	// Token: 0x02000016 RID: 22
	public class CheckSession
	{
		// Token: 0x06000231 RID: 561 RVA: 0x00018014 File Offset: 0x00016214
		public static bool ControlSession()
		{
			bool flag = HttpContext.Current.Session["UserId"] != null;
			bool result;
			if (flag)
			{
				result = true;
			}
			else
			{
				HttpCookie cookie = HttpContext.Current.Request.Cookies.Get("LoginDetail");
				bool flag2 = cookie != null;
				if (flag2)
				{
					ClsHelper helper = new ClsHelper();
					string username = helper.DecodeCookie(HttpContext.Current.Session["Username"].ToString());
					string password = helper.DecodeCookie(HttpContext.Current.Session["Password"].ToString());
					long userId = 0L;
					long planId = 0L;
					string name = "";
					string family = "";
					string planName = "";
					string getUsername = "";
					string absPath = "";
					ClsSqlHelper selectQuery = new ClsSqlHelper();
					bool hasUser = selectQuery.GetUserForCookie(username, password, ref userId, ref name, ref family, ref getUsername, ref planId, ref planName, ref absPath);
					bool flag3 = !hasUser;
					if (flag3)
					{
						hasUser = selectQuery.GetUserForCookie(username, password, ref userId, ref name, ref family, ref getUsername, ref planId, ref planName, ref absPath);
						bool flag4 = !hasUser;
						if (flag4)
						{
							HttpContext.Current.Response.Redirect("~/Default.aspx");
							return false;
						}
					}
					HttpContext.Current.Session["UserId"] = userId;
					HttpContext.Current.Session["FullUserName"] = name + " " + family;
					HttpContext.Current.Session["Username"] = getUsername;
					HttpContext.Current.Session["PlanId"] = planId;
					HttpContext.Current.Session["UserRoleName"] = planName;
					result = true;
				}
				else
				{
					HttpContext.Current.Response.Redirect("~/Default.aspx");
					result = false;
				}
			}
			return result;
		}
	}
}
