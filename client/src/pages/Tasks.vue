<template>
  <div class="container">
    <h2>Tasks</h2>

    <button @click="logout">Logout</button>

    <form @submit.prevent="createTask">
      <input v-model="newTask.title" placeholder="Task title" />
      <button>Add</button>
    </form>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input v-model="task.title" @change="updateTask(task)" />

        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();

const tasks = ref([]);
const newTask = ref({ title: "" });

const loadTasks = async () => {
  const res = await api.get("/tasks");
  tasks.value = res.data;
};

const createTask = async () => {
  await api.post("/tasks", newTask.value);
  newTask.value.title = "";
  loadTasks();
};

const updateTask = async (task) => {
  await api.put(`/tasks/${task.id}`, { title: task.title });
};

const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
  loadTasks();
};

const logout = () => {
  auth.logout();
};

onMounted(() => {
  loadTasks();
});
</script>
