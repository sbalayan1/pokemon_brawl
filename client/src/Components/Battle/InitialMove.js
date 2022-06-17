import InitialMoveButton from "./InitialMoveButton"
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import {useMediaQuery} from 'react-responsive'

let InitialMove = ({displayTeam, selectMove}) => {
    let moveList = ['Bag', 'Poke', 'Run']
    let renderButtons = moveList.map(move => {
        return (<InitialMoveButton key={move} move={move} selectMove={selectMove}/>)
    })

    let isMobile = useMediaQuery({query: '(max-width: 980px)'})
    let heightWidth = () => isMobile ? {width: '40%', height: '22%'}: null

    let renderMoveCard = () => {
        return (
            <Paper className="move-card">   
                <Button style={heightWidth()} variant="contained" className="action-button" onClick={displayTeam ? null : selectMove} value={displayTeam ? null : 'Fight'} disabled={displayTeam ? true : false}>Fight</Button>
                {renderButtons}
            </Paper>
        )
    }
    
    return renderMoveCard()
}

export default InitialMove