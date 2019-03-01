import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Questions from './views/Questions.vue'
import Profile from './views/Profile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import(/* webpackChunkName: "register form" */ './components/Homepage.vue')          
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "register form" */ './components/RegisterForm.vue')
        },
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login form" */ './components/LoginForm.vue')
        },    
      ]
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import(/* webpackChunkName: "all tags" */ '@/views/Tags.vue')
     
    },
    {
      path: '/questions',
      // name: 'question',
      component: Questions,
      children: [
        {
          path: '/questions',
          name: 'question',
          component: () => import(/* webpackChunkName: "questions list" */ './components/QuestionList.vue')
        },
        {
          path: 'create',
          name: 'questions-form',
          component: () => import(/* webpackChunkName: "questions form" */ './components/QuestionForm.vue')
        },
        {
          path: 'q/:id',
          name: 'question-detail',
          component: () => import(/* webpackChunkName: "form question detail" */ '@/components/QuestionDetail.vue')
        },
        {
          path: 'q/edit/:userId/:id',
          name: 'edit-question-from-detail',
          component: () => import(/* webpackChunkName: "edit questions" */ '@/components/EditQuestionFromDetail.vue')
        },
        {
          path: 'answer/edit/:userId/:id',
          name: 'edit-answer-from-detail',
          component: () => import(/* webpackChunkName: "edit questions" */ '@/components/EditAnswerFromDetail.vue')
        },
        {
          path: 'search-by-tag/:id',
          name: 'search-tag',
          component: () => import(/* webpackChunkName: "edit questions" */ '@/components/TagSearch.vue')
        },  
      ]
    },
    {
      path: '/profile',
      component: Profile,
      children: [
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "questions" */ '@/components/UsersQuestions.vue')
        },
        {
          path: 'edit/:userId/:id',
          name: 'edit-question',
          component: () => import(/* webpackChunkName: "edit questions" */ '@/components/EditQuestion.vue')
        },
        {
          path: 'answer/edit/a/:userId/:id',
          name: 'edit-answer-from-profile',
          component: () => import(/* webpackChunkName: "edit answer" */ '@/components/EditAnswerFromProfile.vue')
        }   
      ]
    }
  ]
})
