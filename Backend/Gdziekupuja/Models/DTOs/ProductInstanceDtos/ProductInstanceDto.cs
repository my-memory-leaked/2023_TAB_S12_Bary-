using Gdziekupuja.Models.DTOs.CategoryDtos;
using Gdziekupuja.Models.DTOs.ProductDtos;

namespace Gdziekupuja.Models.DTOs.ProductInstanceDtos;

public class ProductInstanceDto
{
    public int Id { get; set; }
    public ProductDto Product { get; set; } = null!;
    public string AdditionalInfo { get; set; } = null!;
    public IEnumerable<CategoryFlatDto> Categories { get; set; } = null!;
    public string ImageName { get; set; } = null!;
}