// import type { HttpContext } from '@adonisjs/core/http'

import User from "#models/user";
import { UserService } from "#services/user_service";
import { HttpContext } from "@adonisjs/core/http";
import { ResponseStream } from "@adonisjs/core/types/http";
import { Http2ServerResponse } from "http2";

export default class UsersController {

    index() {

    }

    async create({request, response}: HttpContext) {

        const { user } = request.body()

        console.log(request.body());
        
        if (!user.email || !user.password) {
            return response.status(400).send({error: "No user or email provided"})
        }

        const existingUser = await User.findBy('email', user.email)
        if (existingUser) {
            return response.status(409).send("User already exist")
        }

        User.create({
            email: user.email,
            password: user.password
        })
        return response.status(201).send("User created Successfully")
    }


    async login({ response, request }: HttpContext) {
        const { email, password } = request.body()

        const user = await User.verifyCredentials(email, password)

        if (!user) {
            return response.status(404).send({error : "User not found"})
        }

        const token = await User.accessTokens.create(user)

        

        return response.status(200).send({token})

        
    }
}