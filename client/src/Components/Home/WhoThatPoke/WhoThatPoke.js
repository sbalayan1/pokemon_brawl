import {useState} from 'react'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import TextField  from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './style.css'

let WhoThatPokemon = ({
        pokeBall,
        currentUser, 
        pokemonData, 
        hiddenPokemon, 
        userTrainer, 
        userTrainerPokemon, 
        setUserTrainerPokemon, 
        setCopyUserTrainerPokemon 
    }) => {
    
    const [foundPokemon, setFoundPokemon] = useState(null)
    const [catchPokemon, setCatchPokemon] = useState(false)
    const [throwPoke, setThrowPoke] = useState(false)

    let handleChange = (e) => {
        setFoundPokemon(e.target.value)
    }

    let handleSubmit = (e) => {
        e.preventDefault()

        let pokemonTeam = {
            trainer_id: currentUser.trainer.id, 
            pokemon_id: pokemonData.find(pokemon => pokemon.name === foundPokemon).id,
            team_member: false
        }

        let newPokemon = userTrainer.pokemon.find(p => p.name === foundPokemon)

        if(foundPokemon === hiddenPokemon.name && newPokemon === undefined) {
            setThrowPoke(true)
            setCatchPokemon(true)
            // fetch('api/pokemon_teams', {
            //     method: 'POST', 
            //     headers: {'Content-type':'application/json'},
            //     body: JSON.stringify(pokemonTeam)
            // })

            // setUserTrainerPokemon(userTrainer.pokemon)
            // setCopyUserTrainerPokemon([...userTrainerPokemon, pokemonData.find(pokemon => pokemon.name === foundPokemon).id])
            
        } else {
            alert('You already caught that pokemon!!!')
        }
    }

    let renderFoundPokemonMessage = () => {
        return (foundPokemon === hiddenPokemon.name ? 
            <p>It's {hiddenPokemon.name.charAt(0).toUpperCase() + hiddenPokemon.name.slice(1)}!!!</p>
        :
            null
        )
    }

    let hiddenPokemonImage = () => {
        let setOpacity = foundPokemon !== hiddenPokemon.name ? 0.05 : 1
        return (<img style={{opacity: `${setOpacity}`}} className="pokemon" alt="pokemon" src={hiddenPokemon.front_image}/>)
    }

    let handleReset = () => {
        setThrowPoke(false)
    }

    let renderGuessingCard = () => {
        return foundPokemon !== hiddenPokemon.name ? 
                <>
                    <h1>Who's that Pokemon?</h1>
                    <TextField onChange={handleChange} placeholder="Guess that Pokemon!"/>
                </> 
            :
                <>
                    {throwPoke ? 
                        <>
                            <img className="pokeBall" alt='pokeball' src={pokeBall}/> 
                        </>
                    : 
                        null
                    }
                    <img alt="pokemn" src={hiddenPokemon.front_image}/> 
                    <Button variant="contained" onClick={handleSubmit}>Catch that Pokemon!!!</Button>
                    {throwPoke ? <Button onClick={handleReset}>Reset</Button> : null}
                </>
                
    }

    let renderCaughtCard = () => {
        return catchPokemon === true ? 
            renderGuessingCard()
            // <>
            //     <h1>{`You caught ${foundPokemon}`}</h1>
            //     <img alt="pokemn" src={hiddenPokemon.front_image}/> 
            //     <p>Check your PC to see your new Pokemon!</p>
            // </>
        :
            renderGuessingCard()
    }
    


    return (
        <div className="home-container">
            <Card className="whos-that-pokemon-card">
                <div className='pokemon-img-container'>
                    {renderFoundPokemonMessage()}
                    {hiddenPokemonImage()}
                </div>
            </Card>

            <Card className="game-description-card">
                {renderCaughtCard()}
            </Card>
        </div>
    )
}

export default WhoThatPokemon