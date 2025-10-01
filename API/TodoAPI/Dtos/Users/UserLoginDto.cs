using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Dtos.Users;

public record class UserLoginDto(
    [Required]
    [MinLength(3)]
    [MaxLength(50)]
    string Username,
    [Required]
    [MinLength(6)]
    string Password
);