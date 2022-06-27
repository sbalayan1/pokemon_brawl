import {useState} from 'react'
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
    const [catchAnimation, setCatchAnimation] = useState({
        throw: false, 
        bounce: false, 
        wiggle: false, 
        catch: false
    })

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
            setCatchAnimation({...catchAnimation, ['throw']: true})
    
            setTimeout(() => {
                setCatchAnimation({...catchAnimation, ['throw']: false, ['bounce']: true})
            }, 1000)

            setTimeout(() => {
                setCatchAnimation({...catchAnimation, ['bounce']: false, ['wiggle']: true})
            }, 2500)

            setTimeout(() => {
                setCatchAnimation({...catchAnimation, ['wiggle']: false, ['catch']: true})
            }, 8000)

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
        return (
            foundPokemon !== null && foundPokemon.toLowerCase() === hiddenPokemon.name ? 
            <p>It's {hiddenPokemon.name.charAt(0).toUpperCase() + hiddenPokemon.name.slice(1)}!!!</p>
        :
            null
        )
    }

    let renderHiddenPokemonImage = () => {
        let setOpacity = foundPokemon !== null && foundPokemon.toLowerCase() !== hiddenPokemon.name ? 0.05 : 1
        return (<img style={{opacity: `${setOpacity}`}} className="pokemon" alt="pokemon" src={hiddenPokemon.front_image}/>)
    }

    let renderGuessingCard = () => {
        return foundPokemon !== hiddenPokemon.name ? 
            <>
                <h1>Who's that Pokemon?</h1>
                <TextField onChange={handleChange} placeholder="Guess that Pokemon!"/>
            </> 
            :
            <>
                {catchAnimation['throw'] ? <img className="thrown-pokeball" alt='pokeball' src={pokeBall} /> : null}
                {catchAnimation['bounce'] ? <img className='bounce-pokeball' src={pokeBall}/> : null}
                {catchAnimation['wiggle'] ? <img className="wiggle-pokeball" src={pokeBall}/> : <img alt="pokemn" src={hiddenPokemon.front_image} />}
                <Button variant="contained" onClick={handleSubmit}>Catch that Pokemon!!!</Button>
            </>           
    }


    let renderCaughtCard = () => {
        return catchAnimation['catch'] ? 
            <>
                <h1>{`You caught ${foundPokemon}`}</h1>
                <img alt="pokemn" src={hiddenPokemon.front_image}/> 
                <p>Check your PC to see your new Pokemon!</p>
            </>
        :
            renderGuessingCard()
    }
    
    return (
        <div className="home-container">
            <Card className="whos-that-pokemon-card">
                <div className='pokemon-img-container'>
                    {renderFoundPokemonMessage()}
                    {renderHiddenPokemonImage()}
                </div>
            </Card>

            <Card className="game-description-card">
                {renderCaughtCard()}
            </Card>
        </div>
    )
}

export default WhoThatPokemon