using TodoAPI.Data;
using TodoAPI.Endpoints;
using TodoAPI.ServiceExtensions;

var builder = WebApplication.CreateBuilder(args);
builder.AddSqlite();

var app = builder.Build();
app.MapTodoEndpoints();
app.MigrateDatabase();
app.Run();