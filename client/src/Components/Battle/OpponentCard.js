import PokeBallBattle from './PokeBallBattle'

let OpponentCard = ({}) => {
    return (
        <div className="zone-container" >
            <div className="opponent-decision-making-container">
                <div className="trainer-battle-pokeball-container">
                    {oppPokeTeam.map(() => {
                        return (<PokeBallBattle pokeBall={pokeBall}/>)
                    })}
                </div>
                <div className="stats-card">
                    <div className="hp-card">
                        <p style={userDamage > 0 ? {backgroundColor:'red', marginLeft:'5px'}: {marginLeft:'5px'}} >HP: { opponentPokemonHP}</p>
                        {/* <p>LVL: {opponentPokemon.level}</p> */}
                    </div>
                    <div className="attack-card">
                        {/* <p style={{marginLeft:'5px'}}><small>ATK: {opponentPokemon.stats[0].attack}</small></p>
                        <p><small>DEF: {opponentPokemon.stats[0].defense}</small></p>
                        <p><small>SP ATK: {opponentPokemon.stats[0].sp_attack}</small></p>
                        <p><small>SP DEF: {opponentPokemon.stats[0].sp_defense}</small></p>
                        <p><small>SPD: {opponentPokemon.stats[0].speed}</small></p> */}
                    </div>
                </div>
                {opponentPokemon ? 
                    <img className="zone-image-card" src={opponentPokemon.front_image} alt="opponent-pokemon-image"/> 
                :
                    null
                }
            </div>
        </div>
    )
}

export default OpponentCard