<template>
  <div class="container">
    <div class="top-buttons">
      <button class="add-btn" @click="openAddModal">+ Add Task</button>
      <button class="logout-btn" @click="logout">Logout</button>
    </div>

    <h2>Tasks</h2>

    <table class="task-table">
      <thead>
      <tr>
        <th>SL</th>
        <th>Task Name</th>
        <th>Description</th>
        <th>Completed</th>
        <th>Action</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(task, index) in tasks" :key="task.id">
        <td>{{ index + 1 }}</td>
        <td>{{ task.title }}</td>
        <td>{{ task.description }}</td>

        <td :class="task.completed ? 'yes' : 'no'">
          {{ task.completed ? "YES" : "NO" }}
        </td>

        <td>
          <button class="btn-edit" @click="openEditModal(task)">Edit</button>
          <button class="btn-delete" @click="deleteTask(task.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>{{ isEditing ? 'Edit Task' : 'Add Task' }}</h3>

        <form @submit.prevent="saveTask">
          <h3>Title</h3>
          <input
              v-model="form.title"
              placeholder="Task title"
              required

          />
          <h3>Description</h3>
          <textarea
              v-model="form.description"
              placeholder="Task description"
          ></textarea>

          <div class="mt-5">
            <label>Completed:</label>
            <select v-model="form.completed">
              <option :value="true">YES</option>
              <option :value="false">NO</option>
            </select>
          </div>

          <div class="modal-actions mt-5">
            <button class="add-btn" type="submit">Save</button>
            <button class="btn-delete" type="button" @click="closeModal">Cancel</button>
          </div>

        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import '../assets/css/task.css';

const auth = useAuthStore();
const router = useRouter();

const tasks = ref([]);
const showModal = ref(false);
const isEditing = ref(false);

const form = ref({
  id: null,
  title: "",
  description: "",
  completed: false
});

const loadTasks = async () => {
  const res = await api.get("/tasks");
  tasks.value = res.data;
};

const openAddModal = () => {
  isEditing.value = false;
  form.value = { id: null, title: "", description: "", completed: false };
  showModal.value = true;
};

const openEditModal = (task) => {
  isEditing.value = true;
  form.value = { ...task };
  showModal.value = true;
};

const saveTask = async () => {

  form.value.completed = form.value.completed === true || form.value.completed === "true";

  if (isEditing.value) {
    await api.put(`/tasks/${form.value.id}`, form.value);
  } else {
    await api.post("/tasks", form.value);
  }

  closeModal();
  loadTasks();
};


const updateTask = async (task) => {
  task.completed = task.completed === true || task.completed === "true";

  await api.put(`/tasks/${task.id}`, task);
};
const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
  loadTasks();
};

const closeModal = () => {
  showModal.value = false;
};

const logout = () => {
  auth.logout();
  router.push("/login");
};

onMounted(() => {
  loadTasks();
});
</script>

