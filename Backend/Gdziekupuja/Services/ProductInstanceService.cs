using System.Text.Encodings.Web;
using System.Text.Json;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Gdziekupuja.Exceptions;
using Gdziekupuja.Models;
using Gdziekupuja.Models.DTOs.ProductInstanceDtos;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp.Processing.Processors.Transforms;

namespace Gdziekupuja.Services;

public interface IProductInstanceService
{
    int Create(CreateProductInstanceDto dto);
    IEnumerable<ProductInstanceDto> GetAll();
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

    public int Create(CreateProductInstanceDto dto)
    {
        var categories = _dbContext.Categories.Where(c => dto.CategoryIds.Contains(c.Id)).ToList();

        var product = _dbContext.Products.FirstOrDefault(p => p.Id == dto.ProductId);
        if (product is null)
            throw new NotFoundException("Nie istnieje taki produkt");

        // var creationTime = DateTimeOffset.Now;
        // var imageName =
        //     $"{dto.Image.Name}_{creationTime:ddMMyyyyhhmmssfff}_{new Random().Next(0, 10000000)}.{dto.Image.FileName.Split('.').Last()}";
        var random = new Random();
        var value = random.Next();
        
        var path = Path.Combine(Path.GetFullPath("wwwroot"), value + dto.Image.FileName);
        if (File.Exists(path))
            throw new ArgumentException("Niepoprawny obraz");

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

        productInstance.AdditionalInfo = JsonSerializer.Serialize(dto.AdditionalInfo, new JsonSerializerOptions
        {
            Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
        });
        productInstance.Product = product;
        productInstance.ProductId = product.Id;
        productInstance.Categories = categories;
        productInstance.ImageName = value + dto.Image.FileName;

        _dbContext.ProductInstances.Add(productInstance);
        _dbContext.SaveChanges();

        return productInstance.Id;
    }

    public IEnumerable<ProductInstanceDto> GetAll()
    {
        var p = _dbContext.ProductInstances
            .Include(pi => pi.Product)
            .Include(pi => pi.Categories)
            .ProjectTo<ProductInstanceDto>(_mapper.ConfigurationProvider);
        return p;
    }
}