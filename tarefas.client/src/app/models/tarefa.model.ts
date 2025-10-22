export type TarefaPrioridadeString = 'Baixa' | 'Media' | 'Alta';

export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string | null;
  completa: boolean; 
  prioridade: TarefaPrioridadeString;
  criadaEm: string;
  atualizadaEm: string;
}

export interface CriarTarefaRequest {
  titulo: string;
  descricao: string | null;
  prioridade: TarefaPrioridadeString;
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}