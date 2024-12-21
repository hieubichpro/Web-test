using backend.BL.IRepositories;
using backend.BL.Services;
using backend.DA.dbContext;
using backend.DA.dbContext.PostgreSQL;
using backend.DA.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
IConfiguration configuration = new ConfigurationBuilder()
                                       .AddJsonFile("appsettings.json")
                                       .Build();
builder.Services.AddSingleton<dbContextFactory, pgSqlDbContextFactory>();
builder.Services.AddSingleton(configuration);
builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin() // Cho phép tất cả các nguồn
                   .AllowAnyMethod() // Cho phép tất cả các phương thức (GET, POST, PUT, DELETE, ...)
                   .AllowAnyHeader(); // Cho phép tất cả các header
        });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IMatchRepository, MatchRepository>();
builder.Services.AddTransient<ILeagueRepository, LeagueRepository>();
builder.Services.AddTransient<IClubRepository, ClubRepository>();

builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<MatchService>();
builder.Services.AddTransient<LeagueService>();
builder.Services.AddTransient<ClubService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
app.UseSwagger();
app.UseSwaggerUI();
// }

app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");
app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
