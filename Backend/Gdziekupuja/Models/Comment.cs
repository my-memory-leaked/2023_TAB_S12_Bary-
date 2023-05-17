using System;
using System.Collections.Generic;

namespace Gdziekupuja.Models;

public partial class Comment
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int OfferId { get; set; }

    public string Content { get; set; } = null!;

    public int Dislikers { get; set; }

    public int Likers { get; set; }

    public DateTime CreationTime { get; set; }

    public int? AdminId { get; set; }

    public virtual Administrator? Admin { get; set; }

    public virtual Offer Offer { get; set; } = null!;

    public virtual User User { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();

    public virtual ICollection<User> UsersNavigation { get; set; } = new List<User>();
}
