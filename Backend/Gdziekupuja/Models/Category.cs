using System;
using System.Collections.Generic;

namespace Gdziekupuja.Models;

public partial class Category
{
    public int Id { get; set; }

    public int? ParentId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Category> Children { get; set; } = new List<Category>();

    public virtual Category? Parent { get; set; }
}