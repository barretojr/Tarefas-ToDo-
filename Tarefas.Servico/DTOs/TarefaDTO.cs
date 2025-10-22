using Tarefas.Dominio.Entidades;

namespace Tarefas.Servico.DTOs
{
    public class TarefaDTO
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; } = null!;
        public string? Descricao { get; set; }
        public bool Completa { get; set; }
        public TarefaPrioridade Prioridade { get; set; }
        public DateTime CriadaEm { get; set; }
        public DateTime AtualizadaEm { get; set; }

        public static TarefaDTO FromEntity(Tarefa tarefa)
        {
            return new TarefaDTO
            {
                Id = tarefa.Id,
                Titulo = tarefa.Titulo,
                Descricao = tarefa.Descricao,
                Completa = tarefa.Completa,
                Prioridade = tarefa.Prioridade,
                CriadaEm = tarefa.CriadaEm,
                AtualizadaEm = tarefa.AtualizadaEm
            };
        }
    }
}
