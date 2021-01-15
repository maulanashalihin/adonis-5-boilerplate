/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('welcome')


Route.on('/login').render('auth/login')
Route.on('/register').render('auth/create-account') 
Route.post('register', 'AuthController.register')
Route.post('login', 'AuthController.login')
Route.post('logout', 'AuthController.logout')

Route.group(() => {
    Route.get('/dashboard','HomeController.index');
    Route.get('/profile','AuthController.profile');
    Route.post('/change-profile','AuthController.changePassword');
    
}).middleware(['auth'])
