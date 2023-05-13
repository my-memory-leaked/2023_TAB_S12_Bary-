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
    public ActionResult<int> Create(CreateProductDto dto)
    {
        var result = _service.CreateProduct(dto);
        return Ok(result);
    }

    [HttpGet]
    public ActionResult<ProductDto> GetAllProducts()
    {
        return Ok(_service.GetAllProducts());
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        _service.Delete(id);
        return Ok();
    }

    [HttpPut("{id}")]
    public ActionResult<int> Update(int id, UpdateProductDto dto)
    {
        _service.Update(id, dto);
        return Ok(id);
    }
}