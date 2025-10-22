using Microsoft.AspNetCore.Mvc;
using Tarefas.Dominio.Entidades;
using Tarefas.Servico;
using Tarefas.Servico.DTOs;
using Tarefas.Servico.Interfaces;

namespace Tarefas.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TarefasController : ControllerBase
    {
        private readonly ITarefaService _service;

        public TarefasController(ITarefaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var tarefas = await _service.ListarAsync();
            return Ok(tarefas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Obter(Guid id)
        {
            var tarefa = await _service.ObterAsync(id);
            return tarefa == null ? NotFound() : Ok(tarefa);
        }

        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] TarefaDTO dto)
        {
            var tarefa = await _service.CriarAsync(dto);
            return CreatedAtAction(nameof(Obter), new { id = tarefa.Id }, tarefa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(Guid id, [FromBody] TarefaDTO dto)
        {
            var tarefa = await _service.AtualizarAsync(id, dto);
            return tarefa == null ? NotFound() : Ok(tarefa);
        }

        //[HttpPatch("{id}/toggle")]
        //public async Task<IActionResult> AlternarConclusao(Guid id)
        //{
        //    var tarefa = await _service.AlternarConclusaoAsync(id);
        //    return tarefa == null ? NotFound() : Ok(tarefa);
        //}

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remover(Guid id)
        {
            await _service.ExcluirAsync(id);
            return NoContent();
        }
    }
}
