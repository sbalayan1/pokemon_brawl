import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import './style.css'

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
        <div className="build-battle-container">
            <Card className="game-description-card" style={{backgroundColor:'lightyellow', display: 'flex', justifyContent:'space-evenly'}}>
                <div style={{backgroundColor:'crimson', height:'10%', width:'100%', borderRadius:'16px'}}></div>
                <div>
                    {displayDragonite === false ? <img className="home-image-thumbnail" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png"  alt="pokemon-image" onClick={viewDragonite}/>
                    :
                        <img style={{height:'110px'}} src="https://giffiles.alphacoders.com/480/48081.gif" alt="pokemon" onClick={viewDragonite}/>
                    }
                    <Button variant="contained" className="dragonite-button" onClick={handleTeam}>Build my team</Button>
                </div>
                <div style={{backgroundColor:'crimson', height:'10%', width:'100%', borderRadius:'16px'}}></div>
            </Card>
            <Card className="game-description-card" style={{backgroundColor:'violet'}}>
                {displayMewTwo === false ? <img className="home-image-thumbnail"  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" alt="pokemon" onClick={viewMewTwo}/>
                :
                    <img style={{height:'110px'}} className="home-image-thumbnail" src="http://24.media.tumblr.com/096c8fb8e51532f442c31277293125a5/tumblr_mpzo1sXWK11sa13zpo1_500.gif"  alt="pokemon" onClick={viewMewTwo}/>

                }
                {userTrainer === null ?  <Button variant="contained" onClick={handleTrainer}>Create a trainer</Button> : <Button variant="contained" className="mewtwo-button" onClick={handleCatchPokemon}>Catch Pokemon</Button>}
            </Card>
        </div>
    )

}

export default BuildBattle