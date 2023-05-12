using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Gdziekupuja.Common;
using Gdziekupuja.Exceptions;
using Gdziekupuja.Models;
using Gdziekupuja.Models.DTOs.UserDtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Gdziekupuja.Services;

public interface IUserService
{
    int RegisterUser(CreateUserDto dto);
    TokenToReturn LoginUser(LoginUserDto dto);
    IEnumerable<UserDto> GetAllUsers();
}

public class UserService : IUserService
{
    private readonly GdziekupujaContext _dbContext;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;

    public UserService(GdziekupujaContext dbContext, IMapper mapper, IConfiguration configuration)
    {
        _dbContext = dbContext;
        _mapper = mapper;
        _configuration = configuration;
    }

    public int RegisterUser(CreateUserDto dto)
    {
        if (_dbContext.Users.Any(u => u.Email == dto.Email))
            throw new InvalidDataException("Wpisany email jest już zajęty");

        CreatePasswordHash(dto.Password, out var passwordHash, out var passwordSalt);

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            CanComment = true,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
        };

        if (dto.IsAdmin)
        {
            var admin = new Administrator
            {
                User = user,
                UserId = user.Id
            };
            _dbContext.Administrators.Add(admin);
        }


        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();

        return user.Id;
    }

    public TokenToReturn LoginUser(LoginUserDto dto)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Email == dto.Email)
                   ?? throw new NotFoundException();

        if (dto.Password == null || !VerifyPasswordHash(dto.Password, user.PasswordHash, user.PasswordSalt))
            throw new InvalidDataException("Niepoprawny login lub hasło");

        return new TokenToReturn(GenerateToken(user));
    }

    public IEnumerable<UserDto> GetAllUsers()
    {
        return _dbContext.Users.ProjectTo<UserDto>(_mapper.ConfigurationProvider);
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using var hmac = new HMACSHA512();
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using var hmac = new HMACSHA512(passwordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        return computedHash.SequenceEqual(passwordHash);
    }

    private string GenerateToken(User user)
    {
        var isAdmin = _dbContext.Administrators.Any(a => a.UserId == user.Id);

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration.GetSection("Token").Value ?? throw new InvalidOperationException()));

        var token = new JwtSecurityToken
        (
            claims: new List<Claim>
            {
                new(type: "userId", user.Id.ToString()),
                new(type: "name", user.Name),
                new(type: "email", user.Email),
                new(type: "canComment", user.CanComment.ToString().ToLower()),
                new(type: "isAdmin", isAdmin.ToString().ToLower())
            },
            expires: DateTime.Now.AddDays(1),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}