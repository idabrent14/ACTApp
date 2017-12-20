using ACTApp.Models.domain;
using ACTApp.Models.responses;
using ACTApp.Models.view;
using ACTApp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ACTApp.Web.Controllers.Api
{
    [RoutePrefix("api/testdates")]
    public class ScraperController : ApiController
    {
        [Route, HttpGet]
        public HttpResponseMessage GetAll()
        {
            try
            {
                ItemsResponse<TestDatesModel> resp = new ItemsResponse<TestDatesModel>();
                ScraperService svc = new ScraperService();
                resp.Items = svc.GetAll();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
    }
}