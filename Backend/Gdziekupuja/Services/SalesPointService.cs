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
    int UpdateSalesPoint(int id, UpdateSalesPointDto dto);
    void DeleteSalesPoint(int id);
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

    public int UpdateSalesPoint(int id, UpdateSalesPointDto dto)
    {
        var salesPoint = _dbContext
            .SalesPoints
            .Include(s => s.Address)
            .FirstOrDefault(s => s.Id == id);

        if (salesPoint == null)
            throw new NotFoundException("Wybrany punkt sprzedaży nie istnieje");

        salesPoint.Name = dto?.Name ?? salesPoint.Name;

        if (dto?.Address != null)
        {
            salesPoint.Address.City = dto?.Address.City ?? salesPoint.Address.City;
            salesPoint.Address.Street = dto?.Address.Street ?? salesPoint.Address.Street;
            salesPoint.Address.PostalCode = dto?.Address.PostalCode ?? salesPoint.Address.PostalCode;
            salesPoint.Address.Number = dto?.Address.Number ?? salesPoint.Address.Number;
            salesPoint.Address.CountyId = dto?.Address.CountyId ?? salesPoint.Address.CountyId;
        }

        _dbContext.SaveChanges();
        return id;
    }

    public void DeleteSalesPoint(int id)
    {
        var salesPoint = _dbContext
                             .SalesPoints
                             .Include(s => s.Address)
                             .FirstOrDefault(p => p.Id == id)
                         ?? throw new NotFoundException("Produkt nie istnieje");

        _dbContext.Remove(salesPoint.Address);
        _dbContext.SaveChanges();
    }
}