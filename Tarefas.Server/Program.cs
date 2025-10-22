using Microsoft.EntityFrameworkCore;
using Tarefas.Dominio.Interfaces;
using Tarefas.Repositorio;
using Tarefas.Repositorio.Contexto;
using Tarefas.Servico;
using Tarefas.Servico.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<TarefaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Servico
builder.Services.AddScoped<ITarefaService, TarefaService>();
//Dominio/Repositorio
builder.Services.AddScoped<ITarefaRepository, TarefaRepository>();


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
