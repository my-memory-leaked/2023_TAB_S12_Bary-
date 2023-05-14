using AutoMapper;
using AutoMapper.QueryableExtensions;
using Gdziekupuja.Exceptions;
using Gdziekupuja.Models;
using Gdziekupuja.Models.DTOs.ProductDtos;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Gdziekupuja.Services;

public interface IProductService
{
    int CreateProduct(CreateProductDto dto);
    IEnumerable<ProductDto>? GetAllProducts();
    void Delete(int id);
    int Update(int id, UpdateProductDto dto);
    IEnumerable<ProductDtoFlat>? GetAllProductsFlat();
    IDictionary<string, List<string>> GetProductProps(int id);
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
        product.AvailableProps = JsonSerializer.Serialize(dto.AvailableProps);

        _dbContext.Products.Add(product);
        _dbContext.SaveChanges();

        return product.Id;
    }

    //akcja do pobierania wszystkich produktów wraz z ich dostępnymi właściwościami 
    public IEnumerable<ProductDto>? GetAllProducts()
    {
        return _dbContext.Products.ProjectTo<ProductDto>(_mapper.ConfigurationProvider);
    }

    public IEnumerable<ProductDtoFlat>? GetAllProductsFlat()
    {
        return _dbContext.Products.ProjectTo<ProductDtoFlat>(_mapper.ConfigurationProvider);
    }

    public IDictionary<string, List<string>> GetProductProps(int id)
    {
        var productProps = _dbContext.Products.FirstOrDefault(p => p.Id == id)?.AvailableProps ??
                           throw new NotFoundException("nie isnieje");
        return JsonConvert.DeserializeObject<IDictionary<string, List<string>>>(productProps)!;
    }

    public void Delete(int id)
    {
        var product = _dbContext
            .Products
            .FirstOrDefault(p => p.Id == id) ?? throw new NotFoundException("Nie istnieje");

        _dbContext.Products.Remove(product);
        _dbContext.SaveChanges();
    }

    public int Update(int id, UpdateProductDto dto)
    {
        var product = _dbContext.Products
            .FirstOrDefault(p => p.Id == id) ?? throw new NotFoundException("Nie istnieje");

        product.Name = dto?.Name ?? product.Name;

        if (dto?.AvailableProps is not null)
            product.AvailableProps = JsonSerializer.Serialize(dto?.AvailableProps);

        _dbContext.Products.Update(product);
        _dbContext.SaveChanges();
        return id;
    }
}