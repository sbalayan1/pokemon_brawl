import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import UserPokemon from './UserPokemon'
import InitialMove from './InitialMove'
import BattleMoveCard from './BattleMoveCard'


let UserCard = ({pokeBall, userTrainer, opponentDamage}) => {
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)

    // user selection states
    const [displayTeam, setDisplayTeam] = useState(false)
    const [selectedMove, setSelectedMove] = useState(null)

    // userTeam states
    const [userTeam, setUserTeam] = useState(null)
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [hp, setHP] = useState(null)
    const [move1, setMove1] = useState(null)
    const [move2, setMove2] = useState(null)
    const [move3, setMove3] = useState(null)
    const [move4, setMove4] = useState(null)
    const [pp1, setPP1] = useState(null)
    const [pp2, setPP2] = useState(null)
    const [pp3, setPP3] = useState(null)
    const [pp4, setPP4] = useState(null)

    let fetchUserTeam = async () => {
        try {
            let team = userTrainer.pokemon_teams.filter(p => p.team_member === true)
            let userPromise = await Promise.all(team.map(p => fetch(`/api/pokemon/${p.pokemon_id}`)))
            let userData = userPromise.map(res => res.json())
            let results = await Promise.all(userData)
            return results
        } catch (error) {
            console.error(error)
        }
    }

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
                selectedPokemonMoves={[move1, move2, move3, move4]}
            />
        :   
            null
    }

    let sendOutPokemon = (e) => {
        if (selectedPokemon.name !== e.target.name) {
            let pokemon = userTeam.find(p => p.name === e.target.name)
            setSelectedPokemon(pokemon)
            setHP(pokemon.stats.hp)
            setMove1(pokemon.moves[0])
            setMove2(pokemon.moves[1])
            setMove3(pokemon.moves[2])
            setMove4(pokemon.moves[3])          
            alert(`${userTrainer.name} sent out ${pokemon.name}`)
            // initiateOpponentMove()
        } else {
            alert('That Pokemon is already out! Choose a different Pokemon!!')
        }   
    }

    useEffect(() => {
        fetchUserTeam().then(data => {
            setSelectedPokemon(data[0])
            setUserTeam(data)
            setHP(data[0].stats.hp)
            setMove1(data[0].moves[0])
            setMove2(data[0].moves[1])
            setMove3(data[0].moves[2])
            setMove4(data[0].moves[3])
            setIsLoaded(true)
            console.log('rendering user card')
        })

    }, [userTrainer])

    let renderUser = () => {
        return (
            <div className="zone-container" style={{height:'350px'}}>
                <img className="zone-image-card" src={selectedPokemon.back_image} alt="user-pokemon-image"/>
                <div className="trainer-decision-making-container">
                    <div className="trainer-stats-card">
                        <div className="hp-card">
                            <p style={opponentDamage >0 ? {backgroundColor:'red', marginLeft:'5px'} : {marginLeft:'5px'}}>HP: {hp}</p>
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

                {/* {initialMove === null && opponentBattleMove === null && opponentDamage === null && userBattleMove === null ? 
                    <div className="move-card">
                        {displayTeam === false ? <button className="action-button" onClick={handleSelectInitialMove} value="Fight">Fight</button> : <button style={{backgroundColor:'black'} }className="action-button" value="Fight">Fight</button> }
                        <button className="action-button" onClick={handleSelectInitialMove} value="Bag">Bag</button>
                        <button className="action-button" onClick={handleSelectInitialMove} value="Pokemon">Pokemon</button>
                        <button className="action-button" onClick={handleSelectInitialMove} value="Run">Run</button>
                    </div>

                :
                    null
                } */}

                    {renderBattleMove()}
{/* 
                {initialMove === 'Fight' && battleMovePrompt === null ? 
                    <div className="move-card">
                        <button style={{fontSize:'9px'}} className="action-button" onClick={handleSelectBattleMovePrompt} value={userPokemonMove1.name}>{userPokemonMove1.name}</button>
                        <button style={{fontSize:'9px'}} className="action-button" onClick={handleSelectBattleMovePrompt} value={userPokemonMove2.name}>{userPokemonMove2.name}</button>
                        <button style={{fontSize:'9px'}} className="action-button" onClick={handleSelectBattleMovePrompt} value={userPokemonMove3.name}>{userPokemonMove3.name}</button>
                        <button style={{fontSize:'9px'}} className="action-button" onClick={handleSelectBattleMovePrompt} value={userPokemonMove4.name}>{userPokemonMove4.name}</button>
                    </div>
                
                :
                    null
                } */}

                {/* {battleMovePrompt === null ? null 
                :
                    <div style={{justifyContent:'space-evenly', marginTop:'10px'}} className="trainer-move-card">
                        <div>
                            <h5 style={{fontSize:'10px', marginLeft:'8px'}}>{battleMovePrompt.name}</h5>
                            <p style={{fontSize:'10px'}}>{battleMovePrompt.description}</p>
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <p style={{fontSize:'10px'}}>Power:{battleMovePrompt.power}</p>
                            <p style={{fontSize:'10px'}}>PP:{battleMovePP}</p>
                        </div>
                        <button style={{fontSize:'9px'}} className="action-button" onClick={handleSelectBattleMove}>Use {battleMovePrompt.name}</button>
                        <button className="action-button" onClick={returnToBattleMoves}>Back</button>
                    </div>
                } */}
                    <UserPokemon
                        displayTeam={displayTeam}
                        userTeam={userTeam}
                        pokeBall={pokeBall}
                        sendOutPokemon={sendOutPokemon}
                    />
                </div>

            </div>
        )    
    }

    return isLoaded === true ? renderUser() : null
}



export default UserCard