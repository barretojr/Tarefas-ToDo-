using Microsoft.EntityFrameworkCore;
using Tarefas.Dominio.Entidades;

namespace Tarefas.Repositorio.Contexto
{
    public class TarefaDbContext : DbContext
    {
        public TarefaDbContext(DbContextOptions<TarefaDbContext> options) : base(options) { }

        public DbSet<Tarefa> Tarefas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuração da entidade Tarefa diretamente no DbContext
            modelBuilder.Entity<Tarefa>(builder =>
            {
                builder.ToTable("Tarefas");
                builder.HasKey(t => t.Id);

                builder.Property(t => t.Titulo)
                    .IsRequired()
                    .HasMaxLength(200);

                builder.Property(t => t.Descricao)
                    .HasMaxLength(1000);

                builder.Property(t => t.Completa)
                    .IsRequired();

                builder.Property(t => t.CriadaEm)
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                builder.Property(t => t.AtualizadaEm)
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                builder.Property(t => t.Prioridade)
                    .HasConversion<int>()
                    .IsRequired();
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
