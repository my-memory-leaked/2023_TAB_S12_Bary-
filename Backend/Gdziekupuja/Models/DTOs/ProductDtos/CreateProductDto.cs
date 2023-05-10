using System.ComponentModel.DataAnnotations;

namespace Gdziekupuja.Models.DTOs.ProductDtos;

public class CreateProductDto
{
    [Required(ErrorMessage = "Pole jest wymagane")]
    [MaxLength(32, ErrorMessage = "Nazwa jest za długa")]
    [MinLength(1, ErrorMessage = "Niepoprawne dane")]
    public string Name { get; set; } = null!;
}