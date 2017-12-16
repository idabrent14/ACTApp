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
    public class RegisterService
    {
        public int RegisterUser(RegisterModel registerModel)
        {
            int id = 0; 
            string salt;
            string hashedPassword;
            string password = registerModel.Password;

            CryptographyService svc = new CryptographyService();
            salt = svc.GenerateRandomString(16);
            hashedPassword = svc.Hash(password, salt);
            registerModel.HashedPassword = hashedPassword;
            registerModel.Salt = salt;

            //Make sure to add a reference to the project "System.Configuration" under assemblies
            //Set the connection string equal the name of the string in the web config "DefaultConnection"
            //anything that is filebased or connection based that is using outside resources, always check to see if there is a dispose method available
            //if there is, then that means it is eligable to be put inside of a using statement 
            //whatever clean up that needs to occur, the using statement will automatically do that for us
            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                //sqlcommand is where we can enter the name of our stored proceedure, and our connection
                //again going to check to see if there is a dispose method, and since there is, put inside of using statement
                using (SqlCommand cmd = new SqlCommand("dbo.Users_Insert", conn))
                {
                    //tell the command that it is a stored proceedure
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Email", registerModel.Email);
                    cmd.Parameters.AddWithValue("@HashedPassword", registerModel.HashedPassword);
                    cmd.Parameters.AddWithValue("@Salt", registerModel.Salt);
                    
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

        //private RegisterModel Mapper(SqlDataReader reader)
        //{
        //    RegisterModel model = new RegisterModel();
        //    int index = 0;
        //    model.Email = reader.GetString(index++);
        //    return model;
        //}
    }
}
