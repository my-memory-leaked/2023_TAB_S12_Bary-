using Gdziekupuja.Models.DTOs.CommentDtos;

namespace Gdziekupuja.Services;

public interface ICommentService
{
    public int CreateComment(CreateCommentDto dto);
}

public class CommentService : ICommentService
{
    public int CreateComment(CreateCommentDto dto)
    {
        throw new NotImplementedException();
    }
}