using System;
using System.Collections.Generic;

namespace Gdziekupuja.Models;

public partial class Favourite
{
    public int UserId { get; set; }

    public int OfferId { get; set; }

    public virtual Offer Offer { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
