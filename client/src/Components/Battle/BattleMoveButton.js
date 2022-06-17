import Button from '@mui/material/Button'
import {useMediaQuery} from 'react-responsive'

let BattleMoveButton = ({handleSelectMove, move}) => {
    let isMobile = useMediaQuery({query: '(max-width: 980px)'})
    let heightWidth = () => isMobile ? {width: '40%', height: '22%'}: null

    return (
        <Button style={heightWidth()} variant='contained' size='small' className="action-button" onClick={handleSelectMove} value={move}>
            {move}
        </Button>)
}

export default BattleMoveButton