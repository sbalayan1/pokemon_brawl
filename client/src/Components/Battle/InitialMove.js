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
            <div className="move-card">
                <Button variant="contained" className="action-button" onClick={displayTeam ? null : selectMove} value={displayTeam ? null : 'Fight'} disabled={displayTeam ? true : false}>Fight</Button>
                {renderButtons}
            </div>
        )
    }
    
    return renderMoveCard()
}

export default InitialMove