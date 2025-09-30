using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Entities;

public class User
{
    [Required]
    [Key]
    public int Id { get; set; }
    [Required]
    [MinLength(3)]
    [MaxLength(50)]
    public required string Username { get; set; }
    [Required]
    [MinLength(6)]
    public required string Password { get; set; }
    [Required]
    public DateOnly CreatedAt { get; set; }  
    
    public ICollection<Todo> Todos { get; set; } = new List<Todo>();     
}
