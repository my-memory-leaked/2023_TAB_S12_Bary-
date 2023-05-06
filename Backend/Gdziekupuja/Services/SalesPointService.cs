using AutoMapper;
using Gdziekupuja.Exceptions;
using Gdziekupuja.Models;
using Gdziekupuja.Models.DTOs.SalesPointDtos;
using Microsoft.EntityFrameworkCore;

namespace Gdziekupuja.Services;

public interface ISalesPointService
{
    int CreateSalesPoint(CreateSalesPointDto dto);
    IEnumerable<SalesPointDto>? GetSalesPoints(int? countyId);
}

public class SalesPointService : ISalesPointService
{
    private readonly GdziekupujaContext _dbContext;
    private readonly IMapper _mapper;

    public SalesPointService(GdziekupujaContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public int CreateSalesPoint(CreateSalesPointDto dto)
    {
        var salesPoint = _mapper.Map<SalesPoint>(dto);

        if (_dbContext.Addresses.Any(a =>
                a.City == salesPoint.Address.City &&
                a.Street == salesPoint.Address.Street &&
                a.PostalCode == salesPoint.Address.PostalCode &&
                a.Number == salesPoint.Address.Number &&
                a.CountyId == salesPoint.Address.CountyId))
            throw new NotUniqueElementException("Pod tym adresem znajduje się już punkt sprzedaży");

        _dbContext.Add((object)salesPoint);
        _dbContext.SaveChanges();
        return salesPoint.Id;
    }

    public IEnumerable<SalesPointDto>? GetSalesPoints(int? countyId)
    {
        var salesPoints = _dbContext
            .SalesPoints
            .Include(s => s.Address)
            .ThenInclude(a => a.County)
            .Where(s => countyId == null || s.Address.CountyId == countyId)
            .OrderBy(s => s.Name);

        return _mapper.Map<IEnumerable<SalesPointDto>>(salesPoints);
    }
}