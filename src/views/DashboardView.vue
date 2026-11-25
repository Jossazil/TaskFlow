<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import TaskCard from '../components/TaskCard.vue'
import TaskStats from '../components/TaskStats.vue'
import { tasks, pendingTasks, completedTasks } from '../stores/tasks'

const recentTasks = computed(() => tasks.value.slice(0, 3))
</script>

<template>
  <div class="page">
    <header class="page-header dashboard-header">
      <div>
        <h1>Dashboard</h1>
        <p class="page-subtitle">Resumo das suas tarefas.</p>
      </div>
      <RouterLink class="button button-primary" to="/tarefas">Minhas tarefas</RouterLink>
    </header>

    <TaskStats :total="tasks.length" :pending="pendingTasks" :completed="completedTasks" />

    <section class="section-block">
      <div class="section-heading">
        <h2>Tarefas recentes</h2>
        <RouterLink class="inline-link" to="/tarefas">Ver todas</RouterLink>
      </div>

      <div v-if="recentTasks.length" class="task-list">
        <TaskCard v-for="task in recentTasks" :key="task.id" :task="task" :show-actions="false" />
      </div>
      <div v-else class="empty-state">
        <h3>Seu espaço está pronto</h3>
        <p>Adicione uma tarefa para começar a organizar seu dia.</p>
        <RouterLink class="button button-primary" to="/tarefas">Criar primeira tarefa</RouterLink>
      </div>
    </section>
  </div>
</template>
