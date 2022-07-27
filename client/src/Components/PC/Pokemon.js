let Pokemon = ({pokemonData, pokemon, setTeam, userTrainer, team, setSelected, setTypeCount}) => {

    let addToTeam = () => {
        if (team.length < 6 && team.find(poke => poke.pokemon_id === pokemon.id) === undefined) {
            alert(`You added ${pokemon.name} to your team` )
            fetch(`http://localhost:3000/pokemon_team/${userTrainer.pokemon_teams.find(poke => poke.pokemon_id === pokemon.id).id}`, {
                method: 'PATCH',
                headers: {'Content-type':'application/json'}, 
                body: JSON.stringify({team_member: true})
            })
            
            setTeam(userTrainer.pokemon_teams.filter(pokemon => pokemon.team_member === true))
            let newPoke = userTrainer.pokemon_teams.find(poke => poke.pokemon_id === pokemon.id)
            setTeam([...team, newPoke])

        } else if (team.find(poke => poke.pokemon_id === pokemon.id) !== undefined) {
            alert('You already have that pokemon on your team.')
        } else {
            alert('You already have 6 pokemon in your team. Please remove a pokemon first.')
        }
    }

    //Currently working on selecting a pokemon from the PC and updating the selectedPokemon state. pokemonData consists objects of a name and a url so we can't use the front_image to find the appropriate target. we may need to use a fetch in place to grab the selectedPokemon from the api and update state using the get_pokemon method in the Pokemon models of our backend
    let selectPokemon = (e) => {
        fetch(`/api/pokemon/${e.target.id}`)
        .then(res => res.json())
        .then(data => {setSelected(data)})

        // setTypeCount([...new Map(pokemonData.find(poke => poke.front_image === e.target.src).types.map(type => [type['name'], type])).values()].length)
    }

    return (
        <div className="pc-pokemon-card-single">
            <button className="poke-ball-pc-box-button" onClick={addToTeam}>+</button>
            <img id={pokemon.id} style={{height: '75%', width: '95%'}} className="pokemon-pc-sprite" src={pokemon.front_image} alt="pokemon" onClick={selectPokemon}/>
        </div>
    )
}

export default Pokemon