<script setup>
defineProps({
  total: { type: Number, required: true },
  pending: { type: Number, required: true },
  completed: { type: Number, required: true },
})
</script>

<template>
  <section class="stats-grid" aria-label="Indicadores de tarefas">
    <article class="stat-card">
      <p class="stat-label">Total de tarefas</p>
      <p class="stat-value">{{ total }}</p>
    </article>
    <article class="stat-card">
      <p class="stat-label">Pendentes</p>
      <p class="stat-value">{{ pending }}</p>
    </article>
    <article class="stat-card">
      <p class="stat-label">Concluídas</p>
      <p class="stat-value">{{ completed }}</p>
    </article>
  </section>
</template>
