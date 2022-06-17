import Button from '@mui/material/Button'

let BattleMoveButton = ({handleSelectMove, move}) => {
    return (
        <Button variant='contained' className="action-button" onClick={handleSelectMove} value={move}>
            {move}
        </Button>)
}

export default BattleMoveButton