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
}