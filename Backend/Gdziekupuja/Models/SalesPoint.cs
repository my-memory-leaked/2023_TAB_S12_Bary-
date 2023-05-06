using System;
using System.Collections.Generic;

namespace Gdziekupuja.Models;

public partial class SalesPoint
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int AddressId { get; set; }

    public virtual Address Address { get; set; } = null!;

    public virtual ICollection<Offer> Offers { get; set; } = new List<Offer>();
}
