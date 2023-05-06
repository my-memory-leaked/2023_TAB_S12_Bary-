using System.ComponentModel.DataAnnotations;
using Gdziekupuja.Models.DTOs.AddressDtos;

namespace Gdziekupuja.Models.DTOs.SalesPointDtos;

public class CreateSalesPointDto
{
    [Required(ErrorMessage = "Pole jest wymagane")]
    [MaxLength(128, ErrorMessage = "Nazwa jest za długa")]
    [MinLength(1, ErrorMessage = "Niepoprawne dane")]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "Pole jest wymagane")]
    public CreateAddressDto Address { get; set; } = null!;
}