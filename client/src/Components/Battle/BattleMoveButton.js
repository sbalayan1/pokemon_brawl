let BattleMoveButton = ({handleSelectMove, move}) => {
    console.log(move)
    return (
        <button style={{fontSize:'9px'}} className="action-button" onClick={handleSelectMove} value={move}>
            {move}
        </button>)
}

export default BattleMoveButton