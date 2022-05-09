import PokeBallBattle from './PokeBallBattle'

let UserPokeBall = ({displayTeam, pokeBall, userTeam}) => {

    let renderPokeBalls = () => (
        userTeam.map(() => <PokeBallBattle pokeBall={pokeBall}/>)
    )

    let renderTeam = () => (
        userTeam.map((p) => <img alt='pokemon'/>)
    )

    return (
        <div className="trainer-battle-pokeball-container">
            {displayTeam === false ? 
                renderPokeBalls()
            : 
                renderTeam()
            // pokeTeam.map(pokemon => {
            //     return (<img style={pokemon.pokemon_id === userPokemon.id ? {border: '1px solid yellow', height:'56px', width:'60px'} : {height:'56px', width: '60px'}} className="poke-ball-battle-pokemon" src={pokemonData.find(poke => poke.id === pokemon.pokemon_id).front_image} onClick={sendOutPokemon}/>)
            // })
        }
        </div> 
    )
}

export default UserPokeBall