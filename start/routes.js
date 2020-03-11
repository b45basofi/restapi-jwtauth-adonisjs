'use strict'

const Route = use('Route')

Route.on('/').render('index')

// Sessions (session)
Route.get('profile', 'AuthController.getProfile').as('profile').middleware(['auth'])
Route.get('login', 'AuthController.getLogin').as('login')
Route.post('login', 'AuthController.postLogin').as('login')
Route.post('logout', 'AuthController.postLogout').as('logout').middleware(['auth'])

// Basic Auth (basic)
Route.get('profile/basic', 'AuthController.getProfile').as('profileBasicAuth').middleware(['auth:basic'])

// JWT Auth
Route.post('api/jwt/login', 'AuthController.postLoginJwt').as('loginJwt')
Route.post('api/jwt/refresh', 'AuthController.postRefreshTokenJwt').as('refreshTokenJwt').middleware(['auth:jwt'])
Route.post('api/jwt/logout', 'AuthController.postLogoutJwt').as('loginJwt').middleware(['auth:jwt'])
Route.get('api/jwt/profile', 'AuthController.getProfileJwt').as('profileJwt').middleware(['auth:jwt'])
Route.get('api/jwt/customResponse', 'AuthController.getCustomResponseJwt').as('customResponseJwt').middleware(['auth:jwt'])

// CRUD Rest API
Route.group(() => {
    Route.get('students', 'StudentController.index').as('allStudents').middleware(['auth:jwt'])
    Route.get('students/:id', 'StudentController.show').as('Findstudent').middleware(['auth:jwt'])
    Route.post('students', 'StudentController.store').as('createStudent').middleware(['auth:jwt'])
    Route.put('students/:id', 'StudentController.update').as('editStudent').middleware(['auth:jwt'])
    Route.delete('students/:id', 'StudentController.delete').as('deleteStudent').middleware(['auth:jwt'])
}).prefix('api/v1')