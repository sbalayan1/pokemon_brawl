import {useState} from 'react'
import BattleMoveButton from './BattleMoveButton'

let BattleMoveCard = ({selectedPokemonMoves, displayTeam, setFightMove, movePP, setMovePP}) => {
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
            fetchMove(`/api/pokemon/move/${move.name}`).then(data => {
                setSelectedMove(data)
                if (movePP === null || !movePP[data.name]) setMovePP({...movePP, [data.name]:data.pp})
            })
        } else {
            alert('You cannot choose an attack while viewing your Pokemon!!')
        }
    }

    let handleAttack = (e) => {
        // let damage = Math.round(((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*selectedPokemon.power)/50)+2)
        // setUserDamage(damage)
        // setPP({...pp, pp[selectedMove]: pp[selectedMove] - 1})

        hideMoves()
        unselectMove()

        // if (opponentPokemonHP - ((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*battleMovePrompt.power)/50)+2 <= 0) {
        //     setSuperEffective(true)
        //     setOpponentPokemonHP(0)
        // } else {
        //     setOpponentPokemonHP(opponentPokemonHP - Math.round(((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*battleMovePrompt.power)/50)+2))
        // }
    }

    let unselectMove = () => {
        setSelectedMove(null)
    }

    let hideMoves = () => {
        setFightMove(null)
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