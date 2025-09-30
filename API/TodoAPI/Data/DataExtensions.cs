using Microsoft.EntityFrameworkCore;

namespace TodoAPI.Data;

public static class DataExtensions
{
    public static void MigrateDatabase(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<TodoContext>();
        dbContext.Database.Migrate();

        if (!dbContext.Users.Any())
        {
            FakeDataGenerator usersGenerator = new FakeDataGenerator();
            var fakeUsers = usersGenerator.GenerateUsers(5);
            dbContext.Users.AddRange(fakeUsers);
            dbContext.SaveChanges();
        }

        if (!dbContext.Todos.Any())
        {
            FakeDataGenerator todosGenerator = new FakeDataGenerator();
            var fakeUsers = dbContext.Users.Take(5).ToList(); ;
            var fakeTodos = todosGenerator.GenerateFakeTodos(10, fakeUsers);
            dbContext.Todos.AddRange(fakeTodos);
            dbContext.SaveChanges();
        }        
    }
}
