using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tarefas.Servico.DTOs;

namespace Tarefas.Servico.Interfaces
{
    public interface ITarefaService
    {
        Task<IEnumerable<TarefaDTO>> ListarAsync();
        Task<TarefaDTO> ObterAsync(Guid id);
        Task<TarefaDTO> CriarAsync(CriarTarefaDTO dto);
        Task<TarefaDTO> AtualizarAsync(Guid id, TarefaDTO dto);
        Task<TarefaDTO> ToggleAsync(Guid id);
        Task ExcluirAsync(Guid id);
    }
}
