using ACTApp.Models.domain;
using ACTApp.Models.responses;
using ACTApp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ACTApp.Web.Controllers.Api
{
    [RoutePrefix("api/register")]
    public class RegisterController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage Insert(RegisterModel newUser)
        {
            try
            {
                RegisterService svc = new RegisterService();
                ItemResponse<int> resp = new ItemResponse<int>();
                resp.Item = svc.RegisterUser(newUser);                
                return Request.CreateResponse(HttpStatusCode.OK, resp); 
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
           
        }
    }
}
