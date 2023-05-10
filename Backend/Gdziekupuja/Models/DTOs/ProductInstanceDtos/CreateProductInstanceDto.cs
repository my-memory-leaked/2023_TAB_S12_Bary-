using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper.Configuration.Annotations;
using Newtonsoft.Json;

namespace Gdziekupuja.Models.DTOs.ProductInstanceDtos;

public class KeyValueClass
{
    public string Key { get; set; }
    public string Value { get; set; }
}

public class CreateProductInstanceDto
{
    [Required] public int ProductId { get; set; }

    [Required] public ICollection<int> CategoryIds { get; set; } = null!;

    public IDictionary<string, string> AdditionalInfo { get; set; }

    public IFormFile Image { get; set; } = null!;
}