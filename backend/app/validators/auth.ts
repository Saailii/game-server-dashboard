import vine from '@vinejs/vine'



export const RegisterAuthValidator = vine.compile(
    vine.object({
        email: vine.string().email().normalizeEmail().unique(async (db, value) => {
            const match = await db.from('users').select('id').where('email', value).first()
            return !match
        }),
        password: vine.string().minLength(8).maxLength(255),
        first_name: vine.string().minLength(3).maxLength(40).nullable()
    })
)


export const LoginAuthValidator = vine.compile(
    vine.object({
        email: vine.string().email().normalizeEmail().maxLength(255),
        password: vine.string().minLength(4).maxLength(255),
    })
)
