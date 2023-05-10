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
        var categories = _dbContext.Categories.Where(c => dto.CategoryIds.Contains(c.Id)).ToList();

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

        using (var transaction = _dbContext.Database.BeginTransaction())
        {
            try
            {
                // Enable IDENTITY_INSERT
                _dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.ProductInstances ON");

                // Perform database operations that require IDENTITY_INSERT
                var productInstance = _mapper.Map<ProductInstance>(dto);
                productInstance.IdNavigation = product;
                productInstance.Categories = categories;
                productInstance.ImageName = dto.Image.FileName;
                _dbContext.ProductInstances.Add(productInstance);
                _dbContext.SaveChanges();

                // Commit transaction and disable IDENTITY_INSERT
                transaction.Commit();
                _dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.ProductInstances OFF");

                return productInstance.Id;
            }
            catch (Exception ex)
            {
                // Handle exception and rollback transaction if necessary
                transaction.Rollback();
                throw;
            }
        }
    }
}