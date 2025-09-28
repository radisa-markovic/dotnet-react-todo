using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Dtos;

public record class CreateTodoDto(
    [Required]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "Title must be between 3 and 50 characters.")]
    string Title,
    [Required]
    [StringLength(250, MinimumLength = 10, ErrorMessage = "Description must be between 10 and 250 characters.")]
    string Description,
    [Required]
    bool IsCompleted,
    [Required]
    [DataType(DataType.Date)]
    DateOnly CreatedAt
);
