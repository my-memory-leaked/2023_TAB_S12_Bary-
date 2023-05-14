namespace Gdziekupuja.Models.DTOs.OfferDtos;

public class CreateOfferDto
{
    public decimal Price { get; set; }
    public int SalesPointId { get; set; }
    public int UserId { get; set; }
}