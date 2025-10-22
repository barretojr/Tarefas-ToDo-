using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Tarefas.IoC
{
    public static class Bootstrapper
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services, IConfiguration configuration)
        {


            return services
        }

        private static void RegistrarContexto(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
        }
    }
}
