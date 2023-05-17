using Gdziekupuja.Common;
using Gdziekupuja.Models.DTOs.OfferDtos;
using Gdziekupuja.Models.DTOs.ProductInstanceDtos;
using Gdziekupuja.Services;
using Microsoft.AspNetCore.Mvc;

namespace Gdziekupuja.Controllers;

[ApiController]
[Route("api/offer")]
public class OfferController : ControllerBase
{
    private readonly IOfferService _service;
    private readonly IProductInstanceService _productInstanceService;

    public OfferController(IOfferService service, IProductInstanceService productInstanceService)
    {
        _service = service;
        _productInstanceService = productInstanceService;
    }

    [HttpPost]
    public ActionResult<int> CreateOffer([FromQuery] CreateOfferDto offerDto, [FromForm] CreateProductInstanceDto productInstanceDto)
    {
        var productInstanceId = _productInstanceService.Create(productInstanceDto);
        var offerId = _service.Create(offerDto, productInstanceId);
        return Ok(offerId);
    }

    [HttpGet]
    public ActionResult<IEnumerable<OfferDto>> GetOffers(int? countyId, string? productName, int? categoryId, int? pageSize,
        int? pageNumber, int? userId)
    {
        return Ok(_service.SearchOffers(countyId, productName, categoryId, pageSize, pageNumber, userId));
    }

    [HttpPost("favourites")]
    public ActionResult<OffersWithTotalCount> AddOfferToFavorites(int offerId, int userId)
    {
        _service.AddOfferToFavourites(offerId, userId);
        return Ok();
    }

    [HttpGet("favourites/{userId}")]
    public ActionResult<OffersWithTotalCount> GetFavouritesOffers(int userId, int pageSize, int pageNumber)
    {
        return Ok(_service.GetFavouritesOffers(userId, pageSize, pageNumber));
    }
}