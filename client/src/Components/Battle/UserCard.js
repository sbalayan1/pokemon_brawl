import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import UserPokemon from './UserPokemon'
import InitialMove from './InitialMove'
import BattleMoveCard from './BattleMoveCard'


let UserCard = ({pokeBall, userTrainer, opponentDamage, healthMovePP, setHealthMovePP}) => {
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)

    // user selection states
    const [displayTeam, setDisplayTeam] = useState(false)
    const [selectedMove, setSelectedMove] = useState(null)

    // userTeam states
    const [userTeam, setUserTeam] = useState(null)
    const [selectedPokemon, setSelectedPokemon] = useState(null)

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

    let fetchMoves = async (moves) => {
        try {
            let movePromise = await Promise.all(moves.map(move => fetch(`/api/pokemon/move/${move.name}`)))
            let moveData = movePromise.map(res => res.json())
            let results = await Promise.all(moveData)
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

    let seedHealthMovePP = (movesArray, pokemon) => {
        let moves = movesArray.slice(0,4) 
        fetchMoves(moves).then(moveData => {
            let tempObject = {}
            let movesObject = {}
            tempObject['hp'] = pokemon.stats.hp 
            moveData.forEach(move => {movesObject[move.name] = move})
            tempObject['hp'] = pokemon.stats.hp 
            tempObject['moves'] = movesObject
            healthMovePP[pokemon.name] = tempObject
            setHealthMovePP(healthMovePP)
        })
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
                setFightMove={setSelectedMove}
                healthMovePP={healthMovePP}
                setHealthMovePP={setHealthMovePP}
            />
        :   
            null
    }

    let sendOutPokemon = (e) => {
        if (selectedPokemon.name !== e.target.name) {
            let pokemon = userTeam.find(p => p.name === e.target.name)
            setSelectedPokemon(pokemon)
            if (!healthMovePP[pokemon.name]) seedHealthMovePP(pokemon.moves, pokemon)
            setDisplayTeam(!displayTeam)      
            alert(`${userTrainer.name} sent out ${pokemon.name}`)
            // initiateOpponentMove()
        } else {
            alert('That Pokemon is already out! Choose a different Pokemon!!')
        }   
    }

    useEffect(() => {
        fetchUserTeam().then(teamData => {
            setSelectedPokemon(teamData[0])
            setUserTeam(teamData)
            seedHealthMovePP(teamData[0].moves, teamData[0])
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
                            <p style={opponentDamage >0 ? {backgroundColor:'red', marginLeft:'5px'} : {marginLeft:'5px'}}>
                                HP: {healthMovePP[selectedPokemon.name] ? healthMovePP[selectedPokemon.name]['hp']  : null}
                            </p>
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