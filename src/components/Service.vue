<template>
    <div class="service-page-container">
      <div v-if="!isAuthenticated">
        <p>You need to log in</p>
        <button @click="goToLogin" class="btn btn-primary">Go to Login</button>
      </div>
      <div v-else>
        <p>This is your service</p>
      </div>
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
  
  const goToLogin = () => {
    router.push('/login');
  };
  
  checkAuthentication();
  </script>
  
  <style scoped>
  /* Add any styling you want for the service page here */
  .service-page-container {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  