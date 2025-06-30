// import type { HttpContext } from '@adonisjs/core/http'

import User from "#models/user";
import { UserService } from "#services/user_service";
import { HttpContext } from "@adonisjs/core/http";
import { ResponseStream } from "@adonisjs/core/types/http";
import { Http2ServerResponse } from "http2";

export default class UsersController {

    index() {

    }

    async create(ctx: HttpContext) {

        const { email, password, full_name, role  } = ctx.request.body()

        if (!email || !password) {
            return ctx.response.status(402).send({error: "No user or email provided"})
        }

        const existingUser = await User.findBy('email', email)
        console.log(existingUser);
        


        if (existingUser) {
            return ctx.response.status(409).send("User already exist")
        }

        User.create({
            email,
            password
        })
        
        return ctx.response.status(201).send("User created Successfully")
    }


    async login() {
        
    }
}