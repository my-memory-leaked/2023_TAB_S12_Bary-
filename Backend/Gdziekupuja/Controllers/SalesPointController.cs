using Gdziekupuja.Models.DTOs.SalesPointDtos;
using Gdziekupuja.Services;
using Microsoft.AspNetCore.Mvc;

namespace Gdziekupuja.Controllers;

[Route("api/salesPoint")]
[ApiController]
public class SalesPointController : ControllerBase
{
    private readonly ISalesPointService _service;

    public SalesPointController(ISalesPointService service)
    {
        _service = service;
    }

    [HttpPost]
    public ActionResult<int> CreateSalesPoint([FromBody] CreateSalesPointDto dto)
    {
        var salesPointId = _service.CreateSalesPoint(dto);
        return Created($"/api/salesPoint/{salesPointId}", salesPointId);
    }

    [HttpGet]
    public ActionResult GetSalesPoints([FromQuery] int? countyId)
    {
        return Ok(_service.GetSalesPoints(countyId));
    }
}