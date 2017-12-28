using ACTApp.Models.domain;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACTApp.Services
{
    public class MathService
    {
        public int MathInsert(MathModel model)
        {
            int mathId = 0;
            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {

                conn.Open();
                using (SqlCommand cmd = new SqlCommand("dbo.UsersMath_Insert", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", model.UserId);
                    cmd.Parameters.AddWithValue("@Easy", model.Easy);
                    cmd.Parameters.AddWithValue("@Medium", model.Medium);
                    cmd.Parameters.AddWithValue("@Hard", model.Hard);

                    SqlParameter parm = new SqlParameter("@Id", SqlDbType.Int);
                    parm.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(parm);
                    cmd.ExecuteNonQuery();
                    mathId = (int)cmd.Parameters["@Id"].Value;
                };
                conn.Close();
            }
            return mathId;
        }

        public void Delete(int mathId)
        {
            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {

                conn.Open();
                using (SqlCommand cmd = new SqlCommand("dbo.UsersMath_Delete", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@MathId", mathId);
                };
                conn.Close();
            }
        }

    }
}
