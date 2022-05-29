import Button from '@mui/material/Button'

let InitialMoveButton = ({move, selectMove}) => (
    <Button size='small' variant='contained' className="action-button" onClick={selectMove} value={move}>
        {move}
    </Button>
)

export default InitialMoveButton