using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BootStrapXP
{
    /// <summary>
    /// Summary description for RecordProcessor
    /// </summary>
    public class RecordProcessor : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}