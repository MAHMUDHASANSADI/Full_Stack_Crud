<template>
  <div class="container">
    <h2>Register</h2>

    <form @submit.prevent="submit">
      <input v-model="form.name" type="text" placeholder="Name">
      <input v-model="form.email" type="email" placeholder="Email">
      <input v-model="form.password" type="password" placeholder="Password">
      <input v-model="form.password_confirmation" type="password" placeholder="Confirm Password">
      <button>Register</button>
    </form>

    <p>
      Already have an account?
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
});

const submit = async () => {
  await auth.register(form);
  router.push("/login");
};
</script>
