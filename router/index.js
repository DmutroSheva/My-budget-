import { createRouter, createWebHistory } from 'vue-router';
import IncomeTracker from '../pages/IncomeTracker.vue';
import Home from '../pages/Home.vue';
import ExpenseTracker from '../pages/ExpenseTracker.vue';
import Balance from '../pages/Balance.vue';
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import Goals from '../pages/Goals.vue';
import GoalDetails from '../pages/GoalDetails.vue';
import NotFound from '../pages/NotFound.vue'; // Добавим страницу для 404
import RegisterAdmin from '@/pages/RegisterAdmin.vue';

const routes = [
  // 1. Базовые маршруты для компонентов
  { path: '/IncomeTracker', component: IncomeTracker }, // Доходы
  { path: '/Home', component: Home }, // Главная
  { path: '/ExpenseTracker', component: ExpenseTracker }, // Расходы
  { path: '/Balance', component: Balance }, // Баланс
  { path: '/Register', component: Register }, // Регистрация
  { path: '/Login', component: Login }, // Вход
  { path: '/RegisterAdmin', component: RegisterAdmin }, // Регистрация администратора

  // 2. Динамический параметр маршрута (GoalsDetails) - вывод динамического параметра id цели
  {
    path: '/Goals/:id',
    component: GoalDetails,
    props: true, // Параметр передается как props в компонент GoalDetails
  },

  // 3. Вложенные маршруты (Nested Routes) для страницы "Цели"
  {
    path: '/Goals',
    component: Goals,
    children: [
      {
        path: 'details/:id',
        component: GoalDetails, // Дочерний маршрут для деталей цели
        props: true, // Передаем параметр id как props
      },
    ],
  },

  // 5. Navigation Guards - защита маршрутов
  {
    path: '/Balance',
    component: Balance,
    meta: { requiresAuth: true }, // Этот маршрут требует авторизации
  },

  // 6. Route Meta Fields - данные для передачи через мета-поля
  // Мы можем передавать в meta информацию, например, для определения доступа к маршруту
  {
    path: '/Goals',
    component: Goals,
    // meta: { role: 'admin' }, // Этот маршрут доступен только администраторам
  },

  // 7. Passing Props to Route Components - передача параметров маршрута как props
  {
    path: '/GoalDetails',
    component: GoalDetails,
    // props: true, // Параметр id будет передан как props в компонент GoalDetails
  },

  // 404 - если маршрут не найден
  { path: '/:catchAll(.*)', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guards - защита маршрутов от неавторизованных пользователей
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Здесь должно быть ваше условие авторизации
  const userRole = localStorage.getItem('role'); // Получение роли пользователя

  // Проверка на требование авторизации
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/Login'); // Если пользователь не авторизован, перенаправляем на страницу логина
  }
  // Проверка на роль
  else if (to.meta.role && to.meta.role !== userRole) {
    next('/Home'); // Если у пользователя недостаточно прав, перенаправляем на домашнюю страницу
  } else {
    next(); // Продолжаем навигацию
  }
});

export default router;
