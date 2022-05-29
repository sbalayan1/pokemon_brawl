import {useState} from 'react'
import BattleMoveButton from './BattleMoveButton'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'


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

    let hideMoves = () => {
        setSelectedMove(null)
        setFightMove(null)
    }

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
        setUserAttack(tempObject)
        setHealthMovePP(healthMovePP)
    }

    let renderMovesCard = () => (
        <Box className='move-card'>
            {Object.values(healthMovePP['user'][selectedPokemon.name]['moves']).map(move => (
                <BattleMoveButton key={move.name} move={move.name} handleSelectMove={handleSelectMove}/>))
            }
            {/* <Button variant='outlined' onClick={hideMoves}>Back</Button> */}
        </Box>
    )

    let renderSelectedMove = () => (
        <Box className="move-card">
            <div>
                <h5 style={{fontSize:'10px', marginLeft:'8px'}}>
                    {selectedMove.name}
                </h5>
                <p style={{fontSize:'10px', marginLeft:'8px'}}>
                    {selectedMove.description}
                </p>
            </div>
            <div>
                <p style={{fontSize:'10px'}}>
                    Power: {selectedMove.power}
                </p>
                <p style={{fontSize:'10px'}}>
                    PP: {selectedMove.pp}
                </p>
            </div>
            <Button variant='contained' style={{fontSize:'9px'}} className="action-button" onClick={handleAttack}>
                Use {selectedMove.name}
            </Button>
            <Button variant='contained' className="action-button" onClick={hideMoves}>Back</Button>
        </Box>
    )
    
    return selectedMove ? renderSelectedMove() : renderMovesCard()
}

export default BattleMoveCard