import FirebaseSigninView from '../components/FirebaseSigninView.vue'; // Adjusted the path
import Register from '../components/Register.vue';                      // Adjusted the path
import Login from '../components/Login.vue';                            // Adjusted the path
import Service from '../components/Service.vue';                        // Adjusted the path
import Comment from '../components/Comment.vue';                        // Adjusted the path
import EmailForm from '../components/EmailForm.vue';                    // Adjusted the path

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/Home.vue')                   // Lazy loading Home component
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView                                       // Firebase login view
  },
  {
    path: '/register',
    name: 'Register',
    component: Register                                                 // Register view
  },
  {
    path: '/login',
    name: 'Login',
    component: Login                                                     // Login view
  },
  {
    path: '/service',
    name: 'Service',
    component: Service                                                   // Service view
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment                                                   // Comment view
  },
  {
    path: '/email',
    name: 'Email',
    component: EmailForm                                                 // Email form view
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
