using Gdziekupuja.Models.DTOs.ProductInstanceDtos;
using Gdziekupuja.Models.DTOs.SalesPointDtos;

namespace Gdziekupuja.Models.DTOs.OfferDtos;

public class OfferDto
{
    public int Id { get; set; }
    public decimal Price { get; set; }
    public bool IsFavourite { get; set; }
    public DateTime CreationTime { get; set; }
    public string UserName { get; set; } = null!;
    public SalesPointDto SalesPoint { get; set; } = null!;
    public ProductInstanceDto ProductInstance { get; set; } = null!;
}