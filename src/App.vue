<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/register">Register</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/service">Service</router-link></li>
          <li><router-link to="/comment">Comment</router-link></li>
        </ul>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script setup>
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
