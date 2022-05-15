import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import UserPokemon from './UserPokemon'
import InitialMove from './InitialMove'
import BattleMoveCard from './BattleMoveCard'


let UserCard = ({pokeBall, userTrainer, opponentDamage}) => {
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)

    // user selection states
    const [displayTeam, setDisplayTeam] = useState(false)
    const [selectedMove, setSelectedMove] = useState(null)

    // userTeam states
    const [userTeam, setUserTeam] = useState(null)
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [hp, setHP] = useState(null)
    const [move1, setMove1] = useState(null)
    const [move2, setMove2] = useState(null)
    const [move3, setMove3] = useState(null)
    const [move4, setMove4] = useState(null)
    const [movePP, setMovePP] = useState(null)

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

    let fetchMove = async (url) => {
        try {
            let move = await fetch (url)
            let data = move.json()
            let results = await data
            return results
        } catch (error){
            console.error(error)
        }
    }

    let selectMove = (e) => {
        if(e.target.value === 'Fight' || e.target.value === 'Bag') {
            setSelectedMove(e.target.value)
        } else if (e.target.value === 'Pokemon') {
            setDisplayTeam(!displayTeam)        
        } else if (e.target.value === 'Run') {
            alert("You flee'd the battle. A loss will be registered to the database. Feel free to try again!!! Sending you back to the home page.")
            history.push('/')
        }
    }

    let renderInitialMove = () => {
        return !selectedMove ?   
            <InitialMove 
                displayTeam={displayTeam}
                selectMove={selectMove}
            />
        :
            null
    }

    let renderBattleMove = () => {
        return selectedMove === 'Fight' ? 
            <BattleMoveCard 
                displayTeam={displayTeam}
                selectedPokemon={selectedPokemon}
                // selectedPokemonMoves={[move1, move2, move3, move4]}
                setFightMove={setSelectedMove}
                movePP={movePP}
                setMovePP={setMovePP}
            />
        :   
            null
    }

    let sendOutPokemon = (e) => {
        if (selectedPokemon.name !== e.target.name) {
            let pokemon = userTeam.find(p => p.name === e.target.name)
            setSelectedPokemon(pokemon)
            setHP(pokemon.stats.hp)
            setMove1(pokemon.moves[0])
            setMove2(pokemon.moves[1])
            setMove3(pokemon.moves[2])
            setMove4(pokemon.moves[3])
            setDisplayTeam(!displayTeam)      
            alert(`${userTrainer.name} sent out ${pokemon.name}`)
            // initiateOpponentMove()
        } else {
            alert('That Pokemon is already out! Choose a different Pokemon!!')
        }   
    }

    useEffect(() => {
        fetchUserTeam().then(data => {
            setSelectedPokemon(data[0])
            setUserTeam(data)
            setHP(data[0].stats.hp)
            let name = data[0].name
            let moves = [data[0].moves[0], data[0].moves[1], data[0].moves[2], data[0].moves[3]]


            data.forEach(pokemon => {
                setMovePP({...movePP, [pokemon.name]: {}})
                console.log(movePP)
            })
            // moves.map(move => {
            //     fetchMove(`/api/pokemon/move/${move.name}`)
            //     .then(moveData => {
            //         setMovePP({...movePP, 
            //             [name]: {[moveData.name]: moveData}
            //         })
            //     })
            // })
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
                            <p style={{marginLeft:'5px'}}><small>ATK: {selectedPokemon.stats.attack}</small></p>
                            <p><small>DEF: {selectedPokemon.stats.defense}</small></p>
                            <p><small>SP ATK: {selectedPokemon.stats['special-attack']}</small></p>
                            <p><small>SP DEF: {selectedPokemon.stats['special-defense']}</small></p>
                            <p><small>SPD: {selectedPokemon.stats.speed}</small></p>
                        </div>
                    </div>
                    
                    {renderInitialMove()}
                    {renderBattleMove()}
                </div>
                <div className="trainer-battle-pokeball-container">
                    <UserPokemon
                        displayTeam={displayTeam}
                        userTeam={userTeam}
                        pokeBall={pokeBall}
                        sendOutPokemon={sendOutPokemon}
                    />
                </div>
            </div>
        )    
    }

    return isLoaded === true ? renderUser() : null
}



export default UserCard