using System;
using System.Collections.Generic;

namespace Gdziekupuja.Models;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public byte[] PasswordHash { get; set; } = null!;

    public byte[] PasswordSalt { get; set; } = null!;

    public bool CanComment { get; set; }

    public virtual ICollection<Administrator> Administrators { get; set; } = new List<Administrator>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Offer> OffersNavigation { get; set; } = new List<Offer>();

    public virtual ICollection<Comment> Comments1 { get; set; } = new List<Comment>();

    public virtual ICollection<Comment> CommentsNavigation { get; set; } = new List<Comment>();

    public virtual ICollection<Offer> Offers { get; set; } = new List<Offer>();
}
