using System.ComponentModel.DataAnnotations;

namespace Gdziekupuja.Models.DTOs.AddressDtos;

public class CreateAddressDto
{
    [Required(ErrorMessage = "Pole jest wymagane")]
    [MaxLength(64, ErrorMessage = "Nazwa jest za długa")]
    [MinLength(1, ErrorMessage = "Nazwa jest za krótka")]
    [RegularExpression(@"^[a-żA-Ż]+\-?[a-żA-Ż]+$", ErrorMessage = "Niepoprawny format")]
    public string City { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    [MaxLength(64, ErrorMessage = "Nazwa jest za długa")]
    [MinLength(1, ErrorMessage = "Nazwa jest za krótka")]
    [RegularExpression(@"^[a-żA-Ż]+(\s?[a-żA-Ż]+)*$", ErrorMessage = "Niepoprawny format")]
    public string Street { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    [MaxLength(64, ErrorMessage = "Nazwa jest za długa")]
    [MinLength(1, ErrorMessage = "Nazwa jest za krótka")]
    [RegularExpression(@"\d{2}-\d{3}", ErrorMessage = "Niepoprawny format")]
    public string PostalCode { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    [Range(1, 5000, ErrorMessage = "Niepoprawna wartość")]
    public int Number { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    public int CountyId { get; set; }
}