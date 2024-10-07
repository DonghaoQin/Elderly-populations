<template>
  <div class="full-page-container">
    <!-- Ensure the Back to Login button is positioned in the top-left corner of the viewport -->
    <button class="btn-back" @click="goToLogin">Back to Login</button>
    
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">Elder Population</h1>
          <p class="text-center">Please register your account.</p>

          <!-- Show success message after registration -->
          <div v-if="registrationSuccess" class="alert alert-success">
            Register succeed!
          </div>

          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
                v-model="formData.email"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">
                {{ errors.password }}
              </div>
            </div>

            <div class="mb-3">
              <label for="confirm-password" class="form-label">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>

            <div class="mb-3">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Submit</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const router = useRouter();
const auth = getAuth();

const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  gender: ''
});

const registrationSuccess = ref(false);

const goToLogin = () => {
  router.push('/login');
};

const clearForm = () => {
  formData.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    gender: ''
  };
};

const errors = ref({
  username: null,
  email: null,
  password: null,
  confirmPassword: null
});

// Validate the form inputs
const validateForm = () => {
  let isValid = true;

  if (formData.value.username.length < 3) {
    errors.value.username = 'Username must be at least 3 characters';
    isValid = false;
  } else {
    errors.value.username = null;
  }

  if (!validateEmail(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address';
    isValid = false;
  } else {
    errors.value.email = null;
  }

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordPattern.test(formData.value.password)) {
    errors.value.password = 'Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character';
    isValid = false;
  } else if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match';
    isValid = false;
  } else {
    errors.value.password = null;
    errors.value.confirmPassword = null;
  }

  return isValid;
};

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

// Submit the registration form using Firebase----------------------------------------------------------------
const submitForm = () => {
  if (validateForm()) {
    createUserWithEmailAndPassword(auth, formData.value.email, formData.value.password)
      .then(() => {
        registrationSuccess.value = true;

        // Redirect to login after registration
        setTimeout(() => {
          router.push('/login');
        }, 1000);

        clearForm();
      })
      .catch((error) => {
        errors.value.email = error.message; // Display any Firebase errors
      });
  }
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
  color: #f0e662;
  cursor: pointer;
  text-decoration: underline;
  z-index: 1000;
}

.alert-success {
  margin-bottom: 15px;
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
  padding: 10px;
  border-radius: 5px;
}

h1 {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
}

.form-control {
  height: 45px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ced4da;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

.form-control:focus {
  border-color: #4facfe;
  box-shadow: 0 0 8px rgba(79, 172, 254, 0.3);
}

.btn-primary, .btn-secondary {
  width: 100%;
  padding: 12px 0;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #4facfe;
  border: none;
  color: white;
}

.btn-primary:hover {
  background-color: #00c6ff;
}

.btn-secondary {
  background-color: #f0f2f5;
  border: none;
  color: #555;
}

.btn-secondary:hover {
  background-color: #e0e2e5;
}
</style>
