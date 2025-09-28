using Microsoft.EntityFrameworkCore;
using TodoAPI.Entities;

namespace TodoAPI.Data;

public class TodoContext(DbContextOptions<TodoContext> options)
            : DbContext(options)
{
    public DbSet<Todo> Todos => Set<Todo>();

    // can't use non deterministic data here
    // protected override void OnModelCreating(ModelBuilder modelBuilder)
    // {
    //     TodosGenerator todosGenerator = new TodosGenerator();
    //     var todos = todosGenerator.GenerateTodos().Take(10);

    //     modelBuilder.Entity<Todo>().HasData(todos);
    //     base.OnModelCreating(modelBuilder);
    // }
}
