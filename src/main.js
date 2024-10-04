import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import { createRouter, createWebHistory } from 'vue-router';
import Register from './components/register.vue';
import Login from './components/login.vue';
import Homepage from './components/homepage.vue';  // Import the Homepage component
import Service from './components/service.vue';    // Import the Service component
import Comment from './components/comment.vue';    // Import the Comment component

const routes = [
  { path: '/', component: Homepage },  // Add the route for Homepage
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/service', component: Service },
  { path: '/comment', component: Comment },  // Changed 'team' to 'comment'
  { path: '/logout', component: Homepage }  // Logout redirects to Homepage
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(PrimeVue, { theme: { preset: Aura } });
app.use(router);
app.mount('#app');



initializeApp(firebaseConfig);