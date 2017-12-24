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
    public class LoginService
    {
        public bool Login(LoginModel loginModel)
        {
            CryptographyService svc = new CryptographyService();
            //i want to get the salt from the database that goes with the login email
            var dboModel = GetDboModel(loginModel.Email);
            //i want to take the login password and apply the salt to that password and hash it
            string hashedPassword = svc.Hash(loginModel.Password, dboModel.Salt);
            loginModel.HashedPassword = hashedPassword;
            //then i want to see if the hashed password in the database for that user is the same as the new hased password
            //if they are the same, then successfull login 
            if (loginModel.HashedPassword == dboModel.HashedPassword)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        //This function should return the salt and hashed password associated with a specific eamil
        public LoginModel GetDboModel(string email)
        {
            LoginModel dboModel = new LoginModel();
            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand("dbo.Users_SelectByEmail", conn))
                {

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Email", email);

                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        dboModel.HashedPassword = reader.GetString(2);
                        dboModel.Salt = reader.GetString(3);
                    }
                };
                conn.Close();
            }
            return dboModel;
        }
    }
}
