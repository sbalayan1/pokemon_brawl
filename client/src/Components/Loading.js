import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

let Loading = ({pokemonData, setPokemonData, hiddenPokemon, setHiddenPokemon}) => {
    const history = useHistory()
    const [loaded, setLoaded] = useState(false)
    const [displayPoke, setDisplayPoke] = useState(false)
    const [randPokemon, setRandPokemon] = useState()
    const [pokeBall, setPokeBall] = useState()

    let displayPokemon = () => {
        // setRandPokemon(pokemonData[Math.floor(Math.random() * pokemonData.length)].front_image)
        setDisplayPoke(!displayPoke)
    }

    useEffect(() => {

        fetch('http://localhost:3000/pokemon')
        .then(res => res.json())
        .then(data => {
            setPokemonData(data)
            setRandPokemon(data[Math.floor(Math.random() * data.length)].front_image)
            setHiddenPokemon(data[Math.floor(Math.random() * data.length)])
        })

        fetch('https://pokeapi.co/api/v2/item/poke-ball')
        .then(res => res.json())
        .then(data => {
            setPokeBall(data.sprites.default)
        })

        setTimeout(() => {
            setLoaded(true)
    
        }, 6000)
    },[])
    
    return (
        <div className='loading-container'>
        {loaded === true ? history.push('/') : 
            <div> 
                <h1>Loading...</h1>
                {displayPoke === false ? <img className="loading-poke-ball" src={pokeBall} alt='poke-ball' onClick={displayPokemon}/>
                
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