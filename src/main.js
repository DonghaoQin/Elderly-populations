// import './assets/main.css'
// import '@/assets/style.css'
import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import { createRouter, createWebHistory } from 'vue-router';
import Register from './components/register.vue';
import Login from './components/login.vue';
import Homepage from './components/homepage.vue';  // Import the Homepage component

const routes = [
  { path: '/', component: Homepage },  // Add the route for Homepage
  { path: '/register', component: Register },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(PrimeVue, { theme: { preset: Aura } });
app.use(router);
app.mount('#app');
