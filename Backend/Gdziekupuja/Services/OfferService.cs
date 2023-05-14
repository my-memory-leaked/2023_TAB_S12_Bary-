using AutoMapper;
using Gdziekupuja.Exceptions;
using Gdziekupuja.Models;
using Gdziekupuja.Models.DTOs.OfferDtos;

namespace Gdziekupuja.Services;

public interface IOfferService
{
    int Create(CreateOfferDto dto, int productInstanceId);
}

public class OfferService : IOfferService
{
    private readonly IMapper _mapper;
    private readonly GdziekupujaContext _dbContext;

    public OfferService(IMapper mapper, GdziekupujaContext dbContext)
    {
        _mapper = mapper;
        _dbContext = dbContext;
    }

    public int Create(CreateOfferDto dto, int productInstanceId)
    {
        var salesPoint = _dbContext.SalesPoints.FirstOrDefault(x => x.Id == dto.SalesPointId) ?? throw new NotFoundException("");
        var user = _dbContext.Users.FirstOrDefault(x => x.Id == dto.UserId) ?? throw new NotFoundException("");
        var productInstance = _dbContext.ProductInstances.FirstOrDefault(x => x.Id == productInstanceId) ?? throw new NotFoundException("");

        var offer = new Offer
        {
            Price = dto.Price,
            SalesPointId = dto.SalesPointId,
            SalesPoint = salesPoint,
            User = user,
            Product = productInstance,
            ProductId = productInstanceId,
            UserId = dto.UserId,
            CreationTime = DateTime.Now
        };

        _dbContext.Offers.Add(offer);
        _dbContext.SaveChanges();
        return offer.Id;
    }
}