import {useState, useEffect} from 'react'

let OpponentCard = ({fetchTeam, renderPokeBalls, opponentTrainer, userDamage, opponentPokemon, setOpponentPokemon, healthMovePP, setHealthMovePP, seedHealthMovePP}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [opponentTeam, setOpponentTeam] = useState(null)

    useEffect(() => {
        fetchTeam(opponentTrainer).then(data => {
            console.log(data[0])
            setOpponentPokemon(data[0])
            setOpponentTeam(data)
            seedHealthMovePP(data[0].moves, data[0], 'opponent')
            setIsLoaded(true)
            console.log('rendering opponent card')
        })
    }, [opponentTrainer])

    let renderOpponent = () => {
        return (
            <div className="zone-container" >
                <div className="opponent-decision-making-container">
                    <div className="trainer-battle-pokeball-container">
                        {renderPokeBalls(opponentTeam)}
                    </div>
                    <div className="stats-card">
                        <div className="hp-card">
                            <p style={userDamage > 0 ? {backgroundColor:'red', marginLeft:'5px'}: {marginLeft:'5px'}} >HP: {opponentPokemon.stats.hp}</p>
                            <p>LVL: {opponentPokemon.level}</p>
                        </div>
                        <div className="attack-card">
                            <p style={{marginLeft:'5px'}}><small>ATK: {opponentPokemon.stats.attack}</small></p>
                            <p><small>DEF: {opponentPokemon.stats.defense}</small></p>
                            <p><small>SP ATK: {opponentPokemon.stats['special-attack']}</small></p>
                            <p><small>SP DEF: {opponentPokemon.stats['special-defense']}</small></p>
                            <p><small>SPD: {opponentPokemon.stats.speed}</small></p>
                        </div>
                    </div>
                    <img className="zone-image-card" src={opponentPokemon.front_image} alt="opponent-pokemon-image"/> 
                </div>
            </div>
        )
    }

    return isLoaded === true ? renderOpponent() : null
}

export default OpponentCard