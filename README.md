# TodoApi 📝

[![.NET](https://img.shields.io/badge/.NET-8.0-blue)](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
[![C#](https://img.shields.io/badge/C%23-8.0-blueviolet)](https://docs.microsoft.com/en-us/dotnet/csharp/)
[![Entity Framework](https://img.shields.io/badge/Entity%20Framework-Core-green)](https://docs.microsoft.com/en-us/ef/core/)

API REST desenvolvida em **C# ASP.NET Core** com **Entity Framework Core** para gerenciamento de tarefas.

---

## 🚀 Tecnologias

* **ASP.NET Core 8.0** – Framework Web API
* **Entity Framework Core** – ORM para acesso ao banco
* **SQL Server LocalDB** – Banco de dados
* **Swagger/OpenAPI** – Documentação interativa da API

---

## 📌 Endpoints Disponíveis

| Método | Endpoint                   | Descrição                    |
| ------ | -------------------------- | ---------------------------- |
| GET    | `/api/tarefas`             | Listar todas as tarefas      |
| GET    | `/api/tarefas/{id}`        | Buscar tarefa por ID         |
| POST   | `/api/tarefas`             | Criar nova tarefa            |
| PUT    | `/api/tarefas/{id}`        | Atualizar tarefa             |
| PATCH  | `/api/tarefas/{id}/toggle` | Alternar status de conclusão |
| DELETE | `/api/tarefas/{id}`        | Excluir tarefa               |

---

## 🗂 Modelos de Dados

**Tarefa**

```json
{
  "id": "guid",
  "titulo": "string (obrigatório, 3-200 chars)",
  "descricao": "string (opcional, max 1000 chars)",
  "completa": "boolean",
  "prioridade": "Baixa|Media|Alta",
  "CriadaEm": "datetime",
  "AtualizadaEm": "datetime"
}
```

**TarefaDTO (para criação/atualização)**

```json
{
  "titulo": "string (obrigatório)",
  "descricao": "string (opcional)",
  "prioridade": "Baixa|Media|Alta"
}
```

---

## ⚡ Como Executar

### Pré-requisitos

* [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
* SQL Server LocalDB (incluso no Visual Studio)

### Passos

```bash
# Entrar no diretório do projeto
cd backend/TodoApi

# Restaurar dependências
dotnet restore

# Executar a aplicação
dotnet run
```

* **API:** `https://localhost:7001`
* **Swagger UI:** `https://localhost:7001/swagger`

---

## 🛠 Configuração do Banco de Dados

* O **Entity Framework** cria o banco automaticamente na primeira execução.

**String de conexão padrão:**

```
Server=(localdb)\mssqllocaldb;Database=TodoAppDb;Trusted_Connection=true;MultipleActiveResultSets=true
```

### Comandos Úteis

```bash
# Adicionar migration
dotnet ef migrations add NomeDaMigration

# Atualizar banco
dotnet ef database update

# Remover última migration
dotnet ef migrations remove
```

---

## 📁 Estrutura do Projeto

```
TodoApi/
├── Controllers/
│   └── TarefasController.cs  # Controller principal
├── Data/
│   └── TodoContext.cs        # Contexto EF
├── Models/
│   └── Tarefa.cs             # Modelos de dados
├── Program.cs                # Configuração da aplicação
├── appsettings.json          # Configurações
└── TodoApi.csproj            # Projeto
```

---

## ✅ Recursos Implementados

* **Validações**: Data Annotations, tratamento de erros com respostas HTTP apropriadas
* **CORS**: Configurado para aceitar requisições do frontend React (`localhost:5173`)
* **Banco de Dados**: Índices, seed data, timestamps automáticos
* **Documentação**: Swagger UI integrado, comentários XML para documentação automática
* **Logs**: Criação, atualização, exclusão de tarefas, erros de operação, estatísticas

---

## 🧪 Testando a API

### Via Swagger UI

1. Execute a API (`dotnet run`)
2. Acesse: `https://localhost:7001/swagger`
3. Teste os endpoints diretamente na interface

### Via curl

```bash
# Listar tarefas
curl -X GET https://localhost:7001/api/tarefas

# Criar tarefa
curl -X POST https://localhost:7001/api/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Nova Tarefa","descricao":"Descrição","prioridade":"Media"}'

# Alternar conclusão
curl -X PATCH https://localhost:7001/api/tarefas/{id}/toggle
```

