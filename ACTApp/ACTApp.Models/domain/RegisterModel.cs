using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACTApp.Models.domain
{
    public class RegisterModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public string HashedPassword { get; set; }
    }
}
