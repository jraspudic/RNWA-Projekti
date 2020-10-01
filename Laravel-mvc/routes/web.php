<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/roles', 'App\Http\Controllers\RoleController@index');
Route::post('/roles', 'App\Http\Controllers\RoleController@store');
Route::delete('/roles/{id}', 'App\Http\Controllers\RoleController@destroy');

Route::get('/patients', 'App\Http\Controllers\PatientController@index');
Route::post('/patients', 'App\Http\Controllers\PatientController@store');
Route::delete('/patients/{id}', 'App\Http\Controllers\PatientController@destroy');