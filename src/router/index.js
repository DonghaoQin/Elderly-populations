import FirebaseSigninView from '../components/FirebaseSigninView.vue'; // Adjusted the path
import { getAuth } from 'firebase/auth';
import Register from '../components/Register.vue';                      // Adjusted the path
import Login from '../components/Login.vue';                            // Adjusted the path
import Service from '../components/Service.vue';                        // Adjusted the path
import Comment from '../components/Comment.vue';                        // Adjusted the path
import EmailForm from '../components/EmailForm.vue';                    // Adjusted the path
import MapView from '../components/Map.vue';                            // Corrected the component name
import { createRouter, createWebHistory } from 'vue-router'; // 添加导入语句

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
  },
  {
    path: '/map',
    name: 'Map',
    component: MapView                                                   // Map view
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  // 检查路由是否需要登录
  if (to.meta.requiresAuth && !user) {
    next({ name: 'Login' }); // 如果用户未登录，重定向到登录页面
  } else {
    next(); // 允许导航到目标页面
  }
});

export default router;
