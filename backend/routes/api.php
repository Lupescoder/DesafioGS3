<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::post('/users/login', [UserController::class, 'login']);
Route::middleware('auth:api')->apiResource('/users', UserController::class);
Route::middleware('auth:api')->apiResource('/profiles', ProfileController::class);

