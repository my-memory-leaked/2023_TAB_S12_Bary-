using Gdziekupuja.Models.DTOs.ProductInstanceDtos;
using Gdziekupuja.Services;
using Microsoft.AspNetCore.Mvc;

namespace Gdziekupuja.Controllers;

[ApiController]
[Route("/api/productInstance")]
public class ProductInstanceController : ControllerBase
{
    private readonly IProductInstanceService _service;

    public ProductInstanceController(IProductInstanceService service)
    {
        _service = service;
    }

    [HttpPost]
    public ActionResult<int> Create([FromForm] CreateProductInstanceDto dto)
    {
        var result = _service.Create(dto);
        return Ok(result);
    }

    [HttpGet]
    public ActionResult<IEnumerable<ProductInstanceDto>> GetAll()
    {
        return Ok(_service.GetAll());
    }
}