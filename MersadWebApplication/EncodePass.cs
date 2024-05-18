using System;
using System.Collections.Generic;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace MersadWebApplication
{
	// Token: 0x0200001A RID: 26
	public class EncodePass : Page
	{
		// Token: 0x0600023D RID: 573 RVA: 0x00002DF2 File Offset: 0x00000FF2
		protected void Page_Load(object sender, EventArgs e)
		{
		}

		// Token: 0x0600023E RID: 574 RVA: 0x00018F34 File Offset: 0x00017134
		[WebMethod]
		public static List<GetSubmit> GetCityListInProvince(string provinceId)
		{
			ClsSqlHelper sqlHelper = new ClsSqlHelper();
			List<GetSubmit> result;
			try
			{
				bool flag = string.IsNullOrEmpty(provinceId);
				if (flag)
				{
					result = EncodePass.GetSubmitMethod("", "شناسه یافت نشد،صفحه را مجدد بارگذاری نمایید!", "", "false");
				}
				else
				{
					result = sqlHelper.LoadCityListInProvince(Convert.ToInt32(provinceId));
				}
			}
			catch (Exception ex)
			{
				sqlHelper.Insert_Exception("", ex.ToString());
				result = EncodePass.GetSubmitMethod("", "خطای پیش بینی نشده لطفا دقایقی دیگر مجددا تلاش نمایید", "", "false");
			}
			return result;
		}

		// Token: 0x0600023F RID: 575 RVA: 0x00018FC0 File Offset: 0x000171C0
		private static List<GetSubmit> GetSubmitMethod(string id, string msg, string msgTwo, string success)
		{
			return new List<GetSubmit>
			{
				new GetSubmit
				{
					Id = id,
					Message = msg,
					MessageTwo = msgTwo,
					IsSuccess = success
				}
			};
		}

		// Token: 0x06000240 RID: 576 RVA: 0x00019004 File Offset: 0x00017204
		protected void btnEncode_OnClick(object sender, EventArgs e)
		{
			try
			{
				this.txtExport.Value = this._helper.Encode(this.txtPass.Value);
			}
			catch (Exception ex)
			{
				this.txtExport.Value = ex.ToString();
			}
		}

		// Token: 0x040000CD RID: 205
		private readonly ClsHelper _helper = new ClsHelper();

		// Token: 0x040000CE RID: 206
		protected HtmlForm form1;

		// Token: 0x040000CF RID: 207
		protected HtmlInputText txtPass;

		// Token: 0x040000D0 RID: 208
		protected Button btnEncode;

		// Token: 0x040000D1 RID: 209
		protected HtmlInputText txtExport;

		// Token: 0x040000D2 RID: 210
		protected HtmlInputText txtLat;

		// Token: 0x040000D3 RID: 211
		protected HtmlInputText txtLong;
	}
}
