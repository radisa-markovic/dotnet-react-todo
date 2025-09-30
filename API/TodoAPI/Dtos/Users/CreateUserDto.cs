namespace TodoAPI.Dtos.Users;

public record class CreateUserDto(
    string Username,
    string Password
);