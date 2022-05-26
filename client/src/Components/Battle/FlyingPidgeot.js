import { useEffect, useState } from "react"

let FlyingPidgeot = () => {
    const [flyingPokemon1, setFlyingPokemon1] = useState(null)
    const [flyingPokemon2, setFlyingPokemon2] = useState(null)
    const [flyingPokemon3, setFlyingPokemon3] = useState(null)

    let randomStatements = ['Welcome to the Battle!!', "This looks like it's going to be a hot one!", 'The new guy is really strong.', 'WATCH OUT!!!']
    
    let fetchPidgeot = async () => {
        let pidgey = fetch ('/api/pokemon/16')
        let pidgeotto = fetch ('/api/pokemon/17')
        let pidgeot = fetch ('/api/pokemon/18')

        let data = await Promise.all([pidgey, pidgeotto, pidgeot])
        let dataPromises = data.map(res => res.json())
        let results = await Promise.all(dataPromises)
        return results
    }   

    useEffect(() => {
        fetchPidgeot().then(data => {
            setFlyingPokemon1(data[0].front_image)
            setFlyingPokemon2(data[1].front_image)
            setFlyingPokemon3(data[2].front_image)
        })
    }, [])

    return (
        <div style={{width:'100%', height: '20%'}}>
            <div className="flying-pidgeot-container" style={{display:'flex'}}>
                    <p>{randomStatements[Math.floor(Math.random()*randomStatements.length)]}</p>
                    <img className="flying-pidgeot" src={flyingPokemon3} alt="flying-pidgeot"/>
                    <img className="flying-pidgeot" src={flyingPokemon2} alt="flying-pidgeot"/>
                    <img className="flying-pidgeot" src={flyingPokemon1} alt="flying-pidgeot"/>
            </div>
        </div>
    )
}

export default FlyingPidgeot