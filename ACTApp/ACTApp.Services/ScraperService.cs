using ACTApp.Models.view;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACTApp.Services
{
    public class ScraperService
    {
        public List<TestDatesModel> GetAll()
        {
            
            List<TestDatesModel> modelList = new List<TestDatesModel>();

            //set the url of the site being scraped
            string url = "https://www.act.org/content/act/en/products-and-services/the-act/registration.html#dates";
            //instantiate loading HtmlWeb from url
            var htmlWeb = new HtmlWeb();
            HtmlDocument document = null;
            document = htmlWeb.Load(url);

            //get desired test dates
            var target = document.DocumentNode.Descendants("td");

            foreach (var date in target)
            {
                if (date.InnerText != "&nbsp;")
                {
                    TestDatesModel model = new TestDatesModel();
                    model.Date = date.InnerText;
                    modelList.Add(model);
                }
            }
            return modelList;
        }
    }
}
