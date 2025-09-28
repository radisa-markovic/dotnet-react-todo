using Microsoft.Extensions.Diagnostics.HealthChecks;
using TodoAPI.Data;

namespace TodoAPI.ServiceExtensions;

public static class SQLiteService
{
    public static void AddSqlite(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("SQLite");
        builder.Services.AddSqlite<TodoContext>(connectionString);
    }
}
