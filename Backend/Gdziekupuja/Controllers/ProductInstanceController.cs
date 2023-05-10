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
    public IActionResult Create([FromForm] CreateProductInstanceDto dto)
    {
        var result = _service.CreateProduct(dto);
        return Ok(result);
    }
}