using System;
using System.Collections.Generic;

namespace Gdziekupuja.Models;

public partial class Address
{
    public int Id { get; set; }

    public string City { get; set; } = null!;

    public string Street { get; set; } = null!;

    public string PostalCode { get; set; } = null!;

    public int Number { get; set; }

    public int CountyId { get; set; }

    public virtual County County { get; set; } = null!;

    public virtual ICollection<SalesPoint> SalesPoints { get; set; } = new List<SalesPoint>();
}
