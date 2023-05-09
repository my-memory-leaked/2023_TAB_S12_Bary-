namespace Gdziekupuja.Models.DTOs.CategoryDtos;

public class CreateCategoryDto
{
    public string Name { get; set; } = null!;
    public int? ParentId { get; set; }
}