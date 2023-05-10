using Gdziekupuja.Models;
using Gdziekupuja.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Gdziekupuja.Controllers;

[Route("api/county")]
[ApiController]
public class CountyController : ControllerBase
{
    readonly GdziekupujaContext _dbContext;

    public CountyController(GdziekupujaContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public ActionResult<IEnumerable<CountyDto>> GetAll()
    {
        return Ok(_dbContext.Counties.OrderBy(c => c.Name));
    }

    [HttpGet("{id}")]
    public ActionResult<CountyDto> Get([FromRoute] int id)
    {
        return Ok(_dbContext.Counties.FirstOrDefault(c => c.Id == id));
    }
}