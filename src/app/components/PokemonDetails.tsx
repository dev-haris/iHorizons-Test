import type * as React from "react"
import { Button, ListGroup } from "react-bootstrap"
import { useGetPokemonByNameQuery } from "../../services/pokemon"
import "./Pokemon.css"

// Type definition for props
interface PokemonDetailsProps {
  pokemonName: string
  toggleState: () => void
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const PokemonDetails: React.FC<PokemonDetailsProps> = props => {
  console.log("props.pokemonName ==> ", props.pokemonName)
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery(props.pokemonName)

  console.log("data ==> ", data)

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h1 className="Pokemon">{capitalizeFirstLetter(data.name)}</h1>
          <div className="PokemonDetails">
            <img
              className="pokemonImage"
              width={100}
              src={data.sprites.other.dream_world.front_default}
              alt={data.name}
            />
            <ListGroup>
              <ListGroup.Item>
                Name: {capitalizeFirstLetter(data.name)}
              </ListGroup.Item>
              <ListGroup.Item>Height: {data.height}</ListGroup.Item>
              <ListGroup.Item>Weight: {data.weight}</ListGroup.Item>
            </ListGroup>
          </div>

          <Button
            className="m-4"
            onClick={() => {
              props.toggleState()
            }}
          >
            Go Back
          </Button>
        </>
      ) : null}
    </div>
  )
}

export default PokemonDetails
