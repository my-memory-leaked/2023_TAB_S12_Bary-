using System;
using System.Collections.Generic;

namespace Gdziekupuja.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ProductInstance? ProductInstance { get; set; }
}
