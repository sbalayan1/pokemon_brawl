import Button from '@mui/material/Button'
import {useMediaQuery} from 'react-responsive'

let InitialMoveButton = ({move, selectMove}) => {
    let isMobile = useMediaQuery({query: '(max-width: 980px)'})
    let heightWidth = () => isMobile ? {width: '40%', height: '22%'}: null

    return <Button style={heightWidth()} variant='contained' className="action-button" onClick={selectMove} value={move}>
        {move}
    </Button>
}

export default InitialMoveButton