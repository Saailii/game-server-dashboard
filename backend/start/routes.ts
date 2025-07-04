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
const ApplicationController = () => import('#controllers/application_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

//Auth route
router.post('register', [UsersController, 'create'])
router.post('login', [UsersController, 'login'])
router.delete('logout', [UsersController, 'logout']).middleware(middleware.auth())
router.get('me', [UsersController, 'me']).middleware(middleware.auth())

//Auth Oauth2 route
router.get('auth/github/callback', [AllyAuthsController, 'github'])
router.get('/auth/github', async ({ ally }) => {
  return ally.use('github').redirect()
})

//Application Route
router.get('applications', [ApplicationController, 'index'])
router.post('game-compose', [ApplicationController, 'store']).middleware(middleware.auth())
router.delete('application/:id', [ApplicationController, 'delete']).middleware(middleware.auth())
router.get('application/:id', [ApplicationController, 'getOne'])

//Execute docker
router.post('dockercompose/:id', [DockerComposesController, 'start'])
