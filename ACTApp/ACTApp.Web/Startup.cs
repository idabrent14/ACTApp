using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ACTApp.Web.Startup))]
namespace ACTApp.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
