import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'


let Home = ({currentUser, setCurrentUser, pokemonData, setPokemonData, hiddenPokemon, userTrainer, setUserTrainer, opponentTrainer, setOpponentTrainer}) => {
    const history = useHistory()
    const [foundPokemon, setFoundPokemon] = useState(null)
    const [catchPokemon, setCatchPokemon] = useState(null)


    let handleBattle = () => {
        history.push('/battle')
    }

    let handleTeam = () => {
        history.push('/make_a_team')
    }

    let handleTrainer = () => {
        history.push('/create_a_trainer')
    }

    let handleChange = (e) => {
        setFoundPokemon(e.target.value)
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        setCatchPokemon(true)
        let pokemonTeam = {
            trainer_id: currentUser.trainer.id, 
            pokemon_id: pokemonData.find(pokemon => pokemon.name === foundPokemon).id,
            team_member: true
        }

        if(foundPokemon === hiddenPokemon.name) {
            fetch('http://localhost:3000/pokemon_teams', {
                method: 'POST', 
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(pokemonTeam)
            })
        }
    }

    // let handleSubmit = (e) => {
    //     e.preventDefault()
    //     if(foundPokemon === hiddenPokemon.name) {
    //         console.log(`It's ${hiddenPokemon.name}`)
    //     }
    // }

    useEffect(() => {
        fetch('http://localhost:3000/trainers')
        .then(res => res.json())
        .then(data => {
            if (currentUser !== null) {
                setUserTrainer(data.find(trainer=> trainer.user_id === currentUser.id))
                let opponentTrainers = data.filter(trainer => trainer.user_id !== currentUser.id)
                setOpponentTrainer(opponentTrainers[Math.floor(Math.random() * opponentTrainers.length)])
            }
        })
    },[])

    return (
        <div className="home-container">
            <div className="home-battle-container">
                <div className="home-battle-description-card">
                    <h2>Pokemon Brawl is a Pokemon Battle Simulator</h2>
                    <p><small>Play Pokémon battles online! Play with randomly generated teams, or build your own!</small></p>
                    <button onClick={handleBattle}>Battle</button>
                </div>
                <div className="home-image-card">
                    <img className="home-image-card" src={pokemonData[8].front_image} alt="pokemon-image"/>
                </div>
            </div>
            <div className="home-build-team-create-trainer-container">
                <div className="home-battle-description-card">
                    <img className="home-image-thumbnail" src={pokemonData[79].front_image}  alt="pokemon-image"/>
                    <button onClick={handleTeam}>Build my team</button>
                </div>
                <div className="home-battle-description-card">
                    <img className="home-image-thumbnail" src={pokemonData[150].front_image}  alt="pokemon-image"/>
                    <button onClick={handleTrainer}>Create a trainer</button>
                </div>
            </div>
            <div className="who-that-pokemon-container-home">
                <div className="who-that-pokemon-card">
                    <div className="format-card">
                        {foundPokemon !== hiddenPokemon.name ? null : <p>It's {hiddenPokemon.name.charAt(0).toUpperCase() + hiddenPokemon.name.slice(1)}!!!</p>}
                        {foundPokemon !== hiddenPokemon.name ? <img className="who-that-pokemon-image" style={{opacity:'0.05'}} src={hiddenPokemon.front_image} alt='pokemon-image'/> : <img className="who-that-pokemon-image" src={hiddenPokemon.front_image} alt='pokemon-image'/>}
                    </div>
                </div>
                {catchPokemon === null ? 
                    <div className="home-battle-description-card">
                        <h1>Who's that Pokemon?</h1>
                        <input onChange={handleChange}/>
                        <button onClick={handleSubmit}>Catch that Pokemon!!!</button>
                    </div>
                :
                    <div className="home-battle-description-card">
                        <h1>You caught {foundPokemon}!!</h1>
                        <img className="who-that-pokemon-image" src={hiddenPokemon.front_image} alt='pokemon-image'/>
                        <p>Check your PC to see your new Pokemon!</p>
                    </div>
                    
                }

            </div>
            <div className="home-pokemon-description-container">
                <div className="home-pokemon-description-card">
                    <img className="home-image-thumbnail" src={pokemonData[51].front_image}  alt="pokemon-image"/>
                    <p>{pokemonData[51].name.charAt(0).toUpperCase() + pokemonData[51].name.slice(1)}</p>
                    <p><small>{pokemonData[51].description}</small></p>
                </div>
                <div className="home-pokemon-description-card">
                    <img className="home-image-thumbnail" src={pokemonData[102].front_image}  alt="pokemon-image"/>
                    <p>{pokemonData[102].name.charAt(0).toUpperCase() + pokemonData[102].name.slice(1)}</p>
                    <p><small>{pokemonData[102].description}</small></p>
                </div>
                <div className="home-pokemon-description-card">
                    <img className="home-image-thumbnail" src={pokemonData[125].front_image}  alt="pokemon-image"/>
                    <p>{pokemonData[125].name.charAt(0).toUpperCase() + pokemonData[125].name.slice(1)}</p>
                    <p><small>{pokemonData[125].description}</small></p>
                </div>
            </div>
            <div className="footer">Copyright 2021 - SeanB</div>
        </div>
    )
}

export default Home