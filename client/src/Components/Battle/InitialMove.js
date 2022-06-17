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
                <div style={{width:'100%', height:'100%', border:'1px solid black', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Button variant="contained" className="action-button" onClick={displayTeam ? null : selectMove} value={displayTeam ? null : 'Fight'} disabled={displayTeam ? true : false}>Fight</Button>
                </div>
                {renderButtons}
            </Paper>
        )
    }
    
    return renderMoveCard()
}

export default InitialMove