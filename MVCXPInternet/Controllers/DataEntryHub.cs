using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SignalR.Hubs;
using MVCXPInternet.Models;
using MVCXPInternet.DAL;

namespace MVCXPInternet.Controllers
{
    public class DataEntryHub : Hub, IDisconnect, IConnected, IDisposable
    {

        private DataEntryContext db;
        public void InitiateBatch()
        {
            try
            {
                this.db = new DataEntryContext();
                this.db.Batches.ToList();
            }
            catch (Exception e)
            {
                Caller.ErrorOccured(string.Format("{0}", e.Message));
            }

        }

        public string ProcessRecord(Record record, int recordId)
        {
            try
            {
                Caller.RecordProcessing(recordId, 0);
                System.Threading.Thread.Sleep(300);
                Caller.RecordProcessing(recordId, 25);
                System.Threading.Thread.Sleep(300);
                Caller.RecordProcessing(recordId, 50);
                System.Threading.Thread.Sleep(300);
                Caller.RecordProcessing(recordId, 75);
                System.Threading.Thread.Sleep(300);
                Caller.RecordProcessing(recordId, 100);
                Caller.RecordProcessingComplete(recordId);

                //throw new Exception("Test Exception");

            }
            catch (Exception e)
            {
                Caller.RecordProcessingFailed("Failed!");
                //Caller.ErrorOccured(string.Format("{0}", e.Message));
                return "Unexpected error while processing record!";
            }

            return "Processed Successfully";

            //System.Threading.Thread.Sleep(3000);
            
        }

        public void Dispose()
        {
            db.Dispose(); 
        }

        public System.Threading.Tasks.Task Disconnect()
        {
            return Clients.disconnected(Context.ConnectionId, DateTime.Now.ToString());
            //throw new NotImplementedException();
        }

        public System.Threading.Tasks.Task Connect()
        {
            //throw new NotImplementedException();
            return Clients.connected(Context.ConnectionId, DateTime.Now.ToString());
        }

        public System.Threading.Tasks.Task Reconnect(IEnumerable<string> groups)
        {
            return Clients.reconnected(Context.ConnectionId, DateTime.Now.ToString());
        }
    }


    public class Record
    {
        public int Id = 0;
        public string FirstName = String.Empty;
        public string LastName = String.Empty;
        public int Age = 0;
        public string Status = "Draft";
    }

}