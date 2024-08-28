<template>
  <div>
    <!-- Navigation Bar -->
    <header class="navbar">
      <div class="navbar-brand">
        <h1>Your Site Title</h1>
      </div>
      <nav class="navbar-menu">
        <router-link to="/">Home</router-link>
        <router-link to="/services">Services</router-link>
        <router-link to="/team">Team</router-link>
        <router-link to="/blog">Blog</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link to="/login" class="navbar-item">Login</router-link>
        <router-link to="/register" class="button is-primary">Get Started</router-link>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero is-fullheight is-primary is-bold">
      <div class="hero-body" style="background-image: url('@/assets/talk.jpg'); background-size: cover;">
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
            <img src="@/assets/psychiatry-icon.png" alt="Psychiatry Icon">
            <p>Psychiatry</p>
          </div>
          <div class="service-item">
            <img src="@/assets/coaching-icon.png" alt="Coaching Icon">
            <p>Coaching</p>
          </div>
        </div>
        <div class="button-container">
          <button class="learn-more-button">Learn More</button>
        </div>
      </div>
    </section>

    
  </div>
</template>

<script>
export default {
  name: 'Homepage',
};
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
  background-color: #FF6347;
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


</style>
