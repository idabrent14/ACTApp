using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACTApp.Models.domain
{
    public class EnglishModel
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Passage1 { get; set; }
        public string Passage2 { get; set; }
        public string Passage3 { get; set; }
        public string Passage4 { get; set; }
        public string Passage5 { get; set; }

    }
}
