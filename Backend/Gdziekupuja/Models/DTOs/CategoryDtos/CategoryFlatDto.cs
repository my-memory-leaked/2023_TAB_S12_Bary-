namespace Gdziekupuja.Models.DTOs.CategoryDtos;

public class CategoryFlatDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int? ParentId { get; set; }
}