using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace MersadWebApplication.Handle
{
    /// <summary>
    /// Summary description for AccidentPicturesHandle
    /// </summary>
    public class AccidentPicturesHandle : IHttpHandler
    {
        // Token: 0x06000359 RID: 857 RVA: 0x00029A58 File Offset: 0x00027C58
        public void ProcessRequest(HttpContext context)
        {
            string[] arrQueryStrings = new string[0];
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
                        arrQueryStrings = queryStrings.Split(new char[]
                        {
                            '&'
                        });
                        string getGuid = arrQueryStrings[0].Split(new char[]
                        {
                            '='
                        })[1];
                        string guid = getGuid.EndsWith(".jpg") ? getGuid : (getGuid + ".jpg");
                        string isRemove = arrQueryStrings[1].Split(new char[]
                        {
                            '='
                        })[1];
                        bool flag3 = isRemove.Equals("true");
                        if (flag3)
                        {
                            string pathToSave = HttpContext.Current.Server.MapPath("~/MediaUploader/Accident/") + guid;
                            bool flag4 = File.Exists(pathToSave);
                            if (flag4)
                            {
                                File.Delete(pathToSave);
                            }
                            this._sqlHelper.SetDeleteAccidentPicture(guid);
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
                                        string pathToSave2 = HttpContext.Current.Server.MapPath("~/MediaUploader/Accident/") + guid;
                                        file.SaveAs(pathToSave2);
                                        string id = arrQueryStrings[2].Split(new char[]
                                        {
                                            '='
                                        })[1];
                                        this._sqlHelper.SetInsertAccidentPicture(Convert.ToInt64(id), guid);
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
                ClsSqlHelper sqlHelper = this._sqlHelper;
                string formUrl = "/Handle/AccidentPicturesHandle";
                Exception ex2 = ex;
                sqlHelper.Insert_Exception(formUrl, ((ex2 != null) ? ex2.ToString() : null) + "\n" + arrQueryStrings[2]);
            }
        }

        // Token: 0x170000CF RID: 207
        // (get) Token: 0x0600035A RID: 858 RVA: 0x00029A44 File Offset: 0x00027C44
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        // Token: 0x040001ED RID: 493
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();
    }
}