/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/


const UsersController = () => import('#controllers/users_controller')
const GameComposeController = () => import('#controllers/game_composes_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.post('register', [UsersController, 'create'])
router.post('login', [UsersController, 'login'])
router.get('game-compose', [GameComposeController, 'create']).middleware(middleware.auth())

// .middleware(AuthMiddleware)