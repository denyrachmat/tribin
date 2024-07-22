<?php

use App\Http\Controllers\AccessRulesController;
use App\Http\Controllers\API\OutgoingController;
use App\Http\Controllers\ConditionController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\ServiceAdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });



# Terkait API User Login
Route::put('/user/{id}', function (Request $request, $id) {
    return $id;
});

Route::get('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
    return ['message' => 'ok logout'];
})->middleware('auth:sanctum');

Route::group(['prefix' => 'master', 'middleware' => 'api'], function() {
    Route::prefix('item')->group(function () {
        Route::post('searchAPI', [ItemController::class, 'searchAPI']);
    });

    Route::group(['prefix' => 'conditions'], function() {
        Route::get('getdata', [ConditionController::class, 'getData']);
        Route::get('getCompaniesDetail', [ConditionController::class, 'getCompaniesDetail']);
        Route::get('getdataGroup', [ConditionController::class, 'getDataGroup']);
        Route::post('assignGroup', [ConditionController::class, 'assignGroup']);
        Route::delete('deleteDataGroup/{id}', [ConditionController::class, 'deleteDataGroup']);
    });
});

Route::group(['prefix' => 'transaction', 'middleware' => ['api']], function() {
    Route::resource('delivery', OutgoingController::class);
    Route::group(['prefix' => 'quotation'], function() {
        Route::get('view/{id}', [QuotationController::class, 'viewAPI']);
    });
});

# Terkait API Menu
Route::get('/menu', [AccessRulesController::class, 'getMenu'])->middleware('auth:sanctum');
Route::get('/setting/tree', [AccessRulesController::class, 'getMenuForTreeSetting']);
Route::get('/setting/tree/roles', [AccessRulesController::class, 'getAllAccessRoles']);
Route::post('/setting/tree/roles', [AccessRulesController::class, 'setAccess'])->middleware('auth:sanctum');
