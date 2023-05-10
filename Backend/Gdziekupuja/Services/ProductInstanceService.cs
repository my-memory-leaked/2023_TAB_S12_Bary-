using AutoMapper;
using Gdziekupuja.Exceptions;
using Gdziekupuja.Models;
using Gdziekupuja.Models.DTOs.ProductInstanceDtos;
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
        var categories = _dbContext.Categories.Where(c => dto.CategoryIds.Contains(c.Id)).ToList();

        var product = _dbContext.Products.FirstOrDefault(p => p.Id == dto.ProductId);
        if (product is null)
            throw new NotFoundException("Produkt o podanej nazwie nie istnieje");

        var creationTime = DateTimeOffset.Now;
        var imageName =
            $"{dto.Image.Name}_{creationTime:ddMMyyyyhhmmssfff}_{new Random().Next(0, 10000000)}.{dto.Image.FileName.Split('.').Last()}";

        var path = Path.Combine(Path.GetFullPath("wwwroot"), imageName);

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
        productInstance.ProductId = product.Id;
        productInstance.Categories = categories;
        productInstance.ImageName = dto.Image.FileName;

        _dbContext.ProductInstances.Add(productInstance);
        _dbContext.SaveChanges();

        return productInstance.Id;
    }
}