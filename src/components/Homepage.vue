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
        <button v-if="isAuthenticated" @click="logout" class="navbar-item">Logout</button>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero is-fullheight is-primary is-bold" style="background-color: #add8e6;">
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

    <!-- Google AI Text Generator Section -->
    <div class="openai-section">
      <h1>Ask Google AI</h1>
      <textarea v-model="userInput" placeholder="Ask a question..." rows="4"></textarea>
      <button @click="analyzeText">Submit</button>
      <p v-if="response">{{ response }}</p>
    </div>

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

    // Function to analyze text using Google API
    const analyzeText = async () => {
  try {
    const apiKey = ''; // Replace with your actual Google API key
    const url = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`;

    const requestBody = {
      prompt: {
        text: userInput.value, // The text input from the user
      },
    };

    const result = await axios.post(url, requestBody);
    response.value = result.data.candidates[0].output; // Extract and display the generated text
  } catch (error) {
    console.error('Error during API request:', error.response?.data || error);
    response.value = 'Sorry, something went wrong.';
  }
};


    const logout = () => {
      localStorage.removeItem('authenticatedUser');
      isAuthenticated.value = false;
      router.push('/');
    };

    return {
      userInput,
      response, // Returning response so it's available in the template
      posts,
      loading,
      lastUpdated,
      analyzeText, // Correct function name returned here
      logout,
      isAuthenticated,
    };
  },
};
</script>


<!-- 更新所有前景和背景颜色的对比度 -->
<style scoped>
/* Navigation Bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #003366; /* 更深的蓝色背景 */
}

.navbar-menu {
  display: flex;
  gap: 20px;
}

.navbar-item {
  color: #ffffff;  /* 白色文字，确保高对比度 */
}

.button.is-primary {
  background-color: #0074D9; /* 深蓝色背景 */
  color: #ffffff;  /* 白色文字 */
  border-radius: 5px;
  padding: 10px 20px;
}

/* Hero Section */
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00509E;  /* 深蓝色背景 */
  color: #ffffff;  /* 白色文字，确保对比度 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* 增加阴影以增强可读性 */
}

/* API Data Section */
.api-data {
  padding: 50px 20px;
  background-color: #F0F0F0;  /* 浅灰色背景 */
  text-align: center;
}

.api-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333333;  /* 深灰色文字，确保高对比度 */
}

.api-description {
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: #333333;  /* 深灰色文字，确保高对比度 */
}

.loading-indicator {
  font-size: 1.5rem;
  text-align: center;
  color: #666666;  /* 深灰色文字 */
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
  color: #333333;  /* 深灰色文字 */
}

.post-item p {
  font-size: 1rem;
  color: #666666;  /* 中灰色文字 */
}

.last-updated {
  font-size: 0.9rem;
  color: #666666;  /* 中灰色文字 */
  text-align: right;
}

/* OpenAI Text Generator Section */
.openai-section {
  padding: 50px 20px;
  background-color: #E0E0E0;  /* 浅灰色背景 */
  text-align: center;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #cccccc;
  font-size: 16px;
  color: #333333;  /* 深灰色文字 */
}

button {
  padding: 10px 20px;
  background-color: #0074D9;  /* 深蓝色按钮 */
  color: white;  /* 白色文字 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc; /* 禁用状态为浅灰色 */
}

button:hover:not(:disabled) {
  background-color: #00509E;  /* 按钮悬停时变为深蓝色 */
}

p {
  margin-top: 20px;
  font-size: 18px;
  color: #333333;  /* 深灰色文字 */
}

/* Footer Section */
.footer {
  background-color: #333333;  /* 深灰色背景 */
  color: #ffffff;  /* 白色文字，确保高对比度 */
  padding: 20px;
  text-align: center;
  margin-top: 40px;
}
</style>
