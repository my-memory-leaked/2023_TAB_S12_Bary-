using AutoMapper;
using Gdziekupuja.Models.DTOs;
using Gdziekupuja.Models.DTOs.AddressDtos;
using Gdziekupuja.Models.DTOs.CategoryDtos;
using Gdziekupuja.Models.DTOs.ProductDtos;
using Gdziekupuja.Models.DTOs.ProductInstanceDtos;
using Gdziekupuja.Models.DTOs.SalesPointDtos;
using Gdziekupuja.Models.DTOs.UserDtos;
using Newtonsoft.Json;
using NuGet.Protocol;

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
        CreateMap<Category, CategoryFlatDto>();

        //County
        CreateMap<County, CountyDto>();

        //Products
        CreateMap<CreateProductDto, Product>();
        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.AvailableProps, opt
                => opt.MapFrom(src => ToJson(src.AvailableProps)));

        CreateMap<Product, ProductDtoFlat>();

        //Product instance
        CreateMap<CreateProductInstanceDto, ProductInstance>();
        CreateMap<ProductInstance, ProductInstanceDto>();

        // SalesPoint
        CreateMap<SalesPoint, SalesPointDto>();
        CreateMap<CreateSalesPointDto, SalesPoint>();

        //User
        CreateMap<User, UserDto>();
    }

    private static IDictionary<string, List<string>> ToJson(string props)
    {
        return JsonConvert.DeserializeObject<IDictionary<string, List<string>>>(props)!;
    }
}