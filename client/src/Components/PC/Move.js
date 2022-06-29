let Move = ({move}) => {
    return (
        <>
            <h5 style={{marginLeft:'5px'}}>{move.name}</h5>
            <p style={{fontSize:'12px', marginLeft:'5px'}}>{move.description}</p>
            <p style={{fontSize:'12px', marginLeft:'5px'}}>Power: {move.power}</p>
            <p style={{fontSize:'12px', marginLeft:'5px'}}>PP: {move.power_points}</p>
        </>
    )
}

export default Move