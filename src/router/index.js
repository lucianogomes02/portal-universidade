import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import StudentsView from "@/views/users/students/StudentsView.vue";
import ProfessorsView from "@/views/users/professors/ProfessorsView.vue";
import CoordinatorsView from "@/views/users/coordinators/CoordinatorsView.vue";
import CoursesView from "@/views/courses/CoursesView.vue";
import GradesView from "@/views/grades/GradesView.vue";
import UsersEditOrRegisterView from "@/views/users/UsersEditOrRegisterView.vue";
import CourseEditOrRegisterView from "@/views/courses/CourseEditOrRegisterView.vue";
import GradeRegistrationModal from "@/components/users/grades/GradeRegistrationModal.vue";

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
    {
      path: '/alunos/edit/',
      name: 'Alunos Edit',
      component: UsersEditOrRegisterView,
    },
    {
      path: '/alunos/register/',
      name: 'Alunos Register',
      component: UsersEditOrRegisterView,
    },
    {
      path: '/professores/edit/',
      name: 'Professores Edit',
      component: UsersEditOrRegisterView,
    },
    {
      path: '/professores/register/',
      name: 'Professores Register',
      component: UsersEditOrRegisterView,
    },
    {
      path: '/coordenadores/edit/',
      name: 'Coordenadores Edit',
      component: UsersEditOrRegisterView,
    },
    {
      path: '/coordenadores/register/',
      name: 'Coordenadores Register',
      component: UsersEditOrRegisterView,
    },
    {
      path: '/disciplinas/edit/',
      name: 'Disciplinas Edit',
      component: CourseEditOrRegisterView,
    },
    {
      path: '/disciplinas/register/',
      name: 'Disciplinas Register',
      component: CourseEditOrRegisterView,
    },
    {
      path: '/notas/register/',
      name: 'Notas Register',
      component: GradeRegistrationModal,
    },
    {
      path: '/notas/register/',
      name: 'Notas Register',
      component: GradeRegistrationModal,
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
