import {useState, useEffect} from 'react'
import BattleMoveButton from './BattleMoveButton'

let BattleMoveCard = ({selectedPokemonMoves, displayTeam}) => {
    const [selectedMove, setSelectedMove] = useState(null)
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
    let handleSelectMove = (e) => {
        if (displayTeam === false) {
            let move = selectedPokemonMoves.find(m => m.name === e.target.value)
            fetchMove(`/api/pokemon/move/${move.name}`).then(data => {setSelectedMove(data)})
        } else {
            alert('You cannot choose an attack while viewing your Pokemon!!')
        }
    }

    let handleUnselectMove = () => {
        setSelectedMove(null)
    }

    let renderButtons = selectedPokemonMoves.map(move => (
        <BattleMoveButton
            key={move.name} 
            move={move} 
            handleSelectMove={handleSelectMove}
        />
    ))

    let renderMovesCard = () => (
        <div className='move-card'>
            {renderButtons}
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
            <button style={{fontSize:'9px'}} className="action-button">
                Use {selectedMove.name}
            </button>
            <button className="action-button" onClick={handleUnselectMove}>Back</button>
        </div>
    )
    
    return selectedMove ? renderSelectedMove() : renderMovesCard()
}

export default BattleMoveCard