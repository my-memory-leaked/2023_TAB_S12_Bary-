using System;
using System.Collections.Generic;

namespace Gdziekupuja.Models;

public partial class Administrator
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Offer> Offers { get; set; } = new List<Offer>();

    public virtual User User { get; set; } = null!;
}
