import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AddWidget from '../views/AddWidget.vue'
import AppsList from '../views/AppsList.vue'
import TwitterLandPage from '../components/twitter/TwitterLandPage.vue'
import TwitterAuthentication from '../components/twitter/TwitterAuth.vue'
import TwitterCallback from '../components/twitter/TwitterCallback.vue'
import LoginSuccessfully from '../views/LoginSuccessfully.vue'
import WidgetGallery from '../views/WidgetGallery.vue'
import WidgetDashboard from '../views/widget-dashboard.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'AddWidget',
    component: AddWidget,
    props: {
      message: "Add Widget"
    }
  },
  {
    path: '/appslist',
    name: 'AppList',
    component: AppsList,
    props: {
      message: "Available Apps"
    }
  },
  {
    path: '/twitter',
    name: 'Twitter',
    component: TwitterLandPage,
    props: {
      message: "Twitter"
    }
  },
  {
    path: '/twitter/auth',
    name: 'Twitter Authentication',
    component: TwitterAuthentication,
    props: {
      message: "Twitter Authentication"
    }
  },
  {
    path: '/twitter/callback',
    name: 'Twitter Callback',
    component: TwitterCallback
  },
  {
    path: '/loginsuccess',
    name: 'Login Success',
    component: LoginSuccessfully
  },
  {
    path: '/widget-gallery',
    name: 'WidgetGallery',
    component: WidgetGallery
  }
  ,{
    path: '/widget-dashboard',
    name: 'WidgetDashboard',
    component: WidgetDashboard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
