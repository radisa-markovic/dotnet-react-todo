using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Dtos;

public record class UpdateTodoDto(
    int Id,
    [StringLength(
        50,
        MinimumLength = 3,
        ErrorMessage = "Title must be between 3 and 50 characters."
    )]
    string Title,
    [StringLength(
        250,
        MinimumLength = 10,
        ErrorMessage = "Description must be between 10 and 250 characters."
    )]
    string Description,
    bool IsCompleted,
    DateOnly CompletedAt
);