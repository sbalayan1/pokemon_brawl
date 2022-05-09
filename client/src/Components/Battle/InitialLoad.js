let InitialLoad = ({setInitialBattleLoad, opponentTrainer}) => {
    let opponentTrainers = ['https://archives.bulbagarden.net/media/upload/3/30/RB_Old_man_Back.png','https://archives.bulbagarden.net/media/upload/f/f2/Spr_RG_Burglar.png','https://archives.bulbagarden.net/media/upload/0/09/Spr_RG_Engineer.png','https://archives.bulbagarden.net/media/upload/e/ee/Spr_RG_Erika.png','https://archives.bulbagarden.net/media/upload/d/d7/Spr_RG_Fisherman.png','https://archives.bulbagarden.net/media/upload/a/a1/Spr_RG_Rocket.png','https://archives.bulbagarden.net/media/upload/9/96/Spr_RG_Youngster.png','https://archives.bulbagarden.net/media/upload/1/1e/Spr_RG_Oak.png']

    let randomNumber = Math.floor(Math.random() * opponentTrainers.length)
    let startBattle = () => {
        setInitialBattleLoad(false)
    }

    // let startBattle = () => {
    //     setInitialBattleLoad(false)
        
    //     setUserPokemon(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount].pokemon_id))
    //     setUserPokemonHP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount].pokemon_id).stats[0].hp)
    //     setUserPokemonMove1(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount].pokemon_id).moves[0])
    //     setUserPokemonMove2(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount].pokemon_id).moves[1])
    //     setUserPokemonMove3(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount].pokemon_id).moves[2])
    //     setUserPokemonMove4(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount].pokemon_id).moves[3])
    //     setUserPokemonMove1PP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount].pokemon_id).moves[0].power_points)
    //     setUserPokemonMove2PP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount].pokemon_id).moves[1].power_points)
    //     setUserPokemonMove3PP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount].pokemon_id).moves[2].power_points)
    //     setUserPokemonMove4PP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount].pokemon_id).moves[3].power_points)

    //     setOpponentPokemon(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount].pokemon_id))
    //     setOpponentPokemonMove1(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount].pokemon_id).moves[0])
    //     setOpponentPokemonMove2(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount].pokemon_id).moves[1])
    //     setOpponentPokemonMove3(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount].pokemon_id).moves[2])
    //     setOpponentPokemonMove4(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount].pokemon_id).moves[3])
    //     setOpponentPokemonHP(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount].pokemon_id).stats[0].hp)
    // }

    return (                
        <div className="battle-sfzone-container-load">
            <div className="zone-container" style={{backgroundImage:'url(https://www.models-resource.com/resources/big_icons/22/21700.png)', backgroundSize:'cover', height: '50%'}}>
                <img className="zone-image-card" src={opponentTrainers[randomNumber]} alt="opponent-trainer"/>
            </div>
            <p className="battle-p-tag-load">Trainer {opponentTrainer ? opponentTrainer.name : 'Opponent'} wants to battle!</p>
            <button onClick={startBattle}>Start</button>
        </div>
    )
}

export default InitialLoad