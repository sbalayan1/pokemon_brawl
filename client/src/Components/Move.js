let Move = ({move}) => {
    return (
        <>
            <h5>{move.name}</h5>
            <p>{move.description}</p>
            <p>Power: {move.power}</p>
            <p>PP: {move.power_points}</p>
        </>
    )
}

export default Move