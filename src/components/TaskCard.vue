<script setup>
defineProps({
  task: { type: Object, required: true },
  showActions: { type: Boolean, default: true },
})

defineEmits(['edit', 'delete', 'status-change'])

function formatDate(date) {
  if (!date) {
    return 'Sem data'
  }

  return new Date(`${date}T00:00:00`).toLocaleDateString('pt-BR')
}
</script>

<template>
  <article class="task-card">
    <div class="task-card-main">
      <div class="task-title-row">
        <h3>{{ task.title }}</h3>
        <span
          class="priority-badge"
          :class="{
            'priority-baixa': task.priority === 'Baixa',
            'priority-media': task.priority === 'Média',
            'priority-alta': task.priority === 'Alta',
          }"
        >
          {{ task.priority }}
        </span>
      </div>
      <p v-if="task.description" class="task-description">{{ task.description }}</p>
      <div class="task-meta">
        <span class="task-date"><span aria-hidden="true">▦</span> {{ formatDate(task.dueDate) }}</span>
        <span
          class="status-badge"
          :class="{
            'status-pendente': task.status === 'Pendente',
            'status-em-andamento': task.status === 'Em andamento',
            'status-concluida': task.status === 'Concluída',
          }"
        >
          {{ task.status }}
        </span>
      </div>
    </div>

    <div v-if="showActions" class="task-actions">
      <label class="sr-only" :for="`status-${task.id}`">Status de {{ task.title }}</label>
      <select
        :id="`status-${task.id}`"
        :value="task.status"
        class="status-select"
        @change="$emit('status-change', task.id, $event.target.value)"
      >
        <option>Pendente</option>
        <option>Em andamento</option>
        <option>Concluída</option>
      </select>
      <button class="text-button" type="button" @click="$emit('edit', task)">Editar</button>
      <button class="text-button delete-button" type="button" @click="$emit('delete', task.id)">
        Excluir
      </button>
    </div>
  </article>
</template>
