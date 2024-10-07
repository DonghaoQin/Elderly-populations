<template>
  <div class="full-page-container">
    <!-- Back to Homepage button in the top-left corner -->
    <button class="btn-back" @click="goToHomepage">Back to Homepage</button>

    <div class="container">
      <div class="card p-4 shadow-sm">
        <h1 class="text-center mb-4 text-primary">Elderly Populations</h1>
        <form @submit.prevent="submitLoginForm">
          <!-- Input field for email -->
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="Enter your email"
              v-model="loginData.username"
              required
            />
            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
          </div>

          <!-- Input field for password -->
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

          <!-- Submit button -->
          <div class="text-center mt-4">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>

          <!-- Register button -->
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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const router = useRouter();
const auth = getAuth();

const loginData = ref({
  username: '',
  password: ''
});

const errors = ref({
  username: null,
  password: null
});

const loginError = ref(null);

// Email validation
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

// Validate login form
const validateLoginForm = () => {
  errors.value.username = null;
  errors.value.password = null;
  loginError.value = null;

  let isValid = true;

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

// Submit login form with Firebase authentication---------------------------------------------------------
const submitLoginForm = () => {
  if (validateLoginForm()) {
    signInWithEmailAndPassword(auth, loginData.value.username, loginData.value.password)
      .then(() => {
        loginError.value = null; // Clear previous login errors
        router.push('/service'); // Redirect after successful login
      })
      .catch((error) => {
        loginError.value = error.message;
      });
  } else {
    loginError.value = 'Invalid login credentials';
  }
};

// Redirect to Register page
const goToRegister = () => {
  router.push('/register');
};

// Redirect to Homepage
const goToHomepage = () => {
  router.push('/');
};
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
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  color: #FF6F61;
  cursor: pointer;
  text-decoration: underline;
  z-index: 1000;
}

.btn-back:hover {
  color: #FF4B47;
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
