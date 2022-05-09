import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import PokeBallBattle from './PokeBallBattle'

import InitialLoad from './InitialLoad'
import FlyingPidgeot from './FlyingPidgeot'
import OpponentCard from './OpponentCard'

let BattleHome = ({userTrainer, opponentTrainer, pokemonData}) => {
    const history = useHistory()
    const [initialBattleLoad, setInitialBattleLoad] = useState(true)

    const [initialMove, setInitialMove] = useState(null)
    const [battleMovePrompt, setBattleMovePrompt] = useState(null)
    const [battleMovePP, setBattleMovePP] = useState(null)
    const [userBattleMove, setUserBattleMove] = useState(null)
    const [opponentBattleMove, setOpponentBattleMove] = useState(null)
    const [userDamage, setUserDamage] = useState(null)
    const [opponentDamage, setOpponentDamage] = useState(null)
    const [superEffective, setSuperEffective] = useState(null)
    const [opponentSuperEffective, setOpponentSuperEffective] = useState(null)
    const [pokeBall, setPokeBall] = useState(null)
    const [displayTeam, setDisplayTeam] = useState(false)
    const [userTeamCount, setUserTeamCount] = useState(0)
    const [oppTeamCount, setOppTeamCount] = useState(0)

    const [userPokemon, setUserPokemon] = useState(null)
    const [userPokemonMove1, setUserPokemonMove1] = useState(null)
    const [userPokemonMove2, setUserPokemonMove2] = useState(null)
    const [userPokemonMove3, setUserPokemonMove3] = useState(null)
    const [userPokemonMove4, setUserPokemonMove4] = useState(null)
    const [userPokemonMove1PP, setUserPokemonMove1PP] = useState(null)
    const [userPokemonMove2PP, setUserPokemonMove2PP] = useState(null)
    const [userPokemonMove3PP, setUserPokemonMove3PP] = useState(null)
    const [userPokemonMove4PP, setUserPokemonMove4PP] = useState(null)
    const [userPokemonHP, setUserPokemonHP] = useState(null)

    const [opponentPokemon, setOpponentPokemon] = useState(null)
    const [opponentPokemonMove1, setOpponentPokemonMove1] = useState(null)
    const [opponentPokemonMove2, setOpponentPokemonMove2] = useState(null)
    const [opponentPokemonMove3, setOpponentPokemonMove3] = useState(null)
    const [opponentPokemonMove4, setOpponentPokemonMove4] = useState(null)
    const [opponentPokemonHP, setOpponentPokemonHP] = useState(null)

    const pokeTeam = userTrainer ? userTrainer.pokemon_teams.filter(pokemon => pokemon.team_member === true) : null
    const oppPokeTeam = opponentTrainer ? opponentTrainer.pokemon_teams.filter(pokemon => pokemon.team_member === true) : null

    let fetchPokemonTeams = async () => {
        try {
            let userPromise = await Promise.all(pokeTeam.map(pokemon => fetch(`/api/pokemon/${pokemon.pokemon_id}`)))
            let oppPromise = await Promise.all(oppPokeTeam.map(pokemon => fetch(`/api/pokemon/${pokemon.pokemon_id}`)))
                         
            let userData = await Promise.all(userPromise.map((res) => res.json()))
            let oppData = await Promise.all(oppPromise.map(res => res.json()))
            let results = [userData, oppData]
            return results

        } catch (error){
            console.error(error)
        }
    }

    useEffect(() => {
        fetchPokemonTeams().then(data => {
            let userData = data[0], oppData = data[1]
            setUserPokemon(userData[3])
            // setUserPokemonMove1(userData[3].moves[0])
            // setUserPokemonMove2(userData[3].moves[1])
            // setUserPokemonMove3(userData[3].moves[2])
            // setUserPokemonMove4(userData[3].moves[3])
            setUserPokemonMove1PP(10)
            setUserPokemonMove2PP(10)
            setUserPokemonMove3PP(10)
            setUserPokemonMove4PP(10)  

            setOpponentPokemon(oppData[0])
            // setOpponentPokemonMove1(oppData[3].moves[0])
            // setOpponentPokemonMove2(oppData[3].moves[1])
            // setOpponentPokemonMove3(oppData[3].moves[2])
            // setOpponentPokemonMove4(oppData[3].moves[3])
        })
  
        fetch('https://pokeapi.co/api/v2/item/poke-ball')
        .then(res => res.json())
        .then(data => setPokeBall(data.sprites.default))        
    }, [])


    let handleSelectInitialMove = (e) => {
        if(e.target.value === 'Fight' || e.target.value === 'Bag') {
            setInitialMove(e.target.value)
        } else if (e.target.value === 'Pokemon') {
            setDisplayTeam(!displayTeam)        
        } else if (e.target.value === 'Run') {
            alert("You flee'd the battle. A loss will be registered to the database. Feel free to try again!!! Sending you back to the home page.")
            history.push('/')
        }
    }

    let handleSelectBattleMovePrompt = (e) => {
        if (displayTeam === false) {
            let userPokemonMoves = [userPokemonMove1, userPokemonMove2, userPokemonMove3, userPokemonMove4]
            setBattleMovePrompt(userPokemonMoves.find(move => move.name === e.target.value))
    
            if (e.target.value === userPokemonMove1.name) {
                setBattleMovePP(userPokemonMove1PP)
            } else if (e.target.value === userPokemonMove2.name ) {
                setBattleMovePP(userPokemonMove2PP)
            } else if (e.target.value === userPokemonMove3.name) {
                setBattleMovePP(userPokemonMove3PP)
            } else if (e.target.value === userPokemonMove4.name) {
                setBattleMovePP(userPokemonMove4PP)
            }
        } else {
            alert('You cannot choose an attack while viewing your Pokemon!!')
        }
    }

    let returnToBattleMoves = () => {
        setBattleMovePrompt(null)
    }

    let handleSelectBattleMove = (e) => {
        // setUserDamage(Math.round(((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*battleMovePrompt.power)/50)+2))
        setBattleMovePrompt(null)
        setInitialMove(null)
        setUserBattleMove(battleMovePrompt.name)

        if (battleMovePrompt.name === userPokemonMove1.name) {
            setUserPokemonMove1PP(userPokemonMove1PP - 1)
        } else if (battleMovePrompt.name === userPokemonMove2.name ) {
            setUserPokemonMove2PP(userPokemonMove2PP - 1)
        } else if (battleMovePrompt.name === userPokemonMove3.name) {
            setUserPokemonMove3PP(userPokemonMove3PP - 1)
        } else if (battleMovePrompt.name === userPokemonMove4.name) {
            setUserPokemonMove4PP(userPokemonMove4PP - 1)
        }

        // if (opponentPokemonHP - ((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*battleMovePrompt.power)/50)+2 <= 0) {
        //     setSuperEffective(true)
        //     setOpponentPokemonHP(0)
        // } else {
        //     setOpponentPokemonHP(opponentPokemonHP - Math.round(((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*battleMovePrompt.power)/50)+2))
        // }
    }

    let initiateOpponentMove = () => {
        let opponentMoves = [opponentPokemonMove1, opponentPokemonMove2, opponentPokemonMove3, opponentPokemonMove4]
        setOpponentBattleMove(opponentMoves[Math.floor(Math.random()*opponentMoves.length)])
     }

    let calculateDamage = () => {
        // setOpponentDamage(Math.round(((((2*opponentPokemon.level)/5)*(opponentPokemon.stats[0].attack/userPokemon.stats[0].defense)*opponentBattleMove.power)/50)+2))
        setOpponentBattleMove(null)
    }

    let displayDamage = () => {   
        if (userPokemonHP - opponentDamage <= 0) {
            setOpponentSuperEffective(true)
            setUserPokemonHP(0)
        } else {
            setUserPokemonHP(userPokemonHP - opponentDamage)
        }
        setOpponentDamage(null)
    }

    let endTurn = () => {
        setUserDamage(null)
        setUserBattleMove(null)
        setSuperEffective(null)

        if(opponentPokemonHP <= 0) {
            if (oppTeamCount < oppPokeTeam.length-1 ) {
                alert(`${opponentTrainer.name} sent out ${pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount+1].pokemon_id).name}`)
                setOppTeamCount(oppTeamCount+1)
                setOpponentPokemon(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount+1].pokemon_id))
                setOpponentPokemonMove1(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount+1].pokemon_id).moves[0])
                setOpponentPokemonMove2(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount+1].pokemon_id).moves[1])
                setOpponentPokemonMove3(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount+1].pokemon_id).moves[2])
                setOpponentPokemonMove4(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount+1].pokemon_id).moves[3])
                // setOpponentPokemonHP(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount+1].pokemon_id).stats[0].hp)
                initiateOpponentMove()

            } else if (oppTeamCount === oppPokeTeam.length-1) {
                alert('You won the battle')

                fetch('http://localhost:3000/battles', {
                    method: 'POST', 
                    headers: {'Content-Type':'Application/json'},
                    body: JSON.stringify({
                        trainer_id: userTrainer.id,
                        opponent_id: opponentTrainer.id,
                        win_loss: true
                    })
                })

                history.push('/')
            }
        } else {
            initiateOpponentMove()
        }

    }

    let endOpponentTurn = () => {
        setOpponentBattleMove(null)
        setOpponentDamage(null)
        setOpponentSuperEffective(null)
        setSuperEffective(null)

        if(userPokemonHP <= 0) {
            if (userTeamCount < pokeTeam.length-1) {
                alert(`You sent out ${pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).name}`)

                setUserTeamCount(userTeamCount+1)
                setUserPokemon(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id))
                // setUserPokemonHP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).stats[0].hp)
                setUserPokemonMove1(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[0])
                setUserPokemonMove2(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[1])
                setUserPokemonMove3(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[2])
                setUserPokemonMove4(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[3])
                setUserPokemonMove1PP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[0].power_points)
                setUserPokemonMove2PP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[1].power_points)
                setUserPokemonMove3PP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[2].power_points)
                setUserPokemonMove4PP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[3].power_points)

            } else if (userTeamCount === pokeTeam.length-1) {
                
                alert('You lost the battle')
                fetch('http://localhost:3000/battles', {
                    method: 'POST', 
                    headers: {'Content-Type':'Application/json'},
                    body: JSON.stringify({
                        trainer_id: userTrainer.id,
                        opponent_id: opponentTrainer.id,
                        win_loss: false
                    })
                })
                history.push('/')
            }
        }
    }

    let sendOutPokemon = (e) => {
        if (userPokemon !== pokemonData.find(pokemon => pokemon.front_image === e.target.src)) {
            setUserPokemon(pokemonData.find(pokemon => pokemon.front_image === e.target.src))
            // setUserPokemonHP(pokemonData.find(pokemon => pokemon.front_image === e.target.src).stats[0].hp)
            setUserPokemonMove1(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[0])
            setUserPokemonMove2(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[1])
            setUserPokemonMove3(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[2])
            setUserPokemonMove4(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[3])
            setUserPokemonMove1PP(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[0].power_points)
            setUserPokemonMove2PP(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[1].power_points)
            setUserPokemonMove3PP(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[2].power_points)
            setUserPokemonMove4PP(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[3].power_points)
    
            alert(`${userTrainer.name} sent out ${pokemonData.find(pokemon => pokemon.front_image === e.target.src).name}`)
    
            initiateOpponentMove()
        } else {
            alert('That Pokemon is already out! Choose a different Pokemon!!')
        }

    }

    return (
        <div className="battle-sfzone-container">
            {/* initial battle load */}
            {initialBattleLoad ?  
                <InitialLoad 
                    setInitialBattleLoad={setInitialBattleLoad}
                    opponentTrainer={opponentTrainer}
                />
            :
            // move select
                <div className="battle-sfzone-container">
                    <FlyingPidgeot />
                    <OpponentCard />

                    {opponentBattleMove === null && opponentDamage === null? null : <img className="pokemon-attack" src="http://31.media.tumblr.com/9c77fb5630504da806464f80097aeb7f/tumblr_mie1te7yfk1r5fhkdo1_500.gif" alt="dragonite-hyperbeam"/>}

                    {userBattleMove === null ? null : <img className="pokemon-attack" src="https://c.tenor.com/98nZAGp5ooQAAAAC/pokemon-tyranitar.gif" alt="tyranitar-hyperbeam"/>}


                    <div className="zone-container" style={{height:'350px'}}>
                        <img className="zone-image-card" src={userPokemon.back_image} alt="user-pokemon-image"/>
                        <div className="trainer-decision-making-container">
                            <div className="trainer-stats-card">
                                <div className="hp-card">
                                    <p style={opponentDamage>0 ? {backgroundColor:'red', marginLeft:'5px'} : {marginLeft:'5px'}}>HP: {userPokemonHP}</p>
                                    <p>LVL: {userPokemon.level}</p>
                                </div>
                                <div className="attack-card">
                                    {/* <p style={{marginLeft:'5px'}}><small>ATK: {userPokemon.stats[0].attack}</small></p> */}
                                    {/* <p><small>DEF: {userPokemon.stats[0].defense}</small></p>
                                    <p><small>SP ATK: {userPokemon.stats[0].sp_attack}</small></p>
                                    <p><small>SP DEF: {userPokemon.stats[0].sp_defense}</small></p>
                                    <p><small>SPD: {userPokemon.stats[0].speed}</small></p> */}
                                </div>
                            </div>
                        

                        {initialMove === null && opponentBattleMove === null && opponentDamage === null && userBattleMove === null ? 
                            <div className="move-card">
                                {displayTeam === false ? <button className="action-button" onClick={handleSelectInitialMove} value="Fight">Fight</button> : <button style={{backgroundColor:'black'} }className="action-button" value="Fight">Fight</button> }
                                <button className="action-button" onClick={handleSelectInitialMove} value="Bag">Bag</button>
                                <button className="action-button" onClick={handleSelectInitialMove} value="Pokemon">Pokemon</button>
                                <button className="action-button" onClick={handleSelectInitialMove} value="Run">Run</button>
                            </div>

                        :
                            null
                        }

                        {initialMove === 'Fight' && battleMovePrompt === null ? 
                            <div className="move-card">
                                <button style={{fontSize:'9px'}} className="action-button" onClick={handleSelectBattleMovePrompt} value={userPokemonMove1.name}>{userPokemonMove1.name}</button>
                                <button style={{fontSize:'9px'}} className="action-button" onClick={handleSelectBattleMovePrompt} value={userPokemonMove2.name}>{userPokemonMove2.name}</button>
                                <button style={{fontSize:'9px'}} className="action-button" onClick={handleSelectBattleMovePrompt} value={userPokemonMove3.name}>{userPokemonMove3.name}</button>
                                <button style={{fontSize:'9px'}} className="action-button" onClick={handleSelectBattleMovePrompt} value={userPokemonMove4.name}>{userPokemonMove4.name}</button>
                            </div>
                        
                        :
                            null
                        }

                        {battleMovePrompt === null ? null 
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
                        }
                        </div>
                        <div className="trainer-battle-pokeball-container">
                            {displayTeam === false ? 
                                pokeTeam.map(pokemon => {
                                    return (<PokeBallBattle pokemon={pokemon} pokeBall={pokeBall}/>)
                                })
                            : 
                                pokeTeam.map(pokemon => {
                                    return (<img style={pokemon.pokemon_id === userPokemon.id ? {border: '1px solid yellow', height:'56px', width:'60px'} : {height:'56px', width: '60px'}} className="poke-ball-battle-pokemon" src={pokemonData.find(poke => poke.id === pokemon.pokemon_id).front_image} onClick={sendOutPokemon}/>)
                                })
                            }
                        </div>
                    </div>
                          
                    {userBattleMove === null ? null :
                        <div>
                            <p>{userPokemon.name} used {userBattleMove}!!! 
                                                        
                            {superEffective === null ? <p>{userBattleMove} did {userDamage} damage! </p>
                            :
                                <p>It's super effective. {userPokemon.name} knocked out {opponentPokemon.name}!!!</p> 
                            }
                            </p>
                            <button className="action-button" onClick={endTurn}>End turn</button>
                        </div>
                    }

                    {opponentBattleMove === null ? null :
                        <div>
                            <p>{opponentPokemon.name} used {opponentBattleMove.name}</p>
                            <button className="action-button" onClick={calculateDamage}>Continue</button>
                        </div>
                    }

                    {opponentDamage === null ? null :
                        <div>
                            <p>{opponentPokemon.name} did {opponentDamage} damage!!!</p>
                            <button className="action-button" onClick={displayDamage}>Continue</button>
                        </div>
                    }

                    {opponentSuperEffective === null ? null 
                    :
                        <div>
                            <p>It's super effective. {opponentPokemon.name} knocked out {userPokemon.name}</p>
                            <button className="action-button" onClick={endOpponentTurn}>End Turn</button>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default BattleHome


