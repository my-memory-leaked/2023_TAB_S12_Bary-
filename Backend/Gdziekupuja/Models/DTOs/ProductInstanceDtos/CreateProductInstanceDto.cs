using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper.Configuration.Annotations;
using Newtonsoft.Json;

namespace Gdziekupuja.Models.DTOs.ProductInstanceDtos;

public class CreateProductInstanceDto
{
    [Ignore] [Required] public int ProductId { get; set; }
    [Required] public ICollection<int> CategoryIds { get; set; } = null!;
    public IDictionary<string, string> AdditionalInfo { get; set; } = null!;
    [Required] public IFormFile Image { get; set; } = null!;
}