import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

let LoadScreen = ({randPokemon, pokeBall, isLoaded}) => {
    const history = useHistory()
    const [displayPoke, setDisplayPoke] = useState(false)

    let displayPokemon = () => {
        setDisplayPoke(!displayPoke)
    }
    
    let renderLoadScreen = () => {
        return (
            <div className='loading-container'>
                <div> 
                    <h1>Loading...</h1>
                    {displayPoke === false ? 
                        <img className="loading-poke-ball" src={pokeBall} alt='poke-ball' onClick={displayPokemon}/>
                    :
                        <img className="loading-poke-ball" src={randPokemon} alt='pokemon' onClick={displayPokemon}/>
                    }
                    <div className="ball-shadow"></div>
                </div>
            </div>
        )
    }

    if (isLoaded) {
        console.log('pushing to home component')
        history.push('/')
    }
    return renderLoadScreen()
}

export default LoadScreen