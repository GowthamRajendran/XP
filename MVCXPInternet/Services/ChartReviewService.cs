using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RestSharp;
using CECity.Enterprise.Entity;
namespace MVCXPInternet.Services
{

    public class ChartReviewService : ServiceProxyBase
    {
        public ChartReviewService()
        {
            this.RelativeUrl = "ChartReview/ChartReview.svc";
        }

        public  GetEventEntryForm(int chartReviewId)
        {
            
            var request = new RestRequest();
            request.Resource = "GetEventEntryForm";
            request.RootElement = "Call";

            request.AddParameter("ChartReviewId", chartReviewId, ParameterType.UrlSegment);

            return Execute<Call>(request);
        }

    }

    public class Call
    {
        public string Sid { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
        public string CallSegmentSid { get; set; }
        public string AccountSid { get; set; }
        public string Called { get; set; }
        public string Caller { get; set; }
        public string PhoneNumberSid { get; set; }
        public int Status { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Duration { get; set; }
        public decimal Price { get; set; }
        public int Flags { get; set; }
    }
  


}