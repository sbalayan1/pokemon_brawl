import {useState, useEffect} from 'react'
import Pokemon from './Pokemon'
import PokeBall from './PokeBall'
import Ability from './Ability'
import Move from './Move'

let PC = ({pokeBall, pokemonData, userTrainer, copyUserTrainerPokemon}) => {
    const [searched, setSearched] = useState("")
    const [selected, setSelected] = useState(null)
    const [team, setTeam] = useState(userTrainer.pokemon_teams.filter(pokemon => pokemon.team_member === true))
    const [displayTeam, setDisplayTeam] = useState(false)
    const [typeCount, setTypeCount] = useState(null)

    let handleChange = (e) => {
        setSearched(e.target.value)
    }

    let renderPokemon = () => {
        let poke = searched !== "" ? copyUserTrainerPokemon.filter(pokemon => pokemon.names.includes(searched)) : copyUserTrainerPokemon
        
        return poke.map(pokemon => 
            <Pokemon 
                pokemonData={pokemonData} 
                pokemon={pokemon} 
                team={team}
                setCopyTeam={setCopyTeam}  
                setTeam={setTeam} 
                userTrainer={userTrainer} 
                setSelected={setSelected} 
                setTypeCount={setTypeCount}
            />
        )
    }

    let closeSelectedPokemonTab = () => {
        setSelected(null)
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
                    {team.map (pokemon => 
                        <PokeBall 
                            pokemon={pokemon} 
                            pokeBall={pokeBall} 
                            pokemonData={pokemonData} 
                            displayTeam={displayTeam} 
                            setDisplayTeam={setDisplayTeam} 
                            setTeam={setTeam} 
                            team={team}
                            setCopyTeam={setCopyTeam} 
                            userTrainer={userTrainer}
                        />
                    )}
                </div>
            </div>
            <div className="pc-pokemon-container">
                <div style={{display:'flex', justifyContent:'center'}}>
                    <div style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                        <h3 className="my-pokemon-header">My Pokemon</h3>
                        <div className="pc-pokemon-card">
                            {searched === "" ? 
                                copyUserTrainerPokemon.map(pokemon => 
                                    <Pokemon 
                                        pokemonData={pokemonData} 
                                        pokemon={pokemon} 
                                        team={team}
                                        setCopyTeam={setCopyTeam} 
                                        setTeam={setTeam} 
                                        userTrainer={userTrainer} 
                                        setSelected={setSelected} 
                                        setTypeCount={setTypeCount}
                                    />
                                )
                                
                            :
                                {renderPokemon}
                            }
                        </div>
                    </div>
                    {selected === null ? null : 
                            <div className="pc-select-pokemon-card">
                                <div className="select-poke-card">
                                    <button className="select-poke-button" style={{backgroundColor:'Red'}} onClick={closeSelectedPokemonTab}>X</button>
                                </div>
                                <h3>{selected.name}</h3>
                                <img className="pokemon-pc-sprite" style={{height:'40%',width:'40%'}} src={selected.front_image} alt="pokemon"/>
                                {typeCount === 2 ? 
                                    <div className="pc-select-type">
                                    <h4>Types:</h4>
                                    <p style={{backgroundColor:colorType.find(findType => findType.type === [...new Map(selected.types.map(type => [type['name'], type])).values()][0].name).color}}>{[...new Map(selected.types.map(type => [type['name'], type])).values()][0].name}</p>
                                    <p style={{backgroundColor:colorType.find(findType => findType.type === [...new Map(selected.types.map(type => [type['name'], type])).values()][1].name).color}}>{[...new Map(selected.types.map(type => [type['name'], type])).values()][1].name}</p>
                                </div>
                                :
                                    null
                                }

                                {typeCount === 1 ? 
                                    <div className="pc-select-type">
                                        <h4>Type:</h4>
                                        <p style={{backgroundColor: colorType.find(findType => findType.type === [...new Map(selected.types.map(type => [type['name'], type])).values()][0].name).color}}>{[...new Map(selected.types.map(type => [type['name'], type])).values()][0].name}</p>
                                    </div>
                                
                                :
                                    null 
                                }

                                <div>
                                    <h4>Stats</h4>
                                    {selected.stats.map(stat => {
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
                                    {[...new Map(selected.abilities.map(ability => [ability['name'], ability])).values()].map(ability => {
                                        return(<Ability ability={ability}/>)
                                    })}
                                </div>
                                <div className="pc-select-move">
                                    <h4>Moves</h4>
                                    {selected.moves.map(move => {
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