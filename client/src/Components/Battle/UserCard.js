import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import UserPokeBall from './UserPokeBall'
import InitialMove from './InitialMove'


let UserCard = ({pokeBall, userTrainer, opponentDamage}) => {
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)

    // user selection states
    const [displayTeam, setDisplayTeam] = useState(false)
    const [selectedInitialMove, setSelectedInitialMove] = useState(null)

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

    let selectInitialMove = (e) => {
        if(e.target.value === 'Fight' || e.target.value === 'Bag') {
            setSelectedInitialMove(e.target.value)
        } else if (e.target.value === 'Pokemon') {
            setDisplayTeam(!displayTeam)        
        } else if (e.target.value === 'Run') {
            alert("You flee'd the battle. A loss will be registered to the database. Feel free to try again!!! Sending you back to the home page.")
            history.push('/')
        }
    }


    let renderInitialMove = () => {
        return !selectedInitialMove ?   
            <InitialMove 
                displayTeam={displayTeam}
                selectInitialMove={selectInitialMove}
            />
        :
            null
    }

    useEffect(() => {
        fetchUserTeam().then(data => {
            setUserTeam(data)
            setSelectedPokemon(data[0])
            setPP1(10)
            setPP2(10)
            setPP3(10)
            setPP4(10)
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
                            {/* <p style={{marginLeft:'5px'}}><small>ATK: {userPokemon.stats[0].attack}</small></p> */}
                            {/* <p><small>DEF: {userPokemon.stats[0].defense}</small></p>
                            <p><small>SP ATK: {userPokemon.stats[0].sp_attack}</small></p>
                            <p><small>SP DEF: {userPokemon.stats[0].sp_defense}</small></p>
                            <p><small>SPD: {userPokemon.stats[0].speed}</small></p> */}
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
                    <UserPokeBall 
                        displayTeam={displayTeam}
                        userTeam={userTeam}
                        pokeBall={pokeBall}
                    />
                </div>

            </div>
        )    
    }

    return isLoaded === true ? renderUser() : null
}



export default UserCard