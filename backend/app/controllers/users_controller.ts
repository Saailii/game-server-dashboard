// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { LoginAuthValidator } from '#validators/auth'

import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  index() {}

  async create({ request, response }: HttpContext) {
    const { user } = request.body()

    if (!user.email || !user.password) {
      return response.status(400).send({ error: 'No user or email provided' })
    }

    const existingUser = await User.findBy('email', user.email)
    if (existingUser) {
      return response.status(409).send('User already exist')
    }

    User.create({
      email: user.email,
      password: user.password,
    })
    return response.status(201).send('User created Successfully')
  }

  async login({ response, request }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginAuthValidator)
    const user = await User.verifyCredentials(email, password)

    if (!user) {
      return response.status(404).send({ error: 'User not found' })
    }

    const token = await User.accessTokens.create(user)

    return response.ok({ message: 'Connected', token })
  }

  async logout({ auth, request, response }: HttpContext) {
    const tokenValue = request.header('Authorization')?.split(' ')[1]

    if (!tokenValue) {
      return response.unauthorized({ error: 'Missing token' })
    }

    const user = await auth.getUserOrFail()

    if (!user) {
      return response.unauthorized({ error: 'Invalid token' })
    }

    await auth.use('api').invalidateToken()

    await User.accessTokens.delete(user, auth.user!.currentAccessToken!.identifier)

    return response.ok({ message: 'logged out successfully' })
  }

  async me({ request, response, auth }: HttpContext) {
    if (!(await auth.check())) {
      return response.unauthorized({ error: 'Unauthorized access' })
    }

    return response.ok({ user: auth.user })
  }
}
