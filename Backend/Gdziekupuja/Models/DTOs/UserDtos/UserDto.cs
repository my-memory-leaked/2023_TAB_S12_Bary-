namespace Gdziekupuja.Models.DTOs.UserDtos;

public class UserDto
{
    public int Id { get; set; }
    public string Email { get; set; } = null!;
    public string Name { get; set; } = null!;
    public bool CanComment { get; set; }
    public bool IsAdmin { get; set; }
}