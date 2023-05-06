using Gdziekupuja.Models.DTOs.AddressDtos;

namespace Gdziekupuja.Models.DTOs.SalesPointDtos;

public class SalesPointDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public AddressDto Address { get; set; } = null!;
}