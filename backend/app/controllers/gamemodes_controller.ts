// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'

export default class GamemodesController {
  async index() {}

  async store({ request, response }: HttpContext) {
    const body = request.file('file', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    return response.ok(body)
  }
  async show() {}

  async showByGame() {}
}
