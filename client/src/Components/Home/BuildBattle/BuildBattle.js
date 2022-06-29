import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import './style.css'

let BuildBattle = ({userTrainer}) => {
    const history = useHistory()
    const [displayDragonite, setDisplayDragonite] = useState(true)
    const [displayMewTwo, setDisplayMewTwo] = useState(true)

    let handleCatchPokemon = () => {
        history.push('/safari_zone')
    }

    let handleTeam = () => {
        history.push('/pc')
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

    let dragoniteImages = ["https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png", "https://giffiles.alphacoders.com/480/48081.gif"]

    let mewtwoImages = ["https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png", "http://24.media.tumblr.com/096c8fb8e51532f442c31277293125a5/tumblr_mpzo1sXWK11sa13zpo1_500.gif"]

    let renderDragoniteGif = () => displayDragonite === true ? 'home-image-thumbnail' : 'gif-image-thumbnail'

    let renderMewTwoGif = () => displayMewTwo === true ? 'home-image-thumbnail' : 'gif-image-thumbnail'

    let renderDragonite = () => displayDragonite === true ? dragoniteImages[0] : dragoniteImages[1]

    let renderMewTwo = () => displayMewTwo === true ? mewtwoImages[0] : mewtwoImages[1]

    return (
        <div className="build-battle-container">
            <Card className="game-description-card" style={{backgroundColor:'lightyellow'}}>
                <img className={renderDragoniteGif()} alt="pokemon" src={renderDragonite()} onClick={viewDragonite}/>
                <Button variant="contained" className="build-battle-button" onClick={handleTeam}>Build Team</Button>
            </Card>
            <Card className="game-description-card" style={{backgroundColor:'violet'}}>
                <img className={renderMewTwoGif()} alt="pokemon" src={renderMewTwo()} onClick={viewMewTwo}/>
                <Button className="build-battle-button" variant="contained" onClick={userTrainer ? handleCatchPokemon : handleTrainer}>{userTrainer ? 'Catch Poke' : 'Create Trainer' }</Button>
            </Card>
        </div>
    )

}

export default BuildBattle