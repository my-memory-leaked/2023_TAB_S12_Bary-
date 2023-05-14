namespace Gdziekupuja.Models.DTOs.ProductDtos;

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public IDictionary<string, List<string>> AvailableProps { get; set; } = null!;
}