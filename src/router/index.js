import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import StudentsView from "@/views/students/StudentsView.vue";
import ProfessorsView from "@/views/professors/ProfessorsView.vue";
import CoordinatorsView from "@/views/coordinators/CoordinatorsView.vue";
import CoursesView from "@/views/courses/CoursesView.vue";
import GradesView from "@/views/grades/GradesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginView',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/alunos',
      name: 'Alunos',
      component: StudentsView,
      props: true
    },
    {
      path: '/professores',
      name: 'Professores',
      component: ProfessorsView,
    },
    {
      path: '/coordenadores',
      name: 'Coordenadores',
      component: CoordinatorsView,
    },
    {
      path: '/disciplinas',
      name: 'Disciplinas',
      component: CoursesView,
    },
    {
      path: '/notas',
      name: 'Notas',
      component: GradesView,
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.name !== 'LoginView' && !token) {
    next({ name: 'LoginView' });
  } else {
    next();
  }
});

export default router
