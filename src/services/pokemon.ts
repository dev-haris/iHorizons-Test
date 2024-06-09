import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

console.log("process.env ==> ", process.env)
export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  tagTypes: [],
  endpoints: builder => ({
    //Get Pokemon Details
    getPokemonByName: builder.query({
      query: (name: string) => `pokemon/${name}`,
    }),
    //Get All Pokemon
    allPokemons: builder.query({
      query: () => `pokemon`,
    }),
  }),
})

// Export hooks for usage in functional components
export const { useGetPokemonByNameQuery, useAllPokemonsQuery } = pokemonApi
