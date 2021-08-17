let Ability = ({ability}) => {
    return (
        <>
            <h5 style={{margin: '5px'}}>
                {ability.name}
            </h5>
            <p style={{margin: '5px'}}>
                {ability.description}
            </p>
        </>
    )
}

export default Ability