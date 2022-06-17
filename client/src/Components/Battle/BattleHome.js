import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Container from '@mui/material/Container'
import './style.css'

//components
import InitialLoad from './InitialLoad'
import FlyingPidgeot from './FlyingPidgeot'
import UserCard from './UserCard'
import OpponentCard from './OpponentCard'
import PokeBallBattle from './PokeBallBattle'

let BattleHome = ({ userTrainer, opponentTrainer, pokemonData, pokeBall }) => {
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

    const [healthMovePP, setHealthMovePP] = useState({})
    const [userPokemon, setUserPokemon] = useState(null)
    const [opponentPokemon, setOpponentPokemon] = useState(null)
    const [userTeam, setUserTeam] = useState(null)
    const [opponentTeam, setOpponentTeam] = useState(null)
    const [userAttack, setUserAttack] = useState(null)
    const [opponentAttack, setOpponentAttack] = useState(null)

    let fetchTeam = async (trainer) => {
        try {
            let team = trainer.pokemon_teams.filter(p => p.team_member === true)
            let teamPromise = await Promise.all(team.map(async p => await fetch(`/api/pokemon/${p.pokemon_id}`)))
            let data = teamPromise.map(res => res.json())
            let results = await Promise.all(data)
            return results
        } catch (error) {
            console.error(error)
        }
    }

    let fetchMoves = async (moves) => {
        try {
            let movePromise = await Promise.all(moves.map(move => fetch(`/api/pokemon/move/${move.name}`)))
            let moveData = movePromise.map(res => res.json())
            let results = await Promise.all(moveData)
            return results
        } catch (error) {
            console.error(error)
        }
    }

    let seedHealthMovePP = (movesArray, pokemon, user) => {
        let moves = movesArray.slice(0, 4)
        fetchMoves(moves).then(moveData => {
            let tempObject = {}
            let movesObject = {}
            moveData.forEach(move => { movesObject[move.name] = move })
            tempObject['hp'] = pokemon.stats.hp
            tempObject['moves'] = movesObject
            tempObject['attack'] = null

            user === 'user' ?
                healthMovePP['user'] = { ...healthMovePP['user'], [pokemon.name]: tempObject }
                :
                healthMovePP['opponent'] = { ...healthMovePP['opponent'], [pokemon.name]: tempObject }

            setHealthMovePP(healthMovePP)
        })
    }

    let renderPokeBalls = (team) => (
        team.map((p) => <PokeBallBattle key={p.name} pokeBall={pokeBall} />)
    )

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

    let endTurn = () => {
        if (userAttack) {
            setUserAttack(null)
            let opponentHP = healthMovePP['opponent'][opponentPokemon.name]['hp']
            if (opponentHP <= 0) { 
                delete healthMovePP['opponent'][opponentPokemon.name]
                let team = opponentTeam.filter(pokemon => pokemon.name !== opponentPokemon.name)
                setOpponentTeam(team)
                setOpponentPokemon(team[0])
                seedHealthMovePP(team[0].moves, team[0], 'opponent')
            } else {
                
            }
        }
    }

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

    //}

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

    let renderHP = (user, selectedPokemon) => {
        let dataHP = selectedPokemon.stats.hp
        if (healthMovePP[user]) {
            let pokemon = healthMovePP[user][selectedPokemon.name]
            return pokemon ? pokemon['hp'] : dataHP
        } else {
            return dataHP
        }
    }

    let renderAttack = () => {
        return (
            <>
                {userAttack || opponentAttack ?
                    userAttack ?
                        <div>
                            <>{userAttack.pokemon} used {userAttack.name}!!!

                                {superEffective === null ?
                                    <p>{userAttack.name} did {userAttack.damage} damage! </p>
                                    :
                                    <p>It's super effective. {userAttack.pokemon} knocked out {opponentPokemon.name}!!!</p>
                                }
                            </>
                            <button className="action-button" onClick={endTurn}>
                                End turn
                            </button>
                        </div>
                        :
                        <div>
                            <p>{opponentPokemon.name} used {opponentAttack.name}</p>
                            <button className="action-button" onClick={endTurn}>Continue</button>
                        </div>
                    :
                    null
                }
            </>
        )
    }

    let renderAttackImage = () => {
        let attackImages = ["http://31.media.tumblr.com/9c77fb5630504da806464f80097aeb7f/tumblr_mie1te7yfk1r5fhkdo1_500.gif", "https://c.tenor.com/98nZAGp5ooQAAAAC/pokemon-tyranitar.gif"]

        return (
            <>
                {userAttack || opponentAttack ?
                    <img
                        className="pokemon-attack"
                        src={userAttack ? attackImages[1] : attackImages[0]} alt="hyperbeam"
                    />
                    :
                    null
                }
            </>
        )
    }


    return (
            <div className="battle-container">
            {initialBattleLoad ?
                <InitialLoad
                    setInitialBattleLoad={setInitialBattleLoad}
                    opponentTrainer={opponentTrainer}
                />
                :
                <>
                    <FlyingPidgeot />
                    <OpponentCard
                        opponentTeam={opponentTeam}
                        setOpponentTeam={setOpponentTeam}
                        fetchTeam={fetchTeam}
                        renderHP={renderHP}
                        renderPokeBalls={renderPokeBalls}
                        opponentTrainer={opponentTrainer}
                        userAttack={userAttack}
                        opponentPokemon={opponentPokemon}
                        setOpponentPokemon={setOpponentPokemon}
                        seedHealthMovePP={seedHealthMovePP}
                    />

                    {renderAttackImage()}
                    <UserCard
                        userTeam={userTeam}
                        setUserTeam={setUserTeam}
                        selectedPokemon={userPokemon}
                        setSelectedPokemon={setUserPokemon}
                        fetchTeam={fetchTeam}
                        renderHP={renderHP}
                        renderPokeBalls={renderPokeBalls}
                        userTrainer={userTrainer}
                        opponentAttack={opponentAttack}
                        setUserAttack={setUserAttack}
                        healthMovePP={healthMovePP}
                        setHealthMovePP={setHealthMovePP}
                        seedHealthMovePP={seedHealthMovePP}
                        opponentPokemon={opponentPokemon}
                    />
                    {renderAttack()}
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
                </>
            }
            </div>
    )
}

export default BattleHome