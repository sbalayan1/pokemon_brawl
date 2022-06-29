let Ability = ({pokemon}) => {
    // let findAbility = async () => {
    //     let foundAbility = await fetch(`api/pokemon/${pokemon.id}`)
    //     return foundAbility
    // }

    // useEffect(() => {
    //     findAbility().then(res => res.json()).then(data => console.log)
    // }, [])

    return (
        <>
            <h5 style={{margin: '5px'}}>
                {/* {foundAbility[0].name} */}
            </h5>
            <p style={{margin: '5px', fontSize:'12px'}}>
                {/* {foundAbility[0].description} */}
            </p>
        </>
    )
}

export default Ability