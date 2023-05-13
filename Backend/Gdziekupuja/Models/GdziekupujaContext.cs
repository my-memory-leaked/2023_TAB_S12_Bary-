using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Gdziekupuja.Models;

public partial class GdziekupujaContext : DbContext
{
    public GdziekupujaContext()
    {
    }

    public GdziekupujaContext(DbContextOptions<GdziekupujaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Administrator> Administrators { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<County> Counties { get; set; }

    public virtual DbSet<Offer> Offers { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductInstance> ProductInstances { get; set; }

    public virtual DbSet<SalesPoint> SalesPoints { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Addresses_pk");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.City).HasColumnName("city");
            entity.Property(e => e.CountyId).HasColumnName("county_id");
            entity.Property(e => e.Number).HasColumnName("number");
            entity.Property(e => e.PostalCode).HasColumnName("postal_code");
            entity.Property(e => e.Street).HasColumnName("street");

            entity.HasOne(d => d.County).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.CountyId)
                .HasConstraintName("In_in");
        });

        modelBuilder.Entity<Administrator>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Administrators_pk");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Administrators)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Administrators_Users");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Categories_pk");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.ParentId).HasColumnName("parent_id");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("Subcategory");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Comments_pk");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AdminId).HasColumnName("admin_id");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreationTime).HasColumnName("creation_time");
            entity.Property(e => e.Dislikers).HasColumnName("dislikers");
            entity.Property(e => e.Likers).HasColumnName("likers");
            entity.Property(e => e.OfferId).HasColumnName("offer_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Admin).WithMany(p => p.Comments)
                .HasForeignKey(d => d.AdminId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Comments_Administrators");

            entity.HasOne(d => d.Offer).WithMany(p => p.Comments)
                .HasForeignKey(d => d.OfferId)
                .HasConstraintName("Concerns");

            entity.HasOne(d => d.User).WithMany(p => p.Comments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Comments_Users");
        });

        modelBuilder.Entity<County>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Counties_pk");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<Offer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Offers_pk");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AdminId).HasColumnName("admin_id");
            entity.Property(e => e.CreationTime).HasColumnName("creation_time");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("price");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.SalesPointId).HasColumnName("sales_point_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Admin).WithMany(p => p.Offers)
                .HasForeignKey(d => d.AdminId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ban");

            entity.HasOne(d => d.Product).WithMany(p => p.Offers)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("Has_product");

            entity.HasOne(d => d.SalesPoint).WithMany(p => p.Offers)
                .HasForeignKey(d => d.SalesPointId)
                .HasConstraintName("Provides");

            entity.HasOne(d => d.User).WithMany(p => p.OffersNavigation)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("Adds_offer");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Products_pk");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<ProductInstance>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("ProductInstances_pk");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AdditionalInfo).HasColumnName("additional_info");
            entity.Property(e => e.ImageName).HasColumnName("image_name");
            entity.Property(e => e.ProductId).HasColumnName("product_id");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductInstances)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("Has_instance");

            entity.HasMany(d => d.Categories).WithMany(p => p.ProductInstances)
                .UsingEntity<Dictionary<string, object>>(
                    "Belong",
                    r => r.HasOne<Category>().WithMany()
                        .HasForeignKey("CategoryId")
                        .HasConstraintName("Has_products"),
                    l => l.HasOne<ProductInstance>().WithMany()
                        .HasForeignKey("ProductInstanceId")
                        .HasConstraintName("Belongs_to"),
                    j =>
                    {
                        j.HasKey("ProductInstanceId", "CategoryId").HasName("Belongs_pk");
                        j.ToTable("Belongs");
                        j.IndexerProperty<int>("ProductInstanceId").HasColumnName("product_instance_id");
                        j.IndexerProperty<int>("CategoryId").HasColumnName("category_id");
                    });
        });

        modelBuilder.Entity<SalesPoint>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SalesPoints_pk");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AddressId).HasColumnName("address_id");
            entity.Property(e => e.Name).HasColumnName("name");

            entity.HasOne(d => d.Address).WithMany(p => p.SalesPoints)
                .HasForeignKey(d => d.AddressId)
                .HasConstraintName("SalesPoints_Addresses");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CanComment).HasColumnName("can_comment");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.PasswordHash).HasColumnName("password_hash");
            entity.Property(e => e.PasswordSalt).HasColumnName("password_salt");

            entity.HasMany(d => d.Comments1).WithMany(p => p.UsersNavigation)
                .UsingEntity<Dictionary<string, object>>(
                    "Liker",
                    r => r.HasOne<Comment>().WithMany()
                        .HasForeignKey("CommentId")
                        .HasConstraintName("Liked_By"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Likes"),
                    j =>
                    {
                        j.HasKey("UserId", "CommentId").HasName("Likers_pk");
                        j.ToTable("Likers");
                        j.IndexerProperty<int>("UserId").HasColumnName("user_id");
                        j.IndexerProperty<int>("CommentId").HasColumnName("comment_id");
                    });

            entity.HasMany(d => d.CommentsNavigation).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "Disliker",
                    r => r.HasOne<Comment>().WithMany()
                        .HasForeignKey("CommentId")
                        .HasConstraintName("Disliked_by"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Dislikes"),
                    j =>
                    {
                        j.HasKey("UserId", "CommentId").HasName("Dislikers_pk");
                        j.ToTable("Dislikers");
                        j.IndexerProperty<int>("UserId").HasColumnName("user_id");
                        j.IndexerProperty<int>("CommentId").HasColumnName("comment_id");
                    });

            entity.HasMany(d => d.Offers).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "Favourite",
                    r => r.HasOne<Offer>().WithMany()
                        .HasForeignKey("OfferId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Favourites_Offers"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("Has_favourite"),
                    j =>
                    {
                        j.HasKey("UserId", "OfferId").HasName("Favourites_pk");
                        j.ToTable("Favourites");
                        j.IndexerProperty<int>("UserId").HasColumnName("user_id");
                        j.IndexerProperty<int>("OfferId").HasColumnName("offer_id");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
