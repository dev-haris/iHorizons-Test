import { setupServer } from "msw/node"
import { rest, RestRequest, ResponseComposition, RestContext } from "msw"

export const handlers = [
  rest.get(
    process.env.REACT_APP_API_BASE_URL + "/:name",
    (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
      const { name } = req.params
      if (name === "bulbasaur") {
        return res(
          ctx.json({
            name: "bulbasaur",
            height: 7,
            weight: 69,
            sprites: {
              other: {
                dream_world: {
                  front_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
                },
              },
            },
          }),
        )
      }
      return res(ctx.status(404), ctx.json({ error: "Not Found" }))
    },
  ),
]

export const server = setupServer(...handlers)
