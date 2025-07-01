import User from '#models/user'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthCookieMiddleware {
  async handle({ request }: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
      const token = request.cookie('token')
      

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}