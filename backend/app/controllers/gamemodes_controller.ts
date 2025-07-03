import Gamemode from '#models/gamemode'
import User from '#models/user'
import { createOrUpdateGamemode } from '#validators/gamemode'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'

export default class GamemodesController {
  async index() {
    return await Gamemode.all()
  }

  async store({ request, response, auth }: HttpContext) {
    const { gameName, name } = await request.validateUsing(createOrUpdateGamemode)

    // Trim wasn't working ????
    const nameTrim = name.replaceAll(' ', '')
    const gameNameTrim = gameName.replaceAll(' ', '')

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

    const path = `storage/uploads/${nameTrim}-${cuid()}`

    await dockerComposeFile.move(app.makePath(path), {
      name: `docker-compose.yml`,
    })

    Gamemode.create({
      name: nameTrim,
      gameName: gameNameTrim,
      dockerFilePath: path,
      userId: user.id,
    })

    return response.ok(dockerComposeFile)
  }
  async getOne({ response, request, auth }: HttpContext) {
    const id = request.param('id')

    if (isNaN(id)) {
      return response.badRequest({ error: 'badrequest' })
    }

    const gamemode = await Gamemode.find(id)
    if (!gamemode) {
      return response.notFound({ error: 'Gamemode not found maybe was deleted' })
    }

    const contentFile = fs.readFileSync(`${gamemode.dockerFilePath}/docker-compose.yml`, 'utf8')

    if (!contentFile) {
      return response.notFound('No file founded')
    }

    return { gamemode, contentFile }
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
