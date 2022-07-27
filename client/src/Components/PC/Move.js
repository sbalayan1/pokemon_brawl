import React, {useEffect, useState} from 'react'



//need to refactor how I get the pokemon moves and abilities when I click on a pokemon. Pretty sure the fetch and useEffects are causing my application to lag. I wonder if an async await will help. notice the fetch is still completing in the background even after the component rerenders
let Move = ({move}) => {
    const [moveState, setMoveState] = useState({
        description: null, 
        power: null, 
        power_points: null,
    })

    useEffect(() => {
        fetch(`/api/pokemon/move/${move.name}`)
        .then(res => res.json())
        .then(data => {
            setMoveState({
                description: data.description,
                power: data.power,
                power_points: data.power_poitnts
            })
        })
    }, [])

    return (
        <>
            <h5 style={{marginLeft:'5px'}}>{move.name}</h5>
            <p style={{fontSize:'12px', marginLeft:'5px'}}>{moveState.description}</p>
            <p style={{fontSize:'12px', marginLeft:'5px'}}>Power: {moveState.power}</p>
            <p style={{fontSize:'12px', marginLeft:'5px'}}>PP: {moveState.power_points}</p>
        </>
    )
}

export default Move