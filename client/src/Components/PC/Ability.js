import React, {useEffect, useState} from "react"

let Ability = ({ability}) => {
   const [abilityState, setAbilityState] = useState({
        name: null,
        description: null, 
        effect: null
   })

    useEffect(() => {
        fetch(`/api/pokemon/ability/${ability.name}`)
        .then(res => res.json())
        .then(data => {setAbilityState({
            name: data.name, 
            effect: data.effect})})
    }, [])

    return (
        <>
            <h5 style={{margin: '5px'}}>
                {abilityState.name}
            </h5>
            <p style={{margin: '5px', fontSize:'12px'}}>
                {abilityState.effect}
            </p>
        </>
    )
}

export default Ability