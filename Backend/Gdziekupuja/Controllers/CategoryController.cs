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
    public ActionResult<int> Create(CreateCategoryDto category)
    {
        var id = _service.Create(category);
        return Ok(id);
    }

    [HttpGet("getBySuperiorId")]
    public ActionResult<IEnumerable<CategoryDto>> GetCategoriesBySuperiorId([FromQuery] int supId, int? childrenCount)
    {
        return Ok(_service.GetCategoriesBySuperiorId(supId, childrenCount));
    }

    [HttpGet("getAllSuperiors")]
    public ActionResult<IEnumerable<SuperiorCategoryDto>> GetAllSuperiors()
    {
        return Ok(_service.GetAllSuperiors());
    }

    [HttpGet("getAllCategories")]
    public ActionResult<IEnumerable<CategoryDto>> GetAllCategories()
    {
        return Ok(_service.GetAllCategories());
    }

    [HttpGet("getAllFlatCategories")]
    public ActionResult<IEnumerable<CategoryFlatDto>> GetAllFlatCategories()
    {
        return Ok(_service.GetAllCategoriesFlat());
    }
}
