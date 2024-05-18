using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace MersadWebApplication.Handle
{
    /// <summary>
    /// Summary description for FileIsExistsHandle
    /// </summary>
    public class FileIsExistsHandle : IHttpHandler
    {
        // Token: 0x0600035F RID: 863 RVA: 0x00029F38 File Offset: 0x00028138
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
                        string url = queryStrings.Split(new char[]
                        {
                            '='
                        })[1];
                        string guid = url;
                        bool flag3 = !url.EndsWith(".wav");
                        if (flag3)
                        {
                            guid = (url.EndsWith(".jpg") ? url : (url + ".jpg"));
                        }
                        string pathToSave = HttpContext.Current.Server.MapPath("~/MediaUploader") + guid;
                        bool flag4 = File.Exists(pathToSave);
                        if (flag4)
                        {
                            context.Response.Write(true);
                        }
                        else
                        {
                            context.Response.Write(false);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ClsSqlHelper sqlHelper = new ClsSqlHelper();
                sqlHelper.Insert_Exception("/Handle/FileIsExistsHandle", ex.ToString());
                context.Response.Write(false);
            }
        }

        // Token: 0x170000D1 RID: 209
        // (get) Token: 0x06000360 RID: 864 RVA: 0x00029A44 File Offset: 0x00027C44
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}