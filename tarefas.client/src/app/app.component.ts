import { Component, OnInit, inject, signal } from '@angular/core';
import { Tarefa, CriarTarefaRequest } from './models/tarefa.model';
import { TarefaService } from './services/tarefa.service';
import { NotificationService } from './services/notification.service';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  private TarefaService = inject(TarefaService);
  private notificationService = inject(NotificationService);
  private fb = inject(FormBuilder);

  tasks = signal<Tarefa[]>([]);
  isLoading = signal(false);
  isCreating = signal(false);
  useLocalStorage = signal(true);

  tarefaForm = this.fb.group({
    titulo: ['', [Validators.required, Validators.maxLength(100)]],
    descricao: [''],
    prioridade: ['Media', Validators.required], 
  }) as FormGroup;

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading.set(true);
    this.TarefaService.listar(this.useLocalStorage())
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (fetchedTasks) => {
          this.tasks.set(fetchedTasks);
          const source = this.useLocalStorage() ? 'armazenamento local' : 'servidor';
          this.notificationService.addNotification(`Tarefas carregadas do ${source}`, 'success');
        },
        error: (error) => {
          console.error('Erro ao carregar tarefas:', error);
          this.notificationService.addNotification('Erro ao carregar. Usando armazenamento local.', 'warning');
          this.useLocalStorage.set(true); 
          this.TarefaService.listar(true).subscribe(localTasks => this.tasks.set(localTasks));
        }
      });
  }

  handleCreateTask() {
    if (this.tarefaForm.invalid) {
      this.notificationService.addNotification('Preencha o formulário corretamente.', 'warning');
      this.tarefaForm.markAllAsTouched();
      return;
    }

    this.isCreating.set(true);
    const taskData: CriarTarefaRequest = this.tarefaForm.value as CriarTarefaRequest;

    this.TarefaService.criar(taskData, this.useLocalStorage())
      .pipe(finalize(() => this.isCreating.set(false)))
      .subscribe({
        next: (newTask) => {
          this.tasks.update(tasks => [...tasks, newTask]);
          this.notificationService.addNotification('Tarefa criada com sucesso!', 'success');
          this.tarefaForm.reset({ prioridade: 'Media' }); 
        },
        error: (error) => {
          console.error('Erro ao criar tarefa:', error);
          this.notificationService.addNotification('Erro ao criar tarefa', 'error');
        }
      });
  }

  handleToggleComplete(id: string) {
    this.TarefaService.alternarConclusao(id, this.useLocalStorage())
      .subscribe({
        next: (updatedTask) => {
          this.tasks.update(tasks => tasks.map(t => t.id === id ? updatedTask : t));
          const message = updatedTask.completa ? 'Tarefa marcada como concluída' : 'Tarefa marcada como pendente';
          this.notificationService.addNotification(message, 'success');
        },
        error: (error) => {
          console.error('Erro ao atualizar tarefa:', error);
          this.notificationService.addNotification('Erro ao atualizar tarefa', 'error');
        }
      });
  }

  handleDeleteTask(id: string) {
    this.TarefaService.remover(id, this.useLocalStorage())
      .subscribe({
        next: () => {
          this.tasks.update(tasks => tasks.filter(t => t.id !== id));
          this.notificationService.addNotification('Tarefa excluída com sucesso', 'success');
        },
        error: (error) => {
          console.error('Erro ao excluir tarefa:', error);
          this.notificationService.addNotification('Erro ao excluir tarefa', 'error');
        }
      });
  }

  toggleStorageMode() {
    this.useLocalStorage.update(val => !val);
    const source = this.useLocalStorage() ? 'armazenamento local' : 'servidor backend';
    this.notificationService.addNotification(`Alternado para ${source}`, 'info');
    this.loadTasks();
  }

  get notificationsSignal() {
    return this.notificationService.notifications;
  }

  dismissNotification(id: number) {
    this.notificationService.dismissNotification(id);
  }
}