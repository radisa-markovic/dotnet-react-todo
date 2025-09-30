using Bogus;
using TodoAPI.Entities;

namespace TodoAPI.Data;

public class FakeDataGenerator
{
    private readonly Faker<User> usersFaker;
    private readonly Faker<Todo> todosFaker;

    public FakeDataGenerator()
    {
        this.usersFaker = new Faker<User>();
        this.todosFaker = new Faker<Todo>();
    }

    public List<User> GenerateUsers(int count)
    {
        this.usersFaker
            .RuleFor((user) => user.Username, (faker) => faker.Internet.UserName())
            .RuleFor((user) => user.Password, (faker) => faker.Internet.Password())
            .RuleFor((user) => user.CreatedAt, (faker) => faker.Date.PastDateOnly());

        return this.usersFaker.Generate(count);
    }

    public List<Todo> GenerateFakeTodos(int count, List<User> users)
    {       
        this.todosFaker
            .RuleFor((todo) => todo.Title, (faker) => faker.Lorem.Sentence(1, 3))
            .RuleFor((todo) => todo.Description, (faker) => faker.Lorem.Paragraph())
            .RuleFor((todo) => todo.CreatedAt, (faker) => faker.Date.PastDateOnly())
            .RuleFor((todo) => todo.IsCompleted, (faker) => faker.Random.Bool())
            .RuleFor((todo) => todo.UserId, (faker) => faker.PickRandom(users).Id);

        return this.todosFaker.Generate(count);       
    }
   
    // public void SeedTodos(TodoContext context, int count)
    // {
    //     var todos = todoFaker.Generate(count);
    //     context.Todos.AddRange(todos);
    //     context.SaveChanges();
    // }
}
