using System;
using System.Collections.Generic;

namespace Gdziekupuja.Models;

public partial class Liker
{
    public int UserId { get; set; }

    public int CommentId { get; set; }

    public virtual Comment Comment { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
