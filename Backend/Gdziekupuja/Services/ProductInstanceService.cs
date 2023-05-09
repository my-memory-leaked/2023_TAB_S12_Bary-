using AutoMapper;
using Gdziekupuja.Exceptions;
using Gdziekupuja.Models;
using Gdziekupuja.Models.DTOs.ProductInstanceDtos;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp.Processing.Processors.Transforms;

namespace Gdziekupuja.Services;

public interface IProductInstanceService
{
    int CreateProduct(CreateProductInstanceDto dto);
}

public class ProductInstanceService : IProductInstanceService
{
    private readonly GdziekupujaContext _dbContext;
    private readonly IMapper _mapper;

    public ProductInstanceService(GdziekupujaContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public int CreateProduct(CreateProductInstanceDto dto)
    {
        var categories = _dbContext.Belongs.Where(b => dto.CategoryIds.Contains(b.CategoryId)).ToList();

        var product = _dbContext.Products.FirstOrDefault(p => p.Id == dto.ProductId);
        if (product is null)
            throw new NotFoundException("Produkt o podanej nazwie nie istnieje");

        var path = Path.Combine(Path.GetFullPath("wwwroot"), dto.Image.FileName);
        if (File.Exists(path))
            throw new NotUniqueElementException("Plik o takiej nazwie już istnieje");

        using (var image = Image.Load(dto.Image.OpenReadStream()))
        {
            image.Mutate(op => op.Resize(new ResizeOptions
            {
                Size = new Size(170, 125),
                Mode = ResizeMode.Max,
                Sampler = LanczosResampler.Lanczos3
            }));

            image.Save(path);
        }

        var productInstance = _mapper.Map<ProductInstance>(dto);
        productInstance.Product = product;
        productInstance.Categories = categories;
        productInstance.ImageName = dto.Image.FileName;

        _dbContext.ProductInstances.Add(productInstance);
        _dbContext.SaveChanges();
        return productInstance.Id;
    }
}