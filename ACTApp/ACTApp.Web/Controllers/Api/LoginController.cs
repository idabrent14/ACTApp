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
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        [Route, HttpPost]
        public HttpResponseMessage Insert(LoginModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                };
                LoginService svc = new LoginService();
                ItemResponse<bool> resp = new ItemResponse<bool>();
                resp.Item = svc.Login(model);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }

        }
    }
}