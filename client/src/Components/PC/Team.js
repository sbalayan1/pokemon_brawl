let Team = ({pokeBall, pokemon, pokemonData, displayTeam, setDisplayTeam, copyTeam, setTeam, setCopyTeam, userTrainer}) => {

    let handleClick = (e) => {
        setDisplayTeam(!displayTeam)
    }

    let removeFromTeam = (e) => {
        alert(`You removed ${pokemonData.find(poke => poke.id === pokemon.pokemon_id).name} from your team`)
        fetch(`http://localhost:3000/pokemon_team/${pokemon.id}`, {
            method: 'PATCH', 
            headers: {'Content-type': 'Application/json'}, 
            body: JSON.stringify({team_member: false})
        })
        
        setTeam(userTrainer.pokemon_teams.filter(pokemon => pokemon.team_member === true))
        setCopyTeam(copyTeam.filter(poke => poke.pokemon_id !== pokemon.pokemon_id))

    }

    return (
        <div className="poke-ball-card">
            <button className="poke-ball-button" onClick={removeFromTeam}>X</button>
            <img className="pokemon-team-pokeball" src={displayTeam === false ? pokeBall.current : pokemonData.find(pokeData=> pokeData.id === pokemon.pokemon_id).front_image} alt='pokemon' onClick={handleClick}/>
        </div>

    )
}

export default Team