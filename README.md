# Clase: Agent Skills

Presentación (HTML/CSS/JS, sin dependencias) sobre cómo construir una skill para un agente:
perfil, orquestador, políticas de APIs y de datos, ejecutables, memoria y proyectos.

## Levantarla con Docker

```bash
docker compose up -d --build
```

Abrir http://localhost:8090

Para detenerla: `docker compose down`

## Sin Docker

Abrir `index.html` directamente en el navegador.

## Controles

| Tecla | Acción |
|---|---|
| ← → / Espacio | Navegar |
| Inicio / Fin | Primera / última diapositiva |
| F | Pantalla completa |
| T | Tema claro / oscuro |
| Ctrl+P | Exportar a PDF (una diapositiva por página) |

También se puede ir directo a una diapositiva con `#n` en la URL, por ejemplo `http://localhost:8090/#12`.

## Documentación oficial

- Especificación Agent Skills: https://agentskills.io/specification
- Claude Docs: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- Best practices: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
