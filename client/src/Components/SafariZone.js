import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Move from './PC/Move'
import Ability from './PC/Ability'


let SafariZone = ({pokemonData, userTrainer}) => {       
    let catchRates = [0.1,0.2,0.3,0.4,0.5,0.6,0.7, 0.8, 0.9, 1]
    const history = useHistory()
    const [safariZoneLoad, setSafariZoneLoad] = useState(false)
    const targetPokemon = pokemonData[Math.floor(Math.random()*pokemonData.length)]
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const pokemonCatchRate = catchRates[Math.floor(Math.random()*catchRates.length)]
    const [catchRate, setCatchRate] = useState((((3*targetPokemon.stats[0].hp) - (2*targetPokemon.stats[0].hp)) * pokemonCatchRate)/(3*targetPokemon.stats[0].hp))
    const [targetPokeHP, setTargetPokeHP] = useState(targetPokemon.stats[0].hp)
    const [initialMove, setInitialMove] = useState(null)
    const [targetPokemonMove, setTargetPokemonMove] = useState(null)
    const [catchingPokemon, setCatchingPokemon] = useState(null)
    const [pokeBallsUsed, setPokeBallsUsed] = useState(0)
    const [pokeBallCount, setPokeBallCount] = useState(30)
    const [baitCount, setBaitCount] = useState(0)
    const [caught, setCaught] = useState(null)
    const [displayPokemon, setDisplayPokemon] = useState(false)
    const flyingPokemon1 = pokemonData.find(pokemon => pokemon.name === 'pidgey').front_image
    const flyingPokemon2 = pokemonData.find(pokemon => pokemon.name === 'pidgeotto').front_image
    const flyingPokemon3 = pokemonData.find(pokemon => pokemon.name === 'pidgeot').front_image
    const [typeCount, setTypeCount] = useState(null)
    let targetPokemonMoves = ['watching', 'flee']

    let enterSafariZone = () => {
        setSafariZoneLoad(true)
        setSelectedPokemon(pokemonData.find(poke => poke.name === targetPokemon.name))
        setTypeCount([...new Map(pokemonData.find(poke => poke.name === targetPokemon.name).types.map(type => [type['name'], type])).values()].length)
    }

    let colorType = [
        {type: 'grass', color:'green'},
        {type: 'poison', color:'plum'},
        {type: 'normal', color:'white'},
        {type: 'flying', color:'lightgrey'},
        {type: 'fire', color: 'red'},
        {type: 'water', color: 'blue'},
        {type: 'bug', color: 'lightgreen'}, 
        {type: 'electric', color: 'yellow'}, 
        {type: 'ground', color: 'burlywood'}, 
        {type: 'fairy', color: 'lightpink'}, 
        {type: 'fighting', color: 'darkred'}, 
        {type: 'psychic', color:'pink'}, 
        {type: 'rock', color: 'brown'}, 
        {type: 'steel', color: 'grey'}, 
        {type: 'ice', color: 'lightblue'},
        {type: 'ghost', color: 'purple'},
        {type: 'dragon', color: 'darkblue'}
    ]

    let selectInitialMove = (e) => {

        if(e.target.value === 'threw a PokeBall') {
            setInitialMove(e.target.value)
            setPokeBallCount(pokeBallCount-1)
            setPokeBallsUsed(pokeBallsUsed+1)
            setTimeout(() => {
                calculateCatch()
        
            }, 2000)

        } else if (e.target.value === 'threw bait') {
            setInitialMove(e.target.value)
            setCatchRate(catchRate+0.1)
            setBaitCount(baitCount+1)

            setTimeout(() => {
                initiateTargetPokemonMove()
            }, 3000)
        } else if (e.target.value === 'threw a rock') {
            setInitialMove(e.target.value)
            setTargetPokeHP(targetPokeHP-5)
            setCatchRate(((((3*targetPokemon.stats[0].hp) - (2*(targetPokeHP-5)))* (pokemonCatchRate*(targetPokemon.stats[0].hp/(targetPokeHP-5))))/(3*targetPokemon.stats[0].hp))+(baitCount*0.1))

            setTimeout(() => {
                initiateTargetPokemonMove()
            }, 3000)
        } else if (e.target.value === 'Flee') {
            setInitialMove(e.target.value)
        }
    }

    let initiateTargetPokemonMove = () => {
        setInitialMove(null)
        if (baitCount === 0 ){
            setTargetPokemonMove(targetPokemonMoves[Math.floor(Math.random()*targetPokemonMoves.length)])
        } else {
            setTargetPokemonMove(targetPokemonMoves[Math.floor((Math.random()*targetPokemonMoves.length)*(baitCount-1))]) 
        }

        setTimeout(() => {
            setTargetPokemonMove(null)
        },3000)

    }

    let calculateCatch = () => {
        setInitialMove(null)
        setCatchingPokemon(true)
        setTimeout(() => {
            if (pokeBallsUsed+1 >= 1/catchRate || 1/catchRate >= 1) {
                setCatchingPokemon(null)
                setCaught(true)

                let pokemonTeam = {
                    trainer_id: userTrainer.id, 
                    pokemon_id: targetPokemon.id,
                    team_member: false
                }

                fetch('http://localhost:3000/pokemon_teams', {
                method: 'POST', 
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(pokemonTeam)
                })

            } else {
                alert(`Oh no! ${targetPokemon.name} broke free!!`)
                setCatchingPokemon(null)
                setCaught(null)
                initiateTargetPokemonMove()
            }
        }, 2000)
    }

    let openSelectedPokemonTab = () => {
        setDisplayPokemon(!displayPokemon)
    }

    let closeSelectedPokemonTab = () => {
        setDisplayPokemon(!displayPokemon)
    }
    
    let exitSafariZone = () => {
        history.push('/')
    }


    return (
        <div className="battle-sfzone-container" style={{height:'1000px'}}>
            {safariZoneLoad === false ? 
                <div className="sf-zone-load-container">
                    <img style={{height:'400px', border:'3px solid orange'}} src='https://comicvine.gamespot.com/a/uploads/original/11/114183/5211397-safari_zone_anime.png' alt="safari-zone"/>
                    <button className="action-button" onClick={enterSafariZone}>Enter the Safari Zone</button>
                </div>
            :
                <div style={{width: '100%', height:'1000px'}}> 
                    <div className="flying-pidgeot-container" style={{display:'flex'}}>
                            <p>Welcome to the Safari Zone!!</p>
                            <img className="flying-pidgeot" src={flyingPokemon3} alt="flying-pidgeot"/>
                            <img className="flying-pidgeot" src={flyingPokemon2} alt="flying-pidgeot"/>
                            <img className="flying-pidgeot" src={flyingPokemon1} alt="flying-pidgeot"/>
                    </div>
                    <div className="sf-zone-container" style={{display:'flex',justifyContent:'center', width: '100%', height: '100%'}}>
                        <div className="battle-sfzone-container" style={{width:'50%'}}>
                            {caught === null ?   
                                <div className="zone-container" style={{width:'100%'}}>
                                    <div className="opponent-decision-making-container">
                                        <div className="stats-card">
                                            <div className="hp-card">
                                                {initialMove === 'threw a rock' ? 
                                                    <p style={{marginLeft:'5px', backgroundColor:'red'}}>HP: {targetPokeHP}</p>
                                                :

                                                    <p style={{marginLeft:'5px'}}>HP: {targetPokeHP}</p>
                                                }
                                                <p>LVL: {targetPokemon.level}</p>
                                            </div>
                                            <div className="attack-card">
                                                <p style={{marginLeft:'5px'}}><small>ATK: {targetPokemon.stats[0].attack}</small></p>
                                                <p><small>DEF: {targetPokemon.stats[0].defense}</small></p>
                                                <p><small>SP ATK: {targetPokemon.stats[0].sp_attack}</small></p>
                                                <p><small>SP DEF: {targetPokemon.stats[0].sp_defense}</small></p>
                                                <p><small>SPD:{targetPokemon.stats[0].speed}</small></p>
                                            </div>
                                        </div>
                                        <img className="zone-image-card" src={targetPokemon.front_image} onClick={openSelectedPokemonTab}/>
                                    </div>
                                </div>
                            
                            :
                                null
                            }
                
                            {initialMove === 'threw a PokeBall' ?  
                                <img className="pokemon-attack" src='https://c.tenor.com/AkILqGsdIFoAAAAM/pokemon-ash.gif' alt='ash-throwing-pokeball'/>
                            :
                                null
                            }

                            {initialMove === 'threw bait' ? 
                                <>
                                    <h5>{userTrainer.name} threw bait. {targetPokemon.name} likes the food!! Pokemon catch rate increased.</h5>
                                    <img className="pokemon-attack" src='https://thumbs.gfycat.com/LiquidTanAmericanwirehair-size_restricted.gif' alt='pokemon-eating-food'/>
                                </>
                            
                            :
                                null 
                            }

                            {initialMove === 'Flee' ? 
                                <>
                                    {alert(`You flee'd the encounter! Sending ${userTrainer.name} back home!`)}
                                    {history.push('/')}
                                </>
                            
                            :
                                null 
                            }

                            
                            {initialMove === 'threw a rock' ? 
                                <>
                                    <h5>{userTrainer.name} threw a rock. {targetPokemon.name}'s HP decreased by 5. {targetPokemon.name} is getting angry.</h5>
                                        <img className="pokemon-attack" src='https://c.tenor.com/8fbygqCrmrIAAAAC/pokemon-jigglypuff.gif' alt='angry-pokemon'/>
                                </>

                            :
                                null 
                            }

                            {targetPokemonMove === 'watching' ? 
                                <>
                                    <h5>{targetPokemon.name} is watching carefully.</h5>
                                    <img className="pokemon-attack" src='https://i.pinimg.com/originals/18/e5/80/18e580e9fbb87f79a00a921a5e4d01db.gif' alt='pokemon-watching'/>

                                </>
                        
                            :
                                null
                            }

                            {targetPokemonMove === 'flee' ? 
                                <>
                                    {alert(`${targetPokemon.name} flee'd the encounter! Sending ${userTrainer.name} back home!`)}
                                    {history.push('/')}
                                </>
                            :

                                null
                            }

                            {catchingPokemon === true ?  
                                <img className="pokemon-attack" src='https://i.imgur.com/Fyj3etH.gif' alt='ash-throwing-pokeball'/>
                            :
                                null
                            }

                            {caught === true ? 
                                <>
                                    <h5>Congratulations you caught {targetPokemon.name}!!!</h5>
                                    <img style={{backgroundColor:'orange'}} className="pokemon-attack" src={targetPokemon.front_image} alt='caught-pokemon-gif'/>
                                    <button className="action-button" onClick={exitSafariZone}>Exit the Safari Zone</button>
                                </>
                            :
                                null
                            }

                            {caught === null ?        
                                <div className="zone-container" style={{width:'100%'}}>
                                    <img className="zone-image-card" src='https://archives.bulbagarden.net/media/upload/3/30/RB_Old_man_Back.png'/>
                                    <div className="trainer-decision-making-container">
                                        <div className="trainer-stats-card">
                                            <div className="hp-card">
                                                <p>Safari Balls</p>
                                            </div>
                                            <div className="attack-card">
                                                <p><small>Left: {pokeBallCount} </small></p>
                                            </div>
                                        </div>
                                        {initialMove === null ?
                                            <div className="move-card">
                                                <button className="action-button" onClick={selectInitialMove} value="threw a PokeBall">Throw a Safari Ball</button>
                                                <button className="action-button" onClick={selectInitialMove} value="threw bait">Throw bait</button>
                                                <button className="action-button" onClick={selectInitialMove} value="threw a rock">Throw a rock</button>
                                                <button className="action-button" onClick={selectInitialMove} value="Flee">Flee</button>
                                            </div>

                                        :
                                            <div className="move-card">
                                                <p>{userTrainer.name} {initialMove}!</p>
                                            </div>
                                        }   
                                    </div>
                                </div>
                            :
                                null
                            }
                        </div>
                        {displayPokemon === false ? 
                            null 
                        :

                            <div className="pc-select-pokemon-card" style={{height:'800px', width: '350px'}}>
                                <div className="select-poke-card">
                                    <button className="select-poke-button" style={{backgroundColor:'Red'}} onClick={closeSelectedPokemonTab}>X</button>
                                </div>
                                <h3>{selectedPokemon.name}</h3>
                                <img className="pokemon-pc-sprite" style={{height:'40%'},{width:'40%'}} src={selectedPokemon.front_image} alt="pokemon"/>
                                {typeCount === 2 ? 
                                    <div className="pc-select-type">
                                        <h4>Types:</h4>
                                        <p style={{backgroundColor:colorType.find(findType => findType.type === [...new Map(selectedPokemon.types.map(type => [type['name'], type])).values()][0].name).color}}>{[...new Map(selectedPokemon.types.map(type => [type['name'], type])).values()][0].name}</p>
                                        <p style={{backgroundColor:colorType.find(findType => findType.type === [...new Map(selectedPokemon.types.map(type => [type['name'], type])).values()][1].name).color}}>{[...new Map(selectedPokemon.types.map(type => [type['name'], type])).values()][1].name}</p>
                                    </div>
                                :
                                    null
                                }

                                {typeCount === 1 ? 
                                    <div className="pc-select-type">
                                        <h4>Type:</h4>
                                        <p style={{backgroundColor: colorType.find(findType => findType.type === [...new Map(selectedPokemon.types.map(type => [type['name'], type])).values()][0].name).color}}>{[...new Map(selectedPokemon.types.map(type => [type['name'], type])).values()][0].name}</p>
                                    </div>
                                
                                :
                                    null 
                                }

                                <div>
                                    <h4>Stats</h4>
                                    {selectedPokemon.stats.map(stat => {
                                        return (
                                            <div className="pc-select-stat-2">
                                                <p><b>HP:</b> {stat.hp}</p>
                                                <p><b>ATK:</b> {stat.attack}</p>
                                                <p><b>DEF:</b> {stat.defense}</p>
                                                <p><b>SPD:</b> {stat.speed}</p>
                                                <p><b>SP ATK:</b> {stat.sp_attack}</p>
                                                <p><b>SP DEF:</b> {stat.sp_defense}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="pc-select-ability">
                                    <h4>Abilities</h4>
                                    {[...new Map(selectedPokemon.abilities.map(ability => [ability['name'], ability])).values()].map(ability => {
                                        return(<Ability ability={ability}/>)
                                    })}
                                </div>
                                <div className="pc-select-move">
                                    <h4>Moves</h4>
                                    {selectedPokemon.moves.map(move => {
                                        return(<Move move={move}/>)
                                    })}
                                </div>
                        </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default SafariZone