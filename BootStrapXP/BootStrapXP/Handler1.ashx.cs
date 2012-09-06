using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace BootStrapXP
{
    /// <summary>
    /// Summary description for Handler1
    /// </summary>
    public class Handler1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string myName = context.Request.Form["firstName"];

            var wrapper = new { d = myName };
            context.Response.Write(JsonConvert.SerializeObject(wrapper));

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