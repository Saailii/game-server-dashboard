import vine from '@vinejs/vine'

export const createOrUpdateGamemode = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(35),
    gameName: vine.string().minLength(3).maxLength(35),
    docker_name: vine.string(),
  })
)
