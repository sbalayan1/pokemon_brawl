import {useState} from 'react'

let WhoThatPokemon = ({
        currentUser, 
        pokemonData, 
        hiddenPokemon, 
        userTrainer, 
        userTrainerPokemon, 
        setUserTrainerPokemon, 
        setCopyUserTrainerPokemon 
    }) => {

    const [foundPokemon, setFoundPokemon] = useState(null)
    const [catchPokemon, setCatchPokemon] = useState(null)

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

        if(foundPokemon === hiddenPokemon.name && userTrainer.pokemon.find(pokemon => pokemon.name === foundPokemon) === undefined) {
            setCatchPokemon(true)
            fetch('api/pokemon_teams', {
                method: 'POST', 
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(pokemonTeam)
            })

            setUserTrainerPokemon(userTrainer.pokemon)
            setCopyUserTrainerPokemon([...userTrainerPokemon, pokemonData.find(pokemon => pokemon.name === foundPokemon).id])
        } else {
            alert('You already caught that pokemon!!!')
        }
    }

    return (
        <div className="who-that-pokemon-container-home">
            <div className="who-that-pokemon-card">
                <div className="format-card">
                    {foundPokemon !== hiddenPokemon.name ? null : <p style={{marginLeft: '160px'}}>It's {hiddenPokemon.name.charAt(0).toUpperCase() + hiddenPokemon.name.slice(1)}!!!</p>}
                    {foundPokemon !== hiddenPokemon.name ? <img className="who-that-pokemon-image" style={{opacity:'0.05'}} src={hiddenPokemon.front_image} alt='pokemon-image'/> : <img className="who-that-pokemon-image" src={hiddenPokemon.front_image} alt='pokemon-image'/>}
                </div>
            </div>

            {catchPokemon === null? 
                <div className="home-battle-description-card">
                    <h1>Who's that Pokemon?</h1>
                    <input onChange={handleChange} placeholder="Guess that Pokemon!!"/>
                    {foundPokemon !== hiddenPokemon.name? null : <button onClick={handleSubmit}>Catch that Pokemon!!!</button> }
                </div>
            :
                <div className="home-battle-description-card">
                    <h2>You caught {foundPokemon}!!</h2>
                    <img className="who-that-pokemon-image-2" src={hiddenPokemon.front_image} alt='pokemon-image'/>
                    <p>Check your PC to see your new Pokemon!</p>
                </div>
            }
        </div>
    )
}

export default WhoThatPokemon