<template>
  <div class="full-page-container">
    <div class="container">
      <div class="card p-4 shadow-sm">
        <h1 class="text-center mb-4 text-primary">Elderly populations</h1>
        <form @submit.prevent="submitLoginForm">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="Enter your email"
              v-model="loginData.username"
              required
            />
            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
          </div>

          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter your password"
              v-model="loginData.password"
              required
            />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>

          <div class="text-center mt-4">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>

          <div class="text-center mt-4">
            <button type="button" class="btn btn-success" @click="goToRegister">Register</button>
          </div>

          <div v-if="loginError" class="text-danger text-center mt-3">
            {{ loginError }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginData = ref({
  username: '',
  password: ''
})

const errors = ref({
  username: null,
  password: null
})

const loginError = ref(null)

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(String(email).toLowerCase())
}

const validateLoginForm = () => {
  errors.value.username = null
  errors.value.password = null
  loginError.value = null

  let isValid = true

  if (!validateEmail(loginData.value.username)) {
    errors.value.username = 'Enter wrong email address'
    isValid = false
  }

  if (loginData.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters long.'
    isValid = false
  }

  return isValid
}

const submitLoginForm = () => {
  if (validateLoginForm()) {
    // Handle successful form submission
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
body {
  background-color: #f0f2f5;
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.full-page-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  max-width: 400px;
}

.card {
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
}

.text-primary {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1877f2;
}

.form-control {
  height: 50px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ced4da;
  width: 100%;
}

.btn-primary {
  background-color: #1877f2;
  border-color: #1877f2;
  font-size: 1.25rem;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
}

.btn-primary:hover {
  background-color: #165abf;
  border-color: #165abf;
}

.btn-success {
  background-color: #42b72a;
  border-color: #42b72a;
  font-size: 1.25rem;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
}

.btn-success:hover {
  background-color: #36a420;
  border-color: #36a420;
}

.text-muted {
  color: #6c757d !important;
}
</style>
