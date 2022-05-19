import {useState} from 'react'
import BattleMoveButton from './BattleMoveButton'

let BattleMoveCard = ({selectedPokemon, displayTeam, setFightMove, healthMovePP, setHealthMovePP, setUserAttack, opponentPokemon}) => {
    console.log(healthMovePP)
    const [selectedMove, setSelectedMove] = useState(null)

    let handleSelectMove = (e) => {
        if (displayTeam === false) {
            let move = healthMovePP['user'][selectedPokemon.name]['moves'][e.target.value]
            setSelectedMove(move)

        } else {
            alert('You cannot choose an attack while viewing your Pokemon!!')
        }
    }

    let unselectMove = () => {setSelectedMove(null)}
    let hideMoves = () => {setFightMove(null)}

    let handleAttack = (e) => {
        let damage = Math.round(((((2*selectedPokemon.level)/5)*(selectedPokemon.stats.attack/selectedPokemon.stats.defense)*selectedMove.power)/50)+2)
        let name = selectedPokemon.name
        let move = selectedMove.name
        let tempObject = {}
        tempObject['pokemon'] = name
        tempObject['name'] = move
        tempObject['damage'] = damage

        let opponentHP = healthMovePP['opponent'][opponentPokemon.name]['hp']
        let updatedHP = opponentHP - damage
        updatedHP <=0 ? 
            healthMovePP['opponent'][opponentPokemon.name]['hp'] = 0
        :
            healthMovePP['opponent'][opponentPokemon.name]['hp'] -= damage

        healthMovePP['user'][name]['moves'][move]['pp'] -= 1
        hideMoves()
        unselectMove()
        setUserAttack(tempObject)
        setHealthMovePP(healthMovePP)
    }

    let renderMovesCard = () => (
        <div className='move-card'>
            {Object.values(healthMovePP['user'][selectedPokemon.name]['moves']).map(move => (
                <BattleMoveButton key={move.name} move={move.name} handleSelectMove={handleSelectMove}/>))
            }
            <button onClick={hideMoves}>Back</button>
        </div>
    )

    let renderSelectedMove = () => (
        <div style={{justifyContent:'space-evenly', marginTop:'10px'}} className="trainer-move-card">
            <div>
                <h5 style={{fontSize:'10px', marginLeft:'8px'}}>
                    {selectedMove.name}
                </h5>
                <p style={{fontSize:'10px'}}>
                    {selectedMove.description}
                </p>
            </div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <p style={{fontSize:'10px'}}>
                    Power: {selectedMove.power}
                </p>
                <p style={{fontSize:'10px'}}>
                    PP: {selectedMove.pp}
                </p>
            </div>
            <button style={{fontSize:'9px'}} className="action-button" onClick={handleAttack}>
                Use {selectedMove.name}
            </button>
            <button className="action-button" onClick={unselectMove}>Back</button>
        </div>
    )
    
    return selectedMove ? renderSelectedMove() : renderMovesCard()
}

export default BattleMoveCard