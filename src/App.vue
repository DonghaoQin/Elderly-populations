<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li v-if="!user"><router-link to="/login">Login</router-link></li>
          <li v-if="user"><router-link to="/service">Service</router-link></li>
          <li v-if="user"><button @click="logout">Logout</button></li>
        </ul>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'vue-router';

const auth = getAuth();
const router = useRouter();
const user = ref(null);

// 监听Firebase用户状态
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      user.value = currentUser;
    } else {
      user.value = null;
      router.push('/login'); // 如果用户未登录，跳转到登录页面
    }
  });
});

// 登出功能
const logout = async () => {
  await signOut(auth);
  user.value = null;
  router.push('/login'); // 登出后跳转到登录页面
};
</script>

<style scoped>
nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 20px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
}

nav ul li a:hover {
  text-decoration: underline;
}

header {
  background-color: #f0f2f5;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
