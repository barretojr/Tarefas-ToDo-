using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tarefas.Servico.DTOs
{
    public class CriarTarefaDTO
    {
        public string Titulo { get; set; }
        public string? Descricao { get; set; } // Pode ser nulo
        public string Prioridade { get; set; } // Recebemos como string
    }
}
