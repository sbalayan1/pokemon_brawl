import {useState, useEffect} from 'react'

import Pokemon from './Pokemon'
import PokeBall from './PokeBall'
import Stat from './Stat'
import Ability from './Ability'
import Move from './Move'

let PC = ({pokemonData, currentUser, userTrainer, userTrainerPokemon, setUserTrainerPokemon, copyUserTrainerPokemon, setCopyUserTrainerPokemon}) => {
    const [searchedPokemon, setSearchedPokemon] = useState(null)
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [pokeBall, setPokeBall] = useState(null)
    const [pokeTeam, setTeam] = useState(userTrainer.pokemon_teams.filter(pokemon => pokemon.team_member === true))
    const [copyTeam, setCopyTeam] = useState(pokeTeam)
    const [displayTeam, setDisplayTeam] = useState(false)
    const [typeCount, setTypeCount] = useState(null)

    let handleChange = (e) => {
        setSearchedPokemon(e.target.value)
        if (searchedPokemon==="") {
            setSearchedPokemon(null)
        }
    }

    console.log(copyUserTrainerPokemon)
    console.log(userTrainerPokemon)
    let displayPokemon =  copyUserTrainerPokemon.filter(pokemon => pokemon.name.includes(searchedPokemon))

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/item/poke-ball')
        .then(res => res.json())
        .then(data => {
            setPokeBall(data.sprites.default)
        })
    },[])

    let closeSelectedPokemonTab = () => {
        setSelectedPokemon(null)
        setTypeCount(null)
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

    return (
        <div className="pc-container">
            <div className="search-bar-container">
                <input className="search-bar" placeholder="Search" type="text" onChange={handleChange}/>
            </div>
            <div className="team-container">
                <div style={{backgroundColor:"lightgray", borderRight:'1px solid black', borderTopLeftRadius: '16px', borderBottomLeftRadius:'16px'}}>
                    <h3 style={{marginLeft:'5px'}}>My Team</h3>
                </div>
                <div style={{display:'flex', justifyContent:'space-evenly', width:'100%'}}>
                    {copyTeam.map (pokemon => <PokeBall pokemon={pokemon} pokeBall={pokeBall} pokemonData={pokemonData} displayTeam={displayTeam} setDisplayTeam={setDisplayTeam} setTeam={setTeam} copyTeam={copyTeam} setCopyTeam={setCopyTeam} userTrainer={userTrainer}/>
                )}
                </div>
            </div>
            <div className="pc-pokemon-container">
                <div style={{display:'flex', justifyContent:'center'}}>
                    <div style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                        <h3 className="my-pokemon-header">My Pokemon</h3>
                        <div className="pc-pokemon-card">
                            {searchedPokemon === null ? 
                                copyUserTrainerPokemon.map(pokemon => <Pokemon pokemonData={pokemonData} pokemon={pokemon} pokeTeam={pokeTeam} copyTeam={copyTeam} setCopyTeam={setCopyTeam} setTeam={setTeam} userTrainer={userTrainer} setSelectedPokemon={setSelectedPokemon} setTypeCount={setTypeCount}/>)
                                
                            :
                                displayPokemon.map (pokemon => <Pokemon  pokemonData={pokemonData} pokemon={pokemon} pokeTeam={pokeTeam} copyTeam={copyTeam} setCopyTeam={setCopyTeam}  setTeam={setTeam} userTrainer={userTrainer} setSelectedPokemon={setSelectedPokemon} setTypeCount={setTypeCount}/>)
                            }
                        </div>
                    </div>
                    {selectedPokemon === null ? null : 
                            <div className="pc-select-pokemon-card">
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
        </div>
    )
}   

export default PC