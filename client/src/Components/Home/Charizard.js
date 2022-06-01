import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

let Charizard = () => {
    const history = useHistory()
    const [displayNidoVGengar, setDisplayNidoVGengar] = useState(false)

    let handleBattle = () => {
        history.push('/battle')
    }

    let viewNidoGeng = () => {
        setDisplayNidoVGengar(!displayNidoVGengar)
    }

    return (
        <div className="home-battle-container">
            <Card className="home-battle-description-card">
                <div style={{height:'80%', display: 'flex', flexDirection:'column', justifyContent:'flex-end'}}>
                    <h2 style={{marginLeft:'5px'}}>Pokemon Brawl is a Pokemon Battle simulator.</h2>
                    <p style={{marginLeft:'10px', marginTop:'10px', fontSize: '15px'}}><small>Play Pokémon battles online! Play with randomly generated teams, or build your own!</small></p>
                    <Button variant="contained" className="home-battle-button" onClick={handleBattle}>Battle</Button>
                </div>
                <div style={{backgroundColor:'darkgrey', width: '100%', height: '20%'}}></div>
            </Card>
            <Card className="home-image-card" style={displayNidoVGengar === false ? {backgroundColor: 'orange'} : {backgroundColor:'black'}}>
                <div style={{height:'50vh', width:'10%'}}></div>
                <div style={{height:'50vh', width: '100%', marginLeft:'150px'}}>
                    {displayNidoVGengar === false ? <img className="home-image-card" style={{borderRadius:'16px'}} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" alt="pokemon-image" onClick={viewNidoGeng}/> 
                    : <img style={{height:'300px', backgroundColor:'black'}} className="home-image-card" src="https://pa1.narvii.com/5739/0cfc841303d738f67cdb9e5f286606c0ae1ab749_hq.gif" alt="nidoVgengar" onClick={viewNidoGeng}/>}
                </div>
            </Card>
        </div>
    )

}

export default Charizard