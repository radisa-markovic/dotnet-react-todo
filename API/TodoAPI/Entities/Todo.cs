
using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Entities;

public class Todo
{
    public int Id { get; set; }
    [Required]
    [MinLength(3)]
    [MaxLength(100)]
    public required string Title { get; set; }
    [Required]
    [MinLength(5)]
    [MaxLength(250)]
    public required string Description { get; set; }
    [Required]
    public bool IsCompleted { get; set; }
    [Required]
    public DateOnly CreatedAt { get; set; }
    public DateOnly? CompletedAt { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = null!;
}
