// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// Import routing and components
import { createRouter, createWebHistory } from 'vue-router';
import Register from './components/register.vue';
import Login from './components/login.vue';
import Homepage from './components/Homepage.vue';  // Import the Homepage component
import Service from './components/Service.vue';    // Import the Service component
import Comment from './components/Comment.vue';    // Import the Comment component
import EmailForm from './components/EmailForm.vue';  // Import EmailForm.vue
// Firebase configuration from your details
const firebaseConfig = {
  apiKey: "AIzaSyDIRI3ZPjEgDefQWPbfV7zbGM_ZV36yBGI",
  authDomain: "ass3-f44ec.firebaseapp.com",
  projectId: "ass3-f44ec",
  storageBucket: "ass3-f44ec.appspot.com",
  messagingSenderId: "64117293763",
  appId: "1:64117293763:web:e2d7a6ec6e5a550d5b9876",
  measurementId: "G-C46QQYD88G"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Setup Vue Router with routes
const routes = [
  { path: '/', component: Homepage },  
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/service', component: Service, meta: { requiresAuth: true } },
  { path: '/comment', component: Comment, meta: { requiresAuth: true } }, 
  { path: '/email', component: EmailForm },  // Add EmailForm route
  { path: '/logout', component: Homepage }  // Logout redirects to Homepage
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Vue app initialization
const app = createApp(App);
app.use(PrimeVue, { theme: { preset: Aura } });
app.use(router);
app.mount('#app');

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (to.matched.some(record => record.meta.requiresAuth) && !user) {
    next('/login');
  } else {
    next();
  }
});


