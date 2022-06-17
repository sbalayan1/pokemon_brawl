import Button from '@mui/material/Button'

let InitialMoveButton = ({move, selectMove}) => (
    <div style={{width:'100%', height:'100%', border:'1px solid black', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Button variant='contained' className="action-button" onClick={selectMove} value={move}>
            {move}
        </Button>
    </div>
)

export default InitialMoveButton