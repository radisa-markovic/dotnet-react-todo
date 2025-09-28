using Bogus;
using TodoAPI.Entities;

namespace TodoAPI.Data;

public class TodosGenerator
{
    Faker<Todo> todoFaker;

    public TodosGenerator()
    {
        int userId = 1;
        todoFaker = new Faker<Todo>()
            .RuleFor((todo) => todo.Id, (faker) => userId++)
            .RuleFor((todo) => todo.Title, (faker) => faker.Lorem.Sentence(1, 3))
            .RuleFor((todo) => todo.Description, (faker) => faker.Lorem.Paragraph())
            .RuleFor((todo) => todo.CreatedAt, (faker) => faker.Date.PastDateOnly())
            .RuleFor((todo) => todo.IsCompleted, (faker) => faker.Random.Bool());

    }
    
    public void SeedTodos(TodoContext context, int count)
    {
        var todos = todoFaker.Generate(count);
        context.Todos.AddRange(todos);
        context.SaveChanges();
    }
}
