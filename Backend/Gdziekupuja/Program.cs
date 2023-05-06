using Gdziekupuja.Models;
using Gdziekupuja.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<GdziekupujaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("LocalString")));
builder.Services.AddScoped<DatabaseSeeder>();
builder.Services.AddScoped<ISalesPointService, SalesPointService>();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);

var app = builder.Build();
var scope = app.Services.CreateScope();
var seeder = scope.ServiceProvider.GetRequiredService<DatabaseSeeder>();
seeder.Seed();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();