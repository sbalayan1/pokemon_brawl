import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import UserPokemon from './UserPokemon'
import InitialMove from './InitialMove'
import BattleMoveCard from './BattleMoveCard'


let UserCard = ({selectedPokemon, setSelectedPokemon, fetchTeam, renderPokeBalls, userTrainer, opponentDamage, setUserAttack, healthMovePP, setHealthMovePP, seedHealthMovePP}) => {
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const [displayTeam, setDisplayTeam] = useState(false)
    const [selectedMove, setSelectedMove] = useState(null)
    const [userTeam, setUserTeam] = useState(null)

    let selectMove = (e) => {
        if(e.target.value === 'Fight' || e.target.value === 'Bag') {
            setSelectedMove(e.target.value)
        } else if (e.target.value === 'Pokemon') {
            setDisplayTeam(!displayTeam)        
        } else if (e.target.value === 'Run') {
            alert("You flee'd the battle. A loss will be registered to the database. Feel free to try again!!! Sending you back to the home page.")
            history.push('/')
        }
    }

    let sendOutPokemon = (e) => {
        if (selectedPokemon.name !== e.target.name) {
            let pokemon = userTeam.find(p => p.name === e.target.name)
            setSelectedPokemon(pokemon)
            if (!healthMovePP['user'][pokemon.name]) seedHealthMovePP(pokemon.moves, pokemon, 'user')
            setDisplayTeam(!displayTeam)      
            alert(`${userTrainer.name} sent out ${pokemon.name}`)
            // initiateOpponentMove()
        } else {
            alert('That Pokemon is already out! Choose a different Pokemon!!')
        }   
    }

    useEffect(() => {
        fetchTeam(userTrainer).then(teamData => {
            setSelectedPokemon(teamData[0])
            setUserTeam(teamData)
            seedHealthMovePP(teamData[0].moves, teamData[0], 'user')
            setIsLoaded(true)
            console.log('rendering user card')
        })

    }, [])

    let renderInitialMove = () => {
        return !selectedMove ?   
            <InitialMove 
                displayTeam={displayTeam}
                selectMove={selectMove}
            />
        :
            null
    }

    let renderBattleMove = () => {
        return selectedMove === 'Fight' ? 
            <BattleMoveCard 
                displayTeam={displayTeam}
                selectedPokemon={selectedPokemon}
                setFightMove={setSelectedMove}
                healthMovePP={healthMovePP}
                setHealthMovePP={setHealthMovePP}
                setUserAttack={setUserAttack}
            />
        :   
            null
    }

    let renderUser = () => {
        return (
            <div className="zone-container" style={{height:'350px'}}>
                <img className="zone-image-card" src={selectedPokemon.back_image} alt="user-pokemon-image"/>
                <div className="trainer-decision-making-container">
                    <div className="trainer-stats-card">
                        <div className="hp-card">
                            <p style={opponentDamage >0 ? {backgroundColor:'red', marginLeft:'5px'} : {marginLeft:'5px'}}>
                                {/* can run into issues here with updated hp not  */}
                                HP: {healthMovePP['user'] ? healthMovePP['user'][selectedPokemon.name]['hp']  : selectedPokemon.stats.hp}
                            </p>
                            <p>LVL: {selectedPokemon.level}</p>
                        </div>
                        <div className="attack-card">
                            <p style={{marginLeft:'5px'}}><small>ATK: {selectedPokemon.stats.attack}</small></p>
                            <p><small>DEF: {selectedPokemon.stats.defense}</small></p>
                            <p><small>SP ATK: {selectedPokemon.stats['special-attack']}</small></p>
                            <p><small>SP DEF: {selectedPokemon.stats['special-defense']}</small></p>
                            <p><small>SPD: {selectedPokemon.stats.speed}</small></p>
                        </div>
                    </div>
                    
                    {renderInitialMove()}
                    {renderBattleMove()}
                </div>
                <div className="trainer-battle-pokeball-container">
                    <UserPokemon
                        displayTeam={displayTeam}
                        userTeam={userTeam}
                        renderPokeBalls={renderPokeBalls}
                        sendOutPokemon={sendOutPokemon}
                    />
                </div>
            </div>
        )    
    }

    return isLoaded === true ? renderUser() : null
}



export default UserCard