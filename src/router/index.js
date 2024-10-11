import FirebaseSigninView from '@/components/FirebaseSigninView.vue'; 
import { getAuth } from 'firebase/auth';
import { createRouter, createWebHistory } from 'vue-router'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/Homepage.vue'), 
  },
  {
    path: '/firebase-login',
    name: 'FirebaseLogin',
    component: () => import('@/components/FirebaseSigninView.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Login.vue'),
  },
  {
    path: '/service',
    name: 'Service',
    component: () => import('@/components/Service.vue'),
    meta: { requiresAuth: true }, // 需要身份验证
  },
  {
    path: '/comment',
    name: 'Comment',
    component: () => import('@/components/Comment.vue'),
  },
  {
    path: '/email',
    name: 'Email',
    component: () => import('@/components/EmailForm.vue'),
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('@/components/Map.vue'),
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('@/components/TableComponent.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/NotFound.vue'), // 404 页面
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (to.meta.requiresAuth && !user) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
