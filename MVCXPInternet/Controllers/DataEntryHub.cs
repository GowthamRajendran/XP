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
            //if (!this.Context.User.Identity.IsAuthenticated) Caller.ErrorOccured("Unauthorized operation");

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

        public string ProcessRecord(int recordId, IList<FieldInput> responses)
        {
            //if (!this.Context.User.Identity.IsAuthenticated) Caller.ErrorOccured("Unauthorized operation");

            try
            {
                Caller.RecordProcessing(recordId, 0);


                
                Caller.RecordProcessingComplete(recordId);

                

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

    public class FieldInput
    {
        public int DataFieldId = int.MinValue;
        public string Response = string.Empty;
    }




}