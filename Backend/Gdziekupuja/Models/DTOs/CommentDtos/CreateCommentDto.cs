using System.ComponentModel.DataAnnotations;

namespace Gdziekupuja.Models.DTOs.CommentDtos;

public class CreateCommentDto
{
    [Required(ErrorMessage = "Pole jest wymagane")]
    [MaxLength(250, ErrorMessage = "Treść jest nie może być dłuższa niż 250 znaków")]
    [MinLength(1, ErrorMessage = "Niepoprawne dane")]
    public string Content { get; set; } = null!;

    [Required(ErrorMessage = "Pole jest wymagane")]
    public int UserId { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    public int OfferId { get; set; }
}