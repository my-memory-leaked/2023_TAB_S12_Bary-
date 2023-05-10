using System;
using System.Collections.Generic;

namespace Gdziekupuja.Models;

public partial class ProductInstance
{
    public int Id { get; set; }

    public int ProductId { get; set; }
    
    public string AdditionalInfo { get; set; } = null!;

    public string ImageName { get; set; } = null!;

    public virtual ICollection<Offer> Offers { get; set; } = new List<Offer>();

    public virtual Product Product { get; set; } = null!;

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
}
