let InitialMoveButton = ({move, selectInitialMove}) => {
    return (
        <button className="action-button" onClick={selectInitialMove} value={move}>
            {move}
        </button>
    )
}

export default InitialMoveButton