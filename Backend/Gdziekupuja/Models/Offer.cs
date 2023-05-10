using System;
using System.Collections.Generic;

namespace Gdziekupuja.Models;

public partial class Offer
{
    public int Id { get; set; }

    public decimal Price { get; set; }

    public int ProductId { get; set; }

    public int SalesPointId { get; set; }

    public DateTime CreationTime { get; set; }

    public int AdminId { get; set; }

    public int UserId { get; set; }

    public virtual Administrator Admin { get; set; } = null!;

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ProductInstance Product { get; set; } = null!;

    public virtual SalesPoint SalesPoint { get; set; } = null!;

    public virtual User User { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
