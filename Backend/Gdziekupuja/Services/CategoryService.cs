using AutoMapper;
using AutoMapper.QueryableExtensions;
using Gdziekupuja.Exceptions;
using Gdziekupuja.Models;
using Gdziekupuja.Models.DTOs.CategoryDtos;
using Microsoft.EntityFrameworkCore;

namespace Gdziekupuja.Services;

public interface ICategoryService
{
    int Create(CreateCategoryDto dto);
    IEnumerable<SuperiorCategoryDto> GetAllSuperiors();
    IEnumerable<CategoryDto> GetCategoriesBySuperiorId(int superiorId, int? childrenCount);
    IEnumerable<CategoryDto> GetAllCategories();
    IEnumerable<CategoryFlatDto> GetAllCategoriesFlat();
    int Update(int id, UpdateCategoryDto dto);
    void Delete(int id);
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

    public int Update(int id, UpdateCategoryDto dto)
    {
        var category = _dbContext.Categories.FirstOrDefault(c => c.Id == id) ??
                       throw new NotFoundException("Kategoria nie istnieje");

        if (dto.Name is not null)
        {
            category.Name = dto.Name;
        }

        if (dto.ParentId is not null)
        {
            var parent = _dbContext.Categories.FirstOrDefault(c => c.Id == dto.ParentId);
            if (parent is null)
            {
                throw new NotFoundException("Kategoria nadrzędna nie istnieje");
            }

            var currentCategory = (_dbContext.Categories
                .Include(c => c.InverseParent)
                .ToList()).FirstOrDefault(c => c.Id == id);

            CheckChildrenId(currentCategory!, dto.ParentId.Value);

            category.Parent = parent;
            category.ParentId = dto.ParentId;
        }
        else
        {
            category.ParentId = null;
            category.Parent = null;
        }

        _dbContext.Categories.Update(category);
        _dbContext.SaveChanges();
        return category.Id;
    }

    public void Delete(int id)
    {
        var categoryToRemove = _dbContext.Categories
            .FirstOrDefault(c => c.Id == id) ?? throw new NotFoundException("Kategoria nie istnieje");

        _dbContext.Categories
            .Where(c => c.ParentId == id)
            .ForEachAsync(c => c.ParentId = null).GetAwaiter().GetResult();

        _dbContext.Categories.Remove(categoryToRemove);
        _dbContext.SaveChanges();
    }

    private void CheckChildrenId(Category category, int parentId)
    {
        if (category.Id == parentId)
        {
            throw new ArgumentException("Category cannot have itself as a child");
        }

        foreach (var child in category.InverseParent)
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

    public IEnumerable<CategoryDto> GetAllCategories()
    {
        var superiors = _dbContext.Categories
            .Where(c => c.ParentId == null)
            .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
            .ToList();

        var categories = new List<CategoryDto>();
        foreach (var sup in superiors)
        {
            categories.AddRange(GetCategoriesBySuperiorId(sup.Id, null));
        }

        return categories;
    }

    public IEnumerable<CategoryFlatDto> GetAllCategoriesFlat()
    {
        return _dbContext.Categories
            .ProjectTo<CategoryFlatDto>(_mapper.ConfigurationProvider);
    }


    public IEnumerable<CategoryDto> GetCategoriesBySuperiorId(int superiorId, int? childrenCount)
    {
        var categories = _dbContext.Categories
            .Where(c => c.Id == superiorId)
            .Include(c => c.InverseParent)
            .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
            .ToList();

        childrenCount ??= -1; // -1 means all children

        foreach (var category in categories)
        {
            FillChildren(category.InverseParent, childrenCount.Value);
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

            child.InverseParent = temp.Any() && childrenCount != 0 ? temp : null;

            FillChildren(child.InverseParent, childrenCount);
        }
    }
}