<?php

use App\Http\Controllers\AccessRulesController;
use App\Http\Controllers\AccountingIFController;
use App\Http\Controllers\AccountingJournalController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\CashierController;
use App\Http\Controllers\CoaController;
use App\Http\Controllers\CompanyGroupController;
use App\Http\Controllers\ConditionController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\DistancePriceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\locationController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\MeasurementController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\payroll\AttendanceController;
use App\Http\Controllers\payroll\CashAdvanceController;
use App\Http\Controllers\payroll\DashboardController;
use App\Http\Controllers\payroll\DeductionController;
use App\Http\Controllers\payroll\EmployeeController;
use App\Http\Controllers\payroll\HelperController;
use App\Http\Controllers\payroll\OvertimeController;
use App\Http\Controllers\payroll\PayrollController;
use App\Http\Controllers\payroll\PositionController;
use App\Http\Controllers\payroll\ProfileController;
use App\Http\Controllers\payroll\ScheduleController;
use App\Http\Controllers\POSController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\ReceiveBarcodeController;
use App\Http\Controllers\ReceiveController;
use App\Http\Controllers\ReceiveOrderController;
use App\Http\Controllers\ServiceOprController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UsageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ServiceAdminController;
use App\Http\Controllers\transferRequestController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

# Autentikasi
Route::get('/welcome', [LoginController::class, 'login'])->name('login');
Route::get('/', [PageController::class, 'index']);
Route::post('actionlogin', [LoginController::class, 'actionlogin'])->name('actionlogin');


# Terkait tampilan awal
Route::get('home', [HomeController::class, 'index'])->name('home')->middleware('auth');
Route::get('menu', [AccessRulesController::class, 'getAccessRolesByRoleName'])->middleware('auth');

# Terkait User
Route::get('user/registration', [UserController::class, 'index'])->middleware('auth');
Route::get('user', [UserController::class, 'search'])->middleware('auth');
Route::put('user/{id}', [UserController::class, 'update'])->middleware('auth');
Route::post('user', [UserController::class, 'simpan'])->middleware('auth');
Route::get('user/form/management', [UserController::class, 'formManagement'])->middleware('auth');
Route::get('user/management', [UserController::class, 'getPerCompanyGroup'])->middleware('auth');
Route::put('user/reset-password/{id}', [UserController::class, 'resetPassword'])->middleware('auth');

# Terkait seting akses user
Route::get('/setting/access', [AccessRulesController::class, 'index'])->middleware('auth');

Route::get('/version', function () {
    return app()->version();
});

