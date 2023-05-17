using AutoMapper;
using Gdziekupuja.Exceptions;
using Gdziekupuja.Models;
using Gdziekupuja.Models.DTOs.CommentDtos;

namespace Gdziekupuja.Services;

public interface ICommentService
{
    public int CreateComment(CreateCommentDto dto);
}

public class CommentService : ICommentService
{
    private readonly GdziekupujaContext _dbContext;
    private readonly IMapper _mapper;

    public CommentService(GdziekupujaContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public int CreateComment(CreateCommentDto dto)
    {
        var user = _dbContext
            .Users
            .FirstOrDefault(u => u.Id == dto.UserId) ?? throw new NotFoundException("Użytkownik nie istnieje");

        if (!user.CanComment) throw new ArgumentException("Użytkownik nie może komentować");

        var comment = _mapper.Map<Comment>(dto);

        _dbContext.Add(comment);
        _dbContext.SaveChanges();

        return comment.Id;
    }
}