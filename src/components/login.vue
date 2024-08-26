<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h1 class="text-center">🔐 User Login</h1>
          <p class="text-center">
            Please log in to your account.
          </p>
          <form @submit.prevent="submitLoginForm">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="loginData.username"
                required
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
  
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="loginData.password"
                required
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
  
            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Login</button>
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
  
  const loginData = ref({
    username: '',
    password: ''
  })
  
  const errors = ref({
    username: null,
    password: null
  })
  
  const loginError = ref(null)
  
  const validateLoginForm = () => {
    errors.value.username = null
    errors.value.password = null
    loginError.value = null
  
    let isValid = true
  
    if (loginData.value.username.length < 3) {
      errors.value.username = 'Username must be at least 3 characters long.'
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
      
      const isLoginSuccessful = mockLoginRequest(loginData.value.username, loginData.value.password)
      
      if (isLoginSuccessful) {
        console.log('Login successful!')
       
      } else {
        loginError.value = 'Invalid username or password.'
      }
    }
  }
  
  
  const mockLoginRequest = (username, password) => {
   
    const validUser = {
      username: 'user123',
      password: 'Password123!'
    }
  
    return username === validUser.username && password === validUser.password
  }
  </script>
  
  <style scoped>
  .container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 80vw;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
  }
  
  .form {
    text-align: center;
    margin-top: 50px;
  }
  
  #username:focus,
  #password:focus {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .text-danger {
    color: #ff0000;
  }
  
  .text-center {
    text-align: center;
  }
  </style>
  