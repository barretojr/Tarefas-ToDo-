#  To Do List - Aplicação Full-Stack

Uma aplicação completa de Lista de Tarefas (To Do List) construída com Angular no frontend e C# (.NET) no backend, demonstrando uma arquitetura moderna e funcionalidades ricas.

##  Funcionalidades

- **Gerenciamento de Tarefas:** Crie, exclua e liste tarefas com títulos, descrições e prioridades.
- **Marcar como Concluída:** Alterne o status de uma tarefa usando um **botão** ou arrastando-a entre as colunas **(Drag and Drop)**.
- **Notificações:** Feedback visual para todas as ações do usuário.
- **Modo Offline Inteligente:** A aplicação prioriza a conexão com o backend. Se o servidor estiver indisponível, ela automaticamente entra em modo offline usando o armazenamento local e tenta se reconectar em segundo plano.
- **Persistência Dupla:** Suporte para salvar dados tanto no **SQL Server** (via backend) quanto no **armazenamento local** do navegador.

##  Tecnologias Utilizadas

| Camada    | Tecnologia                                                     |
| :-------- | :------------------------------------------------------------- |
| Frontend  | **Angular 19**, TypeScript, Bootstrap 5, Angular CDK           |
| Backend   | **C# (.NET 8)**, ASP.NET Core Web API                          |
| Banco de Dados | **SQL Server (via LocalDB)**, Entity Framework Core        |

---

##  Como Executar o Projeto

Siga os passos abaixo para configurar e rodar a aplicação completa em seu ambiente de desenvolvimento.

### Pré-requisitos

- **.NET 8 SDK**
- **Node.js** e **npm**
- **Angular CLI**
- **SQL Server LocalDB** (geralmente instalado com o Visual Studio)

### 1. Configurar e Rodar o Backend (Servidor)

Primeiro, vamos preparar o banco de dados e iniciar a API.

```bash
# 1. Navegue até a pasta do backend
cd Tarefas.Server

# 2. Crie o banco de dados e aplique as migrações
dotnet ef database update

# 3. Inicie o servidor da API
dotnet run