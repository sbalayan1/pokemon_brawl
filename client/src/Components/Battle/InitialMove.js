import InitialMoveButton from "./InitialMoveButton"
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

let InitialMove = ({displayTeam, selectMove}) => {
    let moveList = ['Bag', 'Poke', 'Run']
    let renderButtons = moveList.map(move => {
        return (<InitialMoveButton key={move} move={move} selectMove={selectMove}/>)
    })

    let renderMoveCard = () => {
        return (
            <Box className="move-card" maxWidth="sm" style={{border: '1px solid black'}}>
                {displayTeam === false ? 
                        <Button variant='contained' className="action-button" onClick={selectMove} value="Fight">
                            Fight
                        </Button> 
                    
                    : 
                        <Button variant='contained' className="action-button" value="Fight" disabled>
                            Fight
                        </Button> 
                }

                {renderButtons}
            </Box>
        )
    }
    
    return renderMoveCard()
}

export default InitialMove