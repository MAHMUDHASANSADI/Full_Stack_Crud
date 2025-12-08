<template>
  <div class="container">
    <h2>Login</h2>

    <form @submit.prevent="submit">
      <input v-model="form.email" type="email" placeholder="Email">
      <input v-model="form.password" type="password" placeholder="Password">
      <button>Login</button>
    </form>

    <p>
      Don't have an account?
      <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import '../assets/css/login.css';

const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  email: "",
  password: ""
});

const submit = async () => {
  await auth.login(form);
  router.push("/tasks");
};
</script>
