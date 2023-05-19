using Gdziekupuja.Models.DTOs.CommentDtos;
using Gdziekupuja.Services;
using Microsoft.AspNetCore.Mvc;

namespace Gdziekupuja.Controllers;

[ApiController]
[Route("api/comment")]
public class CommentController : ControllerBase
{
    private readonly ICommentService _service;

    public CommentController(ICommentService service)
    {
        _service = service;
    }

    [HttpPost]
    public ActionResult<int> CreateComment([FromBody] CreateCommentDto dto)
    {
        var commentId = _service.CreateComment(dto);
        return Created($"/api/comment/{commentId}", commentId);
    }

    [HttpPut("dislike")]
    public ActionResult DislikeComment(int commentId, int userId)
    {
        _service.DislikeComment(commentId, userId);
        return Ok();
    }

    [HttpPut("like")]
    public ActionResult LikeComment(int commentId, int userId)
    {
        _service.LikeComment(commentId, userId);
        return Ok();
    }
    
    [HttpPut("ban")]
    public ActionResult BanComment(int adminId, int commentId)
    {
        _service.Ban(adminId, commentId);
        return Ok();
    }
    
    [HttpPut("unban")]
    public ActionResult UnbanComment(int adminId, int commentId)
    {
        _service.Unban(adminId, commentId);
        return Ok();
    }
}