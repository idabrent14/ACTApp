using ACTApp.Models.domain;
using ACTApp.Models.view;
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
    public class EnglishService
    {

        public int EnglishInsert(EnglishModel model)
        {
            int id = 0;
            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {

                conn.Open();
                using (SqlCommand cmd = new SqlCommand("dbo.UsersEnglish_Insert", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", model.UserId);
                    cmd.Parameters.AddWithValue("@Passage1", model.Passage1);
                    cmd.Parameters.AddWithValue("@Passage2", model.Passage2);
                    cmd.Parameters.AddWithValue("@Passage3", model.Passage3);
                    cmd.Parameters.AddWithValue("@Passage4", model.Passage4);
                    cmd.Parameters.AddWithValue("@Passage5", model.Passage5);

                    SqlParameter parm = new SqlParameter("@Id", SqlDbType.Int);
                    parm.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(parm);
                    cmd.ExecuteNonQuery();
                    id = (int)cmd.Parameters["@Id"].Value;
                };
                conn.Close();
            }
                return id;
        }

        public List<EnglishViewModel> SelectById(int userId)
        {
            List<EnglishViewModel> modelList = new List<EnglishViewModel>();
            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("dbo.EnglishUsers_SelectById", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", userId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        EnglishViewModel model;
                        model = Mapper(reader);
                        modelList.Add(model);
                    }
                }
                conn.Close();
            }
            return modelList;
        }

        public void Delete(int englishId)
        {

            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("dbo.UsersEnglish_Delete", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", englishId);
                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
        }

        private EnglishViewModel Mapper(SqlDataReader reader)
        {
            int index = 0;
            EnglishViewModel model = new EnglishViewModel();
            model.UserId = reader.GetInt32(index++);
            model.EnglishId = reader.GetInt32(index++);
            model.CreatedDate = reader.GetDateTime(index++);
            model.Passage1 = reader.GetString(index++);
            //if at anytime, the next column is null, then just return the model, otherwise keep going
            if (!reader.IsDBNull(index))
            {
                model.Passage2 = reader.GetString(index++);
                if (!reader.IsDBNull(index))
                {
                    model.Passage3 = reader.GetString(index++);
                    if (!reader.IsDBNull(index))
                    {
                        model.Passage4 = reader.GetString(index++);
                        if (!reader.IsDBNull(index++))
                        {
                            model.Passage5 = reader.GetString(index++);
                            return model;
                        }
                        else
                        {
                            return model;
                        }
                    }
                    else
                    {
                        return model;
                    }
                }
                else
                {
                    return model;
                }
            }
            else
            {
                return model;
            }
        }

    }
}
