using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tarefas.Dominio.Entidades
{
    public class Tarefa
    {
        public Guid Id { get; private set; }
        public string Titulo { get; private set; } = null!;
        public string? Descricao { get; private set; }
        public bool Completa { get; private set; }
        public DateTime CriadaEm { get; private set; }
        public DateTime AtualizadaEm { get; private set; }
        public TarefaPrioridade Prioridade { get; private set; }

        public Tarefa(string titulo, string? descricao, TarefaPrioridade prioridade)
        {
            Id = Guid.NewGuid();
            Titulo = titulo;
            Descricao = descricao;
            Completa = false;
            Prioridade = prioridade;
            CriadaEm = DateTime.UtcNow;
            AtualizadaEm = DateTime.UtcNow;
        }

        public void Atualizar(string titulo, string? descricao, TarefaPrioridade prioridade)
        {
            Titulo = titulo;
            Descricao = descricao;
            Prioridade = prioridade;
            AtualizadaEm = DateTime.UtcNow;
        }

        public void MarcarComoCompleta()
        {
            Completa = true;
            AtualizadaEm = DateTime.UtcNow;
        }

        public void AlternarStatus()
        {
            Completa = !Completa;
            AtualizadaEm = DateTime.UtcNow;
        }
    }

    public enum TarefaPrioridade
    {
        Baixa = 0,
        Media = 1,
        Alta = 2
    }
}

