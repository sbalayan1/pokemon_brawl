let Pokemon = ({pokemonData, pokemon, setTeam, userTrainer, copyTeam, setCopyTeam, setSelectedPokemon, setTypeCount}) => {

    let addToTeam = () => {
        if (copyTeam.length < 6 && copyTeam.find(poke => poke.pokemon_id === pokemon.id) === undefined) {
            alert(`You added ${pokemon.name} to your team` )
            fetch(`http://localhost:3000/pokemon_team/${userTrainer.pokemon_teams.find(poke => poke.pokemon_id === pokemon.id).id}`, {
                method: 'PATCH',
                headers: {'Content-type':'application/json'}, 
                body: JSON.stringify({team_member: true})
            })
            
            setTeam(userTrainer.pokemon_teams.filter(pokemon => pokemon.team_member === true))
            let newPoke = userTrainer.pokemon_teams.find(poke => poke.pokemon_id === pokemon.id)
            setCopyTeam([...copyTeam, newPoke])

        } else if (copyTeam.find(poke => poke.pokemon_id === pokemon.id) !== undefined) {
            alert('You already have that pokemon on your team.')
        } else {
            alert('You already have 6 pokemon in your team. Please remove a pokemon first.')
        }
    }

    let selectPokemon = (e) => {
        setSelectedPokemon(pokemonData.find(poke => poke.front_image === e.target.src))
        setTypeCount([...new Map(pokemonData.find(poke => poke.front_image === e.target.src).types.map(type => [type['name'], type])).values()].length)
    }

    return (
        <div className="pc-pokemon-card-single">
            <button className="poke-ball-pc-box-button" onClick={addToTeam}>+</button>
            <img style={{height: '75%', width: '95%'}} className="pokemon-pc-sprite" src={pokemon.front_image} alt="pokemon" onClick={selectPokemon}/>
        </div>
    )
}

export default Pokemon