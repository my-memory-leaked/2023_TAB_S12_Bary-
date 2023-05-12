using System.ComponentModel.DataAnnotations;
using Gdziekupuja.Models.DTOs.AddressDtos;

namespace Gdziekupuja.Models.DTOs.SalesPointDtos;

public class UpdateSalesPointDto
{
    [MaxLength(128, ErrorMessage = "Nazwa jest za długa")]
    [MinLength(1, ErrorMessage = "Niepoprawne dane")]
    public string? Name { get; set; }

    public UpdateAddressDto? Address { get; set; }
}