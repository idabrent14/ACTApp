using ACTApp.Models.domain;
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
                int id = svc.RegisterUser(newUser);                
                return Request.CreateResponse(HttpStatusCode.OK, id); 
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
           
        }
    }
}
