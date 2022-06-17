import Button from '@mui/material/Button'

let InitialMoveButton = ({move, selectMove}) => (
    <button className="action-button" onClick={selectMove} value={move}>
        {move}
    </button>
)

export default InitialMoveButton