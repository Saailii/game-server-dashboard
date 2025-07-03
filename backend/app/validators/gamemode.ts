import vine from '@vinejs/vine'

export const createOrUpdateGamemode = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(35),
    gameName: vine.string().trim().minLength(3).maxLength(35),
  })
)
