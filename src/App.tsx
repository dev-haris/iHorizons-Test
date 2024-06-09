import * as React from "react"
import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { useAllPokemonsQuery } from "./services/pokemon"
import type { Pokemon } from "./types/pokemonTypes"
import PokemonDetails from "./app/components/PokemonDetails"
import "./App.css"

function capitalizeFirstLetter(string: String) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function App() {
  const { data, error, isLoading } = useAllPokemonsQuery("")
  const [showDetails, setShowDetails] = useState(false)
  const [pkName, setpkName] = useState("")

  const toggleState = () => {
    setShowDetails(!setShowDetails)
  }

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        !showDetails ? (
          <>
            <h1 className="Pokemon">PokeReact</h1>
            <ul>
              {data?.results.map((pokemon: Pokemon) => (
                <div
                  className="PokemonName"
                  key={pokemon.name}
                  onClick={e => {
                    setShowDetails(true)
                    setpkName(pokemon.name)
                  }}
                >
                  {capitalizeFirstLetter(pokemon.name)}
                </div>
              ))}
            </ul>
          </>
        ) : (
          <>
            <PokemonDetails
              pokemonName={pkName}
              toggleState={toggleState}
            ></PokemonDetails>
          </>
        )
      ) : null}
    </div>
  )
}
