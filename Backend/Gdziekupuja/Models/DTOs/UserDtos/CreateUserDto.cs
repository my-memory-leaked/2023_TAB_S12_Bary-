using System.ComponentModel.DataAnnotations;

namespace Gdziekupuja.Models.DTOs.UserDtos;

public class CreateUserDto
{
    [Required(ErrorMessage = "Pole jest wymagane")]
    [MaxLength(32, ErrorMessage = "Nazwa jest za długa")]
    [MinLength(1, ErrorMessage = "Niepoprawne dane")]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "Pole jest wymagane")]
    [EmailAddress(ErrorMessage = "Niepoprawne dane")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "Pole jest wymagane")]
    public string Password { get; set; } = null!;

    [Required(ErrorMessage = "Pole jest wymagane")]
    [Compare("Password", ErrorMessage = "Hasła nie są takie same")]
    public string ConfirmedPassword { get; set; } = null!;

    public bool IsAdmin { get; set; } = false;
}