// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'mapbox-gl/dist/mapbox-gl.css';

// Import routing and components
import { createRouter, createWebHistory } from 'vue-router';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Homepage from './components/Homepage.vue';  
import Service from './components/Service.vue';    
import Comment from './components/Comment.vue';    
import EmailForm from './components/EmailForm.vue';  
import MapView from './components/Map.vue';         
import TableComponent from './components/TableComponent.vue'; 
import Admin from './components/Admin.vue';  // Import Admin component

// Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
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
  { path: '/email', component: EmailForm },  
  { path: '/map', component: MapView },      
  { path: '/table', component: TableComponent }, 
  { path: '/logout', component: Homepage },
  { path: '/admin', component: Admin, meta: { requiresAdmin: true } }  // Add Admin route
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

// Firebase Authentication state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, check for admin role
    if (user.email === 'admin@gmail.com') {
      router.push('/admin');  // Redirect to admin page for admin user
    }
  } else {
    // No user is signed in
    if (router.currentRoute.value.meta.requiresAuth) {
      router.push('/login');
    }
  }
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const user = auth.currentUser;

  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth) && !user) {
    next('/login'); // Redirect to login if user is not authenticated
  } 
  // Check if the route requires admin privileges
  else if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (user && user.email === 'admin@gmail.com') {
      next(); // Allow navigation for admin
    } else {
      next('/login'); // Redirect to login if not an admin
    }
  } else {
    next(); // Allow navigation for non-admin routes
  }
});
