using System;
using System.Collections.Generic;

namespace Gdziekupuja.Models;

public partial class ProductInstance
{
    public int Id { get; set; }

    public int CategoryId { get; set; }

    public string AdditionalInfo { get; set; } = null!;

    public string ImageName { get; set; } = null!;

    public string Model { get; set; } = null!;

    public virtual Product IdNavigation { get; set; } = null!;

    public virtual ICollection<Offer> Offers { get; set; } = new List<Offer>();
}
