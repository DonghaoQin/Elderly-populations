<template>
  <div>
    <!-- Navigation Bar -->
    <header class="navbar">
      <div class="navbar-brand">
        <h1>Elderly Populations</h1>
      </div>
      <nav class="navbar-menu">
        <router-link to="/">Home</router-link>
        <router-link to="/service">Services</router-link>
        <router-link to="/comment">Comment</router-link>
        <router-link to="/email">Send Email</router-link>
        <router-link v-if="!isAuthenticated" to="/login" class="navbar-item">Login</router-link>
        <router-link v-if="!isAuthenticated" to="/map" class="navbar-item">Map</router-link>
        <router-link v-if="!isAuthenticated" to="/table" class="navbar-item">Table</router-link>
        <router-link v-if="!isAuthenticated" to="/register" class="button is-primary">Get Started</router-link>
        <router-link to="/genai" class="navbar-item">AI</router-link> <!-- AI button added here -->
        <button v-if="isAuthenticated" @click="logout" class="navbar-item">Logout</button>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero is-fullheight is-primary is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Introducing Clove, a mental health collective.
          </h1>
          <h2 class="subtitle">
            Get accessible and personalized mental healthcare in-person or from the comfort of your home.
          </h2>
        </div>
      </div>
    </section>

    <!-- API Data Section -->
    <section class="api-data">
      <div class="container">
        <h2 class="api-title">Posts from API</h2>
        <p class="api-description">The following data is fetched dynamically from an external API and updates with random posts on each page load.</p>

        <div v-if="loading" class="loading-indicator">
          <p>Loading data from API...</p>
        </div>
        <ul v-else-if="posts.length > 0">
          <li v-for="post in posts" :key="post.id" class="post-item">
            <strong>{{ post.title }}</strong>
            <p>{{ post.body.slice(0, 100) }}...</p>
          </li>
        </ul>
        <p v-else>No posts available from the API.</p>

        <p v-if="lastUpdated" class="last-updated">Data last updated: {{ lastUpdated }}</p>
        <p>Data fetched from <a href="https://jsonplaceholder.typicode.com/" target="_blank">JSONPlaceholder API</a>.</p>
      </div>
    </section>

    <!-- Footer Section -->
    <footer class="footer">
      <div class="container has-text-centered">
        <p>Donghao Qin</p>
        <p>Student ID: 34084983</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const isAuthenticated = ref(false);
    const posts = ref([]);
    const loading = ref(true);
    const lastUpdated = ref('');
    const userInput = ref('');
    const response = ref(''); // Ensure response is defined

    // Function to fetch posts from API
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    onMounted(() => {
      const user = localStorage.getItem('authenticatedUser');
      isAuthenticated.value = !!user;

      const randomStart = getRandomInt(1, 50);
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?_start=${randomStart}&_limit=5`)
        .then((response) => {
          posts.value = response.data;
          lastUpdated.value = new Date().toLocaleString();
          loading.value = false;
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
          loading.value = false;
        });
    });

    const logout = () => {
      localStorage.removeItem('authenticatedUser');
      isAuthenticated.value = false;
      router.push('/');
    };

    return {
      userInput,
      response,
      posts,
      loading,
      lastUpdated,
      logout,
      isAuthenticated,
    };
  },
};
</script>

<style scoped>
/* Navigation Bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ecdcdc;
}

.navbar-menu {
  display: flex;
  gap: 20px;
}

.navbar-item {
  color: #2a3b42;
}

.button.is-primary {
  background-color: #2b455a;
  color: #ffffff;
  border-radius: 5px;
  padding: 10px 20px;
}

/* Hero Section */
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../assets/talk.jpg');  /* 替换为背景图片的实际路径 */
  background-size: cover;
  background-position: center;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(250, 224, 224, 0.7);
}

/* API Data Section */
.api-data {
  padding: 50px 20px;
  background-color: #F0F0F0;
  text-align: center;
}

.api-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333333;
}

.api-description {
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: #333333;
}

.loading-indicator {
  font-size: 1.5rem;
  text-align: center;
  color: #666666;
}

ul {
  list-style-type: none;
  padding: 0;
}

.post-item {
  margin-bottom: 20px;
  padding: 15px;
  border-bottom: 1px solid #cccccc;
}

.post-item strong {
  font-size: 1.2rem;
  color: #333333;
}

.post-item p {
  font-size: 1rem;
  color: #666666;
}

.last-updated {
  font-size: 0.9rem;
  color: #666666;
  text-align: right;
}

/* Footer Section */
.footer {
  background-color: #2b2828;
  color: #f2f8f8;
  padding: 20px;
  text-align: center;
  margin-top: 40px;
}
</style>
