<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::apiResource('/users', UserController::class);
Route::apiResource('/profiles', ProfileController::class);
