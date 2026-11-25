<script setup>
import { computed, ref } from 'vue'
import TaskCard from '../components/TaskCard.vue'
import TaskForm from '../components/TaskForm.vue'
import {
  tasks,
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from '../stores/tasks'

const searchText = ref('')
const statusFilter = ref('Todas')
const editingTask = ref(null)
const showForm = ref(false)

const filteredTasks = computed(() =>
  tasks.value.filter((task) => {
    const matchesTitle = task.title.toLowerCase().includes(searchText.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'Todas' || task.status === statusFilter.value
    return matchesTitle && matchesStatus
  }),
)

function openNewTaskForm() {
  editingTask.value = null
  showForm.value = true
}

function openEditForm(task) {
  editingTask.value = { ...task }
  showForm.value = true
}

function saveTask(taskData) {
  if (editingTask.value) {
    updateTask({ ...taskData, id: editingTask.value.id })
  } else {
    addTask(taskData)
  }

  showForm.value = false
  editingTask.value = null
}

function removeTask(taskId) {
  if (window.confirm('Tem certeza de que deseja excluir esta tarefa?')) {
    deleteTask(taskId)
  }
}
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">ORGANIZE SUA ROTINA</p>
        <h1>Minhas tarefas</h1>
        <p class="page-subtitle">Um lugar simples para planejar e acompanhar suas atividades.</p>
      </div>
      <button class="button button-primary" type="button" @click="openNewTaskForm">
        <span aria-hidden="true">＋</span> Nova tarefa
      </button>
    </header>

    <section class="task-controls" aria-label="Pesquisar e filtrar tarefas">
      <label class="search-field">
        <span aria-hidden="true">⌕</span>
        <span class="sr-only">Pesquisar pelo título</span>
        <input v-model="searchText" type="search" placeholder="Buscar uma tarefa..." />
      </label>
      <label class="filter-field">
        <span>Status:</span>
        <select v-model="statusFilter">
          <option>Todas</option>
          <option>Pendente</option>
          <option>Em andamento</option>
          <option>Concluída</option>
        </select>
      </label>
    </section>

    <div v-if="showForm" class="form-overlay" @click.self="showForm = false">
      <TaskForm :task="editingTask" @save="saveTask" @cancel="showForm = false" />
    </div>

    <section class="section-block tasks-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">SUA LISTA</p>
          <h2>Todas as atividades <span class="count-pill">{{ filteredTasks.length }}</span></h2>
        </div>
      </div>

      <div v-if="filteredTasks.length" class="task-list">
        <TaskCard
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @edit="openEditForm"
          @delete="removeTask"
          @status-change="updateTaskStatus"
        />
      </div>
      <div v-else class="empty-state compact-empty">
        <span class="empty-icon">⌕</span>
        <h3>{{ searchText || statusFilter !== 'Todas' ? 'Nenhuma tarefa encontrada' : 'Nenhuma tarefa por aqui' }}</h3>
        <p>
          {{ searchText || statusFilter !== 'Todas'
            ? 'Tente mudar a pesquisa ou o filtro de status.'
            : 'Adicione sua primeira atividade para começar.' }}
        </p>
        <button
          v-if="!searchText && statusFilter === 'Todas'"
          class="button button-primary"
          type="button"
          @click="openNewTaskForm"
        >
          Criar primeira tarefa
        </button>
      </div>
    </section>
  </div>
</template>
