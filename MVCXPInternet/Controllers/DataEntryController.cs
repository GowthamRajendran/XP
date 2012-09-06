using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCXPInternet.Controllers
{
    public class DataEntryController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Uses Knockout and SignalR";

            return View();
        }

    }
}
