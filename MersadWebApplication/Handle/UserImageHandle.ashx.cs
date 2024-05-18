using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace MersadWebApplication.Handle
{
    /// <summary>
    /// Summary description for UserImageHandle
    /// </summary>
 	public class UserImageHandle : IHttpHandler
    {
        // Token: 0x06000362 RID: 866 RVA: 0x0002A078 File Offset: 0x00028278
        public void ProcessRequest(HttpContext context)
        {
            try
            {
                context.Response.ContentType = "text/plain";
                bool flag = context.Request.QueryString.Count > 0;
                if (flag)
                {
                    string queryStrings = HttpUtility.UrlDecode(context.Request.QueryString.ToString());
                    bool flag2 = queryStrings != null;
                    if (flag2)
                    {
                        string[] arrQueryStrings = queryStrings.Split(new char[]
                        {
                            '&'
                        });
                        string guid = arrQueryStrings[0].Split(new char[]
                        {
                            '='
                        })[1] + ".jpg";
                        string isRemove = arrQueryStrings[1].Split(new char[]
                        {
                            '='
                        })[1];
                        bool flag3 = isRemove.Equals("true");
                        if (flag3)
                        {
                            string pathToSave = HttpContext.Current.Server.MapPath("~/MediaUploader/User/") + guid;
                            bool flag4 = File.Exists(pathToSave);
                            if (flag4)
                            {
                                File.Delete(pathToSave);
                            }
                            this._sqlHelper.SetDeleteUserImage(guid);
                        }
                        else
                        {
                            foreach (object obj in context.Request.Files)
                            {
                                string s = (string)obj;
                                HttpPostedFile file = context.Request.Files[s];
                                bool flag5 = file != null;
                                if (flag5)
                                {
                                    string fileName = file.FileName;
                                    bool flag6 = !string.IsNullOrEmpty(fileName);
                                    if (flag6)
                                    {
                                        string pathToSave2 = HttpContext.Current.Server.MapPath("~/MediaUploader/User/") + guid;
                                        file.SaveAs(pathToSave2);
                                    }
                                }
                            }
                            context.Response.Write(guid);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ClsSqlHelper sqlHelper = new ClsSqlHelper();
                sqlHelper.Insert_Exception("/Handle/UserImageHandle", ex.ToString());
            }
        }

        // Token: 0x170000D2 RID: 210
        // (get) Token: 0x06000363 RID: 867 RVA: 0x00029A44 File Offset: 0x00027C44
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        // Token: 0x040001EF RID: 495
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();
    }
}