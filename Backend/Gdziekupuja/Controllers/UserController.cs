using Gdziekupuja.Models.DTOs.UserDtos;
using Gdziekupuja.Services;
using Microsoft.AspNetCore.Mvc;

namespace Gdziekupuja.Controllers;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
	private readonly IUserService _service;

	public UserController(IUserService service)
	{
		_service = service;
	}
	
	[HttpPost("register")]
	public ActionResult<int> Register([FromBody] CreateUserDto dto)
	{
		return Ok(_service.RegisterUser(dto));
	}

	[HttpPost("login")]
	public ActionResult<string> Login([FromBody] LoginUserDto dto)
	{
		return Ok(_service.LoginUser(dto));
	}
}