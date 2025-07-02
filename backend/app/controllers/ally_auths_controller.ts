// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import stringHelpers from '@adonisjs/core/helpers/string'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AllyAuthsController {
  async github({ response, ally }: HttpContext) {
    const gh = ally.use('github')

    /**
     * User has denied access by canceling
     * the login flow
     */
    if (gh.accessDenied()) {
      return 'You have cancelled the login process'
    }

    /**
     * OAuth state verification failed. This happens when the
     * CSRF cookie gets expired.
     */
    if (gh.stateMisMatch()) {
      return 'We are unable to verify the request. Please try again'
    }

    /**
     * GitHub responded with some error
     */
    if (gh.hasError()) {
      return gh.getError()
    }

    /**
     * Access user info
     */
    const user = await gh.user()

    const newUser = await User.firstOrCreate(
      { email: user.email },
      {
        email: user.email,
        password: await hash.make(stringHelpers.random(32)),
        fullName: user.nickName,
      }
    )

    const token = await User.accessTokens.create(newUser)

    return { user, token }
  }
}
