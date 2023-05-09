using AutoMapper;
using AutoMapper.QueryableExtensions;
using Gdziekupuja.Models;
using Gdziekupuja.Models.DTOs.CategoryDtos;
using Microsoft.EntityFrameworkCore;

namespace Gdziekupuja.Services;

public interface ICategoryService
{
    int Create(CreateCategoryDto dto);
    IEnumerable<SuperiorCategoryDto> GetAllSuperiors();
    IEnumerable<CategoryDto> GetCategoriesBySuperiorId(int superiorId, int? childrenCount);
}

public class CategoryService : ICategoryService
{
    private readonly GdziekupujaContext _dbContext;
    private readonly IMapper _mapper;

    public CategoryService(GdziekupujaContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public int Create(CreateCategoryDto dto)
    {
        if (_dbContext.Categories.Any(c => c.Name == dto.Name))
        {
            throw new ArgumentException("Kategoria już istnieje");
        }

        var category = new Category { Name = dto.Name };
        if (dto.ParentId is null)
        {
            _dbContext.Categories.Add(category);
            _dbContext.SaveChanges();
            return category.Id;
        }

        var parent = _dbContext.Categories.FirstOrDefault(c => c.Id == dto.ParentId);
        if (parent is null)
        {
            throw new ArgumentException("Nie istnieje kategoria nadrzędna");
        }

        category.Parent = parent;
        category.ParentId = dto.ParentId;
        _dbContext.Categories.Add(category);
        _dbContext.SaveChanges();
        return category.Id;
    }

    private void CheckChildrenId(Category category, int parentId)
    {
        if (category.Id == parentId)
        {
            throw new ArgumentException("Category cannot have itself as a child");
        }

        foreach (var child in category.Children)
        {
            CheckChildrenId(child, parentId);
        }
    }

    public IEnumerable<SuperiorCategoryDto> GetAllSuperiors()
    {
        return _dbContext.Categories
            .Where(c => c.ParentId == null)
            .ProjectTo<SuperiorCategoryDto>(_mapper.ConfigurationProvider)
            .ToList();
    }

    public IEnumerable<CategoryDto> GetCategoriesBySuperiorId(int superiorId, int? childrenCount)
    {
        var categories = _dbContext.Categories
            .Where(c => c.Id == superiorId)
            .Include(c => c.Children)
            .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
            .ToList();

        childrenCount ??= -1; // -1 means all children

        foreach (var category in categories)
        {
            FillChildren(category.Children, childrenCount.Value);
        }

        return categories;
    }

    private void FillChildren(IEnumerable<CategoryDto?>? children, int childrenCount)
    {
        if (childrenCount == 0 || children is null) return;
        childrenCount--;

        foreach (var child in children)
        {
            if (child is null) continue;

            var temp = _dbContext.Categories
                .Where(c => c.ParentId == child.Id)
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .ToList();

            child.Children = temp.Any() && childrenCount != 0 ? temp : null;

            FillChildren(child.Children, childrenCount);
        }
    }
}