import vine from '@vinejs/vine'

export const createOrUpdateApplication = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(35),
    appName: vine.string().trim().minLength(3).maxLength(35),
  })
)
