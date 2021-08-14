import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'


let Battle = ({userTrainer, opponentTrainer, pokemonData}) => {
    let opponentTrainers = ['https://archives.bulbagarden.net/media/upload/3/30/RB_Old_man_Back.png','https://archives.bulbagarden.net/media/upload/3/30/Spr_RG_Beauty.png','https://archives.bulbagarden.net/media/upload/f/fd/Spr_RG_Bird_Keeper.png','https://archives.bulbagarden.net/media/upload/4/48/Spr_RG_Blackbelt.png','https://archives.bulbagarden.net/media/upload/3/38/Spr_RG_Blue_2.png','https://archives.bulbagarden.net/media/upload/3/3f/Spr_RG_Bug_Catcher.png','https://archives.bulbagarden.net/media/upload/f/f2/Spr_RG_Burglar.png','https://archives.bulbagarden.net/media/upload/9/92/Spr_RG_Channeler.png','https://archives.bulbagarden.net/media/upload/0/0f/Spr_RG_Cooltrainer_M.png','https://archives.bulbagarden.net/media/upload/0/09/Spr_RG_Engineer.png','https://archives.bulbagarden.net/media/upload/e/ee/Spr_RG_Erika.png','https://archives.bulbagarden.net/media/upload/d/d7/Spr_RG_Fisherman.png','https://archives.bulbagarden.net/media/upload/7/7f/Spr_RG_Gambler.png','https://archives.bulbagarden.net/media/upload/0/08/Spr_RG_Gentleman.png','https://archives.bulbagarden.net/media/upload/6/62/Spr_RG_Hiker.png','https://archives.bulbagarden.net/media/upload/3/36/Spr_RG_Juggler.png','https://archives.bulbagarden.net/media/upload/2/29/Spr_RG_Lass.png','https://archives.bulbagarden.net/media/upload/b/b0/Spr_RG_Koga.png','https://archives.bulbagarden.net/media/upload/5/5d/Spr_RG_Psychic.png','https://archives.bulbagarden.net/media/upload/a/a1/Spr_RG_Rocket.png','https://archives.bulbagarden.net/media/upload/5/54/Spr_RG_Sailor.png','https://archives.bulbagarden.net/media/upload/5/51/Spr_RG_Blue_3.png','https://archives.bulbagarden.net/media/upload/5/58/Spr_RG_Lorelei.png','https://archives.bulbagarden.net/media/upload/7/76/Spr_RG_Bruno.png','https://archives.bulbagarden.net/media/upload/b/b8/Spr_RG_Swimmer.png','https://archives.bulbagarden.net/media/upload/9/96/Spr_RG_Youngster.png','https://archives.bulbagarden.net/media/upload/1/1e/Spr_RG_Oak.png','https://archives.bulbagarden.net/media/upload/d/d0/Spr_RG_Jr_Trainer_F.png','https://archives.bulbagarden.net/media/upload/2/2d/Spr_RG_Misty.png']

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


    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/item/poke-ball')
        .then(res => res.json())
        .then(data => setPokeBall(data.sprites.default))


        let teamMembers = (userTrainer.pokemon_teams.filter (pokemon_team => pokemon_team.team_member === true))
        console.log(pokemonData.filter(pokemon => pokemon.id === teamMembers[0].pokemon_id))
    },[])


    
    let startBattle = () => {
        setInitialBattleLoad(false)
        setUserPokemon(pokemonData.find(pokemon => pokemon.name === userTrainer.pokemon[0].name))
        setUserPokemonHP(pokemonData.find(pokemon => pokemon.name === userTrainer.pokemon[0].name).stats[0].hp)
        setUserPokemonMove1(pokemonData.find(pokemon => pokemon.name === userTrainer.pokemon[0].name).moves[10])
        setUserPokemonMove2(pokemonData.find(pokemon => pokemon.name === userTrainer.pokemon[0].name).moves[20])
        setUserPokemonMove3(pokemonData.find(pokemon => pokemon.name === userTrainer.pokemon[0].name).moves[30])
        setUserPokemonMove4(pokemonData.find(pokemon => pokemon.name === userTrainer.pokemon[0].name).moves[40])
        setUserPokemonMove1PP(pokemonData.find(pokemon => pokemon.name === userTrainer.pokemon[0].name).moves[10].power_points)
        setUserPokemonMove2PP(pokemonData.find(pokemon => pokemon.name === userTrainer.pokemon[0].name).moves[20].power_points)
        setUserPokemonMove3PP(pokemonData.find(pokemon => pokemon.name === userTrainer.pokemon[0].name).moves[30].power_points)
        setUserPokemonMove4PP(pokemonData.find(pokemon => pokemon.name === userTrainer.pokemon[0].name).moves[40].power_points)


        setOpponentPokemon(pokemonData.find(pokemon => pokemon.name === opponentTrainer.pokemon[0].name))
        setOpponentPokemonMove1(pokemonData.find(pokemon => pokemon.name === opponentTrainer.pokemon[0].name).moves[10])
        setOpponentPokemonMove2(pokemonData.find(pokemon => pokemon.name === opponentTrainer.pokemon[0].name).moves[20])
        setOpponentPokemonMove3(pokemonData.find(pokemon => pokemon.name === opponentTrainer.pokemon[0].name).moves[30])
        setOpponentPokemonMove4(pokemonData.find(pokemon => pokemon.name === opponentTrainer.pokemon[0].name).moves[40])
        setOpponentPokemonHP(pokemonData.find(pokemon => pokemon.name === userTrainer.pokemon[0].name).stats[0].hp)
    }

    let handleSelectInitialMove = (e) => {
        if(e.target.value === 'Fight' || e.target.value === 'Pokemon' || e.target.value === 'Bag') {
            setInitialMove(e.target.value)
        } else if (e.target.value === 'Run') {
            alert("You flee'd the battle. A loss will be registered to the database. Feel free to try again!!! Sending you back to the home page.")
            history.push('/')
        }
    }

    let handleSelectBattleMovePrompt = (e) => {
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
        } else {
            console.log ('broken')
        }
    }

    let returnToBattleMoves = () => {
        setBattleMovePrompt(null)
    }

    let handleSelectBattleMove = (e) => {
        setUserDamage(Math.round(((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*battleMovePrompt.power)/50)+2))
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
        } else {
            console.log ('broken')
        }

        if (opponentPokemonHP - ((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*battleMovePrompt.power)/50)+2 <= 0) {
            setSuperEffective(true)
            setOpponentPokemonHP(0)
        } else {
            setOpponentPokemonHP(opponentPokemonHP - Math.round(((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*battleMovePrompt.power)/50)+2))
        }
    }

    let initiateOpponentMove = () => {
        let opponentMoves = [opponentPokemonMove1, opponentPokemonMove2, opponentPokemonMove3, opponentPokemonMove4]
        setOpponentBattleMove(opponentMoves[Math.floor(Math.random()*opponentMoves.length)])
     }

    let calculateDamage = () => {
        setOpponentDamage(Math.round(((((2*opponentPokemon.level)/5)*(opponentPokemon.stats[0].attack/userPokemon.stats[0].defense)*opponentBattleMove.power)/50)+2))

        setOpponentBattleMove(null)
    }

    let displayDamage = () => {
        
        if (userPokemonHP - opponentDamage <= 0) {
            console.log('hit')
            setOpponentSuperEffective(true)
            setUserPokemonHP(0)
        } else {
            console.log('miss')
            setUserPokemonHP(userPokemonHP - opponentDamage)
        }

        setOpponentDamage(null)
    }

    let endTurn = () => {
        setUserDamage(null)
        setUserBattleMove(null)
        setSuperEffective(null)

        if(opponentPokemonHP <= 0) {
            alert('You won the battle')
            history.push('/')
        } else {
            initiateOpponentMove()
        }

    }

    let endOpponentTurn = () => {
        setOpponentBattleMove(null)
        setOpponentDamage(null)
        setSuperEffective(null)

        if(userPokemonHP <= 0) {
            alert('You lost the battle')
            history.push('/')
        }
    }

    return (
        <div className="battle-sfzone-container"> 

            {/* initial battle load  */}
            {initialBattleLoad === true && userPokemon === null && opponentPokemon === null ?  
                <div className="battle-sfzone-container">
                    <div className="zone-container">
                        <img className="zone-image-card" src={opponentTrainers[Math.floor(Math.random() * opponentTrainers.length)]} alt="opponent-trainer"/>
                    </div>
                    <p>Trainer {opponentTrainer.name} wants to battle!</p>
                    <button onClick={startBattle}>Start</button>
                </div>
            :
            // move select 
                <div className="battle-sfzone-container">
                    <div className="zone-container">
                        <div className="trainer-battle-pokeball-container">
                            <img src={pokeBall} alt="poke-ball"/>
                            <img src={pokeBall} alt="poke-ball"/>
                            <img src={pokeBall} alt="poke-ball"/>
                            <img src={pokeBall} alt="poke-ball"/>
                            <img src={pokeBall} alt="poke-ball"/>
                            <img src={pokeBall} alt="poke-ball"/>
                        </div>
                        <div className="stats-card">
                            <div className="hp-card">
                                <p style={userDamage > 0 ? {backgroundColor:'red'}: null} >HP: {opponentPokemonHP}</p>
                                <p>LVL: {opponentPokemon.level}</p>
                            </div>
                            <div className="attack-card">
                                <p><small>Attack: {opponentPokemon.stats[0].attack}</small></p>
                                <p><small>Defense: {opponentPokemon.stats[0].defense}</small></p>
                                <p><small>SP Attack: {opponentPokemon.stats[0].sp_attack}</small></p>
                                <p><small>SP Defense: {opponentPokemon.stats[0].sp_defense}</small></p>
                                <p><small>Speed: {opponentPokemon.stats[0].speed}</small></p>
                            </div>
                        </div>
                        <img className="zone-image-card" src={opponentTrainer.pokemon[0].front_image} alt="opponent-pokemon-image"/>
                    </div>
                    <div className="zone-container">
                        <img className="zone-image-card" src={userTrainer.pokemon[0].back_image} alt="user-pokemon-image"/>
                        <div className="trainer-decision-making-container">
                            <div className="trainer-stats-card">
                                <div className="hp-card">
                                    <p style={opponentDamage>0 ? {backgroundColor:'red'}: null}>HP: {userPokemonHP}</p>
                                    <p>LVL: {userPokemon.level}</p>
                                </div>
                                <div className="attack-card">
                                    <p><small>Attack: {userPokemon.stats[0].attack}</small></p>
                                    <p><small>Defense: {userPokemon.stats[0].defense}</small></p>
                                    <p><small>SP Attack: {userPokemon.stats[0].sp_attack}</small></p>
                                    <p><small>SP Defense: {userPokemon.stats[0].sp_defense}</small></p>
                                    <p><small>Speed: {userPokemon.stats[0].speed}</small></p>
                                </div>
                            </div>
                        

                        {initialMove === null && opponentBattleMove === null && opponentDamage === null && userBattleMove === null ? 
                            <div className="move-card">
                                <button className="action-button" onClick={handleSelectInitialMove} value="Fight">Fight</button>
                                <button className="action-button" onClick={handleSelectInitialMove} value="Bag">Bag</button>
                                <button className="action-button" onClick={handleSelectInitialMove} value="Pokemon">Pokemon</button>
                                <button className="action-button" onClick={handleSelectInitialMove} value="Run">Run</button>
                            </div>

                        :
                            null
                        }

                        {initialMove === 'Fight' && battleMovePrompt === null ? 
                            <div className="move-card">
                                <button className="action-button" onClick={handleSelectBattleMovePrompt} value={userPokemonMove1.name}>{userPokemonMove1.name}</button>
                                <button className="action-button" onClick={handleSelectBattleMovePrompt} value={userPokemonMove2.name}>{userPokemonMove2.name}</button>
                                <button className="action-button" onClick={handleSelectBattleMovePrompt} value={userPokemonMove3.name}>{userPokemonMove3.name}</button>
                                <button className="action-button" onClick={handleSelectBattleMovePrompt} value={userPokemonMove4.name}>{userPokemonMove4.name}</button>
                            </div>
                        
                        :
                            null
                        }

                        {battleMovePrompt === null ? null 
                        :
                            <div className="move-card">
                                <h4>{battleMovePrompt.name}</h4>
                                <p>{battleMovePrompt.description}</p>
                                <p>Power:{battleMovePrompt.power}</p>
                                <p>PP:{battleMovePP}</p>
                                <button className="action-button" onClick={handleSelectBattleMove}>Use {battleMovePrompt.name}</button>
                                <button className="action-button" onClick={returnToBattleMoves}>Back</button>
                            </div>
                        }
                        </div>
                        <div className="trainer-battle-pokeball-container">
                            <img src={pokeBall} alt="poke-ball"/>
                            <img src={pokeBall} alt="poke-ball"/>
                            <img src={pokeBall} alt="poke-ball"/>
                            <img src={pokeBall} alt="poke-ball"/>
                            <img src={pokeBall} alt="poke-ball"/>
                            <img src={pokeBall} alt="poke-ball"/>
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
                            <p>It's super effective. {userPokemon.name} knocked out {opponentPokemon.name}</p>
                            <button className="action-button" onClick={endOpponentTurn}>End Turn</button>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Battle


