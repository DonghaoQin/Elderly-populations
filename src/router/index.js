import FirebaseSigninView from '../components/FirebaseSigninView.vue'; // 调整路径
import { getAuth } from 'firebase/auth';
import Register from '../components/Register.vue';                      // 调整路径
import Login from '../components/Login.vue';                            // 调整路径
import Service from '../components/Service.vue';                        // 调整路径
import Comment from '../components/Comment.vue';                        // 调整路径
import EmailForm from '../components/EmailForm.vue';                    // 调整路径
import MapView from '../components/Map.vue';                            // 修正组件名称
import TableComponent from '../components/TableComponent.vue';          // 添加 TableComponent
import Admin from '../components/Admin.vue';                            // 添加 Admin 组件
import { createRouter, createWebHistory } from 'vue-router';            // 导入语句

// 路由配置
const routes = [
  {
    path: '/',                                                          // 默认路径为 '/'
    name: 'Home',
    component: () => import('@/components/Homepage.vue'),               // 懒加载 Home 组件
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView,                                       // Firebase 登录视图
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,                                                 // 注册视图
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,                                                    // 登录视图
  },
  {
    path: '/service',
    name: 'Service',
    component: Service,                                                  // 服务视图
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment,                                                  // 评论视图
  },
  {
    path: '/email',
    name: 'Email',
    component: EmailForm,                                                // 邮件表单视图
  },
  {
    path: '/map',
    name: 'Map',
    component: MapView,                                                  // 地图视图
  },
  {
    path: '/table',
    name: 'Table',
    component: TableComponent,                                           // 表格视图
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,                                                    // 管理员视图
    meta: { requiresAdmin: true },                                       // 管理员权限
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  // 检查路由是否需要管理员权限
  if (to.meta.requiresAdmin) {
    if (user && user.email === 'admin@gmail.com') {
      next();  // 如果是管理员，允许访问
    } else {
      next({ name: 'Login' });  // 否则重定向到登录页面
    }
  } else if (to.meta.requiresAuth && !user) {
    next({ name: 'Login' });  // 如果路由需要身份验证且用户未登录，重定向到登录页面
  } else {
    next();  // 允许导航
  }
});

export default router;
