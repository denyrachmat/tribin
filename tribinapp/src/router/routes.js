
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'condition', component: () => import('pages/master/conditions/assignConditions.vue') },
      { path: 'quotation', component: () => import('pages/transaction/sales/quotation/quotationView.vue') },
      { path: 'so', component: () => import('pages/transaction/sales/order/salesOrderView.vue') },
      { path: 'dashboard', component: () => import('pages/dashboards/dashboardView.vue') },
      { path: 'services', component: () => import('pages/transaction/services/serviceView.vue') },
      { path: 'servicesApproval', component: () => import('pages/transaction/services/serviceApproval.vue') },
      { path: 'servicesOrderList', component: () => import('pages/transaction/services/serviceOprView.vue') },
      { path: 'outgoing', component: () => import('pages/warehouse/outgoing/outgoingView.vue') },
      { path: 'outgoingConfirm', component: () => import('pages/warehouse/outgoingConfirm/outConfView.vue') },
      { path: 'invoice', component: () => import('pages/warehouse/invoice/invoiceView.vue') },
      { path: 'incoming', component: () => import('pages/warehouse/incoming/incomingIndex.vue') },
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
