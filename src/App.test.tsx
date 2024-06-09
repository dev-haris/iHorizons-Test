import { rest } from "msw"
import { screen } from "@testing-library/react"
import { server } from "./test/server/index"
import { renderWithProviders } from "./test/test-utils"
import App from "./App"

describe("App", () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it("handles good response", async () => {
    renderWithProviders(<App />)

    expect(screen.getByText("Loading...")).toBeInTheDocument()

    await screen.findByRole("heading", { name: /bulbasaur/i })

    const img = screen.getByRole("img", {
      name: /bulbasaur/i,
    }) as HTMLImageElement

    expect(img.src).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
    )
  })

  it("handles error response", async () => {
    // Force MSW to return an error response
    server.use(
      rest.get(
        process.env.REACT_APP_API_BASE_URL,
        (req: any, res: any, ctx: any) => {
          return res(ctx.status(500))
        },
      ),
    )

    renderWithProviders(<App />)

    expect(screen.getByText("Loading...")).toBeInTheDocument()

    await screen.findByText("Oh no, there was an error")
  })
})
