import {useState, useEffect} from 'react'
import Pokemon from './Pokemon'
import Team from './Team'
import Selected from './Selected'


let PC = ({pokeBall, pokemonData, userTrainer, copyUserTrainerPokemon}) => {
    let findTeam = userTrainer.pokemon_teams.filter(p => p.team_member === true)

    const [searched, setSearched] = useState("")
    const [selected, setSelected] = useState(null)
    const [team, setTeam] = useState(findTeam)
    const [displayTeam, setDisplayTeam] = useState(false)
    const [typeCount, setTypeCount] = useState(null)

    let handleChange = (e) => {
        setSearched(e.target.value)
    }

    let renderPokemon = () => {
        let poke = searched !== "" ? copyUserTrainerPokemon.filter(pokemon => pokemon.name.includes(searched)) : copyUserTrainerPokemon 

        return poke.map(pokemon => 
            <Pokemon
                key={pokemon.name}
                pokemonData={pokemonData.current} 
                pokemon={pokemon} 
                team={team} 
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
                        <Team
                            key={pokemon.id}
                            pokemon={pokemon} 
                            pokeBall={pokeBall} 
                            pokemonData={pokemonData.current} 
                            displayTeam={displayTeam} 
                            setDisplayTeam={setDisplayTeam} 
                            setTeam={setTeam} 
                            team={team}
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
                            {renderPokemon()}
                        </div>
                    </div>
                    {selected === null ? null : <Selected selected={selected} closeSelectedPokemonTab={closeSelectedPokemonTab} typeCount={typeCount} />     
                    }
                </div>
            </div>
        </div>
    )
}   

export default PC