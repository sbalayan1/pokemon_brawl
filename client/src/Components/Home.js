import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import * as React from 'react'
import {Container} from 'nes-react'
import Ability from './Ability'
import Stat from './Stat'

let Home = ({currentUser, pokemonData, hiddenPokemon, userTrainer, setUserTrainer, setOpponentTrainer, userTrainerPokemon, setUserTrainerPokemon, setCopyUserTrainerPokemon, homePokemon}) => {
    const history = useHistory()
    const [foundPokemon, setFoundPokemon] = useState(null)
    const [catchPokemon, setCatchPokemon] = useState(null)
    const [displayNidoVGengar, setDisplayNidoVGengar] = useState(false)
    const [displayDragonite, setDisplayDragonite] = useState(false)
    const [displayMewTwo, setDisplayMewTwo] = useState(false)
    const [displayZapdos, setDisplayZapdos] = useState(false)
    const [displayMoltres, setDisplayMoltres] = useState(false)
    const [displayArticuno, setDisplayArticuno] = useState(false)
    const [articuno, setArticuno] = useState(homePokemon[0])
    const [zapdos, setZapdos] = useState(homePokemon[1])
    const [moltres, setMoltres] = useState(homePokemon[2])


    let handleBattle = () => {
        history.push('/battle')
    }

    let handleTeam = () => {
        history.push('/my_pc')
    }

    let handleTrainer = () => {
        history.push('/create_a_trainer')
    }

    let handleCatchPokemon = () => {
        history.push('/safari_zone')
    }

    let handleChange = (e) => {
        setFoundPokemon(e.target.value)
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        let pokemonTeam = {
            trainer_id: currentUser.trainer.id, 
            pokemon_id: pokemonData.find(pokemon => pokemon.name === foundPokemon).id,
            team_member: false
        }

        if(foundPokemon === hiddenPokemon.name && userTrainer.pokemon.find(pokemon => pokemon.name === foundPokemon) === undefined) {
            setCatchPokemon(true)
            fetch('api/pokemon_teams', {
                method: 'POST', 
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(pokemonTeam)
            })

            setUserTrainerPokemon(userTrainer.pokemon)
            setCopyUserTrainerPokemon([...userTrainerPokemon, pokemonData.find(pokemon => pokemon.name === foundPokemon).id])
        } else {
            alert('You already caught that pokemon!!!')
        }
    }

    let viewNidoGeng = () => {
        setDisplayNidoVGengar(!displayNidoVGengar)
    }

    let viewDragonite = () => {
        setDisplayDragonite(!displayDragonite)
    }

    let viewMewTwo = () => {
        setDisplayMewTwo(!displayMewTwo)
    }

    let viewZapdos = () => {
        setDisplayZapdos(!displayZapdos)
    }

    let viewMoltres = () => {
        setDisplayMoltres(!displayMoltres)
    }

    let viewArticuno = () => {
        setDisplayArticuno(!displayArticuno)
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

    useEffect(() => {
        fetch('/api/trainers')
        .then(res => res.json())
        .then(data => {
            if (currentUser !== null) {
                if (data.find(trainer=> trainer.user_id === currentUser.id)===undefined) {
                    history.push('/create_a_trainer')
                } else {
                    setUserTrainer(data.find(trainer=> trainer.user_id === currentUser.id))
                    let opponentTrainers = data.filter(trainer => trainer.user_id !== currentUser.id)
                    setOpponentTrainer(opponentTrainers[Math.floor(Math.random() * opponentTrainers.length)])
                    setUserTrainerPokemon(data.find(trainer=> trainer.user_id === currentUser.id).pokemon)
                    setCopyUserTrainerPokemon(data.find(trainer=> trainer.user_id === currentUser.id).pokemon)
                }
            }
        })
    },[])

    return (
        <div className="home-container">
            <div className="home-battle-container">
                <div className="home-battle-description-card">
                    <div style={{backgroundColor:'lightgrey', height:'80%', display: 'flex', flexDirection:'column', justifyContent:'flex-end'}}>
                        <h2 style={{marginLeft:'5px'}}>Pokemon Brawl is a Pokemon Battle simulator.</h2>
                        <p style={{marginLeft:'10px', marginTop:'10px', fontSize: '15px'}}><small>Play Pokémon battles online! Play with randomly generated teams, or build your own!</small></p>
                        <button className="home-battle-button" onClick={handleBattle}>Battle</button>
                    </div>
                    <div style={{backgroundColor:'darkgrey', width: '100%', height: '20%'}}></div>
                </div>
                <div className="home-image-card" style={displayNidoVGengar === false ? {backgroundColor:'orangered'} : {backgroundColor:'black'}}>
                    <div style={{height:'50vh', width:'10%', backgroundColor:'orange'}}></div>
                    <div style={{height:'50vh', width: '100%', marginLeft:'150px'}}>
                        {displayNidoVGengar === false ? <img className="home-image-card" style={{backgroundColor:'crimson', borderRadius:'16px'}} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" alt="pokemon-image" onClick={viewNidoGeng}/> 
                        : <img style={{height:'300px', backgroundColor:'black'}} className="home-image-card" src="https://pa1.narvii.com/5739/0cfc841303d738f67cdb9e5f286606c0ae1ab749_hq.gif" alt="nidoVgengar" onClick={viewNidoGeng}/>}
                    </div>
                </div>
            </div>
            <div className="home-build-team-create-trainer-container">
                <div className="home-battle-description-card" style={{backgroundColor:'lightyellow', display: 'flex', justifyContent:'space-evenly'}}>
                    <div style={{backgroundColor:'crimson', height:'10%', width:'100%', borderRadius:'16px'}}></div>
                    <div>
                        {displayDragonite === false ? <img className="home-image-thumbnail" style={{backgroundColor:'gold'}} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png"  alt="pokemon-image" onClick={viewDragonite}/>
                        :
                            <img style={{height:'110px'}} src="https://giffiles.alphacoders.com/480/48081.gif" alt="pokemon-image" onClick={viewDragonite}/>
                        }
                        <button className="dragonite-button" onClick={handleTeam}>Build my team</button>
                    </div>
                    <div style={{backgroundColor:'crimson', height:'10%', width:'100%', borderRadius:'16px'}}></div>
                </div>
                <div className="home-battle-description-card" style={{backgroundColor:'violet'}}>
                    {displayMewTwo === false ? <img className="home-image-thumbnail" style={{backgroundColor:'purple'}} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" alt="pokemon-image" onClick={viewMewTwo}/>
                    :
                        <img style={{height:'110px'}} className="home-image-thumbnail" src="http://24.media.tumblr.com/096c8fb8e51532f442c31277293125a5/tumblr_mpzo1sXWK11sa13zpo1_500.gif"  alt="pokemon-image" onClick={viewMewTwo}/>

                    }
                    {userTrainer === null ?  <button style={{backgroundColor:'violet'}} onClick={handleTrainer}>Create a trainer</button> : <button className="mewtwo-button" onClick={handleCatchPokemon}>Catch Pokemon</button>}
                </div>
            </div>
            <div className="who-that-pokemon-container-home">
                <div className="who-that-pokemon-card">
                    <div className="format-card">
                        {foundPokemon !== hiddenPokemon.name ? null : <p style={{marginLeft: '160px'}}>It's {hiddenPokemon.name.charAt(0).toUpperCase() + hiddenPokemon.name.slice(1)}!!!</p>}
                        {foundPokemon !== hiddenPokemon.name ? <img className="who-that-pokemon-image" style={{opacity:'0.05'}} src={hiddenPokemon.front_image} alt='pokemon-image'/> : <img className="who-that-pokemon-image" src={hiddenPokemon.front_image} alt='pokemon-image'/>}
                    </div>
                </div>

                {catchPokemon === null? 
                    <div className="home-battle-description-card">
                        <h1>Who's that Pokemon?</h1>
                        <input onChange={handleChange} placeholder="Guess that Pokemon!!"/>
                        {foundPokemon !== hiddenPokemon.name? null : <button onClick={handleSubmit}>Catch that Pokemon!!!</button> }
                    </div>
                :
                    <div className="home-battle-description-card">
                        <h2>You caught {foundPokemon}!!</h2>
                        <img className="who-that-pokemon-image-2" src={hiddenPokemon.front_image} alt='pokemon-image'/>
                        <p>Check your PC to see your new Pokemon!</p>
                    </div>
                }
            </div>
            <div className="home-pokemon-description-container">
                <div className="home-pokemon-description-card" style={{backgroundColor:'lightyellow'}}>
                    {displayZapdos === false ? <img style={{backgroundColor:'lightgreen'}} className="home-image-thumbnail" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png"  alt="pokemon-image" onClick={viewZapdos}/>
                    :
                        <img style={{height:'100px'}} className="home-image-thumbnail" src='https://64.media.tumblr.com/283d7a9b2d425f3b9bc526fa544c2415/tumblr_olpgcl6z5p1rc40z5o2_500.gifv'  alt="pokemon-image" onClick={viewZapdos}/>
                    }

                    <p>{zapdos.name.charAt(0).toUpperCase() + zapdos.name.slice(1)}</p>
                    <div className="home-poke-type-card">

                        <p style={{backgroundColor:colorType.find(findType => findType.type === zapdos.types[0]).color}}>
                            <small>{zapdos.types[0]}</small>
                        </p>

                        <p style={{backgroundColor:colorType.find(findType => findType.type === zapdos.types[1]).color}}>
                            <small>{zapdos.types[1]}</small>
                        </p>
                    </div>
                    <h4>Stats</h4>
                    {/* {zapdos.stats.map(stat => {
                        return (<Stat stat={stat}/>)
                    })} */}

                    {/* needs to be fixed!! */}
                    <div className="home-poke-ability-card">
                        {zapdos.abilities.map(ability => <Ability pokemon={zapdos}/>)}
                    </div>
                </div>
                <div className="home-pokemon-description-card" style={{backgroundColor:'crimson'}}>
                    {displayMoltres === false ? <img className="home-image-thumbnail" style={{backgroundColor:'gold'}} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png"  alt="pokemon-image" onClick={viewMoltres}/>
                    :
                        <img style={{height:'100px'}} className="home-image-thumbnail" src='https://thumbs.gfycat.com/CreamyHappyAmazontreeboa-size_restricted.gif'  alt="pokemon-image" onClick={viewMoltres}/>
                    }
                    <p>{moltres.name.charAt(0).toUpperCase() + moltres.name.slice(1)}</p>
                    <div className="home-poke-type-card">
                        <p style={{backgroundColor:colorType.find(findType => findType.type === moltres.types[0]).color}}>
                            <small>{moltres.types[0]}</small>
                        </p>
                        <p style={{backgroundColor:colorType.find(findType => findType.type === moltres.types[1]).color}}>
                            <small>{moltres.types[1]}</small>
                        </p>
                    </div>
                    <h4>Stats</h4>
                    {/* {moltres.stats.map(stat => {
                        return (<Stat stat={stat}/>)
                    })} */}

                    {/* Needs to be fixed  */}
                    <div className="home-poke-ability-card">
                        {moltres.abilities.map(ability => <Ability pokemon={moltres}/>)}
                    </div>
                </div>
                <div className="home-pokemon-description-card" style={{backgroundColor:'aquamarine'}}> 
                    {displayArticuno === false ? <img className="home-image-thumbnail" style={{backgroundColor:'orange'}} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png" alt="pokemon-image" onClick={viewArticuno}/>
                    :
                        <img style={{height:'100px'}} className="home-image-thumbnail" src='http://37.media.tumblr.com/500bc8bf48fce4915723b33cfd38d645/tumblr_ms9yiz777J1rey868o1_500.gif'  alt="pokemon-image" onClick={viewArticuno}/>
                    }
                    <p>{articuno.name.charAt(0).toUpperCase() + articuno.name.slice(1)}</p>
                    <div className="home-poke-type-card">
                        <p style={{backgroundColor:colorType.find(findType => findType.type === articuno.types[0]).color}}>
                            <small>{articuno.types[0]}</small>
                        </p>
                        <p style={{backgroundColor:colorType.find(findType => findType.type === articuno.types[1]).color}}>
                            <small>{articuno.types[1]}</small>
                        </p>
                    </div>
                    <h4>Stats</h4>
                    {/* {articuno.stats.map(stat => {
                        return (<Stat stat={stat}/>)
                    })} */}
                    <div className="home-poke-ability-card">
                        <h5 style={{margin:'5px'}}>
                            snow-cloak
                        </h5>
                        <p style={{margin:'5px', fontSize:'12px'}}>
                            Boosts evasion in a hailstorm.
                        </p>
                        <h5 style={{margin:'5px', fontSize:'12px'}}>
                            pressure
                        </h5>
                        <p style={{margin:'5px', fontSize:'12px'}}>
                            Raises foe's PP usage.
                        </p>

                    </div>
                </div>
            </div>
            <div className="footer">Copyright 2021 - SeanB</div>
        </div>
    )
}

export default Home