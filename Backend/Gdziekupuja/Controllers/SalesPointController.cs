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
        var salesPointId = _service.Create(dto);
        return Created($"/api/salesPoint/{salesPointId}", salesPointId);
    }

    [HttpGet]
    public ActionResult<IEnumerable<SalesPointDto>?> GetSalesPoints([FromQuery] int? countyId)
    {
        return Ok(_service.GetAll(countyId));
    }

    [HttpPut("{id}")]
    public ActionResult<int> UpdateSalesPoint([FromRoute] int id, [FromBody] UpdateSalesPointDto dto)
    {
        return Ok(_service.Update(id, dto));
    }

    [HttpDelete("{id}")]
    public IActionResult Delete([FromRoute] int id)
    {
        _service.Delete(id);
        return Ok();
    }
}