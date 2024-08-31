<template>
  <div class="full-page-container">
    <!-- Back to Homepage button in the top-left corner -->
    <button class="btn-back" @click="goToHomepage">Back to Homepage</button>

    <div class="container">
      <div class="card p-4 shadow-sm">
        <h1 class="text-center mb-4 text-primary">Elderly Populations</h1>
        <form @submit.prevent="submitLoginForm">
          <!-- Input field with datalist for registered emails -->
          <div class="mb-3">
            <input
              list="emails"
              class="form-control"
              id="username"
              placeholder="Enter your email"
              v-model="loginData.username"
              @input="fillPassword"
              required
            />
            <datalist id="emails">
              <option v-for="user in users" :key="user.email" :value="user.email">
                {{ user.email }}
              </option>
            </datalist>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const users = ref([]);
const loginData = ref({
  username: '',
  password: ''
});

const errors = ref({
  username: null,
  password: null
});

const loginError = ref(null);

// Load users from localStorage
const loadUsers = () => {
  users.value = JSON.parse(localStorage.getItem('registeredUsers')) || [];
};

// Auto-fill password based on the selected email
const fillPassword = () => {
  const selectedUser = users.value.find(user => user.email === loginData.value.username);
  if (selectedUser) {
    loginData.value.password = selectedUser.password;
  } else {
    loginData.value.password = ''; // Clear the password field if the email doesn't match any user
  }
};

// Sanitize input to prevent XSS
const sanitizeInput = (input) => {
  const element = document.createElement('div');
  element.innerText = input;
  return element.innerHTML;
};

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

const validateLoginForm = () => {
  errors.value.username = null;
  errors.value.password = null;
  loginError.value = null;

  let isValid = true;

  loginData.value.username = sanitizeInput(loginData.value.username);

  if (!validateEmail(loginData.value.username)) {
    errors.value.username = 'Enter a valid email address';
    isValid = false;
  }

  if (loginData.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters long.';
    isValid = false;
  }

  return isValid;
};

const submitLoginForm = () => {
  if (validateLoginForm()) {
    localStorage.setItem('authenticatedUser', loginData.value.username); // Store the logged-in user
    loginError.value = null; // Reset any previous login error
    
    // Redirect to service page after successful login
    router.push('/service');
  } else {
    loginError.value = 'Invalid login credentials';
  }
};

const goToRegister = () => {
  router.push('/register');
};

const goToHomepage = () => {
  router.push('/');
};

// Load users on component mount
loadUsers();
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
}

.full-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(to right, #4facfe, #00f2fe);
  position: relative;
}

.container {
  max-width: 500px;
  width: 100%;
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.btn-back {
  position: fixed; /* Fixed positioning to keep it in the top-left corner */
  top: 20px;
  left: 20px;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  color: #FF6F61; /* Coral-like color */
  cursor: pointer;
  text-decoration: underline;
  z-index: 1000; /* Ensure it stays above other elements */
}

.btn-back:hover {
  color: #FF4B47; /* Darker coral on hover */
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
}

.text-danger {
  font-size: 0.9rem;
  margin-top: 5px;
}
</style>
