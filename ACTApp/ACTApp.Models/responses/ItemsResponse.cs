using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACTApp.Models.responses
{
    public class ItemsResponse <T>:SuccessResponse
    {
        public List<T> Items { get; set; }
    }
}
