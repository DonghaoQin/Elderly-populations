// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add Firestore import
import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'mapbox-gl/dist/mapbox-gl.css';




// Import routing and components
import { createRouter, createWebHistory } from 'vue-router';
import Register from './components/register.vue';
import Login from './components/login.vue';
import Homepage from './components/Homepage.vue';
import Service from './components/Service.vue';
import Comment from './components/Comment.vue';
import EmailForm from './components/EmailForm.vue';
import MapView from './components/Map.vue';
import TableComponent from './components/TableComponent.vue';
import Admin from './components/Admin.vue';

// Firebase configuration from your screenshot
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
const db = getFirestore(firebaseApp); // Initialize Firestore

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
  { path: '/admin', component: Admin, meta: { requiresAdmin: true } }
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
    if (user.email === 'admin@gmail.com') {
      router.push('/admin');
    }
  } else {
    if (router.currentRoute.value.meta.requiresAuth) {
      router.push('/login');
    }
  }
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const user = auth.currentUser;

  if (to.matched.some(record => record.meta.requiresAuth) && !user) {
    next('/login');
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (user && user.email === 'admin@gmail.com') {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export { db };  // Export the Firestore instance for use in other components
