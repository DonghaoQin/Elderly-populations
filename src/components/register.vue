<script setup>
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  gender: ''
});

const submittedCards = ref([]);

const submitForm = () => {
  validateName(true);
  validateEmail(true);
  validatePassword(true);
  validateConfirmPassword(true);

  if (!errors.value.username && !errors.value.email && !errors.value.password && !errors.value.confirmPassword) {
    submittedCards.value.push({ ...formData.value });
    clearForm();
  }
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
  confirmPassword: null,
  resident: null,
  gender: null
});

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters';
  } else {
    errors.value.username = null;
  }
};

const validateEmail = (blur) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!re.test(formData.value.email)) {
    if (blur) errors.value.email = 'Enter wrong email address';
  } else {
    errors.value.email = null;
  }
};

const validatePassword = (blur) => {
  const password = formData.value.password;
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.';
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.';
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.';
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.';
  } else {
    errors.value.password = null;
  }
};

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.';
  } else {
    errors.value.confirmPassword = null;
  }
};
</script>


<template>
  <div class="full-page-container">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">Elder population</h1>
          <p class="text-center">Please register your account.</p>
          <form @submit.prevent="submitForm">
            <div class="row mb-3">
              <div class="col-md-6 col-sm-6">
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
            
              <div class="col-md-6 col-sm-6">
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
            </div>

            <div class="row mb-3">
              <div class="col-md-6 col-sm-6">
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

              <div class="col-md-6 col-sm-6">
                <label for="confirm-password" class="form-label">Confirm password</label>
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
            </div>

            <div class="row mb-3">
              <div class="col-md-6 col-sm-6">
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
}

.container {
  max-width: 500px;
  width: 100%;
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
}

p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
  text-align: center;
}

.form-label {
  font-weight: 500;
  color: #444;
}

.form-control {
  height: 45px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #4facfe;
  box-shadow: 0 0 8px rgba(79, 172, 254, 0.3);
}

.form-check-input {
  margin-top: 10px;
}

.text-danger {
  font-size: 0.9rem;
  margin-top: 5px;
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

@media (max-width: 768px) {
  .container {
    max-width: 90%;
  }
}
</style>
