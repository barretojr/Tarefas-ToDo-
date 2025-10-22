using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tarefas.Servico.Interfaces
{
    public interface ITarefaService
    {
        Task<IEnumerable<DTOs.TarefaDTO>> ListarAsync();
        Task<DTOs.TarefaDTO?> ObterPorIdAsync(Guid id);
        Task<DTOs.TarefaDTO> CriarAsync(DTOs.TarefaDTO dto);
        Task<DTOs.TarefaDTO?> AtualizarAsync(Guid id, DTOs.TarefaDTO dto);
        Task<DTOs.TarefaDTO?> AlternarConclusaoAsync(Guid id);
        Task<bool> RemoverAsync(Guid id);
    }
}
