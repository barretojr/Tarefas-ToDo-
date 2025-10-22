import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of, throwError } from 'rxjs';
import { Tarefa, CriarTarefaRequest, TarefaPrioridadeString } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private http = inject(HttpClient);
  private apiUrl = '/api/tarefas'; 

  private loadTasksFromLocalStorage(): Tarefa[] {
    try {
      const stored = localStorage.getItem('todoTasks');
      return stored ? JSON.parse(stored) as Tarefa[] : [];
    } catch {
      return [];
    }
  }

  private saveTasksToLocalStorage(tasks: Tarefa[]) {
    try {
      localStorage.setItem('todoTasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }


  private generateId = (): string => {
    return 'local-' + Date.now().toString() + Math.random().toString(36).substring(2, 9);
  };

  // --- Métodos de CRUD ---

  /**
   * Lista todas as tarefas do backend C# ou do localStorage.
   * Corresponde a: GET /api/tarefas
   */
  listar(useLocalStorage: boolean): Observable<Tarefa[]> {
    if (useLocalStorage) {
      const localTasks = this.loadTasksFromLocalStorage();
      return of(localTasks).pipe(delay(500));
    } else {
      return this.http.get<Tarefa[]>(this.apiUrl);
    }
  }

  /**
   * Cria uma nova tarefa.
   * Corresponde a: POST /api/tarefas
   */
  criar(request: CriarTarefaRequest, useLocalStorage: boolean): Observable<Tarefa> {
    if (useLocalStorage) {
      const now = new Date().toISOString();
      
      const novaTarefa: Tarefa = {
        ...request,
        id: this.generateId(),
        completa: false,
        criadaEm: now,
        atualizadaEm: now
      };
      
      const tarefasAtuais = this.loadTasksFromLocalStorage();
      const tarefasAtualizadas = [...tarefasAtuais, novaTarefa];
      this.saveTasksToLocalStorage(tarefasAtualizadas);
      
      return of(novaTarefa).pipe(delay(300));
    } else {
      return this.http.post<Tarefa>(this.apiUrl, request);
    }
  }

  /**
   * Alterna o status de conclusão de uma tarefa.
   * Corresponde a: PATCH /api/tarefas/{id}/toggle
   */
  alternarConclusao(id: string, useLocalStorage: boolean): Observable<Tarefa> {
    if (useLocalStorage) {      
      const tarefas = this.loadTasksFromLocalStorage();
      const index = tarefas.findIndex(t => t.id === id);

      if (index === -1) {
        return throwError(() => new Error('Tarefa não encontrada localmente'));
      }

      const tarefaAtualizada: Tarefa = {
        ...tarefas[index],
        completa: !tarefas[index].completa,
        atualizadaEm: new Date().toISOString()
      };
      
      tarefas[index] = tarefaAtualizada;
      this.saveTasksToLocalStorage(tarefas);
      
      return of(tarefaAtualizada);
    } else {
      return this.http.patch<Tarefa>(`${this.apiUrl}/${id}/toggle`, {});
    }
  }

  /**
   * Remove uma tarefa.
   * Corresponde a: DELETE /api/tarefas/{id}
   */
  remover(id: string, useLocalStorage: boolean): Observable<void> {
    if (useLocalStorage) {
      const tarefasAtualizadas = this.loadTasksFromLocalStorage().filter(t => t.id !== id);
      this.saveTasksToLocalStorage(tarefasAtualizadas);
      return of(undefined);
    } else {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }
}