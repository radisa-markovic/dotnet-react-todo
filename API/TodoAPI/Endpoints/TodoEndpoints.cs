using Microsoft.EntityFrameworkCore;
using TodoAPI.Data;
using TodoAPI.Dtos;
using TodoAPI.Entities;

namespace TodoAPI.Endpoints;

public static class TodoEndpoints
{
    public static RouteGroupBuilder MapTodoEndpoints(this WebApplication app)
    {
        var todoRouteGroup = app.MapGroup("/api/v1/todos")
            .WithParameterValidation();

        todoRouteGroup.MapGet("/", async (TodoContext dbContext) =>
        {
            var todos = await dbContext.Todos.ToListAsync();
            return Results.Ok(todos);
        });

        todoRouteGroup.MapGet("/{id}", async (int id, TodoContext dbContext) =>
        {
            var todo = await dbContext.Todos.FirstOrDefaultAsync(todo => todo.Id == id);
            return todo is not null ? Results.Ok(todo) : Results.NotFound();
        });

        todoRouteGroup.MapPost("/", async (CreateTodoDto todo, TodoContext dbContext) =>
        {
            Todo newTodo = new() {
                Title = todo.Title,
                Description = todo.Description,
                IsCompleted = todo.IsCompleted,
                CreatedAt = todo.CreatedAt
            };

            await dbContext.Todos.AddAsync(newTodo);
            await dbContext.SaveChangesAsync();

            return Results.CreatedAtRoute($"/{newTodo.Id}", todo);
        });

        todoRouteGroup.MapPut("/{id}", async (
            int id,
            UpdateTodoDto todo,
            TodoContext dbContext
        ) =>
        {
            var existingTodo = await dbContext.Todos.FirstOrDefaultAsync(todo => todo.Id == id);
            if (existingTodo is null)
            {
                return Results.NotFound();
            }
            existingTodo.Title = todo.Title;
            existingTodo.Description = todo.Description;
            existingTodo.IsCompleted = todo.IsCompleted;
            await dbContext.SaveChangesAsync();

            return Results.Ok();
        });

        todoRouteGroup.MapDelete("/{id}", async (int id, TodoContext dbContext) =>
        {
            var todoForDeletion = await dbContext
                .Todos
                .Where(todo => todo.Id == id)
                .ExecuteDeleteAsync();
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });

        return todoRouteGroup;
    }    
}
