import InitialMoveButton from "./InitialMoveButton"

let InitialMove = ({displayTeam, selectInitialMove}) => {
    let moveList = ['Bag', 'Pokemon', 'Run']
    let renderButtons = moveList.map(move => {
        return (<InitialMoveButton key={move} move={move} selectInitialMove={selectInitialMove}/>)
    })

    let renderMoveCard = () => {
        return (
            <div className="move-card">
                {displayTeam === false ? 
                        <button className="action-button" onClick={selectInitialMove} value="Fight">
                            Fight
                        </button> 
                    
                    : 
                        <button className="action-button" value="Fight" disabled>
                            Fight
                        </button> 
                }

                {renderButtons}
            </div>
        )
    }
    
    return renderMoveCard()
}

export default InitialMove