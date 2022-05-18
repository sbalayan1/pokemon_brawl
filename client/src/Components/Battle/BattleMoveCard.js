import {useState, useEffect} from 'react'
import BattleMoveButton from './BattleMoveButton'

let BattleMoveCard = ({selectedPokemon, displayTeam, setFightMove, healthMovePP, setHealthMovePP}) => {
    console.log(healthMovePP)
    const [selectedMove, setSelectedMove] = useState(null)

    let handleSelectMove = (e) => {
        if (displayTeam === false) {
            let move = healthMovePP[selectedPokemon.name]['moves'][e.target.value]
            setSelectedMove(move)

        } else {
            alert('You cannot choose an attack while viewing your Pokemon!!')
        }
    }

    let handleAttack = (e) => {
        // let damage = Math.round(((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*selectedPokemon.power)/50)+2)
        // setUserDamage(damage)
        let name = selectedPokemon.name
        let move = selectedMove.name
        healthMovePP[name]['moves'][move]['pp'] -= 1
        setHealthMovePP(healthMovePP)
        hideMoves()
        unselectMove()
        // if (opponentPokemonHP - ((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*battleMovePrompt.power)/50)+2 <= 0) {
        //     setSuperEffective(true)
        //     setOpponentPokemonHP(0)
        // } else {
        //     setOpponentPokemonHP(opponentPokemonHP - Math.round(((((2*userPokemon.level)/5)*(userPokemon.stats[0].attack/opponentPokemon.stats[0].defense)*battleMovePrompt.power)/50)+2))
        // }
    }

    let unselectMove = () => {setSelectedMove(null)}
    let hideMoves = () => {setFightMove(null)}

    // useEffect(() => {
    //     selectedPokemonMoves.map
    // }, [])

    let renderButtons = Object.values(healthMovePP[selectedPokemon.name]['moves']).map(move => (
        <BattleMoveButton
            key={move.name} 
            move={move.name} 
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