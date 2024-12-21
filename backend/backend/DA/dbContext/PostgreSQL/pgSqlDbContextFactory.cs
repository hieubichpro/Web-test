using Microsoft.EntityFrameworkCore;

namespace backend.DA.dbContext.PostgreSQL
{
    public class pgSqlDbContextFactory : dbContextFactory
    {
        public IConfiguration configuration { get; set; }
        public pgSqlDbContextFactory(IConfiguration config)
        {
            configuration = config;
        }
        public AppDbContext get_db_context()
        {
            var builder = new DbContextOptionsBuilder<AppDbContext>();
            builder.UseNpgsql(configuration.GetSection("PostgreSQL").GetSection("ConnectionString").Value);
            return new AppDbContext(builder.Options);
        }
    }
}
