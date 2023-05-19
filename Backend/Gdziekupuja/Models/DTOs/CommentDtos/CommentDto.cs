namespace Gdziekupuja.Models.DTOs.CommentDtos;

public class CommentDto
{
    public int Id { get; set; }
    public int Likers { get; set; }
    public int DisLikers { get; set; }
    public string Content { get; set; } = null!;
    public string Author { get; set; } = null!;
    public int AuthorId { get; set; }
    public bool? IsLikedOrDislikedByUser { get; set; }
    public DateTime CreationTime { get; set; }
}