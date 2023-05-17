using Gdziekupuja.Models.DTOs.OfferDtos;

namespace Gdziekupuja.Common;

public class OffersWithTotalCount
{
    public int Count { get; set; }
    public List<OfferDto>? Offers { get; set; }
}