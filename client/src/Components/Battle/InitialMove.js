import InitialMoveButton from "./InitialMoveButton"
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

let InitialMove = ({displayTeam, selectMove}) => {
    let moveList = ['Bag', 'Poke', 'Run']
    let renderButtons = moveList.map(move => {
        return (<InitialMoveButton key={move} move={move} selectMove={selectMove}/>)
    })

    let renderMoveCard = () => {
        return (
            <Paper className="move-card">
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
            </Paper>
        )
    }
    
    return renderMoveCard()
}

export default InitialMove