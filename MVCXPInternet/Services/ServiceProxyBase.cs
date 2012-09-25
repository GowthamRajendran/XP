using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RestSharp;

namespace MVCXPInternet.Services
{
    public abstract class ServiceProxyBase
    {
        const string BaseUrl = "http://services.cecity.com";
        protected string RelativeUrl = "";

        readonly string _accountSid;
        readonly string _secretKey;

        public ServiceProxyBase()
        {
            _accountSid = ""; //Should come from config
            _secretKey = ""; //Should come from config
        }

        public T Execute<T>(RestRequest request) where T : new()
        {
            var client = new RestClient();
            client.BaseUrl = BaseUrl;
            client.Authenticator = new HttpBasicAuthenticator(_accountSid, _secretKey);
            request.AddParameter("AccountSid", _accountSid, ParameterType.UrlSegment); // used on every request
            var response = client.Execute<T>(request);

            if (response.ErrorException != null)
            {
                throw response.ErrorException;
            }
            return response.Data;
        }

    }
}