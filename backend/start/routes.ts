/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const AllyAuthsController = () => import('#controllers/ally_auths_controller')
const DockerComposesController = () => import('#controllers/docker_composes_controller')
const GamemodesController = () => import('#controllers/gamemodes_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

//Auth route
router.post('register', [UsersController, 'create'])
router.post('login', [UsersController, 'login'])

router.get('me', [UsersController, 'me']).middleware(middleware.auth())

//Auth Oauth2 route
router.get('auth/github/callback', [AllyAuthsController, 'github'])
router.get('/auth/github', async ({ ally }) => {
  return ally.use('github').redirect()
})

//Gamemode Route
router.get('gamemode', [GamemodesController, 'index'])
router.post('game-compose', [GamemodesController, 'store']).middleware(middleware.auth())
router.delete('gamemode/:id', [GamemodesController, 'delete']).middleware(middleware.auth())
router.get('gamemode/:id', [GamemodesController, 'getOne'])

//Execute docker
router.post('dockercompose/:id', [DockerComposesController, 'start'])
