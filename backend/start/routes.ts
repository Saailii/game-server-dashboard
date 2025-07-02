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
const AllyAuthsController = () => import('#controllers/ally_auths_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import GamemodesController from '#controllers/gamemodes_controller'

router.post('register', [UsersController, 'create'])
router.post('login', [UsersController, 'login'])

router.get('me', [UsersController, 'me']).middleware(middleware.auth())

router.get('auth/github/callback', [AllyAuthsController, 'github'])
router.get('/auth/github', async ({ ally }) => {
  return ally.use('github').redirect()
})

router.post('game-compose', [GamemodesController, 'store']).middleware(middleware.auth())
// .middleware(AuthMiddleware)
