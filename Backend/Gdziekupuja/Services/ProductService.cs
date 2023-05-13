using AutoMapper;
using AutoMapper.QueryableExtensions;
using Gdziekupuja.Exceptions;
using Gdziekupuja.Models;
using Gdziekupuja.Models.DTOs.ProductDtos;

namespace Gdziekupuja.Services;

public interface IProductService
{
    int CreateProduct(CreateProductDto dto);
    IEnumerable<ProductDto>? GetAllProducts();
    void Delete(int id);
}

public class ProductService : IProductService
{
    private readonly GdziekupujaContext _dbContext;
    private readonly IMapper _mapper;

    public ProductService(GdziekupujaContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public int CreateProduct(CreateProductDto dto)
    {
        if (_dbContext.Products.Any(p => p.Name == dto.Name))
            throw new NotUniqueElementException("Produkt o podanej nazwie już istnieje");

        var product = _mapper.Map<Product>(dto);
        _dbContext.Products.Add(product);
        _dbContext.SaveChanges();

        return product.Id;
    }

    public IEnumerable<ProductDto>? GetAllProducts()
    {
        return _dbContext.Products.ProjectTo<ProductDto>(_mapper.ConfigurationProvider);
    }

    public void Delete(int id)
    {
        var product = _dbContext
            .Products
            .FirstOrDefault(p => p.Id == id) ?? throw new NotFoundException("Nie istnieje");

        _dbContext.Products.Remove(product);
        _dbContext.SaveChanges();
    }
}