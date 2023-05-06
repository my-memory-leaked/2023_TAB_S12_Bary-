using System;
using System.Collections.Generic;

namespace Gdziekupuja.Models;

public partial class Belong
{
    public int ProductInstanceId { get; set; }

    public int CategoryId { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual ProductInstance ProductInstance { get; set; } = null!;
}
