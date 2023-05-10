namespace Gdziekupuja.Models.DTOs.CategoryDtos;

public class CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<CategoryDto?>? InverseParent { get; set; }
}