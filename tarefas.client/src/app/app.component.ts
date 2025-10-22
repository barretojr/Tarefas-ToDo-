import { Component, OnInit, inject, signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

import { Tarefa, CriarTarefaRequest } from './models/tarefa.model';
import { TarefaService } from './services/tarefa.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private tarefaService = inject(TarefaService);
  private notificationService = inject(NotificationService);
  private fb = inject(FormBuilder);

  tasks: WritableSignal<Tarefa[]> = signal([]);
  isLoading = signal(false);
  isCreating = signal(false);
  useLocalStorage = signal(true);

  tarefaForm = this.fb.group({
    titulo: ['', [Validators.required, Validators.maxLength(100)]],
    descricao: [''],
    prioridade: ['Media', Validators.required],
  }) as FormGroup;

  pendingTasks = computed(() => this.tasks().filter(task => !task.completa));
  completedTasks = computed(() => this.tasks().filter(task => task.completa));

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading.set(true);
    this.tarefaService.listar(this.useLocalStorage())
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (fetchedTasks) => {
          this.tasks.set(fetchedTasks);
          const source = this.useLocalStorage() ? 'armazenamento local' : 'servidor';
          this.notificationService.addNotification(`Tarefas carregadas do ${source}`, 'success');
        },
        error: (error) => {
          console.error('Erro ao carregar tarefas:', error);
          this.notificationService.addNotification('Erro ao carregar. Usando fallback local.', 'warning');
          this.useLocalStorage.set(true);
          this.tarefaService.listar(true).subscribe(localTasks => this.tasks.set(localTasks));
        }
      });
  }

  drop(event: CdkDragDrop<Tarefa[]>) {
    if (event.previousContainer === event.container) {
      // Futuramente, pode-se implementar a lógica para reordenar no backend aqui
      return;
    }

    const taskToMove = event.previousContainer.data[event.previousIndex];
    if (taskToMove) {
      this.handleToggleComplete(taskToMove.id);
    }
  }

  handleCreateTask() {
    if (this.tarefaForm.invalid) {
      this.notificationService.addNotification('Preencha o formulário corretamente.', 'warning');
      this.tarefaForm.markAllAsTouched();
      return;
    }

    this.isCreating.set(true);
    const taskData: CriarTarefaRequest = this.tarefaForm.value;

    this.tarefaService.criar(taskData, this.useLocalStorage())
      .pipe(finalize(() => this.isCreating.set(false)))
      .subscribe({
        next: (newTask) => {
          this.tasks.update(currentTasks => [...currentTasks, newTask]);
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
    this.tarefaService.alternarConclusao(id, this.useLocalStorage())
      .subscribe({
        next: (updatedTask) => {
          this.tasks.update(currentTasks =>
            currentTasks.map(t => t.id === id ? updatedTask : t)
          );
          const message = updatedTask.completa ? 'Tarefa concluída!' : 'Tarefa marcada como pendente.';
          this.notificationService.addNotification(message, 'success');
        },
        error: (error) => {
          console.error('Erro ao atualizar tarefa:', error);
          this.notificationService.addNotification('Erro ao atualizar tarefa', 'error');
        }
      });
  }

  handleDeleteTask(id: string) {
    this.tarefaService.remover(id, this.useLocalStorage())
      .subscribe({
        next: () => {
          this.tasks.update(currentTasks => currentTasks.filter(t => t.id !== id));
          this.notificationService.addNotification('Tarefa excluída com sucesso', 'info');
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