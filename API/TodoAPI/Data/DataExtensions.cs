using Microsoft.EntityFrameworkCore;

namespace TodoAPI.Data;

public static class DataExtensions
{
    public static void MigrateDatabase(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<TodoContext>();
        dbContext.Database.Migrate();
        TodosGenerator todosGenerator = new TodosGenerator();
        todosGenerator.SeedTodos(dbContext, 10);
    }
}
