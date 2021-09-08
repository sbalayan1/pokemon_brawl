import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

let Loading = ({randPokemon, pokeBall}) => {
    const history = useHistory()
    const [loaded, setLoaded] = useState(false)
    const [displayPoke, setDisplayPoke] = useState(false)


    let displayPokemon = () => {
        setDisplayPoke(!displayPoke)
    }

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
    
        }, 5000)
    },[])
    
    return (
        <div className='loading-container'>
        {loaded === true ? history.push('/') : 
            <div> 
                <h1>Loading...</h1>
                {displayPoke === false ? 
                    <img className="loading-poke-ball" src={pokeBall} alt='poke-ball' onClick={displayPokemon}/>
                :
                    <img className="loading-poke-ball" src={randPokemon} alt='pokemon' onClick={displayPokemon}/>
                }
                <div className="ball-shadow"></div>
            </div>
        }
        </div>
    )
}

export default Loading