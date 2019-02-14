import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Invoice from './views/Invoice.vue'
import Payments from './views/Payments.vue'
import Purchase from './views/Purchase.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: Invoice
    },
    {
      path: '/payments',
      name: 'payments',
      component: Payments
    },
    {
      path: '/Purchase',
      name: 'purchase',
      component: Purchase
    }
  ]
})
