using AutoMapper;
using AutoMapper.QueryableExtensions;
using Gdziekupuja.Common;
using Gdziekupuja.Exceptions;
using Gdziekupuja.Models;
using Gdziekupuja.Models.DTOs.OfferDtos;
using Microsoft.EntityFrameworkCore;

namespace Gdziekupuja.Services;

public interface IOfferService
{
    int Create(CreateOfferDto dto, int productInstanceId);

    OffersWithTotalCount SearchOffers(int? countyId, string? productName, int? categoryId, int? pageSize, int? pageNumber,
        int? userId);

    void AddOfferToFavourites(int offerId, int userId);
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

    public OffersWithTotalCount SearchOffers(int? countyId, string? productName, int? categoryId, int? pageSize,
        int? pageNumber,
        int? userId)
    {
        var categoriesIds = _dbContext.Database
            .SqlQuery<int>($@"
                WITH Subcategories AS
				(
		            SELECT DISTINCT Id, parent_id
		            FROM Categories
		            WHERE parent_id = {categoryId}

		            UNION ALL

		            SELECT Categories.Id, Categories.parent_id
		            FROM Subcategories, Categories
		            WHERE Categories.parent_id = Subcategories.Id
				)

				SELECT Id FROM Subcategories").ToList();
        if (categoryId is not null)
            categoriesIds.Add(categoryId.Value);

        var offers = _dbContext.Offers
            .Include(o => o.Product)
            .ThenInclude(pi => pi.Product)
            .Include(o => o.User)
            .Include(o => o.SalesPoint)
            .ThenInclude(s => s.Address)
            .ThenInclude(a => a.County)
            .Where(o => EF.Functions.Like(o.Product.Product.Name, $"%{productName}%"))
            .Where(o => o.Product.Categories.Any(c => categoriesIds.Contains(c.Id)) || categoryId == null)
            .Where(o => countyId == null || o.SalesPoint.Address.County.Id == countyId)
            .OrderBy(o => o.CreationTime)
            .ProjectTo<OfferDto>(_mapper.ConfigurationProvider);
        //.ToList();

        if (pageSize.HasValue && pageNumber.HasValue)
            offers = offers.Skip(pageSize.Value * (pageNumber.Value - 1)).Take(pageSize.Value);

        var offersDto = offers.ToList();
        var totalCount = offersDto.Count;

        if (userId == null)
            return new OffersWithTotalCount { Count = totalCount, Offers = offersDto };

        var user = _dbContext.Users.Include(u => u.Offers).FirstOrDefault(u => u.Id == userId);

        var userFavs = _dbContext.Users
            .Where(u => u.Id == userId)
            .Include(u => u.Offers)
            .SelectMany(u => u.Offers);

        offersDto.ForEach(o => { o.IsFavourite = userFavs.FirstOrDefault(uf => uf.Id == o.Id) != null; });

        return new OffersWithTotalCount { Count = totalCount, Offers = offersDto };
    }

    public void AddOfferToFavourites(int offerId, int userId)
    {
        var user = _dbContext.Users.Include(u => u.Offers).FirstOrDefault(u => u.Id == userId) ??
                   throw new NotFoundException("Uzytkownik nie istnieje");
        var offer = _dbContext.Offers.FirstOrDefault(o => o.Id == offerId) ?? throw new NotFoundException("Oferta nie istnieje");

        var offerInFavs = user.Offers.FirstOrDefault(f => f.Id == offerId);

        if (offerInFavs is null)
            user.Offers.Add(offer);
        else
            user.Offers.Remove(offerInFavs);

        _dbContext.SaveChanges();
    }
}