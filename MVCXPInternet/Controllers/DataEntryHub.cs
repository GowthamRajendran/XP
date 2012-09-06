using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SignalR.Hubs;

namespace MVCXPInternet.Controllers
{
    public class DataEntryHub : Hub
    {
        public void ProcessRecord(string data, int recordId)
        {
                Caller.RecordProcessing(recordId, 0);
                System.Threading.Thread.Sleep(200);
                Caller.RecordProcessing(recordId, 25);
                System.Threading.Thread.Sleep(200);
                Caller.RecordProcessing(recordId, 50);
                System.Threading.Thread.Sleep(200);
                Caller.RecordProcessing(recordId, 75);
                System.Threading.Thread.Sleep(200);
                Caller.RecordProcessing(recordId, 100);
                Caller.RecordProcessingComplete(recordId);
                
                
                //System.Threading.Thread.Sleep(3000);
                //Caller.RecordProcessingFailed("Failed!");
        }
    }
}