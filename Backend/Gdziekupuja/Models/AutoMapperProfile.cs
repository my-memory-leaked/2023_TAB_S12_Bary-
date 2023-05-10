using AutoMapper;
using Gdziekupuja.Models.DTOs;
using Gdziekupuja.Models.DTOs.AddressDtos;
using Gdziekupuja.Models.DTOs.CategoryDtos;
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

        //Category
        CreateMap<Category, CategoryDto>();
        CreateMap<Category, SuperiorCategoryDto>();

        //County
        CreateMap<County, CountyDto>();

        //Products
        CreateMap<CreateProductDto, Product>();

        //Product instance
        CreateMap<CreateProductInstanceDto, ProductInstance>();
        //.ForMember(pi => pi.Id, dto => dto.Ignore());

        // SalesPoint
        CreateMap<SalesPoint, SalesPointDto>();
        CreateMap<CreateSalesPointDto, SalesPoint>();
    }
}