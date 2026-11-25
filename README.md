# TaskFlow

Gerenciador de tarefas pessoais feito com Vue 3, JavaScript, Vue Router e Vite.
As tarefas são guardadas no LocalStorage do navegador.

## Começar

```sh
npm install
npm run dev
```

Para validar a versão de produção, execute `npm run build`.

## Estrutura e etapas

1. **Entrada e navegação:** `src/main.js` cria a aplicação e configura o Vue Router.
   `src/router/index.js` associa os endereços às três páginas; `src/App.vue` mantém
   o menu e o conteúdo da rota.
2. **Interface:** `src/components/Sidebar.vue`, `TaskCard.vue`, `TaskForm.vue` e
   `TaskStats.vue` são peças reutilizadas. `src/views/` contém Dashboard, Minhas
   tarefas e Sobre. Os estilos globais e responsivos ficam em `src/assets/`.
3. **Funcionalidades:** `src/stores/tasks.js` guarda o estado reativo, calcula
   indicadores e lê/grava tarefas no LocalStorage. `TasksView.vue` usa `ref()` para
   pesquisa, filtro e formulário, e `computed()` para exibir a lista filtrada.

## Como testar e entender

- Abra Dashboard, Minhas tarefas e Sobre pelo menu: a URL muda sem recarregar a página.
- Em Minhas tarefas, cadastre uma atividade, edite-a, altere seu status e exclua-a.
- Pesquise parte do título e combine a pesquisa com o filtro de status.
- Volte ao Dashboard para observar os indicadores. Atualize o navegador e confirme
  que as tarefas continuam disponíveis.
- Para acompanhar os conceitos, comece pela inicialização em `src/main.js`, siga a
  rota em `src/router/index.js` e depois veja o estado e a persistência em
  `src/stores/tasks.js`.
