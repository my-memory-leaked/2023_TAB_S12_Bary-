using System.ComponentModel.DataAnnotations;

namespace Gdziekupuja.Models.DTOs.ProductInstanceDtos;

public class CreateProductInstanceDto
{
    [Required] public int ProductId { get; set; }

    [Required] public int[] CategoryIds { get; set; } = null!;

    public IDictionary<string, string> AdditionalInfo { get; set; } = null!;

    [Required] public IFormFile Image { get; set; } = null!;
}