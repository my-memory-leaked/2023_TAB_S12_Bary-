namespace Gdziekupuja.Models.DTOs.CommentDtos;

public class CommentDto
{
    public int Id { get; set; }
    public int Likes { get; set; }
    public int DisLikes { get; set; }
    public string Content { get; set; } = null!;
    public string Author { get; set; } = null!;
    public int AuthorId { get; set; }
    public bool? IsLikedOrDislikedByUser { get; set; }
    public DateTime CreationTime { get; set; }
}