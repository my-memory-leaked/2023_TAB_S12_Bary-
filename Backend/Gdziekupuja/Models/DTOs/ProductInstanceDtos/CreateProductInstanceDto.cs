using System.ComponentModel.DataAnnotations;

namespace Gdziekupuja.Models.DTOs.ProductInstanceDtos;

public class CreateProductInstanceDto
{
    [Required] public int ProductId { get; set; }
    [Required] public ICollection<int> CategoryIds { get; set; } = null!;
    [Required] public string Model { get; set; } = null!;
    public string? AdditionalInfo { get; set; }
    [Required] public IFormFile Image { get; set; } = null!;
}