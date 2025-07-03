// import type { HttpContext } from '@adonisjs/core/http'

import Gamemode from '#models/gamemode'
import { HttpContext } from '@adonisjs/core/http'
import { exec } from 'child_process'
import fs from 'node:fs'

export default class DockerComposesController {
  async start({ response, request, auth }: HttpContext) {
    const id = request.param('id')

    const gamemode = await Gamemode.find(id)

    if (!gamemode) {
      return response.notFound('Gamemode not found maybe deleted ?')
    }

    const output = await startDocker(gamemode.dockerFilePath)
    console.log(output)

    return response.ok(output)
  }
}

async function startDocker(filePath: string) {
  exec(`cd ${filePath} && docker-compose up -d`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(stdout)

    return { stdout, stderr }
  })
}
