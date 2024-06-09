import { http, HttpResponse } from "msw"

const handlers = [
  http.get(
    process.env.REACT_APP_API_BASE_URL + "/bulbasaur",
    (req, res, ctx) => {
      const mockApiResponse = {
        species: {
          name: "bulbasaur",
        },

        sprites: {
          front_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
        },
      }
      return res(ctx.json(mockApiResponse))
    },
  ),
]

export { handlers }
