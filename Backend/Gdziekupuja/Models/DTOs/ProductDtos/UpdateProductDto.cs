namespace Gdziekupuja.Models.DTOs.ProductDtos;

public class UpdateProductDto
{
    public string? Name { get; set; }
    public IDictionary<string, List<string>>? AvailableProps { get; set; }
}