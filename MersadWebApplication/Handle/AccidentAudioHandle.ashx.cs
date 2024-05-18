using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace MersadWebApplication.Handle
{
    /// <summary>
    /// Summary description for AccidentAudioHandle
    /// </summary>
    public class AccidentAudioHandle : IHttpHandler
    {
        // Token: 0x06000356 RID: 854 RVA: 0x000296F8 File Offset: 0x000278F8
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
                        })[1] + ".wav";
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
                            bool flag5 = guid.StartsWith("PrimaryCause");
                            if (flag5)
                            {
                                this._sqlHelper.SetDeleteAllAudio("DeletePrimaryCauseAudio", guid);
                            }
                            else
                            {
                                bool flag6 = guid.StartsWith("FormerCause");
                                if (flag6)
                                {
                                    this._sqlHelper.SetDeleteAllAudio("DeleteFormerCauseAudio", guid);
                                }
                                else
                                {
                                    bool flag7 = guid.StartsWith("DirectCause");
                                    if (flag7)
                                    {
                                        this._sqlHelper.SetDeleteAllAudio("DeleteDirectCauseAudio", guid);
                                    }
                                    else
                                    {
                                        this._sqlHelper.SetDeleteExplanationAudio(guid);
                                    }
                                }
                            }
                            context.Response.Write(true);
                        }
                        else
                        {
                            foreach (object obj in context.Request.Files)
                            {
                                string s = (string)obj;
                                HttpPostedFile file = context.Request.Files[s];
                                bool flag8 = file != null;
                                if (flag8)
                                {
                                    string fileName = file.FileName;
                                    bool flag9 = !string.IsNullOrEmpty(fileName);
                                    if (flag9)
                                    {
                                        string pathToSave2 = HttpContext.Current.Server.MapPath("~/MediaUploader/Accident/") + guid;
                                        file.SaveAs(pathToSave2);
                                        long id = Convert.ToInt64(arrQueryStrings[2].Split(new char[]
                                        {
                                            '='
                                        })[1]);
                                        bool flag10 = guid.StartsWith("PrimaryCause");
                                        if (flag10)
                                        {
                                            this._sqlHelper.SetUpdateAllAudio("UpdatePrimaryCauseAudio", id, guid);
                                        }
                                        else
                                        {
                                            bool flag11 = guid.StartsWith("FormerCause");
                                            if (flag11)
                                            {
                                                this._sqlHelper.SetUpdateAllAudio("UpdateFormerCauseAudio", id, guid);
                                            }
                                            else
                                            {
                                                bool flag12 = guid.StartsWith("DirectCause");
                                                if (flag12)
                                                {
                                                    this._sqlHelper.SetUpdateAllAudio("UpdateDirectCauseAudio", id, guid);
                                                }
                                                else
                                                {
                                                    this._sqlHelper.SetUpdateExplanationAudio(id, guid);
                                                }
                                            }
                                        }
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
                this._sqlHelper.Insert_Exception("/Handle/AccidentAudioHandle", ex.ToString());
            }
        }

        // Token: 0x170000CE RID: 206
        // (get) Token: 0x06000357 RID: 855 RVA: 0x00029A44 File Offset: 0x00027C44
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        // Token: 0x040001EC RID: 492
        private readonly ClsSqlHelper _sqlHelper = new ClsSqlHelper();
    }
}