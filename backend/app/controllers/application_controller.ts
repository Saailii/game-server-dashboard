import Application from '#models/application'
import User from '#models/user'
import { createOrUpdateApplication } from '#validators/application'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'

export default class ApplicationController {
  async index() {
    return await Application.all()
  }

  async store({ request, response, auth }: HttpContext) {
    const { appName, name } = await request.validateUsing(createOrUpdateApplication)

    // Trim wasn't working ????
    const nameTrim = name.replaceAll(' ', '')
    const appNameTrim = appName.replaceAll(' ', '')

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

    Application.create({
      name: nameTrim,
      appName: appNameTrim,
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

    const application = await Application.find(id)
    if (!application) {
      return response.notFound({ error: 'Application not found maybe was deleted' })
    }

    const contentFile = fs.readFileSync(`${application.dockerFilePath}/docker-compose.yml`, 'utf8')

    if (!contentFile) {
      return response.notFound('No file founded')
    }

    return { application, contentFile }
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
