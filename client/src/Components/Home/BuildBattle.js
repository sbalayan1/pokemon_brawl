import {useState} from 'react'
import {useHistory} from 'react-router-dom'

let BuildBattle = ({userTrainer}) => {
    const history = useHistory()
    const [displayDragonite, setDisplayDragonite] = useState(false)
    const [displayMewTwo, setDisplayMewTwo] = useState(false)

    let handleCatchPokemon = () => {
        history.push('/safari_zone')
    }

    let handleTeam = () => {
        history.push('/my_pc')
    }

    let handleTrainer = () => {
        history.push('/create_a_trainer')
    }

    let viewDragonite = () => {
        setDisplayDragonite(!displayDragonite)
    }

    let viewMewTwo = () => {
        setDisplayMewTwo(!displayMewTwo)
    }

    return (
        <div className="home-build-team-create-trainer-container">
            <div className="home-battle-description-card" style={{backgroundColor:'lightyellow', display: 'flex', justifyContent:'space-evenly'}}>
                <div style={{backgroundColor:'crimson', height:'10%', width:'100%', borderRadius:'16px'}}></div>
                <div>
                    {displayDragonite === false ? <img className="home-image-thumbnail" style={{backgroundColor:'gold'}} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png"  alt="pokemon-image" onClick={viewDragonite}/>
                    :
                        <img style={{height:'110px'}} src="https://giffiles.alphacoders.com/480/48081.gif" alt="pokemon-image" onClick={viewDragonite}/>
                    }
                    <button className="dragonite-button" onClick={handleTeam}>Build my team</button>
                </div>
                <div style={{backgroundColor:'crimson', height:'10%', width:'100%', borderRadius:'16px'}}></div>
            </div>
            <div className="home-battle-description-card" style={{backgroundColor:'violet'}}>
                {displayMewTwo === false ? <img className="home-image-thumbnail" style={{backgroundColor:'purple'}} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" alt="pokemon-image" onClick={viewMewTwo}/>
                :
                    <img style={{height:'110px'}} className="home-image-thumbnail" src="http://24.media.tumblr.com/096c8fb8e51532f442c31277293125a5/tumblr_mpzo1sXWK11sa13zpo1_500.gif"  alt="pokemon-image" onClick={viewMewTwo}/>

                }
                {userTrainer === null ?  <button style={{backgroundColor:'violet'}} onClick={handleTrainer}>Create a trainer</button> : <button className="mewtwo-button" onClick={handleCatchPokemon}>Catch Pokemon</button>}
            </div>
        </div>
    )

}

export default BuildBattle