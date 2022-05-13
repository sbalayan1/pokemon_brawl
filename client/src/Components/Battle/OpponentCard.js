import {useState, useEffect} from 'react'
import PokeBallBattle from './PokeBallBattle'

let OpponentCard = ({pokeBall, opponentTrainer, userDamage}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [opponentTeam, setOpponentTeam] = useState(null)
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [hp, setHP] = useState(null)
    const [move1, setMove1] = useState(null)
    const [move2, setMove2] = useState(null)
    const [move3, setMove3] = useState(null)
    const [move4, setMove4] = useState(null)

    let fetchOpponentTeam = async () => {
        try {
            let team = opponentTrainer.pokemon_teams.filter(p => p.team_member === true)
            let oppPromise = await Promise.all(team.map(p => fetch(`/api/pokemon/${p.pokemon_id}`)))
            let oppData = oppPromise.map(res => res.json())
            let results = await Promise.all(oppData)
            return results
        } catch (error) {
            console.error(error)
        }
    }

    let renderPokeBalls = () => {
        opponentTeam.map(() => <PokeBallBattle pokeBall={pokeBall}/>)
    }

    useEffect(() => {
        fetchOpponentTeam().then(data => {
            setSelectedPokemon(data[0])
            setOpponentTeam(data)
            setHP(data[0].stats.hp)
            setMove1(data[0].moves[0])
            setMove2(data[0].moves[1])
            setMove3(data[0].moves[2])
            setMove4(data[0].moves[3])
            setIsLoaded(true)
            console.log('rendering opponent card')
        })
    }, [opponentTrainer])

    let renderOpponent = () => {
        return (
            <div className="zone-container" >
                <div className="opponent-decision-making-container">
                    <div className="trainer-battle-pokeball-container">
                        {opponentTeam ? renderPokeBalls() : null}
                    </div>
                    <div className="stats-card">
                        <div className="hp-card">
                            <p style={userDamage > 0 ? {backgroundColor:'red', marginLeft:'5px'}: {marginLeft:'5px'}} >HP: {hp}</p>
                            {/* <p>LVL: {selectedPokemon.level}</p> */}
                        </div>
                        <div className="attack-card">
                            <p style={{marginLeft:'5px'}}><small>ATK: {selectedPokemon.stats.attack}</small></p>
                            <p><small>DEF: {selectedPokemon.stats.defense}</small></p>
                            <p><small>SP ATK: {selectedPokemon.stats['special-attack']}</small></p>
                            <p><small>SP DEF: {selectedPokemon.stats['special-defense']}</small></p>
                            <p><small>SPD: {selectedPokemon.stats.speed}</small></p>
                        </div>
                    </div>
                    <img className="zone-image-card" src={selectedPokemon.front_image} alt="opponent-pokemon-image"/> 
                </div>
            </div>
        )
    }

    return isLoaded === true ? renderOpponent() : null
}

export default OpponentCard