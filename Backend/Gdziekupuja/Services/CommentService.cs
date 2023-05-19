using AutoMapper;
using Gdziekupuja.Exceptions;
using Gdziekupuja.Models;
using Gdziekupuja.Models.DTOs.CommentDtos;
using Microsoft.EntityFrameworkCore;

namespace Gdziekupuja.Services;

public interface ICommentService
{
    int CreateComment(CreateCommentDto dto);
    void DislikeComment(int commentId, int userId);
    void LikeComment(int commentId, int userId);
    void Ban(int adminId, int commentId);
    void Unban(int adminId, int commentId);
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
        comment.CreationTime = DateTime.Now;

        _dbContext.Comments.Add(comment);
        _dbContext.SaveChanges();

        return comment.Id;
    }

    public void DislikeComment(int commentId, int userId)
    {
        var foundUser = _dbContext
                            .Users
                            .FirstOrDefault(u => u.Id == userId)
                        ?? throw new NotFoundException("Użytkownik nie istnieje");

        var comment = _dbContext
                          .Comments
                          .Include(u => u.Users)
                          .Include(u => u.UsersNavigation)
                          .FirstOrDefault(c => c.Id == commentId)
                      ?? throw new NotFoundException("Komentarz nie istnieje");

        if (!foundUser.CanComment) throw new ArgumentException("Użytkownik nie może komentować");

        var likers = comment.UsersNavigation;
        var dislikers = comment.Users;

        var user = GetDisliker(commentId, userId);

        if (user is not null)
        {
            dislikers.Remove(user);
            comment.Dislikers--;
        }
        else
        {
            var liker = GetLiker(commentId, userId);
            if (liker is not null)
            {
                likers.Remove(liker);
                comment.Likers--;
            }

            dislikers.Add(foundUser);
            comment.Dislikers++;
        }

        _dbContext.SaveChanges();
    }

    public void LikeComment(int commentId, int userId)
    {
        var foundUser = _dbContext
                            .Users
                            .FirstOrDefault(u => u.Id == userId)
                        ?? throw new NotFoundException("Użytkownik nie istnieje");

        var comment = _dbContext
                          .Comments
                          .Include(u => u.Users)
                          .Include(u => u.UsersNavigation)
                          .FirstOrDefault(c => c.Id == commentId)
                      ?? throw new NotFoundException("Komentarz nie istnieje");

        if (!foundUser.CanComment) throw new ArgumentException("Użytkownik nie może komentować");

        var likers = comment.UsersNavigation;
        var dislikers = comment.Users;

        var user = GetLiker(commentId, userId);

        if (user is not null)
        {
            likers.Remove(user);
            comment.Likers--;
        }
        else
        {
            var disliker = GetDisliker(commentId, userId);
            if (disliker is not null)
            {
                dislikers.Remove(disliker);
                comment.Dislikers--;
            }

            likers.Add(foundUser);
            comment.Likers++;
        }

        _dbContext.SaveChanges();
    }

    private User? GetLiker(int commentId, int? userId)
    {
        return _dbContext
            .Comments
            .Where(c => c.Id == commentId)
            .Include(c => c.UsersNavigation)
            .SelectMany(l => l.UsersNavigation)
            .FirstOrDefault(u => u.Id == userId);
    }

    private User? GetDisliker(int commentId, int userId)
    {
        return _dbContext
            .Comments
            .Where(c => c.Id == commentId)
            .Include(c => c.Users)
            .SelectMany(l => l.Users)
            .FirstOrDefault(u => u.Id == userId);
    }
    
    public void Ban(int adminId, int commentId)
    {
        var admin = _dbContext.Administrators.FirstOrDefault(u => u.UserId == adminId)
                    ?? throw new NotFoundException("Nie jestes administratorem");

        var comment = _dbContext.Comments.FirstOrDefault(c => c.Id == commentId)
                      ?? throw new NotFoundException("Komentarz nie istnieje");

        comment.Admin = admin;
        comment.AdminId = adminId;

        _dbContext.SaveChanges();
    }

    public void Unban(int adminId, int commentId)
    {
        _ = _dbContext.Administrators.FirstOrDefault(u => u.UserId == adminId)
            ?? throw new NotFoundException("Nie jestes administratorem");

        var comment = _dbContext.Comments.FirstOrDefault(c => c.Id == commentId)
                      ?? throw new NotFoundException("Komentarz nie istnieje");

        comment.Admin = null;
        comment.AdminId = null;

        _dbContext.SaveChanges();
    }
}