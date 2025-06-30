// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from "@adonisjs/core/http";

export default class GameComposesController {



    async create({ response, request}: HttpContext) {
        return response.status(200).send({message: "testawdawdawdawd"})
    }
}