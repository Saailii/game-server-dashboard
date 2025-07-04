// import type { HttpContext } from '@adonisjs/core/http'

import Application from '#models/application'
import { HttpContext } from '@adonisjs/core/http'
import { exec } from 'child_process'

export default class DockerComposesController {
  async start({ response, request, auth }: HttpContext) {
    const id = request.param('id')

    const application = await Application.find(id)

    if (!application) {
      return response.notFound('Application not found maybe deleted ?')
    }

    const output = exec(
      `cd ${application.dockerFilePath} && docker-compose up -d`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          return
        }
        console.log(stdout)

        return { stdout, stderr }
      }
    )
    console.log(output)

    return response.ok(output)
  }
}
