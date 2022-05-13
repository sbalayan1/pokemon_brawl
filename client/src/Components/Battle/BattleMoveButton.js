let BattleMoveButton = ({handleSelectMove, move}) => {
    return (
        <button style={{fontSize:'9px'}} className="action-button" onClick={handleSelectMove} value={move.name}>
            {move.name}
        </button>)
}

export default BattleMoveButton