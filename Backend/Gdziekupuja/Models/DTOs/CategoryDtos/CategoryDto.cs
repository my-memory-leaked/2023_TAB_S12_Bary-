namespace Gdziekupuja.Models.DTOs.CategoryDtos;

public class CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public List<CategoryDto> InverseParent { get; set; }
}