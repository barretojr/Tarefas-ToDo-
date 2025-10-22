using Tarefas.Repositorio.Contexto;
using Tarefas.Dominio.Interfaces;
using Tarefas.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;

namespace Tarefas.Repositorio.Infra
{
    public class TarefaRepository : ITarefaRepository
    {
        private readonly TarefaDbContext _context;

        public TarefaRepository(TarefaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Tarefa>> ListarAsync()
            => await _context.Tarefas.OrderByDescending(t => t.CriadaEm).ToListAsync();

        public Task<Tarefa?> ObterPorIdAsync(Guid id)
            => _context.Tarefas.FindAsync(id).AsTask();

        public async Task AdicionarAsync(Tarefa tarefa)
        {
            await _context.Tarefas.AddAsync(tarefa);
            await _context.SaveChangesAsync();
        }

        public async Task AtualizarAsync(Tarefa tarefa)
        {
            _context.Tarefas.Update(tarefa);
            await _context.SaveChangesAsync();
        }

        public async Task RemoverAsync(Tarefa tarefa)
        {
            _context.Tarefas.Remove(tarefa);
            await _context.SaveChangesAsync();
        }

        public Task<int> ContarAsync() => _context.Tarefas.CountAsync();
        public Task<int> ContarConcluidasAsync() => _context.Tarefas.CountAsync(t => t.Completa);
    }

}
