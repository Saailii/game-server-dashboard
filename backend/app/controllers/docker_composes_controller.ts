// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import { exec } from 'child_process'

export default class DockerComposesController {
  async start({ response, request, auth }: HttpContext) {
    const id = request.param('id')

    const output = await startDocker()
    console.log(output)

    return response.ok(output)
  }
}

async function startDocker() {
  exec('cd storage/uploads | ls', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(stdout)

    return { stdout, stderr }
  })
}
