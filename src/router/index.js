import AboutView from '../views/AboutView.vue'
import DashboardView from '../views/DashboardView.vue'
import TasksView from '../views/TasksView.vue'

export default [
  { path: '/', name: 'dashboard', component: DashboardView },
  { path: '/tarefas', name: 'tasks', component: TasksView },
  { path: '/sobre', name: 'about', component: AboutView },
]
