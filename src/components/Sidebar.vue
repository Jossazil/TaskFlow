<template>
  <aside class="sidebar">
    <RouterLink class="brand" to="/">
      TaskFlow
    </RouterLink>

    <nav class="side-nav" aria-label="Navegação principal">
      <RouterLink class="nav-link" to="/" exact-active-class="active">Dashboard</RouterLink>
      <RouterLink class="nav-link" to="/tarefas" active-class="active">Minhas tarefas</RouterLink>
      <RouterLink class="nav-link" to="/sobre" active-class="active">Sobre</RouterLink>
    </nav>
  </aside>
</template>
