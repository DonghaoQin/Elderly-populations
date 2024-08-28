<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          
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
</style>
