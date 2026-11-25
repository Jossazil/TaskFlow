import { computed, ref } from 'vue'

const storageKey = 'taskflow-tasks'

function loadTasks() {
  const savedTasks = localStorage.getItem(storageKey)

  if (!savedTasks) {
    return []
  }

  try {
    const parsedTasks = JSON.parse(savedTasks)
    if (Array.isArray(parsedTasks)) {
      return parsedTasks
    }

    console.error('Os dados salvos do TaskFlow não estão no formato esperado.')
  } catch (error) {
    console.error('Não foi possível ler as tarefas salvas no navegador.', error)
  }

  return []
}

const tasks = ref(loadTasks())

function saveTasks() {
  localStorage.setItem(storageKey, JSON.stringify(tasks.value))
}

function addTask(taskData) {
  tasks.value.unshift({
    ...taskData,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  })
  saveTasks()
}

function updateTask(updatedTask) {
  const taskIndex = tasks.value.findIndex((task) => task.id === updatedTask.id)
  if (taskIndex === -1) {
    return
  }

  tasks.value[taskIndex] = { ...updatedTask }
  saveTasks()
}

function deleteTask(taskId) {
  tasks.value = tasks.value.filter((task) => task.id !== taskId)
  saveTasks()
}

function updateTaskStatus(taskId, status) {
  const task = tasks.value.find((item) => item.id === taskId)
  if (!task) {
    return
  }

  task.status = status
  saveTasks()
}

const pendingTasks = computed(
  () => tasks.value.filter((task) => task.status === 'Pendente').length,
)
const completedTasks = computed(
  () => tasks.value.filter((task) => task.status === 'Concluída').length,
)

export {
  tasks,
  pendingTasks,
  completedTasks,
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
}
