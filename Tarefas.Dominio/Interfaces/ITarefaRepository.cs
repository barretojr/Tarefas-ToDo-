using Tarefas.Dominio.Entidades;

namespace Tarefas.Dominio.Interfaces
{
    public interface ITarefaRepository
    {
        Task<IEnumerable<Tarefa>> ListarAsync();
        Task<Tarefa?> ObterPorIdAsync(Guid id);
        Task AdicionarAsync(Tarefa tarefa);
        Task AtualizarAsync(Tarefa tarefa);
        Task RemoverAsync(Tarefa tarefa);
        Task<int> ContarAsync();
        Task<int> ContarConcluidasAsync();
    }
}
