using ACTApp.Models.domain;
using ACTApp.Models.responses;
using ACTApp.Models.view;
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
    [RoutePrefix("api/english")]
    public class EnglishController : ApiController
    {
        [HttpPost][AllowAnonymous]
        public HttpResponseMessage Insert(EnglishModel model)
        {
            try
            {
                EnglishService svc = new EnglishService();
                ItemResponse<int> resp = new ItemResponse<int>();
                resp.Item = svc.EnglishInsert(model);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Route("{userId}"), HttpGet][AllowAnonymous]
        public HttpResponseMessage SelectById(int userId)
        {
            try
            {
                EnglishService svc = new EnglishService();
                ItemsResponse<EnglishViewModel> resp = new ItemsResponse<EnglishViewModel>();
                resp.Items = svc.SelectById(userId); 
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch(Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Route("{englishId}"), HttpDelete]
        public HttpResponseMessage Delete(int englishId)
        {
            try
            {
                EnglishService svc = new EnglishService();
                svc.Delete(englishId);
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