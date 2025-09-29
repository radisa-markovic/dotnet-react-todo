using TodoAPI.Data;
using TodoAPI.Endpoints;
using TodoAPI.ServiceExtensions;
using TodoAPI.Startup;

var builder = WebApplication.CreateBuilder(args);
builder.AddSqlite();
builder.Services.AddOpenDoorCorsPolicy();

var app = builder.Build();
app.UseOpenDoorCorsPolicy();
app.MapTodoEndpoints();
// app.MigrateDatabase();
app.Run();