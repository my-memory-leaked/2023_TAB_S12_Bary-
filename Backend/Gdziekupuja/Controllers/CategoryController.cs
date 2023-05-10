using Gdziekupuja.Models.DTOs.CategoryDtos;
using Gdziekupuja.Services;
using Microsoft.AspNetCore.Mvc;

namespace Gdziekupuja.Controllers;

[ApiController]
[Route("/api/category")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _service;

    public CategoryController(ICategoryService service)
    {
        _service = service;
    }

    [HttpPost]
    public IActionResult Create(CreateCategoryDto category)
    {
        var id = _service.Create(category);
        return Ok(id);
    }

    [HttpGet("getBySuperiorId")]
    public IActionResult GetCategoriesBySuperiorId([FromQuery] int supId, int? childrenCount)
    {
        return Ok(_service.GetCategoriesBySuperiorId(supId, childrenCount));
    }

    [HttpGet("getAllSuperiors")]
    public IActionResult GetAllSuperiors()
    {
        return Ok(_service.GetAllSuperiors());
    }

    [HttpGet("getAllCategories")]
    public IActionResult GetAllCategories()
    {
        return Ok(_service.GetAllCategories());
    }
}