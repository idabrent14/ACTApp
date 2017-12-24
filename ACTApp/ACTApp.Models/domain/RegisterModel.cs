using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ACTApp.Models.domain
{
    public class RegisterModel
    {
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required, MinLength(6)]
        public string Password { get; set; }
        public string Salt { get; set; }
        public string HashedPassword { get; set; }
    }
}
