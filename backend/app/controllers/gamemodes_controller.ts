import Gamemode from '#models/gamemode'
import User from '#models/user'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class GamemodesController {
  async index() {
    return await Gamemode.all()
  }

  async store({ request, response, auth }: HttpContext) {
    const { gameName, name } = request.body()

    const user = await User.findBy('email', auth.user?.email)

    if (!user) {
      return response.notFound({ error: 'user not found with your current email' })
    }

    const dockerComposeFile = request.file('file', {
      size: '2mb',
      extnames: ['yml'],
    })

    if (!dockerComposeFile) {
      return response.badRequest({ error: 'File not uploaded' })
    }

    if (!dockerComposeFile.isValid) {
      return response.badRequest({
        errors: dockerComposeFile.errors,
      })
    }

    const path = `storage/uploads/${name}-${cuid()}`

    await dockerComposeFile.move(app.makePath(path), {
      name: `docker-compose.yml`,
    })

    Gamemode.create({
      name,
      gameName,
      dockerFilePath: path,
      userId: user.id,
    })

    return response.ok(dockerComposeFile)
  }
  async getOne({ response, request, auth }: HttpContext) {
    const id = request.param('id')

    return await Gamemode.find(id)
  }

  async showByGame() {}

  async delete({ response, request, auth }: HttpContext) {
    const user = await User.findBy('email', auth.user?.email)

    if (!user || user) {
      return response.notFound({ error: 'User not found' })
    }

    const gameId = request.param('id')

    console.log(gameId)
  }
}
