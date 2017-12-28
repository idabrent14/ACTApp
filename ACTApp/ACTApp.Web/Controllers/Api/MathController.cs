using ACTApp.Models.domain;
using ACTApp.Models.responses;
using ACTApp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace ACTApp.Web.Controllers.Api
{
    [RoutePrefix("api/math")]
    public class MathController : ApiController
    {
        [Route, HttpPost]
        public HttpResponseMessage MathInsert(MathModel model)
        {
            try
            {
                MathService svc = new MathService();
                ItemResponse<int> resp = new ItemResponse<int>();
                resp.Item = svc.MathInsert(model);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e.Message);    
            }
        }

        [Route, HttpDelete]
        public HttpResponseMessage MathDelete(int mathId)
        {
            try
            {
                MathService svc = new MathService();
                svc.Delete(mathId);
                SuccessResponse resp = new SuccessResponse();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
    }
}