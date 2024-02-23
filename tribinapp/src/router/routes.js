
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'condition', component: () => import('pages/master/conditions/conditionsMaster.vue') },
      { path: 'quotation', component: () => import('pages/transaction/sales/quotation/quotationView.vue') },
      { path: 'dashboard', component: () => import('pages/dashboards/dashboardView.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
