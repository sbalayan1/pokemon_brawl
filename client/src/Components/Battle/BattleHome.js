import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import PokeBallBattle from './PokeBallBattle'

import InitialLoad from './InitialLoad'
// import FlyingPidgeot from './FlyingPidgeot'
import UserCard from './UserCard'
import OpponentCard from './OpponentCard'

let BattleHome = ({userTrainer, opponentTrainer, pokemonData, pokeBall}) => {
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
    const [displayTeam, setDisplayTeam] = useState(false)
    const [userTeamCount, setUserTeamCount] = useState(0)
    const [oppTeamCount, setOppTeamCount] = useState(0)
 
    // let handleSelectBattleMovePrompt = (e) => {
    //     if (displayTeam === false) {
    //         let userPokemonMoves = [userPokemonMove1, userPokemonMove2, userPokemonMove3, userPokemonMove4]
    //         setBattleMovePrompt(userPokemonMoves.find(move => move.name === e.target.value))
    
    //         if (e.target.value === userPokemonMove1.name) {
    //             setBattleMovePP(userPokemonMove1PP)
    //         } else if (e.target.value === userPokemonMove2.name ) {
    //             setBattleMovePP(userPokemonMove2PP)
    //         } else if (e.target.value === userPokemonMove3.name) {
    //             setBattleMovePP(userPokemonMove3PP)
    //         } else if (e.target.value === userPokemonMove4.name) {
    //             setBattleMovePP(userPokemonMove4PP)
    //         }
    //     } else {
    //         alert('You cannot choose an attack while viewing your Pokemon!!')
    //     }
    // }

    // let returnToBattleMoves = () => {
    //     setBattleMovePrompt(null)
    // }

    // let handleSelectBattleMove = (e) => {
    //     // setUserDamage(Math.round(((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*battleMovePrompt.power)/50)+2))
    //     setBattleMovePrompt(null)
    //     setInitialMove(null)
    //     setUserBattleMove(battleMovePrompt.name)

    //     if (battleMovePrompt.name === userPokemonMove1.name) {
    //         setUserPokemonMove1PP(userPokemonMove1PP - 1)
    //     } else if (battleMovePrompt.name === userPokemonMove2.name ) {
    //         setUserPokemonMove2PP(userPokemonMove2PP - 1)
    //     } else if (battleMovePrompt.name === userPokemonMove3.name) {
    //         setUserPokemonMove3PP(userPokemonMove3PP - 1)
    //     } else if (battleMovePrompt.name === userPokemonMove4.name) {
    //         setUserPokemonMove4PP(userPokemonMove4PP - 1)
    //     }

    //     // if (opponentPokemonHP - ((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*battleMovePrompt.power)/50)+2 <= 0) {
    //     //     setSuperEffective(true)
    //     //     setOpponentPokemonHP(0)
    //     // } else {
    //     //     setOpponentPokemonHP(opponentPokemonHP - Math.round(((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*battleMovePrompt.power)/50)+2))
    //     // }
    // }

    // let initiateOpponentMove = () => {
    //     let opponentMoves = [opponentPokemonMove1, opponentPokemonMove2, opponentPokemonMove3, opponentPokemonMove4]
    //     setOpponentBattleMove(opponentMoves[Math.floor(Math.random()*opponentMoves.length)])
    //  }

    // let calculateDamage = () => {
    //     // setOpponentDamage(Math.round(((((2*opponentPokemon.level)/5)*(opponentPokemon.stats[0].attack/userPokemon.stats[0].defense)*opponentBattleMove.power)/50)+2))
    //     setOpponentBattleMove(null)
    // }

    // let displayDamage = () => {   
    //     if (userPokemonHP - opponentDamage <= 0) {
    //         setOpponentSuperEffective(true)
    //         setUserPokemonHP(0)
    //     } else {
    //         setUserPokemonHP(userPokemonHP - opponentDamage)
    //     }
    //     setOpponentDamage(null)
    // }

    // let endTurn = () => {
    //     setUserDamage(null)
    //     setUserBattleMove(null)
    //     setSuperEffective(null)

    //     if(opponentPokemonHP <= 0) {
    //         if (oppTeamCount < oppPokeTeam.length-1 ) {
    //             alert(`${opponentTrainer.name} sent out ${pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount+1].pokemon_id).name}`)
    //             setOppTeamCount(oppTeamCount+1)
    //             setOpponentPokemon(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount+1].pokemon_id))
    //             setOpponentPokemonMove1(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount+1].pokemon_id).moves[0])
    //             setOpponentPokemonMove2(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount+1].pokemon_id).moves[1])
    //             setOpponentPokemonMove3(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount+1].pokemon_id).moves[2])
    //             setOpponentPokemonMove4(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount+1].pokemon_id).moves[3])
    //             // setOpponentPokemonHP(pokemonData.find(pokemon => pokemon.id === oppPokeTeam[oppTeamCount+1].pokemon_id).stats[0].hp)
    //             initiateOpponentMove()

    //         } else if (oppTeamCount === oppPokeTeam.length-1) {
    //             alert('You won the battle')

    //             fetch('http://localhost:3000/battles', {
    //                 method: 'POST', 
    //                 headers: {'Content-Type':'Application/json'},
    //                 body: JSON.stringify({
    //                     trainer_id: userTrainer.id,
    //                     opponent_id: opponentTrainer.id,
    //                     win_loss: true
    //                 })
    //             })

    //             history.push('/')
    //         }
    //     } else {
    //         initiateOpponentMove()
    //     }

    // }

    // let endOpponentTurn = () => {
    //     setOpponentBattleMove(null)
    //     setOpponentDamage(null)
    //     setOpponentSuperEffective(null)
    //     setSuperEffective(null)

    //     if(userPokemonHP <= 0) {
    //         if (userTeamCount < pokeTeam.length-1) {
    //             alert(`You sent out ${pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).name}`)

    //             setUserTeamCount(userTeamCount+1)
    //             setUserPokemon(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id))
    //             // setUserPokemonHP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).stats[0].hp)
    //             setUserPokemonMove1(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[0])
    //             setUserPokemonMove2(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[1])
    //             setUserPokemonMove3(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[2])
    //             setUserPokemonMove4(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[3])
    //             setUserPokemonMove1PP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[0].power_points)
    //             setUserPokemonMove2PP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[1].power_points)
    //             setUserPokemonMove3PP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[2].power_points)
    //             setUserPokemonMove4PP(pokemonData.find(pokemon => pokemon.id === pokeTeam[userTeamCount+1].pokemon_id).moves[3].power_points)

    //         } else if (userTeamCount === pokeTeam.length-1) {
                
    //             alert('You lost the battle')
    //             fetch('http://localhost:3000/battles', {
    //                 method: 'POST', 
    //                 headers: {'Content-Type':'Application/json'},
    //                 body: JSON.stringify({
    //                     trainer_id: userTrainer.id,
    //                     opponent_id: opponentTrainer.id,
    //                     win_loss: false
    //                 })
    //             })
    //             history.push('/')
    //         }
    //     }
    // }

    // let sendOutPokemon = (e) => {
    //     if (userPokemon !== pokemonData.find(pokemon => pokemon.front_image === e.target.src)) {
    //         setUserPokemon(pokemonData.find(pokemon => pokemon.front_image === e.target.src))
    //         // setUserPokemonHP(pokemonData.find(pokemon => pokemon.front_image === e.target.src).stats[0].hp)
    //         setUserPokemonMove1(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[0])
    //         setUserPokemonMove2(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[1])
    //         setUserPokemonMove3(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[2])
    //         setUserPokemonMove4(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[3])
    //         setUserPokemonMove1PP(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[0].power_points)
    //         setUserPokemonMove2PP(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[1].power_points)
    //         setUserPokemonMove3PP(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[2].power_points)
    //         setUserPokemonMove4PP(pokemonData.find(pokemon => pokemon.front_image === e.target.src).moves[3].power_points)
    
    //         alert(`${userTrainer.name} sent out ${pokemonData.find(pokemon => pokemon.front_image === e.target.src).name}`)
    
    //         initiateOpponentMove()
    //     } else {
    //         alert('That Pokemon is already out! Choose a different Pokemon!!')
    //     }
    // }

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
                    {/* <FlyingPidgeot /> */}
                    <OpponentCard 
                        pokeBall={pokeBall}
                        opponentTrainer={opponentTrainer}
                        userDamage={userDamage}
                    />

                    {opponentBattleMove && opponentDamage ? 
                        <img className="pokemon-attack" src="http://31.media.tumblr.com/9c77fb5630504da806464f80097aeb7f/tumblr_mie1te7yfk1r5fhkdo1_500.gif" alt="dragonite-hyperbeam"/>
                    :
                        null                    
                    }

                    {userBattleMove === null ? null : <img className="pokemon-attack" src="https://c.tenor.com/98nZAGp5ooQAAAAC/pokemon-tyranitar.gif" alt="tyranitar-hyperbeam"/>}


                    <UserCard 
                        pokeBall={pokeBall}
                        userTrainer={userTrainer}
                        opponentDamage={opponentDamage}
                    />
                          
                    {/* {userBattleMove === null ? null :
                        <div>
                            <p>{userPokemon.name} used {userBattleMove}!!! 
                                                        
                            {superEffective === null ? <p>{userBattleMove} did {userDamage} damage! </p>
                            :
                                <p>It's super effective. {userPokemon.name} knocked out {opponentPokemon.name}!!!</p> 
                            }
                            </p>
                            <button className="action-button" onClick={endTurn}>End turn</button>
                        </div>
                    } */}
{/* 
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
                    } */}
                </div>
            }
        </div>
    )
}

export default BattleHome