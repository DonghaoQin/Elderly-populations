<template>
  <div class="login-container">
    <h2>Login</h2>

    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" class="form-control" placeholder="Enter email" />
    </div>

    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" class="form-control" placeholder="Enter password" />
    </div>

    <button @click="loginWithEmailPassword" class="btn btn-primary">Login</button>

    <!-- Google 登录按钮 -->
    <button @click="googleSignIn" class="btn btn-google">Sign in with Google</button>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Register Button -->
    <button @click="goToRegister" class="btn btn-secondary">Register</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const auth = getAuth();

// Email 和密码登录
const loginWithEmailPassword = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      if (email.value === 'admin@gmail.com' && password.value === '11QQqq..') {
        router.push('/admin');  // 管理员登录后跳转到管理员页面
      } else {
        router.push('/service');  // 普通用户登录后跳转到服务页面
      }
    })
    .catch((error) => {
      errorMessage.value = error.message;
    });
};

// Google 登录功能
const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('User Info:', user);
      router.push('/service');  // 登录成功后跳转到服务页面
    })
    .catch((error) => {
      console.error('Google login failed:', error);
      errorMessage.value = error.message;
    });
};

// Redirect to Register
const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
.login-container {
  text-align: center;
  margin-top: 50px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
}

.btn {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-google {
  background-color: #4285F4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-google:hover {
  background-color: #357ae8;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.error-message {
  color: red;
}
</style>

