using backend.DA.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.DA.dbContext
{
    public partial class AppDbContext : DbContext
    {
        public DbSet<UserDb> users { get; set; }
        public DbSet<LeagueDb> leagues { get; set; }
        public DbSet<ClubDb> clubs { get; set; }
        public DbSet<MatchDb> matches { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserDb>(entity =>
            {
                entity.ToTable("users");
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Id)
                .IsRequired()
                .HasColumnName("id");

                entity.Property(x => x.Login)
                .IsRequired()
                .HasColumnName("login");

                //entity.HasIndex(x => x.Login)
                //.IsUnique();


                entity.Property(x => x.Password)
                .IsRequired()
                .HasColumnName("password");

                entity.Property(x => x.Role)
                .IsRequired()
                .HasColumnName("role");

                entity.Property(x => x.Name)
                .HasColumnName("name");
            });

            modelBuilder.Entity<ClubDb>(entity =>
            {
                entity.ToTable("clubs");
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Id)
                .IsRequired()
                .HasColumnName("id");

                entity.Property(x => x.Name)
                .IsRequired()
                .HasColumnName("name");

                entity.Property(x => x.IdLeague)
                .IsRequired()
                .HasColumnName("id_league");
            });

            modelBuilder.Entity<MatchDb>(entity =>
            {
                entity.ToTable("matches");
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Id).IsRequired().HasColumnName("id");
                entity.Property(x => x.GoalHome).HasColumnName("goal_home_club");
                entity.Property(x => x.GoalGuest).HasColumnName("goal_guest_club");
                entity.Property(x => x.IdLeague).IsRequired().HasColumnName("id_league");
                entity.Property(x => x.IdHome).IsRequired().HasColumnName("id_home_club");
                entity.Property(x => x.IdGuest).IsRequired().HasColumnName("id_guest_club");
            });

            modelBuilder.Entity<LeagueDb>(entity =>
            {
                entity.ToTable("leagues");
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Id)
                .IsRequired()
                .HasColumnName("id");

                entity.Property(x => x.Name)
                .IsRequired()
                .HasColumnName("name");

                entity.Property(x => x.IdUser)
                .HasColumnName("id_user");
            });
        }
    }
}
