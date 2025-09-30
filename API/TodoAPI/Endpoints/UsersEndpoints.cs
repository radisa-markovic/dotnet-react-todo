using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TodoAPI.Data;
using TodoAPI.Dtos.Users;
using TodoAPI.Entities;

namespace TodoAPI.Endpoints;

public static class UsersEndpoints
{
    public static void MapUsersEndpoints(this WebApplication app)
    {
        var hasher = new PasswordHasher<User>();
        
        var users = app.MapGroup("/api/v1/users");

        users.MapGet("/", async (TodoContext dbContext) =>
        {
            var users = await dbContext.Users.ToListAsync();
            return Results.Ok(users);
        })
        .WithName("GetAllUsers")
        .WithTags("Users");

        users.MapGet("/{id:int}", async (int id, TodoContext dbContext) =>
        {
            var user = await dbContext.Users.FindAsync(id);
            return user is not null ? Results.Ok(user) : Results.NotFound();
        })
        .WithName("GetUserById")
        .WithTags("Users");

        users.MapPost("/", async (CreateUserDto newUser, TodoContext dbContext) =>
        {
            var user = new User
            {
                Username = newUser.Username,
                Password = hasher.HashPassword(null!, newUser.Password),
            };

            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();

            return Results.Created($"/users/{user.Id}", user);
        })
        .WithName("CreateUser")
        .WithTags("Users");

        users.MapDelete("/{id:int}", async (int id, TodoContext dbContext) =>
        {
            await dbContext
                .Users
                .Where(user => user.Id == id)
                .ExecuteDeleteAsync();

            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        })
        .WithName("DeleteUser")
        .WithTags("Users");
    }
}
