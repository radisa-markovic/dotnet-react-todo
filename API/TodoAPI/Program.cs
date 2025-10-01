using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using TodoAPI.Data;
using TodoAPI.Endpoints;
using TodoAPI.ServiceExtensions;
using TodoAPI.Startup;

var builder = WebApplication.CreateBuilder(args);
builder.AddSqlite();
builder.Services.AddOpenDoorCorsPolicy();

builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddAuthorization();

var app = builder.Build();
app.UseOpenDoorCorsPolicy();

app.UseAuthentication();
app.UseAuthorization();

app.MapTodoEndpoints();
app.MapUsersEndpoints();

app.MigrateDatabase();

app.Run();