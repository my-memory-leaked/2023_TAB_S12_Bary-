namespace Gdziekupuja.Models.DTOs.AddressDtos;

public class AddressDto
{
    public string City { get; set; } = null!;
    public string Street { get; set; } = null!;
    public string PostalCode { get; set; } = null!;
    public int Number { get; set; }
    public CountyDto County { get; set; } = null!;
}