Route::group(['middleware' => 'cors'], function () {
    Route::middleware('auth')->group(function () {
        Route::get('actionlogout', [LoginController::class, 'actionlogout'])->name('actionlogout');

        # Terkait Company Group
        Route::prefix('company')->group(function () {
            Route::get('form', [CompanyGroupController::class, 'index']);
            Route::get('management-form', [CompanyGroupController::class, 'form']);
            Route::put('management-form/{id}', [CompanyGroupController::class, 'updateBranch']);
            Route::get('', [CompanyGroupController::class, 'search']);
            Route::post('', [CompanyGroupController::class, 'save']);
            Route::put('{id}', [CompanyGroupController::class, 'update']);
            Route::get('access/{id}', [CompanyGroupController::class, 'loadByNickName']);
            Route::post('access', [CompanyGroupController::class, 'saveAccess']);
            Route::delete('access/{id}', [CompanyGroupController::class, 'deleteAccess']);
        });

        # Terkait Company Group
        Route::prefix('payment-account')->group(function () {
            Route::post('form', [CompanyGroupController::class, 'savePaymentAccount']);
            Route::get('', [CompanyGroupController::class, 'getPaymentAccountCompanyBranch']);
            Route::delete('form/{id}', [CompanyGroupController::class, 'deletePaymentAccountCompanyBranch']);
        });

        # Terkait Usage Master
        Route::prefix('usage')->group(function () {
            Route::get('form', [UsageController::class, 'index']);
            Route::post('import', [UsageController::class, 'importFromAnotherCompany']);
            Route::get('', [UsageController::class, 'search']);
            Route::post('', [UsageController::class, 'simpan']);
            Route::put('{id}', [UsageController::class, 'update']);
            Route::post('searchAPI', [UsageController::class, 'searchAPI']);
        });

        # Terkait Harga Jarak
        Route::prefix('distance-price')->group(function () {
            Route::get('form', [DistancePriceController::class, 'index']);
            Route::post('import', [DistancePriceController::class, 'importFromAnotherCompany']);
            Route::get('', [DistancePriceController::class, 'search']);
            Route::post('', [DistancePriceController::class, 'simpan']);
            Route::put('{id}', [DistancePriceController::class, 'update']);
        });

        # Terkait SPK , Surat Perintah Kerja
        Route::prefix('SPK')->group(function () {
            Route::post('', [DeliveryController::class, 'saveSPK']);
            Route::get('', [DeliveryController::class, 'searchSPK']);
            Route::put('{id}', [DeliveryController::class, 'updateSPK']);
            Route::delete('{id}', [DeliveryController::class, 'deleteSPK']);
            Route::put('delivery-order/{id}', [DeliveryController::class, 'getSPKByDO']);
            Route::put('submit/{id}', [DeliveryController::class, 'submitSPK']);
        });

        # Terkait Supplier Master
        Route::prefix('supplier')->group(function () {
            Route::get('form', [SupplierController::class, 'index']);
            Route::post('import', [SupplierController::class, 'importFromAnotherCompany']);
            Route::get('', [SupplierController::class, 'search']);
            Route::post('searchAPI', [SupplierController::class, 'searchAPI']);
            Route::post('', [SupplierController::class, 'simpan']);
            Route::put('{id}', [SupplierController::class, 'update']);
        });

        # Terkait Chart of Account Master
        Route::prefix('coa')->group(function () {
            Route::get('form', [CoaController::class, 'index']);
            Route::post('import', [CoaController::class, 'importFromAnotherCompany']);
            Route::get('', [CoaController::class, 'search']);
            Route::post('searchAPI', [CoaController::class, 'searchAPI']);
            Route::post('', [CoaController::class, 'simpan']);
            Route::put('{id}', [CoaController::class, 'update']);
        });

        # Terkait Chart of Account Master
        Route::prefix('condition')->group(function () {
            Route::get('form', [ConditionController::class, 'index']);
            Route::post('import', [ConditionController::class, 'importFromAnotherCompany']);
            Route::get('search', [ConditionController::class, 'search']);
            Route::post('', [ConditionController::class, 'simpan']);
            Route::put('{id}', [ConditionController::class, 'update']);
            Route::delete('{id}', [ConditionController::class, 'delete']);
            Route::get('', [QuotationController::class, 'getAllCondition'])->middleware('auth');
        });

        # Terkait Unit of Measurement Master
        Route::prefix('uom')->group(function () {
            Route::get('form', [MeasurementController::class, 'index']);
            Route::post('import', [MeasurementController::class, 'importFromAnotherCompany']);
            Route::get('', [MeasurementController::class, 'search']);
            Route::post('', [MeasurementController::class, 'simpan']);
            Route::put('{id}', [MeasurementController::class, 'update']);
        });

        # Terkait Item Master
        Route::prefix('item')->group(function () {
            Route::get('form', [ItemController::class, 'index']);
            Route::get('formAPI', [ItemController::class, 'getItemForIndex']);
            Route::post('getListCoasAPI', [ItemController::class, 'getListCoas']);
            Route::post('import', [ItemController::class, 'importFromAnotherCompany']);
            Route::get('', [ItemController::class, 'search']);
            Route::post('', [ItemController::class, 'simpan']);
            Route::put('{id}', [ItemController::class, 'update']);
            Route::post('searchAPI', [ItemController::class, 'searchAPI']);
            Route::post('searchAPITBL', [ItemController::class, 'searchAPITBL']);
            Route::post('searchAPIStockAndPriceOnly', [ItemController::class, 'searchAPIStockAndPriceOnly']);
            Route::get('getLatestItemServiceCode', [ItemController::class, 'getLatestItemServiceCode']);
        });

        # Terkait Location Master
        Route::prefix('location')->group(function () {
            Route::resource('', locationController::class);
            Route::get('form', [locationController::class, 'index']);
            Route::post('searchAPI', [locationController::class, 'searchAPI']);
        });

        # Terkait Customer Master
        Route::prefix('customer')->group(function () {
            Route::get('form', [CustomerController::class, 'index']);
            Route::post('import', [CustomerController::class, 'importFromAnotherCompany']);
            Route::get('file/{id}', [CustomerController::class, 'showFile']);
            Route::get('', [CustomerController::class, 'search']);
            Route::post('searchAPI', [CustomerController::class, 'searchAPI']);
            Route::post('', [CustomerController::class, 'simpan']);
            Route::post('file/{id}', [CustomerController::class, 'changeFile']);
            Route::put('{id}', [CustomerController::class, 'update']);
        });

        #Terkait Approval
        Route::prefix('approval')->group(function () {
            Route::get('notifications', [HomeController::class, 'notifications']);
            Route::get('notifications/top-user', [HomeController::class, 'TopUserNotifications']);
            Route::get('notificationsAPI/top-user', [HomeController::class, 'newDirNotif']);
            Route::get('quotation', [QuotationController::class, 'notifications']);
            Route::get('purchase-request', [PurchaseController::class, 'notifications']);
            Route::get('purchase-order', [PurchaseController::class, 'notificationsPO']);
            Route::get('sales-order-draft', [ReceiveOrderController::class, 'notificationsDraft']);
            Route::get('spk', [DeliveryController::class, 'notificationsSPK']);
            Route::get('form/quotation', [QuotationController::class, 'formApproval']);
            Route::get('form/purchase-request', [PurchaseController::class, 'formApproval']);
            Route::get('form/purchase-order', [PurchaseController::class, 'formApprovalPO']);
            Route::get('form/spk', [DeliveryController::class, 'formApprovalSPK']);
            Route::put('approve-spk/{id}', [DeliveryController::class, 'approveSPK']);
        });

        # Terkait Delivery
        Route::prefix('delivery')->group(function () {
            Route::get('form', [DeliveryController::class, 'index']);
            Route::get('unconfirmed-form', [DeliveryController::class, 'formUnconfirmed']);
            Route::post('unconfirmed', [DeliveryController::class, 'unconfirmed']);
            Route::post('confirm', [DeliveryController::class, 'confirmOutgoing']);
            Route::get('outstanding-warehouse', [DeliveryController::class, 'outstandingWarehouse']);
            Route::post('outstanding-warehouse-api', [DeliveryController::class, 'outstandingWarehouseAPI']);
            Route::get('outstanding-warehouse/{id}', [DeliveryController::class, 'outstandingWarehousePerDocument']);
            Route::put('items/{id}', [DeliveryController::class, 'updateDODetail']);
            Route::put('items-actual/{id}', [DeliveryController::class, 'updateDODetailActual']);
            Route::post('', [DeliveryController::class, 'save']);
            Route::post('searchAPI', [DeliveryController::class, 'searchAPI']);
            Route::get('', [DeliveryController::class, 'search']);
            Route::put('{id}', [DeliveryController::class, 'update']);
            Route::get('document/{id}', [DeliveryController::class, 'loadByDocument']);
            Route::post('accessory-items/{id}', [DeliveryController::class, 'saveAccessory']);
            Route::get('accessory-items/{id}', [DeliveryController::class, 'loadAccessoryById']);
            Route::delete('accessory-items/{id}', [DeliveryController::class, 'deleteAccessoryById']);
            Route::put('accessory-items/{id}', [DeliveryController::class, 'updateAccessoryById']);
            Route::get('unreturned', [DeliveryController::class, 'unreturnedItem']);

            Route::delete('{id}', [DeliveryController::class, 'delete']);
        });

        Route::resource('invoice', InvoiceController::class);
        Route::prefix('invoices')->group(function () {
            Route::post('search', [InvoiceController::class, 'search']);
            Route::post('printInvoice', [InvoiceController::class, 'printInvoice']);
            Route::get('printKwitansi/{doc}', [InvoiceController::class, 'printKwitansi']);
            Route::get('printSJ/{doc}', [InvoiceController::class, 'printSJ']);
            Route::get('cekInv', [InvoiceController::class, 'cekKwitansiNo']);
        });

        #Terkait Receive Order
        Route::prefix('receive-order')->group(function () {
            Route::get('form', [ReceiveOrderController::class, 'index']);
            Route::post('', [ReceiveOrderController::class, 'save']);
            Route::post('saveAPI', [ReceiveOrderController::class, 'saveAPI']);
            Route::get('', [ReceiveOrderController::class, 'search']);
            Route::post('searchAPI', [ReceiveOrderController::class, 'searchApi']);
            Route::put('{id}', [ReceiveOrderController::class, 'update']);
            Route::get('{id}', [ReceiveOrderController::class, 'loadById']);
            Route::get('getData/{id}', [ReceiveOrderController::class, 'getSLOByIDAPI']);
            Route::delete('itemsAPI/{id}', [ReceiveOrderController::class, 'deleteByID']);


            Route::delete('items/{id}', [ReceiveOrderController::class, 'deleteItemById']);
            Route::put('items/{id}', [ReceiveOrderController::class, 'updateItem']);
        });

        Route::prefix('assignment-driver')->group(function () {
            Route::get('form/delivery', [DeliveryController::class, 'formDriverAssignment']);
            Route::get('data/delivery', [DeliveryController::class, 'emptyDriver']);
            Route::put('form/delivery/{id}', [DeliveryController::class, 'assignDriver']);
        });

        Route::prefix('cashier')->group(function () {
            Route::get('form', [CashierController::class, 'index']);
            Route::post('', [CashierController::class, 'save']);
            Route::get('', [CashierController::class, 'search']);
            Route::get('search', [CashierController::class, 'searchHeader']);
        });

        # Terkait Quotation Transaction
        Route::prefix('quotation')->group(function () {
            Route::get('form', [QuotationController::class, 'index']);
            Route::post('', [QuotationController::class, 'save']);
            Route::get('', [QuotationController::class, 'search']);
            Route::post('search', [QuotationController::class, 'search']);
            Route::put('{id}', [QuotationController::class, 'update']);
            Route::get('{id}', [QuotationController::class, 'loadById']);
            Route::get('olid/{id}', [QuotationController::class, 'loadByIdOld']);
            Route::post('quotation-approval', [QuotationController::class, 'loadById']);
            Route::delete('conditions/{id}', [QuotationController::class, 'deleteConditionById']);
            Route::delete('items/{id}', [QuotationController::class, 'deleteItemById']);
            Route::put('items/{id}', [QuotationController::class, 'updateItem']);
            Route::post('items/{id}', [QuotationController::class, 'saveItem']);
        });

        Route::prefix('quotationNew')->group(function () {
            Route::post('saveAPI', [QuotationController::class, 'saveAPI']);
            Route::delete('{id}', [QuotationController::class, 'deleteQuotation']);
        });

        Route::post('quotation-item', [QuotationController::class, 'saveItem']);
        Route::post('quotation-condition', [QuotationController::class, 'saveCondition']);

        #Terkait laporan berupa xls
        Route::prefix('report-form')->group(function () {
            Route::get('item-master', [ItemController::class, 'formReport']);
            Route::get('quotation', [QuotationController::class, 'formReport']);
            Route::get('received-order', [ReceiveOrderController::class, 'formReport']);
            Route::get('maintenance-schedule', [MaintenanceController::class, 'formReport']);
        });

        Route::prefix('report')->group(function () {
            Route::get('item-master', [ItemController::class, 'report']);
            Route::get('quotation', [QuotationController::class, 'report']);
            Route::get('received-order', [ReceiveOrderController::class, 'report']);
            Route::get('stock-status', [InventoryController::class, 'report']);
            Route::get('stock-ledger', [InventoryController::class, 'reportLedger']);
        });

        # Terkait Rejection
        Route::prefix('reject')->group(function () {
            Route::put('quotations/{id}', [QuotationController::class, 'reject']);
            Route::put('purchase-request/{id}', [PurchaseController::class, 'reject']);
            Route::put('purchase-order/{id}', [PurchaseController::class, 'rejectPO']);
        });

        # Terkait Suggest for Revision
        Route::prefix('revise')->group(function () {
            Route::put('quotations/{id}', [QuotationController::class, 'revise']);
            Route::put('purchase-request/{id}', [PurchaseController::class, 'reject']);
            Route::put('purchase-order/{id}', [PurchaseController::class, 'rejectPO']);
        });

        #Terkait laporan berupa Pdf
        Route::prefix('PDF')->group(function () {
            Route::get('quotation/{id}/{conn?}', [QuotationController::class, 'toNewPDF']);

            Route::get('purchase/{type}/{id}/{conn}', [PurchaseController::class, 'toPDFOnDashboard']);
            Route::get('purchase-request/{id}', [PurchaseController::class, 'toPDF']);
            Route::get('purchase-order/{id}', [PurchaseController::class, 'POtoPDF']);
            Route::get('delivery-order/{id}', [DeliveryController::class, 'toPDF']);
            Route::get('SPK/{id}', [DeliveryController::class, 'SPKtoPDF']);
        });

        Route::prefix('approve')->group(function () {
            Route::put('quotations/{id}', [QuotationController::class, 'approve']);
            Route::put('purchase-request/{id}', [PurchaseController::class, 'approve']);
            Route::put('sales-order-draft/{id}', [ReceiveOrderController::class, 'approve']);
            Route::put('purchase-order/{id}', [PurchaseController::class, 'approvePO']);
        });

        Route::prefix('approved')->group(function () {
            Route::get('form/quotation', [QuotationController::class, 'formApproved']);
            Route::get('form/purchase-request', [PurchaseController::class, 'formStatus']);
            Route::get('form/sales-order-draft', [ReceiveOrderController::class, 'formApprovalDraft']);
        });

        # Terkait Purchase Request Transaction
        Route::prefix('purchase-request')->group(function () {
            Route::get('form', [PurchaseController::class, 'index']);
            Route::post('', [PurchaseController::class, 'save']);
            Route::get('', [PurchaseController::class, 'search']);
            Route::put('{id}', [PurchaseController::class, 'update']);
            Route::get('{id}', [PurchaseController::class, 'loadById']);
            Route::delete('items/{id}', [PurchaseController::class, 'deleteItemById']);
        });

        # Terkait Purchase Order Transaction
        Route::prefix('purchase-order')->group(function () {
            Route::get('form', [PurchaseController::class, 'formOrder']);
            Route::post('', [PurchaseController::class, 'savePO']);
            Route::get('', [PurchaseController::class, 'searchPO']);
            Route::post('searchApprovedPO', [PurchaseController::class, 'searchApprovedPO']);
            Route::get('document/{id}', [PurchaseController::class, 'loadPOById']);
            Route::get('approval-document/{id}', [PurchaseController::class, 'loadPOByIdApproval']);
            Route::post('approval-document', [PurchaseController::class, 'loadPOByIdApproval']);
            Route::put('items/{id}', [PurchaseController::class, 'updatePODetail']);
            Route::delete('items/{id}', [PurchaseController::class, 'updatePODetail']);
        });

        # Terkait Sales Order Draft Transaction
        Route::prefix('sales-order-draft')->group(function () {
            Route::get('document/{id}', [ReceiveOrderController::class, 'loadDraftById']);
            Route::get('', [ReceiveOrderController::class, 'searchDraft']);
        });

        # Terkait Branch
        Route::prefix('branch')->group(function () {
            Route::get('form', [BranchController::class, 'index']);
            Route::post('', [BranchController::class, 'save']);
            Route::get('', [BranchController::class, 'search']);
        });

        Route::prefix('confirmation')->group(function () {
            Route::get('form/delivery', [DeliveryController::class, 'formDeliveryConfirmation']);
            Route::put('form/delivery/{id}', [DeliveryController::class, 'confirmDelivery']);
            Route::get('data/delivery', [DeliveryController::class, 'emptyDeliveryDateTime']);
        });

        # Terkait Inventory
        Route::prefix('inventory')->group(function () {
            Route::get('form', [InventoryController::class, 'index']);
            Route::get('ledger-form', [InventoryController::class, 'formLedger']);
            Route::get('status', [InventoryController::class, 'stockStatus']);
            Route::get('ledger', [InventoryController::class, 'stockLedger']);
            Route::get('transferLocForm', [InventoryController::class, 'transferLocForm']);
            Route::post('transferLoc', [InventoryController::class, 'transferLoc']);
            Route::post('saveTransferLocDraft', [InventoryController::class, 'saveTransferLocDraft']);
            Route::post('printHandoverPDF', [InventoryController::class, 'printHandoverPDF']);
            Route::get('viewStockByItemLoc/{item}/{loc}', [InventoryController::class, 'viewStockByItemLoc']);
            Route::prefix('transferRequest')->group(function () {
                Route::post('searchAPI', [transferRequestController::class, 'searchAPI']);
                Route::get('approve/{id}', [transferRequestController::class, 'approveData']);

                Route::resource('', transferRequestController::class);
            });
        });

        # Terkait Receive
        Route::prefix('receive')->group(function () {
            Route::get('form', [ReceiveController::class, 'index']);
            Route::get('form/{id}', [ReceiveController::class, 'loadById']);
            Route::put('form/{id}', [ReceiveController::class, 'update']);
            Route::post('form/{id}', [ReceiveController::class, 'submit']);
            Route::post('', [ReceiveController::class, 'save']);
            Route::post('saveAPI', [ReceiveController::class, 'saveAPI']);
            Route::post('confirmIncoming', [ReceiveController::class, 'confirmIncoming']);
            Route::get('', [ReceiveController::class, 'search']);
            Route::post('searchAPI', [ReceiveController::class, 'searchAPI']);
            Route::get('outstanding-po', [ReceiveController::class, 'outstandingPO']);
            Route::get('outstanding-po/{id}', [ReceiveController::class, 'outstandingPOPerDocument']);
            Route::delete('item/{id}', [ReceiveController::class, 'delete']);
        });

        Route::prefix('receiveBarcode')->group(function () {
            Route::resource('', ReceiveBarcodeController::class);
            Route::post('searchAPI', [ReceiveBarcodeController::class, 'searchAPI']);
            Route::post('printBarcode', [ReceiveBarcodeController::class, 'printBarcode']);
        });

        Route::get('purchase-request-approval/{id}', [PurchaseController::class, 'loadByIdApproval']);
        Route::post('purchase-request-approval', [PurchaseController::class, 'loadByIdApproval']);

        #Terkait Dasbor
        Route::get('dashboard-resource', [HomeController::class, 'supportDashboard']);

        #Terkait Service
        Route::resource('servicesAdmin', ServiceAdminController::class);
        Route::prefix('servicesAdmins')->group(function () {
            Route::post('search', [ServiceAdminController::class, 'search']);
            Route::put('updateByDet/{id}', [ServiceAdminController::class, 'updateByDet']);
            Route::put('updateDetByIDHead/{id}', [ServiceAdminController::class, 'updateDetByIDHead']);
            Route::get('printInvoice/{id}', [ServiceAdminController::class, 'printInvoicePDF']);
            Route::get('printPartRequest/{id}', [ServiceAdminController::class, 'printPartRequestPDF']);
            Route::get('viewUnapproveMgr', [ServiceAdminController::class, 'viewUnapproveMgr']);
            Route::get('viewUnapproveMgrDet/{id}', [ServiceAdminController::class, 'viewUnapproveDetail']);
            Route::get('listUnapproveMgr', [ServiceAdminController::class, 'showListUnapproveMgr']);
        });

        Route::resource('servicesOPR', ServiceOprController::class);
        Route::prefix('servicesOPRs')->group(function () {
            Route::post('search', [ServiceOprController::class, 'search']);
        });

        Route::prefix('acc')->group(function () {
            Route::get('form', [AccountingIFController::class, 'index']);
            Route::get('glreportform', [AccountingIFController::class, 'glreportform']);
            Route::get('journalreportform', [AccountingIFController::class, 'journalreportform']);
            Route::post('exportGLReport', [AccountingIFController::class, 'exportGLReport']);
            Route::post('exportJournalReport', [AccountingIFController::class, 'exportJournalReport']);
            Route::post('searchAPI', [AccountingIFController::class, 'searchAPI']);
            Route::get('submitClosing/{date}', [AccountingIFController::class, 'submitClosing']);

            Route::prefix('journal')->group(function () {
                Route::post('searchAPI', [AccountingJournalController::class, 'searchAPI']);
                Route::resource('', AccountingJournalController::class);
            });
        });
        Route::prefix('pos')->group(function () {
            Route::resource('', POSController::class);
        });

        Route::prefix('payroll')->group(function () {
            // media related routes
            Route::post('/media', [HelperController::class, 'storeMedia'])->name('storeMedia');
            Route::get('/media/showMediaFromTempFolder/{name}', [HelperController::class, 'showMediaFromTempFolder'])->name('showMediaFromTempFolder');
            Route::post('/media/base64EncodedData', [HelperController::class, 'storeMediaBase64'])->name('storeMediaBase64');
            Route::post('/media/removeMediaFromTempFolder/{name}', [HelperController::class, 'removeMediaFromTempFolder'])->name('removeMediaFromTempFolder');
            Route::post('/media/removeMedia/{model}/{model_id}/{collection}', [HelperController::class, 'removeMedia'])->name('removeMedia');
            Route::post('/confirm/password', [HelperController::class, 'confirmPassword'])->name('confirmPassword');

            // Dashboard Routes
            Route::get("/dashboard", [DashboardController::class, 'dashboard'])->name('dashboard');

            //admin profile route
            Route::get("/profile", [ProfileController::class, 'index'])->name('profile.index');
            Route::post("/profile", [ProfileController::class, 'update'])->name('profile.update');

            //position routes
            Route::resource('position', PositionController::class);
            Route::post('getdata/position', [PositionController::class, 'getData'])->name('position.getData');
            Route::post('all-delete/position/', [PositionController::class, 'massDelete'])->name('position.massDelete');

            //deduction routes
            Route::resource('deduction', DeductionController::class);
            Route::post('getdata/deduction', [DeductionController::class, 'getData'])->name('deduction.getData');
            Route::post('all-delete/deduction/', [DeductionController::class, 'massDelete'])->name('deduction.massDelete');

            //schedule routes
            Route::resource('schedule', ScheduleController::class);
            Route::post('getdata/schedule', [ScheduleController::class, 'getData'])->name('schedule.getData');
            Route::post('all-delete/schedule/', [ScheduleController::class, 'massDelete'])->name('schedule.massDelete');

            //employee routes
            Route::resource('employee', EmployeeController::class);
            Route::post('getdata/employee', [EmployeeController::class, 'getData'])->name('employee.getData');
            Route::post('get-employees-data', [EmployeeController::class, 'getDataTable'])->name('employee.getDataTable');
            Route::post('all-delete/employee/', [EmployeeController::class, 'massDelete'])->name('employee.massDelete');

            //overtime routes
            Route::resource('overtime', OvertimeController::class);
            Route::post('getdata/overtime', [OvertimeController::class, 'getData'])->name('overtime.getData');
            Route::post('get-overtime-data', [OvertimeController::class, 'getDataTable'])->name('overtime.getDataTable');
            Route::post('all-delete/overtime/', [OvertimeController::class, 'massDelete'])->name('overtime.massDelete');

            //cashadvance routes
            Route::resource('cashadvance', CashAdvanceController::class);
            Route::post('getdata/cashadvance', [CashAdvanceController::class, 'getData'])->name('cashadvance.getData');
            Route::post('get-cashadvance-data', [CashAdvanceController::class, 'getDataTable'])->name('cashadvance.getDataTable');
            Route::post('all-delete/cashadvance/', [CashAdvanceController::class, 'massDelete'])->name('cashadvance.massDelete');

            //attendance routes
            Route::resource('attendance', AttendanceController::class);
            Route::post('getdata/attendance', [AttendanceController::class, 'getData'])->name('attendance.getData');
            Route::post('get-attendance-data', [AttendanceController::class, 'getDataTable'])->name('attendance.getDataTable');
            Route::post('all-delete/attendance/', [AttendanceController::class, 'massDelete'])->name('attendance.massDelete');

            //payroll routes
            Route::get('payroll', [PayrollController::class, 'index'])->name('payroll.index');
            Route::post('getdata/payroll', [PayrollController::class, 'getData'])->name('payroll.getData');
            Route::post('get-payroll-data',  [PayrollController::class, 'getDataTable'])->name('payroll.getDataTable');
            Route::post('payroll/download-payroll', [PayrollController::class, 'payrollExportPDF'])->name('payroll.payrollExportPDF');
            Route::post('payroll/download-payslip', [PayrollController::class, 'payslipExportPDF'])->name('payroll.payslipExportPDF');
        });
    });
});

Route::get('tribinapp/{path?}', function () {
    return view('tribinapp');
})->where('any', '.*');



#Terkait config
Route::get('ACL/database', function () {
    $ConnectionList = [];
    $Configs = Config::get('database');
    foreach ($Configs['connections'] as $key => $value) {
        if (str_contains($key, 'jos')) {
            $ConnectionList[] = [$key => $value];
        }
    }
    return ['data' => $ConnectionList];
});
