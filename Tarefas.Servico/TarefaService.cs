using Tarefas.Dominio.Entidades;
using Tarefas.Dominio.Interfaces;
using Tarefas.Servico.DTOs;
using Tarefas.Servico.Interfaces;

namespace Tarefas.Servico
{
    public class TarefaService : ITarefaService
    {
        private readonly ITarefaRepository _repository;

        public TarefaService(ITarefaRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<TarefaDTO>> ListarAsync()
            => (await _repository.ListarAsync()).Select(TarefaDTO.FromEntity);

        public async Task<TarefaDTO> ObterAsync(Guid id)
        {
            var tarefa = await _repository.ObterPorIdAsync(id);
            if (tarefa == null)
                throw new Exception("Tarefa não encontrada");

            return TarefaDTO.FromEntity(tarefa);
        }

        public async Task<TarefaDTO> CriarAsync(TarefaDTO dto)
        {
            var tarefa = new Tarefa(dto.Titulo, dto.Descricao, dto.Prioridade);
            await _repository.AdicionarAsync(tarefa);
            return TarefaDTO.FromEntity(tarefa);
        }

        public async Task<TarefaDTO> AtualizarAsync(Guid id, TarefaDTO dto)
        {
            var tarefa = await _repository.ObterPorIdAsync(id);
            if (tarefa == null)
                throw new Exception("Tarefa não encontrada");

            tarefa.Atualizar(dto.Titulo, dto.Descricao, dto.Prioridade);
            await _repository.AtualizarAsync(tarefa);
            return TarefaDTO.FromEntity(tarefa);
        }

        public async Task ToggleAsync(Guid id)
        {
            var tarefa = await _repository.ObterPorIdAsync(id);
            if (tarefa == null)
                throw new Exception("Tarefa não encontrada");

            tarefa.MarcarComoCompleta();
            await _repository.AtualizarAsync(tarefa);
        }

        public async Task ExcluirAsync(Guid id)
        {
            var tarefa = await _repository.ObterPorIdAsync(id);
            if (tarefa == null)
                throw new Exception("Tarefa não encontrada");

            await _repository.RemoverAsync(tarefa);
        }
    }

}
