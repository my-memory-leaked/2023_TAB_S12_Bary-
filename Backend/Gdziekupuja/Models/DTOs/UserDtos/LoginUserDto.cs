using System.ComponentModel.DataAnnotations;

namespace Gdziekupuja.Models.DTOs.UserDtos;

public class LoginUserDto
{
	[EmailAddress(ErrorMessage ="Niepoprawny format")]
	public string? Email { get; set; }

	public string? Password { get; set; }
}