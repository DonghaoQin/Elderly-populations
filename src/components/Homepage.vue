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
        <router-link to="/email">Send Email</router-link> <!-- Added Send Email Link -->
        
        <router-link v-if="!isAuthenticated" to="/login" class="navbar-item">Login</router-link>
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

    <!-- Our Approach Section -->
    <section class="our-approach">
      <div class="container">
        <h2 class="approach-title">Our approach</h2>
        <p class="approach-description">
          We are a group of doctoral-level psychologists and psychiatrists who
          provide quality mental health care. As a mental health collective, we
          assist members by providing therapy, medication management, coaching,
          and more. Let us help you connect with one of our doctors who meets your
          needs and is available to see you, online or in-person.
        </p>
        <div class="button-container">
          <button class="learn-more-button">Learn more</button>
        </div>
      </div>
    </section>

    <!-- Our Services Section -->
    <section class="our-services">
      <div class="container">
        <h2 class="services-title">Our services</h2>
        <div class="services-grid">
          <div class="service-item">
            <img src="@/assets/therapy-icon.png" alt="Therapy Icon">
            <p>Therapy</p>
          </div>
          <div class="service-item">
            <img src="@/assets/Psychiatry-icon.png" alt="Psychiatry Icon" />

            <p>Psychiatry</p>
          </div>
          <div class="service-item">
            <img src="@/assets/coaching-icon.png" alt="Coaching Icon">
            <p>Coaching</p>
          </div>
        </div>
        <div class="button-container">
          <router-link to="/service">
            <button class="learn-more-button">Learn More</button>
          </router-link>
        </div>
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

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = ref(false);

const checkAuthentication = () => {
  const user = localStorage.getItem('authenticatedUser');
  isAuthenticated.value = !!user; // Converts the result to a boolean
};

const logout = () => {
  localStorage.removeItem('authenticatedUser');
  isAuthenticated.value = false;
  router.push('/');  // Redirect to homepage after logout
};

checkAuthentication();
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
}

.navbar-menu {
  display: flex;
  gap: 20px;
}

.navbar-item {
  color: #000000;
}

.button.is-primary {
  background-color: #f7eae8;
  color: #ffffff;
  border-radius: 5px;
  padding: 10px 20px;
}

.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 3rem;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.5rem;
}

.our-approach {
  padding: 100px 20px;
  background-color: #f9f9f9;
  text-align: center;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.approach-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

.approach-description {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 40px;
}

.button-container {
  text-align: center;
}

.learn-more-button {
  background-color: #d08989;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.learn-more-button:hover {
  background-color: #c57878;
}

/* Our Services Section */
.our-services {
  padding: 100px 20px;
  background-color: #3e4d4a;
  color: #fff;
  text-align: center;
}

.services-title {
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #f1f1f1;
}

.services-grid {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.service-item {
  width: 150px;
  text-align: center;
  margin-bottom: 20px;
}

.service-item img {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.service-item p {
  font-size: 1.2rem;
  color: #f1f1f1;
}

.button-container {
  text-align: center;
}

.learn-more-button {
  background-color: #d08989;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.learn-more-button:hover {
  background-color: #c57878;
}

/* Footer Section */
.footer {
  background-color: #f0f2f5;
  padding: 20px;
  text-align: center;
  margin-top: 40px;
}
</style>
