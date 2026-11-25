<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  task: { type: Object, default: null },
})

const emit = defineEmits(['save', 'cancel'])

const emptyForm = () => ({
  title: '',
  description: '',
  dueDate: '',
  priority: 'Média',
  status: 'Pendente',
})

const form = reactive(emptyForm())

watch(
  () => props.task,
  (task) => {
    Object.assign(form, task ? { ...task } : emptyForm())
  },
  { immediate: true },
)

function submitForm() {
  emit('save', { ...form, title: form.title.trim() })
}
</script>

<template>
  <form class="task-form" @submit.prevent="submitForm">
    <div class="form-heading">
      <div>
        <p class="eyebrow">{{ task ? 'ATUALIZE OS DETALHES' : 'NOVA ATIVIDADE' }}</p>
        <h2>{{ task ? 'Editar tarefa' : 'Adicionar tarefa' }}</h2>
      </div>
      <button class="icon-button" type="button" aria-label="Fechar formulário" @click="$emit('cancel')">
        ×
      </button>
    </div>

    <label class="form-field">
      <span>Título <span class="required-mark">*</span></span>
      <input v-model="form.title" type="text" placeholder="Ex.: Entregar trabalho de história" required maxlength="80" />
    </label>

    <label class="form-field">
      <span>Descrição</span>
      <textarea v-model="form.description" rows="3" placeholder="Adicione alguns detalhes..." maxlength="300"></textarea>
    </label>

    <div class="form-row">
      <label class="form-field">
        <span>Data de entrega</span>
        <input v-model="form.dueDate" type="date" required />
      </label>
      <label class="form-field">
        <span>Prioridade</span>
        <select v-model="form.priority">
          <option>Baixa</option>
          <option>Média</option>
          <option>Alta</option>
        </select>
      </label>
    </div>

    <label v-if="task" class="form-field">
      <span>Status</span>
      <select v-model="form.status">
        <option>Pendente</option>
        <option>Em andamento</option>
        <option>Concluída</option>
      </select>
    </label>

    <div class="form-actions">
      <button class="button button-secondary" type="button" @click="$emit('cancel')">Cancelar</button>
      <button class="button button-primary" type="submit">
        {{ task ? 'Salvar alterações' : 'Adicionar tarefa' }}
      </button>
    </div>
  </form>
</template>
