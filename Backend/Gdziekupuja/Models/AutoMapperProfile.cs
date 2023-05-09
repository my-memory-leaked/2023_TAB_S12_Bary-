using AutoMapper;
using Gdziekupuja.Models.DTOs;
using Gdziekupuja.Models.DTOs.AddressDtos;
using Gdziekupuja.Models.DTOs.ProductDtos;
using Gdziekupuja.Models.DTOs.ProductInstanceDtos;
using Gdziekupuja.Models.DTOs.SalesPointDtos;

namespace Gdziekupuja.Models;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // Address
        CreateMap<Address, AddressDto>();
        CreateMap<CreateAddressDto, Address>();

        //County
        CreateMap<County, CountyDto>();

        //Products
        CreateMap<Product, CreateProductDto>();

        //Product instance
        CreateMap<ProductInstance, CreateProductInstanceDto>();

        // SalesPoint
        CreateMap<SalesPoint, SalesPointDto>();
        CreateMap<CreateSalesPointDto, SalesPoint>();
    }
}