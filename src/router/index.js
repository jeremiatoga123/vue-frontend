import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import { useCookies } from 'vue3-cookies'
import { useIndexStore } from '../store'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      meta: {layout: "empty"},
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/students',
      children: [
        {
          path: '',
          name: 'students.index',
          component: () => import('../views/students/StudentsView2.vue'),
          meta: {role: 'lecturer' },
        },
        {
          path: 'create',
          name: 'students.create',
          component: () => import('../views/students/NewStudentView.vue'),
        }
      ]
    },
    {
      path: '/lecturers',
      children: [
        {
          path: '',
          name: 'lecturers.index',
          component: () => import('../views/lecturers/LecturersView.vue'),
        },
        {
          path: 'create',
          name: 'lecturers.create',
          component: () => import('../views/lecturers/NewLecturerView.vue')
        }
      ]
    },
    {
      path: '/reports',
      children: [
        {
          path: '',
          name: 'reports.index',
          component: () => import('../views/reports/ReportsView.vue'),
        },
        {
          path: 'create',
          name: 'reports.create',
          component: () => import('../views/reports/NewReportView.vue')
        }
      ]
    },
    // {
    //   path: '/reports/new',
    //   name: 'reports/new',
    // },
    {
      path: '/companies',
      children: [
        {
          path: '',
          name: 'companies.index',
          component: () => import('../views/companies/CompaniesView.vue'),
        },
        {
          path: 'create',
          name: 'companies.create',
          component: () => import('../views/companies/NewCompanyView.vue'),
        },
        {
          path: ':id',
          name: 'companies.show',
          component: () => import('../views/companies/MentorView.vue'),
        }
      ]
    },
    {
      path: '/setting',
      component: () => import('../views/Setting.vue')
    },
    // {
    //   path: '/test',
    //   component: () => import('../views/Test.vue')
    // },
  ]
})

router.beforeEach((to, from) => {
  console.log(to.name)
  if (to.name !== 'login') {
    axios.get('/profile')
      .then((response) => {
        const store = useIndexStore()
        store.loadUser(response.data.data)
      })
  }
})

export default router
