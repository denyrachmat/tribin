
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'condition', component: () => import('pages/master/conditions/assignConditions.vue') },
      { path: 'coa', component: () => import('pages/master/coa/coaIndex.vue') },
      { path: 'location', component: () => import('pages/master/location/locationIndex.vue') },
      { path: 'branch', component: () => import('pages/master/branch/indexBranch.vue') },
      { path: 'item', component: () => import('pages/master/items/itemMasterIndex.vue') },
      { path: 'customer', component: () => import('pages/master/customers/customerMasterView.vue') },
      { path: 'company', component: () => import('pages/master/company/indexCompany.vue') },
      { path: 'tax', component: () => import('pages/master/tax/taxView.vue') },
      { path: 'price', component: () => import('pages/master/price/priceIndex.vue') },
      { path: 'dashboard', component: () => import('pages/dashboards/dashboardView.vue') },
      { path: 'po', component: () => import('pages/transaction/purchasing/poView.vue') },
      { path: 'poReport', component: () => import('pages/transaction/purchasing/poReportView.vue') },
      { path: 'outgoing', component: () => import('pages/warehouse/outgoing/outgoingView.vue') },
      { path: 'outgoingConfirm', component: () => import('pages/warehouse/outgoingConfirm/outConfView.vue') },
      { path: 'invoice', component: () => import('pages/warehouse/invoice/invoiceView.vue') },
      { path: 'incoming', component: () => import('pages/warehouse/incoming/incomingIndex.vue') },
      { path: 'incomingBC', component: () => import('pages/warehouse/incomingBarcode/incomingBarcodeIndex.vue') },
      { path: 'barcodeCreate', component: () => import('pages/warehouse/incomingBarcode/barcodeCreate.vue') },
      { path: 'barcodeTest', component: () => import('pages/warehouse/incomingBarcode/barcodeTest.vue') },
      { path: 'transferLoc', component: () => import('pages/warehouse/transferLocation/transferLocIndex.vue') },
      { path: 'transferRequest', component: () => import('pages/warehouse/transferRequest/transferRequestIndex.vue') },
      { path: 'stocktake', component: () => import('pages/warehouse/stockTake/stockTakeIndex.vue') },
      { path: 'services', component: () => import('pages/transaction/services/serviceView.vue') },
      { path: 'servicesApproval', component: () => import('pages/transaction/services/serviceApproval.vue') },
      { path: 'servicesOrderList', component: () => import('pages/transaction/services/serviceOprView.vue') },
      { path: 'quotation', component: () => import('pages/transaction/sales/quotation/quotationView.vue') },
      { path: 'so', component: () => import('pages/transaction/sales/order/salesOrderView.vue') },
      { path: 'salesReport', component: () => import('pages/transaction/sales/order/salesOrderReportView.vue') },
      { path: 'salesReportByCust', component: () => import('pages/transaction/sales/order/salesOrderReportByCustView.vue') },
      { path: 'accIF', component: () => import('pages/transaction/accounting/closing/accClosingIndex.vue') },
      { path: 'glReport', component: () => import('pages/transaction/accounting/glReport/glReportIndex.vue') },
      { path: 'journalReport', component: () => import('pages/transaction/accounting/journalReport/journalReportIndex.vue') },
      { path: 'journalInput', component: () => import('pages/transaction/accounting/journalInput/journalInputIndex.vue') },
      { path: 'pos', component: () => import('pages/transaction/pos/sales/posSalesIndex.vue') },

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
