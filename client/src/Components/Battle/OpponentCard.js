import {useState, useEffect} from 'react'
import Paper from '@mui/material/Paper'

let OpponentCard = ({opponentTeam, setOpponentTeam, fetchTeam, renderHP, renderPokeBalls, opponentTrainer, opponentPokemon, setOpponentPokemon, seedHealthMovePP, userAttack}) => {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetchTeam(opponentTrainer).then(teamData => {
            setOpponentPokemon(teamData[0])
            setOpponentTeam(teamData)
            seedHealthMovePP(teamData[0].moves, teamData[0], 'opponent')
            setIsLoaded(true)
            console.log('rendering opponent card')
        })
    }, [])

    let renderOpponent = () => {
        return (
            <Paper className="opponent-battle-container" >
                <div className="trainer-battle-pokeball-container">
                    {renderPokeBalls(opponentTeam)}
                </div>
                <Paper className="stats-card">
                    <div className="hp-card">
                        <p style={userAttack ? {backgroundColor:'red', marginLeft:'5px'}: {marginLeft:'5px'}}>HP: {renderHP('opponent', opponentPokemon)}</p>
                        <p>LVL: {opponentPokemon.level}</p>
                    </div>
                    <div className="attack-card">
                        <p style={{marginLeft:'5px'}}><small>ATK: {opponentPokemon.stats.attack}</small></p>
                        <p><small>DEF: {opponentPokemon.stats.defense}</small></p>
                        <p><small>SP ATK: {opponentPokemon.stats['special-attack']}</small></p>
                        <p><small>SP DEF: {opponentPokemon.stats['special-defense']}</small></p>
                        <p><small>SPD: {opponentPokemon.stats.speed}</small></p>
                    </div>
                </Paper>
                <img className="zone-image-card" src={opponentPokemon.front_image} alt="opponent-pokemon-image"/> 
            </Paper>
        )
    }

    return isLoaded === true ? renderOpponent() : null
}

export default OpponentCard