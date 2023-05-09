using Gdziekupuja.Models.DTOs.ProductDtos;
using Gdziekupuja.Services;
using Microsoft.AspNetCore.Mvc;

namespace Gdziekupuja.Controllers;

[ApiController]
[Route("/api/product")]
public class ProductController : ControllerBase
{
    private readonly IProductService _service;

    public ProductController(IProductService service)
    {
        _service = service;
    }

    [HttpPost]
    public IActionResult Create(CreateProductDto dto)
    {
        var result = _service.CreateProduct(dto);
        return Ok(result);
    }
}